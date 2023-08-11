import React, { useEffect, useState } from 'react';
import './DataTable.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {TextField} from "@mui/material";
import BasicSelect from "../BasicSelect/BasicSelect";
import {SelectChangeEvent} from "@mui/material/Select";

export interface User {
    id: number;
    name: string;
    email: string;
    className: string;
    album: string;
    albumtype: string;
    packages: string;
}

interface ImageData {
    id: number;
    filename: string;
}

const DataTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [classId, setClassId] = useState("");
    const [albumId, setAlbumId] = useState('');
    const [albumTypeId, setAlbumTypeId] = useState('');
    const [packagesId, setPackagesId] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/get_users');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
            }
        };

        fetchUsers();
    }, []);


    // Delete user
    const handleDeleteUser = (userId: number) => {
        setDeleteUserId(userId);
        setOpenConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/delete-user/${deleteUserId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setUsers(users.filter((user) => user.id !== deleteUserId));
        } catch (error) {

        } finally {
            setOpenConfirmation(false);
            setDeleteUserId(null);
        }
    };

    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
        setDeleteUserId(null);
    };


    //Update user data

    const [openUpdateForm, setOpenUpdateForm] = useState(false);
    const [updateData, setUpdateData] = useState<{
        id:number;
        name: string;
        email: string;
        classes:string;
    }>({
        id:0,
        name: '',
        email: '',
        classes:'',
    });

    const handleUpdateButtonClick = (user: User) => {
        setOpenUpdateForm(true);
        setUpdateData({
            id:user.id,
            name: user.name,
            email: user.email,
            classes:user.className,
        });
    };

    const handleUpdateSubmit = async () => {
        try {
            fetch("http://127.0.0.1:8000/update-user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id:updateData.id,
                    name:updateData.name,
                    email:updateData.email,
                    albumId:albumId,
                    albumTypeId:albumTypeId,
                    packagesId:packagesId,
                }),
            }).then(response => response.json())
                .then(response => {
                    const redirectUrl = response.redirectUrl;
                    if (redirectUrl) {
                        window.location.href= redirectUrl;
                    }
                })
            setOpenUpdateForm(false);
        } catch (error) {

        }
    };
    const handleFormInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUpdateData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const classChange = (event: SelectChangeEvent) => {
        setClassId(event.target.value as string);
    };

    const albumChange = (event: SelectChangeEvent) => {
        setAlbumId(event.target.value as string);
    };

    const albumTypeChange = (event: SelectChangeEvent) => {
        setAlbumTypeId(event.target.value as string);
    };

    const packagesChange = (event: SelectChangeEvent) => {
        setPackagesId(event.target.value as string);
    }


    // Upload user image

    const [selectedFile, setSelectedFile] = useState(null);
    const [openUploadDialog, setOpenUploadDialog] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<number|undefined>(undefined);

    const handleFileChange = (e:any) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        if (!selectedFile) {
            console.error("No file selected.");
            return;
        }
        formData.append("uploadfile", selectedFile);
        formData.append("currentUserId", String(currentUserId));

        try {
            const response = await fetch("http://127.0.0.1:8000/upload-images", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                return "Image upload succesful";
            } else {
                return "There is a problem uploading your iamge";
            }
        } catch (error) {
        }
    };

    return (
        <>
            <TableContainer component={Paper} className="user-table">
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>iD</TableCell>
                            <TableCell>Full name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Class</TableCell>
                            <TableCell>Album</TableCell>
                            <TableCell>AlbumType</TableCell>
                            <TableCell>Packages</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 },
                                backgroundColor:
                                    (user.album) && (user.albumtype) && (user.packages)
                                        ? 'lightgreen'
                                        : 'inherit',
                            }}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.className}</TableCell>
                                <TableCell>{user.album}</TableCell>
                                <TableCell>{user.albumtype}</TableCell>
                                <TableCell>{user.packages}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleUpdateButtonClick(user)} variant="contained" color="primary" sx={{ marginRight: '12px' }}>Update</Button>

                                    <Button onClick={() => handleDeleteUser(user.id)} variant="contained" color="secondary" sx={{ marginRight: '12px' }}>Delete</Button>

                                    <Button onClick={() => {
                                        setOpenUploadDialog(true);
                                        setCurrentUserId(user.id);
                                    }} variant="contained" color="primary">
                                        Upload
                                    </Button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Delete user */}
                <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this user?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseConfirmation} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Update user*/}
                <Dialog open={openUpdateForm} onClose={() => setOpenUpdateForm(false)}>
                    <DialogTitle>Update user</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Please enter the new data for the user.</DialogContentText>
                        <TextField name="name" label="Name" value={updateData.name} onChange={handleFormInputChange} />
                        <TextField name="email" label="Email" value={updateData.email} onChange={handleFormInputChange} />
                        <div>
                            <label>Album</label>
                        <BasicSelect
                            placeholder={"Select your album"}
                            handleOnChange={(e:any)=>{
                                albumChange(e);
                            }} link={"getAlbums"}/>
                        </div>

                        <div>
                            <label>Album Type</label>
                        <BasicSelect
                            placeholder={"Select your album type"}
                            handleOnChange={(e:any)=>{
                                albumTypeChange(e);
                            }} link={"getAlbumType"}/>
                        </div>

                        <div>
                            <label>Package</label>
                        <BasicSelect
                            placeholder={"Select your package"}
                            handleOnChange={(e:any)=>{
                                packagesChange(e);
                            }} link={"getPackages"}/>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenUpdateForm(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleUpdateSubmit} color="primary" autoFocus>
                            Update user
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Upload user images */}
                <Dialog open={openUploadDialog} onClose={() => setOpenUploadDialog(false)}>
                    <DialogTitle>Upload Image</DialogTitle>
                    <DialogContent>
                        <div>
                            <div id="content">
                                <input type="file" name="uploadfile" onChange={handleFileChange} />
                                <input name="currentUserId" type="hidden" value={currentUserId}/>
                                <button onClick={handleUpload}>UPLOAD</button>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenUploadDialog(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleUpload} variant="contained" color="primary">
                            Upload
                        </Button>
                    </DialogActions>
                </Dialog>

            </TableContainer>
        </>
    );
};

export default DataTable;