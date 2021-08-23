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
import * as Yup from 'yup';
import { history } from '../../../App';

export default function ShowTimes(props) {

    //dùng formik quản lý form + yup để validation
    const formik = useFormik({
        initialValues: {
            maPhim: props.match.params.id,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: ''
        },
        validationSchema: Yup.object().shape({
            maRap: Yup.string().required('Vui lòng chọn hệ thống rạp và cụm rạp!'),
            ngayChieuGioChieu: Yup.string().required('Vui lòng chọn ngày giờ chiếu!'),
            giaVe: Yup.number().required('Giá vé không được bỏ trống!').min(75000,'Giá vé thấp nhất là 75.000 VNĐ!, cao nhất là 150.000 VNĐ').max(150000,'Giá vé thấp nhất là 75.000 VNĐ!, cao nhất là 150.000 VNĐ'),
        }),
        onSubmit: async (values) => {
            try {
                let result = await quanLyDatVeService.taoLichChieu(values);
                alert(result.data.content);
                history.push('/admin/films');
            } catch (error) {
                console.log(`error`, error.response?.data);
            }
        }
    });

    //khai báo state chỉ sd trong component này
    const [state, setState] = useState({
        heThongRapChieu: [],
        cumRapChieu: [],
    });

    //chạy mặc định sau khi render xong giao diện
    // thay vì tạo 1 action asyn await trên redux thì tạo bằng useEffect để lấy api luôn
    useEffect(async () => {
        try {
            //result lấy về danh sách các hệ thống rạp
            let result = await quanLyRapService.layThongTinHeThongRap();

            //set hệ thống rạp trên state (...state để set state chỉ định hệ thống rạp k bị mất data của các state khác)
            setState({
                ...state,
                heThongRapChieu: result.data.content
            });
        } catch (error) {
            console.log(`error`, error.response?.data);
        }
    }, []);

    //hàm bắt sự kiện change của select hệ thống rạp
    const handleChangeHeThongRap = async (value) => {
        //khi change hệ thống rạp => call api lấy thông tin rạp
        try {
            let result = await quanLyRapService.layThongTinCumRap(value);
            //Gán giá trị cụm rạp vào state cumRap
            setState({
                ...state,
                cumRapChieu:result.data.content
            });
        }catch (error) {
            console.log('error',error.response?.data);
        }
    };

    //các hàm bắt sự kiện change các input
    const handleChangeCumRap = (value) => {
        //change cụm rạp => gán vào field value của formik
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
    const { handleChange, handleBlur, handleSubmit, touched, errors } = formik;

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
                onSubmitCapture={handleSubmit}
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
                    <Select options={state.cumRapChieu?.map((cr, index) => ({ label: cr.tenCumRap, value: cr.maCumRap }))} onChange={handleChangeCumRap} placeholder="Chọn cụm rạp" onBlur={handleBlur} />
                    {touched.maRap && errors.maRap && <p className="text-lg text-red-500">{formik.errors.maRap}</p>}
                </Form.Item>
                <Form.Item label="Ngày giờ chiếu">
                    <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={handleChangeDateTime} onOk={onOk} onBlur={handleBlur} />
                    {touched.ngayChieuGioChieu && errors.ngayChieuGioChieu && <p className="text-lg text-red-500">{formik.errors.ngayChieuGioChieu}</p>}
                </Form.Item>
                <Form.Item label="Giá vé">
                    <InputNumber min={75000} max={150000} onChange={handleChangeInputNumber} onBlur={handleBlur} />
                    {touched.giaVe && errors.giaVe && <p className="text-lg text-red-500">{formik.errors.giaVe}</p>}
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <button type="submit" className="bg-green-500 text-white px-5 py-2 rounded-xl border-2 border-green-500 hover:text-green-500 hover:bg-white duration-150">Thêm lịch chiếu</button>
                </Form.Item>
            </Form>
        </div>
    )
}
