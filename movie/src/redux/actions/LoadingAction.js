import { DISPLAY_LOADING, HIDE_LOADING } from "../types/LoadingType";

//hiển thị trạng thái loading khi đang xử lý tác vụ
export const displayLoadingAction = {
    type: DISPLAY_LOADING
};

//ẩn trạng thái loading khi hoàn tất tác vụ
export const hideLoadingAction = {
    type: HIDE_LOADING
};