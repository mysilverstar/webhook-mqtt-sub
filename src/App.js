import logo from './logo.svg';
import './App.css';
import { useMqttState, useSubscription } from 'mqtt-react-hooks';
import React, { useEffect, useState } from 'react';
import { Container, Paper, Button, TextField, Grid } from '@mui/material';
import ReactJson from 'react-json-view';

function App() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const { connectionStatus } = useMqttState();
  const { message } = useSubscription([
    '@topic/webhook'
  ]);

  const handleAddData = () => {
    if (inputValue.trim()) {
      setData([...data, inputValue]);
      setInputValue('');
    }
  };

  const clearData = () => {
      setData([]);
  };

  useEffect(() => {
    if (message?.message) {
      setData((prevData) => [...prevData, message.message]);
    }
  }, [message]);

  const isValidJson = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <Container style={{ marginTop: '20px' }}>
    <div>STATUS: {connectionStatus}</div>
    <Button variant="contained" color="primary" onClick={clearData} style={{ marginTop: '20px' }}>
      Clear
    </Button>
    <Grid container spacing={2} style={{ marginTop: '20px' }}>
      {data.map((item, index) => (
        <Grid item xs={6} key={index}>
          <Paper style={{ padding: '10px' }}>
            <div style={{ color: 'red' }}> Webhook msg </div>
            <br />
            {isValidJson(item) ? (
                <ReactJson src={JSON.parse(item)} name={false} />
              ) : (
                <div>{item}</div>
              )}
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Container>
  );
}

export default App;
