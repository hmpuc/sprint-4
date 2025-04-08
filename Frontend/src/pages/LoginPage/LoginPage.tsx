import React from "react";
import WaveBackground from "./components/WaveBackground";
import { DiMagento } from "react-icons/di";
import { useNavigate } from "react-router-dom";
import useUserAPI from "../../hooks/useUserAPI";
import TextFields from "./components/TextFields";

export interface LoginPageProps {
  login: (token: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ login }) => {
  const nav = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { postLogin } = useUserAPI();

  const handleLogin = async () => {
    const data = await postLogin({ email, password });
    if (!data) return;
    login(data.token);
    nav("/user-list");
  };

  return (
    <div className="flex lg:justify-end justify-center items-center w-screen h-screen bg-[linear-gradient(178.05deg,#065D2F_1.65%,#DBEDD6_75.83%)] relative overflow-hidden">
      <div
        className="bg-base-100 p-12 lg:h-screen h-fit lg:w-1/2 w-3/4 relative z-10 rounded-2xl
      flex flex-col justify-center items-center "
      >
        <DiMagento className=" w-full h-full max-w-64 max-h-64 ml-auto mr-auto fill-primary" />
        <h1 className="font-semibold text-4xl mb-8  text-primary">SafeCo™</h1>
        <TextFields
          email={email}
          password={password}
          onChangeEmail={setEmail}
          onChangePassword={setPassword}
        />
        <button
          onClick={handleLogin}
          className="btn btn-primary w-full max-w-md mt-12"
        >
          Login
        </button>
      </div>
      <WaveBackground />
    </div>
  );
};

export default LoginPage;
