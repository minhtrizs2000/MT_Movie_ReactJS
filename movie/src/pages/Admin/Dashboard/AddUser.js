import React, { useEffect } from 'react';
import {
    Form,
    Input,
    Select
} from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { GROUPID } from '../../../util/settings/config';
import { layDanhSachLoaiNguoiDungAction, themNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import * as Yup from 'yup';


const AddUser = () => {
    const dispatch = useDispatch();
    const { danhSachLoaiNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

    //chạy mặc định sau khi render xong giao diện
    useEffect(() => {
        //dispatch action để lấy danh sách loại người dùng load lên thẻ select
        dispatch(layDanhSachLoaiNguoiDungAction());
    }, []);

    //dùng formik quản lý form + yup để validation
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
        validationSchema: Yup.object().shape({
            taiKhoan: Yup.string().required('Tài khoản không được bỏ trống!'),
            matKhau: Yup.string().required('Mật khẩu không được bỏ trống!').min(6, 'Mật khẩu tối thiểu 6 - 32 kí tự!').max(32, 'Mật khẩu tối thiểu 6 - 32 kí tự!'),
            email: Yup.string().email('Email không hợp lệ!').required('Email không được bỏ trống!'),
            soDt: Yup.string().required('Số điện thoại không được bỏ trống!').matches(/^[0-9]+$/, 'Số điện thoại không được chứa chữ và ký tự đặc biệt!'),
            hoTen: Yup.string().required('Họ tên không được bỏ trống!'),
            maLoaiNguoiDung: Yup.string().required('Chọn loại người dùng!'),
        }),
        onSubmit: (values) => {
            values.maNhom = GROUPID;

            let newUser = values;
            dispatch(themNguoiDungAction(newUser));
        },
    });

    //hàm xử lý sự kiện change input trên form và sử lý validation touched,errors input
    const { handleChange, handleBlur, handleSubmit, touched, errors } = formik;

    //hàm xử lý sự kiện change thẻ select loại người dùng 
    const handleChangeLoaiNguoiDung = (value) => {
        formik.setFieldValue('maLoaiNguoiDung', value);
    };

    return (
        <>
            <Form
                className="rounded-xl border-4 border-blue-500 w-1/2"
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
                <h3 className="text-3xl text-blue-500 m-10">Thêm người dùng mới mới</h3>
                <Form.Item label="Tài khoản">
                    <Input name="taiKhoan" onChange={handleChange} onBlur={handleBlur} />
                    {touched.taiKhoan && errors.taiKhoan && <p className="text-lg text-red-500">{formik.errors.taiKhoan}</p>}
                </Form.Item>
                <Form.Item label="Mật khẩu">
                    <Input name="matKhau" onChange={handleChange} onBlur={handleBlur} />
                    {touched.matKhau && errors.matKhau && <p className="text-lg text-red-500">{formik.errors.matKhau}</p>}
                </Form.Item>
                <Form.Item label="Họ và tên">
                    <Input name="hoTen" onChange={handleChange} onBlur={handleBlur} />
                    {touched.hoTen && errors.hoTen && <p className="text-lg text-red-500">{formik.errors.hoTen}</p>}
                </Form.Item>
                <Form.Item label="Email">
                    <Input name="email" onChange={handleChange} onBlur={handleBlur} />
                    {touched.email && errors.email && <p className="text-lg text-red-500">{formik.errors.email}</p>}
                </Form.Item>
                <Form.Item label="Số điện thoại">
                    <Input name="soDt" onChange={handleChange} onBlur={handleBlur} />
                    {touched.soDt && errors.soDt && <p className="text-lg text-red-500">{formik.errors.soDt}</p>}
                </Form.Item>
                <Form.Item label="Loại người dùng">
                    <Select options={danhSachLoaiNguoiDung?.map((lnd, index) => ({ label: lnd.tenLoai, value: lnd.maLoaiNguoiDung }))} onChange={handleChangeLoaiNguoiDung} placeholder="Chọn loại người dùng" onBlur={handleBlur} />
                    {touched.maLoaiNguoiDung && errors.maLoaiNguoiDung && <p className="text-lg text-red-500">{formik.errors.maLoaiNguoiDung}</p>}
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <button type="submit" className="bg-blue-500 text-white px-5 py-2 rounded-xl border-2 border-blue-500 hover:text-blue-500 hover:bg-white duration-150">Thêm người dùng</button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddUser;