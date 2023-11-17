import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AgentDetails from "../components/agents/AgentDetails";

const Agent = () => {
  const { id } = useParams();
  const agents = useSelector((state) => state.users);
  const agent = agents?.filter((agent) => agent.email === id)[0];
  console.log(agent);
  return <AgentDetails agent={agent} />;
};

export default Agent;
