
import './organisation.css';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function TrainStandardComponent() {

    const [trainStandards, setTrainStandards] = useState([]);
    const params = useParams().id;
    useEffect(() => {

        const trainStandardsUrl = "http://localhost:5000/orgnization/getOrganisationDetails/" + params
        axios.get(trainStandardsUrl)
            .then(res => {
                console.log(res);
                setTrainStandards(res.data[0].train_standards)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    function changeText(event, id) {
        trainStandards[id] = event.target.value
        console.log(event.target.value)
        console.log(trainStandards[id])
        trainStandards[id] = event.target.value
        let newtrainStandards = [...trainStandards];     
        newtrainStandards[id] = event.target.value; 
        console.log(newtrainStandards)                 
        setTrainStandards( newtrainStandards );
    }
    function saveText(event){
        console.log("saveText")
        axios.put("http://localhost:5000/orgnization/editTrainingStandards",{id:params,trainStandards:trainStandards})
            .then(res => {
                console.log(res);
                
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div className='org-container'>
            <h1>Set Training Standards for Organisation</h1>
            <Button style={{float:"right",marginRight:"1%",marginBottom:"1%"}} variant="warning">Add New Standard</Button>
            <Button style={{float:"right",marginRight:"1%",marginBottom:"1%"}} onClick={saveText} variant="warning">Save</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S.N.</th>
                        <th>HR Training Standards</th>
                        <th>Action</th>

                    </tr>
                </thead>



                {trainStandards.map((data, id) => {
                    return <tbody key={id}>
                        <tr >
                            <td>{id + 1}</td>
                            <td><div style={{width:"100%",display:"flex"}}> <input style={{flex:1}}  value={data} onChange={(e) => {
                                changeText(e, id);
                            }}></input></div>
                            </td>
                            <td>
                                {/* <Button variant="link" onClick={(e) => {
                                saveText(e, id);
                            }}>Save</Button>/ */}
                            <Button variant="link">Delete</Button></td>
                        </tr>
                    </tbody>
                })}

            </Table>
        </div>);
}