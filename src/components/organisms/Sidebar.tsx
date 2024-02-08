// components/organisms/Sidebar.tsx
import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleToggleDrawer = () => {
    onClose();
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: open ? '240px' : '64px', 
        flexShrink: 0,
        whiteSpace: 'nowrap',
        '& .MuiDrawer-paper': {
          width: open ? '240px' : '64px', 
          overflowX: 'hidden',
          transition: 'width 0.2s',
        },
      }}
    >
      <div>
        <IconButton onClick={handleToggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <List>
        <ListItem button onClick={() => navigate('/blog')}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Blog" />}
        </ListItem>
        <ListItem button onClick={() => navigate('/denom')}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Denom Data" />}
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Logout" />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
