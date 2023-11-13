import React from "react";
import { Box, Typography } from "@mui/material";
import BedroomIcon from "@mui/icons-material/Hotel";
import BathroomIcon from "@mui/icons-material/Bathtub";
import AreaIcon from "@mui/icons-material/SquareFoot";

const PropertyInfo = ({ bedrooms, bathrooms, area }) => {
  return (
    <Box display="flex" alignItems="center">
      <Box display="flex" alignItems="center" mr={2}>
        <BedroomIcon fontSize="small" color="gray" />
        <Typography variant="h6" color="gray" component="span" ml={1}>
          {bedrooms}
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" mr={2}>
        <BathroomIcon fontSize="small" color="gray" />
        <Typography variant="h6" color="gray" component="span" ml={1}>
          {bathrooms}
        </Typography>
      </Box>

      <Box display="flex" alignItems="center">
        <AreaIcon fontSize="small" color="gray" />
        <Typography variant="h6" color="gray" component="span" ml={1}>
          {area}
        </Typography>
        <Typography variant="p" color="gray" component="span" ml={1}>
          sq m
        </Typography>
      </Box>
    </Box>
  );
};

export default PropertyInfo;
