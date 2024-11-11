import { HomeScreen } from "./components/HomeScreen";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/HomeScreen" element={<HomeScreen />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
