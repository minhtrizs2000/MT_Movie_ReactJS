import React, { useEffect } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'
import style from './HomeMenu/HomeMenu.module.css'
//connect redux
import { useSelector, useDispatch } from 'react-redux';

//Slick
import MultipleRowsSlick from '../../../components/ReactSlick/MultipleRowsSlick';
import { layDanhSachPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import HomeCarousel from '../../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel';
import { layDanhSachHeThongRapAction } from '../../../redux/actions/QuanLyRapAction';
import ScrollToTop from '../../../components/ScrollToTop/ScrollToTop';

export default function Home(props) {

    const { arrFilm, arrFilmDangChieu, arrFilmSapChieu } = useSelector(state => state.QuanLyPhimReducer);
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
    const dispatch = useDispatch();

    //chạy mặc định sau khi render xong giao diện
    useEffect(() => {
        //lay ds phim
        dispatch(layDanhSachPhimAction());
        //lay ds he thong rap
        dispatch(layDanhSachHeThongRapAction());
    }, []);

    const renderMultiRowSlick = () => {
        if (window.innerWidth <= 1024) {
            return <MultipleRowsSlick arrFilm={arrFilm} arrFilmDangChieu={arrFilmDangChieu} arrFilmSapChieu={arrFilmSapChieu} />
        } else {
            return <div className="container" className={style.circlePink} ref={props.multiRowSection}>
                <MultipleRowsSlick arrFilm={arrFilm} arrFilmDangChieu={arrFilmDangChieu} arrFilmSapChieu={arrFilmSapChieu} />
            </div>
        }
    }

    return (
        <div className={style['bgBody']}>
            {/* CAROUSEL */}
            <HomeCarousel />
            <section className="text-gray-600 body-font" >
                <div className="container py-24 mx-auto" >
                    {renderMultiRowSlick()}
                </div>
            </section>
            <div className="mx-20" ref={props.showTimeSection}>
                <HomeMenu heThongRapChieu={heThongRapChieu} />
            </div>
            <ScrollToTop />
        </div>
    )
}
