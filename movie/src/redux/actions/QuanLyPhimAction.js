import { history } from "../../App";
import { quanLyPhimService } from "../../services/QuanLyPhimService"
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import { CHUYEN_TAB_1 } from "./types/QuanLyDatVeType";
import { SET_DS_PHIM, SET_THONG_TIN_PHIM } from "./types/QuanLyPhimType";

export const layDanhSachPhimAction = (tenPhim='') => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction);
            const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
            let action = {
                type: SET_DS_PHIM,
                arrFilm: result.data.content
            };
            await dispatch(action);
            await dispatch({ type: CHUYEN_TAB_1 })
            dispatch(hideLoadingAction);
        } catch (error) {
            dispatch(hideLoadingAction);
            console.log('error', error);
            console.log('error', error.response?.data);
        }
    }
}

export const themPhimUpLoadHinhAction = (formData) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.themPhimUpLoadHinh(formData);
            alert('Thêm phim mới thành công!');
            history.push('/admin/films');
        } catch (error) {
            console.log('error', error);
            console.log('error', error.response?.data);
        }
    }
}

export const layThongTinPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.layThongTinPhim(maPhim);
            dispatch({
                type: SET_THONG_TIN_PHIM,
                thongTinPhim: result.data.content
            });
        } catch (error) {
            console.log('error', error);
            console.log('error', error.response?.data);
        }
    }
}

export const capNhatPhimUploadAction = (formData) => {
    return async (dispatch)=>{
        try{
            let result = await quanLyPhimService.capNhatPhimUpload(formData);
            alert('Cập nhật phim thành công!');
            history.push('/admin/films');
        } catch (error) {
            console.log('error', error);
            console.log('error', error.response?.data);
        }
    }
}


export const xoaPhimAction = (maPhim) => {
    return async (dispatch)=>{
        try{
            let result = await quanLyPhimService.xoaPhim(maPhim);
            alert('Xóa phim thành công!');
            dispatch(layDanhSachPhimAction());
            history.push('/admin/films');
        } catch (error) {
            console.log('error', error);
            console.log('error', error.response?.data);
        }
    }
}