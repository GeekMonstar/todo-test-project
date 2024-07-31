import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export async function indexProjects(req: Request, res: Response){
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

export async function showProject(req: Request, res: Response){
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

export async function createProject(req: Request, res: Response){
  try{
    const {name, description, ownerId} = req.body;
    const {authToken} = req.cookies;
    console.log(authToken);
    const project = await prisma.project.create({
      data:{
        name,
        description,
        ownerId
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

export async function destroyProject(req: Request, res: Response){
  try{
    const {projectId} = req.params;
    const project = await prisma.project.delete({
      where:{
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

export async function editProject(req: Request, res: Response){
  try{
    const {projectId} = req.params;
    const {name, description} = req.body;
    const project = await prisma.project.findUnique({
      where:{
        id: parseInt(projectId)
      }
    })
    if(project){
      if(name && name !== project.name){
        project.name = name
      }
      if(description && description !== project.description){
        project.description = description;
      }
      await prisma.project.update({
        where: {
          id: parseInt(projectId)
        },
        data: project
      })
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
