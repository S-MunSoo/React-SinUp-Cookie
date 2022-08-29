## React Cooike example

```js
yarn add react-cookie
```

- react-cookie 는 아래와 같이 사용할 수 있습니다.
- cookies 는 현재 존재하는 cookie 값들이 담겨있고,
- setCookie 는 쿠키 저장을 위한 함수, remove 는 그 반대입니다.

```js
import { useCookies } from "react-cookie";

const [cookies, setCookie, removeCookie] = useCookies();

// access-token 이름으로 저장
setCookie("access-token", response.data["access_token"], { path: "/" });
```

-routes.json

```
{
    "posts": 640
}

```

-package.json

```
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "server": "json-server-auth --watch db.json --port 8000 -r routes.json"
  },
```
