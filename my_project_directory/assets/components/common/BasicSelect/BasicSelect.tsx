import * as React from 'react';
import "./BasicSelect.css";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {ReactNode, useEffect} from "react";

type propsType={
    handleOnChange?: (event: SelectChangeEvent<string>, child: ReactNode) => void,
    link?:string,
    placeholder:string,
    children?: React.ReactNode,
    disabled?: boolean,
    selectData?: [],
    value?:string,
};


export default function BasicSelect(props:propsType) {
    const {disabled,placeholder,link, selectData, handleOnChange, value} = props;
    const [data, setData] = React.useState<[]|undefined>(selectData ? selectData : []);
    console.log(selectData);


    let getInfo = (): Promise<any> => {
            return fetch("http://127.0.0.1:8000/" + props.link)
                .then(response => response.json());
    }

    useEffect(()=>{
        if(selectData){
            setData(selectData);
        }
    }, [selectData]);

    useEffect(() => {
        if(link){
            getInfo()
                .then(response => {
                    setData(response);
                });
        }
    }, []);


    return (
        <Box sx={{ minWidth: 120 }} className="box">
            <FormControl fullWidth>
                <Select
                    id="demo-simple-select"
                    onChange={handleOnChange}
                    className="custom-select"
                    placeholder={placeholder}

            >{
                    data &&
                    data.map((item:any) => (
                        <MenuItem
                            key={item.id}
                            value={item.id}
                        >
                            {item.name}
                        </MenuItem>
                    ))
                }

                </Select>
            </FormControl>
        </Box>
    );
}