import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      await connectDB();

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
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

    async session({ session }) {
      await connectDB();

      if (session.user?.email) {
        const dbUser = await User.findOne({ email: session.user.email });

        if (dbUser) {
          (session.user as any).id = dbUser._id.toString();
          (session.user as any).role = dbUser.role;
        }
      }

      return session;
    },
  },
};