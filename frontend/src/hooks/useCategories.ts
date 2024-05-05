import { useEffect, useState } from 'react';
import { TOption } from '../interfaces/types';
import { apiGet } from '../services/axios.service';
import { capitalize } from '../services/common.service';
import { API } from '../utils/constants';

const useCategories = () => {
    const [categories, setCategories] = useState<TOption[]>([]);
    const [loading, setLoading] = useState(false);
    const getCategories = async () => {
        setLoading(true);
        let response = await apiGet<{ data: { _id: string, }[], success: boolean, }>({ url: API.CATEGORIES, loading: false })
        setCategories(response.data.data.map(item => ({ label: capitalize(item._id), value: item._id })))
        setLoading(false);
    }
    useEffect(() => {
        getCategories();
    }, []);
    return { categories, loading };
}

export default useCategories
