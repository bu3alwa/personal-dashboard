import * as React from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SubjectIcon from '@mui/icons-material/Subject';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import TwitterIcon from '@mui/icons-material/Twitter';
import { grey } from '@mui/material/colors';
import ListIcon from '@mui/icons-material/List';
import Link from '@mui/material/Link';

/**
 * Sidebar navigation items
 */
const NavItems: React.FC = () => {
  const text = {
    color: 'white',
  };
  return (
    <>
      <div>
        <Link href="/">
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon sx={{ color: grey[50] }} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ style: text }} primary="Dashboard" />
          </ListItem>
        </Link>
        <Link href="/news">
          <ListItem button>
            <ListItemIcon>
              <SubjectIcon sx={{ color: grey[50] }} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ style: text }} primary="News" />
          </ListItem>
        </Link>
        <Link href="/tasks">
          <ListItem button>
            <ListItemIcon>
              <ListIcon sx={{ color: grey[50] }} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ style: text }} primary="Tasks" />
          </ListItem>
        </Link>
        <Link href="/markets">
          <ListItem button>
            <ListItemIcon>
              <MonetizationOnIcon sx={{ color: grey[50] }} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ style: text }} primary="Markets" />
          </ListItem>
        </Link>
        {/* <ListItem button>
      <ListItemIcon>
        <TwitterIcon sx={{ color: grey[50] }} />
      </ListItemIcon>
      <ListItemText primary="Twitter" />
    </ListItem> */}
      </div>
    </>
  );
};

export default NavItems;
