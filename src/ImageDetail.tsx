import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Form, useLoaderData } from "react-router-dom";



type image = {
    id: number;
    imageUrl: string;
}


function ImageDetail() {

    const { imageDetails } = useLoaderData() as any;




    //back to homepage

    console.log(imageDetails);



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
