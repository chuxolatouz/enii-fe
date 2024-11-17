import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import VerifiedIcon from '@mui/icons-material/Verified';
import Tooltip from '@mui/material/Tooltip';

function CircularProgressWithLabel(props) {
  return (
    <Tooltip title="Proyecto pendiente de configurar">
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} />
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
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    </Tooltip>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function CircularWithValueLabel({ status }) {
    const calculateProgress = () => {
        
        return (status.completado.length / 5) * 100
    }
    
    if (status.finished) {
        return <Tooltip title="Proyecto Finalizado">
              <VerifiedIcon color="info" sx={{ marginLeft: 1 }} />
          </Tooltip>
    } else {
        const progress = calculateProgress()

        if (progress === 100) {
          return <Tooltip title="Proyecto activo">
            <VerifiedIcon sx={{ marginLeft: 1 }} color="success" />
          </Tooltip>
        } else {
          return <CircularProgressWithLabel color={progress === 100 ? "success" : "secondary"} value={progress} />;
          
        }
    }

}