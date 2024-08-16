import React from "react";
import AppRoute from "./routes/appRoute";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <Router>
      <div className="App">
        <AppRoute />
      </div>
    </Router>
  )
}

export default App;
