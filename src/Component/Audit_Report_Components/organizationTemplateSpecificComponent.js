import React, { useEffect, useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios'
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';
function OrganizationTemplateSpecificComponent(props) {
    const [orgStaffSummData, setOrgStaffSummData] = useState([]);

    var orgId = props.org_id;

    useEffect(() => {
        // https://lcpt-webportal-backend.herokuapp.com/audit-report/org-template-specific/1
        var gethomeDetailsUrl = BASE_API_URL + "audit-report/org-template-specific/" + orgId;
        axios.get(gethomeDetailsUrl)
            .then(res => {
                console.log(res.data);
                setOrgStaffSummData(res.data)
                // toggleshowSpinner()
            })
            .catch(err => {
                console.log(err);
            })

    }, [orgId])
    var orgStaffSummCols = [{
        dataField: 'user_id',
        text: 'User ID'
    }, {
        dataField: 'course_id',
        text: 'Course ID'
    }

        , {
        dataField: 'badging_document_url',
        text: 'URL'
    }
        , {
        dataField: 'status',
        text: 'Status'
    }
        , {
        dataField: 'validity_date',
        text: 'Validity'
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
            <BootstrapTable id='organizationStaffSpecificTable' keyField='id' data={orgStaffSummData} columns={orgStaffSummCols} /></div>
    )
}

export default OrganizationTemplateSpecificComponent