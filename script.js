'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const signupContainer = document.querySelector('.sign__nav');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const createuserBtn = document.querySelector('.signup__btn');
const createusrename = document.querySelector('.signup__input--user');
const createpin = document.querySelector('.signup__input--pin');
//Create new user

const displayMovements = function (mov, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? mov.slice().sort((a, b) => a - b) : mov;
  movs?.forEach((element, i) => {
    const type = element > 0 ? `deposit` : 'withdrawal';
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">4 month age</div>
    <div class="movements__value">${element}</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
//Creating username
const createUserName = function (account) {
  account.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(function (user) {
        return user[0];
      })
      .join('');
    console.log(account.username);
  });
};

createUserName(accounts);
//Login Function
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username == inputLoginUsername.value
  );
  if (currentAccount.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 100;
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginUsername.blur();
    labelWelcome.textContent = `Welcom,Back ${currentAccount.owner} `;
    displayMovements(currentAccount.movements);
    displayBalance(currentAccount);
    calcDisplaySummery(currentAccount);
  }
  console.log('hello');
  console.log(currentAccount);
});
const calcTotalBalance = function (account) {
  const totalbalance = account.movements.reduce((acc, cur) => acc + cur, 0);
  return totalbalance;
};

//Request Loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);

  if (loanAmount > 0) {
    const requestLoan = function (acc) {
      acc.movements?.push(loanAmount);
    };

    requestLoan(currentAccount);
    displayMovements(currentAccount.movements);
    displayBalance(currentAccount);
    calcDisplaySummery(currentAccount);
  }
  inputLoanAmount.value = '';
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAccc = accounts.find(
    acc => acc.username == inputTransferTo.value
  );
  if (!recieverAccc) {
    alert('Recipient account not found.');
    inputTransferAmount.value = '';
    inputTransferTo.value = '';
    return;
  }
  console.log(recieverAccc);
  if (amount > calcTotalBalance(currentAccount)) {
    inputTransferAmount.value = '';
    inputTransferTo.value = '';
    alert('insuffiecnt balance');
  }
  if (
    amount > 0 &&
    recieverAccc?.username !== currentAccount?.username &&
    amount < calcTotalBalance(currentAccount)
  ) {
    currentAccount?.movements?.push(-amount);
    recieverAccc?.movements?.push(amount);
    console.log(recieverAccc.movements);
    displayMovements(currentAccount?.movements);
    displayBalance(currentAccount);
    calcDisplaySummery(currentAccount);
  }

  inputTransferAmount.value = '';
  inputTransferTo.value = '';

  console.log('cc', currentAccount);
});
const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};
const calcDisplaySummery = function (acc) {
  const inbalnce = acc.movements
    .filter(acc => acc > 0)
    .reduce((acc, cur) => cur + acc);
  labelSumIn.textContent = `${inbalnce} EUR  `;
  const outbalance = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(outbalance)}`;
  const interest = acc.movements
    .filter(acc => acc > 0)
    .map(mov => mov * acc.interestRate)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumInterest.textContent = `${interest} EUR`;
};
createuserBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const name = createusrename.value;
  const pin = createpin.value;

  // Validation: Ensure name and pin are provided
  if (name && String(pin).length === 4 && !isNaN(pin)) {
    const newAccount = {
      owner: name,
      movements: [100, 200], // Default starting movements
      interestRate: 1.2, // Default interest rate
      pin: Number(pin),
    };

    // Add the new account to the accounts array
    accounts.push(newAccount);
    console.log(accounts);

    // Generate username for the new account
    createUserName([newAccount]); // Pass in an array with the new account

    // Welcome the new user
    labelWelcome.textContent = `Welcome, ${newAccount.owner}! Account created successfully.`;

    // Clear input fields after creation
    createusrename.value = '';
    createpin.value = '';
    alert(
      `Accounted created your username is : ${newAccount.username} and pin is: ${newAccount.pin}`
    );
    signupContainer.style.display = 'none';
  } else {
    alert('Invalid input. Please enter a valid name and 4-digit PIN.');
  }
  // console.log('New account created:', newAccount);
});
