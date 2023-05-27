// import { Form, Link, useActionData, useSearchParams, useSubmit } from "@remix-run/react";
// import { useEffect, useRef, useState } from "react";
// import type { action } from "~/routes/login";
// import type { User } from "firebase/auth";
// import { signInWithGooglePopup, signOutUser } from "~/utils/firebase.utils";
// import { FcGoogle } from "react-icons/fc";

// import person from "~/assets/person.png";

// export default function LoginPage() {
//     const [searchParams] = useSearchParams();
//     const actionData = useActionData<typeof action>();
//     const redirectTo = searchParams.get("redirectTo") || "/notes";
//     const emailRef = useRef<HTMLInputElement>(null);
//     const passwordRef = useRef<HTMLInputElement>(null);
//     const [user, setUser] = useState<User>();
//     const submit = useSubmit()


//     useEffect(() => {
//         if (actionData?.errors?.email) {
//             emailRef.current?.focus();
//         } else if (actionData?.errors?.password) {
//             passwordRef.current?.focus();
//         }
//     }, [actionData]);


//     const FireBaseGoogLogin = async () => {
//         const response = await signInWithGooglePopup()
//         if (response) {

//             setUser(response.user)
//             // revisit
//             let formData = new FormData();
//             const userData = { ...response.user, firebaseUID: response.user?.uid }
//             formData.append("user", JSON.stringify(response.user));

//             submit(formData, { method: "post", action: "/fire_join?type=google" });

//         }
//     };

//     const FirebaseSignOut = async () => {
//         await signOutUser()
//         setUser(null as any)
//     };

//     return (
//         <div className="flex min-h-full flex-col justify-center">
//             <div className="mx-auto w-full max-w-md px-8">
//                 {user && <div className="flex px-4">
//                     <div className="text-center text-2xl">Welcome {user?.displayName}</div>
//                     <img className="w-10 h-10 ml-2" src={person} alt="user" />
//                     <div><button onClick={FirebaseSignOut}>Logout</button></div>


//                 </div>}
//                 <Form method="post" action="/auth?mode=login&type=email" className="space-y-6">
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
//                                 className="w-full rounded border text-gray-600 border-gray-500 px-2 py-1 text-lg"
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
//                                 autoComplete="current-password"
//                                 aria-invalid={actionData?.errors?.password ? true : undefined}
//                                 aria-describedby="password-error"
//                                 className="w-full rounded border text-gray-600 border-gray-500 px-2 py-1 text-lg"
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
//                         Log in
//                     </button>

//                     {/* google login */}
//                     <div>OR</div>
//                     <div>
//                         <button
//                             className="w-full rounded px-4 py-2  border   border-gray-500 hover:opacity-1 hover:bg-gray-100 dark:hover:bg-slate-500 focus:bg-gray-400"
//                             onClick={FireBaseGoogLogin}>
//                             <FcGoogle className="inline-block w-6 h-6" />
//                             <span className="pl-6">  LOG IN WITH GOOGLE</span>
//                         </button>
//                     </div>
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                             <input
//                                 id="remember"
//                                 name="remember"
//                                 type="checkbox"
//                                 className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                             />
//                             <label
//                                 htmlFor="remember"
//                                 className="ml-2 block text-sm text-gray-900"
//                             >
//                                 Remember me
//                             </label>
//                         </div>
//                         <div className="text-center text-sm text-gray-500">
//                             Don't have an account?{" "}
//                             <Link
//                                 className="text-blue-500 underline"
//                                 to="/auth?mode=signup&type=email"

//                             >
//                                 Sign up
//                             </Link>
//                         </div>
//                     </div>
//                 </Form>
//             </div>
//         </div>
//     );
// }