import { Avatar } from '@nextui-org/react';
import { ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';

export default async function ProductDetails({ params }: { params: { seller: string, productId: string } }) {
    const res = await fetch(`https://dummyjson.com/products/${params.productId}`);
    const product = await res.json();

    return (
        <div className="lg:px-32 py-8 grid md:grid-cols-2 w-screen">
            <div className="border border-gray rounded-xl overflow-hidden h-[400px] w-[400px]">
                <img className="object-contain h-[400px] w-[400px]" src={product.images[0]} alt="" />
            </div>
            <div className='pr-8'>
                <div className='text-xl font-semibold'>{product.title}</div>
                <div className='text-gray-500 flex gap-2'>
                    <div className='text-gray-500'>Stock {product.stock}</div>
                    <span aria-hidden="true">•</span>
                    <div className="mr-1 shrink-0 flex items-center text-gray-500">
                        <Star fill="#EAB305" strokeWidth={0} />{product.rating}
                    </div>
                </div>
                <div className='text-2xl font-medium py-2'>${product.price}</div>
                <button className="mb-8 px-4 py-2 mt-4 text-white bg-custom-800 rounded-3xl hover:bg-custom-900 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">
                    <ShoppingCart className="inline-block size-4 leading-none mr-2" /><span className="align-middle">Add to cart</span>
                </button>
                <div className='border-t border-gray'></div>
                <div className='rounded-lg py-2 pr-3 w-fit flex items-center gap-3'>
                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                    <div className='text-custom-900 font-medium'>{product.brand}</div>
                </div>
                <div className='border-t border-gray'></div>                
                <div className='description mt-6'>
                    <div className='text-custom-800'>Description</div>
                    <div className=''>{product.description}</div>
                </div>
            </div>
        </div>
    )
}