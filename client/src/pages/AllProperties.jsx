import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/utils/SearchBar";
import PropertyGrid from "../components/properties/PropertyGrid";
import CustomButton from "../components/utils/CustomButton";
import { Stack } from "@mui/material";
import Add from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import { Select, MenuItem, Card } from "@material-ui/core";

const AllProperties = () => {
  const [search, setSearch] = useState("");
  const [priceOrder, setPriceOrder] = useState(2);
  const [filterValue, setFilterValue] = useState("");

  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Stack direction="column" width="100%">
          <Box
            mb={2}
            mt={3}
            display="flex"
            width="84%"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Box
              display="flex"
              gap={2}
              flexWrap="wrap"
              mb={{ xs: "20px", sm: 0 }}
            >
              <SearchBar setSearch={setSearch} />
              <CustomButton
                title={`Sort price ${!priceOrder == false ? "↑" : "↓"}`}
                handleClick={() => setPriceOrder(!priceOrder)}
                backgroundColor="#475be8"
                color="#fcfcfc"
              />
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue=""
                onChange={(e) => setFilterValue(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {[
                  "Apartment",
                  "Villa",
                  "Farmhouse",
                  "Condos",
                  "Townhouse",
                  "Duplex",
                  "Studio",
                  "Chalet",
                ].map((type) => (
                  <MenuItem key={type} value={type.toLowerCase()}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Stack>
      </Box>
      <Card sx={{ padding: 20 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ padding: 2 }}
        >
          <CustomButton
            title="Add Property"
            handleClick={() => navigate("/properties/create")}
            backgroundColor="#475be8"
            color="#fcfcfc"
            icon={<Add />}
          />
        </Stack>
        <Stack sx={{ padding: 2 }}>
          <PropertyGrid
            search={search}
            priceOrder={priceOrder}
            filterValue={filterValue}
          />
        </Stack>
      </Card>
    </Box>
  );
};

export default AllProperties;
