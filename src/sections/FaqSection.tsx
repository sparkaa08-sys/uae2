"use client";

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { HelpCircle, ChevronLeft, ChevronDown } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

export const faqPreview: FaqItem[] = [
  {
    q: "كيف تعمل منصة حماية المستهلك لتقديم الشكاوى؟",
    a: "تتيح لك المنصة تقديم بيانات شكواك والوثائق الداعمة بسهولة. يقوم فريقنا بمراجعتها، توثيقها برقم مرجعي، ثم مخاطبة الشركة المعنية لمتابعة التوصل إلى حل إيجابي.",
  },
  {
    q: "هل خدمة تقديم الشكوى مجانية للمستهلكين في الإمارات؟",
    a: "نعم، خدمة توثيق وتقديم ومتابعة الشكاوى مجانية بالكامل لجميع المستهلكين والمتعاملين داخل دولة الإمارات العربية المتحدة.",
  },
  {
    q: "ما الدور الذي تقوم به المنصة لحل المشكلة مع الشركة؟",
    a: "نقوم بتوثيق الشكوى قانونياً، إصدار الرقم المرجعي، ومخاطبة إدارة المنشأة التجارية للوصول إلى تسوية عادلة تحمي حقوق المستهلك وفق الأنظمة المتبعة.",
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // السؤال الأول مفتوح افتراضياً

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="relative overflow-hidden border-t border-gray-200 bg-white py-20 md:py-28" dir="rtl">
      <div className="container-page relative z-10 grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
        {/* العمود الجانبي: العنوان والوصف */}
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-3.5 py-1.5 text-xs font-bold text-[var(--color-accent)]">
            <HelpCircle className="h-4 w-4 shrink-0" />
            <span>الأسئلة الشائعة</span>
          </div>
          
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl leading-tight">
            استفسارات تتكرر باستمرار
          </h2>
          
          <p className="mt-4 text-sm font-normal leading-relaxed text-gray-600 sm:text-base">
            إليك إجابات لأبرز الأسئلة المتعلقة بتقديم وتوثيق الشكاوى التجارية للمستهلكين وحقوقك المحمية.
          </p>

          <div className="mt-8">
            <Link
              to="/faq"
              className="group inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-6 py-3 text-sm font-bold text-gray-900 transition-all duration-200 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[#121212]"
            >
              <span>عرض جميع الأسئلة</span>
              <ChevronLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* قائمة الأسئلة التفاعلية (Accordion) */}
        <div className="lg:col-span-8 space-y-4">
          {faqPreview.map((f, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[var(--color-accent)]/50 bg-gray-50 shadow-lg shadow-black/5"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between p-6 text-right focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-4">
                    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors ${
                      isOpen ? "bg-[var(--color-accent)] text-[#121212]" : "bg-gray-100 text-gray-600 group-hover:text-gray-900"
                    }`}>
                      0{idx + 1}
                    </span>
                    <span className="text-base font-bold text-gray-900 sm:text-lg">
                      {f.q}
                    </span>
                  </span>
                  
                  <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gray-200 bg-gray-50 text-gray-500 transition-transform duration-300 ${
                    isOpen ? "rotate-180 border-[var(--color-accent)]/40 text-[var(--color-accent)] bg-[var(--color-accent)]/10" : "group-hover:text-gray-900"
                  }`}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-6 px-6" : "grid-rows-[0fr] opacity-0 px-6"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm leading-7 text-gray-600 sm:text-base border-t border-gray-200/60 pt-4">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}