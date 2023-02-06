import NextAuth from "next-auth";
import { connectToDatabase } from "../../../lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { db } = await connectToDatabase();
        if (!credentials.register) {
          const user = await db.collection("users").findOne({
            username: credentials.username,
            password: credentials.password,
          });

          if (user) {
            return user;
          }
          return null;
        } else {
          const find = await db.collection("users").findOne({
            username: credentials.username,
          });
          if (find) {
            return null;
          }
          //Create the user in the DB
          const user = await db.collection("users").insertOne({
            username: credentials.username,
            password: credentials.password,
            profile: {
              firstName: credentials.firstName,
              lastName: credentials.lastName,
            },
          });
          return user.ops[0];
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user["username"] = token.user.username;
      return session;
    },
  },
  secret: process.env.SECRET // SECRET env variable 
};
export default NextAuth(authOptions);
