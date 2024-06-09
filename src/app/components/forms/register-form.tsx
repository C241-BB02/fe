'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const validationSchema = Yup.object({
    username: Yup.string().required("Username is required."),
    email: Yup.string().email("Invalid email address.").required("Email is required."),
    password: Yup.string().required("Password is required."),
    role: Yup.string().oneOf(["Customer", "Seller"]).required("Role is required.")
});

export default function RegisterForm() {
    const router = useRouter();
    const [backendErrors, setBackendErrors] = useState<any>({});

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            role: "Customer"
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/register/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: values.username,
                        email: values.email,
                        password: values.password,
                        role: values.role.toUpperCase()
                    })
                });

                if (response.ok) {
                    console.log("Registration successful!");
                    router.push('/login');
                } else {
                    const errorData = await response.json();
                    setBackendErrors(errorData);
                }
            } catch (error) {
                console.error("Error registering:", error);
            } finally {
                setSubmitting(false);
            }
        }
    });

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        formik.setFieldValue(name, value);

        // Clear the backend error for the field that is being changed
        if (backendErrors[name]) {
            const newBackendErrors = { ...backendErrors };
            delete newBackendErrors[name];
            setBackendErrors(newBackendErrors);
        }

        // Clear the formik error for the field
        formik.setFieldError(name, "");
    };

    return (
        <form className="mt-10" id="registerForm" onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-custom-900">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formik.values.username}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-custom-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Username"
                />
                {formik.touched.username && formik.errors.username && (
                    <div className="text-red-500 text-sm">{formik.errors.username}</div>
                )}
                {backendErrors.username && (
                    <div className="text-red-500 text-sm">{capitalizeFirstLetter(backendErrors.username[0])}</div>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-custom-900">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-custom-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Email"
                />
                {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-sm">{formik.errors.email}</div>
                )}
                {backendErrors.email && (
                    <div className="text-red-500 text-sm">{capitalizeFirstLetter(backendErrors.email[0])}</div>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-custom-900">Your password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-custom-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Password"
                />
                {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500 text-sm">{formik.errors.password}</div>
                )}
                {backendErrors.password && (
                    <div className="text-red-500 text-sm">{capitalizeFirstLetter(backendErrors.password[0])}</div>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="role" className="block mb-2 text-sm font-medium text-custom-900">Select your role</label>
                <select
                    id="role"
                    name="role"
                    value={formik.values.role}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-custom-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-custom-500 block w-full p-2.5"
                >
                    <option>Customer</option>
                    <option>Seller</option>
                </select>
                {formik.touched.role && formik.errors.role && (
                    <div className="text-red-500 text-sm">{formik.errors.role}</div>
                )}
                {backendErrors.role && (
                    <div className="text-red-500 text-sm">{capitalizeFirstLetter(backendErrors.role[0])}</div>
                )}
            </div>
            <div className="mt-10">
                <button
                    type="submit"
                    className="w-full text-white btn bg-custom-800 border-custom-800 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                    disabled={formik.isSubmitting}
                >
                    Sign me up!
                </button>
            </div>

            <div className="mt-10 text-center">
                <p className="mb-0 text-slate-500 dark:text-zink-200">Already have an account? <Link href="/login" className="font-semibold underline transition-all duration-150 ease-linear text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500">Log in</Link> </p>
            </div>
        </form>
    );
}
