import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BaseURL } from "../utilities/base_url";
import { useForm, SubmitHandler } from "react-hook-form";
import TitleIcon from "../../public/chocolog.svg"; 

type LoginForm = {
  email: string;
  password: string;
}

const Login: FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const [message, setMessage] = useState("");
  const mailadressCheck = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const response = await fetch(`${BaseURL()}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok) {
        navigate("/calendar");
      } else {
        setMessage(responseData.detail || "ログインに失敗しました。");
      }
    } catch (error) {
      console.log(error);
      setMessage("通信エラーが発生しました。");
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-[#74ecff]">
      <form onSubmit={handleSubmit(onSubmit)} className="w-90% max-w-md space-y-8 rounded-2xl bg-[#74ecff]">
        <div className="text-center">
          <img
            src={TitleIcon}
            alt="Chocolog"
            width={250}
            height={250}
            style={{ color: "red", marginBottom: "0rem", display: 'block', marginLeft: 'auto', marginRight: 'auto' }} 
          />
        </div>
        <h1 className="text-3xl text-center text-customBrown font-semibold font-roundedMplus">
          ログイン
        </h1>
        <div>
          <label htmlFor="email" className="text-lg text-customBrown font-semibold font-roundedMplus">
            メールアドレス
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: mailadressCheck,
            })}
            className="w-full px-4 py-2 mt-2 rounded-xl text-lg focus:border-customBrown bg-customSkyblue focus:outline-none focus:ring-0"
            id="email"
            type="text"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-600">メールアドレスは必須です。</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="text-lg text-customBrown font-semibold font-roundedMplus">
            パスワード
          </label>
          <input
            {...register("password", { required: true })}
            className="w-full px-4 py-2 mt-2 rounded-xl text-lg bg-customSkyblue focus:outline-none focus:ring-0"
            id="password"
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-600">パスワードは必須です。</p>
          )}
        </div>
        <div className="text-center">
          <Link className="text-lg text-customBrown font-semibold font-roundedMplus hover:underline" to="/signup">
            新規登録はこちら
          </Link>
        </div>
        <div className="flex justify-center">
          <button
            className="w-[150px] py-3 bg-[#FFCC4D] rounded-xl text-lg text-stone-500 font-semibold font-roundedMplus hover:bg-[#ffa726] focus:outline-none focus:ring-2 focus:ring-[#FFCC4D] focus:ring-opacity-50"
            type="submit"
          >
            ログイン
          </button>
        </div>
        <div className="text-center font-bold mt-10 mb-10">
          {message && (
            <div> {message} </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
