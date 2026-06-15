import { LanguageCode } from "@/types"
import { cookies } from "next/headers"

export async function getServerLang(): Promise<LanguageCode> {
    const cookieStore = await cookies()
    const languageCookie = cookieStore.get("app-language")
    if (
        languageCookie?.value &&
        Object.values(LanguageCode).includes(languageCookie.value as LanguageCode)
    ) {
        return languageCookie.value as LanguageCode
    }
    return LanguageCode.EN
}
