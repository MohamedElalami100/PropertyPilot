import React, { useState } from "react";
import axios from "axios";
import { useGetIdentity } from "@refinedev/core";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
} from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateProperty } from "../../actions/property";
import { propertySchema } from "../../interfaces/property";
import { zodResolver } from "@hookform/resolvers/zod";
import useStyles from "./formStyles";

const UpdatePropertyForm = ({ property }) => {
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: true,
  });

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(propertySchema) });

  const classes = useStyles();

  const dispatch = useDispatch();

  const [images, setImages] = useState(property?.images);
  const [imageSrc, setImageSrc] = useState({ name: "", url: property?.images });

  const handleImageChange = (file) => {
    setImages(file);
    const reader = (readFile) =>
      new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result) =>
      setImageSrc({ name: file?.name, url: result })
    );
  };

  const onSubmit = (data) => {
    try {
      //the image not updates case:
      if (property?.images === images) {
        // Merge the property data with the selected images
        const propertyDataWithImages = {
          ...data,
          images: images,
        };

        // Send the property data with images to the backend to update the property
        dispatch(updateProperty(property._id, propertyDataWithImages));

        // Handle successful submission (e.g., show a success message)
        console.log("Property updated successfully!");
      }
      // the image is updated case:
      else {
        //Handle images using cloudinary
        const formdata = new FormData();
        formdata.append("file", images);
        formdata.append(
          "cloud_name",
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        );
        formdata.append("upload_preset", "xeawk7dl");
        axios
          .post(
            `https://${import.meta.env.VITE_CLOUDINARY_API_KEY}:${
              import.meta.env.VITE_CLOUDINARY_API_SECRET
            }@api.cloudinary.com/v1_1/${
              import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
            }/image/upload`,
            formdata
          )
          .then((response) => {
            // Merge the property data with the selected images
            const propertyDataWithImages = {
              ...data,
              images: response.data.url,
              email: user.email,
            };

            // Send the property data with images to the backend to create a new property
            dispatch(updateProperty(property._id, propertyDataWithImages));

            // Handle successful submission (e.g., show a success message)
            console.log("Property updated successfully!");
          });
      }
    } catch (error) {
      // Handle error if property update fails
      console.error("Error updating property:", error);
    }
  };

  if (property) {
    return (
      <form
        className={classes.formContainer}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }}
      >
        <input
          {...register("_id")}
          type="hidden"
          name="_id"
          value={property._id}
        />
        <TextField
          {...register("title")}
          label="Title"
          hiddenLabel
          name="title"
          className={classes.formControl}
          defaultValue={property.title}
        />
        {errors.title && (
          <FormHelperText error>{errors.title.message}</FormHelperText>
        )}
        <TextField
          {...register("description")}
          label="Description"
          hiddenLabel
          name="description"
          className={classes.formControl}
          defaultValue={property.description}
        />
        {errors.description && (
          <FormHelperText error>{errors.description.message}</FormHelperText>
        )}
        <Stack
          direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
          spacing={{ md: 2 }}
        >
          <div className={classes.StyledDiv}>
            <TextField
              {...register("price", { valueAsNumber: true })}
              label="Price"
              hiddenLabel
              name="price"
              type="number"
              className={classes.formControl}
              defaultValue={property.price}
            />
            {errors.price && (
              <FormHelperText error>{errors.price.message}</FormHelperText>
            )}
          </div>
          <div className={classes.StyledDiv}>
            <TextField
              {...register("location")}
              label="Location"
              hiddenLabel
              name="location"
              className={classes.formControl}
              defaultValue={property.location}
            />
            {errors.location && (
              <FormHelperText error>{errors.location.message}</FormHelperText>
            )}
          </div>
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
          spacing={{ md: 2 }}
        >
          <div className={classes.StyledDiv}>
            <TextField
              {...register("bedrooms", { valueAsNumber: true })}
              label="Bedrooms"
              hiddenLabel
              name="bedrooms"
              type="number"
              className={classes.formControl}
              defaultValue={property.bedrooms}
            />
            {errors.bedrooms && (
              <FormHelperText error>{errors.bedrooms.message}</FormHelperText>
            )}
          </div>
          <div className={classes.StyledDiv}>
            <TextField
              {...register("bathrooms", { valueAsNumber: true })}
              label="Bathrooms"
              hiddenLabel
              name="bathrooms"
              type="number"
              className={classes.formControl}
              defaultValue={property.bathrooms}
            />
            {errors.bathrooms && (
              <FormHelperText error>{errors.bathrooms.message}</FormHelperText>
            )}
          </div>
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
          spacing={{ md: 2 }}
        >
          <div className={classes.StyledDiv}>
            <TextField
              {...register("area", { valueAsNumber: true })}
              label="Area"
              hiddenLabel
              name="area"
              type="number"
              className={classes.formControl}
              defaultValue={property.area}
            />
            {errors.area && (
              <FormHelperText error>{errors.area.message}</FormHelperText>
            )}
          </div>
          <div className={classes.StyledDiv}>
            <FormControl className={classes.formControl}>
              <InputLabel>Property Type:</InputLabel>
              <Select
                {...register("type")}
                name="type"
                defaultValue={property.type}
              >
                {[
                  "Apartment",
                  "Villa",
                  "Farmhouse",
                  "Condos",
                  "Townhouse",
                  "Duplex",
                  "Studio",
                  "Chalet",
                ].map((type) => (
                  <MenuItem key={type} value={type.toLowerCase()}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.type && (
              <FormHelperText error>{errors.type.message}</FormHelperText>
            )}
          </div>
        </Stack>
        <FormControl className={classes.formControl}>
          <InputLabel>Status:</InputLabel>
          <Select
            {...register("status")}
            name="status"
            defaultValue={property.status}
          >
            {["for Rent (per day)", "for Rent (per month)", "for Sale"].map(
              (status) => (
                <MenuItem key={status} value={status.toLowerCase()}>
                  {status}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
        {errors.status && (
          <FormHelperText error>{errors.status.message}</FormHelperText>
        )}
        <Typography variant="subtitle1">Image:</Typography>
        <Button
          component="label"
          sx={{
            width: "fit-content",
            color: "#2ed480",
            textTransform: "capitalize",
            fontSize: 16,
          }}
        >
          Upload *
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={(e) => {
              handleImageChange(e.target.files[0]);
            }}
          />
        </Button>
        {imageSrc && (
          <img
            src={imageSrc.url.length === 0 ? property.images : imageSrc.url}
            alt=""
            className={classes.previewImage}
          />
        )}
        {errors.images && (
          <FormHelperText error>{errors.images.message}</FormHelperText>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submitButton}
        >
          Update the Property
        </Button>
      </form>
    );
  } else return <></>;
};

export default UpdatePropertyForm;
