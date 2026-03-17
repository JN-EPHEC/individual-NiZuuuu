import { type Request, type Response, type NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("--- ERREUR DÉTECTÉE ---");
    console.error(err.stack);

    const statusCode = err.status || 500;
    
    res.status(statusCode).json({
        error: err.message || "Une erreur interne est survenue"
    });
};