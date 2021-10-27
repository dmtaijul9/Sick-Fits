import PropTypes from 'prop-types';
import Router from 'next/router';
import Nprogress from 'nprogress';
import Page from '../components/Page';

// TODO: Swap with our own
import '../components/styles/nprogress.css';

Router.events.on('routeChangeStart', () => Nprogress.start());
Router.events.on('routeChangeComplete', () => Nprogress.done());
Router.events.on('routeChangeError', () => Nprogress.done());
export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}

MyApp.propTypes = {
  pageProps: PropTypes.any,
  Component: PropTypes.any,
};
