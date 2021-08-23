import React, { useEffect } from 'react';
import { CustomCard } from '@tsamantanis/react-glassmorphism';
import "../../../assets/styles/circle.css";
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinChiTietPhim } from '../../../redux/actions/QuanLyRapAction';
import moment from 'moment';
import 'moment/locale/vi';
import { Rate } from 'antd';
import { NavLink } from 'react-router-dom';
//hook dịch đa ngôn ngữ
import { useTranslation } from 'react-i18next';
import style from '../Home/HomeMenu/HomeMenu.module.css'

export default function Detail(props) {
    const { TabPane } = Tabs;
    const dispatch = useDispatch();
    //lấy thông tin chi tiết phim từ reducer
    const detailFilm = useSelector(state => state.QuanLyPhimReducer.detailFilm)
    //khai báo biến để sd đa ngôn ngữ
    let { t, i18n } = useTranslation();

    //chạy mặc định sau khi render xong giao diện
    useEffect(() => {
        //Lấy id phim từ param url
        let { id } = props.match.params;
        //gửi dispatch lên action call api cập nhật thông tin phim trên store reducer
        dispatch(layThongTinChiTietPhim(id));
    }, []);

    return (
        <div style={{ backgroundImage: `url(${detailFilm.hinhAnh})`, backgroundSize: "100%", backgroundPosition: "center", minHeight: "100vh" }}>
            <div style={{ minHeight: '100vh', paddingTop: 100 }}>
                <div className="mt-10 grid grid-cols-12">
                    <div className="col-span-2"></div>
                    <CustomCard className="col-span-8 grid grid-cols-12" effectColor="#000" color="#fff" blur={50} borderRadius={50}>
                        <div className="col-span-8">
                            <div className="grid grid-cols-5 h-full">
                                <img src={`${detailFilm.hinhAnh}`} className="col-span-2 w-full h-full rounded-2xl" alt="hinhAnh" />
                                <div className="col-span-3 ml-5" style={{ marginTop: "10%" }}>
                                    <p className="text-sm">{t('Release date')}: {moment(detailFilm.ngayKhoiChieu).format('DD-MM-YYY')}</p>
                                    <p className="text-4xl">{detailFilm.tenPhim}</p>
                                    <p>{detailFilm.moTa}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 duration-500 hover:opacity-100 opacity-70 flex flex-col justify-center items-center">
                            <p className="text-purple-400 text-3xl text-center">{t('Rating')}</p>
                            <p className="text-center  "> <Rate style={{ color: '#a78bfa' }} allowHalf disabled value={detailFilm.danhGia / 2} /></p>
                            <div style={{ margin: '0' }} className={`c100 p${detailFilm.danhGia * 10} big purple`}>
                                <span>{detailFilm.danhGia * 10}%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                    </CustomCard>
                </div>
                <div className="py-10 grid grid-cols-12">
                    <div className="col-span-1"></div>
                    <CustomCard className="col-span-10 grid" effectColor="#000" color="#fff" blur={50} borderRadius={50}>
                        <Tabs tabPosition={"left"}>
                            {detailFilm.heThongRapChieu?.map((heThongRap, index) => {
                                return <TabPane style={{paddingLeft:'0px'}} tab={<img src={heThongRap.logo} className="rounded-full" width="50" />} key={index}>
                                    <Tabs tabPosition={"left"}>
                                        {heThongRap.cumRapChieu?.map((cumRap, index) => {
                                            return <TabPane tab={
                                                <div className="flex">
                                                    <img className={style.hinhCumRapTabs} alt="img" src="https://s3img.vcdn.vn/123phim/2018/09/ddc-dong-da-15379624326697.jpg" width="50" /> <br />
                                                    <div className={style.tenCumRapTabs} className="text-left ml-2 text-purple-400">
                                                        {cumRap.tenCumRap.slice(0, cumRap.tenCumRap.indexOf('-'))}
                                                        <br />
                                                        {cumRap.tenCumRap.slice(cumRap.tenCumRap.indexOf('-') + 2)}
                                                    </div>
                                                </div>
                                            }
                                                key={index}>
                                                {/*Load phim tương ứng */}
                                                <div className="flex md:flex-col lg:flex-row justify-start mt-4 flex-wrap" >
                                                    {cumRap.lichChieuPhim?.slice(0, 4).map((lichChieu, index) => {
                                                        return <NavLink key={index} style={{ border: '2px solid rgb(139,92,246)' }} className="customLink text-2xl m-4 p-2 w-40 rounded-lg justify-center" to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                                            {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                        </NavLink>
                                                    })}
                                                </div>
                                            </TabPane>
                                        })}
                                    </Tabs>
                                </TabPane>
                            })}
                        </Tabs>
                    </CustomCard>
                </div>
            </div>
        </div>
    )
}
