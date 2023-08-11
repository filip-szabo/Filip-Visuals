import React, {useEffect, useState} from "react";
import './Register.css';
import Navbar from "../common/Navbar/Navbar";
import Footer from "../common/Footer/Footer";
import { SelectChangeEvent } from '@mui/material/Select';
import BasicSelect from "../common/BasicSelect/BasicSelect";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [cityId, setCityId] = useState("");
    const [schools, setSchools] = useState<[]>([]);
    const [schoolId, setSchoolId] = useState("");
    const [classes, setClasses] = useState<[]>([]);
    const [classId, setClassId] = useState("");


    useEffect(() => {
        if (cityId !== "") {
            fetch("http://127.0.0.1:8000/getSchoolsByCity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cityId: cityId,
                }),
            }).then(response => response.json())
                .then(data => {
                    setSchools(data);
                })
        }
    }, [cityId]);

    useEffect(() => {
        if (schoolId !== "") {
            fetch("http://127.0.0.1:8000/getClassesBySchool", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    schoolId: schoolId,
                }),
            }).then(response => response.json())
                .then(data => {
                    setClasses(data);
                })
        }
    }, [schoolId]);


    let registerUser = (e:any) => {
        e.preventDefault();

        fetch("http://127.0.0.1:8000/register-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name:name,
                email:email,
                password:password,
                classId: classId,
            }),
        }).then(response => response.json())
            .then(response => {
                const redirectUrl = response.redirectUrl;
                if (redirectUrl) {
                    window.location.href= redirectUrl;
                }
            })
    }

    const cityChange = (event: SelectChangeEvent) => {
        setCityId(event.target.value as string);
    };

    const schoolChange = (event: SelectChangeEvent) => {
        setSchoolId(event.target.value as string);
    };
    const classChange = (event: SelectChangeEvent) => {
        setClassId(event.target.value as string);
    };

    return(
        <>
            <div className="register-background">
                <Navbar />
                <div className="signup">
                    <div className="container">
                        <form onSubmit={registerUser} method="post">
                            <h2>Sign Up</h2>
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
                                        handleOnChange={(e) => {
                                            schoolChange(e);
                                        }}
                                        selectData={schools}
                                    />
                                </div>

                                <div className="input-box">
                                    <label htmlFor="class">Class</label>
                                    <BasicSelect
                                        placeholder={"Select your class"}
                                        handleOnChange={(e) => {
                                            classChange(e);
                                        }}
                                        selectData={classes}
                                    />
                                </div>

                            </div>
                            <div className="form-button">
                                <button type="submit">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer title={"FilipVisuals"}  paragraph={<p>Your dream home can now become a reality.<br/> Your most unrealistic ideas,we try to materialize them.<br/> We are at your disposal and do our best <br/>to make your home perfect.</p>}/>
        </>
    );
}

export default Register;