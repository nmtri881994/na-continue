import * as api from '../apis/searchApi';

export function searchByKey(keyword) {
    return api.searchByKey(keyword);
};

export function getMetadataByNasaId(mediaType, NasaId) {
    return api.getMetadataByNasaId(mediaType, NasaId);
};