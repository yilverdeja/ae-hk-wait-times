"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/useLanguage"
import { LanguageCode } from "@/types"
import { sendGAEvent } from "@next/third-parties/google"
import Link from "next/link"
import { useEffect } from "react"

const notFoundTexts = {
    [LanguageCode.EN]: {
        title: "Page Not Found",
        message: "The page you're looking for doesn't exist or has been moved.",
        backHome: "Return to Home",
    },
    [LanguageCode.ZH]: {
        title: "找不到頁面",
        message: "您要尋找的頁面不存在或已被移動。",
        backHome: "返回首頁",
    },
    [LanguageCode.CN]: {
        title: "找不到页面",
        message: "您要寻找的页面不存在或已被移动。",
        backHome: "返回首页",
    },
}

export default function NotFound() {
    const { lang } = useLanguage()
    const texts = notFoundTexts[lang]

    // Track 404 page view
    useEffect(() => {
        if (typeof window !== "undefined") {
            sendGAEvent("event", "page_not_found", {
                pagePath: window.location.pathname,
            })
        }
    }, [])

    const handleBackHomeClick = () => {
        if (typeof window !== "undefined") {
            sendGAEvent("event", "not_found_back_home_clicked", {
                pagePath: window.location.pathname,
            })
        }
    }

    return (
        <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
            <div className="flex flex-col items-center justify-center gap-6 text-center">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                        404
                    </h1>
                    <h2 className="text-2xl font-semibold sm:text-3xl md:text-4xl">
                        {texts.title}
                    </h2>
                    <p className="mx-auto max-w-md text-muted-foreground sm:text-lg">
                        {texts.message}
                    </p>
                </div>
                <Button asChild onClick={handleBackHomeClick}>
                    <Link href="/">{texts.backHome}</Link>
                </Button>
            </div>
        </div>
    )
}
