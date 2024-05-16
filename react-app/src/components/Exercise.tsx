import { FC, useState } from 'react';

const Exercise: FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-center items-center bg-cyan-200 min-h-screen">
        <form className="w-1/3">
          <div className="container mx-auto flex flex-col text-gray-500 bg-cyan-50 rounded-lg m-10">
            <div className="text-center text-2xl font-bold mb-10 mt-10">
              4月3日の運動
            </div>
            <div className="flex justify-center">
              <div className={`w-2/3 flex flex-row justify-start rounded-full items-center mb-20 hover:cursor-pointer ${isActive ? 'bg-yellow-400' : 'bg-white'}`}>
                <div className="inline-flex items-center mr-10">
                  <label className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="customStyle"
                    onClick={() => setIsActive(!isActive)}>
                    <input type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="before:content[''] peer relative h-10 w-10 bg-white cursor-pointer appearance-none rounded-full border border-yellow-500 hover:scale-105"
                      id="customStyle" />
                    <span
                      className="absolute text-yellow-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor"
                        stroke="currentColor" stroke-width="1">
                        <path fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </span>
                  </label>
                </div>
                <div className="text-xl font-bold">
                  テスト
                </div>
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

export default Exercise;
