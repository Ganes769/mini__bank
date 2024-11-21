# Bankist 🏦

## Project Overview

Bankist is a simple, interactive web-based banking application that allows users to manage their finances through a clean and intuitive interface. The application supports account creation, login, money transfers, loan requests, and basic account management.

## Features

### User Authentication

- Create new accounts
- Login with username and PIN
- Secure account management

### Account Operations

- View current balance
- Track account movements (deposits and withdrawals)
- Transfer money between accounts
- Request loans
- Sort account movements

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla JS)

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor or IDE

2. Open `index.html` in your web browser

## Application Structure

### HTML (`index.html`)

- Defines the application's layout
- Contains forms for login, signup, transfers, and loans
- Responsive design with Poppins font

### JavaScript (`script.js`)

- Manages application logic
- Handles user authentication
- Implements account operations
- Provides dynamic UI updates

### Key Functions

- `createUserName()`: Generates unique usernames from account owners
- `displayMovements()`: Renders account transactions
- `calcDisplaySummery()`: Calculates and displays account summaries
- `btnTransfer`: Handles money transfers between accounts
- `btnLoan`: Processes loan requests

## Default Accounts

The application comes with four pre-defined accounts:

1. Jonas Schmedtmann (PIN: 1111)
2. Jessica Davis (PIN: 2222)
3. Steven Thomas Williams (PIN: 3333)
4. Sarah Smith (PIN: 4444)

## Account Creation

- Users can create new accounts
- Requires:
  - Full name
  - 4-digit PIN
- Automatically generates a username
- Adds a default initial balance

## Security Notes

- PINs are currently stored in plain text (not recommended for production)
- Implement proper authentication mechanisms in a real-world scenario

## Future Improvements

- Add password hashing
- Implement more robust error handling
- Add transaction history
- Integrate with backend database
- Enhance UI/UX

## Limitations

- Client-side only application
- No persistent data storage
- Minimal security features

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- Original design and concept by Jonas Schmedtmann
- Part of a JavaScript learning project
