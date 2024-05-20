import React, { FC, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { BaseURL } from '../utilities/base_url';

interface Exercise {
  exerciseId: number;
  exerciseName: string;
  done: boolean;
}

interface FetchedExercise {
  exerciseId: number;
  exerciseName: string;
  exerciseDone: boolean;
}

const Exercise: FC = () => {
  const [activeStates, setActiveStates] = useState<{ [key: number]: boolean }>({});
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const { date } = location.state || {};
  const formattedDate = date ? dayjs(date).format("YYYY年MM月DD日") : "日付が提供されていません";

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`${BaseURL()}/exercises/${date}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        if (response.ok && result.status === 1) {
          const exercisesData = result.data.map((ex: FetchedExercise) => ({
            exerciseId: ex.exerciseId,
            exerciseName: ex.exerciseName,
            done: ex.exerciseDone,
          }));
          setExercises(exercisesData);

          const initialStates = exercisesData.reduce((acc: { [key: number]: boolean }, exercise: Exercise) => {
            acc[exercise.exerciseId] = exercise.done;
            return acc;
          }, {});
          setActiveStates(initialStates);
        } else {
          throw new Error(result.detail || 'データの通信に失敗しました。');
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('Unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    if (date) {
      fetchExercises();
    } else {
      setLoading(false);
    }
  }, [date]);

  const handleToggleActive = (exerciseId: number) => {
    setActiveStates((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

  const handleBack = () => {
    navigate('/calendar');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const requestBody = {
      data: exercises.map((exercise) => ({
        exerciseId: exercise.exerciseId,
        done: !!activeStates[exercise.exerciseId]
      }))
    };

    try {
      const response = await fetch(`${BaseURL()}/exercises/${date}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
      const result = await response.json();
      if (response.ok && result.status === 1) {
        navigate('/calendar', { state: { message: '運動の状態が更新されました' } });
      } else {
        throw new Error(result.detail || '運動の状態更新に失敗しました');
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Unknown error occurred');
      }
    }
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
        <form className="w-full max-w-lg p-4" onSubmit={handleSubmit}> {/* max-w-lgで幅を固定 */}
          <div className="container mx-auto flex flex-col text-gray-500 bg-cyan-50 rounded-lg p-8">
            <div className="text-center text-2xl font-bold mb-10 mt-10">
              {formattedDate}の運動
            </div>
            {exercises.map((exercise) => (
              <div key={exercise.exerciseId} className="flex justify-center">
                <div
                  className={`w-full max-w-md flex flex-row justify-start rounded-full items-center mb-3 hover:cursor-pointer ${activeStates[exercise.exerciseId] ? 'bg-yellow-400' : 'bg-white'}`}
                  onClick={() => handleToggleActive(exercise.exerciseId)}
                >
                  <div className="inline-flex items-center mr-10">
                    <label className="relative flex items-center p-3 rounded-full cursor-pointer"
                      htmlFor={`customStyle-${exercise.exerciseId}`}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}>
                      <input type="checkbox"
                        checked={!!activeStates[exercise.exerciseId]}
                        onChange={() => handleToggleActive(exercise.exerciseId)}
                        className="before:content[''] peer relative h-10 w-10 bg-white cursor-pointer appearance-none rounded-full border border-yellow-500 hover:scale-105"
                        id={`customStyle-${exercise.exerciseId}`} />
                      <span
                        className="absolute text-yellow-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor"
                          stroke="currentColor" strokeWidth="1">
                          <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"></path>
                        </svg>
                      </span>
                    </label>
                  </div>
                  <div className="text-xl font-bold">
                    {exercise.exerciseName}
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-center mt-6">
              <button type="button" onClick={handleBack} className="font-bold w-1/4 focus:outline-none bg-cyan-200 hover:bg-cyan-300 p-3 rounded-lg mb-10 mx-10">
                戻る
              </button>
              <button type="submit" className="font-bold w-1/4 focus:outline-none bg-yellow-400 hover:bg-yellow-500 p-3 rounded-lg mb-10 mx-10">
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
