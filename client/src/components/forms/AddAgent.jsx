import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { addAgent } from "../../actions/agent"; // Import the action for adding agents
import { agentSchema } from "../../interfaces/agent"; // Import the Zod validation schema for agents
import { zodResolver } from "@hookform/resolvers/zod";
import useStyles from "./formStyles";
import FileBase from "react-file-base64";

const AddAgentForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(agentSchema) });

  const classes = useStyles();

  const dispatch = useDispatch();

  const properties = useSelector((state) => state.property);
  console.log(properties);

  const [profilePicture, setProfilePicture] = useState(null);

  const onSubmit = (data) => {
    try {
      const propertyDataWithImages = {
        ...data,
        profilePicture: profilePicture,
      };

      const { _id, ...transformedObject } = propertyDataWithImages;
      // Send the agent data with the image to the backend to create a new agent
      dispatch(addAgent(transformedObject));

      // Reset the form fields and the profile picture state after submission
      reset();
      setProfilePicture(null);

      // Handle successful submission (e.g., show a success message)
      console.log("Agent added successfully!");
    } catch (error) {
      // Handle error if agent creation fails
      console.error("Error adding agent:", error);
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
        {...register("name")}
        label="Name"
        name="name"
        className={classes.formControl}
      />
      {errors.name && (
        <Typography variant="body2" color="error">
          {errors.name.message}
        </Typography>
      )}
      <TextField
        {...register("email")}
        label="Email"
        name="email"
        className={classes.formControl}
      />
      {errors.email && (
        <Typography variant="body2" color="error">
          {errors.email.message}
        </Typography>
      )}
      <TextField
        {...register("phone")}
        label="Phone"
        name="phone"
        className={classes.formControl}
      />
      {errors.phone && (
        <Typography variant="body2" color="error">
          {errors.phone.message}
        </Typography>
      )}
      <FormControl className={classes.formControl}>
        <InputLabel>Properties</InputLabel>
        <Controller
          name="properties"
          defaultValue={[]}
          control={control}
          render={({ field }) => (
            <Select {...field} multiple>
              {properties?.map((prop) => (
                <MenuItem key={prop._id} value={prop._id}>
                  {prop.title}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      {errors.properties && (
        <FormHelperText error>{errors.properties.message}</FormHelperText>
      )}
      <Typography variant="subtitle1">Profile Picture:</Typography>
      <FileBase
        name="profilePicture"
        id="fileInput"
        type="file"
        multiple={false}
        onDone={({ base64 }) => setProfilePicture(base64)}
      />
      {profilePicture && (
        <img
          src={profilePicture}
          alt="Selected Profile"
          className={classes.previewImage}
        />
      )}
      {errors.profilePicture && (
        <Typography variant="body2" color="error">
          {errors.profilePicture.message}
        </Typography>
      )}
      {errors.properties?.message}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submitButton}
      >
        Add Agent
      </Button>
    </form>
  );
};

export default AddAgentForm;
