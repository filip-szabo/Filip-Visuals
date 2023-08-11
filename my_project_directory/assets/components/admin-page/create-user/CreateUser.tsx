import React, {useState} from "react";
import "./CreateUser.css";
import AdminNav from "../../common/Navbar/AdminNav/AdminNav";
import {SelectChangeEvent} from "@mui/material/Select";
import BasicSelect from "../../common/BasicSelect/BasicSelect";

function CreateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [school, setSchool] = useState("");
    const [classes, setClasses] = useState("");

    let createUser = (e:any) => {
        e.preventDefault();

        fetch("http://127.0.0.1:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name:name,
                email:email,
                password:password,
                city:city,
                school:school,
                classes:classes,
            }),
        })
            .then(response =>{
                console.log(response.json());
            })
    }

    const cityChange = (event: SelectChangeEvent) => {
        setCity(event.target.value as string);
    };

    const schoolChange = (event: SelectChangeEvent) => {
        setSchool(event.target.value as string);
    };
    const classChange = (event: SelectChangeEvent) => {
        setClasses(event.target.value as string);
    };

    return(
        <>
            <div className="register-background">
                <AdminNav />
                <div className="signup">
                    <div className="container">
                        <form action="" method="post">
                            <h2>Create user</h2>
                            <div className="content">

                                <div className="input-box">
                                    <label htmlFor="name">Full Name</label>
                                    <input type="text" placeholder="Enter your full name" name="name" required value={name} onChange={(e) => setName(e.target.value)}/>
                                </div>

                                <div className="input-box">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" placeholder="Enter your email address" name="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>

                                <div className="input-box">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" placeholder="Enter your password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>

                                <div className="input-box">
                                    <label htmlFor="city">City</label>
                                    <BasicSelect
                                        placeholder={"Select your city"}
                                        handleOnChange={(e) => {
                                            cityChange(e);
                                        }}
                                        link={"getCities"}
                                    />
                                </div>

                                <div className="input-box">
                                    <label htmlFor="school">School</label>
                                    <BasicSelect
                                        placeholder={"Select your school"}
                                        handleOnChange={(e:any)=>{
                                            schoolChange(e);
                                        }} link={"getSchools"}/>
                                </div>

                                <div className="input-box">
                                    <label htmlFor="class">Class</label>
                                    <BasicSelect
                                        placeholder={"Select your class"}
                                        handleOnChange={(e:any)=>{
                                            classChange(e);
                                        }} link={"getClasses"}/>
                                </div>

                            </div>
                            <div className="form-button">
                                <button type="submit" onClick={createUser}>Create User</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateUser;