import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Posts = () => {
  const [data, setData] = useState(null);
  const [userInput, setUserInput] = useState({ title: "", body: "" });

  const useInputHandler = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const [cookies, setCookies, removeCookie] = useCookies();

  // 글쓰기 위해 권한을 위해 토큰 가져오기
  const getData = async () => {
    const res = await axios.get("http://localhost:8000/post", {
      headers: {
        Authorization: `Bearer ${cookies["accessToken"]}`,
      },
    });
    setData(res.data);
  };

  const postData = async () => {
    const res = await axios.post("http://localhost:8000/post", userInput, {
      headers: {
        Authorization: `Bearer ${cookies["accessToken"]}`,
      },
    });
    getData();
  };
  const deleteData = async (id) => {
    const res = await axios.delete(`http://localhost:8000/post/${id}`, {
      headers: {
        Authorization: `Bearer ${cookies["accessToken"]}`,
      },
    });
    getData();
  };
  const pustData = async (id) => {
    const res = await axios.put(`http://localhost:8000/post/${id}`, userInput, {
      headers: {
        Authorization: `Bearer ${cookies["accessToken"]}`,
      },
    });
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      Posts
      {data &&
        data.map((item) => (
          <div key={item.id}>
            <p>{item.body}</p>
            <button onClick={() => deleteData(item.id)}>글삭제</button>
            <button onClick={() => pustData(item.id)}>글수정</button>
          </div>
        ))}
      <input name="title" onChange={useInputHandler}></input>
      <input name="body" onChange={useInputHandler}></input>
      <button onClick={postData}>글쓰기</button>
    </div>
  );
};

export default Posts;
