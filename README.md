## Overview: Debut Solo Project - Simple Blog with Basic Post Management

This project marks my initial endeavor into solo project development—a simple yet functional blog with essential post management capabilities. Developed using Node.js and Express framework, the blog incorporates necessary modules like `body-parser`, `multer` for image uploads, and utilizes `SQLite3` for database operations.

#### Key Features Implemented:

<font size="+2">1. **Static File Serving and Image Uploads**:</font> Utilizes `express.static` for serving static files and `multer` for effortless image uploads to the server.

<font size="+2">2. **Post Management**:</font>
   - **Adding Posts**: Allows users to create posts with a title, text, author, and an associated image. Validates and stores posts in the SQLite database.
   - **Editing Posts**: Enables modification of existing posts, facilitating updates to post details such as title, text, and author.
   - **Deleting Posts**: Supports the removal of posts along with their associated images from the server and the database.
   - **Viewing and Managing Posts**: Offers pagination for browsing and managing posts based on a specified number of posts per page.

<font size="+2">3. **Post Display**:</font>
   - **Homepage Showcase**:
     - **Top Posts Section**: Showcases posts based on view counts, presenting top-performing posts on the homepage.
     - **Recent Posts Section**: Highlights the top 5 recent posts, providing users with a snapshot of the most recent content.

   - **Individual Post View**: Enables users to delve into individual posts, displaying comprehensive post details, including view counts.
   - **Listing All Posts**: Provides an option to view all posts with convenient pagination.

<font size="+2">4. **Additional Functionalities**:</font>
   - **Recording Post Views**: Tracks and records the number of views for each post.
   - **Date Formatting**: Ensures user-friendly formatting of post timestamps.

#### Technologies Utilized:
- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Additional Modules**: `multer`, `body-parser`

As my inaugural project, this blog served as an invaluable learning platform, focusing on implementing fundamental blog functionalities while fostering adaptability and responsiveness. Moving forward, I aspire to enhance my skills by striving to achieve a 100% responsive website in future endeavors.

Your suggestions for improvement are highly appreciated as I continue to learn and grow in my development journey. Please explore the project's [app.js](app.js) and [postController.js](postController.js) files in this repository.

Thank you for your support and valuable feedback!
