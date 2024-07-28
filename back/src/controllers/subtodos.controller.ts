import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export async function indexSubtodos(req: Request, res: Response){
  try{
    const subtodos = await prisma.subtodo.findMany({
      include: {
        todo: true
      }
    })
    if(subtodos){
      res.status(200).json(subtodos);
    }else{
      res.status(200).send("Aucun subtodo");
    }
    prisma.$disconnect()
  }catch(err){
    console.log(err);
    res.json(err)
  }
}

export async function showSubtodo(req: Request, res: Response){
  try{
    const {subtodoId} = req.params
    const subtodo = await prisma.subtodo.findUnique({
      where: {
        id: parseInt(subtodoId)
      },
      include: {
        todo: true
      }
    })
    if(subtodo){
      res.status(200).json(subtodo);
    }else{
      res.status(200).send("Aucun subtodo");
    }
    prisma.$disconnect()
  }catch(err){
    console.log(err);
    res.json(err)
  }
}

export async function createSubtodo(req: Request, res: Response){
  try{
    const {name, description} = req.body;
    const {todoId} = req.params
    const subtodo = await prisma.subtodo.create({
      data:{
        title: name,
        description: description,
        todoId: parseInt(todoId)
      }
    })
    if(subtodo){
      res.status(200).json(subtodo);
    }else{
      res.status(200).send("Aucun subtodo");
    }
    prisma.$disconnect()
  }catch(err){
    console.log(err);
    res.json(err)
  }
}

export async function destroySubtodo(req: Request, res: Response){
  try{
    const {subtodoId} = req.params;
    const subtodo = await prisma.subtodo.delete({
      where:{
        id: parseInt(subtodoId)
      }
    })
    if(subtodo){
      res.status(200).json(subtodo);
    }else{
      res.status(404).send("Aucun subtodo");
    }
    prisma.$disconnect()
  }catch(err){
    console.log(err);
    res.json(err)
  }
}

export async function editSubtodo(req: Request, res: Response){
  try{
    const {subtodoId} = req.params;
    const {title, description, checked} = req.body;
    const subtodo = await prisma.subtodo.findUnique({
      where:{
        id: parseInt(subtodoId)
      }
    })
    if(subtodo){
      if(title && title !== subtodo.title){
        subtodo.title = title
      }
      if(description && description !== subtodo.description){
        subtodo.description = description;
      }
      if(checked && checked !== subtodo.checked){
        subtodo.checked = checked;
      }
      await prisma.subtodo.update({
        where: {
          id: parseInt(subtodoId)
        },
        data: subtodo
      })
      res.status(200).json(subtodo);
    }else{
      res.status(200).send("Aucun subtodo");
    }
    prisma.$disconnect()
  }catch(err){
    console.log(err);
    res.json(err)
  }
}
