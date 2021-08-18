import { ACCESSTOKEN, USER_LOGIN } from "../../util/settings/config";
import { DANG_NHAP, SET_THONG_TIN_NGUOI_DUNG } from "../actions/types/QuanLyNguoiDungType";

let user = {};
if(localStorage.getItem(USER_LOGIN)){
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin: user,
    thongTinNguoiDung: {}
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

        default: return { ...state }
    }
}