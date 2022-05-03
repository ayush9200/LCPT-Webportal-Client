import React, { useEffect, useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios'
function OrganizationMissingTemplate(props) {
    const [orgStaffTemplateData, setOrgStaffTemplateSumm] = useState([]);


    useEffect(() => {
        var orgId = props.org_id;
        var gethomeDetailsUrl = "http://localhost:5000/audit-report/org-missing-courses/" + orgId;
        axios.get(gethomeDetailsUrl)
            .then(res => {
                console.log(res.data);
                setOrgStaffTemplateSumm(res.data)
                // toggleshowSpinner()
            })
            .catch(err => {
                console.log(err);
            })

    }, [])
    var orgStaffTemplateCols = [{
        dataField: 'user_id',
        text: 'User ID'
    }, {
        dataField: 'role_id',
        text: 'Role ID'
    }

        , {
        dataField: 'home_id',
        text: 'Home ID'
    }
        , {
        dataField: 'missing_courses',
        text: 'Incomplete Course IDs'
    }

    ];
    return (
        <div>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn btn-dark mb-3"
                table="organizationStaffTemplateTable"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Download In Excel" />
            <BootstrapTable id='organizationStaffTemplateTable' keyField='id' data={orgStaffTemplateData} columns={orgStaffTemplateCols} /></div>
    )
}

export default OrganizationMissingTemplate