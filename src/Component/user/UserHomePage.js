import React, { useEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import UserEmployment from './UserEmployment';
import UserProfile from './UserProfile';
import UserAuditReport from './UserAuditReport';


function UserHomePage(props) {

    useEffect(() => {


    }, [props.homeID])




    return (
        <div style={{ marginTop: "4pc" }}>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="profile" title="Profile">
                    <UserProfile homeId={props.homeID} />
                </Tab>
                <Tab eventKey="createUser" title="Employment">
                    <UserEmployment/>
                </Tab>
                <Tab eventKey="verifyCredentials" title="Report" >
                    <UserAuditReport homeId={props.homeID} />
                </Tab>
            </Tabs></div>)
}

export default UserHomePage;