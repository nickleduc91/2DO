import NextAuth from "next-auth";
import connectToDatabase from "../../../lib/mongodb";
import User from "../../../models/User";
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
        await connectToDatabase();

        if (!credentials.register) {
          const user = await User.findOne({
            username: credentials.username,
          });
          if (!user) {
            return null;
          }
          const isMatch = await user.matchPassword(credentials.password);
          if (!isMatch) {
            return null;
          }
          return user;
        } else {
          const find = await User.findOne({
            username: credentials.username,
          });
          if (find) {
            return null;
          }
          //Create the user in the DB
          const createdUser = new User({
            username: credentials.username,
            password: credentials.password,
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            theme: "light",
          });

          await createdUser.save();
          return createdUser;
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
      session.user["id"] = token.user._id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // SECRET env variable
};
export default NextAuth(authOptions);
