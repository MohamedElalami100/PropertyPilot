import React from "react";
import Place from "@mui/icons-material/Place";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";

const PropertyCard = ({ property, openAlert, setOpenAlert }) => {
  return (
    <Card
      component={Link}
      to={`/properties/show/${property._id}`}
      sx={{
        maxWidth: "330px",
        padding: "10px",
        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
        },
        textDecoration: "none",
        cursor: "pointer",
      }}
      elevation={0}
    >
      <CardMedia
        component="img"
        width="100%"
        height={210}
        image={property.images[0]}
        // srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
        alt="card image"
        sx={{ borderRadius: "10px" }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "10px",
          paddingX: "5px",
        }}
      >
        <Stack direction="column" gap={1}>
          <Typography fontSize={16} fontWeight={500} color="#11142d">
            {property.title}
          </Typography>
          <Stack direction="row" gap={0.5} alignItems="flex-start">
            <Place
              sx={{
                fontSize: 18,
                color: "#11142d",
                marginTop: 0.5,
              }}
            />
            <Typography fontSize={14} color="#808191">
              {property.location}
            </Typography>
          </Stack>
        </Stack>
        <Box
          px={1.5}
          py={0.5}
          borderRadius={1}
          bgcolor="#dadefa"
          height="fit-content"
        >
          <Typography fontSize={12} fontWeight={600} color="#475be8">
            ${property.price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
