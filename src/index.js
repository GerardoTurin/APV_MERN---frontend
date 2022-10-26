import React from 'react';  //Permite usar JSX y crear componentes
import ReactDOM from 'react-dom/client';  //Permite renderizar componentes en el DOM
//import './index.css';
import App from './App.js';
import * as bootstrap from 'bootstrap';  //Permite usar Bootstrap 5
import 'bootstrap/dist/css/bootstrap.min.css';  //Permite usar Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css';  //Permite usar Bootstrap Icons
window.bootstrap = bootstrap;

/* const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); */

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)  

