import {
    Form,
    Link,
    useActionData,
    useSearchParams,
    useNavigation,
    useSubmit
} from '@remix-run/react';

import { FaLock, FaUserPlus, } from 'react-icons/fa';

import logo from "~/assets/torama_logo.png"
import { SocialForm } from './SocialForm';

function AuthForm() {
    const [searchParams] = useSearchParams();
    const navigation = useNavigation();
    const validationErrors = useActionData();
    const actionData = useActionData();

    const authMode = searchParams.get('mode') || 'login';

    const submitBtnCaption = authMode === 'login' ? 'Login' : 'Create User';
    const toggleBtnCaption =
        authMode === 'login' ? 'Not registered? Create a new user' : 'Log in with existing user';

    const isSubmitting = navigation.state !== 'idle';

    return (
        <>

            <div className='container mx-auto  w-[20rem]     p-4 '>
                <Link to="/" className='py-4 text-center '>
                    <img src={logo} alt="logo" className='  h-20 w-20 rounded p-2 bg-red-100 mx-auto' />
                </Link>
                <p className='text-center text-xl font-medium mb-6'>
                    Login to your Account
                </p>
                <p className='text-center text-xs  font-thin mb-6'>
                    By logging in, you agree to Our Privacy Policy.
                </p>

                <Form method="post" className=" shadow-2xl rounded-xl bg-white h-[20rem] text-center  dark:bg-gray-800" id="auth-form">
                    <div className='py-4 '>
                        {authMode === 'login' ? <FaLock className="mx-auto " /> : <FaUserPlus className="mx-auto " />}
                    </div>

                    <div className='px-4'>
                        <div>
                            <label htmlFor="email">Email Address</label>
                            <input className=' bg-gray-200 text-gray-800 px-2' type="email" id="email" name="email" required />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <div>
                                <input className=' bg-gray-200 text-gray-800 px-2' type="password" id="password" name="password" minLength={7} />

                            </div>
                            {actionData?.errors?.password ? (
                                <div className="pt-1 text-red-700" id="password-error">
                                    {actionData.errors.password}
                                </div>
                            ) : null}

                        </div>

                        {actionData?.errors?.email ? (
                            <div className="pt-1 text-red-700" id="email-error">
                                {actionData.errors.email}
                            </div>
                        ) : null}
                    </div>

                    <div className="form-actions">
                        <button disabled={isSubmitting} className=' w-[15rem] bg-red-500 m-4 rounded '>
                            {isSubmitting ? 'Authenticating...' : submitBtnCaption}
                        </button>
                        <Link className='text-blue-600' to={authMode === 'login' ? '?mode=signup&type=email' : '?mode=login&type=email'}>
                            {toggleBtnCaption}
                        </Link>
                    </div>

                    <SocialForm />


                </Form>

                

            </div>


            
        </>
    );
}

export default AuthForm;