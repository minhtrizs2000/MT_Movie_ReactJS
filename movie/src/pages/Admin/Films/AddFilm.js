import React, { useState } from 'react';
import {
    Form,
    Input,
    DatePicker,
    InputNumber,
    Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { GROUPID } from '../../../util/settings/config';
import { themPhimUpLoadHinhAction } from '../../../redux/actions/QuanLyPhimAction';
import * as Yup from 'yup';


const AddFilm = () => {

    const dispatch = useDispatch();
    const [imgSrc, setImgSrc] = useState('');

    //dùng formik quản lý form + yup để validation
    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},
            maNhom: GROUPID,
        },
        validationSchema: Yup.object().shape({
            tenPhim: Yup.string().required('Tên phim không được bỏ trống!'),
            ngayKhoiChieu: Yup.string().required('Vui lòng chọn ngày khởi chiếu!'),
            danhGia: Yup.number().required('Họ tên không được bỏ trống!').min(1,'Số sao nhỏ nhất là 1, lớn nhất là 10!').max(10,'Số sao nhỏ nhất là 1, lớn nhất là 10!'),
        }),
        onSubmit: (values) => {
            //mặc định giá trị mã nhóm
            values.maNhom = GROUPID;

            //tạo đối tượng formdata bằng vòng lập
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    formData.append('File', values.hinhAnh, values.hinhAnh.name);
                };
            };

            //gọi api gửi các giá trị formData về backEnd xử lý
            dispatch(themPhimUpLoadHinhAction(formData));
            //kiểu dữ liệu form data rất bảo mật nên k xem bằng cách console log đc mà phải get giá trị ra
        },
    });

    //các hàm bắt sự kiện change data từ form và validation
    const handleChangeDatePicker = (value) => {
        let ngayKhoiChieu = moment(value).format('DD/MM/YYYY');
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
    };
    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        }
    };
    const handleChangeNumber = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        }
    };
    const handleChangeFile = (e) => {
        //lấy file từ event
        // vì có thể chọn cùng lúc nhiều file nên mặc định chọn file đầu tiên
        let file = e.target.files[0];

        //tạo đối tượng để đọc file ra
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setImgSrc(e.target.result); //Hình dưới dạng base64
        };
        
        //Đem dữ liệu file lưu vào formik
        formik.setFieldValue('hinhAnh', file);
    };
    const { handleChange, handleBlur, handleSubmit, touched, errors } = formik;

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
                <h3 className="text-3xl text-blue-500 m-10">Thêm phim mới</h3>
                <Form.Item label="Tên Phim">
                    <Input name="tenPhim" onChange={handleChange} onBlur={handleBlur} />
                    {touched.tenPhim && errors.tenPhim && <p className="text-lg text-red-500">{formik.errors.tenPhim}</p>}
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name="trailer" onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Input name="moTa" onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} onBlur={handleBlur} />
                    {touched.ngayKhoiChieu && errors.ngayKhoiChieu && <p className="text-lg text-red-500">{formik.errors.ngayKhoiChieu}</p>}
                </Form.Item>
                <Form.Item label="Đang chiếu">
                    <Switch onChange={handleChangeSwitch('dangChieu')} />
                </Form.Item>
                <Form.Item label="Hot">
                    <Switch onChange={handleChangeSwitch('hot')} />
                </Form.Item>
                <Form.Item label="Sắp chiếu">
                    <Switch onChange={handleChangeSwitch('sapChieu')} />
                </Form.Item>
                <Form.Item label="Số sao">
                    <InputNumber onChange={handleChangeNumber('danhGia')} min={1} max={10} onBlur={handleBlur} />
                    {touched.danhGia && errors.danhGia && <p className="text-lg text-red-500">{formik.errors.danhGia}</p>}
                </Form.Item>
                <Form.Item label="Hình ảnh">
                    <input accept="image/*" type="file" onChange={handleChangeFile} /><br />
                    <img style={{ width: '150px', height: '170px' }} src={imgSrc} alt="..." />
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <button type="submit" className="bg-blue-500 text-white px-5 py-2 rounded-xl border-2 border-blue-500 hover:text-blue-500 hover:bg-white duration-150">Thêm phim</button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddFilm;