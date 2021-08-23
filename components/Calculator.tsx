import { 
  Container, 
  CssBaseline, 
  Typography, 
  TextField,
  Button
} from '@material-ui/core';
import axios from 'lib/axios';
import React from 'react';
import { useState } from 'react';

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(0);
  const handleCalc = async () => {
    setResult(eval(expression))
    await axios.post('/api/history', {expression: expression, result: eval(expression)}, ).then((response) => {

    }).catch((err) => {

    })
  }
  return (
    <Container component="div" style={{marginTop: '50px'}} maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Calculator
        </Typography>
        <Typography>
          Result = {result}
        </Typography>
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="expression"
            label="Enter mathematical expression"
            name="expression"
            autoComplete="expression"
            autoFocus
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className=""
            onClick={handleCalc}
          >
            Calculate
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default Calculator;