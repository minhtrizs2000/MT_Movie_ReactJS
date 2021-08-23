import { GROUPID } from '../util/settings/config';
import { BaseService } from './baseService'

export class QuanLyRapService extends BaseService {
    constructor() {
        super();
    };

    layDanhSachHeThongRap = () => {//lấy tất cả thông tin của hệ thống rạp bao gồm htr cụm rạp lịch chiếu 
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`);
    };

    layThongTinLichChieuPhim = (maPhim) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?maPhim=${maPhim}`);
    };

    layThongTinHeThongRap = () => { //trang tạo lịch chiếu phim chỉ lấy danh sách hệ thống rạp
        return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
    };

    layThongTinCumRap = (maHeThongRap) => {
        return this.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
    };
};
export const quanLyRapService = new QuanLyRapService();