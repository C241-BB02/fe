import Link from "next/link";
import { ProductData, toProduct } from "@/types/product";

export default function ProductCard({ productData }: Readonly<{ productData: ProductData }>) {
    const product = toProduct(productData);
    return (
        <div className="relative flex flex-col overflow-hidden rounded-lg bg-white p-3" key={product.code}>
            <Link href={`/${product.user.username}/${product.code}`}>
            <div className="flex justify-center p-2 pt-2">
                <img className="h-44 w-44 object-cover rounded-lg" src={product.photos[0].image} alt="Product" />
            </div>
            <div className="text-md truncate">{product.name}</div>
            <div className="text-lg font-medium">{product.price}</div>
            <div className='text-gray-500 text-md flex gap-2'>
                    <div className='text-gray-500'>Stock {product.stock}</div>
                </div>
            </Link>
        </div>
    )
}