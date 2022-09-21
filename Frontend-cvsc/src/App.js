import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import ReactGA from "react-ga";

// const TRACKING_ID = "G-HJ09JG5T5X";
// ReactGA.initialize(TRACKING_ID);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
