import { i18n } from "@/lib/i18n"
import { LocalizedString } from "@/types"

export type NavLink = {
    id: string
    label: LocalizedString
    href: string
}

export const navLinks: NavLink[] = [
    { id: "faq", label: i18n("FAQ", "常見問題", "常见问题"), href: "/faq" },
]

export const navUiLabels = {
    menu: i18n("Menu", "選單", "菜单"),
    language: i18n("Language", "語言", "语言"),
    theme: i18n("Theme", "主題", "主题"),
}
