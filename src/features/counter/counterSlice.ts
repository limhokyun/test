import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { AppThunk } from "../../app/store"
import { fetchCount } from "./counterAPI"

export interface CounterSliceState {
    value: number
    status: "idle" | "loading" | "failed"
}

const initialState: CounterSliceState = {
    value: 0,
    status: "idle",
}


// 만약 비동기가 필요 없다면 그냥 'createSlice'를 사용할 수 있습니다.
export const counterSlice = createAppSlice({
    name: "counter",
    // createSlice는 initialState 인수로부터 상태 타입을 추론합니다.
    initialState,
    // reducers 필드는 리듀서를 정의하고 관련된 액션들을 생성할 수 있게 해줍니다.
    reducers: create => ({
        increment: create.reducer(state => {
            // reducer는 Redux Toolkit에서 제공하는 함수로 "변경하는(mutating)" 로직을 작성할 수 있도록 허용합니다.
            // 하지만 실제로는 상태를 변경하지 않습니다. 이는 Immer 라이브러리를 사용하기 때문입니다.
            // Immer는 "초안 상태(draft stat)"의 변화를 감지하고, 그 변화에 기반하여 새로운 불변 상태를 생성합니다.
            state.value += 1
        }),
        decrement: create.reducer(state => {
            state.value -= 1
        }),
        // PayloadAction은 Redux Tookit에서 제공하는 타입으로, 액션의 payload에서 타입을 명확히 정의할 수 있도록 도와줍니다.
        incrementByAmount: create.reducer(
            (state, action: PayloadAction<number>) => {
                state.value += action.payload
            },
        ),

        // 아래의 함수는 'Thunk'라고 불리며, 비동기 로직을 실행할 수 있게 해줍니다.
        // 이 함수는 일반적인 액션처럼 dispatch를 통해 실행될 수 있습니다: dispatch(incrementAsync(10)).
        // Thunk는 첫 번째 인자로 dispatch 함수를 받게 됩니다.
        // 그 후 비동기 코드를 실행하고, 다른 액션들을 dispatch할 수 있습니다.
        // Thunk는 주로 비동기 요청(ex: API 호출)을 처리하는 데 사용됩니다.
        incrementAsync: create.asyncThunk(
            async (amount: number) => {
                const response = await fetchCount(amount)
                // 우리가 반환한 값은 fulfilled 액션의 payload가 됩니다.
                return response.data
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.status = "idle"
                    state.value += action.payload
                },
                rejected: state => {
                    state.status = "failed"
                },
            },
        ),
    }),
    // 여기서 selectors를 정의할 수 있습니다. 이 selector들은 첫 번째 인자로 슬라이스 상태를 받습니다.
    // selector는 Redux 상태에서 필요한 데이터를 선택하는 함수입니다. 이 selector는 특정 슬라이스의 상태를 인자로 받아서, 그 상태에서 특정 부분을 추출하거나 가공한 데이터를 반환하는데 사용합니다.
    selectors: {
        selectCount: counter => counter.value,
        selectStatus: counter => counter.status,
    },
})

// action creator는 각 케이스 리듀서 함수에 대해 생성됩니다.
export const { decrement, increment, incrementByAmount, incrementAsync } =
    counterSlice.actions

// slice.selectors가 반환하는 셀렉터는 첫 번째 인자로 루트 상태를 받습니다.
export const { selectCount, selectStatus } = counterSlice.selectors

// 수동으로 Thunk를 작성할 수도 있으며, 이러한 Thunk는 동기와 비동기 로직을 모두 포함할 수 있습니다.
// 여기에서는 현재 상태에 따라 조건부로 액션을 디스패치하는 예시입니다.
export const incrementIfOdd =
    (amount: number): AppThunk =>
        (dispatch, getState) => {
            const currentValue = selectCount(getState())

            if (currentValue % 2 === 1 || currentValue % 2 === -1) {
                dispatch(incrementByAmount(amount))
            }
        }