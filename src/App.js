//import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
//import Axios from 'axios';
import Login from './Component/login/login';
import Crud from './Component/crud_practice/Crud';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from './Component/Layout'
import Admin_Home from './Component/Admin_Components/Admin_Home';


function App() {

  return (
    // <Layout>
    <Routes>

      <Route exact path="/" element={<Crud />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/admin_home" element={<Admin_Home />} />
      <Route path="*" component={() => "404 NOT FOUND"} />
    </Routes>
    // </Layout>
  );
}

export default App;
