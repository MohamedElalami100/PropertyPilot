import React from "react";
import { Box, Card, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import AddPropertyForm from "../components/forms/AddProperty";

const CreateProperty = () => {
  return (
    <Box>
      <Stack direction="column" gap={2}>
        <Typography
          style={{
            fontSize: 25,
            fontWeight: 700,
            color: "#11142d",
            marginLeft: 40,
          }}
        >
          Create Property
        </Typography>
        <Card sx={{ padding: 2, borderRadius: 2 }}>
          <AddPropertyForm />
        </Card>
      </Stack>
    </Box>
  );
};

export default CreateProperty;
