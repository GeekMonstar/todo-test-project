import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

async function main(){
  const user = prisma.user.create({
    data:{
      fullname: 'Juan Vianney Nga Mbomo',
      nickname: 'GeekMonstar',
      email: 'contact@juanvianneynm.com'
    }
  })
  console.log(user)
}

main().then(async ()=>{
  await prisma.$disconnect()
}).catch(async (e)=>{
  console.log(e);
  await prisma.$disconnect();
})
