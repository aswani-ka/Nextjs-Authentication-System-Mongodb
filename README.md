# 🚀 Next.js Authentication Project


## 📖 Description
A **full-stack authentication system** built with **Next.js**, **React**, **TypeScript**, and **MongoDB**.  
Features include **email verification**, **forgot password**, and **reset password** functionality.  
Uses **JWT-based authentication** for secure login and signup.

---

## 🛠️ Tech Stack
- **Next.js (App Router)**
- **React**
- **TypeScript**
- **MongoDB & Mongoose**
- **Axios**
- **bcryptjs**
- **react-hot-toast**

---

## 📂 Folder Structure
- **/app**
  - **/api**
    - **/users**
      - signup
      - login
      - logout
      - me
      - verifyemail
      - forgotpassword
      - resetpassword
    - **/auth**
      - login
      - signup
      - profile
      - verifyemail
      - forgotpassword
      - resetpassword
- **/components**
- **/helpers**
- **/models**
- **/dbConfig**


---

## ✨ Features
- ✅ User registration with email verification  
- ✅ Login and logout functionality  
- ✅ Forgot password and reset password via email  
- ✅ JWT token authentication  
- ✅ Password hashing with **bcryptjs**

---

## ⚡ Setup Instructions
1. Clone the repository:
```bash
git clone <repo_url>


Install dependencies:

npm install
# or
yarn install


Create a .env file with the following variables:

MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
EMAIL_USER=<your_email>
EMAIL_PASS=<your_email_password>
DOMAIN=http://localhost:3000


Run the development server:

npm run dev
# or
yarn dev


Open your browser and go to:

http://localhost:3000

🚀 Usage

Register a new user

Verify email via the verification link

Login with verified credentials

Use "Forgot Password" to reset your password via email

📜 License

This project is licensed under the MIT License.