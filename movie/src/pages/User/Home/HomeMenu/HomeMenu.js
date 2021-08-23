import React, { Fragment } from 'react';
import { Tabs } from 'antd';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import style from './HomeMenu.module.css'

const { TabPane } = Tabs;

//giao diện lịch chiếu trong home page
export default class Demo extends React.PureComponent {

    imgHeight = ()=>{
        if(window.innerWidth<=1024){
            return '100px'
        }else{
            return '200px'
        }
    }

    renderHeThongRap = () => {
        return this.props.heThongRapChieu?.map((heThongRap, index) => {
            return <TabPane style={{paddingLeft:'0px'}} tab={<img alt='img' src={heThongRap.logo} className="rounded-full" width="50" />} key={index}>
                <Tabs tabPosition={'left'}>
                    {heThongRap.lstCumRap?.map((cumRap, index) => {
                        return <TabPane tab={
                            <div className="flex">
                                <img className={style.hinhCumRapTabs} alt="img" src="https://s3img.vcdn.vn/123phim/2018/09/ddc-dong-da-15379624326697.jpg" width="50" /> <br />
                                <div className={style.tenCumRapTabs} className="text-left ml-2 text-purple-400">
                                    {cumRap.tenCumRap.slice(0,cumRap.tenCumRap.indexOf('-'))}
                                    <br/>
                                    {cumRap.tenCumRap.slice(cumRap.tenCumRap.indexOf('-')+2)}
                                </div>
                            </div>
                        }
                            key={index}>
                            {/*Load phim tương ứng */}
                            {cumRap.danhSachPhim.slice(1, 5).map((phim, index) => {
                                return <Fragment key={index}>
                                    <div className="my-5" >
                                        <div className="grid grid-cols-12">
                                            <div className="col-span-2" style={{backgroundImage:`url(${phim.hinhAnh})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',height:`${this.imgHeight()}`}}>
                                                {/* <img className="w-full h-full" src={phim.hinhAnh} alt={phim.tenPhim} onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/75/75" }} /> */}
                                            </div>
                                            <div className="ml-6 col-span-10">
                                                <div className="group flex flex-wrap">
                                                    <NavLink to={`/detail/${phim.maPhim}`} className="text-4xl transition-all border-mint-blue border-dashed border-b-2 border-opacity-0 hover:border-opacity-100 duration-500" style={{ color: '#18ffff', overflowWrap: 'break-word' }}>{phim.tenPhim}</NavLink>
                                                </div>
                                                <div className="flex md:flex-col lg:flex-row justify-start mt-4 flex-wrap">
                                                    {phim.lstLichChieuTheoPhim?.slice(0, 12).map((lichChieu, index) => {
                                                        return <NavLink style={{border:'2px solid rgb(139,92,246)'}} className="customLink text-2xl m-4 p-2 w-40 rounded-lg justify-center" to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                                            {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                        </NavLink>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="border-purple-500 border-t-2" />
                                </Fragment>
                            })}
                        </TabPane>
                    })}
                </Tabs>
            </TabPane>
        })
    }

    render() {
        return (
            <div className="py-20">
                <Tabs tabPosition={'left'} style={{paddingLeft:0}}>
                    {this.renderHeThongRap()}
                </Tabs>
            </div>
        );
    }
}
