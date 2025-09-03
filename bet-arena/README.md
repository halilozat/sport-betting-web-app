# Bet Arena - Sports Betting Web App

Bu proje, React, Vite, TypeScript ve Redux Toolkit kullanılarak geliştirilmiş modern bir spor bahisleri web uygulamasıdır. Kullanıcıların yaklaşan maçları ve oranlarını görüntülemesine, bahis kuponu oluşturmasına ve Firebase ile kimlik doğrulaması yapmasına olanak tanır.

![Uygulama Ekran Görüntüsü](BURAYA_EKRAN_GÖRÜNTÜSÜ_LİNKİ_GELECEK)

## 🚀 Özellikler

- **Bahis Bülteni:** Yaklaşan maçların listelenmesi ve takım adına göre anlık arama/filtreleme.
- **Bahis Sepeti:**
    - Maçlara ait oranları kupona ekleme, çıkarma ve güncelleme.
    - Sepetteki toplam maç sayısı ve toplam oranın anlık olarak hesaplanması.
- **Firebase Authentication:**
    - E-posta ve şifre ile güvenli kullanıcı kaydı ve girişi.
    - Oturum kalıcılığı sayesinde sayfa yenilendiğinde oturumun korunması.
- **Rota Koruma:** Giriş yapmış kullanıcıların login/register sayfalarına, giriş yapmamış kullanıcıların ise bülten gibi özel sayfalara erişiminin engellenmesi.

## 🛠️ Kullanılan Teknolojiler ve Kütüphaneler

- **Frontend:** React, Vite, TypeScript
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **Styling:** SCSS (Sass)
- **API İstekleri:** Axios
- **Backend & Authentication:** Firebase
- **Kod Kalitesi:** ESLint, Prettier

## ⚙️ Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1.  **Depoyu Klonlayın:**
    ```bash
    git clone [https://github.com/SENIN_KULLANICI_ADIN/bet-arena.git](https://github.com/SENIN_KULLANICI_ADIN/bet-arena.git)
    cd bet-arena
    ```

2.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```

3.  **Environment Değişkenlerini Ayarlayın:**
    Projenin ana dizininde `.env` adında bir dosya oluşturun ve `.env.example` dosyasındaki (eğer oluşturduysan) alanları kendi Firebase proje bilgilerinizle doldurun.
    ```
    # FIREBASE CONFIG
    VITE_FIREBEASE_API_KEY="..."
    VITE_FIREBEASE_AUTH_DOMAIN="..."
    # ...diğer Firebase değişkenleri
    ```

4.  **Geliştirme Sunucusunu Başlatın:**
    ```bash
    npm run dev
    ```
    Uygulama şimdi `http://localhost:5173` adresinde çalışıyor olacaktır.

## 🔗 Canlı Demo

Uygulamanın canlı versiyonuna [BURAYA_VERCEL_LİNKİ_GELECEK] adresinden ulaşabilirsiniz.