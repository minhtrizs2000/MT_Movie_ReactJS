import { ThongTinDatVe } from '../_core/models/ThongTinDatVe';
import { BaseService } from './baseService'

export class QuanLyDatVeService extends BaseService{
    constructor(){
        super();
    }

    layChiTietPhongVe = (maLichChieu) => { //{taiKhoan:'',matKhau:''}
        return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
    }

    datVe = (thongTinDatVe = new ThongTinDatVe) => {
        return this.post(`/api/QuanLyDatVe/DatVe`,thongTinDatVe);
    }

}

export const quanLyDatVeService = new QuanLyDatVeService();