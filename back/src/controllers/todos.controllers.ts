import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export async function indexTodos(req: Request, res: Response){
  try{
    const todos = await prisma.todo.findMany({
      include: {
        project: true
      }
    })
    if(todos){
      res.status(200).json(todos);
    }else{
      res.status(200).send("Aucun todo");
    }
    prisma.$disconnect()
  }catch(err){
    console.log(err);
    res.json(err)
  }
}

export async function showTodo(req: Request, res: Response){
  try{
    const {todoId} = req.params
    const todo = await prisma.todo.findUnique({
      where: {
        id: parseInt(todoId)
      },
      include: {
        project: true
      }
    })
    if(todo){
      res.status(200).json(todo);
    }else{
      res.status(200).send("Aucun todo");
    }
    prisma.$disconnect()
  }catch(err){
    console.log(err);
    res.json(err)
  }
}

export async function createTodo(req: Request, res: Response){
  try{
    const {title, description} = req.body;
    const {projectId} = req.params
    console.log(req.params);
    const todo = await prisma.todo.create({
      data:{
        title: title,
        description: description,
        projectId: parseInt(projectId)
      }
    })
    if(todo){
      res.status(200).json(todo);
    }else{
      res.status(200).send("Aucun todo");
    }
    prisma.$disconnect()
  }catch(err){
    console.log(err);
    res.json(err)
  }
}

export async function destroyTodo(req: Request, res: Response){
  try{
    const {todoId} = req.params;
    const todo = await prisma.todo.delete({
      where:{
        id: parseInt(todoId)
      }
    })
    if(todo){
      res.status(200).json(todo);
    }else{
      res.status(404).send("Aucun todo");
    }
    prisma.$disconnect()
  }catch(err){
    console.log(err);
    res.json(err)
  }
}

export async function editTodo(req: Request, res: Response){
  try{
    const {todoId} = req.params;
    const {title, description, checked} = req.body;
    const todo = await prisma.todo.findUnique({
      where:{
        id: parseInt(todoId)
      }
    })
    if(todo){
      if(title && title !== todo.title){
        todo.title = title
      }
      if(description && description !== todo.description){
        todo.description = description;
      }
      if(checked && checked !== todo.checked){
        todo.checked = checked;
      }
      await prisma.todo.update({
        where: {
          id: parseInt(todoId)
        },
        data: todo
      })
      res.status(200).json(todo);
    }else{
      res.status(200).send("Aucun todo");
    }
    prisma.$disconnect()
  }catch(err){
    console.log(err);
    res.json(err)
  }
}
