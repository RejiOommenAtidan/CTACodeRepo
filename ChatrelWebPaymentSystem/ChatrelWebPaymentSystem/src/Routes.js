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

// Example Pages

import DashboardMonitoring from './example-pages/DashboardMonitoring';
import DashboardCommerce from './example-pages/DashboardCommerce';
import DashboardAnalytics from './example-pages/DashboardAnalytics';
import DashboardStatistics from './example-pages/DashboardStatistics';
import ElementsAvatars from './example-pages/ElementsAvatars';
import ElementsBadges from './example-pages/ElementsBadges';
import ElementsButtons from './example-pages/ElementsButtons';
import ElementsDropdowns from './example-pages/ElementsDropdowns';
import ElementsIcons from './example-pages/ElementsIcons';
import ElementsNavigationMenus from './example-pages/ElementsNavigationMenus';
import ElementsPagination from './example-pages/ElementsPagination';
import ElementsProgressBars from './example-pages/ElementsProgressBars';
import ElementsRatings from './example-pages/ElementsRatings';
import ElementsRibbons from './example-pages/ElementsRibbons';
import ElementsScrollable from './example-pages/ElementsScrollable';
import ElementsSearchBars from './example-pages/ElementsSearchBars';
import ElementsTimelines from './example-pages/ElementsTimelines';
import ElementsUtilitiesHelpers from './example-pages/ElementsUtilitiesHelpers';
import BlocksChartsLarge from './example-pages/BlocksChartsLarge';
import BlocksChartsSmall from './example-pages/BlocksChartsSmall';
import BlocksComposed from './example-pages/BlocksComposed';
import BlocksContentText from './example-pages/BlocksContentText';
import BlocksGrids from './example-pages/BlocksGrids';
import BlocksIcons from './example-pages/BlocksIcons';
import BlocksImages from './example-pages/BlocksImages';
import BlocksListsLarge from './example-pages/BlocksListsLarge';
import BlocksListsSmall from './example-pages/BlocksListsSmall';
import BlocksNavigation from './example-pages/BlocksNavigation';
import BlocksProfilesSmall from './example-pages/BlocksProfilesSmall';
import BlocksProgressCircular from './example-pages/BlocksProgressCircular';
import BlocksProgressHorizontal from './example-pages/BlocksProgressHorizontal';
import BlocksSparklinesLarge from './example-pages/BlocksSparklinesLarge';
import BlocksSparklinesSmall from './example-pages/BlocksSparklinesSmall';
import BlocksStatistics from './example-pages/BlocksStatistics';
import MarketingCta from './example-pages/MarketingCta';
import MarketingFeatureSections from './example-pages/MarketingFeatureSections';
import MarketingFooters from './example-pages/MarketingFooters';
import MarketingHeaders from './example-pages/MarketingHeaders';
import MarketingHero from './example-pages/MarketingHero';
import MarketingIcons from './example-pages/MarketingIcons';
import MarketingPartners from './example-pages/MarketingPartners';
import MarketingPricingTables from './example-pages/MarketingPricingTables';
import MarketingTestimonials from './example-pages/MarketingTestimonials';
import WidgetsAccordions from './example-pages/WidgetsAccordions';
import WidgetsCalendars from './example-pages/WidgetsCalendars';
import WidgetsCarousels from './example-pages/WidgetsCarousels';
import WidgetsContextMenus from './example-pages/WidgetsContextMenus';
import WidgetsCountup from './example-pages/WidgetsCountup';
import WidgetsDragDrop from './example-pages/WidgetsDragDrop';
import WidgetsModals from './example-pages/WidgetsModals';
import WidgetsNotifications from './example-pages/WidgetsNotifications';
import WidgetsPopovers from './example-pages/WidgetsPopovers';
import WidgetsTabs from './example-pages/WidgetsTabs';
import WidgetsTooltips from './example-pages/WidgetsTooltips';
import WidgetsTreeView from './example-pages/WidgetsTreeView';
import FormsToggleSwitch from './example-pages/FormsToggleSwitch';

const WidgetsGuidedTours = lazy(() =>
  import('./example-pages/WidgetsGuidedTours')
);
const WidgetsImageCrop = lazy(() => import('./example-pages/WidgetsImageCrop'));
const WidgetsLoadingIndicators = lazy(() =>
  import('./example-pages/WidgetsLoadingIndicators')
);
const ChartsApex = lazy(() => import('./example-pages/ChartsApex'));
const ChartsGauges = lazy(() => import('./example-pages/ChartsGauges'));
const Chartjs = lazy(() => import('./example-pages/Chartjs'));
const ChartsSparklines = lazy(() => import('./example-pages/ChartsSparklines'));
const FormsControls = lazy(() => import('./example-pages/FormsControls'));
const FormsClipboard = lazy(() => import('./example-pages/FormsClipboard'));
const FormsColorpicker = lazy(() => import('./example-pages/FormsColorpicker'));
const FormsDatepicker = lazy(() => import('./example-pages/FormsDatepicker'));
const FormsDualListbox = lazy(() => import('./example-pages/FormsDualListbox'));
const FormsInputMask = lazy(() => import('./example-pages/FormsInputMask'));
const FormsInputSelect = lazy(() => import('./example-pages/FormsInputSelect'));
const FormsSlider = lazy(() => import('./example-pages/FormsSlider'));
const FormsSteppers = lazy(() => import('./example-pages/FormsSteppers'));
const FormsTextareaAutosize = lazy(() =>
  import('./example-pages/FormsTextareaAutosize')
);
const FormsTimepicker = lazy(() => import('./example-pages/FormsTimepicker'));
const FormsTypeahead = lazy(() => import('./example-pages/FormsTypeahead'));
const FormsUpload = lazy(() => import('./example-pages/FormsUpload'));
const FormsValidation = lazy(() => import('./example-pages/FormsValidation'));
const FormsWysiwygEditor = lazy(() =>
  import('./example-pages/FormsWysiwygEditor')
);
const PageAuthModals = lazy(() => import('./example-pages/PageAuthModals'));
const PageLoginBasic = lazy(() => import('./example-pages/PageLoginBasic'));
const PageLoginCover = lazy(() => import('./example-pages/PageLoginCover'));
const PageLoginIllustration = lazy(() =>
  import('./example-pages/PageLoginIllustration')
);
const PageLoginOverlay = lazy(() => import('./example-pages/PageLoginOverlay'));
const PageRegisterBasic = lazy(() =>
  import('./example-pages/PageRegisterBasic')
);
const PageRegisterCover = lazy(() =>
  import('./example-pages/PageRegisterCover')
);
const PageRegisterIllustration = lazy(() =>
  import('./example-pages/PageRegisterIllustration')
);
const PageRegisterOverlay = lazy(() =>
  import('./example-pages/PageRegisterOverlay')
);
const PageRecoverBasic = lazy(() => import('./example-pages/PageRecoverBasic'));
const PageRecoverCover = lazy(() => import('./example-pages/PageRecoverCover'));
const PageRecoverIllustration = lazy(() =>
  import('./example-pages/PageRecoverIllustration')
);
const PageRecoverOverlay = lazy(() =>
  import('./example-pages/PageRecoverOverlay')
);
const Overview = lazy(() => import('./example-pages/Overview'));
const Tables = lazy(() => import('./example-pages/Tables'));
const Maps = lazy(() => import('./example-pages/Maps'));
const PageCalendar = lazy(() => import('./example-pages/PageCalendar'));
const PageChat = lazy(() => import('./example-pages/PageChat'));
const PageProjects = lazy(() => import('./example-pages/PageProjects'));
const PageFileManager = lazy(() => import('./example-pages/PageFileManager'));
const PageProfile = lazy(() => import('./example-pages/PageProfile'));
const PageInvoice = lazy(() => import('./example-pages/PageInvoice'));
const PageError404 = lazy(() => import('./example-pages/PageError404'));
const PageError500 = lazy(() => import('./example-pages/PageError500'));
const PageError505 = lazy(() => import('./example-pages/PageError505'));

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
            <Redirect exact from="/" to="/Overview" />
            <Route path={['/Overview']}>
              <PresentationLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/Overview" component={Overview} />
                  </motion.div>
                </Switch>
              </PresentationLayout>
            </Route>

            <Route
              path={[
                '/PageLoginBasic',
                '/PageLoginCover',
                '/PageLoginIllustration',
                '/PageLoginOverlay',
                '/PageRegisterBasic',
                '/PageRegisterCover',
                '/PageRegisterIllustration',
                '/PageRegisterOverlay',
                '/PageRecoverBasic',
                '/PageRecoverCover',
                '/PageRecoverIllustration',
                '/PageRecoverOverlay',
                '/PageError404',
                '/PageError500',
                '/PageError505'
              ]}>
              <MinimalLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/PageLoginBasic" component={PageLoginBasic} />
                    <Route path="/PageLoginCover" component={PageLoginCover} />
                    <Route
                      path="/PageLoginIllustration"
                      component={PageLoginIllustration}
                    />
                    <Route
                      path="/PageLoginOverlay"
                      component={PageLoginOverlay}
                    />
                    <Route
                      path="/PageRegisterBasic"
                      component={PageRegisterBasic}
                    />
                    <Route
                      path="/PageRegisterCover"
                      component={PageRegisterCover}
                    />
                    <Route
                      path="/PageRegisterIllustration"
                      component={PageRegisterIllustration}
                    />
                    <Route
                      path="/PageRegisterOverlay"
                      component={PageRegisterOverlay}
                    />
                    <Route
                      path="/PageRecoverBasic"
                      component={PageRecoverBasic}
                    />
                    <Route
                      path="/PageRecoverCover"
                      component={PageRecoverCover}
                    />
                    <Route
                      path="/PageRecoverIllustration"
                      component={PageRecoverIllustration}
                    />
                    <Route
                      path="/PageRecoverOverlay"
                      component={PageRecoverOverlay}
                    />
                    <Route path="/PageError404" component={PageError404} />
                    <Route path="/PageError500" component={PageError500} />
                    <Route path="/PageError505" component={PageError505} />
                  </motion.div>
                </Switch>
              </MinimalLayout>
            </Route>

            <Route
              path={[
                '/DashboardMonitoring',
                '/DashboardCommerce',
                '/DashboardAnalytics',
                '/DashboardStatistics',
                '/ElementsAvatars',
                '/ElementsBadges',
                '/ElementsButtons',
                '/ElementsDropdowns',
                '/ElementsIcons',
                '/ElementsNavigationMenus',
                '/ElementsPagination',
                '/ElementsProgressBars',
                '/ElementsRatings',
                '/ElementsRibbons',
                '/ElementsScrollable',
                '/ElementsSearchBars',
                '/ElementsTimelines',
                '/ElementsUtilitiesHelpers',
                '/BlocksChartsLarge',
                '/BlocksChartsSmall',
                '/BlocksComposed',
                '/BlocksContentText',
                '/BlocksGrids',
                '/BlocksIcons',
                '/BlocksImages',
                '/BlocksListsLarge',
                '/BlocksListsSmall',
                '/BlocksNavigation',
                '/BlocksProfilesSmall',
                '/BlocksProgressCircular',
                '/BlocksProgressHorizontal',
                '/BlocksSparklinesLarge',
                '/BlocksSparklinesSmall',
                '/BlocksStatistics',
                '/MarketingCta',
                '/MarketingFeatureSections',
                '/MarketingFooters',
                '/MarketingHeaders',
                '/MarketingHero',
                '/MarketingIcons',
                '/MarketingPartners',
                '/MarketingPricingTables',
                '/MarketingTestimonials',
                '/WidgetsAccordions',
                '/WidgetsCalendars',
                '/WidgetsCarousels',
                '/WidgetsContextMenus',
                '/WidgetsCountup',
                '/WidgetsDragDrop',
                '/WidgetsGuidedTours',
                '/WidgetsImageCrop',
                '/WidgetsLoadingIndicators',
                '/WidgetsModals',
                '/WidgetsNotifications',
                '/WidgetsPopovers',
                '/WidgetsTabs',
                '/WidgetsTooltips',
                '/WidgetsTreeView',
                '/ChartsApex',
                '/ChartsGauges',
                '/Chartjs',
                '/ChartsSparklines',
                '/FormsControls',
                '/FormsClipboard',
                '/FormsColorpicker',
                '/FormsDatepicker',
                '/FormsDualListbox',
                '/FormsInputMask',
                '/FormsInputSelect',
                '/FormsSlider',
                '/FormsSteppers',
                '/FormsTextareaAutosize',
                '/FormsTimepicker',
                '/FormsToggleSwitch',
                '/FormsTypeahead',
                '/FormsUpload',
                '/FormsValidation',
                '/FormsWysiwygEditor',
                '/PageAuthModals',
                '/Tables',
                '/Maps',
                '/PageInvoice'
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
                      path="/DashboardMonitoring"
                      component={DashboardMonitoring}
                    />
                    <Route
                      path="/DashboardCommerce"
                      component={DashboardCommerce}
                    />
                    <Route
                      path="/DashboardAnalytics"
                      component={DashboardAnalytics}
                    />
                    <Route
                      path="/DashboardStatistics"
                      component={DashboardStatistics}
                    />
                    <Route
                      path="/ElementsAvatars"
                      component={ElementsAvatars}
                    />
                    <Route path="/ElementsBadges" component={ElementsBadges} />
                    <Route
                      path="/ElementsButtons"
                      component={ElementsButtons}
                    />
                    <Route
                      path="/ElementsDropdowns"
                      component={ElementsDropdowns}
                    />
                    <Route path="/ElementsIcons" component={ElementsIcons} />
                    <Route
                      path="/ElementsNavigationMenus"
                      component={ElementsNavigationMenus}
                    />
                    <Route
                      path="/ElementsPagination"
                      component={ElementsPagination}
                    />
                    <Route
                      path="/ElementsProgressBars"
                      component={ElementsProgressBars}
                    />
                    <Route
                      path="/ElementsRatings"
                      component={ElementsRatings}
                    />
                    <Route
                      path="/ElementsRibbons"
                      component={ElementsRibbons}
                    />
                    <Route
                      path="/ElementsScrollable"
                      component={ElementsScrollable}
                    />
                    <Route
                      path="/ElementsSearchBars"
                      component={ElementsSearchBars}
                    />
                    <Route
                      path="/ElementsTimelines"
                      component={ElementsTimelines}
                    />
                    <Route
                      path="/ElementsUtilitiesHelpers"
                      component={ElementsUtilitiesHelpers}
                    />
                    <Route
                      path="/BlocksChartsLarge"
                      component={BlocksChartsLarge}
                    />
                    <Route
                      path="/BlocksChartsSmall"
                      component={BlocksChartsSmall}
                    />
                    <Route path="/BlocksComposed" component={BlocksComposed} />
                    <Route
                      path="/BlocksContentText"
                      component={BlocksContentText}
                    />
                    <Route path="/BlocksGrids" component={BlocksGrids} />
                    <Route path="/BlocksIcons" component={BlocksIcons} />
                    <Route path="/BlocksImages" component={BlocksImages} />
                    <Route
                      path="/BlocksListsLarge"
                      component={BlocksListsLarge}
                    />
                    <Route
                      path="/BlocksListsSmall"
                      component={BlocksListsSmall}
                    />
                    <Route
                      path="/BlocksNavigation"
                      component={BlocksNavigation}
                    />
                    <Route
                      path="/BlocksProfilesSmall"
                      component={BlocksProfilesSmall}
                    />
                    <Route
                      path="/BlocksProgressCircular"
                      component={BlocksProgressCircular}
                    />
                    <Route
                      path="/BlocksProgressHorizontal"
                      component={BlocksProgressHorizontal}
                    />
                    <Route
                      path="/BlocksSparklinesLarge"
                      component={BlocksSparklinesLarge}
                    />
                    <Route
                      path="/BlocksSparklinesSmall"
                      component={BlocksSparklinesSmall}
                    />
                    <Route
                      path="/BlocksStatistics"
                      component={BlocksStatistics}
                    />
                    <Route path="/MarketingCta" component={MarketingCta} />
                    <Route
                      path="/MarketingFeatureSections"
                      component={MarketingFeatureSections}
                    />
                    <Route
                      path="/MarketingFooters"
                      component={MarketingFooters}
                    />
                    <Route
                      path="/MarketingHeaders"
                      component={MarketingHeaders}
                    />
                    <Route path="/MarketingHero" component={MarketingHero} />
                    <Route path="/MarketingIcons" component={MarketingIcons} />
                    <Route
                      path="/MarketingPartners"
                      component={MarketingPartners}
                    />
                    <Route
                      path="/MarketingPricingTables"
                      component={MarketingPricingTables}
                    />
                    <Route
                      path="/MarketingTestimonials"
                      component={MarketingTestimonials}
                    />
                    <Route
                      path="/WidgetsAccordions"
                      component={WidgetsAccordions}
                    />
                    <Route
                      path="/WidgetsCalendars"
                      component={WidgetsCalendars}
                    />
                    <Route
                      path="/WidgetsCarousels"
                      component={WidgetsCarousels}
                    />
                    <Route
                      path="/WidgetsContextMenus"
                      component={WidgetsContextMenus}
                    />
                    <Route path="/WidgetsCountup" component={WidgetsCountup} />
                    <Route
                      path="/WidgetsDragDrop"
                      component={WidgetsDragDrop}
                    />
                    <Route
                      path="/WidgetsGuidedTours"
                      component={WidgetsGuidedTours}
                    />
                    <Route
                      path="/WidgetsImageCrop"
                      component={WidgetsImageCrop}
                    />
                    <Route
                      path="/WidgetsLoadingIndicators"
                      component={WidgetsLoadingIndicators}
                    />
                    <Route path="/WidgetsModals" component={WidgetsModals} />
                    <Route
                      path="/WidgetsNotifications"
                      component={WidgetsNotifications}
                    />
                    <Route
                      path="/WidgetsPopovers"
                      component={WidgetsPopovers}
                    />
                    <Route path="/WidgetsTabs" component={WidgetsTabs} />
                    <Route
                      path="/WidgetsTooltips"
                      component={WidgetsTooltips}
                    />
                    <Route
                      path="/WidgetsTreeView"
                      component={WidgetsTreeView}
                    />
                    <Route path="/ChartsApex" component={ChartsApex} />
                    <Route path="/ChartsGauges" component={ChartsGauges} />
                    <Route path="/Chartjs" component={Chartjs} />
                    <Route
                      path="/ChartsSparklines"
                      component={ChartsSparklines}
                    />
                    <Route path="/FormsControls" component={FormsControls} />
                    <Route path="/FormsClipboard" component={FormsClipboard} />
                    <Route
                      path="/FormsColorpicker"
                      component={FormsColorpicker}
                    />
                    <Route
                      path="/FormsDatepicker"
                      component={FormsDatepicker}
                    />
                    <Route
                      path="/FormsDualListbox"
                      component={FormsDualListbox}
                    />
                    <Route path="/FormsInputMask" component={FormsInputMask} />
                    <Route
                      path="/FormsInputSelect"
                      component={FormsInputSelect}
                    />
                    <Route path="/FormsSlider" component={FormsSlider} />
                    <Route path="/FormsSteppers" component={FormsSteppers} />
                    <Route
                      path="/FormsTextareaAutosize"
                      component={FormsTextareaAutosize}
                    />
                    <Route
                      path="/FormsTimepicker"
                      component={FormsTimepicker}
                    />
                    <Route
                      path="/FormsToggleSwitch"
                      component={FormsToggleSwitch}
                    />
                    <Route path="/FormsTypeahead" component={FormsTypeahead} />
                    <Route path="/FormsUpload" component={FormsUpload} />
                    <Route
                      path="/FormsValidation"
                      component={FormsValidation}
                    />
                    <Route
                      path="/FormsWysiwygEditor"
                      component={FormsWysiwygEditor}
                    />
                    <Route path="/PageAuthModals" component={PageAuthModals} />
                    <Route path="/Tables" component={Tables} />
                    <Route path="/Maps" component={Maps} />
                    <Route path="/PageInvoice" component={PageInvoice} />
                  </motion.div>
                </Switch>
              </LeftSidebar>
            </Route>

            <Route
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
            </Route>
          </Switch>
        </Suspense>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Routes;
