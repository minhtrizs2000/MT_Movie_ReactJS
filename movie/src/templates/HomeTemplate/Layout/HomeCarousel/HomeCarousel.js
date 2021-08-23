import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCarouselAction } from '../../../../redux/actions/CarouselAction';
import './HomeCarousel.css';

export default function HomeCarousel(props) {

    const { arrBanner } = useSelector(state => state.CarouselReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        try {
            //truyền vào:
            //  1 là action = {type,data}
            //  2 là callBackFunction = (dispatch) // 2 cái dispatch trong ngoài khác nhau và phải cài middleWare
            dispatch(getCarouselAction());

        } catch (error) {
            console.log("error: ", error);
        }
    }, []);


    const contentStyle = {
        height: '700px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    const renderBanner = () => {
        return arrBanner.map((item, index) => {
            return <div key={index}>
                <div style={{ ...contentStyle }}>
                    <img src={item.hinhAnh} className="h-full w-full" alt="carousel_Img" />
                </div>
            </div>
        });
    };

    return (
        <Carousel effect="fade" >
            {renderBanner()}
        </Carousel>
    );
};
