import React, { Component } from 'react';
import cookies from 'next-cookies';
import Router from 'next/router';

// Gets the display name of a JSX component for dev tools
const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

const _withAuth = WrappedComponent => class withAuth extends Component {
  static displayname = `withAuth(${getDisplayName(WrappedComponent)})`;

  static async getInitialProps(ctx) {
    const { token } = cookies(ctx);

    // Server side only
    if (ctx.req && !token) {
      // redirect to login page if no token present
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
    }

    const componentProps = WrappedComponent.getInitialProps && await WrappedComponent.getInitialProps(ctx);

    return { ...componentProps };
  }

  handleError = (error) => {
    // redirect if UNAUTHENTICATED
    if (error.message === 'GraphQL error: You must be logged in to view this content') {
      if (typeof window !== 'undefined') {
        Router.push('/login');
      }
    }
  }

  render() {
    return <WrappedComponent {...this.props} onError={this.handleError} />;
  }
};

export default _withAuth;
