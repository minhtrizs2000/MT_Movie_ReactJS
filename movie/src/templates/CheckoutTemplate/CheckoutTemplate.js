import { useEffect } from 'react';
import { Redirect, Route } from 'react-router'
import { USER_LOGIN } from '../../util/settings/config';

const CheckoutTemplate = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const { Component, ...restProps } = props;

    //kiểm tra nếu chưa login thì chuyển hướng trang sang trang login
    if (!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to="/login" />
    };

    return <Route {...restProps} render={(propsRoute) => {
        //props.location, props.history, props.match

        return <div>
            {/* RENDER COMPONENT */}
            <Component {...propsRoute} />
        </div>
    }} />
};
export default CheckoutTemplate;