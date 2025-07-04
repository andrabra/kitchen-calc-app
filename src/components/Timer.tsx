import React, { useState, useEffect, useRef } from 'react';
import { Button, InputNumber, Switch, notification } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, RedoOutlined, SyncOutlined } from '@ant-design/icons';

interface TimerProps {
  initialDuration?: number;
  showDurationInput?: boolean;
  playSound?: boolean;
  soundUrl?: string;
  theme?: 'light' | 'dark';
  notificationDuration?: number; // Длительность показа уведомления в секундах
}

const Timer: React.FC<TimerProps> = ({
  initialDuration = 300,
  showDurationInput = true,
  playSound = true,
  soundUrl,
  theme = 'light',
  notificationDuration = 5,
}) => {
  const [duration, setDuration] = useState<number>(initialDuration);
  const [timeLeft, setTimeLeft] = useState<number>(initialDuration);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCountdown, setIsCountdown] = useState<boolean>(true);
  const [autoRestart, setAutoRestart] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [api, contextHolder] = notification.useNotification();

  // Инициализация аудио
  useEffect(() => {
    audioRef.current = new Audio(soundUrl || 'https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [soundUrl]);

  const showCompletionNotification = () => {
    api.info({
      message: 'Таймер завершён',
      description: `Обратный отсчёт ${duration} секунд завершён.`,
      placement: 'bottomRight',
      duration: notificationDuration,
      className: theme === 'dark' ? 'dark-notification' : '',
    });
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = isCountdown ? prev - 1 : prev + 1;

          if (isCountdown && newTime <= 0) {
            window.clearInterval(timerRef.current as number);
            setIsRunning(false);
            
            // Показать уведомление и воспроизвести звук
            showCompletionNotification();
            // if (playSound && audioRef.current) {
            //   audioRef.current.currentTime = 0;
            //   audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            // }
            
            // Автозапуск если включен
            if (autoRestart) {
              setTimeout(() => {
                setTimeLeft(duration);
                setIsRunning(true);
              }, 1000);
            }
            
            return 0;
          }

          return newTime;
        });
      }, 1000);
    } else if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [isRunning, isCountdown, playSound, autoRestart, duration, api, notificationDuration]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };

  const toggleTimer = () => (isRunning ? pause() : start());

  const handleDurationChange = (value: number | null) => {
    if (value !== null) {
      setDuration(value);
      if (!isRunning) {
        setTimeLeft(value);
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const absSeconds = Math.abs(seconds);
    const h = Math.floor(absSeconds / 3600);
    const m = Math.floor((absSeconds % 3600) / 60);
    const s = absSeconds % 60;
    
    return [
      h.toString().padStart(2, '0'),
      m.toString().padStart(2, '0'),
      s.toString().padStart(2, '0')
    ].join(':');
  };

  // Классы для темной темы
  const bgClass = theme === 'dark' ? 'bg-zinc-800' : 'bg-white';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const borderClass = theme === 'dark' ? 'border-zinc-500' : 'border-gray-200';
  const inputBgClass = theme === 'dark' ? 'bg-zinc-700' : 'bg-white';
  const secondaryTextClass = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';

  return (
    <>
      {contextHolder}
      <div className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-md max-w-md mx-auto transition-colors ${bgClass} ${textClass} ${borderClass}`}>
        <div className="mb-4 text-center">
          <h1 className={`text-4xl font-bold ${timeLeft <= 10 && isCountdown ? 'text-red-500' : textClass}`}>
            {formatTime(timeLeft)}
          </h1>
          {!isCountdown && <p className={`mt-1 ${secondaryTextClass}`}>Прошедшее время</p>}
        </div>

        <div className="flex flex-col space-y-4 w-full">
          {showDurationInput && (
            <div className="flex items-center justify-between">
              <span className={textClass}>Длительность (sec):</span>
              <InputNumber 
                min={1} 
                max={86400} 
                value={duration} 
                onChange={handleDurationChange}
                disabled={isRunning}
                className={`w-32 ${inputBgClass}`}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className={textClass}>Обратный отсчет:</span>
            <Switch 
              checked={isCountdown} 
              onChange={setIsCountdown} 
              disabled={isRunning}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className={`flex items-center gap-2 ${textClass}`}>
              <SyncOutlined />
              Автозапуск:
            </span>
            <Switch 
              checked={autoRestart} 
              onChange={setAutoRestart} 
              disabled={isRunning}
            />
          </div>

          <div className="flex space-x-3 justify-center pt-4">
            <Button
              icon={isRunning ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
              onClick={toggleTimer}
              className="flex items-center"
            >
              {isRunning ? 'Пауза' : 'Старт'}
            </Button>
            <Button
              icon={<RedoOutlined />}
              onClick={reset}
              className={`flex items-center ${theme === 'dark' ? 'bg-zinc-700 text-white' : ''}`}
            >
              Сброс
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timer;