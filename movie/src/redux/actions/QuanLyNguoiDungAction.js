import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService"
import { DANG_NHAP, SET_DANH_SACH_LOAI_NGUOI_DUNG, SET_DANH_SACH_NGUOI_DUNG, SET_NGUOI_DUNG_CAP_NHAT, SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG_UPDATE } from "../types/QuanLyNguoiDungType";
import { history } from "../../App";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";

//action đăng nhập
export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction);
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_NHAP,
                    thongTinDangNhap: result.data.content
                });
            };
            //chuyen ve trang truoc do
            history.push('/');
            dispatch(hideLoadingAction);
        } catch (error) {
            dispatch(hideLoadingAction);
            console.log('error', error);
            console.log('error', error.response?.data);
            alert(error.response?.data.content);
        };
    };
};

//action đăng ký
export const dangKyAction = (thongTinDangKy) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction);
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangKy);
            alert('Đăng ký thành công!');
            history.push('/login');
            dispatch(hideLoadingAction);
        } catch (error) {
            dispatch(hideLoadingAction);
            console.log('error', error);
            console.log('error', error.response?.data);
            alert(error.response?.data.content);
        };
    };
};

//action lấy thông tin người dùng dựa trên accesstoken hiển thị lên profile
export const layThongTinNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layThongTinNguoiDung();
            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                });
            };
            console.log(`result.data.content`, result.data.content);
        } catch (error) {
            console.log('error', error);
            console.log('error', error.response?.data);
        };
    };
};

//action cập nhật profile cho user
export const capNhatProfileAction = (data) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.capNhatThongTinProfile(data);
            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                });
            };
            alert('Cập nhật thông tin thành công!');
        } catch (error) {
            console.log('error', error);
            console.log('error', error.response?.data);
            alert(error.response?.data.content);
        }
    }
}

//action lấy danh sách người dùng và ng dùng tìm kiếm của admin
export const layDanhSachNguoiDungAction = (value = '') => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung(value);
            await dispatch({
                type: SET_DANH_SACH_NGUOI_DUNG,
                danhSachNguoiDung: result.data.content
            });
        } catch (error) {
            console.log('error', error);
            console.log('error', error.response?.data);
        };
    };
};

//action thêm người dùng
export const themNguoiDungAction = (nguoiDung) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.themNguoiDung(nguoiDung);
            alert('Thêm người dùng thành công!');
            history.push('/admin');
        } catch (error) {
            console.log('error res', error.response?.data.content);
            alert(error.response?.data.content);
        };
    };
};

//action lấy danh sách loại người dùng load lên thẻ select
export const layDanhSachLoaiNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();
            dispatch({
                type: SET_DANH_SACH_LOAI_NGUOI_DUNG,
                danhSachLoaiNguoiDung: result.data.content
            });
        } catch (error) {
            console.log('error', error);
            console.log('error', error.response?.data);
        };
    };
};

//action lấy thông tin người dùng để cập nhật bên admin
export const layThongTinNguoiDungCapNhatAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung('');
            const ngdCN = await result.data.content.find(us => us.taiKhoan === id);

            dispatch({
                type: SET_NGUOI_DUNG_CAP_NHAT,
                thongTinNguoiDungUpdate: ngdCN
            });
            console.log(`result.data.content`, result.data.content);
            console.log(`id`, id);
        } catch (error) {
            console.log('error', error);
            console.log('error', error.response?.data);
        };
    };
};

//action cập nhật người dùng của admin
export const capNhatNguoiDungAction = (nguoiDung) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(nguoiDung);
            alert('Cập nhật thành công người dùng!');
            window.location.reload();
        } catch (error) {
            console.log('error res', error.response?.data.content);
            alert(error.response?.data.content);
        };
    };
};

//action xóa người dùng của admin
export const xoaNguoiDungAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
            alert('Xóa thành công người dùng!');
            history.push('/admin/users');
        } catch (error) {
            console.log('error res', error.response?.data.content);
            alert(error.response?.data.content);
        };
    };
};