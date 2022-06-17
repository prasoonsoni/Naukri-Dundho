import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import Company from './pages/company/Company';
import Applicant from './pages/applicant/Applicant';
import CompanyHome from './pages/companyHome/CompanyHome';
import ApplicantHome from './pages/applicantHome/ApplicantHome';
import Applicants from './pages/companyHome/Applicants';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/company' element={<Company />} />
        <Route path="/job/applicants/:post_id" element={<Applicants />}></Route>
        <Route path='/applicant' element={<Applicant />} />
        <Route path='/company/home' element={<CompanyHome />} />
        <Route path='/applicant/home' element={<ApplicantHome />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
