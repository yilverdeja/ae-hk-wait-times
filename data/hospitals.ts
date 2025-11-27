import { i18n } from "@/lib/i18n"
import { HospitalData, Region, Cluster } from "@/types"

export const hospitals: HospitalData = {
    AHMLNH: {
        name: i18n(
            "Alice Ho Miu Ling Nethersole Hospital",
            "雅麗氏何妙齡那打素醫院",
            "雅丽氏何妙龄那打素医院"
        ),
        region: Region.NewTerritories,
        linkId: "100171",
        cluster: Cluster.NewTerritoriesEast,
        address: i18n(
            "11 Chuen On Road, Tai Po, NT",
            "新界大埔全安路11號, 大埔, 新界",
            "新界大埔全安路11号, 大埔, 新界"
        ),
        telephone: "2689 2000",
        fax: "2662 1690",
        email: "ahnh_enquiry@ha.org.hk",
        website: "https://www3.ha.org.hk/AHNH/index_e.asp",
        googleMapsLink: "https://maps.app.goo.gl/xWmgrNkN5PKd1GNB8",
        coordinates: {
            latitude: 22.45867,
            longitude: 114.17476,
        },
    },
    CMC: {
        name: i18n("Caritas Medical Centre", "明愛醫院", "明爱医院"),
        region: Region.Kowloon,
        linkId: "100163",
        cluster: Cluster.KowloonWest,
        address: i18n(
            "111 Wing Hong Street, Sham Shui Po, KLN",
            "九龍深水埗永康街111號, 深水埗, 九龍",
            "九龙深水埗永康街111号, 深水埗, 九龙"
        ),
        telephone: "3408 5678",
        fax: "2785 5755",
        email: "cmc.enq@ha.org.hk",
        googleMapsLink: "https://maps.app.goo.gl/RHspT8VfgdGJVffY7",
        coordinates: {
            latitude: 22.34143,
            longitude: 114.15333,
        },
    },
    KWH: {
        name: i18n("Kwong Wah Hospital", "廣華醫院", "广华医院"),
        region: Region.Kowloon,
        linkId: "100153",
        cluster: Cluster.KowloonCentral,
        address: i18n(
            "25 Waterloo Road, KLN",
            "九龍窩打老道25號, 九龍",
            "九龙窝打老道25号, 九龙"
        ),
        telephone: "2332 2311",
        fax: "3517 5481",
        email: "kwh.enquiry@ha.org.hk",
        website: "https://www3.ha.org.hk/kwh/main/en/index.asp",
        googleMapsLink: "https://maps.app.goo.gl/v5nGqGXHwhSheXeY7",
        coordinates: {
            latitude: 22.31518,
            longitude: 114.1724,
        },
    },
    NDH: {
        name: i18n("North District Hospital", "北區醫院", "北区医院"),
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
        coordinates: {
            latitude: 22.49687,
            longitude: 114.12466,
        },
    },
    NLH: {
        name: i18n("North Lantau Hospital", "北大嶼山醫院", "北大屿山医院"),
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
        coordinates: {
            latitude: 22.28218,
            longitude: 113.93933,
        },
    },
    PMH: {
        name: i18n("Princess Margaret Hospital", "瑪嘉烈醫院", "玛嘉烈医院"),
        region: Region.NewTerritories,
        linkId: "100160",
        cluster: Cluster.KowloonWest,
        address: i18n(
            "2-10 Princess Margaret Hospital Road, Lai Chi Kok, Kowloon",
            "九龍荔枝角瑪嘉烈醫院道2-10號, 荔枝角, 九龍",
            "九龙荔枝角玛嘉烈医院道2-10号, 荔枝角, 九龙"
        ),
        telephone: "2990 1111",
        fax: "2786 3629",
        email: "pmh.enquiry@ha.org.hk",
        googleMapsLink: "https://maps.app.goo.gl/oahm76MqWJrz58aPA",
        coordinates: {
            latitude: 22.34147,
            longitude: 114.13372,
        },
    },
    POH: {
        name: i18n("Pok Oi Hospital", "博愛醫院", "博爱医院"),
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
        coordinates: {
            latitude: 22.44472,
            longitude: 114.04186,
        },
    },
    POWH: {
        name: i18n(
            "Prince of Wales Hospital",
            "威爾斯親王醫院",
            "威尔斯亲王医院"
        ),
        region: Region.NewTerritories,
        linkId: "100166",
        cluster: Cluster.NewTerritoriesEast,
        address: i18n(
            "30-32 Ngan Shing Street, Shatin, NT",
            "新界沙田銀城街30-32號, 沙田, 新界",
            "新界沙田银城街30-32号, 沙田, 新界"
        ),
        telephone: "3505 2211",
        fax: "2637 8244",
        email: "pwh_enquiry@ha.org.hk",
        website: "https://www3.ha.org.hk/pwh/index_e.asp",
        googleMapsLink: "https://maps.app.goo.gl/oFaaRsSYuKTEGQtG7",
        coordinates: {
            latitude: 22.38026,
            longitude: 114.20177,
        },
    },
    PYNEH: {
        name: i18n(
            "Pamela Youde Nethersole Eastern Hospital",
            "東區尤德夫人那打素醫院",
            "东区尤德夫人那打素医院"
        ),
        region: Region.HongKongIsland,
        linkId: "100141",
        cluster: Cluster.HongKongEast,
        address: i18n(
            "3 Lok Man Road, Chai Wan, HK",
            "香港島柴灣樂民道3號, 柴灣, 香港島",
            "香港岛柴湾乐民道3号, 柴湾, 香港岛"
        ),
        telephone: "2595 6111",
        fax: "2515 0794",
        email: "pyneh_enquiry@ha.org.hk",
        website: "https://hkec.ha.org.hk/pyneh/internet/index.html",
        googleMapsLink: "https://maps.app.goo.gl/3YtnhmSvJBKjR9hXA",
        coordinates: {
            latitude: 22.26927,
            longitude: 114.23554,
        },
    },
    QEH: {
        name: i18n("Queen Elizabeth Hospital", "伊利沙伯醫院", "伊利沙伯医院"),
        region: Region.Kowloon,
        linkId: "100149",
        cluster: Cluster.KowloonCentral,
        address: i18n(
            "30 Gascoigne Road, KLN",
            "九龍加士居道30號, 九龍",
            "九龙加士居道30号, 九龙"
        ),
        telephone: "3506 8888",
        fax: "3506 8951",
        email: "qeh_webmaster@ha.org.hk",
        website: "https://www3.ha.org.hk/qeh/eng/main/index.htm",
        googleMapsLink: "https://maps.app.goo.gl/JsNZun7L3ouTaiU66",
        coordinates: {
            latitude: 22.30945,
            longitude: 114.17608,
        },
    },
    QMH: {
        name: i18n("Queen Mary Hospital", "瑪麗醫院", "玛丽医院"),
        region: Region.HongKongIsland,
        linkId: "100131",
        cluster: Cluster.HongKongWest,
        address: i18n(
            "102 Pokfulam Road, HK",
            "香港薄扶林道102號, 香港, 香港島",
            "香港薄扶林道102号, 香港, 香港岛"
        ),
        telephone: "2255 3838",
        fax: "2817 5496",
        email: "qmh_enquiry@ha.org.hk",
        website: "https://www8.ha.org.hk/qmh/",
        googleMapsLink: "https://maps.app.goo.gl/hpzFxt3hmGr7RDHQ7",
        coordinates: {
            latitude: 22.27034,
            longitude: 114.13132,
        },
    },
    RH: {
        name: i18n("Ruttonjee Hospital", "養和醫院", "养和医院"),
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
        coordinates: {
            latitude: 22.27567,
            longitude: 114.17524,
        },
    },
    SJH: {
        name: i18n("St John Hospital", "聖德肋撒醫院", "圣德肋撒医院"),
        region: Region.NewTerritories,
        linkId: "100146",
        cluster: Cluster.HongKongEast,
        address: i18n(
            "Cheung Chau Hospital Road, Tung Wan, Cheung Chau",
            "長洲醫院道, 東灣, 長洲",
            "长洲医院道, 东湾, 长洲"
        ),
        telephone: "2986 2100",
        fax: "2981 9050",
        email: "sjh_enquiry@ha.org.hk",
        googleMapsLink: "https://maps.app.goo.gl/8t2jw4ixHnY39Uw77",
        coordinates: {
            latitude: 22.20812,
            longitude: 114.03164,
        },
    },
    TKOH: {
        name: i18n("Tseung Kwan O Hospital", "將軍澳醫院", "将军澳医院"),
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
        coordinates: {
            latitude: 22.31648,
            longitude: 114.27038,
        },
    },
    TMH: {
        name: i18n("Tuen Mun Hospital", "屯門醫院", "屯门医院"),
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
        coordinates: {
            latitude: 22.40754,
            longitude: 113.97598,
        },
    },
    TSWH: {
        name: i18n("Tin Shui Wai Hospital", "天水圍醫院", "天水围医院"),
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
        coordinates: {
            latitude: 22.45871,
            longitude: 113.99583,
        },
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
            "九龍觀塘協和街130號, 觀塘, 九龍",
            "九龙观塘协和街130号, 观塘, 九龙"
        ),
        telephone: "2379 9611",
        fax: "2772 7098",
        email: "uch.enquiry@ha.org.hk",
        website: "https://kec.ha.org.hk/uch/en/index.html",
        googleMapsLink: "https://maps.app.goo.gl/vskcgrVTHMfMakd98",
        coordinates: {
            latitude: 22.32253,
            longitude: 114.23133,
        },
    },
    YCH: {
        name: i18n("Yan Chai Hospital", "仁濟醫院", "仁济医院"),
        region: Region.NewTerritories,
        linkId: "100165",
        cluster: Cluster.KowloonWest,
        address: i18n(
            "7-11 Yan Chai Street, Tsuen Wan, NT",
            "新界荃灣仁濟街7-11號, 荃灣, 新界",
            "新界荃湾仁济街7-11号, 荃湾, 新界"
        ),
        telephone: "2417 8383",
        fax: "2414 8562",
        email: "ych.enquiry@ha.org.hk",
        googleMapsLink: "https://maps.app.goo.gl/VHyiYm5DR1hxj77t8",
        coordinates: {
            latitude: 22.36966,
            longitude: 114.11943,
        },
    },
}
