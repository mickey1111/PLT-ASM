import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../../error';

export function validateRequestParams(req: Request, res: Response, next: NextFunction){
    if(!req.query.sku){
        throw ApiError.badRequest("SKU id missing")
    }
    
    next();
}