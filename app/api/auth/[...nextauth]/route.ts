import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

const handler = NextAuth({

   providers:[
    GoogleProvider({
        clientId:process.env.GOOGLE_ID || "",
        clientSecret:process.env.GOOGLE_SECRET || ""
    }),
    GitHubProvider({
        clientId:process.env.GITHUB_ID || "",
        clientSecret:process.env.GITHUB_SECRET || ""
      })

   ],

   secret:process.env.NEXTAUTH_SECRET,
   callbacks:{

    async signIn({ user, account, profile }) {
        const useremail:string|undefined = user.email as string;
        const username:string|undefined = user.name as string;
        const existingUser = await prisma.user.findUnique({
          where: { email:useremail,name:username },
        });
  
        try {
            if (!existingUser) {
                if(useremail && username && user.image){
                    const newUser = await prisma.user.create({
                        data: {
                          email: useremail,
                          name: username,
                          image: user.image,
                        },
                      });
                      user.id = newUser.id;
                  } 
              }
              else{
                console.log("Exists user ",existingUser)
                user.id = existingUser.id;
              }
        }
         catch (error) {
            console.log("Next auth error ####################",error);
            return false;
            // throw  Error("loginerror");
        }
        return true;
      },

    jwt:({token,user})=>{
        // console.log(token);
        if (user) {
            token.userId = user.id; // Assign the user ID to the token
          }
          return token;
    },
    session:({session,token,user}:any)=>{
        if (session.user) {
            session.user.id = token.userId; // Assign the user ID to the session
          }
          return session;
    }
   },
   pages:{
    signIn:"/signin",
    error:"../../screens/autherror"
   }

})

export {handler as GET,handler as POST}


