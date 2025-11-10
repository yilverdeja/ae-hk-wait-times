import { i18n } from "@/lib/i18n"
import { HospitalData, Region, Cluster } from "@/types"

export const hospitals: HospitalData = {
    AHMLNH: {
        name: i18n(
            "Alice Ho Miu Ling Nethersole Hospital",
            "愛德華七世醫院",
            "愛德華七世醫院"
        ),
        region: Region.NewTerritories,
        linkId: "100171",
        cluster: Cluster.NewTerritoriesEast,
        address: i18n(
            "11 Chuen On Road, Tai Po, NT",
            "元朗大馬路11號, 元朗, 新界",
            "元朗大馬路11號, 元朗, 新界"
        ),
        telephone: "2689 2000",
        fax: "2662 1690",
        email: "ahnh_enquiry@ha.org.hk",
        website: "https://www3.ha.org.hk/AHNH/index_e.asp",
        googleMapsLink: "https://maps.app.goo.gl/xWmgrNkN5PKd1GNB8",
    },
    CMC: {
        name: i18n("Caritas Medical Centre", "明愛醫院", "明愛醫院"),
        region: Region.Kowloon,
        linkId: "100163",
        cluster: Cluster.KowloonWest,
        address: i18n(
            "111 Wing Hong Street, Sham Shui Po, KLN",
            "旺角欽州街111號, 旺角, 九龍",
            "旺角欽州街111號, 旺角, 九龍"
        ),
        telephone: "3408 5678",
        fax: "2785 5755",
        email: "cmc.enq@ha.org.hk",
        googleMapsLink: "https://maps.app.goo.gl/RHspT8VfgdGJVffY7",
    },
    KWH: {
        name: i18n("Kwong Wah Hospital", "廣華醫院", "廣華醫院"),
        region: Region.Kowloon,
        linkId: "100153",
        cluster: Cluster.KowloonCentral,
        address: i18n(
            "25 Waterloo Road, KLN",
            "九龍水兵威道25號, 九龍",
            "九龍水兵威道25號, 九龍"
        ),
        telephone: "2332 2311",
        fax: "3517 5481",
        email: "kwh.enquiry@ha.org.hk",
        website: "https://www3.ha.org.hk/kwh/main/en/index.asp",
        googleMapsLink: "https://maps.app.goo.gl/v5nGqGXHwhSheXeY7",
    },
    NDH: {
        name: i18n("North District Hospital", "北區醫院", "北區醫院"),
        region: Region.NewTerritories,
        linkId: "100178",
        cluster: Cluster.NewTerritoriesEast,
        address: i18n(
            "9 Po Kin Road, Sheung Shui, NT",
            "新界粉嶺坪輋路9號, 粉嶺, 新界",
            "新界粉嶺坪輋路9號, 粉嶺, 新界"
        ),
        telephone: "2683 8888",
        fax: "2683 8383",
        email: "ndh_enquiry@ha.org.hk",
        website: "https://www3.ha.org.hk/ndh/index_e.asp",
        googleMapsLink: "https://maps.app.goo.gl/bMecWjrymELPVzDD6",
    },
    NLH: {
        name: i18n("North Lantau Hospital", "北大嶼山醫院", "北大嶼山醫院"),
        region: Region.NewTerritories,
        linkId: "216546",
        cluster: Cluster.KowloonWest,
        address: i18n(
            "8 Chung Yan Road, Tung Chung, Lantau Island",
            "大嶼山東涌道8號, 東涌, 大嶼山",
            "大嶼山東涌道8號, 東涌, 大嶼山"
        ),
        telephone: "3467 7000",
        fax: "3467 7004",
        email: "nlth.enquiry@ha.org.hk",
        googleMapsLink: "https://maps.app.goo.gl/3AKWdxSKQrRH3kLR7",
    },
    PMH: {
        name: i18n("Princess Margaret Hospital", "瑪嘉烈醫院", "瑪嘉烈醫院"),
        region: Region.NewTerritories,
        linkId: "100160",
        cluster: Cluster.KowloonWest,
        address: i18n(
            "2-10 Princess Margaret Hospital Road, Lai Chi Kok, Kowloon",
            "九龍荔枝角瑪嘉烈醫院道2-10號, 荔枝角, 九龍",
            "九龍荔枝角瑪嘉烈醫院道2-10號, 荔枝角, 九龍"
        ),
        telephone: "2990 1111",
        fax: "2786 3629",
        email: "pmh.enquiry@ha.org.hk",
        googleMapsLink: "https://maps.app.goo.gl/oahm76MqWJrz58aPA",
    },
    POH: {
        name: i18n("Pok Oi Hospital", "博愛醫院", "博愛醫院"),
        region: Region.NewTerritories,
        linkId: "100174",
        cluster: Cluster.NewTerritoriesWest,
        address: i18n(
            "Au Tau, Yuen Long, NT",
            "元朗錦田澳頭, 元朗, 新界",
            "元朗錦田澳頭, 元朗, 新界"
        ),
        telephone: "2486 8000",
        fax: "2443 9593",
        email: "poh.service@ha.org.hk",
        website: "https://www3.ha.org.hk/poh/en/Default.asp",
        googleMapsLink: "https://maps.app.goo.gl/9ddP2PsjarwjZRpw7",
    },
    POWH: {
        name: i18n(
            "Prince of Wales Hospital",
            "威爾斯親王醫院",
            "威爾斯親王醫院"
        ),
        region: Region.NewTerritories,
        linkId: "100166",
        cluster: Cluster.NewTerritoriesEast,
        address: i18n(
            "30-32 Ngan Shing Street, Shatin, NT",
            "新界沙田銀城街30-32號, 沙田, 新界",
            "新界沙田銀城街30-32號, 沙田, 新界"
        ),
        telephone: "3505 2211",
        fax: "2637 8244",
        email: "pwh_enquiry@ha.org.hk",
        website: "https://www3.ha.org.hk/pwh/index_e.asp",
        googleMapsLink: "https://maps.app.goo.gl/oFaaRsSYuKTEGQtG7",
    },
    PYNEH: {
        name: i18n(
            "Pamela Youde Nethersole Eastern Hospital",
            "鮑思高紀念聖方濟各學校東院",
            "鮑思高紀念聖方濟各學校東院"
        ),
        region: Region.HongKongIsland,
        linkId: "100141",
        cluster: Cluster.HongKongEast,
        address: i18n(
            "3 Lok Man Road, Chai Wan, HK",
            "香港仔鴨脷洲大道3號, 香港仔, 香港島",
            "香港仔鴨脷洲大道3號, 香港仔, 香港島"
        ),
        telephone: "2595 6111",
        fax: "2515 0794",
        email: "pyneh_enquiry@ha.org.hk",
        website: "https://hkec.ha.org.hk/pyneh/internet/index.html",
        googleMapsLink: "https://maps.app.goo.gl/3YtnhmSvJBKjR9hXA",
    },
    QEH: {
        name: i18n("Queen Elizabeth Hospital", "伊利沙伯醫院", "伊利沙伯醫院"),
        region: Region.Kowloon,
        linkId: "100149",
        cluster: Cluster.KowloonCentral,
        address: i18n(
            "30 Gascoigne Road, KLN",
            "九龍加士居道30號, 九龍",
            "九龍加士居道30號, 九龍"
        ),
        telephone: "3506 8888",
        fax: "3506 8951",
        email: "qeh_webmaster@ha.org.hk",
        website: "https://www3.ha.org.hk/qeh/eng/main/index.htm",
        googleMapsLink: "https://maps.app.goo.gl/JsNZun7L3ouTaiU66",
    },
    QMH: {
        name: i18n("Queen Mary Hospital", "瑪麗醫院", "瑪麗醫院"),
        region: Region.HongKongIsland,
        linkId: "100131",
        cluster: Cluster.HongKongWest,
        address: i18n(
            "102 Pokfulam Road, HK",
            "香港薄扶林道102號, 香港, 香港島",
            "香港薄扶林道102號, 香港, 香港島"
        ),
        telephone: "2255 3838",
        fax: "2817 5496",
        email: "qmh_enquiry@ha.org.hk",
        website: "https://www8.ha.org.hk/qmh/",
        googleMapsLink: "https://maps.app.goo.gl/hpzFxt3hmGr7RDHQ7",
    },
    RH: {
        name: i18n("Ruttonjee Hospital", "養和醫院", "養和醫院"),
        region: Region.HongKongIsland,
        linkId: "100144",
        cluster: Cluster.HongKongEast,
        address: i18n(
            "266 Queen's Road East, Wan Chai, HK",
            "香港皇后大道東266號, 灣仔, 香港島",
            "香港皇后大道東266號, 灣仔, 香港島"
        ),
        telephone: "2291 2000",
        fax: "2591 6886",
        email: "rtskh_enquiry@ha.org.hk",
        website: "https://www3.ha.org.hk/rtskh/eng/welcome_eng.html",
        googleMapsLink: "https://maps.app.goo.gl/LEFkUDTTk2cEY6YU9",
    },
    SJH: {
        name: i18n("St John Hospital", "聖德肋撒醫院", "聖德肋撒醫院"),
        region: Region.NewTerritories,
        linkId: "100146",
        cluster: Cluster.HongKongEast,
        address: i18n(
            "Cheung Chau Hospital Road, Tung Wan, Cheung Chau",
            "長洲醫院道, 東灣, 長洲",
            "長洲醫院道, 東灣, 長洲"
        ),
        telephone: "2986 2100",
        fax: "2981 9050",
        email: "sjh_enquiry@ha.org.hk",
        googleMapsLink: "https://maps.app.goo.gl/8t2jw4ixHnY39Uw77",
    },
    TKOH: {
        name: i18n("Tseung Kwan O Hospital", "將軍澳醫院", "將軍澳醫院"),
        region: Region.NewTerritories,
        linkId: "101326",
        cluster: Cluster.KowloonEast,
        address: i18n(
            "No. 2 Po Ning Lane, Hang Hau, Tseung Kwan O",
            "將軍澳寶寧路2號, 將軍澳, 新界",
            "將軍澳寶寧路2號, 將軍澳, 新界"
        ),
        telephone: "2208 0111",
        fax: "2177 0161",
        email: "tkoh.enquiry@ha.org.hk",
        googleMapsLink: "https://maps.app.goo.gl/yWfbcF4bKkMAWt8p7",
    },
    TMH: {
        name: i18n("Tuen Mun Hospital", "屯門醫院", "屯門醫院"),
        region: Region.NewTerritories,
        linkId: "100173",
        cluster: Cluster.NewTerritoriesWest,
        address: i18n(
            "23 Tsing Chung Koon Road, Tuen Mun, NT",
            "屯門青山公路第23段, 屯門, 新界",
            "屯門青山公路第23段, 屯門, 新界"
        ),
        telephone: "2468 5111",
        fax: "2455 1911",
        email: "ntwc.pa@ha.org.hk",
        website: "https://www3.ha.org.hk/tmh/en/Default.asp",
        googleMapsLink: "https://maps.app.goo.gl/LPBHVjFb75Fzguwv8",
    },
    TSWH: {
        name: i18n("Tin Shui Wai Hospital", "天水圍醫院", "天水圍醫院"),
        region: Region.NewTerritories,
        linkId: "235909",
        cluster: Cluster.NewTerritoriesWest,
        address: i18n(
            "11 Tin Tan Street, Tin Shui Wai, NT",
            "天水圍天瑞街11號, 天水圍, 新界",
            "天水圍天瑞街11號, 天水圍, 新界"
        ),
        telephone: "3513 5000",
        fax: "3514 9129",
        email: "tswh.service@ha.org.hk",
        website: "https://www3.ha.org.hk/tswh/en/Default.asp",
        googleMapsLink: "https://maps.app.goo.gl/R8bU1W6uLPyTqmqs6",
    },
    UCH: {
        name: i18n(
            "United Christian Hospital",
            "基督教聯合醫院",
            "基督教聯合醫院"
        ),
        region: Region.Kowloon,
        linkId: "100156",
        cluster: Cluster.KowloonEast,
        address: i18n(
            "130 Hip Wo Street, Kwun Tong, KLN",
            "九龍觀塘海濱道130號, 觀塘, 九龍",
            "九龍觀塘海濱道130號, 觀塘, 九龍"
        ),
        telephone: "2379 9611",
        fax: "2772 7098",
        email: "uch.enquiry@ha.org.hk",
        website: "https://kec.ha.org.hk/uch/en/index.html",
        googleMapsLink: "https://maps.app.goo.gl/vskcgrVTHMfMakd98",
    },
    YCH: {
        name: i18n("Yan Chai Hospital", "曉光中醫醫院", "曉光中醫醫院"),
        region: Region.NewTerritories,
        linkId: "100165",
        cluster: Cluster.KowloonWest,
        address: i18n(
            "7-11 Yan Chai Street, Tsuen Wan, NT",
            "荃灣街7-11號, 荃灣, 新界",
            "荃灣街7-11號, 荃灣, 新界"
        ),
        telephone: "2417 8383",
        fax: "2414 8562",
        email: "ych.enquiry@ha.org.hk",
        googleMapsLink: "https://maps.app.goo.gl/VHyiYm5DR1hxj77t8",
    },
}
