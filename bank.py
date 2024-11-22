accounts=[]
class BankAccount:
  def __init__(self,account_number,accountholder,initbalance=100) :
    self.account_number=account_number
    self.accountholder=accountholder
    self.balance=initbalance
  def deposit(self,amount):
    self.balance+=amount
  def withdraw(self,amount):
       if amount > self.balance:
            print(f"Insufficient balance in account {self.account_number}!")
            return False
       self.balance -= amount
       return True
class AccountManager:
  def __init__(self):
    self.accounts=[]
    self.accounts.append(BankAccount("12345", "John Doe", 150))
    self.accounts.append(BankAccount("67890", "Jane Smith", 180))
  def __iter__(self):
        return iter(self.accounts)
  def find_account(self,acc_number):
    for  account in self.accounts:
      if account.account_number==acc_number:
        return account
  @staticmethod
  def validate_account_number(account_number):
    return account_number.isdigit() and len(account_number)==5
  @staticmethod
  def validate_initial_balance(balance):
    return balance<200
  def createAccount(self):
   print("\n Create new account  ")
   while True:
     account_number=input("Enter new acc number")
     if self.validate_account_number(account_number):
        break
     else:
        print("Account number should be of 5 digit")
   acc_holder=input("Enter new acc holder name")
   while True:
    initbalance=float(input("Enter how much you want initial balance"))
    if self.validate_initial_balance(initbalance):
      break
    else:
      print("You can only deposit maximum of 200 balance")
   account=BankAccount(account_number,acc_holder,initbalance)
   self.accounts.append(account)
   print("Account create successfully")
  def display_accounts(self):
      if not self.accounts:
       print("\nNo accounts available.")
       return  
      for account in self.accounts:
         print("-------------Total accounts----------------")
         print(f"Account Number: {account.account_number}")
         print(f"Account Holder: {account.accountholder}")
         print(f"Balance: {account.balance}")
         print("-" * 30)
 
  def get_loan(self):
        print("\nGet Loan")
        account_number = input("Enter account number: ")
        loan_amount = float(input("Enter loan amount: "))
        
        account = self.find_account(account_number)
        if account:
            account.deposit(loan_amount)
            print(f"Loan of {loan_amount} granted to account {account_number}. New balance: {account.balance}")
        else:
            print("Account not found!")
  def select_account(self):
        """Allows the user to select an account by its number."""
        self.display_accounts()
        while True:
            account_number = input("Enter your account number to proceed: ")
            account = self.find_account(account_number)
            if account:
                return account
            else:
                print("Invalid account number. Please try again.")

  def transfer_money(self, sender_account):
        print("\nTransfer Money")
        self.display_accounts()
        receiver_acc = input("Enter receiver's account number: ")
        amount = float(input("Enter amount to transfer: "))

        receiver = self.find_account(receiver_acc)

        if not receiver:
            print("Receiver's account not found!")
            return
        if sender_account.withdraw(amount):
            receiver.deposit(amount)
            print(f"Successfully transferred {amount} from {sender_account.account_number} to {receiver_acc}. ")
            print(f"Remaning account balance:{sender_account.balance}")
        else:
            print("Insufficient balance in your account.")


if  __name__ == "__main__":
    manager = AccountManager()

    while True:
        print("\nBank Account Manager")
        print("1. Create Account")
        print("2. Display Accounts")
        print("3. Transfer Money")
        print("4. Get Loan")
        print("5. Exit")
        choice = input("Enter your choice: ")

        if choice == "1":
            manager.createAccount()
        elif choice == "2":
            manager.display_accounts()
        elif choice == "5":
            print("Exiting... Goodbye!")
        elif choice == "4":
            manager.get_loan()
        elif choice == "3":
            sender = manager.select_account()
            manager.transfer_money(sender)
            break
        else:
            print("Invalid choice. Please try again.")