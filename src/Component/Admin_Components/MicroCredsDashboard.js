import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';

function MicroCredsDashboard() {

    return (
        <div style={{ marginTop: "7vh" }}>
            <Tabs defaultActiveKey="course" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="course" title="Profile">
                    <h1 style={{ textAlign: "center" }}>Course</h1>
                </Tab>
                <Tab eventKey="course-home-mapping" title="course-home-mapping">
                    <h1 style={{ textAlign: "center" }}>course-home-mapping</h1>
                </Tab>
                <Tab eventKey="course-user-mapping" title="course-user-mapping">
                    <h1 style={{ textAlign: "center" }}>course-user-mapping</h1>
                </Tab>
            </Tabs>
        </div>
    )

}

export default MicroCredsDashboard