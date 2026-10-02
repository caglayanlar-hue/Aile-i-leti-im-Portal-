import React, { useState, useEffect } from 'react';
import { Story } from '../types';
import { 
  BookOpen, 
  Bookmark, 
  MessageSquare, 
  HelpCircle, 
  PenTool, 
  Save, 
  Sparkles, 
  Check, 
  BookMarked,
  User
} from 'lucide-react';
import { BookCoverImage } from './BookCoverImage';

interface BookGuideTabProps {
  stories: Story[];
}

export const BookGuideTab: React.FC<BookGuideTabProps> = ({ stories }) => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [familyNotes, setFamilyNotes] = useState<{ [key: string]: string }>({});
  const [noteSaved, setNoteSaved] = useState(false);

  // Load saved notes from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('aile_baglari_story_notes');
      if (stored) {
        setFamilyNotes(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const currentStory = stories[selectedStoryIndex] || stories[0];

  const handleNoteChange = (text: string) => {
    setFamilyNotes((prev) => ({
      ...prev,
      [currentStory.title]: text,
    }));
  };

  const handleSaveNote = () => {
    try {
      localStorage.setItem('aile_baglari_story_notes', JSON.stringify(familyNotes));
      setNoteSaved(true);
      setTimeout(() => setNoteSaved(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider mb-2 border border-purple-100">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Edebi & Manevi Değerler</span>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 flex items-center font-serif">
          "Aile Dediğin" Sohbet Rehberi
        </h2>
        <p className="text-slate-600 text-base md:text-lg mt-1">
          Hikayelerinizi kitabınızdan ailecek okuyun, ardından buradaki rehber sorularla derin ve samimi sohbetinizi başlatın.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Table of Contents Sidebar */}
        <div className="w-full lg:w-1/3 xl:w-1/4">
          <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden sticky top-24">
            
            <div className="bg-purple-50/80 px-6 py-4 border-b border-purple-100 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-purple-600" />
              <h3 className="font-serif text-lg font-bold text-purple-900">
                İçindekiler
              </h3>
            </div>

            <div className="p-3 space-y-1.5">
              {stories.map((story, index) => {
                const isSelected = index === selectedStoryIndex;
                return (
                  <button
                    key={story.title}
                    onClick={() => {
                      setSelectedStoryIndex(index);
                      setNoteSaved(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-2xl transition-all flex items-start gap-3 group ${
                      isSelected
                        ? 'bg-purple-100/70 text-purple-900 font-bold border border-purple-200 shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-100'
                    }`}
                  >
                    <BookMarked
                      className={`w-4 h-4 mt-1 shrink-0 ${
                        isSelected ? 'text-purple-600' : 'text-slate-300 group-hover:text-purple-400'
                      }`}
                    />
                    <div className="overflow-hidden">
                      <span className="block truncate text-sm font-medium">
                        {story.title}
                      </span>
                      <span className="text-[11px] font-normal text-slate-400 block truncate">
                        {story.author}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-4 bg-purple-50/40 border-t border-purple-100/60 text-xs text-purple-800">
              📖 <strong>İpucu:</strong> Sırayla her akşam bir hikaye seçip üzerine 15 dakika konuşabilirsiniz.
            </div>
          </div>
        </div>

        {/* Reading Area */}
        <div className="w-full lg:w-2/3 xl:w-3/4">
          <div className="book-page p-6 md:p-12 min-h-[600px] border border-slate-200/90 shadow-xs rounded-3xl relative space-y-8">
            
            {/* Story Header */}
            <div className="text-center pb-6 border-b border-slate-200/60">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-full text-xs font-semibold text-amber-800 mb-3 border border-amber-100">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>"Aile Dediğin" Kitabından</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mb-3 tracking-tight">
                {currentStory.title}
              </h2>

              <p className="text-slate-500 italic flex items-center justify-center gap-3 text-sm md:text-base">
                <span className="w-10 h-px bg-slate-200"></span>
                <span className="flex items-center gap-1.5 font-medium text-slate-600">
                  <User className="w-3.5 h-3.5 text-purple-500" />
                  {currentStory.author}
                </span>
                <span className="w-10 h-px bg-slate-200"></span>
              </p>
            </div>

            {/* Story Content / Call to Read */}
            {selectedStoryIndex === 0 ? (
              // Foreword text
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-serif text-base md:text-lg space-y-4">
                <div className="p-6 bg-purple-50/40 rounded-2xl border border-purple-100/80 mb-6 italic text-purple-900 text-center">
                  "Bu kitap sadece okunmak için değil, üzerinde konuşulmak ve bağlarımızı güçlendirmek için hazırlandı."
                </div>
                {currentStory.content.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            ) : (
              // Story Reading Box
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-amber-50/90 p-6 md:p-8 rounded-3xl border border-amber-200/80 text-center shadow-xs flex flex-col md:flex-row items-center gap-6 justify-center">
                  <div className="w-28 h-40 shrink-0 shadow-lg rounded-xl overflow-hidden border-2 border-white ring-2 ring-amber-200">
                    <BookCoverImage className="w-full h-full" showOverlayBadges={false} />
                  </div>
                  <div className="text-center md:text-left space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200/60 rounded-full text-xs font-bold text-amber-900 mb-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Kitaptan Okuma Zamanı</span>
                    </div>
                    <h3 className="text-amber-950 font-bold text-xl md:text-2xl font-serif">
                      "{currentStory.title}"
                    </h3>
                    <p className="text-amber-900 text-sm md:text-base max-w-lg leading-relaxed">
                      Lütfen bu hikayeyi <strong>Aile Dediğin</strong> kitabınızdan ailece sırayla veya sesli bir şekilde okuyun.
                    </p>
                    <p className="text-xs text-amber-700 italic pt-1">
                      Okuma bittiğinde aşağıdaki aile sohbeti gündemini ve sorularını birlikte inceleyiniz.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Chat Topic Box */}
            {currentStory.chatTopic && (
              <div className="bg-teal-50/80 p-6 md:p-7 rounded-2xl border border-teal-100 shadow-2xs">
                <h4 className="font-bold text-teal-900 flex items-center gap-2 mb-2 text-base md:text-lg font-serif">
                  <MessageSquare className="w-5 h-5 text-teal-600" />
                  <span>Aile Sohbeti Gündemi</span>
                </h4>
                <p className="text-teal-800 text-base leading-relaxed">
                  {currentStory.chatTopic}
                </p>
              </div>
            )}

            {/* Reflection Questions */}
            {currentStory.questions && currentStory.questions.length > 0 && (
              <div className="pt-6 border-t border-slate-200/70">
                <div className="bg-purple-50/50 rounded-2xl p-6 md:p-8 border border-purple-100/80">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-purple-950 font-serif">
                        Üzerine Düşünelim & Konuşalım
                      </h4>
                      <p className="text-xs md:text-sm text-purple-700">
                        Hikayeyi kitabınızdan okuduktan sonra bu soruları herkesin fikrini alarak tartışın.
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3.5">
                    {currentStory.questions.map((q, i) => (
                      <li
                        key={i}
                        className="flex items-start bg-white p-4 md:p-5 rounded-2xl border border-purple-100/60 shadow-2xs hover:border-purple-200 transition-all gap-4"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 text-sm font-bold mt-0.5">
                          {i + 1}
                        </div>
                        <span className="text-slate-800 font-medium text-base md:text-lg leading-snug">
                          {q}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Story Family Notes & Reflection */}
            <div className="pt-6 border-t border-slate-200/70">
              <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/70">
                <div className="flex items-center justify-between mb-3">
                  <label className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <PenTool className="w-4 h-4 text-slate-500" />
                    <span>Bu Hikayeden Bize Kalanlar (Aile Notumuz)</span>
                  </label>
                  {noteSaved && (
                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Kaydedildi
                    </span>
                  )}
                </div>
                <textarea
                  rows={3}
                  value={familyNotes[currentStory.title] || ''}
                  onChange={(e) => handleNoteChange(e.target.value)}
                  placeholder="Bu sohbetten çıkardığımız ortak ders veya hatırlamak istediğimiz güzel bir söz..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 bg-white outline-none text-slate-700 text-sm resize-none shadow-2xs"
                />
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={handleSaveNote}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Notu Kaydet</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
