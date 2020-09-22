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
import { Edit } from '@material-ui/icons';

// Example Pages

const PageLogin = lazy(() => import('./example-pages/PageLoginBasic'));

const PageProfile = lazy(() => import('./example-pages/PageProfile'));

const PageError404 = lazy(() => import('./example-pages/PageError404'));
const PageError500 = lazy(() => import('./example-pages/PageError500'));
const PageError505 = lazy(() => import('./example-pages/PageError505'));

//My pages
const Home = lazy(() => import('./views/home'));

//Master Pages
const Country = lazy(() => import('./views/master/country'));
const Qualification = lazy(() => import('./views/master/qualification'));
const Occupation = lazy(() => import('./views/master/occupation'));
const Province = lazy(() => import('./views/master/province'));
const AuthRegion = lazy(() => import('./views/master/authregion'));
const Region = lazy(() => import('./views/master/region'));
const TypeIssued = lazy(() => import('./views/master/typeissued'));
const UserRights = lazy(() => import('./views/master/userrights'));
const MadebType = lazy(() => import('./views/master/madebtype'));
const Relation = lazy(() => import('./views/master/relation'));

// Madeb Pages
const Sarso = lazy(() => import('./views/madeb/sarso'));


const NewEntry = lazy(() => import('./views/transactions/newentry/newentry'));
const EditEntry = lazy(() => import('./views/transactions/newentry/editentry'));
const SarsoNewGBEntry = lazy(() => import('./views/transactions/SarsoNewGBEntry/SarsoNewGBEntry'));

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
                    <Route path="/Login" component={PageLogin} />
                  </motion.div>
                </Switch>
              </PresentationLayout>
            </Route>

            <Route
              path={[
                '/Profile',
                '/Error404',
                '/Error500',
                '/Error505'
              ]}>
              <MinimalLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/PageProfile" component={PageProfile} />
                 
                    <Route path="/PageError404" component={PageError404} />
                    <Route path="/PageError500" component={PageError500} />
                    <Route path="/PageError505" component={PageError505} />
                  </motion.div>
                </Switch>
              </MinimalLayout>
            </Route>

            <Route
              path={[
                '/Home',
                '/Country',
                '/NewEntry',
                '/Qualification',
                '/Region',
                '/Province',
                '/AuthRegion',
                '/Occupation',
                '/MadebType',
                '/Relation',
                '/UserRights',
                '/TypeIssued',
                '/Sarso',
                '/SarsoNewGBEntry',
                '/EditEntry/:GBID'
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
                     <Route path="/Country" component={Country} />
                     <Route path="/NewEntry" component={NewEntry} />
                     <Route path="/Qualification" component={Qualification} />
                     <Route path="/Region" component={Region} />
                     <Route path="/Province" component={Province} />
                     <Route path="/AuthRegion" component={AuthRegion} />
                     <Route path="/Occupation" component={Occupation} />
                     <Route path="/MadebType" component={MadebType} />
                     <Route path="/Relation" component={Relation} />
                     <Route path="/UserRights" component={UserRights} />
                     <Route path="/TypeIssued" component={TypeIssued} />
                     <Route path="/Sarso" component={Sarso} />
                     <Route path="/SarsoNewGBEntry" component={SarsoNewGBEntry} />
                     <Route path="/EditEntry/:GBID" component={EditEntry} />
                  </motion.div>
                </Switch>
              </LeftSidebar>
            </Route>

            <Route
              path={[
           /*     '/PageCalendar',
                '/PageChat',
                '/PageProjects',
                '/PageFileManager',
                '/PageProfile'*/
              ]}>
              <CollapsedSidebar>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                {/*    <Route path="/PageCalendar" component={PageCalendar} />
                    <Route path="/PageChat" component={PageChat} />
                    <Route path="/PageProjects" component={PageProjects} />
                    <Route
                      path="/PageFileManager"
                      component={PageFileManager}
                    />
                    <Route path="/PageProfile" component={PageProfile} /> */}
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
