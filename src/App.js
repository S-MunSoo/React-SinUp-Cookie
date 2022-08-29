import Posts from "./components/Posts";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { useCookies } from "react-cookie";
]
function App() {
    const [cookie , setCookie , removeCookie] = useCookies()

  return (
    <BrowserRouter>
      <Link to="/login">Login</Link>
      <Link to="/post">Post</Link>
      <Link to="/register">Register</Link>
      <button onClick={()=> {
        removeCookie("accessToken")
        removeCookie("userId")
      }}>Logout</button>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/post" element={<Posts />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
