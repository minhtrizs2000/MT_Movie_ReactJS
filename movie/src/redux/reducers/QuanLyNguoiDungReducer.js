import { ACCESSTOKEN, USER_LOGIN } from "../../util/settings/config";
import { DANG_NHAP, SET_DANH_SACH_LOAI_NGUOI_DUNG, SET_DANH_SACH_NGUOI_DUNG, SET_NGUOI_DUNG_CAP_NHAT, SET_THONG_TIN_NGUOI_DUNG } from "../types/QuanLyNguoiDungType";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin: user,
    thongTinNguoiDung: {},
    thongTinNguoiDungUpdate: {},
    danhSachNguoiDung: [],
    danhSachLoaiNguoiDung: [],
};

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case DANG_NHAP: {
            const { thongTinDangNhap } = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
            localStorage.setItem(ACCESSTOKEN, thongTinDangNhap.accessToken);
            return { ...state, userLogin: thongTinDangNhap };
        }
        case SET_THONG_TIN_NGUOI_DUNG: {
            state.thongTinNguoiDung = action.thongTinNguoiDung;
            return { ...state };
        }
        case SET_DANH_SACH_NGUOI_DUNG: {
            state.danhSachNguoiDung = action.danhSachNguoiDung;
            return { ...state };
        }
        case SET_DANH_SACH_LOAI_NGUOI_DUNG: {
            state.danhSachLoaiNguoiDung = action.danhSachLoaiNguoiDung;
            return { ...state };
        }
        case SET_NGUOI_DUNG_CAP_NHAT: {
            state.thongTinNguoiDungUpdate = action.thongTinNguoiDungUpdate;
            return { ...state };
        }
        default: return { ...state }
    }
}