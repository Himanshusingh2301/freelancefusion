import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ClientDashboard from "./pages/ClientDashboard";
import ClientEditProfile from "./pages/ClientEditProfile";
function App() {
  return (
    <div>
      
      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/client-edit-profile" element={<ClientEditProfile/>}/>
      </Routes>
    </div>
  );
}

export default App;
