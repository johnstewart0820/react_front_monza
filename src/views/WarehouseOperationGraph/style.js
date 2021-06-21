import { makeStyles, useTheme } from '@material-ui/styles';
const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%'
  },
  title: {
    fontSize: '1.2em',
    lineHeight: '1.2',
    fontWeight: '700'
  },
  title_6: {
    fontSize: '1',
    lineHeight: '1.2',
    fontWeight: '400',
    textAlign: 'center'
  },
  container: {
    width: '600px',
    height: '576px',
    display: 'flex',
    fontFamily: 'roboto',
    marginBottom: '10px',
    marginTop: '10px',
    '& .recharts-legend-wrapper': {
      bottom: 'auto !important'
    }
  }
}));

export default useStyles;
