import React, { Fragment, useEffect } from 'react'
import Logo from '../../../components/Logo/Logo'
import { CustomCard } from '@tsamantanis/react-glassmorphism';
import { useDispatch, useSelector } from 'react-redux';
import { datGheAction, datVeAction, layChiTietPhongVeAction } from '../../../redux/actions/QuanLyDatVeAction';
import './Checkout.css';
import { CLEAR_DAT_VE, DAT_GHE, DAT_GHE_REAL_TIME } from '../../../redux/types/QuanLyDatVeType';
import _ from 'lodash';
import { ThongTinDatVe } from '../../../_core/models/ThongTinDatVe';
import moment from 'moment';
import 'moment/locale/vi';
import { layThongTinNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { history } from '../../../App';
import { connection } from '../../../index';
import { ACCESSTOKEN, USER_LOGIN } from '../../../util/settings/config';
import { Tabs } from 'antd';
//hook dịch đa ngôn ngữ
import { useTranslation } from 'react-i18next';

const { TabPane } = Tabs;

function Checkout(props) {
    //khai báo biến để sd đa ngôn ngữ
    let { t, i18n } = useTranslation();

    const dispatch = useDispatch();
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDangDat } = useSelector(state => state.QuanLyDatVeReducer);
    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;


    //chạy mặc định sau khi render xong giao diện
    useEffect(() => {
        //dispatch action lên redux lấy chi tiết phòng vé render ghế ra giao diện
        dispatch(layChiTietPhongVeAction(props.match.params.id));

        //tự load lại ds ghế khi người khác thực hiện việc đặt vé thành công
        connection.on('datVeThanhCong', () => {
            dispatch(layChiTietPhongVeAction(props.match.params.id));
        });

        //vừa vào trang load tất cả ghế của các người khác đang thực hiện đặt
        connection.invoke('loadDanhSachGhe', props.match.params.id);

        //lấy danh sách ghế khách hàng đang đặt từ server về (lắng nghe tín hiệu từ server trả về)
        connection.on("loadDanhSachGheDaDat", (dsGheKhachDangDat) => {

            //B1: loại mình ra khỏi danh sách khách đang đặt
            dsGheKhachDangDat = dsGheKhachDangDat.filter(item => item.taiKhoan !== userLogin.taiKhoan);
            //B2: gộp tất cả ghế của tất cả user thành 1 mảng chung
            let arrGheKhachDangDat = dsGheKhachDangDat.reduce((result, item, index) => {
                let arrGhe = JSON.parse(item.danhSachGhe);
                return [...result, ...arrGhe];
            }, []);

            //Đưa dữ liệu ghế khách đang đặt cập nhật lên redux
            arrGheKhachDangDat = _.uniqBy(arrGheKhachDangDat, 'maGhe');

            //đưa dữ liệu về redux
            dispatch({
                type: DAT_GHE_REAL_TIME,
                arrGheKhachDangDat
            });

            //cài đặt sự kiện thi reload trang
            window.addEventListener("beforeunload", clearGheReload);

            return () => {
                clearGheReload();
                window.removeEventListener("beforeunload", clearGheReload);
            };
        });
    }, []);

    //hàm tự động clear ghế khi reload page
    const clearGheReload = function (event) {
        connection.invoke('huyDat', userLogin.taiKhoan, props.match.params.id);
    };

    //hàm render giao diện ghế ngồi
    const renderSeats = () => {
        return danhSachGhe?.map((ghe, index) => {

            //tạo các class ứng với các css cho các loại ghế
            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
            let classGheDangDat = '';
            let classGheMinhDat = '';
            let classGheKhachDangDat = '';

            //xét ghế nào của mình, add css
            if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                classGheMinhDat = 'gheMinhDat';
            };

            //xét ghế nào mình đang click chọn, add css
            let indexGheDangDat = danhSachGheDangDat?.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);
            if (indexGheDangDat !== -1) {
                classGheDangDat = 'gheDangDat';
            }

            //xét ghế nào khách đang click chọn, add css
            let indexGheKhachDangDat = danhSachGheKhachDangDat?.findIndex(gheKDD => gheKDD.maGhe === ghe.maGhe);
            if (indexGheKhachDangDat !== -1) {
                classGheKhachDangDat = 'gheKhachDangDat';
            }

            return <Fragment key={index}>
                {/* 
                    _xét ghế đó đã đặt hoặc ghế người khác đang chọn thì disabled
                    _click vào thì dispatch action datGhe thêm ghế vào danh sách ghế mình đang đặt
                */}
                <button disabled={ghe.daDat || classGheKhachDangDat !== ''} onClick={() => {
                    const action = datGheAction(ghe, props.match.params.id)
                    dispatch(action);
                }} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheMinhDat} ${classGheKhachDangDat}`}>
                    {/* 
                        _xét ghế đã đặt hay chưa: 
                            +nếu rồi thì xét có phải của mình k, phải thì hiển thị 'O', không thì hiển thin 'X'
                            +nếu chưa thì xét có ai đang đặt ghế đó không nếu có thì hiển thị 'O', không thì hiển thị stt ghế
                            +các ghế đều được add class css tương ứng
                    */}
                    {ghe.daDat ? userLogin.taiKhoan === ghe.taiKhoanNguoiDat ? 'O' : 'X' : classGheKhachDangDat !== '' ? 'O' : ghe.stt}
                </button>
                {(index + 1) % 16 === 0 ? <br /> : ''}
            </Fragment>
        });
    };

    return (
        <div className="bg-black">
            <div className="grid grid-cols-12">
                <div className="col-span-9 relative flex flex-col items-center">
                    <div className="w-full">
                        <img alt="img" src="https://tix.vn/app/assets/img/icons/screen.png" style={{ width: '80%', margin: '5px auto', height: '100px' }} />
                    </div>
                    <button onClick={() => {
                        // clear danh sách ghế khi thoát ra hoặc reload page
                        clearGheReload();
                        history.push('/');
                    }} className="absolute bg-purple-500 top-10 left-0 text-base text-white rounded-full p-2 hover:bg-purple-900 duration-500">{t('BACK TO HOME')}</button>
                    <div className="">
                        {renderSeats()}
                    </div>
                    <div className="w-2/3 mx-auto mt-10 flex justify-around items-center">
                        <div>
                            <button className="ghe gheThuong">00</button>
                            <span className="text-white">{t('Regular seat')}</span>
                        </div>
                        <div>
                            <button className="ghe gheVip">00</button>
                            <span className="text-white">{t('VIP seat')}</span>
                        </div>

                        <div>
                            <button className="ghe gheDaDat">X</button>
                            <span className="text-white">{t('VIP seat')}</span>
                        </div>
                        <div>
                            <button className="ghe gheKhachDangDat">O</button>
                            <span className="text-white">{t('S.O is booking')}</span>
                        </div>
                        <div>
                            <button className="ghe gheMinhDat">O</button>
                            <span className="text-white">{t('Your booked seat')}</span>
                        </div>
                        <div>
                            <button className="ghe gheDangDat">00</button>
                            <span className="text-white">{t('Your booking seat')}</span>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 z-20">
                    <div className="flex justify-center">
                        <Logo onClick={() => {
                            // clear danh sách ghế khi thoát ra hoặc reload page
                            clearGheReload();
                            history.push('/');
                        }} />
                    </div>
                    <CustomCard className="text-white" effectColor="#a78bfa" color="#fff" blur={50} borderRadius={50}>
                        <h1 className="text-4xl text-center text-purple-300">{danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                            return tongTien += ghe.giaVe;
                        }, 0).toLocaleString()} VND</h1>
                        <hr />
                        <p className="text-3xl pt-5">{thongTinPhim.tenPhim}</p>
                        <div className="grid grid-cols-3">
                            <div className="col-span-1">
                                <p className="text-lg">{t('Location')}:</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-lg">{thongTinPhim.diaChi} - {thongTinPhim.tenRap}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3">
                            <div className="col-span-1">
                                <p className="text-lg">{t('Date')}:</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-lg">{thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="grid grid-cols-3 py-5">
                            <div className="col-span-1">
                                <p className="text-lg my-2">{t('SEATS')}: </p>
                            </div>
                            <div className="col-span-2">
                                {
                                    // dùng lodash sắp xếp ds ghế đang đặt theo stt
                                    _.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                                        return <div key={index} className="text-xl my-2 text-right flex justify-between" style={{ color: '#18ffff' }}>
                                            <span>{gheDD.stt}</span>
                                            <span>{gheDD.giaVe.toLocaleString()} VND</span>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <hr />
                        <div className="mt-5 text-lg">
                            <i>{t('EMAIL')}</i>
                            <p className="ml-5">{userLogin.email}</p>
                            <i>{t('PHONE')}</i>
                            <p className="ml-5">{userLogin.soDT ? userLogin.soDT : 'xxxxxxxxxx'}</p>
                        </div>
                        <div className="flex justify-center items-center mt-10">
                            <button onClick={() => {
                                const thongTinDatVe = new ThongTinDatVe();
                                thongTinDatVe.maLichChieu = props.match.params.id;
                                thongTinDatVe.danhSachVe = danhSachGheDangDat;

                                dispatch(datVeAction(thongTinDatVe));
                            }} className="bg-purple-500 duration-500 px-10 py-5 rounded-full shadow-inner transform hover:scale-110 hover:bg-purple-700">{t('CHECK OUT')}</button>
                        </div>
                    </CustomCard>

                </div>
            </div>
        </div>
    )
}

function KetQuaDatVe(props) {
    //khai báo biến để sd đa ngôn ngữ
    let { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    useEffect(() => {
        const action = layThongTinNguoiDungAction();
        dispatch(action)
    }, []);

    const renderTicket = () => {
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
            return <div className="xl:w-1/3 md:w-1/2 p-4" style={{ minHeight: "300px" }} key={index}>
                <div className="border p-6 rounded-lg min-h-full" style={{ borderColor: '#18ffff' }}>
                    <div className="w-14 h-14 inline-flex items-center justify-center rounded-full bg-black mb-4" style={{ color: '#18ffff', border: "2px solid #18ffff" }}>
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
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2" style={{ color: '#18ffff' }}>{t('YOUR BOOKING HISTORY')}</h1>
                    <p className="lg:w-1/2 w-full leading-relaxed text-gray-500 text-lg" style={{ borderBottom: '2px solid #18ffff' }}>{t('booking history message')}</p>
                </div>
                <div className="flex flex-wrap -m-4">

                    {renderTicket()}

                </div>
                <button onClick={() => {
                    history.push("/");
                }} className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">{t('BACK TO HOME')}</button>
            </div>
        </section>

    </div>
}

export default function CheckoutTab(props) {

    //khai báo biến để sd đa ngôn ngữ
    let { t, i18n } = useTranslation();

    const dispatch = useDispatch();

    const { tabActive, danhSachGheDangDat } = useSelector(state => state.QuanLyDatVeReducer);

    useEffect(() => {
        dispatch({ type: CLEAR_DAT_VE });
    }, []);

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const operations = <Fragment>
        {!_.isEmpty(userLogin) ? <Fragment>
            <button
                onClick={() => {
                    history.push('/profile');
                }} className="duration-500 text-white mr-10 text-xl hover:text-purple-500 group">
                {t('Hello')}! {userLogin.taiKhoan}
            </button> <button onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(ACCESSTOKEN);
                history.push('/');
                window.location.reload();
            }} className="duration-500 text-white mr-10 text-xl hover:text-purple-500 ">{t('Logout')}</button>
        </Fragment> : ''}
    </Fragment>;



    return <div className="bg-black  min-h-screen">
        <Tabs tabBarExtraContent={operations} defaultActiveKey='1' activeKey={tabActive}>
            <TabPane tab={<span className="text-4xl text-purple-500 mx-10">01.{t('SELECT SEATS')} &amp; {t('PAYMENT')}</span>} key="1">
                <Checkout {...props} />
            </TabPane>
            <TabPane tab={<span className="text-4xl text-purple-500 mx-10">02.{t('BOOKING RESULT')}</span>} key="2">
                <KetQuaDatVe {...props} />
            </TabPane>
        </Tabs>
    </div>
}