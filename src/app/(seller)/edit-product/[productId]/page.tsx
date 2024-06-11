import React, { useState } from 'react';
import EditProductForm from '@/app/components/forms/edit-product';
import { getSession } from '@/context/actions';

export default async function EditProduct({ params }: { params: { productId: string } }) {
    const session = await getSession()

    return (
        <div className="min-h-screen md:px-10 bg-blue-50 md:pb-20 lg:pb-28 flex items-center justify-center pt-5">
            <div className="lg:mx-auto w-screen my-auto card border-none rounded-lg shadow-slate-100 relative">
                <div className="!px-10 !py-12 card-body">
                    <h4 className="mx-4 mb-10 text-custom-900 font-medium text-xl">Edit Product</h4>
                        <EditProductForm productId={params.productId} session={{...session}}/>
                </div>
            </div>
        </div>
    );
}
