const {Router} = require('express');
const multer = require('multer')
const path = require('path');
const Blog = require('../models/blog')
const Comment = require('../models/comment')

const router = Router();

//route to render the form to add a blog
router.get('/add-new',(req,res) =>{
    res.render('addBlog',{
        user : req.user,
    })
})

//display blogs of me
router.get('/myblogs',async(req,res) =>{
    try {
        const userId = req.user._id;
        const blogs = await Blog.find({createdBy : userId}).sort({createdAt : -1})
        return res.render('myBlogs', {
            user : req.user,
            blogs,
        })
    } catch (err) {
        console.error('Error fetching blogs for user:', err);
        res.status(500).json({ message: 'Server error', error: err });
      }
});

//route to display a specific blog and its content
router.get('/:id',async(req,res) =>{
    try {
        const blog = await Blog.findById(req.params.id).populate("createdBy");
        blog.views += 1;
        await blog.save();

        const comments = await Comment.find({ blogId: blog._id }).populate("createdBy");
        return res.render('blog', {
            user: req.user,
            blog,
            comments,
        });
    } catch (err) {
        console.error('Error fetching blog:', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
})

//delete the blog create by the user
router.delete('/:id', async (req, res) => {
    try {
      const blogId = req.params.id;
      await Comment.deleteMany({ blogId });
      await Blog.findByIdAndDelete(blogId);
      res.redirect('/blog/myblogs');
    } catch (error) {
      console.error('Error deleting blog:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  });
  



//multer to insert the coverImage to uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
const upload = multer({ storage: storage })

//form to create a blog
router.post('/',upload.single("coverImage"),async(req,res) =>{
    const {title ,category,  body } = req.body;
    const blog = await Blog.create({
        title,
        category,
        body,
        createdBy:req.user._id,
        coverImageURL : `/uploads/${req.file.filename}`
    });
    return res.redirect(`/`);
})


//edit blog form redirect
router.get('/:id/edit', async(req,res) =>{
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        return res.render('editBlog', {
            user: req.user,
            blog,
        });
    } catch (err) {
        console.error('Error fetching blog for editing:', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
});


//update the blog
router.put('/:id', upload.single("coverImage"), async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        // Update blog details
        blog.title = req.body.title;
        blog.body = req.body.body;
        if (req.file) {
            blog.coverImageURL = `/uploads/${req.file.filename}`;
        }
        await blog.save();
        return res.redirect(`/blog/${blogId}`);
    } catch (err) {
        console.error('Error updating blog:', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
});


//filter the blogs by category
router.get('/category/:category',async(req,res) => {
    try {
        const filteredBlogs = await Blog.find({category : req.params.category});        
        if(filteredBlogs.length == 0){
            return res.send("No blogs in that category");//add error page here
        }
        return res.render('home', {
            user : req.user,
            blogs : filteredBlogs,
        })
    } catch (error) {
        console.log("error");
    }
})


// Like or Unlike a blog
router.post('/:id/like', async(req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send("Blog not found");
        }
        const userIndex = blog.likes.indexOf(req.user._id);

        if (userIndex === -1) {
            blog.likes.push(req.user._id);
        } else {
            blog.likes.splice(userIndex, 1);
        }

        await blog.save();
        res.redirect(`/blog/${req.params.id}`);
    } catch (error) {
        console.log("Error liking/unliking comment:", error);
        res.status(500).send("Server error");
    }
});

module.exports = router;