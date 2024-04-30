import { FC } from "react";
import CheckBox from "./CheckBox";

const ExerciseSetting: FC = () => {
  return (
    <>
      <div className="flex justify-center items-center bg-cyan-200 min-h-screen">
        <form className="w-1/3">
          <div className="container mx-auto flex flex-col text-gray-500 bg-cyan-50 rounded-lg m-10">
            <div className="text-center text-2xl font-bold mb-10 mt-10">
              運動の設定
            </div>
            <div className="flex flex-row justify-center items-center mb-20">
              <div className="flex text-left text-xl font-bold mx-16">
                テスト
              </div>
              <div className="hover:cursor-pointer mx-16">
                <CheckBox />
              </div>
            </div>
            <div className="flex justify-center">
              <button className="font-bold w-1/4 focus:outline-none bg-cyan-200 hover:bg-cyan-300 p-3 rounded-lg mb-10 mx-10">
                戻る
              </button>
              <button className="font-bold w-1/4 focus:outline-none bg-yellow-400 hover:bg-yellow-500 p-3 rounded-lg mb-10 mx-10">
                決定
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ExerciseSetting;
