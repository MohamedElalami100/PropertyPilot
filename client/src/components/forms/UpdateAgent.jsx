import React, { useState, useEffect } from "react";
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
import { updateAgent } from "../../actions/agent"; // Import the action for updating agents
import { agentSchema } from "../../interfaces/agent"; // Import the Zod validation schema for agents
import { zodResolver } from "@hookform/resolvers/zod";
import useStyles from "./formStyles";
import FileBase from "react-file-base64";

const UpdateAgentForm = ({ agentData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({ resolver: zodResolver(agentSchema) });

  const classes = useStyles();
  const dispatch = useDispatch();
  console.log(agentData);

  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    // Set the agent data in the form fields when it's available
    if (agentData) {
      setValue("_id", agentData._id);
      setValue("name", agentData.name);
      setValue("email", agentData.email);
      setValue("phone", agentData.phone);
      setValue("properties", agentData.properties);
      setProfilePicture(agentData.profilePicture);
    }
  }, [agentData, setValue]);

  const properties = useSelector((state) => state.property);

  const onSubmit = (data) => {
    try {
      // Merge the property data with the selected images
      const agentDataWithImages = {
        ...data,
        profilePicture: profilePicture,
      };

      console.log(agentDataWithImages);

      // Send the updated agent data with the image (if changed) to the backend
      dispatch(updateAgent(agentDataWithImages._id, agentDataWithImages));

      // Handle successful submission (e.g., show a success message)
      console.log("Agent updated successfully!");
    } catch (error) {
      // Handle error if agent update fails
      console.error("Error updating agent:", error);
    }
  };

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
          control={control}
          render={({ field }) => (
            <Select {...field} multiple value={field.value || []}>
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submitButton}
      >
        Update Agent
      </Button>
    </form>
  );
};

export default UpdateAgentForm;
