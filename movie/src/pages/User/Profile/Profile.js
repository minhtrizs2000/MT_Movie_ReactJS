import React, { useEffect } from 'react';
import { CustomCard } from '@tsamantanis/react-glassmorphism';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { capNhatProfileAction, layThongTinNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { history } from '../../../App';
import { useFormik } from 'formik';
import { GROUPID, USER_LOGIN } from '../../../util/settings/config';
import * as Yup from 'yup';


function KetQuaDatVe(thongTinNguoiDung) {

    const renderTicket = () => {
        return thongTinNguoiDung?.thongTinDatVe?.map((ticket, index) => {
            return <div className="xl:w-1/3 md:w-1/2 p-4" style={{ minHeight: "300px" }} key={index}>
                <div className="border p-6 rounded-lg min-h-full" style={{ borderColor: '#18ffff' }}>
                    <div className="w-14 h-14 inline-flex items-center justify-center rounded-full mb-4" style={{ color: '#18ffff', border: "2px solid #18ffff" }}>
                        <svg className="svg-icon" viewBox="0 0 20 20">
                            <path fill="none" d="M11.174,14.993h1.647c0.228,0,0.412-0.184,0.412-0.411v-1.648c0-0.228-0.185-0.411-0.412-0.411h-1.647c-0.227,0-0.412,0.184-0.412,0.411v1.648C10.762,14.81,10.947,14.993,11.174,14.993 M3.759,13.346h4.943c0.227,0,0.412-0.184,0.412-0.412c0-0.228-0.185-0.411-0.412-0.411H3.759c-0.227,0-0.412,0.184-0.412,0.411C3.347,13.162,3.532,13.346,3.759,13.346 M3.759,14.993h3.295c0.228,0,0.412-0.184,0.412-0.411S7.282,14.17,7.055,14.17H3.759c-0.227,0-0.412,0.185-0.412,0.412S3.532,14.993,3.759,14.993 M14.881,5.932H1.7c-0.455,0-0.824,0.369-0.824,0.824v9.886c0,0.454,0.369,0.823,0.824,0.823h13.181c0.455,0,0.823-0.369,0.823-0.823V6.755C15.704,6.301,15.336,5.932,14.881,5.932M14.881,16.642H1.7v-5.767h13.181V16.642z M14.881,8.403H1.7V6.755h13.181V8.403z M18.176,2.636H4.995c-0.455,0-0.824,0.37-0.824,0.824v1.236c0,0.228,0.185,0.412,0.412,0.412c0.228,0,0.412-0.184,0.412-0.412V3.46h13.181v9.886H16.94c-0.228,0-0.412,0.185-0.412,0.412s0.185,0.412,0.412,0.412h1.235c0.455,0,0.824-0.369,0.824-0.824V3.46C19,3.006,18.631,2.636,18.176,2.636" />
                        </svg>
                    </div>
                    <hr style={{ borderTop: '2px dashed #18ffff', marginBottom: '10px' }} />
                    <div className="grid grid-cols-12">
                        <div className="col-span-8">
                            <h2 className="text-2xl font-medium title-font mb-2" style={{ color: '#18ffff' }}>{ticket.tenPhim}</h2>
                            <p className="leading-relaxed text-base text-white">{moment(ticket.ngayDat).format('D-MM-YYYY, h:mm a')}</p>
                        </div>
                        <div className="col-span-4  text-right">
                            <h1 className="text-2xl font-medium title-font mb-2" style={{ color: '#18ffff' }}>{ticket.danhSachGhe[0]?.tenCumRap}</h1>
                            <h1 className="text-white">{ticket.danhSachGhe[0]?.tenHeThongRap}</h1>
                        </div>
                        <div className="col-span-6 grid grid-cols-4 text-center">
                            {ticket.danhSachGhe?.map((ghe, index) => {
                                return <span key={index} className="text-white mx-2 text-xl">
                                    {ghe.tenGhe}
                                </span>
                            })}
                        </div>
                        <div className="col-span-6 text-white">

                        </div>
                    </div>
                </div>
            </div>
        });
    }

    return <div>
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2" style={{ color: '#18ffff' }}>YOUR BOOKING HISTORY</h1>
                    <p className="lg:w-1/2 w-full leading-relaxed text-gray-500 text-lg" style={{ borderBottom: '2px solid #18ffff' }}>Please check the location and time so you don't miss the movie. <br />Have a good time watching the movie !</p>
                </div>
                <div className="flex flex-wrap -m-4">
                    {renderTicket()}
                </div>
                <button onClick={() => {
                    history.push("/");
                }} className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">BACK TO HOME</button>
            </div>
        </section>

    </div>
}



export default function Profile(props) {
    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();
    let user = {};
    if (localStorage.getItem(USER_LOGIN)) {
        user = JSON.parse(localStorage.getItem(USER_LOGIN));
    }
    console.log(`document.cookie`, document.cookie);

    useEffect(() => {
        dispatch(layThongTinNguoiDungAction());
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinNguoiDung.taiKhoan,
            matKhau: thongTinNguoiDung.matKhau,
            email: thongTinNguoiDung.email,
            soDt: thongTinNguoiDung.soDT,
            hoTen: thongTinNguoiDung.hoTen,
            maLoaiNguoiDung: thongTinNguoiDung.maLoaiNguoiDung,
            maNhom: GROUPID,
        },
        validationSchema: Yup.object().shape({
            taiKhoan: Yup.string().required('Tài khoản không được bỏ trống!'),
            matKhau: Yup.string().required('Mật khẩu không được bỏ trống!').min(6, 'Mật khẩu tối thiểu 6 - 32 kí tự!').max(32, 'Mật khẩu tối thiểu 6 - 32 kí tự!'),
            email: Yup.string().email('Email không hợp lệ!').required('Email không được bỏ trống!'),
            soDt: Yup.string().matches(/^[0-9]+$/, 'Số điện thoại không được chứa chữ và ký tự đặc biệt!'),
            hoTen: Yup.string().required('Họ tên không được bỏ trống!')
        }),
        onSubmit: (values) => {
            if (values.taiKhoan === user.taiKhoan) {
                values.maNhom = GROUPID;
                values.maLoaiNguoiDung = 'KhachHang';
                let updateUser = values;
                dispatch(capNhatProfileAction(updateUser));
                console.log(`updateUser`, updateUser);
            }else{
                alert('Không được thay đổi tên tài khoản!');
            }
        },
    });

    const { handleChange,touched,errors } = formik;

    return (
        <div style={{ backgroundImage: `url(https://picsum.photos/id/232/1000)`, backgroundSize: "100%", backgroundPosition: "center", minHeight: "100vh" }}>
            <div style={{ minHeight: '100vh', paddingTop: 100 }}>
                <div className="mt-10 grid grid-cols-12">
                    <div className="col-span-2"></div>
                    <CustomCard className="col-span-8 grid grid-cols-12" effectColor="#000" color="#fff" blur={50} borderRadius={50}>
                        <div className="col-span-12">
                            <div className="grid grid-cols-5 h-full">
                                <img src={`https://picsum.photos/id/39/500`} className="col-span-2 rounded-r-none h-full w-full rounded-2xl" alt="hinhAnh" />
                                <div className="col-span-3">
                                    <form onSubmit={formik.handleSubmit} className="rounded-2xl rounded-l-none border-4 border-white w-full">
                                        <div className="px-5 py-2 my-3">
                                            <div className="text-lg font-bold text-white tracking-wide">Username</div>
                                            <input name="taiKhoan" disabled onChange={handleChange} value={formik.values.taiKhoan} className="w-full text-lg px-5 py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" onBlur={formik.handleBlur} placeholder="Enter your username" />
                                            {touched.taiKhoan && errors.taiKhoan && <p className="text-lg text-red-500">{formik.errors.taiKhoan}</p>}
                                        </div>
                                        <div className="px-5 py-2 my-3">
                                            <div className="text-lg font-bold text-white tracking-wide">Password</div>
                                            <input name="matKhau" onChange={handleChange} value={formik.values.matKhau} type="password" className="w-full text-black text-lg px-5 py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" onBlur={formik.handleBlur} placeholder="Enter your password" />
                                            {touched.matKhau && errors.matKhau && <p className="text-lg text-red-500">{formik.errors.matKhau}</p>}
                                        </div>
                                        <div className="px-5 py-2 my-3">
                                            <div className="text-lg font-bold text-white tracking-wide">Fullname</div>
                                            <input name="hoTen" onChange={handleChange} value={formik.values.hoTen} className="w-full text-black text-lg px-5 py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" onBlur={formik.handleBlur} placeholder="Enter your fullname" />
                                            {touched.hoTen && errors.hoTen && <p className="text-lg text-red-500">{formik.errors.hoTen}</p>}
                                        </div>
                                        <div className="px-5 py-2 my-3">
                                            <div className="text-lg font-bold text-white tracking-wide">Email</div>
                                            <input name="email" onChange={handleChange} value={formik.values.email} className="w-full text-black text-lg px-5 py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" onBlur={formik.handleBlur} placeholder="Enter your email" />
                                            {touched.email && errors.email && <p className="text-lg text-red-500">{formik.errors.email}</p>}
                                        </div>
                                        <div className="px-5 py-2 my-3">
                                            <div className="text-lg font-bold text-white tracking-wide">Phone Number</div>
                                            <input name="soDt" onChange={handleChange} value={formik.values.soDt} className="w-full text-black text-lg px-5 py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" onBlur={formik.handleBlur} placeholder="Enter your phone number" />
                                            {touched.soDt && errors.soDt && <p className="text-lg text-red-500">{formik.errors.soDt}</p>}
                                        </div>
                                        <div className="mt-6 flex justify-center items-center">
                                            <button type="submit" className="bg-purple-400 text-gray-100 p-4 w-1/4 rounded-full tracking-wide text-xl font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-purple-600 duration-500 shadow-lg">
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </CustomCard>
                </div>
                <div className="py-10 grid grid-cols-12">
                    <div className="col-span-1"></div>
                    <CustomCard className="col-span-10 grid" effectColor="#000" color="#fff" blur={50} borderRadius={50}>
                        {KetQuaDatVe(thongTinNguoiDung)}
                    </CustomCard>
                </div>
            </div>
        </div>
    )
}
