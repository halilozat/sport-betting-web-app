// src/api/oddsService.ts
import { axiosInstance } from './axiosInstance'

// Bu, simüle edilmiş bir API çağrısıdır.
// Free service'in sitesi çalışmadığı için mock data ile çalıştım
// Gelecekte gerçek bir API'ye geçtiğimizde sadece bu dosyanın içeriği değişecek.
export const getUpcomingOdds = async () => {
  try {
    const response = await axiosInstance.get('/api/mock-odds.json')
    return response.data
  } catch (error) {
    console.error('Error fetching upcoming odds:', error)
    throw error
  }
}