import { Star } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/product";

export default function ProductCard({ product }: Readonly<{ product: Product }>) {
    return (
        <div className="relative flex flex-col overflow-hidden rounded-lg bg-white p-3" key={product.code}>
            <Link href={`/${product.user.username}/${product.code}`}>
            <div className="flex justify-center p-2 pt-1">
                <img className="h-40 w-auto object-contain" src={product.photos[0].image} alt="Product" />
            </div>
            <div className="text-md truncate">{product.name}</div>
            <div className="text-lg font-medium">${product.revenue}</div>
            <div className='text-gray-500 text-md flex gap-2'>
                    <div className='text-gray-500'>Stock {product.stock}</div>
                    <span aria-hidden="true">•</span>
                    <div className="mr-1 shrink-0 flex items-center text-gray-500">
                        <Star fill="#EAB305" strokeWidth={0} />5
                    </div>
                </div>
            </Link>
        </div>
    )
}