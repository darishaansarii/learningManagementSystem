import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  Menu,
  MenuItem,
  Collapse,
  useMediaQuery,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import SchoolIcon from '@mui/icons-material/School';
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

const navLinks = [
  {
    text: "Students",
    children: [
      { label: "Add Student", path: "/addstudent" },
      { label: "View Students", path: "/viewstudent" },
      { label: "Transfer Students", path: "/transferstudent" }
    ],
  },
  {
    text: "Teacher",
    children: ["Add Teacher", "View Teachers", "Teacher Allocation"],
    children: [
      { label: "Add Teacher", path: "/addteacher" },
      { label: "View Teachers", path: "/viewteacher" },
      { label: "Teacher Allocation", path: "/teacherallocation" },
    ],
  },
  {
    text: "Subjects",
    children: ["Add Subject", "View Subjects"],
    children: [
      { label: "Add Subject", path: "/addsubject" },
      { label: "View Subjects", path: "/viewsubject" },
    ],
  },
  {
    text: "School",
    children: ["Registration", "View Registration"],
    children: [
      { label: "Registration", path: "/schoolregistration" },
      { label: "View Registration", path: "/viewschool" },
    ],
  },
  {
    text: "Syllabus",
    children: ["Create Syllabus", "Syllabus List"],
    children: [
      { label: "Create Syllabus", path: "/createsyllabus" },
      { label: "Syllabus List", path: "/syllabuslist" },
    ],
  },
  {
    text: "Class",
    children: ["Register Class", "All Classes"],
    children: [
      { label: "Register Class", path: "/registerclass" },
      { label: "All Classes", path: "/allclass" },
    ],
  },
  {
    text: "Fees",
    children: ["Fee Structure", "Fee Submission", "Fee Vouchers"],
    children: [
      { label: "Fee Structure", path: "/feestructure" },
      { label: "Fee Submission", path: "/feesubmission" },
      { label: "Fee Vouchers", path: "/feevoucher" },
    ],
  },
  {
    text: "Admission",
    children: ["Create Admission", "View Admission"],
    children: [
      { label: "Create Admission", path: "/createadmission" },
      { label: "View Admission", path: "/viewadmission" },
    ],
  },
  {
    text: "Exam",
    children: [
      { label: "Exam Schedule", path: "/examschedule" },
      { label: "Exam Results", path: "/examresult" },
    ],
  },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:550px)");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenus, setOpenMenus] = useState({}); 

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const handleUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userData");
    navigate("/");
  };

  const handleParentClick = (text) => {
    setOpenMenus((prev) => ({
      ...prev,
      [text]: !prev[text],
    }));
  };

  const renderMenuItems = () =>
    navLinks.map(({ text, children }) => (
      <React.Fragment key={text}>
        <ListItem
          button
          onClick={() => handleParentClick(text)}
          sx={{ fontWeight: "bold" }}
        >
          <ListItemText
            primaryTypographyProps={{ fontWeight: "bold" }}
            primary={text}
          />
          {children && (openMenus[text] ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
  
        {children && (
          <Collapse in={openMenus[text]} timeout="auto" unmountOnExit>
            <List sx={{ pl: 4 }}>
              {children.map((child) => (
                <ListItem
                  button
                  key={child.label}
                  onClick={() => {
                    toggleDrawer(false);
                    navigate(child.path);
                  }}
                >
                  <ListItemText primary={child.label} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ));
  
  return (
    <Box sx={{ display: "flex" }}>
      {isMobile ? (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => toggleDrawer(false)}
          PaperProps={{ sx: { width: 200 } }}
        >
          <List className={styles.sidebar}>
            <Typography
              variant="h5"
              className={styles.logo}
            >
              <SchoolIcon sx={{fontSize: "35px"}} /> LMS
            </Typography>
            {renderMenuItems()}
          </List>
        </Drawer>
      ) : (
        <Box className={styles.sidebar}>
          <Typography
            variant="h5"
            title="Learning Management System"
            className={styles.logo}
          >
            <SchoolIcon sx={{fontSize: "35px"}} /> LMS
          </Typography>
          <List>{renderMenuItems()}</List>
        </Box>
      )}

      <AppBar
        position="fixed"
        className={styles.appbar}
        sx={{
          ml: isMobile ? 0 : 200,
          width: isMobile ? "100%" : "calc(100% - 200px)",
        }}
      >
        <Toolbar className={styles.toolbar}>
          {isMobile && (
            <IconButton
              onClick={() => toggleDrawer(true)}
              className={styles.iconBtn}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box />

          <IconButton onClick={handleUserMenu} className={styles.iconBtn}>
            <AccountCircle style={{ color: "#009e97" }} fontSize="large" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

