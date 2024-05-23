'use client'
import { useAuth } from "@/context/AuthContext";
import Hero from "../components/landing/hero";
import ProductCard from "../components/products/product-card";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";


export default function Page() {
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("https://dummyjson.com/products");
                const productsData = await res.json();
                setProducts(productsData.products);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            {user.role == 'GUEST' &&
                <Hero />
            }
            {isLoading ? (
                <div className="bg-slate-100 md:px-24 px-8 h-screen flex items-center justify-center">
                    <Spinner />
                </div>
            ) : (
                <div className="bg-slate-100 md:px-24 px-8">
                    <div className="text-lg py-8">Products for You</div>
                    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

