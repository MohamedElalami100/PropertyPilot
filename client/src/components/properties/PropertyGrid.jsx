import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropertyCard from "./PropertyCard";
import Typography from "@mui/material/Typography";

const PropertyGrid = ({ props = null, search = "" }) => {
  let properties = useSelector((state) => state.property);
  console.log(properties);

  if (props !== null) {
    properties = props;
  } else if (search.length !== 0) {
    const filteredProperties = properties.filter((prop) =>
      prop.title.toLowerCase().includes(search.toLowerCase())
    );
    properties = filteredProperties;
  }

  console.log(properties);

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  console.log(isLoading);

  return (
    <div>
      {!properties.length && isLoading ? (
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
            {!properties.length && !isLoading
              ? "There are no properties"
              : "All Properties"}
          </Typography>
          <Grid container spacing={2}>
            {properties.map((property) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={property._id}>
                <PropertyCard property={property} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default PropertyGrid;
