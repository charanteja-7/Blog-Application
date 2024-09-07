### Blogging Application (Node.js, Express, MongoDB, EJS)
A full-stack blogging application built with Node.js, Express, MongoDB, and EJS. This project allows users to sign up, sign in, create, update, and delete blogs, comment on blogs, and interact through likes. It also features user authentication, file upload for blog cover images, and a dynamic comment section with the ability to like and manage comments.

#### Key Features:
- **User Authentication**: Sign up, sign in, and session management using Express and MongoDB.
- **Blog Management**: Users can create, edit, delete, and view their blogs, each with a cover image and category.
- **Comments & Likes**: Interactive comment section where users can add, like, and delete comments.
- **Categories**: Blogs can be filtered based on categories like Technology, Business, Education, and more.
- **Responsive Design**: Built with Bootstrap for a mobile-friendly user interface.
- **File Uploads**: Users can upload blog cover images using `Multer`.

#### Technologies Used:
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Templating Engine**: EJS for server-side rendering
- **Styling**: Bootstrap
- **Authentication**: JWT authentication
- **File Uploads**: Multer

#### Future Enhancements:
- Adding real-time features using WebSockets or Socket.io
- Migrating front-end to React for better interactivity
- Implementing social media integrations for blog sharing

Certainly! Here’s an updated description with installation and usage instructions:

---

### Blogging Application (Node.js, Express, MongoDB, EJS)

A full-stack blogging application built with Node.js, Express, MongoDB, and EJS. This project allows users to sign up, sign in, create, update, and delete blogs, comment on blogs, and interact through likes. It also features user authentication, file upload for blog cover images, and a dynamic comment section with the ability to like and manage comments.

#### Key Features:
- **User Authentication**: Sign up, sign in, and session management using Express and MongoDB.
- **Blog Management**: Users can create, edit, delete, and view their blogs, each with a cover image and category.
- **Comments & Likes**: Interactive comment section where users can add, like, and delete comments dynamically.
- **Categories**: Blogs can be filtered based on categories like Technology, Business, Education, and more.
- **Responsive Design**: Built with Bootstrap for a mobile-friendly user interface.
- **File Uploads**: Users can upload blog cover images using Multer.

#### Technologies Used:
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Templating Engine**: EJS for server-side rendering
- **Styling**: Bootstrap
- **Authentication**: Passport.js
- **File Uploads**: Multer


#### Installation and Usage:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/charanteja-7/Blog-Application.git
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Setup Environment Variables:**
   Create a `.env` file in the root directory of the project and add the following variables:
   ```
   PORT = Add-port-number
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   ```

4. **Run the Application:**
   ```bash
   npm start
   ```

   The application will start on `http://localhost:8000` by default. You can access it in your web browser.

5. **Database Setup:**
   Ensure you have MongoDB running and accessible with the connection string provided in your `.env` file. The application will automatically handle the creation of necessary collections in MongoDB.

6. **Access the Application:**
   - **Home Page**: View all blogs
   - **Add New Blog**: Create a new blog
   - **My Blogs**: Manage your own blogs
   - **Sign Up / Sign In**: User authentication

