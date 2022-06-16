import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './components/pages/landing/Landing';
import Company from './components/pages/company/Company';
import Applicant from './components/pages/applicant/Applicant';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/company' element={<Company />} />
        <Route path='/applicant' element={<Applicant />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
