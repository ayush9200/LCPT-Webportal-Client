import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useParams } from "react-router-dom";
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';
import axios from 'axios'
function OrganizationSummaryComponent(props) {
    // const org_id = useParams().id;
    const org_id = props.org_id;
    console.log(org_id)
    const [orgSummDetails, setOrgSummDetails] = useState([]);
    const [orgSummFinal, setOrgSummFinal] = useState([]);
    var fillOrganizationSumm = (orgSummDetailsArr) => {
        var tempOrgSumm = [];
        for (let i = 0; i < orgSummDetailsArr.length; i++) {
            var tempObj = {
                'home_id': orgSummDetailsArr[i][0],
                'home_name': orgSummDetailsArr[i][1],
                'is_complaint': orgSummDetailsArr[i][2],
                'num_complaint': orgSummDetailsArr[i][3],
                'num_non_complaint': orgSummDetailsArr[i][4],
            }
            tempOrgSumm.push(tempObj);
            console.log(orgSummDetailsArr[i])
            console.log(orgSummDetailsArr)
        }
        setOrgSummFinal(tempOrgSumm);
        console.log(orgSummFinal);
        // return orgSummFinal;

    }

    useEffect(() => {
        // toggleshowSpinner()
        const gethomeDetailsUrl = BASE_API_URL + "audit-report/org-summary/" + org_id
        axios.get(gethomeDetailsUrl)
            .then(res => {
                console.log(res.data);
                setOrgSummDetails(res.data);
                console.log(orgSummDetails)
                fillOrganizationSumm(res.data);

            })
            .catch(err => {
                console.log(err);
            })

    }, [org_id])
    // var orgSumm = [{
    //     'home_id': 'h001',
    //     'home_name': '"luffy home" ',
    //     'is_complaint': true,
    //     'num_complaint': 5,
    //     'num_non_complaint': 0,
    // },

    // ];
    var columns = [{
        dataField: 'home_id',
        text: 'Home ID'
    }, {
        dataField: 'home_name',
        text: 'Home Name'
    }
        , {
        dataField: 'is_complaint',
        text: 'Is Complaint?'
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

    if (orgSummFinal == []) {
        return (
            <div>Loading</div>
        )
    }

    var exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 10;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Organization Summary Report";

        var headers = [["home_id", "home_name", "is_complaint", "num_complaint", "num_non_complaint"]]

        console.log(orgSummDetails);


        let content = {
            startY: 50,
            head: headers,
            body: orgSummDetails
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
    }

    return (
        <div>
            <BootstrapTable id='organizationSummaryTable' keyField='home_id' data={orgSummFinal} columns={columns} />
            {/* <OrganizationSummaryComponent /> */}
            <button onClick={() => exportPDF()}>Generate PDF Report</button>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn btn-dark mb-3"
                table="organizationSummaryTable"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Download In Excel" />
        </div>
    )
}

export default OrganizationSummaryComponent