import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@mui/material/Typography";
import TopAgentsCard from "./TopAgentsCard";

const TopAgents = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  console.log(isLoading);

  let agents = useSelector((state) => state.users);

  const topAgents = agents
    .sort(
      (agent1, agent2) =>
        agent2.allProperties.length - agent1.allProperties.length
    )
    .slice(0, 5);

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
          <Grid container spacing={2}>
            {topAgents.map((agent) => (
              <Grid item xs={12} sm={12} md={12} lg={12} key={agent._id}>
                <TopAgentsCard agent={agent} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default TopAgents;
