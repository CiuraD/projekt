import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class PostController implements Controller {
   public path = '/api/post';
   public router = Router();

   constructor() {
       this.initializeRoutes();
   }

   private initializeRoutes() {
       this.router.get(`${this.path}/latest`, this.getAll);
       this.router.post(`${this.path}/:id`, this.addData);
   }
   private getAll = async (request: Request, response: Response, next: NextFunction) => {
    try {
        response.status(200).json(testArr);
    } catch (error) {
        next(error);
    }
};

private addData = async (request: Request, response: Response, next: NextFunction) => {
    try {
        console.log(request.body); // Dodajemy ten log
        const elem = request.body.elem;
        if (elem === undefined || elem === null) {
            throw new Error('Brak wartości "elem" w ciele żądania.');
        }
        testArr.push(elem);
        response.status(200).json(testArr);
    } catch (error) {
        next(error);
    }
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
        testArr = [];
        response.status(200).json([]);
    } catch (error) {
        next(error);
    }
};
    
}

export default PostController;