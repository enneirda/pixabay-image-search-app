const API_KEY = '39980012-86dad44d4894f9081f9fe0228';
const baseURL = "https://pixabay.com/api/?key="+API_KEY;

export const getSearchURL = (searchQuery: string) => {

  return `${baseURL}&q=${encodeURIComponent(searchQuery)}`;
}

const getImageDetail = (id: string) => {
    return `${baseURL}&id=${encodeURIComponent(id)}`;
}
  

export const imageDetailLoader = async ({ params}: {params: any}) => {
    const response = await fetch(getImageDetail(params.imageId));
    const data = await response.json();
    const imageDetails = data.hits[0];
    return { imageDetails };
  }

  