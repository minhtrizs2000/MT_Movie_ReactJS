import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../../../components/Logo/Logo';
import './Header.css';
import { Select } from 'antd';
import { useSelector } from 'react-redux';
import _ from 'lodash';

//hook dịch đa ngôn ngữ
import { useTranslation } from 'react-i18next';
import { ACCESSTOKEN, USER_LOGIN } from '../../../../util/settings/config';
import { history } from '../../../../App';




const { Option } = Select;

export default function Header(props) {

    //Đa ngôn ngữ
    const { t, i18n } = useTranslation();

    //login
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const handleChange = (value) => {
        i18n.changeLanguage(value);
    }

    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <button className="self-center px-8 py-3 rounded"><NavLink to="/login" className="text-white text-lg hover:text-purple-400">{t('Login')}</NavLink></button>
                <button className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900"><NavLink to="/register" className="text-white text-lg hover:text-purple-400">{t('Register')}</NavLink></button>
            </Fragment>
        }

        return <div className="self-center px-8 py-3 rounded">
            <p className="border-b-2 border-purple-500 text-lg my-1"> {t('Hello')}! {userLogin.taiKhoan}</p>
            <NavLink to="/profile" className="text-white text-lg hover:text-purple-400">
                {t('Profile')}
            </NavLink>
            <button onClick={()=>{
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(ACCESSTOKEN);
                history.push('/');
                window.location.reload();
            }}  className="text-white text-lg hover:text-purple-400 duration-500 ml-5">
                {t('Logout')}
            </button>
        </div>

    }


    return (
        <header className="p-4 dark:bg-coolGray-800 dark:text-coolGray-100 bg-black bg-opacity-70 text-white fixed w-full z-10">
            <div className="container flex justify-between h-16 mx-auto">
                <Logo />
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink to="/home" activeClassName="customActiveLink" className="customLink">{t('Home')}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/contact" activeClassName="customActiveLink" className="customLink">{t('Contact')}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/news" activeClassName="customActiveLink" className="customLink">{t('News')}</NavLink>
                    </li>
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">

                    {renderLogin()}

                    <Select className="opacity-50" defaultValue="en" style={{ width: 100 }} onChange={handleChange}>
                        <Option value="vi">
                            <div className="flex flex-row">
                                <img className="mr-2" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/emoji-one/5/flag-for-vietnam_1f1fb-1f1f3.png" alt="FLAG" width={30} />
                                <span>VI</span>
                            </div>
                        </Option>
                        <Option value="en">
                            <div className="flex flex-row">
                                <img className="mr-2" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/emoji-one/5/flag-for-united-states_1f1fa-1f1f8.png" alt="FLAG" width={30} />
                                <span>EN</span>
                            </div>
                        </Option>
                        <Option value="jp">
                            <div className="flex flex-row">
                                <img className="mr-2" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/emoji-one/5/flag-for-japan_1f1ef-1f1f5.png" alt="FLAG" width={30} />
                                <span>JP</span>
                            </div>
                        </Option>
                        <Option value="cn">
                            <div className="flex flex-row">
                                <img className="mr-2" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/emoji-one/5/flag-for-china_1f1e8-1f1f3.png" alt="FLAG" width={30} />
                                <span>CN</span>
                            </div>
                        </Option>
                    </Select>
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>

    )
}
