import {
    Form,
    DatePicker,
    InputNumber,
    Select
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { quanLyDatVeService } from '../../../services/QuanLyDatVeService';
import { quanLyRapService } from '../../../services/QuanLyRapService';

export default function ShowTimes(props) {

    const formik = useFormik({
        initialValues: {
            maPhim: props.match.params.id,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: ''
        },
        onSubmit: async (values) => {
            try {
                let result = await quanLyDatVeService.taoLichChieu(values);
                alert(result.data.content);
            } catch (error) {
                console.log(`error`, error.response?.data);
            }
        }
    });

    const [state, setState] = useState({
        heThongRapChieu: [],
        cumRapChieu: [],
    });

    useEffect(async () => {
        try {
            let result = await quanLyRapService.layThongTinHeThongRap();

            setState({
                ...state,
                heThongRapChieu: result.data.content
            });
        } catch (error) {
            console.log(`error`, error.response?.data);
        }
    }, []);

    const handleChangeHeThongRap = async (value) => {
        //khi change hệ thống rạp => call api lấy thông tin rạp
        try {
            let result = await quanLyRapService.layThongTinCumRap(value);
            //Gán giá trị cụm rạp vào state cumRap
            setState({
                ...state,
                cumRapChieu:result.data.content
            })

        }catch (error) {
            console.log('error',error.response?.data);
        }
    };

    const handleChangeCumRap = async (value) => {
        formik.setFieldValue('maRap',value);
    };

    const handleChangeDateTime = (value) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'));
    };
    const onOk = (value) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'));
    };

    const handleChangeInputNumber = (value) => {
        formik.setFieldValue('giaVe', value);
    };
    //Nếu muốn tách hàm chuyển chuỗi thì ghi ntn
    //
    // const convertSelectHTR = ()=>{
    //     return state.heThongRapChieu?.map((htr,index)=>{
    //         return {label:htr.tenHeThongRap, value:htr.maHeThongRap}
    //     });
    // };

    return (
        <div className="w-1/2">
            <Form
                className="rounded-xl border-4 border-green-500"
                onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 12,
                }}
                layout="horizontal"
                initialValues={{
                    size: 'large',
                }}
                size={'large'}
            >
                <h3 className="text-3xl text-green-500 m-10">Thêm lịch chiếu - {props.match.params.tenphim}</h3>
                <Form.Item label="Hệ thống rạp">
                    <Select options={state.heThongRapChieu?.map((htr, index) => ({ label: htr.tenHeThongRap, value: htr.maHeThongRap }))} onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp" />
                </Form.Item>
                <Form.Item label="Cụm rạp">
                    <Select options={state.cumRapChieu?.map((cr, index) => ({ label: cr.tenCumRap, value: cr.maCumRap }))} onChange={handleChangeCumRap} placeholder="Chọn cụm rạp" />
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={handleChangeDateTime} onOk={onOk} />
                </Form.Item>
                <Form.Item label="Giá vé">
                    <InputNumber min={75000} max={150000} onChange={handleChangeInputNumber} />
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <button type="submit" className="bg-green-500 text-white px-5 py-2 rounded-xl border-2 border-green-500 hover:text-green-500 hover:bg-white duration-150">Thêm lịch chiếu</button>
                </Form.Item>
            </Form>
        </div>
    )
}
