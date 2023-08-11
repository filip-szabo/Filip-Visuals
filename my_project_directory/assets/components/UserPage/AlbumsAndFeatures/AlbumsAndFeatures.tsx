import React, {useState} from "react";
import './AlbumsAndFeatures.css';
import UserNav from "../../common/Navbar/UserNav/UserNav";
import AlbumSizes from "../../../images/AlbumsAndFeatures/albumsizes.png";
import PhotoSizes from "../../../images/AlbumsAndFeatures/photosizes.jpg";
import {Button} from "@mui/material";
import BasicSelect from "../../common/BasicSelect/BasicSelect";
import {SelectChangeEvent} from "@mui/material/Select";
import {setSession} from "../../../app";


function  AlbumsAndFeatures() {

    const [albumId, setAlbumId] = useState('');
    const [albumTypeId, setAlbumTypeId] = useState('');
    const [packagesId, setPackagesId] = useState('');

    let addAlbum = (e:any) => {
        e.preventDefault();

        fetch("http://127.0.0.1:8000/addAlbum", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                album:albumId,
                albumType:albumTypeId,
                packages:packagesId,
            }),
        }).then(response => response.json())
            .then(response => {
                const redirectUrl = response.redirectUrl;
                if (redirectUrl) {
                    setSession();
                    window.location.href= redirectUrl;
                }
            })
    }
    const albumChange = (event: SelectChangeEvent) => {
        setAlbumId(event.target.value as string);
    };

    const albumTypeChange = (event: SelectChangeEvent) => {
        setAlbumTypeId(event.target.value as string);
    };

    const packagesChange = (event: SelectChangeEvent) => {
        setPackagesId(event.target.value as string);
    };

    return (
        <>
            <UserNav/>
            <div className="container-context">

                <div className="context-form">
                    <div className="selector-form">
                        <div className="selector">
                            <label htmlFor="album-selector">Choose an album: </label>
                            <BasicSelect
                                placeholder={"Select your album"}
                                handleOnChange={(e:any)=>{
                                albumChange(e);
                            }} link={"getAlbums"}/>
                        </div>

                        <div className="selector">
                            <label htmlFor="type-selector">Choose the album type: </label>
                            <BasicSelect
                                placeholder={"Select your album type"}
                                handleOnChange={(e:any)=>{
                                albumTypeChange(e);
                            }} link={"getAlbumType"}/>
                        </div>

                        <div className="selector">
                            <label htmlFor="feature-selector">Choose a package: </label>
                            <BasicSelect
                                placeholder={"Select your package"}
                                handleOnChange={(e:any)=>{
                                packagesChange(e);
                            }} link={"getPackages"}/>
                        </div>

                        <Button variant="outlined"  onClick={addAlbum}>
                            To checkout
                        </Button>
                    </div>
                </div>

                <div className="context-images">
                    <img src={AlbumSizes} />
                    <img src={PhotoSizes} />
                </div>

            </div>
        </>
    );
}
export default AlbumsAndFeatures;