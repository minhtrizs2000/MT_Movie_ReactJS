import React, { useEffect } from 'react';
import {
    Form,
    Input,
    Select
} from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { GROUPID } from '../../../util/settings/config';
import { capNhatNguoiDungAction, layDanhSachLoaiNguoiDungAction, layDanhSachNguoiDungAction, layThongTinNguoiDungCapNhatAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import * as Yup from 'yup';

const EditUser = (props) => {
    const dispatch = useDispatch();
    const { thongTinNguoiDungUpdate, danhSachLoaiNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

    //chạy mặc định sau khi render xong giao diện
    useEffect(() => {
        //lấy tài khoản của user thông qua id trên đường dẫn link
        let { id } = props.match.params;

        //dispatch lên action lấy dữ liệu loại người dùng để load lên thẻ select của form và thông tin người dùng cần cập nhật từ reducer
        dispatch(layDanhSachNguoiDungAction());
        dispatch(layDanhSachLoaiNguoiDungAction());
        dispatch(layThongTinNguoiDungCapNhatAction(id));
    }, []);

    //dùng formik quản lý form + yup để validation
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinNguoiDungUpdate?.taiKhoan,
            matKhau: thongTinNguoiDungUpdate?.matKhau,
            email: thongTinNguoiDungUpdate?.email,
            soDt: thongTinNguoiDungUpdate?.soDt,
            hoTen: thongTinNguoiDungUpdate?.hoTen,
            maLoaiNguoiDung: thongTinNguoiDungUpdate?.maLoaiNguoiDung,
            maNhom: GROUPID,
        },
        validationSchema: Yup.object().shape({
            taiKhoan: Yup.string().required('Tài khoản không được bỏ trống!'),
            matKhau: Yup.string().required('Mật khẩu không được bỏ trống!').min(6, 'Mật khẩu tối thiểu 6 - 32 kí tự!').max(32, 'Mật khẩu tối thiểu 6 - 32 kí tự!'),
            email: Yup.string().email('Email không hợp lệ!').required('Email không được bỏ trống!'),
            soDt: Yup.string().matches(/^[0-9]+$/, 'Số điện thoại không được chứa chữ và ký tự đặc biệt!'),
            hoTen: Yup.string().required('Họ tên không được bỏ trống!'),
            maLoaiNguoiDung: Yup.string().required('Chọn loại người dùng!'),
        }),
        onSubmit: (values) => {
            values.maNhom = GROUPID;
            let updateUser = values;

            dispatch(capNhatNguoiDungAction(updateUser));
            console.log(`updateUser`, updateUser);
        },
    });

    //hàm xử lý sự kiện change input trên form và sử lý validation touched,errors input
    const { handleChange, handleBlur, touched, errors } = formik;

    //hàm xử lý sự kiện change thẻ select loại người dùng 
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
                <h3 className="text-3xl text-yellow-500 m-10">Cập nhật người dùng - {formik.values.taiKhoan}</h3>
                <Form.Item label="Tài khoản">
                    <Input name="taiKhoan" value={formik.values.taiKhoan} onChange={handleChange} onBlur={handleBlur} />
                    {touched.taiKhoan && errors.taiKhoan && <p className="text-lg text-red-500">{formik.errors.taiKhoan}</p>}
                </Form.Item>
                <Form.Item label="Mật khẩu">
                    <Input name="matKhau" value={formik.values.matKhau} onChange={handleChange} onBlur={handleBlur} />
                    {touched.matKhau && errors.matKhau && <p className="text-lg text-red-500">{formik.errors.matKhau}</p>}
                </Form.Item>
                <Form.Item label="Họ và tên">
                    <Input name="hoTen" value={formik.values.hoTen} onChange={handleChange} onBlur={handleBlur} />
                    {touched.hoTen && errors.hoTen && <p className="text-lg text-red-500">{formik.errors.hoTen}</p>}
                </Form.Item>
                <Form.Item label="Email">
                    <Input name="email" value={formik.values.email} onChange={handleChange} onBlur={handleBlur} />
                    {touched.email && errors.email && <p className="text-lg text-red-500">{formik.errors.email}</p>}
                </Form.Item>
                <Form.Item label="Số điện thoại">
                    <Input name="soDt" value={formik.values.soDt} onChange={handleChange} onBlur={handleBlur} />
                    {touched.soDt && errors.soDt && <p className="text-lg text-red-500">{formik.errors.soDt}</p>}
                </Form.Item>
                <Form.Item label="Loại người dùng">
                    <Select options={danhSachLoaiNguoiDung?.map((lnd, index) => ({ label: lnd.tenLoai, value: lnd.maLoaiNguoiDung }))} onChange={handleChangeLoaiNguoiDung} value={formik.values.maLoaiNguoiDung} placeholder="Chọn loại người dùng" onBlur={handleBlur} />
                    {touched.maLoaiNguoiDung && errors.maLoaiNguoiDung && <p className="text-lg text-red-500">{formik.errors.maLoaiNguoiDung}</p>}
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <button type="submit" className="bg-yellow-500 text-white px-5 py-2 rounded-xl border-2 border-yellow-500 hover:text-yellow-500 hover:bg-white duration-150">Cập nhật</button>
                </Form.Item>
            </Form>
        </>
    );
};

export default EditUser;