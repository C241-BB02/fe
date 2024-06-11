'use client'

import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { capitalizeFirstLetter } from "./register-form";
import { login } from "@/context/actions";
import { SessionData } from "@/context/AuthContext";

const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
});

export default function LoginForm() {
    const [backendErrors, setBackendErrors] = useState<any>({});
    const [generalError, setGeneralError] = useState("");

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setBackendErrors({});
            setGeneralError(""); 
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/token/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: values.username,
                        password: values.password
                    })
                });

                if (response.ok) {
                    const data = await response.json() as SessionData;
                    login(data);
                } else {
                    const errorData = await response.json();
                    if (response.status === 400) {
                        setBackendErrors(errorData);
                        setErrors(
                            Object.keys(errorData).reduce((acc: any, key) => {
                                acc[key] = capitalizeFirstLetter(errorData[key][0]);
                                return acc;
                            }, {})
                        );
                    } else if (response.status === 401) {
                        setGeneralError("Invalid username or password");
                    }
                }
            } catch (error) {
                console.error("Error logging in:", error);
                setGeneralError("An unexpected error occurred. Please try again.");
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <form
            id="signInForm"
            onSubmit={formik.handleSubmit}
        >
            {generalError && (
                <div className="mt-4 text-center w-full rounded-lg bg-red-100 py-2 align-middle text-red-500 border border-red-200 text-sm mt-2">{generalError}</div>
            )}
            <div className="mb-3 mt-10">
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-custom-900">Your username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-custom-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Username"
                    required
                />
                {formik.touched.username && formik.errors.username && (
                    <div className="text-red-500 text-sm">{formik.errors.username}</div>
                )}
                {backendErrors.username && (
                    <div className="text-red-500 text-sm">{capitalizeFirstLetter(backendErrors.username[0])}</div>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-custom-900">Your password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-custom-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Password"
                    required
                />
                {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500 text-sm">{formik.errors.password}</div>
                )}
                {backendErrors.password && (
                    <div className="text-red-500 text-sm">{capitalizeFirstLetter(backendErrors.password[0])}</div>
                )}
            </div>

            <div className="mt-10">
                <button
                    type="submit"
                    className="w-full text-white btn bg-custom-800 border-custom-800 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                    disabled={formik.isSubmitting}
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
