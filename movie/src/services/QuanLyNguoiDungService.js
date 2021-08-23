import { GROUPID } from '../util/settings/config';
import { BaseService } from './baseService'

export class QuanLyNguoiDungService extends BaseService {
    constructor() {
        super();
    };

    dangNhap = (thongTinDangNhap) => { //{taiKhoan:'',matKhau:''}
        return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
    };

    dangKy = (thongTinDangKy) => {
        return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
    };

    layThongTinNguoiDung = () => { //lấy thông tin tài khoản
        return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
    };

    capNhatThongTinProfile = (user) => {
        return this.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, user);
    };

    layDanhSachNguoiDung = (value) => {
        if (value != '') {
            return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${value}`);
        };
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`);
    };

    themNguoiDung = (nguoiDung) => {
        return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, nguoiDung);
    };

    layDanhSachLoaiNguoiDung = () => {
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`);
    };

    capNhatThongTinNguoiDung = (nguoiDung) => {
        return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, nguoiDung);
    };

    xoaNguoiDung = (taiKhoan) => {
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
    };
};

export const quanLyNguoiDungService = new QuanLyNguoiDungService();