import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckBox from './CheckBox';
import { BaseURL } from '../utilities/base_url';

interface Exercise {
  exerciseId: number;
  exerciseName: string;
  selected: boolean;
}

const ExerciseSetting: FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`${BaseURL()}/exercises_setting`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        if (response.ok && result.status === 1) {
          setExercises(result.data.map((ex: Exercise) => {
            return {
              exerciseId: ex.exerciseId,
              exerciseName: ex.exerciseName,
              selected: ex.selected,
            };
          }));
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

    fetchExercises();
  }, []);

  const handleToggle = (id: number) => {
    setExercises(exs =>
      exs.map(ex =>
        ex.exerciseId === id ? { ...ex, selected: !ex.selected } : ex
      )
    );
  };

  const handleBack = () => {
    navigate('/calendar');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BaseURL()}/exercises_setting`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: exercises.map(ex => ({
            exerciseId: ex.exerciseId,
            selected: ex.selected,
          })),
        }),
      });
      const result = await response.json();
      if (!response.ok || result.status !== 1) {
        throw new Error('選択した設定の保存に失敗しました。');
      }
      navigate('/calendar');  // 成功後のリダイレクト
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex justify-center items-center bg-cyan-200 min-h-screen">
      <form className="w-1/3" onSubmit={handleSubmit}>
        <div className="container mx-auto flex flex-col text-gray-500 bg-cyan-50 rounded-lg m-10">
          <div className="text-center text-2xl font-bold mb-10 mt-10">
            運動の設定
          </div>
          {exercises.map((exercise) => (
            <div key={exercise.exerciseId} className="flex flex-row justify-between items-center mb-5" style={{ paddingLeft: '5rem', paddingRight: '5rem' }}>
              <div style={{ width: '60%', textAlign: 'left' }} className="text-xl font-bold">
                {exercise.exerciseName}
              </div>
              <div style={{ width: '40%', display: 'flex', justifyContent: 'center' }}>
                <CheckBox isChecked={exercise.selected} onChange={() => handleToggle(exercise.exerciseId)} />
              </div>
            </div>
          ))}
          <div className="flex justify-center">
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
  );
};

export default ExerciseSetting;
