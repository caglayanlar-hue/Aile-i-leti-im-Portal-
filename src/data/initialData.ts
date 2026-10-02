import { Activity, Story, Task } from '../types';

export const loveWords = [
  "Seninle vakit geçirmek günümün en güzel anı.",
  "Fikrin benim için çok değerli, iyi ki paylaştın.",
  "Bu konuda gösterdiğin çabayı görüyor ve takdir ediyorum.",
  "İyi ki bizim ailemizdensin.",
  "Bugün sana nasıl yardımcı olabilirim?",
  "Varlığın bana huzur veriyor.",
  "Senin mutluluğun bizim yuvamızın neşesidir.",
  "Birlikte olduğumuz her an bize güç katıyor."
];

export const activitiesData: Activity[] = [
  {
    title: "Duygu Pandomimi (Sessiz Sinema)",
    day: "Pazartesi",
    category: "Oyun",
    duration: "15 Dk",
    icon: "Theater",
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
    icon: "Star",
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
    icon: "Utensils",
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
    icon: "Compass",
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
    icon: "Image",
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
    icon: "Film",
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
    icon: "BookOpen",
    desc: "Televizyon ve telefonları kapatın. Herkes kendi kitabını veya dergisini alsın. Sessizlik içinde çay veya süt eşliğinde okuma saati yapın.",
    rules: [
      "Süre bitene kadar teknolojik aletlere bakılmaz.",
      "Süre bitiminde herkes okuduğu bölümden en ilginç bulduğu bir cümleyi paylaşabilir."
    ],
    benefit: "Okuma alışkanlığını destekler. Birlikte sessizliği paylaşabilmek iç huzuru artırır."
  }
];

export const bookStories: Story[] = [
  {
    title: "Önsöz",
    author: "Hümeyra EKMEN",
    content: `Kıymetli aileler,

"Aile Dediğin" kitabı, öğrencilerimizin tertemiz yüreklerinden süzülen, aile olmanın sıcaklığını, zorluklarını ve güzelliklerini anlatan eşsiz hikayelerden oluşuyor. Bu kitap sadece okunmak için değil, üzerinde konuşulmak, birbirimizi daha iyi anlamak ve bağlarımızı güçlendirmek için hazırlandı.

Modern çağın hızına kapılıp birbirimize vakit ayıramadığımız şu günlerde, bu kitaptaki her bir hikaye, kendi ailenizden bir parça bulabileceğiniz birer ayna niteliğindedir. Bir hikayede kendi geçmişinize dalacak, diğerinde çocuklarınızın dünyasına pencere açacaksınız.

Sizlerden ricam; lütfen bu portalı bir rehber olarak kullanın. Hikayeleri ailecek, göz teması kurarak, televizyonu ve telefonları bir kenara bırakarak kitabınızdan okuyun. Ardından burada hazırladığımız "Aile Sohbeti" başlıkları ve soruları üzerine konuşun.

İletişiminizin, muhabbetinizin ve sevginizin daim olması dileğiyle... Keyifli okumalar ve sıcacık sohbetler dilerim.`,
    questions: [],
    chatTopic: ""
  },
  {
    title: "Mirasın Gerçek Sahibi",
    author: "Ertuğrul ERDEM",
    content: `Lütfen "Mirasın Gerçek Sahibi" adlı hikayeyi Aile Dediğin kitabınızdan ailecek okuyun.`,
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
    content: `Lütfen "Keşke Her Gün Pazar Olsa" adlı hikayeyi Aile Dediğin kitabınızdan ailecek okuyun.`,
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
    content: `Lütfen "Duvardaki Saat" adlı hikayeyi Aile Dediğin kitabınızdan ailecek okuyun.`,
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
    content: `Lütfen "Zaman Yolculuğu ve Aile Hasreti" adlı hikayeyi Aile Dediğin kitabınızdan ailecek okuyun.`,
    questions: [
      "Bir zaman makineniz olsa, ailenizle geçirdiğiniz hangi mutlu anıya geri dönmek isterdiniz? Neden o anı?",
      "Birbirimizin değerini yan yanayken ve anı yaşarken bilmek için bugün birbirimize ne söylemek istersiniz?",
      "Gelecekte 'keşke o günlere dönsek' diyeceğiniz güzel anıları bugünden oluşturmak için bu hafta sonu ne yapalım?"
    ],
    chatTopic: "Anı yaşamak, sahip olduklarımızın şükrünü bilmek ve aile üyelerine duyulan sevginin sık sık ifade edilmesi."
  }
];

export const initialTasks: Task[] = [
  { id: 1, text: "Akşam yemeği sonrası masayı toplamak", assignees: [], done: false },
  { id: 2, text: "Pazar kahvaltısını hazırlamak", assignees: [], done: false },
  { id: 3, text: "Çiçekleri sulamak ve havalandırma yapmak", assignees: [], done: false }
];
