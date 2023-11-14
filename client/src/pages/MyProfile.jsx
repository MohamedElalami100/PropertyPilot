import React from "react";
import Email from "@mui/icons-material/Email";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useGetIdentity } from "@refinedev/core";
import Avatar from "@mui/material/Avatar";

const MyProfile = ({ agent }) => {
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: true,
  });
  const showUserInfo = user && (user.name || user.avatar);
  // {showUserInfo && (
  //   <Stack direction="row" gap="16px" alignItems="center">
  //     {user.avatar && <Avatar src={user.avatar} alt={user.name} />}
  //     {user.name && (
  //       <Typography variant="subtitle2">{user.name}</Typography>
  //     )}
  //   </Stack>
  // )}

  if (showUserInfo) {
    return (
      <Box>
        <Typography fontSize={25} fontWeight={700} color="#11142D">
          My Profile
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
                {/* <img
                  src={
                    agent.profilePicture
                      ? agent.profilePicture
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                  }
                  width={78}
                  height={78}
                  alt="user_profile"
                  className="my_profile_user-img"
                /> */}
                {user.avatar && <Avatar src={user.avatar} alt={user.name} />}

                <Box
                  flex={1}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  gap="30px"
                >
                  <Stack direction="column">
                    <Typography fontSize={22} fontWeight={600} color="#11142D">
                      {user.name}
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
                            {user.email}
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
      </Box>
    );
  } else return <></>;
};

export default MyProfile;
