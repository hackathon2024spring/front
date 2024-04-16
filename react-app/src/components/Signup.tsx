import { FC } from "react";
import { HelmetProvider } from "react-helmet-async";
const Signup: FC = () => {
  return (
    <>
      <HelmetProvider>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DotGothic16&family=Kanit:wght@900&family=Sawarabi+Mincho&display=swap"
          rel="stylesheet"
        />
      </HelmetProvider>
      <div className="relative overflow-hidden bg-[#caaca6] h-screen ">
        <div
          className="font-kanit text-10xl font-black bg-cover bg-clip-text text-transparent pt-0 pl-3 bg-[url('../public/brick-wall.jpg')]"
          style={{ color: "#944d74a9" }}
        >
          {/* tailwindcssにはtextとbgしか色設定がない。それ以外の色設定はstyleでカラーコードを直接入力するしかない */}
          SIGNUP
          <div className="absolute bg-white w-[65vw] h-[130vh] -top-32 right-0 rounded-l-full flex justify-center items-center ">
            <form className="font-dotgothic min-w-[65%] items-end">
              <div className="flex flex-col text-gray-500">
                <div className="flex justify-end items-center">
                  <h1 className=" text-5xl mb-20">SIGN UP</h1>
                </div>
                <input
                  className="font-thin text-xl tracking-widest mb-3.5 leading-10 border-b-2 border-b-transparent hover:border-b-[#caaca6] focus:outline-none"
                  id="Name"
                  type="text"
                  placeholder="Name"
                />
                <input
                  className="font-thin text-xl tracking-widest mb-3.5 leading-10 border-b-2 border-b-transparent hover:border-b-[#caaca6] focus:outline-none"
                  id="email"
                  type="text"
                  placeholder="Email"
                />
                <input
                  className="font-thin text-xl tracking-widest mb-3.5 leading-10 border-b-2 border-b-transparent hover:border-b-[#caaca6] focus:outline-none"
                  id="password1"
                  type="password"
                  placeholder="Password"
                />
                <input
                  className="font-thin text-xl tracking-widest mb-3.5 leading-10 border-b-2 border-b-transparent hover:border-b-[#caaca6] focus:outline-none"
                  id="password2"
                  type="password"
                  placeholder="Password Confirmation"
                />
                <div className="flex justify-end items-center">
                  <button className="bg-[#caaca6] hover:bg-[#c18a80] text-white rounded-full px-16 py-4 text-xl mb-3.5">
                    SIGN UP
                  </button>
                </div>
                <div className="flex justify-end items-center">
                  <a
                    href="/"
                    aria-label="Sign up"
                    title="Sign up"
                    className="text-xl"
                  >
                    Already have an account?
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
