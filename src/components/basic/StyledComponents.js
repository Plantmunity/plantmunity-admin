import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

export const SearchField = styled(TextField)(() => ({
  backgroundColor:'transparent',
  width:'100%',
  '& label.Mui-focused': {
    color: 'transparent',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'transparent',
  },  
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
},
}));

export const TextArea = styled(TextField)(() => ({
  backgroundColor:'transparent',
  width:'100%',
  '& label.Mui-focused': {
    color: 'transparent',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'transparent',
  },  
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
},
}));