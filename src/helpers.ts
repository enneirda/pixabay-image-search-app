const API_KEY = "39980012-86dad44d4894f9081f9fe0228";
const baseURL = "https://pixabay.com/api/?key=" + API_KEY;

export type Image = {
  id: number;
  previewURL: string;
  webformatURL: string;
  user: string;
  tags: string;
};

export type PixabayResponse = {
  hits: Image[];
  total: number;
  totalHits: number;
};
export const getSearchURL = (searchQuery: string, pageNumber?: number) => {
  return `${baseURL}&per_page=50&page=${pageNumber || 1}&q=${encodeURIComponent(
    searchQuery,
  )}`;
};

const getImageDetailUrl = (id: string) => {
  return `${baseURL}&id=${encodeURIComponent(id)}`;
};

export const imageDetailLoader = async ({ params }: { params: any }) => {
  const response = await fetch(getImageDetailUrl(params.imageId));
  const data = await response.json();
  const imageDetails = data.hits[0];
  return { imageDetails };
};
