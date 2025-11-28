import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import zhCN from "dayjs/locale/zh-cn"
import "dayjs/locale/zh-hk"
import zhHK from "dayjs/locale/zh-hk"
import advancedFormat from "dayjs/plugin/advancedFormat"
import customParseFormat from "dayjs/plugin/customParseFormat"

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)

export default dayjs
export { zhCN, zhHK }
