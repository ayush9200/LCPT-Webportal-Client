import React, { useEffect, useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'

function HomeAuditTabs(props) {
    const [x, setX] = useState([]);

    useEffect(() => {


    }, [])

    return (
        <div>
            <h3 style={{ textAlign: "center" }}> Home ID: {props.homeID} </h3>
            <Tabs defaultActiveKey="view" fill>
                <Tab eventKey="organization" title="Organization Summary">

                </Tab>
                <Tab eventKey="home" title="Home Specific">
                    {/* <ViewCourseTable /> */}
                </Tab>
                <Tab eventKey="home-staff-specific" title="Home Staff Specific">
                    {/* <EditCourseForm /> */}
                </Tab>

            </Tabs></div>
    )
}

export default HomeAuditTabs