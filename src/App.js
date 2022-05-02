import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from './Component/Layout'
import Admin_Home from './Component/Admin_Components/Admin_Home';
import LoginForm from './Component/login/LoginForm';
import Organisation from './Component/organisation_component/organisation'
import UserHomePage from './Component/user/UserHomePage';
import UserRegistration from './Component/user_registration/UserRegistration';

import StaffComponent from './Component/organisation_component/StaffComponent';
import HomeDetailComponent from './Component/organisation_component/HomeDetailComponent';
import HomeCheckListComponent from './Component/organisation_component/HomeCheckListComponent';
import RoleTemplate from './Component/organisation_component/RoleTemplate';

function App() {

  return (
    <Layout>
      <Routes >

        <Route exact path="/" element={<h1 style={{ textAlign: "center", "marginTop": "20vh", 'minHeight':'40pc' }}>Home Page</h1>} />
        <Route exact path="/" element={<h1 style={{ textAlign: "center", "marginTop": "20vh" }}>Home Page</h1>} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/admin_home" element={<Admin_Home />} />
        <Route exact path="/organisation/:id" element={<Organisation/>}/>
        <Route exact path="/home/:id" element={<HomeDetailComponent/>}/>
        <Route exact path="/checkList/:id" element={<HomeCheckListComponent/>}/>
        <Route exact path="/showStaff/:id" element={<StaffComponent/>}/>
        <Route exact path="/user/:id" element={<UserHomePage/>}/>
        <Route exact path="/roleTemplate/:homeId/:roleId" element={<RoleTemplate/>}/>
        <Route exact path="/userRegistration" element={<UserRegistration/>}/>
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Routes>
    </Layout>
  );
}

export default App;
