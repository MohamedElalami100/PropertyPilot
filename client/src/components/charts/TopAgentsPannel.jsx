import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@material-ui/core/Button";
import TopAgents from "../agents/TopAgents";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  viewMoreButton: {
    color: "#555",
    border: "1px solid #555",
    backgroundColor: "transparent",
    padding: "8px 16px",
    borderRadius: "4px",
    transition: "background-color 0.3s, color 0.3s, border-color 0.3s",

    "&:hover": {
      backgroundColor: "#eee",
      color: "#333",
      borderColor: "#333",
    },
  },
}));

const TopAgentsPannel = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  return (
    <Box
      p={4}
      flex={1}
      bgcolor="#fcfcfc"
      id="chart"
      display="flex"
      flexDirection="column"
      borderRadius="15px"
      gap={2}
    >
      <Stack justifyContent={"space-between"} direction={"row"}>
        <Typography fontSize={18} fontWeight={600} color="#11142d">
          Top Agents
        </Typography>{" "}
        <Button
          className={classes.viewMoreButton}
          onClick={() => navigate("/agents")}
        >
          View All
        </Button>
      </Stack>

      <TopAgents />
    </Box>
  );
};

export default TopAgentsPannel;
