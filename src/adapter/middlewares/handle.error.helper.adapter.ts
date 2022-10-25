import express from "express";
import { ContainerTypes, ExpressJoiError } from 'express-joi-validation'

export default (err: any|ExpressJoiError, req: express.Request, res: express.Response, next: express.NextFunction) =>{
  if (err && err.type in ContainerTypes) {
    const e: ExpressJoiError = err

    res.status(400).end(`You submitted a bad ${e.type} paramater`)
  } else {
    res.status(500).end('internal server error')
  }
}

/*export default (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
      }

    if(err instanceof UnauthorizedError){
        return res.status(err.status).json(err);
    } 

    return res.status(500).json(err);
}; */

