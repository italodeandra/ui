import { Dispatch, SetStateAction } from "react";

type UseState<S> = [S, Dispatch<SetStateAction<S>>];

export default UseState;
