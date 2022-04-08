import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import CreateUserForm from './CreateUserForm';
import EnterOrganizationForm from './EnterOrganizationForm';
import EnterIndividualForm from './EnterIndividualForm';
import EnterHomeForm from './EnterHomeForm';
import MicroCredsDashboard from './MicroCredsDashboard';
function Admin_Home() {
    return (
        <div style={{ marginTop: "7vh" }}>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="profile" title="Profile">
                    <h1 style={{ textAlign: "center" }}>Profile</h1>
                </Tab>
                <Tab eventKey="createUser" title="Create User">
                    <CreateUserForm />

                </Tab>
                <Tab eventKey="microCardDash" title="Micro-cred Dashboard" >
                    <h1 style={{ textAlign: "center" }}><MicroCredsDashboard /></h1>
                </Tab>
                <Tab eventKey="verifyCredentials" title="Verify Credentials" >
                    <h1 style={{ textAlign: "center" }}>Verify Credentials</h1>
                </Tab>

                <Tab eventKey="organizationView" title="Organizations" >
                    <EnterOrganizationForm />
                </Tab>
                <Tab eventKey="homeView" title="Homes" >
                    <EnterHomeForm />
                </Tab>
                <Tab eventKey="individualView" title="Users" >
                    <EnterIndividualForm />
                </Tab>
            </Tabs></div>)
}

export default Admin_Home