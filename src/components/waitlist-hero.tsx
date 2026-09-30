"use client"

import { useState, useRef } from "react"
import Image from "next/image"

type Status = "idle" | "loading" | "success" | "error"

export function WaitlistHero() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Frontend preview only: no email is sent or stored.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setErrorMessage("")
    setStatus("success")
    setEmail("")
    fireConfetti()
  }

  const fireConfetti = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const particles: {x: number; y: number; vx: number; vy: number; life: number; color: string; size: number}[] = []
    const confettiColors = ["#c34900", "#67C090", "#EEF6DF", "#341D2B", "#fff"]

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const createParticle = () => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 2) * 10,
      life: 100,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      size: Math.random() * 4 + 2,
    })

    for (let i = 0; i < 50; i++) {
      particles.push(createParticle())
    }

    const animate = () => {
      if (particles.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.5
        p.life -= 2

        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0, p.life / 100)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        if (p.life <= 0) {
          particles.splice(i, 1)
          i--
        }
      }

      requestAnimationFrame(animate)
    }

    animate()
  }

  const colors = {
    textMain: "#EEF6DF",
    textSecondary: "#a89a9e",
    primary: "#c34900",
    success: "#67C090",
    inputBg: "#27272a",
    baseBg: "#09090b",
    inputShadow: "rgba(255, 255, 255, 0.1)",
  }

  return (
    <div className="w-full h-dvh min-h-dvh bg-black flex items-center justify-center overflow-hidden">
      {/* Animation Styles */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 60s linear infinite;
        }
        @keyframes bounce-in {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes success-pulse {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.1); }
          70% { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes success-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(103, 192, 144, 0.4); }
          50% { box-shadow: 0 0 60px rgba(103, 192, 144, 0.8), 0 0 100px rgba(103, 192, 144, 0.4); }
        }
        @keyframes checkmark-draw {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes celebration-ring {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        .animate-success-pulse {
          animation: success-pulse 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .animate-success-glow {
          animation: success-glow 2s ease-in-out infinite;
        }
        .animate-checkmark {
          stroke-dasharray: 24;
          stroke-dashoffset: 24;
          animation: checkmark-draw 0.4s ease-out 0.3s forwards;
        }
        .animate-ring {
          animation: celebration-ring 0.8s ease-out forwards;
        }
        /* Responsive scaling for spinning rings */
        .rings-container {
          transform: perspective(1200px) rotateX(10deg) scale(0.3);
        }
        @media (min-width: 480px) {
          .rings-container {
            transform: perspective(1200px) rotateX(12deg) scale(0.4);
          }
        }
        @media (min-width: 640px) {
          .rings-container {
            transform: perspective(1200px) rotateX(15deg) scale(0.5);
          }
        }
        @media (min-width: 768px) {
          .rings-container {
            transform: perspective(1200px) rotateX(15deg) scale(0.65);
          }
        }
        @media (min-width: 1024px) {
          .rings-container {
            transform: perspective(1200px) rotateX(15deg) scale(0.8);
          }
        }
        @media (min-width: 1280px) {
          .rings-container {
            transform: perspective(1200px) rotateX(15deg) scale(1);
          }
        }
      `}</style>

      {/* Main Container */}
      <div
        className="relative w-full h-dvh overflow-hidden shadow-2xl"
        style={{
          backgroundColor: colors.baseBg,
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* Background Decorative Layer */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none rings-container"
          style={{
            transformOrigin: "center center",
            opacity: 1,
          }}
        >
          {/* Layer 4 (Very Back) - spins clockwise - extra large */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className="absolute top-1/2 left-1/2" style={{ width: "1800px", height: "1800px", transform: "translate(-50%, -50%)" }}>
              {/* 12 positions - alternating: KAU, KAUST, KFU, KFUPM, KSU, PSU, QU, TU, KAU, KAUST, KFU, KFUPM */}
              <div className="absolute" style={{ top: "3%", left: "50%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KAU.png" alt="" width={90} height={90} className="rounded-xl opacity-35" style={{ filter: "blur(2px)" }} /></div>
              <div className="absolute" style={{ top: "10%", left: "75%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KFUPM.png" alt="" width={85} height={85} className="rounded-xl opacity-35" style={{ filter: "blur(2px)" }} /></div>
              <div className="absolute" style={{ top: "25%", left: "92%", transform: "translate(-50%, -50%)" }}><Image src="/assets/QU.png" alt="" width={120} height={120} className="rounded-xl opacity-35" style={{ filter: "blur(2px)" }} /></div>
              <div className="absolute" style={{ top: "50%", left: "97%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KAUST.png" alt="" width={130} height={130} className="rounded-xl opacity-35" style={{ filter: "blur(2px)" }} /></div>
              <div className="absolute" style={{ top: "75%", left: "92%", transform: "translate(-50%, -50%)" }}><Image src="/assets/PSU.png" alt="" width={80} height={80} className="rounded-xl opacity-35" style={{ filter: "blur(2px)" }} /></div>
              <div className="absolute" style={{ top: "90%", left: "75%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KFU.png" alt="" width={85} height={85} className="rounded-xl opacity-35" style={{ filter: "blur(2px)" }} /></div>
              <div className="absolute" style={{ top: "97%", left: "50%", transform: "translate(-50%, -50%)" }}><Image src="/assets/TU.png" alt="" width={90} height={90} className="rounded-xl opacity-35" style={{ filter: "blur(2px)" }} /></div>
              <div className="absolute" style={{ top: "90%", left: "25%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KSU.png" alt="" width={85} height={85} className="rounded-xl opacity-35" style={{ filter: "blur(2px)" }} /></div>
              <div className="absolute" style={{ top: "75%", left: "8%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KAUST.png" alt="" width={120} height={120} className="rounded-xl opacity-35" style={{ filter: "blur(2px)" }} /></div>
              <div className="absolute" style={{ top: "50%", left: "3%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KFUPM.png" alt="" width={90} height={90} className="rounded-xl opacity-35" style={{ filter: "blur(2px)" }} /></div>
              <div className="absolute" style={{ top: "25%", left: "8%", transform: "translate(-50%, -50%)" }}><Image src="/assets/QU.png" alt="" width={120} height={120} className="rounded-xl opacity-35" style={{ filter: "blur(2px)" }} /></div>
              <div className="absolute" style={{ top: "10%", left: "25%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KFU.png" alt="" width={85} height={85} className="rounded-xl opacity-35" style={{ filter: "blur(2px)" }} /></div>
            </div>
          </div>

          {/* Layer 3 (Back) - spins counter-clockwise */}
          <div className="absolute inset-0 animate-spin-slow-reverse">
            <div className="absolute top-1/2 left-1/2" style={{ width: "1400px", height: "1400px", transform: "translate(-50%, -50%)" }}>
              {/* 12 positions - different sequence: PSU, KSU, TU, KAU, QU, KFUPM, KAUST, KFU, PSU, KSU, TU, KAU */}
              <div className="absolute" style={{ top: "5%", left: "50%", transform: "translate(-50%, -50%)" }}><Image src="/assets/PSU.png" alt="" width={80} height={80} className="rounded-xl opacity-45" style={{ filter: "blur(1.5px)" }} /></div>
              <div className="absolute" style={{ top: "12%", left: "73%", transform: "translate(-50%, -50%)" }}><Image src="/assets/TU.png" alt="" width={75} height={75} className="rounded-xl opacity-45" style={{ filter: "blur(1.5px)" }} /></div>
              <div className="absolute" style={{ top: "27%", left: "88%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KAU.png" alt="" width={70} height={70} className="rounded-xl opacity-45" style={{ filter: "blur(1.5px)" }} /></div>
              <div className="absolute" style={{ top: "50%", left: "95%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KFUPM.png" alt="" width={80} height={80} className="rounded-xl opacity-45" style={{ filter: "blur(1.5px)" }} /></div>
              <div className="absolute" style={{ top: "73%", left: "88%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KAUST.png" alt="" width={105} height={105} className="rounded-xl opacity-45" style={{ filter: "blur(1.5px)" }} /></div>
              <div className="absolute" style={{ top: "88%", left: "73%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KSU.png" alt="" width={75} height={75} className="rounded-xl opacity-45" style={{ filter: "blur(1.5px)" }} /></div>
              <div className="absolute" style={{ top: "95%", left: "50%", transform: "translate(-50%, -50%)" }}><Image src="/assets/QU.png" alt="" width={115} height={115} className="rounded-xl opacity-45" style={{ filter: "blur(1.5px)" }} /></div>
              <div className="absolute" style={{ top: "88%", left: "27%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KFU.png" alt="" width={75} height={75} className="rounded-xl opacity-45" style={{ filter: "blur(1.5px)" }} /></div>
              <div className="absolute" style={{ top: "73%", left: "12%", transform: "translate(-50%, -50%)" }}><Image src="/assets/TU.png" alt="" width={70} height={70} className="rounded-xl opacity-45" style={{ filter: "blur(1.5px)" }} /></div>
              <div className="absolute" style={{ top: "50%", left: "5%", transform: "translate(-50%, -50%)" }}><Image src="/assets/PSU.png" alt="" width={80} height={80} className="rounded-xl opacity-45" style={{ filter: "blur(1.5px)" }} /></div>
              <div className="absolute" style={{ top: "27%", left: "12%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KAU.png" alt="" width={70} height={70} className="rounded-xl opacity-45" style={{ filter: "blur(1.5px)" }} /></div>
              <div className="absolute" style={{ top: "12%", left: "27%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KSU.png" alt="" width={75} height={75} className="rounded-xl opacity-45" style={{ filter: "blur(1.5px)" }} /></div>
            </div>
          </div>

          {/* Layer 2 (Middle) - spins clockwise */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className="absolute top-1/2 left-1/2" style={{ width: "1000px", height: "1000px", transform: "translate(-50%, -50%)" }}>
              {/* 8 positions - sequence: KAUST, KFU, PSU, TU, KFUPM, QU, KAU, KSU */}
              <div className="absolute" style={{ top: "5%", left: "50%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KAUST.png" alt="" width={100} height={100} className="rounded-xl opacity-60" style={{ filter: "blur(1px)" }} /></div>
              <div className="absolute" style={{ top: "20%", left: "85%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KFU.png" alt="" width={65} height={65} className="rounded-xl opacity-60" style={{ filter: "blur(1px)" }} /></div>
              <div className="absolute" style={{ top: "50%", left: "95%", transform: "translate(-50%, -50%)" }}><Image src="/assets/PSU.png" alt="" width={70} height={70} className="rounded-xl opacity-60" style={{ filter: "blur(1px)" }} /></div>
              <div className="absolute" style={{ top: "80%", left: "85%", transform: "translate(-50%, -50%)" }}><Image src="/assets/TU.png" alt="" width={65} height={65} className="rounded-xl opacity-60" style={{ filter: "blur(1px)" }} /></div>
              <div className="absolute" style={{ top: "95%", left: "50%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KFUPM.png" alt="" width={70} height={70} className="rounded-xl opacity-60" style={{ filter: "blur(1px)" }} /></div>
              <div className="absolute" style={{ top: "80%", left: "15%", transform: "translate(-50%, -50%)" }}><Image src="/assets/QU.png" alt="" width={95} height={95} className="rounded-xl opacity-60" style={{ filter: "blur(1px)" }} /></div>
              <div className="absolute" style={{ top: "50%", left: "5%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KAU.png" alt="" width={70} height={70} className="rounded-xl opacity-60" style={{ filter: "blur(1px)" }} /></div>
              <div className="absolute" style={{ top: "20%", left: "15%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KSU.png" alt="" width={65} height={65} className="rounded-xl opacity-60" style={{ filter: "blur(1px)" }} /></div>
            </div>
          </div>

          {/* Layer 1 (Front) - spins counter-clockwise - smallest ring */}
          <div className="absolute inset-0 animate-spin-slow-reverse">
            <div className="absolute top-1/2 left-1/2" style={{ width: "600px", height: "600px", transform: "translate(-50%, -50%)" }}>
              {/* 8 positions - sequence: TU, KAUST, KSU, KFU, QU, KFUPM, PSU, KAU */}
              <div className="absolute" style={{ top: "5%", left: "50%", transform: "translate(-50%, -50%)" }}><Image src="/assets/TU.png" alt="" width={65} height={65} className="rounded-xl opacity-75" style={{ filter: "blur(0.5px)" }} /></div>
              <div className="absolute" style={{ top: "20%", left: "85%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KAUST.png" alt="" width={90} height={90} className="rounded-xl opacity-75" style={{ filter: "blur(0.5px)" }} /></div>
              <div className="absolute" style={{ top: "50%", left: "95%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KSU.png" alt="" width={65} height={65} className="rounded-xl opacity-75" style={{ filter: "blur(0.5px)" }} /></div>
              <div className="absolute" style={{ top: "80%", left: "85%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KFU.png" alt="" width={60} height={60} className="rounded-xl opacity-75" style={{ filter: "blur(0.5px)" }} /></div>
              <div className="absolute" style={{ top: "95%", left: "50%", transform: "translate(-50%, -50%)" }}><Image src="/assets/QU.png" alt="" width={95} height={95} className="rounded-xl opacity-75" style={{ filter: "blur(0.5px)" }} /></div>
              <div className="absolute" style={{ top: "80%", left: "15%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KFUPM.png" alt="" width={60} height={60} className="rounded-xl opacity-75" style={{ filter: "blur(0.5px)" }} /></div>
              <div className="absolute" style={{ top: "50%", left: "5%", transform: "translate(-50%, -50%)" }}><Image src="/assets/PSU.png" alt="" width={65} height={65} className="rounded-xl opacity-75" style={{ filter: "blur(0.5px)" }} /></div>
              <div className="absolute" style={{ top: "20%", left: "15%", transform: "translate(-50%, -50%)" }}><Image src="/assets/KAU.png" alt="" width={60} height={60} className="rounded-xl opacity-75" style={{ filter: "blur(0.5px)" }} /></div>
            </div>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${colors.baseBg} 10%, rgba(9, 9, 11, 0.8) 40%, transparent 100%)`,
          }}
        />

        {/* Content Container */}
        <div className="relative z-20 w-full h-full flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 px-4 pt-[15vh] sm:pt-[20vh]" dir="rtl">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-1 sm:mb-2">
            <Image
              src="/assets/tlaqi_1024x1024-removebg-preview.png"
              alt="TLAQI"
              width={96}
              height={96}
              className="w-full h-full object-contain drop-shadow-2xl"
              priority
            />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center tracking-tight leading-tight" style={{ color: colors.textMain }}>
            حيث تلتقي العقول لتصنع الفرق
          </h1>

          <p className="text-sm sm:text-base md:text-lg font-medium" style={{ color: colors.textSecondary }}>
            هنا المستقبل
          </p>

          <p className="text-xs text-center" style={{ color: colors.textSecondary }}>
            نسخة معاينة — التسجيل غير متاح حالياً
          </p>

          {/* Form / Success Container */}
          <div className="w-full max-w-[280px] sm:max-w-sm md:max-w-md mt-2 sm:mt-3 md:mt-4 h-[50px] sm:h-[54px] md:h-[60px] relative perspective-1000">
            <canvas
              ref={canvasRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[500px] md:w-[600px] h-[400px] sm:h-[500px] md:h-[600px] pointer-events-none z-50"
            />

            {/* SUCCESS STATE */}
            <div
              className={`absolute inset-0 flex items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                status === "success"
                  ? "opacity-100 scale-100 rotate-x-0 animate-success-pulse animate-success-glow"
                  : "opacity-0 scale-95 -rotate-x-90 pointer-events-none"
              }`}
              style={{ backgroundColor: colors.success }}
            >
              {status === "success" && (
                <>
                  <div
                    className="absolute top-1/2 left-1/2 w-full h-full rounded-full border-2 border-[#67C090] animate-ring"
                    style={{ animationDelay: "0s" }}
                  />
                  <div
                    className="absolute top-1/2 left-1/2 w-full h-full rounded-full border-2 border-[#67C090]/70 animate-ring"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <div
                    className="absolute top-1/2 left-1/2 w-full h-full rounded-full border-2 border-[#67C090]/40 animate-ring"
                    style={{ animationDelay: "0.3s" }}
                  />
                </>
              )}
              <div
                className={`flex items-center gap-1.5 sm:gap-2 text-white font-semibold text-sm sm:text-base md:text-lg ${status === "success" ? "animate-bounce-in" : ""}`}
              >
                <div className="bg-white/20 p-0.5 sm:p-1 rounded-full">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      className={status === "success" ? "animate-checkmark" : ""}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span>معاينة — لم يتم التسجيل</span>
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {status === "error" && (
              <div className="absolute -top-8 sm:-top-10 left-0 right-0 text-center text-red-400 text-xs sm:text-sm">
                {errorMessage}
              </div>
            )}

            {/* FORM STATE */}
            <form
              onSubmit={handleSubmit}
              className={`relative w-full h-full group transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                status === "success"
                  ? "opacity-0 scale-95 rotate-x-90 pointer-events-none"
                  : "opacity-100 scale-100 rotate-x-0"
              }`}
              dir="ltr"
            >
              <input
                type="email"
                required
                placeholder="name@email.com"
                value={email}
                disabled={status === "loading"}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status === "error") setStatus("idle")
                }}
                className="w-full h-[50px] sm:h-[54px] md:h-[60px] pl-4 sm:pl-5 md:pl-6 pr-[110px] sm:pr-[140px] md:pr-[180px] rounded-full outline-none transition-all duration-200 placeholder-zinc-500 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
                style={{
                  backgroundColor: colors.inputBg,
                  color: colors.textMain,
                  boxShadow: `inset 0 0 0 1px ${colors.inputShadow}`,
                }}
              />

              <div className="absolute top-[5px] sm:top-[6px] right-[5px] sm:right-[6px] bottom-[5px] sm:bottom-[6px]">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-full px-3 sm:px-4 md:px-6 rounded-full font-medium text-white transition-all active:scale-95 hover:brightness-110 disabled:hover:brightness-100 disabled:active:scale-100 disabled:cursor-wait flex items-center justify-center min-w-[95px] sm:min-w-[125px] md:min-w-[160px] text-xs sm:text-sm md:text-base"
                  style={{ backgroundColor: colors.primary }}
                >
                  {status === "loading" ? (
                    <svg
                      className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    "انضم للقائمة"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
