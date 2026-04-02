import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ──────────── ДАННЫЕ УСЛУГ ──────────── */
const SERVICES = [
  {
    id: "hockey",
    icon: "🏒",
    badge: "Спортивный опыт",
    title: 'Вечер с «Авангардом»',
    subtitle: "Погружение в хоккейный мир",
    desc: 'Даже если вы не фанат хоккея, этот опыт перевернет ваше представление о спорте! Я помогу вам достать билеты на матч ХК "Авангард" (по возможности и сезону), расскажу историю клуба, объясню правила игры и окунусь вместе с вами в оглушительную атмосферу G-Drive Арены. Это настоящий сибирский драйв!',
    includes: [
      "Консультация по билетам и наличию мест",
      "Трансфер до арены (опционально)",
      "Персональное сопровождение на матче",
      "Рассказы о традициях омских болельщиков",
    ],
    price: "За услугу сопровождения + стоимость билетов",
    gradient: "from-blue-900/80 to-indigo-900/80",
    accentColor: "#4F8EF7",
    payPath: "/pay?service=hockey",
  },
  {
    id: "food",
    icon: "🍽️",
    badge: "Гастро-тур",
    title: "Кулинарный тур «Вкус Сибири»",
    subtitle: "Гастрономическое приключение",
    desc: "Откройте для себя Сибирь на вкус! Я покажу вам, где в Омске готовят самые настоящие сибирские пельмени, где попробовать строганину (по сезону), самый вкусный морс из таёжных ягод и где найти настоящий сибирский мед. Мы посетим локальные рынки и проверенные места, которые не найдете в TripAdvisor.",
    includes: [
      "Посещение 2–3 аутентичных заведений",
      "Дегустации блюд сибирской кухни",
      "Рассказы об истории сибирской гастрономии",
      "Секретные адреса, которых нет в путеводителях",
    ],
    price: "Фиксированная цена + бюджет на дегустации",
    gradient: "from-amber-900/80 to-orange-900/80",
    accentColor: "#F59E0B",
    payPath: "/pay?service=food",
  },
  {
    id: "tour",
    icon: "🗺️",
    badge: "Авторская экскурсия",
    title: "Омск глазами инсайдера",
    subtitle: "Авторская экскурсия",
    desc: "Забудьте о скучных путеводителях! Я проведу вас по Омску, показав те уголки и истории, о которых знают только местные. От тайных дворов Любинского проспекта до лучших мест для селфи с закатом на Иртыше. Это не просто экскурсия, это погружение в настоящую омичскую жизнь с её шутками, легендами и любимыми местами.",
    includes: [
      "3–4 часа пешеходной экскурсии",
      "Нетуристические, но колоритные места",
      "Местные легенды, шутки и традиции",
      "Омские пельмени и сибирский чай (опционально)",
    ],
    price: "Фиксированная за группу до 5–7 человек",
    gradient: "from-emerald-900/80 to-teal-900/80",
    accentColor: "#10B981",
    payPath: "/pay?service=tour",
  },
];

/* ──────────── ДОСТОПРИМЕЧАТЕЛЬНОСТИ ──────────── */
const ATTRACTIONS = [
  {
    id: 1,
    name: "Омская крепость",
    desc: "Историческая крепость XVIII века — место основания Омска. Восстановленные бастионы и Тобольские ворота перенесут вас в эпоху освоения Сибири.",
    emoji: "🏰",
    img: "https://cdn.poehali.dev/projects/8f3786ff-152d-4575-aadd-164cd69b12ba/bucket/98f0c1c1-18e6-411e-8d70-5f7e51e96772.jpg",
    category: "История",
  },
  {
    id: 2,
    name: "Набережная Иртыша",
    desc: "Живописная набережная великой реки — любимое место отдыха омичей. Закаты здесь превращаются в настоящие картины импрессионистов.",
    emoji: "🌊",
    img: "https://cdn.poehali.dev/projects/8f3786ff-152d-4575-aadd-164cd69b12ba/bucket/7e74a178-1439-4c61-b0b5-8da7db98d419.jpg",
    category: "Природа",
  },
  {
    id: 3,
    name: "Театр драмы",
    desc: "Один из старейших театров Сибири (1874 г.). Величественное здание в стиле классицизма и богатый репертуар — от классики до авангарда.",
    emoji: "🎭",
    img: "https://cdn.poehali.dev/projects/8f3786ff-152d-4575-aadd-164cd69b12ba/bucket/059bdfa4-3c7f-40ce-9c70-9b3551dee6bd.jpg",
    category: "Культура",
  },
  {
    id: 4,
    name: "Музей им. Врубеля",
    desc: "Крупнейший художественный музей Сибири с коллекцией более 30 000 экспонатов. Гордость — оригинальные работы Михаила Врубеля.",
    emoji: "🎨",
    img: "https://cdn.poehali.dev/projects/8f3786ff-152d-4575-aadd-164cd69b12ba/bucket/f0bdcc8b-ed3a-4b34-a15e-f945752b36d0.jpg",
    category: "Искусство",
  },
  {
    id: 5,
    name: "Серафимо-Алексеевская часовня",
    desc: "Жемчужина Омска — изящная часовня начала XX века. Восстановленная в 1990-х, она стала символом возрождения духовной жизни города.",
    emoji: "⛪",
    img: "https://cdn.poehali.dev/projects/8f3786ff-152d-4575-aadd-164cd69b12ba/bucket/d1c0c1b4-2236-4f6f-832f-65405d4e567b.jpg",
    category: "Архитектура",
  },
  {
    id: 6,
    name: "Успенский собор",
    desc: "Величественный Успенский кафедральный собор на Соборной площади — духовный центр Омска и один из красивейших храмов Сибири.",
    emoji: "🕍",
    img: "https://cdn.poehali.dev/projects/8f3786ff-152d-4575-aadd-164cd69b12ba/bucket/4259c50f-0e3c-4363-a969-bf55e352ff45.jpg",
    category: "Архитектура",
  },
  {
    id: 7,
    name: "G-Drive Арена",
    desc: "Современная домашняя арена легендарного ХК «Авангард». Хоккейные матчи здесь — это настоящий праздник и оглушительная атмосфера.",
    emoji: "🏒",
    img: "https://cdn.poehali.dev/projects/8f3786ff-152d-4575-aadd-164cd69b12ba/bucket/ceb68fb5-b64b-430c-b895-3f368472eb97.jpg",
    category: "Спорт",
  },
  {
    id: 8,
    name: "Любинский проспект",
    desc: "Главный бульвар Омска с историческими зданиями XIX–XX веков. Прогулка по нему — это путешествие сквозь эпохи и архитектурные стили.",
    emoji: "🌆",
    img: "https://cdn.poehali.dev/projects/8f3786ff-152d-4575-aadd-164cd69b12ba/bucket/27c70e53-1a67-4b52-b4ae-c3f71d23dbb3.jpg",
    category: "Архитектура",
  },
  {
    id: 9,
    name: "Музей Достоевского",
    desc: "Ф. М. Достоевский провёл в Омске 4 года на каторге. Музей хранит уникальные артефакты и документы об этом периоде жизни великого писателя.",
    emoji: "📚",
    img: "https://cdn.poehali.dev/projects/8f3786ff-152d-4575-aadd-164cd69b12ba/bucket/98f99f09-a112-4030-90e2-16a41158de6a.jpg",
    category: "Культура",
  },
];

/* ──────────── ДАННЫЕ ДЛЯ СКРЕТЧ-КАРТЫ ──────────── */
const SCRATCH_PRIZES = [
  { emoji: "🏰", text: "Бесплатная экскурсия по Омской крепости при записи на тур!" },
  { emoji: "☕", text: "Сибирский чай с мёдом в подарок после экскурсии по Любинскому!" },
  { emoji: "🏒", text: "Приоритетная запись на «Вечер с Авангардом» + скидка 10%!" },
  { emoji: "📸", text: "Бесплатная фотосессия на закате у набережной Иртыша!" },
  { emoji: "🎨", text: "Скидка 20% на посещение Музея Врубеля с гидом!" },
  { emoji: "🌟", text: "VIP-маршрут «Омск за один день» в подарок!" },
  { emoji: "⛪", text: "Авторская прогулка по историческому центру бесплатно!" },
  { emoji: "🎭", text: "Экскурсия за кулисы Омского театра драмы!" },
  { emoji: "🍽️", text: "Гастрономический тур «Вкус Сибири» со скидкой 15%!" },
  { emoji: "🌊", text: "Закатная прогулка по Иртышской набережной с гидом — бесплатно!" },
];

/* ──────────── ХУКИ ──────────── */
function useScrollReveal() {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = refs.current.indexOf(entry.target as HTMLElement);
          if (idx !== -1 && entry.isIntersecting) {
            setVisible((prev) => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.12 }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const register = (idx: number) => (el: HTMLElement | null) => {
    refs.current[idx] = el;
    if (el && !visible[idx]) {
      // initial check
    }
  };
  return { visible, register };
}

/* ──────────── КОМПОНЕНТ СКРЕТЧ-КАРТЫ ──────────── */
function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [scratching, setScratching] = useState(false);
  const [prize, setPrize] = useState(() => SCRATCH_PRIZES[Math.floor(Math.random() * SCRATCH_PRIZES.length)]);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawing = useRef(false);
  const [cardKey, setCardKey] = useState(0);

  const resetCard = () => {
    setPrize(SCRATCH_PRIZES[Math.floor(Math.random() * SCRATCH_PRIZES.length)]);
    setRevealed(false);
    setScratching(false);
    setScratchPercent(0);
    isDrawing.current = false;
    setCardKey((k) => k + 1);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Стиль G-Drive Arena — тёмный с оранжево-красными акцентами
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "#0a0a0a");
    grad.addColorStop(0.4, "#1a0800");
    grad.addColorStop(0.7, "#0f0f0f");
    grad.addColorStop(1, "#1a0500");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Эффект LED-подсветки арены (красно-оранжевые полосы)
    for (let i = 0; i < 8; i++) {
      const y = (canvas.height / 8) * i;
      const grd = ctx.createLinearGradient(0, y, canvas.width, y);
      grd.addColorStop(0, "rgba(255,60,0,0)");
      grd.addColorStop(0.5, `rgba(255,${80 + i * 10},0,0.06)`);
      grd.addColorStop(1, "rgba(255,60,0,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, y, canvas.width, 3);
    }

    // Мерцающие огни как на арене
    for (let i = 0; i < 35; i++) {
      ctx.fillStyle = `rgba(255,${120 + Math.random() * 80},0,${0.1 + Math.random() * 0.25})`;
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 2 + 0.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Рамка в стиле G-Drive (красно-оранжевая)
    const borderGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    borderGrad.addColorStop(0, "rgba(255,80,0,0.7)");
    borderGrad.addColorStop(0.5, "rgba(255,140,0,0.9)");
    borderGrad.addColorStop(1, "rgba(255,80,0,0.7)");
    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = 3;
    ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

    // G-DRIVE логотип текст
    ctx.fillStyle = "rgba(255,140,0,0.95)";
    ctx.font = "bold 14px Montserrat, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("G·DRIVE АРЕНА", canvas.width / 2, 32);

    // Птица (ястреб «Авангарда»)
    ctx.fillStyle = "rgba(255,100,0,0.25)";
    ctx.font = "bold 32px serif";
    ctx.fillText("🦅", canvas.width / 2, canvas.height / 2 - 8);

    // Текст потереть
    ctx.fillStyle = "rgba(255,140,0,0.9)";
    ctx.font = "bold 14px Montserrat, sans-serif";
    ctx.fillText("Потри и узнай свой приз!", canvas.width / 2, canvas.height / 2 + 28);

    // Нижний слоган
    ctx.fillStyle = "rgba(255,100,0,0.6)";
    ctx.font = "10px Montserrat, sans-serif";
    ctx.fillText("ОМСК — ЗДЕСЬ НАЧИНАЕТСЯ СИБИРЬ", canvas.width / 2, canvas.height - 14);
  }, [cardKey]);

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pos = getPos(e, canvas);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 28, 0, Math.PI * 2);
    ctx.fill();

    // Подсчёт процента
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] < 128) cleared++;
    }
    const percent = (cleared / (canvas.width * canvas.height)) * 100;
    setScratchPercent(Math.round(percent));
    if (percent > 60 && !revealed) {
      setRevealed(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        key={cardKey}
        className="relative rounded-2xl overflow-hidden cursor-pointer select-none"
        style={{
          width: "100%",
          maxWidth: 420,
          height: 200,
          boxShadow: "0 0 50px rgba(255,215,0,0.25), 0 8px 32px rgba(0,0,0,0.6)",
          border: "2px solid rgba(255,215,0,0.4)",
        }}
      >
        {/* Приз под слоем */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          style={{
            background: "linear-gradient(135deg, #0a1628 0%, #1a2a5e 50%, #0d1b3e 100%)",
          }}
        >
          {/* Верхний декор */}
          <div style={{ position: "absolute", top: 10, left: 0, right: 0, textAlign: "center", fontSize: 11, color: "rgba(255,215,0,0.6)", letterSpacing: "0.2em" }}>
            ★ ОМСК ПОД ЗАЩИТОЙ ★
          </div>
          <div style={{ fontSize: 52 }}>{prize.emoji}</div>
          <div
            className="text-center px-6"
            style={{
              color: "#FFD700",
              fontFamily: "Cormorant Garamond, serif",
              fontSize: 17,
              fontWeight: 700,
              lineHeight: 1.4,
            }}
          >
            {prize.text}
          </div>
          {/* Нижний декор */}
          <div style={{ position: "absolute", bottom: 10, left: 0, right: 0, textAlign: "center", fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em" }}>
            Омск — здесь начинается Сибирь
          </div>
        </div>
        {/* Скретч-слой */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full touch-none"
          style={{ opacity: revealed ? 0 : 1, transition: "opacity 0.9s ease" }}
          onMouseDown={() => { isDrawing.current = true; setScratching(true); }}
          onMouseUp={() => { isDrawing.current = false; }}
          onMouseLeave={() => { isDrawing.current = false; }}
          onMouseMove={scratch}
          onTouchStart={(e) => { e.preventDefault(); isDrawing.current = true; setScratching(true); }}
          onTouchEnd={() => { isDrawing.current = false; }}
          onTouchMove={scratch}
        />
      </div>
      {!revealed && (
        <div className="text-center" style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
          {scratching ? `Стёрто ${scratchPercent}% — продолжай!` : "Нажми и потри пальцем или мышью"}
        </div>
      )}
      {revealed && (
        <div className="flex flex-col items-center gap-3">
          <div
            className="text-center px-4"
            style={{ color: "#FFD700", fontWeight: 700, fontSize: 15 }}
          >
            🎉 Поздравляем! Покажи этот экран при записи и получи свой бонус!
          </div>
          <button
            onClick={resetCard}
            className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
            style={{
              background: "rgba(255,215,0,0.12)",
              border: "1px solid rgba(255,215,0,0.4)",
              color: "#FFD700",
              cursor: "pointer",
            }}
          >
            🔄 Попробовать снова
          </button>
        </div>
      )}
    </div>
  );
}

/* ──────────── НАВИГАЦИЯ ──────────── */
const NAV_ITEMS = [
  { label: "Главная", href: "#hero" },
  { label: "О проекте", href: "#about-project" },
  { label: "Услуги", href: "#services" },
  { label: "Карта", href: "#map" },
  { label: "Алфавит", href: "/alphabet" },
  { label: "Контакты", href: "#contacts" },
];

/* ──────────── ПАДАЮЩИЕ СЛОВА ──────────── */
const FALLING_WORDS = ["ОМСК", "СИБИРЬ", "ИРТЫШ", "АВАНГАРД", "ИСТОРИЯ", "ПУТЕШЕСТВИЕ", "ОТКРЫТИЕ", "ТРАДИЦИИ"];

function FallingWords() {
  const [items, setItems] = useState<{ id: number; word: string; x: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const created = FALLING_WORDS.map((word, i) => ({
      id: i,
      word,
      x: 5 + (i * 12) % 90,
      delay: i * 0.7,
      duration: 4 + (i % 3),
    }));
    setItems(created);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute font-bold opacity-0"
          style={{
            left: `${item.x}%`,
            top: "-60px",
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(16px, 2.5vw, 28px)",
            color: "rgba(255,215,0,0.18)",
            animation: `wordFall ${item.duration}s ease-in ${item.delay}s infinite`,
            letterSpacing: "0.2em",
          }}
        >
          {item.word}
        </div>
      ))}
    </div>
  );
}

/* ──────────── КАРТА ОМСКА ──────────── */
const MAP_POINTS = [
  {
    id: 1, name: "Омская крепость", emoji: "🏰", x: 52, y: 62,
    desc: "Основана в 1716 году — место рождения города. Тобольские ворота, бастионы, острог Достоевского.",
    yandex: "https://yandex.ru/maps/66/omsk/?ll=73.3666,54.9907&z=17&text=Омская+крепость",
    google: "https://maps.google.com/?q=54.9907,73.3666",
  },
  {
    id: 2, name: "Набережная Иртыша", emoji: "🌊", x: 44, y: 70,
    desc: "Живописная набережная вдоль Иртыша — главная прогулочная зона города.",
    yandex: "https://yandex.ru/maps/66/omsk/?ll=73.3560,54.9820&z=16&text=Набережная+Иртыша",
    google: "https://maps.google.com/?q=54.9820,73.3560",
  },
  {
    id: 3, name: "Театр драмы", emoji: "🎭", x: 50, y: 46,
    desc: "Один из старейших театров Сибири (1874 г.) — жемчужина классической архитектуры.",
    yandex: "https://yandex.ru/maps/66/omsk/?ll=73.3690,55.0000&z=17&text=Омский+театр+драмы",
    google: "https://maps.google.com/?q=55.0000,73.3690",
  },
  {
    id: 4, name: "Музей Врубеля", emoji: "🎨", x: 47, y: 52,
    desc: "Крупнейший художественный музей Сибири — 30 000+ экспонатов, работы Врубеля.",
    yandex: "https://yandex.ru/maps/66/omsk/?ll=73.3670,54.9950&z=17&text=Музей+Врубеля+Омск",
    google: "https://maps.google.com/?q=54.9950,73.3670",
  },
  {
    id: 5, name: "Серафимо-Алексеевская часовня", emoji: "⛪", x: 54, y: 44,
    desc: "Изящная часовня XIX века — символ духовного возрождения Омска.",
    yandex: "https://yandex.ru/maps/66/omsk/?ll=73.3695,55.0012&z=17&text=Серафимо-Алексеевская+часовня",
    google: "https://maps.google.com/?q=55.0012,73.3695",
  },
  {
    id: 6, name: "Успенский собор", emoji: "🕍", x: 57, y: 38,
    desc: "Величественный кафедральный собор — духовный центр Омска, восстановлен в 2007 году.",
    yandex: "https://yandex.ru/maps/66/omsk/?ll=73.3700,55.0062&z=17&text=Успенский+собор+Омск",
    google: "https://maps.google.com/?q=55.0062,73.3700",
  },
  {
    id: 7, name: "G-Drive Арена", emoji: "🏒", x: 64, y: 28,
    desc: "Современный домашний стадион ХК «Авангард» — сибирский хоккейный храм.",
    yandex: "https://yandex.ru/maps/66/omsk/?ll=73.3810,55.0140&z=16&text=G-Drive+Арена+Омск",
    google: "https://maps.google.com/?q=55.0140,73.3810",
  },
  {
    id: 8, name: "Любинский проспект", emoji: "🌆", x: 48, y: 56,
    desc: "«Омский Арбат» — главная пешеходная улица с фасадами XIX–XX веков.",
    yandex: "https://yandex.ru/maps/66/omsk/?ll=73.3680,54.9920&z=17&text=Любинский+проспект+Омск",
    google: "https://maps.google.com/?q=54.9920,73.3680",
  },
  {
    id: 9, name: "Музей Достоевского", emoji: "📚", x: 55, y: 58,
    desc: "Здесь великий писатель провёл 4 года каторги, ставшие источником «Записок из Мёртвого дома».",
    yandex: "https://yandex.ru/maps/66/omsk/?ll=73.3720,54.9900&z=17&text=Музей+Достоевского+Омск",
    google: "https://maps.google.com/?q=54.9900,73.3720",
  },
];

function OmskInteractiveMap() {
  const [active, setActive] = useState<number | null>(null);
  const activePoint = MAP_POINTS.find((p) => p.id === active);

  return (
    <div>
      <div
        className="relative w-full rounded-3xl overflow-hidden"
        style={{
          height: "clamp(400px, 60vw, 680px)",
          boxShadow: "0 0 60px rgba(255,215,0,0.15), 0 20px 60px rgba(0,0,0,0.6)",
          border: "2px solid rgba(255,215,0,0.2)",
        }}
        onClick={() => setActive(null)}
      >
        {/* OpenStreetMap iframe */}
        <iframe
          title="Карта Омска"
          src="https://www.openstreetmap.org/export/embed.html?bbox=73.28%2C54.94%2C73.47%2C55.06&layer=mapnik"
          className="w-full h-full"
          style={{
            border: "none",
            filter: "hue-rotate(200deg) saturate(0.65) brightness(0.75)",
          }}
          loading="lazy"
        />
        {/* Тёмный оверлей */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(6,13,31,0.3) 0%, transparent 50%, rgba(6,13,31,0.3) 100%)" }}
        />
        {/* Маркеры */}
        {MAP_POINTS.map((pt) => (
          <button
            key={pt.id}
            onClick={(e) => { e.stopPropagation(); setActive(active === pt.id ? null : pt.id); }}
            className="absolute transition-all duration-200"
            style={{
              left: `${pt.x}%`,
              top: `${pt.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: active === pt.id ? 20 : 10,
            }}
          >
            <div
              className="relative flex flex-col items-center"
            >
              {/* Пульсация при активном */}
              {active === pt.id && (
                <span
                  className="absolute rounded-full"
                  style={{
                    width: 44, height: 44,
                    top: -4, left: -4,
                    background: "rgba(255,215,0,0.25)",
                    animation: "ripple 1.5s ease-out infinite",
                  }}
                />
              )}
              <div
                className="flex items-center justify-center rounded-full text-lg font-bold shadow-lg transition-all duration-200"
                style={{
                  width: active === pt.id ? 42 : 36,
                  height: active === pt.id ? 42 : 36,
                  background: active === pt.id
                    ? "linear-gradient(135deg, #FFD700, #FFA500)"
                    : "rgba(6,13,31,0.9)",
                  border: `2px solid ${active === pt.id ? "#FFD700" : "rgba(255,215,0,0.6)"}`,
                  boxShadow: active === pt.id
                    ? "0 0 20px rgba(255,215,0,0.6)"
                    : "0 2px 10px rgba(0,0,0,0.5)",
                }}
              >
                {pt.emoji}
              </div>
              {/* Подпись */}
              <div
                className="mt-1 px-2 py-0.5 rounded text-center"
                style={{
                  background: "rgba(6,13,31,0.85)",
                  color: active === pt.id ? "#FFD700" : "rgba(255,255,255,0.8)",
                  fontSize: "clamp(9px, 1.2vw, 12px)",
                  fontWeight: active === pt.id ? 700 : 400,
                  whiteSpace: "nowrap",
                  maxWidth: "120px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  backdropFilter: "blur(4px)",
                  border: active === pt.id ? "1px solid rgba(255,215,0,0.4)" : "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {pt.name}
              </div>
            </div>
          </button>
        ))}
        {/* Попап с описанием */}
        {activePoint && (
          <div
            className="absolute z-30 rounded-2xl p-4"
            style={{
              bottom: 20, left: "50%", transform: "translateX(-50%)",
              width: "clamp(280px, 80%, 420px)",
              background: "rgba(6,13,31,0.97)",
              border: "1px solid rgba(255,215,0,0.4)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.7), 0 0 20px rgba(255,215,0,0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3 mb-3">
              <span style={{ fontSize: 28 }}>{activePoint.emoji}</span>
              <div className="flex-1 min-w-0">
                <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18, fontWeight: 700, color: "#FFD700", lineHeight: 1.2 }}>
                  {activePoint.name}
                </div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.5, marginTop: 4 }}>
                  {activePoint.desc}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href={activePoint.yandex}
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #FC3F1D, #FF6534)", color: "#fff", textDecoration: "none" }}
              >
                🗺 Яндекс
              </a>
              <a
                href={activePoint.google}
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #4285F4, #34A853)", color: "#fff", textDecoration: "none" }}
              >
                🌐 Google
              </a>
              <button
                onClick={() => setActive(null)}
                className="w-10 flex items-center justify-center rounded-xl text-sm transition-all hover:scale-105"
                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Легенда */}
      <div className="flex flex-wrap gap-2 justify-center mt-5">
        {MAP_POINTS.map((pt) => (
          <button
            key={pt.id}
            onClick={() => setActive(active === pt.id ? null : pt.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105"
            style={{
              background: active === pt.id ? "rgba(255,215,0,0.2)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${active === pt.id ? "rgba(255,215,0,0.5)" : "rgba(255,255,255,0.1)"}`,
              color: active === pt.id ? "#FFD700" : "rgba(255,255,255,0.6)",
            }}
          >
            <span>{pt.emoji}</span>
            <span>{pt.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ──────────── ОМСК-ТЕСТ (КРЕАТИВНЫЙ БЛОК) ──────────── */
const QUIZ_QUESTIONS = [
  {
    question: "Сколько лет провёл Достоевский в Омске?",
    options: ["2 года", "4 года", "7 лет", "Он тут не был"],
    correct: 1,
    fact: "Достоевский провёл в Омском остроге 4 года (1850–1854). Именно здесь он «умер» и «воскрес» как гений.",
  },
  {
    question: "Как называется главная пешеходная улица Омска?",
    options: ["Арбат", "Любинский проспект", "Невский проспект", "Сибирская аллея"],
    correct: 1,
    fact: "Любинский проспект — «Омский Арбат», назван в честь Любови Гасфорд, жены генерал-губернатора.",
  },
  {
    question: "Какой хоккейный клуб базируется в Омске?",
    options: ["Металлург", "Авангард", "Сибирь", "Иртыш"],
    correct: 1,
    fact: "ХК «Авангард» — гордость Омска, многократный чемпион КХЛ. Их логотип — ястреб в атаке.",
  },
  {
    question: "Сколько экспонатов в Музее Врубеля?",
    options: ["500+", "5 000+", "30 000+", "1 000 000"],
    correct: 2,
    fact: "Музей им. Врубеля хранит более 30 000 экспонатов — крупнейшая коллекция за Уралом!",
  },
  {
    question: "В каком году основана Омская крепость?",
    options: ["1616", "1716", "1816", "1916"],
    correct: 1,
    fact: "Омская крепость основана в 1716 году — ровно 308 лет назад! Именно отсюда началось завоевание Сибири.",
  },
];

function OmskQuiz() {
  const [step, setStep] = useState<"intro" | "quiz" | "result">("intro");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFact, setShowFact] = useState(false);

  const q = QUIZ_QUESTIONS[current];

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowFact(true);
    if (idx === q.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    setSelected(null);
    setShowFact(false);
    if (current + 1 >= QUIZ_QUESTIONS.length) {
      setStep("result");
    } else {
      setCurrent((c) => c + 1);
    }
  };

  const getResultTitle = () => {
    if (score === 5) return { title: "🏆 Ты — настоящий омич!", sub: "Можешь сам водить экскурсии!", color: "#FFD700" };
    if (score >= 3) return { title: "🎉 Почти местный!", sub: "Омск тебя ждёт — всё остальное узнаешь на месте", color: "#4ADE80" };
    if (score >= 1) return { title: "🌍 Начинающий путешественник", sub: "Пора планировать поездку в Омск!", color: "#60A5FA" };
    return { title: "😅 Хм... ты точно слышал про Сибирь?", sub: "Не переживай — мы тебя просветим!", color: "#F97316" };
  };

  if (step === "intro") {
    return (
      <div
        className="rounded-3xl p-8 md:p-12 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,255,255,0.03))",
          border: "1px solid rgba(255,215,0,0.25)",
        }}
      >
        <div style={{ fontSize: 56, marginBottom: 16 }}>🤔</div>
        <h2
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 700,
            color: "#fff",
            marginBottom: 12,
          }}
        >
          Насколько ты знаешь <span style={{ color: "#FFD700" }}>Омск?</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.7 }}>
          5 вопросов. Смешные факты. Узнай, готов ли ты к путешествию в сердце Сибири —
          или тебе ещё есть что открыть!
        </p>
        <button
          onClick={() => setStep("quiz")}
          className="px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #FFD700, #FFA500)",
            color: "#0a0a0a",
            boxShadow: "0 8px 30px rgba(255,165,0,0.4)",
          }}
        >
          🎯 Начать тест!
        </button>
      </div>
    );
  }

  if (step === "result") {
    const res = getResultTitle();
    return (
      <div
        className="rounded-3xl p-8 md:p-12 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,255,255,0.03))",
          border: "1px solid rgba(255,215,0,0.25)",
        }}
      >
        <div style={{ fontSize: 56, marginBottom: 16 }}>🏁</div>
        <h2
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(24px, 4vw, 40px)",
            fontWeight: 700,
            color: res.color,
            marginBottom: 8,
          }}
        >
          {res.title}
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, marginBottom: 20 }}>{res.sub}</p>
        <div
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl mb-8"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 40, fontWeight: 700, color: res.color }}>
            {score}/{QUIZ_QUESTIONS.length}
          </span>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>правильных ответов</div>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => { setStep("intro"); setCurrent(0); setScore(0); setSelected(null); setShowFact(false); }}
            className="px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
            style={{ background: "rgba(255,215,0,0.12)", border: "1px solid rgba(255,215,0,0.3)", color: "#FFD700" }}
          >
            🔄 Пройти снова
          </button>
          <Link
            to="/alphabet"
            className="px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #FFD700, #FFA500)", color: "#0a0a0a", textDecoration: "none" }}
          >
            🔤 Омский Алфавит →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl p-6 md:p-10"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,215,0,0.2)",
      }}
    >
      {/* Прогресс */}
      <div className="flex items-center justify-between mb-6">
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
          Вопрос {current + 1} из {QUIZ_QUESTIONS.length}
        </div>
        <div className="flex gap-1.5">
          {QUIZ_QUESTIONS.map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === current ? 32 : 12,
                background: i < current ? "#FFD700" : i === current ? "#FFD700" : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Вопрос */}
      <h3
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "clamp(20px, 3.5vw, 32px)",
          fontWeight: 700,
          color: "#fff",
          marginBottom: 24,
          lineHeight: 1.3,
        }}
      >
        {q.question}
      </h3>

      {/* Варианты */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {q.options.map((opt, idx) => {
          let bg = "rgba(255,255,255,0.05)";
          let border = "rgba(255,255,255,0.1)";
          let color = "rgba(255,255,255,0.8)";
          if (selected !== null) {
            if (idx === q.correct) { bg = "rgba(74,222,128,0.15)"; border = "#4ADE80"; color = "#4ADE80"; }
            else if (idx === selected && idx !== q.correct) { bg = "rgba(248,113,113,0.15)"; border = "#F87171"; color = "#F87171"; }
          }
          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={selected !== null}
              className="text-left px-5 py-4 rounded-2xl font-medium text-sm transition-all"
              style={{
                background: bg,
                border: `2px solid ${border}`,
                color,
                cursor: selected !== null ? "default" : "pointer",
              }}
            >
              {idx === 0 ? "А" : idx === 1 ? "Б" : idx === 2 ? "В" : "Г"}. {opt}
            </button>
          );
        })}
      </div>

      {/* Факт после ответа */}
      {showFact && (
        <div
          className="rounded-2xl p-4 mb-4"
          style={{ background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.2)" }}
        >
          <div style={{ color: "#FFD700", fontWeight: 700, fontSize: 13, marginBottom: 6 }}>💡 Интересный факт:</div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.6 }}>{q.fact}</div>
        </div>
      )}

      {selected !== null && (
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl font-bold text-base transition-all hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #FFD700, #FFA500)",
            color: "#0a0a0a",
            boxShadow: "0 4px 20px rgba(255,165,0,0.3)",
          }}
        >
          {current + 1 >= QUIZ_QUESTIONS.length ? "Посмотреть результат 🏁" : "Следующий вопрос →"}
        </button>
      )}
    </div>
  );
}

/* ──────────── ГЛАВНЫЙ КОМПОНЕНТ ──────────── */
export default function Index() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { visible, register } = useScrollReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    if (href.startsWith("/")) return;
    setNavOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        background: "#060d1f",
        color: "#e8eaf0",
        fontFamily: "Montserrat, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* ═══ CSS АНИМАЦИИ ═══ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700;800&display=swap');

        @keyframes wordFall {
          0% { opacity: 0; transform: translateY(-60px) rotate(-3deg); }
          10% { opacity: 1; }
          90% { opacity: 0.8; }
          100% { opacity: 0; transform: translateY(110vh) rotate(3deg); }
        }
        @keyframes heroGlow {
          0%, 100% { text-shadow: 0 0 40px rgba(255,215,0,0.3), 0 0 80px rgba(255,215,0,0.1); }
          50% { text-shadow: 0 0 60px rgba(255,215,0,0.5), 0 0 120px rgba(255,215,0,0.2); }
        }
        @keyframes goldPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(255,215,0,0.3); }
          50% { box-shadow: 0 0 40px rgba(255,215,0,0.6), 0 0 80px rgba(255,215,0,0.2); }
        }
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes revealLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes revealRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes starFloat {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.5); }
        }
        @keyframes lineExpand {
          from { width: 0; }
          to { width: 80px; }
        }
        @keyframes cardHover {
          from { transform: translateY(0) scale(1); }
          to { transform: translateY(-8px) scale(1.01); }
        }
        .reveal-up { animation: revealUp 0.8s ease-out forwards; }
        .reveal-left { animation: revealLeft 0.8s ease-out forwards; }
        .reveal-right { animation: revealRight 0.8s ease-out forwards; }
        .hero-glow { animation: heroGlow 3s ease-in-out infinite; }
        .gold-pulse { animation: goldPulse 2s ease-in-out infinite; }
        .service-card { transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .service-card:hover { transform: translateY(-10px); }
        .attr-card { transition: all 0.4s ease; }
        .attr-card:hover { transform: translateY(-6px); }
        .nav-link { position: relative; }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #FFD700;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,215,0,0.4), transparent);
          margin: 0;
        }
      `}</style>

      {/* ═══ НАВИГАЦИЯ ═══ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(6,13,31,0.97)"
            : "linear-gradient(180deg, rgba(6,13,31,0.95) 0%, transparent 100%)",
          borderBottom: scrolled ? "1px solid rgba(255,215,0,0.15)" : "none",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
          {/* Лого */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFA500)",
                boxShadow: "0 0 20px rgba(255,215,0,0.4)",
              }}
            >
              🏙️
            </div>
            <div>
              <div
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#FFD700",
                  lineHeight: 1,
                }}
              >
                Омск
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em" }}>
                ОМСК ПОД ЗАЩИТОЙ
              </div>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="nav-link"
                  style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: 500, letterSpacing: "0.05em" }}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className="nav-link"
                  style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: 500, letterSpacing: "0.05em", background: "none", border: "none", cursor: "pointer" }}
                >
                  {item.label}
                </button>
              )
            )}
            <button
              onClick={() => scrollTo("#contacts")}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFA500)",
                color: "#0a0a0a",
                boxShadow: "0 4px 15px rgba(255,165,0,0.4)",
              }}
            >
              Записаться
            </button>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setNavOpen(!navOpen)}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-0.5 w-6 transition-all duration-300"
                style={{
                  background: "#FFD700",
                  transform:
                    navOpen && i === 0
                      ? "rotate(45deg) translate(5px, 5px)"
                      : navOpen && i === 1
                      ? "scaleX(0)"
                      : navOpen && i === 2
                      ? "rotate(-45deg) translate(5px, -5px)"
                      : "none",
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        {navOpen && (
          <div
            className="md:hidden px-4 pb-6 pt-2 flex flex-col gap-4"
            style={{ background: "rgba(6,13,31,0.98)", borderTop: "1px solid rgba(255,215,0,0.15)" }}
          >
            {NAV_ITEMS.map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setNavOpen(false)}
                  style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, fontWeight: 500 }}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, fontWeight: 500, background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                >
                  {item.label}
                </button>
              )
            )}
          </div>
        )}
      </nav>

      {/* ═══ РЕКЛАМНЫЙ БАННЕР (на всю ширину) ═══ */}
      <div
        className="w-full relative overflow-hidden"
        style={{
          marginTop: 0,
          boxShadow: "0 0 60px rgba(255,215,0,0.35), 0 4px 40px rgba(0,0,0,0.8)",
          borderBottom: "3px solid rgba(255,215,0,0.5)",
        }}
      >
        <img
          src="https://cdn.poehali.dev/projects/8f3786ff-152d-4575-aadd-164cd69b12ba/bucket/00f42151-1e89-4ea9-88b3-0caf70946c54.png"
          alt="Омск под защитой — рекламный баннер"
          className="w-full object-cover"
          style={{
            display: "block",
            maxHeight: "100vh",
            transition: "transform 0.4s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.02)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
        />
        {/* Золотое свечение поверх баннера */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 40% at 50% 50%, rgba(255,215,0,0.08) 0%, transparent 70%)",
            animation: "goldPulse 3s ease-in-out infinite",
          }}
        />
      </div>

      {/* ═══ ТЕКСТ ПОД БАННЕРОМ ═══ */}
      <div
        style={{
          background: "linear-gradient(180deg, #060d1f 0%, #0a1220 100%)",
          borderBottom: "1px solid rgba(255,215,0,0.15)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          {/* Манифест */}
          <div className="text-center mb-10">
            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(18px, 3vw, 28px)",
                color: "rgba(255,255,255,0.9)",
                lineHeight: 1.8,
                fontStyle: "italic",
                maxWidth: 820,
                margin: "0 auto",
              }}
            >
              «Главный визуальный баннер кампании — это не просто реклама.{" "}
              <span style={{ color: "#FFD700", fontStyle: "normal", fontWeight: 700 }}>Это манифест.</span>{" "}
              Образ, который меняет представление о Сибири: строгой, холодной, далёкой.
              Омск — тёплый, культурный, живой.»
            </p>
          </div>
          {/* Теги-пилюли */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: "🏛️", label: "Культура" },
              { icon: "🗺️", label: "Туризм" },
              { icon: "📜", label: "История" },
              { icon: "🍽️", label: "Гастрономия" },
            ].map((tag) => (
              <div
                key={tag.label}
                className="flex items-center gap-2 px-6 py-3 rounded-full"
                style={{
                  background: "rgba(255,215,0,0.08)",
                  border: "1px solid rgba(255,215,0,0.3)",
                  color: "#FFD700",
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                }}
              >
                <span>{tag.icon}</span>
                <span>{tag.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ О ПРОЕКТЕ ═══ */}
      <section
        id="about-project"
        className="py-24 px-4 sm:px-6"
        style={{ background: "linear-gradient(180deg, #0a1220, #060d1f)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest"
              style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)", color: "#FFD700" }}
            >
              ✦ О НАШЕМ ПРОЕКТЕ ✦
            </div>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(32px, 5vw, 60px)",
                fontWeight: 700,
                color: "#fff",
                marginBottom: 12,
              }}
            >
              Омск — <span style={{ color: "#FFD700" }}>больше, чем думают</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Герб */}
            <div
              className="rounded-3xl p-8 text-center flex flex-col items-center gap-4"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,215,0,0.2)",
                gridColumn: "1",
              }}
            >
              {/* Герб Омска SVG */}
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center text-5xl"
                style={{
                  background: "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,215,0,0.05))",
                  border: "2px solid rgba(255,215,0,0.4)",
                  boxShadow: "0 0 30px rgba(255,215,0,0.15)",
                }}
              >
                🦅
              </div>
              <h3
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#FFD700",
                }}
              >
                Герб Омска
              </h3>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.7 }}>
                На гербе Омска изображён золотой кадуцей (символ торговли и процветания) на фоне
                Омской крепости. С 2002 года — современный герб с синим щитом и золотым конём,
                олицетворяющим свободу, скорость и природную мощь Сибири.
              </p>
              <div
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: "rgba(255,215,0,0.12)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.3)" }}
              >
                Утверждён в 2002 году
              </div>
            </div>

            {/* О городе */}
            <div
              className="rounded-3xl p-8"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,215,0,0.2)",
              }}
            >
              <h3
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#FFD700",
                  marginBottom: 16,
                }}
              >
                Омск — ворота в Сибирь
              </h3>
              <div className="space-y-4">
                {[
                  { icon: "📍", title: "Основан в 1716 году", text: "Как военная крепость на слиянии рек Оми и Иртыша. Почти 300 лет истории." },
                  { icon: "👥", title: "1,1 млн жителей", text: "Второй по величине город Сибири. Крупнейший культурный центр за Уралом." },
                  { icon: "🏛️", title: "Культурная столица", text: "120+ музеев, театров и галерей. Более 250 памятников истории и культуры." },
                  { icon: "📚", title: "Достоевский и Омск", text: "1850–1854 гг. — Фёдор Достоевский на каторге. Именно здесь он написал «Записки из Мёртвого дома»." },
                  { icon: "🏒", title: "Спортивная гордость", text: "ХК «Авангард» — один из символов города. Омский хоккей известен по всей России." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ color: "#FFD700", fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{item.title}</div>
                      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.5 }}>{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* О сайте */}
            <div
              className="rounded-3xl p-8"
              style={{
                background: "linear-gradient(160deg, rgba(255,215,0,0.08), rgba(255,255,255,0.03))",
                border: "1px solid rgba(255,215,0,0.25)",
              }}
            >
              <h3
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#FFD700",
                  marginBottom: 16,
                }}
              >
                О нашем проекте
              </h3>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>
                Мы — команда <strong style={{ color: "#FFD700" }}>«Омск под защитой»</strong>, резиденты
                региональной профильной смены «Сириус-55». В рамках проектной деятельности мы
                разрабатываем рекламную кампанию для продвижения Омска как культурной столицы России.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  "🎯 Создание единого бренда города",
                  "📱 Цифровое продвижение туризма",
                  "🗺️ Авторские туристические маршруты",
                  "📊 Системный PR в федеральных СМИ",
                  "🎨 Визуальная культурная идентичность",
                ].map((item) => (
                  <div key={item} style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
                    {item}
                  </div>
                ))}
              </div>
              <div
                className="rounded-2xl p-4 text-center"
                style={{ background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.2)" }}
              >
                <div style={{ color: "#FFD700", fontSize: 13, fontWeight: 600 }}>🛡️ ОМСК ПОД ЗАЩИТОЙ</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 4 }}>Сириус-55 · Проектная деятельность · 2025</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ КАРТА ОМСКА ═══ */}
      <section id="map" className="py-24 px-4 sm:px-6" style={{ background: "#060d1f" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest"
              style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)", color: "#FFD700" }}
            >
              ✦ ИНТЕРАКТИВНАЯ КАРТА ✦
            </div>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(32px, 5vw, 60px)",
                fontWeight: 700,
                color: "#fff",
                marginBottom: 12,
              }}
            >
              Туристические <span style={{ color: "#FFD700" }}>точки Омска</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, maxWidth: 560, margin: "0 auto" }}>
              Нажмите на маркер — узнайте о месте и постройте маршрут прямо с карты
            </p>
          </div>
          <OmskInteractiveMap />
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ КРЕАТИВНЫЙ БЛОК — ОМСК-ТЕСТ ═══ */}
      <section
        id="fun"
        className="py-20 px-4 sm:px-6 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #060d1f, #0a1628)" }}
      >
        <div className="max-w-4xl mx-auto">
          <OmskQuiz />
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ HERO ═══ */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #060d1f 0%, #0d1b3e 40%, #0a1628 70%, #060d1f 100%)",
        }}
      >
        {/* Звёзды */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 2.5 + 0.5 + "px",
                height: Math.random() * 2.5 + 0.5 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                background: "#fff",
                animation: `starFloat ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 5}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Орнамент */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(255,215,0,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Падающие слова */}
        <FallingWords />

        {/* Контент */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-32">
          <div
            className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest"
            style={{
              background: "rgba(255,215,0,0.1)",
              border: "1px solid rgba(255,215,0,0.4)",
              color: "#FFD700",
              animation: "revealUp 0.6s ease-out forwards",
            }}
          >
            ✦ КУЛЬТУРНАЯ СТОЛИЦА СИБИРИ ✦
          </div>

          <h1
            className="hero-glow mb-6"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(40px, 8vw, 96px)",
              fontWeight: 700,
              lineHeight: 1,
              color: "#fff",
              animation: "revealUp 0.8s ease-out 0.2s both",
            }}
          >
            <span style={{ color: "#FFD700" }}>ОМСК.</span>
            <br />
            <span style={{ fontSize: "0.52em", letterSpacing: "0.08em", color: "rgba(255,255,255,0.9)" }}>
              Сердце Сибири —
            </span>
            <br />
            <span style={{ fontSize: "0.42em", letterSpacing: "0.12em", color: "rgba(255,215,0,0.85)" }}>
              культурная столица
            </span>
          </h1>

          <p
            className="max-w-3xl mx-auto mb-10 leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "clamp(14px, 2vw, 17px)",
              animation: "revealUp 0.8s ease-out 0.4s both",
            }}
          >
            Мы создаём рекламную кампанию, которая показывает Омск не просто как город, а как
            культурный центр России. Здесь история встречается с современным искусством, а традиции
            — с новыми смыслами. Наша цель — вдохновить вас открыть для себя Омск: город, где
            рождается культурный код Сибири.
          </p>

          <div
            className="flex flex-wrap gap-4 justify-center"
            style={{ animation: "revealUp 0.8s ease-out 0.6s both" }}
          >
            <button
              onClick={() => scrollTo("#services")}
              className="px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFA500)",
                color: "#0a0a0a",
                boxShadow: "0 8px 30px rgba(255,165,0,0.5)",
              }}
            >
              Выбрать тур
            </button>
            <button
              onClick={() => scrollTo("#omsk")}
              className="px-8 py-4 rounded-full font-semibold text-base transition-all hover:scale-105"
              style={{
                border: "2px solid rgba(255,215,0,0.5)",
                color: "#FFD700",
                background: "rgba(255,215,0,0.05)",
              }}
            >
              Узнать об Омске
            </button>
          </div>

          {/* Факты */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-3xl mx-auto"
            style={{ animation: "revealUp 0.8s ease-out 0.9s both" }}
          >
            {[
              { val: "300+", lab: "лет истории" },
              { val: "1.1M", lab: "жителей" },
              { val: "30 000", lab: "экспонатов Врубеля" },
              { val: "Top-1", lab: "культурный центр Сибири" },
            ].map((f) => (
              <div
                key={f.lab}
                className="py-4 px-2 rounded-2xl text-center"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,215,0,0.15)",
                }}
              >
                <div
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: 32,
                    fontWeight: 700,
                    color: "#FFD700",
                  }}
                >
                  {f.val}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
                  {f.lab}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Скролл индикатор */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ animation: "revealUp 1s ease-out 1.2s both" }}
        >
          <div style={{ fontSize: 11, color: "rgba(255,215,0,0.6)", letterSpacing: "0.2em" }}>
            ЛИСТАЙ ВНИЗ
          </div>
          <div
            className="w-6 h-10 rounded-full flex items-start justify-center p-1"
            style={{ border: "2px solid rgba(255,215,0,0.4)" }}
          >
            <div
              className="w-1 h-2 rounded-full"
              style={{
                background: "#FFD700",
                animation: "revealUp 1.5s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ УСЛУГИ ═══ */}
      <section id="services" className="py-24 px-4 sm:px-6" style={{ background: "linear-gradient(180deg, #060d1f, #0a1628)" }}>
        <div className="max-w-7xl mx-auto">
          {/* Заголовок */}
          <div
            ref={(el) => register(0)(el as HTMLElement | null)}
            className="text-center mb-16"
            style={{ opacity: 0, ...(visible[0] ? { animation: "revealUp 0.8s ease-out forwards" } : {}) }}
          >
            <div
              className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest"
              style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)", color: "#FFD700" }}
            >
              ✦ МОИ УСЛУГИ ✦
            </div>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(36px, 6vw, 64px)",
                fontWeight: 700,
                color: "#fff",
                marginBottom: 16,
              }}
            >
              Выберите своё{" "}
              <span style={{ color: "#FFD700" }}>приключение</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: 560, margin: "0 auto", fontSize: 16 }}>
              Три уникальных формата знакомства с Омском — каждый разработан для того,
              чтобы вы влюбились в этот город
            </p>
          </div>

          {/* Карточки услуг */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc, i) => (
              <div
                key={svc.id}
                ref={(el) => register(1 + i)(el as HTMLElement | null)}
                className="service-card rounded-3xl overflow-hidden relative flex flex-col"
                style={{
                  opacity: 0,
                  background: "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                  border: `1px solid rgba(255,215,0,0.15)`,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  ...(visible[1 + i]
                    ? {
                        animation: `revealUp 0.8s ease-out ${i * 0.15}s forwards`,
                      }
                    : {}),
                }}
              >
                {/* Верхняя часть */}
                <div
                  className="p-6 pb-4"
                  style={{
                    background: `linear-gradient(135deg, ${svc.accentColor}22, transparent)`,
                    borderBottom: `1px solid rgba(255,215,0,0.1)`,
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                      style={{
                        background: `${svc.accentColor}22`,
                        border: `1px solid ${svc.accentColor}44`,
                      }}
                    >
                      {svc.icon}
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: `${svc.accentColor}22`,
                        border: `1px solid ${svc.accentColor}44`,
                        color: svc.accentColor,
                      }}
                    >
                      {svc.badge}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: 4,
                    }}
                  >
                    {svc.title}
                  </h3>
                  <div style={{ fontSize: 13, color: svc.accentColor, fontWeight: 500 }}>{svc.subtitle}</div>
                </div>

                {/* Описание */}
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.7 }}>
                    {svc.desc}
                  </p>

                  {/* Включено */}
                  <div>
                    <div
                      className="text-xs font-semibold tracking-widest mb-3"
                      style={{ color: "rgba(255,215,0,0.7)" }}
                    >
                      ВКЛЮЧЕНО:
                    </div>
                    <ul className="flex flex-col gap-2">
                      {svc.includes.map((inc) => (
                        <li key={inc} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                          <span style={{ color: svc.accentColor, marginTop: 2, flexShrink: 0 }}>✓</span>
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Цена и кнопка */}
                  <div className="mt-auto pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="flex items-center gap-2 mb-4">
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>ЦЕНА:</span>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
                        {svc.price}
                      </span>
                    </div>
                    <Link
                      to={svc.payPath}
                      className="w-full block text-center py-3.5 rounded-2xl font-bold text-sm transition-all hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${svc.accentColor}, ${svc.accentColor}bb)`,
                        color: "#fff",
                        boxShadow: `0 4px 20px ${svc.accentColor}44`,
                      }}
                    >
                      Купить / Записаться →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ ОБ ОМСКЕ ═══ */}
      <section id="omsk" className="py-24 px-4 sm:px-6" style={{ background: "#060d1f" }}>
        <div className="max-w-7xl mx-auto">
          {/* Заголовок */}
          <div
            ref={(el) => register(4)(el as HTMLElement | null)}
            className="text-center mb-16"
            style={{ opacity: 0, ...(visible[4] ? { animation: "revealUp 0.8s ease-out forwards" } : {}) }}
          >
            <div
              className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest"
              style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)", color: "#FFD700" }}
            >
              ✦ СЕРДЦЕ СИБИРИ ✦
            </div>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(36px, 6vw, 64px)",
                fontWeight: 700,
                color: "#fff",
                marginBottom: 16,
              }}
            >
              Почему{" "}
              <span style={{ color: "#FFD700" }}>Омск</span>
              {" "}удивляет
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: 600, margin: "0 auto", fontSize: 16 }}>
              Омск — не просто город. Это место, где рождается культурный код всей Сибири
            </p>
          </div>

          {/* Текстовый блок + интересные факты */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div
              ref={(el) => register(5)(el as HTMLElement | null)}
              className="rounded-3xl p-8"
              style={{
                opacity: 0,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,215,0,0.15)",
                ...(visible[5] ? { animation: "revealLeft 0.8s ease-out forwards" } : {}),
              }}
            >
              <h3
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#FFD700",
                  marginBottom: 16,
                }}
              >
                Культурный код Сибири
              </h3>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 16 }}>
                Омск — это не просто второй по величине город Сибири. Это место, где история
                встречается с современным искусством, а традиции — с новыми смыслами. Здесь
                Достоевский стал Достоевским, здесь рождались картины Врубеля, здесь живёт
                легендарный «Авангард».
              </p>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>
                Мы создаём рекламный образ Омска, который ломает стереотипы. Это не просто
                туристический маршрут — это приглашение стать частью культурной истории. Увидеть
                Омск по-настоящему — значит открыть для себя настоящее сердце Сибири.
              </p>
            </div>

            <div
              ref={(el) => register(6)(el as HTMLElement | null)}
              className="rounded-3xl p-8"
              style={{
                opacity: 0,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,215,0,0.15)",
                ...(visible[6] ? { animation: "revealRight 0.8s ease-out forwards" } : {}),
              }}
            >
              <h3
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#FFD700",
                  marginBottom: 16,
                }}
              >
                10 фактов, которые вас удивят
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  { num: "01", emoji: "🏰", text: "Омской крепости — 300+ лет: именно отсюда начиналось завоевание Сибири" },
                  { num: "02", emoji: "📚", text: "Достоевский провёл здесь 4 года — в Омском остроге родился великий писатель" },
                  { num: "03", emoji: "🎭", text: "Театр драмы (1874 г.) старше многих европейских — один из лучших в России" },
                  { num: "04", emoji: "🌊", text: "Иртыш длиннее Волги — 4248 км, и его сердце бьётся в Омске" },
                  { num: "05", emoji: "🏒", text: "ХК «Авангард» выигрывал Кубок Гагарина — гордость всей Сибири" },
                  { num: "06", emoji: "🎨", text: "Музей Врубеля хранит 30 000+ шедевров — крупнейший арт-музей Сибири" },
                  { num: "07", emoji: "🌡️", text: "Зимой −40°C, летом +35°C — самый контрастный климат в России" },
                  { num: "08", emoji: "🏙️", text: "Омск занимал 2-е место по численности в Сибири — настоящий мегаполис" },
                  { num: "09", emoji: "⛪", text: "14 православных храмов в историческом центре — духовная столица Сибири" },
                  { num: "10", emoji: "🌆", text: "Любинский проспект — «Омский Арбат»: 130 лет истории за каждым фасадом" },
                ].map((fact) => (
                  <li key={fact.num} className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                    <span style={{ color: "#FFD700", fontWeight: 700, fontFamily: "Cormorant Garamond, serif", fontSize: 16, minWidth: 22, lineHeight: 1.6 }}>{fact.num}</span>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{fact.emoji}</span>
                    <span style={{ lineHeight: 1.6 }}>{fact.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Тизер алфавита */}
          <div
            ref={(el) => register(7)(el as HTMLElement | null)}
            className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
            style={{
              opacity: 0,
              background: "linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,165,0,0.04))",
              border: "1px solid rgba(255,215,0,0.25)",
              ...(visible[7] ? { animation: "revealUp 0.8s ease-out forwards" } : {}),
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,215,0,0.06), transparent)",
              }}
            />
            <div className="relative z-10">
              <div className="text-4xl mb-4">🎮</div>
              <h3
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(24px, 4vw, 40px)",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 12,
                }}
              >
                Скучно читать?{" "}
                <span style={{ color: "#FFD700" }}>Поиграй!</span>
              </h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, maxWidth: 500, margin: "0 auto 24px" }}>
                Разгадай «Омский Алфавит приключений» — 33 буквы, 33 причины влюбиться в этот город. С
                историями, юмором и секретами инсайдера!
              </p>
              <Link
                to="/alphabet"
                className="inline-block px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #FFD700, #FFA500)",
                  color: "#0a0a0a",
                  boxShadow: "0 8px 30px rgba(255,165,0,0.4)",
                }}
              >
                🔤 Начать игру — Омский Алфавит
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ СКРЕТЧ-КАРТА ═══ */}
      <section
        id="scratch"
        className="py-24 px-4 sm:px-6"
        style={{ background: "linear-gradient(180deg, #060d1f, #0a1628 50%, #060d1f)" }}
      >
        <div className="max-w-2xl mx-auto">
          <div
            ref={(el) => register(8)(el as HTMLElement | null)}
            className="text-center mb-12"
            style={{ opacity: 0, ...(visible[8] ? { animation: "revealUp 0.8s ease-out forwards" } : {}) }}
          >
            <div
              className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest"
              style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)", color: "#FFD700" }}
            >
              ✦ ДЛЯ НАШИХ ГОСТЕЙ ✦
            </div>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 700,
                color: "#fff",
                marginBottom: 12,
              }}
            >
              <span style={{ color: "#FFD700" }}>ОМСК ПОД ЗАЩИТОЙ</span>
              <br />
              <span style={{ fontSize: "0.65em", color: "rgba(255,255,255,0.85)" }}>Твой персональный приз</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16 }}>
              Потри карточку в стиле Омска и узнай свой бонус при записи на тур.<br />
              <span style={{ color: "rgba(255,215,0,0.6)", fontSize: 14 }}>Каждый раз — новый приз!</span>
            </p>
          </div>

          <div
            ref={(el) => register(9)(el as HTMLElement | null)}
            style={{ opacity: 0, ...(visible[9] ? { animation: "revealUp 0.8s ease-out 0.2s forwards" } : {}) }}
          >
            <ScratchCard />
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ ДОСТОПРИМЕЧАТЕЛЬНОСТИ ═══ */}
      <section
        id="attractions"
        className="py-24 px-4 sm:px-6"
        style={{ background: "#060d1f" }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            ref={(el) => register(10)(el as HTMLElement | null)}
            className="text-center mb-16"
            style={{ opacity: 0, ...(visible[10] ? { animation: "revealUp 0.8s ease-out forwards" } : {}) }}
          >
            <div
              className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest"
              style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)", color: "#FFD700" }}
            >
              ✦ ДОСТОПРИМЕЧАТЕЛЬНОСТИ ОМСКА ✦
            </div>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(36px, 6vw, 64px)",
                fontWeight: 700,
                color: "#fff",
                marginBottom: 16,
              }}
            >
              Места, которые{" "}
              <span style={{ color: "#FFD700" }}>покоряют</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: 560, margin: "0 auto", fontSize: 16 }}>
              Архитектура, история, природа — Омск умеет удивлять на каждом шагу
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ATTRACTIONS.map((attr, i) => (
              <div
                key={attr.id}
                ref={(el) => register(11 + i)(el as HTMLElement | null)}
                className="attr-card rounded-3xl overflow-hidden relative group"
                style={{
                  opacity: 0,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                  ...(visible[11 + i]
                    ? { animation: `revealUp 0.7s ease-out ${(i % 3) * 0.12}s forwards` }
                    : {}),
                }}
              >
                {/* Изображение */}
                <div className="relative overflow-hidden" style={{ height: 200 }}>
                  <img
                    src={attr.img}
                    alt={attr.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const fb = (attr as { imgFallback?: string }).imgFallback;
                      if (fb && target.src !== fb && !target.src.includes("picsum")) {
                        target.src = fb;
                      } else if (!target.src.includes("picsum")) {
                        target.src = `https://picsum.photos/seed/omsk${attr.id + 100}/600/400`;
                      }
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(6,13,31,0.9) 0%, rgba(6,13,31,0.2) 50%, transparent 100%)",
                    }}
                  />
                  {/* Категория */}
                  <div
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: "rgba(255,215,0,0.15)",
                      border: "1px solid rgba(255,215,0,0.4)",
                      color: "#FFD700",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {attr.category}
                  </div>
                  {/* Эмодзи */}
                  <div
                    className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-lg"
                    style={{ background: "rgba(6,13,31,0.7)", backdropFilter: "blur(8px)" }}
                  >
                    {attr.emoji}
                  </div>
                </div>

                {/* Контент */}
                <div className="p-5">
                  <h3
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: 8,
                    }}
                  >
                    {attr.name}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.6 }}>
                    {attr.desc}
                  </p>
                </div>

                {/* Декоративная полоска при hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-500 group-hover:opacity-100"
                  style={{
                    background: "linear-gradient(90deg, transparent, #FFD700, transparent)",
                    opacity: 0,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ КОНТАКТЫ ═══ */}
      <section
        id="contacts"
        className="py-24 px-4 sm:px-6"
        style={{
          background: "linear-gradient(160deg, #060d1f, #0d1b3e)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div
            ref={(el) => register(20)(el as HTMLElement | null)}
            className="text-center mb-16"
            style={{ opacity: 0, ...(visible[20] ? { animation: "revealUp 0.8s ease-out forwards" } : {}) }}
          >
            <div
              className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest"
              style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)", color: "#FFD700" }}
            >
              ✦ СВЯЗАТЬСЯ ✦
            </div>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(36px, 6vw, 64px)",
                fontWeight: 700,
                color: "#fff",
                marginBottom: 12,
              }}
            >
              Хотите открыть Омск{" "}
              <span style={{ color: "#FFD700" }}>по-новому?</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, maxWidth: 620, margin: "0 auto", lineHeight: 1.8 }}>
              Напишите мне — помогу спланировать маршрут, расскажу о культурных событиях, подскажу,
              где почувствовать настоящий сибирский ритм. Отвечу быстро, потому что я здесь, чтобы
              вы влюбились в этот город.
            </p>
          </div>

          <div
            ref={(el) => register(21)(el as HTMLElement | null)}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
            style={{ opacity: 0, ...(visible[21] ? { animation: "revealUp 0.8s ease-out 0.2s forwards" } : {}) }}
          >
            {[
              {
                icon: "✈️",
                label: "Telegram",
                value: "@h7umi",
                sub: "Быстрый ответ",
                href: "https://t.me/h7umi",
                color: "#2AABEE",
              },
              {
                icon: "📱",
                label: "WhatsApp",
                value: "+7 (913) 123-45-67",
                sub: "Голос / текст",
                href: "https://wa.me/79131234567",
                color: "#25D366",
              },
              {
                icon: "📞",
                label: "Телефон",
                value: "+7 (913) 123-45-67",
                sub: "Звоните с 9:00 до 21:00",
                href: "tel:+79131234567",
                color: "#FFD700",
              },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-3xl p-6 text-center flex flex-col items-center gap-3 transition-all hover:scale-105 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${c.color}33`,
                  boxShadow: `0 4px 24px ${c.color}11`,
                  textDecoration: "none",
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: `${c.color}22`, border: `1px solid ${c.color}44` }}
                >
                  {c.icon}
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginBottom: 4 }}>
                    {c.label}
                  </div>
                  <div style={{ fontWeight: 700, color: c.color, fontSize: 16 }}>{c.value}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{c.sub}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Девиз */}
          <div
            ref={(el) => register(22)(el as HTMLElement | null)}
            className="rounded-3xl p-8 text-center"
            style={{
              opacity: 0,
              background: "rgba(255,215,0,0.05)",
              border: "1px solid rgba(255,215,0,0.2)",
              ...(visible[22] ? { animation: "revealUp 0.8s ease-out 0.4s forwards" } : {}),
            }}
          >
            <div className="text-3xl mb-3">🌟</div>
            <h3
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 22,
                fontWeight: 700,
                color: "#FFD700",
                marginBottom: 8,
              }}
            >
              Омск — культурная столица России
            </h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.8, maxWidth: 520, margin: "0 auto" }}>
              Здесь рождается новый взгляд на Сибирь. Мы создаём рекламный образ, который ломает
              стереотипы и приглашает в путешествие. Увидеть Омск по-настоящему — значит стать
              частью этой истории.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ ФУТЕР ═══ */}
      <footer
        style={{
          background: "#030914",
          borderTop: "1px solid rgba(255,215,0,0.15)",
          padding: "40px 24px 24px",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Лого + описание */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                  style={{ background: "linear-gradient(135deg, #FFD700, #FFA500)" }}
                >
                  🏙️
                </div>
                <div>
                  <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, fontWeight: 700, color: "#FFD700" }}>
                    Омск
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em" }}>
                    ОМСК ПОД ЗАЩИТОЙ
                  </div>
                </div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.7 }}>
                Омск — культурная столица России. Здесь рождается новый взгляд на Сибирь.
              </p>
            </div>

            {/* Быстрые ссылки */}
            <div>
              <div style={{ fontWeight: 600, color: "#FFD700", marginBottom: 16, fontSize: 13, letterSpacing: "0.1em" }}>
                РАЗДЕЛЫ
              </div>
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) =>
                  item.href.startsWith("/") ? (
                    <Link
                      key={item.label}
                      to={item.href}
                      style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, textDecoration: "none" }}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={item.label}
                      onClick={() => scrollTo(item.href)}
                      style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                    >
                      {item.label}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Контакты */}
            <div>
              <div style={{ fontWeight: 600, color: "#FFD700", marginBottom: 16, fontSize: 13, letterSpacing: "0.1em" }}>
                КОНТАКТЫ
              </div>
              <div className="flex flex-col gap-3">
                <a href="https://t.me/h7umi" target="_blank" rel="noreferrer" style={{ color: "#2AABEE", fontSize: 14, textDecoration: "none" }}>
                  ✈️ Telegram: @h7umi
                </a>
                <a href="https://wa.me/79131234567" target="_blank" rel="noreferrer" style={{ color: "#25D366", fontSize: 14, textDecoration: "none" }}>
                  📱 WhatsApp: +7 (913) 123-45-67
                </a>
                <a href="tel:+79131234567" style={{ color: "#FFD700", fontSize: 14, textDecoration: "none" }}>
                  📞 +7 (913) 123-45-67
                </a>
              </div>
            </div>
          </div>

          <div
            className="pt-6 text-center text-xs"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            © 2025 Омск Инсайдер. Все права защищены. Город на слиянии Оми и Иртыша 🌊
          </div>
        </div>
      </footer>
    </div>
  );
}