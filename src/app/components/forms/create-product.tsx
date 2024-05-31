'use client';

import { useAuth } from "@/context/AuthContext";
import { ProductStatus } from "@/types/product";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { Trash, UploadCloud, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Dropzone from "react-dropzone";

const MAX_IMAGES = 5

export default function CreateProductForm() {
    const router = useRouter();
    const { user } = useAuth();
    const [fileLimit, setFileLimit] = useState(false)

    const [selectfiles, setSelectfiles] = useState([]);
    const [imageThumbnail, setImageThumbnail] = useState('/assets/images/placeholder.jpg');

    const handleAcceptfiles = (submitted: any) => {
        let files: any = selectfiles.concat(submitted).slice(0, MAX_IMAGES)
        files?.map((file: any) => {
            return Object.assign(file, {
                priview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            });
        });
        setSelectfiles(files);
        setFileLimit(files.length == MAX_IMAGES)
        if (files.length > 0) {
            setImageThumbnail(files[0].priview);
        }
    };

    const accept = {
        'image/png': ['.png'],
        'image/jpeg': ['.jpg', '.jpeg']
    };

    const formatBytes = (bytes: any, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    };

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        status: "",
        stock: 0,
        revenue: 0.0,
        images: []
    });

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/create-product/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    category: formData.category,
                    status: ProductStatus.Active,
                    stock: formData.stock,
                    revenue: formData.revenue,
                    user_id: user.id,
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Post product successful!", data);
                router.push('/my-listings');
            } else {
                console.error("Post product failed.");
                // TODO: Handle login failure, display error message, etc.
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="w-full grid grid-cols-2 justify-items-center">
            <div>
                <img className="object-contain w-[390px] h-[390px] rounded-lg" src={imageThumbnail} alt="Product image" />
         
                <ul className="flex flex-wrap mb-0 gap-x-5" id="dropzone-preview2">
                    {
                        (selectfiles || [])?.map((file: any, index: number) => {
                            return (
                                <li className="mt-5" id="dropzone-preview-list2">
                                    <Dropdown className="!min-w-0 !w-fit">
                                        <DropdownTrigger>
                                            <button className="focus:border focus:border-custom-500 flex flex-col justify-center rounded-lg overflow-hidden border"
                                                onClick={() => setImageThumbnail(file.priview)}
                                            >
                                                <img className="object-cover w-[60px] h-[60px]" src={file.priview} alt={file.name} />
                                            </button>
                                        </DropdownTrigger>
                                        <DropdownMenu>
                                            <DropdownItem
                                                key="delete"
                                                className="text-danger"
                                                color="danger"
                                                startContent={<Trash className="size-4"/>}
                                                onClick={() => {
                                                    const newImages: any = [...selectfiles];
                                                    newImages.splice(index, 1);
                                                    setSelectfiles(newImages);
                                                    if (newImages.length > 0) {
                                                        setImageThumbnail(newImages[0].priview);
                                                    } else {
                                                        setImageThumbnail('/assets/images/placeholder.jpg');
                                                    }
                                                    setFileLimit(false)
                                                }}
                                            >
                                                Delete
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>

                                </li>
                            );
                        })
                    }
                </ul>
            </div>
            <form
                className="mt-10"
                id="signInForm"
                onSubmit={handleSubmit}
            >
                <div className="mb-3">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-custom-900">Product title</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="bg-white border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Product title" required />
                </div>
                <div className="mb-3 flex justify-between w-full">
                    <div>
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-custom-900">Product category</label>
                        <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} className="bg-white border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Product category" required />
                    </div>
                    <div>
                        <label htmlFor="stock" className="block mb-2 text-sm font-medium text-custom-900">Stock</label>
                        <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} className="bg-white border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                </div>
                <div className="mb-3">
                    <div className="block mb-2 text-sm font-medium text-custom-900">Description</div>
                    <textarea id="description" name="description" onChange={handleChange} className="bg-white border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter description" required />
                </div>
                <div className="mb-3">
                    <div className="block mb-2 text-sm font-medium text-custom-900">Product Images</div>
                    <Dropzone
                        accept={accept}
                        disabled={fileLimit}
                        onDrop={(acceptfiles: any) => {
                            handleAcceptfiles(acceptfiles);
                        }}>
                        {({ getRootProps }: any) => (
                            <div className="flex items-center justify-center bg-white border border-dashed rounded-md cursor-pointer dropzone border-slate-300 dropzone2">
                                <div className="w-full py-5 text-lg text-center dz-message needsclick" {...getRootProps()} >
                                    <div className="mb-3">
                                        <UploadCloud className={`block size-12 mx-auto ${fileLimit ? 'text-slate-300 fill-slate-100' : 'text-slate-500 fill-slate-200'}`} />
                                    </div>
                                    <h5 className={`mb-0 font-normal text-sm ${fileLimit ? 'text-slate-300' : 'text-slate-500'}`}>Drag and drop your product images or browse your product images</h5>
                                </div>
                            </div>
                        )}
                    </Dropzone>

                </div>

                <div className="mt-10 flex justify-end">
                    <button
                        type="submit"
                        className="!px-6 !py-3 text-white btn bg-custom-800 border-custom-800 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100"
                    >
                        Add product
                    </button>
                </div>
            </form>
        </div>
    )
}
