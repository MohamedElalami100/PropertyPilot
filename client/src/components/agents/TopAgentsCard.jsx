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
import { Avatar } from "@material-ui/core";

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
const TopAgentsCard = ({ agent }) => {
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
      (prop) => prop.creator == agent.email
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
          padding: "5px",
          textDecoration: "none",
          "&:hover": {
            boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
          },
        }}
      >
        {/* Agent's avatar */}
        <Stack justifyContent="center" alignItems="center">
          {agent.avatar && <Avatar src={agent.avatar} alt={agent.name} />}
        </Stack>
        {/* Stack for displaying agent details */}
        <Stack
          direction="column"
          justifyContent="space-between"
          flex={1}
          gap={{ xs: 1, sm: 0.5 }}
        >
          {/* Agent's name and role */}
          <Stack gap={2} direction="row" flexWrap="wrap" alignItems="center">
            <Typography fontSize={16} fontWeight={600} color="#11142d">
              {agent.name}
            </Typography>
            <Typography fontSize={10} color="#808191">
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

export default TopAgentsCard;
