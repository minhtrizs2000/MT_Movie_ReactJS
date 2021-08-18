import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import './Loading..css'

export default function Loading(props) {

    const { isLoading } = useSelector(state => state.LoadingReducer);


    return (
        <Fragment>
            {isLoading ?
                <div className='loading_comp'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="Gradient" viewBox="0 0 512 512" width={200} height={200}><defs><linearGradient id="linear-gradient" x1={256} y1={496} x2={256} y2={16} gradientUnits="userSpaceOnUse"><stop offset={0} stopColor="#12c2e9" /><stop offset="0.5" stopColor="#c471ed" /><stop offset={1} stopColor="#f64f59" /></linearGradient></defs><path d="M488,112H367.672C363.258,58.378,314.858,16,256,16S148.742,58.378,144.328,112H24a8,8,0,0,0-8,8V488a8,8,0,0,0,8,8H488a8,8,0,0,0,8-8V120A8,8,0,0,0,488,112ZM152,128a8,8,0,0,0,8-8c0-48.523,43.065-88,96-88s96,39.477,96,88a8,8,0,0,0,8,8H480v16H360a8,8,0,0,0-8,8V416H336V368a8,8,0,0,0-16,0c0,8.673-10.991,16-24,16-15.45,0-32-9.391-32-16a8,8,0,0,0-16,0c0,6.609-16.55,16-32,16-13.009,0-24-7.327-24-16a8,8,0,0,0-16,0v48H160V152a8,8,0,0,0-8-8H32V128ZM480,416H464V392a8,8,0,0,0-8-8V192a8,8,0,0,0,8-8V160h16ZM88,192V384H72V192Zm16,192V192a8,8,0,0,0,8-8V160h32V416H112V392A8,8,0,0,0,104,384ZM96,176H64V160H96ZM56,192V384a8,8,0,0,0-8,8v24H32V160H48v24A8,8,0,0,0,56,192Zm8,208H96v16H64Zm48,32H400v16H112Zm80-38.417A46.648,46.648,0,0,0,216,400a65.616,65.616,0,0,0,30.523-8.042c.507-.282.991-.574,1.477-.866V416H192ZM320,416H264V391.092c.486.292.97.584,1.477.866A65.616,65.616,0,0,0,296,400a46.648,46.648,0,0,0,24-6.417Zm104-32V192h16V384Zm24-208H416V160h32Zm-40,16V384a8,8,0,0,0-8,8v24H368V160h32v24A8,8,0,0,0,408,192Zm8,208h32v16H416ZM96,480H32V432H96Zm16,0V464H400v16Zm368,0H416V432h64ZM192,311.545A72.123,72.123,0,0,0,255.545,248h.91A72.123,72.123,0,0,0,320,311.545V328h16V120c0-39.7-35.888-72-80-72s-80,32.3-80,72V328h16Zm0-16.126V248h47.419A56.112,56.112,0,0,1,192,295.419ZM272.581,248H320v47.419A56.112,56.112,0,0,1,272.581,248ZM256,64c35.29,0,64,25.122,64,56V232H192V120C192,89.122,220.71,64,256,64Zm0,96a40,40,0,1,0-40-40A40.045,40.045,0,0,0,256,160Zm0-64a24,24,0,1,1-24,24A24.028,24.028,0,0,1,256,96ZM184,360a8,8,0,1,1,8-8A8,8,0,0,1,184,360Zm144,0a8,8,0,1,1,8-8A8,8,0,0,1,328,360Zm-72,0a8,8,0,1,1,8-8A8,8,0,0,1,256,360Z" style={{ fill: 'url(#linear-gradient)' }} /></svg>
                    </div>
                    <br />
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ margin: 'auto', background: 'rgba(0, 0, 0, 0)', display: 'block', shapeRendering: 'auto' }} width="300px" height="300px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <path fill="none" stroke="#18ffff" strokeWidth={8} strokeDasharray="42.76482137044271 42.76482137044271" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" strokeLinecap="round" style={{ transform: 'scale(0.8)', transformOrigin: '50px 50px' }}>
                                <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0;256.58892822265625" />
                            </path>
                        </svg>
                    </div>
                </div>  : ''}
        </Fragment>
    )
}
