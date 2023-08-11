import React, {useEffect, useState} from "react";
import "./AddAttributes.css";
import AdminNav from "../../common/Navbar/AdminNav/AdminNav";
import BasicSelect from "../../common/BasicSelect/BasicSelect";
import {SelectChangeEvent} from "@mui/material/Select";

function AddAttributes() {
    const [city, setCity] = useState("");
    const [cityId, setCityId] = useState("");
    const [school, setSchool] = useState("");
    const [schoolId, setSchoolId] = useState("");
    const [clas, setClas] = useState("");

    const [cityInput, setCityInput] = useState<any>("");
    const [cityResults, setCityResults] = useState([]);
    const fetchCityInput = () => {
        if(cityInput != "") {
            fetch("https://api.teleport.org/api/cities/?search=" + cityInput)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    data["_embedded"]["city:search-results"].map((e: React.SetStateAction<string>) => {
                    });
                    setCityResults(data["_embedded"]["city:search-results"]);
                })
        }
    }

    useEffect(() => {
        fetchCityInput()
    }, [cityInput])
    let createSchool = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch("http://127.0.0.1:8000/create-school", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: school,
                cityId: cityId,
            }),
        }).then(response => {
            return response.json();
        }).then(response => {
            const redirectUrl = response.redirectUrl;
            if (redirectUrl) {
                window.location.href= redirectUrl;
            }
        });
    };

    let createCity = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch("http://127.0.0.1:8000/create-city", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: city,

            }),
        }).then(response => {
            return response.json();
        }).then(response => {
            const redirectUrl = response.redirectUrl;
            if (redirectUrl) {
                window.location.href= redirectUrl;
            }
        });
    };

    let createClass = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch("http://127.0.0.1:8000/create-class", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: clas,
                schoolId:schoolId,

            }),
        }).then(response => {
            return response.json();
        }).then(response => {
            const redirectUrl = response.redirectUrl;
            if (redirectUrl) {
                window.location.href= redirectUrl;
            }
        });
    };

    const cityChange = (event: SelectChangeEvent) => {
        setCityId(event.target.value as string);
    };
    const schoolChange = (event: SelectChangeEvent) => {
        setSchoolId(event.target.value as string);
    };

    return (
        <div className="attributes-background">
            <AdminNav />
            <div className="create-container">

                <div className="wrapper">
                    <form onSubmit={createCity}>
                        <h1>Add new City</h1>

                        <div className="input-box">
                            <input
                                type="text"
                                name="city"
                                placeholder="Enter city name"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />{" "}
                            <br />
                        </div>
                        <button type="submit" id="login-button" className="btn">Add city</button>

                    </form>
                </div>

                <div className="wrapper">
                    <form onSubmit={createSchool}>
                        <h1>Add new School</h1>

                        <div className="input-box">
                            <input
                                type="text"
                                name="school"
                                placeholder="Enter school name"
                                value={school}
                                onChange={(e) => setSchool(e.target.value)}
                            />{" "}
                            <br />
                        </div>

                        <div className=" input-box create-school-context add-school-city">
                            <BasicSelect  handleOnChange={(e:any)=>{
                                cityChange(e);
                            }} link={"getCities"} placeholder={"Select city"}/>
                        </div>
                        <button type="submit" id="login-button" className="btn">Add school</button>

                    </form>
                </div>

                <div className="wrapper">
                    <form onSubmit={createClass}>
                        <h1>Add new Class</h1>

                        <div className="input-box">
                            <input
                                type="text"
                                name="class"
                                placeholder="Enter class name"
                                value={clas}
                                onChange={(e) => setClas(e.target.value)}
                            />{" "}
                            <br />
                        </div>
                        <div className=" input-box create-school-context add-school-city">
                            <BasicSelect  handleOnChange={(e:any)=>{
                                schoolChange(e);
                            }} link={"getSchools"} placeholder={"Select school"}/>
                        </div>

                        <button type="submit" id="login-button" className="btn">Add class</button>

                    </form>
                </div>

            </div>
        </div>
    );
}

export default AddAttributes;

