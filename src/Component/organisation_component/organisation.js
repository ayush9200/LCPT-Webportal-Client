
import './organisation.css';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Tab } from 'react-bootstrap'
import HomeCheckListComponent from "./HomeCheckListComponent";
import AuditReportComponent from "./AuditReportComponent";
import OrganisationListComponent from "./OrganisationListComponent";
import TrainStandardComponent from "./TrainStandardComponent";
export default function Organisation() {

const params = useParams().id;
console.log(params)

return (
  
  <div style={{marginTop: "8vh"}}>
    <h1>Organisation : {params} </h1>
      <Tabs defaultActiveKey="trainStandard" id="uncontrolled-tab-example" className="mb-3">
          
          <Tab eventKey="trainStandard" title="Training Standard">
              <TrainStandardComponent />

          </Tab>
          <Tab eventKey="organistionList" title="Homes List" >
              <OrganisationListComponent />
          </Tab>
          <Tab eventKey="homeCheckList" title="Home CheckList Component" >
              <HomeCheckListComponent />
          </Tab>

          <Tab eventKey="auditReport" title="Audit Report" >
              <AuditReportComponent />
          </Tab>
      </Tabs></div>)

}