import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropertyCard from "./PropertyCard";
import Typography from "@mui/material/Typography";

const PropertyGrid = ({
  props = null,
  search = "",
  priceOrder = 2,
  filterValue = "",
}) => {
  let properties = useSelector((state) => state.property);
  let filteredProperties = properties;
  let headText = "All Properties";

  if (props !== null) {
    properties = props;
  } else {
    // handling serachBar
    if (search.length !== 0) {
      filteredProperties = filteredProperties.filter((prop) =>
        prop.title.toLowerCase().includes(search.toLowerCase())
      );
      headText = "Properties Searched By(" + search + ") ";
    }
    //Handling soort By Price
    if (priceOrder == false) {
      //asc order
      filteredProperties = filteredProperties.sort((a, b) => a.price - b.price);
    } else if (priceOrder == true) {
      //des oreder
      filteredProperties = filteredProperties.sort((a, b) => b.price - a.price);
    }
    // Handling filter By property type
    filteredProperties = filteredProperties.filter(
      (prop) => filterValue == "" || prop.type == filterValue
    );
    if (filterValue != "") {
      headText += " of Type " + filterValue;
    }

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
              : headText}
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
