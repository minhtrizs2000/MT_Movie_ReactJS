import { connection } from "../../index";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import { CHUYEN_TAB_2, CLEAR_DAT_VE, DAT_GHE, SET_CHI_TIET_PHONG_VE } from "../types/QuanLyDatVeType";


//action lấy chi tiết phòng vé (thông tin phim, danh sách ghế) từ api
export const layChiTietPhongVeAction = (maLichChieu) => {
    return async (dispatch) => {
        try {
            //gọi action hiển thị trạng thái loading, khi hàm có await vẫn chưa chạy xong thì vẫn hiển thị
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
            //thành công hay thất bại đêu phải tắt loading
            dispatch(hideLoadingAction);
            console.log('error', error);
            console.log('error', error.response?.data);
        };
    };
};

//action đặt vé gửi thông tin đặt vé lên cho api
export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
    return async (dispatch, getState) => {
        try {
            //gọi action hiển thị trạng thái loading, khi hàm có await vẫn chưa chạy xong thì vẫn hiển thị
            dispatch(displayLoadingAction);
            const result = await quanLyDatVeService.datVe(thongTinDatVe);
            if (result.data.statusCode === 200) {
                alert('Đặt vé thành công!');
            };

            //gọi lại action load lại phòng vé, clear thông tin đặt vé bên phải, ẩn trạng thái loading
            await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
            await dispatch({ type: CLEAR_DAT_VE });
            await dispatch(hideLoadingAction);

            //từ action muốn lấy giá trị từ state thì phải sd getState
            //lấy userlogin để gửi cho sự kiện listen từ sever
            //__call api signalR (realtime)
            let userLogin = getState().QuanLyNguoiDungReducer.userLogin;
            connection.invoke('datGheThanhCong', userLogin.taiKhoan, thongTinDatVe.maLichChieu);

            //chuyển sang tab kết quả đặt vé
            dispatch({ type: CHUYEN_TAB_2 });
        } catch (error) {
            //thành công hay thất bại đêu phải tắt loading
            dispatch(hideLoadingAction);
            console.log('error', error);
            console.log('error', error.response?.data);
        };
    };
};

//action khi người dùng nhấn vào ghế muốn đặt thì thay đổi mảng ghế đang đặt trên reducer
export const datGheAction = (ghe, maLichChieu) => {
    return async (dispatch, getState) => {
        try {
            //đưa thông tin lên reducer
            await dispatch({
                type: DAT_GHE,
                ghe: ghe
            });

            //tổng hợp dữ liệu theo api backend
            let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
            let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;

            //chuyển đổi kiểu dữ liệu
            danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

            //call api signalR (realtime)
            connection.invoke('datGhe', taiKhoan, danhSachGheDangDat, maLichChieu);
        } catch (error) {
            console.log('error', error);
            console.log('error', error.response?.data);
        }
    };
};