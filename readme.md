### ติดตั้ง

*Terminal*

```
git clone https://github.com/jeud/vue-lucky-draw.git
cd vue-lucky-draw

yarn
```

*config/firebase.js*

```js
const config = {
    apiKey: "AIzaSyDt1i0gWOYt2Ew6loreRJbe5I3JlDAKxIo",
    authDomain: "tutor4dev-pmk.firebaseapp.com",
    databaseURL: "https://tutor4dev-pmk.firebaseio.com",
    projectId: "tutor4dev-pmk",
    storageBucket: "tutor4dev-pmk.appspot.com",
    messagingSenderId: "280186293690"
}
```

> แก้ไขค่า Configuration เป็นฐานข้อมูลของโปรเจค

### ทดสอบ

*Terminal*

```
json-server order.json

yarn dev
```

### Build

*Terminal*

```
yarn build
```
