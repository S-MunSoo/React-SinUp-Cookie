import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Register = () => {
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

  const goToSinup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/register",
        userInpiut
      );
      // response가 왔을때 쿠키를 저장해준다.
      // setCookies("쿠키 이름 키값" , 쿠키 데이터)
      // { path: "/" } : 쿠키를 설정해주는 경로
      setCookies("accessToken", response.data["accessToken"], { path: "/" });
      navigate("/post");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <input name="email" onChange={inputHandlerChange}></input>
      <input
        name="password"
        onChange={inputHandlerChange}
        type="password"
      ></input>
      <button onClick={goToSinup}>회원가입</button>
    </div>
  );
};

export default Register;
