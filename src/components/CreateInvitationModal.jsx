import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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
        <Button label="cancel" onClick={handleClose} />
        <Button
          label="ok"
          className="bg-gradient-to-r from-[#334FB8] to-[#1D81BE] text-white inline-block m-auto rounded-[100px]"
          onClick={makeSure}
        />
      </DialogActions>
    </Dialog>
  );
}

export default CreateInvitationModal;
