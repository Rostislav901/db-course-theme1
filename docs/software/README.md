# Реалізація інформаційного та програмного забезпечення

## SQL-скрипт для створення на початкового наповнення бази даних

``` sql


SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema survey_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS survey_db DEFAULT CHARACTER SET utf8;
USE survey_db;

-- -----------------------------------------------------
-- Table survey_db.Users
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS survey_db.Users (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(64) NOT NULL UNIQUE,
  nickname VARCHAR(64) NOT NULL UNIQUE,
  level INT NOT NULL,
  password VARCHAR(32) NOT NULL,
  speciality_id INT,
  PRIMARY KEY (id),
  INDEX fk_Users_Speciality_idx (speciality_id ASC),
  CONSTRAINT fk_Users_Speciality
    FOREIGN KEY (speciality_id)
    REFERENCES survey_db.Speciality (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table survey_db.Speciality
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS survey_db.Speciality (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (id)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table survey_db.Survey
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS survey_db.Survey (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(32) NOT NULL,
  description TEXT NOT NULL,
  created_at DATETIME NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_Survey_User_idx (user_id ASC),
  CONSTRAINT fk_Survey_User
    FOREIGN KEY (user_id)
    REFERENCES survey_db.Users (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table survey_db.Question
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS survey_db.Question (
  id INT NOT NULL AUTO_INCREMENT,
  text TEXT NOT NULL,
  survey_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_Question_Survey_idx (survey_id ASC),
  CONSTRAINT fk_Question_Survey
    FOREIGN KEY (survey_id)
    REFERENCES survey_db.Survey (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table survey_db.Answer
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS survey_db.Answer (
  id INT NOT NULL AUTO_INCREMENT,
  text TEXT NOT NULL,
  question_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_Answer_Question_idx (question_id ASC),
  CONSTRAINT fk_Answer_Question
    FOREIGN KEY (question_id)
    REFERENCES survey_db.Question (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table survey_db.Grant
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS survey_db.Grant (
  id INT NOT NULL AUTO_INCREMENT,
  create_time DATETIME NOT NULL,
  role_id INT NOT NULL,
  user_id INT NOT NULL,
  answer_id INT,
  survey_id INT,
  PRIMARY KEY (id),
  INDEX fk_Grant_User_idx (user_id ASC),
  INDEX fk_Grant_Role_idx (role_id ASC),
  INDEX fk_Grant_Answer_idx (answer_id ASC),
  INDEX fk_Grant_Survey_idx (survey_id ASC),
  CONSTRAINT fk_Grant_User
    FOREIGN KEY (user_id)
    REFERENCES survey_db.Users (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Grant_Role
    FOREIGN KEY (role_id)
    REFERENCES survey_db.Role (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Grant_Answer
    FOREIGN KEY (answer_id)
    REFERENCES survey_db.Answer (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Grant_Survey
    FOREIGN KEY (survey_id)
    REFERENCES survey_db.Survey (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table survey_db.Role
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS survey_db.Role (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (id)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table survey_db.State
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS survey_db.State (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS survey_db.Action (
  id INT NOT NULL AUTO_INCREMENT,
  date DATE ,
  grant_id INT,
  state_id INT,
  PRIMARY KEY (id),
  INDEX fk_Action_Grant_idx (grant_id ASC),
  INDEX fk_Action_State_idx (state_id ASC),
  CONSTRAINT fk_Action_Grant
      FOREIGN KEY (grant_id)
      REFERENCES survey_db.Grant (id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  CONSTRAINT fk_Action_State
      FOREIGN KEY (state_id)
      REFERENCES survey_db.State (id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  ) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS survey_db.Skill (
  id INT NOT NULL AUTO_INCREMENT,
  level INT,
  speciality_id INT,
  user_id INT,
  PRIMARY KEY (id),
  INDEX fk_Skill_Speciality_idx (speciality_id ASC),
  INDEX fk_Skill_User_idx (user_id ASC),

  CONSTRAINT fk_Action_Speciality
        FOREIGN KEY (speciality_id)
        REFERENCES survey_db.Speciality (id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
  CONSTRAINT fk_Action_User
        FOREIGN KEY (user_id)
        REFERENCES survey_db.Users (id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
  ) ENGINE = InnoDB;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
```
## RESTfull сервіс для управління даними

 Файл перенаправлення .htaccess:
```
RewriteEngine On
RewriteBase /

RewriteRule .+ index.php
```
- Основний файл на який приходять всі запити index.php:
```
<?php

require_once "setting/setting.php";

use \core\controllers\Controller;



Controller::run();
```

- файл Конролера який викликає всі необхідні методи Controller.php:
```
<?php

namespace core\controllers;

use help\Registry;
use core\commands\CommandResolver;
class Controller
{
    private Registry $reg;
    private function __construct()
    {
        $this->reg = Registry::instance();
    }
    public static function run() : void
    {
        $instance = new self();
        $instance->init();
        $instance->handleRequest();
    }
    public function handleRequest() : void
    {
         $request = $this->reg->getRequest();
         $resolver = new CommandResolver();
         $cmd = $resolver->getCommand($request);
         $cmd->execute($request);
    }
    public function init() : void
    {
         $this->reg->getApplicationHelper()->init();
    }
}
```
- Файл реєстру компонентів програми Registry.php:
```
<?php

namespace help;

use core\requests\Request;

class Registry
{

    private static ? Registry $instance;
    private ? Request $request;
    private ? ApplicationHelper $applicationHelper = null;
    private ? Conf $conf = null;
    private ? Conf $commands = null;
    private function __construct()
    {
    }
    public static function instance() : Registry
    {
        if(!isset(self::$instance)){
            self::$instance = new self();
        }
        return  self::$instance;
    }

   public function setRequest(Request $request) : void
   {
       $this->request = $request;
   }
   public function getRequest() : Request
   {
       if(is_null($this->request))
       {
           throw  new \Exception("Request not request");
       }
       return  $this->request;
   }
   public function getApplicationHelper() : ApplicationHelper
   {
       if(is_null($this->applicationHelper))
       {
           $this->applicationHelper = new ApplicationHelper();
       }
       return  $this->applicationHelper;
   }
   public function setConf(Conf $conf) : void
   {
       $this->conf = $conf;
   }
   public function getConf() : Conf
   {
       if(is_null($this->conf))
       {
           $this->conf = new Conf();
       }
       return  $this->conf;
   }
   public function getCommands() : Conf
   {
        if(is_null($this->commands))
        {
            $this->commands = new Conf();
        }
        return  $this->commands;
   }
   public function setCommands(Conf $commands) : void
   {
       $this->commands = $commands;
   }
}
```
- Файл який ініціалізує об'єкт запиту в залежності від умов ApplicationHelper.php :
```
<?php

namespace help;
use \core\requests\CliRequest;
use \core\requests\HttpRequest;
use help\AppException;
class ApplicationHelper
{
   private  Registry $reg;

   public function __construct()
   {
       $this->reg = Registry::instance();
   }
   public function init() : void
   {
        if(defined("STDIN"))
        {
            $request = new CliRequest();
        }
        else
        {
            $request = new HttpRequest();

        }
        $this->reg->setRequest($request);
   }

}
```
- Файл який знаходить необхідну команду відносно запиту CommandResolver.php:
```
<?php

namespace core\commands;

use core\requests\Request;
use help\Registry;

class CommandResolver
{
      private static \ReflectionClass $refcmd;
      public function __construct()
      {
          self::$refcmd = new \ReflectionClass(Command::class);
      }
      public function getCommand(Request $request) : Command
      {
          $reg = Registry::instance();
          $commands = $reg->getCommands();
          $path = $request->getPath();
          $method = $request->getMethod();
          $class = $commands->get($path,$method);

          if(is_null($class))
          {
              $request->addFeedback("Path not approved");
          }
          if(!class_exists($class))
          {
              $request->addFeedback("Command $class not found");
          }
          $refclass = new \ReflectionClass($class);
          if(! ($refclass->isSubclassOf(self::$refcmd)))
          {
              $request->addFeedback(
                  "$refclass dont have type Command"
              );
          }
          return  $refclass->newInstance();
      }
}
```
- Файл який починає пошук необхідного роуту Conf.php
```
<?php

namespace help;

use core\commands\LoginCommand;
use core\router\Router;

class Conf
{


    public function get(string $path,string $method) : string
    {
        return  Router::instance()->getRoute($path,$method);
    }

}
```
- Файл Роутер який в якому знаходяться  роути програми та реалізована функція пошуку необхідного роуту Router.php:
```
<?php

namespace core\router;

use core\commands\CreateUserCommand;
use core\commands\DefaultCommand;
use core\commands\FindAllUsersCommand;
use core\commands\FindUserByIdCommand;
use core\commands\LoginCommand;
use core\commands\UpdateUserCommand;

final class Router
{
    private static ?Router $instance = null;
    private string $default = DefaultCommand::class;
    private array $routes;

    private function __construct()
    {
        $this->routes = [
            ["pattern" => "/^\/api\/users\/all$/", "command" => FindAllUsersCommand::class, "method" => "GET"],
            ["pattern" => "/^\/api\/user\/\?id=\d+$/", "command" => FindUserByIdCommand::class, "method" => "GET"],
            ["pattern" => "/^\/api\/user\/create$/", "command" => CreateUserCommand::class, "method" => "POST"],
            ["pattern" => "/^\/api\/user\/update\/\?id=\d+$/", "command" => UpdateUserCommand::class, "method" => "PUT"],
            ["pattern" => "/^\/api\/login$/", "command" => LoginCommand::class, "method" => "POST"],
        ];
    }

    public static function instance(): Router
    {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getRoute(string $path, string $method): string
    {
        foreach ($this->routes as $route) {
            if (preg_match($route['pattern'], $path) && $method == $route['method']) {
                return $route['command'];
            }
        }
        return $this->default;
    }
}
```
- Абстракний базовий файл команди Command.php:
```
<?php

namespace core\commands;

use core\requests\Request;

abstract class Command
{

    final public function __construct(){}
    public function execute(Request $request) : void
    {
         $this->doExecute($request);
    }
    
    abstract public function doExecute(Request $request) : void;

}
```
- Абастрактний базовий файл запиту Request.php:
```
<?php

namespace core\requests;

abstract class Request
{
    protected array $properties = [];
    protected array $feedback = [];
    protected array $getParams = [];

    protected array $postParams = [];
    protected string|null $path = "/";
    protected string $method;
    public function __construct()
    {
        $this->init();
    }
    abstract function init() : void;
    public function setPath(string $path) : void
    {
        $this->path = $path;
    }
    public function getPath() : string
    {
        return  $this->path;
    }
    public function getProperty(string $key) : mixed
    {
        if(isset($this->properties[$key])) return $this->properties[$key];
        return null;
    }
    public function addFeedback(string $msg)
    {
        $this->feedback[] = $msg;
    }
    public function getFeedbackString($separator = "\n") : string
    {
        return implode($separator,$this->feedback);
    }
    public function clearFeedback() : void
    {
        $this->feedback = [];
    }

    public function getMethod(): string
    {
        return $this->method;
    }

    public function getGetParams(): array
    {
        return $this->getParams;
    }

    public function getPostParams(): array
    {
        return $this->postParams;
    }

}
```
- Файл запиту  для http-запитів HttpRequest.php:
```
<?php
namespace core\requests;

class HttpRequest extends Request
{
     public function init(): void
     {
         $this->properties = $_REQUEST;
         $this->path = $_SERVER["REQUEST_URI"];
         $this->method = $_SERVER['REQUEST_METHOD'];
         $this->getParams = $_GET;
         $this->postParams = json_decode(file_get_contents('php://input'),true);
         $this->path = (empty($this->path)) ? "/" : $this->path;
     }
}
```
- Файл який відповідає за з'єднання з базою данних Base.php:
```
<?php

namespace database;

class Base
{
    private static ?self $instance = null;
    private function __construct(){}

    public static function instance(): static
    {
        if(is_null(self::$instance)){
            self::$instance = new static();
        }

        return self::$instance;
    }

    public function getDBConnectionLink() : \mysqli
    {
        return mysqli_connect('localhost','root','','survey_db','3306');
    }
}
```
- Файл команди яка реалізує реєєстрацію CreateUserCommand.php:
```
<?php

namespace core\commands;

use core\requests\Request;
use database\Base;

class CreateUserCommand extends Command
{

    public function doExecute(Request $request): void
    {
        $postData = $request->getPostParams();
        $email = $postData['email'];
        $nickname = $postData['nickname'];
        $password = $postData['password'];

        $connection = Base::instance()->getDBConnectionLink();

        $sqlQuery = "INSERT INTO survey_db.Users (email, nickname, password,level,speciality_id) 
                     VALUES ('$email', '$nickname', '$password', 1, 2)";

        $res = mysqli_query($connection,$sqlQuery);

        if ($res) {
            $userId = mysqli_insert_id($connection);
            echo json_encode($userId);
        } else {
            echo null;
        }
    }
}
```
- Файл команди яка реалізує авторизацію LoginCommand.php:
```
<?php
namespace core\commands;
use core\requests\Request;
use database\Base;

class LoginCommand extends Command
{
   public function doExecute(Request $request): void
   {
       $postData = $request->getPostParams();

       $email = $postData['email'];
       $password = $postData['password'];

       $connection = Base::instance()->getDBConnectionLink();

       $sqlQuery = "SELECT * FROM Users WHERE email = '$email' LIMIT 1";

       $response = mysqli_fetch_assoc(mysqli_query($connection,$sqlQuery));

       $truePassword =  $response['password'];

       if($truePassword === $password)
       {
           echo 'Authorization was successful';
       }
   }
}
```
- Файл команди яка реалізує пошук юзера за id FindUserByIdCommand.php:
```
<?php

namespace core\commands;

use core\requests\Request;
use database\Base;

class FindUserByIdCommand extends Command
{

    public function doExecute(Request $request): void
    {
        $id =  $request->getGetParams()['id'];

        $connection = Base::instance()->getDBConnectionLink();

        $sqlQuery = "SELECT * FROM survey_db.Users WHERE survey_db.Users.id=$id";

        $response = mysqli_query($connection,$sqlQuery);

        echo json_encode(mysqli_fetch_assoc($response));
    }
}
```
- Файл команди яка реалізує пошук всих юзерів FindAllUsersCommand.php:
```

<?php

namespace core\commands;

use core\requests\Request;
use database\Base;

class FindAllUsersCommand extends Command
{

    public function doExecute(Request $request): void
    {
         $connection = Base::instance()->getDBConnectionLink();

         $sqlQuery = "SELECT * FROM survey_db.Users";

         $response = mysqli_query($connection,$sqlQuery);
         for ($data = []; $row = mysqli_fetch_assoc($response); $data[] = $row);

         echo json_encode($data);
    }
}
```
- Файл команди яка реалізує зміни UpdateUserCommand.php:
```
<?php

namespace core\commands;

use core\requests\Request;
use database\Base;

class UpdateUserCommand extends Command
{

    public function doExecute(Request $request): void
    {
        $postData = $request->getPostParams();
        $email = $postData['email'];
        $nickname = $postData['nickname'];
        $password = $postData['password'];
        $userId = $request->getGetParams()['id'];
        $connection = Base::instance()->getDBConnectionLink();

        $sqlQuery = "UPDATE survey_db.Users 
             SET email = '$email', nickname = '$nickname', password = '$password' 
             WHERE id = $userId";

        $res = mysqli_query($connection, $sqlQuery);

        if ($res) {
            echo "Successful Updates";
        } else {
            echo "Error" . mysqli_error($connection);
        }
    }
}

```

