import React, { useState } from "react";
import axios from "axios";
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
import { addProperty } from "../../actions/property";
import { propertySchema } from "../../interfaces/property";
import { zodResolver } from "@hookform/resolvers/zod";
import useStyles from "./formStyles";
import { useGetIdentity } from "@refinedev/core";

const AddPropertyForm = () => {
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: true,
  });

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(propertySchema) });

  const classes = useStyles();

  const dispatch = useDispatch();

  const [images, setImages] = useState(null);
  const [imageSrc, setImageSrc] = useState({ name: "", url: "" });

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
      //Handle images using cloudinary
      const formdata = new FormData();
      formdata.append("file", images);
      formdata.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
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
            creator: user.email,
          };

          const { _id, ...transformedObject } = propertyDataWithImages;

          // Send the property data with images to the backend to create a new property
          dispatch(addProperty(transformedObject));

          reset();
          setImages({ name: "", url: "" });
          setImageSrc(null);

          // Handle successful submission (e.g., show a success message)
          console.log("Property added successfully!");
        });
    } catch (error) {
      // Handle error if property creation fails
      console.error("Error adding property:", error);
    }
  };
  console.log(errors);

  return (
    <form
      className={classes.formContainer}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }}
    >
      <input {...register("_id")} type="hidden" name="_id" value={""} />
      <TextField
        {...register("title")}
        label="Title"
        name="title"
        className={classes.formControl}
      />
      {errors.title && (
        <FormHelperText error>{errors.title.message}</FormHelperText>
      )}
      <TextField
        {...register("description")}
        label="Description"
        name="description"
        className={classes.formControl}
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
            name="price"
            type="number"
            className={classes.formControl}
          />
          {errors.price && (
            <FormHelperText error>{errors.price.message}</FormHelperText>
          )}
        </div>
        <div className={classes.StyledDiv}>
          <TextField
            {...register("location")}
            label="Location"
            name="location"
            className={classes.formControl}
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
            name="bedrooms"
            type="number"
            className={classes.formControl}
          />
          {errors.bedrooms && (
            <FormHelperText error>{errors.bedrooms.message}</FormHelperText>
          )}
        </div>
        <div className={classes.StyledDiv}>
          <TextField
            {...register("bathrooms", { valueAsNumber: true })}
            label="Bathrooms"
            name="bathrooms"
            type="number"
            className={classes.formControl}
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
            name="area"
            type="number"
            className={classes.formControl}
          />
          {errors.area && (
            <FormHelperText error>{errors.area.message}</FormHelperText>
          )}
        </div>
        <div className={classes.StyledDiv}>
          <FormControl className={classes.formControl}>
            <InputLabel>Property Type:</InputLabel>
            <Select {...register("type")} name="type">
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
        <Select {...register("status")} name="status">
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
          required
          accept="image/*"
          type="file"
          onChange={(e) => {
            handleImageChange(e.target.files[0]);
          }}
        />
      </Button>
      {imageSrc && (
        <img src={imageSrc.url} alt="" className={classes.previewImage} />
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submitButton}
      >
        Add Property
      </Button>
    </form>
  );
};

export default AddPropertyForm;
