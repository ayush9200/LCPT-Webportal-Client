import React, { useEffect, useState } from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios'
import Config from '../config.json'
import { useParams } from "react-router-dom";
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';
function AdminHomeCourse() {
    const [adminHomeCrsData, setadminHomeCrsData] = useState([]);
    var backendPortUrl = Config.back_end_port + '/';
    const params = useParams().id;


    useEffect(() => {
        // if(sessionStorage.getItem("userType")!='admin')
        // {
        //     alert("Sorry.Access Not Permitted")
        //     return window.location.href = BASE_URL_FRONTEND;  
        
        // }
        // https://lcpt-webportal-backend.herokuapp.com/audit-report/org-template-specific/1
        //else{
            var getAdmHmCrsURL = BASE_API_URL + "admin-data/home-crs-role";
            axios.get(getAdmHmCrsURL)
                .then(res => {
                    console.log(res.data);
                    setadminHomeCrsData(res.data)
                    // toggleshowSpinner()
                })
                .catch(err => {
                    console.log(err);
                })
        //}
        
    }, [])
    var adminHomeCrsCols = [{
        dataField: 'home_id',
        text: 'Home ID'
    }, {
        dataField: 'role_id',
        text: 'Role ID'
    }

        , {
        dataField: 'role_name',
        text: 'Role Name'
    }
        , {
        dataField: 'course_id_arr',
        text: 'Course IDs'
    }

        , {
        dataField: 'archived',
        text: 'Is Archived?'
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
            <BootstrapTable id='organizationStaffSpecificTable' keyField='id' data={adminHomeCrsData} columns={adminHomeCrsCols} /></div>
    )
}

export default AdminHomeCourse