import express from 'express';
import { getAllCategories } from '../application/category';

const CategoryRouter = express.Router();

CategoryRouter
.route('/')
.get(getAllCategories);

export default CategoryRouter;