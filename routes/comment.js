const {Router} = require('express');
const Blog = require('../models/blog')
const Comment = require('../models/comment');
const User = require('../models/user');
const router = Router();

//route to post the comment to a specific blog
router.post('/:blogId',async(req,res) =>{
    await Comment.create({
        content : req.body.content,
        blogId : req.params.blogId,
        createdBy : req.user._id,
    })
    return res.redirect(`/blog/${req.params.blogId}`);
})

//delete the comment
router.delete('/:blogId/:id',async(req,res) =>{
    try {
        const blogId = req.params.blogId;
        const commentId = req.params.id;
        const comment = await Comment.findByIdAndDelete(commentId);
        if(!comment){
            res.status(404).send("Comment not found");
        }
        // return res.redirect(`/myblogs`);
        return res.redirect(`/blog/${blogId}`);
        
    } catch (error) {
        console.log("unable to delete the comment");
        
    }
    return res.redirect(`/blog/${req.params.blogId}`);
})
// Like or Unlike a comment
router.post('/:blogId/:id/like', async(req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).send("Comment not found");
        }
        const userIndex = comment.likes.indexOf(req.user._id);

        if (userIndex === -1) {
            comment.likes.push(req.user._id);
        } else {
            comment.likes.splice(userIndex, 1);
        }

        await comment.save();
        res.redirect(`/blog/${req.params.blogId}`);
    } catch (error) {
        console.log("Error liking/unliking comment:", error);
        res.status(500).send("Server error");
    }
});



module.exports = router;