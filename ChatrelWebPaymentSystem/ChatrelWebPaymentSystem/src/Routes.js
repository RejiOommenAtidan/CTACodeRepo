import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ClimbingBoxLoader,MoonLoader } from 'react-spinners';

import { ThemeProvider } from '@material-ui/styles';
import axios from 'axios';
import MuiTheme from './theme';

// Layout Blueprints

import {
  LeftSidebar,
  CollapsedSidebar,
  MinimalLayout,
  PresentationLayout
} from './layout-blueprints';


import { useSelector,useDispatch} from 'react-redux';


const Home = lazy(() => import('./views/home/home.js'));
const Test = lazy(() => import('./views/test'));
const Login = lazy(() => import('./views/login'));
const AccessDenied = lazy(() => import('./views/error/locationerror.js'));
const Profile = lazy(() => import("./views/profile/index.js"));
const FileDispute = lazy(() => import("./views/filedispute/index.js"));
const ContactUs = lazy(() => import("./views/Contact/index.js"));
const PrivacyPolicy = lazy(() => import("./views/privacy-policy/index.js"));

const Family = lazy(() => import("./views/family"));
const Friends = lazy(() => import("./views/friends"));
const PaymentHistory = lazy(() => import('./views/paymenthistory'));
const PaymentPage = lazy(() => import('./views/paymentpage'));
const SelfPayment = lazy(() => import('./views/paymentpage/selfpayment.js'));

const Routes = () => {
  const location = useLocation();

  const oSession = useSelector(
    (state) => state.SessionReducer.oSession
  );
  if (oSession !== null)
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + oSession.sJwtToken;
  const pageVariants = {
    initial: {
      opacity: 0
    },
    in: {
      opacity: 1
    },
    out: {
      opacity: 0
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'linear',
    duration: 0.3
  };

  const SuspenseLoading = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
      let timeout = setTimeout(() => setShow(true), 300);
      return () => {
        clearTimeout(timeout);
      };
    }, []);

    // const bSession = useSelector(state => state.SessionReducer.bSession);
   // console.log("session",bSession);
    /*if(bSession){
      
      console.log(new Date());
      //alert('timeout');
    }*/
   // const a = new Date();
//    const b = new Date(a.getTime() + 1000*30);
    // const checkSession=()=>{
    //   let x = new Date();
    //   console.log('old',bSession);
    //   console.log('new',x);
    //   if(bSession.getTime()<= x.getTime()){
    //     alert('hi');
    //   }
    // }
   /* while (bSession){
      setTimeout(() => console.log('hi'), 1000*60);
    }*/
   
    console.log("Location:",window.location.pathname);
    const[timer,setTimer]=useState(false);
   /* setTimer(window.location.pathname !=="/Login");*/
    useEffect(() => {
     /* var d = new Date();
      var time= d.getTime() + 1000*60*10;*/
      //document.cookie = "timeout=hi;" + expires;  
     // document.cookie = "session=Active;";
      //document.cookie = "session2=Active;"+time+";";
    }, []);
    /*var username = getCookie("username");
    alert(username);*/
    var timeout=document.cookie;
    if(timeout.includes("session=Active")){
      //alert('yes');
    }
    else{
     // alert('no');
    }
    console.log(timeout);
    

    return (
      <>
        <AnimatePresence>
          {show && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}>
              <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
                <div className="d-flex align-items-center flex-column px-4">
                <MoonLoader color={'#3c44b1'} loading={true} />
                </div>
               
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };
  return (
    <ThemeProvider theme={MuiTheme}>
      <AnimatePresence>
        <Suspense fallback={<SuspenseLoading />}>
          <Switch>
            <Redirect exact from="/" to="/Login" />
            <Route path={[
              '/Login',
              '/AccessDenied',
              '/Test'
               
          
          
          ]}>
              <PresentationLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/Login" component={Login} />
                    <Route path="/AccessDenied" component={AccessDenied} />
                    <Route path="/Test" component={Test} ></Route>
                  </motion.div>
                </Switch>
              </PresentationLayout>
            </Route>

            <Route
              path={[
                //'/Home',
              ]}>
              <MinimalLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                  
                  
                
                  </motion.div>
                </Switch>
              </MinimalLayout>
            </Route>

            <Route
              path={[
                '/Family',
                '/Friends',
                '/PaymentHistory',
               // '/Test',
                '/Home',
                '/PaymentPage',
                '/SelfPayment',
                '/Profile',
                '/FileDispute',
                '/PrivacyPolicy',
                '/ContactUs'
              ]}>
              <LeftSidebar>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route
                      path="/Home"
                      component={Home}
                    />
                     <Route
                      path="/Profile"
                      component={Profile}
                    />
                      <Route
                      path="/FileDispute"
                      component={FileDispute}
                    />
                 {/*   <Route
                      path="/Test"
                      component={Test}
                 />*/}
                     <Route
                      path="/Family"
                      component={Family}
                    />
                    <Route
                      path="/Friends"
                      component={Friends}
                    />
                    <Route
                      path="/PaymentHistory"
                      component={PaymentHistory}
                    />
                 
                    <Route
                      path='/PaymentPage'
                      component={PaymentPage}
                    />

                    <Route
                      path='/SelfPayment'
                      component={SelfPayment}
                    />           

                      <Route
                      path='/PrivacyPolicy'
                      component={PrivacyPolicy}
                    />

                    <Route
                      path='/ContactUs'
                      component={ContactUs}
                    />                      
                  </motion.div>
                </Switch>
              </LeftSidebar>
            </Route>

            <Route
              path={[
              
              ]}>
              <CollapsedSidebar>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                   
                  </motion.div>
                </Switch>
              </CollapsedSidebar>
            </Route>
          </Switch>
        </Suspense>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Routes;
