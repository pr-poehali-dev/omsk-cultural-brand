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
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Omsk_Serafimо_chapel.jpg/800px-Omsk_Serafimo_chapel.jpg",
    imgFallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Serafimо-Alekseyevskaya_Chapel%2C_Omsk%2C_Russia.jpg/800px-Serafimo-Alekseyevskaya_Chapel%2C_Omsk%2C_Russia.jpg",
    category: "Архитектура",
  },
  {
    id: 6,
    name: "Успенский собор",
    desc: "Величественный Успенский кафедральный собор на Соборной площади — духовный центр Омска и один из красивейших храмов Сибири.",
    emoji: "🕍",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Assumption_Cathedral%2C_Omsk%2C_Russia_-_panoramio.jpg/800px-Assumption_Cathedral%2C_Omsk%2C_Russia_-_panoramio.jpg",
    imgFallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Uspenski_sobor_Omsk.jpg/800px-Uspenski_sobor_Omsk.jpg",
    category: "Архитектура",
  },
  {
    id: 7,
    name: "G-Drive Арена",
    desc: "Современная домашняя арена легендарного ХК «Авангард». Хоккейные матчи здесь — это настоящий праздник и оглушительная атмосфера.",
    emoji: "🏒",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/G-Drive_Arena_Omsk_exterior.jpg/800px-G-Drive_Arena_Omsk_exterior.jpg",
    imgFallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Avangard_Arena_Omsk.jpg/800px-Avangard_Arena_Omsk.jpg",
    category: "Спорт",
  },
  {
    id: 8,
    name: "Любинский проспект",
    desc: "Главный бульвар Омска с историческими зданиями XIX–XX веков. Прогулка по нему — это путешествие сквозь эпохи и архитектурные стили.",
    emoji: "🌆",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Lyubinsky_Prospect%2C_Omsk.jpg/800px-Lyubinsky_Prospect%2C_Omsk.jpg",
    imgFallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Omsk_Lubinsk_prospect.jpg/800px-Omsk_Lubinsk_prospect.jpg",
    category: "Архитектура",
  },
  {
    id: 9,
    name: "Музей Достоевского",
    desc: "Ф. М. Достоевский провёл в Омске 4 года на каторге. Музей хранит уникальные артефакты и документы об этом периоде жизни великого писателя.",
    emoji: "📚",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Omsk_Dostoevsky_Museum.jpg/800px-Omsk_Dostoevsky_Museum.jpg",
    imgFallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Dostoevsky_Literary_Museum_Omsk.jpg/800px-Dostoevsky_Literary_Museum_Omsk.jpg",
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

    // Фон скретч-слоя в стиле Омска — тёмно-синий с золотом
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "#0d1b3e");
    grad.addColorStop(0.4, "#1a2a5e");
    grad.addColorStop(0.7, "#0a1628");
    grad.addColorStop(1, "#1a0a2e");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Орнамент — золотые звёзды (символ Сибири)
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(255,215,0,${0.05 + Math.random() * 0.2})`;
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 2.5 + 0.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Декоративная рамка
    ctx.strokeStyle = "rgba(255,215,0,0.4)";
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

    // Верхний текст — «ОМСК ПОД ЗАЩИТОЙ»
    ctx.fillStyle = "rgba(255,215,0,0.95)";
    ctx.font = "bold 13px Montserrat, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("★ ОМСК ПОД ЗАЩИТОЙ ★", canvas.width / 2, 36);

    // Разделитель
    ctx.strokeStyle = "rgba(255,215,0,0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(24, 48);
    ctx.lineTo(canvas.width - 24, 48);
    ctx.stroke();

    // Основной текст
    ctx.fillStyle = "rgba(255,215,0,0.9)";
    ctx.font = "bold 15px Montserrat, sans-serif";
    ctx.fillText("🏙️ Потри карточку!", canvas.width / 2, canvas.height / 2 - 12);
    ctx.font = "12px Montserrat, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.fillText("Твой бонус при записи на тур", canvas.width / 2, canvas.height / 2 + 14);

    // Нижний текст
    ctx.fillStyle = "rgba(255,215,0,0.6)";
    ctx.font = "11px Montserrat, sans-serif";
    ctx.fillText("Здесь начинается Сибирь", canvas.width / 2, canvas.height - 16);
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
  { label: "Услуги", href: "#services" },
  { label: "Омск", href: "#omsk" },
  { label: "Интерактив", href: "#scratch" },
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