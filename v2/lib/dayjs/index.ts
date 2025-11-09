import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// Extend dayjs with the customParseFormat plugin. This only needs to be done once.
dayjs.extend(customParseFormat);

export default dayjs;