import React, { useState, useEffect } from 'react';

interface Activity {
  title: string;
  day: string;
  category: string;
  duration: string;
  icon: string;
  desc: string;
  rules: string[];
  benefit: string;
}

interface Story {
  title: string;
  author: string;
  content: string;
  questions: string[];
  chatTopic: string;
}

interface TaskItem {
  id: number;
  text: string;
  assignees: string[];
  done: boolean;
}

interface MeetingRecord {
  id: number;
  date: string;
  reporter: string;
  issues: string;
  decisions: string;
}

const loveWords = [
  "Seninle vakit geçirmek, günümün en güzel anı.",
  "Fikrin benim için çok değerli, iyi ki paylaştın.",
  "Bu konuda gösterdiğin çabayı görüyor ve takdir ediyorum.",
  "İyi ki bizim ailemizdensin.",
  "Bugün sana nasıl yardımcı olabilirim?",
  "Varlığın bana huzur veriyor."
];

const activitiesData: Activity[] = [
  {
    title: "Duygu Pandomimi (Sessiz Sinema)",
    day: "Pazartesi",
    category: "Oyun",
    duration: "15 Dk",
    icon: "fa-masks-theater",
    desc: "Küçük kağıtlara 'mutlu, üzgün, kızgın, şaşırmış, korkmuş, gururlu, kıskanç' gibi duygular yazın. Sırayla kağıt çekip, konuşmadan sadece mimik ve beden diliyle o duyguyu anlatmaya çalışın.",
    rules: [
      "Her oyuncunun anlatmak için 1 dakikası vardır.",
      "Ses çıkarmak ve dudak okutmak yasaktır.",
      "En çok doğru tahmin eden kişi 'Duygu Dedektifi' unvanını alır."
    ],
    benefit: "Sözel olmayan ipuçlarıyla duyguları tanıma ve ifade etme becerisini geliştirir. Duygularını konuşmakta zorlanan çocuklar için harikadır."
  },
  {
    title: "Günün En'leri Masası",
    day: "Salı",
    category: "Sohbet",
    duration: "10 Dk",
    icon: "fa-star",
    desc: "Akşam yemeğinde veya çay saatinde herkes sırayla gününün 'En komik', 'En zor' ve 'En gurur verici' anını paylaşır.",
    rules: [
      "Konuşan kişinin sözü asla kesilmez.",
      "Yargılamak veya eleştirmek yasaktır, sadece dinlenir.",
      "Gönüllü olmayan zorlanmaz, pas diyebilir."
    ],
    benefit: "Aile üyelerinin birbirlerinin günlük yaşantılarından haberdar olmasını sağlar, empatiyi artırır."
  },
  {
    title: "Birlikte Mutfak Zamanı",
    day: "Çarşamba",
    category: "Etkinlik",
    duration: "45 Dk",
    icon: "fa-utensils",
    desc: "Ailecek kolay bir tarif (örneğin kurabiye veya kek) seçin ve mutfakta iş bölümü yaparak birlikte hazırlayın.",
    rules: [
      "Herkesin bir görevi olmalı (çırpma, dökme, şekil verme).",
      "Mutfak kirlenebilir, temizlik de ortak yapılmalıdır.",
      "Eğlenmek esastır, mükemmel şekilli kurabiyeler şart değil."
    ],
    benefit: "İşbirliği ve takım çalışması becerilerini geliştirir. Birlikte üretmenin hazzını yaşatır."
  },
  {
    title: "Ev İçi Hazine Avı",
    day: "Perşembe",
    category: "Oyun",
    duration: "30 Dk",
    icon: "fa-map",
    desc: "Evin farklı köşelerine küçük ipuçları saklayın. Her ipucu bir sonrakini göstersin ve finalde küçük bir sürpriz olsun.",
    rules: [
      "İpuçları evin tehlikeli yerlerine saklanmamalıdır.",
      "Büyükler küçükler için, küçükler büyükler için ipucu hazırlayabilir.",
      "Süre tutularak heyecan artırılabilir."
    ],
    benefit: "Problem çözme yeteneğini ve analitik düşünmeyi eğlenceli bir yolla destekler."
  },
  {
    title: "Aile Albümü İncelemesi",
    day: "Cuma",
    category: "Sohbet",
    duration: "20 Dk",
    icon: "fa-images",
    desc: "Eski fotoğraf albümlerini veya dijital fotoğrafları açın. Anne ve babanın çocukluk veya gençlik yıllarına ait anıları konuşun.",
    rules: [
      "Herkes bir fotoğraf seçip onunla ilgili bir anı veya düşünce paylaşsın.",
      "Çocuklar ebeveynlerine o dönemle ilgili merak ettiklerini sorabilir."
    ],
    benefit: "Kuşaklar arası bağı güçlendirir, köklenme hissi verir. Ailenin tarihini öğrenmek güven aşılar."
  },
  {
    title: "Ev Yapımı Sinema Gecesi",
    day: "Cumartesi",
    category: "Etkinlik",
    duration: "120 Dk",
    icon: "fa-film",
    desc: "Ailecek izlenecek bir film seçin. Ortamı sinema salonuna çevirin (ışıkları kapatın, bilet hazırlayın, mısır patlatın).",
    rules: [
      "Film seçimi ortak kararla (oylama) yapılmalıdır.",
      "Film izlerken telefonla oynamak yasaktır.",
      "Film bittikten sonra 5 dakika film üzerine sohbet edilir."
    ],
    benefit: "Ortak kültürel tüketim sağlar. Tartışmalar eleştirel düşünmeyi kolaylaştırır."
  },
  {
    title: "Sessiz Okuma Saati",
    day: "Pazar",
    category: "Etkinlik",
    duration: "30 Dk",
    icon: "fa-book-open",
    desc: "Televizyon ve telefonları kapatın. Herkes kendi kitabını veya dergisini alsın. Sessizlik içinde çay veya süt eşliğinde okuma saati yapın.",
    rules: [
      "Süre bitene kadar teknolojik aletlere bakılmaz.",
      "Süre bitiminde herkes okuduğu bölümden en ilginç bulduğu bir cümleyi paylaşabilir."
    ],
    benefit: "Okuma alışkanlığını destekler. Birlikte sessizliği paylaşabilmek iç huzuru artırır."
  }
];

const bookStories: Story[] = [
  {
    title: "Önsöz",
    author: "Hümeyra EKMEN",
    content: `Kıymetli aileler,<br><br>
"Aile Dediğin" kitabı, öğrencilerimizin tertemiz yüreklerinden süzülen, aile olmanın sıcaklığını, zorluklarını ve güzelliklerini anlatan eşsiz hikayelerden oluşuyor. Bu kitap sadece okunmak için değil, üzerinde konuşulmak, birbirimizi daha iyi anlamak ve bağlarımızı güçlendirmek için hazırlandı.<br><br>
Modern çağın hızına kapılıp birbirimize vakit ayıramadığımız şu günlerde, bu kitaptaki her bir hikaye, kendi ailenizden bir parça bulabileceğiniz birer ayna niteliğindedir. Bir hikayede kendi geçmişinize dalacak, diğerinde çocuklarınızın dünyasına pencere açacaksınız.<br><br>
Sizlerden ricam; lütfen bu portalı bir rehber olarak kullanın. Hikayeleri ailecek, göz teması kurarak, televizyonu ve telefonları bir kenara bırakarak <strong>kitabınızdan</strong> okuyun. Ardından burada hazırladığımız "Aile Sohbeti" başlıkları ve soruları üzerine konuşun.<br><br>
İletişiminizin, muhabbetinizin ve sevginizin daim olması dileğiyle... Keyifli okumalar ve sıcacık sohbetler dilerim.`,
    questions: [],
    chatTopic: ""
  },
  {
    title: "Mirasın Gerçek Sahibi",
    author: "Ertuğrul ERDEM",
    content: `<div class="bg-orange-50/80 p-8 rounded-2xl border border-orange-200 text-center mb-6 shadow-sm"><i class="fas fa-book-open text-5xl text-orange-500 mb-4 block"></i><h3 class="text-orange-950 font-bold text-2xl mb-2">Okuma Zamanı</h3><p class="text-orange-900 text-lg">Lütfen "Mirasın Gerçek Sahibi" adlı hikayeyi <strong>Aile Dediğin</strong> kitabınızdan ailecek okuyun.</p></div>`,
    questions: [
      "Sizce teknoloji ve ekranlar, aile mirası ve anıları bize unutturuyor olabilir mi? Neden?",
      "Evimizde dedelerimizden/ninelerimizden kalan, maddi değeri olmasa da manevi değeri çok yüksek olan hangi eşyalar var?",
      "Hikayedeki çoban kaftanı neden satmadı? Sizin için paha biçilemez olan manevi değerler nelerdir?"
    ],
    chatTopic: "Aile yadigarları, geçmişten günümüze taşıdığımız manevi değerler ve hatıraların hayatımızdaki yeri."
  },
  {
    title: "Keşke Her Gün Pazar Olsa",
    author: "Büşra ERYİĞİT",
    content: `<div class="bg-orange-50/80 p-8 rounded-2xl border border-orange-200 text-center mb-6 shadow-sm"><i class="fas fa-book-open text-5xl text-orange-500 mb-4 block"></i><h3 class="text-orange-950 font-bold text-2xl mb-2">Okuma Zamanı</h3><p class="text-orange-900 text-lg">Lütfen "Keşke Her Gün Pazar Olsa" adlı hikayeyi <strong>Aile Dediğin</strong> kitabınızdan ailecek okuyun.</p></div>`,
    questions: [
      "Hafta içi koşturmacasında birbirinize daha fazla vakit ayırmak için günlük rutinlerinizde ne gibi küçük değişiklikler yapabilirsiniz?",
      "Sizin evinizde de 'Keşke her gün o gün olsa' dediğiniz özel bir gün, saat veya an var mı?",
      "Ailecek oynadığınız, izlediğiniz veya yaptığınız favori pazar günü etkinliğiniz nedir?"
    ],
    chatTopic: "Hızla akan hayatın içinde aileye bilinçli olarak 'kaliteli zaman' ayırmanın yolları."
  },
  {
    title: "Duvardaki Saat",
    author: "Eslem Beyza EKMEN",
    content: `<div class="bg-orange-50/80 p-8 rounded-2xl border border-orange-200 text-center mb-6 shadow-sm"><i class="fas fa-book-open text-5xl text-orange-500 mb-4 block"></i><h3 class="text-orange-950 font-bold text-2xl mb-2">Okuma Zamanı</h3><p class="text-orange-900 text-lg">Lütfen "Duvardaki Saat" adlı hikayeyi <strong>Aile Dediğin</strong> kitabınızdan ailecek okuyun.</p></div>`,
    questions: [
      "Evinizde düzenli olarak yaptığınız, zamanın nasıl geçtiğini unuttuğunuz bir etkinlik var mı? Yoksa ne başlatabiliriz?",
      "Hikayede saat neden durmuş olabilir? Aile bağlarının zayıflaması bir evin ruhunu nasıl etkiler?",
      "Telefon ve televizyon kullanımını evde dengede tutmak için ailecek hangi yeni kuralları koyabiliriz?"
    ],
    chatTopic: "Teknolojinin aile içi iletişimi bölmesine izin vermemek ve 'ekransız zaman' dilimleri oluşturmak."
  },
  {
    title: "Zaman Yolculuğu ve Aile Hasreti",
    author: "Sahra KARAKAYA",
    content: `<div class="bg-orange-50/80 p-8 rounded-2xl border border-orange-200 text-center mb-6 shadow-sm"><i class="fas fa-book-open text-5xl text-orange-500 mb-4 block"></i><h3 class="text-orange-950 font-bold text-2xl mb-2">Okuma Zamanı</h3><p class="text-orange-900 text-lg">Lütfen "Zaman Yolculuğu ve Aile Hasreti" adlı hikayeyi <strong>Aile Dediğin</strong> kitabınızdan ailecek okuyun.</p></div>`,
    questions: [
      "Bir zaman makineniz olsa, ailenizle geçirdiğiniz hangi mutlu anıya geri dönmek isterdiniz? Neden o anı?",
      "Birbirimizin değerini yan yanayken ve anı yaşarken bilmek için bugün birbirimize ne söylemek istersiniz?",
      "Gelecekte 'keşke o günlere dönsek' diyeceğiniz güzel anıları bugünden oluşturmak için bu hafta sonu ne yapalım?"
    ],
    chatTopic: "Anı yaşamak, sahip olduklarımızın şükrünü bilmek ve aile üyelerine duyulan sevginin sık sık ifade edilmesi."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'daily' | 'book' | 'chat' | 'tasks' | 'meeting'>('home');
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const [familyMembers, setFamilyMembers] = useState<string[]>([]);
  const [memberNameInput, setMemberNameInput] = useState('');
  const [liveClock, setLiveClock] = useState('');
  const [loveWord, setLoveWord] = useState(loveWords[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Activities state
  const [currentActivityIndex, setCurrentActivityIndex] = useState(() => {
    const day = new Date().getDay();
    return day === 0 ? 6 : day - 1;
  });
  const [activityCelebrated, setActivityCelebrated] = useState(false);

  // Stories state
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  // Meeting state
  const [meetingDate, setMeetingDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [meetingReporter, setMeetingReporter] = useState('');
  const [meetingIssues, setMeetingIssues] = useState('');
  const [meetingDecisions, setMeetingDecisions] = useState('');
  const [meetingRecords, setMeetingRecords] = useState<MeetingRecord[]>([]);

  // Tasks state
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 1, text: "Akşam yemeği sonrası masayı toplamak", assignees: [], done: false },
    { id: 2, text: "Pazar kahvaltısını hazırlamak", assignees: [], done: false }
  ]);
  const [newTaskInput, setNewTaskInput] = useState('');

  // Ben Dili state
  const [behaviorInput, setBehaviorInput] = useState('');
  const [feelingInput, setFeelingInput] = useState('');
  const [requestInput, setRequestInput] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');

  // Custom Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDesc, setModalDesc] = useState('');
  const [modalIsPrompt, setModalIsPrompt] = useState(false);
  const [modalPromptVal, setModalPromptVal] = useState('');
  const [modalCallback, setModalCallback] = useState<((val?: string) => void) | null>(null);

  // Live clock interval
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveClock(
        now.toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) +
        ' - ' +
        now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const safeAlert = (msg: string) => {
    setModalTitle("Bilgi");
    setModalDesc(msg);
    setModalIsPrompt(false);
    setModalCallback(null);
    setModalOpen(true);
  };

  const safePrompt = (msg: string, callback: (val: string) => void) => {
    setModalTitle("Soru");
    setModalDesc(msg);
    setModalIsPrompt(true);
    setModalPromptVal('');
    setModalCallback(() => callback);
    setModalOpen(true);
  };

  const closeModal = (isOk: boolean) => {
    setModalOpen(false);
    if (modalCallback) {
      if (modalIsPrompt && isOk) {
        modalCallback(modalPromptVal);
      } else if (!modalIsPrompt && isOk) {
        modalCallback();
      }
    }
  };

  const handleAddMember = () => {
    const name = memberNameInput.trim();
    if (name && !familyMembers.includes(name)) {
      const updated = [...familyMembers, name];
      setFamilyMembers(updated);
      setMemberNameInput('');
      if (!meetingReporter) setMeetingReporter(name);
    }
  };

  const handleRemoveMember = (name: string) => {
    const updated = familyMembers.filter(m => m !== name);
    setFamilyMembers(updated);
    if (meetingReporter === name) {
      setMeetingReporter(updated[0] || '');
    }
  };

  const handleStartPortal = () => {
    if (familyMembers.length >= 2) {
      setTasks(prev => [
        { ...prev[0], assignees: [familyMembers[0]] },
        { ...prev[1], assignees: [familyMembers[1]] }
      ]);
    }
    setWelcomeVisible(false);
    setActiveTab('home');
  };

  const handleGenerateLoveWord = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * loveWords.length);
    } while (loveWords[nextIndex] === loveWord && loveWords.length > 1);
    setLoveWord(loveWords[nextIndex]);
  };

  const handleRandomActivity = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * activitiesData.length);
    } while (nextIndex === currentActivityIndex && activitiesData.length > 1);
    setCurrentActivityIndex(nextIndex);
    setActivityCelebrated(false);
  };

  const handleSaveMeeting = () => {
    if (!meetingDate || !meetingReporter || !meetingIssues.trim() || !meetingDecisions.trim()) {
      safeAlert("Lütfen tüm toplantı alanlarını doldurun.");
      return;
    }

    const newRecord: MeetingRecord = {
      id: Date.now(),
      date: new Date(meetingDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      reporter: meetingReporter,
      issues: meetingIssues.trim(),
      decisions: meetingDecisions.trim()
    };

    setMeetingRecords([newRecord, ...meetingRecords]);
    setMeetingIssues('');
    setMeetingDecisions('');
  };

  const exportMeetingToWord = (id: number) => {
    const record = meetingRecords.find(r => r.id === id);
    if (!record) return;

    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Aile Toplantı Tutanağı</title></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h1 style="text-align: center; color: #d97706;">Haftalık Aile Toplantısı Tutanağı</h1>
          <p><strong>Tarih:</strong> ${record.date}</p>
          <p><strong>Raportör:</strong> ${record.reporter}</p>
          <hr>
          <h2 style="color: #b45309;">Gündem: Aile İçi Sorunlar ve İhtiyaçlar</h2>
          <p>${record.issues.replace(/\n/g, '<br>')}</p>
          <h2 style="color: #b45309;">Alınan Kararlar ve Çözümler</h2>
          <p>${record.decisions.replace(/\n/g, '<br>')}</p>
          <br>
          <p style="text-align: right;"><em>Aile Bağları Portalı tarafından oluşturulmuştur.</em></p>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Aile_Toplanti_Tutanagi_${record.date.replace(/ /g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddTask = () => {
    const text = newTaskInput.trim();
    if (text) {
      setTasks([{ id: Date.now(), text, assignees: [], done: false }, ...tasks]);
      setNewTaskInput('');
    }
  };

  const handlePromptAssignee = (taskId: number) => {
    if (familyMembers.length === 0) {
      safeAlert("Lütfen önce aile üyelerini ekleyin.");
      return;
    }
    const promptText = "Kimi atamak istersiniz?\nAile Üyeleri: " + familyMembers.join(", ");
    safePrompt(promptText, (name) => {
      if (name && name.trim()) {
        const cleanName = name.trim();
        const matched = familyMembers.find(m => m.toLowerCase() === cleanName.toLowerCase()) || cleanName;
        setTasks(prev => prev.map(t => {
          if (t.id === taskId && !t.assignees.includes(matched)) {
            return { ...t, assignees: [...t.assignees, matched] };
          }
          return t;
        }));
      }
    });
  };

  const handleGenerateMessage = () => {
    if (!behaviorInput.trim() || !feelingInput || !requestInput.trim()) {
      safeAlert("Lütfen tüm alanları doldurun.");
      return;
    }
    const lowerBehavior = behaviorInput.trim().charAt(0).toLowerCase() + behaviorInput.trim().slice(1);
    setGeneratedMessage(`Sen ${lowerBehavior}, ben ${feelingInput}. ${requestInput.trim()}`);
  };

  const currentActivity = activitiesData[currentActivityIndex];
  const currentStory = bookStories[currentStoryIndex];

  return (
    <div className="min-h-screen flex flex-col bg-[#fffdf9] text-slate-700 antialiased">

      {/* ==================== WELCOME SCREEN ==================== */}
      {welcomeVisible && (
        <div id="welcome-screen" className="fixed inset-0 bg-[#fefbf6] z-[100] flex flex-col items-center justify-center overflow-y-auto p-4 transition-opacity duration-500">
          <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-amber-200/80">
            
            {/* Cover & Quote - Without Photo */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-[#fef5ea] via-[#ffeef0] to-[#f0fcf4] p-10 md:p-14 flex flex-col items-center justify-center text-center border-r border-amber-100 relative">
              <div className="absolute top-6 left-6 text-rose-300 text-6xl opacity-35">
                <i className="fas fa-quote-left"></i>
              </div>

              <div className="w-24 h-24 bg-white/95 shadow-md rounded-3xl flex items-center justify-center text-amber-600 text-4xl mb-8 border border-amber-200/80">
                <i className="fas fa-home"></i>
              </div>

              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mb-6 relative z-10 leading-snug">
                "Aile, insanın ruhunu ısıtan en eski ocaktır."
              </h2>

              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-md relative z-10 mb-8">
                Modern zamanın koşturmacasında birbirimize ayırdığımız samimi anlar, yuvamızın harcına katılan en değerli hazinedir.
              </p>

              <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-100 to-rose-100 rounded-full text-amber-950 font-bold text-xs uppercase tracking-wider border border-amber-200 shadow-2xs">
                <i className="fas fa-heart text-rose-500"></i>
                <span>"Aile Dediğin" Platformu</span>
              </div>
            </div>

            {/* Setup */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
              <div id="live-clock" className="text-teal-700 font-semibold text-base mb-6 border-b border-amber-100 pb-3 text-center bg-teal-50/70 py-2.5 rounded-2xl">
                <i className="far fa-clock mr-2 text-teal-600"></i>
                {liveClock || 'Yükleniyor...'}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3 font-serif">
                Hoş Geldiniz
              </h1>
              <p className="text-slate-600 mb-8 text-base md:text-lg leading-relaxed">
                Portala giriş yapmak ve etkinlikleri başlatmak için lütfen aile üyelerinin isimlerini ekleyin.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex gap-3">
                  <input
                    type="text"
                    id="member-name-input"
                    value={memberNameInput}
                    onChange={(e) => setMemberNameInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleAddMember(); }}
                    placeholder="Örn: Anne, Baba, Çocuk..."
                    className="flex-grow px-5 py-4 rounded-xl border border-amber-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none bg-slate-50 focus:bg-white transition-all text-lg shadow-xs"
                  />
                  <button
                    onClick={handleAddMember}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 rounded-xl font-bold transition-all shadow-md shadow-teal-600/20 active:scale-95 cursor-pointer"
                  >
                    <i className="fas fa-plus text-xl"></i>
                  </button>
                </div>

                <ul id="member-list" className="space-y-2 max-h-44 overflow-y-auto p-1">
                  {familyMembers.map((name) => (
                    <li
                      key={name}
                      className="bg-amber-50/80 text-amber-950 px-4 py-2.5 rounded-xl flex justify-between items-center font-bold border border-amber-200 shadow-xs animate-fade-in"
                    >
                      <span className="flex items-center gap-2">
                        <i className="fas fa-heart text-rose-500 text-sm"></i>
                        {name}
                      </span>
                      <button
                        onClick={() => handleRemoveMember(name)}
                        className="text-amber-600 hover:text-red-500 transition-colors p-1"
                        title="Sil"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleStartPortal}
                id="start-btn"
                disabled={familyMembers.length === 0}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  familyMembers.length > 0
                    ? 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg shadow-teal-600/30 hover:scale-[1.01] cursor-pointer'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Portala Giriş Yap</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==================== HEADER ==================== */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
              <div className="w-11 h-11 bg-indigo-50 group-hover:bg-indigo-100 transition-colors rounded-xl flex items-center justify-center shadow-xs">
                <i className="fas fa-home text-indigo-600 text-xl"></i>
              </div>
              <div>
                <span className="font-bold text-2xl tracking-tight text-slate-800 serif block leading-none">
                  Aile Bağları
                </span>
                <span className="text-xs text-amber-700 font-medium tracking-wide">
                  "Aile Dediğin" Platformu
                </span>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden lg:flex space-x-1.5 items-center">
              <button
                onClick={() => setActiveTab('home')}
                className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'home'
                    ? 'text-indigo-700 bg-indigo-50 border border-indigo-200'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <i className="fas fa-house-chimney text-xs"></i>
                <span>Ana Sayfa</span>
              </button>

              <button
                onClick={() => setActiveTab('daily')}
                className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'daily'
                    ? 'text-orange-700 bg-orange-50 border border-orange-200'
                    : 'text-slate-600 hover:text-orange-600 hover:bg-slate-50'
                }`}
              >
                <i className="fas fa-puzzle-piece text-xs"></i>
                <span>Oyun & Etkinlik</span>
              </button>

              <button
                onClick={() => setActiveTab('book')}
                className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'book'
                    ? 'text-purple-700 bg-purple-50 border border-purple-200'
                    : 'text-slate-600 hover:text-purple-600 hover:bg-slate-50'
                }`}
              >
                <i className="fas fa-book-open text-xs"></i>
                <span>"Aile Dediğin" Rehberi</span>
              </button>

              <button
                onClick={() => setActiveTab('chat')}
                className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'chat'
                    ? 'text-blue-700 bg-blue-50 border border-blue-200'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <i className="fas fa-comments text-xs"></i>
                <span>İletişim Köşesi</span>
              </button>

              <button
                onClick={() => setActiveTab('tasks')}
                className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'tasks'
                    ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                    : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                }`}
              >
                <i className="fas fa-clipboard-list text-xs"></i>
                <span>Görevler</span>
              </button>

              <button
                onClick={() => setActiveTab('meeting')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                  activeTab === 'meeting'
                    ? 'bg-amber-500 text-white shadow-amber-500/30'
                    : 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                <i className="fas fa-mug-hot text-amber-600"></i>
                <span>Aile Toplantısı</span>
              </button>
            </nav>

            {/* Re-open Welcome / Members button */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setWelcomeVisible(true)}
                className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                title="Aile Üyelerini Düzenle"
              >
                <i className="fas fa-users text-amber-600"></i>
                <span>{familyMembers.length} Üye</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setWelcomeVisible(true)}
                className="p-2 text-amber-800 bg-amber-50 rounded-lg text-xs font-bold"
              >
                <i className="fas fa-users mr-1"></i>
                {familyMembers.length}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 hover:text-slate-800 focus:outline-none p-2 rounded-xl hover:bg-slate-100"
              >
                <i className="fas fa-bars text-2xl"></i>
              </button>
            </div>

          </div>
        </div>
        
        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl px-3 py-3 space-y-1">
            <button onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-3 rounded-xl text-base font-bold text-indigo-700 bg-indigo-50">Ana Sayfa</button>
            <button onClick={() => { setActiveTab('daily'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:text-orange-600 hover:bg-orange-50">Oyun & Etkinlik</button>
            <button onClick={() => { setActiveTab('book'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:text-purple-600 hover:bg-purple-50">"Aile Dediğin" Rehberi</button>
            <button onClick={() => { setActiveTab('chat'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50">İletişim Köşesi</button>
            <button onClick={() => { setActiveTab('tasks'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:text-emerald-600 hover:bg-emerald-50">Görev Paylaşımı</button>
            <button onClick={() => { setActiveTab('meeting'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-3 rounded-xl text-base font-bold text-amber-900 bg-amber-100"><i className="fas fa-mug-hot mr-2 text-amber-600"></i>Haftalık Toplantı</button>
          </div>
        )}
      </header>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-10">

        {/* ==================== TAB: HOME ==================== */}
        {activeTab === 'home' && (
          <div className="tab-content animate-fade-in space-y-10">
            {/* Hero Section */}
            <div className="bg-white rounded-3xl p-6 md:p-12 mb-10 shadow-sm border border-amber-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-gradient-to-br from-amber-200 to-rose-200 rounded-full blur-3xl opacity-40"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-gradient-to-tr from-indigo-200 to-teal-200 rounded-full blur-3xl opacity-40"></div>
              
              <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-100 to-rose-100 rounded-full text-amber-950 font-bold text-xs uppercase tracking-wider border border-amber-200">
                  <i className="fas fa-heart text-rose-500"></i>
                  <span>Sıcak Bir Yuva, Birlikte Anılar</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-slate-800 leading-tight">
                  Ailemiz, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-500 to-indigo-600">En Büyük Hazinemiz</span>
                </h1>
                
                <p className="text-base md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                  Modern zamanın hızına inat, birbirimize daha sıkı sarılmak, iletişimimizi güçlendirmek ve dijital kopukluktan uzaklaşarak "biz olma" duygusunu yaşatmak için tasarlandı.
                </p>
                
                {/* Daily Quote Box */}
                <div className="mt-8 inline-block bg-gradient-to-r from-amber-50/90 via-orange-50/70 to-rose-50/90 rounded-2xl p-6 md:p-8 border border-amber-200 text-left shadow-sm relative max-w-2xl w-full">
                  <div className="flex items-start">
                    <i className="fas fa-quote-left text-3xl text-amber-500 mr-4 mt-1 shrink-0"></i>
                    <div className="flex-grow">
                      <h3 className="text-xs uppercase tracking-wider font-extrabold text-amber-800 mb-1">
                        Günün Sevgi Sözcüğü
                      </h3>
                      <p className="text-lg md:text-xl font-semibold text-slate-800 italic">
                        "{loveWord}"
                      </p>
                      <button
                        onClick={handleGenerateLoveWord}
                        className="mt-3 text-sm text-amber-700 hover:text-amber-900 font-bold flex items-center transition-colors cursor-pointer"
                      >
                        <i className="fas fa-sync-alt mr-2 text-amber-600"></i>
                        <span>Başka bir sözcük</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1 */}
              <div
                className="bg-white rounded-2xl p-6 card-shadow border border-orange-100 cursor-pointer flex flex-col h-full hover:border-orange-300 group"
                onClick={() => setActiveTab('daily')}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-amber-500 text-white rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform shadow-md shadow-orange-500/20">
                  <i className="fas fa-puzzle-piece"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 font-serif group-hover:text-orange-600 transition-colors">
                  Etkinlikler & Oyunlar
                </h3>
                <p className="text-slate-500 text-sm flex-grow leading-relaxed">
                  Her güne özel, ailenizle kaliteli zaman geçirmenizi sağlayacak eğlenceli aktiviteler.
                </p>
              </div>

              {/* Card 2 */}
              <div
                className="bg-white rounded-2xl p-6 card-shadow border border-amber-100 cursor-pointer flex flex-col h-full hover:border-amber-300 group"
                onClick={() => setActiveTab('meeting')}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-500 text-white rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform shadow-md shadow-amber-500/20">
                  <i className="fas fa-mug-hot"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 font-serif group-hover:text-amber-700 transition-colors">
                  Aile Toplantısı
                </h3>
                <p className="text-slate-500 text-sm flex-grow leading-relaxed">
                  Çay ve kurabiye eşliğinde haftalık değerlendirme yapın, sorunları ve ihtiyaçları konuşun.
                </p>
              </div>

              {/* Card 3 */}
              <div
                className="bg-white rounded-2xl p-6 card-shadow border border-purple-100 cursor-pointer flex flex-col h-full hover:border-purple-300 group"
                onClick={() => setActiveTab('book')}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform shadow-md shadow-purple-500/20">
                  <i className="fas fa-book-reader"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 font-serif group-hover:text-purple-600 transition-colors">
                  Sohbet Rehberi
                </h3>
                <p className="text-slate-500 text-sm flex-grow leading-relaxed">
                  "Aile Dediğin" kitabındaki öyküleri okuyup üzerindeki sorularla sohbetinizi başlatın.
                </p>
              </div>

              {/* Card 4 */}
              <div
                className="bg-white rounded-2xl p-6 card-shadow border border-blue-100 cursor-pointer flex flex-col h-full hover:border-blue-300 group"
                onClick={() => setActiveTab('chat')}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform shadow-md shadow-blue-500/20">
                  <i className="fas fa-comments"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 font-serif group-hover:text-blue-600 transition-colors">
                  İletişim Köşesi
                </h3>
                <p className="text-slate-500 text-sm flex-grow leading-relaxed">
                  Anlaşmazlıkları suçlamadan, yapıcı "Ben Dili" ile ifade etmeyi öğrenin.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* ==================== TAB: DAILY ACTIVITIES & GAMES ==================== */}
        {activeTab === 'daily' && (
          <div className="tab-content animate-fade-in space-y-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-800 flex items-center mb-2 font-serif">
                <i className="fas fa-puzzle-piece text-orange-500 mr-3"></i> Etkinlikler ve Oyunlar
              </h2>
              <p className="text-slate-600 text-lg">Birlikte gülmek, öğrenmek ve bağ kurmak için harika yollar.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Activity View */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl shadow-sm border border-orange-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 px-6 py-4 border-b border-orange-100 flex justify-between items-center">
                    <span className="font-bold text-orange-900" id="activity-day-label">
                      {currentActivity.day} Etkinliği
                    </span>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-white text-orange-600 rounded-full text-xs font-bold uppercase tracking-wide shadow-2xs border border-orange-100">
                        {currentActivity.category}
                      </span>
                      <span className="px-3 py-1 bg-white text-slate-600 rounded-full text-xs font-semibold shadow-2xs border border-slate-200">
                        {currentActivity.duration}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-6">
                    <div className="flex items-start">
                      <div className="text-5xl text-orange-500 mr-5 shrink-0">
                        <i className={`fas ${currentActivity.icon}`}></i>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2 font-serif">
                          {currentActivity.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-lg">
                          {currentActivity.desc}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200">
                      <h4 className="font-bold text-slate-800 flex items-center mb-3">
                        <i className="fas fa-lightbulb text-yellow-500 mr-2"></i> Nasıl Oynanır & Kurallar?
                      </h4>
                      <ul className="list-disc pl-5 space-y-2 text-slate-600 text-base leading-relaxed">
                        {currentActivity.rules.map((rule, idx) => (
                          <li key={idx}>{rule}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center text-sm md:text-base text-indigo-900 bg-indigo-50/80 p-5 rounded-2xl border border-indigo-100">
                      <i className="fas fa-heartbeat text-2xl mr-4 text-indigo-500"></i>
                      <div>
                        <strong className="block font-bold mb-0.5">Neden Faydalı?</strong>
                        <span>{currentActivity.benefit}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50/80 px-6 py-4 border-t border-slate-100 flex justify-between items-center">
                    <button
                      onClick={handleRandomActivity}
                      className="text-slate-600 hover:text-orange-600 font-bold transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <i className="fas fa-dice text-xl text-orange-500"></i>
                      <span>Rastgele Seç</span>
                    </button>
                    <button
                      onClick={() => setActivityCelebrated(true)}
                      className={`px-6 py-2.5 rounded-xl font-bold transition-all flex items-center shadow-md cursor-pointer ${
                        activityCelebrated
                          ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                          : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20'
                      }`}
                    >
                      <i className="fas fa-check-circle mr-2"></i>
                      <span>{activityCelebrated ? 'Tamamlandı ✓' : 'Tamamladık!'}</span>
                    </button>
                  </div>
                </div>
                
                {activityCelebrated && (
                  <div className="mt-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 text-emerald-900 p-6 rounded-2xl border border-emerald-200 text-center animate-fade-in shadow-sm">
                    <div className="text-4xl mb-3">🎉 👨‍👩‍👧‍👦 🌟</div>
                    <h4 className="text-2xl font-bold mb-1 font-serif">Harika İş Çıkardınız!</h4>
                    <p className="text-emerald-800 text-base">Birlikte geçirdiğiniz bu değerli anlar, ailenizin temelini daha da sağlamlaştırıyor.</p>
                  </div>
                )}
              </div>

              {/* Activity List Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
                  <div className="bg-slate-50 px-5 py-4 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800 font-serif">Haftalık Etkinlik Planı</h3>
                  </div>
                  <div className="p-3 flex-grow overflow-y-auto max-h-[600px] space-y-2">
                    {activitiesData.map((act, index) => {
                      const isActive = index === currentActivityIndex;
                      return (
                        <div
                          key={act.day}
                          onClick={() => { setCurrentActivityIndex(index); setActivityCelebrated(false); }}
                          className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-center border ${
                            isActive
                              ? 'bg-orange-50 border-orange-200 shadow-2xs'
                              : 'hover:bg-slate-50 border-transparent border-b-slate-100'
                          }`}
                        >
                          <div className={`w-11 h-11 rounded-xl ${isActive ? 'bg-orange-500 text-white shadow-xs' : 'bg-slate-100 text-slate-600'} flex items-center justify-center mr-3 shrink-0 flex-col font-bold`}>
                            <span className="text-[11px] uppercase">{act.day.substring(0, 3)}</span>
                          </div>
                          <div className="overflow-hidden">
                            <h4 className={`font-semibold text-sm truncate ${isActive ? 'text-orange-950 font-bold' : 'text-slate-800'}`}>
                              {act.title}
                            </h4>
                            <span className="text-xs text-slate-500">{act.category} | {act.duration}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB: BOOK ==================== */}
        {activeTab === 'book' && (
          <div className="tab-content animate-fade-in space-y-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-800 flex items-center mb-2 font-serif">
                <i className="fas fa-book-reader text-purple-500 mr-3"></i> Aile Sohbet Rehberi
              </h2>
              <p className="text-slate-600 text-lg">Hikayelerinizi kitabınızdan okuyun, ardından buradaki sorularla aile sohbetinizi başlatın.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* TOC Sidebar */}
              <div className="w-full lg:w-1/3 xl:w-1/4">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
                  <div className="bg-purple-50 px-5 py-4 border-b border-purple-100">
                    <h3 className="font-serif text-xl font-bold text-purple-900 flex items-center">
                      <i className="fas fa-bookmark text-purple-500 mr-2"></i> İçindekiler
                    </h3>
                  </div>
                  <div className="p-3 space-y-1.5">
                    {bookStories.map((story, index) => {
                      const isActive = index === currentStoryIndex;
                      return (
                        <button
                          key={story.title}
                          onClick={() => setCurrentStoryIndex(index)}
                          className={`w-full text-left px-4 py-3 rounded-2xl transition-all flex items-center group cursor-pointer ${
                            isActive
                              ? 'bg-purple-100 text-purple-950 font-bold border border-purple-200'
                              : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                          }`}
                        >
                          <i className={`fas fa-bookmark mr-3 ${isActive ? 'text-purple-600' : 'text-slate-300 group-hover:text-purple-400'}`}></i>
                          <span className="truncate text-sm">{story.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Reading Area */}
              <div className="w-full lg:w-2/3 xl:w-3/4">
                <div className="book-page p-8 md:p-14 min-h-[600px] border border-slate-200 shadow-sm rounded-3xl relative space-y-6">
                  {/* Story Header */}
                  <div className="text-center pb-6 border-b border-slate-200">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mb-3">{currentStory.title}</h2>
                    <p className="text-slate-500 italic flex items-center justify-center">
                      <span className="w-10 h-px bg-slate-200 mr-3"></span> {currentStory.author} <span className="w-10 h-px bg-slate-200 ml-3"></span>
                    </p>
                  </div>

                  {/* Story Content / Call to read */}
                  <div
                    className="prose prose-lg max-w-none text-slate-700 leading-relaxed font-serif text-[1.15rem]"
                    dangerouslySetInnerHTML={{ __html: currentStory.content }}
                  />

                  {/* Chat Topic */}
                  {currentStory.chatTopic && (
                    <div className="mt-8 bg-teal-50 p-6 rounded-2xl border border-teal-100 shadow-xs">
                      <h4 className="font-bold text-teal-900 flex items-center mb-2 text-lg">
                        <i className="fas fa-comments text-teal-600 mr-2"></i> Aile Sohbeti Gündemi
                      </h4>
                      <p className="text-teal-800 text-lg leading-relaxed">{currentStory.chatTopic}</p>
                    </div>
                  )}

                  {/* Reflection Questions */}
                  {currentStory.questions && currentStory.questions.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-slate-200">
                      <div className="bg-purple-50/70 rounded-2xl p-8 border border-purple-100">
                        <div className="flex items-center mb-6">
                          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-4 shadow-sm text-xl font-bold">
                            <i className="fas fa-question"></i>
                          </div>
                          <div>
                            <h4 className="font-bold text-2xl text-purple-950 font-serif">Üzerine Düşünelim</h4>
                            <p className="text-sm text-purple-800">Hikayeyi kitabınızdan okuduktan sonra bu soruları ailecek tartışın.</p>
                          </div>
                        </div>
                        <ul className="space-y-4 mt-4">
                          {currentStory.questions.map((q, i) => (
                            <li key={i} className="flex items-start bg-white p-5 rounded-2xl border border-purple-100 shadow-2xs gap-4">
                              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 text-sm font-bold mt-0.5">
                                {i + 1}
                              </div>
                              <span className="text-slate-800 font-medium text-lg leading-relaxed">{q}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB: MEETING ==================== */}
        {activeTab === 'meeting' && (
          <div className="tab-content animate-fade-in space-y-8">
            {/* Header Banner */}
            <div className="mb-8 bg-gradient-to-r from-amber-100/70 via-orange-100/50 to-amber-100/70 rounded-3xl p-8 border border-amber-200 flex flex-col md:flex-row items-center justify-between shadow-xs relative overflow-hidden">
              <div className="mb-4 md:mb-0 relative z-10">
                <h2 className="text-3xl font-bold text-amber-950 flex items-center mb-2 font-serif">
                  <i className="fas fa-comments text-amber-600 mr-3"></i> Haftalık Aile Toplantısı
                </h2>
                <p className="text-amber-900 text-lg max-w-2xl leading-relaxed">
                  Çayınızı, ıhlamurunuzu ve kurabiyenizi alın; bu hafta neleri iyi yaptık, neleri geliştirmeliyiz birlikte konuşalım.
                </p>
              </div>
              <div className="flex space-x-6 text-5xl text-amber-500 relative z-10 drop-shadow-md">
                <i className="fas fa-cookie-bite hover:scale-110 hover:text-amber-600 transition-transform cursor-pointer" title="Kurabiye"></i>
                <i className="fas fa-mug-hot hover:scale-110 hover:text-amber-600 transition-transform cursor-pointer" title="Çay / Ihlamur"></i>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Meeting Form */}
              <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-4 font-bold flex items-center text-lg">
                  <i className="fas fa-pen-nib mr-2"></i> Yeni Toplantı Tutanak Formu
                </div>
                <div className="p-6 md:p-8 space-y-6 flex-grow bg-slate-50/60">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        <i className="far fa-calendar-alt mr-1 text-amber-500"></i> Toplantı Tarihi
                      </label>
                      <input
                        type="date"
                        value={meetingDate}
                        onChange={(e) => setMeetingDate(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none bg-white shadow-xs text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        <i className="fas fa-user-edit mr-1 text-amber-500"></i> Raportör (Yazan)
                      </label>
                      <select
                        value={meetingReporter}
                        onChange={(e) => setMeetingReporter(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none bg-white shadow-xs text-base"
                      >
                        <option value="" disabled>Aile üyesi seçin...</option>
                        {familyMembers.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      <i className="fas fa-bullhorn mr-1 text-amber-500"></i> Gündem: Aile İçi Sorunlar & İhtiyaçlar
                    </label>
                    <p className="text-xs text-slate-500 mb-2">
                      Bu hafta neleri çözmeliyiz? Hangi konularda yardıma ihtiyacımız var? (Lütfen suçlayıcı olmadan, 'Ben Dili' kullanarak yazın.)
                    </p>
                    <textarea
                      rows={4}
                      value={meetingIssues}
                      onChange={(e) => setMeetingIssues(e.target.value)}
                      placeholder="Örn: Ev işlerinde daha fazla yardıma ihtiyacım var..."
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none bg-white resize-none shadow-xs text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      <i className="fas fa-handshake mr-1 text-amber-500"></i> Alınan Kararlar & Çözümler
                    </label>
                    <p className="text-xs text-slate-500 mb-2">
                      Birlikte hangi kararları aldık? Sorunları nasıl çözeceğiz?
                    </p>
                    <textarea
                      rows={4}
                      value={meetingDecisions}
                      onChange={(e) => setMeetingDecisions(e.target.value)}
                      placeholder="Örn: Akşam yemeklerinden sonra sofrayı toplama işi sırayla yapılacak..."
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none bg-white resize-none shadow-xs text-base"
                    />
                  </div>
                  
                  <button
                    onClick={handleSaveMeeting}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.01] shadow-lg shadow-amber-500/30 flex items-center justify-center text-lg cursor-pointer"
                  >
                    <i className="fas fa-save mr-2"></i> Toplantı Tutanaklarını Kaydet
                  </button>
                </div>
              </div>

              {/* Meeting History */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden h-[700px] flex flex-col">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 font-bold text-slate-800 flex items-center justify-between">
                  <span><i className="fas fa-history mr-2 text-slate-500"></i> Geçmiş Toplantılar</span>
                  <span className="bg-amber-100 text-amber-900 text-xs px-2.5 py-1 rounded-full font-bold">
                    {meetingRecords.length} Kayıt
                  </span>
                </div>
                <div className="p-4 space-y-4 overflow-y-auto flex-grow custom-scrollbar bg-slate-50/50">
                  {meetingRecords.length === 0 ? (
                    <div className="text-center text-slate-400 py-16 italic">
                      Henüz kaydedilmiş bir toplantı bulunmuyor. Çayınızı alın ve ilk toplantınızı başlatın!
                    </div>
                  ) : (
                    meetingRecords.map((record) => (
                      <div key={record.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                          <div className="font-bold text-amber-800 text-sm">
                            <i className="far fa-calendar-alt mr-1"></i> {record.date}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Raportör: {record.reporter}</span>
                            <button
                              onClick={() => exportMeetingToWord(record.id)}
                              className="text-xs bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1 rounded shadow-xs transition-colors cursor-pointer"
                              title="Word Belgesi Olarak İndir"
                            >
                              <i className="fas fa-file-word mr-1"></i> Çıktı Al
                            </button>
                          </div>
                        </div>
                        <div>
                          <strong className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Gündem:</strong>
                          <p className="text-slate-700 text-sm bg-slate-50 p-2.5 rounded-xl">{record.issues}</p>
                        </div>
                        <div>
                          <strong className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Kararlar:</strong>
                          <p className="text-amber-950 text-sm bg-amber-50 p-2.5 rounded-xl border border-amber-100 font-medium">{record.decisions}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB: COMMUNICATION & PROBLEM SOLVING ==================== */}
        {activeTab === 'chat' && (
          <div className="tab-content animate-fade-in space-y-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-800 flex items-center mb-2 font-serif">
                <i className="fas fa-hands-holding-heart text-blue-500 mr-3"></i> İletişim Köşesi
              </h2>
              <p className="text-slate-600 text-lg max-w-4xl">
                Aile içinde anlaşmazlıklar doğaldır. Önemli olan sorunları suçlamadan ("Sen Dili") değil, duygularımızı ifade ederek ("Ben Dili") konuşabilmektir.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Theory / Guide Area */}
              <div className="flex flex-col gap-6">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800 text-lg font-serif">Sen Dili vs. Ben Dili</h3>
                  </div>
                  <div className="p-6 md:p-8 space-y-5">
                    <div className="relative bg-red-50/80 rounded-2xl p-6 border border-red-100">
                      <div className="absolute top-0 right-0 p-3"><i className="fas fa-times-circle text-red-500 text-xl"></i></div>
                      <h4 className="font-bold text-red-800 mb-1 text-base">Sen Dili (Suçlayıcı)</h4>
                      <p className="text-red-900/70 text-sm mb-3">Davranışa değil kişiliğe saldırır, savunmaya geçirir.</p>
                      <div className="bg-white px-4 py-3 rounded-xl text-slate-700 italic border border-red-100 shadow-2xs">
                        "Beni hiç dinlemiyorsun, sürekli kendi bildiğini okuyorsun! Çok bencilsin."
                      </div>
                    </div>

                    <div className="relative bg-green-50/80 rounded-2xl p-6 border border-green-100">
                      <div className="absolute top-0 right-0 p-3"><i className="fas fa-check-circle text-green-500 text-xl"></i></div>
                      <h4 className="font-bold text-green-800 mb-1 text-base">Ben Dili (Çözüm Odaklı)</h4>
                      <p className="text-green-900/70 text-sm mb-3">Davranışın sizdeki etkisini söyler, empati kurdurur.</p>
                      <div className="bg-white px-4 py-3 rounded-xl text-slate-700 italic border border-green-100 shadow-2xs font-medium">
                        "Konuşurken başka yere baktığında beni önemsemediğini hissediyorum ve üzülüyorum."
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Form: Ben Dili Generator */}
              <div className="bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden flex flex-col h-full relative">
                <div className="px-8 py-6 border-b border-slate-100 bg-gradient-to-r from-blue-50/50 to-white">
                  <h3 className="font-bold text-slate-800 text-xl font-serif flex items-center">
                    <i className="fas fa-magic text-blue-500 mr-2"></i> "Ben Dili" Cümle Kurucu
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">Duygularınızı doğru ifade etmek için aşağıdaki taslağı kullanın.</p>
                </div>
                
                <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded mr-2 text-xs">1</span> Davranış: (Ne oldu?)
                      </label>
                      <input
                        type="text"
                        value={behaviorInput}
                        onChange={(e) => setBehaviorInput(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white text-base shadow-2xs"
                        placeholder="örn: Odaya kapıyı çalmadan girdiğinde..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded mr-2 text-xs">2</span> Duygu: (Ne hissettin?)
                      </label>
                      <select
                        value={feelingInput}
                        onChange={(e) => setFeelingInput(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white text-base shadow-2xs"
                      >
                        <option value="" disabled>Bir duygu seçin...</option>
                        <option value="üzülüyorum">Üzülüyorum</option>
                        <option value="kızıyorum">Kızıyorum / Öfkeleniyorum</option>
                        <option value="değersiz hissediyorum">Değersiz hissediyorum</option>
                        <option value="kaygılanıyorum">Kaygılanıyorum</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded mr-2 text-xs">3</span> İstek: (Ne istiyorsun?)
                      </label>
                      <input
                        type="text"
                        value={requestInput}
                        onChange={(e) => setRequestInput(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white text-base shadow-2xs"
                        placeholder="örn: Lütfen bir dahaki sefere kapıyı tıklar mısın?"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <button
                      onClick={handleGenerateMessage}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 cursor-pointer transition-all"
                    >
                      İfademi Oluştur <i className="fas fa-arrow-right ml-2"></i>
                    </button>

                    {generatedMessage && (
                      <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-200 animate-fade-in">
                        <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">Önerilen Cümle:</h4>
                        <p className="text-slate-800 font-semibold text-lg italic leading-relaxed">
                          "{generatedMessage}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB: TASKS ==================== */}
        {activeTab === 'tasks' && (
          <div className="tab-content animate-fade-in space-y-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-800 flex items-center mb-2 font-serif">
                <i className="fas fa-clipboard-list text-green-500 mr-3"></i> Adil Görev Paylaşımı
              </h2>
              <p className="text-slate-600 text-lg">Ev işlerini ve sorumlulukları paylaşmak, ailede "biz" duygusunu pekiştirir.</p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg font-serif">Aile Panosu</h3>
                  <p className="text-sm text-slate-500">Yapılacak işleri ekleyin ve kişilere atayın.</p>
                </div>
                
                <div className="flex w-full md:w-auto relative">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleAddTask(); }}
                    placeholder="Yeni bir görev yazın..."
                    className="px-5 py-3 pr-24 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-96 shadow-xs text-base"
                  />
                  <button
                    onClick={handleAddTask}
                    className="absolute right-1.5 top-1.5 bottom-1.5 bg-green-600 hover:bg-green-700 text-white px-5 rounded-lg font-bold transition-colors shadow-xs cursor-pointer"
                  >
                    Ekle
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto min-h-[300px]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-slate-200 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                      <th className="p-5 w-16 text-center">Durum</th>
                      <th className="p-5">Görev</th>
                      <th className="p-5 w-64">Sorumlu</th>
                      <th className="p-5 w-24 text-center">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {tasks.map((task) => (
                      <tr key={task.id} className={`transition-colors border-b border-slate-50 ${task.done ? 'bg-slate-50/50' : 'hover:bg-slate-50'}`}>
                        <td className="p-5 text-center">
                          <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => setTasks(prev => prev.map(t => t.id === task.id ? { ...t, done: !t.done } : t))}
                            className="w-6 h-6 border-2 border-slate-300 rounded text-green-500 focus:ring-green-500 cursor-pointer"
                          />
                        </td>
                        <td className="p-5">
                          <span className={`text-base ${task.done ? 'line-through text-slate-400' : 'text-slate-800 font-semibold'}`}>
                            {task.text}
                          </span>
                        </td>
                        <td className="p-5">
                          <div className="flex flex-wrap gap-2 items-center">
                            {task.assignees.map((a) => (
                              <span key={a} className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-lg border border-indigo-100">
                                {a}
                              </span>
                            ))}
                            <button
                              onClick={() => handlePromptAssignee(task.id)}
                              className="text-xs text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded border border-dashed border-slate-300 transition-colors cursor-pointer"
                              title="Kişi Ata"
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                        </td>
                        <td className="p-5 text-center">
                          <button
                            onClick={() => setTasks(prev => prev.filter(t => t.id !== task.id))}
                            className="text-slate-300 hover:text-red-500 w-8 h-8 rounded-full transition-colors focus:outline-none cursor-pointer"
                            title="Sil"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <i className="fas fa-home text-indigo-500 mr-2"></i>
              <span className="font-serif font-bold text-lg text-slate-800">Aile Bağları</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">Sevgi paylaştıkça büyür.</p>
          </div>
        </div>
      </footer>

      {/* ==================== CUSTOM MODAL ==================== */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-6 animate-fade-in border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-2 font-serif">{modalTitle}</h3>
            <p className="text-slate-600 mb-6 text-base whitespace-pre-wrap">{modalDesc}</p>
            {modalIsPrompt && (
              <div className="mb-6">
                <input
                  type="text"
                  value={modalPromptVal}
                  onChange={(e) => setModalPromptVal(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-base"
                  autoFocus
                />
              </div>
            )}
            <div className="flex justify-end gap-3">
              {modalIsPrompt && (
                <button
                  onClick={() => closeModal(false)}
                  className="px-5 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 font-medium transition-colors cursor-pointer"
                >
                  İptal
                </button>
              )}
              <button
                onClick={() => closeModal(true)}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-colors cursor-pointer shadow-sm"
              >
                Tamam
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
