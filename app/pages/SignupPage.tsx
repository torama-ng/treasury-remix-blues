// import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
// import { useEffect, useRef } from "react";
// import { action } from "~/routes/join";
// import { signInWithGooglePopup } from "~/utils/firebase.utils";
// import { FcGoogle } from "react-icons/fc";


// export default function SignUpPage() {
//     const [searchParams] = useSearchParams();
//     const redirectTo = searchParams.get("redirectTo") ?? undefined;
//     const actionData = useActionData<typeof action>();
//     const emailRef = useRef<HTMLInputElement>(null);
//     const passwordRef = useRef<HTMLInputElement>(null);

//     useEffect(() => {
//         if (actionData?.errors?.email) {
//             emailRef.current?.focus();
//         } else if (actionData?.errors?.password) {
//             passwordRef.current?.focus();
//         }
//     }, [actionData]);

//     const FireBaseGoogLogin = async () => {
//         const response = await signInWithGooglePopup()
//         console.log(response);
//     };


//     return (
//         <div className="flex min-h-full flex-col justify-center">
//             <div className="mx-auto w-full max-w-md px-8">
//                 <Form method="post" action="/auth?mode=signup&type=email" className="space-y-6">
//                     {/* google login */}
//                     <div>
//                         <button
//                             className="w-full rounded px-4 py-2  border   border-gray-500 hover:opacity-1 hover:bg-gray-100 dark:hover:bg-slate-500 focus:bg-gray-400"
//                             onClick={FireBaseGoogLogin}>
//                             <FcGoogle className="inline-block w-6 h-6" />
//                             <span className="pl-6">  LOG IN WITH GOOGLE</span></button>
//                     </div>
//                     <div className="w-full text-center px-4 py-2 text-xl ">OR</div>
//                     <div className="w-full ">Sign up with email below</div>
//                     <div>
//                         <label
//                             htmlFor="email"
//                             className="block text-sm font-medium text-gray-500"
//                         >
//                             Email address
//                         </label>
//                         <div className="mt-1">
//                             <input
//                                 ref={emailRef}
//                                 id="email"
//                                 required
//                                 autoFocus={true}
//                                 name="email"
//                                 type="email"
//                                 autoComplete="email"
//                                 aria-invalid={actionData?.errors?.email ? true : undefined}
//                                 aria-describedby="email-error"
//                                 className="w-full rounded text-gray-500 border border-gray-500 px-2 py-1 text-lg"
//                             />
//                             {actionData?.errors?.email ? (
//                                 <div className="pt-1 text-red-700" id="email-error">
//                                     {actionData.errors.email}
//                                 </div>
//                             ) : null}
//                         </div>
//                     </div>

//                     <div>
//                         <label
//                             htmlFor="password"
//                             className="block text-sm font-medium text-gray-500"
//                         >
//                             Password
//                         </label>
//                         <div className="mt-1">
//                             <input
//                                 id="password"
//                                 ref={passwordRef}
//                                 name="password"
//                                 type="password"
//                                 autoComplete="new-password"
//                                 aria-invalid={actionData?.errors?.password ? true : undefined}
//                                 aria-describedby="password-error"
//                                 className="w-full rounded border text-gray-500 border-gray-500 px-2 py-1 text-lg"
//                             />
//                             {actionData?.errors?.password ? (
//                                 <div className="pt-1 text-red-700" id="password-error">
//                                     {actionData.errors.password}
//                                 </div>
//                             ) : null}
//                         </div>
//                     </div>

//                     <input type="hidden" name="redirectTo" value={redirectTo} />
//                     <button
//                         type="submit"
//                         className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
//                     >
//                         Create Account
//                     </button>
//                     <div className="flex items-center justify-center">
//                         <div className="text-center text-sm text-gray-500">
//                             Already have an account?{" "}
//                             <Link
//                                 className="text-blue-500 underline"
//                                 to="/auth?mode=login&type=email"
//                             >
//                                 Log in
//                             </Link>
//                         </div>
//                     </div>
//                 </Form>
//             </div>
//         </div>
//     )
// }