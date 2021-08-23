import { quanLyRapService } from "../../services/QuanLyRapService";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import { SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_CHIEU } from "../types/QuanLyRapType";

//action lấy danh sách tất cả các hệ thống rạp, cụm rạp, lịch chiếu
export const layDanhSachHeThongRapAction = () => {
    return async dispatch => {
        try {
            const result = await quanLyRapService.layDanhSachHeThongRap();
            if (result.status === 200) {
                const action = {
                    type: SET_HE_THONG_RAP_CHIEU,
                    heThongRapChieu: result.data.content
                };
                dispatch(action);
            }
        } catch (error) {
            console.log('error: ', error.response?.data);
        };
    };
};

//action lấy thông tin chi tiết phim hiển thị lên trang detail của user
export const layThongTinChiTietPhim = (maPhim) => {
    return async dispatch => {
        try {
            dispatch(displayLoadingAction);
            const result = await quanLyRapService.layThongTinLichChieuPhim(maPhim);
            dispatch({
                type: SET_CHI_TIET_PHIM,
                detailFilm: result.data.content
            });
            dispatch(hideLoadingAction);
        } catch (error) {
            dispatch(hideLoadingAction);
            console.log('error', error);
            console.log('error', error.response?.data);
        };
    };
};