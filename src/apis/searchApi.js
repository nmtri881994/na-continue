import fetch from 'isomorphic-unfetch';

const APIRoot = "https://images-api.nasa.gov";
const APIRoot2 = "https://images-assets.nasa.gov";

export const searchByKey = (keyword) => {
    try {
        return fetch(`${APIRoot}/search?q=${keyword}&page=1&media_type=image,video`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getMetadataByNasaId = (mediaType, NasaId) => {
    try {
        return fetch(`${APIRoot2}/${mediaType}/${encodeURI(NasaId)}/metadata.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.error(error);
        return null;
    }
}