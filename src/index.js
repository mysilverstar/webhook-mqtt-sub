import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Connector } from 'mqtt-react-hooks';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Connector
      // brokerUrl="ws://10.157.46.91:9001"
      brokerUrl="wss://bonkab.com:9002"
      options={ {"protocol": "wss"}}>
    <App />
    </Connector>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
