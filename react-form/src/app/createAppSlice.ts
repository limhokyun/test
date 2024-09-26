import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"

// `buildCreateSlice` allows us to create a slice with async thunks.
// 비동기성이 보장되는 createSlice를 위해 'buildCreateSlice'를 사용합니다.
export const createAppSlice = buildCreateSlice({
    // 비동기 작업을 포함한 Redux 슬라이스를 생성하며, 그 슬라이스는 상태 관리와 비동기 로직을 통합합니다.
    creators: { asyncThunk: asyncThunkCreator },
})