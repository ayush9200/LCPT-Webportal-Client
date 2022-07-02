import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Form } from 'react-bootstrap'
import { useParams } from "react-router-dom";

import axios from 'axios'
import { BASE_API_URL } from '../Url-config';
import HomeDetailComponent from './HomeDetailComponent';
import HomeAuditTabs from '../Audit_Report_Components/homeAuditTabs';
function HomeMainComponent(props) {
    var propsOrgId = props.orgId;
    var paramId = useParams().id
    var propsId = props.homeIdFprAdmin
    var params = propsId;
    if (!propsId) {

        params = paramId;
    }

    return (
        <div>
            <Tabs defaultActiveKey="homeDetails" fill style={{ display: "flex", marginTop: "5%" }}>

                <Tab eventKey="homeDetails" title="Home Details">
                    <HomeDetailComponent homeIdFprAdmin={params} />

                </Tab>

                <Tab eventKey="homeAuditTabs" title="Home Audit Tabs">
                    <HomeAuditTabs homeID={params} />
                </Tab>

                
            </Tabs>

        </div>
    )
}

export default HomeMainComponent