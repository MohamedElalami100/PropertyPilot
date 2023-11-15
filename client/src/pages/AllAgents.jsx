import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/utils/SearchBar";
import AgentGrid from "../components/agents/AgentGrid";
import CustomButton from "../components/utils/CustomButton";
import { Stack } from "@mui/material";
import Add from "@mui/icons-material/Add";

const AllAgents = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  return (
    <Stack direction="column" width="100%" gap={3}>
      <Stack
        gap={2}
        direction={{ sm: "column", md: "row", lg: "row" }}
        width="100%"
      >
        <SearchBar setSearch={setSearch} />
        <CustomButton
          title="Become an Agent"
          handleClick={() => navigate("/agents/create")}
          backgroundColor="#475be8"
          color="#fcfcfc"
          icon={<Add />}
        />
      </Stack>
      <AgentGrid search={search} />
    </Stack>
  );
};

export default AllAgents;
