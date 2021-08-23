import React, { useEffect, useState } from 'react'
import './ScrollToTop.css'
import { useWindowScroll } from 'react-use'
import { UpOutlined } from '@ant-design/icons'

export default function ScrollToTop() {
    const { y: pageYOffset } = useWindowScroll();
    const [visible, setVisiblity] = useState(false);

    useEffect(() => {
        if (pageYOffset > 400) {
            setVisiblity(true);
        } else {
            setVisiblity(false);
        };
    });

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!visible) {
        return false;
    };

    return (
        <div onClick={scrollToTop} className="opacity-50 hover:opacity-100 duration-300 scrollToTop fixed bottom-10 bg-purple-500 right-10 rounded-full text-white w-14 h-14 cursor-pointer text-center z-10">
            <UpOutlined className="icon text-3xl mt-2" />
        </div>
    )
}
