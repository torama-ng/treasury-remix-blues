import { Form } from "@remix-run/react";

export function AccountItemDetails({ account }: any) {
    return (
        <div >
            <div className="hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                <h3 className="text-2xl font-bold">{account.name}</h3>
                <p className="py-2">{account.accountNumber}</p>
                <p className="py-2">{account.accountType}</p>
                <p className="py-2">Balance: {account.balance}</p>
            </div>

            <hr className="my-4" />
            <Form method="post">
                {/* <label className="block mb-4">
                    <span className="text-lg font-bold">Account Name:</span>
                    <input
                        defaultValue={defaultValues.name}
                        value={defaultValues.name}
                        onChange={e => setName(e.target.value)}
                        name='name'
                        id="name"
                        className="mt-2 block w-full bg-white text-black rounded-md p-2"
                    />
                </label> */}
                {/* <div className="mb-4">
                    <label htmlFor="accountType" className="block text-sm font-medium ">
                        Account Type
                    </label>
                    <select
                        id="accountType"
                        name="accountType"
                        onChange={e => setType(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 text-gray-700 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    >
                        {Object.values(AccountType).map(type =>
                            <option key={type} value={defaultValues.accountType} defaultValue={defaultValues.accountType}>
                                {type}
                            </option>
                        )}
                    </select>
                </div> */}

                <button
                    type="submit" name="delete" id="delete"
                    className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:bg-red-400"
                >
                    Delete
                </button>
                <button
                    type="submit" name="edit" id="edit"
                    className="rounded bg-gray-500 ml-2 px-4 py-2 text-white hover:bg-gray-600 focus:bg-gray-400"
                >
                    Edit
                </button>
            </Form>
        </div>
    )
}