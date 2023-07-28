import React from "react";
import { useSelector } from "react-redux";
import PropertyDetails from "../components/properties/PropertyDetails";
import { useParams } from "react-router-dom";

const Property = (openAlert, setOpenAlert) => {
  const { id } = useParams();
  const properties = useSelector((state) => state.property);
  const property = properties.filter((prop) => prop._id === id)[0];
  return (
    <PropertyDetails
      property={property}
      openAlert={openAlert}
      setOpenAlert={setOpenAlert}
    />
  );
};

export default Property;
