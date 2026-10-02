import React, { useState } from 'react';
import { MeetingRecord } from '../types';
import { 
  Coffee, 
  Cookie, 
  Calendar, 
  UserCheck, 
  Megaphone, 
  Handshake, 
  Save, 
  FileText, 
  Printer, 
  Trash2, 
  Clock, 
  History, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface MeetingTabProps {
  familyMembers: string[];
  meetingRecords: MeetingRecord[];
  onSaveMeeting: (record: Omit<MeetingRecord, 'id'>) => void;
  onDeleteMeeting: (id: number) => void;
}

export const MeetingTab: React.FC<MeetingTabProps> = ({
  familyMembers,
  meetingRecords,
  onSaveMeeting,
  onDeleteMeeting,
}) => {
  const [meetingDate, setMeetingDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [reporter, setReporter] = useState(familyMembers[0] || '');
  const [issues, setIssues] = useState('');
  const [decisions, setDecisions] = useState('');
  const [formError, setFormError] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingDate || !reporter || !issues.trim() || !decisions.trim()) {
      setFormError('Lütfen tüm alanları (Tarih, Raportör, Gündem ve Kararlar) doldurunuz.');
      return;
    }

    setFormError('');
    const formattedDate = new Date(meetingDate).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    onSaveMeeting({
      rawDate: meetingDate,
      date: formattedDate,
      reporter,
      issues: issues.trim(),
      decisions: decisions.trim(),
    });

    setIssues('');
    setDecisions('');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportWord = (record: MeetingRecord) => {
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Aile Toplantı Tutanağı</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; padding: 20px; }
          .header { text-align: center; border-bottom: 2px solid #d97706; padding-bottom: 15px; margin-bottom: 25px; }
          .title { color: #b45309; font-size: 24px; font-weight: bold; margin: 0; }
          .meta { font-size: 14px; color: #666; margin-top: 5px; }
          .section { margin-bottom: 20px; }
          .section-title { color: #92400e; font-size: 16px; font-weight: bold; border-left: 4px solid #d97706; padding-left: 10px; margin-bottom: 8px; }
          .box { background-color: #fdfaf6; border: 1px solid #fed7aa; padding: 12px; border-radius: 6px; }
          .footer { margin-top: 30px; text-align: right; font-style: italic; font-size: 12px; color: #888; border-top: 1px solid #ddd; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="title">Haftalık Aile Toplantısı Tutanağı</h1>
          <div class="meta">
            <strong>Toplantı Tarihi:</strong> ${record.date} | <strong>Raportör:</strong> ${record.reporter}
          </div>
        </div>

        <div class="section">
          <div class="section-title">Gündem: Aile İçi Sorunlar ve İhtiyaçlar</div>
          <div class="box">
            ${record.issues.replace(/\n/g, '<br>')}
          </div>
        </div>

        <div class="section">
          <div class="section-title">Alınan Kararlar ve Çözüm Adımları</div>
          <div class="box">
            ${record.decisions.replace(/\n/g, '<br>')}
          </div>
        </div>

        <div class="footer">
          Aile Bağları: "Aile Dediğin" Platformu tarafından otomatik oluşturulmuştur.
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Aile_Toplanti_Tutanagi_${record.date.replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Warm Header Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-3xl p-8 md:p-10 border border-amber-200/80 flex flex-col md:flex-row items-center justify-between shadow-xs relative overflow-hidden">
        <div className="mb-4 md:mb-0 relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Coffee className="w-3.5 h-3.5 text-amber-700" />
            <span>Haftalık Değerlendirme & Muhabbet Çemberi</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-amber-950 flex items-center font-serif">
            Haftalık Aile Toplantısı
          </h2>
          <p className="text-amber-900/90 text-base md:text-lg mt-2 leading-relaxed">
            Çayınızı, ıhlamurunuzu ve kurabiyenizi alın; bu hafta neleri iyi yaptık, neleri daha iyi yapabiliriz sevgiyle konuşalım.
          </p>
        </div>

        <div className="flex items-center gap-4 text-amber-500 relative z-10 shrink-0">
          <div className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-200 shadow-2xs text-amber-600 hover:scale-105 transition-transform" title="Kurabiye">
            <Cookie className="w-10 h-10" />
          </div>
          <div className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-200 shadow-2xs text-amber-600 hover:scale-105 transition-transform" title="Sıcak Çay / Ihlamur">
            <Coffee className="w-10 h-10" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Meeting Form (2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden flex flex-col">
          <div className="bg-amber-500 text-white px-6 py-4 font-bold flex items-center justify-between text-base md:text-lg">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              <span>Yeni Toplantı Tutanak Formu</span>
            </div>
            <span className="text-xs font-normal opacity-90">Haftalık Düzenli Kayıt</span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 flex-grow bg-slate-50/50">
            {formError && (
              <div className="p-4 bg-red-50 text-red-800 border border-red-200 rounded-2xl text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {savedSuccess && (
              <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-sm flex items-center gap-2 animate-in fade-in">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Toplantı tutanağı başarıyla kaydedildi!</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <span>Toplantı Tarihi</span>
                </label>
                <input
                  type="date"
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none bg-white shadow-2xs text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-amber-500" />
                  <span>Raportör (Notları Yazan)</span>
                </label>
                <select
                  value={reporter}
                  onChange={(e) => setReporter(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none bg-white shadow-2xs text-slate-800 font-medium"
                >
                  {familyMembers.length === 0 ? (
                    <option value="Aile Üyesi">Aile Üyesi</option>
                  ) : (
                    familyMembers.map((member) => (
                      <option key={member} value={member}>
                        {member}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Megaphone className="w-4 h-4 text-amber-500" />
                <span>Gündem: Aile İçi Sorunlar & İhtiyaçlar</span>
              </label>
              <p className="text-xs text-slate-500 mb-2">
                Bu hafta neleri çözmeliyiz? Hangi konularda desteğe ihtiyacımız var? (Suçlayıcı olmadan 'Ben Dili' ile yazınız.)
              </p>
              <textarea
                rows={4}
                value={issues}
                onChange={(e) => setIssues(e.target.value)}
                placeholder="Örn: Akşamları ev işlerinde daha fazla iş birliğine ihtiyaç duyuyorum. Yorgun hissettiğimde destek arıyorum..."
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none bg-white resize-none shadow-2xs text-slate-800 text-sm leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Handshake className="w-4 h-4 text-amber-500" />
                <span>Alınan Kararlar & Çözümler</span>
              </label>
              <p className="text-xs text-slate-500 mb-2">
                Birlikte hangi somut kararları aldık? Kim hangi adımı atacak?
              </p>
              <textarea
                rows={4}
                value={decisions}
                onChange={(e) => setDecisions(e.target.value)}
                placeholder="Örn: Yemekten sonra sofrayı toplamayı sırayla dönüşümlü yapacağız. Haftasonu sinema saatine kadar telefonlar kutuda kalacak..."
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none bg-white resize-none shadow-2xs text-slate-800 text-sm leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 rounded-2xl transition-all transform hover:scale-[1.01] active:scale-98 shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 text-base md:text-lg cursor-pointer"
            >
              <Save className="w-5 h-5" />
              <span>Toplantı Tutanaklarını Kaydet</span>
            </button>
          </form>
        </div>

        {/* Meeting History (1 Column) */}
        <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden flex flex-col h-[750px]">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200/70 font-bold text-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-slate-500" />
              <span>Geçmiş Toplantılar</span>
            </div>
            <span className="bg-amber-100 text-amber-900 text-xs px-2.5 py-1 rounded-full font-bold">
              {meetingRecords.length} Kayıt
            </span>
          </div>

          <div className="p-4 space-y-4 overflow-y-auto flex-grow bg-slate-50/40">
            {meetingRecords.length === 0 ? (
              <div className="text-center text-slate-400 py-16 px-4">
                <Coffee className="w-12 h-12 mx-auto text-amber-300 mb-3 opacity-60" />
                <p className="font-medium text-slate-600 mb-1">Henüz kaydedilmiş toplantı yok.</p>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Çayınızı alın, ailece oturun ve ilk toplantı tutanağınızı soldaki formdan ekleyin!
                </p>
              </div>
            ) : (
              meetingRecords.map((record) => (
                <div
                  key={record.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 hover:border-amber-200 transition-all animate-in fade-in"
                >
                  <div className="flex justify-between items-start border-b border-slate-100 pb-2.5">
                    <div>
                      <div className="font-bold text-amber-800 text-sm flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{record.date}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        Raportör: <strong className="text-slate-600">{record.reporter}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleExportWord(record)}
                        className="text-xs bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1 rounded-lg shadow-2xs transition-colors flex items-center gap-1"
                        title="Word (.doc) Belgesi Olarak İndir"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Çıktı Al</span>
                      </button>
                      <button
                        onClick={() => onDeleteMeeting(record.id)}
                        className="p-1 text-slate-300 hover:text-red-500 transition-colors rounded-lg"
                        title="Kaydı Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <strong className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1 font-semibold">
                      Gündem & Sorunlar:
                    </strong>
                    <p className="text-slate-700 text-xs md:text-sm bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed whitespace-pre-wrap">
                      {record.issues}
                    </p>
                  </div>

                  <div>
                    <strong className="text-[11px] uppercase tracking-wider text-amber-800 block mb-1 font-semibold">
                      Alınan Kararlar:
                    </strong>
                    <p className="text-amber-950 text-xs md:text-sm bg-amber-50/70 p-2.5 rounded-xl border border-amber-100 leading-relaxed whitespace-pre-wrap font-medium">
                      {record.decisions}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
