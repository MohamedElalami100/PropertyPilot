import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AgentDetails from "../components/agents/AgentDetails";

const Agent = ({ openAlert, setOpenAlert }) => {
  const { id } = useParams();
  const agents = useSelector((state) => state.agents);
  const agent = agents.filter((agent) => agent._id === id)[0];
  return (
    <AgentDetails
      agent={agent}
      openAlert={openAlert}
      setOpenAlert={setOpenAlert}
    />
  );
};

export default Agent;
