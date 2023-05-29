# Banking Application Schema

This schema represents the main entities of a banking application: users, accounts, and transactions.

## Models

### User

This model represents a user in the system. A user can have multiple accounts, as indicated by the `Account[]` relation field.

Fields:

- `id`: A unique identifier for the user.
- `email`: The user's email address.
- `name`: The user's name.
- `createdAt`: The date and time when the user was created.
- `updatedAt`: The date and time when the user was last updated.
- `Accounts`: A list of accounts belonging to the user.

### Account

This model represents a bank account. An account belongs to a user and can have multiple transactions.

Fields:

- `id`: A unique identifier for the account.
- `name`: The name of the account.
- `balance`: The current balance of the account.
- `type`: The type of the account.
- `createdAt`: The date and time when the account was created.
- `updatedAt`: The date and time when the account was last updated.
- `userId`: The identifier of the user who owns the account.
- `User`: The user who owns the account.
- `Transactions`: A list of transactions related to the account.

### Transaction

This model represents a transaction, which can be either a deposit into an account or a transfer out of an account.

Fields:

- `id`: A unique identifier for the transaction.
- `amount`: The amount of the transaction.
- `direction`: The direction of the transaction (either 'IN' for deposits or 'OUT' for transfers).
- `type`: The type of the transaction (either 'DEPOSIT' or 'TRANSFER').
- `createdAt`: The date and time when the transaction was created.
- `updatedAt`: The date and time when the transaction was last updated.
- `accountId`: The identifier of the account related to the transaction.
- `Account`: The account related to the transaction.
- `charges`: The charges applied to the transaction (for transfers).
- `destinationBank`: The name of the bank where the funds are being transferred (for transfers).
- `destinationAccount`: The account number where the funds are being transferred (for transfers).

## Enums

### AccountType

This enum represents the different types of accounts a user can have. Currently, the only type is 'BASIC', but other types can be added as needed.

### Direction

This enum represents the direction of a transaction, either 'IN' for deposits or 'OUT' for transfers.

### TransactionType

This enum represents the type of a transaction, either 'DEPOSIT' or 'TRANSFER'.

Please note that this is a basic schema and might need adjustments based on your specific requirements. For instance, you might need to add more fields to represent additional data, or adjust the types of the existing fields. Also, the handling of charges, interest, and balance updates would generally be done in the application logic rather than the database schema.
