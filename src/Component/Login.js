import React, { useState, useEffect, useContext } from 'react';
import "./login.css"
import $ from 'jquery';
import { Navigate } from 'react-router-dom';

import { setData } from '../Redux/DataSlice';
import { useDispatch } from 'react-redux';





var userNameFieldChanged = (event) => {
    document.getElementById("errorH4").style.display = "none"
    if (document.getElementById("username").value != "") {
        document.getElementById("errorH6UserName").style.display = "none"

    } else {
        document.getElementById("errorH6UserName").style.display = "block"

    }
}
var passwordFieldChanged = (event) => {
    document.getElementById("errorH4").style.display = "none"
    if (document.getElementById("password").value != "") {
        document.getElementById("errorH6Password").style.display = "none"

    } else {
        document.getElementById("errorH6Password").style.display = "block"
    }
}




function LoginPage() {
    const [state, setState] = useState({ username: "", password: "" });
    const [isloggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();



    const loginFunction = async () => {





        if (document.getElementById("username").value != "") {
            document.getElementById("errorH6UserName").style.display = "none"

        }
        if (document.getElementById("password").value != "") {
            document.getElementById("errorH6Password").style.display = "none"

        }

        if (document.getElementById("username").value == "" || document.getElementById("password").value == "") {
            if (document.getElementById("username").value == "" && document.getElementById("password").value == "") {
                document.getElementById("errorH6UserName").style.display = "block"
                document.getElementById("errorH6Password").style.display = "block"


            } else if (document.getElementById("username").value == "") {
                document.getElementById("errorH6UserName").style.display = "block"

            } else {
                document.getElementById("errorH6Password").style.display = "block"

            }

        }
      

        let formData = new FormData();

        formData.append('loginId', document.getElementById("username").value);
        formData.append('password', document.getElementById("password").value);
        await fetch('http://localhost:8090/login', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                dispatch(setData(data))
                setIsLoggedIn(true);
            }).catch(err => {
                document.getElementById("errorH4").style.display = "block"
                console.log(err);
            })
            .catch(err => {
                console.log(err);
            })

    

    }


    

    useEffect(() => {
        $(document).ready(function () {
            $(".nav-tabs li").click(function () {
                console.log("tab clicked")
                $(".nav-tabs li").removeClass("show");// use show class instead of active
                $(this).addClass("show");
                // $() to make all input fields blank.... so as to counter the problem if one id and password is filled and user clicks on empty one
            });
        });
        const script1 = document.createElement("script");
        const script2 = document.createElement("script");

        script1.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
        script1.async = true;
        script2.src = "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js";
        script2.async = true;

        document.body.appendChild(script1);
        document.body.appendChild(script2);


     

    });
 





    // if (isloggedIn) {
    //     return <Navigate to='/dashboard' />
    // }

    return (
        <div class="wrapper fadeInDown">
            <div id="formContent">


                <form>
                    <h4 id="errorH4" style={{ color: "red", display: "none" }}>Incorrect User Id or Password</h4>
                    <input type="text" id="username" class="fadeIn second" name="username" placeholder="username" onChange={userNameFieldChanged} />
                    <h6 id="errorH6UserName" style={{ color: "red", display: "none" }}> Username cannot be empty</h6>
                    <input type="password" id="password" class="fadeIn third" name="password" placeholder="password" onChange={passwordFieldChanged} />
                    <h6 id="errorH6Password" style={{ color: "red", display: "none" }}> Password cannot be empty</h6>
                    <input type="submit" class="fadeIn fourth" value="Log In" onClick={async (e) => {
                        e.preventDefault();

                        loginFunction()
                    }} />
                </form>



            </div>
        </div>
    );
}









export default LoginPage;































