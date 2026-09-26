"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import FAQ from "@/app/types/faq"

interface FAQItemProps {
  faq: FAQ
  defaultOpen?: boolean
}

export function FAQItem({ faq, defaultOpen = false }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)


  return (
    <div className="border border-[#E5DED5] rounded-xl overflow-hidden bg-[#FAF8F5]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[#EDE8E1] transition-colors"
      >
        <span className="text-lg font-medium text-[#2D2420] pr-4">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#C9A66B] shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-5 pt-0 text-[#6B5B51] leading-relaxed">{faq.answer}</div>
        </div>
      </div>
    </div>
  )
}

interface FAQListProps {
  faqs: FAQ[]
  title?: string
}

export function FAQList({ faqs, title = "Frequently Asked Questions" }: FAQListProps) {
  return (
    <div className="w-full mt-10 mb-10 max-w-3xl mx-auto">
      {title && (
        <h2 className="text-3xl font-serif text-[#2D2420] text-center mb-8">{title}</h2>
      )}
      <div className="flex flex-col gap-4">
        {faqs.map((faq) => (
          <FAQItem key={faq.id} faq={faq} />
        ))}
      </div>
    </div>
  )
}
