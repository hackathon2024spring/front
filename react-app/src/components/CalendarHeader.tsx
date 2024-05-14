import { FC, useContext } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import GlobalContext from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

dayjs.locale('ja');

const CalendarHeader: FC = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const navigate = useNavigate(); // Create a navigate function using the useNavigate hook

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  const handleReset = () => {
    setMonthIndex(dayjs().month());
  };

  const handleUserClick = () => {
    navigate('/user'); // Function to navigate to settings page
  };

  const handleSettingsClick = () => {
    navigate('/exercises_setting'); // Function to navigate to settings page
  };

  const currentMonthNameEnglish = dayjs(new Date(dayjs().year(), monthIndex)).locale('en').format('MMMM');
  const currentYearAndMonthJapanese = dayjs(new Date(dayjs().year(), monthIndex)).format('YYYY M月');
  const year = currentYearAndMonthJapanese.split(' ')[0];
  const monthJapanese = currentYearAndMonthJapanese.split(' ')[1];

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center p-0">
        <img src="/images/icon-home.png" alt="Home" className="icon-home" />
        <div className="recommendation-container">
          <span className="recommendation-text">今日のおすすめ</span>
          <span className="activity-text">✨足踏み運動をする✨</span>
        </div>
        <div className="flex">
          <img src="/images/icon-account.png" alt="Account" className="icon-account mt-5 mx-4 w-14 h-14" onClick={handleUserClick} />
          {/* Add onClick handler to settings icon */}
          <img src="/images/icon-settings.png" alt="Settings" className="icon-settings mt-5 w-12 h-12" onClick={handleSettingsClick} />
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
