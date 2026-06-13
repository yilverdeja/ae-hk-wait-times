import { siteConfig } from "@/configs/site"
import { i18n } from "@/lib/i18n"
import { aeFeesLink, haServiceGuideLink } from "@/lib/utils"
import { LanguageCode, LocalizedString } from "@/types"
import {
    AlertTriangle,
    BarChart3,
    BookOpen,
    CircleDollarSign,
    Clock,
    LucideIcon,
    Monitor,
    Siren,
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
        "Answers to common questions about Hong Kong public hospital A&E wait times, triage, fees, and how our site uses official Hospital Authority data. Information is for reference only and is not medical advice.",
        "有關香港公立醫院急症室等候時間、分流、收費及本網站如何使用醫管局官方數據的常見問題解答。資訊僅供參考，不構成醫療建議。",
        "有关香港公立医院急诊室等候时间、分流、收费及本网站如何使用医管局官方数据的常见问题解答。信息仅供参考，不构成医疗建议。"
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
    const prefix = {
        [LanguageCode.EN]: "For the latest fee details, see the ",
        [LanguageCode.ZH]: "有關最新收費詳情，請參閱",
        [LanguageCode.CN]: "有关最新收费详情，请参阅",
    }
    const linkLabel = {
        [LanguageCode.EN]: "official Hospital Authority fees page",
        [LanguageCode.ZH]: "醫院管理局官方收費頁面",
        [LanguageCode.CN]: "医院管理局官方收费页面",
    }
    const suffix = {
        [LanguageCode.EN]: ".",
        [LanguageCode.ZH]: "。",
        [LanguageCode.CN]: "。",
    }
    return (
        <p className="text-muted-foreground">
            {prefix[lang]}
            <Link
                href={aeFeesLink(lang)}
                className="underline underline-offset-2 hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
            >
                {linkLabel[lang]}
            </Link>
            {suffix[lang]}
        </p>
    )
}

function UpdateFrequencyBody({ lang }: { lang: LanguageCode }) {
    const prefix = {
        [LanguageCode.EN]:
            "We source data from the ",
        [LanguageCode.ZH]: "數據來自",
        [LanguageCode.CN]: "数据来自",
    }
    const linkLabel = {
        [LanguageCode.EN]: "Hospital Authority official API on data.gov.hk",
        [LanguageCode.ZH]: "data.gov.hk 上的醫管局官方 API",
        [LanguageCode.CN]: "data.gov.hk 上的医管局官方 API",
    }
    const suffix = {
        [LanguageCode.EN]:
            ", the same underlying source as the HA wait-time page, with enhanced filtering and trends.",
        [LanguageCode.ZH]:
            "，與醫管局等候時間頁面使用相同數據來源，並提供進階篩選及趨勢功能。",
        [LanguageCode.CN]:
            "，与医管局等候时间页面使用相同数据来源，并提供进阶筛选及趋势功能。",
    }
    return (
        <p className="text-muted-foreground">
            {prefix[lang]}
            <Link
                href={siteConfig.openDataLink}
                className="underline underline-offset-2 hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
            >
                {linkLabel[lang]}
            </Link>
            {suffix[lang]}
        </p>
    )
}

function HaOfficialInfoBody({ lang }: { lang: LanguageCode }) {
    const prefix = {
        [LanguageCode.EN]:
            "For official information about A&E services, triage, and how public hospitals prioritise patients, please visit the ",
        [LanguageCode.ZH]:
            "有關急症室服務、分流及公立醫院如何安排病人優先次序的官方資訊，請瀏覽",
        [LanguageCode.CN]:
            "有关急诊室服务、分流及公立医院如何安排病人优先次序的官方信息，请浏览",
    }
    const suffix = {
        [LanguageCode.EN]: ".",
        [LanguageCode.ZH]: "。",
        [LanguageCode.CN]: "。",
    }
    return (
        <p className="text-muted-foreground">
            {prefix[lang]}
            <Link
                href={haServiceGuideLink(lang)}
                className="underline underline-offset-2 hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
            >
                {informationDrawerMeta.footer.haServiceGuide[lang]}
            </Link>
            {suffix[lang]}
        </p>
    )
}

function ManagementStatusIconLegend({ lang }: { lang: LanguageCode }) {
    const labels = {
        [LanguageCode.EN]: {
            managing:
                "Managing at least one critical or emergency case",
            multiple: "Managing multiple critical cases",
        },
        [LanguageCode.ZH]: {
            managing: "正在處理至少一宗危殆或危急個案",
            multiple: "正在處理多宗危殆個案",
        },
        [LanguageCode.CN]: {
            managing: "正在处理至少一宗危殆或危急个案",
            multiple: "正在处理多宗危殆个案",
        },
    }
    return (
        <div className="flex flex-col gap-2 text-muted-foreground">
            <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 shrink-0 text-yellow-500" />
                <span>{labels[lang].managing}</span>
            </div>
            <div className="flex items-center gap-2">
                <Siren className="h-5 w-5 shrink-0 text-red-600" />
                <span>{labels[lang].multiple}</span>
            </div>
        </div>
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
            "What do the wait times mean?",
            "等候時間代表什麼？",
            "等候时间代表什么？"
        ),
        answerLead: i18n(
            "The main wait-time table shows the 95th percentile wait for semi-urgent (Category IV) and non-urgent (Category V) patients, based on the past few hours. This means most patients in those categories waited less than the time shown. It is a reference only, not a guarantee.",
            "主頁等候時間表顯示第四類（次緊急）及第五類（非緊急）病人過去數小時的第95百分位數等候時間。這表示大多數該類別病人等候時間少於所示數字。僅供參考，並非保證。",
            "主页等候时间表显示第四类（次紧急）及第五类（非紧急）病人过去数小时的第95百分位数等候时间。这表示大多数该类别病人等候时间少于所示数字。仅供参考，并非保证。"
        ),
        answerBody: {
            [LanguageCode.EN]: (
                <p className="text-muted-foreground">
                    On the map view and individual hospital pages, you can also
                    view wait times for other triage categories (urgent,
                    emergency, critical).{" "}
                    <Link
                        href="/hospitals"
                        className="underline underline-offset-2 hover:text-foreground"
                    >
                        Browse all hospitals
                    </Link>
                    .
                </p>
            ),
            [LanguageCode.ZH]: (
                <p className="text-muted-foreground">
                    在地圖檢視及個別醫院頁面，您亦可查看其他分流類別（緊急、危急、危殆）的等候時間。{" "}
                    <Link
                        href="/hospitals"
                        className="underline underline-offset-2 hover:text-foreground"
                    >
                        瀏覽所有醫院
                    </Link>
                    。
                </p>
            ),
            [LanguageCode.CN]: (
                <p className="text-muted-foreground">
                    在地图视图及个别医院页面，您亦可查看其他分流类别（紧急、危急、危殆）的等候时间。{" "}
                    <Link
                        href="/hospitals"
                        className="underline underline-offset-2 hover:text-foreground"
                    >
                        浏览所有医院
                    </Link>
                    。
                </p>
            ),
        },
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
            "When a hospital receives sudden severe cases — such as major accidents or heart attacks — staff and resources are directed to those patients first. Waits for semi-urgent and non-urgent patients can increase quickly, and the spike may not show up in historical wait figures right away.",
            "當醫院接收突發嚴重個案（如大型意外或心臟病發）時，醫護人員及資源會優先處理這些病人。次緊急及非緊急病人的等候時間可能迅速增加，而升幅未必即時反映於歷史等候數據。",
            "当医院接收突发严重个案（如大型意外或心脏病发）时，医护人员及资源会优先处理这些病人。次紧急及非紧急病人的等候时间可能迅速增加，而升幅未必即时反映于历史等候数据。"
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
            "Based on historical trends across all hospitals, 12 PM to 1 PM often shows the lowest waits. Early mornings and late nights tend to be busiest. Check live waits on our site before you travel.",
            "根據所有醫院的歷史趨勢，中午12時至1時的等候時間通常較短。清晨及深夜往往較繁忙。出發前請於本網站查看即時等候時間。",
            "根据所有医院的历史趋势，中午12时至1时的等候时间通常较短。清晨及深夜往往较繁忙。出发前请于本网站查看即时等候时间。"
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
            "Our site refreshes wait time data approximately every 15 minutes from official Hospital Authority sources.",
            "本網站約每15分鐘從醫管局官方來源更新等候時間數據。",
            "本网站约每15分钟从医管局官方来源更新等候时间数据。"
        ),
        answerBody: {
            [LanguageCode.EN]: (
                <UpdateFrequencyBody lang={LanguageCode.EN} />
            ),
            [LanguageCode.ZH]: (
                <UpdateFrequencyBody lang={LanguageCode.ZH} />
            ),
            [LanguageCode.CN]: (
                <UpdateFrequencyBody lang={LanguageCode.CN} />
            ),
        },
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
            "On the wait-time table, icons next to a hospital name show when the Hospital Authority reports the department is managing critical or emergency cases. These often appear during busy periods and can mean longer waits for semi-urgent and non-urgent patients:",
            "在等候時間表上，醫院名稱旁的圖標表示醫管局報告該部門正在處理危殆或危急個案。這通常出現於繁忙時段，並可能意味次緊急及非緊急病人需等候更久：",
            "在等候时间表上，医院名称旁的图标表示医管局报告该部门正在处理危殆或危急个案。这通常出现于繁忙时段，并可能意味次紧急及非紧急病人需等候更久："
        ),
        answerBody: {
            [LanguageCode.EN]: (
                <ManagementStatusIconLegend lang={LanguageCode.EN} />
            ),
            [LanguageCode.ZH]: (
                <ManagementStatusIconLegend lang={LanguageCode.ZH} />
            ),
            [LanguageCode.CN]: (
                <ManagementStatusIconLegend lang={LanguageCode.CN} />
            ),
        },
    },
    {
        id: "trend-chart",
        question: i18n(
            "How can I see trend data for a hospital?",
            "如何查看醫院的趨勢數據？",
            "如何查看医院的趋势数据？"
        ),
        answerLead: i18n(
            "On the home page, click a hospital row to open a panel with live busyness, hourly trends, and contact details. To see the full trend chart and wait times by triage category, go to All Hospitals and select a hospital.",
            "在主頁點擊醫院記錄可開啟面板，查看即時繁忙程度、每小時趨勢及聯絡資料。要查看完整趨勢圖及各分流類別的等候時間，請前往「所有醫院」並選擇一間醫院。",
            "在主页点击医院记录可开启面板，查看即时繁忙程度、每小时趋势及联络资料。要查看完整趋势图及各分流类别的等候时间，请前往「所有医院」并选择一间医院。"
        ),
        answerBody: {
            [LanguageCode.EN]: (
                <p>
                    <Link href="/hospitals" className="underline underline-offset-2">
                        Browse all hospitals
                    </Link>
                    .
                </p>
            ),
            [LanguageCode.ZH]: (
                <p>
                    <Link href="/hospitals" className="underline underline-offset-2">
                        瀏覽所有醫院
                    </Link>
                    。
                </p>
            ),
            [LanguageCode.CN]: (
                <p>
                    <Link href="/hospitals" className="underline underline-offset-2">
                        浏览所有医院
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
        id: "ha-official-info",
        question: i18n(
            "I have more questions about the Hospital Authority — where should I look?",
            "我對醫院管理局還有更多疑問——應往哪裡查詢？",
            "我对医院管理局还有更多疑问——应往哪里查询？"
        ),
        answerLead: i18n(
            "This site is not affiliated with or endorsed by the Hospital Authority.",
            "本網站並非醫院管理局的附屬或認可網站。",
            "本网站并非医院管理局的附属或认可网站。"
        ),
        answerBody: {
            [LanguageCode.EN]: (
                <HaOfficialInfoBody lang={LanguageCode.EN} />
            ),
            [LanguageCode.ZH]: (
                <HaOfficialInfoBody lang={LanguageCode.ZH} />
            ),
            [LanguageCode.CN]: (
                <HaOfficialInfoBody lang={LanguageCode.CN} />
            ),
        },
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
            "Trend charts show estimated waits for the next 1, 2, and 3 hours. These forecasts use a machine learning model trained on recent Hospital Authority historical data.",
            "趨勢圖顯示未來1、2及3小時的預估等候時間。預測使用以近期醫管局歷史數據訓練的機器學習模型。",
            "趋势图显示未来1、2及3小时的预估等候时间。预测使用以近期医管局历史数据训练的机器学习模型。"
        ),
        answerBody: {
            [LanguageCode.EN]: (
                <p className="text-muted-foreground">
                    They are for reference only and are not medical advice. When
                    waits are very high (above 8 hours), predictions may be
                    hidden or adjusted upward so they are not unrealistically
                    low.
                </p>
            ),
            [LanguageCode.ZH]: (
                <p className="text-muted-foreground">
                    僅供參考，不構成醫療建議。當等候時間非常高（超過8小時）時，預測可能被隱藏或向上調整，以免顯示不切實際的偏低數字。
                </p>
            ),
            [LanguageCode.CN]: (
                <p className="text-muted-foreground">
                    仅供参考，不构成医疗建议。当等候时间非常高（超过8小时）时，预测可能被隐藏或向上调整，以免显示不切实际的偏低数字。
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
        entryIds: ["minor-illnesses", "triage-priority", "triage-determination", "ha-official-info"],
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
