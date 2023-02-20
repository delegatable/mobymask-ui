import { useState } from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Typography,
  DialogTitle,
  Box,
} from "@mui/material";
import { toast } from "react-hot-toast";
import Button from "./Button";
import showMessage from "./showMessage";
import copyInvitationLink from "../utils/copyInvitationLink";
import linkForInvitation from "../utils/linkForInvitation";

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
    const linkObj = createNewLink(name);
    const link = linkForInvitation(linkObj);

    handleClose();
    setName("");
    showMessage({
      title: "Invitation link created successfully!",
      type: "success",
      body: (
        <Box>
          <Typography>
            The invitation link has been copied! You can share it with the
            person you want to invite, or copy it again.
          </Typography>
          <Box marginTop={2}>
            <TextField fullWidth multiline maxRows={4} value={link} />
          </Box>
          <Box marginTop={2}>
            <Button
              label="Copy"
              style={{
                color: "#fff",
                background:
                  "linear-gradient(89.57deg, #2975DF 0.27%, #3ACFE3 105.82%)",
                boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
              }}
              onClick={async () => {
                await copyInvitationLink(linkObj);
                toast.success("Copied to clipboard!");
              }}
            />
          </Box>
        </Box>
      ),
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Who is this invitation for?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Get a nickname for this invitation so you can view their reports and
          revoke the invitation. Remember that this would be public to all your
          upstream users.
        </DialogContentText>
        <Box marginTop={2}>
          <TextField
            autoFocus
            margin="dense"
            value={name}
            label="Name"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Box textAlign="right" padding={2}>
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
