import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService"
import { DANG_NHAP, SET_DANH_SACH_LOAI_NGUOI_DUNG, SET_DANH_SACH_NGUOI_DUNG, SET_NGUOI_DUNG_CAP_NHAT, SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG_UPDATE } from "./types/QuanLyNguoiDungType";
import { history } from "../../App";

export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_NHAP,
                    thongTinDangNhap: result.data.content
                });
            };
            //chuyen ve trang truoc do
            history.goBack();
        } catch (error) {
            console.log('error', error);
            console.log('error', error.response?.data);
            alert(error.response?.data.content);
        }
    }
}

export const layThongTinNguoiDungAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layThongTinNguoiDung();
            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                });
            };
        } catch (error) {
            console.log('error', error);
            console.log('error', error.response?.data);
        }
    }
}

export const layDanhSachNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung();
            await dispatch({
                type: SET_DANH_SACH_NGUOI_DUNG,
                danhSachNguoiDung: result.data.content
            });
        } catch (error) {
            console.log('error', error);
            console.log('error', error.response?.data);
        }
    }
}

export const themNguoiDungAction = (nguoiDung) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.themNguoiDung(nguoiDung);
            alert('Thêm người dùng thành công!');
            history.push('/admin');
        } catch (error) {
            console.log('error res', error.response?.data.content);
            alert(error.response?.data.content);
        }
    }
}

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
        }
    }
}

export const layThongTinNguoiDungCapNhatAction = (id) =>{
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung();
            
            const ngdCN = await result.data.content.find(us=>us.taiKhoan===id);

            dispatch({
                type: SET_NGUOI_DUNG_CAP_NHAT,
                thongTinNguoiDungUpdate: ngdCN
            });
        } catch (error) {
            console.log('error', error);
            console.log('error', error.response?.data);
        }
    }
}

export const capNhatNguoiDungAction = (nguoiDung) => {
    return async (dispatch)=>{
        try{
            const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(nguoiDung);
            alert('Cập nhật thành công người dùng!');
            window.location.reload();
        } catch (error) {
            console.log('error res', error.response?.data.content);
            alert(error.response?.data.content);
        }
    }
}

export const xoaNguoiDungAction = (taiKhoan) =>{
    return async (dispatch)=>{
        try{
            const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
            alert('Xóa thành công người dùng!');
            history.push('/admin/users');
        } catch (error) {
            console.log('error res', error.response?.data.content);
            alert(error.response?.data.content);
        }
    }
}