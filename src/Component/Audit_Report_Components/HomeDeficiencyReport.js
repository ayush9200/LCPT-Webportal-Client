import React, { useEffect, useState } from 'react'
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Tabs, Tab } from 'react-bootstrap'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios'
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';
function HomeDeficiencyReport(props) {

    const [hmStaffTemplateData, setHmStaffTemplateSumm] = useState([]);

    // var orgId = props.org_id;
    var homeId = props.homeId;

    useEffect(() => {
        var gethomeDetailsUrl = BASE_API_URL + "audit-report/home-missing-courses/" + homeId;
        axios.get(gethomeDetailsUrl)
            .then(res => {
                console.log(res.data);
                setHmStaffTemplateSumm(res.data)
                // toggleshowSpinner()
            })
            .catch(err => {
                console.log(err);
            })

    }, [homeId])
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
    }, {
        dataField: 'missing_courses',
        text: 'Incomplete Course IDs'
    }

    ];


    var exportHomeDefPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 5;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Home Deficiency Report";

        var headers = [["user_id", "user_name", "role_id", "role_name", "home_id", "missing_courses"]];

        var dataArr = [];

        for (let i = 0; i < hmStaffTemplateData.length; i++) {
            var tempArr = [hmStaffTemplateData[i]["user_id"], hmStaffTemplateData[i]["user_name"], hmStaffTemplateData[i]["role_id"],
            hmStaffTemplateData[i]["role_name"], hmStaffTemplateData[i]["home_id"], hmStaffTemplateData[i]["missing_courses"],];

            dataArr.push(tempArr);


        }


        let content = {
            startY: 50,
            head: headers,
            body: dataArr
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("homeDeficiencyReport.pdf")
    }
    return (
        <div>
            <button onClick={() => exportHomeDefPDF()}>Generate PDF Report</button>

            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn btn-dark mb-3"
                table="organizationStaffTemplateTable"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Download In Excel" />
            <BootstrapTable id='organizationStaffTemplateTable' keyField='id' data={hmStaffTemplateData} columns={orgStaffTemplateCols} /></div>
    )
}

export default HomeDeficiencyReport