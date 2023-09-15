import Header from "../components/header";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import ProfileForm from "../components/Forms/profileForm";

const Profile = ({ user, boards }) => {
  let isSession;
  user ? (isSession = true) : (isSession = false);
  return (
    <div className="bg-gray-100 dark:bg-slate-900 h-screen">
      <Header isSession={isSession} user={user} />
      <ProfileForm user={user} boards={boards} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const boards = await fetch(
    `${process.env.URL}/api/boards?userId=${session.user.id}`
  );
  const boardsData = await boards.json();

  return {
    props: {
      user: session.user,
      boards: boardsData,
    },
  };
}

export default Profile;
