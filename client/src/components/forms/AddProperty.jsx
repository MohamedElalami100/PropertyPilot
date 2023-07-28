import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { addProperty } from "../../actions/property";
import { propertySchema } from "../../interfaces/property";
import { zodResolver } from "@hookform/resolvers/zod";
import useStyles from "./formStyles";
import FileBase from "react-file-base64";

const AddPropertyForm = (openAlert, setOpenAlert) => {
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

  const onSubmit = (data) => {
    try {
      // Merge the property data with the selected images
      const propertyDataWithImages = {
        ...data,
        images: images,
      };

      const { _id, ...transformedObject } = propertyDataWithImages;

      // Send the property data with images to the backend to create a new property
      dispatch(addProperty(transformedObject));

      reset();
      setImages(null);

      setOpenAlert(!openAlert);

      // Handle successful submission (e.g., show a success message)
      console.log("Property added successfully!");
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
      <TextField
        {...register("location")}
        label="Location"
        name="location"
        className={classes.formControl}
      />
      {errors.location && (
        <FormHelperText error>{errors.location.message}</FormHelperText>
      )}
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
      <FormControl className={classes.formControl}>
        <InputLabel>Amenities</InputLabel>
        <Controller
          name="amenities"
          defaultValue={[]}
          control={control}
          render={({ field }) => (
            <Select {...field} multiple>
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
      <Typography variant="subtitle1">Image:</Typography>
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
        Add Property
      </Button>
    </form>
  );
};

export default AddPropertyForm;
