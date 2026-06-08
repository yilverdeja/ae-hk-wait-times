import { faqEntries } from "@/data/faq"
import { LanguageCode } from "@/types"

export function getFaqJsonLd(lang: LanguageCode = LanguageCode.EN) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqEntries.map((entry) => ({
            "@type": "Question",
            name: entry.question[lang],
            acceptedAnswer: {
                "@type": "Answer",
                text: entry.answerLead[lang],
            },
        })),
    }
}
