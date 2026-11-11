"use client";

import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  FileText,
  Clock,
  CheckCircle,
} from "lucide-react";

interface HeroSectionProps {
  onPrimaryClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onSecondaryClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  secondaryHref?: string;
  /** صورة ثابتة (أول إطار من الفيديو، webp) تظهر فوراً قبل الفيديو */
  logoPoster?: string;
}

const features = [
  {
    title: "تأطير الشكوى",
    desc: "تنظيم البيانات والمرفقات وتجهيزها للعرض الفوري.",
    icon: FileText,
  },
  {
    title: "متابعة لحظية",
    desc: "معرفة مرحلة الشكوى والتحديثات عبر رقم الطلب.",
    icon: Clock,
  },
  {
    title: "معالجة عادلة",
    desc: "ضمان إيصال ملاحظاتك للجهات المختصة بحيادية.",
    icon: CheckCircle,
  },
];

/**
 * قناع يذيب حواف الفيديو تدريجياً حتى تختفي حدود المربع تماماً
 * ويندمج مع الخلفية السوداء.
 */
const FEATHER_MASK =
  "radial-gradient(closest-side, #000 62%, rgba(0,0,0,0) 100%)";

/* ------------------------------------------------------------------ */
/* الشعار المتحرك المندمج مع الخلفية                                   */
/* ------------------------------------------------------------------ */
function LogoVideo({ poster }: { poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const saveData = !!(
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;

    if (reduceMotion || saveData) {
      video.pause();
      return;
    }

    video.play().catch(() => { });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) {
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(video);

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else video.play().catch(() => { });
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const maskStyle = {
    maskImage: FEATHER_MASK,
    WebkitMaskImage: FEATHER_MASK,
  } as const;

  return (
    <div
      role="img"
      aria-label="شعار منصة حماية المستهلك"
      className="relative mx-auto aspect-square w-full max-w-[13.5rem] min-[400px]:max-w-[16rem] sm:max-w-[20rem] lg:max-w-[26rem]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[12%] rounded-full bg-[var(--color-accent)]/15 blur-3xl"
      />

      <video
        ref={videoRef}
        src="/video.mp4"
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
        onError={(e) =>
          console.warn("تعذّر تحميل فيديو الهيرو:", e.currentTarget.error)
        }
        style={maskStyle}
        className="pointer-events-none absolute inset-0 h-full w-full scale-[1.02] object-cover"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* الهيرو                                                              */
/* ------------------------------------------------------------------ */
export function HeroSection({
  onPrimaryClick,
  onSecondaryClick,
  secondaryHref = "#track-complaint",
  logoPoster,
}: HeroSectionProps) {
  return (
    <section
      dir="rtl"
      aria-labelledby="hero-title"
      // الهيرو ياخد ارتفاع الشاشة (ناقص الهيدر). عدّل 4rem حسب ارتفاع الهيدر عندك،
      // أو استخدم min-h-[100svh] إذا ما في هيدر ثابت.
      className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden border-b border-white/10 bg-[#000000] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] py-8 sm:py-10 lg:py-12"
    >
      {/* توهج خفيف علوي على الخلفية السوداء */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--color-accent)]/10 via-[#000000] to-[#000000]"
      />

      {/* إضاءات بيضاء متفرقة لكسر الدارك */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.12),transparent)] sm:h-96 sm:w-96 lg:left-[6%] lg:-top-24 lg:h-[34rem] lg:w-[34rem]" />
        <div className="absolute right-[10%] top-[16%] h-40 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.07),transparent)] sm:h-56 sm:w-56" />
        <div className="absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.08),transparent)] lg:right-[10%] lg:h-80 lg:w-80" />
        <span className="absolute left-[18%] top-[14%] h-1 w-1 rounded-full bg-white/60 shadow-[0_0_12px_3px_rgba(255,255,255,0.35)]" />
        <span className="absolute right-[30%] top-[40%] h-1 w-1 rounded-full bg-white/50 shadow-[0_0_10px_2px_rgba(255,255,255,0.3)]" />
        <span className="absolute bottom-[24%] left-[42%] hidden h-1 w-1 rounded-full bg-white/50 shadow-[0_0_10px_2px_rgba(255,255,255,0.3)] sm:block" />
      </div>

      <div className="container-page relative z-10 flex flex-1 flex-col">
        {/* هيكل موحد للشاشات الكبيرة (شبكة أعمدة) */}
        <div className="my-auto hidden lg:grid grid-cols-12 items-center gap-12">
          {/* النص الأساسي والفرعي بالشاشات الكبيرة */}
          <div className="col-span-7">
            <h1 id="hero-title" className="font-extrabold tracking-tight">
              <span className="block text-6xl font-extrabold text-white leading-tight">
                منصة حماية المستهلك
              </span>
              <span className="mt-4 block text-3xl font-bold text-[var(--color-accent)]">
                لرفع وتقديم شكاوى المستهلك
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg font-normal leading-8 text-gray-300">
              قدّم شكواك بخطوات واضحة، واحصل على رقم طلب تتابع به حالتها حتى صدور الرد، من مكان واحد.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <a
                href="#complaint-form"
                onClick={onPrimaryClick}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold text-[#121212] transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:opacity-90"
              >
                <span>تقديم شكوى جديدة</span>
                <ArrowLeft
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#how-it-works"
                onClick={onSecondaryClick}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-8 py-3.5 text-base font-semibold text-white transition-colors duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:opacity-90"
              >
                دليل الإجراءات
              </a>
            </div>
          </div>

          {/* الفيديو للشاشات الكبيرة */}
          <div className="col-span-5">
            <LogoVideo poster={logoPoster} />
          </div>
        </div>

        <div className="my-auto flex flex-col lg:hidden gap-6">
          {/* 1. النص الأساسي */}
          <h1 id="hero-title" className="font-extrabold tracking-tight text-center">
            <span className="block text-3xl min-[400px]:text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              منصة حماية المستهلك
            </span>
          </h1>

          {/* 2. الفيديو (الشعار) */}
          <div className="w-full my-2">
            <LogoVideo poster={logoPoster} />
          </div>

          {/* 3. النص الفرعي، الوصف، والأزرار */}
          <div className="text-center sm:text-right">
            <span className="block text-lg min-[400px]:text-xl sm:text-2xl font-bold text-[var(--color-accent)]">
              لرفع وتقديم شكاوى المستهلك
            </span>

            <p className="mt-4 text-base font-normal leading-relaxed text-gray-300 sm:text-lg">
              قدّم شكواك بخطوات واضحة، واحصل على رقم طلب تتابع به حالتها حتى صدور الرد، من مكان واحد.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3.5">
              <a
                href="#complaint-form"
                onClick={onPrimaryClick}
                className="group inline-flex min-h-12 w-full sm:w-auto touch-manipulation items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold text-[#121212] transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:opacity-90"
              >
                <span>تقديم شكوى جديدة</span>
                <ArrowLeft
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href={secondaryHref}
                onClick={onSecondaryClick}
                className="inline-flex min-h-12 w-full sm:w-auto touch-manipulation items-center justify-center rounded-full border border-white/25 px-8 py-3.5 text-base font-semibold text-white transition-colors duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:opacity-90"
              >
                دليل الإجراءات
              </a>
            </div>
          </div>
        </div>

        {/* شريط المميزات: بآخر الهيرو، أصغر وأهدأ */}
        <ul className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3 lg:mt-10">
          {features.map((item) => (
            <li
              key={item.title}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#141414] to-[#0A0A0A] p-4 transition-all duration-300 hover:border-[var(--color-accent)]/50 hover:shadow-lg hover:shadow-[var(--color-accent)]/5"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full bg-[var(--color-accent)]/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[var(--color-accent)] transition-all duration-300 group-hover:border-[var(--color-accent)]/30 group-hover:bg-[var(--color-accent)]/10">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-white transition-colors duration-200 group-hover:text-[var(--color-accent)] sm:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-xs font-normal leading-5 text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
