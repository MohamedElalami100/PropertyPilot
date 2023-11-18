import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import PropertyGrid from "../components/properties/PropertyGrid";
import PieChart from "../components/charts/PieChart";
import TopAgentsPannel from "../components/charts/TopAgentsPannel";
import { useSelector } from "react-redux";
import PropertyDistribtion from "../components/charts/PropertyDistribtion";

const Home = () => {
  //Cards data:
  const allProperties = useSelector((state) => state.property);
  const propertiesCount = allProperties.length;

  const propsForSale = allProperties.filter(
    (prop) => prop.status == "for sale"
  ).length;
  const propsForRentperM = allProperties.filter(
    (prop) => prop.status == "for rent (per month)"
  ).length;
  const propsForRentperD = allProperties.filter(
    (prop) => prop.status == "for rent (per day)"
  ).length;

  const allAgents = useSelector((state) => state.users);
  const agentsCount = allAgents.length;

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>

      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Properties for Sale"
          value={propsForSale}
          series={[propsForSale, propertiesCount - propsForSale]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Properties for Rent (per month)"
          value={propsForRentperM}
          series={[propsForRentperM, propertiesCount - propsForRentperM]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Properties for Rent (per day)"
          value={propsForRentperD}
          series={[propsForRentperD, propertiesCount - propsForRentperD]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Total Agents"
          value={agentsCount}
          series={[100, 0]}
          colors={["#275be8", "#c4e8ef"]}
        />
      </Box>

      <Stack
        mt="25px"
        width="100%"
        direction={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <TopAgentsPannel />
        <PropertyDistribtion />
      </Stack>

      <Box
        flex={1}
        borderRadius="15px"
        padding="20px"
        bgcolor="#fcfcfc"
        display="flex"
        flexDirection="column"
        minWidth="100%"
        mt="25px"
      >
        <PropertyGrid />
      </Box>
    </Box>
  );
};

export default Home;
