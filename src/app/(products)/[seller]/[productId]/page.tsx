
import { useAuth } from '@/context/AuthContext';
import { Product, ProductData, toProduct } from '@/types/product';
import { Avatar } from '@nextui-org/react';
import { ShoppingCart, Star } from 'lucide-react';

export default async function ProductDetail({ params }: Readonly<{ params: { seller: string, productId: string } }>) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${params.productId}` 

    const res = await fetch(url);
    const product: Product = toProduct(await res.json());

    const profileUrlBase = "https://avatar.iran.liara.run/username?username=";

    return (
        <div className="lg:px-32 py-8 grid md:grid-cols-2 w-screen">
            <div className="border border-gray rounded-xl overflow-hidden h-[400px] w-[400px]">
                <img className="object-contain h-[400px] w-[400px]" src={product.photos[0].image} alt="" />
            </div>
            <div className='pr-8'>
                <div className='text-xl font-semibold'>{product.name}</div>
                <div className='text-gray-500 flex gap-2'>
                    <div className='text-gray-500'>Stock {product.stock}</div>
                    <span aria-hidden="true">•</span>
                    <div className="mr-1 shrink-0 flex items-center text-gray-500">
                        <Star fill="#EAB305" strokeWidth={0} />5
                    </div>
                </div>
                <div className='text-2xl font-medium py-2 mb-4'>{product.revenue}</div>
                <div className='border-t border-gray'></div>
                <div className='rounded-lg py-2 pr-3 w-fit flex items-center gap-3'>
                    <Avatar src={profileUrlBase + product.user.username} />
                    <div className='text-custom-900 font-medium'>{product.user.username}</div>
                </div>
                <div className='border-t border-gray'></div>                
                <div className='description mt-6'>
                    <div className='text-custom-800'>Description</div>
                    {/* <div className=''>{product.description}</div> */}
                </div>
            </div>
        </div>
    )
}