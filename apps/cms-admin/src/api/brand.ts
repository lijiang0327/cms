import http from '@/utils/http';

type GetBrandListParams = {
    brandName?: string
    page?: number
}

export const getBrandList = async (params?: GetBrandListParams) => {
    const url = '/api/brands';

    const result = await http.get(url, {
        params: {
            'filters[name][$contains]': params?.brandName || undefined,
            'pagination[page]': params?.page || undefined,
            'pagination[pageSize]': 10,
        }
    });

    return result.data;
}

type AddBrandParams = {
    name: string
}

export const addBrand = async (params: AddBrandParams) => {
    const url = '/api/brands';

    const result = await http.post(url, {data: {...params}});

    return result.data;
}

export const deleteBrand = async (id: number) => {
    const url = `/api/brands/${id}`;

    const result = await http.delete(url);

    return result.data;
}

type UpdateBrandParams = AddBrandParams & {
    id: number
}

export const updateBrand = async (params: UpdateBrandParams) => {
    const url = `/api/brands/${params.id}`;

    const result = await http.put(url, {
        data: {
            name: params.name
        }
    });

    return result.data;
}
