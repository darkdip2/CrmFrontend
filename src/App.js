import './App.css';
import Customer from './pages/Customer';
import Engineer from './pages/Engineer';
import Login from './pages/Login';
import Error from './pages/Error';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@coreui/coreui/dist/css/coreui.min.css";
import "@coreui/coreui/dist/js/coreui.min.js";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        l{/* ocalStorage.getItem("userType") === "CUSTOMER" &&  */}
        <Route path="/customer" element={<Customer/>} />
        <Route path='/engineer' element={<Engineer/>}/>
        <Route path="/error" element={<Error/>}/>
      </Routes>
    </Router>
  );
}

export default App;
