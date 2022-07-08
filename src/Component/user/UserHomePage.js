import React from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import UserEmployment from './UserEmployment';
import UserProfile from './UserProfile';
import UserAuditReport from './UserAuditReport';
import UserCourses from './UserCourses';

function UserHomePage() {
    return (
        <div style={{ marginTop: "4pc" }}>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="profile" title="Profile">
                    <UserProfile/>
                </Tab>
                <Tab eventKey="createUser" title="Employment">
                    <UserCourses/>
                </Tab>
                <Tab eventKey="verifyCredentials" title="Report" >
                    <UserAuditReport/>
                </Tab>
            </Tabs></div>)
}

export default UserHomePage;