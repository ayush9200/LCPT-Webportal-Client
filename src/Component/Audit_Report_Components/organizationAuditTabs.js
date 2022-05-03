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
function OrganizationAuditTabs(props) {
    const [homeDetails, setHomeDetails] = useState([]);
    const [userCourseHomeDetails, setUserCourseHomeDetails] = useState([]);
    const [chosenHome, setChosenHome] = useState("1");


    const organizationID = props.organizationID;

    useEffect(() => {
        var gethomeDetailsUrl = "https://lcpt-webportal-backend.herokuapp.com/orgnization/getOrganisationDetails/" + organizationID;
        axios.get(gethomeDetailsUrl)
            .then(res => {
                console.log(res.data[0]);
                setHomeDetails(res.data[0])
                // toggleshowSpinner()
            })
            .catch(err => {
                console.log(err);
            })

    }, [])
    var orgSumm = [{
        'home_id': 'h001',
        'home_name': '"luffy home" ',
        'is_complaint': true,
        'num_complaint': 5,
        'num_non_complaint': 0,
    },
    {
        'home_id': 'h002',
        'home_name': '"zoro home" ',
        'is_complaint': true,
        'num_complaint': 1,
        'num_non_complaint': 0,
    },
    {
        'home_id': 'h003',
        'home_name': '"kaido home" ',
        'is_complaint': false,
        'num_complaint': 5,
        'num_non_complaint': 2,
    },
    {
        'home_id': 'h004',
        'home_name': '"linlin home" ',
        'is_complaint': false,
        'num_complaint': 1,
        'num_non_complaint': 3,
    }
    ];
    var columns = [{
        dataField: 'home_id',
        text: 'Home ID'
    }, {
        dataField: 'home_name',
        text: 'Home Name'
    }
        , {
        dataField: 'is_complaint',
        text: 'Is Complaint?'
    }
        , {
        dataField: 'num_complaint',
        text: 'Total Complaint'
    }
        , {
        dataField: 'num_non_complaint',
        text: 'Total Non-Complaint'
    }
    ];


    return (
        <div>

            <Tabs defaultActiveKey="organization" fill>
                <Tab eventKey="organization" title="Organization Summary">
                    <OrganizationSummaryComponent />
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
                            <option value="1">h001</option>
                            <option value="2">h002</option>
                            <option value="3">h003</option>
                            <option value="4">h004</option>
                        </Form.Select>

                    </div>

                    <HomeAuditTabs homeID={chosenHome} />
                    {/* <ViewCourseTable /> */}
                </Tab>
                <Tab eventKey="staff-summary" title="Organization Staff Summary">
                    {/* <EditCourseForm /> */}
                    <OrganizationStaffSummary />
                </Tab>

            </Tabs>
        </div>
    )
}

export default OrganizationAuditTabs