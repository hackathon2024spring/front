import { FC } from "react";
import { useNavigate, useRouteError } from "react-router-dom";

interface RouteError extends Error {
  status?: number;  // Assuming status codes might be available
  statusText?: string;
}

const ErrorPage: FC = () => {
  const error = useRouteError() as RouteError;
  const navigate = useNavigate(); // Hook to navigate
  console.error(error);

  const errorCode = error.status || 'Error';  // Default text if status code is not available

  const goBackToCalendar = () => navigate('/calendar'); // Function to navigate back to calendar

  return (
    <div className="flex flex-col justify-center items-center h-screen font-roundedMplus bg-[#9debf6] text-center">
      <div>
        <img src="/public/error.svg" alt="Error" className="mx-auto w-50 h-50" />
        <h1 className="text-4xl font-bold mt-10">{errorCode}</h1>
        <h2 className="text-4xl font-bold mt-2">{error.statusText || error.message || 'Not Found'}</h2>
        <p className="text-lg font-bold mt-8">Sorry, an unexpected error has occurred.</p>
        <button
          onClick={goBackToCalendar}
          className="text-2xl font-bold w-95% focus:outline-none bg-yellow-400 hover:bg-yellow-500 p-4 rounded-lg mt-10 mx-auto">
          Go Back to Calendar
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
