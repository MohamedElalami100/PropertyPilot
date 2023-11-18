import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  colorsList,
  typesList,
} from "../../constants/propertyDistributionInfo";
import { useSelector } from "react-redux";

const ProgressBar = ({ title, percentage, color }) => (
  <Box width="100%">
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography fontSize={16} fontWeight={500} color="#11142d">
        {title}
      </Typography>
      <Typography fontSize={16} fontWeight={500} color="#11142d">
        {percentage}%
      </Typography>
    </Stack>
    <Box
      mt={2}
      position="relative"
      width="100%"
      height="8px"
      borderRadius={1}
      bgcolor="#e4e8ef"
    >
      <Box
        width={`${percentage}%`}
        bgcolor={color}
        position="absolute"
        height="100%"
        borderRadius={1}
      />
    </Box>
  </Box>
);

const PropertyDistribtion = () => {
  const allProperties = useSelector((state) => state.property);
  const propertiesCount = allProperties.length;

  //properties distrition by type data:
  const propsByTypeCount = [];
  let i = 0;
  let othersCount = 0;
  typesList.forEach((type) => {
    if (i < 4) {
      propsByTypeCount.push({
        title: type,
        percentage: Math.round(
          (allProperties.filter((prop) => prop.type == type.toLowerCase())
            .length *
            100) /
            (propertiesCount != 0 ? propertiesCount : 1)
        ),
        color: colorsList[i],
      });
    } else {
      othersCount += Math.round(
        (allProperties.filter((prop) => prop.type == type.toLowerCase())
          .length *
          100) /
          (propertiesCount != 0 ? propertiesCount : 1)
      );
    }
    i += 1;
  });
  propsByTypeCount.push({
    title: "Others",
    percentage: othersCount,
    color: colorsList[colorsList.length - 1],
  });

  return (
    <Box
      p={4}
      bgcolor="#fcfcfc"
      id="chart"
      minWidth={490}
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      <Typography fontSize={18} fontWeight={600} color="#11142d">
        Property Distribution By Types
      </Typography>

      <Stack my="20px" direction="column" gap={4}>
        {propsByTypeCount.map((bar) => (
          <ProgressBar
            key={bar.title}
            title={bar.title}
            percentage={bar.percentage}
            color={bar.color}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default PropertyDistribtion;
