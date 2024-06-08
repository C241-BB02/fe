'use client'
import { Product, toProduct } from '@/types/product';
import { Avatar, Spinner } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export default function ProductDetail({ params }: Readonly<{ params: { seller: string, productId: string } }>) {
    const [product, setProduct] = useState<Product>();
    const [imageThumbnail, setImageThumbnail] = useState("");
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${params.productId}/`);
                const productRes : Product = toProduct(await res.json());
                setProduct(productRes);
                setImageThumbnail(productRes.photos[0].image);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [params.productId]);
    
    const profileUrlBase = "https://avatar.iran.liara.run/username?username=";

    return (
        isLoading ? (
            <div className="h-screen flex items-center justify-center">
                <Spinner />
            </div>
        ) : (
        <div className="lg:px-32 py-8 grid md:grid-cols-2 w-screen">
            <div className="">
                <img className="object-contain w-[390px] h-[390px] rounded-lg" src={imageThumbnail} alt="" />
                <ul className="flex flex-wrap mb-0 gap-x-5">
                    {
                        (product?.photos || [])?.map((photo: any, index: number) => {
                            return (
                                <li key={photo.id} className="mt-5" id="dropzone-preview-list2">
                                    <button className="focus:border focus:border-custom-500 flex flex-col justify-center rounded-lg overflow-hidden border"
                                        onClick={() => setImageThumbnail(photo.image)}
                                    >
                                        <img className="object-cover w-[60px] h-[60px]" src={photo.image} alt={photo.id} />
                                    </button>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>

            <div className='pr-8'>
                <div className='text-xl font-semibold'>{product?.name}</div>
                <div className='text-gray-500 flex gap-2'>
                    <div className='text-gray-500'>Stock {product?.stock}</div>
                </div>
                <div className='text-2xl font-medium py-2 mb-4'>{product?.price}</div>
                <div className='border-t border-gray'></div>
                <div className='rounded-lg py-2 pr-3 w-fit flex items-center gap-3'>
                    <Avatar src={profileUrlBase + product?.user.username} />
                    <div className='text-custom-900 font-medium'>{product?.user.username}</div>
                </div>
                <div className='border-t border-gray'></div>
                <div className='description mt-6'>
                    <div className='text-custom-800'>Description</div>
                    <div className=''>{product?.description}</div>
                </div>
            </div>
        </div>
        )
    )
}