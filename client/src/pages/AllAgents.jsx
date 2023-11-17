import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/utils/SearchBar";
import AgentGrid from "../components/agents/AgentGrid";
import CustomButton from "../components/utils/CustomButton";
import { Stack } from "@mui/material";
import Add from "@mui/icons-material/Add";

const AllAgents = () => {
  const [search, setSearch] = useState("");

  return (
    <Stack direction="column" width="100%" gap={3}>
      <Stack
        gap={2}
        direction={{ sm: "column", md: "row", lg: "row" }}
        width="100%"
      >
        <SearchBar setSearch={setSearch} />
      </Stack>
      <AgentGrid search={search} />
    </Stack>
  );
};

export default AllAgents;
