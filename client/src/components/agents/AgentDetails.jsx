import React from "react";
import Email from "@mui/icons-material/Email";
import Phone from "@mui/icons-material/Phone";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import PropertyCard from "../properties/PropertyCard";

const AgentDetails = ({ agent, openAlert, setOpenAlert }) => {
  const allProperties = useSelector((state) => state.property);

  if (agent) {
    const agentPropreties = allProperties.filter(
      (prop) => agent.properties.indexOf(prop._id) !== -1
    );
    return (
      <Box>
        <Typography fontSize={25} fontWeight={700} color="#11142D">
          Profile
        </Typography>

        <Box mt="20px" borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2.5,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
              width={340}
              height={320}
              alt="abstract"
              className="my_profile-bg"
            />
            <Box
              flex={1}
              sx={{
                marginTop: { md: "58px" },
                marginLeft: { xs: "20px", md: "0px" },
              }}
            >
              <Box
                flex={1}
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                gap="20px"
              >
                <img
                  src={
                    agent.profilePicture
                      ? agent.profilePicture
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                  }
                  width={78}
                  height={78}
                  alt="user_profile"
                  className="my_profile_user-img"
                />

                <Box
                  flex={1}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  gap="30px"
                >
                  <Stack direction="column">
                    <Typography fontSize={22} fontWeight={600} color="#11142D">
                      {agent.name}
                    </Typography>
                    <Typography fontSize={16} color="#808191">
                      Realestate Agent
                    </Typography>
                  </Stack>

                  <Stack direction="column" gap="30px">
                    <Stack direction="row" flexWrap="wrap" gap="20px" pb={4}>
                      <Stack flex={1} gap="15px">
                        <Typography
                          fontSize={14}
                          fontWeight={500}
                          color="#808191"
                        >
                          Phone Number
                        </Typography>
                        <Box
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                          gap="10px"
                        >
                          <Phone sx={{ color: "#11142D" }} />
                          <Typography fontSize={14} color="#11142D" noWrap>
                            {agent.phone}
                          </Typography>
                        </Box>
                      </Stack>

                      <Stack flex={1} gap="15px">
                        <Typography
                          fontSize={14}
                          fontWeight={500}
                          color="#808191"
                        >
                          Email
                        </Typography>
                        <Box
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                          gap="10px"
                        >
                          <Email sx={{ color: "#11142D" }} />
                          <Typography fontSize={14} color="#11142D">
                            {agent.email}
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {agentPropreties.length > 0 && (
          <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
            <Typography fontSize={18} fontWeight={600} color="#11142D">
              Properties
            </Typography>

            <Box
              mt={2.5}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2.5,
              }}
            >
              {agentPropreties?.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  openAlert={openAlert}
                  setOpenAlert={setOpenAlert}
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    );
  } else return <></>;
};

export default AgentDetails;
