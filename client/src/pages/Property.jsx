import React from "react";
import { useSelector } from "react-redux";
import PropertyDetails from "../components/properties/PropertyDetails";
import { useParams } from "react-router-dom";

const Property = () => {
  const { id } = useParams();
  const properties = useSelector((state) => state.property);
  const property = properties.filter((prop) => prop._id === id)[0];
  return <PropertyDetails property={property} />;
};

export default Property;
