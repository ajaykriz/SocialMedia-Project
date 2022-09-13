import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Signup from "./pages/Signup";
import Admin from "./pages/admin";
import Home from "./Home";
function App() {
  return (
    <>
      <Router>
        {/* <div className='container' > */}

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        {/* </div> */}
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
