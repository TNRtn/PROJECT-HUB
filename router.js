const express=require("express");
const router=express.Router();
const middleware=require("./middleware")
const uapi=require("./apis/userapis");
const review=require("./apis/reviewapis");
router.post('/register',uapi.uregister);
router.post('/login',uapi.ulogin);
router.get('/ufetch',middleware,uapi.uall);
router.get('/myprofile',middleware,uapi.me);
router.post('/addreview',middleware,review.addreview)
router.get('/myreview',middleware,review.myreview)
router.get('/allreviews',middleware,review.allreviews)
router.post('/addskills',middleware,uapi.addskills)
module.exports=router;
