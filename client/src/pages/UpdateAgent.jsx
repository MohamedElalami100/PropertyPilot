import React from "react";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import UpdateAgentForm from "../components/forms/UpdateAgent";

const UpdateAgent = ({ agent, openAlert, setOpenAlert }) => {
  console.log(agent);
  return (
    <Stack direction="column" width="100%" gap={3}>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        Edit Agent
      </Typography>
      <UpdateAgentForm
        agentData={agent}
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
      />
    </Stack>
  );
};

export default UpdateAgent;
