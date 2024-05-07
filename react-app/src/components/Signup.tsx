import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { BaseURL } from "../utilities/base_url";
import { SubmitHandler, useForm } from "react-hook-form";
import TitleIcon from "../../public/chocolog.svg";

type SignupForm = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const Signup: FC = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>();
  const [message, setMessage] = useState(""); // メッセージ表示用の状態

  const password = watch("password"); // 最初のパスワードフィールドの値を監視

  const mailadressCheck = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const usernameCheck = /^[a-zA-Z0-9_.-]{3,16}$/;

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    setMessage(""); // 送信前にメッセージをクリア

    try {
      const response = await fetch(`${BaseURL()}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password1: data.password, // 適切なフィールド名に調整
          password2: data.passwordConfirm, // 適切なフィールド名に調整
        }),
      });
      const responseData = await response.json(); // レスポンスのJSONを解析
      if (response.ok) {
        setMessage("ユーザー登録に成功しました。"); // 成功メッセージを設定
      } else {
        setMessage(responseData.detail || "登録に失敗しました。"); // 失敗メッセージを設定
      }
    } catch (error) {
      setMessage("通信エラーが発生しました。"); // エラーメッセージを設定
    }
  };
  return (
    <>
      <div className="flex justify-center items-center bg-cyan-200 min-h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          <div className="flex flex-col text-gray-500">
            <div className="flex justify-center items-end mb-10 text-center text-2xl font-bold">
              <img
                src={TitleIcon}
                alt=""
                width={70}
                height={70}
                style={{ color: "red" }}
              />
              <h1 className="text-7xl text-gray-500">Choco</h1>
              <h1 className="text-7xl text-gray-500">log</h1>
            </div>

            <div className="text-center text-2xl font-bold">
              新規登録
            </div>

            <label htmlFor="username" className="font-bold text-left mt-10">
              ユーザー名
            </label>
            <input
              id="username"
              type="text"
              placeholder="username"
              {...register("username", {
                required: "ユーザーネームは必須です",
                pattern: {
                  value: usernameCheck,
                  message:
                    "ユーザーネームは 半角大文字小文字 英数字と_.- 3文字〜16文字",
                },
              })}
              className="bg-cyan-50 text-xl mt-2 p-2.5 focus:outline-none rounded-lg"
            />
            {errors.username && (
              <div className="text-red-600">{errors.username.message}</div>
            )}

            <label htmlFor="email" className="text-left font-bold mt-10">
              メールアドレス
            </label>
            <input
              id="email"
              type="text"
              placeholder="Email"
              {...register("email", {
                required: "メールアドレスは必須です",
                pattern: {
                  value: mailadressCheck,
                  message: "メールアドレスを入力し直してください",
                },
              })}
              className="bg-cyan-50 text-xl mt-2 p-2.5 focus:outline-none rounded-lg"
            />
            {errors.email && (
              <div className="text-red-600">{errors.email.message}</div>
            )}


            <label htmlFor="password" className="text-left font-bold mt-10">
              パスワード
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "パスワードは必須です",
              })}
              className="bg-cyan-50 text-xl mt-2 p-2.5 focus:outline-none rounded-lg"
            />
            {errors.password && (
              <div className="text-red-600">{errors.password.message}</div>
            )}


            <label htmlFor="passwordConfirm" className="text-left font-bold mt-10">
              パスワード（確認用）
            </label>
            <input
              id="passwordConfirm"
              type="password"
              placeholder="Confirm Password"
              {...register("passwordConfirm", {
                validate: (value) =>
                  value === password || "パスワードが一致しません",
              })}
              className="bg-cyan-50 text-xl mt-2 p-2.5 focus:outline-none rounded-lg"
            />

            <div className="text-center font-bold mt-10 mb-10">
              <Link to="/login" className="hover:underline">
                ログインはこちら
              </Link>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/4 focus:outline-none bg-yellow-400 hover:bg-yellow-500 font-bold p-3 rounded-lg">
                {isSubmitting ? "登録中..." : "新規登録"}
              </button>
            </div>

            <div className="text-center font-bold mt-10 mb-10">
              {message && (
                <div> {message}  </div>
              )}
            </div>

          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
