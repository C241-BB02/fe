'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "Customer"
    });

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role.toUpperCase() // converting role to uppercase
                })
            });

            if (response.ok) {
                console.log("Registration successful!");
                router.push('/login');
            } else {
                console.error("Registration failed.");
                // Handle registration failure, display error message, etc.
            }
        } catch (error) {
            console.error("Error registering:", error);
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
        <form className="mt-10" id="registerForm" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-custom-900">Username</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="bg-custom-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-custom-900">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="bg-custom-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-custom-900">Your password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="bg-custom-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required />
            </div>
            <div className="mb-3">
                <label htmlFor="role" className="block mb-2 text-sm font-medium text-custom-900">Select your role</label>
                <select id="role" name="role" value={formData.role} onChange={handleChange} className="bg-custom-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-custom-500 block w-full p-2.5">
                    <option>Customer</option>
                    <option>Seller</option>
                </select>
            </div>
            <div className="mt-10">
                <button
                    type="submit"
                    className="w-full text-white btn bg-custom-800 border-custom-800 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                >
                    Sign me up!
                </button>
            </div>

            <div className="mt-10 text-center">
                <p className="mb-0 text-slate-500 dark:text-zink-200">Already have an account? <Link href="/login" className="font-semibold underline transition-all duration-150 ease-linear text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500">Log in</Link> </p>
            </div>
        </form>
    )
}
