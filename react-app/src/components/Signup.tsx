import { FC } from "react";
import { Link } from 'react-router-dom';
const Signup: FC = () => {
  return (
    <>
      <div className="flex justify-center items-center bg-cyan-200 min-h-screen">
        <form className="items-end w-1/3">
          <div className="flex flex-col text-gray-500">
            <div className="text-center text-2xl font-bold mb-10">
              新規登録
            </div>
              <div className="font-bold text-left mb-2">
                ユーザー名
              </div>
              <input
                className="bg-cyan-50 text-xl mb-10 p-2.5 focus:outline-none rounded-lg"
                id="Name"
                type="text"
              />
              <div className="text-left font-bold mb-2">
                メールアドレス
              </div>
              <input
                className="bg-cyan-50 text-xl mb-10 p-2.5 focus:outline-none rounded-lg"
                id="email"
                type="text"
              />
              <div className="text-left font-bold mb-2">
                パスワード
              </div>
              <input
                className="bg-cyan-50 text-xl mb-10 p-2.5 focus:outline-none rounded-lg"
                id="password1"
                type="password"
              />
              <div className="text-left font-bold mb-2">
                パスワード（確認用）
              </div>
              <input
                className="bg-cyan-50 text-xl mb-10 p-2.5 focus:outline-none rounded-lg"
                id="password2"
                type="password"
              />
            <div className="text-center font-bold mb-10">
            <Link to="/login" className="hover:underline">
              ログインはこちら
            </Link>
            </div>
            <div className="flex justify-center">
              <button className="w-1/4 focus:outline-none bg-yellow-400 hover:bg-yellow-500 font-bold p-3 rounded-lg">
                新規登録
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
