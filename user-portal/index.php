<?php
require_once 'auth.php';
requireAuth('index.php');
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>天使たちの癒し - 利用者ポータル</title>
    <link rel="stylesheet" href="../assets/css/main.css">
    <link rel="stylesheet" href="../assets/css/portal.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
    <script src="../assets/js/therapist-data.js?v=20260423"></script>
</head>
<body>
    <!-- ヘッダーコンポーネント -->
    <div id="header" data-component="portal-header"></div>

    <!-- Hero Section -->
    <section class="portal-hero">
        <div class="container">
            <h2>天使たちの癒しへようこそ</h2>
            <p>プロフェッショナルによる癒しの時間をお届けします。ご所属の企業や医療機関の福利厚生として、リラックスのひとときをお楽しみください。</p>
            <a href="#therapists" class="btn">セラピストを見る</a>
        </div>
    </section>

    <!-- Categories Section -->
    <section class="categories">
        <div class="container">
            <div class="section-title">
                <h2>施術カテゴリー</h2>
                <p>様々な専門分野のセラピストが、あなたのニーズに合わせた施術を提供します。</p>
            </div>
            
            <div class="category-grid">
                <div class="category-card" data-category="relaxation">
                    <div class="category-icon">
                        <span>🌿</span>
                    </div>
                    <h3>リラクゼーション系</h3>
                    <p>ストレス解消とリラックス効果の高い施術</p>
                    <div class="category-count">0 名のセラピスト</div>
                </div>
                
                <div class="category-card" data-category="beauty">
                    <div class="category-icon">
                        <span>💆</span>
                    </div>
                    <h3>美容・エステ系</h3>
                    <p>美容とウェルネスを組み合わせた施術</p>
                    <div class="category-count">0 名のセラピスト</div>
                </div>
                
                <div class="category-card" data-category="therapy">
                    <div class="category-icon">
                        <span>🧘</span>
                    </div>
                    <h3>セラピー系</h3>
                    <p>心と体のバランスを整える専門的な施術</p>
                    <div class="category-count">0 名のセラピスト</div>
                </div>
                
                <div class="category-card" data-category="other">
                    <div class="category-icon">
                        <span>⚡</span>
                    </div>
                    <h3>その他専門分野</h3>
                    <p>特殊な技術や専門知識を活かした施術</p>
                    <div class="category-count">0 名のセラピスト</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Therapists Section -->
    <section id="therapists" class="portal-therapists">
        <div class="container">
            <div class="section-title">
                <h2>おすすめセラピスト</h2>
                <p>厳選されたプロフェッショナルセラピストをご紹介</p>
            </div>
            
            <div id="featured-therapists" class="therapists-grid">
                <!-- JavaScript で動的に生成 -->
            </div>
            
            <div class="more-therapists">
                <a href="therapists.php" class="btn btn-outline">全セラピストを見る</a>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="portal-features">
        <div class="container">
            <div class="section-title">
                <h2>利用者ポータルの特徴</h2>
                <p>安心してご利用いただくための充実したサービス</p>
            </div>
            
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">
                        <span>🔒</span>
                    </div>
                    <h3>安心・安全</h3>
                    <p>プライバシーを重視し、安全な環境でサービスを提供します。</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <span>👥</span>
                    </div>
                    <h3>プロフェッショナル</h3>
                    <p>厳選された経験豊富なセラピストが質の高いサービスを提供します。</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <span>📱</span>
                    </div>
                    <h3>簡単予約</h3>
                    <p>シンプルで使いやすいインターフェースで簡単に予約できます。</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <span>⏰</span>
                    </div>
                    <h3>柔軟なスケジュール</h3>
                    <p>様々な時間帯に対応し、お客様の都合に合わせてサービスを提供します。</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="portal-cta">
        <div class="container">
            <h2>今すぐセラピストを見つけよう</h2>
            <p>あなたにぴったりのセラピストを見つけて、癒しの時間をお過ごしください。</p>
            <div class="cta-buttons">
                <a href="therapists.php" class="btn">セラピスト一覧</a>
                <a href="contact-form.php" class="btn btn-outline">お問い合わせ</a>
            </div>
        </div>
    </section>

    <!-- フッターコンポーネント -->
    <div id="footer" data-component="portal-footer"></div>

    <!-- ログアウト用のリンク -->
    <div style="position: fixed; top: 10px; right: 10px; z-index: 1000;">
        <a href="?logout=1" style="background: rgba(0,0,0,0.1); padding: 5px 10px; border-radius: 5px; color: #666; text-decoration: none; font-size: 12px;">ログアウト</a>
    </div>

    <script src="../assets/js/load-components.js"></script>
    <script src="../assets/js/portal.js"></script>
    <script>
        // カテゴリカウントを更新
        document.addEventListener('DOMContentLoaded', function() {
            const categories = ['relaxation', 'beauty', 'therapy', 'other'];
            
            categories.forEach(category => {
                const count = getTherapistsByCategory(category).length;
                const countElement = document.querySelector(`[data-category="${category}"] .category-count`);
                if (countElement) {
                    countElement.textContent = `${count} 名のセラピスト`;
                }
            });
            
            // おすすめセラピストを表示（最初の6名）
            const featuredTherapists = Object.values(therapistData).slice(0, 6);
            const container = document.getElementById('featured-therapists');
            
            featuredTherapists.forEach(therapist => {
                const card = document.createElement('div');
                card.className = 'therapist-card';
                card.innerHTML = `
                    <div class="therapist-image" style="background-image: url('${therapist.thumbnailPhoto || therapist.photo}')"></div>
                    <div class="therapist-content">
                        <div class="therapist-content-top">
                            <h3 class="therapist-name">${therapist.name}</h3>
                            <p class="therapist-specialty">${therapist.specialty}</p>
                            <p class="therapist-description">${therapist.description ? therapist.description[0] : ''}</p>
                        </div>
                        <a href="therapist-detail.php?id=${therapist.id}" class="btn btn-outline">詳細を見る</a>
                    </div>
                `;
                container.appendChild(card);
            });
            
            // カテゴリカードのクリックイベント
            document.querySelectorAll('.category-card').forEach(card => {
                card.addEventListener('click', function() {
                    const category = this.dataset.category;
                    window.location.href = `therapists.php?category=${category}`;
                });
            });
        });
    </script>
</body>
</html>