webpackHotUpdate("static\\development\\pages\\_app.js",{

/***/ "./lib/init-apollo.js":
/*!****************************!*\
  !*** ./lib/init-apollo.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return initApollo; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var apollo_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-client */ "./node_modules/apollo-client/bundle.esm.js");
/* harmony import */ var apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-cache-inmemory */ "./node_modules/apollo-cache-inmemory/lib/bundle.esm.js");
/* harmony import */ var apollo_link_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! apollo-link-http */ "./node_modules/apollo-link-http/lib/bundle.esm.js");
/* harmony import */ var apollo_link_error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! apollo-link-error */ "./node_modules/apollo-link-error/lib/bundle.esm.js");
/* harmony import */ var apollo_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! apollo-link */ "./node_modules/apollo-link/lib/bundle.esm.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! isomorphic-unfetch */ "./node_modules/isomorphic-unfetch/browser.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_6__);







var apolloClient = null;

function create(initialState, _ref) {
  var cookies = _ref.cookies;
  // initialState is the cache data returned from Apollo's getDataFromTree
  var isBrowser = "object" !== 'undefined';
  var cache = new apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_2__["InMemoryCache"]().restore(initialState || {});
  return new apollo_client__WEBPACK_IMPORTED_MODULE_1__["ApolloClient"]({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: apollo_link__WEBPACK_IMPORTED_MODULE_5__["ApolloLink"].from([Object(apollo_link_error__WEBPACK_IMPORTED_MODULE_4__["onError"])(function (_ref2) {
      var operation = _ref2.operation,
          response = _ref2.response,
          graphQLErrors = _ref2.graphQLErrors,
          networkError = _ref2.networkError;

      if (graphQLErrors) {
        // logout client on unauthenticated
        graphQLErrors.forEach(function (error) {
          if (error.extensions.code === 'UNAUTHENTICATED') {
            if (isBrowser) console.log(window.history);
          }
        });
      }

      if (networkError) {// todo
      }
    }), new apollo_link__WEBPACK_IMPORTED_MODULE_5__["ApolloLink"](function (operation, forward) {
      operation.setContext(function (_ref3) {
        var headers = _ref3.headers;
        if (!cookies) return {
          headers: headers
        };
        return {
          headers: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, headers, {
            Cookie: cookies
          })
        };
      });
      return forward(operation);
    }), new apollo_link_http__WEBPACK_IMPORTED_MODULE_3__["HttpLink"]({
      uri: 'http://localhost:1989/graphql',
      credentials: 'include',
      fetch: !isBrowser && isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_6___default.a
    })]),
    cache: cache,
    defaultOptions: {
      query: {
        fetchPolicy: 'cache-and-network'
      }
    }
  });
}

function initApollo(initialState) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections
  if (false) {} // Reuse client on the client-side


  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}

/***/ })

})
//# sourceMappingURL=_app.js.4f47c19d0698b3c0f36d.hot-update.js.map