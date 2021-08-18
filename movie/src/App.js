import './App.css';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router'
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';
import CheckoutTemplate from './templates/CheckoutTemplate/CheckoutTemplate';
import Checkout from './pages/Checkout/Checkout';
import { UserTemplate } from './templates/UserTemplate/UserTemplate';

//lazy load
import {Suspense,lazy} from 'react';
import Loading from './components/Loading/Loading';
import Profile from './pages/Profile/Profile';
const CheckoutTemplateLazy = lazy(()=>import('./templates/CheckoutTemplate/CheckoutTemplate'))

export const history = createBrowserHistory();

function App() {
    return (
        <Router history={history}>
            <Loading/>
            <Switch>
                {/* HOME TEMPLATE */}
                <HomeTemplate exact path="/" Component={Home}/>
                <HomeTemplate exact path="/contact" Component={Contact}/>
                <HomeTemplate exact path="/news" Component={News}/>
                <HomeTemplate exact path="/home" Component={Home}/>
                <HomeTemplate exact path="/detail/:id" Component={Detail}/>
                <HomeTemplate exact path="/profile" Component={Profile}/>

                {/* USER TEMPLATE */}
                <UserTemplate exact path="/login" Component={Login}/>
                <UserTemplate exact path="/register" Component={Register}/>


                {/* CHECKOUT TAMPLATE */}
                <CheckoutTemplate exact path="/checkout/:id" Component={Checkout}/>
            </Switch>
        </Router>
    );
}

export default App;
