import React from 'react';
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { dangNhapAction } from '../../../redux/actions/QuanLyNguoiDungAction';


export default function Login(props) {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
        },
        onSubmit: values => {
            const action = dangNhapAction(values);
            dispatch(action);
        },
    })

    return (
        <div className="lg:w-1/2 xl:max-w-screen-sm">
            <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
                <div className="cursor-pointer flex items-center">
                    <div>
                        <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="Gradient" viewBox="0 0 512 512" width={512} height={512}><defs><linearGradient id="linear-gradient" x1={256} y1={496} x2={256} y2={16} gradientUnits="userSpaceOnUse"><stop offset={0} stopColor="#12c2e9" /><stop offset="0.5" stopColor="#c471ed" /><stop offset={1} stopColor="#f64f59" /></linearGradient></defs><path d="M488,112H367.672C363.258,58.378,314.858,16,256,16S148.742,58.378,144.328,112H24a8,8,0,0,0-8,8V488a8,8,0,0,0,8,8H488a8,8,0,0,0,8-8V120A8,8,0,0,0,488,112ZM152,128a8,8,0,0,0,8-8c0-48.523,43.065-88,96-88s96,39.477,96,88a8,8,0,0,0,8,8H480v16H360a8,8,0,0,0-8,8V416H336V368a8,8,0,0,0-16,0c0,8.673-10.991,16-24,16-15.45,0-32-9.391-32-16a8,8,0,0,0-16,0c0,6.609-16.55,16-32,16-13.009,0-24-7.327-24-16a8,8,0,0,0-16,0v48H160V152a8,8,0,0,0-8-8H32V128ZM480,416H464V392a8,8,0,0,0-8-8V192a8,8,0,0,0,8-8V160h16ZM88,192V384H72V192Zm16,192V192a8,8,0,0,0,8-8V160h32V416H112V392A8,8,0,0,0,104,384ZM96,176H64V160H96ZM56,192V384a8,8,0,0,0-8,8v24H32V160H48v24A8,8,0,0,0,56,192Zm8,208H96v16H64Zm48,32H400v16H112Zm80-38.417A46.648,46.648,0,0,0,216,400a65.616,65.616,0,0,0,30.523-8.042c.507-.282.991-.574,1.477-.866V416H192ZM320,416H264V391.092c.486.292.97.584,1.477.866A65.616,65.616,0,0,0,296,400a46.648,46.648,0,0,0,24-6.417Zm104-32V192h16V384Zm24-208H416V160h32Zm-40,16V384a8,8,0,0,0-8,8v24H368V160h32v24A8,8,0,0,0,408,192Zm8,208h32v16H416ZM96,480H32V432H96Zm16,0V464H400v16Zm368,0H416V432h64ZM192,311.545A72.123,72.123,0,0,0,255.545,248h.91A72.123,72.123,0,0,0,320,311.545V328h16V120c0-39.7-35.888-72-80-72s-80,32.3-80,72V328h16Zm0-16.126V248h47.419A56.112,56.112,0,0,1,192,295.419ZM272.581,248H320v47.419A56.112,56.112,0,0,1,272.581,248ZM256,64c35.29,0,64,25.122,64,56V232H192V120C192,89.122,220.71,64,256,64Zm0,96a40,40,0,1,0-40-40A40.045,40.045,0,0,0,256,160Zm0-64a24,24,0,1,1-24,24A24.028,24.028,0,0,1,256,96ZM184,360a8,8,0,1,1,8-8A8,8,0,0,1,184,360Zm144,0a8,8,0,1,1,8-8A8,8,0,0,1,328,360Zm-72,0a8,8,0,1,1,8-8A8,8,0,0,1,256,360Z" style={{ fill: 'url(#linear-gradient)' }} /></svg>
                    </div>
                    <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">Movie</div>
                </div>
            </div>
            <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                <h2 className="text-center text-4xl text-purple-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold">Log in</h2>
                <div className="mt-12">
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <div className="text-sm font-bold text-gray-700 tracking-wide">Username</div>
                            <input name="taiKhoan" onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Enter your username" />
                        </div>
                        <div className="mt-8">
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">
                                    Password
                                </div>
                                <div>
                                    <a className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                  cursor-pointer">
                                        Forgot Password?
                                    </a>
                                </div>
                            </div>
                            <input name="matKhau" onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" placeholder="Enter your password" />
                        </div>
                        <div className="mt-10">
                            <button type="submit" className="bg-purple-400 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-purple-600 duration-500
                          shadow-lg">
                                Log In
                            </button>
                        </div>
                    </form>
                    <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                        Don't have an account ? <NavLink to="/register" className="cursor-pointer text-indigo-600 hover:text-indigo-800">Sign up</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
