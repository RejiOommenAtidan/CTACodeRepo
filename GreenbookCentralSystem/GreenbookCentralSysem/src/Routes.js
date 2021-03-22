import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom';
import { removeAuthDetails } from "./actions/userAuthenticateAction";
import { AnimatePresence, motion } from 'framer-motion';
import { ClimbingBoxLoader, MoonLoader } from 'react-spinners';
import { ThemeProvider } from '@material-ui/styles';
import MuiTheme from './theme';
import { PrivateRoute } from './auth/_components/PrivateRoute';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {Button,List,ListItem,Dialog} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

//Test
const Test = lazy(() => import('./views/test2/index.js'));
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
const Abroad = lazy(() => import('./views/madeb/abroad'));

//Greenbook Pages
const Greenbook = lazy(() =>
  import('./views/transactions/greenbook/greenbook')
);
const NewEntry = lazy(() => import('./views/transactions/newentry/newentry'));
const EditEntry = lazy(() => import('./views/transactions/newentry/editentry'));
const SarsoNewGBEntry = lazy(() =>
  import('./views/transactions/SarsoNewGBEntry/SarsoNewGBEntry')
);
const GivenGBID = lazy(() => import('./views/transactions/givengbid'));
const DeleteGB = lazy(() => import('./views/transactions/deletegb'));
const GreenBookSerial = lazy(() =>
  import('./views/transactions/greenbookserial')
);
const MakeList = lazy(() => import('./views/makelist'));
const IssueBook = lazy(() => import('./views/transactions/issuebook'));
const ChangePassword = lazy(() => import('./views/change password/index'));
const Users = lazy(() => import('./views/transactions/users/index'));
const Print = lazy(() => import('./views/print'));
const PrintPage = lazy(() => import('./views/print/print.js'));
const FeatureUserrights = lazy(() =>
  import('./views/transactions/featureuserrights/index')
);
const NewGreenBookSerial = lazy(() =>
  import('./views/transactions/newgreenbookserial')
);
const Search = lazy(() => import('./views/search/index'));

//Chatrel Payment Pages
const Chatrel = lazy(() => import('./views/chatrelhome'));

const ChatrelPay = lazy(() => import('./views/chatrelpay'));
const MainPage = lazy(() => import('./views/chatrelpay/mainpage'));
const PaymentPage = lazy(() => import('./views/chatrelpay/paymentpage'));
const ChatrelList = lazy(() => import('./views/chatrelpay/chatrel_list'));
const ChatrelSearchUsers = lazy(() =>  import('./views/chatrelhome/searchusers'));
const ChatrelReceipt = lazy(() => import('./views/chatrelpay/chatrelreceipt'));
const ChatrelBulkUpload = lazy(() => import('./views/chatrelhome/bulkupload'));
const ChatrelReport = lazy(() => import('./views/chatrelhome/reports'));
const ChatrelAddSingle = lazy(() => import('./views/chatrelhome/addchatrel'));
const ChatrelDefaulterList = lazy(() => import('./views/chatrelhome/defaulterlist'));
const ChatrelListSearch = lazy(() => import('./views/chatrelpay/chatrel_list/chatrel_list_with_search'));
   
//Report

const ReportIssuedOverAll = lazy(() =>
  import('./views/reports/IssuedOverAll/index.js')
);
const ReportIssuedIndividual = lazy(() =>
  import('./views/reports/IssuedIndividual/index.js')
);
const ReportChangesLog = lazy(() => import('./views/reports/ChangesLog'));
const ReportChildChangesLog = lazy(() =>
  import('./views/reports/ChildChangesLog')
);
const ReportNewEntryFromDay = lazy(() =>
  import('./views/reports/NewEntryFromDay')
);
const ReportBelow6Years = lazy(() => import('./views/reports/Below6Years'));
const ReportDeceased = lazy(() => import('./views/reports/Deceased'));
const ReportMadebSarso = lazy(() => import('./views/reports/madeb/sarso'));
const ReportMadebNorchoe = lazy(() => import('./views/reports/madeb/norchoe'));
const ReportMadebBhorlak = lazy(() => import('./views/reports/madeb/bhorlak'));
const ReportMadebBookFull = lazy(() =>
  import('./views/reports/madeb/bookfull')
);
const ReportMadebBriefGB = lazy(() => import('./views/reports/madeb/briefgb'));
const ReportMadebAbroad = lazy(() => import('./views/reports/madeb/abroad'));
const ReportDeletedGB = lazy(() => import('./views/reports/DeletedGB'));

//const IssuedOverAll = lazy(() => import('./views/reports/IssuedOverAll/index.js'));

const Routes = () => {
  const [sessionTimeout,setSessionTimeout]=React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const oUserAuth = useSelector(
    (state) => state.UserAuthenticationReducer.oUserAuth
  );
  if (oUserAuth !== null)
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + oUserAuth.sJWTToken;

  axios.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("Interceptor valid response", response);
    return response;
  },  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("path",window.location.pathname);
    console.log("response error: ", error);
    if(error.response.status === 401 && window.location.pathname!=='/Login' && window.location.pathname!=='/login'){
      console.log("we hit 401");
      //history.go(0);
      //history.push('/Login');
      
      //alert("Your session has expired. Please login again.");

      //window.location.replace('/Login');
      setSessionTimeout(true);
      //window.location.reload('/Login');
      //dispatch(removeAuthDetails());

      return;
    }
    return Promise.reject(error);
  });
  const logout =() =>{
    //alert('logout');
    
     
    window.location.reload('/Login');
    dispatch(removeAuthDetails());
    //history.push('/Login');
      
  }
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
                '/PrintPage',
                '/test'
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
                    <Route path="/test" component={Test} />
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
                '/GiveGBID',
                '/DeleteGB',
                '/GreenBookSerial',
                '/NewGreenBookSerial',
                '/MakeList',
                '/EditEntry/:GBID',
                '/ChangePassword',
                '/Users',
                '/Print',
                '/FeatureRights',
                '/Search',
                // '/ChatrelPay',
                // '/ChatrelPay/MainPage',
                // '/ChatrelPay/PaymentPage',
                '/Chatrel/ChatrelList',
                '/Chatrel/ChatrelListSearch',
                '/Chatrel/ChatrelReceipt',
                // '/Chatrel',
                '/Chatrel/ChatrelDefaulterReport',
                '/Chatrel/SearchUsers',
                '/Chatrel/BulkImport',
                '/Chatrel/Report',
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
                '/Reports/DeletedGB'
              ]}>
              <LeftSidebar>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    {/*Private Routes Go Here*/}
                    <PrivateRoute path="/Home" feature={1} component={Home} />
                    <PrivateRoute
                      path="/Search"
                      feature={2}
                      component={Search}
                    />
                    <PrivateRoute path="/Sarso" feature={3} component={Sarso} />
                    <PrivateRoute
                      path="/Norchoe"
                      feature={4}
                      component={Norchoe}
                    />
                    <PrivateRoute
                      path="/Bhorlak"
                      feature={5}
                      component={Bhorlak}
                    />
                    <PrivateRoute
                      path="/BookFull"
                      feature={6}
                      component={BookFull}
                    />
                    <PrivateRoute
                      path="/BriefGB"
                      feature={7}
                      component={BriefGB}
                    />
                    <PrivateRoute
                      path="/Abroad"
                      feature={8}
                      component={Abroad}
                    />
                    <PrivateRoute
                      path="/GiveGBID"
                      feature={9}
                      component={GivenGBID}
                    />
                    <PrivateRoute
                      path="/SarsoNewGBEntry"
                      feature={10}
                      component={SarsoNewGBEntry}
                    />
                    <PrivateRoute
                      path="/NewEntry/:FORMNO"
                      feature={10}
                      component={NewEntry}
                    />
                    <PrivateRoute
                      path="/NewGreenBookSerial"
                      feature={11}
                      component={NewGreenBookSerial}
                    />
                    <PrivateRoute
                      path="/GreenBookSerial"
                      feature={12}
                      component={GreenBookSerial}
                    />
                    <PrivateRoute
                      path="/Print"
                      feature={13}
                      component={Print}
                    />
                    <PrivateRoute
                      path="/IssueBook"
                      feature={14}
                      component={IssueBook}
                    />
                    <PrivateRoute
                      path="/MakeList"
                      feature={15}
                      component={MakeList}
                    />
                    <PrivateRoute
                      path="/Greenbooks"
                      feature={16}
                      component={Greenbook}
                    />
                    <PrivateRoute
                      path="/EditEntry/:GBID"
                      feature={16}
                      component={EditEntry}
                    />
                    <PrivateRoute
                      path="/DeleteGB"
                      feature={17}
                      component={DeleteGB}
                    />
                    <PrivateRoute
                      path="/Users"
                      feature={18}
                      component={Users}
                    />
                    <PrivateRoute
                      path="/FeatureRights"
                      feature={19}
                      component={FeatureUserrights}
                    />
                    <PrivateRoute
                      path="/UserRights"
                      feature={20}
                      component={UserRights}
                    />
                    <PrivateRoute
                      path="/Region"
                      feature={21}
                      component={Region}
                    />
                    <PrivateRoute
                      path="/AuthRegion"
                      feature={22}
                      component={AuthRegion}
                    />
                    <PrivateRoute
                      path="/Country"
                      feature={23}
                      component={Country}
                    />
                    <PrivateRoute
                      path="/Occupation"
                      feature={24}
                      component={Occupation}
                    />
                    <PrivateRoute
                      path="/Province"
                      feature={25}
                      component={Province}
                    />
                    <PrivateRoute
                      path="/Qualification"
                      feature={26}
                      component={Qualification}
                    />
                    <PrivateRoute
                      path="/Relation"
                      feature={27}
                      component={Relation}
                    />
                    <PrivateRoute
                      path="/Feature"
                      feature={28}
                      component={Feature}
                    />
                    <PrivateRoute
                      path="/MadebType"
                      feature={29}
                      component={MadebType}
                    />
                    <PrivateRoute
                      path="/TypeIssued"
                      feature={30}
                      component={TypeIssued}
                    />
                    <PrivateRoute
                      path="/ChatrelMaster"
                      feature={31}
                      component={ChatrelMaster}
                    />
                    <PrivateRoute
                      path="/CTAConfig"
                      feature={32}
                      component={CTAConfig}
                    />
                    <PrivateRoute
                      path="/Reports/GreenBookIssuedOverall"
                      feature={33}
                      component={ReportIssuedOverAll}
                      exact
                    />
                    <PrivateRoute
                      path="/Reports/GreenBookIssuedIndividual"
                      feature={34}
                      component={ReportIssuedIndividual}
                      exact
                    />
                    <PrivateRoute
                      path="/Reports/ChangesLog"
                      feature={35}
                      component={ReportChangesLog}
                      exact
                    />
                    <PrivateRoute
                      path="/Reports/ChildChangesLog"
                      feature={36}
                      component={ReportChildChangesLog}
                      exact
                    />
                    <PrivateRoute
                      path="/Reports/NewEntryFromDay"
                      feature={37}
                      component={ReportNewEntryFromDay}
                      exact
                    />
                    <PrivateRoute
                      path="/Reports/Below6Years"
                      feature={38}
                      component={ReportBelow6Years}
                      exact
                    />
                    <PrivateRoute
                      path="/Reports/Deceased"
                      feature={39}
                      component={ReportDeceased}
                      exact
                    />
                    <PrivateRoute
                      path="/Reports/Madeb/Sarso"
                      feature={40}
                      component={ReportMadebSarso}
                      exact
                    />
                    <PrivateRoute
                      path="/Reports/Madeb/Norchoe"
                      feature={41}
                      component={ReportMadebNorchoe}
                      exact
                    />
                    <PrivateRoute
                      path="/Reports/Madeb/Abroad"
                      feature={42}
                      component={ReportMadebAbroad}
                      exact
                    />
                    <PrivateRoute
                      path="/Reports/Madeb/BriefGB"
                      feature={43}
                      component={ReportMadebBriefGB}
                      exact
                    />
                    <PrivateRoute
                      path="/Reports/Madeb/BookFull"
                      feature={44}
                      component={ReportMadebBookFull}
                      exact
                    />
                    <PrivateRoute
                      path="/Reports/Madeb/Bhorlak"
                      feature={45}
                      component={ReportMadebBhorlak}
                      exact
                    />
                    <PrivateRoute
                      path="/ChangePassword"
                      feature={46}
                      component={ChangePassword}
                    />
                    <PrivateRoute
                      path="/Reports/DeletedGB"
                      feature={47}
                      component={ReportDeletedGB}
                      exact
                    />
                    <PrivateRoute
                      path="/Chatrel/ChatrelList"
                      feature={48}
                      component={ChatrelList}
                      exact
                    />
                    <PrivateRoute
                      path="/Chatrel/ChatrelListSearch"
                      feature={48}
                      component={ChatrelListSearch}
                      exact
                    />
                    <PrivateRoute
                      path="/Chatrel/ChatrelReceipt"
                      feature={49}
                      component={ChatrelReceipt}
                      exact
                    />
                    <PrivateRoute
                      path="/Chatrel/SearchUsers"
                      feature={50}
                      component={ChatrelSearchUsers}
                      exact
                    />
                    <PrivateRoute
                      path="/Chatrel/BulkImport"
                      feature={51}
                      component={ChatrelBulkUpload}
                      exact
                    />
                    <PrivateRoute
                      path="/Chatrel/Report"
                      feature={52}
                      component={ChatrelReport}
                      exact
                    />
                    {/* <Route path="/Chatrel" component={Chatrel} exact /> */}
                    {/* <Route path="/Chatrel/ChatrelDefaulterReport" component={ChatrelDefaulterList} exact /> */}
                    <PrivateRoute
                      path="/Chatrel/ChatrelDefaulterReport"
                      feature={52}
                      component={ChatrelDefaulterList}
                      exact
                    />
                    {/* <Route path="/ChatrelPay" component={ChatrelPay} exact />
                    <Route
                      path="/ChatrelPay/MainPage"
                      component={MainPage}
                      exact
                    />
                    <Route
                      path="/ChatrelPay/PaymentPage"
                      component={PaymentPage}
                      exact
                    /> */}
                  </motion.div>
                </Switch>
              </LeftSidebar>
            </Route>

            {/*<Route
              path={[
                     '/PageCalendar',
                     '/PageChat',
                     '/PageProjects',
                     '/PageFileManager',
                     '/PageProfile'
              ]}>
              <CollapsedSidebar>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/PageCalendar" component={PageCalendar} />
                    <Route path="/PageChat" component={PageChat} />
                    <Route path="/PageProjects" component={PageProjects} />
                    <Route
                      path="/PageFileManager"
                      component={PageFileManager}
                    />
                    <Route path="/PageProfile" component={PageProfile} /> 
                  </motion.div>
                </Switch>
              </CollapsedSidebar>
            </Route>*/}
          </Switch>
          <Dialog open={sessionTimeout} onClose={logout} classes={{ paper: 'shadow-xl-first rounded' }}>
                            <div className="text-center p-5">
                                <div className="avatar-icon-wrapper rounded-circle m-0">
                                    <div className="d-inline-flex justify-content-center p-0 rounded-circle btn-icon avatar-icon-wrapper bg-neutral-first text-first m-0 d-130">
                                        <FontAwesomeIcon icon={['fas', 'hourglass-end']} className="d-flex align-self-center display-3"/>
                                    </div>
                                </div>
                                <h4 className="font-weight-bold mt-4">Session Timeout</h4>
                                <p className="mb-0 text-black-50">Your session has timed out. Please sign in again.</p>
                                <div className="pt-4">
                                    <Button onClick={logout} className="btn-outline-first border-1 m-2" variant="outlined">
                                        <span className="btn-wrapper--label">
                                            Close
                    </span>
                                    </Button>
                                   
                                </div>
                            </div>
                        </Dialog>
        </Suspense>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Routes;
