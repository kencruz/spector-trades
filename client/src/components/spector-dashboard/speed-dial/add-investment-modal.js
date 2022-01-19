import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Typography,
  Modal,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Autocomplete
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 600,
  bgcolor: "background.paper",
  border: "1px solid #555",
  boxShadow: 24,
  borderRadius: "8px",
};

const portfolioItems = [
  { label: 'Clean Tech', id: 1},
  { label: 'Bio Fuel', id: 2},
  { label: 'Stonks', id: 3},
  { label: 'Mining', id: 4},
  { label: 'Rainy Day', id: 5},
];

export const AddInvestmentModal = ({ open, handleClose }) => {
  const [portfolioType, setPortfolioType] = useState('spec');
  const handlePortfolioType = (_event, newPortfolioType) => {
    setPortfolioType(newPortfolioType);
  };
  const [portfolioName, setPortfolioName] = useState('');
  const [specBalance, setSpecBalance] = useState(0);
  const [info, setInfo] = useState({visibility: 'hidden',
                                    severity: 'info',
                                    message: ''});

  const resetForm = () => {
    setPortfolioType('spec');
    setPortfolioName('');
    setSpecBalance(0);
    setInfo({visibility: 'hidden',
      severity: 'info',
      message: ''});
  };

  const resetBeforeClose = () => {
    resetForm();
    handleClose();
  }

  const handleSubmit = () => {
    if (!portfolioName) {
      setInfo({visibility: 'visible', severity: 'error', message: 'Must give portfolio a name!'})
    } else if (portfolioType === 'spec' && (isNaN(specBalance) || specBalance < 1)) {
      setInfo({visibility: 'visible', severity: 'error', message: 'Must give speculative balance a valid number over 0'})
    } else {
      console.log('portfolio submitted!');
      resetBeforeClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={resetBeforeClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableRestoreFocus
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={style}>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <Typography
              color="textSecondary"
              display="inline"
              variant="h5"
            >
              New Investment
            </Typography>
          </Box>
          <Divider />

          <Box sx={{ display:'flex', p: 2, justifyContent: 'center' }}>

            <Autocomplete 
              disablePortal
              id="portfolio-select"
              options={portfolioItems}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Portfolio" />}
            />

          </Box>

          <Box sx={{ display:'flex', p: 2, justifyContent: 'center' }}>

            <Autocomplete 
              disablePortal
              id="portfolio-select"
              options={portfolioItems}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Asset" />}
            />

          </Box>

          <TextField
            sx={{ p:2  }}
            id="portfolio-name"
            label="Portfolio Name"
            placeholder="My Portfolio"
            variant="standard"
            fullWidth={true}
            onChange={(event) => setPortfolioName(() => event.target.value)}
           />

          <TextField
            disabled={portfolioType !== 'spec'}
            sx={{ p:2  }}
            id="speculative-money"
            label="Speculative Money"
            placeholder="1000"
            variant="standard"
            fullWidth={true}
            onChange={(event) => setSpecBalance(previous => Number(event.target.value))}
           />
          
          {/* THE INFOBOX */}
          <Alert sx={{ visibility: info.visibility }} severity={info.severity}>{info.message}</Alert>
   
          <Divider />
          <Box sx={{ display:'flex', p: 2, justifyContent: 'center' }}>

              <Button onClick={handleSubmit} variant="outlined">Create</Button>

          </Box>
        </Box>
      </Card>
    </Modal>
  );
  
}