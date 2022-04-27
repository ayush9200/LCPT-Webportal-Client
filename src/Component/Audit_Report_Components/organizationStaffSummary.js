import React, { useEffect, useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import BootstrapTable from 'react-bootstrap-table-next';
function OrganizationStaffSummary() {
    const [x, setX] = useState([]);

    useEffect(() => {


    }, [])
    var orgStaffSummCols = [{
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
    return (
        <div>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn btn-dark mb-3"
                table="organizationStaffSpecificTable"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Download In Excel" />
            <BootstrapTable id='organizationStaffSpecificTable' keyField='id' data={orgStaffSummData} columns={orgStaffSummCols} />
        </div>
    )
}

export default OrganizationStaffSummary