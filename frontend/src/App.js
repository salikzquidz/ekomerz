import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Slug from "./pages/Slug";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/product/:id" element={<Slug />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
