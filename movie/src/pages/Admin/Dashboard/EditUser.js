import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Select
} from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { GROUPID } from '../../../util/settings/config';
import { capNhatNguoiDungAction, layDanhSachLoaiNguoiDungAction, layThongTinNguoiDungCapNhatAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { history } from '../../../App';
import { quanLyNguoiDungService } from '../../../services/QuanLyNguoiDungService';

const EditUser = (props) => {

    const dispatch = useDispatch();

    const { thongTinNguoiDungUpdate, danhSachLoaiNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

    useEffect(() => {
        let { id } = props.match.params;
        dispatch(layDanhSachLoaiNguoiDungAction());
        dispatch(layThongTinNguoiDungCapNhatAction(id));
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinNguoiDungUpdate.taiKhoan,
            matKhau: thongTinNguoiDungUpdate.matKhau,
            email: thongTinNguoiDungUpdate.email,
            soDt: thongTinNguoiDungUpdate.soDt,
            hoTen: thongTinNguoiDungUpdate.hoTen,
            maLoaiNguoiDung: thongTinNguoiDungUpdate.maLoaiNguoiDung,
            maNhom: GROUPID,
        },
        onSubmit: (values) => {
            values.maNhom = GROUPID;
            let updateUser = values;

            dispatch(capNhatNguoiDungAction(updateUser));
            console.log(`updateUser`, updateUser);
        },
    });

    const handleChangeLoaiNguoiDung = (value) => {
        formik.setFieldValue('maLoaiNguoiDung', value);
    };

    return (
        <>
            <Form
                className="rounded-xl border-4 border-yellow-500 w-1/2"
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
                <h3 className="text-3xl text-yellow-500 m-10">Cập nhật người dùng - {thongTinNguoiDungUpdate.taiKhoan}</h3>
                <Form.Item label="Tài khoản">
                    <Input disabled name="taiKhoan" onChange={formik.handleChange} value={formik.values.taiKhoan} />
                </Form.Item>
                <Form.Item label="Mật khẩu">
                    <Input name="matKhau" onChange={formik.handleChange} value={formik.values.matKhau} />
                </Form.Item>
                <Form.Item label="Họ và tên">
                    <Input name="hoTen" onChange={formik.handleChange} value={formik.values.hoTen} />
                </Form.Item>
                <Form.Item label="Email">
                    <Input name="email" onChange={formik.handleChange} value={formik.values.email} />
                </Form.Item>
                <Form.Item label="Số điện thoại">
                    <Input name="soDt" onChange={formik.handleChange} value={formik.values.soDt} />
                </Form.Item>
                <Form.Item label="Loại người dùng">
                    <Select options={danhSachLoaiNguoiDung?.map((lnd, index) => ({ label: lnd.tenLoai, value: lnd.maLoaiNguoiDung }))} onChange={handleChangeLoaiNguoiDung} value={formik.values.maLoaiNguoiDung} placeholder="Chọn loại người dùng" />
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <button type="submit" className="bg-yellow-500 text-white px-5 py-2 rounded-xl border-2 border-yellow-500 hover:text-yellow-500 hover:bg-white duration-150">Cập nhật</button>
                </Form.Item>
            </Form>
        </>
    );
};

export default EditUser;