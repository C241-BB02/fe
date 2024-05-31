import { Star } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/product";

// TODO: use Product instead of dummy API

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
            </Link>
        </div>
    )
}