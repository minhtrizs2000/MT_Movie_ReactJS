import { GROUPID } from '../util/settings/config';
import { BaseService } from './baseService'

export class QuanLyPhimService extends BaseService {
    constructor() {
        super();
    };

    layDanhSachBanner = () => {
        return this.getBanner(`/api/QuanLyPhim/LayDanhSachBanner`);
    };

    layDanhSachPhim = (tenPhim) => {
        if (tenPhim != '') {
            return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`);
        };
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`);
    };

    themPhimUpLoadHinh = (formData) => {
        return this.post(`/api/QuanLyPhim/ThemPhimUpLoadHinh`, formData);
    };

    layThongTinPhim = (maPhim) => {
        return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
    };

    capNhatPhimUpload = (formData) => {
        return this.post(`/api/QuanLyPhim/CapNhatPhimUpload`, formData);
    };

    xoaPhim = (maPhim) => {
        return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
    };
}

export const quanLyPhimService = new QuanLyPhimService();