import React from "react";
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import UpdatePropertyForm from "../components/forms/UpdateProperty";
import { useParams } from "react-router-dom";

const UpdateProperty = () => {
  const { id } = useParams();
  const properties = useSelector((state) => state.property);
  const property = properties.filter((prop) => prop._id === id)[0];
  return (
    <Stack direction="column" width="100%" gap={3}>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        Edit Property
      </Typography>
      <UpdatePropertyForm property={property} />
    </Stack>
  );
};

export default UpdateProperty;
