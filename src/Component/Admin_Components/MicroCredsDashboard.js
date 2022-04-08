import React from 'react';
import { Table } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';

function MicroCredsDashboard() {
    var microCredsObj = [
        { EMP_USR_ID: "UI001", USER_ID: "UI001", COURSE_ID: "CI001", STATUS: true, VALIDITY: "2022-10-22", DOCUMENT_URL: "xyz@url.com" },
        { EMP_USR_ID: "UI002", USER_ID: "UI002", COURSE_ID: "CI002", STATUS: true, VALIDITY: "2022-12-22", DOCUMENT_URL: "xyz2@url.com" },
        { EMP_USR_ID: "UI003", USER_ID: "UI003", COURSE_ID: "CI004", STATUS: false, VALIDITY: "", DOCUMENT_URL: "xyz@url.com" },
        { EMP_USR_ID: "UI004", USER_ID: "UI004", COURSE_ID: "CI004", STATUS: true, VALIDITY: "2022-10-22", DOCUMENT_URL: "xyz@url.com" },
        { EMP_USR_ID: "UI005", USER_ID: "UI005", COURSE_ID: "CI005", STATUS: true, VALIDITY: "2022-10-22", DOCUMENT_URL: "xyz@url.com" }
    ]

    var cols = [{
        dataField: 'EMP_USR_ID',
        text: 'Employee User ID'
    },
    {
        dataField: 'USER_ID',
        text: 'User ID'
    },
    {
        dataField: 'COURSE_ID',
        text: 'COURSE ID'
    },
    {
        dataField: 'STATUS',
        text: 'STATUS'
    },
    {
        dataField: 'VALIDITY',
        text: 'VALIDITY'
    },
    {
        dataField: 'DOCUMENT_URL',
        text: 'DOCUMENT URL'
    },
    ]
    return (
        <div>

            <BootstrapTable striped hover keyField='EMP_USR_ID' data={microCredsObj} columns={cols} />




        </div>
    )
}

export default MicroCredsDashboard