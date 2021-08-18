import React, { useState } from 'react';
import './Film_FlipCard.css'
import { PlayCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd';
import ReactPlayer from 'react-player';
import { NavLink } from 'react-router-dom';



export default function Film_FlipCard(props) {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const { film } = props;

    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src={film.hinhAnh} alt="Avatar" style={{ width: '300px', height: '300px' }} onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/300/300" }} />
                </div>
                <div className="flip-card-back" style={{ position: 'relative', backgroundColor: 'rgba(0,0,0,.9)' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0 }}>
                        <img src={film.hinhAnh} alt="Avatar" style={{ width: '300px', height: '300px' }} onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/300/300" }} />
                    </div>
                    <div className="w-full  h-full" style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,.6)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                            <div className="rounded-full cursor-pointer"><PlayCircleOutlined onClick={showModal} style={{ fontSize: '50px' }} /></div>
                            <Modal footer={null} className="bg-black" centered={true} width={1100} title={film.tenPhim} visible={isModalVisible}  onOk={handleOk} onCancel={handleCancel}>
                                <ReactPlayer width={1000} height={500} style={{margin:'auto'}} url={film.trailer}/> 
                            </Modal>
                            <div className="text-2xl mt-2 font-bold">{film.tenPhim}</div>

                            <button className="w-28 py-2 rounded-md bg-gradient-to-r from-blue-400 to-pink-500 text-lg text-black font-bold mt-20">
                                <NavLink style={{padding:"10px 25px"}} to={`/detail/${film.maPhim}`} className="text-black h-full hover:text-white">Đặt vé</NavLink>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
