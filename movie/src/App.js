import './App.css';
import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router'
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/User/Home/Home';
import Login from './pages/User/Login/Login';
import Register from './pages/User/Register/Register';
import Detail from './pages/User/Detail/Detail';
import CheckoutTemplate from './templates/CheckoutTemplate/CheckoutTemplate';
import Checkout from './pages/User/Checkout/Checkout';
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import Loading from './components/Loading/Loading';
import Profile from './pages/User/Profile/Profile';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import Films from './pages/Admin/Films/Films';
import AddFilm from './pages/Admin/Films/AddFilm';
import EditFilm from './pages/Admin/Films/EditFilm';
import ShowTimes from './pages/Admin/Films/ShowTimes';
import AddUser from './pages/Admin/Dashboard/AddUser';
import EditUser from './pages/Admin/Dashboard/EditUser';


//lazy load
// import { Suspense, lazy } from 'react';
// const CheckoutTemplateLazy = lazy(() => import('./templates/CheckoutTemplate/CheckoutTemplate'));

export const history = createBrowserHistory();

function App() {
    return (
        <Router history={history}>
            <Loading />
            <Switch>
                {/* HOME TEMPLATE */}
                <HomeTemplate exact path="/" Component={Home} />
                <HomeTemplate exact path="/home" Component={Home} />
                <HomeTemplate exact path="/detail/:id" Component={Detail} />
                <HomeTemplate exact path="/profile" Component={Profile} />

                {/* USER TEMPLATE */}
                <UserTemplate exact path="/login" Component={Login} />
                <UserTemplate exact path="/register" Component={Register} />

                {/* ADMIN TEMPLATE */}
                <AdminTemplate exact path="/admin" Component={Dashboard} />
                <AdminTemplate exact path="/admin/users" Component={Dashboard} />
                <AdminTemplate exact path="/admin/users/adduser" Component={AddUser} />
                <AdminTemplate exact path="/admin/users/edituser/:id" Component={EditUser} />
                <AdminTemplate exact path="/admin/films" Component={Films} />
                <AdminTemplate exact path="/admin/films/addfilm" Component={AddFilm} />
                <AdminTemplate exact path="/admin/films/editfilm/:id" Component={EditFilm} />
                <AdminTemplate exact path="/admin/films/showtimes/:id/:tenphim" Component={ShowTimes} />

                {/* CHECKOUT TAMPLATE */}
                <CheckoutTemplate exact path="/checkout/:id" Component={Checkout} />
            </Switch>
        </Router>
    );
}

export default App;
