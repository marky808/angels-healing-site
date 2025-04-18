/**
 * therapist-data.js - セラピスト情報を管理するファイル
 */

// セラピスト情報を格納するオブジェクト
const therapistData = {
    // セラピスト1
    '1': {
        id: '1',
        name: '山田 優子',
        gender: 'female',
        categories: ['massage'],
        specialities: ['shoulder', 'back'],
        specialty: 'マッサージ・指圧',
        photo: '../assets/images/therapists/therapist1.jpg',
        thumbnailPhoto: '../assets/images/therapists/therapist1-thumb.jpg',
        description: [
            '10年以上の経験を持つマッサージのスペシャリスト。特に肩こりや腰痛のケアを得意としています。',
            '医療系の学校を卒業後、複数の有名サロンで経験を積んできました。お客様一人ひとりの状態や悩みに合わせた、オーダーメイドの施術を提供することをモットーにしています。',
            '自身も長年デスクワークによる肩こりに悩まされてきた経験から、オフィスワーカーの方の身体の不調を改善するための施術に特に力を入れています。'
        ],
        qualifications: [
            '国家資格マッサージ師',
            'タイ古式マッサージ認定資格',
            'リフレクソロジスト認定資格',
            'スポーツマッサージ専門コース修了'
        ],
        courses: [
            {
                title: '全身リラクゼーションマッサージ',
                description: '全身の筋肉の緊張をほぐし、リラックス効果を高めるマッサージです。疲労回復や睡眠の質向上にも効果的です。',
                duration: '施術時間: 30分 / 60分'
            },
            {
                title: '肩こり集中ケア',
                description: '肩や首周りの筋肉に特化したマッサージ。慢性的な肩こりや首のコリに悩む方におすすめです。',
                duration: '施術時間: 20分 / 40分'
            },
            {
                title: '腰痛改善マッサージ',
                description: '腰痛の原因となる筋肉や骨盤周りのバランスを整える施術。デスクワークや立ち仕事で腰痛に悩む方に。',
                duration: '施術時間: 20分 / 40分'
            },
            {
                title: 'デスクワーカー向けケア',
                description: '長時間のデスクワークによる体の不調を総合的にケア。肩こり、腰痛、目の疲れなどにアプローチします。',
                duration: '施術時間: 30分 / 60分'
            }
        ]
    },
    
    // セラピスト2
    '2': {
        id: '2',
        name: '鈴木 健太',
        gender: 'male',
        categories: ['aroma'],
        specialities: ['stress', 'fatigue'],
        specialty: 'アロマセラピー',
        photo: '../assets/images/therapists/therapist2.jpg',
        thumbnailPhoto: '../assets/images/therapists/therapist2-thumb.jpg',
        description: [
            'アロマの知識と技術を活かした施術で、心身の緊張をほぐします。香りによる癒し効果を実感できます。',
            'フランスのアロマセラピー専門校で学び、帰国後は様々なサロンでアロマセラピストとして活躍。精油の特性を熟知し、一人ひとりの体調や好みに合わせたブレンドを提供します。',
            '精油の持つ自然の力を通して、心と体の調和を取り戻すお手伝いをします。'
        ],
        qualifications: [
            'AEAJ認定アロマセラピスト',
            'IFPA認定アロマセラピスト',
            'リフレクソロジー資格',
            'メディカルハーブ検定取得'
        ],
        courses: [
            {
                title: 'リラクゼーションアロマトリートメント',
                description: '心地よい香りと優しいタッチで全身の緊張をほぐすアロマトリートメント。深いリラックス効果が得られます。',
                duration: '施術時間: 60分 / 90分'
            },
            {
                title: 'デトックスアロマトリートメント',
                description: 'リンパの流れを促進し、老廃物の排出をサポートするトリートメント。むくみの改善や代謝アップに効果的です。',
                duration: '施術時間: 60分 / 90分'
            },
            {
                title: 'ストレスケアアロマセラピー',
                description: 'ストレス軽減に特化したアロマブレンドを使用し、心と体の緊張を和らげます。自律神経のバランスを整えます。',
                duration: '施術時間: 60分'
            },
            {
                title: 'フェイシャルアロマトリートメント',
                description: '顔や頭部の緊張をほぐし、表情筋をリラックスさせるトリートメント。目の疲れや頭痛の軽減にも効果的です。',
                duration: '施術時間: 30分 / 45分'
            }
        ]
    },
    
    // セラピスト3
    '3': {
        id: '3',
        name: '佐藤 美香',
        gender: 'female',
        categories: ['healing'],
        specialities: ['stress'],
        specialty: 'ヒーリング・レイキ',
        photo: '../assets/images/therapists/therapist3.jpg',
        thumbnailPhoto: '../assets/images/therapists/therapist3-thumb.jpg',
        description: [
            'エネルギーワークを通じた深いリラクゼーションを提供。ストレスの多い現代人におすすめです。',
            'レイキマスターとしての経験を活かし、エネルギーの停滞を解消するヒーリングを行います。心身のバランスを整え、内側からの癒しをもたらします。',
            '多忙な日常から離れて、深いリラックス状態へと導きます。施術後は心がクリアになり、前向きなエネルギーに満たされるでしょう。'
        ],
        qualifications: [
            'レイキマスター資格',
            'クリスタルヒーリング認定',
            'マインドフルネスセラピスト',
            'チャクラバランシング認定'
        ],
        courses: [
            {
                title: 'レイキヒーリング',
                description: '手のひらを通してエネルギーを流し、心身のバランスを整えるヒーリング。深いリラックス状態へと導きます。',
                duration: '施術時間: 45分 / 60分'
            },
            {
                title: 'チャクラバランシング',
                description: '体内のエネルギーセンター（チャクラ）のバランスを整える施術。エネルギーの流れを改善し、心身の調和をもたらします。',
                duration: '施術時間: 60分'
            },
            {
                title: 'マインドフルネスメディテーション',
                description: '呼吸法と瞑想を組み合わせたセッション。ストレスの軽減や思考の整理に効果的です。',
                duration: '施術時間: 30分 / 45分'
            },
            {
                title: 'クリスタルヒーリング',
                description: '天然石の持つエネルギーを活用したヒーリング。状態に合わせた石を選び、エネルギーフィールドを整えます。',
                duration: '施術時間: 45分 / 60分'
            }
        ]
    },
    
    // セラピスト4
    '4': {
        id: '4',
        name: '田中 誠',
        gender: 'male',
        categories: ['oriental'],
        specialities: ['shoulder', 'back', 'fatigue'],
        specialty: '鍼灸・東洋医学',
        photo: '../assets/images/therapists/therapist4.jpg',
        thumbnailPhoto: '../assets/images/therapists/therapist4-thumb.jpg',
        description: [
            '国家資格を持つ鍼灸師。東洋医学の知識を活かし、体のバランスを整える施術を行います。',
            '東洋医学の考え方に基づき、症状の原因となる体のバランスの乱れを見極め、一人ひとりに合った施術プランを提供します。',
            '鍼灸治療に抵抗がある方にも安心していただけるよう、丁寧な説明と痛みの少ない施術を心がけています。根本的な改善を目指す方におすすめです。'
        ],
        qualifications: [
            '国家資格鍼灸師',
            '国家資格あん摩マッサージ指圧師',
            '中医学研修修了',
            '経絡治療学会認定'
        ],
        courses: [
            {
                title: '全身調整鍼灸',
                description: '体全体のバランスを整える鍼灸治療。自律神経の調整や免疫力向上に効果的です。',
                duration: '施術時間: 45分 / 60分'
            },
            {
                title: '肩こり・首こり専門鍼灸',
                description: '肩や首の凝りに特化した鍼灸治療。緊張した筋肉をほぐし、血流を改善します。',
                duration: '施術時間: 30分 / 45分'
            },
            {
                title: '腰痛緩和鍼灸',
                description: '腰痛の原因となる筋肉の緊張や血流の滞りを改善する鍼灸治療。慢性的な腰痛にも効果的です。',
                duration: '施術時間: 30分 / 45分'
            },
            {
                title: '美容鍼灸',
                description: '顔の筋肉や皮膚の状態を改善する美容目的の鍼治療。血行促進やリフトアップ効果が期待できます。',
                duration: '施術時間: 45分 / 60分'
            }
        ]
    },
    
    // セラピスト5
    '5': {
        id: '5',
        name: '中村 大輔',
        gender: 'male',
        categories: ['massage'],
        specialities: ['fatigue'],
        specialty: 'スポーツマッサージ',
        photo: '../assets/images/therapists/therapist5.jpg',
        thumbnailPhoto: '../assets/images/therapists/therapist5-thumb.jpg',
        description: [
            '元スポーツトレーナーの経験を活かした、疲労回復に特化したマッサージを提供します。',
            'プロスポーツチームでのトレーナー経験を持ち、アスリートのケアで培った技術を一般の方にも提供。筋肉の状態を的確に把握し、効果的なマッサージを行います。',
            '運動後のケアはもちろん、デスクワークによる慢性的な疲労にも対応。身体本来の動きを取り戻すサポートをします。'
        ],
        qualifications: [
            'スポーツトレーナー資格',
            '柔道整復師国家資格',
            'スポーツマッサージ認定',
            'ストレッチングスペシャリスト認定'
        ],
        courses: [
            {
                title: 'スポーツリカバリーマッサージ',
                description: '運動後の筋肉疲労を素早く回復させるためのマッサージ。血流促進と老廃物の排出を促進します。',
                duration: '施術時間: 45分 / 60分'
            },
            {
                title: 'ディープティシューマッサージ',
                description: '深部の筋肉にアプローチする強めのマッサージ。慢性的な凝りや緊張を解消します。',
                duration: '施術時間: 60分 / 90分'
            },
            {
                title: 'コンディショニングストレッチ',
                description: 'マッサージとストレッチを組み合わせた施術。筋肉の柔軟性を高め、可動域を広げます。',
                duration: '施術時間: 45分 / 60分'
            },
            {
                title: '姿勢改善プログラム',
                description: '姿勢の悪さによる身体の不調を改善するためのマッサージとエクササイズ指導。',
                duration: '施術時間: 60分'
            }
        ]
    }
    
    // 他のセラピストも同様に追加できます（ID: 6〜20）
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

// 複合条件でフィルタリングするための関数
function filterTherapists(category, speciality, gender) {
    return Object.values(therapistData).filter(therapist => 
        (category === 'all' || therapist.categories.includes(category)) &&
        (speciality === 'all' || therapist.specialities.includes(speciality)) &&
        (gender === 'all' || therapist.gender === gender)
    );
}