import React, { useState, useEffect } from 'react';
import './App.css';
import { getSearchURL } from './helpers';


export type Image = {
  id: number;
  previewURL: string;
  webformatURL: string;
  user: string;
  tags: string;
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
      <div>What type of image would you like to see?</div>
      <input type="text" value={searchQuery} onChange={handleChange}/>

      <div className="GridContainer">
      {images.map(image => {
      return <a key={image.id} href={`/imageDetails/${image.id}`}><img src={image.previewURL} alt="logo"/></a>
  })}
  </div>

    </div>
  );
}

export default App;
