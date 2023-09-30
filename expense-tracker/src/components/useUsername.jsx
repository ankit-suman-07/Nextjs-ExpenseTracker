import { useSelector } from "react-redux";

export default function useUsername() {
    return useSelector((state) => state.authReducer.value.username);
}
