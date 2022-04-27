import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import HomeAuditTabs from './homeAuditTabs'
function OrganizationAuditTabs() {
    const [homeID, setHomeID] = useState("h001");

    useEffect(() => {


    }, [])
    return (
        <div>
            <Tabs defaultActiveKey="organization" fill>
                <Tab eventKey="organization" title="Organization Summary">

                </Tab>
                <Tab eventKey="home" title="Home Specific">
                    <HomeAuditTabs homeID={homeID} />
                    {/* <ViewCourseTable /> */}
                </Tab>
                <Tab eventKey="staff-summary" title="Organization Staff Summary">
                    {/* <EditCourseForm /> */}
                </Tab>

            </Tabs>
        </div>
    )
}

export default OrganizationAuditTabs