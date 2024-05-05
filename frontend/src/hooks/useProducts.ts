import { useEffect, useState } from 'react';
import { TGetProducts, TProduct, TUseProducts } from '../interfaces/types';
import { apiGet } from '../services/axios.service';
import { API } from '../utils/constants';

const useProducts = ({ page, search, availableSizes, category, description, gender, isInStock, range, tags }: TUseProducts) => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<TProduct[]>([]);
    const [details, setDetails] = useState({
        dataPerPage: 0,
        fetched: 0,
        total: 0,
    });

    const getProducts = async () => {
        let query = "";
        if (page === 1) {
            setLoading(true);
        }
        query += `?page=${page}`;
        if (search) {
            query += `&search=${search}`;
        };
        if (availableSizes) {
            query += `&availableSizes=${availableSizes}`;
        };
        if (category) {
            query += `&category=${category}`;
        };
        if (description) {
            query.replace(/&search=*&/, "")
            query += `&description=${description}`;
        };
        if (gender) {
            query += `&gender=${gender}`;
        };
        if (isInStock) {
            query += `&isInStock=${isInStock}`;
        };
        if (range && range.length > 1) {
            query += `&range=${range[0]},${range[1]}`;
        };
        if (tags) {
            query += `&tags=${tags}`;
        };
        try {
            const response = await apiGet<TGetProducts>({
                url: `${API.PRODUCTS}${query}`,
                loading: false,
            });
            setLoading(false);
            if (page && page > 1) {
                setProducts(prev => [...prev, ...response.data.data]);
            } else {
                setProducts(response.data.data);
            }
            setDetails({
                dataPerPage: Number(response.data.dataPerPage),
                fetched: response.data.fetched,
                total: response.data.total,
            });
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts();
    }, [page, search, availableSizes, category, description, gender, isInStock, range, tags])
    return { products, details, loading, setLoading, getProducts };
}

export default useProducts
