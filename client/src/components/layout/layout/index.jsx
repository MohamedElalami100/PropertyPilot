import React from "react";
import Box from "@mui/material/Box";

import DefaultSider from "../sider";
import DefaultHeader from "../header";

const Layout = ({ Sider, Header, Footer, OffLayoutArea, children }) => {
  const SiderToRender = Sider || DefaultSider;
  const HeaderToRender = Header || DefaultHeader;

  return (
    <Box display="flex" flexDirection="row">
      <SiderToRender />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: "100vh",
        }}
      >
        <HeaderToRender />
        <Box
          component="main"
          sx={{
            p: { xs: 1, md: 2, lg: 3 },
            flexGrow: 1,
            bgcolor: (theme) => theme.palette.background.default,
          }}
        >
          {children}
        </Box>
        {Footer && <Footer />}
      </Box>
      {OffLayoutArea && <OffLayoutArea />}
    </Box>
  );
};

export default Layout;
