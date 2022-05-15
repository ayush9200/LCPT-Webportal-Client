import React, { useEffect, useState } from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios'

function AdminUserCourse() {
    const [adminUserCrsData, setadminUserCrsData] = useState([]);


    useEffect(() => {
        var getAdmUsrCrsURL = "https://lcpt-webportal-backend.herokuapp.com/admin-data/user-crs";
        axios.get(getAdmUsrCrsURL)
            .then(res => {
                console.log(res.data);
                setadminUserCrsData(res.data)
            })
            .catch(err => {
                console.log(err);
            })

    }, [])
    var adminUserCrsCols = [{
        dataField: 'user_id',
        text: 'User ID'
    }, {
        dataField: 'course_id',
        text: 'Course ID'
    }

        , {
        dataField: 'badging_document_url',
        text: 'Badging Document URL'
    }
        , {
        dataField: 'status',
        text: 'Status'
    }

        , {
        dataField: 'validity_date',
        text: 'Validity Date'
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
            <BootstrapTable id='organizationStaffSpecificTable' keyField='id' data={adminUserCrsData} columns={adminUserCrsCols} />
        </div>
    )
}

export default AdminUserCourse