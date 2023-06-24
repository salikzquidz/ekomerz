import { Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import Home from "./pages/Home";
import Slug from "./pages/Slug";

function App() {
  return (
    <Routes>
      <Route path="/" Component={Home}></Route>
      <Route path="/product/:id" Component={Slug}></Route>
    </Routes>
  );
}

export default App;
