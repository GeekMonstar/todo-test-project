import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export default async function authentification(req: Request, res: Response, next: NextFunction){
  try{
    const unprotectedRoutes = ["/auth/signup", "/auth/signin"];
  console.log(unprotectedRoutes.includes(req.path));
  console.log(unprotectedRoutes, req.path );

  if(unprotectedRoutes.includes(req.path)){
    console.log(1);
    next();
  }else{
    const {authToken} = req.cookies;
    if(authToken){
      console.log(2);
      if(await verify(authToken, `${process.env.SECRET_KEY}`)){
        next();
      }
    }else{
      console.log(3);
      res.status(401).json({message: "Vous devez vous authentifier."})
    }
  }
  }catch(error){
    res.status(401).json({error})
  }
}
