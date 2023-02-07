import RegisterForm from "../components/Forms/registerForm";
import Header from "../components/header";
import Footer from "../components/footer";

const Register = () => {
  return (
    <div className="bg-black pb-12">
      <Header />
      <RegisterForm />
      <Footer />
    </div>
  );
};

export default Register;
