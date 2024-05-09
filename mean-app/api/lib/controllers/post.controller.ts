import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import {checkPostCount} from '../middlewares/checkPostCount.middleware';
import DataService from '../modules/services/data.service';
import Joi = require('joi');

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class PostController implements Controller {
   public path = '/api/post';
   public router = Router();

   private dataService:DataService;

   constructor() {
       this.initializeRoutes();
   }

   private initializeRoutes() {
    this.router.post(`${this.path}/:num`, checkPostCount, this.getElementById);
    this.router.post(`${this.path}/:deleteOne`, this.removePost);
    this.router.post(`${this.path}/:deleteAll`,this.deleteAllPosts);
 }
 
 
   private getAll = async (request: Request, response: Response, next: NextFunction) => {
    try {
        response.status(200).json(testArr);
    } catch (error) {
        next(error);
    }
};

private addData = async (request: Request, response: Response, next: NextFunction) => {
    const {title, text, image} = request.body;
 
    const schema = Joi.object({
        title: Joi.string().required(),
        text: Joi.string().required(),
        image: Joi.string().uri().required()
     });

    const readingData = {
        title,
        text,
        image
    };
 
    try {
        await this.dataService.createPost(readingData);
        response.status(200).json(readingData);
    } catch (error) {
        console.error(`Validation Error: ${error.message}`);
        response.status(400).json({error: 'Invalid input data.'});
    }
 }
 
 private getElementById = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const allData = await this.dataService.query({_id: id});
    response.status(200).json(allData);
 }
 
 private removePost = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    await this.dataService.deleteData({_id: id});
    response.sendStatus(200);
 };

private getPostById = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = parseInt(request.params.id);
        const post = testArr[id];
        response.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

private addPost = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { elem } = request.body;
        testArr.push(elem);
        response.status(200).json(testArr);
    } catch (error) {
        next(error);
    }
};

private deletePostById = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = parseInt(request.params.id);
        testArr.splice(id, 1);
        response.status(200).json(testArr);
    } catch (error) {
        next(error);
    }
};

private getNPosts = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const num = parseInt(request.params.num);
        const posts = testArr.slice(0, num);
        response.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};

private getAllPosts = async (request: Request, response: Response, next: NextFunction) => {
    try {
        response.status(200).json(testArr);
    } catch (error) {
        next(error);
    }
};

private deleteAllPosts = async (request: Request, response: Response, next: NextFunction) => {
    try {
        await this.dataService.deleteAllPosts();
        response.sendStatus(200);
    } catch (error) {
        console.error(`Error deleting all posts: ${error.message}`);
        response.status(500).json({ error: 'Internal server error.' });
    }
};




}

export default PostController;