// src/api/axiosInstance.ts
import axios from 'axios'

const apiKey = import.meta.env.VITE_RAPIDAPI_KEY
const apiHost = import.meta.env.VITE_RAPIDAPI_HOST

if (!apiKey || !apiHost) {
  throw new Error('RapidAPI Key veya Host bilgisi .env dosyasında bulunamadı.')
}

// free api hata verdiği için mock data ile çalışıyoruz

// export const axiosInstance = axios.create({
//   baseURL: `https://${apiHost}/v3`,
//   headers: {
//     'X-RapidAPI-Key': apiKey,
//     'X-RapidAPI-Host': apiHost,
//   },
// })


// Kendi sunucumuza (public klasörüne) istek atacağımız için baseURL '/' yeterlidir.
export const axiosInstance = axios.create({
  baseURL: '/',
})