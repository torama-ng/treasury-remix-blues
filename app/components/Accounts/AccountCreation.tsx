import { AccountType } from '@prisma/client';
import { Form, Link, useNavigation } from '@remix-run/react';
import { useState } from 'react';

export default function AccountCreation() {
    let [name, setName] = useState('');
    const navigation = useNavigation();
    const isSubmitting = navigation.state !== 'idle'


    return (
        <Form method="post" className="bg-black text-white p-8 rounded-lg ml-50">
            <label className="block mb-4">
                <span className="text-lg font-bold">Account Name:</span>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    name='name'
                    id="name"
                    className="mt-2 block w-full bg-white text-black rounded-md p-2"
                />
            </label>
            <div className="mb-4">
                <label htmlFor="accountType" className="block text-sm font-medium ">
                    Account Type
                </label>
                <select
                    id="accountType"
                    name="accountType"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 text-gray-700 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                >
                    {Object.values(AccountType).map(type =>
                        <option key={type} value={type}>
                            {type}
                        </option>
                    )}
                </select>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="py-2 px-4 rounded bg-red-600 text-white hover:bg-red-500 focus:ring-2 focus:ring-red-500"
            >
                {isSubmitting? '...adding account': 'Create Account'}
            </button>
            <Link to=".." className="block p-4 text-xl text-blue-500">Cancel </Link>
        </Form>
    );
}
