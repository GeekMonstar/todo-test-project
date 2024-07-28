import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

export async function indexUsers(req: Request, res: Response){
  const prisma = new PrismaClient()
  try{
    const users = await prisma.user.findMany({
      include: {
        Projects: true
      }
    })
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

export async function showUser(req: Request, res: Response){
  const prisma = new PrismaClient()
  try{
    const {userId} = req.params
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId)
      },
      include: {
        Projects: true
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

export async function destroyUser(req: Request, res: Response){
  const prisma = new PrismaClient()
  try{
    const {userId} = req.params
    const user = await prisma.user.delete({
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

export async function signup(req: Request, res: Response){
  const prisma = new PrismaClient()
  try{
    const {fullname, nickname, email, password, role} = req.body;
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        fullname: fullname,
        nickname: nickname,
        email: email,
        password: hashedPassword
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

export async function signin(req: Request, res: Response){
  const prisma = new PrismaClient()
  try{
    const {email, password} = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if(user && await compare(password, user.password)){
      const token = sign({userId: user.id},`${process.env.SECRET_KEY}` , {expiresIn: 36000*24})
      res.cookie("Auth Token", token, {maxAge: 36000*24, httpOnly: true, secure: true}).json({ message: 'Logged in', token });
    }else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
    prisma.$disconnect()
  }catch(err){
    console.log(err)
    res.json(err)
  }
}
