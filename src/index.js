import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import reportWebVitals from './reportWebVitals';
import WelcomePage from './pages/welcome';
import SettingsPage from './pages/settings';
import Layout from './Layout';
import {
  Routes,
  Route,
  BrowserRouter,

} from "react-router-dom";
import axios from 'axios';
import EnterMonthly from './pages/enterMonthly';
import MonthlyDetailsPage from './pages/monthlyDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <React.StrictMode>
    <Layout>
    <BrowserRouter>
      <Routes>

        <Route path="/" exact element={<WelcomePage/>}/>
        <Route path="/monthly" exact element={<EnterMonthly/>}/>
        <Route path="/month" exact element={<MonthlyDetailsPage/>}/>
        <Route path="/settings" exact element={<SettingsPage/>}/>

      </Routes>
    </BrowserRouter>
  </Layout> 
  </React.StrictMode>
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
