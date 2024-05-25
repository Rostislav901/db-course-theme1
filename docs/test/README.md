# Тестування працездатності системи

## Запит на авторизацію POST project/api/login
![relation-diagram](./images/Authorization.png)


## Запит на реєєстрацію  POST project/api/user/create повертає id створеного юзера
![relation-diagram](./images/Registration.png)

## Запит на пошук юзера по id  GET project/api/user/?id=num 
![relation-diagram](./images/FindUserById.png)

## Запит на оновлення данних юзер по id  PUT project/api/user/update/?id=num 
![relation-diagram](./images/UserUpdateById.png)

## Запит на показ всих юзерів GET project/api/users/all
![relation-diagram](./images/FindAllUser.png)