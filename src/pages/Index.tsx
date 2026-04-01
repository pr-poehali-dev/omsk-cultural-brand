import { useState } from "react";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  const services: { icon: string; title: string; desc: string }[] = [
    {
      icon: "Layers",
      title: "Разработка сайтов",
      desc: "Создаём сайты, которые работают на ваш бизнес. Лаконичный дизайн, высокая конверсия.",
    },
    {
      icon: "Zap",
      title: "Быстрый запуск",
      desc: "Готовый сайт за 3–7 дней. Никаких месяцев ожидания и бесконечных согласований.",
    },
    {
      icon: "Shield",
      title: "Надёжность",
      desc: "Техническое сопровождение и поддержка после запуска. Ваш сайт всегда онлайн.",
    },
    {
      icon: "TrendingUp",
      title: "SEO и продвижение",
      desc: "Оптимизация под поисковые системы с первого дня. Больше клиентов из интернета.",
    },
    {
      icon: "Smartphone",
      title: "Адаптивность",
      desc: "Идеальное отображение на любых устройствах — телефонах, планшетах, компьютерах.",
    },
    {
      icon: "BarChart2",
      title: "Аналитика",
      desc: "Подключаем системы аналитики, чтобы вы понимали, откуда приходят клиенты.",
    },
  ];

  const stats = [
    { value: "120+", label: "проектов сдано" },
    { value: "7 дней", label: "средний срок" },
    { value: "98%", label: "довольных клиентов" },
    { value: "5 лет", label: "на рынке" },
  ];

  return (
    <div className="min-h-screen bg-coal font-body text-white overflow-x-hidden">

      {/* ── НАВИГАЦИЯ ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
           style={{ background: "linear-gradient(to bottom, rgba(15,15,15,0.95), transparent)" }}>
        <div className="font-display text-2xl font-light tracking-widest text-gold">
          STUDIO
        </div>
        <div className="hidden md:flex items-center gap-8 font-body text-sm font-light tracking-wider text-white/60">
          <a href="#services" className="hover:text-gold transition-colors duration-300">Услуги</a>
          <a href="#about" className="hover:text-gold transition-colors duration-300">О нас</a>
          <a href="#contact" className="hover:text-gold transition-colors duration-300">Контакты</a>
        </div>
        <a href="#contact"
           className="border border-gold/50 text-gold px-5 py-2 text-xs tracking-widest uppercase hover:bg-gold hover:text-coal transition-all duration-300 font-body font-medium">
          Связаться
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 pt-24 pb-16 overflow-hidden">
        {/* Фон с сеткой */}
        <div className="absolute inset-0 opacity-5"
             style={{
               backgroundImage: "linear-gradient(rgba(201,169,110,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.4) 1px, transparent 1px)",
               backgroundSize: "60px 60px"
             }} />
        {/* Градиентное свечение */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full opacity-10 blur-3xl"
             style={{ background: "radial-gradient(circle, #C9A96E, transparent)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-5 blur-3xl"
             style={{ background: "radial-gradient(circle, #C9A96E, transparent)" }} />

        <div className="relative max-w-5xl">
          {/* Декоративная линия */}
          <div className="flex items-center gap-4 mb-8 opacity-0 animate-fade-in"
               style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            <div className="h-px bg-gold/60 animate-line-grow" style={{ width: "48px" }} />
            <span className="text-gold/70 text-xs tracking-[0.3em] uppercase font-light">Веб-студия</span>
          </div>

          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light leading-none tracking-tight mb-6 opacity-0"
              style={{ animation: "fade-up 1s ease-out 0.2s forwards" }}>
            Сайты,<br />
            <em className="italic text-gold not-italic" style={{ fontStyle: "italic" }}>которые</em><br />
            продают
          </h1>

          <p className="font-body text-lg md:text-xl text-white/50 font-light max-w-xl leading-relaxed mb-12 opacity-0"
             style={{ animation: "fade-up 1s ease-out 0.45s forwards" }}>
            Создаём профессиональные сайты с нуля. Быстро, красиво,
            с фокусом на результат для вашего бизнеса.
          </p>

          <div className="flex flex-wrap gap-4 opacity-0"
               style={{ animation: "fade-up 1s ease-out 0.65s forwards" }}>
            <a href="#contact"
               className="bg-gold text-coal px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-gold-light transition-all duration-300 inline-flex items-center gap-2 group">
              Начать проект
              <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a href="#services"
               className="border border-white/20 text-white/70 px-8 py-4 text-sm tracking-widest uppercase font-light hover:border-gold/50 hover:text-gold transition-all duration-300">
              Наши услуги
            </a>
          </div>
        </div>

        {/* Скролл-индикатор */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-widest uppercase text-white/50">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent" />
        </div>
      </section>

      {/* ── СТАТИСТИКА ── */}
      <section id="about" className="border-y border-white/8 py-12 px-8 md:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center group">
              <div className="font-display text-4xl md:text-5xl font-light text-gold mb-2 group-hover:scale-105 transition-transform duration-300">
                {s.value}
              </div>
              <div className="text-white/40 text-xs tracking-widest uppercase font-light">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── УСЛУГИ ── */}
      <section id="services" className="py-24 px-8 md:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-gold/60" />
            <span className="text-gold/70 text-xs tracking-[0.3em] uppercase">Что мы делаем</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-light mb-16 text-white">
            Наши <em className="italic text-gold">услуги</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8">
            {services.map((s, i) => (
              <div
                key={i}
                className="bg-coal p-8 cursor-pointer group hover:bg-coal-light transition-all duration-400"
                onMouseEnter={() => setActiveService(i)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className={`mb-6 transition-colors duration-300 ${activeService === i ? "text-gold" : "text-white/30"}`}>
                  <Icon name={s.icon} size={28} />
                </div>
                <h3 className="font-display text-2xl font-light mb-3 text-white group-hover:text-gold transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed font-light">
                  {s.desc}
                </p>
                <div className={`mt-6 h-px bg-gold/50 transition-all duration-500 ${activeService === i ? "w-full" : "w-0"}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ЦИТАТА / РАЗДЕЛИТЕЛЬ ── */}
      <section className="py-20 px-8 md:px-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
             style={{ background: "radial-gradient(ellipse at center, #C9A96E 0%, transparent 70%)" }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="font-display text-3xl md:text-5xl font-light text-white/80 leading-relaxed italic">
            «Хороший сайт — это не расходы.<br />
            <span className="text-gold not-italic font-normal">Это инвестиция в рост бизнеса.»</span>
          </div>
        </div>
      </section>

      {/* ── КОНТАКТЫ ── */}
      <section id="contact" className="py-24 px-8 md:px-20 border-t border-white/8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Левая колонка */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-gold/60" />
              <span className="text-gold/70 text-xs tracking-[0.3em] uppercase">Связаться</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-light mb-8 text-white">
              Начнём<br />
              <em className="italic text-gold">вместе?</em>
            </h2>
            <p className="text-white/40 font-light leading-relaxed mb-12 text-base">
              Расскажите о своём проекте. Мы свяжемся с вами в течение одного рабочего дня
              и предложим оптимальное решение.
            </p>

            <div className="space-y-6">
              {[
                { icon: "Phone", label: "+7 (999) 000-00-00" },
                { icon: "Mail", label: "hello@studio.ru" },
                { icon: "MapPin", label: "Москва, Россия" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold/60 group-hover:border-gold group-hover:text-gold transition-all duration-300">
                    <Icon name={c.icon} size={16} />
                  </div>
                  <span className="text-white/50 group-hover:text-white/80 transition-colors duration-300 font-light text-sm">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Форма */}
          <div className="space-y-4">
            {[
              { id: "name", label: "Ваше имя", type: "text", placeholder: "Иван Иванов" },
              { id: "phone", label: "Телефон", type: "tel", placeholder: "+7 (___) ___-__-__" },
            ].map((field) => (
              <div key={field.id}>
                <label className="block text-xs tracking-widest uppercase text-white/30 mb-2 font-light">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full bg-transparent border border-white/10 px-4 py-3 text-white/80 placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-colors duration-300 font-light text-sm"
                  value={formData[field.id as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                />
              </div>
            ))}
            <div>
              <label className="block text-xs tracking-widest uppercase text-white/30 mb-2 font-light">
                Сообщение
              </label>
              <textarea
                rows={4}
                placeholder="Расскажите о проекте..."
                className="w-full bg-transparent border border-white/10 px-4 py-3 text-white/80 placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-colors duration-300 resize-none font-light text-sm"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <button
              className="w-full bg-gold text-coal py-4 text-sm tracking-widest uppercase font-medium hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2 group mt-2"
            >
              Отправить заявку
              <Icon name="Send" size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <p className="text-white/20 text-xs text-center font-light">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </div>
        </div>
      </section>

      {/* ── ФУТЕР ── */}
      <footer className="border-t border-white/8 py-8 px-8 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-xl font-light tracking-widest text-gold">
            STUDIO
          </div>
          <p className="text-white/20 text-xs font-light tracking-wider">
            © 2025 Studio. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            {["VK", "TG", "WA"].map((s) => (
              <button key={s} className="text-white/20 hover:text-gold text-xs tracking-wider transition-colors duration-300 font-light">
                {s}
              </button>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;