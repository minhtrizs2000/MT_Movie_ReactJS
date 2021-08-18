import React, { useEffect } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'

//connect redux
import { useSelector, useDispatch } from 'react-redux';

//Slick
import MultipleRowsSlick from '../../components/ReactSlick/MultipleRowsSlick';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction';
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel';
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapAction';

export default function Home(props) {

    const { arrFilm, arrFilmDangChieu, arrFilmSapChieu } = useSelector(state => state.QuanLyPhimReducer);
    const { heThongRapChieu } = useSelector(state=>state.QuanLyRapReducer);
    const dispatch = useDispatch();

    useEffect(()=>{
        //lay ds phim
        dispatch(layDanhSachPhimAction());
        //lay ds he thong rap
        dispatch(layDanhSachHeThongRapAction());
    }, []);

    return (
        <div>
            {/* CAROUSEL */}
            <HomeCarousel/>
            <section className="text-gray-600 body-font" >
                <div className="container px-5 py-24 mx-auto " >
                    <MultipleRowsSlick arrFilm={arrFilm} arrFilmDangChieu={arrFilmDangChieu} arrFilmSapChieu={arrFilmSapChieu}/>
                </div>
            </section>
            <div className="mx-48">
                <HomeMenu  heThongRapChieu={heThongRapChieu}/>
            </div>
        </div>
    )
}
