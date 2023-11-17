import React from "react";
import { useSelector } from "react-redux";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LocationCity from "@mui/icons-material/LocationCity";
import Phone from "@mui/icons-material/Phone";
import Place from "@mui/icons-material/Place";
import { useGetIdentity } from "@refinedev/core";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

// Component for rendering the information bars (e.g., Email, Location)
const InfoBar = ({ icon, name }) => (
  <Stack flex={1} minWidth={{ xs: "100%", sm: 300 }} gap={1.5} direction="row">
    {icon}
    <Typography fontSize={14} color="#808191">
      {name}
    </Typography>
  </Stack>
);

// Main AgentCard component
const AgentCard = ({ agent }) => {
  // Custom hook to get the current user's identity
  const { data: currentUser } = useGetIdentity({
    v3LegacyAuthProviderCompatible: true,
  });

  // Function to generate the link for the agent card based on the current user's email
  const generateLink = () => {
    if (currentUser.email === agent.email) return "/my-profile";
    return `/agents/show/${agent.email}`;
  };

  if (agent) {
    const allProperties = useSelector((state) => state.property);
    const agentPropreties = allProperties.filter(
      (prop) => agent.properties?.indexOf(prop._id) !== -1
    );

    return (
      <Box
        component={Link}
        to={generateLink()}
        width="100%"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: "20px",
          padding: "20px",
          textDecoration: "none", // Remove the underline from the link
          "&:hover": {
            boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
          },
        }}
      >
        {/* Agent's avatar */}
        <img
          src={
            agent.avatar
              ? agent.avatar
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
          }
          alt="user"
          width={90}
          height={90}
          style={{ borderRadius: 8, objectFit: "cover" }}
        />

        {/* Stack for displaying agent details */}
        <Stack
          direction="column"
          justifyContent="space-between"
          flex={1}
          gap={{ xs: 4, sm: 2 }}
        >
          {/* Agent's name and role */}
          <Stack gap={2} direction="row" flexWrap="wrap" alignItems="center">
            <Typography fontSize={22} fontWeight={600} color="#11142d">
              {agent.name}
            </Typography>
            <Typography fontSize={14} color="#808191">
              Real-Estate Agent
            </Typography>
          </Stack>

          {/* Information bars */}
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
          >
            {/* Email */}
            <InfoBar
              icon={<EmailOutlined sx={{ color: "#808191" }} />}
              name={agent.email}
            />

            {/* Number of properties */}
            <InfoBar
              icon={<LocationCity sx={{ color: "#808191" }} />}
              name={`${agentPropreties.length} Properties`}
            />
          </Stack>
        </Stack>
      </Box>
    );
  } else return <></>;
};

export default AgentCard;
