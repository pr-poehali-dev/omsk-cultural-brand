import { useState, useEffect, useRef } from "react";

/* ──────────── ДАННЫЕ ──────────── */
const LANDMARKS = [
  {
    id: 1,
    name: "Омская крепость",
    desc: "Историческая крепость XVIII века — место основания Омска. Восстановленные бастионы, Тобольские ворота и уникальные музейные экспозиции перенесут вас в эпоху освоения Сибири.",
    x: 50.5, y: 55,
    category: "История",
    emoji: "🏰",
    yandex: "https://yandex.ru/maps/66/omsk/?ll=73.366500,54.990800&z=17&text=Омская+крепость",
    google: "https://maps.google.com/?q=Омская+крепость,+Омск",
  },
  {
    id: 2,
    name: "Литературный музей им. Достоевского",
    desc: "Ф. М. Достоевский провёл в Омске 4 года на каторге. Музей хранит уникальные артефакты и документы, связанные с пребыванием великого писателя в Омском остроге.",
    x: 52, y: 50,
    category: "Культура",
    emoji: "📚",
    yandex: "https://yandex.ru/maps/66/omsk/?ll=73.371000,54.993000&z=17&text=Музей+Достоевского+Омск",
    google: "https://maps.google.com/?q=Литературный+музей+Достоевского+Омск",
  },
  {
    id: 3,
    name: "Омский государственный театр драмы",
    desc: "Один из старейших театров Сибири (1874 г.). Великолепное историческое здание в стиле классицизма и богатый репертуар — от классики до авангарда.",
    x: 48, y: 44,
    category: "Искусство",
    emoji: "🎭",
    yandex: "https://yandex.ru/maps/66/omsk/?ll=73.369000,54.998000&z=17&text=Омский+театр+драмы",
    google: "https://maps.google.com/?q=Омский+государственный+театр+драмы",
  },
  {
    id: 4,
    name: "Омский областной музей изобразительных искусств им. Врубеля",
    desc: "Крупнейший художественный музей Сибири с коллекцией более 30 000 экспонатов: от древнерусской иконописи до современного искусства. Гордость — работы Врубеля.",
    x: 46, y: 49,
    category: "Искусство",
    emoji: "🎨",
    yandex: "https://yandex.ru/maps/66/omsk/?ll=73.367000,54.995000&z=17&text=Музей+Врубеля+Омск",
    google: "https://maps.google.com/?q=Омский+музей+изобразительных+искусств+им+Врубеля",
  },
  {
    id: 5,
    name: "Серафимо-Алексеевская часовня",
    desc: "Изящная часовня начала XX века, восстановленная в 1990-х. Жемчужина Омска с уникальной архитектурой — символ возрождения духовной жизни города.",
    x: 54, y: 43,
    category: "Архитектура",
    emoji: "⛪",
    yandex: "https://yandex.ru/maps/66/omsk/?ll=73.369500,55.001000&z=17&text=Серафимо-Алексеевская+часовня+Омск",
    google: "https://maps.google.com/?q=Серафимо-Алексеевская+часовня+Омск",
  },
  {
    id: 6,
    name: "Набережная Иртыша",
    desc: "Живописная набережная вдоль Иртыша — любимое место отдыха омичей и туристов. Прогулки, кафе, смотровые площадки с захватывающим видом на реку.",
    x: 42, y: 58,
    category: "Природа",
    emoji: "🌊",
    yandex: "https://yandex.ru/maps/66/omsk/?ll=73.362000,54.985000&z=16&text=Набережная+Иртыша+Омск",
    google: "https://maps.google.com/?q=Набережная+Иртыша+Омск",
  },
  {
    id: 7,
    name: "Соборная площадь",
    desc: "Главная площадь Омска с восстановленным Успенским кафедральным собором. Сердце городской жизни, место городских праздников и торжеств.",
    x: 56, y: 37,
    category: "Архитектура",
    emoji: "🕍",
    yandex: "https://yandex.ru/maps/66/omsk/?ll=73.370000,55.006000&z=17&text=Соборная+площадь+Омск",
    google: "https://maps.google.com/?q=Соборная+площадь+Омск",
  },
  {
    id: 8,
    name: "G-Drive Арена",
    desc: "Современный спортивно-развлекательный комплекс — домашняя арена ХК «Авангард». Хоккейные матчи, концерты и крупные мероприятия.",
    x: 63, y: 30,
    category: "Спорт",
    emoji: "🏒",
    yandex: "https://yandex.ru/maps/66/omsk/?ll=73.381000,55.014000&z=16&text=G-Drive+Арена+Омск",
    google: "https://maps.google.com/?q=G-Drive+Арена+Омск",
  },
  {
    id: 9,
    name: "Омский государственный цирк",
    desc: "Один из лучших цирков Сибири с захватывающими программами для всей семьи. Уникальное здание с великолепной куполообразной архитектурой.",
    x: 38, y: 38,
    category: "Развлечения",
    emoji: "🎪",
    yandex: "https://yandex.ru/maps/66/omsk/?ll=73.355000,55.003000&z=17&text=Омский+цирк",
    google: "https://maps.google.com/?q=Омский+государственный+цирк",
  },
  {
    id: 10,
    name: "Сибирский культурный центр",
    desc: "Туристический информационный центр Омска. Здесь можно получить карты, буклеты, записаться на экскурсии и узнать всё о культурной жизни города.",
    x: 58, y: 62,
    category: "Туризм",
    emoji: "ℹ️",
    yandex: "https://yandex.ru/maps/66/omsk/?ll=73.374000,54.978000&z=17&text=Туристический+центр+Омск",
    google: "https://maps.google.com/?q=Туристический+информационный+центр+Омск",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "История":       "#FFD700",
  "Культура":      "#E879F9",
  "Искусство":     "#22D3EE",
  "Архитектура":   "#F97316",
  "Природа":       "#4ADE80",
  "Спорт":         "#F43F5E",
  "Развлечения":   "#A78BFA",
  "Туризм":        "#38BDF8",
};

const STRATEGIES = [
  {
    icon: "🎯",
    title: "Единый бренд «Культурная столица»",
    text: "Создание узнаваемой визуальной идентичности города на основе образов Достоевского, Иртыша и сибирской архитектуры. Единый стиль во всех коммуникациях — от указателей до соцсетей.",
  },
  {
    icon: "📱",
    title: "Цифровое продвижение",
    text: "Активное ведение социальных сетей, таргетированная реклама на туристические аудитории, коллаборации с тревел-блогерами и создание вирусного контента об Омске.",
  },
  {
    icon: "🎨",
    title: "Культурные события",
    text: "Организация федеральных фестивалей, форумов и выставок, которые привлекают туристов из других регионов. Событийный туризм — мощный инструмент повышения потока.",
  },
  {
    icon: "🗺️",
    title: "Туристические маршруты",
    text: "Разработка тематических маршрутов: «По следам Достоевского», «Архитектурный Омск», «Иртышская набережная». Включение в федеральные туристические программы.",
  },
  {
    icon: "🤝",
    title: "Партнёрства и PR",
    text: "Сотрудничество с федеральными СМИ, туроператорами и крупными компаниями для размещения рекламы Омска в федеральном и международном медиапространстве.",
  },
  {
    icon: "📊",
    title: "Аналитика и мониторинг",
    text: "Отслеживание туристического потока, анализ эффективности кампаний и регулярная актуализация стратегии на основе данных. Чёткие KPI и целевые показатели роста.",
  },
];

const FACTS = [
  { value: "300+", label: "лет истории" },
  { value: "1.1M", label: "жителей" },
  { value: "Top-3", label: "театров Сибири" },
  { value: "4 года", label: "Достоевский в Омске" },
];

/* ──────────── КОМПОНЕНТ КАРТЫ ──────────── */
function OmskMap() {
  const [activePinId, setActivePinId] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const activePin = LANDMARKS.find((l) => l.id === activePinId);

  const handlePinClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (activePinId === id) {
      setActivePinId(null);
      setTooltipPos(null);
      return;
    }
    const rect = mapRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setTooltipPos({ x, y });
    }
    setActivePinId(id);
  };

  return (
    <div className="relative w-full" ref={mapRef} onClick={() => { setActivePinId(null); setTooltipPos(null); }}>
      {/* Карта через OpenStreetMap iframe */}
      <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: "560px", boxShadow: "0 0 60px rgba(255,215,0,0.15), 0 20px 60px rgba(0,0,0,0.5)" }}>
        <iframe
          title="Карта Омска"
          src="https://www.openstreetmap.org/export/embed.html?bbox=73.28%2C54.95%2C73.45%2C55.05&layer=mapnik&marker=54.9924%2C73.3686"
          style={{ width: "100%", height: "100%", border: "none", borderRadius: "16px", filter: "hue-rotate(200deg) saturate(0.7) brightness(0.8)" }}
          loading="lazy"
        />
        {/* Оверлей с цветом */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(0,15,40,0.25) 0%, transparent 50%, rgba(0,15,40,0.25) 100%)", borderRadius: "16px" }} />
        {/* Пины поверх карты */}
        {LANDMARKS.map((lm) => (
          <button
            key={lm.id}
            className="absolute map-pin group"
            style={{ left: `${lm.x}%`, top: `${lm.y}%`, transform: "translate(-50%, -50%)", zIndex: 10 }}
            onClick={(e) => handlePinClick(e, lm.id)}
            title={lm.name}
          >
            <div className="relative flex items-center justify-center">
              {/* Кольцо-пульсация */}
              {activePinId === lm.id && (
                <span className="absolute w-10 h-10 rounded-full animate-ripple" style={{ background: CATEGORY_COLORS[lm.category] + "33" }} />
              )}
              {/* Основной пин */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-base font-bold shadow-lg transition-all duration-200 group-hover:scale-125"
                style={{
                  background: activePinId === lm.id
                    ? `linear-gradient(135deg, ${CATEGORY_COLORS[lm.category]}, ${CATEGORY_COLORS[lm.category]}cc)`
                    : "rgba(0,15,40,0.85)",
                  border: `2.5px solid ${CATEGORY_COLORS[lm.category]}`,
                  boxShadow: `0 0 15px ${CATEGORY_COLORS[lm.category]}66`,
                  backdropFilter: "blur(8px)",
                }}
              >
                {lm.emoji}
              </div>
            </div>
          </button>
        ))}
        {/* Тултип */}
        {activePin && tooltipPos && (
          <div
            className="map-tooltip pointer-events-auto"
            style={{
              left: tooltipPos.x > (mapRef.current?.offsetWidth || 600) / 2 ? tooltipPos.x - 260 : tooltipPos.x + 20,
              top: Math.min(tooltipPos.y - 20, (mapRef.current?.offsetHeight || 500) - 220),
              pointerEvents: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{activePin.emoji}</span>
              <div>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: CATEGORY_COLORS[activePin.category] + "33", color: CATEGORY_COLORS[activePin.category] }}
                >
                  {activePin.category}
                </span>
              </div>
            </div>
            <h4 className="text-white font-bold text-sm mb-2 leading-tight">{activePin.name}</h4>
            <p className="text-white/70 text-xs leading-relaxed mb-3">{activePin.desc}</p>
            <div className="flex gap-2">
              <a
                href={activePin.yandex}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-1.5 px-2 rounded-lg text-xs font-semibold transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #FC3F1D, #FF6534)", color: "#fff" }}
              >
                🗺 Яндекс
              </a>
              <a
                href={activePin.google}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-1.5 px-2 rounded-lg text-xs font-semibold transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #4285F4, #34A853)", color: "#fff" }}
              >
                🌐 Google
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Легенда */}
      <div className="mt-5 flex flex-wrap gap-2 justify-center">
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <span key={cat} className="flex items-center gap-1.5 text-xs text-white/70 px-3 py-1 rounded-full" style={{ background: color + "22", border: `1px solid ${color}55` }}>
            <span className="w-2 h-2 rounded-full" style={{ background: color }} />
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ──────────── КОМПОНЕНТ АНИМИРОВАННОГО НЕБА ──────────── */
function AnimatedSkyBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Основной градиент — вечерний Омск */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, #0a0520 0%, #1a0a3e 20%, #2d1b5e 35%, #4a2878 45%, #7a3e8c 55%, #b5607a 65%, #e88860 75%, #f4a96e 80%, #1a2a4a 85%, #0d1a35 100%)"
      }} />

      {/* Звёзды */}
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 55}%`,
            width: `${Math.random() * 2.5 + 1}px`,
            height: `${Math.random() * 2.5 + 1}px`,
            background: "#fff",
            opacity: 0.4 + Math.random() * 0.6,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 4}s`,
          }}
        />
      ))}

      {/* Полярное сияние */}
      <div className="absolute animate-aurora" style={{
        top: "5%", left: "10%", right: "10%", height: "30%",
        background: "radial-gradient(ellipse, rgba(80,200,150,0.15) 0%, rgba(100,80,200,0.1) 50%, transparent 80%)",
        filter: "blur(30px)",
      }} />

      {/* Облака */}
      <div className="cloud-1 absolute" style={{ top: "18%", opacity: 0.12 }}>
        <svg width="300" height="80" viewBox="0 0 300 80">
          <ellipse cx="150" cy="50" rx="140" ry="30" fill="white" />
          <ellipse cx="100" cy="40" rx="70" ry="25" fill="white" />
          <ellipse cx="200" cy="38" rx="80" ry="28" fill="white" />
        </svg>
      </div>
      <div className="cloud-2 absolute" style={{ top: "28%", opacity: 0.08 }}>
        <svg width="400" height="100" viewBox="0 0 400 100">
          <ellipse cx="200" cy="65" rx="190" ry="35" fill="white" />
          <ellipse cx="130" cy="50" rx="100" ry="35" fill="white" />
          <ellipse cx="280" cy="45" rx="110" ry="38" fill="white" />
        </svg>
      </div>
      <div className="cloud-3 absolute" style={{ top: "12%", opacity: 0.09 }}>
        <svg width="250" height="70" viewBox="0 0 250 70">
          <ellipse cx="125" cy="45" rx="115" ry="24" fill="white" />
          <ellipse cx="80" cy="35" rx="60" ry="22" fill="white" />
          <ellipse cx="170" cy="32" rx="70" ry="24" fill="white" />
        </svg>
      </div>

      {/* Силуэт города Омска */}
      <div className="absolute bottom-0 left-0 right-0 animate-float-city" style={{ height: "42%", zIndex: 1 }}>
        <svg viewBox="0 0 1440 350" preserveAspectRatio="xMidYMax slice" className="w-full h-full">
          {/* Дальний план — тёмно-синий */}
          <g fill="#0d1a35" opacity="0.9">
            {/* Жилые дома вдали */}
            <rect x="0" y="200" width="60" height="150" />
            <rect x="10" y="175" width="40" height="25" />
            <rect x="15" y="160" width="30" height="15" />
            <rect x="70" y="185" width="80" height="165" />
            <rect x="80" y="165" width="60" height="20" />
            <rect x="160" y="195" width="50" height="155" />
            <rect x="170" y="170" width="30" height="25" />
            <rect x="220" y="180" width="70" height="170" />
            <rect x="230" y="155" width="50" height="25" />
            <rect x="300" y="190" width="55" height="160" />
            <rect x="365" y="185" width="65" height="165" />
            <rect x="375" y="160" width="45" height="25" />
            <rect x="440" y="195" width="45" height="155" />
            <rect x="495" y="175" width="75" height="175" />
            <rect x="500" y="150" width="65" height="25" />
            <rect x="580" y="190" width="55" height="160" />
            <rect x="645" y="185" width="70" height="165" />
            <rect x="650" y="155" width="60" height="30" />
            <rect x="725" y="195" width="50" height="155" />
            <rect x="785" y="180" width="65" height="170" />
            <rect x="790" y="155" width="55" height="25" />
            <rect x="860" y="190" width="60" height="160" />
            <rect x="930" y="185" width="75" height="165" />
            <rect x="935" y="155" width="65" height="30" />
            <rect x="1015" y="195" width="50" height="155" />
            <rect x="1075" y="175" width="70" height="175" />
            <rect x="1080" y="150" width="60" height="25" />
            <rect x="1155" y="190" width="55" height="160" />
            <rect x="1220" y="180" width="70" height="170" />
            <rect x="1225" y="155" width="60" height="25" />
            <rect x="1300" y="195" width="50" height="155" />
            <rect x="1360" y="185" width="80" height="165" />
          </g>

          {/* Средний план — тёмно-синий, насыщеннее */}
          <g fill="#0a1428" opacity="0.95">
            {/* Театр драмы — колонны */}
            <rect x="380" y="130" width="160" height="220" />
            <rect x="390" y="110" width="140" height="20" />
            <rect x="395" y="90" width="130" height="20" />
            <rect x="410" y="75" width="100" height="15" />
            {/* Колонны */}
            {[400, 420, 440, 460, 480, 500, 520].map((x, i) => (
              <rect key={i} x={x} y="130" width="10" height="80" fill="#0d2040" />
            ))}

            {/* Башни и высотки */}
            <rect x="220" y="100" width="55" height="250" />
            <rect x="235" y="80" width="25" height="20" />
            <rect x="244" y="62" width="7" height="18" />

            {/* Купол/церковь */}
            <path d="M 700 350 L 700 160 Q 720 120 740 160 L 740 350 Z" />
            <path d="M 715 160 Q 720 100 725 90 Q 730 100 735 160 Z" />
            <line x1="722" y1="90" x2="722" y2="55" stroke="#0a1428" strokeWidth="3" />
            <rect x="718" y="60" width="8" height="30" />

            {/* G-Drive Арена — куполообразная */}
            <path d="M 1050 350 L 1050 200 Q 1130 130 1210 200 L 1210 350 Z" />
            <ellipse cx="1130" cy="200" rx="80" ry="40" />

            {/* Омский острог */}
            <rect x="600" y="155" width="90" height="195" />
            <polygon points="600,155 630,120 660,155" />
            <polygon points="640,155 670,120 700,155" />
            <rect x="605" y="210" width="20" height="35" />

            {/* Жилые высотки */}
            <rect x="50" y="140" width="50" height="210" />
            <rect x="60" y="120" width="30" height="20" />
            <rect x="850" y="150" width="45" height="200" />
            <rect x="858" y="130" width="30" height="20" />
            <rect x="1300" y="145" width="55" height="205" />
            <rect x="1310" y="125" width="35" height="20" />

            {/* Огни в окнах */}
          </g>

          {/* Передний план — самый тёмный */}
          <g fill="#060e1e">
            {/* Набережная */}
            <rect x="0" y="310" width="1440" height="40" />
            {/* Деревья вдоль набережной */}
            {Array.from({ length: 20 }).map((_, i) => (
              <g key={i}>
                <rect x={30 + i * 72} y="270" width="6" height="40" />
                <ellipse cx={33 + i * 72} cy="265" rx="18" ry="22" />
              </g>
            ))}
          </g>

          {/* Отражение в воде */}
          <g fill="none" opacity="0.25">
            <rect x="0" y="320" width="1440" height="30" fill="url(#waterGrad)" />
          </g>
          <defs>
            <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a3a6e" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#060e1e" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Огни в окнах — точки */}
          <g opacity="0.7">
            {[
              [85, 200], [90, 215], [95, 230], [100, 200], [105, 220],
              [240, 170], [245, 185], [250, 200], [230, 190],
              [400, 175], [420, 180], [440, 175], [460, 185],
              [620, 200], [635, 215], [640, 225],
              [870, 195], [880, 210], [885, 225],
              [1060, 230], [1080, 240], [1100, 235], [1120, 250],
              [1315, 195], [1325, 210], [1320, 225],
              [55, 180], [65, 195], [75, 210], [60, 220],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="2" fill="#FFF4B0" opacity={0.6 + (i % 3) * 0.1} />
            ))}
          </g>
        </svg>
      </div>

      {/* Отражение в реке */}
      <div className="absolute bottom-0 left-0 right-0 animate-float-slow" style={{ height: "18%", zIndex: 0 }}>
        <div style={{
          width: "100%", height: "100%",
          background: "linear-gradient(180deg, rgba(10,25,60,0.8) 0%, rgba(5,15,35,0.95) 100%)",
        }} />
      </div>
    </div>
  );
}

/* ──────────── ГЛАВНЫЙ КОМПОНЕНТ ──────────── */
export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.id) {
            setVisibleSections((prev) => new Set([...prev, e.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ fontFamily: "'Montserrat', sans-serif", background: "#060e1e" }}>
      <AnimatedSkyBackground />

      {/* ══════════════ НАВИГАЦИЯ ══════════════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(6,14,30,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,215,0,0.15)" : "none",
          padding: scrolled ? "12px 0" : "20px 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: "linear-gradient(135deg, #FFD700, #FFA500)" }}>
              🛡️
            </div>
            <div>
              <div className="font-bold text-white text-sm tracking-wide">Омск под защитой</div>
              <div className="text-xs text-yellow-400/70">Сириус-55</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {[["#banner", "Баннер"], ["#about", "О проекте"], ["#strategy", "Стратегия"], ["#map", "Карта"], ["#booking", "Экскурсии"]].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="text-sm font-medium text-white/70 hover:text-yellow-400 transition-colors duration-200 tracking-wide"
              >
                {label}
              </a>
            ))}
          </div>
          <a
            href="#booking"
            className="btn-gold px-5 py-2.5 rounded-full text-sm font-bold tracking-wide"
          >
            Забронировать тур
          </a>
        </div>
      </nav>

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-10" style={{ zIndex: 1 }}>
        <div
          className="animate-fade-up"
          style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold tracking-widest"
               style={{ background: "rgba(255,215,0,0.15)", border: "1px solid rgba(255,215,0,0.4)", color: "#FFD700" }}>
            🛡️ &nbsp;КОМАНДА «ОМСК ПОД ЗАЩИТОЙ» · СИРИУС-55
          </div>
        </div>

        <h1
          className="animate-fade-up"
          style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards", fontSize: "clamp(3rem, 9vw, 7rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.02em" }}
        >
          <span className="text-gradient-gold">ОМСК —</span>
          <br />
          <span className="text-white">Культурная</span>
          <br />
          <span className="text-white/80" style={{ fontStyle: "italic", fontWeight: 700 }}>столица России</span>
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-2xl text-white/60 text-lg leading-relaxed"
          style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}
        >
          Проект по продвижению туристического потенциала Омска. 
          Здесь начинается Сибирь — здесь живёт история, культура и душа.
        </p>

        <div
          className="animate-fade-up flex flex-wrap gap-4 mt-10 justify-center"
          style={{ animationDelay: "0.8s", opacity: 0, animationFillMode: "forwards" }}
        >
          <a href="#banner" className="btn-gold px-8 py-4 rounded-full text-base font-bold tracking-wide inline-flex items-center gap-2">
            Смотреть баннер <span>↓</span>
          </a>
          <a href="#map" className="btn-outline-gold px-8 py-4 rounded-full text-base font-bold tracking-wide inline-flex items-center gap-2">
            Карта достопримечательностей 🗺️
          </a>
        </div>

        {/* Скролл-индикатор */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-yellow-400" />
          </div>
        </div>
      </section>

      {/* ══════════════ СТАТИСТИКА ══════════════ */}
      <section className="relative py-10 px-6" style={{ zIndex: 1 }}>
        <div className="max-w-5xl mx-auto">
          <div className="glass-dark rounded-2xl px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {FACTS.map((f, i) => (
              <div key={i} className="text-center">
                <div className="text-gradient-gold font-black" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>{f.value}</div>
                <div className="text-white/50 text-sm mt-1 tracking-wide">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ БАННЕР ══════════════ */}
      <section id="banner" className="relative py-20 px-6" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <div
            id="banner-title"
            data-animate
            className={`text-center mb-12 transition-all duration-700 ${isVisible("banner-title") ? "animate-fade-up" : "opacity-0"}`}
          >
            <div className="inline-flex items-center gap-2 text-yellow-400 text-sm font-semibold tracking-widest mb-3">
              <span className="w-8 h-px bg-yellow-400" /> НАШ РЕКЛАМНЫЙ БАННЕР <span className="w-8 h-px bg-yellow-400" />
            </div>
            <h2 className="text-white font-black" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Приглашение в <span className="text-gradient-gold">Омск</span>
            </h2>
            <p className="text-white/50 mt-3 max-w-2xl mx-auto text-base leading-relaxed">
              Рекламный баннер команды «Омск под защитой» — визуальная концепция продвижения города 
              как туристической и культурной дестинации федерального масштаба.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Баннер */}
            <div
              id="banner-img"
              data-animate
              className={`flex-shrink-0 transition-all duration-800 ${isVisible("banner-img") ? "animate-slide-left" : "opacity-0"}`}
              style={{ maxWidth: "480px", width: "100%" }}
            >
              <div className="animate-banner-glow rounded-2xl overflow-hidden">
                <img
                  src="https://cdn.poehali.dev/projects/8f3786ff-152d-4575-aadd-164cd69b12ba/bucket/a87a3988-7adc-4721-bbbb-c590446f2da9.png"
                  alt="Рекламный баннер «Омск под защитой»"
                  className="w-full h-auto"
                  style={{ display: "block" }}
                />
              </div>
            </div>

            {/* Описание баннера */}
            <div
              id="banner-desc"
              data-animate
              className={`flex-1 transition-all duration-800 ${isVisible("banner-desc") ? "animate-slide-right" : "opacity-0"}`}
            >
              <h3 className="text-white font-bold text-2xl mb-6">Что говорит наш баннер?</h3>
              <div className="space-y-5">
                {[
                  { emoji: "🏙️", title: "Образ города", text: "Баннер объединяет главные символы Омска: G-Drive Арена, хоккейный клуб «Авангард», ФК «Иртыш» — создавая образ живого, спортивного и гостеприимного города." },
                  { emoji: "⭐", title: "Ключевые привлекательности", text: "История, культура, отдых у Иртыша, архитектура, Омская крепость и туристический центр — шесть точек притяжения для любого путешественника." },
                  { emoji: "🎯", title: "Целевое послание", text: "«Омск — здесь начинается Сибирь» — слоган, закрепляющий за Омском статус ворот в Сибирь и отправной точки всех сибирских путешествий." },
                  { emoji: "🛡️", title: "Фирменный стиль", text: "Синий туристический автобус с надписью «Омск под защитой» — метафора надёжного, комфортного и защищённого туризма в нашем городе." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 glass-card rounded-xl p-4 hover:border-yellow-400/30 transition-all duration-200">
                    <div className="text-3xl flex-shrink-0">{item.emoji}</div>
                    <div>
                      <div className="text-yellow-400 font-bold text-sm mb-1">{item.title}</div>
                      <div className="text-white/60 text-sm leading-relaxed">{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ О ПРОЕКТЕ ══════════════ */}
      <section id="about" className="relative py-20 px-6" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <div
            id="about-title"
            data-animate
            className={`text-center mb-14 transition-all duration-700 ${isVisible("about-title") ? "animate-fade-up" : "opacity-0"}`}
          >
            <div className="inline-flex items-center gap-2 text-yellow-400 text-sm font-semibold tracking-widest mb-3">
              <span className="w-8 h-px bg-yellow-400" /> НАША МИССИЯ <span className="w-8 h-px bg-yellow-400" />
            </div>
            <h2 className="text-white font-black" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Зачем нужен <span className="text-gradient-gold">этот проект?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                icon: "🏛️",
                title: "Богатое культурное наследие",
                text: "Омск обладает уникальным культурным капиталом: город Достоевского, великолепная архитектура XIX–XX веков, развитая театральная и музейная среда, центр сибирского искусства.",
                color: "#FFD700",
              },
              {
                icon: "📉",
                title: "Проблема узнаваемости",
                text: "Несмотря на богатый культурный потенциал, Омск не воспринимается как значимая туристическая дестинация. Туристический поток в разы ниже сопоставимых городов.",
                color: "#F97316",
              },
              {
                icon: "📣",
                title: "Отсутствие бренда",
                text: "Нет единого узнаваемого бренда, нет системной рекламной стратегии. Культурное наследие практически не используется в маркетинговых коммуникациях.",
                color: "#E879F9",
              },
              {
                icon: "🚀",
                title: "Наше решение",
                text: "Разработка рекламной кампании, направленной на продвижение имиджа Омска как «Культурной столицы России» для существенного увеличения туристического потока.",
                color: "#4ADE80",
              },
            ].map((card, i) => (
              <div
                key={i}
                id={`about-card-${i}`}
                data-animate
                className={`glass-dark rounded-2xl p-7 hover:border-yellow-400/20 transition-all duration-500 ${isVisible(`about-card-${i}`) ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="font-bold text-lg mb-3" style={{ color: card.color }}>{card.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>

          {/* Цитата */}
          <div className="glass-card rounded-2xl p-8 text-center border-yellow-400/20">
            <div className="text-5xl mb-4">✍️</div>
            <blockquote className="text-white/80 text-xl italic leading-relaxed max-w-3xl mx-auto">
              «Омск обладает уникальным культурным капиталом, способным стать основой для формирования 
              бренда <span className="text-yellow-400 not-italic font-bold">«Культурная столица России»</span>»
            </blockquote>
            <div className="mt-4 text-white/40 text-sm">— Концепция проекта «Омск под защитой», Сириус-55</div>
          </div>
        </div>
      </section>

      {/* ══════════════ СТРАТЕГИЯ ══════════════ */}
      <section id="strategy" className="relative py-20 px-6" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <div
            id="strategy-title"
            data-animate
            className={`text-center mb-14 transition-all duration-700 ${isVisible("strategy-title") ? "animate-fade-up" : "opacity-0"}`}
          >
            <div className="inline-flex items-center gap-2 text-yellow-400 text-sm font-semibold tracking-widest mb-3">
              <span className="w-8 h-px bg-yellow-400" /> КАК УВЕЛИЧИТЬ ТУРИСТИЧЕСКИЙ ПОТОК <span className="w-8 h-px bg-yellow-400" />
            </div>
            <h2 className="text-white font-black" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Стратегия <span className="text-gradient-gold">продвижения</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-2xl mx-auto">
              Шесть ключевых направлений рекламной кампании, которые превратят Омск 
              в топовую туристическую дестинацию России
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STRATEGIES.map((s, i) => (
              <div
                key={i}
                id={`strat-${i}`}
                data-animate
                className={`glass-dark rounded-2xl p-7 group hover:border-yellow-400/30 hover:-translate-y-1 transition-all duration-300 cursor-default ${isVisible(`strat-${i}`) ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-4xl mb-5">{s.icon}</div>
                <h3 className="text-white font-bold text-lg mb-3 group-hover:text-yellow-400 transition-colors">{s.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{s.text}</p>
                <div className="mt-5 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full" style={{ background: "linear-gradient(90deg, #FFD700, transparent)" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ КАРТА ══════════════ */}
      <section id="map" className="relative py-20 px-6" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <div
            id="map-title"
            data-animate
            className={`text-center mb-12 transition-all duration-700 ${isVisible("map-title") ? "animate-fade-up" : "opacity-0"}`}
          >
            <div className="inline-flex items-center gap-2 text-yellow-400 text-sm font-semibold tracking-widest mb-3">
              <span className="w-8 h-px bg-yellow-400" /> ДОСТОПРИМЕЧАТЕЛЬНОСТИ <span className="w-8 h-px bg-yellow-400" />
            </div>
            <h2 className="text-white font-black" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Карта <span className="text-gradient-gold">культурного Омска</span>
            </h2>
            <p className="text-white/50 mt-3 max-w-2xl mx-auto">
              Нажмите на любой маркер, чтобы узнать о достопримечательности и открыть её в навигационном приложении
            </p>
          </div>

          <div
            id="map-container"
            data-animate
            className={`transition-all duration-800 ${isVisible("map-container") ? "animate-fade-up" : "opacity-0"}`}
          >
            <OmskMap />
          </div>
        </div>
      </section>

      {/* ══════════════ БРОНИРОВАНИЕ ══════════════ */}
      <section id="booking" className="relative py-24 px-6" style={{ zIndex: 1 }}>
        <div className="max-w-5xl mx-auto">
          <div
            id="booking-title"
            data-animate
            className={`text-center mb-14 transition-all duration-700 ${isVisible("booking-title") ? "animate-fade-up" : "opacity-0"}`}
          >
            <div className="inline-flex items-center gap-2 text-yellow-400 text-sm font-semibold tracking-widest mb-3">
              <span className="w-8 h-px bg-yellow-400" /> ПЛАНИРУЙ ПУТЕШЕСТВИЕ <span className="w-8 h-px bg-yellow-400" />
            </div>
            <h2 className="text-white font-black" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Забронировать <span className="text-gradient-gold">экскурсии в Омске</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-2xl mx-auto text-base leading-relaxed">
              Откройте для себя всё богатство культурного наследия Омска вместе с профессиональными гидами. 
              Пешие туры, речные прогулки, исторические маршруты.
            </p>
          </div>

          {/* Карточки экскурсий */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                emoji: "🏰",
                title: "История Омска",
                desc: "Омская крепость, острог, где был Достоевский, исторический центр города. 2–3 часа.",
                price: "от 600 ₽",
                tag: "Популярное",
              },
              {
                emoji: "🎭",
                title: "Театральный Омск",
                desc: "Посещение театра драмы, Музыкального театра и экскурсия по культурным объектам. 3–4 часа.",
                price: "от 800 ₽",
                tag: "Культура",
              },
              {
                emoji: "🌊",
                title: "Иртышская прогулка",
                desc: "Речная экскурсия по Иртышу с рассказом об истории города с воды. 1.5–2 часа.",
                price: "от 1 200 ₽",
                tag: "Природа",
              },
            ].map((tour, i) => (
              <div
                key={i}
                id={`tour-${i}`}
                data-animate
                className={`glass-dark rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 ${isVisible(`tour-${i}`) ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{tour.emoji}</div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: "rgba(255,215,0,0.15)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.3)" }}>
                      {tour.tag}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors">{tour.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-4">{tour.desc}</p>
                  <div className="text-yellow-400 font-black text-xl">{tour.price}</div>
                </div>
                <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: "linear-gradient(90deg, #FFD700, transparent)" }} />
              </div>
            ))}
          </div>

          {/* CTA блок */}
          <div
            id="cta"
            data-animate
            className={`glass-dark rounded-3xl p-10 text-center transition-all duration-700 ${isVisible("cta") ? "animate-fade-up" : "opacity-0"}`}
            style={{ border: "1px solid rgba(255,215,0,0.25)", boxShadow: "0 0 60px rgba(255,215,0,0.08)" }}
          >
            <div className="text-6xl mb-5">🗺️</div>
            <h3 className="text-white font-black text-3xl mb-3">
              Готовы открыть <span className="text-gradient-gold">Омск?</span>
            </h3>
            <p className="text-white/55 text-base mb-8 max-w-xl mx-auto leading-relaxed">
              Перейдите на платформу бронирования экскурсий, выберите интересующий маршрут 
              и запланируйте незабываемое путешествие в сердце Сибири.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://omsk.tripster.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-10 py-5 rounded-full text-lg font-black tracking-wide inline-flex items-center gap-3 justify-center"
              >
                🎒 Забронировать экскурсию
              </a>
              <a
                href="https://yandex.ru/maps/66/omsk/search/экскурсии+в+Омске/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold px-8 py-5 rounded-full text-base font-bold inline-flex items-center gap-3 justify-center"
              >
                🗺 Найти на карте
              </a>
            </div>
            <p className="text-white/30 text-xs mt-5">
              * После настройки системы бронирования кнопка будет перенаправлять на партнёрский сервис
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════ ФУТЕР ══════════════ */}
      <footer className="relative py-12 px-6" style={{ zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: "linear-gradient(135deg, #FFD700, #FFA500)" }}>
                🛡️
              </div>
              <div>
                <div className="text-white font-bold">Омск под защитой</div>
                <div className="text-white/40 text-xs">Региональная профильная смена «Сириус-55»</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gradient-gold font-bold text-lg">Омск — здесь начинается Сибирь.</div>
              <div className="text-white/40 text-sm mt-1">Рекламная кампания · 2025</div>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-white/40 hover:text-yellow-400 transition-colors text-sm">О проекте</a>
              <a href="#map" className="text-white/40 hover:text-yellow-400 transition-colors text-sm">Карта</a>
              <a href="#booking" className="text-white/40 hover:text-yellow-400 transition-colors text-sm">Экскурсии</a>
            </div>
          </div>
          <div className="mt-8 pt-6 text-center text-white/20 text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            © 2025 «Омск под защитой» · Сириус-55 · Проектная деятельность в рамках регионального «Сириуса»
          </div>
        </div>
      </footer>
    </div>
  );
}
