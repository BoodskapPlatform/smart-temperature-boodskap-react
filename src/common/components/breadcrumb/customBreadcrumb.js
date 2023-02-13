import React from 'react';
import { Breadcrumbs, Typography, Link } from '@mui/material';
import './customBreadcrumb.css'
import { useLocation } from 'react-router-dom';
import { NavigateNext } from '@mui/icons-material';


const CustomBreadcrumb = () => {
  const location = useLocation()

  const appRoutes = {
    "domain-management": "Domain Management",
    "domain-details": "Domain Details",
    "user-management": "User Management",
  }


  const breadcumbObj = location.pathname.split("/")
  const breadcrumbs = (breadcumbObj.length > 2) ? (breadcumbObj.map((key, index) => {
    if (key) {
      return (
        (breadcumbObj.length === (index + 1)) ? <Typography sx={{ fontSize: "13px" }} key={index}>{appRoutes[key]}</Typography> : <Link key={index} color="inherit" className="breadcumb-list" sx={{ fontSize: "13px" }} underline="hover" href={"/" + key}>{appRoutes[key]}</Link>
      )
    }
  })
  ) : null

  return <Breadcrumbs separator={<NavigateNext fontSize="small" />}>{breadcrumbs}</Breadcrumbs>
};

export default CustomBreadcrumb;
