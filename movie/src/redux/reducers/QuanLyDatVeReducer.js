import { CHUYEN_TAB_1, CHUYEN_TAB_2, CLEAR_DAT_VE, DAT_GHE, DAT_GHE_REAL_TIME, SET_CHI_TIET_PHONG_VE } from "../actions/types/QuanLyDatVeType";

const stateDefault = {
    chiTietPhongVe: {
        thongTinPhim: {},
        danhSachGhe: []
    },
    danhSachGheDangDat: [],
    danhSachGheKhachDangDat: [],
    tabActive: '1'
};

export const QuanLyDatVeReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_CHI_TIET_PHONG_VE: {
            state.chiTietPhongVe = action.chiTietPhongVe;
            return { ...state };
        }
        case DAT_GHE: {
            // update danh sach ghe dang dat
            let danhSachGheCapNhat = [...state.danhSachGheDangDat];

            let index = danhSachGheCapNhat.findIndex(ghe => ghe.maGhe === action.ghe.maGhe);
            if (index !== -1) {
                danhSachGheCapNhat.splice(index, 1);
            } else {
                danhSachGheCapNhat.push(action.ghe);
            }

            return { ...state, danhSachGheDangDat: danhSachGheCapNhat };
        }
        case CLEAR_DAT_VE:{
            state.danhSachGheDangDat = [];
            return { ...state };
        }
        case CHUYEN_TAB_2:{
            state.tabActive = '2';
            return { ...state };
        }
        case CHUYEN_TAB_1:{
            state.tabActive = '1';
            return { ...state };
        }
        case DAT_GHE_REAL_TIME:{
            state.danhSachGheKhachDangDat = action.arrGheKhachDangDat;
            return { ...state };
        }
        default: return { ...state };
    }
}