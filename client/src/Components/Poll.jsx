import { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

const Poll = ({ open, onClose, onFormSubmit }) => {
  const [name, setName] = useState("");
  const [votingChoice, setVotingChoice] = useState("true");
  const [castedAt, setCastedAt] = useState("");

  const handleSubmit = async () => {
    const vote = {
      name,
      voting_choice: votingChoice === "true",
      casted_at: castedAt,
    };

    try {
      const response = await axios.post("http://localhost:8080/vote", vote);
      console.log("Response from server:", response);
      onFormSubmit();
      onClose();
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cast Your Vote</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="dense"
          inputProps={{ 'data-testid': 'name-input' }}
        />
        <FormControl component="fieldset" margin="dense">
          <FormLabel component="legend">Voting Choice</FormLabel>
          <RadioGroup
            aria-label="voting choice"
            name="votingChoice"
            value={votingChoice}
            onChange={(e) => setVotingChoice(e.target.value)}
            row
            data-testid="voting-choice"
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        <TextField
          label="Date of Submission"
          type="date"
          value={castedAt}
          onChange={(e) => setCastedAt(e.target.value)}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Poll;
