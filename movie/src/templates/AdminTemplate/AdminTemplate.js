import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { history } from '../../App';
import { ACCESSTOKEN, USER_LOGIN } from '../../util/settings/config';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import _ from "lodash";


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


export default function AdminTemplate(props) {
    const { Component, ...restProps } = props;
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        // console.log(collapsed);
        setCollapsed(collapsed);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    if (!localStorage.getItem(USER_LOGIN)) {
        alert('Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />
    };

    if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
        alert('Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />
    };

    const operations = <Fragment>
        {!_.isEmpty(userLogin) ? <Fragment>
            <button
                onClick={() => {
                    history.push('/profile');
                }} className="duration-500 text-white mr-10 text-2xl hover:text-purple-500 group">
                Hello! {userLogin.taiKhoan}
                <div className="border-2 border-dashed border-white group-hover:border-purple-500 rounded-full inline-block ml-4 w-10 h-10">{userLogin.taiKhoan.substr(0, 1)}</div>
            </button>
            <button onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(ACCESSTOKEN);
                history.push('/');
                window.location.reload();
            }} className="duration-500 text-white mr-10 text-2xl hover:text-purple-500 border-2 border-white hover:border-purple-500 px-2 py-2 rounded-lg">Logout</button>
        </Fragment> : ''}
    </Fragment>;


    return <Route {...restProps} render={(propsRoute) => { //props.location,props.history,props.match

        return <Fragment>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="flex justify-center items-center">
                        <svg className="w-16 h-16" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="Gradient" viewBox="0 0 512 512" width={512} height={512}><defs><linearGradient id="linear-gradient" x1={256} y1={496} x2={256} y2={16} gradientUnits="userSpaceOnUse"><stop offset={0} stopColor="#12c2e9" /><stop offset="0.5" stopColor="#c471ed" /><stop offset={1} stopColor="#f64f59" /></linearGradient></defs><path d="M488,112H367.672C363.258,58.378,314.858,16,256,16S148.742,58.378,144.328,112H24a8,8,0,0,0-8,8V488a8,8,0,0,0,8,8H488a8,8,0,0,0,8-8V120A8,8,0,0,0,488,112ZM152,128a8,8,0,0,0,8-8c0-48.523,43.065-88,96-88s96,39.477,96,88a8,8,0,0,0,8,8H480v16H360a8,8,0,0,0-8,8V416H336V368a8,8,0,0,0-16,0c0,8.673-10.991,16-24,16-15.45,0-32-9.391-32-16a8,8,0,0,0-16,0c0,6.609-16.55,16-32,16-13.009,0-24-7.327-24-16a8,8,0,0,0-16,0v48H160V152a8,8,0,0,0-8-8H32V128ZM480,416H464V392a8,8,0,0,0-8-8V192a8,8,0,0,0,8-8V160h16ZM88,192V384H72V192Zm16,192V192a8,8,0,0,0,8-8V160h32V416H112V392A8,8,0,0,0,104,384ZM96,176H64V160H96ZM56,192V384a8,8,0,0,0-8,8v24H32V160H48v24A8,8,0,0,0,56,192Zm8,208H96v16H64Zm48,32H400v16H112Zm80-38.417A46.648,46.648,0,0,0,216,400a65.616,65.616,0,0,0,30.523-8.042c.507-.282.991-.574,1.477-.866V416H192ZM320,416H264V391.092c.486.292.97.584,1.477.866A65.616,65.616,0,0,0,296,400a46.648,46.648,0,0,0,24-6.417Zm104-32V192h16V384Zm24-208H416V160h32Zm-40,16V384a8,8,0,0,0-8,8v24H368V160h32v24A8,8,0,0,0,408,192Zm8,208h32v16H416ZM96,480H32V432H96Zm16,0V464H400v16Zm368,0H416V432h64ZM192,311.545A72.123,72.123,0,0,0,255.545,248h.91A72.123,72.123,0,0,0,320,311.545V328h16V120c0-39.7-35.888-72-80-72s-80,32.3-80,72V328h16Zm0-16.126V248h47.419A56.112,56.112,0,0,1,192,295.419ZM272.581,248H320v47.419A56.112,56.112,0,0,1,272.581,248ZM256,64c35.29,0,64,25.122,64,56V232H192V120C192,89.122,220.71,64,256,64Zm0,96a40,40,0,1,0-40-40A40.045,40.045,0,0,0,256,160Zm0-64a24,24,0,1,1-24,24A24.028,24.028,0,0,1,256,96ZM184,360a8,8,0,1,1,8-8A8,8,0,0,1,184,360Zm144,0a8,8,0,1,1,8-8A8,8,0,0,1,328,360Zm-72,0a8,8,0,1,1,8-8A8,8,0,0,1,256,360Z" style={{ fill: 'url(#linear-gradient)' }} /></svg>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <NavLink to="/admin/users">Quản lý người dùng</NavLink>
                        </Menu.Item>
                        <SubMenu key="2" icon={<FileOutlined />} title="Quản lý phim">
                            <Menu.Item key="10" icon={<FileOutlined />}>
                                <NavLink to="/admin/films">Danh sách phim</NavLink>
                            </Menu.Item>
                            <Menu.Item key="11" icon={<FileOutlined />}>
                                <NavLink to="/admin/films/addfilm">Thêm phim mới</NavLink>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} >
                        <div className="text-right pr-10 pt-1">{operations}</div>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: '85vh' }}>
                            <Component {...propsRoute} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}></Footer>
                </Layout>
            </Layout>
        </Fragment>
    }} />

}
