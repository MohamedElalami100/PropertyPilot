import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: "95%",
    margin: "0 auto",
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  fileInput: {
    display: "none",
  },
  uploadButton: {
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    width: "40%",
  },
  deleteButton: {
    marginLeft: "10px",
    backgroundColor: "#e74c3c", // Red background color
    color: "#fff", // Text color
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  previewImage: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "50%",
    margin: "10px auto",
  },
}));

export default useStyles;
