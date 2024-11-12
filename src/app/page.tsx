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
import { Zap } from "lucide-react";

interface FormData {
    parentName: string;
    childName: string;
    childAge: number;
    email: string;
}

const schema = yup
    .object({
        parentName: yup
            .string()
            .required("Parent's name is required")
            .label("Parent's Name"),
        childName: yup
            .string()
            .required("Child's name is required")
            .label("Child's Name"),
        childAge: yup
            .number()
            .required("Child's age is required")
            .positive()
            .integer()
            .label("Child's Age"),
        email: yup.string().required().email().label("Email"),
    })
    .required();

export default function Home() {
    const [isSubmitted, setIsSubmitted] = useState(false);
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
                        console.log(result);
                        setIsSubmitted(true);
                        reset();
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

    const FormContainer = ({ children }: { children: React.ReactNode }) => (
        <div className="bg-white border-4 border-[rgb(25,33,47)] rounded-lg p-6 shadow-lg relative mt-12">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="bg-yellow-400 rounded-full p-2 border-4 border-[rgb(25,33,47)]">
                    <Zap size={32} className="text-[rgb(25,33,47)]" />
                </div>
            </div>
            {children}
        </div>
    );

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-10 bg-white">
            <div className="w-full max-w-md">
                <div className="flex justify-center">
                    <Image
                        src="/logo.png"
                        alt="My Logo"
                        width={300}
                        height={400}
                        className="w-48 h-auto sm:w-64 md:w-80 lg:w-96"
                    />
                </div>
                <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-2">
                    Exciting News! ZappSquad is Launching in January 2025
                </h2>
                <p className="text-center text-sm text-gray-600 mb-5">
                    Sign up now to receive a special discount code and an
                    exclusive trial to start your child's coding journey. Don't
                    miss out on the opportunity to learn, grow, and thrive with
                    ZappSquad!
                </p>
                {isSubmitted ? (
                    <FormContainer>
                        <div className="text-center mt-12">
                            <h2 className="text-2xl font-bold text-[rgb(25,33,47)] mb-4">
                                Thank you for joining ZappSquad!
                            </h2>
                            <p className="text-gray-600">
                                We're thrilled to have you on board. Get ready
                                for an exciting coding journey with your child!
                            </p>
                            <p className="text-gray-600 mt-2">
                                Keep an eye on your inbox for your special
                                discount code and exclusive trial information.
                            </p>
                        </div>
                    </FormContainer>
                ) : (
                    <FormContainer>
                        <form
                            ref={form}
                            onSubmit={handleSubmit(sendEmail)}
                            className="space-y-4 mt-12"
                        >
                            <div className="rounded-md shadow-sm">
                                <Input
                                    id="parent-name"
                                    {...register("parentName")}
                                    type="text"
                                    name="parentName"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Parent's Name"
                                />
                                {errors.parentName && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.parentName.message}
                                    </p>
                                )}
                            </div>
                            <div className="rounded-md shadow-sm">
                                <Input
                                    id="child-name"
                                    {...register("childName")}
                                    type="text"
                                    name="childName"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Child's Name"
                                />
                                {errors.childName && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.childName.message}
                                    </p>
                                )}
                            </div>
                            <div className="rounded-md shadow-sm">
                                <Input
                                    id="child-age"
                                    {...register("childAge")}
                                    type="text"
                                    name="childAge"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Child's Age"
                                />
                                {errors.childAge && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.childAge.message}
                                    </p>
                                )}
                            </div>
                            <div className="rounded-md shadow-sm">
                                <Input
                                    id="email-address"
                                    {...register("email")}
                                    type="email"
                                    name="email"
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
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[rgb(25,33,47)] hover:bg-[rgb(20,26,38)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(25,33,47)]"
                                >
                                    Subscribe
                                </Button>
                            </div>
                        </form>
                    </FormContainer>
                )}
            </div>
        </main>
    );
}
