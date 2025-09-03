// src/store/bulletin/bulletinSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUpcomingOdds } from '../../api/oddsService'
import type { BulletinState, Match } from './types.ts'

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

const initialState: BulletinState = {
  matches: [],
  loading: 'idle',
  error: null,
}

export const bulletinSlice = createSlice({
  name: 'bulletin',
  initialState,
  reducers: {
  },
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