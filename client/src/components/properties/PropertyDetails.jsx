import { useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useDelete, useGetIdentity, useShow } from "@refinedev/core";
import { useParams, useNavigate } from "react-router-dom";
import ChatBubble from "@mui/icons-material/ChatBubble";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Phone from "@mui/icons-material/Phone";
import Place from "@mui/icons-material/Place";
import Typography from "@mui/material/Typography";
import Star from "@mui/icons-material/Star";
import CustomButton from "../utils/CustomButton";
import { deleteProperty } from "../../actions/property";
import { useDispatch } from "react-redux";
import { getProperties } from "../../actions/property";

const PropertyDetails = ({ property, openAlert, setOpenAlert }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleDeleteProperty = (id) => {
    try {
      const response = window.confirm(
        "Are you sure you want to delete this property?"
      );

      if (response) {
        dispatch(deleteProperty(id));
      }

      // Handle successful submission (e.g., show a success message)
      console.log("Property deleted successfully!");
    } catch (error) {
      // Handle error if property creation fails
      console.error("Error adding property:", error);
    }
  };

  if (property) {
    return (
      <Box
        borderRadius="15px"
        padding="20px"
        bgcolor="#FCFCFC"
        width="fit-content"
      >
        <Typography fontSize={25} fontWeight={700} color="#11142D">
          Details
        </Typography>

        <Box
          mt="20px"
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          gap={4}
        >
          <Box flex={1}>
            <img
              src={property.images[0]}
              alt="property_details-img"
              // srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
              height={546}
              style={{ objectFit: "cover", borderRadius: "10px" }}
              className="property_details-img"
            />

            <Box mt="15px">
              <Stack
                direction="row"
                justifyContent="space-between"
                flexWrap="wrap"
                alignItems="center"
              >
                <Box>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Star key={`star-${item}`} sx={{ color: "#F2C94C" }} />
                  ))}
                </Box>
              </Stack>

              <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent="space-between"
                alignItems="center"
                gap={2}
              >
                <Box>
                  <Typography
                    fontSize={22}
                    fontWeight={600}
                    mt="10px"
                    color="#11142D"
                  >
                    {property.title}
                  </Typography>
                  <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
                    <Place sx={{ color: "#808191" }} />
                    <Typography fontSize={14} color="#808191">
                      {property.location}
                    </Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography
                    fontSize={16}
                    fontWeight={600}
                    mt="10px"
                    color="#11142D"
                  >
                    Price
                  </Typography>
                  <Stack direction="row" alignItems="flex-end" gap={1}>
                    <Typography fontSize={25} fontWeight={700} color="#475BE8">
                      ${property.price}
                    </Typography>
                    <Typography fontSize={14} color="#808191" mb={0.5}>
                      for one day
                    </Typography>
                  </Stack>
                </Box>
              </Stack>

              <Stack mt="25px" direction="column" gap="10px">
                <Typography fontSize={18} color="#11142D">
                  Description
                </Typography>
                <Typography fontSize={14} color="#808191">
                  {property.description}
                </Typography>
              </Stack>
            </Box>
          </Box>

          <Box
            width="100%"
            flex={1}
            maxWidth={326}
            display="flex"
            flexDirection="column"
            gap="20px"
          >
            <Stack
              width="100%"
              p={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
              border="1px solid #E4E4E4"
              borderRadius={2}
            >
              <Stack
                mt={2}
                justifyContent="center"
                alignItems="center"
                textAlign="center"
              >
                <img
                  src={
                    // property.creator.avatar
                    //   ? property.creator.avatar
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                  }
                  alt="avatar"
                  width={90}
                  height={90}
                  style={{
                    borderRadius: "100%",
                    objectFit: "cover",
                  }}
                />

                <Box mt="15px">
                  <Typography fontSize={18} fontWeight={600} color="#11142D">
                    {/* {propertyDetails.creator.name} */}
                    creator
                  </Typography>
                  <Typography
                    mt="5px"
                    fontSize={14}
                    fontWeight={400}
                    color="#808191"
                  >
                    Agent
                  </Typography>
                </Box>

                <Stack mt="15px" direction="row" alignItems="center" gap={1}>
                  <Place sx={{ color: "#808191" }} />
                  <Typography fontSize={14} fontWeight={400} color="#808191">
                    North Carolina, USA
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                width="100%"
                mt="25px"
                direction="row"
                flexWrap="wrap"
                gap={2}
              >
                <CustomButton
                  // title={!isCurrentUser ? "Message" : "Edit"}
                  title="Edit"
                  backgroundColor="#475BE8"
                  color="#FCFCFC"
                  fullWidth
                  icon={<Edit />}
                  // icon={!isCurrentUser ? <ChatBubble /> : <Edit />}
                  handleClick={() =>
                    navigate(`/properties/edit/${property._id}`)
                  }
                />
                <CustomButton
                  // title={!isCurrentUser ? "Call" : "Delete"}
                  title="Delete"
                  // backgroundColor={!isCurrentUser ? "#2ED480" : "#d42e2e"}
                  backgroundColor="#d42e2e"
                  color="#FCFCFC"
                  fullWidth
                  icon={<Delete />}
                  // icon={!isCurrentUser ? <Phone /> : <Delete />}
                  handleClick={() => handleDeleteProperty(property._id)}
                />
              </Stack>
            </Stack>

            <Stack>
              <img
                src="https://serpmedia.org/scigen/images/googlemaps-nyc-standard.png?crc=3787557525"
                width="100%"
                height={306}
                style={{ borderRadius: 10, objectFit: "cover" }}
              />
            </Stack>

            <Box>
              <CustomButton
                title="Book Now"
                backgroundColor="#475BE8"
                color="#FCFCFC"
                fullWidth
              />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
};

export default PropertyDetails;
