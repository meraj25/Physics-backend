import express from 'express';
import { getAllCategories,createCategory } from '../application/category';

const CategoryRouter = express.Router();

CategoryRouter
.route('/')
.get(getAllCategories)
.post(createCategory);

export default CategoryRouter;