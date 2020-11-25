import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ClimbingBoxLoader } from 'react-spinners';
import { ThemeProvider } from '@material-ui/styles';
import MuiTheme from './theme';
import { PrivateRoute } from './auth/_components/PrivateRoute';
import { useSelector } from 'react-redux';
import axios from 'axios';

// Layout Blueprints
import {
  LeftSidebar,
  CollapsedSidebar,
  MinimalLayout,
  PresentationLayout
} from './layout-blueprints';

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
const Feature = lazy(() => import('./views/master/feature'));
const ChatrelMaster = lazy(() => import('./views/master/chatrel'));
const CTAConfig = lazy(() => import('./views/master/ctaconfig'));

// Madeb Pages
const Sarso = lazy(() => import('./views/madeb/sarso'));
const Norchoe = lazy(() => import('./views/madeb/norchoe'));
const Bhorlak = lazy(() => import('./views/madeb/bhorlak'));
const BookFull = lazy(() => import('./views/madeb/bookfull'));
const BriefGB = lazy(() => import('./views/madeb/briefgb'));
const Abroad = lazy(() => import('./views/madeb/abroad'))

//Greenbook Pages
const Greenbook = lazy(() => import('./views/transactions/greenbook/greenbook'));
const NewEntry = lazy(() => import('./views/transactions/newentry/newentry'));
const EditEntry = lazy(() => import('./views/transactions/newentry/editentry'));
const SarsoNewGBEntry = lazy(() => import('./views/transactions/SarsoNewGBEntry/SarsoNewGBEntry'));
const GivenGBID = lazy(() => import('./views/transactions/givengbid'));
const DeleteGB = lazy(() => import('./views/transactions/deletegb'));
const GreenBookSerial = lazy(() => import('./views/transactions/greenbookserial'));
const MakeList = lazy(() => import('./views/makelist'));
const IssueBook = lazy(() => import('./views/transactions/issuebook'));
const ChangePassword = lazy(() => import('./views/change password/index'));
const Users = lazy(() => import('./views/transactions/users/index'));
const Print = lazy(() => import('./views/print'));
const PrintPage = lazy(() => import('./views/print/print.js'));
const FeatureUserrights = lazy(() => import('./views/transactions/featureuserrights/index'));
const NewGreenBookSerial = lazy(() => import('./views/transactions/newgreenbookserial'));
const Search = lazy(() => import('./views/search/index'));

//Chatrel Payment Pages
const Chatrel = lazy(() => import('./views/chatrelhome'));

const ChatrelPay = lazy(() => import('./views/chatrelpay'));
const MainPage = lazy(() => import('./views/chatrelpay/mainpage'));
const PaymentPage = lazy(() => import('./views/chatrelpay/paymentpage'));
const ChatrelList = lazy(() => import('./views/chatrelpay/chatrel_list'));

//Report 

const ReportIssuedOverAll = lazy(() => import('./views/reports/IssuedOverAll/index.js'));
const ReportIssuedIndividual = lazy(() => import('./views/reports/IssuedIndividual/index.js'));
const ReportChangesLog = lazy(() => import('./views/reports/ChangesLog'));
const ReportChildChangesLog = lazy(() => import('./views/reports/ChildChangesLog'));
const ReportNewEntryFromDay = lazy(() => import('./views/reports/NewEntryFromDay'));
const ReportBelow6Years = lazy(() => import('./views/reports/Below6Years'));
const ReportDeceased = lazy(() => import('./views/reports/Deceased'));
const ReportMadebSarso = lazy(() => import('./views/reports/madeb/sarso'));
const ReportMadebNorchoe = lazy(() => import('./views/reports/madeb/norchoe'));
const ReportMadebBhorlak = lazy(() => import('./views/reports/madeb/bhorlak'));
const ReportMadebBookFull = lazy(() => import('./views/reports/madeb/bookfull'));
const ReportMadebBriefGB = lazy(() => import('./views/reports/madeb/briefgb'));
const ReportMadebAbroad = lazy(() => import('./views/reports/madeb/abroad'));
//const IssuedOverAll = lazy(() => import('./views/reports/IssuedOverAll/index.js'));

const Routes = () => {
  const location = useLocation();
  const oUserAuth = useSelector(state => state.UserAuthenticationReducer.oUserAuth);
  if (oUserAuth !== null)
    axios.defaults.headers.common['Authorization'] = "Bearer " + oUserAuth.sJWTToken;

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
                '/PageError404',
                '/PageError500',
                '/PageError505',
                '/PrintPage'
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
                    <Route path="/PrintPage" component={PrintPage} />
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
                '/NewEntry/:FORMNO',
                '/ChatrelMaster',
                '/CTAConfig',
                '/Qualification',
                '/Region',
                '/Province',
                '/AuthRegion',
                '/Occupation',
                '/MadebType',
                '/Relation',
                '/Feature',
                '/UserRights',
                '/TypeIssued',
                '/Sarso',
                '/Norchoe',
                '/Bhorlak',
                '/BookFull',
                '/BriefGB',
                '/Abroad',
                '/IssueBook',
                '/Greenbooks',
                '/SarsoNewGBEntry',
                '/GivenGBID',
                '/DeleteGB',
                '/GreenBookSerial',
                '/NewGreenBookSerial',
                '/MakeList',
                '/EditEntry/:GBID',
                '/ChangePassword',
                '/Users',
                '/Print',
                '/FeatureRoles',
                '/Search',
                '/ChatrelPay',
                '/ChatrelPay/MainPage',
                '/ChatrelPay/PaymentPage',
                '/ChatrelPay/ChatrelList',
                '/Chatrel',
                '/Reports/GreenBookIssuedOverall',
                '/Reports/GreenBookIssuedIndividual',
                '/Reports/ChangesLog',
                '/Reports/ChildChangesLog',
                '/Reports/NewEntryFromDay',
                '/Reports/Below6Years',
                '/Reports/Deceased',
                '/Reports/Madeb/Sarso',
                '/Reports/Madeb/Norchoe',
                '/Reports/Madeb/Bhorlak',
                '/Reports/Madeb/Abroad',
                '/Reports/Madeb/BriefGB',
                '/Reports/Madeb/BookFull',
            
             
              ]}>
              <LeftSidebar>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <PrivateRoute path="/Greenbooks" feature={7} component={Greenbook} />
                    <PrivateRoute path="/NewGreenBookSerial" feature={11} component={NewGreenBookSerial} />

                    {/*Private Routes Go Here*/}
                    <PrivateRoute path="/Home" feature={2} component={Home} />
                    <PrivateRoute path="/GivenGBID" feature={3} component={GivenGBID} />
                    <PrivateRoute path="/DeleteGB" feature={4} component={DeleteGB} />
                    <PrivateRoute path="/Users" feature={5} component={Users} />
                    <PrivateRoute path="/EditEntry/:GBID" feature={7} component={EditEntry} />
                    <PrivateRoute path="/IssueBook" feature={8} component={IssueBook} />
                    <PrivateRoute path="/MakeList" feature={9} component={MakeList} />
                    <PrivateRoute path="/Print" feature={10} component={Print} />
                    <PrivateRoute path="/GreenBookSerial" feature={11} component={GreenBookSerial} />
                    <PrivateRoute path="/NewEntry/:FORMNO" feature={12} component={NewEntry} />
                    <PrivateRoute path="/Sarso" feature={13} component={Sarso} />
                    <PrivateRoute path="/Norchoe" feature={14} component={Norchoe} />
                    <PrivateRoute path="/Bhorlak" feature={15} component={Bhorlak} />
                    <PrivateRoute path="/BookFull" feature={16} component={BookFull} />
                    <PrivateRoute path="/BriefGB" feature={17} component={BriefGB} />
                    <PrivateRoute path="/Abroad" feature={18} component={Abroad} />
                    <PrivateRoute path="/ChangePassword" feature={19} component={ChangePassword} />
                    <PrivateRoute path="/Search" feature={20} component={Search} />
                    <PrivateRoute path="/SarsoNewGBEntry" feature={21} component={SarsoNewGBEntry} />
                    <PrivateRoute path="/FeatureRoles" feature={22} component={FeatureUserrights} />
                    <PrivateRoute path="/UserRights" feature={23} component={UserRights} />
                    <PrivateRoute path="/Region" feature={24} component={Region} />
                    <PrivateRoute path="/ChatrelMaster" feature={25} component={ChatrelMaster} />
                    <PrivateRoute path="/CTAConfig" feature={26} component={CTAConfig} />
                    <PrivateRoute path="/AuthRegion" feature={27} component={AuthRegion} />
                    <PrivateRoute path="/Country" feature={28} component={Country} />
                    <PrivateRoute path="/Occupation" feature={29} component={Occupation} />
                    <PrivateRoute path="/Province" feature={30} component={Province} />
                    <PrivateRoute path="/Qualification" feature={31} component={Qualification} />
                    <PrivateRoute path="/Relation" feature={32} component={Relation} />
                    <PrivateRoute path="/Feature" feature={33} component={Feature} />
                    <PrivateRoute path="/TypeIssued" feature={34} component={TypeIssued} />
                    <PrivateRoute path="/MadebType" feature={35} component={MadebType} />
                    <PrivateRoute path="/Chatrel" feature={37} component={Chatrel} exact />
                    <PrivateRoute path="/ChatrelPay" feature={37} component={ChatrelPay} exact />
                    <PrivateRoute path="/ChatrelPay/MainPage" feature={37} component={MainPage} exact />
                    <PrivateRoute path="/ChatrelPay/PaymentPage" feature={37} component={PaymentPage} exact />
                    <PrivateRoute path="/ChatrelPay/ChatrelList" feature={37} component={ChatrelList} exact />
                    <Route path="/Reports/GreenBookIssuedOverall" component={ReportIssuedOverAll}  exact />
                    <Route path="/Reports/GreenBookIssuedIndividual" component={ReportIssuedIndividual}  exact />
                    <Route path="/Reports/ChangesLog" component={ReportChangesLog}  exact />
                    <Route path="/Reports/ChildChangesLog" component={ReportChildChangesLog}  exact />
                    <Route path="/Reports/NewEntryFromDay" component={ReportNewEntryFromDay}  exact />
                    <Route path="/Reports/Below6Years" component={ReportBelow6Years}  exact />
                    <Route path="/Reports/Deceased" component={ReportDeceased}  exact />
                    <Route path="/Reports/Madeb/Sarso" component={ReportMadebSarso}  exact />
                    <Route path="/Reports/Madeb/Norchoe" component={ReportMadebNorchoe}  exact />
                    <Route path="/Reports/Madeb/Abroad" component={ReportMadebAbroad}  exact />
                    <Route path="/Reports/Madeb/BriefGB" component={ReportMadebBriefGB}  exact />
                    <Route path="/Reports/Madeb/BookFull" component={ReportMadebBookFull}  exact />
                    <Route path="/Reports/Madeb/Bhorlak" component={ReportMadebBhorlak}  exact />
                    
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
