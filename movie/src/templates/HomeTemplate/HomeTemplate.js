import { useEffect } from 'react';
import { Route } from 'react-router'
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";


export const HomeTemplate = (props) => {

    const { Component, ...restProps } = props;

    useEffect(()=>{
        window.scrollTo(0,0);
    });
    
    return <Route {...restProps} render={(propsRoute) => {
        //props.location, props.history, props.match

        return <div className="bg-black text-white">

            {/* HEADER */}
            <Header {...propsRoute}/>

            {/* RENDER COMPONENT */}
            <Component {...propsRoute} />

            {/* FOOTER */}
            <Footer/>
        </div>
    }} />
}