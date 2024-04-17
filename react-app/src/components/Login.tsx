import { FC } from "react";
import { HelmetProvider } from "react-helmet-async";
const Login: FC = () => {
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
      <div className="relative overflow-hidden bg-[#4da49c] h-screen ">
        <div className="font-kanit text-9xl font-black bg-cover bg-clip-text text-transparent pt-5 pl-3 bg-[url('../public/green.jpg')]">
          LOGIN
          <div className="absolute bg-white w-[65vw] h-[130vh] -top-32 right-0 rounded-l-full flex justify-center items-center ">
            <form className="font-dotgothic min-w-[65%] items-end">
              <div className="flex flex-col text-gray-500">
                <div className="flex justify-end items-center">
                  <h1 className=" text-5xl mb-20">LOG IN</h1>
                </div>
                <input
                  className="font-thin text-xl tracking-widest mb-3.5 leading-10 border-b-2 border-b-transparent hover:border-b-[#4da49c] focus:outline-none"
                  id="email"
                  type="text"
                  placeholder="Email"
                />
                <input
                  className="font-thin text-xl tracking-widest mb-3.5 leading-10 border-b-2 border-b-transparent hover:border-b-[#4da49c] focus:outline-none"
                  id="password"
                  type="password"
                  placeholder="Password"
                />
                <div className="flex justify-end items-center">
                  <button className="bg-[#4da49c] hover:bg-[#3a7c76] text-white rounded-full px-16 py-4 text-xl mb-3.5">
                    LOG IN
                  </button>
                </div>
                <div className="flex justify-end items-center">
                  <a
                    href="/"
                    aria-label="Sign up"
                    title="Sign up"
                    className="text-xl"
                  >
                    Not registered yet?
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

export default Login;

{
  /* <input
    className="text-xl tracking-widest mb-3.5 leading-10"
    className="text-xl tracking-widest mb-3.5 leading-10 border-b-2 border-b-transparent hover:border-b-[#4da49c] focus:outline-none"
    id="email"
    type="text"
    placeholder="Email"
  /> */
}
