import React from 'react';
import { Route, Switch } from 'react-router-dom';

import asyncComponent from './components/async.component';
import Classic from './layouts/layout-classic/layout-classic.component';
import Compact from './layouts/layout-compact/layout-compact.component';
import Toolbar from './layouts/layout-toolbar/layout-toolbar.component';
import Boxed from './layouts/layout-boxed/layout-boxed.component';
import Funky from './layouts/layout-funky/layout-funky.component';
import Tabbed from './layouts/layout-tabbed/layout-tabbed.component';
import NoLayout from './layouts/layout-none/layout-none.component';

// DASHBOARD ROUTE




// EXAMPLE ROUTES


// AUTHENTICATION ROUTES
const AsyncLogin = asyncComponent(() => import('./containers/authentication/login/login.component'));

// ERROR ROUTES




const AsyncMasterPage = asyncComponent(() => import('./containers/master/masterpage.component'));
const AsyncAddMadebPage = asyncComponent(() => import('./containers/madeb/addmadeb.component'));
const AsyncListMadebPage = asyncComponent(() => import('./containers/madeb/listmadeb.component'));



const AsyncSarsoMadebPage = asyncComponent(() => import('./containers/madeb/sarsomadeb.component'));
const AsyncNorchoeMadebPage = asyncComponent(() => import('./containers/madeb/norchoemadeb.component'));
const AsyncBhorlakMadebPage = asyncComponent(() => import('./containers/madeb/bhorlakmadeb.component'));
const AsyncBookFullPage = asyncComponent(() => import('./containers/madeb/bookfull.component'));
const AsyncBriefGBPage = asyncComponent(() => import('./containers/madeb/briefgb.component'));
const AsyncAbroadPage = asyncComponent(() => import('./containers/madeb/abroad.component'));




const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

const ClassicLayout = props => (
  <Classic>{props.children}</Classic>
);

const CompactLayout = props => (
  <Compact>{props.children}</Compact>
);

const ToolbarLayout = props => (
  <Toolbar>{props.children}</Toolbar>
);

const BoxedLayout = props => (
  <Boxed>{props.children}</Boxed>
);

const FunkyLayout = props => (
  <Funky>{props.children}</Funky>
);

const TabbedLayout = props => (
  <Tabbed>{props.children}</Tabbed>
);

// TODO: Consider looping through an object containing all routes
export default ({ childProps, layout }) => {
  let activeLayout;
  switch (layout.currentLayout) {
  case 'classic':
    activeLayout = ClassicLayout;
    break;
  case 'compact':
    activeLayout = CompactLayout;
    break;
  case 'toolbar':
    activeLayout = ToolbarLayout;
    break;
  case 'boxed':
    activeLayout = BoxedLayout;
    break;
  case 'funky':
    activeLayout = FunkyLayout;
    break;
  case 'tabbed':
    activeLayout = TabbedLayout;
    break;
  default:
    activeLayout = ClassicLayout;
  }

 

  return (
    <Switch>
      <AppRoute path="/" exact component={AsyncMasterPage} props={childProps} layout={activeLayout} />
      <AppRoute path="/madeb/add" exact component={AsyncAddMadebPage} props={childProps} layout={activeLayout} />
      <AppRoute path="/madeb/list" exact component={AsyncListMadebPage} props={childProps} layout={activeLayout} />
      <AppRoute path="/madeb/sarso" exact component={AsyncSarsoMadebPage} props={childProps} layout={activeLayout} />
      <AppRoute path="/madeb/norchoe" exact component={AsyncNorchoeMadebPage} props={childProps} layout={activeLayout} />
      <AppRoute path="/madeb/bhorlak" exact component={AsyncBhorlakMadebPage} props={childProps} layout={activeLayout} />
      <AppRoute path="/madeb/bookfull" exact component={AsyncBookFullPage} props={childProps} layout={activeLayout} />
      <AppRoute path="/madeb/briefgb" exact component={AsyncBriefGBPage} props={childProps} layout={activeLayout} />
      <AppRoute path="/madeb/abroad" exact component={AsyncAbroadPage} props={childProps} layout={activeLayout} />
     
      <AppRoute path="/login" exact component={AsyncLogin} props={childProps} layout={NoLayout} />
  
    </Switch>);
};
