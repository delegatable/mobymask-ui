import TextField from "@mui/material/TextField";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";
import Button from "./Button";
import showMessage from "./showMessage";
import { useState } from "react";

function CreateInvitationModal(props) {
  const { open, handleClose, createNewLink } = props;
  const [name, setName] = useState("");
  const handleChange = (event) => {
    setName(event.target.value);
  };

  const makeSure = () => {
    if (!name) {
      return;
    }
    createNewLink(name);
    handleClose();
    setName("");
    showMessage({ title: "create success", type: "success", body: "" });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>who is this invitation for?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Get a nickname for this invitation so you can view their reports and
          revoke the invitation. Remember that this would be public to all your
          upstream users.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          value={name}
          label="Name"
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Box textAlign="right">
          <Button
            width="94px"
            height="48px"
            label="Cancel"
            onClick={handleClose}
            marginRight="8px"
          />
          <Button
            width="94px"
            height="48px"
            label="OK"
            style={{
              background:
                "linear-gradient(89.57deg, #2975DF 0.27%, #3ACFE3 105.82%)",
              boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            }}
            color="#fff"
            borderRadius="6px"
            margin="auto"
            onClick={makeSure}
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default CreateInvitationModal;
