import { GROUPID } from '../util/settings/config';
import { BaseService } from './baseService'

export class QuanLyNguoiDungService extends BaseService{
    constructor(){
        super();
    }

    dangNhap = (thongTinDangNhap) => { //{taiKhoan:'',matKhau:''}
        return this.post(`/api/QuanLyNguoiDung/DangNhap`,thongTinDangNhap);
    }

    layThongTinNguoiDung = () => { //lấy thông tin tài khoản
        return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
    }

    layDanhSachNguoiDung = () => {
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`);
    }

    themNguoiDung = (nguoiDung) => {
        return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`,nguoiDung);
    }

    layDanhSachLoaiNguoiDung = () => {
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`);
    }

    capNhatThongTinNguoiDung = (nguoiDung) => {
        return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,nguoiDung);
    }

    xoaNguoiDung = (taiKhoan) =>{
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
    }

}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();