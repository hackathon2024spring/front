import { FC } from "react";
import { useForm } from "react-hook-form";
import { HelmetProvider } from "react-helmet-async";

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = data => {
    // ここにログイン処理
    console.log(data);
  };

  return (
    <>
      <HelmetProvider>{/* Helmet content... */}</HelmetProvider>
      <div className="flex justify-center items-center min-h-screen bg-[#9debf6]">
        <div className="w-full max-w-md p-8 rounded-2xl bg-[#9debf6]">
          <h1 className="text-3xl text-center mb-10 text-customBrown font-semibold font-roundedMplus">
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
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                className="w-full px-4 py-2 mt-2 border border-gray-200 rounded-xl text-lg focus:ring-customBrown focus:border-customBrown bg-customSkyblue"
                id="email"
                type="text"
              />
              {errors.email && <p className="text-red-600">メールアドレスは必須です。</p>}
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
                className="w-full px-4 py-2 mt-2 border border-gray-200 rounded-xl text-lg focus:ring-customBrown focus:border-customBrown bg-customSkyblue"
                id="password"
                type="password"
              />
              {errors.password && <p className="text-red-600">パスワードは必須です。</p>}
            </div>
            <div className="text-center">
              <a
                href="/register"
                className="text-lg text-customBrown font-semibold font-roundedMplus hover:underline"
              >
                新規登録はこちら
              </a>
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