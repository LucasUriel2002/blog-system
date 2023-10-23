// ---- post Controller ----
const fs = require("fs");
const path = require("path");
// ---- Imports the data base conection ----
const sqlite3 = require("./dataBase");

// ---- Variables ----

// ---- FUNCTIONS ----

// Format Date
function formatDate(isoDate) {
  const date = new Date(isoDate);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
}

// Add Post
function addPost(title, text, author, imagePath, callback) {
  const db = new sqlite3.Database("blog.db");
  const postID = "postID" + Math.random().toString(16).slice(2); // Create a "random" ID to the post!
  const timestamp = new Date().toISOString(); // Get the date and hour in ISO format

  if (title && text && author && imagePath) {
    db.run(
      "INSERT INTO posts (id, title, text, author, timestamp, image_path) VALUES (?,?,?,?,?,?)",
      [postID, title, text, author, timestamp, imagePath],
      (error) => {
        callback(error, postID);
      }
    );
  } else {
    console.log("fill in the empty fields and insert a image");
  }
  db.close();
}
// Edit Post
function editPost(postID, title, text, author, callback) {
  const db = new sqlite3.Database("blog.db");

  db.run(
    "UPDATE posts SET title = ?, text = ?, author = ? WHERE id = ?",
    [title, text, author, postID],
    (error) => {
      callback(error);
    }
  );
  db.close();
}

// Delete Post and image
function deletePost(postId, callback) {
  const db = new sqlite3.Database("blog.db");

  // Getting the post image path
  db.get(
    "SELECT image_path FROM posts WHERE id = ?",
    [postId],
    (error, row) => {
      if (error) {
        db.close();
        return callback(error);
      }

      if (!row || !row.image_path) {
        db.close();
        return callback("Post not found or does not have an image");
      }

      const imagePath = path.join(__dirname, row.image_path);

      // Deleting the image
      fs.unlink(imagePath, (unlinkError) => {
        if (unlinkError) {
          console.error("Error deleting image:", unlinkError);
        }

        // Deleting from database
        db.run("DELETE FROM posts WHERE id = ?", [postId], (dbError) => {
          db.close();
          if (dbError) {
            console.error("Error deleting post from database:", dbError);
            callback(dbError);
          } else {
            callback(null);
          }
        });
      });
    }
  );
}

// Get Post By Id
function getPostByID(postID, callback) {
  const db = new sqlite3.Database("blog.db");
  db.get("SELECT * FROM posts WHERE id = ?", [postID], (error, post) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, post);
    }
  });

  db.close();
}
// Get Top Posts
function getTopPosts(callback) {
  const db = new sqlite3.Database("blog.db");
  db.all(
    "SELECT id, title, timestamp, image_path, views FROM posts ORDER BY views DESC LIMIT 4",
    (error, posts) => {
      callback(error, posts);
    }
  );
  db.close();
}

// Get Top 4 Recent Posts
function getTop4RecentPosts(callback) {
  const db = new sqlite3.Database("blog.db");
  db.all(
    "SELECT  id, title, timestamp, image_path, views FROM posts ORDER BY timestamp DESC LIMIT 4",
    (error, posts) => {
      callback(error, posts);
    }
  );
  db.close();
}

// Get All Recent Posts
// Get All Recent Posts
// Get All Recent Posts with Pagination
function getAllRecentPosts(page, postsPerPage, callback) {
  const db = new sqlite3.Database("blog.db");
  const offset = (page - 1) * postsPerPage;

  db.all(
    "SELECT id, title, timestamp, image_path, views FROM posts ORDER BY timestamp DESC LIMIT ? OFFSET ?",
    [postsPerPage, offset],
    (error, posts) => {
      if (error) {
        callback(error, null, 0); // 0 totalPages in case of an error
      } else {
        // Calculate the total number of posts
        db.get(
          "SELECT COUNT(*) as count FROM posts",
          (countError, countRow) => {
            if (countError) {
              callback(countError, null, 0); // 0 totalPages in case of an error
            } else {
              const totalPosts = countRow.count;
              const totalPages = Math.ceil(totalPosts / postsPerPage);
              callback(null, posts, totalPages);
            }
          }
        );
      }
      db.close();
    }
  );
}

// Register Views
function recordPostView(postID, callback) {
  const db = new sqlite3.Database("blog.db");

  db.run(
    "UPDATE posts SET views = views + 1 WHERE id = ?",
    [postID],
    (error) => {
      callback(error);
    }
  );

  db.close();
}

// ---- EXPORTS ----
module.exports = {
  addPost,
  getPostByID,
  getTopPosts,
  getTop4RecentPosts,
  formatDate,
  recordPostView,
  getAllRecentPosts,
  editPost,
  deletePost,
};
