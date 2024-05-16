import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { BaseURL } from "../utilities/base_url";
import { SubmitHandler, useForm } from "react-hook-form";
import TitleIcon from "/chocolog.svg";

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
      <div className="flex justify-center items-center bg-[#74ecff] min-h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10" style={{ width: '380px' }}>
          <div className="flex flex-col text-customBrown font-roundedMplus">
            <div className="text-center text-2xl font-bold">
              <img
                src={TitleIcon}
                alt="Chocolog"
                width={270}
                height={270}
                style={{ color: "red", marginBottom: "0rem", display: 'block', marginLeft: 'auto', marginRight: 'auto' }} // This centers the image
              />
            </div>

            <div className="text-center text-2xl font-bold">
              新規登録
            </div>

            <label htmlFor="username" className="text-lg text-left font-semibold mt-2">
              ユーザー名
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              {...register("username", {
                required: "ユーザーネームは必須です",
                pattern: {
                  value: usernameCheck,
                  message:
                    "ユーザーネームは 半角大文字小文字 英数字と_.- 3文字〜16文字",
                },
              })}
              className="bg-cyan-50 text-lg mt-1 p-2.5 focus:outline-none rounded-xl"
            />
            {errors.username && (
              <div className="text-red-600">{errors.username.message}</div>
            )}

            <label htmlFor="email" className="text-lg text-left font-semibold mt-10">
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
              className="bg-cyan-50 text-lg mt-1 p-2.5 focus:outline-none rounded-xl"
            />
            {errors.email && (
              <div className="text-red-600">{errors.email.message}</div>
            )}


            <label htmlFor="password" className="text-lg text-left font-semibold mt-10">
              パスワード
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "パスワードは必須です",
              })}
              className="bg-cyan-50 text-lg mt-1 p-2.5 focus:outline-none rounded-xl"
            />
            {errors.password && (
              <div className="text-red-600">{errors.password.message}</div>
            )}


            <label htmlFor="passwordConfirm" className="text-lg text-left font-bold mt-10">
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
              className="bg-cyan-50 text-lg mt-1 p-2.5 focus:outline-none rounded-xl"
            />

            <div className="text-lg text-center font-bold mt-8 mb-8">
              <Link to="/login" className="hover:underline">
                ログインはこちら
              </Link>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/3 focus:outline-none bg-yellow-400 hover:bg-yellow-500 text-lg font-semibold p-3 rounded-xl">
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
