
import './organisation.css';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom'


export default function OrganisationListComponent() {

    const [homeListArray, setHomeListArray] = useState([]);
    const params = useParams().id;
    useEffect(() => {

        const homeListUrl = "http://localhost:5000/orgnization/getHomesList/" + params
        axios.get(homeListUrl)
            .then(res => {
                console.log(res);
                setHomeListArray(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div className='org-container'>
            <h1>Details of Organisation and List of Homes</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Home ID</th>
                        <th>Home Name</th>
                        <th>Action</th>
                        <th>Manage Staff</th>
                    </tr>
                </thead>



                {homeListArray.map((data, id) => {
                    return <tbody key={id}>
                        <tr >
                            <td>{data.home_id}</td>
                            <td>{data.name}</td>
                            <td> <Button variant="warning"><Link to={`/home/${data.home_id}`}>View Home Details</Link></Button></td>
                            <td><Button variant="warning" 
                           ><Link to={`/showStaff/${data.home_id}`}>View Staff Members</Link></Button></td>
                        </tr>
                    </tbody>
                })}

            </Table>
        </div>);
}