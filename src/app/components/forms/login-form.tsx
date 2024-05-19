'use client';

import Link from "next/link";

export default function LoginForm() {
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log("Form submitted!"); // You can handle form submission logic here
    };
      
    return (
        <form
            className="mt-10"
            id="signInForm"
            onSubmit={handleSubmit}
        >
            <div className="mb-3">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-custom-900">Your email</label>
                <input type="email" id="email" className="bg-custom-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required />
            </div>
            <div className="mb-3">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-custom-900">Your password</label>
            <input type="password" id="password" className="bg-custom-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required />
            </div>
        
            <div className="mt-10">
                <button
                    type="submit"
                    className="w-full text-white btn bg-custom-800 border-custom-800 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                >
                    Log me in!
                </button>
            </div>

            <div className="mt-10 text-center">
                <p className="mb-0 text-slate-500 dark:text-zink-200">Don&apos;t have an account? <Link href="/register" className="font-semibold underline transition-all duration-150 ease-linear text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500">Register</Link> </p>
            </div>
        </form>
    )
}