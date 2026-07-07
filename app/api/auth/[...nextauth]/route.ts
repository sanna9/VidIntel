import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "select_account", // make user to choose google account for diff user
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn ({user}){
      await connectDB();

      const existingUser = await User.findOne({email: user.email});
      if(!existingUser){
        const role = user.email === process.env.ADMIN_EMAIL ? "admin" : "user";
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          role: role,
        });
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };