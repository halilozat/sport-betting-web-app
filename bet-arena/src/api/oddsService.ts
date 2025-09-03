// src/api/oddsService.ts
import { axiosInstance } from './axiosInstance'

// Bu, simüle edilmiş bir API çağrısıdır.
// Gelecekte gerçek bir API'ye geçtiğimizde sadece bu dosyanın içeriği değişecek.
export const getUpcomingOdds = async () => {
  try {
    // Yeniden yapılandırdığımız axios instance'ını kullanarak mock dosyasına istek atıyoruz.
    // baseURL '/' olduğu için, istek 'http://localhost:5173/api/mock-odds.json' adresine gidecektir.
    const response = await axiosInstance.get('/api/mock-odds.json')

    // Sadece veriyi döndürerek, bu servisi kullanan bileşenin
    // response objesinin iç yapısını bilmesine gerek kalmamasını sağlıyoruz.
    return response.data
  } catch (error) {
    // Hata yönetimi burada merkezileştirilebilir.
    console.error('Error fetching upcoming odds:', error)
    // Hatanın, bu fonksiyonu çağıran yere de iletilmesi için yeniden fırlatıyoruz (re-throw).
    throw error
  }
}