import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import advancedFormat from "dayjs/plugin/advancedFormat"
import zhCN from "dayjs/locale/zh-cn"
import zhHK from "dayjs/locale/zh-hk"
import "dayjs/locale/zh-cn"
import "dayjs/locale/zh-hk"

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)

export default dayjs
export { zhCN, zhHK }
