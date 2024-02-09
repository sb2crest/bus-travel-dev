// import {StrictMode} from 'react';
// import {createRoot} from 'react-dom/client';

// import App from './App';

// // 👇️ IMPORTANT: use correct ID of your root element
// // this is the ID of the div in your index.html file
// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);

// // 👇️ if you use TypeScript, add non-null (!) assertion operator
// // const root = createRoot(rootElement!);

// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
//);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter } from "react-router-dom";
// import './main.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById('root')
// );

// reportWebVitals();

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SnackbarProvider } from "notistack";
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <BrowserRouter>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  );
} else {
  console.error("Root element 'root' not found.");
}
