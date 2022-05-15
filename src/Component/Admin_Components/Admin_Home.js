import React, { useState, useEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import CreateUserForm from './CreateUserForm';
import EnterOrganizationForm from './EnterOrganizationForm';
import EnterIndividualForm from './EnterIndividualForm';
import EnterHomeForm from './EnterHomeForm';
import MicroCredsDashboard from './MicroCredsDashboard';
import Organisation from '../organisation_component/organisation';
import HomeDetailComponent from '../organisation_component/HomeDetailComponent';
import AdminUserEditor from './AdminUserEditor';
function Admin_Home() {

    const [orgIdForAdmin, setOrgIdForAdmin] = useState("1");
    const [homeIdForAdmin, setomeIdForAdmin] = useState("1");
    useEffect(() => {



    }, [])

    return (
        <div style={{ marginTop: "7vh" }}>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3" fill>
                <Tab eventKey="profile" title="Profile">
                    <h1 style={{ textAlign: "center" }}>Profile</h1>
                </Tab>
                <Tab eventKey="createUser" title="Create User">
                    <CreateUserForm />

                </Tab>
                <Tab eventKey="microCardDash" title="Micro-cred Dashboard" >
                    <MicroCredsDashboard />
                </Tab>
                <Tab eventKey="verifyCredentials" title="User Editor" >
                    {/* <h1 style={{ textAlign: "center" }}>Verify Credentials</h1> */}
                    <AdminUserEditor />
                </Tab>

                <Tab eventKey="organizationView" title="Organizations" >
                    <Organisation orgIdForAdmin={orgIdForAdmin} />
                    {/* <EnterOrganizationForm /> */}
                </Tab>
                <Tab eventKey="homeView" title="Homes" >
                    {/* <EnterHomeForm /> */}
                    <HomeDetailComponent homeIdFprAdmin={homeIdForAdmin} />
                </Tab>
                <Tab eventKey="individualView" title="Users" >
                    <EnterIndividualForm />
                </Tab>
            </Tabs></div>)
}

export default Admin_Home