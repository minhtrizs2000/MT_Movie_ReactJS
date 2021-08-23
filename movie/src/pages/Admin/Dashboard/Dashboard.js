import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd';
import { Input } from 'antd';
import { EditOutlined, DeleteOutlined, DiffOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import { layDanhSachNguoiDungAction, xoaNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';

const { Search } = Input;

export default function Dashboard(props) {
    const { danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();

    //chạy mặc định sau khi render xong giao diện
    useEffect(() => {
        //dispatch action để lấy danh sách người dùng load lên table quản lý
        dispatch(layDanhSachNguoiDungAction());
    }, []);

    //khai báo các cột sd trong component antd
    //title: tên hiển thị
    //dataIndex: key trong mảng dữ liệu
    //render: hàm render xử lý giao diện
    //có thể sort theo colum
    const columns = [
        {
            title: 'Tài khoản',
            dataIndex: 'taiKhoan',
            render: (text, user) => {
                return <span className="tracking-wider">{user.taiKhoan}</span>
            },
            width: '15%'
        },
        {
            title: 'Họ Tên',
            dataIndex: 'hoTen',
            render: (text, user) => {
                return <span className="tracking-wider">{user.hoTen}</span>
            },
            width: '15%'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: (text, user) => {
                return <span className="tracking-wider">{user.email}</span>
            },
            width: '15%'
        },
        {
            title: 'Số ĐT',
            dataIndex: 'soDt',
            render: (text, user) => {
                return <span className="tracking-wider">{user.soDt}</span>
            },
            width: '10%'
        },
        {
            title: 'Loại người dùng',
            dataIndex: 'maLoaiNguoiDung',
            render: (text, user) => {
                if(user.maLoaiNguoiDung === 'QuanTri'){
                    return <span className="font-bold tracking-wider">Quản trị viên</span>
                }
                return <span className="tracking-wider">Khách hàng</span>
            },
            width: '10%'
        },
        {
            title: 'Chức năng',
            dataIndex: 'taiKhoan',
            render: (text, user, index) => {
                return <div className="flex justify-left items-center" key={index}>
                    <NavLink className="text-xl mx-5 px-4 pb-2 border-4 border-yellow-500 bg-yellow-500 text-white rounded-xl hover:text-yellow-500 hover:bg-white" to={`/admin/users/edituser/${user.taiKhoan}`}><EditOutlined /></NavLink>
                    <span className="text-2xl cursor-pointer mx-5 px-4 pb-2 border-4 border-red-500 bg-red-500 text-white rounded-xl hover:text-red-500 hover:bg-white" onClick={() => {
                        //gọi action xoa
                        if (window.confirm('Bạn có chắc muốn xóa tài khoản này: "' + user.taiKhoan + '" ?')) {
                            //gọi action
                            dispatch(xoaNguoiDungAction(user.taiKhoan));
                        }
                    }}><DeleteOutlined /></span>
                </div>
            },
            sortDirections: ['descend', 'ascend'],
            width: '25%'
        },
    ];

    //khai báo mảng data sẽ sd trên table antd
    const data = danhSachNguoiDung;

    //hàm xử lý sk change của table antd
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    };

    //hàm xử lý sk search của component Search của antd
    //truyền vào giá trị muốn tìm kiếm hàm dispatch lên gọi api load danh sách người dùng theo từ khóa
    const onSearch = value => {
        dispatch(layDanhSachNguoiDungAction(value));
    };

    return (
        <div>
            <h3 className="text-3xl">Quản lý người dùng</h3>
            <div className="w-full flex justify-end">
                <button onClick={() => {
                    history.push("/admin/users/adduser");
                }} className="w-60 text-lg border-4 border-blue-500 hover:text-blue-500 hover:bg-white rounded-xl duration-200 my-5 px-5 py-2 bg-blue-500 text-white">Thêm người dùng mới</button>
            </div>
            <Search
                className="mb-5"
                placeholder="Nhập từ khóa muốn tìm kiếm"
                enterButton="Tìm kiếm"
                size="large"
                onSearch={onSearch}
            />
            <Table pagination={{ showSizeChanger: false }} columns={columns} dataSource={data} onChange={onChange} rowKey={"taiKhoan"} />
        </div>
    )
}
