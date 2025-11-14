import ReactGA from 'react-ga4';

// Safe to be public - it's client-side anyway
const TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || 'G-XXXXXXXXXX';

export const initGA = () => {
  ReactGA.initialize(TRACKING_ID, {
    gaOptions: {
      siteSpeedSampleRate: 100,
    },
  });
};

export const trackDownload = (version, assetName) => {
  ReactGA.event({
    category: 'Download',
    action: 'APK Download',
    label: `${version} - ${assetName}`,
    value: 1,
  });
  
  // Also track as a conversion event
  ReactGA.event('download', {
    version: version,
    asset: assetName,
  });
};

export const trackButtonClick = (buttonName) => {
  ReactGA.event({
    category: 'User Interaction',
    action: 'Button Click',
    label: buttonName,
  });
};

export const trackPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

export const trackOutboundLink = (url, label) => {
  ReactGA.event({
    category: 'Outbound Link',
    action: 'Click',
    label: label || url,
  });
};
