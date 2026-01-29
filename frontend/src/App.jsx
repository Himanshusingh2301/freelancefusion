import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import RouteLoader from "./components/RouteLoader";
import { Toaster } from "react-hot-toast";
import ClientDashboard from "./pages/ClientDashboard";
import EditProfile from "./pages/EditProfile";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import ClientPostProject from "./pages/ClientPostProject";
import ClientProjectsList from "./pages/ClientProjectsList";
import EditProject from "./pages/EditProject";
import PostFreelancer from "./pages/PostFreelancer";
import ActiveProjectList from "./pages/ActiveProjectList";
function App() {

  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2600,

          // BASE STYLE — dark metallic
          style: {
            background: "linear-gradient(145deg, #0f0f0f, #1a1a1a)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#e8e8e8",
            padding: "14px 20px",
            borderRadius: "12px",
            backdropFilter: "blur(6px)",
            boxShadow: `
        4px 4px 12px rgba(0,0,0,0.6),
        -4px -4px 12px rgba(32,32,32,0.6),
        inset 0 0 12px rgba(255,255,255,0.03)
      `,
            fontSize: "15px",
            fontWeight: 500,
            letterSpacing: "0.4px",
          },

          // SUCCESS — subtle green metallic glow
          success: {
            iconTheme: {
              primary: "#00ca85",
              secondary: "#121212",
            },
            style: {
              border: "1px solid rgba(0,255,170,0.2)",
              boxShadow: `
          0 0 14px rgba(0,255,170,0.18),
          inset 0 0 8px rgba(0,255,170,0.05)
        `,
            },
          },

          // ERROR — deep red metallic glow
          error: {
            iconTheme: {
              primary: "#ff3b3b",
              secondary: "#121212",
            },
            style: {
              border: "1px solid rgba(255,70,70,0.2)",
              boxShadow: `
          0 0 14px rgba(255,70,70,0.18),
          inset 0 0 8px rgba(255,70,70,0.05)
        `,
            },
          },
        }}
      />
      <RouteLoader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
        <Route path="/client-dashboard/post-project" element={<ClientPostProject />} />
        <Route path="/client-dashboard/projects-list" element={<ClientProjectsList />} />
        <Route path="/edit-project/:id" element={<EditProject />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/freelancer/apply" element = {<PostFreelancer/>} />
        <Route path="/freelancer/find-projects" element={<ActiveProjectList/>} />
      </Routes>
    </div>
  );
}

export default App;
