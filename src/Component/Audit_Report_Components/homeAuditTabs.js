import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Form } from 'react-bootstrap'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios'
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';
function HomeAuditTabs(props) {
    const [staffRoleID, setStaffRoleID] = useState("");
    const [homeSummData, setHomeSummData] = useState(null);
    const [homeStaffDataFinal, setHomeStaffDataFinal] = useState(null);
    // var homeSummary = [];
    var homeStaff = [];
    var homeID = props.homeID;
    console.log(homeID)

    useEffect(() => {
        // /audit-report/home-summary/1
        var gethomeDetailsUrl = BASE_API_URL+"audit-report/home-summary/" + homeID;
        axios.get(gethomeDetailsUrl)
            .then(res => {
                console.log(res.data);
                setHomeSummData(res.data)
                // toggleshowSpinner()
            })
            .catch(err => {
                console.log(err);
            })
        // /audit-report/home-staff-summary/1
        var gethomeStaffDetailsUrl = BASE_API_URL+"audit-report/home-staff-summary/" + homeID;
        axios.get(gethomeStaffDetailsUrl)
            .then(res => {
                console.log(res.data);
                setHomeStaffDataFinal(res.data)
                // toggleshowSpinner()
            })
            .catch(err => {
                console.log(err);
            })


    }, [props.homeID])
    if (homeSummData == null) {
        return <h1>Loading</h1>
    }


    var homeSummCols = [{
        dataField: 'home_id',
        text: 'Home ID'
    }, {
        dataField: 'role_id',
        text: 'Role ID'
    }
        , {
        dataField: 'total_staff',
        text: 'Total Staff'
    }
        , {
        dataField: 'complaint_staff',
        text: 'Complaint Staff'
    }
        , {
        dataField: 'non_complaint_staff',
        text: 'Non-Complaint Staff'
    }
    ];
    var homeStaffCols = [{
        dataField: 'home_id',
        text: 'Home ID'
    }, {
        dataField: 'role_id',
        text: 'Role ID'
    }
        , {
        dataField: 'user_id',
        text: 'User ID'
    }
        , {
        dataField: 'status',
        text: 'Status'
    },
        , {
        dataField: 'is_complaint',
        text: 'Is Compolaint ?'
    },

    ];
    var createRoleIDSelectItems = () => {
        let items = [];
        items.push(<option value="">All</option>)
        console.log(homeSummData)

        for (var i in homeSummData) {
            console.log(homeSummData[i]);
            items.push(<option value={homeSummData[i].role_id}> {homeSummData[i].role_id} </option>);
        }
        return items;
    }
 
    var filteredHomeStaffData = [];
    if (homeStaffDataFinal != null) {
        filteredHomeStaffData = homeStaffDataFinal.filter((val) => {
            if (staffRoleID == "") {
                return val;
            } else if (staffRoleID == val.role_id) {
                return val;
            }
        })
    }

    return (
        <div key={props.homeID}>
            <h3 style={{ textAlign: "center" }}> Home ID : {props.homeID} </h3>
            <Tabs defaultActiveKey="home" fill>
                <Tab eventKey="home" title="Home Summary">
                    <BootstrapTable id='homeSummaryTable' keyField='id' data={homeSummData} columns={homeSummCols} />
                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button btn btn-dark mb-3"
                        table="homeSummaryTable"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Download In Excel" />

                </Tab>

                <Tab eventKey="home-staff-specific" title="Home Staff Summary">
                    <div style={{ display: "flex", marginLeft: "22%" }}>
                        <h4>Role ID:  </h4>
                        <select size="lg" style={{ width: "50%" }} onChange={(e) => {
                            var roleID = e.target.value;
                            setStaffRoleID(roleID);

                        }}>
                            {createRoleIDSelectItems()}
                        </select>

                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button btn btn-dark mb-3"
                            table="homeStaffSpecificTable"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="Download In Excel" />
                    </div>
                    <BootstrapTable id='homeStaffSpecificTable' keyField='id' data={filteredHomeStaffData} columns={homeStaffCols} />
                </Tab>

            </Tabs></div>
    )
}

export default HomeAuditTabs