import { PREDICTION_CAP_MINS, PREDICTION_SUPPRESS_MINS } from "@/lib/constants"
import { i18n } from "@/lib/i18n"
import { aeFeesLink } from "@/lib/utils"
import { LanguageCode, LocalizedString } from "@/types"
import {
    BarChart3,
    BookOpen,
    CircleDollarSign,
    Clock,
    LucideIcon,
    Monitor,
} from "lucide-react"
import Link from "next/link"
import React from "react"

export type LocalizedNode = Record<LanguageCode, React.ReactNode>

export type FaqEntry = {
    id: string
    question: LocalizedString
    answerLead: LocalizedString
    answerBody?: LocalizedNode
    /** Shown in drawer accordion; all entries shown on /faq */
    showInDrawer?: boolean
}

export const faqPageMeta = {
    title: i18n(
        "Frequently Asked Questions",
        "常見問題",
        "常见问题"
    ),
    intro: i18n(
        "Answers to common questions about Hong Kong public hospital A&E wait times, triage, fees, and how ae.wait.hk uses official Hospital Authority data. Information is for reference only and is not medical advice.",
        "有關香港公立醫院急症室等候時間、分流、收費及 ae.wait.hk 如何使用醫管局官方數據的常見問題解答。資訊僅供參考，不構成醫療建議。",
        "有关香港公立医院急诊室等候时间、分流、收费及 ae.wait.hk 如何使用医管局官方数据的常见问题解答。信息仅供参考，不构成医疗建议。"
    ),
    viewAllLink: i18n(
        "View all questions",
        "查看全部問題",
        "查看全部问题"
    ),
    viewLiveWaitTimes: i18n(
        "View live wait times",
        "查看即時等候時間",
        "查看即时等候时间"
    ),
    browseHospitals: i18n(
        "Browse all hospitals",
        "瀏覽所有醫院",
        "浏览所有医院"
    ),
    tocTitle: i18n("On this page", "本頁內容", "本页内容"),
}

export const informationDrawerMeta = {
    triggerText: i18n(
        "Understanding the Wait",
        "了解等候時間",
        "了解等候时间"
    ),
    title: i18n(
        "Understanding A&E Wait Times",
        "了解急症室等候時間",
        "了解急症室等候时间"
    ),
    description: i18n(
        "Key information to help you understand how wait times are estimated and what they mean.",
        "重要資訊，助您了解等候時間的估算方式及其含義。",
        "重要信息，助您了解等候时间的估算方式及其含义。"
    ),
    footer: {
        text: i18n(
            "For patients with minor conditions, considering alternative healthcare options is advisable. For more details on A&E services, visit the",
            "病情輕微的病人建議考慮其他醫療選項。有關急症室服務的更多詳情，請瀏覽",
            "病情轻微的病人建议考虑其他医疗选项。有关急诊室服务的更多详情，请浏览"
        ),
        haServiceGuide: i18n(
            "HA Service Guide",
            "醫院管理局服務指引",
            "医院管理局服务指引"
        ),
        closeButton: i18n("Close", "關閉", "关闭"),
    },
}

function FeesBody({ lang }: { lang: LanguageCode }) {
    const linkLabel = {
        [LanguageCode.EN]: "official Hospital Authority fees page",
        [LanguageCode.ZH]: "醫院管理局官方收費頁面",
        [LanguageCode.CN]: "医院管理局官方收费页面",
    }
    const note = {
        [LanguageCode.EN]:
            "Triage category and fee exemption are determined at your visit by clinical staff, not in advance. Information as of January 2026.",
        [LanguageCode.ZH]:
            "分流類別及費用豁免由醫護人員於求診時決定，無法事先得知。資訊截至2026年1月。",
        [LanguageCode.CN]:
            "分流类别及费用豁免由医护人员于求诊时决定，无法事先得知。信息截至2026年1月。",
    }
    return (
        <p className="text-muted-foreground">
            {note[lang]}{" "}
            <Link
                href={aeFeesLink(lang)}
                className="underline underline-offset-2 hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
            >
                {linkLabel[lang]}
            </Link>
            .
        </p>
    )
}

export const faqEntries: FaqEntry[] = [
    {
        id: "minor-illnesses",
        showInDrawer: true,
        question: i18n(
            "Where should I go for minor illnesses in Hong Kong?",
            "輕微病症應往何處求診？",
            "轻微病症应往何处求诊？"
        ),
        answerLead: i18n(
            "Public A&E departments prioritise critical and emergency cases. Semi-urgent and non-urgent patients may wait longer. If your condition is minor, consider private clinics or primary care services instead of A&E.",
            "公立急症室會優先處理危殆及危急病人，次緊急及非緊急病人或需等候較長時間。如病情輕微，可考慮私家診所或基層醫療服務，而非急症室。",
            "公立急诊室会优先处理危殆及危急病人，次紧急及非紧急病人或需等候较长时间。如病情轻微，可考虑私家诊所或基层医疗服务，而非急诊室。"
        ),
        answerBody: {
            [LanguageCode.EN]: (
                <p>
                    See the{" "}
                    <Link
                        className="underline underline-offset-2"
                        href="https://apps.pcdirectory.gov.hk/public/en"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Primary Care Directory
                    </Link>{" "}
                    or{" "}
                    <Link
                        className="underline underline-offset-2"
                        href="https://www.thkma.org/our_works/hong_kong_doctors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Hong Kong Doctors Homepage
                    </Link>
                    .
                </p>
            ),
            [LanguageCode.ZH]: (
                <p>
                    可參考{" "}
                    <Link
                        className="underline underline-offset-2"
                        href="https://apps.pcdirectory.gov.hk/public/TC"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        基層醫療指南
                    </Link>{" "}
                    或{" "}
                    <Link
                        className="underline underline-offset-2"
                        href="https://www.thkma.org/our_works/hong_kong_doctors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        香港醫生網
                    </Link>
                    。
                </p>
            ),
            [LanguageCode.CN]: (
                <p>
                    可参考{" "}
                    <Link
                        className="underline underline-offset-2"
                        href="https://apps.pcdirectory.gov.hk/public/SC"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        基层医疗指南
                    </Link>{" "}
                    或{" "}
                    <Link
                        className="underline underline-offset-2"
                        href="https://www.thkma.org/our_works/hong_kong_doctors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        香港医生网
                    </Link>
                    。
                </p>
            ),
        },
    },
    {
        id: "triage-priority",
        showInDrawer: true,
        question: i18n(
            "How does the A&E triage system work in Hong Kong?",
            "香港急症室的分流制度如何運作？",
            "香港急诊室的分流制度如何运作？"
        ),
        answerLead: i18n(
            "Hospital Authority A&E departments triage patients into five categories (I–V) by clinical urgency. Category I (critical) and II (emergency) are seen first; Category IV (semi-urgent) and V (non-urgent) typically wait longest.",
            "醫管局急症室按臨床緊急程度將病人分為五類（I至V）。第一類（危殆）及第二類（危急）優先處理；第四類（次緊急）及第五類（非緊急）通常等候最久。",
            "医管局急诊室按临床紧急程度将病人分为五类（I至V）。第一类（危殆）及第二类（危急）优先处理；第四类（次紧急）及第五类（非紧急）通常等候最久。"
        ),
        answerBody: {
            [LanguageCode.EN]: (
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                    <li>
                        <strong>Category I (Critical):</strong> Life-threatening
                    </li>
                    <li>
                        <strong>Category II (Emergency):</strong> May deteriorate
                        rapidly
                    </li>
                    <li>
                        <strong>Category III (Urgent):</strong> Serious, stable
                        vitals
                    </li>
                    <li>
                        <strong>Category IV (Semi-urgent):</strong> Acute, stable
                    </li>
                    <li>
                        <strong>Category V (Non-urgent):</strong> Minor condition
                    </li>
                </ul>
            ),
            [LanguageCode.ZH]: (
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                    <li>
                        <strong>第一類（危殆）：</strong>有生命危險
                    </li>
                    <li>
                        <strong>第二類（危急）：</strong>病情可能迅速惡化
                    </li>
                    <li>
                        <strong>第三類（緊急）：</strong>情況嚴重，生命體徵穩定
                    </li>
                    <li>
                        <strong>第四類（次緊急）：</strong>急性但情況穩定
                    </li>
                    <li>
                        <strong>第五類（非緊急）：</strong>輕微病症
                    </li>
                </ul>
            ),
            [LanguageCode.CN]: (
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                    <li>
                        <strong>第一类（危殆）：</strong>有生命危险
                    </li>
                    <li>
                        <strong>第二类（危急）：</strong>病情可能迅速恶化
                    </li>
                    <li>
                        <strong>第三类（紧急）：</strong>情况严重，生命体征稳定
                    </li>
                    <li>
                        <strong>第四类（次紧急）：</strong>急性但情况稳定
                    </li>
                    <li>
                        <strong>第五类（非紧急）：</strong>轻微病症
                    </li>
                </ul>
            ),
        },
    },
    {
        id: "wait-time-data",
        showInDrawer: true,
        question: i18n(
            "How is A&E wait time data calculated?",
            "急症室等候時間數據如何計算？",
            "急诊室等候时间数据如何计算？"
        ),
        answerLead: i18n(
            "Displayed wait times are a historical reference from the last few hours for Triage Categories IV (semi-urgent) and V (non-urgent) only. The figure shown is the 95th percentile in 0.5-hour increments, for reference only.",
            "顯示的等候時間為過去數小時的歷史參考，僅適用於第四類（次緊急）及第五類（非緊急）病人。數字為第95百分位數，以0.5小時為單位，僅供參考。",
            "显示的等候时间为过去数小时的历史参考，仅适用于第四类（次紧急）及第五类（非紧急）病人。数字为第95百分位数，以0.5小时为单位，仅供参考。"
        ),
    },
    {
        id: "sudden-emergencies",
        showInDrawer: true,
        question: i18n(
            "How do sudden emergencies affect A&E wait times?",
            "突發緊急事件如何影響急症室等候時間？",
            "突发紧急事件如何影响急诊室等候时间？"
        ),
        answerLead: i18n(
            "Sudden severe cases (accidents, heart attacks, etc.) divert A&E resources and can lengthen waits for less urgent patients. Icons showing a hospital is managing critical or emergency cases indicate heavy demand.",
            "突發嚴重個案（如意外、心臟病發等）會調動急症室資源，可能令較不緊急病人等候更久。若顯示醫院正在處理危殆或危急個案，代表需求繁忙。",
            "突发严重个案（如意外、心脏病发等）会调动急诊室资源，可能令较不紧急病人等候更久。若显示医院正在处理危殆或危急个案，代表需求繁忙。"
        ),
    },
    {
        id: "trend-data-source",
        question: i18n(
            "Where does the trend data come from?",
            "趨勢數據來自哪裡？",
            "趋势数据来自哪里？"
        ),
        answerLead: i18n(
            "Trend charts use historical waiting time records from the Hospital Authority open data programme, dating back to 2018. We analyse this dataset to show average waits by day and hour across Hong Kong public A&E departments.",
            "趨勢圖使用醫院管理局開放數據計劃的歷史等候時間記錄，可追溯至2018年。我們分析此數據集，顯示香港公立急症室按日及按小時的平均等候情況。",
            "趋势图使用医院管理局开放数据计划的历史等候时间记录，可追溯至2018年。我们分析此数据集，显示香港公立急诊室按日及按小时的平均等候情况。"
        ),
    },
    {
        id: "best-time-to-visit",
        question: i18n(
            "What is the best time of day to visit an A&E department?",
            "一天中什麼時間去急症室最好？",
            "一天中什么时间去急诊室最好？"
        ),
        answerLead: i18n(
            "Based on historical trends across all hospitals, 12 PM to 1 PM often shows the lowest waits. Early mornings and late nights tend to be busiest. Check live waits on ae.wait.hk before you travel.",
            "根據所有醫院的歷史趨勢，中午12時至1時的等候時間通常較短。清晨及深夜往往較繁忙。出發前請於 ae.wait.hk 查看即時等候時間。",
            "根据所有医院的历史趋势，中午12时至1时的等候时间通常较短。清晨及深夜往往较繁忙。出发前请于 ae.wait.hk 查看即时等候时间。"
        ),
    },
    {
        id: "update-frequency",
        question: i18n(
            "How often is waiting time data updated?",
            "等候時間數據多久更新一次？",
            "等候时间数据多久更新一次？"
        ),
        answerLead: i18n(
            "ae.wait.hk refreshes approximately every 15 minutes from the Hospital Authority official API on data.gov.hk, so you see the same underlying source as the HA wait-time page with enhanced filtering and trends.",
            "ae.wait.hk 約每15分鐘從 data.gov.hk 上的醫管局官方 API 更新，與醫管局等候時間頁面使用相同數據來源，並提供進階篩選及趨勢功能。",
            "ae.wait.hk 约每15分钟从 data.gov.hk 上的医管局官方 API 更新，与医管局等候时间页面使用相同数据来源，并提供进阶筛选及趋势功能。"
        ),
    },
    {
        id: "why-focus-cat-iv-v",
        question: i18n(
            "Why does ae.wait.hk focus on semi-urgent and non-urgent categories?",
            "為何 ae.wait.hk 專注於次緊急及非緊急類別？",
            "为何 ae.wait.hk 专注于次紧急及非紧急类别？"
        ),
        answerLead: i18n(
            "Patients in Category IV and V often have time to compare hospitals before travelling. Those in critical, emergency, or urgent categories should seek care immediately rather than comparing waits. Higher Cat IV/V waits often correlate with busier departments overall.",
            "第四類及第五類病人通常有時間在前往前比較各醫院。危殆、危急或緊急類別的病人應立即求醫，而非比較等候時間。次緊急及非緊急等候時間較長的醫院，整體往往亦較繁忙。",
            "第四类及第五类病人通常有时间在前往前比较各医院。危殆、危急或紧急类别的病人应立即求医，而非比较等候时间。次紧急及非紧急等候时间较长的医院，整体往往亦较繁忙。"
        ),
    },
    {
        id: "management-status",
        question: i18n(
            "What do critical and emergency management status icons mean?",
            "危殆及危急處理狀態圖標代表什麼？",
            "危殆及危急处理状态图标代表什么？"
        ),
        answerLead: i18n(
            "These icons show whether a hospital is actively managing Category I (critical) or Category II (emergency) cases. When resources are focused on high-priority patients, waits for semi-urgent and non-urgent categories may increase significantly.",
            "這些圖標顯示醫院是否正在處理第一類（危殆）或第二類（危急）病人。當資源集中於高優先個案時，次緊急及非緊急類別的等候時間可能大幅增加。",
            "这些图标显示医院是否正在处理第一类（危殆）或第二类（危急）病人。当资源集中于高优先个案时，次紧急及非紧急类别的等候时间可能大幅增加。"
        ),
    },
    {
        id: "trend-chart",
        question: i18n(
            "How can I see trend data for a hospital?",
            "如何查看醫院的趨勢數據？",
            "如何查看医院的趋势数据？"
        ),
        answerLead: i18n(
            "On the home page, click a hospital row to open a panel with live busyness, hourly trends, and contact details. Or visit a hospital page at /hospital/{slug} for the full trend chart and wait times by triage category.",
            "在主頁點擊醫院記錄可開啟面板，查看即時繁忙程度、每小時趨勢及聯絡資料。亦可瀏覽 /hospital/{slug} 醫院頁面，查看完整趨勢圖及各分流類別的等候時間。",
            "在主页点击医院记录可开启面板，查看即时繁忙程度、每小时趋势及联络资料。亦可浏览 /hospital/{slug} 医院页面，查看完整趋势图及各分流类别的等候时间。"
        ),
        answerBody: {
            [LanguageCode.EN]: (
                <p>
                    <Link href="/hospitals" className="underline underline-offset-2">
                        Browse all hospitals
                    </Link>{" "}
                    or return to the{" "}
                    <Link href="/" className="underline underline-offset-2">
                        live wait-time table
                    </Link>
                    .
                </p>
            ),
            [LanguageCode.ZH]: (
                <p>
                    <Link href="/hospitals" className="underline underline-offset-2">
                        瀏覽所有醫院
                    </Link>
                    或返回{" "}
                    <Link href="/" className="underline underline-offset-2">
                        即時等候時間表
                    </Link>
                    。
                </p>
            ),
            [LanguageCode.CN]: (
                <p>
                    <Link href="/hospitals" className="underline underline-offset-2">
                        浏览所有医院
                    </Link>
                    或返回{" "}
                    <Link href="/" className="underline underline-offset-2">
                        即时等候时间表
                    </Link>
                    。
                </p>
            ),
        },
    },
    {
        id: "triage-determination",
        question: i18n(
            "How can I determine my triage category before visiting A&E?",
            "求診前能否得知自己的分流類別？",
            "求诊前能否得知自己的分流类别？"
        ),
        answerLead: i18n(
            "You cannot know your triage category before arrival. The Hospital Authority does not disclose this in advance. An experienced nurse assesses you after registration and assigns Category I–V based on clinical need.",
            "您無法在到達前得知分流類別。醫院管理局不會事先公布。登記後由經驗豐富的護士評估病情，並按臨床需要分配第一至第五類。",
            "您无法在到达前得知分流类别。医院管理局不会事先公布。登记后由经验丰富的护士评估病情，并按临床需要分配第一至第五类。"
        ),
    },
    {
        id: "ae-fees",
        question: i18n(
            "How much does it cost to attend an A&E department in Hong Kong?",
            "在香港求診急症室要多少錢？",
            "在香港求诊急诊室要多少钱？"
        ),
        answerLead: i18n(
            "From 1 January 2026, eligible persons (valid HKID) pay HK$400 per public hospital A&E visit. Patients triaged as Category I (critical) or II (emergency) are fee-exempt. Non-eligible persons pay HK$2,100 with no exemptions. Fees are set by the Hospital Authority.",
            "由2026年1月1日起，合資格人士（持有有效香港身份證）每次公立醫院急症室求診為400港元。被分流為第一類（危殆）或第二類（危急）的病人獲豁免收費。非合資格人士為2,100港元，不設豁免。收費由醫院管理局訂定。",
            "由2026年1月1日起，合资格人士（持有有效香港身份证）每次公立医院急诊室求诊为400港元。被分流为第一类（危殆）或第二类（危急）的病人获豁免收费。非合资格人士为2,100港元，不设豁免。收费由医院管理局订定。"
        ),
        answerBody: {
            [LanguageCode.EN]: <FeesBody lang={LanguageCode.EN} />,
            [LanguageCode.ZH]: <FeesBody lang={LanguageCode.ZH} />,
            [LanguageCode.CN]: <FeesBody lang={LanguageCode.CN} />,
        },
    },
    {
        id: "predicted-wait-times",
        showInDrawer: true,
        question: i18n(
            "How are wait times predicted?",
            "等候時間如何預測？",
            "等候时间如何预测？"
        ),
        answerLead: i18n(
            `Predictions use a machine learning model trained on about 8 months of HA historical data, shown at +1h, +2h, and +3h on trend charts. Forecasts are capped below ${PREDICTION_SUPPRESS_MINS / 60} hours and are for reference only — not medical advice.`,
            `預測使用約8個月醫管局歷史數據訓練的機器學習模型，於趨勢圖顯示+1、+2及+3小時。預測在${PREDICTION_SUPPRESS_MINS / 60}小時以下顯示，僅供參考，不構成醫療建議。`,
            `预测使用约8个月医管局历史数据训练的机器学习模型，于趋势图显示+1、+2及+3小时。预测在${PREDICTION_SUPPRESS_MINS / 60}小时以下显示，仅供参考，不构成医疗建议。`
        ),
        answerBody: {
            [LanguageCode.EN]: (
                <p className="text-muted-foreground">
                    The model may underpredict at high waits; forecasts are raised
                    to at least the current wait above {PREDICTION_CAP_MINS / 60}{" "}
                    hours. We continuously review and improve the model.
                </p>
            ),
            [LanguageCode.ZH]: (
                <p className="text-muted-foreground">
                    等候時間較長時模型可能低估；超過 {PREDICTION_CAP_MINS / 60}{" "}
                    小時時，預測值會調高至不低於當前等候時間。我們持續檢討及改善模型。
                </p>
            ),
            [LanguageCode.CN]: (
                <p className="text-muted-foreground">
                    等候时间较长时模型可能低估；超过 {PREDICTION_CAP_MINS / 60}{" "}
                    小时时，预测值会调高至不低于当前等候时间。我们持续检讨及改善模型。
                </p>
            ),
        },
    },
]

export type FaqGroup = {
    id: string
    title: LocalizedString
    icon: LucideIcon
    entryIds: string[]
}

export const faqGroups: FaqGroup[] = [
    {
        id: "getting-started",
        title: i18n("Getting Started", "入門指南", "入门指南"),
        icon: BookOpen,
        entryIds: ["minor-illnesses", "triage-priority", "triage-determination"],
    },
    {
        id: "wait-times",
        title: i18n("Wait Times", "等候時間", "等候时间"),
        icon: Clock,
        entryIds: [
            "wait-time-data",
            "sudden-emergencies",
            "best-time-to-visit",
            "update-frequency",
        ],
    },
    {
        id: "understanding-data",
        title: i18n("Understanding Data", "了解數據", "了解数据"),
        icon: BarChart3,
        entryIds: [
            "trend-data-source",
            "why-focus-cat-iv-v",
            "management-status",
            "predicted-wait-times",
        ],
    },
    {
        id: "using-the-site",
        title: i18n("Using the Site", "使用網站", "使用网站"),
        icon: Monitor,
        entryIds: ["trend-chart"],
    },
    {
        id: "costs-and-fees",
        title: i18n("Costs & Fees", "收費", "收费"),
        icon: CircleDollarSign,
        entryIds: ["ae-fees"],
    },
]

const faqEntryMap = new Map(faqEntries.map((entry) => [entry.id, entry]))

export function getFaqEntryById(id: string): FaqEntry | undefined {
    return faqEntryMap.get(id)
}

export function getFaqGroupForEntry(entryId: string): FaqGroup | undefined {
    return faqGroups.find((group) => group.entryIds.includes(entryId))
}

export function resolveFaqGroups(): { group: FaqGroup; entries: FaqEntry[] }[] {
    return faqGroups.map((group) => ({
        group,
        entries: group.entryIds.map((id) => {
            const entry = faqEntryMap.get(id)
            if (!entry) {
                throw new Error(`FAQ entry not found: ${id}`)
            }
            return entry
        }),
    }))
}

export const drawerFaqEntries = faqEntries.filter(
    (e) => e.showInDrawer !== false
)

/** @deprecated Use faqEntries / informationDrawerMeta — kept for gradual migration */
export const informationContent = {
    triggerText: informationDrawerMeta.triggerText,
    title: informationDrawerMeta.title,
    description: informationDrawerMeta.description,
    accordionItems: drawerFaqEntries.map((entry) => ({
        id: entry.id,
        title: entry.question,
        content: {
            [LanguageCode.EN]: (
                <>
                    <p className="mb-2">{entry.answerLead[LanguageCode.EN]}</p>
                    {entry.answerBody?.[LanguageCode.EN]}
                </>
            ),
            [LanguageCode.ZH]: (
                <>
                    <p className="mb-2">{entry.answerLead[LanguageCode.ZH]}</p>
                    {entry.answerBody?.[LanguageCode.ZH]}
                </>
            ),
            [LanguageCode.CN]: (
                <>
                    <p className="mb-2">{entry.answerLead[LanguageCode.CN]}</p>
                    {entry.answerBody?.[LanguageCode.CN]}
                </>
            ),
        },
    })),
    footer: informationDrawerMeta.footer,
}
