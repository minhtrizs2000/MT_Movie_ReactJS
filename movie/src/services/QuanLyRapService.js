import { GROUPID } from '../util/settings/config';
import { BaseService } from './baseService'

export class QuanLyRapService extends BaseService{
    constructor(){
        super();
    }

    layDanhSachHeThongRap = () => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`);
    }

    layThongTinLichChieuPhim = (maPhim) =>{
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?maPhim=${maPhim}`);
    }
}

export const quanLyRapService = new QuanLyRapService();