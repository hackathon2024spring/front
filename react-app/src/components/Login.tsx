import { FC, useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BaseURL } from "../utilities/base_url";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TitleIcon from "../../public/chocolog.svg";

type LoginForm = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [message, setMessage] = useState(state?.message || "");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const mailadressCheck = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    setMessage(""); // 送信前にメッセージをクリア

    try {
      const response = await fetch(`${BaseURL()}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      const responseData = await response.json(); // レスポンスのJSONを解析
      if (response.ok) {
        navigate("/calendar", { state: { message: 'ログインしました' } });
      } else {
        setMessage(responseData.detail || "ログインに失敗しました。"); // 失敗メッセージを設定
      }
    } catch (error) {
      console.log(error);
      setMessage("通信エラーが発生しました。");
    }
  };

  useEffect(() => {
    if (state?.message) {
      setTimeout(() => {
        setMessage("");
      }, 3000); 
    }
  }, [state?.message]);

  return (
    <>
      {message && (
        <div className="flash-message h-16 bg-cyan-100 flex items-center justify-center text-2xl font-roundedMplus font-bold">
          {message}
        </div>
      )}
      <div className="flex justify-center min-h-screen bg-[#74ecff]">
        <div className="w-90% max-w-md rounded-2xl bg-[#74ecff]">
          <div className="text-center text-2xl font-bold">
            <img
              src={TitleIcon}
              alt="Chocolog"
              width={270}
              height={270}
              style={{ color: "red", marginBottom: "0rem", display: 'block', marginLeft: 'auto', marginRight: 'auto' }} // This centers the image
            />
          </div>
          <h1 className="text-2xl text-center mb-10 text-customBrown font-bold font-roundedMplus">
            ログイン
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <div>
              <label
                htmlFor="email"
                className="text-lg text-customBrown font-semibold font-roundedMplus"
              >
                メールアドレス
              </label>
              <input
                {...register("email", {
                  required: true,
                  pattern: mailadressCheck,
                })}
                className="w-full px-4 py-2 mt-2 border border-gray-200 rounded-xl text-lg focus:outline-none bg-customSkyblue"
                id="email"
                type="text"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-600">メールアドレスは必須です。</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-lg text-customBrown font-semibold font-roundedMplus"
              >
                パスワード
              </label>
              <input
                {...register("password", { required: true })}
                className="w-full px-4 py-2 mt-2 border border-gray-200 rounded-xl text-lg focus:outline-none bg-customSkyblue"
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
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
