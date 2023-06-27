const Product=require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// create product   ----ADMIN
exports.createProduct = catchAsyncErrors(async (req,res,next)=>{
    req.body.user=req.user.id
    const product = await Product.create(req.body);
    res.status(201).json({
        sucess:true,
        product,
    });


});
//GET ALL PRODUCTS
exports.getAllproducts = catchAsyncErrors(async(req,res)=>{
    const resultPerPage =8;
    const productsCount=await Product.countDocuments();
    const apiFeature=new ApiFeatures(Product.find(),req.query)
    .search()
    .filter().pagination(resultPerPage)
    const products=await apiFeature.query;
    res.status(200).json({
        sucess:true,
        products,
        productsCount,
        
        })
})
//Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});
//GET PRODUCT DETAILS
exports.getProductDetails=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    
    if(!product){
        return next(new ErrorHander("Product not found",404));

        
       
    }
    
    res.status(200).json({
        success:true,
        product,

    })

   
})
//UPDATE PRODUCT ----ADMIN
exports.UpdateProduct=catchAsyncErrors(async(req,res,next)=>{
    let product = await  Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("Product not found",404));
    }
    product =await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    }); 
    res.status(200).json({
        success:true,
        product
    })

})
//DElete Product --Admin ERROR HERE IT DELETE ENTIRE PRODUCT INSTEAD OF SINGLE ONE
exports.deleteProduct=catchAsyncErrors(async(req,res,next)=>{
    const product = await  Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("Product not found",404));
    }
    await Product.remove();
        res.status(200).json({
        success:true,
        message:"product deleted successfuly"
    });
});
//create New Review or update the review
exports.createProductReview = catchAsyncErrors(async(req,res,next)=>{
    const{rating,comment,productId} = req.body;
    const review = {//object
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }
    //search product
const product = await Product.findById(productId);
 const isReviewed=product.reviews.find(
    (rev)=>rev.user.toString()===req.user._id.toString()
 )
 if(isReviewed){
    product.reviews.forEach((rev) =>{//forEach loop for every reviews
        if(rev.user.toString()===req.user._id.toString())//If review user id=req user id
    (rev.rating=rating),(rev.comment=comment)//Just change the same reviies and ratings
        
    })

 }else  {
    product.reviews.push(review)//push the review in array
    product.numOfReviews=product.reviews.length
 }
 //no of revies=4,5,5,2=16/4=4
 let avg=0;//keep average 0 
 product.ratings = product.reviews.forEach((rev) =>{
    avg+=rev.rating
 })//product.reviews.length
 product.ratings = avg / product.reviews.length;
 await product.save({validateBeforeSave:false});
 res.status(200).json({
    success:true,
 });

});
//Get All Revies of a Product 
exports.getProductReviews = catchAsyncErrors(async(req,res,next) => {
    const product=await Product.findById(req.query.id);//search id
    if(!product){
        return next(new ErrorHander("product not found",404));
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews,
    });


});
//Delete Reviews
exports.deleteReview=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.quer.productId);
    if(!product){
        return next(new ErrorHander("product not found",404));
    }
    const review=product.reviews.filter(rev=>rev._id.toString()!==req.query.id.toString()
    );
    let avg=0;
    reviews.forEach((rev)=>{
        avg+=rev.rating;
    });
    const ratings=avg/reviews.length;
    const numOfReviews=reviews.length;
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews,},{
            new:true,
            runValidators:true,
            useFindAndModify:false,

        
    })
    res.status(200).json({
        success:true,
        reviews:product.reviews,
    });
})

