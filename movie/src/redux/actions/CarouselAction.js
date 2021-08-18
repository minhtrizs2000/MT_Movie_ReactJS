import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_CAROUSEL } from "./types/CarouselType";



export const getCarouselAction = () => {
    return async (dispatch) => {

        try {
            const result = await quanLyPhimService.layDanhSachBanner();
            
            const action = {
                type: SET_CAROUSEL,
                arrBanner: result.data.content
            }
    
            dispatch(action);
        } catch (error) {
            console.log("error: ",error);
        }
    }
}