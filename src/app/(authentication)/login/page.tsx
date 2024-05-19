import Link from 'next/link';
import React from 'react';
import LoginForm from '@/app/components/forms/login-form';

export default function Login() {
    return (
        <div className="relative h-screen bg-custom-100 md:pb-20 lg:pb-28 flex items-center justify-center">
            <div className="lg:mx-auto my-auto lg:w-[500px] card border-none rounded-lg shadow-slate-100 relative">
                <div className="!px-10 !py-12 card-body">
                    <Link href="/">
                    </Link>

                    <div className="mt-8 text-center">
                        <h4 className="mb-1 text-custom-900 font-bold text-xl">Welcome Back!</h4>
                        <p className="text-slate-500 dark:text-zink-200">Log in to continue to Blurred Basket.</p>
                    </div>

                    <LoginForm/>
                    </div>
                </div>
            </div>
    );
}