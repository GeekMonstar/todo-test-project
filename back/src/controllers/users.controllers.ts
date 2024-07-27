import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export async function index(req: Request, res: Response){
  const prisma = new PrismaClient()
  try{
    const users = await prisma.user.findMany()
    if(users){
      res.status(200).json(users)

    }else{
      res.status(200).send("Aucun utilisateur.")
    }
    prisma.$disconnect()
  }catch(err){
    console.log(err)
    res.json(err)
  }
}

export async function show(req: Request, res: Response){
  const prisma = new PrismaClient()
  try{
    const {userId} = req.params
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId)
      }
    })
    if(user){
      res.status(200).json(user)

    }else{
      res.status(404).send("Cet utilisateur n'existe pas ou plus.")
    }
    prisma.$disconnect()
  }catch(err){
    console.log(err)
    res.json(err)
  }
}

export async function create(req: Request, res: Response){
  const prisma = new PrismaClient()
  try{
    const {fullname, nickname, email, password, role} = req.body;
    const user = await prisma.user.create({
      data: {
        fullname: fullname,
        nickname: nickname,
        email: email,
        password: password
      }
    })
    console.log(user)
    if(user){
      res.status(200).json(user)
    }else{
      res.status(400).json(user)
    }
    prisma.$disconnect()
  }catch(err){
    console.log(err)
    res.json(err)
  }
}
