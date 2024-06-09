import Link from 'next/link';
import React from 'react';
import RegisterForm from '@/app/components/forms/register-form';

export default function Register() {
    return (
        <div className="relative h-screen bg-gradient-to-b from-custom-100 from-80% to-custom-200 flex justify-center items-center">
            <div className="lg:mx-auto my-auto lg:w-[500px] card border-none rounded-lg shadow-slate-100 relative">
                <div className="!px-10 !pb-12 card-body">
                    <Link href="/">
                    </Link>

                    <div className="mt-8 text-center">
                        <h4 className="mb-1 text-custom-900 font-bold text-xl">Create a New Account</h4>
                        <p className="text-slate-500 dark:text-zink-200">You are one step away from great products.</p>
                    </div>

                    <RegisterForm/>
                    </div>
                </div>
            </div>
    );
}