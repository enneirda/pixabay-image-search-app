import React from 'react';
import './App.css';
import {useLoaderData } from "react-router-dom";


function ImageDetail() {

    const { imageDetails } = useLoaderData() as any;
    return (
        <div className="App">
            <img src={imageDetails.webformatURL} alt="logo" />
            <div> Posted By: {imageDetails.user}</div>
            <div>Tags: {imageDetails.tags}</div>
            <a href='/'> Back to Main Page</a>
        </div>


    );
}

export default ImageDetail;
