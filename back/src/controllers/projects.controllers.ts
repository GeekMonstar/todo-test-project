import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export async function index(req: Request, res: Response){
  try{
    const projects = await prisma.project.findMany()
    if(projects){
      res.status(200).json(projects);
    }else{
      res.status(200).send("Aucun project");
    }
    prisma.$disconnect()
  }catch(err){
    console.log(err);
    res.json(err)
  }
}

export async function show(req: Request, res: Response){
  try{
    const {projectId} = req.params
    const project = await prisma.project.findUnique({
      where: {
        id: parseInt(projectId)
      }
    })
    if(project){
      res.status(200).json(project);
    }else{
      res.status(200).send("Aucun project");
    }
    prisma.$disconnect()
  }catch(err){
    console.log(err);
    res.json(err)
  }
}

export async function create(req: Request, res: Response){
  try{
    const {name, description} = req.body;
    const project = await prisma.project.create({
      data:{
        name: name,
        description: description,
        ownerId: 1
      }
    })
    if(project){
      res.status(200).json(project);
    }else{
      res.status(200).send("Aucun project");
    }
    prisma.$disconnect()
  }catch(err){
    console.log(err);
    res.json(err)
  }
}
