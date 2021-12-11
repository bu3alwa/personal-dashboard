import * as React from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SubjectIcon from '@mui/icons-material/Subject';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { grey } from '@mui/material/colors';
import ListIcon from '@mui/icons-material/List';

export const navItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon sx={{ color: grey[50]}}/>
            </ListItemIcon>
            <ListItemText primary="Dashboard"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <SubjectIcon sx={{ color: grey[50]}}/>
            </ListItemIcon>
            <ListItemText primary="News"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ListIcon sx={{ color: grey[50]}}/>
            </ListItemIcon>
            <ListItemText primary="Tasks"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <MonetizationOnIcon sx={{ color: grey[50]}}/>
            </ListItemIcon>
            <ListItemText primary="Markets"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <TwitterIcon sx={{ color: grey[50]}}/>
            </ListItemIcon>
            <ListItemText primary="Twitter"/>
        </ListItem>
    </div>
)