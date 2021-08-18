import React from 'react'

export default function Film(props) {
    const { film } = props;


    return (
        <div className="m-4 h-full bg-gray-100 bg-opacity-75 px-4 py-8 rounded-lg overflow-hidden text-center relative">
            <div style={{background:`url(${film.hinhAnh}) no-repeat ,url(https://picsum.photos/1000/200)`, backgroundPosition:'center', backgroundSize:'cover',}}>
                <img className="w-full h-72 opacity-0" src={film.hinhAnh} alt={film.tenPhim} />
            </div>
            <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mt-3 h-16">{film.tenPhim}</h1>
            <p className="leading-relaxed mb-3 h-16">{film.moTa.length > 80 ? <span>{film.moTa.slice(0,80)}...</span> : <span>{film.moTa}</span>}</p>
            <a className="text-indigo-500 inline-flex items-center">Đặt vé
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                </svg>
            </a>
        </div>
    )
}

//*****************UNUSED