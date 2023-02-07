import Header from "../components/header";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import ProfileForm from "../components/Forms/profileForm";

const Profile = ({ user }) => {
  let isSession;
  user ? (isSession = true) : (isSession = false);
  return (
    <div className="bg-black pb-60">
      <Header isSession={isSession} />
      <ProfileForm user={user} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  //fetch user
  const user = await fetch(`${process.env.URL}/api/users/${session.user.id}`);
  const userData = await user.json();

  return {
    props: {
      user: userData,
    },
  };
}

export default Profile;
