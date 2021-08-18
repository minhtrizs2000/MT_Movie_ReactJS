import { connection } from "../../index";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import { CHUYEN_TAB_2, CLEAR_DAT_VE, DAT_GHE, SET_CHI_TIET_PHONG_VE } from "./types/QuanLyDatVeType";




export const layChiTietPhongVeAction = (maLichChieu)=>{

    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction);
            const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);
            if (result.data.statusCode === 200) {
                await dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                });
            };
            dispatch(hideLoadingAction);
        } catch (error) {
            dispatch(hideLoadingAction);
            console.log('error', error);
            console.log('error', error.response?.data);
        }
    }
}

export const datVeAction = (thongTinDatVe = new ThongTinDatVe())=>{
    return async (dispatch,getState) => {
        try {

            dispatch(displayLoadingAction);

            const result = await quanLyDatVeService.datVe(thongTinDatVe);
            if (result.data.statusCode === 200) {
                console.log(result.data.content);
            };
            
            //load lai api phongve
            await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
            await dispatch({type:CLEAR_DAT_VE});
            await dispatch(hideLoadingAction);

            let userLogin = getState().QuanLyNguoiDungReducer.userLogin;
            connection.invoke('datGheThanhCong',userLogin.taiKhoan,thongTinDatVe.maLichChieu);

            dispatch({type:CHUYEN_TAB_2});


        } catch (error) {
            dispatch(hideLoadingAction);
            console.log('error', error);
            console.log('error', error.response?.data);
        }
    }
}

export const datGheAction = (ghe, maLichChieu) => {
    return async (dispatch,getState)=>{
        try{
            //dua thong tin len reducer
            await dispatch({
                type: DAT_GHE,
                ghe: ghe
            });

            //tong hop du lieu theo api backend
            let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
            let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;

            danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

            console.log({taiKhoan,danhSachGheDangDat,maLichChieu});
            //call api signalR
            connection.invoke('datGhe',taiKhoan,danhSachGheDangDat,maLichChieu);
        } catch (error) {
            console.log('error', error);
            console.log('error', error.response?.data);
        }
    }
}