import express from 'express';
import { getProducts, getProductById, deleteProduct } from '../contollers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts);

router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct);

export default router;
