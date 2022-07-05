import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',

  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
    maxWidth: '50%'
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    height: '250px',
    overflowY: 'auto',
    marginRight: '30px',
  },
  recommendedPostCard: {
    margin: '20px', 
    cursor: 'pointer', 
    borderRadius:'10px', 
    padding: '5px',
    '&:hover': {
      background: "#c7c9c8",
      animation: '$shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
    },
  },
  '@keyframes shake': {
    '0%': { transform: 'translate(1px, 1px) rotate(0deg)' },
    '10%': { transform: 'translate(-1px, -2px) rotate(-1deg)' },
    '20%': { transform: 'translate(-2px, 0px) rotate(1deg)' },
    '30%': { transform: 'translate(2px, 2px) rotate(0deg)' },
    '40%': { transform: 'translate(1px, -1px) rotate(1deg)' },
  },
}));