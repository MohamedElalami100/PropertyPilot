// import { useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { getProperties } from "./actions/property";
// import AddAgentForm from "./components/forms/AddAgent";
// import AgentGrid from "./components/agents/AgentGrid";
// import { getAgents } from "./actions/agent";
// import PropertyGrid from "./components/properties/PropertyGrid";
// import AllProperties from "./pages/AllProperties";
// import AllAgents from "./pages/AllAgents";
// import CreateProperty from "./pages/CreateProperty";
// import CreateAgent from "./pages/CreateAgent";
// import UpdateProperty from "./pages/UpdateProperty";
// import { useSelector } from "react-redux";
// import UpdateAgent from "./pages/UpdateAgent";
// import Home from "./pages/Home";
// import Agent from "./pages/Agent";
// import Property from "./pages/Property";

// const App = () => {
//   const dispatch = useDispatch();

//   const [openAlert, setOpenAlert] = useState(false);

//   const properties = useSelector((state) => state.property);
//   const agents = useSelector((state) => state.agents);

//   console.log(agents);

//   useEffect(() => {
//     dispatch(getProperties());
//     dispatch(getAgents());
//   }, [dispatch, openAlert]);

//   return (
//     <>
//       {/* <PropertyGrid openAlert={openAlert} setOpenAlert={setOpenAlert} /> */}
//       <AllProperties openAlert={openAlert} setOpenAlert={setOpenAlert} />
//       <AllAgents openAlert={openAlert} setOpenAlert={setOpenAlert} />
//       <CreateProperty openAlert={openAlert} setOpenAlert={setOpenAlert} />
//       <CreateAgent openAlert={openAlert} setOpenAlert={setOpenAlert} />
//       <UpdateProperty
//         property={properties[0]}
//         openAlert={openAlert}
//         setOpenAlert={setOpenAlert}
//       />
//       <UpdateAgent
//         agent={agents[0]}
//         openAlert={openAlert}
//         setOpenAlert={setOpenAlert}
//       />
//       <Home openAlert={openAlert} setOpenAlert={setOpenAlert} />
//       <Agent
//         agent={agents[0]}
//         openAlert={openAlert}
//         setOpenAlert={setOpenAlert}
//       />
//       <Property
//         property={properties[0]}
//         openAlert={openAlert}
//         setOpenAlert={setOpenAlert}
//       />
//     </>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as api from "./api";
import { Refine } from "@refinedev/core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  ReadyPage,
  ErrorComponent,
} from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import StarOutlineRounded from "@mui/icons-material/StarOutlineRounded";
import VillaOutlined from "@mui/icons-material/VillaOutlined";

import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";
import axios from "axios";
import { Title } from "./components/layout/title";
import Sider from "./components/layout/sider";
import Layout from "./components/layout/layout";
import Header from "./components/layout/header";
import { ColorModeContextProvider } from "./contexts";
import parseJwt from "./utils/parse-jwt";

import { Login } from "./pages/Login";
import Home from "./pages/Home";
import AllAgents from "./pages/AllAgents";
import MyProfile from "./pages/MyProfile";
import Property from "./pages/Property";
import AllProperties from "./pages/AllProperties";
import CreateProperty from "./pages/CreateProperty";
import CreateAgent from "./pages/CreateAgent";
import UpdateAgent from "./pages/UpdateAgent";
import Agent from "./pages/Agent";
import UpdateProperty from "./pages/UpdateProperty";

import { getAgents } from "./actions/agent";
import { getProperties } from "./actions/property";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const dispatch = useDispatch();

  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    dispatch(getProperties());
    dispatch(getAgents());
  }, [dispatch, openAlert]);

  const authProvider = {
    login: async ({ credential }) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        const response = await api.addUser({
          name: profileObj.name,
          email: profileObj.email,
          avatar: profileObj.picture,
        });

        const data = response.data;

        if (response.status === 200) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid: data._id,
            })
          );
        } else {
          return Promise.reject();
        }
      }
      localStorage.setItem("token", `${credential}`);

      return Promise.resolve();
    },
    logout: () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve();
        });
      }

      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    getPermissions: async () => null,
    getUserIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
    },
  };

  return (
    <ColorModeContextProvider>
      {/* <GitHubBanner /> */}
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider("http://localhost:5000")}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "properties",
              list: AllProperties,
              show: Property,
              create: CreateProperty,
              edit: UpdateProperty,
              icon: <VillaOutlined />,
            },
            {
              name: "agents",
              list: AllAgents,
              show: Agent,
              create: CreateAgent,
              edit: UpdateAgent,
              icon: <PeopleAltOutlined />,
            },
            {
              name: "my-profile",
              options: { label: "My Profile " },
              list: MyProfile,
              icon: <AccountCircleOutlined />,
            },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          legacyRouterProvider={routerProvider}
          legacyAuthProvider={authProvider}
          LoginPage={Login}
          DashboardPage={Home}
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;
