import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';
import axios from 'axios';

function AddNewAdmin() {
    const [userIdList, setUserIdList] = useState([]);
    const [userId, setUserId] = useState("");


    var mainDivStyling = {
        width: "80vw",
        margin: "auto"
    }

    useEffect(() => {
        // user / getAll
        var gethomeDetailsUrl = BASE_API_URL + "user/getAll";
        axios.get(gethomeDetailsUrl)
            .then(res => {

                console.log(res.data.data);
                var userIDListArr = [];
                for (let i = 0; i < res.data.data.length; i++) {
                    userIDListArr.push(res.data.data[i]["fullName"] + " (" + res.data.data[i]["user_id"] + ")");
                }
                setUserIdList(userIDListArr)
                console.log()
                // toggleshowSpinner()
            })
            .catch(err => {
                console.log(err);
            })







    }, [])




    return (
        <div style={mainDivStyling}>
            <h1>User Id: {userId}</h1>
            <Autocomplete
                disablePortal
                id="userIdAutoInputs"
                options={userIdList}
                sx={{ width: 300 }}
                onChange={(e, v) => {
                    var val = v.split("(")[1].split(")")[0];
                    console.log("in on change  " + val)
                    setUserId(val);
                }}
                renderInput={(params) => <TextField {...params} label="Users" />}
            />






        </div>
    )
}

export default AddNewAdmin