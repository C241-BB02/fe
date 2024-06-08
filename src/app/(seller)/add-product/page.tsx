import React from 'react';
import CreateProductForm from '@/app/components/forms/create-product';

export default function AddProduct() {
    return (
        <div className="min-h-screen md:px-10 bg-blue-50 md:pb-20 lg:pb-28 flex items-center justify-center pt-5">
            <div className="lg:mx-auto w-screen my-auto card border-none rounded-lg shadow-slate-100 relative">
                <div className="!px-10 !py-12 card-body">
                    <h4 className="mx-4 mb-10 text-custom-900 font-medium text-xl">Add Product</h4>
                    <div className="flex gap-4">
                        <CreateProductForm />
                    </div>
                </div>
            </div>
        </div>
    );
}