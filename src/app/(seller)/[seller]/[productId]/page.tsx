'use client'
import { Product, toProduct } from '@/types/product';
import { Skeleton, User } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export default function ProductDetail({ params }: Readonly<{ params: { seller: string, productId: string } }>) {
    const [product, setProduct] = useState<Product>();
    const [imageThumbnail, setImageThumbnail] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${params.productId}/`);
                const productRes: Product = toProduct(await res.json());
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
        <div className="lg:px-32 py-8 grid md:grid-cols-2 w-screen">
            <div className="">
                <Skeleton isLoaded={!isLoading} className="object-contain w-[390px] h-[390px] rounded-lg">
                    <img className="object-contain w-[390px] h-[390px] rounded-lg" src={imageThumbnail} alt="" />
                </Skeleton>
                <ul className="flex flex-wrap mb-0 gap-x-5 mt-5">
                    {
                        (product?.photos || []).map((photo: any, index: number) => {
                            return (
                                <li key={photo.id} className="mt-5" id="dropzone-preview-list2">
                                    <Skeleton isLoaded={!isLoading} className="object-cover w-[60px] h-[60px] rounded-lg">
                                        <button className="focus:border focus:border-custom-500 flex flex-col justify-center rounded-lg overflow-hidden border"
                                            onClick={() => setImageThumbnail(photo.image)}
                                        >
                                            <img className="object-cover w-[60px] h-[60px]" src={photo.image} alt={photo.id} />
                                        </button>
                                    </Skeleton>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>

            <div className='pr-8'>
                <Skeleton isLoaded={!isLoading} className="rounded-lg text-xl font-semibold min-h-8">
                    <div>{product?.name}</div>
                </Skeleton>
                <Skeleton isLoaded={!isLoading} className="rounded-lg text-gray-500 mt-2 w-fit">
                    <div>Stock {product?.stock}</div>
                </Skeleton>
                <Skeleton isLoaded={!isLoading} className="rounded-lg text-2xl font-medium mt-2 mb-4 min-h-12">
                    <div>{product?.price}</div>
                </Skeleton>
                <div className='border-t border-gray' />
                <Skeleton isLoaded={!isLoading} className="rounded-lg my-4 pr-3 flex flex-row gap-3">
                    <User
                        name={(<div className="text-custom-900 text-[16px] font-medium">{product?.user.username}</div>)}
                        avatarProps={{
                            src: profileUrlBase + product?.user.username
                        }}
                    />
                </Skeleton>
                <div className='border-t border-gray' />
                <div className='description mt-6'>
                    <Skeleton isLoaded={!isLoading} className="rounded-lg w-fit text-custom-800">
                        <div>Description</div>
                    </Skeleton>
                    <Skeleton isLoaded={!isLoading} className="rounded-lg min-h-32 mt-2">
                        <div>{product?.description}</div>
                    </Skeleton>
                </div>
            </div>
        </div>
    );
}
