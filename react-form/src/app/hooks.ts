// 특정 모듈의 직접적인 사용을 제한하는 규칙인데, 이 파일에서만 예외를 허용합니다.
/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "./store"

// useDispatch는 액션을 디스패치하기 위해 사용됩니다.
// withTypes를 이용해서 커스텀 훅을 정의하므로 이후 따로 타입을 지정하지 않아도 dispatch 함수에서 타입 안정성을 보장합니다.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
// useSelector는 Redux 스토어에서 상태를 확이하는데 사용됩니다.
// witTypes를 이용해서 커스텀 훅을 정의하므로 이후 따로 타입을 지정하지 않아도 selector 함수에서 타입 안정성을 보장합니다.
export const useAppSelector = useSelector.withTypes<RootState>()