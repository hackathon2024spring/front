import { FC, useContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import GlobalContext from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { BaseURL } from '../utilities/base_url';

dayjs.locale('ja');

const CalendarHeader: FC = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [exerciseDaysCount, setExerciseDaysCount] = useState<number>(0);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  const handleUserClick = () => {
    navigate('/user');
  };

  const handleSettingsClick = () => {
    navigate('/exercises_setting');
  };

  const handleSignoutClick = async () => {
    try {
      const response = await fetch(`${BaseURL()}/signout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        navigate('/login', { state: { message: 'サインアウトしました' } });
      } else {
        console.error('サインアウトに失敗しました');
      }
    } catch (error) {
      console.error('サインアウト中にエラーが発生しました', error);
    }
  };

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const year = dayjs().year();
        const month = monthIndex + 1;
        const response = await fetch(`${BaseURL()}/calendars/${year}/${month}`, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
          },
        });
        const result = await response.json();
        if (response.ok && result.status === 1) {
          const exerciseDays = result.data.filter((day: any) => day.exerciseDone).length;
          setExerciseDaysCount(exerciseDays);
        } else {
          console.error('データの取得に失敗しました:', result.detail);
        }
      } catch (error) {
        console.error('データの取得中にエラーが発生しました', error);
      }
    };

    fetchExerciseData();
  }, [monthIndex]);

  const currentMonthNameEnglish = dayjs(new Date(dayjs().year(), monthIndex)).locale('en').format('MMMM');
  const currentYearAndMonthJapanese = dayjs(new Date(dayjs().year(), monthIndex)).format('YYYY M月');
  const year = currentYearAndMonthJapanese.split(' ')[0];
  const monthJapanese = currentYearAndMonthJapanese.split(' ')[1];

  return (
    <div className="flex flex-col">
      <div className="absolute right-[150px]">
        <img src="/images/icon-account.png" alt="Account" className="w-10 h-10 mt-1" onClick={handleUserClick} />
      </div>
      <div className="absolute right-[100px]">
        <img src="/images/icon-settings.png" alt="Settings" className="w-8 h-8 mt-2" onClick={handleSettingsClick} />
      </div>
      <div className="absolute right-[45px]">
        <img src="/images/icon-signout.png" alt="Signout" className="w-10 h-10 mt-1" onClick={handleSignoutClick} />
      </div>
      <div className="flex justify-between items-center p-0">
        <div className="recommendation-container">
          <span className="activity-text">今月は✨{exerciseDaysCount}日✨運動しています！</span>
          <span className="activity-text">すごい！</span>
        </div>
      </div>

      <header className="flex items-center justify-between">
        <button onClick={handlePrevMonth} className="triangle-left" aria-label="前の月"></button>
        <div className="flex-grow flex justify-center items-center space-x-3">
          <span className="text-xl font-extrabold">{year}</span>
          <span className="text-4xl font-extrabold">{monthJapanese}</span>
          <span className="text-xl font-extrabold">{currentMonthNameEnglish}</span>
        </div>
        <button onClick={handleNextMonth} className="triangle-right" aria-label="次の月"></button>
      </header>
    </div>
  );
};

export default CalendarHeader;
