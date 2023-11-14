import React from "react";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import AddPropertyForm from "../components/forms/AddProperty";

const CreateProperty = () => {
  return (
    <Stack direction="column" width="100%" gap={3}>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        Create Property
      </Typography>
      <AddPropertyForm />
    </Stack>
  );
};

export default CreateProperty;
