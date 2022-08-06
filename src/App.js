import React from "react";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import Detail from "./pages/Detail";
import styled from "styled-components";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/add" element={<Detail />}></Route>
      <Route path="/detail/:id" element={<Detail />}></Route>
    </Routes>
  );
}

export default App;
