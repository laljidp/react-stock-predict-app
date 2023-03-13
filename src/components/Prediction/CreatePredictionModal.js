import React, { useCallback, useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import Slide from '@mui/material/Slide';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import { Switch, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CustomTabs from '../UI/Tabs';
import { fetchStockPrice, searchStockBySymbol } from '../../services/finhub';
import {
  calculateStopLoss,
  calculateStopLossPercentageByPrice,
  debounce,
  validatePredictionData,
} from '../../Utils';
import { useSnackbar } from '../../Hooks/useSnackbar';
import { AuthContext } from '../../Context/userAuth.context';
import { createPrediction } from '../../services/firebase/prediction.firebase';
import { PredictGradientButton } from '../UI/Buttons';
import LoadingProgress from '../UI/LoadingProgress';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="down" ref={ref} {...props} />
));

const initialPayload = {
  stock: {
    price: null,
  },
  isSharePublicaly: true,
  selectedDurationType: 'week',
  target: '',
  percentage: '10',
  predictionDateTime: '',
  afterPercentageTarget: '',
};

const DurationType = {
  day: 5,
  week: 10,
  month: 15,
};

function CreatePredictionModal({ open, onClose }) {
  const [searchOptions, setSearchOptions] = useState([]);
  const [loadingOption, setLoadingOption] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [payload, setPayload] = useState(initialPayload);

  const { showError, showSuccessMsg } = useSnackbar();
  const {
    userData: { name: userName, uid: userId },
  } = useContext(AuthContext);

  const handleClose = () => {
    onClose();
    setPayload(initialPayload);
  };

  const handleSearch = async (searchText) => {
    if (searchText?.trim()?.length >= 2) {
      setLoadingOption(true);
      const stocks = await searchStockBySymbol(searchText);
      setSearchOptions(stocks?.result || []);
      setLoadingOption(false);
    }
  };

  const handleTabChange = (name, value) => {
    const percentage = DurationType[value];
    const { afterPercentageTarget } = calculateStopLoss({
      stockPrice: payload.stock.price.c,
      percentage,
      target: payload.target,
    });
    setPayload({
      ...payload,
      [name]: value,
      percentage,
      afterPercentageTarget,
    });
  };

  const getStockQuote = async (stockInfo) => {
    // call API to fetch
    const fullStockInfo = await fetchStockPrice(stockInfo);
    setPayload({
      ...payload,
      stock: {
        ...payload.stock,
        price: fullStockInfo,
      },
    });
  };

  const handleStockChange = (stockInfo) => {
    if (!stockInfo) {
      setPayload(initialPayload);
      return;
    }
    setPayload({
      ...payload,
      stock: {
        ...payload.stock,
        ...stockInfo,
      },
    });
  };

  const handleStopLossPercentageChange = (name, value) => {
    if (value) {
      const { afterPercentageTarget, percentage } = calculateStopLoss({
        stockPrice: payload.stock.price.c,
        target: payload.target,
        percentage: value,
      });
      setPayload({
        ...payload,
        afterPercentageTarget,
        percentage,
      });
    } else {
      setPayload({
        ...payload,
        [name]: value,
        afterPercentageTarget: '',
      });
    }
  };

  const handleStopLossAmountChange = (name, value) => {
    if (value && Number(value) > 0) {
      const percentage = calculateStopLossPercentageByPrice({
        stockPrice: payload.stock.price.c,
        targetPrice: value,
      });
      setPayload({
        ...payload,
        afterPercentageTarget: value,
        percentage,
      });
    } else {
      setPayload({
        ...payload,
        afterPercentageTarget: value,
        percentage: '',
      });
    }
  };

  const optimizeSearch = useCallback(debounce(handleSearch), []);

  const handleChange = (name, values) => {
    setPayload({
      ...payload,
      [name]: values,
    });
  };

  const handleSubmit = async () => {
    // call API to save
    console.log('payload', payload);
    const errors = validatePredictionData(payload);
    if (errors.length > 0) {
      console.log('erros', errors);
      errors.forEach((error) => {
        showError(error);
      });
    } else {
      setSubmitting(true);
      const predictionPayload = { ...payload, userName, userId };
      const { success, message } = await createPrediction(predictionPayload);
      if (success) {
        showSuccessMsg(message);
        handleClose();
      } else {
        showError(message);
      }
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (payload?.stock?.symbol) {
      getStockQuote(payload.stock);
    }
  }, [payload?.stock?.symbol]);

  useEffect(() => {
    const { afterPercentageTarget, percentage } = calculateStopLoss({
      stockPrice: payload?.stock?.price?.c,
      percentage: payload.percentage,
      target: payload.target,
    });
    setPayload({
      ...payload,
      afterPercentageTarget,
      percentage,
    });
  }, [payload?.target]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth
      sx={{
        '.MuiDialog-scrollPaper': {
          justifyContent: 'center',
          alignItems: 'flex-start',
        },
        '.MuiPaper-root': {
          minHeight: '50%',
        },
      }}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <ModalTitle>Create A Prediction</ModalTitle>
      <DialogContent
        sx={{
          textAlign: 'center',
          marginTop: '25px',
          paddingTop: '15px !important',
        }}
      >
        <Autocomplete
          placeholder="Search by stock symbol e.g. AAPL"
          loading={loadingOption}
          size="small"
          noOptionsText="No stock founds!"
          sx={{ margin: '0 auto', width: '80%' }}
          onInputChange={({ target }) => optimizeSearch(target.value)}
          options={searchOptions}
          loadingText={<LoadingProgress />}
          onChange={(event, values) => handleStockChange(values)}
          getOptionLabel={(option) => `${option.description} (${option.symbol})`}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search by stock symbol e.g. AAPL"
              placeholder="Search Stock"
            />
          )}
        />
        {!payload?.stock?.price && (
          <Box
            sx={{
              marginTop: '18px',
            }}
          >
            <span>&#9432; Please search & select a stock for prediction.</span>
          </Box>
        )}
        {payload?.stock?.price && (
          <>
            <CustomTabs
              sx={{ marginTop: '18px' }}
              handleChange={(value) => handleTabChange('selectedDurationType', value)}
              value={payload.selectedDurationType}
              tabs={[
                {
                  label: 'Daily',
                  value: 'day',
                },
                { label: 'Weekly', value: 'week' },
                { label: 'Monthly', value: 'month' },
              ]}
            />
            <Typography sx={{ marginTop: '18px' }}>
              <strong>
                {payload?.stock?.symbol} @ ${payload?.stock?.price?.c} will reach a target of
              </strong>
            </Typography>
            <Box
              sx={{
                width: '70%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '18px auto',
              }}
            >
              <TextField
                sx={{ maxWidth: '180px' }}
                size="small"
                id="outlined-basic"
                label="Target price"
                variant="outlined"
                name="target"
                type="number"
                onChange={({ target }) => handleChange(target.name, target.value)}
                value={payload?.target}
              />
              <Typography sx={{ margin: '0 2rem' }}>By</Typography>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  inputFormat="MM/DD/YYYY"
                  value={payload?.predictionDateTime}
                  disablePast
                  size="sm"
                  sx={{
                    '.MuiInputBase-root': {
                      height: '40px',
                      width: '180px',
                      input: {
                        letterSpacing: 'normal',
                      },
                    },
                  }}
                  onChange={(date) => handleChange('predictionDateTime', date)}
                  renderInput={({ size, ...params }) => <TextField {...params} size="small" />}
                />
              </LocalizationProvider>
            </Box>
            <Typography sx={{ marginTop: '18px' }}>
              <strong>It has a stop-loss at</strong>
            </Typography>
            <Box
              sx={{
                width: '70%',
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                margin: '18px auto',
              }}
            >
              <TextField
                sx={{ maxWidth: '120px' }}
                size="small"
                id="outlined-basic"
                label="Stop loss %"
                name="percentage"
                type="number"
                onChange={({ target }) => handleStopLossPercentageChange(target.name, target.value)}
                value={payload.percentage}
                variant="outlined"
              />
              <TextField
                sx={{ maxWidth: '120px' }}
                size="small"
                id="outlined-basic"
                name="afterPercentageTarget"
                onChange={({ target }) => handleStopLossAmountChange(target.name, target.value)}
                value={payload?.afterPercentageTarget}
                label="Stop loss $"
                type="number"
                variant="outlined"
              />
            </Box>
            <Box sx={{ marginTop: '24px' }}>
              <PredictGradientButton onClick={handleSubmit} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Predict now'}
              </PredictGradientButton>
            </Box>
            <Box
              sx={{
                fontWeight: 500,
                padding: '10px',
                textAlign: 'right',
                fontSize: '14px',
              }}
            >
              Allowed for public challenge
              <CustomSwitch
                name="isSharePublicaly"
                checked={payload.isSharePublicaly}
                onChange={({ target }) => handleChange(target.name, target.checked)}
              />
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

CreatePredictionModal.propTypes = {
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
};

const ModalTitle = styled(DialogTitle)({
  padding: '10px',
  fontWeight: 'bold',
  fontSize: '28px',
  color: '#ffcd29',
  textAlign: 'center',
  backgroundColor: '#273c58',
  marginTop: '20px',
});

const CustomSwitch = styled(Switch)(() => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#fff',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: 'rgb(34 255 34)',
  },
}));

export default CreatePredictionModal;
