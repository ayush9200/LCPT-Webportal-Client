import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import CreateUserForm from './CreateUserForm';
import EnterOrganizationForm from './EnterOrganizationForm';
import EnterIndividualForm from './EnterIndividualForm';
import EnterHomeForm from './EnterHomeForm';
function Admin_Home() {
    return (
        <div>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="profile" title="Profile">
                    <h1 style={{ textAlign: "center" }}>Profile</h1>
                </Tab>
                <Tab eventKey="createUser" title="Create User">
                    <CreateUserForm />

                </Tab>
                <Tab eventKey="microCardDash" title="Micro-cred Dashboard" >
                    <h1 style={{ textAlign: "center" }}>Micro-cred Dashboard</h1>
                </Tab>
                <Tab eventKey="verifyCredentials" title="Verify Credentials" >
                    <h1 style={{ textAlign: "center" }}>Verify Credentials</h1>
                </Tab>

                <Tab eventKey="organizationView" title="Organization View" >
                    <EnterOrganizationForm />
                </Tab>
                <Tab eventKey="homeView" title="Home View" >
                    <EnterHomeForm />
                </Tab>
                <Tab eventKey="individualView" title="Individual View" >
                    <EnterIndividualForm />
                </Tab>
            </Tabs></div>)
}

export default Admin_Home