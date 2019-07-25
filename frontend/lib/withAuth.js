import React, { Component } from 'react';
import cookies from 'next-cookies';

// Gets the display name of a JSX component for dev tools
const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

const _withAuth = WrappedComponent => class withAuth extends Component {
  static displayname = `withAuth(${getDisplayName(WrappedComponent)})`;

  static async getInitialProps(ctx) {
    const { jwt } = cookies(ctx);

    // SSR auth check only takes place on initial page load
    /*
      Questions:
      What if token expires
      What if token is blacklisted
      
    */
    if (ctx.req && !jwt) {
      // redirect to login page if no jwt present
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
