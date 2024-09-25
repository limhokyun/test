import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type Company = {
    id: string;
    companyName: string;
    email: string;
    employee: any[];
    products: any[];
    fields: any[];
};
const initialState: Company = {
    id: '',
    companyName: '',
    email: '',
    employee: [],
    products: [],
    fields: []
}
export const settingCompanySlice = createSlice({
    name: "company",
    initialState,
    reducers: create => ({
        setCompany: create.reducer((state, action: PayloadAction<Company>) => {
            return action.payload
        },)
    }),
    selectors: {
        selectName: company => company.companyName
    }
})
// action creator는 각 케이스 리듀서 함수에 대해 생성됩니다.
export const { setCompany } =
    settingCompanySlice.actions
// slice.selectors가 반환하는 셀렉터는 첫 번째 인자로 루트 상태를 받습니다.
export const { selectName } = settingCompanySlice.selectors