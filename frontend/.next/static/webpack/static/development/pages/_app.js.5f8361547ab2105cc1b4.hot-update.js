webpackHotUpdate("static\\development\\pages\\_app.js",{

/***/ "./lib/withApollo.js":
/*!***************************!*\
  !*** ./lib/withApollo.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ "./node_modules/@babel/runtime-corejs2/core-js/promise.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var apollo_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! apollo-client */ "./node_modules/apollo-client/bundle.esm.js");
/* harmony import */ var apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! apollo-cache-inmemory */ "./node_modules/apollo-cache-inmemory/lib/bundle.esm.js");
/* harmony import */ var apollo_link_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! apollo-link-http */ "./node_modules/apollo-link-http/lib/bundle.esm.js");
/* harmony import */ var apollo_link_error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! apollo-link-error */ "./node_modules/apollo-link-error/lib/bundle.esm.js");
/* harmony import */ var apollo_link__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! apollo-link */ "./node_modules/apollo-link/lib/bundle.esm.js");
/* harmony import */ var next_with_apollo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next-with-apollo */ "./node_modules/next-with-apollo/lib/index.js");
/* harmony import */ var next_with_apollo__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_with_apollo__WEBPACK_IMPORTED_MODULE_9__);







 // import { withClientState } from 'apollo-link-state';



var cache = new apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_5__["InMemoryCache"]();

var request =
/*#__PURE__*/
function () {
  var _ref = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])(
  /*#__PURE__*/
  _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee(operation) {
    return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // set custom headers in here
            console.log(operation);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function request(_x) {
    return _ref.apply(this, arguments);
  };
}();

var requestLink = new apollo_link__WEBPACK_IMPORTED_MODULE_8__["ApolloLink"](function (operation, forward) {
  return new apollo_link__WEBPACK_IMPORTED_MODULE_8__["Observable"](function (observer) {
    var handle;

    _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(operation).then(function (oper) {
      return request(oper);
    }).then(function () {
      handle = forward(operation).subscribe({
        next: observer.next.bind(observer),
        error: observer.error.bind(observer),
        complete: observer.complete.bind(observer)
      });
    })["catch"](observer.error.bind(observer));

    return function () {
      if (handle) handle.unsubscribe();
    };
  });
});

function createClient(_ref2) {
  var ctx = _ref2.ctx,
      headers = _ref2.headers,
      initialState = _ref2.initialState;
  return new apollo_client__WEBPACK_IMPORTED_MODULE_4__["ApolloClient"]({
    link: apollo_link__WEBPACK_IMPORTED_MODULE_8__["ApolloLink"].from([Object(apollo_link_error__WEBPACK_IMPORTED_MODULE_7__["onError"])(function (_ref3) {
      var operation = _ref3.operation,
          response = _ref3.response,
          graphQLErrors = _ref3.graphQLErrors,
          networkError = _ref3.networkError;

      if (graphQLErrors) {
        var _graphQLErrors = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(graphQLErrors, 1),
            error = _graphQLErrors[0]; // todo

      }

      if (networkError) {
        console.log(networkError); // todo
      }
    }), requestLink, new apollo_link_http__WEBPACK_IMPORTED_MODULE_6__["HttpLink"]({
      uri: 'http://localhost:1989/graphql',
      credentials: 'include'
    })]),
    cache: cache,
    ssrMode: true
  });
}

/* harmony default export */ __webpack_exports__["default"] = (next_with_apollo__WEBPACK_IMPORTED_MODULE_9___default()(createClient));

/***/ })

})
//# sourceMappingURL=_app.js.5f8361547ab2105cc1b4.hot-update.js.map