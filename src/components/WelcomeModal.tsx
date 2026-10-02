import React, { useState, useEffect } from 'react';
import { Quote, Plus, X, ArrowRight, Clock, Users, Heart, Sparkles } from 'lucide-react';
import { BookCoverImage } from './BookCoverImage';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  familyMembers: string[];
  onAddMember: (name: string) => void;
  onRemoveMember: (name: string) => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onClose,
  familyMembers,
  onAddMember,
  onRemoveMember,
}) => {
  const [nameInput, setNameInput] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleDateString('tr-TR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }) + ' - ' + now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
      setCurrentTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const handleAdd = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (nameInput.trim()) {
      onAddMember(nameInput.trim());
      setNameInput('');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm z-[100] flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-amber-100 my-auto animate-in fade-in zoom-in-95 duration-300">
        
        {/* Cover & Quote Side - Warm Sunset Pastel Glow */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-amber-50 via-rose-50/70 to-emerald-50/50 p-6 md:p-10 flex flex-col items-center justify-center text-center border-r border-amber-100 relative">
          <div className="absolute top-4 left-4 text-amber-300 opacity-40">
            <Quote className="w-16 h-16" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-200/60 relative z-10 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Ailece İlk Buluşma</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-800 mb-6 relative z-10 leading-snug">
            "Aile, insanın ruhunu ısıtan en eski ocaktır."
          </h2>

          {/* Book Cover Visual with Uploaded Photo (1.png) and Fallback */}
          <div className="relative w-60 h-[340px] md:w-64 md:h-[370px] shadow-2xl rounded-2xl overflow-hidden border-8 border-white mb-4 transform hover:scale-105 transition-transform duration-500 ring-4 ring-amber-200/50">
            <BookCoverImage className="w-full h-full" showOverlayBadges={true} />
          </div>

          <p className="text-xs text-slate-500 italic max-w-xs mt-1">
            "Aile Dediğin" kitabındaki sıcacık öyküler ve rehber sorularla ailenizi yeniden keşfedin.
          </p>
        </div>

        {/* Setup Side */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-white">
          <div className="flex items-center justify-center gap-2 text-teal-700 font-semibold text-sm md:text-base mb-6 border-b border-amber-100/60 pb-3 text-center bg-teal-50/60 py-2 rounded-2xl">
            <Clock className="w-4 h-4 text-teal-600" />
            <span>{currentTime || 'Yükleniyor...'}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 font-serif">
            Hoş Geldiniz
          </h1>
          <p className="text-slate-500 mb-6 text-sm md:text-base leading-relaxed">
            Portala giriş yapmak ve etkinlikleri başlatmak için lütfen aile üyelerinin isimlerini ekleyin.
          </p>

          <form onSubmit={handleAdd} className="space-y-4 mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Örn: Anne, Baba, Kerem, Zeynep..."
                className="flex-grow px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none bg-slate-50 focus:bg-white transition-all text-base shadow-2xs"
              />
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 active:scale-95 text-white px-5 rounded-xl font-bold transition-all shadow-md shadow-teal-600/20 flex items-center justify-center cursor-pointer"
                title="Aile Üyesi Ekle"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {familyMembers.length === 0 ? (
                <div className="p-4 rounded-xl border border-dashed border-amber-200 text-center text-slate-400 text-sm flex items-center justify-center gap-2 bg-amber-50/20">
                  <Users className="w-4 h-4 text-amber-500" />
                  <span>Henüz aile üyesi eklenmedi.</span>
                </div>
              ) : (
                familyMembers.map((name) => (
                  <div
                    key={name}
                    className="bg-amber-50/80 text-amber-950 px-4 py-2.5 rounded-xl flex justify-between items-center font-medium border border-amber-200/80 shadow-2xs animate-in fade-in"
                  >
                    <span className="flex items-center gap-2 font-semibold">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      {name}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveMember(name)}
                      className="text-amber-500 hover:text-red-500 transition-colors p-1"
                      title="Sil"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </form>

          <button
            onClick={onClose}
            disabled={familyMembers.length === 0}
            className={`w-full py-4 rounded-2xl font-bold text-base md:text-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
              familyMembers.length > 0
                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg shadow-teal-600/25 hover:scale-[1.01]'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Portala Giriş Yap</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {familyMembers.length === 0 && (
            <p className="text-xs text-slate-400 text-center mt-3">
              Devam etmek için lütfen en az 1 aile üyesi ismi ekleyiniz.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
