import React, { useEffect, useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import BootstrapTable from 'react-bootstrap-table-next';
import OrganizationTemplateSpecificComponent from './organizationTemplateSpecificComponent';
import OrganizationMissingTemplate from './organizationMissingTemplate';

// import { Button } from 'react-bootstrap';
function OrganizationStaffSummary(props) {
    const [x, setX] = useState([]);


    useEffect(() => {


    }, [props.org_id])

    return (
        <div>
            {/* <h1>Organization Staff Summary</h1> */}
            <Tabs defaultActiveKey="templateSpecfic" fill>
                <Tab eventKey="templateSpecfic" title="Template Specific">
                    <OrganizationTemplateSpecificComponent org_id={props.org_id} />
                </Tab>
                <Tab eventKey="deficiencyReport" title="Deficiency Report">
                    <OrganizationMissingTemplate org_id={props.org_id} />
                </Tab>
            </Tabs>

        </div>
    )
}

export default OrganizationStaffSummary