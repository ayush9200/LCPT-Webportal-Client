import React, { useEffect, useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import BootstrapTable from 'react-bootstrap-table-next';

function HomeAuditTabs(props) {
    const [x, setX] = useState([]);

    useEffect(() => {


    }, [])
    var homeSummary1 = [
        {
            'home_id': 'h001',
            'role_id': 'r001',
            'total_staff': 3,
            'num_complaint': 3,
            'num_non_complaint': 0,
        },
        {
            'home_id': 'h001',
            'role_id': 'r002',
            'total_staff': 1,
            'num_complaint': 1,
            'num_non_complaint': 0,
        },
        {
            'home_id': 'h001',
            'role_id': 'r003',
            'total_staff': 1,
            'num_complaint': 1,
            'num_non_complaint': 0,
        },

    ];
    var homeSummary2 = [
        {
            'home_id': 'h002',
            'role_id': 'r003',
            'total_staff': 1,
            'num_complaint': 1,
            'num_non_complaint': 0,
        },


    ];
    var homeSummary3 = [
        {
            'home_id': 'h003',
            'role_id': 'r002',
            'total_staff': 3,
            'num_complaint': 1,
            'num_non_complaint': 2,
        },
        {
            'home_id': 'h003',
            'role_id': 'r003',
            'total_staff': 3,
            'num_complaint': 3,
            'num_non_complaint': 0,
        },
        {
            'home_id': 'h003',
            'role_id': 'r004',
            'total_staff': 1,
            'num_complaint': 1,
            'num_non_complaint': 0,
        },

    ];
    var homeSummary4 = [
        {
            'home_id': 'h004',
            'role_id': 'r001',
            'total_staff': 3,
            'num_complaint': 1,
            'num_non_complaint': 2,
        },
        {
            'home_id': 'h004',
            'role_id': 'r004',
            'total_staff': 1,
            'num_complaint': 0,
            'num_non_complaint': 1,
        },


    ];

    var homeStaff1 = [
        {
            'home_id': 'h001',
            'role_id': 'r001',
            'user_id': 'u001',
            'status': true,
        },
        {
            'home_id': 'h001',
            'role_id': 'r001',
            'user_id': 'u002',
            'status': true,
        },
        {
            'home_id': 'h001',
            'role_id': 'r001',
            'user_id': 'u003',
            'status': true,
        },
        {
            'home_id': 'h001',
            'role_id': 'r002',
            'user_id': 'u004',
            'status': true,
        },
        {
            'home_id': 'h001',
            'role_id': 'r003',
            'user_id': 'u005',
            'status': true,
        },



    ];
    var homeStaff2 = [
        {
            'home_id': 'h002',
            'role_id': 'r003',
            'user_id': 'u006',
            'status': true,
        }

    ];
    var homeStaff3 = [
        {
            'home_id': 'h003',
            'role_id': 'r002',
            'user_id': 'u007',
            'status': false,
        },
        {
            'home_id': 'h003',
            'role_id': 'r002',
            'user_id': 'u008',
            'status': true,
        },
        {
            'home_id': 'h003',
            'role_id': 'r002',
            'user_id': 'u009',
            'status': false,
        },
        {
            'home_id': 'h003',
            'role_id': 'r003',
            'user_id': 'u010',
            'status': true,
        },
        {
            'home_id': 'h003',
            'role_id': 'r003',
            'user_id': 'u011',
            'status': true,
        },
        {
            'home_id': 'h003',
            'role_id': 'r003',
            'user_id': 'u012',
            'status': true,
        },
        {
            'home_id': 'h003',
            'role_id': 'r004',
            'user_id': 'u013',
            'status': true,
        }

    ];
    var homeStaff4 = [
        {
            'home_id': 'h004',
            'role_id': 'r001',
            'user_id': 'u014',
            'status': true,
        },
        {
            'home_id': 'h004',
            'role_id': 'r001',
            'user_id': 'u015',
            'status': false,
        },
        {
            'home_id': 'h004',
            'role_id': 'r001',
            'user_id': 'u016',
            'status': false,
        },
        {
            'home_id': 'h004',
            'role_id': 'r004',
            'user_id': 'u017',
            'status': false,
        },

    ];

    var homeSummary = [];
    var homeStaff = [];
    var homeID = props.homeID;
    if (homeID == "h001") {
        homeSummary = homeSummary1;
        homeStaff = homeStaff1;

    }
    else if (homeID == "h002") {
        homeSummary = homeSummary2;
        homeStaff = homeStaff2;

    }
    else if (homeID == "h003") {
        homeSummary = homeSummary3;
        homeStaff = homeStaff3;

    }
    else if (homeID == "h004") {
        homeSummary = homeSummary4;
        homeStaff = homeStaff4;

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
        dataField: 'num_complaint',
        text: 'Total Complaint'
    }
        , {
        dataField: 'num_non_complaint',
        text: 'Total Non-Complaint'
    }
    ];
    // data = { homeStaff } columns = { homeStaffCols } 
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
    }
    ];



    return (
        <div>
            {/* <h3 style={{ textAlign: "center" }}> Home ID : {props.homeID} </h3> */}
            <Tabs defaultActiveKey="home" fill>
                <Tab eventKey="home" title="Home Summary">
                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button btn btn-dark mb-3"
                        table="homeSummaryTable"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Download In Excel" />
                    <BootstrapTable id='homeSummaryTable' keyField='id' data={homeSummary} columns={homeSummCols} />

                </Tab>

                <Tab eventKey="home-staff-specific" title="Home Staff Summary">
                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button btn btn-dark mb-3"
                        table="homeStaffSpecificTable"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Download In Excel" />
                    <BootstrapTable id='homeStaffSpecificTable' keyField='id' data={homeStaff} columns={homeStaffCols} />
                </Tab>

            </Tabs></div>
    )
}

export default HomeAuditTabs