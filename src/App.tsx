import React, { useState, useEffect, useMemo, useRef } from 'react';
import './App.css';
import { getSearchURL, Image, PixabayResponse } from './helpers';
import  debounce from "lodash.debounce";


const useDebounce = (callback: any) => {
  const ref: any = useRef();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, 300);
  }, []);

  return debouncedCallback;
};

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState<Image[]>([]);
  const [hasValidationError, setHasValidationError] = useState<boolean>(false);


  const debouncedSearchRequest = useDebounce(() => {
    fetch(getSearchURL(searchQuery))
  
        .then((response) => {

      const data = response.json() as any as PixabayResponse;
      return data;
      }).then(data => {
        
        setImages(data.hits);
      });

  })
  useEffect (()=> {
    debouncedSearchRequest();
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value.length);
    if (e.target.value.length <= 100){
      setHasValidationError(false);
      setSearchQuery(e.target.value);
      debouncedSearchRequest();
    }
    else {
      setHasValidationError(true);
    }
  };

  
  return (
    <div className="App">
      <header>
        Pixabay Image Search
      </header>
      <div>What type of image would you like to see? (enter up to 100 characters) </div>
      <input type="text" value={searchQuery} onChange={handleChange}/>
      {hasValidationError && <div className="ValidationError">*Search query cannot exceed 100 characters</div>}


      <div className="GridContainer">
      {images.map(image => {
      return <a key={image.id} href={`/imageDetails/${image.id}`}><img src={image.previewURL} alt="logo"/></a>

  })}
  </div>
  {images.length === 0 && <div> No results found</div>}


    </div>
  );
}

export default App;
