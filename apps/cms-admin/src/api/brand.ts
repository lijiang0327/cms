import http from '@/utils/http';

export const getBrandList = async () => {
    const url = '/api/brands'

    const result = await http.get(url);

    return result.data;
}

export const addBrand = async () => {

}

export const deleteBrand = async () => {

}

export const updateBrand = async () => {

}
