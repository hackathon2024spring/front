import { FC, useState, useEffect } from 'react';
import { BaseURL } from '../utilities/base_url';
import { Link, useNavigate } from 'react-router-dom';

interface User {
  username: string;
  email: string;
}

const User: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${BaseURL()}/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        if (response.ok && result.status === 1) {
          setUser({
            username: result.data.username,
            email: result.data.email,
          });
        } else {
          throw new Error(result.detail || 'データの通信に失敗しました。');
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleBack = () => {
    navigate('/calendar');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-[#9debf6] min-h-screen">
        <div className="text-center text-xl text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center bg-[#9debf6] min-h-screen">
        <div className="text-center text-xl text-red-700">{error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center bg-[#9debf6] min-h-screen">
        <form className="w-full max-w-xl p-4 h-3/4"> 
          <div className="container mx-auto flex flex-col text-gray-500 bg-cyan-50 rounded-lg p-16 h-full"> 
            <div className="text-center text-2xl font-bold mb-10 mt-10">
              ユーザー情報
            </div>
            <div className="flex justify-center">
              <div className="flex flex-col w-full mb-10">
                <div className="text-left font-bold mb-2">
                  ユーザー名
                </div>
                <div className="bg-gray-200 text-xl p-2.5 rounded-lg">
                  {user?.username}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex flex-col w-full mb-10">
                <div className="text-left font-bold mb-2">
                  メールアドレス
                </div>
                <div className="bg-gray-200 text-xl p-2.5 rounded-lg">
                  {user?.email}
                </div>
              </div>
            </div>
            <Link className="flex justify-center" to="/calendar">
              <button onClick={handleBack} className="font-bold w-1/4 focus:outline-none bg-cyan-200 hover:bg-cyan-300 p-3 rounded-lg mb-10">
                戻る
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default User;
