import React, { Fragment } from 'react';
import { Tabs } from 'antd';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

const { TabPane } = Tabs;

export default class Demo extends React.PureComponent {


    state = {
        tabPosition: 'left',
    };

    changeTabPosition = e => {
        this.setState({ tabPosition: e.target.value });
    };

    renderHeThongRap = () => {
        return this.props.heThongRapChieu?.map((heThongRap, index) => {
            let { tabPosition } = this.state;
            return <TabPane tab={<img alt='img' src={heThongRap.logo} className="rounded-full" width="50" />} key={index}>
                <Tabs tabPosition={tabPosition}>
                    {heThongRap.lstCumRap?.map((cumRap, index) => {
                        return <TabPane tab={
                            <div style={{ width: '300px', display: 'flex' }} >
                                <img alt="img" src="https://s3img.vcdn.vn/123phim/2018/09/ddc-dong-da-15379624326697.jpg" width="50" /> <br />
                                <div className="text-left ml-2 text-purple-400">
                                    {cumRap.tenCumRap}
                                    <p className="text-pink-400">Chi tiết</p>
                                </div>
                            </div>
                        }
                            key={index}>
                            {/*Load phim tương ứng */}
                            {cumRap.danhSachPhim.slice(1, 5).map((phim, index) => {
                                return <Fragment key={index}>
                                    <div className="my-5" >
                                        <div style={{ display: 'flex' }}>
                                            <img style={{ height: 150, width: 120 }} src={phim.hinhAnh} alt={phim.tenPhim} onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/75/75" }} />
                                            <div className="ml-6">
                                                <div className="group flex flex-wrap">
                                                    <NavLink to={`/detail/${phim.maPhim}`} className="text-4xl transition-all border-mint-blue border-dashed border-b-2 border-opacity-0 hover:border-opacity-100 duration-500" style={{color:'#18ffff',overflowWrap:'break-word'}}>{phim.tenPhim}</NavLink>
                                                </div>
                                                
                                                <div className="grid grid-cols-4 gap-6 mt-4">
                                                    {phim.lstLichChieuTheoPhim?.slice(0, 12).map((lichChieu, index) => {
                                                        return <NavLink className="text-2xl p-2 customLink border-2 rounded-lg border-purple-500 justify-center" to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                                            {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                        </NavLink>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="border-purple-500 border-t-2"/>
                                </Fragment>
                            })}
                        </TabPane>
                    })}
                </Tabs>
            </TabPane>
        })
    }

    render() {

        const { tabPosition } = this.state;
        return (
            <div className="my-20">
                <Tabs tabPosition={tabPosition}>
                    {this.renderHeThongRap()}
                </Tabs>
            </div>
        );
    }
}
