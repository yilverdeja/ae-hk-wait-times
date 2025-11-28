import { LanguageCode } from "@/types"
import Link from "next/link"
import React from "react"

// The type for localized text is React.ReactNode to allow for JSX.
type LocalizedText = {
    [key in LanguageCode]: React.ReactNode
}

type AccordionItem = {
    id: string
    title: LocalizedText
    content: LocalizedText
}

type InformationContent = {
    triggerText: LocalizedText
    title: LocalizedText
    description: LocalizedText
    accordionItems: AccordionItem[]
    footer: {
        text: LocalizedText
        haServiceGuide: LocalizedText
        closeButton: LocalizedText
    }
}

// This data structure is now valid because it resides in a .tsx file.
export const informationContent: InformationContent = {
    triggerText: {
        en: "Understanding the Wait",
        zh: "了解等候時間",
        cn: "了解等候时间",
    },
    title: {
        en: "Understanding A&E Wait Times",
        zh: "了解急症室等候時間",
        cn: "了解急症室等候时间",
    },
    description: {
        en: "Key information to help you understand how wait times are estimated and what they mean.",
        zh: "重要資訊，助您了解等候時間的估算方式及其含義。",
        cn: "重要信息，助您了解等候时间的估算方式及其含义。",
    },
    accordionItems: [
        {
            id: "minor-illnesses",
            title: {
                en: "Where to Go for Minor Illnesses",
                zh: "輕微病症應往何處求診",
                cn: "轻微病症应往何处求诊",
            },
            content: {
                en: (
                    <>
                        <p className="mb-2">
                            Priority will be accorded to patients triaged as
                            critical and emergency. Semi-urgent and non-urgent
                            patients may experience longer waiting time. Please
                            be patient while waiting for consultation.
                        </p>
                        <p>
                            Patient with minor illnesses can consider seeking
                            alternative medical services from private clinics
                            (as listed in{" "}
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
                            ).
                        </p>
                    </>
                ),
                zh: (
                    <>
                        <p className="mb-2">
                            危殆及危急病人會獲優先處理。次緊急及非緊急病人或需等候較長時間，請耐心等候診症。
                        </p>
                        <p>
                            病情輕微的病人可考慮向私家診所求診（可參考{" "}
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
                            ）。
                        </p>
                    </>
                ),
                cn: (
                    <>
                        <p className="mb-2">
                            危殆及危急病人会获优先处理。次紧急及非紧急病人或需等候较长时间，请耐心等候诊症。
                        </p>
                        <p>
                            病情轻微的病人可考虑向私家诊所求诊（可参考{" "}
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
                            ）。
                        </p>
                    </>
                ),
            },
        },
        {
            id: "triage-priority",
            title: {
                en: "Triage System & Priority of Care",
                zh: "分流制度與護理優次",
                cn: "分流制度与护理优次",
            },
            content: {
                en: (
                    <>
                        <p className="mb-2">
                            A&E departments use a triage system to prioritize
                            patients based on the severity of their condition,
                            ensuring those in most urgent need receive immediate
                            care. Patients are assessed and sorted into five
                            categories:
                        </p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>
                                <strong>Category I (Critical):</strong>{" "}
                                Life-threatening, requires immediate treatment.
                            </li>
                            <li>
                                <strong>Category II (Emergency):</strong>{" "}
                                Condition may deteriorate rapidly.
                            </li>
                            <li>
                                <strong>Category III (Urgent):</strong> Serious,
                                but vital signs are stable.
                            </li>
                            <li>
                                <strong>Category IV (Semi-urgent):</strong>{" "}
                                Acute but stable condition.
                            </li>
                            <li>
                                <strong>Category V (Non-urgent):</strong> Minor
                                condition, no serious complications expected.
                            </li>
                        </ul>
                    </>
                ),
                zh: (
                    <>
                        <p className="mb-2">
                            急症室採用分流制度，根據病情的嚴重程度安排病人就診的優先次序，確保最緊急的病人能即時獲得護理。病人會被評估並分為五類：
                        </p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>
                                <strong>第一類 (危殆):</strong>{" "}
                                有生命危險，需即時治療。
                            </li>
                            <li>
                                <strong>第二類 (危急):</strong>{" "}
                                病情可能迅速惡化。
                            </li>
                            <li>
                                <strong>第三類 (緊急):</strong>{" "}
                                情況嚴重，但生命體徵穩定。
                            </li>
                            <li>
                                <strong>第四類 (次緊急):</strong>{" "}
                                急性但情況穩定。
                            </li>
                            <li>
                                <strong>第五類 (非緊急):</strong>{" "}
                                輕微病症，預計無嚴重併發症。
                            </li>
                        </ul>
                    </>
                ),
                cn: (
                    <>
                        <p className="mb-2">
                            急诊室采用分流制度，根据病情的严重程度安排病人就诊的优先次序，确保最紧急的病人能即时获得护理。病人会被评估并分为五类：
                        </p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>
                                <strong>第一类 (危殆):</strong>{" "}
                                有生命危险，需即时治疗。
                            </li>
                            <li>
                                <strong>第二类 (危急):</strong>{" "}
                                病情可能迅速恶化。
                            </li>
                            <li>
                                <strong>第三类 (紧急):</strong>{" "}
                                情况严重，但生命体征稳定。
                            </li>
                            <li>
                                <strong>第四类 (次紧急):</strong>{" "}
                                急性但情况稳定。
                            </li>
                            <li>
                                <strong>第五类 (非紧急):</strong>{" "}
                                轻微病症，预计无严重并发症。
                            </li>
                        </ul>
                    </>
                ),
            },
        },
        {
            id: "wait-time-data",
            title: {
                en: "About the Wait Time Data",
                zh: "關於等候時間數據",
                cn: "关于等候时间数据",
            },
            content: {
                en: (
                    <p>
                        The wait times shown are a historical reference from the
                        last few hours and are for{" "}
                        <strong>
                            Triage Categories IV (Semi-urgent) and V
                            (Non-urgent)
                        </strong>{" "}
                        only. The time represents the 50th percentile, displayed
                        in 0.5-hour increments. This data is for reference only
                        and may not accurately reflect the current, dynamic wait
                        times in the department.
                    </p>
                ),
                zh: (
                    <p>
                        顯示的等候時間為過去數小時的歷史參考數據，且僅適用於
                        <strong>第四類（次緊急）和第五類（非緊急）</strong>
                        的病人。該時間為第50百分位數，以0.5小時為單位顯示。此數據僅供參考，未必能準確反映急症室當前的實時等候情況。
                    </p>
                ),
                cn: (
                    <p>
                        显示的等候时间为过去数小时的历史参考数据，且仅适用于
                        <strong>第四类（次紧急）和第五类（非紧急）</strong>
                        的病人。该时间为第50百分位数，以0.5小时为单位显示。此数据仅供参考，未必能准确反映急诊室当前的实时等候情况。
                    </p>
                ),
            },
        },
        {
            id: "sudden-emergencies",
            title: {
                en: "Impact of Sudden Emergencies",
                zh: "突發緊急事件的影響",
                cn: "突发紧急事件的影响",
            },
            content: {
                en: (
                    <p>
                        A&E departments must prioritize sudden and severe cases
                        (e.g., accidents, heart attacks). This can significantly
                        affect resources and increase wait times for less urgent
                        patients. The icons for{" "}
                        <strong>&apos;Managing Case&apos;</strong> or{" "}
                        <strong>&apos;Managing Multiple Cases&apos;</strong>{" "}
                        indicate that the hospital is actively treating one or
                        more Critical (Category I) or Emergency (Category II)
                        patients. We appreciate your patience during these
                        times.
                    </p>
                ),
                zh: (
                    <p>
                        急症室必須優先處理突發的嚴重個案（例如：意外、心臟病發）。這會顯著影響資源調配，並可能增加較不緊急病人的等候時間。
                        <strong>「處理中個案」</strong>或
                        <strong>「處理中多宗個案」</strong>
                        的圖標表示醫院的危殆（第一類）或危急（第二類）區域正在處理至少一宗或多宗嚴重個案。感謝您在此期間的耐心等候。
                    </p>
                ),
                cn: (
                    <p>
                        急诊室必须优先处理突发的严重个案（例如：意外、心脏病发）。这会显著影响资源调配，并可能增加较不紧急病人的等候时间。
                        <strong>“处理中个案”</strong>或
                        <strong>“处理中多宗个案”</strong>
                        的图标表示医院的危殆（第一类）或危急（第二类）区域正在处理至少一宗或多宗严重个案。感谢您在此期间的耐心等候。
                    </p>
                ),
            },
        },
    ],
    footer: {
        text: {
            en: "For patients with minor conditions, considering alternative healthcare options is advisable. For more details on A&E services, visit the",
            zh: "病情輕微的病人建議考慮其他醫療選項。有關急症室服務的更多詳情，請瀏覽",
            cn: "病情轻微的病人建议考虑其他医疗选项。有关急诊室服务的更多详情，请浏览",
        },
        haServiceGuide: {
            en: "HA Service Guide",
            zh: "醫院管理局服務指引",
            cn: "医院管理局服务指引",
        },
        closeButton: {
            en: "Close",
            zh: "關閉",
            cn: "关闭",
        },
    },
}
