import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_CAROUSEL } from "../types/CarouselType";


//action lấy danh sách carousel từ api
export const getCarouselAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layDanhSachBanner();

            //set lại danh sách carousel trên store redux
            dispatch({
                type: SET_CAROUSEL,
                arrBanner: result.data.content
            });
        } catch (error) {
            console.log("error: ", error);
        };
    };
};