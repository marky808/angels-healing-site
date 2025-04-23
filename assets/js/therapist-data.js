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
        categories: ['medical'],
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
        categories: [
            'relaxation',
            'other'
        ],
        specialities: [
            'relaxation',
            'other'
        ],
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