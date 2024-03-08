import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./loading.css"


function Loading({ UploadPercentage }) {
  return (
    <div className='loading'>
      <div className='contentLoading'>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress variant="determinate" value={UploadPercentage} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" component="div" color="text.secondary">
              {`${Math.round(UploadPercentage)}%`}
            </Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
}

Loading.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  UploadPercentage: PropTypes.number.isRequired,
};

export default function CircularWithValueLabel({ UploadPercentage }) {
  return <Loading UploadPercentage={UploadPercentage} />;
}
