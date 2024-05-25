/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "03-01.jpg",
    "revision": "61ccd31b9a99e4dc0b2115d7a181dc71"
  },
  {
    "url": "03-02.jpg",
    "revision": "0e42c83dcc174ebfdbb611ab0956fcd9"
  },
  {
    "url": "03-03.jpg",
    "revision": "dd23072447e0798b536bd162235d14c3"
  },
  {
    "url": "03-04.jpg",
    "revision": "661a64ee2776ef94b23ba82f7ee50969"
  },
  {
    "url": "03-05.jpg",
    "revision": "6f52dcb2ccb40af28a65a4b796eb918d"
  },
  {
    "url": "03-06.jpg",
    "revision": "2643698d9412e41a449c1edee719fb29"
  },
  {
    "url": "03-07.jpg",
    "revision": "c4a788f41d803f8b9bddb5adc0513be6"
  },
  {
    "url": "03-08.jpg",
    "revision": "4c810503ec4bc1adfd29904056fc2886"
  },
  {
    "url": "03-09.jpg",
    "revision": "9c798bc91f80f84b6b0e7f7fba26d65b"
  },
  {
    "url": "03-10.jpg",
    "revision": "bb5b18b65591e9d058edbc14b02c6ba5"
  },
  {
    "url": "03-11.jpg",
    "revision": "6a88d8f48c63e79c72ec45ae84a8d9ff"
  },
  {
    "url": "04-01.jpg",
    "revision": "4bbafd5dd4000461cef55f669139b17b"
  },
  {
    "url": "05-01.jpg",
    "revision": "8d54b111a4b6b5fb4cd39e4c7261b927"
  },
  {
    "url": "06-01.jpg",
    "revision": "cf2dab320c48c5ead6fe105863629e4e"
  },
  {
    "url": "06-02.jpg",
    "revision": "aa286f8fd6540b7a7b6d36392a63f505"
  },
  {
    "url": "06-03.jpg",
    "revision": "239fa5fb2a9063f1e261ae2db81fceef"
  },
  {
    "url": "06-04.jpg",
    "revision": "a2dbf924afd6a8580ce4a2d2bcd6e049"
  },
  {
    "url": "06-05.jpg",
    "revision": "22f4f542b283cdc3d027eb664424d3c8"
  },
  {
    "url": "06-06.jpg",
    "revision": "12017ddd5b9179e8f53e93044acee998"
  },
  {
    "url": "06-07.jpg",
    "revision": "1ded65fc56da9f0008ae4ef2eacc8175"
  },
  {
    "url": "1.jpg",
    "revision": "f1ea37a492254cc85dd6fd1e89b1a6b4"
  },
  {
    "url": "1.png",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "12-01.jpg",
    "revision": "cc85570b3c89f73291af87791115986a"
  },
  {
    "url": "12-02.jpg",
    "revision": "f2b24c5c4beb21d5302c64b59445927a"
  },
  {
    "url": "12-03.jpg",
    "revision": "61fe98dff39d0887978deb0af605571b"
  },
  {
    "url": "12-04.jpg",
    "revision": "ff2468e7fbb03e034be0ffd7312dc7d9"
  },
  {
    "url": "12-05.jpg",
    "revision": "a126fe17514d81279c677666fd459d9d"
  },
  {
    "url": "12-06.jpg",
    "revision": "c25686b2f77ac7c5a2d4706f43e40132"
  },
  {
    "url": "12-07.jpg",
    "revision": "de17f3eb1df503250bcf1a5a4b533eec"
  },
  {
    "url": "12-08.jpg",
    "revision": "f3b58c768c18919a6fa2ab59ea6627db"
  },
  {
    "url": "13-01.jpg",
    "revision": "b22f06060909d43d796a8ffd4b0743a0"
  },
  {
    "url": "13-02.jpg",
    "revision": "2d2bca0518716a8dfaf37ef5c15e54ee"
  },
  {
    "url": "13-03.jpg",
    "revision": "fec1a3db903dc05c462fb6f384a400d6"
  },
  {
    "url": "2.jpg",
    "revision": "572bc2e4ef3efb7c81bbbcac5f09147b"
  },
  {
    "url": "3.jpg",
    "revision": "248757985bb49f73624c6923057530ac"
  },
  {
    "url": "4.jpg",
    "revision": "407c52446e2e463c4f8e494d52dbe485"
  },
  {
    "url": "404.html",
    "revision": "b5d5ecd50224af5c1dfcce184a4aa0a7"
  },
  {
    "url": "5.jpg",
    "revision": "7e861769b640afa00fcc0ac4b72d9c52"
  },
  {
    "url": "assets/css/0.styles.d5a225ae.css",
    "revision": "5c751da82c69a535bd3371d173af2789"
  },
  {
    "url": "assets/img/Authorization.f8a7366c.png",
    "revision": "f8a7366c42514b60770f5a51bdd26372"
  },
  {
    "url": "assets/img/FindAllUser.e9defad5.png",
    "revision": "e9defad53c17762cdf737dbcee67db88"
  },
  {
    "url": "assets/img/FindUserById.86c4fd69.png",
    "revision": "86c4fd69c5e4d180cec42ca3d5c765c0"
  },
  {
    "url": "assets/img/Registration.b04a3dd2.png",
    "revision": "b04a3dd2a2b69585761f7125aa829e11"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/UserUpdateById.1c5060b7.png",
    "revision": "1c5060b719531082449ddae868910747"
  },
  {
    "url": "assets/img/version7.8e5d3cf5.png",
    "revision": "8e5d3cf5010f9245e60ae4aa5cd2e9f8"
  },
  {
    "url": "assets/js/1.c514b243.js",
    "revision": "03e6bcd414c9ade13411da67fd67799b"
  },
  {
    "url": "assets/js/10.e55adb26.js",
    "revision": "3ca85133fd5d585db26c1aa0b09b5295"
  },
  {
    "url": "assets/js/13.143540f4.js",
    "revision": "587a2c05dac4f80aca8285fc00cb2533"
  },
  {
    "url": "assets/js/14.94c7d917.js",
    "revision": "063690ce3552feef291b16a7e9c04e5b"
  },
  {
    "url": "assets/js/15.570e3662.js",
    "revision": "7e2cc312c499a1ed3b307bd693943c0b"
  },
  {
    "url": "assets/js/16.df81cf96.js",
    "revision": "e9616b218353db3dfb876776c93f6c50"
  },
  {
    "url": "assets/js/17.6db2bb35.js",
    "revision": "76aa97537cc23020296e6f31a7af9fa9"
  },
  {
    "url": "assets/js/18.5c5e592f.js",
    "revision": "85b0a3f5fb556bd48a61716f70e8d7f8"
  },
  {
    "url": "assets/js/19.0a1e6ff2.js",
    "revision": "468d345322adbf77805b0fb7e02376bf"
  },
  {
    "url": "assets/js/2.0091a01b.js",
    "revision": "46c985312503d1d086511ea8c8736cd2"
  },
  {
    "url": "assets/js/20.50bdfbe1.js",
    "revision": "a0334ab66a8d0b5c114852f17350cca4"
  },
  {
    "url": "assets/js/21.39425e04.js",
    "revision": "8b7c9b61e56f99d768ff23d21e9d935d"
  },
  {
    "url": "assets/js/22.d2077878.js",
    "revision": "9f6e9904ba0cfa4dc7bc50e47142a6e3"
  },
  {
    "url": "assets/js/23.3ec6ef11.js",
    "revision": "d0e91598f11e346698d9855ebb1cde0b"
  },
  {
    "url": "assets/js/24.6b41f770.js",
    "revision": "df72749eaa76dc6b67d1921de410c7c5"
  },
  {
    "url": "assets/js/25.9b82b3b9.js",
    "revision": "2e9bc8583fc2d0dfe0e546a919f8359a"
  },
  {
    "url": "assets/js/26.590bbba7.js",
    "revision": "263fdeb3a6421d841b88e0d0908be681"
  },
  {
    "url": "assets/js/27.ffb51423.js",
    "revision": "90465199c5ebd248be0658acdc814b55"
  },
  {
    "url": "assets/js/28.8bb2fae9.js",
    "revision": "071fb78ef62951ee1b1650297d98c408"
  },
  {
    "url": "assets/js/29.0f027b3a.js",
    "revision": "24591ff2410c79551419409f8f0edf9b"
  },
  {
    "url": "assets/js/3.3a389e6a.js",
    "revision": "54c2d66a75926ab0b7e2caed46600a3e"
  },
  {
    "url": "assets/js/30.da1c4dad.js",
    "revision": "a43011b9d76001d1aa3e5ac22726c62d"
  },
  {
    "url": "assets/js/31.e35d53ea.js",
    "revision": "6402c6129d697f3319cb0544c46f4627"
  },
  {
    "url": "assets/js/32.dbc28851.js",
    "revision": "cb6b53e59ac583138f0fa25b780d0af3"
  },
  {
    "url": "assets/js/33.a2c9d0d7.js",
    "revision": "442dfcfe044bc8995b03e20d839a67f9"
  },
  {
    "url": "assets/js/34.1ce502a1.js",
    "revision": "cff33bd15e4953bc428a2d981dfb204b"
  },
  {
    "url": "assets/js/35.a3b93646.js",
    "revision": "6e2b752c3b396e9b25984c5188e1d8e0"
  },
  {
    "url": "assets/js/36.a04e19a8.js",
    "revision": "6e270530a193c54cfea8b54986cd7a64"
  },
  {
    "url": "assets/js/37.a8f29b92.js",
    "revision": "c70ed2fa579dc45903b7902593da87c5"
  },
  {
    "url": "assets/js/38.610836e9.js",
    "revision": "e8f1eb4ac7ce725ed0876dab8f0576af"
  },
  {
    "url": "assets/js/39.0b0f73c6.js",
    "revision": "42dab52ac704e16c534905a55a9f0b3e"
  },
  {
    "url": "assets/js/4.7ff1b1d7.js",
    "revision": "d191d7b9b4000a6ab0134b1e573082b4"
  },
  {
    "url": "assets/js/41.61aa90e8.js",
    "revision": "066959bec3c5f45d798f3d1a90380fa5"
  },
  {
    "url": "assets/js/5.82374277.js",
    "revision": "8b4771c9adf4eba97028ab5bb33ac733"
  },
  {
    "url": "assets/js/6.0ca3a281.js",
    "revision": "1364f1e7d2ebb1de5cad60d916c17cbc"
  },
  {
    "url": "assets/js/7.d4c176d6.js",
    "revision": "fc7e35d5724201e690781881c263b248"
  },
  {
    "url": "assets/js/8.ec0c7863.js",
    "revision": "b6b58599661c95fa0eb718bb47ff2438"
  },
  {
    "url": "assets/js/9.3cefd8e0.js",
    "revision": "651b33ee624bfe8d7ef1bcb0dacfc4f1"
  },
  {
    "url": "assets/js/app.a3af5042.js",
    "revision": "fe883c01f113850ff50515f89d498eb3"
  },
  {
    "url": "assets/js/vendors~docsearch.a7a1cc5b.js",
    "revision": "dd76b1dc32160e58eafabb5eb9d1d835"
  },
  {
    "url": "conclusion/index.html",
    "revision": "95f4ab95c7a6a389256afd342e3cf0e4"
  },
  {
    "url": "design/index.html",
    "revision": "bea86aa2cbcf24fda2d655f323deff92"
  },
  {
    "url": "index.html",
    "revision": "6d43d893e0e998c87d29938cad05638f"
  },
  {
    "url": "intro/index.html",
    "revision": "dc32802794e537d91688830930705108"
  },
  {
    "url": "license.html",
    "revision": "70a2edbdcd1a16b29dc6ec11e14ab937"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "7563775484a94522965374de3984287a"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "a6979c3154407409eec67983c7dd8ce7"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "768a4fcfe46f98f188672ec304bf891f"
  },
  {
    "url": "software/index.html",
    "revision": "81dcb6cf4b187a48a5846693903dfd8a"
  },
  {
    "url": "test/index.html",
    "revision": "b860fdbc7c6b190aed1927d2dda31838"
  },
  {
    "url": "use cases/index.html",
    "revision": "a760469a88f9b580c436764db119ee2e"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
