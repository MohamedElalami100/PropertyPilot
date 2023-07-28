import React from "react";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import AddAgentForm from "../components/forms/AddAgent";

const CreateAgent = (openAlert, setOpenAlert) => {
  return (
    <Stack direction="column" width="100%" gap={3}>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        Create Agent
      </Typography>
      <AddAgentForm openAlert={openAlert} setOpenAlert={setOpenAlert} />
    </Stack>
  );
};

export default CreateAgent;
