// components/templates/MainLayout.tsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../organisms/Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Determine if the current route should display the sidebar
  const isSidebarVisible = !["/login", "/register"].includes(location.pathname);

  return (
    <div>
      {isSidebarVisible && (
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleToggleSidebar}
            >
              <MenuIcon />
            </IconButton>
            {/* Add your other app bar components here */}
          </Toolbar>
        </AppBar>
      )}

      {isSidebarVisible && (
        <Sidebar open={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}

      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
