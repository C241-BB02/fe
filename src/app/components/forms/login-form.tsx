'use client';

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
    const router = useRouter();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login successful!", data);
                login(formData.username, data.role, data.access_token, data.refresh_token);
                router.push('/');
            } else {
                console.error("Login failed.");
                // Handle login failure, display error message, etc.
            }
        } catch (error) {
            console.error("Error logging in:", error);
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
        <form
            className="mt-10"
            id="signInForm"
            onSubmit={handleSubmit}
        >
            <div className="mb-3">
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-custom-900">Your username</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="bg-custom-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-custom-900">Your password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="bg-custom-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required />
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
