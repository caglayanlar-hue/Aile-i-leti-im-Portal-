import React, { useState, useEffect } from 'react';
import { Activity } from '../types';
import { 
  Puzzle, 
  Dices, 
  CheckCircle2, 
  Lightbulb, 
  HeartHandshake, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Award, 
  PartyPopper 
} from 'lucide-react';

interface DailyActivitiesTabProps {
  activities: Activity[];
}

export const DailyActivitiesTab: React.FC<DailyActivitiesTabProps> = ({ activities }) => {
  // Determine today's index: 0 is Sunday, 1 Monday... In Turkish plan Monday is 0
  const getTodayIndex = () => {
    const day = new Date().getDay();
    return day === 0 ? 6 : day - 1;
  };

  const [currentIndex, setCurrentIndex] = useState(getTodayIndex());
  const [completedList, setCompletedList] = useState<number[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  // Timer states
  const [timerSeconds, setTimerSeconds] = useState(15 * 60);
  const [timerActive, setTimerActive] = useState(false);

  const currentActivity = activities[currentIndex] || activities[0];

  useEffect(() => {
    // When activity changes, default timer to activity duration if parsable
    const match = currentActivity.duration.match(/\d+/);
    if (match) {
      const mins = parseInt(match[0], 10);
      setTimerSeconds(mins * 60);
      setTimerActive(false);
    }
  }, [currentIndex, currentActivity]);

  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerActive) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const handleRandom = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * activities.length);
    } while (nextIndex === currentIndex && activities.length > 1);
    setCurrentIndex(nextIndex);
    setShowCelebration(false);
  };

  const handleComplete = () => {
    if (!completedList.includes(currentIndex)) {
      setCompletedList([...completedList, currentIndex]);
    }
    setShowCelebration(true);
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isCompleted = completedList.includes(currentIndex);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-wider mb-2 border border-orange-100">
          <Puzzle className="w-3.5 h-3.5" />
          <span>Birlikte Vakit Geçirme Sanatı</span>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 flex items-center font-serif">
          Etkinlikler ve Oyunlar
        </h2>
        <p className="text-slate-600 text-base md:text-lg mt-1">
          Birlikte gülmek, öğrenmek ve aramızdaki bağı pekiştirmek için eğlenceli ve öğretici haftalık aktiviteler.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Activity View (2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden">
            
            {/* Card Header Bar */}
            <div className="bg-orange-50/70 px-6 py-4 border-b border-orange-100 flex flex-wrap justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-orange-950 text-base">
                  {currentActivity.day} Etkinliği
                </span>
                {currentIndex === getTodayIndex() && (
                  <span className="px-2.5 py-0.5 bg-orange-500 text-white rounded-full text-[10px] font-bold uppercase tracking-wide">
                    Bugün
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-white text-orange-600 rounded-full text-xs font-bold uppercase tracking-wide shadow-2xs border border-orange-100">
                  {currentActivity.category}
                </span>
                <span className="px-3 py-1 bg-white text-slate-600 rounded-full text-xs font-semibold shadow-2xs border border-slate-200/60">
                  {currentActivity.duration}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-8 space-y-6">
              
              {/* Title & Desc */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-100/70 text-orange-600 flex items-center justify-center shrink-0 text-2xl shadow-2xs">
                  <Puzzle className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2 font-serif">
                    {currentActivity.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-base">
                    {currentActivity.desc}
                  </p>
                </div>
              </div>

              {/* Rules List */}
              <div className="bg-slate-50 rounded-2xl p-5 md:p-6 border border-slate-100">
                <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3 text-base">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <span>Nasıl Oynanır & Kurallar Neler?</span>
                </h4>
                <ul className="space-y-2.5 pl-2">
                  {currentActivity.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-600 text-sm md:text-base">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefit Box */}
              <div className="flex items-start gap-3 text-sm text-indigo-800 bg-indigo-50/80 p-4 rounded-xl border border-indigo-100/80">
                <HeartHandshake className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-indigo-950 font-semibold mb-0.5">Neden Faydalı?</strong>
                  <span className="leading-relaxed">{currentActivity.benefit}</span>
                </div>
              </div>

              {/* Countdown Timer Widget for Activity */}
              <div className="bg-gradient-to-r from-orange-50/40 via-amber-50/40 to-slate-50 p-4 rounded-2xl border border-orange-100/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-slate-500 block">
                      Aktivite Zamanlayıcısı
                    </span>
                    <span className="font-mono text-2xl font-bold text-slate-800">
                      {formatTimer(timerSeconds)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTimerActive(!timerActive)}
                    className={`px-4 py-2 rounded-xl font-bold text-xs md:text-sm flex items-center gap-1.5 transition-all shadow-xs ${
                      timerActive
                        ? 'bg-amber-500 text-white'
                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                    }`}
                  >
                    {timerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{timerActive ? 'Duraklat' : 'Süreyi Başlat'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setTimerActive(false);
                      const match = currentActivity.duration.match(/\d+/);
                      setTimerSeconds((match ? parseInt(match[0], 10) : 15) * 60);
                    }}
                    className="p-2 text-slate-500 hover:text-slate-700 hover:bg-white rounded-xl border border-slate-200 transition-colors"
                    title="Süreyi Sıfırla"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="bg-slate-50/80 px-6 py-4 border-t border-slate-100 flex flex-wrap justify-between items-center gap-3">
              <button
                onClick={handleRandom}
                className="text-slate-600 hover:text-orange-600 font-semibold text-sm transition-colors flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white border border-transparent hover:border-slate-200"
              >
                <Dices className="w-5 h-5 text-orange-500" />
                <span>Rastgele Bir Oyun Seç</span>
              </button>

              <button
                onClick={handleComplete}
                disabled={isCompleted}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-sm ${
                  isCompleted
                    ? 'bg-emerald-100 text-emerald-800 cursor-default'
                    : 'bg-orange-500 hover:bg-orange-600 active:scale-95 text-white shadow-orange-500/20'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCompleted ? 'Bugün Tamamlandı ✓' : 'Tamamladık!'}</span>
              </button>
            </div>
          </div>

          {/* Celebration Box */}
          {showCelebration && (
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 text-emerald-900 p-6 md:p-8 rounded-3xl border border-emerald-200 text-center animate-in zoom-in-95 duration-300 shadow-sm relative overflow-hidden">
              <div className="flex justify-center gap-3 text-4xl mb-3">
                <PartyPopper className="w-10 h-10 text-emerald-600 animate-bounce" />
                <Sparkles className="w-10 h-10 text-amber-500" />
                <Award className="w-10 h-10 text-teal-600" />
              </div>
              <h4 className="text-2xl font-bold font-serif mb-2 text-emerald-950">
                Harika İş Çıkardınız!
              </h4>
              <p className="text-emerald-800 max-w-lg mx-auto text-base">
                Birlikte geçirdiğiniz bu değerli anlar, ailenizin temelini daha da sağlamlaştırıyor. Hatıralar biriktirmeye devam edin!
              </p>
            </div>
          )}
        </div>

        {/* Weekly Activity Sidebar (1 Column) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden flex flex-col h-full">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 font-serif">Haftalık Etkinlik Planı</h3>
              <span className="text-xs font-semibold text-slate-400">7 Gün</span>
            </div>

            <div className="p-3 flex-grow overflow-y-auto max-h-[600px] space-y-2">
              {activities.map((act, idx) => {
                const isSelected = idx === currentIndex;
                const isActDone = completedList.includes(idx);
                const isToday = idx === getTodayIndex();

                return (
                  <div
                    key={act.day}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowCelebration(false);
                    }}
                    className={`p-3.5 rounded-2xl cursor-pointer transition-all border flex items-center gap-3 ${
                      isSelected
                        ? 'bg-orange-50/90 border-orange-200 shadow-2xs'
                        : 'hover:bg-slate-50 border-transparent border-b-slate-100'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 flex-col font-bold ${
                        isSelected
                          ? 'bg-orange-500 text-white shadow-2xs'
                          : isActDone
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <span className="text-[11px] uppercase tracking-tight">
                        {act.day.substring(0, 3)}
                      </span>
                      {isActDone && <CheckCircle2 className="w-3 h-3 -mt-0.5" />}
                    </div>

                    <div className="overflow-hidden flex-grow">
                      <div className="flex items-center gap-1.5">
                        <h4
                          className={`font-semibold text-sm truncate ${
                            isSelected ? 'text-orange-950 font-bold' : 'text-slate-800'
                          }`}
                        >
                          {act.title}
                        </h4>
                        {isToday && (
                          <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-bold rounded">
                            Bugün
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span>{act.category}</span>
                        <span>•</span>
                        <span>{act.duration}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-slate-50/60 border-t border-slate-100 text-xs text-slate-500 text-center">
              💡 Her gün en az bir aktiviteyi tamamlamaya gayret edin.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
