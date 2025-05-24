/**
 * therapist-data.js - セラピスト情報を管理するファイル
 */

// セラピスト情報を格納するオブジェクト
const therapistData = {
    // セラピスト - 林由美
    '1': {
        id: '1',
        name: '林 由美',
        gender: 'female',
        categories: ['relaxation', 'medical'],
        specialities: ['relaxation', 'medical'],
        specialty: '鍼灸師',
        photo: '../assets/images/hayashi-yumi.jpg',
        thumbnailPhoto: '../assets/images/hayashi-yumi.jpg',
        description: [
            '皆様の日ごろの心と体の緊張が少しでもほぐれるような時間をご提供いたします。'
        ],
        qualifications: [
            '鍼灸師'
        ],
        courses: [
            {
                title: '頭部と頚肩のスッキリケア',
                description: '頭部のほぐしと頚肩のストレッチで、頭と頚肩の緊張を解消していきます。',
                duration: '施術時間: 15分'
            }
        ],
        salon_info: {
            name: '',
            url: 'https://kurarahari-yokohama.com/',
            photo: '../assets/images/hayashi-yumi1.jpg'
        },
        treatment_photos: [
            '../assets/images/hayashi-yumi1.jpg',
            '../assets/images/hayashi-yumi2.jpg'
        ]
    },
    // セラピスト - 佐藤南々子
    '2': {
        id: '2',
        name: '佐藤南々子',
        gender: 'female',
        categories: ['relaxation'],
        specialities: ['relaxation'],
        specialty: 'コンディショニングストレッチ',
        photo: '../assets/images/satonanako4.jpg',
        thumbnailPhoto: '../assets/images/satonanako4.jpg',
        description: [
            'ストレッチで、心身共にほぐれる癒しのお時間を提供いたします。',
            'お客様のお身体や生活に合わせたプランで特別な施術を提供します。新潟出身で海や自然が好きです。仕事のエリアの三軒茶屋で、カフェや居酒屋巡りにハマっています。どうぞ宜しくお願いいたします！'
        ],
        qualifications: [
            'コアバランスストレッチトレーナーライセンス'
        ],
        courses: [
            {
                title: '疲労回復下半身ストレッチ',
                description: '深筋層まで筋肉を伸ばし、血行を良くし疲労物質や老廃物を流してスッキリさせます ',
                duration: '未設定'
            },
            {
                title: '肩甲骨はがし・整体ストレッチ',
                description: '肩甲骨はがしや、首肩周りの筋肉のほぐしも取り入れ、リラックス効果やコリの解消を行います',
                duration: '未設定'
            }
        ],
        salon_info: {
            name: 'SPORTS STRETCH ESSENTIAL',
            url: 'https://lit.link/nanao75',
            photo: '../assets/images/satonanako1.jpg'
        },
        treatment_photos: [
            '../assets/images/satonanako2.jpg'
        ]
    },
    // セラピスト - 佐川美江
    '3': {
        id: '3',
        name: '佐川美江',
        gender: 'female',
        categories: ['relaxation'],
        specialities: ['relaxation'],
        specialty: '温熱、腸もみセラピスト',
        photo: '../assets/images/sagawa-mie.jpg',
        thumbnailPhoto: '../assets/images/sagawa-mie.jpg',
        description: [
            '冷えは万病のもと！芯から温め疲れやコリをほぐして心身ともにリラックス出来ます。'
        ],
        qualifications: [
            '民間資格：オンセラー（オンセラピスト養成講師）',
            '民間資格：東洋式腸活美容'
        ],
        courses: [
            {
                title: '温熱もみほぐし',
                description: '遠赤外線効果を高める特殊なセラミックの器に炭化したもぐさを入れ、温めながら身体をさすったり、揉んだり筋肉の疲れやコリをほぐす施術です。',
                duration: '15分～'
            },
            {
                title: '東洋式腸活美容',
                description: '初めに温熱で深部まで温め、ドライマッサージで外側から刺激をしていきます。ご希望によりオイルを使用してのオイルマッサージも行います。',
                duration: '15分～'
            }
        ]
    },
    // セラピスト - 小岩祐子
    '4': {
        id: '4',
        name: '小岩祐子',
        gender: 'female',
        categories: ['relaxation'],
        specialities: ['relaxation'],
        specialty: 'セラピスト',
        photo: '../assets/images/koiwa-yuko.jpg',
        thumbnailPhoto: '../assets/images/koiwa-yuko.jpg',
        description: [
            'こだわりのオイルと心地よい施術で、心と体に安らぎの時間をお届けします。',
            '東京都出身。米国留学後、ソーシャルワークを専攻。先天性股関節症がきっかけでボディア ライメント(500件以上)と肯認学〜lovable session〜(100件以上)、Rain Drop®︎アロマ施術 (50件以上)を習得。著名人御用達の隠れ家サロンセラピストに師事。自宅サロンや出張/オン ラインで心身の調和と総合的な癒しを提供。'
        ],
        qualifications: [
            'Master of Body Allignment',
            '肯認学®︎インストラクター',
            '臼井式 霊気マスター'
        ],
        courses: [
            {
                title: 'アロマde手美人ケア',
                description: '医療現場で酷使される手指を、AFNOR基準0.2%の世界最高峰エッセンシャルオイルでケア。指先から腕まで丁寧にアプローチし、手洗い・消毒による乾燥や、PC作業の疲労を癒します。血行促進でこわばった筋肉をリリース。短時間でも心身ともにリフレッシュできる贅沢な時間です。',
                duration: '15分'
            }
        ],
        salon_info: {
            name: 'Salon de Yuukichi',
            url: 'https://linktr.ee/Yuukichi'
        }
    },
    // セラピスト - 渡部 恵美
    '5': {
        id: '5',
        name: '渡部 恵美',
        gender: 'female',
        categories: ['relaxation'],
        specialities: ['relaxation'],
        specialty: 'アロマタッチセラピスト',
        photo: '../assets/images/watabeemi1.jpg',
        thumbnailPhoto: '../assets/images/watabeemi1.jpg',
        description: [
            '心と身体と健康と栄養と...お悩み解決するためのトータルサロン。',
            '自然の香りがもたらすリラクゼーション効果や、心と身体のバランスを整える力に感銘を受け、多くの人々にアロマの素晴らしさを伝えたいという強い想いがございます。 ナチュラルなものが大好き！'
        ],
        qualifications: [
            '一般社団法人インターナショナルメディカルアロマスクール(IMAS) 統合医療アドバイザー メディカルアロマコンサルタント',
            '一般社団法人ボタニカルデザイン協会(bda) オリジナルアロマ香水インストラクター',
            'アロマタッチテクニック認定',
            '日本化粧品検定3級'
        ],
        courses: [
            {
                title: '肘下から指先まで施すハンドケア',
                description: '肘下から指先までと、様々なツボが集まる手のひらへ、圧をかけ過ぎずに揉みほぐし。',
                duration: '15分～'
            },
            {
                title: '心もほぐれるフットケア（ふくらはぎ)',
                description: '膝下からスネやふくらはぎ、足の甲、指先まで揉みほぐします。',
                duration: '15分～'
            },
            {
                title: '眠れるほど痛くない！足裏の揉みほぐし（足裏)',
                description: 'さまざまなツボが集まる足裏をほぐします',
                duration: '15分～'
            },
            {
                title: 'オールハンド！膝下から指先まで、スペシャルフットケア',
                description: '天然高品質の無香料オイルで潤い与えながら、膝下から足裏の全てを揉みほぐします。',
                duration: '15分～'
            }
        ],
        salon_info: {
            name: 'ラヴィジョイ-Lavie Joy-',
            url: 'https://laviejoy.com/',
            photo: '../assets/images/watabeemi4.jpg'
        },
        treatment_photos: [
            '../assets/images/watabeemi3.jpg',
            '../assets/images/watabeemi2.jpg'
        ]
    },
    // セラピスト - 高岡久美子
    '6': {
        id: '6',
        name: '高岡 久美子',
        gender: 'female',
        categories: ['relaxation', 'beauty'],
        specialities: ['relaxation', 'beauty'],
        specialty: 'エステティシャン',
        photo: '../assets/images/takaokakumiko.jpg',
        thumbnailPhoto: '../assets/images/takaokakumiko.jpg',
        description: [
            'フェイシャル、ボディケア、温活、ファスティングなど皆様の美肌と健康を本気で応援しています。',
            '東京都荒川区町屋でプライベートサロン「mennir メニール」を経営しています。 フェイシャルサロンから始まり、今では韓国肌管理セラピール（ララピール）、ハーブピーリング、毛穴洗浄、オイルトリートメント、よもぎ蒸し、東洋式美腸活マッサージ、オンセラ温熱リンパマッサージ、全身脱毛、光フェイシャル、ブライダルエステ、ファスティングサポート、化粧品販売などなど、美と健康の両方から本気でキレイを追求しています。'
        ],
        qualifications: [
            'オンセラ健康法資格保有者養成講師',
            '東洋式腸活マッサージ',
            'ララピール認定サロン',
            'アイマートリガーフェイシャルメソッド'
        ],
        courses: [
            {
                title: '温セラ温熱リンパマッサージ',
                description: '炭化もぐさをセラミックの器に入れて温め、全身、またはコリなどの箇所を温めながらほぐしていく、お灸のように温かくて心地の良い施術です。',
                duration: '15分～'
            },
            {
                title: 'セラピール(フェイシャル )',
                description: 'LHA成分にアルカリを結合させた韓国で大人気のピーリングソリューションです。特許成分　美容乳酸菌が追加され、さらに進化しました。毛穴、シミ、ハリツヤアップ、肌のキメなど本気でお肌の改善をしたい方にお勧めです。',
                duration: '15分～'
            },
            {
                title: 'ハーブピーリング(フェイシャル)',
                description: 'すべての肌トラブルを植物の力で理想の肌へ導く、厳選国産メディカルハーブピーリングです。幹細胞、漢方、薬用植物が肌本来の美しさを引き立てます。シミ、シワ、毛穴、ニキビ、くすみなどあらゆる肌トラブルを根本から改善する魔法のハーブです。',
                duration: '15分～'
            },
            {
                title: 'オンセラ＋東洋式腸活ドライマッサージ',
                description: 'オンセラ温熱リンパマッサージでお腹を温めた後、服の上からドライマッサージをしていきます。お腹にあるツボを優しく刺激し、腸の動きを促進。お腹まわりの滞りを流すことで、体全体のバランスも整えていきます。お腹のはり、便秘、冷え、ストレスなどの不調にアプローチするのが、東洋式腸活マッサージです。',
                duration: '15分～'
            },
            {
                title: 'ドライヘッドマッサージ',
                description: '頭、首、肩を優しくほぐすリラクゼーションマッサージです。眼精疲労や肩こり、睡眠の質が気になる方におすすめ。脳がリラックスして日々の疲れを感じる方にぴったりのメニューです。',
                duration: '15分～'
            }
        ],
        salon_info: {
            name: 'mennir(メニール)',
            url: 'https://www.instagram.com/mennir_tokyo/',
            photo: '../assets/images/takaokakumiko4.jpg'
        },
        treatment_photos: [
            '../assets/images/takaokakumiko2.png',
            '../assets/images/takaokakumiko3.jpg'
        ]
    },
    // セラピスト - 平川笑美
    '7': {
        id: '7',
        name: '平川 笑美',
        gender: 'female',
        categories: ['relaxation', 'beauty'],
        specialities: ['relaxation', 'beauty'],
        specialty: 'セラピスト',
        photo: '../assets/images/hirakawaemi.jpg',
        thumbnailPhoto: '../assets/images/hirakawaemi.jpg',
        description: [
            '美容業歴23年。身体のメンテナンスはお任せください‼',
            '自律神経を整えることができる世界で唯一の全身施術オールハンド手法を得意とする三姉妹の母でもあり、AGOメソッド認定講師として全国を駆け巡るセラピストです。趣味は旅行、カフェ巡り、映画鑑賞です。'
        ],
        qualifications: [
            'AGOセラピスト(全国対応認定講師)',
            'ドライヘッドスパニスト',
            'リフレクソロジスト',
            'ロミロミセラピスト',
            'コルギセラピスト',
            'エステティシャン',
            'ネイリスト'
        ],
        courses: [
            {
                title: 'AGOメソッド',
                description: '顎関節から脳にアプローチし、自律神経や骨格・内臓の歪みを根本から整えることを目的とした、世界で唯一とされる全身オールハンド施術法です。顔の歪み・小顔、自律神経失調症、うつ、頭痛、耳鳴り、睡眠障害、生理痛、姿勢不良、生活習慣病、慢性便秘にお悩みの方にオススメです。',
                duration: '15分～'
            },
            {
                title: '内臓整美',
                description: '手技によって内臓の動きや位置を調整し、身体の不調を改善する施術法です。内臓がストレスや姿勢の影響で硬くなったり動きが悪くなると、消化不良・便秘・疲労感・自律神経の乱れなどを引き起こすことがあります。この施術では、内臓の緊張をほぐし、血流や神経の働きを整えることで自然治癒力を高めます。姿勢の歪みが正され、全身の調和や消化機能の向上、ストレス軽減などの効果が期待できます。特に、胃腸の不調や慢性的な疲れ、原因不明の不調、生理痛を感じる方におすすめされています。',
                duration: '15分～'
            },
            {
                title: '極上睡眠ドライヘッドスパ',
                description: '水やオイルを使わずに手技で頭皮や頭、首、肩をもみほぐします。',
                duration: '15分～'
            }
        ],
        salon_info: {
            name: 'Will Be',
            url: 'https://www.instagram.com/therapist_yamanashi_emi',
            photo: '../assets/images/hirakawaemi3.jpg'
        },
        treatment_photos: [
            '../assets/images/hirakawaemi2.jpg',
            '../assets/images/hirakawaemi4.jpg'
        ]
    },
    // セラピスト - 白川雅央
    '8': {
        id: '8',
        name: '白川 雅央',
        gender: 'male',
        categories: ['relaxation'],
        specialities: ['relaxation'],        specialty: 'ゆらゆらヒーリング',
        photo: '../assets/images/sirakawa1.jpg',
        thumbnailPhoto: '../assets/images/sirakawa1.jpg',
        description: [
            '八王子出身。アパレル等多様な仕事を経て、癒しの道へ。人を癒すプロのあなたに寄り添い、心と体に深く届くヒーリングをお届けします。',
            '猫好きロック好き！趣味は映画鑑賞で年間40～50本観ています。どうぞよろしくお願いいたします。'
        ],
        qualifications: [
            'イシリス33メソッド®プラクティショナー',
            'アクセスバーズ・ファシリテーター',
            'レイキ・ティチャー'
        ],
        courses: [
            {
                title: 'ゆらゆらヒーリング',
                description: '足首から肩、首、腕、手の平、足裏、ふくらはぎ等、各部をゆらゆら揺らして、擦ったり、揉んだりする施術です。血行が良くなり、体が温かく軽くなります',
                duration: '施術時間: 60分'
            }        ],
        salon_info: {
            name: '',
            url: '',
            photo: '../assets/images/shirakawa2.png'
        },
        treatment_photos: [
            '../assets/images/sirakawa3.jpg',
            '../assets/images/shirakawa4.jpg'
        ]
    }
};

// セラピスト一覧を取得するための関数
function getAllTherapists() {
    return Object.values(therapistData);
}

// 特定のセラピストを取得するための関数
function getTherapistById(id) {
    return therapistData[id] || null;
}

// カテゴリでフィルタリングするための関数
function getTherapistsByCategory(category) {
    if (category === 'all') {
        return getAllTherapists();
    }
    
    return Object.values(therapistData).filter(therapist => 
        therapist.categories.includes(category)
    );
}

// 専門分野でフィルタリングするための関数
function getTherapistsBySpeciality(speciality) {
    if (speciality === 'all') {
        return getAllTherapists();
    }
    
    return Object.values(therapistData).filter(therapist => 
        therapist.specialities.includes(speciality)
    );
}

// 性別でフィルタリングするための関数
function getTherapistsByGender(gender) {
    if (gender === 'all') {
        return getAllTherapists();
    }
    
    return Object.values(therapistData).filter(therapist => 
        therapist.gender === gender
    );
}