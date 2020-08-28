import React from 'react';

import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PinDropIcon from '@material-ui/icons/PinDrop';
import EmailIcon from '@material-ui/icons/Email';
import ExtensionIcon from '@material-ui/icons/Extension';
import MenuIcon from '@material-ui/icons/Menu';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import InfoIcon from '@material-ui/icons/Info';
import BuildIcon from '@material-ui/icons/Build';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import PaletteIcon from '@material-ui/icons/Palette';
import PersonIcon from '@material-ui/icons/Person';
import EventNoteIcon from '@material-ui/icons/EventNote';
import FaceIcon from '@material-ui/icons/Face';
import ChatIcon from '@material-ui/icons/Chat';
import DateRangeIcon from '@material-ui/icons/DateRange';

import themes from './themes';

export const configuredTheme = themes[0].theme;

export const configuredLayout = {
  currentLayout: 'classic',
  notificationsOpen: false
};

const iconStyle = {
  fontSize: 16
};

export const menuItems = [{
  title: 'Dashboards',
  icon: <HomeIcon style={iconStyle} />,
  children: [{
    title: 'Analytics',
    href: '/',
    icon: <DashboardIcon style={iconStyle} />
  }, {
    title: 'Ecommerce',
    href: '/dashboards/ecommerce',
    icon: <ShoppingCartIcon style={iconStyle} />
  }, {
    title: 'Crypto',
    href: '/dashboards/crypto',
    icon: <EuroSymbolIcon style={iconStyle} />
  }, {
    title: 'Project',
    href: '/dashboards/project',
    icon: <EventNoteIcon style={iconStyle} />
  }
]
}, {
  title: 'Theming',
  href: '/theming',
  icon: <BuildIcon style={iconStyle} />
}, {
  title: 'APPS',
  type: 'header'
}, {
  title: 'Apps',
  icon: <DesktopWindowsIcon style={iconStyle} />,
  children: [{
    title: 'Email',
    href: '/apps/email',
    icon: <EmailIcon style={iconStyle} />
  }, {
    title: 'Todo',
    href: '/apps/todo',
    icon: <CheckCircleIcon style={iconStyle} />
  }, {
    title: 'Maps',
    href: '/apps/maps',
    icon: <PinDropIcon style={iconStyle} />
  }, {
    title: 'Calendar',
    href: '/apps/calendar',
    icon: <DateRangeIcon style={iconStyle} />
  }, {
    title: 'Notes',
    href: '/apps/notes',
    icon: <EventNoteIcon style={iconStyle} />
  }, {
    title: 'Contacts',
    href: '/apps/contacts',
    icon: <FaceIcon style={iconStyle} />
  }, {
    title: 'Chat',
    href: '/apps/chat',
    icon: <ChatIcon style={iconStyle} />
  }]
}, {
  title: 'USER INTERFACE',
  type: 'header'
}, {
  title: 'Typography',
  href: '/pages/typography',
  icon: <TextFormatIcon style={iconStyle} />
}, {
  title: 'Colors',
  href: '/pages/colors',
  icon: <PaletteIcon style={iconStyle} />
}, {
  title: 'ELEMENTS',
  type: 'header'
}, {
  title: 'Form Controls',
  icon: <ExtensionIcon style={iconStyle} />,
  children: [{
    title: 'Autocomplete',
    href: '/elements/autocomplete'
  }, {
    title: 'Selection Controls',
    href: '/elements/selection-controls'
  }, {
    title: 'Picker',
    href: '/elements/picker'
  }, {
    title: 'Text Fields',
    href: '/elements/text-fields'
  }, {
    title: 'Selects',
    href: '/elements/selects'
  }]
}, {
  title: 'Navigation',
  icon: <MenuIcon style={iconStyle} />,
  children: [{
    title: 'App Bar',
    href: '/elements/app-bar'
  }, {
    title: 'Menu',
    href: '/elements/menu'
  }]
}, {
  title: 'Layout',
  icon: <ViewModuleIcon style={iconStyle} />,
  children: [{
    title: 'List',
    href: '/elements/list'
  }, {
    title: 'Cards',
    href: '/elements/cards'
  }, {
    title: 'Paper',
    href: '/elements/paper'
  }, {
    title: 'Avatars',
    href: '/elements/avatars'
  }, {
    title: 'Steppers',
    href: '/elements/steppers'
  }]
}, {
  title: 'Buttons & Indicators',
  icon: <InfoIcon style={iconStyle} />,
  children: [{
    title: 'Buttons',
    href: '/elements/buttons'
  }, {
    title: 'Progress',
    href: '/elements/progress'
  }]
}, {
  title: 'PAGES',
  type: 'header'
}, {
  title: 'Authentication',
  icon: <PersonIcon style={iconStyle} />,
  children: [{
    title: 'Login',
    href: '/login'
  }, {
    title: 'Register',
    href: '/register'
  }, {
    title: 'Forgot Password',
    href: '/forgot-password'
  }, {
    title: 'Profile',
    href: '/profile'
  }, {
    title: 'Lock Screen',
    href: '/lock'
  }]
}, {
  title: 'Errors',
  icon: <InfoIcon style={iconStyle} />,
  children: [{
    title: '404',
    href: '/errors/404'
  }, {
    title: '500',
    href: '/errors/500'
  }]
}];
