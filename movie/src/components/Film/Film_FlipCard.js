import React, { useState } from 'react';
import './Film_FlipCard.css'
import { PlayCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd';
import ReactPlayer from 'react-player';
import { NavLink } from 'react-router-dom';
import Title from 'react-vanilla-tilt'



export default function Film_FlipCard(props) {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [playVid,setPlayVid] = useState(false)



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
        <div className="filmContainer">
            <Title className="filmCard">
                <img src={film.hinhAnh} alt="...img" style={{ width: '100%', height: '100%' }} onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/300/300" }} />
                <div className="filmContent">
                    <h1 className="h-14 text-center text-white text-lg">{film.tenPhim}</h1>
                    <div className="rounded-full text-white text-center cursor-pointer opacity-60 hover:opacity-100 duration-200"><PlayCircleOutlined onClick={showModal} style={{ fontSize: '50px', color: '#fff' }} /> <br/> Trailer</div>
                    <Modal destroyOnClose={true} footer={null} className="bg-black" centered={true} width={1100} title={film.tenPhim} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <ReactPlayer width={1000} height={500} style={{ margin: 'auto' }} url={film.trailer} playing={playVid}/>
                    </Modal>
                    <button className="w-20 duration-200 rounded-md bg-gradient-to-r from-blue-400 to-pink-500 text-lg font-bold mt-7 opacity-60 hover:opacity-100">
                        <NavLink to={`/detail/${film.maPhim}`} className="text-white hover:text-white">Đặt vé</NavLink>
                    </button>
                </div>
            </Title>
        </div>

    )
}
