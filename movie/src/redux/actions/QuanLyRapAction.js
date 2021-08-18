import { quanLyRapService } from "../../services/QuanLyRapService";
import { SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_CHIEU } from "./types/QuanLyRapType";


export const layDanhSachHeThongRapAction = () => {
    return async dispatch=>{
        try {
            const result = await quanLyRapService.layDanhSachHeThongRap();

            if(result.status===200){
                const action = {
                    type: SET_HE_THONG_RAP_CHIEU,
                    heThongRapChieu: result.data.content
                };
                dispatch(action);
            }
        } catch (error) {
            console.log('error: ',error.response?.data);
        }
    }
}

export const layThongTinChiTietPhim = (maPhim) =>{
    return async dispatch=>{
        try {
            const result = await quanLyRapService.layThongTinLichChieuPhim(maPhim);

            dispatch({
                type: SET_CHI_TIET_PHIM,
                detailFilm: result.data.content
            });
        } catch (error) {
            console.log('error', error);
            console.log('error', error.response?.data);
        }
    }
}