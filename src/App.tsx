import React, { useState, useEffect } from 'react';
import './App.css';

const API_KEY = '39980012-86dad44d4894f9081f9fe0228';
const baseURL = "https://pixabay.com/api/?key="+API_KEY;

const getSearchURL = (searchQuery: string) => {

  return `${baseURL}&q=${encodeURIComponent(searchQuery)}`;
}


type Image = {
  id: number;
  previewURL: string;
}

type PixabayResponse = {
    hits: Image[]
  
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    fetch(getSearchURL(searchQuery))
        .then((response) => {

      const data = response.json() as any as PixabayResponse;
      return data;
      }).then(data => {
        
        setImages(data.hits);
      });

}, [searchQuery]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <div className="App">
      <header>
        Pixabay Image Search
      </header>
      <div>What type of image would you like to see? </div>
      <input type="text" value={searchQuery} onChange={handleChange}/>

      <div className="GridContainer">
      {images.map(image => {
      return <img key={image.id} src={image.previewURL} alt="logo"/>
  })}
  </div>

    </div>
  );
}

export default App;
