import React, { useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios'
import VerifyCredentials from './VerifyCredentials';
function AdminUserEditor() {

    const [adminUserEditorData, setAdminUserEditorData] = useState([]);
    const [userCrsRow, setUserCrsRow] = useState({});
    const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);
    var changeUserCrsClicked = (row) => {
        setIsEditBtnClicked(false);
        console.log(row)
        var userCrsRow = {
            mongoID: row._id,
            userId: row.user_id,
            courseId: row.course_id,
            url: row.badging_document_url,
            status: row.status,
            validityDate: row.validity_date
        }
        setUserCrsRow(userCrsRow)
        setIsEditBtnClicked(true);

    }

    useEffect(() => {
        var getAdmUsrCrsURL = "http://localhost:5000/admin-data/user-crs";
        axios.get(getAdmUsrCrsURL)
            .then(res => {
                console.log(res.data);
                setAdminUserEditorData(res.data)
            })
            .catch(err => {
                console.log(err);
            })

    }, [])
    var adminUserEditorCols = [{
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

        , {
        dataField: 'link',
        text: 'Edit Details',
        formatter: (rowContent, row) => {
            // console.log(rowContent)

            return (
                <button onClick={(e) => {
                    changeUserCrsClicked(row)

                }}> Edit </button>
            )
        }
    }
    ];
    return (
        <div>
            {isEditBtnClicked && <VerifyCredentials userCrsRowData={userCrsRow} />}
            <div>

                <BootstrapTable id='organizationStaffSpecificTable' keyField='id' data={adminUserEditorData} columns={adminUserEditorCols} />
            </div>
            {/* <VerifyCredentials userCrsRowData={userCrsRow} style={{ display: 'none' }} /> */}
        </div>
    )
}

export default AdminUserEditor