import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd';
import { Input } from 'antd';
import { EditOutlined, DeleteOutlined, DiffOutlined } from '@ant-design/icons';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';

const { Search } = Input;



export default function Films(props) {


    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(layDanhSachPhimAction());
    }, []);
    console.log(arrFilm);

    const columns = [
        {
            title: 'Mã phim',
            dataIndex: 'maPhim',
            sorter: (a, b) => a.maPhim - b.maPhim,
            render: (text, film) => {
                return <span className="text-xl tracking-wider">{film.maPhim}</span>
            },
            sortDirections: ['descend'],
            defaultSortOrder: ['descend'],
            width: '10%'
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            render: (text, film, index) => {
                return <Fragment>
                    <img src={film.hinhAnh} alt="hinhAnh" style={{ width: '50px', height: '60px' }} onError={(e) => { e.target.onError = null; e.target.src = `https://picsum.photos/id/${index}/50/70` }} />
                </Fragment>
            },
            width: '20%'
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            sorter: (a, b) => {
                let phimA = a.tenPhim.toLowerCase().trim();
                let phimB = b.tenPhim.toLowerCase().trim();
                if (phimA > phimB) {
                    return 1;
                }
                return -1;
            },
            sortDirections: ['descend', 'ascend'],
            width: '20%'
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            render: (text, film) => {
                return <Fragment>
                    <p>{film.moTa.length > 50 ? film.moTa.substr(0, 50) + " ..." : film.moTa}</p>
                </Fragment>
            },
            sorter: (a, b) => {
                let phimA = a.moTa.toLowerCase().trim();
                let phimB = b.moTa.toLowerCase().trim();
                if (phimA > phimB) {
                    return 1;
                }
                return -1;
            },
            sortDirections: ['descend', 'ascend'],
            width: '25%'
        },
        {
            title: 'Chức năng',
            dataIndex: 'maPhim',
            render: (text, film, index) => {
                return <div className="flex justify-left items-center" key={index}>
                    <NavLink className="text-xl mx-5 px-4 pb-2 border-4 border-yellow-500 bg-yellow-500 text-white rounded-xl hover:text-yellow-500 hover:bg-white" to={`/admin/films/editfilm/${film.maPhim}`}><EditOutlined /></NavLink>
                    <span className="text-2xl cursor-pointer mx-5 px-4 pb-2 border-4 border-red-500 bg-red-500 text-white rounded-xl hover:text-red-500 hover:bg-white" onClick={() => {
                        //gọi action xoa
                        if (window.confirm('Bạn có chắc muốn xóa phim: "' + film.tenPhim + '"')) {
                            //gọi action
                            dispatch(xoaPhimAction(film.maPhim));
                        }
                    }}><DeleteOutlined /></span>
                    <NavLink className="text-xl mx-5 px-4 pb-2 border-4 border-green-500 bg-green-500 text-white rounded-xl hover:text-green-500 hover:bg-white" to={`/admin/films/showtimes/${film.maPhim}/${film.tenPhim}`}><DiffOutlined /></NavLink>
                </div>
            },
            sortDirections: ['descend', 'ascend'],
            width: '25%'
        },
    ];

    const data = arrFilm;

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    };

    const onSearch = value => {
        //gọi api lấy danh sách phim
        dispatch(layDanhSachPhimAction(value));
    };

    return (
        <div>
            <h3 className="text-3xl">Quản lý phim</h3>
            <div className="w-full flex justify-end">
                <button onClick={() => {
                    history.push("/admin/films/addfilm")
                }} className="w-44 text-lg border-4 border-blue-500 hover:text-blue-500 hover:bg-white rounded-xl duration-200 my-5 px-5 py-2 bg-blue-500 text-white">Thêm phim mới</button>
            </div>
            <Search
                className="mb-5"
                placeholder="Nhập tên phim muốn tìm kiếm"
                enterButton="Tìm kiếm"
                size="large"
                onSearch={onSearch}
            />
            <Table pagination={{ showSizeChanger: false }} columns={columns} dataSource={data} onChange={onChange} rowKey={"maPhim"} />
        </div>
    )
}
