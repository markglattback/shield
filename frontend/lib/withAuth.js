import React, { Component } from 'react';
import cookies from 'next-cookies';

// Gets the display name of a JSX component for dev tools
const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

const _withAuth = WrappedComponent => class withAuth extends Component {
  static displayname = `withAuth(${getDisplayName(WrappedComponent)})`;

  static async getInitialProps(ctx) {
    const { token } = cookies(ctx);
    const { pathname, query } = ctx;
    console.log('pathname: ', pathname);
    console.log('query: ', query);

    // Server side only
    if (ctx.req && !token) {
      // redirect to login page if no token present
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
    }

    const componentProps = WrappedComponent.getInitialProps && await WrappedComponent.getInitialProps(ctx);

    return { ...componentProps };
  }
    
  render() {
    return <WrappedComponent {...this.props} />;
  }
};

export default _withAuth;
