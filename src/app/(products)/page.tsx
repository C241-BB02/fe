import Hero from "../components/landing/hero";
import ProductCard from "../components/products/product-card";


export default async function Page() {
    const res = await fetch("https://dummyjson.com/products");
    const products = await res.json();

    return (
        <>
            <Hero/>
            <div className="bg-slate-100 md:px-24 px-8">
                <div className="text-lg py-8">Products for You</div>
                <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
                    {products.products.map((product: any) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>
        </>
    )
}

