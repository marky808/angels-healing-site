<?php
require_once 'auth.php';
requireAuth('therapist-detail.php');
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>セラピスト詳細 - 天使たちの癒し</title>
    <link rel="stylesheet" href="../assets/css/main.css">
    <link rel="stylesheet" href="../assets/css/portal.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
    <script src="../assets/js/therapist-data.js?v=20260512"></script>
    <style>
        .section-title {
            color: var(--primary-color);
            font-weight: 600;
            margin-bottom: 15px;
        }

        /* メイン画像のスタイル統一 */
        .therapist-header {
            display: flex;
            gap: 30px;
            margin-bottom: 40px;
            align-items: flex-start;
        }

        .therapist-image-large {
            flex-shrink: 0;
        }

        .therapist-image-large img {
            width: 300px;
            height: 300px;
            object-fit: cover;
            border-radius: 15px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .therapist-basic-info {
            flex: 1;
            padding-left: 20px;
        }

        .therapist-basic-info h1 {
            font-size: 28px;
            margin-bottom: 10px;
            color: var(--primary-color);
        }

        .therapist-specialty {
            font-size: 18px;
            color: #666;
            margin-bottom: 20px;
            font-weight: 500;
        }

        .therapist-description p {
            margin-bottom: 15px;
            line-height: 1.7;
        }

        .therapist-section {
            margin-bottom: 40px;
        }

        @media (max-width: 768px) {
            .therapist-header {
                flex-direction: column;
                text-align: center;
            }
            
            .therapist-basic-info {
                padding-left: 0;
                padding-top: 20px;
            }
            
            .therapist-image-large img {
                width: 250px;
                height: 250px;
            }
        }

        .salon-photos {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-top: 20px;
        }
        .salon-photo {
            width: 250px;
            height: 180px;
            background-size: cover;
            background-position: center;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: transform 0.3s ease;
        }

        .salon-photo:hover {
            transform: scale(1.05);
        }

        .treatment-photos {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }

        .treatment-photo {
            width: 100%;
            height: 150px;
            background-size: cover;
            background-position: top center; /* 顔など上部が切れにくいように上寄せ */
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }

        .treatment-photo:hover {
            transform: scale(1.03);
        }

        .courses-list {
            margin-top: 15px;
        }

        .course-item {
            background: #f8f9fa;
            border-left: 4px solid var(--primary-color);
            padding: 20px;
            margin-bottom: 15px;
            border-radius: 0 8px 8px 0;
        }

        .course-title {
            font-weight: 600;
            color: var(--primary-color);
            margin-bottom: 10px;
        }

        .course-description {
            margin-bottom: 10px;
            line-height: 1.6;
        }

        .course-duration {
            font-size: 0.9rem;
            color: #666;
            font-weight: 500;
        }

        .qualifications-list {
            display: grid;
            gap: 10px;
            margin-top: 15px;
        }

        .qualification-item {
            padding: 12px 16px;
            background: linear-gradient(135deg, #f1f3f4 0%, #e8eaf0 100%);
            border-radius: 8px;
            border-left: 3px solid var(--primary-color);
            font-weight: 500;
        }
    </style>
</head>
<body>
    <!-- ヘッダーコンポーネント -->
    <div id="header" data-component="portal-header"></div>

    <!-- Therapist Detail -->
    <section class="therapist-detail">
        <div class="container">
            <div id="therapist-info">
                <!-- JavaScript で動的に生成 -->
            </div>
            
            <div class="back-to-list">
                <a href="therapists.php" class="btn btn-outline">← セラピスト一覧に戻る</a>
            </div>
        </div>
    </section>

    <!-- フッターコンポーネント -->
    <div id="footer" data-component="portal-footer"></div>

    <!-- ログアウト用のリンク -->
    <div style="position: fixed; top: 10px; right: 10px; z-index: 1000;">
        <a href="?logout=1" style="background: rgba(0,0,0,0.1); padding: 5px 10px; border-radius: 5px; color: #666; text-decoration: none; font-size: 12px;">ログアウト</a>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // URLからセラピストIDを取得
            const urlParams = new URLSearchParams(window.location.search);
            const therapistId = urlParams.get('id');
            
            if (!therapistId) {
                document.getElementById('therapist-info').innerHTML = '<p class="error">セラピストが見つかりませんでした。</p>';
                return;
            }
            
            // セラピスト情報を取得
            const therapist = getTherapistById(therapistId);
            
            if (!therapist) {
                document.getElementById('therapist-info').innerHTML = '<p class="error">セラピストが見つかりませんでした。</p>';
                return;
            }
            
            // ページタイトルを更新
            document.title = `${therapist.name} - セラピスト詳細 - 天使たちの癒し`;
            
            // セラピスト詳細を表示
            const therapistInfo = document.getElementById('therapist-info');
            
            // 基本情報セクション
            let html = `
                <div class="therapist-header">
                    <div class="therapist-image-large">
                        <img src="${therapist.photo}" alt="${therapist.name}" />
                    </div>
                    <div class="therapist-basic-info">
                        <h1>${therapist.name}</h1>
                        <p class="therapist-specialty">${therapist.specialty}</p>
                        <div class="therapist-description">
                            ${therapist.description.map(desc => `<p>${desc}</p>`).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            // 資格・経歴セクション
            if (therapist.qualifications && therapist.qualifications.length > 0) {
                html += `
                    <div class="therapist-section">
                        <h3 class="section-title">資格・経歴</h3>
                        <div class="qualifications-list">
                            ${therapist.qualifications.map(qual => `<div class="qualification-item">${qual}</div>`).join('')}
                        </div>
                    </div>
                `;
            }
            
            // コース・施術内容セクション
            if (therapist.courses && therapist.courses.length > 0) {
                html += `
                    <div class="therapist-section">
                        <h3 class="section-title">コース・施術内容</h3>
                        <div class="courses-list">
                            ${therapist.courses.map(course => `
                                <div class="course-item">
                                    <div class="course-title">${course.title}</div>
                                    <div class="course-description">${course.description}</div>
                                    ${course.duration ? `<div class="course-duration">${course.duration}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
            
            // サロン情報セクション
            if (therapist.salon_info) {
                html += `
                    <div class="therapist-section">
                        <h3 class="section-title">サロン情報</h3>
                        <div class="salon-info">
                            <h4>${therapist.salon_info.name}</h4>
                            <p>${therapist.salon_info.description}</p>
                            ${therapist.salon_info.url ? `<p><a href="${therapist.salon_info.url}" target="_blank" rel="noopener">サロン公式サイト</a></p>` : ''}
                        </div>
                `;
                
                // サロン写真を表示
                if (therapist.salon_info.photo) {
                    html += `
                        <div class="salon-photos">
                            <div class="salon-photo" style="background-image: url('${therapist.salon_info.photo}')"></div>
                        </div>
                    `;
                }
                
                html += `</div>`;
            }
            
            // 施術写真セクション
            if (therapist.treatment_photos && therapist.treatment_photos.length > 0) {
                // サロン写真と施術写真をまとめて表示
                const allPhotos = [];
                
                // サロン写真を追加
                if (therapist.salon_info && therapist.salon_info.photo) {
                    allPhotos.push(therapist.salon_info.photo);
                }
                
                // 施術写真を追加
                allPhotos.push(...therapist.treatment_photos);
                
                // 重複を除去
                const uniquePhotos = [...new Set(allPhotos)];
                
                html += `
                    <div class="therapist-section">
                        <h3 class="section-title">施術・サロン写真</h3>
                        <div class="treatment-photos">
                            ${uniquePhotos.map(photo => `
                                <div class="treatment-photo" style="background-image: url('${photo}')"></div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
            
            therapistInfo.innerHTML = html;
        });
    </script>

    <script src="../assets/js/load-components.js"></script>
    <script src="../assets/js/main.js"></script>
    <script src="../assets/js/portal.js"></script>
</body>
</html>