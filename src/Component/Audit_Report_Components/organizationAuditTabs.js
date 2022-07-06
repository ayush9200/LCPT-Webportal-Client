import React from 'react'
import { Tabs, Tab, Row } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import HomeAuditTabs from './homeAuditTabs'
import OrganizationSummaryComponent from './organizationSummaryComponent'
import BootstrapTable from 'react-bootstrap-table-next';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import OrganizationStaffSummary from './organizationStaffSummary'
// import { Row } from 'react-bootstrap'
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';
function OrganizationAuditTabs(props) {
    const [homeDetails, setHomeDetails] = useState(null);
    const [userCourseHomeDetails, setUserCourseHomeDetails] = useState([]);
    const [chosenHome, setChosenHome] = useState("1");


    const organizationID = props.organizationID;

    useEffect(() => {
        var gethomeDetailsUrl = BASE_API_URL + "orgnization/getHomesList/" + organizationID;
        axios.get(gethomeDetailsUrl)
            .then(res => {

                console.log(res.data);
                setHomeDetails(res.data)
                // toggleshowSpinner()
            })
            .catch(err => {
                console.log(err);
            })

    }, [organizationID])
    var createHomeIDSelectItems = () => {
        let items = [];
        // items.push(<option value="">All</option>)
        console.log(homeDetails)

        for (var i in homeDetails) {
            console.log(homeDetails[i]);
            items.push(<option value={homeDetails[i].home_id}> {homeDetails[i].home_id} </option>);
        }
        return items;
    }
    // if (homeDetails == null) {
    //     return <h1>Loading Homes....</h1>
    // }


    return (
        <div>

            <Tabs defaultActiveKey="organization" fill>
                <Tab eventKey="organization" title="Organization Summary">
                    <OrganizationSummaryComponent org_id={organizationID} />
                    {/* <BootstrapTable id='organizationSummaryTable' keyField='id' data={orgSumm} columns={columns} />

                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button btn btn-dark mb-3"
                        table="organizationSummaryTable"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Download In Excel" /> */}
                </Tab>
                <Tab eventKey="home" title="Home Specific">
                    <div style={{ display: "flex", marginLeft: "28%" }}>
                        <h2>HOME ID:  </h2>
                        <Form.Select size="lg" style={{ width: "50%" }} onChange={(e) => {
                            var homeID = e.target.value;
                            setChosenHome(homeID);
                            console.log(homeID);

                        }}>
                            {createHomeIDSelectItems()}

                            {/* <option value="1">h001</option>
                            <option value="2">h002</option>
                            <option value="3">h003</option>
                            <option value="4">h004</option> */}
                        </Form.Select>

                    </div>

                    <HomeAuditTabs homeID={chosenHome} orgId={organizationID} />
                    {/* <ViewCourseTable /> */}
                </Tab>
                <Tab eventKey="staff-summary" title="Organization Staff Summary">
                    {/* <EditCourseForm /> */}
                    <OrganizationStaffSummary org_id={organizationID} />
                </Tab>

            </Tabs>
        </div>
    )
}

export default OrganizationAuditTabs