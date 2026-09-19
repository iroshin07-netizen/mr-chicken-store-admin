import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import MenuAvailability from "./pages/MenuAvailability";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { useRealtimeTable } from "./hooks/useRealtimeTable";
import { sampleOrders, sampleMenu } from "./data/sampleData";

function Shell() {
  const { session, loading, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const { rows: orders, setRows: setOrders, connected: oc } = useRealtimeTable("orders", sampleOrders);
  const { rows: menu, setRows: setMenu, connected: mc } = useRealtimeTable("menu_items", sampleMenu);

  if (loading) return <div className="loading-screen"><div className="loader-logo">MC</div><p>Opening Store Admin…</p></div>;
  if (!session) return <Login />;

  return (
    <div className={`app-shell ${open ? "nav-open" : ""}`}>
      
      {/* 🔴 1. MOBILE OVERLAY: Bahar (background) touch karne par sidebar band hoga */}
      {open && (
        <div 
          className="sidebar-overlay md:hidden" 
          onClick={() => setOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(0,0,0,0.5)" }} 
        />
      )}

      {/* 🔴 2. SIDEBAR UPDATE: Yahan onClose prop pass kiya gaya hai */}
      <Sidebar onLogout={signOut} onClose={() => setOpen(false)} />
      
      <main className="main">
        <Topbar 
          title={({ "/": "Orders", "/menu": "Menu Availability", "/history": "Order History", "/settings": "Profile & Settings" })[loc.pathname] || "Store Admin"} 
          connected={oc && mc} 
          onMenu={() => setOpen(v => !v)} 
        />
        <div className="content">
          <Routes>
            <Route path="/" element={<Orders connected={oc} orders={orders} setOrders={setOrders} />} />
            <Route path="/menu" element={<MenuAvailability menu={menu} setMenu={setMenu} />} />
            <Route path="/history" element={<History orders={orders} />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return <AuthProvider><Shell /></AuthProvider>;
}
