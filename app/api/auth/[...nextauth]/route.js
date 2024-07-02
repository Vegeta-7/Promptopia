import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ], 
    callbacks:{
        async session({ session }){
            const sessionUser = await User.findOne({email: session.user.email})
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }){
            try {
                //serverless route(lambda func that opens up only when it is called then making connection to db but we want to make connection to database so we go to utils)
                await connectToDB();
    
                // check if user exists
                const userExists = await User.findOne({email: profile.email});
                
                //if not create a new user and save it to db
                if(!userExists){
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(/\s+/g, "").toLowerCase(),   //regex removes all white space chars to ""
                        image: profile.picture
                    })
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }   
    
})

export { handler as GET, handler as POST }