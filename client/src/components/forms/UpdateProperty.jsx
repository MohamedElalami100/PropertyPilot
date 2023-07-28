import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  Grid,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { updateProperty } from "../../actions/property";
import { propertySchema } from "../../interfaces/property";
import { zodResolver } from "@hookform/resolvers/zod";
import useStyles from "./formStyles";
import FileBase from "react-file-base64";

const UpdatePropertyForm = ({ property, openAlert, setOpenAlert }) => {
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(propertySchema) });

  const classes = useStyles();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    try {
      // Merge the property data with the selected images
      const propertyDataWithImages = {
        ...data,
        images: images,
      };

      // Send the property data with images to the backend to update the property
      dispatch(updateProperty(property._id, propertyDataWithImages));

      setOpenAlert(!openAlert);

      // Handle successful submission (e.g., show a success message)
      console.log("Property updated successfully!");
    } catch (error) {
      // Handle error if property update fails
      console.error("Error updating property:", error);
    }
  };

  // const handleImageDelete = (imageUrl) => {
  //   setImages((prevImages) =>
  //     Array.isArray(prevImages)
  //       ? prevImages.filter((imgUrl) => imgUrl !== imageUrl)
  //       : prevImages
  //   );
  // };

  // useEffect(() => newProperty = property, [property])
  const [images, setImages] = useState(property?.images?.[0]);

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
        <FormControl className={classes.formControl}>
          <InputLabel>Amenities</InputLabel>
          <Controller
            name="amenities"
            defaultValue={property.amenities}
            control={control}
            render={({ field }) => (
              <Select {...field} multiple value={field.value || []}>
                <MenuItem value="Swimming Pool">Swimming Pool</MenuItem>
                <MenuItem value="Garden">Garden</MenuItem>
                <MenuItem value="Parking">Parking</MenuItem>
                <MenuItem value="Gym">Gym</MenuItem>
              </Select>
            )}
          />
        </FormControl>
        {errors.amenities && (
          <FormHelperText error>{errors.amenities.message}</FormHelperText>
        )}
        <Typography variant="subtitle1">Images:</Typography>
        <FileBase
          name="images"
          id="fileInput"
          type="file"
          multiple={false}
          onDone={({ base64 }) => setImages(base64)}
        />
        {images && (
          <img
            src={images}
            alt="Selected Profile"
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
