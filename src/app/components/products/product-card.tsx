import { ShoppingCart, Star, StarHalf } from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product }: Readonly<{ product: any }>) {
    return (
        <div className="relative flex flex-col overflow-hidden rounded-lg bg-white p-3" key={product.id}>
            <Link href={`/${product.brand}/${product.id}`}>
            <div className="flex justify-center p-2 pt-1">
                <img className="h-40 w-auto object-contain" src={product.images[0]} alt="Product" />
            </div>
            <div className="text-md truncate">{product.title}</div>
            <div className="text-lg font-medium">${product.price}</div>
            <div className='text-gray-500 text-md flex gap-2'>
                    <div className='text-gray-500'>Stock {product.stock}</div>
                    <span aria-hidden="true">•</span>
                    <div className="mr-1 shrink-0 flex items-center text-gray-500">
                        <Star fill="#EAB305" strokeWidth={0} />{product.rating}
                    </div>
                </div>
            <button
                className="w-full mt-10 text-custom-900 btn border border-custom-900 hover:bg-custom-900 hover:text-white focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                ><ShoppingCart className="inline-block size-4 leading-none mr-2" /><span className="align-middle">
                    Add to cart
                </span>
            </button>
            </Link>
        </div>
    )
}