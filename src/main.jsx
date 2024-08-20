import React from 'react'
import ReactDOM from 'react-dom/client'
//import { StrictMode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
//import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>  
  )

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Router>
//     <App />
//   </Router>  
//   )

//   createRoot(document.getElementById('root')).render(
//     <StrictMode>
//       <App />
//     </StrictMode>,
//   )
  
  //  <React.StrictMode> 
  //   <App /> 
  //  </React.StrictMode> 