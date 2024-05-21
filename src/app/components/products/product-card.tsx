import { ShoppingCart, Star, StarHalf } from "lucide-react";

export default function ProductCard({ product }: Readonly<{ product: any }>) {
    return (
        <div className="relative flex flex-col overflow-hidden rounded-lg bg-white p-3" key={product.id}>
            <div className="flex justify-center p-2 pt-1">
                <img className="h-40 w-auto object-contain" src={product.images[0]} alt="Product" />
            </div>
            <div className="text-md truncate">{product.title}</div>
            <div className="text-md font-semibold">${product.price}</div>
            <div className="flex items-center text-slate-500 dark:text-zink-200">
                <div className="mr-1 shrink-0 text-15 flex items-center">
                    <Star fill="#EAB305" strokeWidth={0} />
                    <Star fill="#EAB305" strokeWidth={0} />
                    <Star fill="#EAB305" strokeWidth={0} />
                    <Star fill="#EAB305" strokeWidth={0} />
                    <StarHalf fill="#EAB305" strokeWidth={0} />
                </div>
            </div>
            <button
                className="w-full mt-10 text-custom-900 btn border border-custom-900 hover:bg-custom-900 hover:text-white focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
            ><ShoppingCart className="inline-block size-4 leading-none mr-2" /><span className="align-middle">
                    Add to cart
                </span>
            </button>
        </div>
    )
}