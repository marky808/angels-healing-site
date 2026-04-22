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
        ]    },
    // セラピスト - 白川雅央
    '8': {
        id: '8',
        name: '白川 雅央',
        gender: 'male',
        categories: ['relaxation'],
        specialities: ['relaxation'],        specialty: 'ゆらゆらヒーリング',        photo: '../assets/images/sirakawa1.jpg',
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
            }        ],        salon_info: {
            name: '',
            url: '',
            photo: '../assets/images/sirakawa3.jpg'
        },
        treatment_photos: [
            '../assets/images/sirakawa3.jpg',
            '../assets/images/shirakawa4.jpg'
        ]    },
    // セラピスト - 矢口由紀子
    '9': {
        id: '9',
        name: '矢口 由紀子',
        gender: 'female',
        categories: ['relaxation', 'medical'],
        specialities: ['relaxation', 'medical'],
        specialty: '整体ボディケアセラピスト（気功整体）',
        photo: '../assets/images/yaguchi1.jpg',
        thumbnailPhoto: '../assets/images/yaguchi1.jpg',
        description: [
            'an（アン）は、心と体を整える気功整体サロンです。',
            '看護師時代に自身の身体の不調を改善してくれた気功整体で、社会で頑張る方々・地域の方々のストレス解消や健康増進のお役にたちたいと思い施術をしております。',
            '趣味は散歩で、四季折々の草花をめでるのが好きです。どうぞ宜しくお願い致します。'
        ],
        qualifications: [
            '民間資格：整体ボディケアセラピスト（一般財団法人日本能力開発推進協会/JADP）',
            '民間資格：気功師（日本靜林気功協会認定）',
            '国家資格：看護師免許'
        ],
        courses: [
            {
                title: '首肩こりケア',
                description: '椅子におかけになられた状態で、首～肩周囲・ふくらはぎを揉みほぐします。',
                duration: '施術時間: 15分～'
            },
            {
                title: '全身気功整体',
                description: '身体を揉んだり、トントンと軽くたたいたり、揺らしたりします。経絡（気の通りみち）を刺激し血行を良くし、身体の不調や痛み・歪みなどを改善していきます。施術の前後にカウンセリングをします。（健康状態の確認・アドバイスなど）',
                duration: '施術時間: 30分～'
            }
        ],        salon_info: {
            name: '癒しサロン気功＆整体an',
            url: 'https://salonan.jimdofree.com',
            photo: '../assets/images/yaguchi4.jpg',
            description: 'anではバキバキしないやさしい気功整体で自立神経の乱れを正常に導き、自然治癒力を高め症状を改善していきます。疲れがとれない不眠・肩こり・腰痛・便秘・生理痛・更年期障害など お身体にお悩みがある方は、ぜひ一度ご相談ください。健康な生活を続けていくためには、ストレスをためすぎず、心と体のバランスを整えることが大切です。気功整体というヘルスケアもあることを体感し、知っていただければと思います。'
        },
        treatment_photos: [
            '../assets/images/yaguchi2.jpg',
            '../assets/images/yaguchi3.jpg'
        ]
    },
    // セラピスト - 荻野敦子
    '10': {
        id: '10',
        name: '荻野 敦子',
        gender: 'female',
        categories: ['other'],
        specialities: ['other'],
        specialty: '足と靴の相談とインソール作製',
        photo: '../assets/images/ogino1.jpg',
        thumbnailPhoto: '../assets/images/ogino1.jpg',
        description: [
            'インソールの世界で25年。整形外科やペインクリニックでも作製しています。足元のお悩みご相談ください。',
            '理学療法士としてクリニックや訪問リハビリ勤務を兼務しながらインソールと靴の工房をしています。足のトラブルでお困りの方はたくさんいますが、命に係わる程の症状や痛みではないため後回しにされがちです。',
            'しかし、足は身体の土台です！足元を支える適切な靴とインソールでアーチのバランスをサポートし、身体も心も整えるお手伝いをいたします。'
        ],
        qualifications: [
            '理学療法士',
            'フットコントロールトレーナー',
            'フォームソティックス認定メディカルアドバイザー資格',
            'JPA認定インソール療法スペシャリスト資格'
        ],
        courses: [
            {
                title: '足や靴の困りごとに対するカウンセリングとインソール作製',
                description: '必要に応じて足のサイズ計測とフットプリントを行います。',
                duration: '施術時間: 30分'
            }
        ],
        salon_info: {
            name: 'Hyggelig（ヒュケリ）',
            url: 'https://01-hyggelig.net',
            photo: '../assets/images/ogino2.jpg',
            description: 'オーダーメイドインソールとオーダー靴の工房です。一人一人の足の採寸からデータを木型に反映し、お気に入りの革やオリジナルデザインでの作製、脚長差のある靴や装具着用での靴など、お客様のご要望にできるだけ添えるように努めています。'
        },
        treatment_photos: [
            '../assets/images/ogino3.JPG',
            '../assets/images/ogino4.jpg',
            '../assets/images/ogino5.jpg'
        ]
    },
    // セラピスト - 桜河 雄幸
    '11': {
        id: '11',
        name: '桜河 雄幸',
        gender: 'male',
        categories: ['relaxation'],
        specialities: ['relaxation'],
        specialty: 'ヘッドセラピスト',
        photo: '../assets/images/sakurazawa1.jpg',
        thumbnailPhoto: '../assets/images/sakurazawa1.jpg',
        description: [
            '平日は会社員、土日祝日はセラピストとして都内を中心に月1～2日週末イベントに出店しております。',
            'ヘッドマッサージとレイキヒーリングの相性の良さに注目し両方を組み合わせた施術に拘します。',
            '趣味は社交ダンス巡り、スポーツ観戦、カフェめぐりです。'
        ],
        qualifications: [
            'ヘッドセラピスト1stプロ',
            'REIKI Third Degree'
        ],
        courses: [
            {
                title: 'ヘッドセラピー',
                description: '頭のこりをゆっくり、優しく揉み・摘むマッサージ、肩の揉み、背中をほぐしたり、疲れを取りリラックスする施術です。',
                duration: '施術時間: 15分'
            }
        ],
        salon_info: {
            name: '頭のほぐし・ヒーリング 桜河雄幸',
            url: '',
            description: '定店舗はございませんが、イベント出店の際、そちらの会場で施術しております。'
        },
        treatment_photos: [
            '../assets/images/sakurazawa2.jpeg',
            '../assets/images/sakurazawa3.jpeg'
        ]
    },
    // セラピスト - 中田 陽子
    '12': {
        id: '12',
        name: '中田 陽子',
        gender: 'female',
        categories: ['relaxation'],
        specialities: ['relaxation'],
        specialty: '足つぼ施術師',
        photo: '../assets/images/nakata.jpg',
        thumbnailPhoto: '../assets/images/nakata.jpg',
        description: [
            '元小学校教諭です。体を壊しこの足つぼに出会う。体に鞭を打って働く同僚。授業どころではない状態の子ども達。もっと自分の体を大切にしてほしいと退職し活動開始。',
            '血液や韓方茶の勉強もし、様々な方向から健康をサポート中。教員の経験も生かして教育の相談も受けてます。'
        ],
        qualifications: [
            '「足識食癒施術法」インストラクター'
        ],
        courses: [
            {
                title: '「足識食癒施術法」による足つぼ施術とプチ食事アドバイス',
                description: '元小学校教諭が体の大切さに気付き行う、施術だけでは終わらせない足つぼ！血液や韓方茶の知識を活かし、様々な方向から健康をサポートします。',
                duration: '施術時間: 15分'
            }
        ],
        salon_info: {
            name: 'SUNSUN',
            url: 'https://lin.ee/a2PC6u0',
            description: '自宅でサロンをしています。サロンでは静かな空間で、施術ベットを使用し、全身まで施術を行います。その後は体質に合わせた韓方茶を飲みながら、足湯で体を癒していただきます。施術結果をもとにカウンセリングも行います。全身を流れる血液の大切さに気づいた今では、ご希望で血管と血液の観察をし、そこに大きく影響しているのではないかと考えられている、マイナスイオンでのセラピーも合わせて行っています。ご自分の体と向き合うきっかけ作りとご褒美の時間を併せ持ったサロンです。'
        },
        treatment_photos: [
            '../assets/images/nakata1.jpg',
            '../assets/images/nakata2.jpg'
        ]
    },
    // セラピスト - 山田 洋
    '13': {
        id: '13',
        name: '山田 洋',
        gender: 'male',
        categories: ['medical'],
        specialities: ['medical'],
        specialty: '整体師',
        photo: '../assets/images/yamada1.jpg',
        thumbnailPhoto: '../assets/images/yamada1.jpg',
        description: [
            'この仕事につく前にうつ病で４ヶ月入院！その後は嫌いなヤツは自分の人生に登場させないと決める！',
            '朝活は山中湖でウエイクボード！ジム、サウナ、水風呂でスッキリ！みなさんからのオススメ動画を見ながらノンニコチンシーシャ！'
        ],
        qualifications: [
            '日本疼痛リハビリテーション協会　ディプロマ'
        ],
        courses: [
            {
                title: '筋膜リリース',
                description: '筋膜の繋がりを使って緩めていきます！繋がりとは筋膜、経絡、頭蓋、内臓など使っていくので痛い腰だけグリグリするという感じではないです！',
                duration: '施術時間: 15分'
            }
        ],
        salon_info: {
            name: '整体院　翔舞',
            url: 'https://beauty.hotpepper.jp/smartphone/kr/slnH000383417/',
            description: '痛み、痺れ、コリで悩んでいる方、ハードワークでなんとかしてほしい方、メンテナンスの重要性を理解して継続する方を対象としています。'
        },
        treatment_photos: [
            '../assets/images/yamada2.jpg',
            '../assets/images/yamada3.jpg'
        ]
    },
    // セラピスト - 阿良山 貴也
    '14': {
        id: '14',
        name: '阿良山 貴也',
        gender: 'male',
        categories: ['medical'],
        specialities: ['medical'],
        specialty: '整体・トレーナー',
        photo: '../assets/images/arayama1.jpg',
        thumbnailPhoto: '../assets/images/arayama1.jpg',
        description: [
            '貴方の人生がきらきら輝くようサポートいたします！',
            '立腰整体、立腰体操を通じて、身体の不調に苦しんでいる方や、快適な身体を手に入れたくて色々試したけれどしっくりこないと感じている方の力になりたいと活動しています。',
            '20年以上社交ダンス、テニスに関わり、4年前から武術の学びも深め、立腰体操トレーナーの最高峰であるプロフェッショナルクラスで身体の在り方を探求し続けています。'
        ],
        qualifications: [
            '立腰整体',
            '立腰体操トレーナー'
        ],
        courses: [
            {
                title: '立腰整体',
                description: '①歪みタイプ（フィジカルタイプ）診断 ②タイプに合わせた身体調整 ③ご自身でできる調整方法をアドバイス',
                duration: '施術時間: 15分'
            }
        ],
        salon_info: {
            name: '貴楽良（KIRARA）／たか立腰整体院',
            url: 'https://tategoshi.jimdofree.com'
        },
        treatment_photos: [
            '../assets/images/arayama2.jpg'
        ]
    },
    // セラピスト - 亀井 由香
    '15': {
        id: '15',
        name: '亀井 由香',
        gender: 'female',
        categories: ['relaxation'],
        specialities: ['relaxation'],
        specialty: '彫刻リンパセラピスト',
        photo: '../assets/images/kamei1.jpg',
        thumbnailPhoto: '../assets/images/kamei1.jpg',
        description: [
            '歯科衛生士の視点で身体を整える。呼吸が深まる、巡りのケア。頑張る身体を、そっとゆるめる。',
            '彫刻リンパセラピスト／歯科衛生士／マナカードセラピスト',
            '歯科衛生士として「口・呼吸・筋肉・自律神経」と向き合い、彫刻リンパセラピストとして「巡り・姿勢・本来の美しさ」を整える。',
            '心と身体は、いつも深くつながっている。だから私は、身体からも心からもアプローチできるセラピストでありたいと思っています。',
            'リンパケアと口腔・筋肉の専門知識、そしてマナカードによる心への気づきを通して、本来のあなたが、自然体で輝くための癒しをお届けします。'
        ],
        qualifications: [
            '彫刻リンパボディ',
            'ヘッド',
            'フェイシャル',
            'スリミング'
        ],
        courses: [
            {
                title: '首肩スッキリ彫刻リンパ ヘッド ハンド',
                description: 'イスに座ったままのトリートメント',
                duration: '未設定'
            }
        ],
        salon_info: {
            name: 'Mana_Luana',
            url: 'https://www.instagram.com/manaluana15',
            description: '川崎サロン、出張にてトリートメント。岩盤マットでお身体を温めながらのトリートメントは、デトックス効果up、深いリンパへアプローチ出来ます。'
        },
        treatment_photos: [
            '../assets/images/kamei2.jpg',
            '../assets/images/kamei3.jpg'
        ]
    },
    // セラピスト - 山口 智子
    '16': {
        id: '16',
        name: '山口 智子',
        gender: 'female',
        categories: ['relaxation'],
        specialities: ['relaxation'],
        specialty: '足踏みセラピスト',
        photo: '../assets/images/yamaguchi1.jpg',
        thumbnailPhoto: '../assets/images/yamaguchi1.jpg',
        description: [
            '足の裏を使って全身を踏みほぐしていきます。',
            '若い頃の暴飲暴食がたたり、胃腸の不調をきっかけに健康に興味をもち、セラピストの道へ。',
            'たまたま足踏みセラピーの学校に行ったことで足踏みセラピストとして温泉で15年、フリーで２年目'
        ],
        qualifications: [
            '足流療術師',
            'ウイルワンアカデミーセラピストコース卒業',
            'フットリンパ'
        ],
        courses: [
            {
                title: '足踏みセラピー',
                description: '足の裏で全身を踏みほぐしていく技術',
                duration: '15分 1,500円 / 30分 3,000円'
            }
        ],
        salon_info: {
            name: '湘南レッグス',
            description: '出張、レンタルサロンにて施術。40分 4,000円＋出張費1,000円〜'
        },
        treatment_photos: [
            '../assets/images/yamaguchi2.jpg'
        ]
    },
    // セラピスト - 明石 知子
    '17': {
        id: '17',
        name: '明石 知子',
        gender: 'female',
        categories: ['beauty'],
        specialities: ['beauty'],
        specialty: 'ドライヘッドスパ',
        photo: '../assets/images/akashi1.jpg',
        thumbnailPhoto: '../assets/images/akashi1.jpg',
        description: [
            'ヘッド、首肩の凝りをほぐして心も体も整えてリフレッシュしてください。',
            'エステティシャン、セラピストとして多くのお客様の施術をさせて頂いた経験から、お一人お一人に寄り添いながら、その時々で最善のケアをさせて頂きます。',
            'スポーツ観戦が好きです♥よろしくお願いします。'
        ],
        qualifications: [
            'AEA上級エステティシャン認定資格',
            'リンパアドバイザー認定資格',
            'リラクゼーションセラピスト２級',
            '耳つぼジュエリー認定資格',
            'アロマテラピー１級'
        ],
        courses: [
            {
                title: 'ドライヘッドスパ',
                description: 'ヘッド、首肩の凝りをほぐして心も体も整えてリフレッシュできる施術です。',
                duration: '未設定'
            }
        ],
        salon_info: {
            name: 'リラクゼーション&エステ SHINY',
            url: 'http://b.hpr.jp/kr/hp/H000677479',
            photo: '../assets/images/akashi4.png',
            description: 'ご自身の大切な心と身体を労わるお時間になって頂ければ幸いです。SHINYでは年齢を重ねるほど、美しく、自分らしく輝く☆そんな忙しい女性の癒しの場になれたら嬉しいです。'
        },
        treatment_photos: [
            '../assets/images/akashi2.jpg',
            '../assets/images/akashi3.jpg'
        ]
    },
    // セラピスト - 濵﨑麻依
    '18': {
        id: '18',
        name: '濵﨑 麻依',
        gender: 'female',
        categories: ['medical'],
        specialities: ['medical'],
        specialty: '看護師・アロマセラピスト',
        photo: '../assets/images/hamasaki1.jpg',
        thumbnailPhoto: '../assets/images/hamasaki1.jpg',
        description: [
            '自分らしくいきいき過ごせるお手伝い。こころとからだに寄り添うやさしいケアです。',
            '在宅の現場で看護師として働く中で、支える立場の方ほど自分を後回しにしてしまう現実を感じてきました。心と体がふっと緩む時間を大切に、リンパケアを行なっています。'
        ],
        qualifications: [
            '正看護師',
            'メディカルエステ協会アロマセラピスト'
        ],
        courses: [
            {
                title: 'リフレクソロジー（膝下）',
                description: 'オイルを使用しやさしくマッサージすることで、全身の血液やリンパの流れを整えるケアです。',
                duration: '未設定'
            }
        ],
        salon_info: {
            name: 'to me.care',
            description: '横須賀市を中心に活動しています。サロン、訪問にて施術いたします。'
        },
        treatment_photos: [
            '../assets/images/hamasaki2.jpg',
            '../assets/images/hamasaki3.jpg'
        ]
    },
    // セラピスト - 宜保香代子
    '19': {
        id: '19',
        name: '宜保 香代子',
        gender: 'female',
        categories: ['medical'],
        specialities: ['medical'],
        specialty: '氣功整体セラピスト',
        photo: '../assets/images/gibo1.jpg',
        thumbnailPhoto: '../assets/images/gibo1.jpg',
        description: [
            '看護師30年 × 心と体をふんわり整える氣功整体',
            '看護師30年の経験からお薬だけに頼らない氣功整体をお届けしています。',
            '体と心をふんわり整え、笑顔と元気と喜びを取り戻すお手伝いをしています。'
        ],
        qualifications: [
            '看護師国家資格',
            '氣功整体セラピスト（一般社団法人 日本おうち整体®︎協会 認定セラピスト）'
        ],
        courses: [
            {
                title: '上半身ゆるほぐし（座ったまま）',
                description: '首、肩、背中、頭のコリを優しく触れながら緩めていきます。氣血の巡りを整えることで、頭や目がスッキリし呼吸も楽に。短時間でも動きの軽さを実感できます。',
                duration: '未設定'
            },
            {
                title: '全身リフレッシュほぐし（横になって）',
                description: '頭からつま先までお体の状態を見ながら不調箇所を優しく整えていきます。氣血の巡りを高め、深いコリや緊張を緩めることで、まるで鎧を脱いだような軽やかさへ。体だけでなく、心までふっと緩む深いリラックスを感じていただけます。',
                duration: '未設定'
            }
        ],
        salon_info: {
            name: 'ふんわり',
            url: 'https://smart.reservestock.jp/48162',
            photo: '../assets/images/gibo4.jpg',
            description: 'サロンは持たず、出張やレンタルスペースにて施術を行っています。その方のご都合に合わせて場所やお時間は柔軟にご相談いただけます。毎週木曜日は氣功整体の体験も開催中。年齢を問わず初めての方にも安心して受けていただける優しい施術です。看護師歴30年の経験を生かし、体だけでなく、心までふんわり整うケアを大切にしています。一人ひとりに丁寧に寄り添いながらホッと力が抜けるような時間をお届けします。'
        },
        treatment_photos: [
            '../assets/images/gibo2.jpg',
            '../assets/images/gibo3.jpg'
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