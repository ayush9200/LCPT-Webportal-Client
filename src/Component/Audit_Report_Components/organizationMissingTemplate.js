import React, { useEffect, useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios'
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';
function OrganizationMissingTemplate(props) {
    const [orgStaffTemplateData, setOrgStaffTemplateSumm] = useState([]);

    var orgId = props.org_id;

    useEffect(() => {
        var gethomeDetailsUrl = BASE_API_URL + "audit-report/org-missing-courses/" + orgId;
        axios.get(gethomeDetailsUrl)
            .then(res => {
                console.log(res.data);
                setOrgStaffTemplateSumm(res.data)
                // toggleshowSpinner()
            })
            .catch(err => {
                console.log(err);
            })

    }, [orgId])
    var orgStaffTemplateCols = [{
        dataField: 'user_id',
        text: 'User ID'
    },
    {
        dataField: 'user_name',
        text: 'User Name'
    }, {
        dataField: 'role_id',
        text: 'Role ID'
    },
    {
        dataField: 'role_name',
        text: 'Role Name'
    },
    {
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