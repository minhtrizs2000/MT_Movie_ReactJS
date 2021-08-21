import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Select
} from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { GROUPID } from '../../../util/settings/config';
import { layDanhSachLoaiNguoiDungAction, themNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';

const AddUser = () => {

    const dispatch = useDispatch();

    const { danhSachLoaiNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

    useEffect(() => {
        dispatch(layDanhSachLoaiNguoiDungAction());
    }, []);

    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            hoTen: '',
            maLoaiNguoiDung: '',
            maNhom: GROUPID,
        },
        onSubmit: (values) => {
            values.maNhom = GROUPID;

            let newUser = values;
            dispatch(themNguoiDungAction(newUser));
            console.log(`newUser`, newUser);
        },
    });


    const handleChangeLoaiNguoiDung = (value) => {
        formik.setFieldValue('maLoaiNguoiDung',value);
    };

    return (
        <>
            <Form
                className="rounded-xl border-4 border-blue-500 w-1/2"
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
                <h3 className="text-3xl text-blue-500 m-10">Thêm người dùng mới mới</h3>
                <Form.Item label="Tài khoản">
                    <Input name="taiKhoan" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Mật khẩu">
                    <Input name="matKhau" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Họ và tên">
                    <Input name="hoTen" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Email">
                    <Input name="email" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Số điện thoại">
                    <Input name="soDt" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Loại người dùng">
                    <Select options={danhSachLoaiNguoiDung?.map((lnd, index) => ({ label: lnd.tenLoai, value: lnd.maLoaiNguoiDung }))} onChange={handleChangeLoaiNguoiDung} placeholder="Chọn loại người dùng" />
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <button type="submit" className="bg-blue-500 text-white px-5 py-2 rounded-xl border-2 border-blue-500 hover:text-blue-500 hover:bg-white duration-150">Thêm người dùng</button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddUser;