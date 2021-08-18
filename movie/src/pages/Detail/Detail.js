import React, { useEffect } from 'react';
import { CustomCard } from '@tsamantanis/react-glassmorphism';
import "../../assets/styles/circle.css";
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapAction';
import moment from 'moment';
import 'moment/locale/vi';
import { Rate } from 'antd';
import { NavLink } from 'react-router-dom';


export default function Detail(props) {
    const { TabPane } = Tabs;

    const detailFilm = useSelector(state => state.QuanLyPhimReducer.detailFilm)
    const dispatch = useDispatch();

    console.log({ detailFilm });

    useEffect(() => {
        //Lấy thông tin param từ url
        let { id } = props.match.params;

        dispatch(layThongTinChiTietPhim(id));

    }, []);

    return (
        <div style={{ backgroundImage: `url(${detailFilm.hinhAnh})`, backgroundSize: "100%", backgroundPosition: "center", minHeight: "100vh" }}>
            <div style={{ minHeight: '100vh', paddingTop: 100 }}>
                <div className="mt-10 grid grid-cols-12">
                    <div className="col-span-2"></div>
                    <CustomCard className="col-span-8 grid grid-cols-12" effectColor="#000" color="#fff" blur={50} borderRadius={50}>
                        <div className="col-span-8">
                            <div className="grid grid-cols-5">
                                <img src={`${detailFilm.hinhAnh}`} className="col-span-2 w-full h-96 rounded-2xl" alt="hinhAnh" />
                                <div className="col-span-3 ml-5" style={{ marginTop: "10%" }}>
                                    <p className="text-sm">Ngày khởi chiếu: {moment(detailFilm.ngayKhoiChieu).format('DD-MM-YYY')}</p>
                                    <p className="text-4xl">{detailFilm.tenPhim}</p>
                                    <p>{detailFilm.moTa}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 duration-500 hover:opacity-100 opacity-70 flex flex-col justify-center items-center">
                            <p className="text-purple-400 text-3xl text-center">Đánh giá</p>
                            <p className="text-center  "> <Rate style={{ color: '#a78bfa' }} allowHalf disabled value={detailFilm.danhGia / 2} /></p>
                            <div style={{ marginLeft: '15%' }} className={`c100 p${detailFilm.danhGia * 10} big purple`}>
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
                                return <TabPane tab={<img src={heThongRap.logo} className="rounded-full" width="50" />} key={index}>
                                    <Tabs tabPosition={"left"}>
                                        {heThongRap.cumRapChieu?.map((cumRap, index) => {
                                            return <TabPane tab={
                                                <div style={{ width: '300px', display: 'flex' }} >
                                                    <img src="https://s3img.vcdn.vn/123phim/2018/09/ddc-dong-da-15379624326697.jpg" width="50" /> <br />
                                                    <div className="text-left ml-2 text-white">
                                                        {cumRap.tenCumRap}
                                                        <p className="text-pink-400">Chi tiết</p>
                                                    </div>
                                                </div>
                                            }
                                                key={index}>
                                                {/*Load phim tương ứng */}
                                                <div className="grid grid-cols-4 gap-6" >
                                                    {cumRap.lichChieuPhim?.slice(0, 4).map((lichChieu, index) => {
                                                        return <NavLink key={index} className="text-2xl font-bold p-2 customLink border-2 rounded-lg border-purple-500 flex justify-center" to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
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
