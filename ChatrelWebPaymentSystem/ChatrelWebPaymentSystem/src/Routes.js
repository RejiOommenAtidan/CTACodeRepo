import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ClimbingBoxLoader } from 'react-spinners';

import { ThemeProvider } from '@material-ui/styles';

import MuiTheme from './theme';

// Layout Blueprints

import {
  LeftSidebar,
  CollapsedSidebar,
  MinimalLayout,
  PresentationLayout
} from './layout-blueprints';



const Home = lazy(() => import('./views/home/home.js'));
const Test = lazy(() => import('./views/test'));
const Login = lazy(() => import('./views/login'));

const Family = lazy(() => import("./views/family"));
const Friends = lazy(() => import("./views/friends"));
const PaymentHistory = lazy(() => import('./views/paymenthistory'));
const PaymentPage = lazy(() => import('./views/paymentpage'));
const SelfPayment = lazy(() => import('./views/paymentpage/selfpayment.js'));

const Routes = () => {
  const location = useLocation();

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
                  <ClimbingBoxLoader color={'#3c44b1'} loading={true} />
                </div>
                <div className="text-muted font-size-xl text-center pt-3">
                  Please wait while we load the live preview examples
                  <span className="font-size-lg d-block text-dark">
                    This live preview instance can be slower than a real
                    production build!
                  </span>
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
            <Route path={['/Login']}>
              <PresentationLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/Login" component={Login} />
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
                '/Test',
                'Home',
                '/PaymentPage',
                '/SelfPayment',
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
                      path="/Test"
                      component={Test}
                    />
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
