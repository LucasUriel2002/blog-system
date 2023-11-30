// ---- Imports ----
const express = require("express");
const bodyParser = require("body-parser");
const postController = require("./Controller");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

// ---- General Configs ----
app.use(express.static("public"));
app.use("/public", express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---- Body-Parser Config ----
app.use(bodyParser.urlencoded({ extended: true }));

// ---- View Engine Config ----
app.set("view engine", "ejs");

// ---- Multer Image Upload Config ----
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Directory where images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Archive name, using a timestamp to avoid conflicts
  },
});

const upload = multer({ storage: storage });

// ---- Endpoint to provide images on demand
app.get("/images/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "uploads", imageName);

  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).send("Image not found");
  }
});

// ---- Main Route ----
app.get("/", (req, res) => {
  postController.getTopPosts((errorTop, topPosts) => {
    if (errorTop) {
      console.log(errorTop);
      res.status(500).send("Error retrieving top posts");
      return;
    }

    postController.getTop4RecentPosts((errorTop5, top5RecentPosts) => {
      if (errorTop5) {
        console.log(errorTop5);
        res.status(500).send("Error retrieving top 5 recent posts");
        return;
      }

      res.render("index", {
        topPosts,
        top5RecentPosts,
        formatDate: postController.formatDate,
      });
    });
  });
});

// Route to Add posts
app.get("/add-post", (req, res) => {
  res.render("addPosts");
});

app.post("/add-post", upload.single("image"), (req, res) => {
  const { title, text, author } = req.body;
  const imagePath = req.file.path;

  postController.addPost(title, text, author, imagePath, (error, postID) => {
    if (error) {
      console.log(error);
      res.status(500).send("Erro ao adicionar o post");
    } else {
      res.redirect("/");
    }
  });
});

// Routes to manage posts
app.get("/manage-posts", (req, res) => {
  // Redirecionar para a primeira página
  res.redirect("/manage-posts/1");
});

app.get("/manage-posts/:page", (req, res) => {
  const pageNumber = parseInt(req.params.page, 10) || 1;
  const postsPerPage = 8;

  postController.getAllRecentPosts(
    pageNumber,
    postsPerPage,
    (error, posts, totalPages) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error retrieving posts");
        return;
      }

      res.locals.formatDate = postController.formatDate;

      res.render("managePosts", {
        posts: posts,
        totalPages: totalPages,
        currentPage: pageNumber,
      });
    }
  );
});

app.get("/posts", (req, res) => {
  // Redirecionar para a primeira página
  res.redirect("/posts/1");
});

app.get("/posts/:page", (req, res) => {
  const pageNumber = parseInt(req.params.page, 10) || 1;
  const postsPerPage = 8;

  postController.getAllRecentPosts(
    pageNumber,
    postsPerPage,
    (error, posts, totalPages) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error retrieving posts");
        return;
      }

      res.locals.formatDate = postController.formatDate;

      res.render("posts", {
        posts: posts,
        totalPages: totalPages,
        currentPage: pageNumber,
      });
    }
  );
});

// Route to Edit Posts

app.get("/edit-post/:id", (req, res) => {
  const postId = req.params.id;
  postController.getPostByID(postId, (error, post) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error retrieving post");
      return;
    }

    if (!post) {
      res.status(404).send("Post not found");
      return;
    }
    res.render("editPost", { post });
  });
});

// Logic to update the post based on the ID
app.post("/edit-post/:id", (req, res) => {
  const postId = req.params.id;
  const { title, text, author } = req.body;

  postController.editPost(postId, title, text, author, (error) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error updating post");
      return;
    }
    res.redirect("/manage-posts");
  });
});

app.get("/delete-post/:id", (req, res) => {
  const postId = req.params.id;

  postController.deletePost(postId, (error) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error deleting post");
    } else {
      res.redirect("/manage-posts");
    }
  });
});

// Route accesses added posts
app.get("/post/:id", function (req, res) {
  const postID = req.params.id;

  postController.getTopPosts((errorTop, topPosts) => {
    if (errorTop) {
      console.log(errorTop);
      res.status(500).send("Error retrieving top posts");
      return;
    }

    postController.getPostByID(postID, (error, post) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error retrieving post");
      } else {
        if (post) {
          res.render("post", { post, topPosts });
        } else {
          res.status(404).send("Post not found");
        }
      }
    });
  });
});

// Route accesses all posts
app.get("/allPosts", (req, res) => {
  postController.getAllRecentPosts((error, posts) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error retrieving posts");
      return;
    }

    res.locals.formatDate = postController.formatDate;

    res.render("posts", { posts });
  });
});

// Route to register views in a post
app.get("/post/:id/view", (req, res) => {
  const postID = req.params.id;

  postController.recordPostView(postID, (error) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error recording post view");
    } else {
      // Redirect back to the post after recording the view
      res.redirect(`/post/${postID}`);
    }
  });
});

// Initialize server
const port = 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
