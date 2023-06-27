const express=require("express");





const { getAllproducts,
    createProduct, 
    UpdateProduct,
    deleteProduct, 
    getProductDetails, 
    createProductReview,
    getProductReviews,
    deleteReview,
    getAdminProducts,} = require("../controllers/productController");
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");
const router = express.Router();
//router.route("/products").get(isAuthenticatedUser,authorizeRoles("admin"),getAllproducts);
router.route("/products").get(getAllproducts);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
router.route("/product/new").post(isAuthenticatedUser,createProduct);
router.route("/product/:id")
.put(isAuthenticatedUser,UpdateProduct)
.delete(isAuthenticatedUser,deleteProduct)
.get(getProductDetails)
router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser,createProductReview)
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReview)

router.route("/product")
module.exports = router