// src/store/bulletin/bulletinSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUpcomingOdds } from '../../api/oddsService'
import type { BulletinState, Match } from './types.ts'

// 1. Asenkron Thunk'ı oluşturuyoruz
// Bu, API çağrısını yapacak ve sonuçlarına göre action'lar dispatch edecek.
export const fetchBulletinOdds = createAsyncThunk<Match[]>(
  'bulletin/fetchOdds',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUpcomingOdds()
      return data
    } catch (error) {
      return rejectWithValue('Veri çekilirken bir hata oluştu.')
    }
  },
)

// 2. Başlangıç state'ini tanımlıyoruz
const initialState: BulletinState = {
  matches: [],
  loading: 'idle',
  error: null,
}

// 3. Slice'ı oluşturuyoruz
export const bulletinSlice = createSlice({
  name: 'bulletin',
  initialState,
  reducers: {
    // Senkron action'lar gerekirse buraya eklenebilir
  },
  // Asenkron action'ları burada yönetiyoruz
  extraReducers: (builder) => {
    builder
      .addCase(fetchBulletinOdds.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(fetchBulletinOdds.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.matches = action.payload
      })
      .addCase(fetchBulletinOdds.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })
  },
})

export default bulletinSlice.reducer