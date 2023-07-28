import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@mui/material/Typography";
import AgentCard from "./AgentCard";
import UpdateAgentForm from "../forms/UpdateAgent";
import AgentDetails from "./AgentDetails";

const AgentGrid = ({ openAlert, setOpenAlert, search = "" }) => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  console.log(isLoading);

  let agents = useSelector((state) => state.agents);

  if (search.length !== 0) {
    const filteredAgents = agents.filter((agent) =>
      agent.name.toLowerCase().includes(search.toLowerCase())
    );
    agents = filteredAgents;
  }

  return (
    <div>
      {agents.length && isLoading === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            {!agents.length && !isLoading
              ? "There are no Agents"
              : "All Agents"}
          </Typography>
          <Grid container spacing={2}>
            {agents.map((agent) => (
              <Grid item xs={12} sm={12} md={12} lg={12} key={agent._id}>
                <AgentCard
                  agent={agent}
                  openAlert={openAlert}
                  setOpenAlert={setOpenAlert}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default AgentGrid;
