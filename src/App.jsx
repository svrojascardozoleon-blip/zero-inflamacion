import { useState } from "react";

// TODO: Integrar con API/backend real para guardar respuestas del onboarding
// TODO: Integrar video player de converteai (scripts.converteai.net)
// TODO: Conectar con sistema de autenticación del Dr. Carlos Jaramillo

const COLORS = {
  bg: "#0d0d0d",
  bgCard: "#141414",
  bgStep: "#1a1a1a",
  accent: "#c8a96e",
  accentLight: "#e0c48a",
  accentDark: "#a8893e",
  text: "#f5f0e8",
  textMuted: "#9a9080",
  textSub: "#6b6358",
  border: "#2a2520",
  borderActive: "#c8a96e",
  success: "#4caf7d",
  error: "#e05c5c",
  white: "#ffffff",
};

const STEPS = [
  { id: 1, label: "Bienvenida" },
  { id: 2, label: "Tu perfil" },
  { id: 3, label: "Objetivos" },
  { id: 4, label: "Hábitos" },
  { id: 5, label: "Confirmación" },
];

const OBJETIVOS = [
  { id: "peso", icon: "⚖️", label: "Perder peso" },
  { id: "energia", icon: "⚡", label: "Más energía" },
  { id: "digestivo", icon: "🌿", label: "Salud digestiva" },
  { id: "hormonal", icon: "🔬", label: "Balance hormonal" },
  { id: "mental", icon: "🧠", label: "Claridad mental" },
  { id: "inflamacion", icon: "🛡️", label: "Reducir inflamación" },
];

const HABITOS = [
  { id: "cafe", icon: "☕", label: "Consumo café/azúcar" },
  { id: "procesados", icon: "🍟", label: "Como procesados" },
  { id: "sueno", icon: "😴", label: "Duermo mal" },
  { id: "sedentario", icon: "🪑", label: "Sedentario/a" },
  { id: "estres", icon: "😰", label: "Estrés crónico" },
  { id: "ayuno", icon: "🕐", label: "Ya practico ayuno" },
];

const GENEROS = [
  { id: "masculino", label: "Masculino", icon: "♂" },
  { id: "femenino", label: "Femenino", icon: "♀" },
  { id: "otro", label: "Prefiero no decir", icon: "◎" },
];

function ProgressBar({ currentStep, totalSteps }) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
  return (
    <div style={{ width: "100%", marginBottom: "8px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <span style={{ color: COLORS.textMuted, fontSize: "12px", fontWeight: 500 }}>
          Paso {currentStep} de {totalSteps}
        </span>
        <span style={{ color: COLORS.accent, fontSize: "12px", fontWeight: 600 }}>
          {STEPS[currentStep - 1]?.label}
        </span>
      </div>
      <div
        style={{
          width: "100%",
          height: "4px",
          background: COLORS.border,
          borderRadius: "99px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${COLORS.accentDark}, ${COLORS.accent})`,
            borderRadius: "99px",
            transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
    </div>
  );
}

function StepIndicators({ currentStep, totalSteps }) {
  return (
    <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "28px" }}>
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i + 1 === currentStep ? "24px" : "8px",
            height: "8px",
            borderRadius: "99px",
            background:
              i + 1 < currentStep
                ? COLORS.accentDark
                : i + 1 === currentStep
                ? COLORS.accent
                : COLORS.border,
            transition: "all 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

function BtnPrimary({ children, onClick, disabled, style = {} }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        padding: "16px 24px",
        background: disabled
          ? COLORS.border
          : hovered
          ? `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentLight})`
          : `linear-gradient(135deg, ${COLORS.accentDark}, ${COLORS.accent})`,
        color: disabled ? COLORS.textMuted : COLORS.bg,
        border: "none",
        borderRadius: "12px",
        fontFamily: "'Jost', sans-serif",
        fontSize: "16px",
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        letterSpacing: "0.5px",
        transition: "all 0.2s ease",
        transform: hovered && !disabled ? "translateY(-1px)" : "translateY(0)",
        boxShadow:
          hovered && !disabled
            ? `0 8px 24px ${COLORS.accentDark}55`
            : `0 4px 12px ${COLORS.accentDark}33`,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function BtnSecondary({ children, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        padding: "14px 24px",
        background: "transparent",
        color: hovered ? COLORS.accent : COLORS.textMuted,
        border: `1.5px solid ${hovered ? COLORS.accent : COLORS.border}`,
        borderRadius: "12px",
        fontFamily: "'Jost', sans-serif",
        fontSize: "15px",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.2s ease",
        letterSpacing: "0.3px",
      }}
    >
      {children}
    </button>
  );
}

function InputField({ label, type = "text", value, onChange, placeholder, error }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: "16px" }}>
      <label
        style={{
          display: "block",
          color: focused ? COLORS.accent : COLORS.textMuted,
          fontSize: "13px",
          fontWeight: 600,
          marginBottom: "6px",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          transition: "color 0.2s",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: "14px 16px",
          background: COLORS.bgStep,
          border: `1.5px solid ${error ? COLORS.error : focused ? COLORS.borderActive : COLORS.border}`,
          borderRadius: "10px",
          color: COLORS.text,
          fontFamily: "'Jost', sans-serif",
          fontSize: "16px",
          outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxShadow: focused ? `0 0 0 3px ${COLORS.accent}22` : "none",
          boxSizing: "border-box",
        }}
      />
      {error && (
        <span style={{ color: COLORS.error, fontSize: "12px", marginTop: "4px", display: "block" }}>
          {error}
        </span>
      )}
    </div>
  );
}

function SelectChip({ label, icon, selected, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px 12px",
        background: selected
          ? `linear-gradient(135deg, ${COLORS.accentDark}33, ${COLORS.accent}22)`
          : hovered
          ? COLORS.bgStep
          : COLORS.bgCard,
        border: `1.5px solid ${selected ? COLORS.accent : hovered ? COLORS.textSub : COLORS.border}`,
        borderRadius: "12px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        gap: "8px",
        transform: selected ? "scale(1.02)" : "scale(1)",
        boxShadow: selected ? `0 4px 16px ${COLORS.accent}33` : "none",
        minHeight: "80px",
      }}
    >
      <span style={{ fontSize: "24px" }}>{icon}</span>
      <span
        style={{
          color: selected ? COLORS.accent : COLORS.textMuted,
          fontSize: "12px",
          fontWeight: selected ? 600 : 400,
          fontFamily: "'Jost', sans-serif",
          textAlign: "center",
          lineHeight: 1.3,
          transition: "color 0.2s",
        }}
      >
        {label}
      </span>
      {selected && (
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: COLORS.accent,
          }}
        />
      )}
    </button>
  );
}

function GenderCard({ label, icon, selected, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 8px",
        background: selected
          ? `linear-gradient(135deg, ${COLORS.accentDark}33, ${COLORS.accent}22)`
          : hovered
          ? COLORS.bgStep
          : COLORS.bgCard,
        border: `1.5px solid ${selected ? COLORS.accent : hovered ? COLORS.textSub : COLORS.border}`,
        borderRadius: "12px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        gap: "6px",
        boxShadow: selected ? `0 4px 16px ${COLORS.accent}33` : "none",
      }}
    >
      <span style={{ fontSize: "22px", color: selected ? COLORS.accent : COLORS.textMuted }}>
        {icon}
      </span>
      <span
        style={{
          color: selected ? COLORS.accent : COLORS.textMuted,
          fontSize: "13px",
          fontWeight: selected ? 600 : 400,
          fontFamily: "'Jost', sans-serif",
          transition: "color 0.2s",
        }}
      >
        {label}
      </span>
    </button>
  );
}

// ─── PASO 1: BIENVENIDA ────────────────────────────────────────────────────────
function Step1({ onNext }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        animation: "fadeSlideIn 0.4s ease",
      }}
    >
      {/* Logo / Avatar placeholder */}
      <div
        style={{
          width: "96px",
          height: "96px",
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${COLORS.accentDark}, ${COLORS.accent})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "24px",
          boxShadow: `0 0 0 8px ${COLORS.accent}18, 0 8px 32px ${COLORS.accentDark}55`,
          fontSize: "38px",
        }}
      >
        🧬
      </div>

      {/* Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: `${COLORS.accent}18`,
          border: `1px solid ${COLORS.accent}44`,
          borderRadius: "99px",
          padding: "4px 14px",
          marginBottom: "20px",
        }}
      >
        <span style={{ fontSize: "10px" }}>✦</span>
        <span
          style={{
            color: COLORS.accent,
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontFamily: "'Jost', sans-serif",
          }}
        >
          Dr. Carlos Jaramillo
        </span>
      </div>

      <h1
        style={{
          color: COLORS.text,
          fontSize: "28px",
          fontWeight: 700,
          fontFamily: "'Jost', sans-serif",
          lineHeight: 1.2,
          marginBottom: "16px",
          letterSpacing: "-0.5px",
        }}
      >
        Desbloqueo{" "}
        <span
          style={{
            background: `linear-gradient(90deg, ${COLORS.accentDark}, ${COLORS.accentLight})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Metabólico
        </span>
      </h1>

      <p
        style={{
          color: COLORS.textMuted,
          fontSize: "15px",
          lineHeight: 1.7,
          marginBottom: "32px",
          fontFamily: "'Jost', sans-serif",
          fontWeight: 400,
          maxWidth: "320px",
        }}
      >
        Completa tu perfil para personalizar tu experiencia y recibir un plan adaptado
        exclusivamente a ti.
      </p>

      {/* Feature list */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "32px",
          textAlign: "left",
        }}
      >
        {[
          { icon: "🎯", text: "Plan personalizado según tus objetivos" },
          { icon: "📊", text: "Seguimiento de tu progreso metabólico" },
          { icon: "🔓", text: "Acceso completo al programa del Dr. Jaramillo" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: COLORS.bgStep,
              border: `1px solid ${COLORS.border}`,
              borderRadius: "10px",
              padding: "12px 14px",
            }}
          >
            <span style={{ fontSize: "18px" }}>{item.icon}</span>
            <span
              style={{
                color: COLORS.text,
                fontSize: "14px",
                fontFamily: "'Jost', sans-serif",
                fontWeight: 400,
              }}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>

      <BtnPrimary onClick={onNext}>Comenzar mi perfil →</BtnPrimary>

      <p
        style={{
          color: COLORS.textSub,
          fontSize: "12px",
          marginTop: "14px",
          fontFamily: "'Jost', sans-serif",
        }}
      >
        Solo toma 2 minutos · 100% confidencial
      </p>
    </div>
  );
}

// ─── PASO 2: PERFIL ────────────────────────────────────────────────────────────
function Step2({ data, setData, onNext, onBack }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!data.nombre?.trim()) errs.nombre = "Tu nombre es requerido";
    if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errs.email = "Ingresa un email válido";
    if (!data.edad || data.edad < 16 || data.edad > 100) errs.edad = "Ingresa tu edad";
    if (!data.genero) errs.genero = "Selecciona una opción";
    return errs;
  };

  const handleNext = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onNext();
  };

  return (
    <div style={{ animation: "fadeSlideIn 0.4s ease" }}>
      <div style={{ marginBottom: "28px" }}>
        <h2
          style={{
            color: COLORS.text,
            fontSize: "24px",
            fontWeight: 700,
            fontFamily: "'Jost', sans-serif",
            marginBottom: "6px",
            letterSpacing: "-0.3px",
          }}
        >
          Cuéntanos sobre ti
        </h2>
        <p style={{ color: COLORS.textMuted, fontSize: "14px", fontFamily: "'Jost', sans-serif" }}>
          Esta información nos ayuda a personalizar tu experiencia
        </p>
      </div>

      <InputField
        label="Nombre completo"
        value={data.nombre || ""}
        onChange={(e) => {
          setData({ ...data, nombre: e.target.value });
          if (errors.nombre) setErrors({ ...errors, nombre: "" });
        }}
        placeholder="Ej: María García"
        error={errors.nombre}
      />

      <InputField
        label="Correo electrónico"
        type="email"
        value={data.email || ""}
        onChange={(e) => {
          setData({ ...data, email: e.target.value });
          if (errors.email) setErrors({ ...errors, email: "" });
        }}
        placeholder="tu@correo.com"
        error={errors.email}
      />

      <InputField
        label="Edad"
        type="number"
        value={data.edad || ""}
        onChange={(e) => {
          setData({ ...data, edad: e.target.value });
          if (errors.edad) setErrors({ ...errors, edad: "" });
        }}
        placeholder="Ej: 35"
        error={errors.edad}
      />

      <div style={{ marginBottom: "24px" }}>
        <label
          style={{
            display: "block",
            color: COLORS.textMuted,
            fontSize: "13px",
            fontWeight: 600,
            marginBottom: "10px",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            fontFamily: "'Jost', sans-serif",
          }}
        >
          Género
        </label>
        <div style={{ display: "flex", gap: "10px" }}>
          {GENEROS.map((g) => (
            <GenderCard
              key={g.id}
              label={g.label}
              icon={g.icon}
              selected={data.genero === g.id}
              onClick={() => {
                setData({ ...data, genero: g.id });
                if (errors.genero) setErrors({ ...errors, genero: "" });
              }}
            />
          ))}
        </div>
        {errors.genero && (
          <span
            style={{ color: COLORS.error, fontSize: "12px", marginTop: "6px", display: "block" }}
          >
            {errors.genero}
          </span>
        )}
      </div>

      <BtnPrimary onClick={handleNext}>Continuar →</BtnPrimary>
      <div style={{ marginTop: "10px" }}>
        <BtnSecondary onClick={onBack}>← Volver</BtnSecondary>
      </div>
    </div>
  );
}

// ─── PASO 3: OBJETIVOS ────────────────────────────────────────────────────────
function Step3({ data, setData, onNext, onBack }) {
  const [error, setError] = useState("");

  const toggle = (id) => {
    const current = data.objetivos || [];
    const updated = current.includes(id) ? current.filter((o) => o !== id) : [...current, id];
    setData({ ...data, objetivos: updated });
    if (error) setError("");
  };

  const handleNext = () => {
    if (!data.objetivos || data.objetivos.length === 0) {
      setError("Selecciona al menos un objetivo");
      return;
    }
    onNext();
  };

  return (
    <div style={{ animation: "fadeSlideIn 0.4s ease" }}>
      <div style={{ marginBottom: "28px" }}>
        <h2
          style={{
            color: COLORS.text,
            fontSize: "24px",
            fontWeight: 700,
            fontFamily: "'Jost', sans-serif",
            marginBottom: "6px",
            letterSpacing: "-0.3px",
          }}
        >
          ¿Cuáles son tus objetivos?
        </h2>
        <p style={{ color: COLORS.textMuted, fontSize: "14px", fontFamily: "'Jost', sans-serif" }}>
          Selecciona todos los que apliquen a ti
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginBottom: "24px",
        }}
      >
        {OBJETIVOS.map((obj) => (
          <SelectChip
            key={obj.id}
            icon={obj.icon}
            label={obj.label}
            selected={(data.objetivos || []).includes(obj.id)}
            onClick={() => toggle(obj.id)}
          />
        ))}
      </div>

      {error && (
        <div
          style={{
            background: `${COLORS.error}18`,
            border: `1px solid ${COLORS.error}44`,
            borderRadius: "8px",
            padding: "10px 14px",
            marginBottom: "16px",
          }}
        >
          <span style={{ color: COLORS.error, fontSize: "13px", fontFamily: "'Jost', sans-serif" }}>
            ⚠ {error}
          </span>
        </div>
      )}

      {(data.objetivos || []).length > 0 && (
        <div
          style={{
            background: `${COLORS.accent}12`,
            border: `1px solid ${COLORS.accent}33`,
            borderRadius: "8px",
            padding: "10px 14px",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "14px" }}>✓</span>
          <span
            style={{
              color: COLORS.accent,
              fontSize: "13px",
              fontFamily: "'Jost', sans-serif",
              fontWeight: 500,
            }}
          >
            {data.objetivos.length} objetivo{data.objetivos.length > 1 ? "s" : ""} seleccionado
            {data.objetivos.length > 1 ? "s" : ""}
          </span>
        </div>
      )}

      <BtnPrimary onClick={handleNext}>Continuar →</BtnPrimary>
      <div style={{ marginTop: "10px" }}>
        <BtnSecondary onClick={onBack}>← Volver</BtnSecondary>
      </div>
    </div>
  );
}

// ─── PASO 4: HÁBITOS ──────────────────────────────────────────────────────────
function Step4({ data, setData, onNext, onBack }) {
  const toggle = (id) => {
    const current = data.habitos || [];
    const updated = current.includes(id) ? current.filter((h) => h !== id) : [...current, id];
    setData({ ...data, habitos: updated });
  };

  return (
    <div style={{ animation: "fadeSlideIn 0.4s ease" }}>
      <div style={{ marginBottom: "28px" }}>
        <h2
          style={{
            color: COLORS.text,
            fontSize: "24px",
            fontWeight: 700,
            fontFamily: "'Jost', sans-serif",
            marginBottom: "6px",
            letterSpacing: "-0.3px",
          }}
        >
          Tus hábitos actuales
        </h2>
        <p style={{ color: COLORS.textMuted, fontSize: "14px", fontFamily: "'Jost', sans-serif" }}>
          Marca los que se apliquen a tu situación hoy
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginBottom: "24px",
        }}
      >
        {HABITOS.map((hab) => (
          <SelectChip
            key={hab.id}
            icon={hab.icon}
            label={hab.label}
            selected={(data.habitos || []).includes(hab.id)}
            onClick={() => toggle(hab.id)}
          />
        ))}
      </div>

      {/* Nivel de compromiso */}
      <div style={{ marginBottom: "24px" }}>
        <label
          style={{
            display: "block",
            color: COLORS.textMuted,
            fontSize: "13px",
            fontWeight: 600,
            marginBottom: "12px",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            fontFamily: "'Jost', sans-serif",
          }}
        >
          Nivel de compromiso
        </label>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { id: "basico", label: "Básico", desc: "Cambios graduales, a mi ritmo" },
            { id: "intermedio", label: "Intermedio", desc: "Listo para esforzarme" },
            { id: "avanzado", label: "Avanzado", desc: "Compromiso total al 100%" },
          ].map((nivel) => {
            const isSelected = data.compromiso === nivel.id;
            return (
              <button
                key={nivel.id}
                onClick={() => setData({ ...data, compromiso: nivel.id })}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  background: isSelected
                    ? `linear-gradient(135deg, ${COLORS.accentDark}22, ${COLORS.accent}15)`
                    : COLORS.bgStep,
                  border: `1.5px solid ${isSelected ? COLORS.accent : COLORS.border}`,
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  textAlign: "left",
                }}
              >
                <div>
                  <div
                    style={{
                      color: isSelected ? COLORS.accent : COLORS.text,
                      fontSize: "14px",
                      fontWeight: 600,
                      fontFamily: "'Jost', sans-serif",
                      transition: "color 0.2s",
                    }}
                  >
                    {nivel.label}
                  </div>
                  <div
                    style={{
                      color: COLORS.textMuted,
                      fontSize: "12px",
                      fontFamily: "'Jost', sans-serif",
                      marginTop: "2px",
                    }}
                  >
                    {nivel.desc}
                  </div>
                </div>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    border: `2px solid ${isSelected ? COLORS.accent : COLORS.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.2s",
                  }}
                >
                  {isSelected && (
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: COLORS.accent,
                      }}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <BtnPrimary onClick={onNext}>Continuar →</BtnPrimary>
      <div style={{ marginTop: "10px" }}>
        <BtnSecondary onClick={onBack}>← Volver</BtnSecondary>
      </div>
    </div>
  );
}

// ─── PASO 5: CONFIRMACIÓN ─────────────────────────────────────────────────────
function Step5({ data, onSubmit, onBack, submitted, loading }) {
  const objetivosLabels = (data.objetivos || []).map(
    (id) => OBJETIVOS.find((o) => o.id === id)?.label
  );
  const habitosLabels = (data.habitos || []).map(
    (id) => HABITOS.find((h) => h.id === id)?.label
  );
  const generoLabel = GENEROS.find((g) => g.id === data.genero)?.label;
  const compromisoLabel = { basico: "Básico", intermedio: "Intermedio", avanzado: "Avanzado" }[
    data.compromiso
  ];

  if (submitted) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          animation: "fadeSlideIn 0.5s ease",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${COLORS.success}33, ${COLORS.success}22)`,
            border: `2px solid ${COLORS.success}66`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            marginBottom: "24px",
            boxShadow: `0 0 0 12px ${COLORS.success}11`,
          }}
        >
          ✓
        </div>
        <h2
          style={{
            color: COLORS.text,
            fontSize: "26px",
            fontWeight: 700,
            fontFamily: "'Jost', sans-serif",
            marginBottom: "12px",
          }}
        >
          ¡Perfil completado!
        </h2>
        <p
          style={{
            color: COLORS.textMuted,
            fontSize: "15px",
            lineHeight: 1.7,
            marginBottom: "28px",
            fontFamily: "'Jost', sans-serif",
          }}
        >
          Hola <strong style={{ color: COLORS.accent }}>{data.nombre}</strong>, tu perfil ha sido
          guardado. Estamos personalizando tu experiencia en el programa Desbloqueo Metabólico.
        </p>

        {/* Video placeholder */}
        {/* TODO: Integrar video player de converteai aquí */}
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            background: COLORS.bgStep,
            border: `1px solid ${COLORS.border}`,
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "28px",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: `${COLORS.accent}22`,
              border: `2px solid ${COLORS.accent}55`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
            }}
          >
            ▶
          </div>
          <span
            style={{
              color: COLORS.textMuted,
              fontSize: "13px",
              fontFamily: "'Jost', sans-serif",
            }}
          >
            {/* TODO: Cargar video del Dr. Carlos Jaramillo */}
            Mensaje del Dr. Carlos Jaramillo
          </span>
        </div>

        <div
          style={{
            width: "100%",
            background: `${COLORS.accent}10`,
            border: `1px solid ${COLORS.accent}33`,
            borderRadius: "12px",
            padding: "18px",
            textAlign: "left",
          }}
        >
          <p
            style={{
              color: COLORS.accent,
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "'Jost', sans-serif",
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Próximos pasos
          </p>
          {[
            "Revisa tu correo electrónico para acceder al programa",
            "Explora los módulos según tu nivel de compromiso",
            "Únete a la comunidad de Desbloqueo Metabólico",
          ].map((step, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: "10px", marginBottom: "8px", alignItems: "flex-start" }}
            >
              <span
                style={{
                  color: COLORS.accent,
                  fontWeight: 700,
                  fontSize: "13px",
                  fontFamily: "'Jost', sans-serif",
                  minWidth: "18px",
                }}
              >
                {i + 1}.
              </span>
              <span
                style={{
                  color: COLORS.textMuted,
                  fontSize: "13px",
                  fontFamily: "'Jost', sans-serif",
                  lineHeight: 1.5,
                }}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ animation: "fadeSlideIn 0.4s ease" }}>
      <div style={{ marginBottom: "24px" }}>
        <h2
          style={{
            color: COLORS.text,
            fontSize: "24px",
            fontWeight: 700,
            fontFamily: "'Jost', sans-serif",
            marginBottom: "6px",
            letterSpacing: "-0.3px",
          }}
        >
          Confirma tu perfil
        </h2>
        <p style={{ color: COLORS.textMuted, fontSize: "14px", fontFamily: "'Jost', sans-serif" }}>
          Revisa la información antes de enviar
        </p>
      </div>

      {/* Resumen */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "28px",
        }}
      >
        {/* Datos personales */}
        <div
          style={{
            background: COLORS.bgStep,
            border: `1px solid ${COLORS.border}`,
            borderRadius: "12px",
            padding: "16px",
          }}
        >
          <p
            style={{
              color: COLORS.accent,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontFamily: "'Jost', sans-serif",
              marginBottom: "12px",
            }}
          >
            Datos personales
          </p>
          {[
            { label: "Nombre", value: data.nombre },
            { label: "Email", value: data.email },
            { label: "Edad", value: data.edad ? `${data.edad} años` : "-" },
            { label: "Género", value: generoLabel || "-" },
          ].map((row, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 0",
                borderBottom: i < 3 ? `1px solid ${COLORS.border}` : "none",
              }}
            >
              <span
                style={{
                  color: COLORS.textMuted,
                  fontSize: "13px",
                  fontFamily: "'Jost', sans-serif",
                }}
              >
                {row.label}
              </span>
              <span
                style={{
                  color: COLORS.text,
                  fontSize: "13px",
                  fontWeight: 500,
                  fontFamily: "'Jost', sans-serif",
                  maxWidth: "180px",
                  textAlign: "right",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {row.value || "-"}
              </span>
            </div>
          ))}
        </div>

        {/* Objetivos */}
        <div
          style={{
            background: COLORS.bgStep,
            border: `1px solid ${COLORS.border}`,
            borderRadius: "12px",
            padding: "16px",
          }}
        >
          <p
            style={{
              color: COLORS.accent,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontFamily: "'Jost', sans-serif",
              marginBottom: "10px",
            }}
          >
            Objetivos
          </p>
          {objetivosLabels.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {objetivosLabels.map((label, i) => (
                <span
                  key={i}
                  style={{
                    background: `${COLORS.accent}18`,
                    border: `1px solid ${COLORS.accent}33`,
                    color: COLORS.accent,
                    fontSize: "12px",
                    fontWeight: 500,
                    fontFamily: "'Jost', sans-serif",
                    borderRadius: "99px",
                    padding: "4px 10px",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          ) : (
            <span style={{ color: COLORS.textMuted, fontSize: "13px", fontFamily: "'Jost', sans-serif" }}>
              Sin objetivos seleccionados
            </span>
          )}
        </div>

        {/* Hábitos + compromiso */}
        <div
          style={{
            background: COLORS.bgStep,
            border: `1px solid ${COLORS.border}`,
            borderRadius: "12px",
            padding: "16px",
          }}
        >
          <p
            style={{
              color: COLORS.accent,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontFamily: "'Jost', sans-serif",
              marginBottom: "10px",
            }}
          >
            Hábitos y compromiso
          </p>
          {habitosLabels.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
              {habitosLabels.map((label, i) => (
                <span
                  key={i}
                  style={{
                    background: COLORS.bgCard,
                    border: `1px solid ${COLORS.border}`,
                    color: COLORS.textMuted,
                    fontSize: "12px",
                    fontFamily: "'Jost', sans-serif",
                    borderRadius: "99px",
                    padding: "4px 10px",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          )}
          {compromisoLabel && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: COLORS.textMuted, fontSize: "13px", fontFamily: "'Jost', sans-serif" }}>
                Nivel:
              </span>
              <span
                style={{
                  background: `${COLORS.accent}18`,
                  border: `1px solid ${COLORS.accent}33`,
                  color: COLORS.accent,
                  fontSize: "12px",
                  fontWeight: 600,
                  fontFamily: "'Jost', sans-serif",
                  borderRadius: "99px",
                  padding: "3px 10px",
                }}
              >
                {compromisoLabel}
              </span>
            </div>
          )}
        </div>
      </div>

      <BtnPrimary onClick={onSubmit} disabled={loading}>
        {loading ? "Guardando perfil..." : "Completar mi perfil ✓"}
      </BtnPrimary>
      <div style={{ marginTop: "10px" }}>
        <BtnSecondary onClick={onBack}>← Editar</BtnSecondary>
      </div>

      <p
        style={{
          color: COLORS.textSub,
          fontSize: "11px",
          marginTop: "14px",
          textAlign: "center",
          fontFamily: "'Jost', sans-serif",
          lineHeight: 1.5,
        }}
      >
        Al completar tu perfil aceptas los términos y condiciones del programa.
        {/* TODO: Agregar link a términos y condiciones reales */}
      </p>
    </div>
  );
}

// ─── APP PRINCIPAL ────────────────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalSteps = STEPS.length;

  const handleNext = () => setStep((s) => Math.min(s + 1, totalSteps));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    // TODO: Enviar formData a API real del programa Desbloqueo Metabólico
    // TODO: Integrar con sistema de gestión de usuarios del Dr. Carlos Jaramillo
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { 
          background: ${COLORS.bg}; 
          min-height: 100vh; 
          font-family: 'Jost', sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
        ::selection { background: ${COLORS.accent}44; color: ${COLORS.text}; }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 99px; }
      `}</style>

      {/* Background decoration */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(ellipse 80% 40% at 50% -10%, ${COLORS.accent}12 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Main layout */}
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "0 0 40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div
          style={{
            width: "100%",
            maxWidth: "480px",
            padding: "20px 24px 0",
          }}
        >
          {/* Logo bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "20px" }}>🧬</span>
              <span
                style={{
                  color: COLORS.text,
                  fontSize: "15px",
                  fontWeight: 700,
                  fontFamily: "'Jost', sans-serif",
                  letterSpacing: "-0.2px",
                }}
              >
                Desbloqueo{" "}
                <span style={{ color: COLORS.accent }}>Metabólico</span>
              </span>
            </div>
            {!submitted && (
              <span
                style={{
                  color: COLORS.textSub,
                  fontSize: "12px",
                  fontFamily: "'Jost', sans-serif",
                }}
              >
                {step}/{totalSteps}
              </span>
            )}
          </div>

          {/* Progress */}
          {!submitted && (
            <>
              <ProgressBar currentStep={step} totalSteps={totalSteps} />
            </>
          )}
        </div>

        {/* Card */}
        <div
          style={{
            width: "100%",
            maxWidth: "480px",
            padding: "0 16px",
            marginTop: "8px",
          }}
        >
          {!submitted && (
            <StepIndicators currentStep={step} totalSteps={totalSteps} />
          )}

          <div
            style={{
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.border}`,
              borderRadius: "20px",
              padding: "28px 24px",
              boxShadow: `0 16px 48px ${COLORS.bg}cc, 0 4px 12px rgba(0,0,0,0.4)`,
            }}
          >
            {step === 1 && <Step1 onNext={handleNext} />}
            {step === 2 && (
              <Step2 data={formData} setData={setFormData} onNext={handleNext} onBack={handleBack} />
            )}
            {step === 3 && (
              <Step3 data={formData} setData={setFormData} onNext={handleNext} onBack={handleBack} />
            )}
            {step === 4 && (
              <Step4 data={formData} setData={setFormData} onNext={handleNext} onBack={handleBack} />
            )}
            {step === 5 && (
              <Step5
                data={formData}
                onSubmit={handleSubmit}
                onBack={handleBack}
                submitted={submitted}
                loading={loading}
              />
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "12px" }}>🔒</span>
            <span
              style={{
                color: COLORS.textSub,
                fontSize: "12px",
                fontFamily: "'Jost', sans-serif",
              }}
            >
              Datos protegidos · Dr. Carlos Jaramillo © 2024
            </span>
          </div>
        </div>
      </div>
    </>
  );
}