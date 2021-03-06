import React, { useEffect, useState } from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Tabs, Tab, Form } from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios'
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';
import HomeDeficiencyReport from './HomeDeficiencyReport';
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
        var gethomeDetailsUrl = BASE_API_URL + "audit-report/home-summary/" + homeID;
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
        var gethomeStaffDetailsUrl = BASE_API_URL + "audit-report/home-staff-summary/" + homeID;
        axios.get(gethomeStaffDetailsUrl)
            .then(res => {
                console.log(res.data);
                setHomeStaffDataFinal(res.data)
                // toggleshowSpinner()
            })
            .catch(err => {
                console.log(err);
            })


    }, [homeID])
    if (homeSummData == null) {
        return <h1>Loading</h1>
    }


    var homeSummCols = [{
        dataField: 'role_id',
        text: 'Role ID'
    }, {
        dataField: 'role_name',
        text: 'Role Name'
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
        dataField: 'role_id',
        text: 'Role ID'
    }, {
        dataField: 'role_name',
        text: 'Role Name'
    }
        , {
        dataField: 'user_id',
        text: 'User ID'
    }, {
        dataField: 'user_name',
        text: 'User Name'
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

    var exportHomeDefPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 5;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Home Staff Report";

        var headers = [["role_id", "role_name", "user_id", "user_name", "status", "is_complaint"]];

        var dataArr = [];

        for (let i = 0; i < filteredHomeStaffData.length; i++) {
            var tempArr = [filteredHomeStaffData[i]["role_id"], filteredHomeStaffData[i]["role_name"], filteredHomeStaffData[i]["user_id"],
            filteredHomeStaffData[i]["user_name"], filteredHomeStaffData[i]["status"], filteredHomeStaffData[i]["is_complaint"]];

            dataArr.push(tempArr);


        }


        let content = {
            startY: 50,
            head: headers,
            body: dataArr
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("homeStaffReport.pdf")
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
                        <button onClick={() => exportHomeDefPDF()}>Generate PDF Report</button>


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

                <Tab eventKey="homeDeficiencyReport" title="Home Deficiency Report">

                    <HomeDeficiencyReport homeId={homeID} />
                </Tab>

            </Tabs></div>
    )
}

export default HomeAuditTabs