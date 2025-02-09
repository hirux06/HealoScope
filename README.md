# Healoscope

Healoscope is a blog platform designed specifically for doctors to share articles, research, and insights related to healthcare. It provides a role-based authentication system to ensure secure access for different user types.

## 🌟 Features

- 🏥 **Role-Based Authentication**: Secure access control for doctors and users.
- 📝 **Blog Posting**: Doctors can publish articles on medical topics, and users can only react.
- 🤖 **AI-Assisted Post Generation**: Generate AI-powered content using Gemini AI.
- 💬 **Comments & Engagement**: Users can engage with posts through comments.
- 📄 **User Profiles**: Personalized profiles for doctors and users.
- 🖋 **Markdown Support**: Write posts using standard Markdown syntax.
- 📢 **Email Notification**: Email Notification post registration
- 🔐 **Secure Authentication**: JWT-based authentication for data security.

## 🚀 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Cloud Storage**: Cloudinary for image uploads
- **AI Integration**: Gemini AI for post generation
- **Email Notification**: NodeMailer 
- **Hosting**: Vercel for frontend and Render for backend and MongoDB Atlas for database hosting

## 📂 Project Structure

```
healoscope/
│── backend/
│   ├── models/      # Database schemas
│   ├── routes/      # API routes
│   ├── controllers/ # Business logic
│   ├── utils/ # Cloud and Email sending logics
│   ├── server.js    # Entry point
│
│── frontend/
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── assets/       # Images folder
│   │   ├── App.js       # Main App component
│
│── README.md
```

## ⚡ Setup & Installation

### Prerequisites

- Node.js & npm
- MongoDB
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/healoscope.git
   cd healoscope
   ```
2. **Install dependencies**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. **Set up environment variables** (Create a `.env` file in the backend with these variables)
   ```env
   PORT=your_port_number
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   EMAIL_USER=email_you_want_to_send_mail_to_your_users
   EMAIL_PASS=password_generated_from_google_oauth_or_any_auth_providers
   CLOUDINARY_NAME=cloudinary_name
   CLOUDINARY_API_KEY=cloudinary_key
   CLOUDINARY_API_SECRET=cloudinary_secret
   GEMINI_API_KEY=gemini_api_key
   ```
4. **Run the backend**
   ```bash
   cd backend
   npm run dev
   ```
5. **Run the frontend**
   ```bash
   cd frontend
   npm start
   ```
6. **Visit the application**: `http://localhost:3000`

## 🎯 Future Enhancements

- ⭐ AI-assisted post generation using Gemini AI (Enhanced Features)
- 📢 Notifications for registering on the website
- 🌍 Multi-language support

## 📜 License

This project is licensed under the MIT License.

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss your ideas.

## 📞 Contact

For inquiries, reach out to **Saran Hiruthik M** at [[saran.hiruthik83@gmail.com](mailto:saran.hiruthik83@gmail.com)] or connect via [LinkedIn](https://linkedin.com/in/saran-hiruthik-m).

