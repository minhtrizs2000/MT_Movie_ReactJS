import { quanLyPhimService } from "../../services/QuanLyPhimService"
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import { CHUYEN_TAB_1 } from "./types/QuanLyDatVeType";
import { SET_DS_PHIM } from "./types/QuanLyPhimType";

export const layDanhSachPhimAction = () => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction);
            const result = await quanLyPhimService.layDanhSachPhim();
            let action = {
                type: SET_DS_PHIM,
                arrFilm: result.data.content
            };
            await dispatch(action);
            await dispatch({type:CHUYEN_TAB_1})
            dispatch(hideLoadingAction);
        } catch (error) {
            dispatch(hideLoadingAction);
            console.log('error', error);
            console.log('error', error.response?.data);
        }
    }
}