import React, { useState } from 'react';
import { 
  MessageSquareHeart, 
  XCircle, 
  CheckCircle, 
  Wand2, 
  Copy, 
  Check, 
  HelpCircle, 
  ArrowRight, 
  Sparkles,
  Heart
} from 'lucide-react';

export const CommunicationTab: React.FC = () => {
  const [behavior, setBehavior] = useState('');
  const [feeling, setFeeling] = useState('');
  const [request, setRequest] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!behavior.trim() || !feeling.trim() || !request.trim()) {
      setErrorMsg('Lütfen davranış, duygu ve istek alanlarının tümünü doldurunuz.');
      return;
    }
    setErrorMsg('');
    const cleanBehavior = behavior.trim().toLowerCase();
    const sentence = `Sen ${cleanBehavior}, ben ${feeling}. ${request.trim()}`;
    setGeneratedMessage(sentence);
  };

  const handleCopy = () => {
    if (generatedMessage) {
      navigator.clipboard.writeText(generatedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const practiceExamples = [
    {
      scenario: 'Dağınık Oda',
      youLanguage: 'Odan hep darmadağınık, amma pasaklı birisin!',
      iLanguage: 'Sen odanı toplamayı ertelediğinde, ben evin düzeni konusunda kaygılanıyorum ve yoruluyorum. Lütfen okuldan gelince kıyafetlerini dolabına yerleştirir misin?'
    },
    {
      scenario: 'Telefonla Meşgul Olma',
      youLanguage: 'Sabahtan akşama kadar telefona bakıyorsun, beni hiç umursamıyorsun!',
      iLanguage: 'Sen ben konuşurken ekrana baktığında, ben kendimi değersiz ve yalnız hissediyorum. Lütfen akşam yemeği boyunca telefonunu masadan kaldırabilir misin?'
    },
    {
      scenario: 'Gecikme & Haber Vermeme',
      youLanguage: 'Yine geç kaldın! Hiçbir zaman sözünde durmuyorsun!',
      iLanguage: 'Sen kararlaştırdığımız saatten geç gelip haber vermediğinde, ben başına bir şey geldiğini düşünüp endişeleniyorum. Lütfen gecikeceğin zaman bana kısa bir mesaj atar mısın?'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-100">
          <MessageSquareHeart className="w-3.5 h-3.5" />
          <span>Barışçıl & Empatik İletişim</span>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 flex items-center font-serif">
          İletişim Köşesi
        </h2>
        <p className="text-slate-600 text-base md:text-lg mt-1 max-w-4xl">
          Aile içinde anlaşmazlıklar gayet doğaldır. Asıl önemli olan, sorunları kişiliği suçlamadan ("Sen Dili") değil, duygularımızı ve ihtiyaçlarımızı paylaşarak ("Ben Dili") ifade edebilmektir.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Theory & Comparison Side */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-lg font-serif">
                Sen Dili vs. Ben Dili Karşılaştırması
              </h3>
              <span className="text-xs text-slate-500 font-medium">Temel Kural</span>
            </div>

            <div className="p-6 md:p-8 space-y-5">
              
              {/* Sen Dili */}
              <div className="relative bg-rose-50/70 rounded-2xl p-6 border border-rose-100 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-rose-500" />
                    <h4 className="font-bold text-rose-900 text-base">Sen Dili (Suçlayıcı & Yıkıcı)</h4>
                  </div>
                  <span className="text-[10px] bg-rose-200/70 text-rose-800 px-2 py-0.5 rounded-full font-bold uppercase">
                    Kaçının
                  </span>
                </div>
                <p className="text-rose-900/80 text-xs md:text-sm mb-3">
                  Davranışa değil kişinin kişiliğine ve karakterine saldırır; karşı tarafta savunma veya karşı saldırı mekanizmasını tetikler.
                </p>
                <div className="bg-white px-4 py-3 rounded-xl text-slate-700 italic border border-rose-100/60 shadow-2xs text-sm">
                  "Beni hiç dinlemiyorsun, sürekli kendi bildiğini okuyorsun! Çok bencilsin."
                </div>
              </div>

              {/* Ben Dili */}
              <div className="relative bg-emerald-50/70 rounded-2xl p-6 border border-emerald-100 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-bold text-emerald-950 text-base">Ben Dili (Empatik & Çözüm Odaklı)</h4>
                  </div>
                  <span className="text-[10px] bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded-full font-bold uppercase">
                    Tavsiye
                  </span>
                </div>
                <p className="text-emerald-900/80 text-xs md:text-sm mb-3">
                  Somut davranışı tanımlar, o davranışın sizde oluşturduğu duyguyu açıklar ve net, saygılı bir talepte bulunur.
                </p>
                <div className="bg-white px-4 py-3 rounded-xl text-slate-700 italic border border-emerald-100/60 shadow-2xs text-sm font-medium">
                  "Konuşurken başka yere baktığında beni önemsemediğini hissediyorum ve üzülüyorum. Beni göz teması kurarak dinler misin?"
                </div>
              </div>

            </div>
          </div>

          {/* Practical Transformation Cards */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h4 className="font-bold text-slate-800 text-base font-serif flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <span>Ev İçi Pratik Dönüşüm Örnekleri</span>
            </h4>
            <div className="space-y-3">
              {practiceExamples.map((ex, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide block">
                    {ex.scenario}
                  </span>
                  <div className="text-xs text-rose-700 line-through">
                    ❌ {ex.youLanguage}
                  </div>
                  <div className="text-xs md:text-sm text-emerald-800 font-medium">
                    ✅ {ex.iLanguage}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Form: Ben Dili Generator */}
        <div className="bg-white rounded-3xl shadow-md border border-slate-200/80 overflow-hidden flex flex-col h-full relative">
          
          <div className="px-6 md:px-8 py-6 border-b border-slate-100 bg-gradient-to-r from-blue-50/60 to-white">
            <h3 className="font-bold text-slate-800 text-xl font-serif flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-blue-600" />
              <span>"Ben Dili" Cümle Sihirbazı</span>
            </h3>
            <p className="text-slate-500 text-xs md:text-sm mt-1">
              Bir duruma kırıldığınızda veya öfkelendiğinizde aşağıdaki 3 adımlı sihirbazı kullanarak duygularınızı incitmeden ifade edin.
            </p>
          </div>

          <form onSubmit={handleGenerate} className="p-6 md:p-8 flex-grow flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              
              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs font-medium border border-red-200">
                  {errorMsg}
                </div>
              )}

              {/* Step 1: Behavior */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>Somut Davranış (Ne oldu / Ne yapıldığında?)</span>
                </label>
                <input
                  type="text"
                  value={behavior}
                  onChange={(e) => setBehavior(e.target.value)}
                  placeholder="örn: Odaya kapıyı çalmadan girdiğinde..."
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white text-sm outline-none transition-all shadow-2xs"
                />
              </div>

              {/* Step 2: Emotion */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>Duygu (Bu davranış sende ne hissettirdi?)</span>
                </label>
                <select
                  value={feeling}
                  onChange={(e) => setFeeling(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white text-sm outline-none transition-all shadow-2xs text-slate-700"
                >
                  <option value="" disabled>Bir duygu seçin...</option>
                  <option value="üzülüyorum ve kırılıyorum">Üzülüyorum ve kırılıyorum</option>
                  <option value="kızıyorum ve öfkeleniyorum">Kızıyorum / Öfkeleniyorum</option>
                  <option value="değersiz ve duyulmamış hissediyorum">Değersiz ve duyulmamış hissediyorum</option>
                  <option value="kaygılanıyorum ve telaş yapıyorum">Kaygılanıyorum ve telaş yapıyorum</option>
                  <option value="yalnız ve yorulmuş hissediyorum">Yalnız ve yorulmuş hissediyorum</option>
                </select>
              </div>

              {/* Step 3: Request */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>İstek (Gelecekte ne yapılmasını rica ediyorsun?)</span>
                </label>
                <input
                  type="text"
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  placeholder="örn: Lütfen bir dahaki sefere kapıyı tıklatıp öyle girer misin?"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white text-sm outline-none transition-all shadow-2xs"
                />
              </div>

            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white rounded-2xl font-bold text-base shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>İfademi Oluştur</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Generated Result Box */}
              {generatedMessage && (
                <div className="p-5 md:p-6 bg-gradient-to-r from-blue-50/90 to-indigo-50/80 rounded-2xl border border-blue-200/80 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-blue-500" />
                      <span>Önerilen "Ben Dili" Cümleniz:</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-blue-100 shadow-2xs transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Kopyalandı</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Kopyala</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-slate-800 font-medium text-base md:text-lg italic leading-relaxed">
                    "{generatedMessage}"
                  </p>
                </div>
              )}
            </div>

          </form>

        </div>

      </div>

    </div>
  );
};
