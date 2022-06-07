import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './modules/app';
import './content.styles.css';
console.log('Content script works!');
console.log('welcome!');

const body = $('body');
const app = $('<div id="diy"></div>');

if (body) {
  body.append(app);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('diy')
);
