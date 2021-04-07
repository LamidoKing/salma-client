import Home from "../../Home";
import Front from "../../layouts/front";
import Login from "../../Login";
import AuthLayout from "../../layouts/auth";
import HelpDetails from "../../HelpDetails";
import Register from "../../Register";
import CreateHelp from "../../CreateHelp";
import MyHelps from "../../MyHelps";
import LandingPage from "../../LandingPage";
import updateHelp from '../../updateHelp'

export const navigationLinks = [
  {title: 'Home', component: LandingPage, link: '/home', exact: true, useInNavbar: true, layout: Front},
  {title: 'Map', component: Home, link: '/', exact: true, useInNavbar: true, transparentNav: true, layout: Front},
  {title: 'Login', component: Login, link: '/login', exact: true, useInNavbar: false, transparentNav: true, layout: AuthLayout},
  {title: 'Register', component: Register, link: '/register', exact: true, useInNavbar: false, transparentNav: true, layout: AuthLayout},
  {title: 'Help Details', component: HelpDetails, link: '/help/:id', exact: true, useInNavbar: false, transparentNav: true, layout: Front},
  {title: 'Edit', component: updateHelp, link: '/help/update/:id', exact: true, useInNavbar: false, transparentNav: true, layout: Front},

  {title: 'Make Request', component: CreateHelp, link: '/make-request', exact: true, useInNavbar: true, transparentNav: true, layout: Front},
  {title: 'Dashboard', component: MyHelps, link: '/dashboard', exact: true, useInNavbar: true, transparentNav: true, layout: Front}
]