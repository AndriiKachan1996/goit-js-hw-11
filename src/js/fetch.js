import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = 'key=33365973-1d77bed254b8fc4c88316f69d';
const options = 'image_type=photo&orientation=horizontal&safesearch=true&page';

async function getPhotos(query, page, per_page) {
  try {
    const result = await axios.get(
      `${URL}?${KEY}&q=${query}&${options}=${page}&per_page=${per_page}`
    );

    return result.data;
  } catch (error) {
    console.log(error);
  }
}
export default { getPhotos };
