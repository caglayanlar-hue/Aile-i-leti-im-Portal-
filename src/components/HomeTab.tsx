import React, { useState } from 'react';
import { TabType } from '../types';
import { 
  Puzzle, 
  Coffee, 
  BookOpen, 
  MessageSquareHeart, 
  Quote, 
  RefreshCw, 
  Heart, 
  Sparkles, 
  Smile, 
  ArrowRight,
  Check
} from 'lucide-react';
import { BookCoverImage } from './BookCoverImage';

interface HomeTabProps {
  setActiveTab: (tab: TabType) => void;
  loveWords: string[];
  familyMembers: string[];
}

export const HomeTab: React.FC<HomeTabProps> = ({
  setActiveTab,
  loveWords,
  familyMembers,
}) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isChangingQuote, setIsChangingQuote] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleNextQuote = () => {
    setIsChangingQuote(true);
    setTimeout(() => {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * loveWords.length);
      } while (nextIndex === currentQuoteIndex && loveWords.length > 1);
      setCurrentQuoteIndex(nextIndex);
      setIsChangingQuote(false);
    }, 200);
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(loveWords[currentQuoteIndex]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Hero Section with Warm Ambient Lighting & Featured Book Cover */}
      <div className="bg-white rounded-3xl p-6 md:p-12 shadow-md border border-amber-100/90 relative overflow-hidden">
        {/* Warm colorful background lights */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-rose-200/35 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* Left Column: Text & Daily Love Quote */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-rose-100 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>Sıcak Bir Yuva, Güçlü Yarınlar</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-5.5xl font-bold font-serif text-slate-900 leading-tight">
              Ailemiz,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-600 to-orange-500 drop-shadow-2xs">
                En Büyük Hazinemiz
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-600 max-w-xl leading-relaxed">
              Modern zamanın koşturmacasına inat; birbirimize daha sıkı sarılmak, iletişimimizi güçlendirmek ve "biz olma" duygusunu sıcacık anılarla taçlandırmak için tasarlandı.
            </p>

            {/* Daily Quote Box with Warm Styling */}
            <div className="bg-gradient-to-r from-amber-50/90 via-orange-50/70 to-rose-50/80 rounded-2xl p-5 md:p-6 border border-amber-200/90 text-left shadow-xs relative">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
                  <Quote className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-xs uppercase tracking-wider font-extrabold text-amber-800">
                      Günün Sevgi Sözcüğü
                    </h3>
                    <button
                      onClick={handleCopyQuote}
                      className="text-xs text-amber-800/70 hover:text-amber-900 font-semibold flex items-center gap-1 transition-colors bg-white/70 px-2 py-0.5 rounded-md"
                      title="Sözcüğü Kopyala"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Kopyalandı</span>
                        </>
                      ) : (
                        <span>Kopyala</span>
                      )}
                    </button>
                  </div>
                  <p
                    className={`text-base md:text-lg font-semibold text-slate-800 italic transition-opacity duration-200 ${
                      isChangingQuote ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    "{loveWords[currentQuoteIndex]}"
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <button
                      onClick={handleNextQuote}
                      className="text-xs md:text-sm text-amber-700 hover:text-amber-900 font-bold flex items-center gap-1.5 transition-colors cursor-pointer group"
                    >
                      <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500 text-amber-600" />
                      <span>Farklı bir sevgi sözcüğü</span>
                    </button>
                    <span className="text-[11px] text-amber-700/80 font-medium">Bugün seslendirin</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Registered Family Members Bar */}
            {familyMembers.length > 0 && (
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
                <span className="text-xs text-slate-500 font-semibold">Bizim Ailemiz:</span>
                {familyMembers.map((member) => (
                  <span
                    key={member}
                    className="px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold text-amber-950 shadow-2xs flex items-center gap-1.5"
                  >
                    <Smile className="w-3.5 h-3.5 text-amber-600" />
                    {member}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Book Photo Showcase (Requested) */}
          <div className="w-full sm:w-auto shrink-0 flex flex-col items-center">
            <div className="relative group cursor-pointer" onClick={() => setActiveTab('book')}>
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400 via-rose-400 to-emerald-400 rounded-3xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative w-64 h-[380px] md:w-72 md:h-[420px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <BookCoverImage className="w-full h-full" showOverlayBadges={true} />
              </div>
            </div>
            <button
              onClick={() => setActiveTab('book')}
              className="mt-3 text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1.5 transition-colors bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-full border border-amber-200"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>Kitap Rehberi & Hikaye Soruları</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>
      </div>

      {/* Dashboard 4 Cards with Warmer, More Vibrant Colors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Activities */}
        <div
          onClick={() => setActiveTab('daily')}
          className="bg-white rounded-3xl p-7 card-shadow border border-orange-100 cursor-pointer flex flex-col h-full hover:border-orange-400 group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100/40 rounded-bl-full pointer-events-none"></div>
          <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-amber-500 text-white rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform shadow-md shadow-orange-500/20">
            <Puzzle className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-orange-600 transition-colors font-serif">
            Etkinlikler & Oyunlar
          </h3>
          <p className="text-slate-500 text-sm flex-grow leading-relaxed">
            Pazartesi'den Pazar'a her güne özel eğlenceli kurallı oyunlar ve aktivite sayacı.
          </p>
          <div className="mt-5 flex items-center text-xs font-bold text-orange-600 gap-1 group-hover:translate-x-1.5 transition-transform">
            <span>Oyunlara Başla</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Family Meeting */}
        <div
          onClick={() => setActiveTab('meeting')}
          className="bg-white rounded-3xl p-7 card-shadow border border-amber-100 cursor-pointer flex flex-col h-full hover:border-amber-400 group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100/40 rounded-bl-full pointer-events-none"></div>
          <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-500 text-white rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform shadow-md shadow-amber-500/20">
            <Coffee className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-amber-700 transition-colors font-serif">
            Aile Toplantısı
          </h3>
          <p className="text-slate-500 text-sm flex-grow leading-relaxed">
            Çay & kurabiye eşliğinde haftalık tutanak tutun ve tek tıkla Word belgesi olarak indirin.
          </p>
          <div className="mt-5 flex items-center text-xs font-bold text-amber-700 gap-1 group-hover:translate-x-1.5 transition-transform">
            <span>Toplantı Başlat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: Book Guide */}
        <div
          onClick={() => setActiveTab('book')}
          className="bg-white rounded-3xl p-7 card-shadow border border-purple-100 cursor-pointer flex flex-col h-full hover:border-purple-400 group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100/40 rounded-bl-full pointer-events-none"></div>
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform shadow-md shadow-purple-500/20">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-purple-600 transition-colors font-serif">
            Sohbet Rehberi
          </h3>
          <p className="text-slate-500 text-sm flex-grow leading-relaxed">
            "Aile Dediğin" hikayelerini okuyup rehber sorularla derin sohbetler başlatın.
          </p>
          <div className="mt-5 flex items-center text-xs font-bold text-purple-600 gap-1 group-hover:translate-x-1.5 transition-transform">
            <span>Rehberi İncele</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 4: Communication Corner */}
        <div
          onClick={() => setActiveTab('chat')}
          className="bg-white rounded-3xl p-7 card-shadow border border-blue-100 cursor-pointer flex flex-col h-full hover:border-blue-400 group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100/40 rounded-bl-full pointer-events-none"></div>
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform shadow-md shadow-blue-500/20">
            <MessageSquareHeart className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors font-serif">
            İletişim Köşesi
          </h3>
          <p className="text-slate-500 text-sm flex-grow leading-relaxed">
            Suçlamadan duyguları ifade eden "Ben Dili" Cümle Sihirbazı ile barışçıl iletişim kurun.
          </p>
          <div className="mt-5 flex items-center text-xs font-bold text-blue-600 gap-1 group-hover:translate-x-1.5 transition-transform">
            <span>Cümle Sihirbazı</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

      {/* Warm Golden Family Advice Banner */}
      <div className="bg-gradient-to-r from-amber-100/70 via-orange-100/60 to-rose-100/70 rounded-3xl p-8 border border-amber-200 shadow-xs">
        <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Günün Altın Hatırlatması</span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-900">
              "Bir aileyi güçlü kılan, kusursuzluk değil; sevgi ve dinleme gayretidir."
            </h3>
            <p className="text-sm md:text-base text-slate-700 max-w-2xl leading-relaxed">
              Akşam yemeklerinde telefonları bir kutuya koyup sadece birbirinizin gözlerine bakarak geçen 20 dakika, haftanın en huzurlu anına dönüşür.
            </p>
          </div>
          <div className="shrink-0 flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setActiveTab('meeting')}
              className="px-5 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl font-bold text-sm shadow-md shadow-amber-600/20 transition-all cursor-pointer"
            >
              Haftalık Toplantı Yap
            </button>
            <button
              onClick={() => setActiveTab('daily')}
              className="px-5 py-3 bg-white hover:bg-amber-50 text-slate-800 border border-amber-200 rounded-xl font-bold text-sm shadow-2xs transition-all cursor-pointer"
            >
              Günün Oyunu
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
