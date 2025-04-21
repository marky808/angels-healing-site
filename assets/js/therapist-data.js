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
        categories: ['oriental'],
        specialities: ['shoulder', 'head', 'stress'],
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