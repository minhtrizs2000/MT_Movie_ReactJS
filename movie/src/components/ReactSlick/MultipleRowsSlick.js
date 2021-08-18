import React, { Component } from "react";
import Slider from "react-slick";
import Film_FlipCard from "../Film/Film_FlipCard";
import styleSlick from './MultipleRowsSlick.module.css';
import { Tabs } from 'antd';
import './Tabs.css';
//hook dịch đa ngôn ngữ
import { useTranslation } from 'react-i18next';


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-next']}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
        </div>

    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}

            style={{ ...style, display: "block", left: '-50px' }}
            onClick={onClick}
        >
        </div>
    );
}

export default function MultipleRowSlick(props) {
    
    //Đa ngôn ngữ
    const { t, i18n } = useTranslation();

    const { TabPane } = Tabs;

    const renderFilms = (arrFilm) => {
        return arrFilm?.slice(0, 16).map((film, index) => {
            return <div className="mt-2" key={index}  >
                <Film_FlipCard film={film} />
            </div>
        })
    };

    const settings = {
        className: "center variable-width",
        centerMode: true,
        infinite: true,
        centerPadding: "0px",
        slidesToShow: 2,
        speed: 500,
        rows: 2,
        slidesPerRow: 2,
        variableWidth: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className="container">
            <Tabs defaultActiveKey="1" style={{overflow:'unset'}}>
                <TabPane tab={<button className={`w-52 h-14 mx-10 my-1 rounded-md bg-gradient-to-r from-blue-400 to-pink-500 text-lg text-black font-bold`}>{t('Now Showing')}</button>} key="1">
                    <Slider {...settings}>
                        {renderFilms(props.arrFilmDangChieu)}
                    </Slider>
                </TabPane>
                <TabPane tab={<button className={`w-52 h-14 mx-10 my-1 rounded-md bg-gradient-to-r from-blue-400 to-pink-500 text-lg text-black font-bold`}>{t('Coming soon')}</button>} key="2">
                    <Slider {...settings}>
                        {renderFilms(props.arrFilmSapChieu)}
                    </Slider>
                </TabPane>
            </Tabs>
        </div>
    );
}




