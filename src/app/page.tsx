"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

interface FormData {
    email: string;
}

const schema = yup
    .object({
        email: yup.string().required().email().label("Email"),
    })
    .required();

export default function Home() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });
    const form = useRef<HTMLFormElement>(null);

    const sendEmail = (data: FormData) => {
        if (form.current) {
            emailjs
                .sendForm(
                    "service_3fdprv5",
                    "template_1c4nxvo",
                    form.current,
                    "1cRDzSpi_17W_G0xC"
                )
                .then(
                    (result) => {
                        toast("Subscribed successfully!", {
                            position: "top-center",
                        });
                        reset();
                        console.log(result);
                    },
                    (error) => {
                        console.log(error);
                        toast.error("Subscription failed.");
                    }
                );
        } else {
            console.error("Form reference is null");
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-10 bg-white">
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-4">
                    <Image
                        src="/logo.png"
                        alt="My Logo"
                        width={300}
                        height={400}
                        className="w-48 h-auto sm:w-64 md:w-80 lg:w-96"
                    />
                </div>
                <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-2">
                    Coming Soon
                </h1>
                <p className="text-center text-sm text-gray-600 mb-4">
                    We're working hard to bring you something amazing. Stay
                    tuned!
                </p>
                <form
                    ref={form}
                    onSubmit={handleSubmit(sendEmail)}
                    className="space-y-4"
                >
                    <div className="rounded-md shadow-sm">
                        <Input
                            id="email-address"
                            {...register("email")}
                            type="email"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email address"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Subscribe
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}
