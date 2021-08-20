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

const AddFilm = () => {

    const dispatch = useDispatch();

    const [imgSrc, setImgSrc] = useState('');

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
        onSubmit: (values) => {
            values.maNhom = GROUPID;

            //tạo đối tượng formdata
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
            // console.log('formData: ', formData.get('ngayKhoiChieu'));
        },
    });

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
        let file = e.target.files[0];

        //tạo đối tượng để đọc file
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setImgSrc(e.target.result); //Hình dưới dạng base64
        };

        //Đem dữ liệu file lưu vào formik
        formik.setFieldValue('hinhAnh', file);
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
                <h3 className="text-3xl text-blue-500 m-10">Thêm phim mới</h3>
                <Form.Item label="Tên Phim">
                    <Input name="tenPhim" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name="trailer" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Input name="moTa" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
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
                    <InputNumber onChange={handleChangeNumber('danhGia')} min={1} max={10} />
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