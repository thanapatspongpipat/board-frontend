"use client";

import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
     const router = useRouter();
     const [email, setEmail] = useState("");
     const [error, setError] = useState("");

     const handleSubmit = async (e: any) => {
          e.preventDefault();
          setError("");

          const res = await signIn("credentials", {
               redirect: false,
               email,
          });

          if (res?.error) {
               setError("Invalid credentials. Please try again.");
          } else {
               router.push("/board");
          }
     };
     return (
          <div className="h-screen w-full">
               <div className="flex flex-col-reverse md:flex-row h-screen w-full bg-[#243831]">
                    <div className="flex flex-col w-full justify-center gap-9 items-center h-full">
                         <div className="flex flex-col justify-center gap-5 align-middle  px-10 w-full md:px-20 text-white h-full max-w-md">
                              <div>
                                   <span className="text-2xl text-white">
                                        Sing In
                                   </span>
                              </div>

                              <form onSubmit={handleSubmit}>
                                   <div className="flex flex-col gap-5">
                                        <Input
                                             label="Username"
                                             labelPlacement="outside"
                                             type="email"
                                             placeholder="Username"
                                             value={email}
                                             onChange={(e) =>
                                                  setEmail(e.target.value)
                                             }
                                             required
                                        />
                                        <Button
                                             type="submit"
                                             className="text-white"
                                             color="success"
                                        >
                                             Sign In
                                        </Button>
                                   </div>
                              </form>
                         </div>
                    </div>
                    <div className="h-3/5 md:w-4/5 md:h-full md:rounded-l-[36px] bg-[#2B5F44]">
                         <div className="flex relative w-full h-full items-center justify-center">
                              <div className="flex-col text-center">
                                   <div>
                                        <Image
                                             className="w-md"
                                             src="/assets/bg-login-1.png"
                                             alt="Background Image"
                                             layout="responsive" // Use fill to make it cover the parent
                                             objectFit="fit" // Ensure the image covers the div
                                             width={300}
                                             height={250}
                                        />
                                   </div>

                                   <div className="mt-6">
                                        <span className="text-md md:text-2xl font-bold text-white">
                                             a Board
                                        </span>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
