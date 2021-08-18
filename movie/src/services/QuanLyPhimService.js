import { GROUPID } from '../util/settings/config';
import { BaseService } from './baseService'

export class QuanLyPhimService extends BaseService{
    constructor(){
        super();
    }

    layDanhSachBanner = () => {
        return this.getBanner(`/api/QuanLyPhim/LayDanhSachBanner`);
    }

    layDanhSachPhim = () => {
        return this.get(`/api/quanlyphim/laydanhsachphim?maNhom=${GROUPID}`);
    }
}

export const quanLyPhimService = new QuanLyPhimService();