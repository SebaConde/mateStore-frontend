/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export function useGetCategoryProducts(slug: string) {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!slug) return;

        setLoading(true); // Este está bien porque responde a un cambio externo (slug)
        
        const fetchData = async () => {
            try {
                const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&filters[category][slug][$eq]=${slug}`;
                const res = await fetch(url);
                const json = await res.json();
                setResult(json.data);
                setError('');
            } catch (error: any) {
                setError(error);
                setResult(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]); // Dependencia directa del slug, no de url
    
    return { loading, error, result };
}