'use client';

import { useAuth } from "@/context/AuthContext";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { Trash, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

const CreateProductForm = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [fileLimit, setFileLimit] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectfiles, setSelectfiles] = useState<any[]>([]);
    const [imageThumbnail, setImageThumbnail] = useState('/assets/images/placeholder.jpg');

    const handleAcceptfiles = (submitted: any) => {
        setErrorMessage('');
        let files: any = selectfiles.concat(submitted).slice(0, MAX_IMAGES);
        let validFiles = files.filter((file: any) => {
            if (file.size > MAX_FILE_SIZE) {
                setErrorMessage(`File ${file.name} exceeds the 2 MB limit and was not added.`);
                return false;
            }
            return true;
        });

        validFiles?.map((file: any) => {
            return Object.assign(file, {
                photo: file,
                preview: URL.createObjectURL(file),
            })
        });

        setSelectfiles(validFiles);
        setFileLimit(validFiles.length === MAX_IMAGES);
        if (validFiles.length > 0) {
            setImageThumbnail(validFiles[0].preview);
        }
    };

    const accept = {
        'image/png': ['.png'],
        'image/jpeg': ['.jpg', '.jpeg']
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            category: "",
            stock: 0,
            price: 0.0,
            description: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required('This field is required'),
            category: Yup.string().required('This field is required'),
            stock: Yup.number().required('This field is required').min(0, 'Must be greater than or equal to 0').max(999, "Must be less than 1000").integer('Please enter a valid quantity'),
            price: Yup.number().required('This field is required').min(0, 'Must be greater than or equal to 0'),
            description: Yup.string().required('This field is required'),
        }),
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('category', values.category);
                formData.append('stock', values.stock.toString());
                formData.append('price', values.price.toString());
                formData.append('description', values.description);
                formData.append('user_id', user.id.toString());

                selectfiles.forEach((file: any) => {
                    formData.append('photos', file.photo);
                });

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/create-product/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${user.accessToken}`,
                    },
                    body: formData
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Post product successful!", data);
                    router.push('/my-listings');
                } else {
                    console.error("Post product failed.");
                    console.error(response.json())
                    // TODO: Handle failure
                }
            } catch (error) {
                console.error("Error adding product:", error);
            }
        },
    });

    return (
        <div className="w-full grid md:grid-cols-2 justify-items-center items-start">
            <div>
                <img className="object-contain w-[390px] h-[390px] rounded-lg" src={imageThumbnail} alt="Product" />
                {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
                <ul className="flex flex-wrap mb-0 gap-x-5" id="dropzone-preview2">
                    {
                        (selectfiles || []).map((file: any, index: number) => (
                            <li key={index} className="mt-5" id="dropzone-preview-list2">
                                <Dropdown className="!min-w-0 !w-fit">
                                    <DropdownTrigger>
                                        <button className="focus:border focus:border-custom-500 flex flex-col justify-center rounded-lg overflow-hidden border"
                                            onClick={() => setImageThumbnail(file.preview)}
                                        >
                                            <img className="object-cover w-[60px] h-[60px]" src={file.preview} alt={file.name} />
                                        </button>
                                    </DropdownTrigger>
                                    <DropdownMenu>
                                        <DropdownItem
                                            key="delete"
                                            className="text-danger"
                                            color="danger"
                                            startContent={<Trash className="size-4" />}
                                            onClick={() => {
                                                const newImages: any = [...selectfiles];
                                                newImages.splice(index, 1);
                                                setSelectfiles(newImages);
                                                if (newImages.length > 0) {
                                                    setImageThumbnail(newImages[0].preview);
                                                } else {
                                                    setImageThumbnail('/assets/images/placeholder.jpg');
                                                }
                                                setFileLimit(false);
                                            }}
                                        >
                                            Delete
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <form
                id="signInForm"
                onSubmit={formik.handleSubmit}
            >
                <div className="mb-3">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-custom-900">Product title</label>
                    <input type="text" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`bg-white border text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-slate-200 mb-8'}`}
                        placeholder="Product title" required />
                    {formik.touched.name && formik.errors.name ? <div className="text-red-500 text-sm">{formik.errors.name}</div> : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-custom-900">Price</label>
                    <div className={`${formik.touched.price && formik.errors.price ? '' : 'mb-8'}`}>
                        <div className="flex gap-2 items-center">
                            <div className="text-sm font-medium text-custom-900">Rp</div>
                            <input type="number" id="price" name="price" value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-white border text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${formik.touched.price && formik.errors.price ? 'border-red-500' : 'border-slate-200'}`} placeholder="Product title" required />
                        </div>
                        {formik.touched.price && formik.errors.price ? <div className="text-red-500 text-sm">{formik.errors.price}</div> : null}
                    </div>
                </div>
                <div className="mb-3 md:flex md:justify-between w-full">
                    <div className={`${formik.touched.stock && formik.errors.stock || formik.touched.category && formik.errors.category ? '' : 'mb-5'}`}>
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-custom-900">Product category</label>
                        <input type="text" id="category" name="category" value={formik.values.category} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`bg-white border text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${formik.touched.category && formik.errors.category ? 'border-red-500' : 'border-slate-200'}`} placeholder="Product category" required />
                        {formik.touched.category && formik.errors.category ? <div className="text-red-500 text-sm">{formik.errors.category}</div> : null}
                    </div>
                    <div>
                        <label htmlFor="stock" className="block mb-2 mt-2 md:mt-0 text-sm font-medium text-custom-900">Stock</label>
                        <input type="number" step={1} id="stock" name="stock" value={formik.values.stock} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`bg-white border text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${formik.touched.stock && formik.errors.stock ? 'border-red-500' : 'border-slate-200'}`} required />
                        {formik.touched.stock && formik.errors.stock ? <div className="text-red-500 text-sm">{formik.errors.stock}</div> : null}
                    </div>
                </div>
                <div className="mb-3">
                    <div className="block mb-2 text-sm font-medium text-custom-900">Description</div>
                    <textarea id="description" name="description" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`bg-white border text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${formik.touched.description && formik.errors.description ? 'border-red-500' : 'border-slate-200 mb-8'}`} placeholder="Enter description" required />
                    {formik.touched.description && formik.errors.description ? <div className="text-red-500 text-sm">{formik.errors.description}</div> : null}
                </div>
                <div className="mb-3">
                    <div className="block mb-2 text-sm font-medium text-custom-900">Product Images</div>
                    <Dropzone
                        accept={accept}
                        disabled={fileLimit}
                        onDrop={(acceptedFiles: any) => {
                            handleAcceptfiles(acceptedFiles);
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
    );
};

export default CreateProductForm;
