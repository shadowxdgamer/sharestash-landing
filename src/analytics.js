import ReactGA from 'react-ga4';

const TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 ID

export const initGA = () => {
  ReactGA.initialize(TRACKING_ID);
};

export const trackDownload = (version, assetName) => {
  ReactGA.event({
    category: 'Download',
    action: 'APK Download',
    label: `${version} - ${assetName}`,
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
