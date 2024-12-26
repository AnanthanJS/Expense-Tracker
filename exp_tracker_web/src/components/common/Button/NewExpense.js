import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const NewExpense = ({ onClick }) => {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={onClick}
    >
      New Expense
    </Button>
  );
}

export default NewExpense;