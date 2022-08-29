import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userInpiut, setUserInpiut] = useState({ email: "", password: "" });

  const inputHandlerChange = (e) => {
    const { name, value } = e.target;
    setUserInpiut({ ...userInpiut, [name]: value });
  };

  // 엑세스 토큰을 저장해줄 쿠기가 필요 쿠키에 저장을 해놓으면 새로고침,홈페이지 종료가 되더라도 토큰이 계속 남아 있는다
  // yarn add react-cookie 쿠키관리
  // setCookies 쿠키 추가 / removeCookie 쿠키 제거
  const [cookies, setCookies, removeCookie] = useCookies();
  const navigate = useNavigate();

  const goToLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        userInpiut
      );
      setCookies("accessToken", response.data["accessToken"], { path: "/" });
      navigate("/post");
    } catch (e) {
      console.log(e);
    }
  };

  // 로그인시 토큰이 있으므로 다시 로그인 페이지 이동 불가
  // useEffect(() => {
  //   if (cookies["accessToken"]) {
  //     navigate("/post");
  //   }
  // }, []);

  return (
    <div>
      Login
      <input name="email" onChange={inputHandlerChange}></input>
      <input
        name="password"
        onChange={inputHandlerChange}
        type="password"
      ></input>
      <button onClick={goToLogin}>로그인</button>
    </div>
  );
};

export default Login;
