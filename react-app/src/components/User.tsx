import { FC } from "react";
const User: FC = () => {
  return (
    <>
      <div className="flex justify-center items-center bg-cyan-200 min-h-screen">
        <form className="w-1/3">
          <div className="container mx-auto flex flex-col text-gray-500 bg-cyan-50 rounded-lg m-10">
            <div className="text-center text-2xl font-bold mb-10 mt-10">
              ユーザー情報
            </div>
            <div className="flex justify-center">
              <div className="flex flex-col w-1/2 mb-10">
                <div className="text-left font-bold mb-2">
                  ユーザー名
                </div>
                <div className="bg-gray-200 text-xl p-2.5 rounded-lg">
                  〇〇
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex flex-col w-1/2 mb-10">
                <div className="text-left font-bold mb-2">
                  メールアドレス
                </div>
                <div className="bg-gray-200 text-xl p-2.5 rounded-lg">
                  〇〇
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="font-bold w-1/4 focus:outline-none bg-cyan-200 hover:bg-cyan-300 p-3 rounded-lg mb-10">
                戻る
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default User;