import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const SERVICES_INFO: Record<string, { title: string; icon: string; price: string; color: string }> = {
  hockey: {
    title: 'Вечер с «Авангардом»',
    icon: "🏒",
    price: "По договорённости + стоимость билетов",
    color: "#4F8EF7",
  },
  food: {
    title: 'Кулинарный тур «Вкус Сибири»',
    icon: "🍽️",
    price: "Фиксированная + бюджет на дегустации",
    color: "#F59E0B",
  },
  tour: {
    title: 'Тур «Омск глазами инсайдера»',
    icon: "🗺️",
    price: "Фиксированная за группу до 5–7 человек",
    color: "#10B981",
  },
};

const CARD_NUMBER = "2200 7020 7250 7788";
const BANK_NAME = "Т-Банк (Тинькофф)";
const RECIPIENT = "Артём Б.";

export default function Pay() {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("service") || "tour";
  const service = SERVICES_INFO[serviceId] || SERVICES_INFO.tour;

  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [step, setStep] = useState(1);

  const copyCard = () => {
    navigator.clipboard.writeText(CARD_NUMBER.replace(/\s/g, "")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setStep(3);
  };

  return (
    <div style={{ background: "#060d1f", color: "#e8eaf0", fontFamily: "Montserrat, sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');
        @keyframes revealUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes successPop {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes goldPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(255,215,0,0.3); }
          50% { box-shadow: 0 0 40px rgba(255,215,0,0.6); }
        }
        .card-num {
          font-family: 'Courier New', monospace;
          letter-spacing: 0.15em;
        }
      `}</style>

      {/* Шапка */}
      <div
        className="py-6 px-4 sm:px-6 flex items-center gap-4"
        style={{ borderBottom: "1px solid rgba(255,215,0,0.12)", background: "rgba(6,13,31,0.98)" }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-sm transition-all hover:scale-105"
          style={{
            color: "#FFD700",
            textDecoration: "none",
            background: "rgba(255,215,0,0.08)",
            border: "1px solid rgba(255,215,0,0.2)",
            padding: "8px 16px",
            borderRadius: 20,
          }}
        >
          ← Назад
        </Link>
        <div>
          <div
            style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, fontWeight: 700, color: "#FFD700" }}
          >
            Оплата тура
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Омск Инсайдер</div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">

        {/* Выбранный тур */}
        <div
          className="rounded-3xl p-6 mb-8"
          style={{
            background: `linear-gradient(135deg, ${service.color}15, rgba(255,255,255,0.04))`,
            border: `1px solid ${service.color}33`,
            animation: "revealUp 0.6s ease-out forwards",
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: `${service.color}22`, border: `1px solid ${service.color}44` }}
            >
              {service.icon}
            </div>
            <div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 4, letterSpacing: "0.1em" }}>
                ВЫ ВЫБРАЛИ
              </div>
              <div
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {service.title}
              </div>
              <div style={{ fontSize: 13, color: service.color, marginTop: 2 }}>{service.price}</div>
            </div>
          </div>
        </div>

        {/* Шаги */}
        <div className="flex items-center gap-2 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-500"
                style={{
                  background: step >= s ? "linear-gradient(135deg, #FFD700, #FFA500)" : "rgba(255,255,255,0.08)",
                  color: step >= s ? "#0a0a0a" : "rgba(255,255,255,0.3)",
                  boxShadow: step === s ? "0 0 20px rgba(255,215,0,0.5)" : "none",
                }}
              >
                {step > s ? "✓" : s}
              </div>
              {s < 3 && (
                <div
                  className="flex-1 h-0.5 transition-all duration-500"
                  style={{ background: step > s ? "#FFD700" : "rgba(255,255,255,0.1)" }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mb-8 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          <span>Реквизиты</span>
          <span>Перевод</span>
          <span>Подтверждение</span>
        </div>

        {/* ШАГ 1 — реквизиты */}
        {step === 1 && (
          <div style={{ animation: "revealUp 0.6s ease-out forwards" }}>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 28,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 24,
              }}
            >
              Реквизиты для перевода
            </h2>

            {/* Карточка банка */}
            <div
              className="rounded-3xl p-6 mb-6 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #1a2a5e, #0d1b3e)",
                border: "1px solid rgba(255,215,0,0.2)",
                animation: "goldPulse 3s ease-in-out infinite",
              }}
            >
              {/* Декор */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(255,215,0,0.08), transparent)",
                  transform: "translate(20%, -20%)",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}>
                    {BANK_NAME}
                  </div>
                  <div style={{ fontSize: 22 }}>💳</div>
                </div>

                {/* Номер карты */}
                <div className="mb-6">
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 8, letterSpacing: "0.1em" }}>
                    НОМЕР КАРТЫ
                  </div>
                  <div
                    className="card-num text-2xl font-bold"
                    style={{ color: "#fff", letterSpacing: "0.2em" }}
                  >
                    {CARD_NUMBER}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4, letterSpacing: "0.1em" }}>
                      ПОЛУЧАТЕЛЬ
                    </div>
                    <div style={{ fontWeight: 600, color: "#fff", fontSize: 15 }}>{RECIPIENT}</div>
                  </div>
                  <button
                    onClick={copyCard}
                    className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95"
                    style={{
                      background: copied
                        ? "linear-gradient(135deg, #4ADE80, #22C55E)"
                        : "linear-gradient(135deg, #FFD700, #FFA500)",
                      color: "#0a0a0a",
                      boxShadow: "0 4px 15px rgba(255,165,0,0.3)",
                    }}
                  >
                    {copied ? "✓ Скопировано!" : "Копировать"}
                  </button>
                </div>
              </div>
            </div>

            {/* Инструкция */}
            <div
              className="rounded-2xl p-5 mb-8"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <h3
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#FFD700",
                  marginBottom: 16,
                }}
              >
                Как оплатить:
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  { n: 1, text: 'Откройте приложение любого банка → «Перевод по номеру карты»' },
                  { n: 2, text: `Введите номер карты: ${CARD_NUMBER}` },
                  { n: 3, text: 'Укажите сумму (уточняйте в переписке со мной заранее)' },
                  { n: 4, text: 'В комментарии напишите название тура и ваше имя' },
                  { n: 5, text: 'Нажмите «Я перевёл» ниже и пришлите мне скриншот чека' },
                ].map((step) => (
                  <div key={step.n} className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(255,215,0,0.15)", border: "1px solid rgba(255,215,0,0.3)", color: "#FFD700" }}
                    >
                      {step.n}
                    </div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                      {step.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-4 rounded-2xl font-bold text-base transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFA500)",
                color: "#0a0a0a",
                boxShadow: "0 8px 30px rgba(255,165,0,0.4)",
              }}
            >
              Понятно, перевожу →
            </button>
          </div>
        )}

        {/* ШАГ 2 — подтверждение перевода */}
        {step === 2 && (
          <div style={{ animation: "revealUp 0.6s ease-out forwards" }}>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 28,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 8,
              }}
            >
              Перевели?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, marginBottom: 24 }}>
              После перевода нажмите кнопку ниже и отправьте мне скриншот в мессенджере
            </p>

            {/* Напоминание реквизитов */}
            <div
              className="rounded-2xl p-5 mb-6 flex items-center gap-4"
              style={{ background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.2)" }}
            >
              <div style={{ fontSize: 28 }}>💳</div>
              <div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>Реквизиты</div>
                <div className="card-num font-bold" style={{ color: "#FFD700", fontSize: 18 }}>{CARD_NUMBER}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{BANK_NAME} · {RECIPIENT}</div>
              </div>
            </div>

            {/* Мессенджеры */}
            <div
              className="rounded-2xl p-5 mb-8"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>
                Пришлите скриншот чека в удобный мессенджер:
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="https://t.me/h7umi"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-105"
                  style={{ background: "rgba(42,171,238,0.1)", border: "1px solid rgba(42,171,238,0.3)", textDecoration: "none" }}
                >
                  <span style={{ fontSize: 22 }}>✈️</span>
                  <div>
                    <div style={{ fontWeight: 600, color: "#2AABEE" }}>Telegram</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>@h7umi</div>
                  </div>
                </a>
                <a
                  href="https://wa.me/79131234567"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-105"
                  style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.3)", textDecoration: "none" }}
                >
                  <span style={{ fontSize: 22 }}>📱</span>
                  <div>
                    <div style={{ fontWeight: 600, color: "#25D366" }}>WhatsApp</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>+7 (913) 123-45-67</div>
                  </div>
                </a>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full py-4 rounded-2xl font-bold text-base transition-all hover:scale-105 mb-4"
              style={{
                background: "linear-gradient(135deg, #4ADE80, #22C55E)",
                color: "#0a0a0a",
                boxShadow: "0 8px 30px rgba(74,222,128,0.3)",
              }}
            >
              ✅ Я перевёл — жду подтверждения!
            </button>

            <button
              onClick={() => setStep(1)}
              className="w-full py-3 rounded-2xl text-sm transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
            >
              ← Вернуться к реквизитам
            </button>
          </div>
        )}

        {/* ШАГ 3 — успех */}
        {step === 3 && confirmed && (
          <div className="text-center" style={{ animation: "revealUp 0.6s ease-out forwards" }}>
            <div
              className="text-7xl mb-6"
              style={{ animation: "successPop 0.6s ease-out forwards" }}
            >
              🎉
            </div>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 36,
                fontWeight: 700,
                color: "#FFD700",
                marginBottom: 12,
              }}
            >
              Отлично!
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 16,
                lineHeight: 1.7,
                maxWidth: 400,
                margin: "0 auto 32px",
              }}
            >
              Ваша заявка принята! Я свяжусь с вами в течение нескольких часов для подтверждения
              оплаты и согласования деталей тура.
            </p>

            <div
              className="rounded-2xl p-6 mb-8 text-left"
              style={{ background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.2)" }}
            >
              <h3 style={{ fontWeight: 700, color: "#FFD700", marginBottom: 12, fontSize: 15 }}>
                Что дальше:
              </h3>
              {[
                "Пришлите скриншот чека мне в Telegram или WhatsApp",
                "Я подтвержу получение и свяжусь с вами",
                "Вместе согласуем дату и время тура",
                "Получите все детали и инструкции",
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-3 mb-3">
                  <span style={{ color: "#FFD700", flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{t}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://t.me/h7umi"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-4 rounded-2xl font-bold text-base text-center transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #2AABEE, #1E96D4)",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                ✈️ Написать в Telegram
              </a>
              <Link
                to="/"
                className="flex-1 py-4 rounded-2xl font-semibold text-base text-center transition-all hover:scale-105"
                style={{
                  border: "2px solid rgba(255,215,0,0.4)",
                  color: "#FFD700",
                  textDecoration: "none",
                }}
              >
                🏠 На главную
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}