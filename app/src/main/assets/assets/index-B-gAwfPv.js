(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production;
function requireReactJsxRuntime_production() {
  if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
  hasRequiredReactJsxRuntime_production = 1;
  var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
  function jsxProd(type, config, maybeKey) {
    var key = null;
    void 0 !== maybeKey && (key = "" + maybeKey);
    void 0 !== config.key && (key = "" + config.key);
    if ("key" in config) {
      maybeKey = {};
      for (var propName in config)
        "key" !== propName && (maybeKey[propName] = config[propName]);
    } else maybeKey = config;
    config = maybeKey.ref;
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      key,
      ref: void 0 !== config ? config : null,
      props: maybeKey
    };
  }
  reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
  reactJsxRuntime_production.jsx = jsxProd;
  reactJsxRuntime_production.jsxs = jsxProd;
  return reactJsxRuntime_production;
}
var hasRequiredJsxRuntime;
function requireJsxRuntime() {
  if (hasRequiredJsxRuntime) return jsxRuntime.exports;
  hasRequiredJsxRuntime = 1;
  {
    jsxRuntime.exports = requireReactJsxRuntime_production();
  }
  return jsxRuntime.exports;
}
var jsxRuntimeExports = requireJsxRuntime();
var react = { exports: {} };
var react_production = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReact_production;
function requireReact_production() {
  if (hasRequiredReact_production) return react_production;
  hasRequiredReact_production = 1;
  var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
  function getIteratorFn(maybeIterable) {
    if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
    maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
    return "function" === typeof maybeIterable ? maybeIterable : null;
  }
  var ReactNoopUpdateQueue = {
    isMounted: function() {
      return false;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, assign = Object.assign, emptyObject = {};
  function Component(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject;
    this.updater = updater || ReactNoopUpdateQueue;
  }
  Component.prototype.isReactComponent = {};
  Component.prototype.setState = function(partialState, callback) {
    if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, partialState, callback, "setState");
  };
  Component.prototype.forceUpdate = function(callback) {
    this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
  };
  function ComponentDummy() {
  }
  ComponentDummy.prototype = Component.prototype;
  function PureComponent(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject;
    this.updater = updater || ReactNoopUpdateQueue;
  }
  var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
  pureComponentPrototype.constructor = PureComponent;
  assign(pureComponentPrototype, Component.prototype);
  pureComponentPrototype.isPureReactComponent = true;
  var isArrayImpl = Array.isArray;
  function noop() {
  }
  var ReactSharedInternals = { H: null, A: null, T: null, S: null }, hasOwnProperty = Object.prototype.hasOwnProperty;
  function ReactElement(type, key, props) {
    var refProp = props.ref;
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      key,
      ref: void 0 !== refProp ? refProp : null,
      props
    };
  }
  function cloneAndReplaceKey(oldElement, newKey) {
    return ReactElement(oldElement.type, newKey, oldElement.props);
  }
  function isValidElement(object) {
    return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function escape(key) {
    var escaperLookup = { "=": "=0", ":": "=2" };
    return "$" + key.replace(/[=:]/g, function(match) {
      return escaperLookup[match];
    });
  }
  var userProvidedKeyEscapeRegex = /\/+/g;
  function getElementKey(element, index) {
    return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
  }
  function resolveThenable(thenable) {
    switch (thenable.status) {
      case "fulfilled":
        return thenable.value;
      case "rejected":
        throw thenable.reason;
      default:
        switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
          function(fulfilledValue) {
            "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
          },
          function(error) {
            "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
          }
        )), thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
        }
    }
    throw thenable;
  }
  function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
    var type = typeof children;
    if ("undefined" === type || "boolean" === type) children = null;
    var invokeCallback = false;
    if (null === children) invokeCallback = true;
    else
      switch (type) {
        case "bigint":
        case "string":
        case "number":
          invokeCallback = true;
          break;
        case "object":
          switch (children.$$typeof) {
            case REACT_ELEMENT_TYPE:
            case REACT_PORTAL_TYPE:
              invokeCallback = true;
              break;
            case REACT_LAZY_TYPE:
              return invokeCallback = children._init, mapIntoArray(
                invokeCallback(children._payload),
                array,
                escapedPrefix,
                nameSoFar,
                callback
              );
          }
      }
    if (invokeCallback)
      return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
        return c;
      })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(
        callback,
        escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(
          userProvidedKeyEscapeRegex,
          "$&/"
        ) + "/") + invokeCallback
      )), array.push(callback)), 1;
    invokeCallback = 0;
    var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
    if (isArrayImpl(children))
      for (var i = 0; i < children.length; i++)
        nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
          nameSoFar,
          array,
          escapedPrefix,
          type,
          callback
        );
    else if (i = getIteratorFn(children), "function" === typeof i)
      for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
        nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
          nameSoFar,
          array,
          escapedPrefix,
          type,
          callback
        );
    else if ("object" === type) {
      if ("function" === typeof children.then)
        return mapIntoArray(
          resolveThenable(children),
          array,
          escapedPrefix,
          nameSoFar,
          callback
        );
      array = String(children);
      throw Error(
        "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return invokeCallback;
  }
  function mapChildren(children, func, context) {
    if (null == children) return children;
    var result = [], count = 0;
    mapIntoArray(children, result, "", "", function(child) {
      return func.call(context, child, count++);
    });
    return result;
  }
  function lazyInitializer(payload) {
    if (-1 === payload._status) {
      var ctor = payload._result, thenable = ctor();
      thenable.then(
        function(moduleObject) {
          if (0 === payload._status || -1 === payload._status)
            payload._status = 1, payload._result = moduleObject, void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
        },
        function(error) {
          if (0 === payload._status || -1 === payload._status)
            payload._status = 2, payload._result = error, void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
        }
      );
      -1 === payload._status && (payload._status = 0, payload._result = thenable);
    }
    if (1 === payload._status) return payload._result.default;
    throw payload._result;
  }
  var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
    if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
      var event = new window.ErrorEvent("error", {
        bubbles: true,
        cancelable: true,
        message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
        error
      });
      if (!window.dispatchEvent(event)) return;
    } else if ("object" === typeof process && "function" === typeof process.emit) {
      process.emit("uncaughtException", error);
      return;
    }
    console.error(error);
  };
  function startTransition(scope) {
    var prevTransition = ReactSharedInternals.T, currentTransition = {};
    currentTransition.types = null !== prevTransition ? prevTransition.types : null;
    ReactSharedInternals.T = currentTransition;
    try {
      var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
      null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
      "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
    } catch (error) {
      reportGlobalError(error);
    } finally {
      null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
    }
  }
  function addTransitionType(type) {
    var transition = ReactSharedInternals.T;
    if (null !== transition) {
      var transitionTypes = transition.types;
      null === transitionTypes ? transition.types = [type] : -1 === transitionTypes.indexOf(type) && transitionTypes.push(type);
    } else startTransition(addTransitionType.bind(null, type));
  }
  var Children = {
    map: mapChildren,
    forEach: function(children, forEachFunc, forEachContext) {
      mapChildren(
        children,
        function() {
          forEachFunc.apply(this, arguments);
        },
        forEachContext
      );
    },
    count: function(children) {
      var n = 0;
      mapChildren(children, function() {
        n++;
      });
      return n;
    },
    toArray: function(children) {
      return mapChildren(children, function(child) {
        return child;
      }) || [];
    },
    only: function(children) {
      if (!isValidElement(children))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return children;
    }
  };
  react_production.Activity = REACT_ACTIVITY_TYPE;
  react_production.Children = Children;
  react_production.Component = Component;
  react_production.Fragment = REACT_FRAGMENT_TYPE;
  react_production.Profiler = REACT_PROFILER_TYPE;
  react_production.PureComponent = PureComponent;
  react_production.StrictMode = REACT_STRICT_MODE_TYPE;
  react_production.Suspense = REACT_SUSPENSE_TYPE;
  react_production.ViewTransition = REACT_VIEW_TRANSITION_TYPE;
  react_production.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
  react_production.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(size) {
      return ReactSharedInternals.H.useMemoCache(size);
    }
  };
  react_production.addTransitionType = addTransitionType;
  react_production.cache = function(fn) {
    return function() {
      return fn.apply(null, arguments);
    };
  };
  react_production.cacheSignal = function() {
    return null;
  };
  react_production.cloneElement = function(element, config, children) {
    if (null === element || void 0 === element)
      throw Error(
        "The argument must be a React element, but you passed " + element + "."
      );
    var props = assign({}, element.props), key = element.key;
    if (null != config)
      for (propName in void 0 !== config.key && (key = "" + config.key), config)
        !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
    var propName = arguments.length - 2;
    if (1 === propName) props.children = children;
    else if (1 < propName) {
      for (var childArray = Array(propName), i = 0; i < propName; i++)
        childArray[i] = arguments[i + 2];
      props.children = childArray;
    }
    return ReactElement(element.type, key, props);
  };
  react_production.createContext = function(defaultValue) {
    defaultValue = {
      $$typeof: REACT_CONTEXT_TYPE,
      _currentValue: defaultValue,
      _currentValue2: defaultValue,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    };
    defaultValue.Provider = defaultValue;
    defaultValue.Consumer = {
      $$typeof: REACT_CONSUMER_TYPE,
      _context: defaultValue
    };
    return defaultValue;
  };
  react_production.createElement = function(type, config, children) {
    var propName, props = {}, key = null;
    if (null != config)
      for (propName in void 0 !== config.key && (key = "" + config.key), config)
        hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
    var childrenLength = arguments.length - 2;
    if (1 === childrenLength) props.children = children;
    else if (1 < childrenLength) {
      for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
        childArray[i] = arguments[i + 2];
      props.children = childArray;
    }
    if (type && type.defaultProps)
      for (propName in childrenLength = type.defaultProps, childrenLength)
        void 0 === props[propName] && (props[propName] = childrenLength[propName]);
    return ReactElement(type, key, props);
  };
  react_production.createRef = function() {
    return { current: null };
  };
  react_production.forwardRef = function(render) {
    return { $$typeof: REACT_FORWARD_REF_TYPE, render };
  };
  react_production.isValidElement = isValidElement;
  react_production.lazy = function(ctor) {
    return {
      $$typeof: REACT_LAZY_TYPE,
      _payload: { _status: -1, _result: ctor },
      _init: lazyInitializer
    };
  };
  react_production.memo = function(type, compare) {
    return {
      $$typeof: REACT_MEMO_TYPE,
      type,
      compare: void 0 === compare ? null : compare
    };
  };
  react_production.startTransition = startTransition;
  react_production.unstable_useCacheRefresh = function() {
    return ReactSharedInternals.H.useCacheRefresh();
  };
  react_production.use = function(usable) {
    return ReactSharedInternals.H.use(usable);
  };
  react_production.useActionState = function(action, initialState, permalink) {
    return ReactSharedInternals.H.useActionState(action, initialState, permalink);
  };
  react_production.useCallback = function(callback, deps) {
    return ReactSharedInternals.H.useCallback(callback, deps);
  };
  react_production.useContext = function(Context) {
    return ReactSharedInternals.H.useContext(Context);
  };
  react_production.useDebugValue = function() {
  };
  react_production.useDeferredValue = function(value, initialValue) {
    return ReactSharedInternals.H.useDeferredValue(value, initialValue);
  };
  react_production.useEffect = function(create, deps) {
    return ReactSharedInternals.H.useEffect(create, deps);
  };
  react_production.useEffectEvent = function(callback) {
    return ReactSharedInternals.H.useEffectEvent(callback);
  };
  react_production.useId = function() {
    return ReactSharedInternals.H.useId();
  };
  react_production.useImperativeHandle = function(ref, create, deps) {
    return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
  };
  react_production.useInsertionEffect = function(create, deps) {
    return ReactSharedInternals.H.useInsertionEffect(create, deps);
  };
  react_production.useLayoutEffect = function(create, deps) {
    return ReactSharedInternals.H.useLayoutEffect(create, deps);
  };
  react_production.useMemo = function(create, deps) {
    return ReactSharedInternals.H.useMemo(create, deps);
  };
  react_production.useOptimistic = function(passthrough, reducer) {
    return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
  };
  react_production.useReducer = function(reducer, initialArg, init) {
    return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
  };
  react_production.useRef = function(initialValue) {
    return ReactSharedInternals.H.useRef(initialValue);
  };
  react_production.useState = function(initialState) {
    return ReactSharedInternals.H.useState(initialState);
  };
  react_production.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
    return ReactSharedInternals.H.useSyncExternalStore(
      subscribe,
      getSnapshot,
      getServerSnapshot
    );
  };
  react_production.useTransition = function() {
    return ReactSharedInternals.H.useTransition();
  };
  react_production.version = "19.3.1";
  return react_production;
}
var hasRequiredReact;
function requireReact() {
  if (hasRequiredReact) return react.exports;
  hasRequiredReact = 1;
  {
    react.exports = requireReact_production();
  }
  return react.exports;
}
var reactExports = requireReact();
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
var client = { exports: {} };
var reactDomClient_production = {};
var scheduler = { exports: {} };
var scheduler_production = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredScheduler_production;
function requireScheduler_production() {
  if (hasRequiredScheduler_production) return scheduler_production;
  hasRequiredScheduler_production = 1;
  (function(exports) {
    function push(heap, node) {
      var index = heap.length;
      heap.push(node);
      a: for (; 0 < index; ) {
        var parentIndex = index - 1 >>> 1, parent = heap[parentIndex];
        if (0 < compare(parent, node))
          heap[parentIndex] = node, heap[index] = parent, index = parentIndex;
        else break a;
      }
    }
    function peek(heap) {
      return 0 === heap.length ? null : heap[0];
    }
    function pop(heap) {
      if (0 === heap.length) return null;
      var first = heap[0], last = heap.pop();
      if (last !== first) {
        heap[0] = last;
        a: for (var index = 0, length = heap.length, halfLength = length >>> 1; index < halfLength; ) {
          var leftIndex = 2 * (index + 1) - 1, left = heap[leftIndex], rightIndex = leftIndex + 1, right = heap[rightIndex];
          if (0 > compare(left, last))
            rightIndex < length && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);
          else if (rightIndex < length && 0 > compare(right, last))
            heap[index] = right, heap[rightIndex] = last, index = rightIndex;
          else break a;
        }
      }
      return first;
    }
    function compare(a, b) {
      var diff = a.sortIndex - b.sortIndex;
      return 0 !== diff ? diff : a.id - b.id;
    }
    exports.unstable_now = void 0;
    if ("object" === typeof performance && "function" === typeof performance.now) {
      var localPerformance = performance;
      exports.unstable_now = function() {
        return localPerformance.now();
      };
    } else {
      var localDate = Date, initialTime = localDate.now();
      exports.unstable_now = function() {
        return localDate.now() - initialTime;
      };
    }
    var taskQueue = [], timerQueue = [], taskIdCounter = 1, currentTask = null, currentPriorityLevel = 3, isPerformingWork = false, isHostCallbackScheduled = false, isHostTimeoutScheduled = false, needsPaint = false, localSetTimeout = "function" === typeof setTimeout ? setTimeout : null, localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null, localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null;
    function advanceTimers(currentTime) {
      for (var timer = peek(timerQueue); null !== timer; ) {
        if (null === timer.callback) pop(timerQueue);
        else if (timer.startTime <= currentTime)
          pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);
        else break;
        timer = peek(timerQueue);
      }
    }
    function handleTimeout(currentTime) {
      isHostTimeoutScheduled = false;
      advanceTimers(currentTime);
      if (!isHostCallbackScheduled)
        if (null !== peek(taskQueue))
          isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline());
        else {
          var firstTimer = peek(timerQueue);
          null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
        }
    }
    var isMessageLoopRunning = false, taskTimeoutID = -1, frameInterval = 5, startTime = -1;
    function shouldYieldToHost() {
      return needsPaint ? true : exports.unstable_now() - startTime < frameInterval ? false : true;
    }
    function performWorkUntilDeadline() {
      needsPaint = false;
      if (isMessageLoopRunning) {
        var currentTime = exports.unstable_now();
        startTime = currentTime;
        var hasMoreWork = true;
        try {
          a: {
            isHostCallbackScheduled = false;
            isHostTimeoutScheduled && (isHostTimeoutScheduled = false, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
            isPerformingWork = true;
            var previousPriorityLevel = currentPriorityLevel;
            try {
              b: {
                advanceTimers(currentTime);
                for (currentTask = peek(taskQueue); null !== currentTask && !(currentTask.expirationTime > currentTime && shouldYieldToHost()); ) {
                  var callback = currentTask.callback;
                  if ("function" === typeof callback) {
                    currentTask.callback = null;
                    currentPriorityLevel = currentTask.priorityLevel;
                    var continuationCallback = callback(
                      currentTask.expirationTime <= currentTime
                    );
                    currentTime = exports.unstable_now();
                    if ("function" === typeof continuationCallback) {
                      currentTask.callback = continuationCallback;
                      advanceTimers(currentTime);
                      hasMoreWork = true;
                      break b;
                    }
                    currentTask === peek(taskQueue) && pop(taskQueue);
                    advanceTimers(currentTime);
                  } else pop(taskQueue);
                  currentTask = peek(taskQueue);
                }
                if (null !== currentTask) hasMoreWork = true;
                else {
                  var firstTimer = peek(timerQueue);
                  null !== firstTimer && requestHostTimeout(
                    handleTimeout,
                    firstTimer.startTime - currentTime
                  );
                  hasMoreWork = false;
                }
              }
              break a;
            } finally {
              currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = false;
            }
            hasMoreWork = void 0;
          }
        } finally {
          hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = false;
        }
      }
    }
    var schedulePerformWorkUntilDeadline;
    if ("function" === typeof localSetImmediate)
      schedulePerformWorkUntilDeadline = function() {
        localSetImmediate(performWorkUntilDeadline);
      };
    else if ("undefined" !== typeof MessageChannel) {
      var channel = new MessageChannel(), port = channel.port2;
      channel.port1.onmessage = performWorkUntilDeadline;
      schedulePerformWorkUntilDeadline = function() {
        port.postMessage(null);
      };
    } else
      schedulePerformWorkUntilDeadline = function() {
        localSetTimeout(performWorkUntilDeadline, 0);
      };
    function requestHostTimeout(callback, ms) {
      taskTimeoutID = localSetTimeout(function() {
        callback(exports.unstable_now());
      }, ms);
    }
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(task) {
      task.callback = null;
    };
    exports.unstable_forceFrameRate = function(fps) {
      0 > fps || 125 < fps ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return currentPriorityLevel;
    };
    exports.unstable_next = function(eventHandler) {
      switch (currentPriorityLevel) {
        case 1:
        case 2:
        case 3:
          var priorityLevel = 3;
          break;
        default:
          priorityLevel = currentPriorityLevel;
      }
      var previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = priorityLevel;
      try {
        return eventHandler();
      } finally {
        currentPriorityLevel = previousPriorityLevel;
      }
    };
    exports.unstable_requestPaint = function() {
      needsPaint = true;
    };
    exports.unstable_runWithPriority = function(priorityLevel, eventHandler) {
      switch (priorityLevel) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          priorityLevel = 3;
      }
      var previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = priorityLevel;
      try {
        return eventHandler();
      } finally {
        currentPriorityLevel = previousPriorityLevel;
      }
    };
    exports.unstable_scheduleCallback = function(priorityLevel, callback, options) {
      var currentTime = exports.unstable_now();
      "object" === typeof options && null !== options ? (options = options.delay, options = "number" === typeof options && 0 < options ? currentTime + options : currentTime) : options = currentTime;
      switch (priorityLevel) {
        case 1:
          var timeout = -1;
          break;
        case 2:
          timeout = 250;
          break;
        case 5:
          timeout = 1073741823;
          break;
        case 4:
          timeout = 1e4;
          break;
        default:
          timeout = 5e3;
      }
      timeout = options + timeout;
      priorityLevel = {
        id: taskIdCounter++,
        callback,
        priorityLevel,
        startTime: options,
        expirationTime: timeout,
        sortIndex: -1
      };
      options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = true, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline())));
      return priorityLevel;
    };
    exports.unstable_shouldYield = shouldYieldToHost;
    exports.unstable_wrapCallback = function(callback) {
      var parentPriorityLevel = currentPriorityLevel;
      return function() {
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = parentPriorityLevel;
        try {
          return callback.apply(this, arguments);
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      };
    };
  })(scheduler_production);
  return scheduler_production;
}
var hasRequiredScheduler;
function requireScheduler() {
  if (hasRequiredScheduler) return scheduler.exports;
  hasRequiredScheduler = 1;
  {
    scheduler.exports = requireScheduler_production();
  }
  return scheduler.exports;
}
var reactDom = { exports: {} };
var reactDom_production = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactDom_production;
function requireReactDom_production() {
  if (hasRequiredReactDom_production) return reactDom_production;
  hasRequiredReactDom_production = 1;
  var React2 = requireReact();
  function formatProdErrorMessage(code) {
    var url = "https://react.dev/errors/" + code;
    if (1 < arguments.length) {
      url += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++)
        url += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function noop() {
  }
  var Internals = {
    d: {
      f: noop,
      r: function() {
        throw Error(formatProdErrorMessage(522));
      },
      D: noop,
      C: noop,
      L: noop,
      m: noop,
      X: noop,
      S: noop,
      M: noop
    },
    p: 0,
    findDOMNode: null
  }, REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_RECOVERABLE_TYPE = Symbol.for("react.recoverable"), REACT_OPTIMISTIC_KEY = Symbol.for("react.optimistic_key");
  function createPortal$1(children, containerInfo, implementation) {
    var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return {
      $$typeof: REACT_PORTAL_TYPE,
      key: null == key ? null : key === REACT_OPTIMISTIC_KEY ? REACT_OPTIMISTIC_KEY : "" + key,
      children,
      containerInfo,
      implementation
    };
  }
  var ReactSharedInternals = React2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function getCrossOriginStringAs(as, input) {
    if ("font" === as) return "";
    if ("string" === typeof input)
      return "use-credentials" === input ? input : "";
  }
  reactDom_production.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
  reactDom_production.browser = function(reason) {
    return { $$typeof: REACT_RECOVERABLE_TYPE, _reason: reason };
  };
  reactDom_production.createPortal = function(children, container) {
    var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType)
      throw Error(formatProdErrorMessage(299));
    return createPortal$1(children, container, null, key);
  };
  reactDom_production.flushSync = function(fn) {
    var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
    try {
      if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
    } finally {
      ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
    }
  };
  reactDom_production.preconnect = function(href, options) {
    "string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
  };
  reactDom_production.prefetchDNS = function(href) {
    "string" === typeof href && Internals.d.D(href);
  };
  reactDom_production.preinit = function(href, options) {
    if ("string" === typeof href && options && "string" === typeof options.as) {
      var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
      "style" === as ? Internals.d.S(
        href,
        "string" === typeof options.precedence ? options.precedence : void 0,
        {
          crossOrigin,
          integrity,
          fetchPriority
        }
      ) : "script" === as && Internals.d.X(href, {
        crossOrigin,
        integrity,
        fetchPriority,
        nonce: "string" === typeof options.nonce ? options.nonce : void 0
      });
    }
  };
  reactDom_production.preinitModule = function(href, options) {
    if ("string" === typeof href)
      if ("object" === typeof options && null !== options) {
        if (null == options.as || "script" === options.as) {
          var crossOrigin = getCrossOriginStringAs(
            options.as,
            options.crossOrigin
          );
          Internals.d.M(href, {
            crossOrigin,
            integrity: "string" === typeof options.integrity ? options.integrity : void 0,
            nonce: "string" === typeof options.nonce ? options.nonce : void 0,
            fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0
          });
        }
      } else null == options && Internals.d.M(href);
  };
  reactDom_production.preload = function(href, options) {
    if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
      var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
      Internals.d.L(href, as, {
        crossOrigin,
        integrity: "string" === typeof options.integrity ? options.integrity : void 0,
        nonce: "string" === typeof options.nonce ? options.nonce : void 0,
        type: "string" === typeof options.type ? options.type : void 0,
        fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
        referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
        imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
        imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
        media: "string" === typeof options.media ? options.media : void 0
      });
    }
  };
  reactDom_production.preloadModule = function(href, options) {
    if ("string" === typeof href)
      if (options) {
        var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
        Internals.d.m(href, {
          as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
          crossOrigin,
          integrity: "string" === typeof options.integrity ? options.integrity : void 0,
          nonce: "string" === typeof options.nonce ? options.nonce : void 0,
          fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0
        });
      } else Internals.d.m(href);
  };
  reactDom_production.requestFormReset = function(form) {
    Internals.d.r(form);
  };
  reactDom_production.unstable_batchedUpdates = function(fn, a) {
    return fn(a);
  };
  reactDom_production.useFormState = function(action, initialState, permalink) {
    return ReactSharedInternals.H.useFormState(action, initialState, permalink);
  };
  reactDom_production.useFormStatus = function() {
    return ReactSharedInternals.H.useHostTransitionStatus();
  };
  reactDom_production.version = "19.3.1";
  return reactDom_production;
}
var hasRequiredReactDom;
function requireReactDom() {
  if (hasRequiredReactDom) return reactDom.exports;
  hasRequiredReactDom = 1;
  function checkDCE() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
      return;
    }
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
    } catch (err) {
      console.error(err);
    }
  }
  {
    checkDCE();
    reactDom.exports = requireReactDom_production();
  }
  return reactDom.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactDomClient_production;
function requireReactDomClient_production() {
  if (hasRequiredReactDomClient_production) return reactDomClient_production;
  hasRequiredReactDomClient_production = 1;
  var Scheduler = requireScheduler(), React2 = requireReact(), ReactDOM2 = requireReactDom();
  function formatProdErrorMessage(code) {
    var url = "https://react.dev/errors/" + code;
    if (1 < arguments.length) {
      url += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++)
        url += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function isValidContainer(node) {
    return !(!node || 1 !== node.nodeType && 9 !== node.nodeType && 11 !== node.nodeType);
  }
  function getNearestMountedFiber(fiber) {
    for (var node = fiber, nextNode = node; nextNode && !nextNode.alternate; )
      node = nextNode, 0 !== (node.flags & 4098) && (fiber = node.return), nextNode = node.return;
    for (; node.return; ) node = node.return;
    return 3 === node.tag ? fiber : null;
  }
  function getSuspenseInstanceFromFiber(fiber) {
    if (13 === fiber.tag) {
      var suspenseState = fiber.memoizedState;
      null === suspenseState && (fiber = fiber.alternate, null !== fiber && (suspenseState = fiber.memoizedState));
      if (null !== suspenseState) return suspenseState.dehydrated;
    }
    return null;
  }
  function getActivityInstanceFromFiber(fiber) {
    if (31 === fiber.tag) {
      var activityState = fiber.memoizedState;
      null === activityState && (fiber = fiber.alternate, null !== fiber && (activityState = fiber.memoizedState));
      if (null !== activityState) return activityState.dehydrated;
    }
    return null;
  }
  function assertIsMounted(fiber) {
    if (getNearestMountedFiber(fiber) !== fiber)
      throw Error(formatProdErrorMessage(188));
  }
  function findCurrentFiberUsingSlowPath(fiber) {
    var alternate = fiber.alternate;
    if (!alternate) {
      alternate = getNearestMountedFiber(fiber);
      if (null === alternate) throw Error(formatProdErrorMessage(188));
      return alternate !== fiber ? null : fiber;
    }
    for (var a = fiber, b = alternate; ; ) {
      var parentA = a.return;
      if (null === parentA) break;
      var parentB = parentA.alternate;
      if (null === parentB) {
        b = parentA.return;
        if (null !== b) {
          a = b;
          continue;
        }
        break;
      }
      if (parentA.child === parentB.child) {
        for (parentB = parentA.child; parentB; ) {
          if (parentB === a) return assertIsMounted(parentA), fiber;
          if (parentB === b) return assertIsMounted(parentA), alternate;
          parentB = parentB.sibling;
        }
        throw Error(formatProdErrorMessage(188));
      }
      if (a.return !== b.return) a = parentA, b = parentB;
      else {
        for (var didFindChild = false, child$0 = parentA.child; child$0; ) {
          if (child$0 === a) {
            didFindChild = true;
            a = parentA;
            b = parentB;
            break;
          }
          if (child$0 === b) {
            didFindChild = true;
            b = parentA;
            a = parentB;
            break;
          }
          child$0 = child$0.sibling;
        }
        if (!didFindChild) {
          for (child$0 = parentB.child; child$0; ) {
            if (child$0 === a) {
              didFindChild = true;
              a = parentB;
              b = parentA;
              break;
            }
            if (child$0 === b) {
              didFindChild = true;
              b = parentB;
              a = parentA;
              break;
            }
            child$0 = child$0.sibling;
          }
          if (!didFindChild) throw Error(formatProdErrorMessage(189));
        }
      }
      if (a.alternate !== b) throw Error(formatProdErrorMessage(190));
    }
    if (3 !== a.tag) throw Error(formatProdErrorMessage(188));
    return a.stateNode.current === a ? fiber : alternate;
  }
  function findCurrentHostFiberImpl(node) {
    var tag = node.tag;
    if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return node;
    for (node = node.child; null !== node; ) {
      tag = findCurrentHostFiberImpl(node);
      if (null !== tag) return tag;
      node = node.sibling;
    }
    return null;
  }
  function traverseVisibleInstancesAndTextInstances(child, searchWithinHosts, fn, a, b, c) {
    for (; null !== child; ) {
      if ((5 === child.tag || 27 === child.tag || 6 === child.tag) && fn(child, a, b, c) || (22 !== child.tag || null === child.memoizedState) && (searchWithinHosts || 5 !== child.tag && 27 !== child.tag) && traverseVisibleInstancesAndTextInstances(
        child.child,
        searchWithinHosts,
        fn,
        a,
        b,
        c
      ))
        return true;
      child = child.sibling;
    }
    return false;
  }
  function getFragmentParentInstanceOrContainerFiber(fiber) {
    for (fiber = fiber.return; null !== fiber; ) {
      if (3 === fiber.tag || 5 === fiber.tag || 27 === fiber.tag) return fiber;
      fiber = fiber.return;
    }
    return null;
  }
  function fiberIsPortaledIntoHost(fiber) {
    var foundPortalParent = false;
    for (fiber = fiber.return; null !== fiber; ) {
      4 === fiber.tag && (foundPortalParent = true);
      if (3 === fiber.tag || 5 === fiber.tag || 27 === fiber.tag) break;
      fiber = fiber.return;
    }
    return foundPortalParent;
  }
  function getFragmentInstanceOrTextInstanceSiblings(fiber) {
    var result = [null, null], parentHostFiber = getFragmentParentInstanceOrContainerFiber(fiber);
    if (null === parentHostFiber) return result;
    findFragmentInstanceOrTextInstanceSiblings(
      result,
      fiber,
      parentHostFiber.child,
      { foundSelf: false }
    );
    return result;
  }
  function findFragmentInstanceOrTextInstanceSiblings(result, self, child, state) {
    for (; null !== child; ) {
      if (child === self) state.foundSelf = true;
      else if (5 === child.tag || 27 === child.tag || 6 === child.tag) {
        if (state.foundSelf) return result[1] = child, true;
        result[0] = child;
      } else if ((22 !== child.tag || null === child.memoizedState) && findFragmentInstanceOrTextInstanceSiblings(
        result,
        self,
        child.child,
        state
      ))
        return true;
      child = child.sibling;
    }
    return false;
  }
  function getInstanceFromHostFiber(fiber) {
    switch (fiber.tag) {
      case 5:
      case 27:
      case 6:
        return fiber.stateNode;
      case 3:
        return fiber.stateNode.containerInfo;
      default:
        throw Error(formatProdErrorMessage(559));
    }
  }
  var searchTarget = null, searchBoundary = null;
  function isFiberPrecedingCheck(child, target, boundary) {
    return child === boundary ? true : child === target ? (searchTarget = child, true) : false;
  }
  function isFiberFollowingCheck(child, target, boundary) {
    return child === boundary ? (searchBoundary = child, false) : child === target ? (null !== searchBoundary && (searchTarget = child), true) : false;
  }
  function getParentForFragmentAncestors(inst) {
    if (null === inst) return null;
    do
      inst = null === inst ? null : inst.return;
    while (inst && 5 !== inst.tag && 27 !== inst.tag && 3 !== inst.tag);
    return inst ? inst : null;
  }
  function getLowestCommonAncestor(instA, instB, getParent2) {
    for (var depthA = 0, tempA = instA; tempA; tempA = getParent2(tempA)) depthA++;
    tempA = 0;
    for (var tempB = instB; tempB; tempB = getParent2(tempB)) tempA++;
    for (; 0 < depthA - tempA; ) instA = getParent2(instA), depthA--;
    for (; 0 < tempA - depthA; ) instB = getParent2(instB), tempA--;
    for (; depthA--; ) {
      if (instA === instB || null !== instB && instA === instB.alternate)
        return instA;
      instA = getParent2(instA);
      instB = getParent2(instB);
    }
    return null;
  }
  var assign = Object.assign, REACT_LEGACY_ELEMENT_TYPE = Symbol.for("react.element"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy");
  var REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_LEGACY_HIDDEN_TYPE = Symbol.for("react.legacy_hidden");
  var REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_RECOVERABLE_TYPE = Symbol.for("react.recoverable"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
  function getIteratorFn(maybeIterable) {
    if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
    maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
    return "function" === typeof maybeIterable ? maybeIterable : null;
  }
  var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
  function getComponentNameFromType(type) {
    if (null == type) return null;
    if ("function" === typeof type)
      return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
    if ("string" === typeof type) return type;
    switch (type) {
      case REACT_FRAGMENT_TYPE:
        return "Fragment";
      case REACT_PROFILER_TYPE:
        return "Profiler";
      case REACT_STRICT_MODE_TYPE:
        return "StrictMode";
      case REACT_SUSPENSE_TYPE:
        return "Suspense";
      case REACT_SUSPENSE_LIST_TYPE:
        return "SuspenseList";
      case REACT_ACTIVITY_TYPE:
        return "Activity";
      case REACT_VIEW_TRANSITION_TYPE:
        return "ViewTransition";
    }
    if ("object" === typeof type)
      switch (type.$$typeof) {
        case REACT_PORTAL_TYPE:
          return "Portal";
        case REACT_CONTEXT_TYPE:
          return type.displayName || "Context";
        case REACT_CONSUMER_TYPE:
          return (type._context.displayName || "Context") + ".Consumer";
        case REACT_FORWARD_REF_TYPE:
          var innerType = type.render;
          type = type.displayName;
          type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
          return type;
        case REACT_MEMO_TYPE:
          return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
        case REACT_LAZY_TYPE:
          innerType = type._payload;
          type = type._init;
          try {
            return getComponentNameFromType(type(innerType));
          } catch (x) {
          }
      }
    return null;
  }
  var isArrayImpl = Array.isArray, ReactSharedInternals = React2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ReactDOMSharedInternals = ReactDOM2.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, sharedNotPendingObject = {
    pending: false,
    data: null,
    method: null,
    action: null
  }, valueStack = [], index = -1;
  function createCursor(defaultValue) {
    return { current: defaultValue };
  }
  function pop(cursor) {
    0 > index || (cursor.current = valueStack[index], valueStack[index] = null, index--);
  }
  function push(cursor, value) {
    index++;
    valueStack[index] = cursor.current;
    cursor.current = value;
  }
  var contextStackCursor = createCursor(null), contextFiberStackCursor = createCursor(null), rootInstanceStackCursor = createCursor(null), hostTransitionProviderCursor = createCursor(null);
  function pushHostContainer(fiber, nextRootInstance) {
    push(rootInstanceStackCursor, nextRootInstance);
    push(contextFiberStackCursor, fiber);
    push(contextStackCursor, null);
    switch (nextRootInstance.nodeType) {
      case 9:
      case 11:
        fiber = (fiber = nextRootInstance.documentElement) ? (fiber = fiber.namespaceURI) ? getOwnHostContext(fiber) : 0 : 0;
        break;
      default:
        if (fiber = nextRootInstance.tagName, nextRootInstance = nextRootInstance.namespaceURI)
          nextRootInstance = getOwnHostContext(nextRootInstance), fiber = getChildHostContextProd(nextRootInstance, fiber);
        else
          switch (fiber) {
            case "svg":
              fiber = 1;
              break;
            case "math":
              fiber = 2;
              break;
            default:
              fiber = 0;
          }
    }
    pop(contextStackCursor);
    push(contextStackCursor, fiber);
  }
  function popHostContainer() {
    pop(contextStackCursor);
    pop(contextFiberStackCursor);
    pop(rootInstanceStackCursor);
  }
  function pushHostContext(fiber) {
    var stateHook = fiber.memoizedState;
    null !== stateHook && (HostTransitionContext._currentValue = stateHook.memoizedState, push(hostTransitionProviderCursor, fiber));
    stateHook = contextStackCursor.current;
    var JSCompiler_inline_result = getChildHostContextProd(stateHook, fiber.type);
    stateHook !== JSCompiler_inline_result && (push(contextFiberStackCursor, fiber), push(contextStackCursor, JSCompiler_inline_result));
  }
  function popHostContext(fiber) {
    contextFiberStackCursor.current === fiber && (pop(contextStackCursor), pop(contextFiberStackCursor));
    hostTransitionProviderCursor.current === fiber && (pop(hostTransitionProviderCursor), HostTransitionContext._currentValue = sharedNotPendingObject);
  }
  var prefix, suffix;
  function describeBuiltInComponentFrame(name) {
    if (void 0 === prefix)
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || "";
        suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return "\n" + prefix + name + suffix;
  }
  var reentry = false;
  function describeNativeComponentFrame(fn, construct) {
    if (!fn || reentry) return "";
    reentry = true;
    var previousPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var RunInRootFrame = {
        DetermineComponentFrameRoot: function() {
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if ("object" === typeof Reflect && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  var control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x$1) {
                  control = x$1;
                }
                Fake = false;
                try {
                  var prevProps = Object.getOwnPropertyDescriptor(
                    fn.prototype,
                    "props"
                  );
                  Object.defineProperty(fn.prototype, "props", {
                    configurable: true,
                    set: function() {
                      throw Error();
                    }
                  });
                  Fake = true;
                  new fn();
                } finally {
                  Fake && (void 0 !== prevProps ? Object.defineProperty(fn.prototype, "props", prevProps) : delete fn.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (x$2) {
                control = x$2;
              }
              (Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {
              });
            }
          } catch (sample) {
            if (sample && control && "string" === typeof sample.stack)
              return [sample.stack, control.stack];
          }
          return [null, null];
        }
      };
      RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var namePropDescriptor = Object.getOwnPropertyDescriptor(
        RunInRootFrame.DetermineComponentFrameRoot,
        "name"
      );
      namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(
        RunInRootFrame.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
      if (sampleStack && controlStack) {
        var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
        for (namePropDescriptor = RunInRootFrame = 0; RunInRootFrame < sampleLines.length && !sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot"); )
          RunInRootFrame++;
        for (; namePropDescriptor < controlLines.length && !controlLines[namePropDescriptor].includes(
          "DetermineComponentFrameRoot"
        ); )
          namePropDescriptor++;
        if (RunInRootFrame === sampleLines.length || namePropDescriptor === controlLines.length)
          for (RunInRootFrame = sampleLines.length - 1, namePropDescriptor = controlLines.length - 1; 1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]; )
            namePropDescriptor--;
        for (; 1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--)
          if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
            if (1 !== RunInRootFrame || 1 !== namePropDescriptor) {
              do
                if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                  var frame = "\n" + sampleLines[RunInRootFrame].replace(" at new ", " at ");
                  fn.displayName && frame.includes("<anonymous>") && (frame = frame.replace("<anonymous>", fn.displayName));
                  return frame;
                }
              while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
            }
            break;
          }
      }
    } finally {
      reentry = false, Error.prepareStackTrace = previousPrepareStackTrace;
    }
    return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(previousPrepareStackTrace) : "";
  }
  function describeFiber(fiber, childFiber) {
    switch (fiber.tag) {
      case 26:
      case 27:
      case 5:
        return describeBuiltInComponentFrame(fiber.type);
      case 16:
        return describeBuiltInComponentFrame("Lazy");
      case 13:
        return fiber.child !== childFiber && null !== childFiber ? describeBuiltInComponentFrame("Suspense Fallback") : describeBuiltInComponentFrame("Suspense");
      case 19:
        return describeBuiltInComponentFrame("SuspenseList");
      case 0:
      case 15:
        return describeNativeComponentFrame(fiber.type, false);
      case 11:
        return describeNativeComponentFrame(fiber.type.render, false);
      case 1:
        return describeNativeComponentFrame(fiber.type, true);
      case 31:
        return describeBuiltInComponentFrame("Activity");
      case 30:
        return describeBuiltInComponentFrame("ViewTransition");
      default:
        return "";
    }
  }
  function getStackByFiberInDevAndProd(workInProgress2) {
    try {
      var info = "", previous = null;
      do
        info += describeFiber(workInProgress2, previous), previous = workInProgress2, workInProgress2 = workInProgress2.return;
      while (workInProgress2);
      return info;
    } catch (x) {
      return "\nError generating stack: " + x.message + "\n" + x.stack;
    }
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty, scheduleCallback$3 = Scheduler.unstable_scheduleCallback, cancelCallback$1 = Scheduler.unstable_cancelCallback, shouldYield = Scheduler.unstable_shouldYield, requestPaint = Scheduler.unstable_requestPaint, now = Scheduler.unstable_now, getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel, ImmediatePriority = Scheduler.unstable_ImmediatePriority, UserBlockingPriority = Scheduler.unstable_UserBlockingPriority, NormalPriority$1 = Scheduler.unstable_NormalPriority, LowPriority = Scheduler.unstable_LowPriority, IdlePriority = Scheduler.unstable_IdlePriority, log$1 = Scheduler.log, unstable_setDisableYieldValue = Scheduler.unstable_setDisableYieldValue, rendererID = null, injectedHook = null;
  function setIsStrictModeForDevtools(newIsStrictMode) {
    "function" === typeof log$1 && unstable_setDisableYieldValue(newIsStrictMode);
    if (injectedHook && "function" === typeof injectedHook.setStrictMode)
      try {
        injectedHook.setStrictMode(rendererID, newIsStrictMode);
      } catch (err) {
      }
  }
  var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback, log = Math.log, LN2 = Math.LN2;
  function clz32Fallback(x) {
    x >>>= 0;
    return 0 === x ? 32 : 31 - (log(x) / LN2 | 0) | 0;
  }
  var nextTransitionUpdateLane = 256, nextTransitionDeferredLane = 262144, nextRetryLane = 4194304;
  function getHighestPriorityLanes(lanes) {
    var pendingSyncLanes = lanes & 42;
    if (0 !== pendingSyncLanes) return pendingSyncLanes;
    switch (lanes & -lanes) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return lanes & -lanes;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return lanes & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return lanes & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return lanes;
    }
  }
  function getNextLanes(root2, wipLanes, rootHasPendingCommit) {
    var pendingLanes = root2.pendingLanes;
    if (0 === pendingLanes) return 0;
    var nextLanes = 0, suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes;
    root2 = root2.warmLanes;
    var nonIdlePendingLanes = pendingLanes & 134217727;
    0 !== nonIdlePendingLanes ? (pendingLanes = nonIdlePendingLanes & ~suspendedLanes, 0 !== pendingLanes ? nextLanes = getHighestPriorityLanes(pendingLanes) : (pingedLanes &= nonIdlePendingLanes, 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = nonIdlePendingLanes & ~root2, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))))) : (nonIdlePendingLanes = pendingLanes & ~suspendedLanes, 0 !== nonIdlePendingLanes ? nextLanes = getHighestPriorityLanes(nonIdlePendingLanes) : 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = pendingLanes & ~root2, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))));
    return 0 === nextLanes ? 0 : 0 !== wipLanes && wipLanes !== nextLanes && 0 === (wipLanes & suspendedLanes) && (suspendedLanes = nextLanes & -nextLanes, rootHasPendingCommit = wipLanes & -wipLanes, suspendedLanes >= rootHasPendingCommit || 32 === suspendedLanes && 0 !== (rootHasPendingCommit & 4194048)) ? wipLanes : nextLanes;
  }
  function checkIfRootIsPrerendering(root2, renderLanes2) {
    return 0 === (root2.pendingLanes & ~(root2.suspendedLanes & ~root2.pingedLanes) & renderLanes2);
  }
  function getEntangledLanes(root2, renderLanes2) {
    0 !== (renderLanes2 & 8) && (renderLanes2 |= renderLanes2 & 32);
    var allEntangledLanes = root2.entangledLanes;
    if (0 !== allEntangledLanes)
      for (root2 = root2.entanglements, allEntangledLanes &= renderLanes2; 0 < allEntangledLanes; ) {
        var index$4 = 31 - clz32(allEntangledLanes), lane = 1 << index$4;
        renderLanes2 |= root2[index$4];
        allEntangledLanes &= ~lane;
      }
    return renderLanes2;
  }
  function computeExpirationTime(lane, currentTime) {
    switch (lane) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return currentTime + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return currentTime + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function claimNextRetryLane() {
    var lane = nextRetryLane;
    nextRetryLane <<= 1;
    0 === (nextRetryLane & 62914560) && (nextRetryLane = 4194304);
    return lane;
  }
  function createLaneMap(initial) {
    for (var laneMap = [], i = 0; 31 > i; i++) laneMap.push(initial);
    return laneMap;
  }
  function markRootUpdated$1(root2, updateLane) {
    root2.pendingLanes |= updateLane;
    268435456 !== updateLane && (root2.suspendedLanes = 0, root2.pingedLanes = 0, root2.warmLanes = 0);
  }
  function markRootFinished(root2, finishedLanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes) {
    var previouslyPendingLanes = root2.pendingLanes;
    root2.pendingLanes = remainingLanes;
    root2.suspendedLanes = 0;
    root2.pingedLanes = 0;
    root2.warmLanes = 0;
    root2.expiredLanes &= remainingLanes;
    root2.entangledLanes &= remainingLanes;
    root2.errorRecoveryDisabledLanes &= remainingLanes;
    root2.shellSuspendCounter = 0;
    var entanglements = root2.entanglements, expirationTimes = root2.expirationTimes, hiddenUpdates = root2.hiddenUpdates;
    for (remainingLanes = previouslyPendingLanes & ~remainingLanes; 0 < remainingLanes; ) {
      var index$7 = 31 - clz32(remainingLanes), lane = 1 << index$7;
      entanglements[index$7] = 0;
      expirationTimes[index$7] = -1;
      var hiddenUpdatesForLane = hiddenUpdates[index$7];
      if (null !== hiddenUpdatesForLane)
        for (hiddenUpdates[index$7] = null, index$7 = 0; index$7 < hiddenUpdatesForLane.length; index$7++) {
          var update = hiddenUpdatesForLane[index$7];
          null !== update && (update.lane &= -536870913);
        }
      remainingLanes &= ~lane;
    }
    0 !== spawnedLane && markSpawnedDeferredLane(root2, spawnedLane, 0);
    0 !== suspendedRetryLanes && 0 === updatedLanes && 0 !== root2.tag && (root2.suspendedLanes |= suspendedRetryLanes & ~(previouslyPendingLanes & ~finishedLanes));
  }
  function markSpawnedDeferredLane(root2, spawnedLane, entangledLanes) {
    root2.pendingLanes |= spawnedLane;
    root2.suspendedLanes &= ~spawnedLane;
    var spawnedLaneIndex = 31 - clz32(spawnedLane);
    root2.entangledLanes |= spawnedLane;
    root2.entanglements[spawnedLaneIndex] = root2.entanglements[spawnedLaneIndex] | 1073741824 | entangledLanes & 261930;
  }
  function markRootEntangled(root2, entangledLanes) {
    var rootEntangledLanes = root2.entangledLanes |= entangledLanes;
    for (root2 = root2.entanglements; rootEntangledLanes; ) {
      var index$8 = 31 - clz32(rootEntangledLanes), lane = 1 << index$8;
      lane & entangledLanes | root2[index$8] & entangledLanes && (root2[index$8] |= entangledLanes);
      rootEntangledLanes &= ~lane;
    }
  }
  function getBumpedLaneForHydration(root2, renderLanes2) {
    var renderLane = renderLanes2 & -renderLanes2;
    renderLane = 0 !== (renderLane & 42) ? 1 : getBumpedLaneForHydrationByLane(renderLane);
    return 0 !== (renderLane & (root2.suspendedLanes | renderLanes2)) ? 0 : renderLane;
  }
  function getBumpedLaneForHydrationByLane(lane) {
    switch (lane) {
      case 2:
        lane = 1;
        break;
      case 8:
        lane = 4;
        break;
      case 32:
        lane = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        lane = 128;
        break;
      case 268435456:
        lane = 134217728;
        break;
      default:
        lane = 0;
    }
    return lane;
  }
  function lanesToEventPriority(lanes) {
    lanes &= -lanes;
    return 2 < lanes ? 8 < lanes ? 0 !== (lanes & 134217727) ? 32 : 268435456 : 8 : 2;
  }
  function resolveUpdatePriority() {
    var updatePriority = ReactDOMSharedInternals.p;
    if (0 !== updatePriority) return updatePriority;
    updatePriority = window.event;
    return void 0 === updatePriority ? 32 : getEventPriority(updatePriority.type);
  }
  function runWithPriority(priority, fn) {
    var previousPriority = ReactDOMSharedInternals.p;
    try {
      return ReactDOMSharedInternals.p = priority, fn();
    } finally {
      ReactDOMSharedInternals.p = previousPriority;
    }
  }
  var randomKey = Math.random().toString(36).slice(2), internalInstanceKey = "__reactFiber$" + randomKey, internalPropsKey = "__reactProps$" + randomKey, internalContainerInstanceKey = "__reactContainer$" + randomKey, internalEventHandlersKey = "__reactEvents$" + randomKey, internalEventHandlerListenersKey = "__reactListeners$" + randomKey, internalEventHandlesSetKey = "__reactHandles$" + randomKey, internalRootNodeResourcesKey = "__reactResources$" + randomKey, internalHoistableMarker = "__reactMarker$" + randomKey, internalLoadPendingKey = "__reactLoad$" + randomKey;
  function detachDeletedInstance(node) {
    delete node[internalInstanceKey];
    delete node[internalPropsKey];
    delete node[internalEventHandlerListenersKey];
    delete node[internalEventHandlesSetKey];
  }
  function getClosestInstanceFromNode(targetNode) {
    var targetInst;
    if (targetInst = targetNode[internalInstanceKey]) return targetInst;
    for (var parentNode = targetNode.parentNode; parentNode; ) {
      if (targetInst = parentNode[internalContainerInstanceKey] || parentNode[internalInstanceKey]) {
        parentNode = targetInst.alternate;
        if (null !== targetInst.child || null !== parentNode && null !== parentNode.child)
          for (targetNode = getParentHydrationBoundary(targetNode); null !== targetNode; ) {
            if (parentNode = targetNode[internalInstanceKey]) return parentNode;
            targetNode = getParentHydrationBoundary(targetNode);
          }
        return targetInst;
      }
      targetNode = parentNode;
      parentNode = targetNode.parentNode;
    }
    return null;
  }
  function getInstanceFromNode(node) {
    if (node = node[internalInstanceKey] || node[internalContainerInstanceKey]) {
      var tag = node.tag;
      if (5 === tag || 6 === tag || 13 === tag || 31 === tag || 26 === tag || 27 === tag || 3 === tag)
        return node;
    }
    return null;
  }
  function getNodeFromInstance(inst) {
    var tag = inst.tag;
    if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return inst.stateNode;
    throw Error(formatProdErrorMessage(33));
  }
  function getResourcesFromRoot(root2) {
    var resources = root2[internalRootNodeResourcesKey];
    resources || (resources = root2[internalRootNodeResourcesKey] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() });
    return resources;
  }
  function markNodeAsHoistable(node) {
    node[internalHoistableMarker] = true;
  }
  function clearPendingLoadOnNode(node) {
    node[internalLoadPendingKey] = void 0;
  }
  var allNativeEvents = /* @__PURE__ */ new Set(), registrationNameDependencies = {};
  function registerTwoPhaseEvent(registrationName, dependencies) {
    registerDirectEvent(registrationName, dependencies);
    registerDirectEvent(registrationName + "Capture", dependencies);
  }
  function registerDirectEvent(registrationName, dependencies) {
    registrationNameDependencies[registrationName] = dependencies;
    for (registrationName = 0; registrationName < dependencies.length; registrationName++)
      allNativeEvents.add(dependencies[registrationName]);
  }
  var VALID_ATTRIBUTE_NAME_REGEX = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), illegalAttributeNameCache = {}, validatedAttributeNameCache = {};
  function isAttributeNameSafe(attributeName) {
    if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
      return true;
    if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return false;
    if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
      return validatedAttributeNameCache[attributeName] = true;
    illegalAttributeNameCache[attributeName] = true;
    return false;
  }
  var viewTransitionMutationContext = false;
  function pushMutationContext() {
    var prev = viewTransitionMutationContext;
    viewTransitionMutationContext = false;
    return prev;
  }
  function setValueForAttribute(node, name, value) {
    if (isAttributeNameSafe(name))
      if (null === value) node.removeAttribute(name);
      else {
        switch (typeof value) {
          case "undefined":
          case "function":
          case "symbol":
            node.removeAttribute(name);
            return;
          case "boolean":
            var prefix$10 = name.toLowerCase().slice(0, 5);
            if ("data-" !== prefix$10 && "aria-" !== prefix$10) {
              node.removeAttribute(name);
              return;
            }
        }
        node.setAttribute(name, value);
      }
  }
  function setValueForKnownAttribute(node, name, value) {
    if (null === value) node.removeAttribute(name);
    else {
      switch (typeof value) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          node.removeAttribute(name);
          return;
      }
      node.setAttribute(name, value);
    }
  }
  function setValueForNamespacedAttribute(node, namespace, name, value) {
    if (null === value) node.removeAttribute(name);
    else {
      switch (typeof value) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          node.removeAttribute(name);
          return;
      }
      node.setAttributeNS(namespace, name, value);
    }
  }
  function getToStringValue(value) {
    switch (typeof value) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return value;
      case "object":
        return value;
      default:
        return "";
    }
  }
  function isCheckable(elem) {
    var type = elem.type;
    return (elem = elem.nodeName) && "input" === elem.toLowerCase() && ("checkbox" === type || "radio" === type);
  }
  function trackValueOnNode(node, valueField, currentValue) {
    var descriptor = Object.getOwnPropertyDescriptor(
      node.constructor.prototype,
      valueField
    );
    if (!node.hasOwnProperty(valueField) && "undefined" !== typeof descriptor && "function" === typeof descriptor.get && "function" === typeof descriptor.set) {
      var get = descriptor.get, set = descriptor.set;
      Object.defineProperty(node, valueField, {
        configurable: true,
        get: function() {
          return get.call(this);
        },
        set: function(value) {
          currentValue = "" + value;
          set.call(this, value);
        }
      });
      Object.defineProperty(node, valueField, {
        enumerable: descriptor.enumerable
      });
      return {
        getValue: function() {
          return currentValue;
        },
        setValue: function(value) {
          currentValue = "" + value;
        },
        stopTracking: function() {
          node._valueTracker = null;
          delete node[valueField];
        }
      };
    }
  }
  function track(node) {
    if (!node._valueTracker) {
      var valueField = isCheckable(node) ? "checked" : "value";
      node._valueTracker = trackValueOnNode(
        node,
        valueField,
        "" + node[valueField]
      );
    }
  }
  function updateValueIfChanged(node) {
    if (!node) return false;
    var tracker = node._valueTracker;
    if (!tracker) return true;
    var lastValue = tracker.getValue();
    var value = "";
    node && (value = isCheckable(node) ? node.checked ? "true" : "false" : node.value);
    node = value;
    return node !== lastValue ? (tracker.setValue(node), true) : false;
  }
  var escapeSelectorAttributeValueInsideDoubleQuotesRegex = /[\n"\\]/g;
  function escapeSelectorAttributeValueInsideDoubleQuotes(value) {
    return value.replace(
      escapeSelectorAttributeValueInsideDoubleQuotesRegex,
      function(ch) {
        return "\\" + ch.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function updateInput(element, value, defaultValue, lastDefaultValue, checked, defaultChecked, type, name) {
    element.name = "";
    null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type ? element.type = type : element.removeAttribute("type");
    if (null != value)
      if ("number" === type) {
        if (0 === value && "" === element.value || element.value != value)
          element.value = "" + getToStringValue(value);
      } else
        element.value !== "" + getToStringValue(value) && (element.value = "" + getToStringValue(value));
    else
      "submit" !== type && "reset" !== type || element.removeAttribute("value");
    null != value ? "number" === type && element.value == value ? setDefaultValue(element, getToStringValue(element.value)) : setDefaultValue(element, getToStringValue(value)) : null != defaultValue ? setDefaultValue(element, getToStringValue(defaultValue)) : null != lastDefaultValue && element.removeAttribute("value");
    null == checked && null != defaultChecked && (element.defaultChecked = !!defaultChecked);
    null != checked && (element.checked = checked && "function" !== typeof checked && "symbol" !== typeof checked);
    null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name ? element.name = "" + getToStringValue(name) : element.removeAttribute("name");
  }
  function initInput(element, value, defaultValue, checked, defaultChecked, type, name, isHydrating2) {
    null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type && (element.type = type);
    if (null != value || null != defaultValue) {
      if (!("submit" !== type && "reset" !== type || void 0 !== value && null !== value)) {
        track(element);
        return;
      }
      defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
      value = null != value ? "" + getToStringValue(value) : defaultValue;
      isHydrating2 || value === element.value || (element.value = value);
      element.defaultValue = value;
    }
    checked = null != checked ? checked : defaultChecked;
    checked = "function" !== typeof checked && "symbol" !== typeof checked && !!checked;
    element.checked = isHydrating2 ? element.checked : !!checked;
    element.defaultChecked = !!checked;
    null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name && (element.name = name);
    track(element);
  }
  function setDefaultValue(node, value) {
    node.defaultValue !== "" + value && (node.defaultValue = "" + value);
  }
  function updateOptions(node, multiple, propValue, setDefaultSelected) {
    node = node.options;
    if (multiple) {
      multiple = {};
      for (var i = 0; i < propValue.length; i++)
        multiple["$" + propValue[i]] = true;
      for (propValue = 0; propValue < node.length; propValue++)
        i = multiple.hasOwnProperty("$" + node[propValue].value), node[propValue].selected !== i && (node[propValue].selected = i), i && setDefaultSelected && (node[propValue].defaultSelected = true);
    } else {
      propValue = "" + getToStringValue(propValue);
      multiple = null;
      for (i = 0; i < node.length; i++) {
        if (node[i].value === propValue) {
          node[i].selected = true;
          setDefaultSelected && (node[i].defaultSelected = true);
          return;
        }
        null !== multiple || node[i].disabled || (multiple = node[i]);
      }
      null !== multiple && (multiple.selected = true);
    }
  }
  function updateTextarea(element, value, defaultValue) {
    if (null != value && (value = "" + getToStringValue(value), value !== element.value && (element.value = value), null == defaultValue)) {
      element.defaultValue !== value && (element.defaultValue = value);
      return;
    }
    element.defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
  }
  function initTextarea(element, value, defaultValue, children) {
    if (null == value) {
      if (null != children) {
        if (null != defaultValue) throw Error(formatProdErrorMessage(92));
        if (isArrayImpl(children)) {
          if (1 < children.length) throw Error(formatProdErrorMessage(93));
          children = children[0];
        }
        defaultValue = children;
      }
      null == defaultValue && (defaultValue = "");
      value = defaultValue;
    }
    defaultValue = getToStringValue(value);
    element.defaultValue = defaultValue;
    children = element.textContent;
    children === defaultValue && "" !== children && null !== children && (element.value = children);
    track(element);
  }
  function setTextContent(node, text) {
    if (text) {
      var firstChild = node.firstChild;
      if (firstChild && firstChild === node.lastChild && 3 === firstChild.nodeType) {
        firstChild.nodeValue = text;
        return;
      }
    }
    node.textContent = text;
  }
  var unitlessNumbers = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function setValueForStyle(style2, styleName, value) {
    var isCustomProperty = 0 === styleName.indexOf("--");
    null == value || "boolean" === typeof value || "" === value ? isCustomProperty ? style2.setProperty(styleName, "") : "float" === styleName ? style2.cssFloat = "" : style2[styleName] = "" : isCustomProperty ? style2.setProperty(styleName, value) : "number" !== typeof value || 0 === value || unitlessNumbers.has(styleName) ? "float" === styleName ? style2.cssFloat = value : style2[styleName] = ("" + value).trim() : style2[styleName] = value + "px";
  }
  function setValueForStyles(node, styles, prevStyles) {
    if (null != styles && "object" !== typeof styles)
      throw Error(formatProdErrorMessage(62));
    node = node.style;
    if (null != prevStyles) {
      for (var styleName in prevStyles)
        !prevStyles.hasOwnProperty(styleName) || null != styles && styles.hasOwnProperty(styleName) || (0 === styleName.indexOf("--") ? node.setProperty(styleName, "") : "float" === styleName ? node.cssFloat = "" : node[styleName] = "", viewTransitionMutationContext = true);
      for (var styleName$16 in styles)
        styleName = styles[styleName$16], styles.hasOwnProperty(styleName$16) && prevStyles[styleName$16] !== styleName && (setValueForStyle(node, styleName$16, styleName), viewTransitionMutationContext = true);
    } else
      for (var styleName$17 in styles)
        styles.hasOwnProperty(styleName$17) && setValueForStyle(node, styleName$17, styles[styleName$17]);
  }
  function isCustomElement(tagName) {
    if (-1 === tagName.indexOf("-")) return false;
    switch (tagName) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var aliases = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["maskType", "mask-type"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function sanitizeURL(url) {
    return isJavaScriptProtocol.test("" + url) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : url;
  }
  function noop$1() {
  }
  var currentReplayingEvent = null;
  function getEventTarget(nativeEvent) {
    nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
    nativeEvent.correspondingUseElement && (nativeEvent = nativeEvent.correspondingUseElement);
    return 3 === nativeEvent.nodeType ? nativeEvent.parentNode : nativeEvent;
  }
  var restoreTarget = null, restoreQueue = null;
  function restoreStateOfTarget(target) {
    var internalInstance = getInstanceFromNode(target);
    if (internalInstance && (target = internalInstance.stateNode)) {
      var props = target[internalPropsKey] || null;
      a: switch (target = internalInstance.stateNode, internalInstance.type) {
        case "input":
          updateInput(
            target,
            props.value,
            props.defaultValue,
            props.defaultValue,
            props.checked,
            props.defaultChecked,
            props.type,
            props.name
          );
          internalInstance = props.name;
          if ("radio" === props.type && null != internalInstance) {
            for (props = target; props.parentNode; ) props = props.parentNode;
            props = props.querySelectorAll(
              'input[name="' + escapeSelectorAttributeValueInsideDoubleQuotes(
                "" + internalInstance
              ) + '"][type="radio"]'
            );
            for (internalInstance = 0; internalInstance < props.length; internalInstance++) {
              var otherNode = props[internalInstance];
              if (otherNode !== target && otherNode.form === target.form) {
                var otherProps = otherNode[internalPropsKey] || null;
                if (!otherProps) throw Error(formatProdErrorMessage(90));
                updateInput(
                  otherNode,
                  otherProps.value,
                  otherProps.defaultValue,
                  otherProps.defaultValue,
                  otherProps.checked,
                  otherProps.defaultChecked,
                  otherProps.type,
                  otherProps.name
                );
              }
            }
            for (internalInstance = 0; internalInstance < props.length; internalInstance++)
              otherNode = props[internalInstance], otherNode.form === target.form && updateValueIfChanged(otherNode);
          }
          break a;
        case "textarea":
          updateTextarea(target, props.value, props.defaultValue);
          break a;
        case "select":
          internalInstance = props.value, null != internalInstance && updateOptions(target, !!props.multiple, internalInstance, false);
      }
    }
  }
  var isInsideEventHandler = false;
  function batchedUpdates$1(fn, a, b) {
    if (isInsideEventHandler) return fn(a, b);
    isInsideEventHandler = true;
    try {
      var JSCompiler_inline_result = fn(a);
      return JSCompiler_inline_result;
    } finally {
      if (isInsideEventHandler = false, null !== restoreTarget || null !== restoreQueue) {
        if (flushSyncWork$1(), restoreTarget && (a = restoreTarget, fn = restoreQueue, restoreQueue = restoreTarget = null, restoreStateOfTarget(a), fn))
          for (a = 0; a < fn.length; a++) restoreStateOfTarget(fn[a]);
      }
    }
  }
  function getListener(inst, registrationName) {
    var stateNode = inst.stateNode;
    if (null === stateNode) return null;
    var props = stateNode[internalPropsKey] || null;
    if (null === props) return null;
    stateNode = props[registrationName];
    a: switch (registrationName) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (props = !props.disabled) || (inst = inst.type, props = !("button" === inst || "input" === inst || "select" === inst || "textarea" === inst));
        inst = !props;
        break a;
      default:
        inst = false;
    }
    if (inst) return null;
    if (stateNode && "function" !== typeof stateNode)
      throw Error(
        formatProdErrorMessage(231, registrationName, typeof stateNode)
      );
    return stateNode;
  }
  var canUseDOM = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), passiveBrowserEventsSupported = false;
  if (canUseDOM)
    try {
      var options = {};
      Object.defineProperty(options, "passive", {
        get: function() {
          passiveBrowserEventsSupported = true;
        }
      });
      window.addEventListener("test", options, options);
      window.removeEventListener("test", options, options);
    } catch (e) {
      passiveBrowserEventsSupported = false;
    }
  var root = null, startText = null, fallbackText = null;
  function getData() {
    if (fallbackText) return fallbackText;
    var start, startValue = startText, startLength = startValue.length, end, endValue = "value" in root ? root.value : root.textContent, endLength = endValue.length;
    for (start = 0; start < startLength && startValue[start] === endValue[start]; start++) ;
    var minEnd = startLength - start;
    for (end = 1; end <= minEnd && startValue[startLength - end] === endValue[endLength - end]; end++) ;
    return fallbackText = endValue.slice(start, 1 < end ? 1 - end : void 0);
  }
  function getEventCharCode(nativeEvent) {
    var keyCode = nativeEvent.keyCode;
    "charCode" in nativeEvent ? (nativeEvent = nativeEvent.charCode, 0 === nativeEvent && 13 === keyCode && (nativeEvent = 13)) : nativeEvent = keyCode;
    10 === nativeEvent && (nativeEvent = 13);
    return 32 <= nativeEvent || 13 === nativeEvent ? nativeEvent : 0;
  }
  function functionThatReturnsTrue() {
    return true;
  }
  function functionThatReturnsFalse() {
    return false;
  }
  function createSyntheticEvent(Interface) {
    function SyntheticBaseEvent(reactName, reactEventType, targetInst, nativeEvent, nativeEventTarget) {
      this._reactName = reactName;
      this._targetInst = targetInst;
      this.type = reactEventType;
      this.nativeEvent = nativeEvent;
      this.target = nativeEventTarget;
      this.currentTarget = null;
      for (var propName in Interface)
        Interface.hasOwnProperty(propName) && (reactName = Interface[propName], this[propName] = reactName ? reactName(nativeEvent) : nativeEvent[propName]);
      this.isDefaultPrevented = (null != nativeEvent.defaultPrevented ? nativeEvent.defaultPrevented : false === nativeEvent.returnValue) ? functionThatReturnsTrue : functionThatReturnsFalse;
      this.isPropagationStopped = functionThatReturnsFalse;
      return this;
    }
    assign(SyntheticBaseEvent.prototype, {
      preventDefault: function() {
        this.defaultPrevented = true;
        var event = this.nativeEvent;
        event && (event.preventDefault ? event.preventDefault() : "unknown" !== typeof event.returnValue && (event.returnValue = false), this.isDefaultPrevented = functionThatReturnsTrue);
      },
      stopPropagation: function() {
        var event = this.nativeEvent;
        event && (event.stopPropagation ? event.stopPropagation() : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = true), this.isPropagationStopped = functionThatReturnsTrue);
      },
      persist: function() {
      },
      isPersistent: functionThatReturnsTrue
    });
    return SyntheticBaseEvent;
  }
  var EventInterface = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(event) {
      return event.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, SyntheticEvent = createSyntheticEvent(EventInterface), UIEventInterface = assign({}, EventInterface, { view: 0, detail: 0 }), SyntheticUIEvent = createSyntheticEvent(UIEventInterface), lastMovementX, lastMovementY, lastMouseEvent, MouseEventInterface = assign({}, UIEventInterface, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: getEventModifierState,
    button: 0,
    buttons: 0,
    relatedTarget: function(event) {
      return void 0 === event.relatedTarget ? event.fromElement === event.srcElement ? event.toElement : event.fromElement : event.relatedTarget;
    },
    movementX: function(event) {
      if ("movementX" in event) return event.movementX;
      event !== lastMouseEvent && (lastMouseEvent && "mousemove" === event.type ? (lastMovementX = event.screenX - lastMouseEvent.screenX, lastMovementY = event.screenY - lastMouseEvent.screenY) : lastMovementY = lastMovementX = 0, lastMouseEvent = event);
      return lastMovementX;
    },
    movementY: function(event) {
      return "movementY" in event ? event.movementY : lastMovementY;
    }
  }), SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface), DragEventInterface = assign({}, MouseEventInterface, { dataTransfer: 0 }), SyntheticDragEvent = createSyntheticEvent(DragEventInterface), FocusEventInterface = assign({}, UIEventInterface, { relatedTarget: 0 }), SyntheticFocusEvent = createSyntheticEvent(FocusEventInterface), AnimationEventInterface = assign({}, EventInterface, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), SyntheticAnimationEvent = createSyntheticEvent(AnimationEventInterface), ClipboardEventInterface = assign({}, EventInterface, {
    clipboardData: function(event) {
      return "clipboardData" in event ? event.clipboardData : window.clipboardData;
    }
  }), SyntheticClipboardEvent = createSyntheticEvent(ClipboardEventInterface), CompositionEventInterface = assign({}, EventInterface, { data: 0 }), SyntheticCompositionEvent = createSyntheticEvent(CompositionEventInterface), normalizeKey = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, translateToKey = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, modifierKeyToProp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function modifierStateGetter(keyArg) {
    var nativeEvent = this.nativeEvent;
    return nativeEvent.getModifierState ? nativeEvent.getModifierState(keyArg) : (keyArg = modifierKeyToProp[keyArg]) ? !!nativeEvent[keyArg] : false;
  }
  function getEventModifierState() {
    return modifierStateGetter;
  }
  var KeyboardEventInterface = assign({}, UIEventInterface, {
    key: function(nativeEvent) {
      if (nativeEvent.key) {
        var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
        if ("Unidentified" !== key) return key;
      }
      return "keypress" === nativeEvent.type ? (nativeEvent = getEventCharCode(nativeEvent), 13 === nativeEvent ? "Enter" : String.fromCharCode(nativeEvent)) : "keydown" === nativeEvent.type || "keyup" === nativeEvent.type ? translateToKey[nativeEvent.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: getEventModifierState,
    charCode: function(event) {
      return "keypress" === event.type ? getEventCharCode(event) : 0;
    },
    keyCode: function(event) {
      return "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
    },
    which: function(event) {
      return "keypress" === event.type ? getEventCharCode(event) : "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
    }
  }), SyntheticKeyboardEvent = createSyntheticEvent(KeyboardEventInterface), PointerEventInterface = assign({}, MouseEventInterface, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), SyntheticPointerEvent = createSyntheticEvent(PointerEventInterface), SubmitEventInterface = assign({}, EventInterface, { submitter: 0 }), SyntheticSubmitEvent = createSyntheticEvent(SubmitEventInterface), TouchEventInterface = assign({}, UIEventInterface, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: getEventModifierState
  }), SyntheticTouchEvent = createSyntheticEvent(TouchEventInterface), TransitionEventInterface = assign({}, EventInterface, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), SyntheticTransitionEvent = createSyntheticEvent(TransitionEventInterface), WheelEventInterface = assign({}, MouseEventInterface, {
    deltaX: function(event) {
      return "deltaX" in event ? event.deltaX : "wheelDeltaX" in event ? -event.wheelDeltaX : 0;
    },
    deltaY: function(event) {
      return "deltaY" in event ? event.deltaY : "wheelDeltaY" in event ? -event.wheelDeltaY : "wheelDelta" in event ? -event.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), SyntheticWheelEvent = createSyntheticEvent(WheelEventInterface), ToggleEventInterface = assign({}, EventInterface, {
    newState: 0,
    oldState: 0,
    source: 0
  }), SyntheticToggleEvent = createSyntheticEvent(ToggleEventInterface), END_KEYCODES = [9, 13, 27, 32], canUseCompositionEvent = canUseDOM && "CompositionEvent" in window, documentMode = null;
  canUseDOM && "documentMode" in document && (documentMode = document.documentMode);
  var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode, useFallbackCompositionData = canUseDOM && (!canUseCompositionEvent || documentMode && 8 < documentMode && 11 >= documentMode), SPACEBAR_CHAR = String.fromCharCode(32), hasSpaceKeypress = false;
  function isFallbackCompositionEnd(domEventName, nativeEvent) {
    switch (domEventName) {
      case "keyup":
        return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);
      case "keydown":
        return 229 !== nativeEvent.keyCode;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function getDataFromCustomEvent(nativeEvent) {
    nativeEvent = nativeEvent.detail;
    return "object" === typeof nativeEvent && "data" in nativeEvent ? nativeEvent.data : null;
  }
  var isComposing = false;
  function getNativeBeforeInputChars(domEventName, nativeEvent) {
    switch (domEventName) {
      case "compositionend":
        return getDataFromCustomEvent(nativeEvent);
      case "keypress":
        if (32 !== nativeEvent.which) return null;
        hasSpaceKeypress = true;
        return SPACEBAR_CHAR;
      case "textInput":
        return domEventName = nativeEvent.data, domEventName === SPACEBAR_CHAR && hasSpaceKeypress ? null : domEventName;
      default:
        return null;
    }
  }
  function getFallbackBeforeInputChars(domEventName, nativeEvent) {
    if (isComposing)
      return "compositionend" === domEventName || !canUseCompositionEvent && isFallbackCompositionEnd(domEventName, nativeEvent) ? (domEventName = getData(), fallbackText = startText = root = null, isComposing = false, domEventName) : null;
    switch (domEventName) {
      case "paste":
        return null;
      case "keypress":
        if (!(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) || nativeEvent.ctrlKey && nativeEvent.altKey) {
          if (nativeEvent.char && 1 < nativeEvent.char.length)
            return nativeEvent.char;
          if (nativeEvent.which) return String.fromCharCode(nativeEvent.which);
        }
        return null;
      case "compositionend":
        return useFallbackCompositionData && "ko" !== nativeEvent.locale ? null : nativeEvent.data;
      default:
        return null;
    }
  }
  var supportedInputTypes = {
    color: true,
    date: true,
    datetime: true,
    "datetime-local": true,
    email: true,
    month: true,
    number: true,
    password: true,
    range: true,
    search: true,
    tel: true,
    text: true,
    time: true,
    url: true,
    week: true
  };
  function isTextInputElement(elem) {
    var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
    return "input" === nodeName ? !!supportedInputTypes[elem.type] : "textarea" === nodeName ? true : false;
  }
  function createAndAccumulateChangeEvent(dispatchQueue, inst, nativeEvent, target) {
    restoreTarget ? restoreQueue ? restoreQueue.push(target) : restoreQueue = [target] : restoreTarget = target;
    inst = accumulateTwoPhaseListeners(inst, "onChange");
    0 < inst.length && (nativeEvent = new SyntheticEvent(
      "onChange",
      "change",
      null,
      nativeEvent,
      target
    ), dispatchQueue.push({ event: nativeEvent, listeners: inst }));
  }
  var activeElement$1 = null, activeElementInst$1 = null;
  function runEventInBatch(dispatchQueue) {
    processDispatchQueue(dispatchQueue, 0);
  }
  function getInstIfValueChanged(targetInst) {
    var targetNode = getNodeFromInstance(targetInst);
    if (updateValueIfChanged(targetNode)) return targetInst;
  }
  function getTargetInstForChangeEvent(domEventName, targetInst) {
    if ("change" === domEventName) return targetInst;
  }
  var isInputEventSupported = false;
  if (canUseDOM) {
    var JSCompiler_inline_result$jscomp$318;
    if (canUseDOM) {
      var isSupported$jscomp$inline_474 = "oninput" in document;
      if (!isSupported$jscomp$inline_474) {
        var element$jscomp$inline_475 = document.createElement("div");
        element$jscomp$inline_475.setAttribute("oninput", "return;");
        isSupported$jscomp$inline_474 = "function" === typeof element$jscomp$inline_475.oninput;
      }
      JSCompiler_inline_result$jscomp$318 = isSupported$jscomp$inline_474;
    } else JSCompiler_inline_result$jscomp$318 = false;
    isInputEventSupported = JSCompiler_inline_result$jscomp$318 && (!document.documentMode || 9 < document.documentMode);
  }
  function stopWatchingForValueChange() {
    activeElement$1 && (activeElement$1.detachEvent("onpropertychange", handlePropertyChange), activeElementInst$1 = activeElement$1 = null);
  }
  function handlePropertyChange(nativeEvent) {
    if ("value" === nativeEvent.propertyName && getInstIfValueChanged(activeElementInst$1)) {
      var dispatchQueue = [];
      createAndAccumulateChangeEvent(
        dispatchQueue,
        activeElementInst$1,
        nativeEvent,
        getEventTarget(nativeEvent)
      );
      batchedUpdates$1(runEventInBatch, dispatchQueue);
    }
  }
  function handleEventsForInputEventPolyfill(domEventName, target, targetInst) {
    "focusin" === domEventName ? (stopWatchingForValueChange(), activeElement$1 = target, activeElementInst$1 = targetInst, activeElement$1.attachEvent("onpropertychange", handlePropertyChange)) : "focusout" === domEventName && stopWatchingForValueChange();
  }
  function getTargetInstForInputEventPolyfill(domEventName) {
    if ("selectionchange" === domEventName || "keyup" === domEventName || "keydown" === domEventName)
      return getInstIfValueChanged(activeElementInst$1);
  }
  function getTargetInstForClickEvent(domEventName, targetInst) {
    if ("click" === domEventName) return getInstIfValueChanged(targetInst);
  }
  function getTargetInstForInputOrChangeEvent(domEventName, targetInst) {
    if ("input" === domEventName || "change" === domEventName)
      return getInstIfValueChanged(targetInst);
  }
  function is(x, y) {
    return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
  }
  var objectIs = "function" === typeof Object.is ? Object.is : is;
  function shallowEqual(objA, objB) {
    if (objectIs(objA, objB)) return true;
    if ("object" !== typeof objA || null === objA || "object" !== typeof objB || null === objB)
      return false;
    var keysA = Object.keys(objA), keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;
    for (keysB = 0; keysB < keysA.length; keysB++) {
      var currentKey = keysA[keysB];
      if (!hasOwnProperty.call(objB, currentKey) || !objectIs(objA[currentKey], objB[currentKey]))
        return false;
    }
    return true;
  }
  function getActiveElement(doc) {
    doc = doc || ("undefined" !== typeof document ? document : void 0);
    if ("undefined" === typeof doc) return null;
    try {
      return doc.activeElement || doc.body;
    } catch (e$20) {
      return doc.body;
    }
  }
  function getLeafNode(node) {
    for (; node && node.firstChild; ) node = node.firstChild;
    return node;
  }
  function getNodeForCharacterOffset(root2, offset) {
    var node = getLeafNode(root2);
    root2 = 0;
    for (var nodeEnd; node; ) {
      if (3 === node.nodeType) {
        nodeEnd = root2 + node.textContent.length;
        if (root2 <= offset && nodeEnd >= offset)
          return { node, offset: offset - root2 };
        root2 = nodeEnd;
      }
      a: {
        for (; node; ) {
          if (node.nextSibling) {
            node = node.nextSibling;
            break a;
          }
          node = node.parentNode;
        }
        node = void 0;
      }
      node = getLeafNode(node);
    }
  }
  function containsNode(outerNode, innerNode) {
    return outerNode && innerNode ? outerNode === innerNode ? true : outerNode && 3 === outerNode.nodeType ? false : innerNode && 3 === innerNode.nodeType ? containsNode(outerNode, innerNode.parentNode) : "contains" in outerNode ? outerNode.contains(innerNode) : outerNode.compareDocumentPosition ? !!(outerNode.compareDocumentPosition(innerNode) & 16) : false : false;
  }
  function getActiveElementDeep(containerInfo) {
    containerInfo = null != containerInfo && null != containerInfo.ownerDocument && null != containerInfo.ownerDocument.defaultView ? containerInfo.ownerDocument.defaultView : window;
    for (var element = getActiveElement(containerInfo.document); element instanceof containerInfo.HTMLIFrameElement; ) {
      try {
        var JSCompiler_inline_result = "string" === typeof element.contentWindow.location.href;
      } catch (err) {
        JSCompiler_inline_result = false;
      }
      if (JSCompiler_inline_result) containerInfo = element.contentWindow;
      else break;
      element = getActiveElement(containerInfo.document);
    }
    return element;
  }
  function hasSelectionCapabilities(elem) {
    var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
    return nodeName && ("input" === nodeName && ("text" === elem.type || "search" === elem.type || "tel" === elem.type || "url" === elem.type || "password" === elem.type) || "textarea" === nodeName || "true" === elem.contentEditable);
  }
  var skipSelectionChangeEvent = canUseDOM && "documentMode" in document && 11 >= document.documentMode, activeElement = null, activeElementInst = null, lastSelection = null, mouseDown = false;
  function constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget) {
    var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : 9 === nativeEventTarget.nodeType ? nativeEventTarget : nativeEventTarget.ownerDocument;
    mouseDown || null == activeElement || activeElement !== getActiveElement(doc) || (doc = activeElement, "selectionStart" in doc && hasSelectionCapabilities(doc) ? doc = { start: doc.selectionStart, end: doc.selectionEnd } : (doc = (doc.ownerDocument && doc.ownerDocument.defaultView || window).getSelection(), doc = {
      anchorNode: doc.anchorNode,
      anchorOffset: doc.anchorOffset,
      focusNode: doc.focusNode,
      focusOffset: doc.focusOffset
    }), lastSelection && shallowEqual(lastSelection, doc) || (lastSelection = doc, doc = accumulateTwoPhaseListeners(activeElementInst, "onSelect"), 0 < doc.length && (nativeEvent = new SyntheticEvent(
      "onSelect",
      "select",
      null,
      nativeEvent,
      nativeEventTarget
    ), dispatchQueue.push({ event: nativeEvent, listeners: doc }), nativeEvent.target = activeElement)));
  }
  function makePrefixMap(styleProp, eventName) {
    var prefixes = {};
    prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
    prefixes["Webkit" + styleProp] = "webkit" + eventName;
    prefixes["Moz" + styleProp] = "moz" + eventName;
    return prefixes;
  }
  var vendorPrefixes = {
    animationend: makePrefixMap("Animation", "AnimationEnd"),
    animationiteration: makePrefixMap("Animation", "AnimationIteration"),
    animationstart: makePrefixMap("Animation", "AnimationStart"),
    transitionrun: makePrefixMap("Transition", "TransitionRun"),
    transitionstart: makePrefixMap("Transition", "TransitionStart"),
    transitioncancel: makePrefixMap("Transition", "TransitionCancel"),
    transitionend: makePrefixMap("Transition", "TransitionEnd")
  }, prefixedEventNames = {}, style = {};
  canUseDOM && (style = document.createElement("div").style, "AnimationEvent" in window || (delete vendorPrefixes.animationend.animation, delete vendorPrefixes.animationiteration.animation, delete vendorPrefixes.animationstart.animation), "TransitionEvent" in window || delete vendorPrefixes.transitionend.transition);
  function getVendorPrefixedEventName(eventName) {
    if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
    if (!vendorPrefixes[eventName]) return eventName;
    var prefixMap = vendorPrefixes[eventName], styleProp;
    for (styleProp in prefixMap)
      if (prefixMap.hasOwnProperty(styleProp) && styleProp in style)
        return prefixedEventNames[eventName] = prefixMap[styleProp];
    return eventName;
  }
  var ANIMATION_END = getVendorPrefixedEventName("animationend"), ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration"), ANIMATION_START = getVendorPrefixedEventName("animationstart"), TRANSITION_RUN = getVendorPrefixedEventName("transitionrun"), TRANSITION_START = getVendorPrefixedEventName("transitionstart"), TRANSITION_CANCEL = getVendorPrefixedEventName("transitioncancel"), TRANSITION_END = getVendorPrefixedEventName("transitionend"), topLevelEventsToReactNames = /* @__PURE__ */ new Map(), simpleEventPluginEvents = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  simpleEventPluginEvents.push("scrollEnd");
  function registerSimpleEvent(domEventName, reactName) {
    topLevelEventsToReactNames.set(domEventName, reactName);
    registerTwoPhaseEvent(reactName, [domEventName]);
  }
  var globalClientIdCounter$1 = 0;
  function getViewTransitionName(props, instance) {
    if (null != props.name && "auto" !== props.name) return props.name;
    if (null !== instance.autoName) return instance.autoName;
    props = pendingEffectsRoot.identifierPrefix;
    var globalClientId = globalClientIdCounter$1++;
    props = "_" + props + "t_" + globalClientId.toString(32) + "_";
    return instance.autoName = props;
  }
  function getClassNameByType(classByType) {
    if (null == classByType || "string" === typeof classByType)
      return classByType;
    var className = null, activeTypes = pendingTransitionTypes;
    if (null !== activeTypes)
      for (var i = 0; i < activeTypes.length; i++) {
        var match = classByType[activeTypes[i]];
        if (null != match) {
          if ("none" === match) return "none";
          className = null == className ? match : className + (" " + match);
        }
      }
    return null == className ? classByType.default : className;
  }
  function getViewTransitionClassName(defaultClass, eventClass) {
    defaultClass = getClassNameByType(defaultClass);
    eventClass = getClassNameByType(eventClass);
    return null == eventClass ? "auto" === defaultClass ? null : defaultClass : "auto" === eventClass ? null : eventClass;
  }
  var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
    if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
      var event = new window.ErrorEvent("error", {
        bubbles: true,
        cancelable: true,
        message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
        error
      });
      if (!window.dispatchEvent(event)) return;
    } else if ("object" === typeof process && "function" === typeof process.emit) {
      process.emit("uncaughtException", error);
      return;
    }
    console.error(error);
  }, concurrentQueues = [], concurrentQueuesIndex = 0, concurrentlyUpdatedLanes = 0;
  function finishQueueingConcurrentUpdates() {
    for (var endIndex = concurrentQueuesIndex, i = concurrentlyUpdatedLanes = concurrentQueuesIndex = 0; i < endIndex; ) {
      var fiber = concurrentQueues[i];
      concurrentQueues[i++] = null;
      var queue2 = concurrentQueues[i];
      concurrentQueues[i++] = null;
      var update = concurrentQueues[i];
      concurrentQueues[i++] = null;
      var lane = concurrentQueues[i];
      concurrentQueues[i++] = null;
      if (null !== queue2 && null !== update) {
        var pending = queue2.pending;
        null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
        queue2.pending = update;
      }
      0 !== lane && markUpdateLaneFromFiberToRoot(fiber, update, lane);
    }
  }
  function enqueueUpdate$1(fiber, queue2, update, lane) {
    concurrentQueues[concurrentQueuesIndex++] = fiber;
    concurrentQueues[concurrentQueuesIndex++] = queue2;
    concurrentQueues[concurrentQueuesIndex++] = update;
    concurrentQueues[concurrentQueuesIndex++] = lane;
    concurrentlyUpdatedLanes |= lane;
    fiber.lanes |= lane;
    fiber = fiber.alternate;
    null !== fiber && (fiber.lanes |= lane);
  }
  function enqueueConcurrentHookUpdate(fiber, queue2, update, lane) {
    enqueueUpdate$1(fiber, queue2, update, lane);
    return getRootForUpdatedFiber(fiber);
  }
  function enqueueConcurrentRenderForLane(fiber, lane) {
    enqueueUpdate$1(fiber, null, null, lane);
    return getRootForUpdatedFiber(fiber);
  }
  function markUpdateLaneFromFiberToRoot(sourceFiber, update, lane) {
    sourceFiber.lanes |= lane;
    var alternate = sourceFiber.alternate;
    null !== alternate && (alternate.lanes |= lane);
    for (var isHidden = false, parent = sourceFiber.return; null !== parent; )
      parent.childLanes |= lane, alternate = parent.alternate, null !== alternate && (alternate.childLanes |= lane), 22 === parent.tag && (sourceFiber = parent.stateNode, null === sourceFiber || sourceFiber._visibility & 1 || (isHidden = true)), sourceFiber = parent, parent = parent.return;
    return 3 === sourceFiber.tag ? (parent = sourceFiber.stateNode, isHidden && null !== update && (isHidden = 31 - clz32(lane), sourceFiber = parent.hiddenUpdates, alternate = sourceFiber[isHidden], null === alternate ? sourceFiber[isHidden] = [update] : alternate.push(update), update.lane = lane | 536870912), parent) : null;
  }
  function getRootForUpdatedFiber(sourceFiber) {
    if (50 < nestedUpdateCount)
      throw nestedUpdateCount = 0, rootWithNestedUpdates = null, Error(formatProdErrorMessage(185));
    for (var parent = sourceFiber.return; null !== parent; )
      sourceFiber = parent, parent = sourceFiber.return;
    return 3 === sourceFiber.tag ? sourceFiber.stateNode : null;
  }
  var emptyContextObject = {};
  function FiberNode(tag, pendingProps, key, mode) {
    this.tag = tag;
    this.key = key;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.refCleanup = this.ref = null;
    this.pendingProps = pendingProps;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = mode;
    this.subtreeFlags = this.flags = 0;
    this.deletions = null;
    this.childLanes = this.lanes = 0;
    this.alternate = null;
  }
  function createFiberImplClass(tag, pendingProps, key, mode) {
    return new FiberNode(tag, pendingProps, key, mode);
  }
  function shouldConstruct(Component) {
    Component = Component.prototype;
    return !(!Component || !Component.isReactComponent);
  }
  function createWorkInProgress(current, pendingProps) {
    var workInProgress2 = current.alternate;
    null === workInProgress2 ? (workInProgress2 = createFiberImplClass(
      current.tag,
      pendingProps,
      current.key,
      current.mode
    ), workInProgress2.elementType = current.elementType, workInProgress2.type = current.type, workInProgress2.stateNode = current.stateNode, workInProgress2.alternate = current, current.alternate = workInProgress2) : (workInProgress2.pendingProps = pendingProps, workInProgress2.type = current.type, workInProgress2.flags = 0, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null);
    workInProgress2.flags = current.flags & 1206910976;
    workInProgress2.childLanes = current.childLanes;
    workInProgress2.lanes = current.lanes;
    workInProgress2.child = current.child;
    workInProgress2.memoizedProps = current.memoizedProps;
    workInProgress2.memoizedState = current.memoizedState;
    workInProgress2.updateQueue = current.updateQueue;
    pendingProps = current.dependencies;
    workInProgress2.dependencies = null === pendingProps ? null : { lanes: pendingProps.lanes, firstContext: pendingProps.firstContext };
    workInProgress2.sibling = current.sibling;
    workInProgress2.index = current.index;
    workInProgress2.ref = current.ref;
    workInProgress2.refCleanup = current.refCleanup;
    return workInProgress2;
  }
  function resetWorkInProgress(workInProgress2, renderLanes2) {
    workInProgress2.flags &= 1206910978;
    var current = workInProgress2.alternate;
    null === current ? (workInProgress2.childLanes = 0, workInProgress2.lanes = renderLanes2, workInProgress2.child = null, workInProgress2.subtreeFlags = 0, workInProgress2.memoizedProps = null, workInProgress2.memoizedState = null, workInProgress2.updateQueue = null, workInProgress2.dependencies = null, workInProgress2.stateNode = null) : (workInProgress2.childLanes = current.childLanes, workInProgress2.lanes = current.lanes, workInProgress2.child = current.child, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null, workInProgress2.memoizedProps = current.memoizedProps, workInProgress2.memoizedState = current.memoizedState, workInProgress2.updateQueue = current.updateQueue, workInProgress2.type = current.type, renderLanes2 = current.dependencies, workInProgress2.dependencies = null === renderLanes2 ? null : {
      lanes: renderLanes2.lanes,
      firstContext: renderLanes2.firstContext
    });
    return workInProgress2;
  }
  function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) {
    var fiberTag = 0;
    owner = type;
    if ("function" === typeof owner) shouldConstruct(owner) && (fiberTag = 1);
    else if ("string" === typeof owner)
      fiberTag = isHostHoistableType(
        type,
        pendingProps,
        contextStackCursor.current
      ) ? 26 : "html" === type || "head" === type || "body" === type ? 27 : 5;
    else
      a: switch (owner) {
        case REACT_ACTIVITY_TYPE:
          return type = createFiberImplClass(31, pendingProps, key, mode), type.elementType = REACT_ACTIVITY_TYPE, type.lanes = lanes, type;
        case REACT_FRAGMENT_TYPE:
          return createFiberFromFragment(pendingProps.children, mode, lanes, key);
        case REACT_STRICT_MODE_TYPE:
          fiberTag = 8;
          mode |= 24;
          break;
        case REACT_PROFILER_TYPE:
          return type = createFiberImplClass(12, pendingProps, key, mode | 2), type.elementType = REACT_PROFILER_TYPE, type.lanes = lanes, type;
        case REACT_SUSPENSE_TYPE:
          return type = createFiberImplClass(13, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_TYPE, type.lanes = lanes, type;
        case REACT_SUSPENSE_LIST_TYPE:
          return type = createFiberImplClass(19, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_LIST_TYPE, type.lanes = lanes, type;
        case REACT_LEGACY_HIDDEN_TYPE:
        case REACT_VIEW_TRANSITION_TYPE:
          return type = mode | 32, type = createFiberImplClass(30, pendingProps, key, type), type.elementType = REACT_VIEW_TRANSITION_TYPE, type.lanes = lanes, type.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, type;
        default:
          if ("object" === typeof owner && null !== owner)
            switch (owner.$$typeof) {
              case REACT_CONTEXT_TYPE:
                fiberTag = 10;
                break a;
              case REACT_CONSUMER_TYPE:
                fiberTag = 9;
                break a;
              case REACT_FORWARD_REF_TYPE:
                fiberTag = 11;
                break a;
              case REACT_MEMO_TYPE:
                fiberTag = 14;
                break a;
              case REACT_LAZY_TYPE:
                fiberTag = 16;
                owner = null;
                break a;
            }
          fiberTag = 29;
          pendingProps = Error(
            formatProdErrorMessage(130, null === type ? "null" : typeof type, "")
          );
          owner = null;
      }
    key = createFiberImplClass(fiberTag, pendingProps, key, mode);
    key.elementType = type;
    key.type = owner;
    key.lanes = lanes;
    return key;
  }
  function createFiberFromFragment(elements, mode, lanes, key) {
    elements = createFiberImplClass(7, elements, key, mode);
    elements.lanes = lanes;
    return elements;
  }
  function createFiberFromText(content, mode, lanes) {
    content = createFiberImplClass(6, content, null, mode);
    content.lanes = lanes;
    return content;
  }
  function createFiberFromDehydratedFragment(dehydratedNode) {
    var fiber = createFiberImplClass(18, null, null, 0);
    fiber.stateNode = dehydratedNode;
    return fiber;
  }
  function createFiberFromPortal(portal, mode, lanes) {
    mode = createFiberImplClass(
      4,
      null !== portal.children ? portal.children : [],
      portal.key,
      mode
    );
    mode.lanes = lanes;
    mode.stateNode = {
      containerInfo: portal.containerInfo,
      pendingChildren: null,
      implementation: portal.implementation
    };
    return mode;
  }
  var CapturedStacks = /* @__PURE__ */ new WeakMap();
  function createCapturedValueAtFiber(value, source) {
    if ("object" === typeof value && null !== value) {
      var existing = CapturedStacks.get(value);
      if (void 0 !== existing) return existing;
      source = {
        value,
        source,
        stack: getStackByFiberInDevAndProd(source)
      };
      CapturedStacks.set(value, source);
      return source;
    }
    return {
      value,
      source,
      stack: getStackByFiberInDevAndProd(source)
    };
  }
  var forkStack = [], forkStackIndex = 0, treeForkProvider = null, treeForkCount = 0, idStack = [], idStackIndex = 0, treeContextProvider = null, treeContextId = 1, treeContextOverflow = "";
  function pushTreeFork(workInProgress2, totalChildren) {
    forkStack[forkStackIndex++] = treeForkCount;
    forkStack[forkStackIndex++] = treeForkProvider;
    treeForkProvider = workInProgress2;
    treeForkCount = totalChildren;
  }
  function pushTreeId(workInProgress2, totalChildren, index2) {
    idStack[idStackIndex++] = treeContextId;
    idStack[idStackIndex++] = treeContextOverflow;
    idStack[idStackIndex++] = treeContextProvider;
    treeContextProvider = workInProgress2;
    var baseIdWithLeadingBit = treeContextId;
    workInProgress2 = treeContextOverflow;
    var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
    baseIdWithLeadingBit &= ~(1 << baseLength);
    index2 += 1;
    var length = 32 - clz32(totalChildren) + baseLength;
    if (30 < length) {
      var numberOfOverflowBits = baseLength - baseLength % 5;
      length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32);
      baseIdWithLeadingBit >>= numberOfOverflowBits;
      baseLength -= numberOfOverflowBits;
      treeContextId = 1 << 32 - clz32(totalChildren) + baseLength | index2 << baseLength | baseIdWithLeadingBit;
      treeContextOverflow = length + workInProgress2;
    } else
      treeContextId = 1 << length | index2 << baseLength | baseIdWithLeadingBit, treeContextOverflow = workInProgress2;
  }
  function pushMaterializedTreeId(workInProgress2) {
    null !== workInProgress2.return && (pushTreeFork(workInProgress2, 1), pushTreeId(workInProgress2, 1, 0));
  }
  function popTreeContext(workInProgress2) {
    for (; workInProgress2 === treeForkProvider; )
      treeForkProvider = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null, treeForkCount = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null;
    for (; workInProgress2 === treeContextProvider; )
      treeContextProvider = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextOverflow = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextId = idStack[--idStackIndex], idStack[idStackIndex] = null;
  }
  function restoreSuspendedTreeContext(workInProgress2, suspendedContext) {
    idStack[idStackIndex++] = treeContextId;
    idStack[idStackIndex++] = treeContextOverflow;
    idStack[idStackIndex++] = treeContextProvider;
    treeContextId = suspendedContext.id;
    treeContextOverflow = suspendedContext.overflow;
    treeContextProvider = workInProgress2;
  }
  var hydrationParentFiber = null, nextHydratableInstance = null, isHydrating = false, hydrationErrors = null, rootOrSingletonContext = false, HydrationMismatchException = Error(formatProdErrorMessage(519));
  function throwOnHydrationMismatch(fiber) {
    var error = Error(
      formatProdErrorMessage(
        418,
        1 < arguments.length && void 0 !== arguments[1] && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    queueHydrationError(createCapturedValueAtFiber(error, fiber));
    throw HydrationMismatchException;
  }
  function prepareToHydrateHostInstance(fiber) {
    var instance = fiber.stateNode, type = fiber.type, props = fiber.memoizedProps;
    instance[internalInstanceKey] = fiber;
    instance[internalPropsKey] = props;
    switch (type) {
      case "dialog":
        listenToNonDelegatedEvent("cancel", instance);
        listenToNonDelegatedEvent("close", instance);
        break;
      case "iframe":
      case "object":
      case "embed":
        listenToNonDelegatedEvent("load", instance);
        break;
      case "video":
      case "audio":
        for (type = 0; type < mediaEventTypes.length; type++)
          listenToNonDelegatedEvent(mediaEventTypes[type], instance);
        break;
      case "source":
        listenToNonDelegatedEvent("error", instance);
        break;
      case "img":
      case "image":
      case "link":
        listenToNonDelegatedEvent("error", instance);
        listenToNonDelegatedEvent("load", instance);
        break;
      case "details":
        listenToNonDelegatedEvent("toggle", instance);
        break;
      case "input":
        listenToNonDelegatedEvent("invalid", instance);
        initInput(
          instance,
          props.value,
          props.defaultValue,
          props.checked,
          props.defaultChecked,
          props.type,
          props.name,
          true
        );
        break;
      case "select":
        listenToNonDelegatedEvent("invalid", instance);
        break;
      case "textarea":
        listenToNonDelegatedEvent("invalid", instance), initTextarea(instance, props.value, props.defaultValue, props.children);
    }
    type = props.children;
    "string" !== typeof type && "number" !== typeof type && "bigint" !== typeof type || instance.textContent === "" + type || true === props.suppressHydrationWarning || checkForUnmatchedText(instance.textContent, type) ? (null != props.popover && (listenToNonDelegatedEvent("beforetoggle", instance), listenToNonDelegatedEvent("toggle", instance)), null != props.onScroll && listenToNonDelegatedEvent("scroll", instance), null != props.onScrollEnd && listenToNonDelegatedEvent("scrollend", instance), null != props.onClick && (instance.onclick = noop$1), instance = true) : instance = false;
    instance || throwOnHydrationMismatch(fiber, true);
  }
  function popToNextHostParent(fiber) {
    for (hydrationParentFiber = fiber.return; hydrationParentFiber; )
      switch (hydrationParentFiber.tag) {
        case 5:
        case 31:
        case 13:
          rootOrSingletonContext = false;
          return;
        case 27:
        case 3:
          rootOrSingletonContext = true;
          return;
        default:
          hydrationParentFiber = hydrationParentFiber.return;
      }
  }
  function popHydrationState(fiber) {
    if (fiber !== hydrationParentFiber) return false;
    if (!isHydrating) return popToNextHostParent(fiber), isHydrating = true, false;
    var tag = fiber.tag, JSCompiler_temp;
    if (JSCompiler_temp = 3 !== tag && 27 !== tag) {
      if (JSCompiler_temp = 5 === tag)
        JSCompiler_temp = fiber.type, JSCompiler_temp = !("form" !== JSCompiler_temp && "button" !== JSCompiler_temp) || shouldSetTextContent(fiber.type, fiber.memoizedProps);
      JSCompiler_temp = !JSCompiler_temp;
    }
    JSCompiler_temp && nextHydratableInstance && throwOnHydrationMismatch(fiber);
    popToNextHostParent(fiber);
    if (13 === tag) {
      fiber = fiber.memoizedState;
      fiber = null !== fiber ? fiber.dehydrated : null;
      if (!fiber) throw Error(formatProdErrorMessage(317));
      nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
    } else if (31 === tag) {
      fiber = fiber.memoizedState;
      fiber = null !== fiber ? fiber.dehydrated : null;
      if (!fiber) throw Error(formatProdErrorMessage(317));
      nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
    } else
      27 === tag ? (tag = nextHydratableInstance, isSingletonScope(fiber.type) ? (fiber = previousHydratableOnEnteringScopedSingleton, previousHydratableOnEnteringScopedSingleton = null, nextHydratableInstance = fiber) : nextHydratableInstance = tag) : nextHydratableInstance = hydrationParentFiber ? getNextHydratable(fiber.stateNode.nextSibling) : null;
    return true;
  }
  function resetHydrationState() {
    nextHydratableInstance = hydrationParentFiber = null;
    isHydrating = false;
  }
  function upgradeHydrationErrorsToRecoverable() {
    var queuedErrors = hydrationErrors;
    null !== queuedErrors && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = queuedErrors : workInProgressRootRecoverableErrors.push.apply(
      workInProgressRootRecoverableErrors,
      queuedErrors
    ), hydrationErrors = null);
    return queuedErrors;
  }
  function queueHydrationError(error) {
    null === hydrationErrors ? hydrationErrors = [error] : hydrationErrors.push(error);
  }
  var valueCursor = createCursor(null), currentlyRenderingFiber$1 = null, lastContextDependency = null;
  function pushProvider(providerFiber, context, nextValue) {
    push(valueCursor, context._currentValue);
    context._currentValue = nextValue;
  }
  function popProvider(context) {
    context._currentValue = valueCursor.current;
    pop(valueCursor);
  }
  function scheduleContextWorkOnParentPath(parent, renderLanes2, propagationRoot) {
    for (; null !== parent; ) {
      var alternate = parent.alternate;
      (parent.childLanes & renderLanes2) !== renderLanes2 ? (parent.childLanes |= renderLanes2, null !== alternate && (alternate.childLanes |= renderLanes2)) : null !== alternate && (alternate.childLanes & renderLanes2) !== renderLanes2 && (alternate.childLanes |= renderLanes2);
      if (parent === propagationRoot) break;
      parent = parent.return;
    }
  }
  function propagateContextChanges(workInProgress2, contexts, renderLanes2, forcePropagateEntireTree) {
    var fiber = workInProgress2.child;
    null !== fiber && (fiber.return = workInProgress2);
    for (; null !== fiber; ) {
      var list = fiber.dependencies;
      if (null !== list) {
        var nextFiber = fiber.child;
        list = list.firstContext;
        a: for (; null !== list; ) {
          var dependency = list;
          list = fiber;
          for (var i = 0; i < contexts.length; i++)
            if (dependency.context === contexts[i]) {
              list.lanes |= renderLanes2;
              dependency = list.alternate;
              null !== dependency && (dependency.lanes |= renderLanes2);
              scheduleContextWorkOnParentPath(
                list.return,
                renderLanes2,
                workInProgress2
              );
              forcePropagateEntireTree || (nextFiber = null);
              break a;
            }
          list = dependency.next;
        }
      } else if (18 === fiber.tag) {
        nextFiber = fiber.return;
        if (null === nextFiber) throw Error(formatProdErrorMessage(341));
        nextFiber.lanes |= renderLanes2;
        list = nextFiber.alternate;
        null !== list && (list.lanes |= renderLanes2);
        scheduleContextWorkOnParentPath(nextFiber, renderLanes2, workInProgress2);
        nextFiber = null;
      } else
        13 === fiber.tag && null !== fiber.memoizedState && null === fiber.memoizedState.dehydrated ? (fiber.lanes |= renderLanes2, nextFiber = fiber.alternate, null !== nextFiber && (nextFiber.lanes |= renderLanes2), scheduleContextWorkOnParentPath(
          fiber.return,
          renderLanes2,
          workInProgress2
        ), nextFiber = fiber.child, nextFiber = null !== nextFiber ? nextFiber.sibling : null) : nextFiber = fiber.child;
      if (null !== nextFiber) nextFiber.return = fiber;
      else
        for (nextFiber = fiber; null !== nextFiber; ) {
          if (nextFiber === workInProgress2) {
            nextFiber = null;
            break;
          }
          fiber = nextFiber.sibling;
          if (null !== fiber) {
            fiber.return = nextFiber.return;
            nextFiber = fiber;
            break;
          }
          nextFiber = nextFiber.return;
        }
      fiber = nextFiber;
    }
  }
  function propagateParentContextChanges(current, workInProgress2, renderLanes2, forcePropagateEntireTree) {
    current = null;
    for (var parent = workInProgress2, isInsidePropagationBailout = false; null !== parent; ) {
      if (!isInsidePropagationBailout) {
        if (0 !== (parent.flags & 524288)) isInsidePropagationBailout = true;
        else if (0 !== (parent.flags & 262144)) break;
      }
      if (10 === parent.tag) {
        var currentParent = parent.alternate;
        if (null === currentParent) throw Error(formatProdErrorMessage(387));
        currentParent = currentParent.memoizedProps;
        if (null !== currentParent) {
          var context = parent.type;
          objectIs(parent.pendingProps.value, currentParent.value) || (null !== current ? current.push(context) : current = [context]);
        }
      } else if (parent === hostTransitionProviderCursor.current) {
        currentParent = parent.alternate;
        if (null === currentParent) throw Error(formatProdErrorMessage(387));
        currentParent.memoizedState.memoizedState !== parent.memoizedState.memoizedState && (null !== current ? current.push(HostTransitionContext) : current = [HostTransitionContext]);
      }
      parent = parent.return;
    }
    null !== current && propagateContextChanges(
      workInProgress2,
      current,
      renderLanes2,
      forcePropagateEntireTree
    );
    workInProgress2.flags |= 262144;
    return null !== current;
  }
  function checkIfContextChanged(currentDependencies) {
    for (currentDependencies = currentDependencies.firstContext; null !== currentDependencies; ) {
      if (!objectIs(
        currentDependencies.context._currentValue,
        currentDependencies.memoizedValue
      ))
        return true;
      currentDependencies = currentDependencies.next;
    }
    return false;
  }
  function prepareToReadContext(workInProgress2) {
    currentlyRenderingFiber$1 = workInProgress2;
    lastContextDependency = null;
    workInProgress2 = workInProgress2.dependencies;
    null !== workInProgress2 && (workInProgress2.firstContext = null);
  }
  function readContext(context) {
    return readContextForConsumer(currentlyRenderingFiber$1, context);
  }
  function readContextDuringReconciliation(consumer, context) {
    null === currentlyRenderingFiber$1 && prepareToReadContext(consumer);
    return readContextForConsumer(consumer, context);
  }
  function readContextForConsumer(consumer, context) {
    var value = context._currentValue;
    context = { context, memoizedValue: value, next: null };
    if (null === lastContextDependency) {
      if (null === consumer) throw Error(formatProdErrorMessage(308));
      lastContextDependency = context;
      consumer.dependencies = { lanes: 0, firstContext: context };
      consumer.flags |= 524288;
    } else lastContextDependency = lastContextDependency.next = context;
    return value;
  }
  var AbortControllerLocal = "undefined" !== typeof AbortController ? AbortController : function() {
    var listeners = [], signal = this.signal = {
      aborted: false,
      addEventListener: function(type, listener) {
        listeners.push(listener);
      }
    };
    this.abort = function() {
      signal.aborted = true;
      listeners.forEach(function(listener) {
        return listener();
      });
    };
  }, scheduleCallback$2 = Scheduler.unstable_scheduleCallback, NormalPriority = Scheduler.unstable_NormalPriority, CacheContext = {
    $$typeof: REACT_CONTEXT_TYPE,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function createCache() {
    return {
      controller: new AbortControllerLocal(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function releaseCache(cache) {
    cache.refCount--;
    0 === cache.refCount && scheduleCallback$2(NormalPriority, function() {
      cache.controller.abort();
    });
  }
  function queueTransitionTypes(root2, transitionTypes) {
    if (0 !== (root2.pendingLanes & 4194048)) {
      var queued = root2.transitionTypes;
      null === queued && (queued = root2.transitionTypes = []);
      for (root2 = 0; root2 < transitionTypes.length; root2++) {
        var transitionType = transitionTypes[root2];
        -1 === queued.indexOf(transitionType) && queued.push(transitionType);
      }
    }
  }
  var entangledTransitionTypes = null;
  function claimQueuedTransitionTypes(root2) {
    var claimed = root2.transitionTypes;
    root2.transitionTypes = null;
    return claimed;
  }
  var currentEntangledListeners = null, currentEntangledPendingCount = 0, currentEntangledLane = 0, currentEntangledActionThenable = null;
  function entangleAsyncAction(transition, thenable) {
    if (null === currentEntangledListeners) {
      var entangledListeners = currentEntangledListeners = [];
      currentEntangledPendingCount = 0;
      currentEntangledLane = requestTransitionLane();
      currentEntangledActionThenable = {
        status: "pending",
        value: void 0,
        then: function(resolve) {
          entangledListeners.push(resolve);
        }
      };
    }
    currentEntangledPendingCount++;
    thenable.then(pingEngtangledActionScope, pingEngtangledActionScope);
    return thenable;
  }
  function pingEngtangledActionScope() {
    if (0 === --currentEntangledPendingCount && (entangledTransitionTypes = null, null !== currentEntangledListeners)) {
      null !== currentEntangledActionThenable && (currentEntangledActionThenable.status = "fulfilled");
      var listeners = currentEntangledListeners;
      currentEntangledListeners = null;
      currentEntangledLane = 0;
      currentEntangledActionThenable = null;
      for (var i = 0; i < listeners.length; i++) (0, listeners[i])();
    }
  }
  function chainThenableValue(thenable, result) {
    var listeners = [], thenableWithOverride = {
      status: "pending",
      value: null,
      reason: null,
      then: function(resolve) {
        listeners.push(resolve);
      }
    };
    thenable.then(
      function() {
        thenableWithOverride.status = "fulfilled";
        thenableWithOverride.value = result;
        for (var i = 0; i < listeners.length; i++) (0, listeners[i])(result);
      },
      function(error) {
        thenableWithOverride.status = "rejected";
        thenableWithOverride.reason = error;
        for (error = 0; error < listeners.length; error++)
          (0, listeners[error])(void 0);
      }
    );
    return thenableWithOverride;
  }
  var prevOnStartTransitionFinish = ReactSharedInternals.S;
  ReactSharedInternals.S = function(transition, returnValue) {
    globalMostRecentTransitionTime = now();
    "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && entangleAsyncAction(transition, returnValue);
    if (null !== entangledTransitionTypes)
      for (var root$28 = firstScheduledRoot; null !== root$28; )
        queueTransitionTypes(root$28, entangledTransitionTypes), root$28 = root$28.next;
    root$28 = transition.types;
    if (null !== root$28) {
      for (var root$29 = firstScheduledRoot; null !== root$29; )
        queueTransitionTypes(root$29, root$28), root$29 = root$29.next;
      if (0 !== currentEntangledLane) {
        root$29 = entangledTransitionTypes;
        null === root$29 && (root$29 = entangledTransitionTypes = []);
        for (var i = 0; i < root$28.length; i++) {
          var transitionType = root$28[i];
          -1 === root$29.indexOf(transitionType) && root$29.push(transitionType);
        }
      }
    }
    null !== prevOnStartTransitionFinish && prevOnStartTransitionFinish(transition, returnValue);
  };
  var resumedCache = createCursor(null);
  function peekCacheFromPool() {
    var cacheResumedFromPreviousRender = resumedCache.current;
    return null !== cacheResumedFromPreviousRender ? cacheResumedFromPreviousRender : workInProgressRoot.pooledCache;
  }
  function pushTransition(offscreenWorkInProgress, prevCachePool) {
    null === prevCachePool ? push(resumedCache, resumedCache.current) : push(resumedCache, prevCachePool.pool);
  }
  function getSuspendedCache() {
    var cacheFromPool = peekCacheFromPool();
    return null === cacheFromPool ? null : { parent: CacheContext._currentValue, pool: cacheFromPool };
  }
  var SuspenseException = Error(formatProdErrorMessage(460)), SuspenseyCommitException = Error(formatProdErrorMessage(474)), SuspenseActionException = Error(formatProdErrorMessage(542)), noopSuspenseyCommitThenable = { then: function() {
  } };
  function isThenableResolved(thenable) {
    thenable = thenable.status;
    return "fulfilled" === thenable || "rejected" === thenable;
  }
  function trackUsedThenable(thenableState2, thenable, index2) {
    index2 = thenableState2[index2];
    void 0 === index2 ? thenableState2.push(thenable) : index2 !== thenable && (thenable.then(noop$1, noop$1), thenable = index2);
    switch (thenable.status) {
      case "fulfilled":
        return thenable.value;
      case "rejected":
        thenableState2 = thenable.reason;
        checkIfUseWrappedInAsyncCatch(thenableState2);
        if (void 0 === thenableState2 && !("reason" in thenable))
          throw Error(formatProdErrorMessage(600));
        throw thenableState2;
      default:
        if ("string" === typeof thenable.status) thenable.then(noop$1, noop$1);
        else {
          thenableState2 = workInProgressRoot;
          if (null !== thenableState2 && 100 < thenableState2.shellSuspendCounter)
            throw Error(formatProdErrorMessage(482));
          thenableState2 = thenable;
          thenableState2.status = "pending";
          thenableState2.then(
            function(fulfilledValue) {
              if ("pending" === thenable.status) {
                var fulfilledThenable = thenable;
                fulfilledThenable.status = "fulfilled";
                fulfilledThenable.value = fulfilledValue;
              }
            },
            function(error) {
              if ("pending" === thenable.status) {
                var rejectedThenable = thenable;
                rejectedThenable.status = "rejected";
                rejectedThenable.reason = error;
              }
            }
          );
        }
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenableState2 = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState2), thenableState2;
        }
        suspendedThenable = thenable;
        throw SuspenseException;
    }
  }
  function resolveLazy(lazyType) {
    try {
      var init = lazyType._init;
      return init(lazyType._payload);
    } catch (x) {
      if (null !== x && "object" === typeof x && "function" === typeof x.then)
        throw suspendedThenable = x, SuspenseException;
      throw x;
    }
  }
  var suspendedThenable = null;
  function getSuspendedThenable() {
    if (null === suspendedThenable) throw Error(formatProdErrorMessage(459));
    var thenable = suspendedThenable;
    suspendedThenable = null;
    return thenable;
  }
  function checkIfUseWrappedInAsyncCatch(rejectedReason) {
    if (rejectedReason === SuspenseException || rejectedReason === SuspenseActionException)
      throw Error(formatProdErrorMessage(483));
  }
  var thenableState$1 = null, thenableIndexCounter$1 = 0;
  function unwrapThenable(thenable) {
    var index2 = thenableIndexCounter$1;
    thenableIndexCounter$1 += 1;
    null === thenableState$1 && (thenableState$1 = []);
    return trackUsedThenable(thenableState$1, thenable, index2);
  }
  function coerceRef(workInProgress2, element) {
    element = element.props.ref;
    workInProgress2.ref = void 0 !== element ? element : null;
  }
  function throwOnInvalidObjectTypeImpl(returnFiber, newChild) {
    if (newChild.$$typeof === REACT_LEGACY_ELEMENT_TYPE)
      throw Error(formatProdErrorMessage(525));
    returnFiber = Object.prototype.toString.call(newChild);
    throw Error(
      formatProdErrorMessage(
        31,
        "[object Object]" === returnFiber ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : returnFiber
      )
    );
  }
  function createChildReconciler(shouldTrackSideEffects) {
    function deleteChild(returnFiber, childToDelete) {
      if (shouldTrackSideEffects) {
        var deletions = returnFiber.deletions;
        null === deletions ? (returnFiber.deletions = [childToDelete], returnFiber.flags |= 16) : deletions.push(childToDelete);
      }
    }
    function deleteRemainingChildren(returnFiber, currentFirstChild) {
      if (!shouldTrackSideEffects) return null;
      for (; null !== currentFirstChild; )
        deleteChild(returnFiber, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
      return null;
    }
    function mapRemainingChildren(currentFirstChild) {
      for (var existingChildren = /* @__PURE__ */ new Map(); null !== currentFirstChild; )
        null === currentFirstChild.key ? existingChildren.set(currentFirstChild.index, currentFirstChild) : existingChildren.set(currentFirstChild.key, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
      return existingChildren;
    }
    function useFiber(fiber, pendingProps) {
      fiber = createWorkInProgress(fiber, pendingProps);
      fiber.index = 0;
      fiber.sibling = null;
      return fiber;
    }
    function placeChild(newFiber, lastPlacedIndex, newIndex) {
      newFiber.index = newIndex;
      if (!shouldTrackSideEffects)
        return newFiber.flags |= 1048576, lastPlacedIndex;
      newIndex = newFiber.alternate;
      if (null !== newIndex)
        return newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.flags |= 2, lastPlacedIndex) : newIndex;
      newFiber.flags |= 134217730;
      return lastPlacedIndex;
    }
    function placeSingleChild(newFiber) {
      shouldTrackSideEffects && null === newFiber.alternate && (newFiber.flags |= 134217730);
      return newFiber;
    }
    function updateTextNode(returnFiber, current, textContent, lanes) {
      if (null === current || 6 !== current.tag)
        return current = createFiberFromText(textContent, returnFiber.mode, lanes), current.return = returnFiber, current;
      current = useFiber(current, textContent);
      current.return = returnFiber;
      return current;
    }
    function updateElement(returnFiber, current, element, lanes) {
      var elementType = element.type;
      if (elementType === REACT_FRAGMENT_TYPE)
        return returnFiber = updateFragment(
          returnFiber,
          current,
          element.props.children,
          lanes,
          element.key
        ), coerceRef(returnFiber, element), returnFiber;
      if (null !== current && (current.elementType === elementType || "object" === typeof elementType && null !== elementType && elementType.$$typeof === REACT_LAZY_TYPE && resolveLazy(elementType) === current.type))
        return current = useFiber(current, element.props), coerceRef(current, element), current.return = returnFiber, current;
      current = createFiberFromTypeAndProps(
        element.type,
        element.key,
        element.props,
        null,
        returnFiber.mode,
        lanes
      );
      coerceRef(current, element);
      current.return = returnFiber;
      return current;
    }
    function updatePortal(returnFiber, current, portal, lanes) {
      if (null === current || 4 !== current.tag || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation)
        return current = createFiberFromPortal(portal, returnFiber.mode, lanes), current.return = returnFiber, current;
      current = useFiber(current, portal.children || []);
      current.return = returnFiber;
      return current;
    }
    function updateFragment(returnFiber, current, fragment, lanes, key) {
      if (null === current || 7 !== current.tag)
        return current = createFiberFromFragment(
          fragment,
          returnFiber.mode,
          lanes,
          key
        ), current.return = returnFiber, current;
      current = useFiber(current, fragment);
      current.return = returnFiber;
      return current;
    }
    function createChild(returnFiber, newChild, lanes) {
      if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
        return newChild = createFiberFromText(
          "" + newChild,
          returnFiber.mode,
          lanes
        ), newChild.return = returnFiber, newChild;
      if ("object" === typeof newChild && null !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return lanes = createFiberFromTypeAndProps(
              newChild.type,
              newChild.key,
              newChild.props,
              null,
              returnFiber.mode,
              lanes
            ), coerceRef(lanes, newChild), lanes.return = returnFiber, lanes;
          case REACT_PORTAL_TYPE:
            return newChild = createFiberFromPortal(
              newChild,
              returnFiber.mode,
              lanes
            ), newChild.return = returnFiber, newChild;
          case REACT_LAZY_TYPE:
            return newChild = resolveLazy(newChild), createChild(returnFiber, newChild, lanes);
        }
        if (isArrayImpl(newChild) || getIteratorFn(newChild))
          return newChild = createFiberFromFragment(
            newChild,
            returnFiber.mode,
            lanes,
            null
          ), newChild.return = returnFiber, newChild;
        if ("function" === typeof newChild.then)
          return createChild(returnFiber, unwrapThenable(newChild), lanes);
        if (newChild.$$typeof === REACT_CONTEXT_TYPE)
          return createChild(
            returnFiber,
            readContextDuringReconciliation(returnFiber, newChild),
            lanes
          );
        throwOnInvalidObjectTypeImpl(returnFiber, newChild);
      }
      return null;
    }
    function updateSlot(returnFiber, oldFiber, newChild, lanes) {
      var key = null !== oldFiber ? oldFiber.key : null;
      if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
        return null !== key ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
      if ("object" === typeof newChild && null !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return newChild.key === key ? updateElement(returnFiber, oldFiber, newChild, lanes) : null;
          case REACT_PORTAL_TYPE:
            return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, lanes) : null;
          case REACT_LAZY_TYPE:
            return newChild = resolveLazy(newChild), updateSlot(returnFiber, oldFiber, newChild, lanes);
        }
        if (isArrayImpl(newChild) || getIteratorFn(newChild))
          return null !== key ? null : updateFragment(returnFiber, oldFiber, newChild, lanes, null);
        if ("function" === typeof newChild.then)
          return updateSlot(
            returnFiber,
            oldFiber,
            unwrapThenable(newChild),
            lanes
          );
        if (newChild.$$typeof === REACT_CONTEXT_TYPE)
          return updateSlot(
            returnFiber,
            oldFiber,
            readContextDuringReconciliation(returnFiber, newChild),
            lanes
          );
        throwOnInvalidObjectTypeImpl(returnFiber, newChild);
      }
      return null;
    }
    function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
      if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
        return existingChildren = existingChildren.get(newIdx) || null, updateTextNode(returnFiber, existingChildren, "" + newChild, lanes);
      if ("object" === typeof newChild && null !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return existingChildren = existingChildren.get(
              null === newChild.key ? newIdx : newChild.key
            ) || null, updateElement(returnFiber, existingChildren, newChild, lanes);
          case REACT_PORTAL_TYPE:
            return existingChildren = existingChildren.get(
              null === newChild.key ? newIdx : newChild.key
            ) || null, updatePortal(returnFiber, existingChildren, newChild, lanes);
          case REACT_LAZY_TYPE:
            return newChild = resolveLazy(newChild), updateFromMap(
              existingChildren,
              returnFiber,
              newIdx,
              newChild,
              lanes
            );
        }
        if (isArrayImpl(newChild) || getIteratorFn(newChild))
          return existingChildren = existingChildren.get(newIdx) || null, updateFragment(returnFiber, existingChildren, newChild, lanes, null);
        if ("function" === typeof newChild.then)
          return updateFromMap(
            existingChildren,
            returnFiber,
            newIdx,
            unwrapThenable(newChild),
            lanes
          );
        if (newChild.$$typeof === REACT_CONTEXT_TYPE)
          return updateFromMap(
            existingChildren,
            returnFiber,
            newIdx,
            readContextDuringReconciliation(returnFiber, newChild),
            lanes
          );
        throwOnInvalidObjectTypeImpl(returnFiber, newChild);
      }
      return null;
    }
    function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
      for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null; null !== oldFiber && newIdx < newChildren.length; newIdx++) {
        oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
        var newFiber = updateSlot(
          returnFiber,
          oldFiber,
          newChildren[newIdx],
          lanes
        );
        if (null === newFiber) {
          null === oldFiber && (oldFiber = nextOldFiber);
          break;
        }
        shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
        currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
        null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
        previousNewFiber = newFiber;
        oldFiber = nextOldFiber;
      }
      if (newIdx === newChildren.length)
        return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
      if (null === oldFiber) {
        for (; newIdx < newChildren.length; newIdx++)
          oldFiber = createChild(returnFiber, newChildren[newIdx], lanes), null !== oldFiber && (currentFirstChild = placeChild(
            oldFiber,
            currentFirstChild,
            newIdx
          ), null === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
        isHydrating && pushTreeFork(returnFiber, newIdx);
        return resultingFirstChild;
      }
      for (oldFiber = mapRemainingChildren(oldFiber); newIdx < newChildren.length; newIdx++)
        nextOldFiber = updateFromMap(
          oldFiber,
          returnFiber,
          newIdx,
          newChildren[newIdx],
          lanes
        ), null !== nextOldFiber && (shouldTrackSideEffects && (newFiber = nextOldFiber.alternate, null !== newFiber && oldFiber.delete(null === newFiber.key ? newIdx : newFiber.key)), currentFirstChild = placeChild(
          nextOldFiber,
          currentFirstChild,
          newIdx
        ), null === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
      shouldTrackSideEffects && oldFiber.forEach(function(child) {
        return deleteChild(returnFiber, child);
      });
      isHydrating && pushTreeFork(returnFiber, newIdx);
      return resultingFirstChild;
    }
    function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildren, lanes) {
      if (null == newChildren) throw Error(formatProdErrorMessage(151));
      for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null, step = newChildren.next(); null !== oldFiber && !step.done; newIdx++, step = newChildren.next()) {
        oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
        var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
        if (null === newFiber) {
          null === oldFiber && (oldFiber = nextOldFiber);
          break;
        }
        shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
        currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
        null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
        previousNewFiber = newFiber;
        oldFiber = nextOldFiber;
      }
      if (step.done)
        return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
      if (null === oldFiber) {
        for (; !step.done; newIdx++, step = newChildren.next())
          step = createChild(returnFiber, step.value, lanes), null !== step && (currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
        isHydrating && pushTreeFork(returnFiber, newIdx);
        return resultingFirstChild;
      }
      for (oldFiber = mapRemainingChildren(oldFiber); !step.done; newIdx++, step = newChildren.next())
        step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, lanes), null !== step && (shouldTrackSideEffects && (nextOldFiber = step.alternate, null !== nextOldFiber && oldFiber.delete(
          null === nextOldFiber.key ? newIdx : nextOldFiber.key
        )), currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
      shouldTrackSideEffects && oldFiber.forEach(function(child) {
        return deleteChild(returnFiber, child);
      });
      isHydrating && pushTreeFork(returnFiber, newIdx);
      return resultingFirstChild;
    }
    function reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes) {
      "object" === typeof newChild && null !== newChild && newChild.type === REACT_FRAGMENT_TYPE && null === newChild.key && void 0 === newChild.props.ref && (newChild = newChild.props.children);
      if ("object" === typeof newChild && null !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            a: {
              for (var key = newChild.key; null !== currentFirstChild; ) {
                if (currentFirstChild.key === key) {
                  key = newChild.type;
                  if (key === REACT_FRAGMENT_TYPE) {
                    if (7 === currentFirstChild.tag) {
                      deleteRemainingChildren(
                        returnFiber,
                        currentFirstChild.sibling
                      );
                      lanes = useFiber(
                        currentFirstChild,
                        newChild.props.children
                      );
                      coerceRef(lanes, newChild);
                      lanes.return = returnFiber;
                      returnFiber = lanes;
                      break a;
                    }
                  } else if (currentFirstChild.elementType === key || "object" === typeof key && null !== key && key.$$typeof === REACT_LAZY_TYPE && resolveLazy(key) === currentFirstChild.type) {
                    deleteRemainingChildren(
                      returnFiber,
                      currentFirstChild.sibling
                    );
                    lanes = useFiber(currentFirstChild, newChild.props);
                    coerceRef(lanes, newChild);
                    lanes.return = returnFiber;
                    returnFiber = lanes;
                    break a;
                  }
                  deleteRemainingChildren(returnFiber, currentFirstChild);
                  break;
                } else deleteChild(returnFiber, currentFirstChild);
                currentFirstChild = currentFirstChild.sibling;
              }
              newChild.type === REACT_FRAGMENT_TYPE ? (lanes = createFiberFromFragment(
                newChild.props.children,
                returnFiber.mode,
                lanes,
                newChild.key
              ), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes) : (lanes = createFiberFromTypeAndProps(
                newChild.type,
                newChild.key,
                newChild.props,
                null,
                returnFiber.mode,
                lanes
              ), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes);
            }
            return placeSingleChild(returnFiber);
          case REACT_PORTAL_TYPE:
            a: {
              for (key = newChild.key; null !== currentFirstChild; ) {
                if (currentFirstChild.key === key)
                  if (4 === currentFirstChild.tag && currentFirstChild.stateNode.containerInfo === newChild.containerInfo && currentFirstChild.stateNode.implementation === newChild.implementation) {
                    deleteRemainingChildren(
                      returnFiber,
                      currentFirstChild.sibling
                    );
                    lanes = useFiber(currentFirstChild, newChild.children || []);
                    lanes.return = returnFiber;
                    returnFiber = lanes;
                    break a;
                  } else {
                    deleteRemainingChildren(returnFiber, currentFirstChild);
                    break;
                  }
                else deleteChild(returnFiber, currentFirstChild);
                currentFirstChild = currentFirstChild.sibling;
              }
              lanes = createFiberFromPortal(newChild, returnFiber.mode, lanes);
              lanes.return = returnFiber;
              returnFiber = lanes;
            }
            return placeSingleChild(returnFiber);
          case REACT_LAZY_TYPE:
            return newChild = resolveLazy(newChild), reconcileChildFibersImpl(
              returnFiber,
              currentFirstChild,
              newChild,
              lanes
            );
        }
        if (isArrayImpl(newChild))
          return reconcileChildrenArray(
            returnFiber,
            currentFirstChild,
            newChild,
            lanes
          );
        if (getIteratorFn(newChild)) {
          key = getIteratorFn(newChild);
          if ("function" !== typeof key) throw Error(formatProdErrorMessage(150));
          newChild = key.call(newChild);
          return reconcileChildrenIterator(
            returnFiber,
            currentFirstChild,
            newChild,
            lanes
          );
        }
        if ("function" === typeof newChild.then)
          return reconcileChildFibersImpl(
            returnFiber,
            currentFirstChild,
            unwrapThenable(newChild),
            lanes
          );
        if (newChild.$$typeof === REACT_CONTEXT_TYPE)
          return reconcileChildFibersImpl(
            returnFiber,
            currentFirstChild,
            readContextDuringReconciliation(returnFiber, newChild),
            lanes
          );
        throwOnInvalidObjectTypeImpl(returnFiber, newChild);
      }
      return "string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild ? (newChild = "" + newChild, null !== currentFirstChild && 6 === currentFirstChild.tag ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), lanes = useFiber(currentFirstChild, newChild), lanes.return = returnFiber, returnFiber = lanes) : (deleteRemainingChildren(returnFiber, currentFirstChild), lanes = createFiberFromText(newChild, returnFiber.mode, lanes), lanes.return = returnFiber, returnFiber = lanes), placeSingleChild(returnFiber)) : deleteRemainingChildren(returnFiber, currentFirstChild);
    }
    return function(returnFiber, currentFirstChild, newChild, lanes) {
      try {
        thenableIndexCounter$1 = 0;
        var firstChildFiber = reconcileChildFibersImpl(
          returnFiber,
          currentFirstChild,
          newChild,
          lanes
        );
        thenableState$1 = null;
        return firstChildFiber;
      } catch (x) {
        if (x === SuspenseException || x === SuspenseActionException) throw x;
        var fiber = createFiberImplClass(29, x, null, returnFiber.mode);
        fiber.lanes = lanes;
        fiber.return = returnFiber;
        return fiber;
      } finally {
      }
    };
  }
  var reconcileChildFibers = createChildReconciler(true), mountChildFibers = createChildReconciler(false), hasForceUpdate = false;
  function initializeUpdateQueue(fiber) {
    fiber.updateQueue = {
      baseState: fiber.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function cloneUpdateQueue(current, workInProgress2) {
    current = current.updateQueue;
    workInProgress2.updateQueue === current && (workInProgress2.updateQueue = {
      baseState: current.baseState,
      firstBaseUpdate: current.firstBaseUpdate,
      lastBaseUpdate: current.lastBaseUpdate,
      shared: current.shared,
      callbacks: null
    });
  }
  function createUpdate(lane) {
    return { lane, tag: 0, payload: null, callback: null, next: null };
  }
  function enqueueUpdate(fiber, update, lane) {
    var updateQueue = fiber.updateQueue;
    if (null === updateQueue) return null;
    updateQueue = updateQueue.shared;
    if (0 !== (executionContext & 2)) {
      var pending = updateQueue.pending;
      null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
      updateQueue.pending = update;
      update = getRootForUpdatedFiber(fiber);
      markUpdateLaneFromFiberToRoot(fiber, null, lane);
      return update;
    }
    enqueueUpdate$1(fiber, updateQueue, update, lane);
    return getRootForUpdatedFiber(fiber);
  }
  function entangleTransitions(root2, fiber, lane) {
    fiber = fiber.updateQueue;
    if (null !== fiber && (fiber = fiber.shared, 0 !== (lane & 4194048))) {
      var queueLanes = fiber.lanes;
      queueLanes &= root2.pendingLanes;
      lane |= queueLanes;
      fiber.lanes = lane;
      markRootEntangled(root2, lane);
    }
  }
  function enqueueCapturedUpdate(workInProgress2, capturedUpdate) {
    var queue2 = workInProgress2.updateQueue, current = workInProgress2.alternate;
    if (null !== current && (current = current.updateQueue, queue2 === current)) {
      var newFirst = null, newLast = null;
      queue2 = queue2.firstBaseUpdate;
      if (null !== queue2) {
        do {
          var clone = {
            lane: queue2.lane,
            tag: queue2.tag,
            payload: queue2.payload,
            callback: null,
            next: null
          };
          null === newLast ? newFirst = newLast = clone : newLast = newLast.next = clone;
          queue2 = queue2.next;
        } while (null !== queue2);
        null === newLast ? newFirst = newLast = capturedUpdate : newLast = newLast.next = capturedUpdate;
      } else newFirst = newLast = capturedUpdate;
      queue2 = {
        baseState: current.baseState,
        firstBaseUpdate: newFirst,
        lastBaseUpdate: newLast,
        shared: current.shared,
        callbacks: current.callbacks
      };
      workInProgress2.updateQueue = queue2;
      return;
    }
    workInProgress2 = queue2.lastBaseUpdate;
    null === workInProgress2 ? queue2.firstBaseUpdate = capturedUpdate : workInProgress2.next = capturedUpdate;
    queue2.lastBaseUpdate = capturedUpdate;
  }
  var didReadFromEntangledAsyncAction = false;
  function suspendIfUpdateReadFromEntangledAsyncAction() {
    if (didReadFromEntangledAsyncAction) {
      var entangledActionThenable = currentEntangledActionThenable;
      if (null !== entangledActionThenable) throw entangledActionThenable;
    }
  }
  function processUpdateQueue(workInProgress$jscomp$0, props, instance$jscomp$0, renderLanes2) {
    didReadFromEntangledAsyncAction = false;
    var queue2 = workInProgress$jscomp$0.updateQueue;
    hasForceUpdate = false;
    var firstBaseUpdate = queue2.firstBaseUpdate, lastBaseUpdate = queue2.lastBaseUpdate, pendingQueue = queue2.shared.pending;
    if (null !== pendingQueue) {
      queue2.shared.pending = null;
      var lastPendingUpdate = pendingQueue, firstPendingUpdate = lastPendingUpdate.next;
      lastPendingUpdate.next = null;
      null === lastBaseUpdate ? firstBaseUpdate = firstPendingUpdate : lastBaseUpdate.next = firstPendingUpdate;
      lastBaseUpdate = lastPendingUpdate;
      var current = workInProgress$jscomp$0.alternate;
      null !== current && (current = current.updateQueue, pendingQueue = current.lastBaseUpdate, pendingQueue !== lastBaseUpdate && (null === pendingQueue ? current.firstBaseUpdate = firstPendingUpdate : pendingQueue.next = firstPendingUpdate, current.lastBaseUpdate = lastPendingUpdate));
    }
    if (null !== firstBaseUpdate) {
      var newState = queue2.baseState;
      lastBaseUpdate = 0;
      current = firstPendingUpdate = lastPendingUpdate = null;
      pendingQueue = firstBaseUpdate;
      do {
        var updateLane = pendingQueue.lane & -536870913, isHiddenUpdate = updateLane !== pendingQueue.lane;
        if (isHiddenUpdate ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes2 & updateLane) === updateLane) {
          0 !== updateLane && updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction = true);
          null !== current && (current = current.next = {
            lane: 0,
            tag: pendingQueue.tag,
            payload: pendingQueue.payload,
            callback: null,
            next: null
          });
          a: {
            var workInProgress2 = workInProgress$jscomp$0, update = pendingQueue;
            updateLane = props;
            var instance = instance$jscomp$0;
            switch (update.tag) {
              case 1:
                workInProgress2 = update.payload;
                if ("function" === typeof workInProgress2) {
                  newState = workInProgress2.call(instance, newState, updateLane);
                  break a;
                }
                newState = workInProgress2;
                break a;
              case 3:
                workInProgress2.flags = workInProgress2.flags & -65537 | 128;
              case 0:
                workInProgress2 = update.payload;
                updateLane = "function" === typeof workInProgress2 ? workInProgress2.call(instance, newState, updateLane) : workInProgress2;
                if (null === updateLane || void 0 === updateLane) break a;
                newState = assign({}, newState, updateLane);
                break a;
              case 2:
                hasForceUpdate = true;
            }
          }
          updateLane = pendingQueue.callback;
          null !== updateLane && (workInProgress$jscomp$0.flags |= 64, isHiddenUpdate && (workInProgress$jscomp$0.flags |= 8192), isHiddenUpdate = queue2.callbacks, null === isHiddenUpdate ? queue2.callbacks = [updateLane] : isHiddenUpdate.push(updateLane));
        } else
          isHiddenUpdate = {
            lane: updateLane,
            tag: pendingQueue.tag,
            payload: pendingQueue.payload,
            callback: pendingQueue.callback,
            next: null
          }, null === current ? (firstPendingUpdate = current = isHiddenUpdate, lastPendingUpdate = newState) : current = current.next = isHiddenUpdate, lastBaseUpdate |= updateLane;
        pendingQueue = pendingQueue.next;
        if (null === pendingQueue)
          if (pendingQueue = queue2.shared.pending, null === pendingQueue)
            break;
          else
            isHiddenUpdate = pendingQueue, pendingQueue = isHiddenUpdate.next, isHiddenUpdate.next = null, queue2.lastBaseUpdate = isHiddenUpdate, queue2.shared.pending = null;
      } while (1);
      null === current && (lastPendingUpdate = newState);
      queue2.baseState = lastPendingUpdate;
      queue2.firstBaseUpdate = firstPendingUpdate;
      queue2.lastBaseUpdate = current;
      null === firstBaseUpdate && (queue2.shared.lanes = 0);
      workInProgressRootSkippedLanes |= lastBaseUpdate;
      workInProgress$jscomp$0.lanes = lastBaseUpdate;
      workInProgress$jscomp$0.memoizedState = newState;
    }
  }
  function callCallback(callback, context) {
    if ("function" !== typeof callback)
      throw Error(formatProdErrorMessage(191, callback));
    callback.call(context);
  }
  function commitCallbacks(updateQueue, context) {
    var callbacks = updateQueue.callbacks;
    if (null !== callbacks)
      for (updateQueue.callbacks = null, updateQueue = 0; updateQueue < callbacks.length; updateQueue++)
        callCallback(callbacks[updateQueue], context);
  }
  var currentTreeHiddenStackCursor = createCursor(null), prevEntangledRenderLanesCursor = createCursor(0);
  function pushHiddenContext(fiber, context) {
    fiber = entangledRenderLanes;
    push(prevEntangledRenderLanesCursor, fiber);
    push(currentTreeHiddenStackCursor, context);
    entangledRenderLanes = fiber | context.baseLanes;
  }
  function reuseHiddenContextOnStack() {
    push(prevEntangledRenderLanesCursor, entangledRenderLanes);
    push(currentTreeHiddenStackCursor, currentTreeHiddenStackCursor.current);
  }
  function popHiddenContext() {
    entangledRenderLanes = prevEntangledRenderLanesCursor.current;
    pop(currentTreeHiddenStackCursor);
    pop(prevEntangledRenderLanesCursor);
  }
  var suspenseHandlerStackCursor = createCursor(null), shellBoundary = null;
  function pushPrimaryTreeSuspenseHandler(handler) {
    var current = handler.alternate;
    push(suspenseStackCursor, suspenseStackCursor.current & 1);
    push(suspenseHandlerStackCursor, handler);
    null === shellBoundary && (null === current || null !== currentTreeHiddenStackCursor.current ? shellBoundary = handler : null !== current.memoizedState && (shellBoundary = handler));
  }
  function pushDehydratedActivitySuspenseHandler(fiber) {
    push(suspenseStackCursor, suspenseStackCursor.current);
    push(suspenseHandlerStackCursor, fiber);
    null === shellBoundary && (shellBoundary = fiber);
  }
  function pushOffscreenSuspenseHandler(fiber) {
    22 === fiber.tag ? (push(suspenseStackCursor, suspenseStackCursor.current), push(suspenseHandlerStackCursor, fiber), null === shellBoundary && (shellBoundary = fiber)) : reuseSuspenseHandlerOnStack();
  }
  function reuseSuspenseHandlerOnStack() {
    push(suspenseStackCursor, suspenseStackCursor.current);
    push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
  }
  function popSuspenseHandler(fiber) {
    pop(suspenseHandlerStackCursor);
    shellBoundary === fiber && (shellBoundary = null);
    pop(suspenseStackCursor);
  }
  var suspenseStackCursor = createCursor(0);
  function pushSuspenseListContext(fiber, newContext) {
    push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
    push(suspenseStackCursor, newContext);
  }
  function popSuspenseListContext(fiber) {
    pop(suspenseStackCursor);
    pop(suspenseHandlerStackCursor);
    shellBoundary === fiber && (shellBoundary = null);
  }
  function findFirstSuspended(row) {
    for (var node = row; null !== node; ) {
      if (13 === node.tag) {
        var state = node.memoizedState;
        if (null !== state && (state = state.dehydrated, null === state || isSuspenseInstancePending(state) || isSuspenseInstanceFallback(state)))
          return node;
      } else if (19 === node.tag && "independent" !== node.memoizedProps.revealOrder) {
        if (0 !== (node.flags & 128)) return node;
      } else if (null !== node.child) {
        node.child.return = node;
        node = node.child;
        continue;
      }
      if (node === row) break;
      for (; null === node.sibling; ) {
        if (null === node.return || node.return === row) return null;
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
    return null;
  }
  var renderLanes = 0, currentlyRenderingFiber = null, currentHook = null, workInProgressHook = null, didScheduleRenderPhaseUpdate = false, didScheduleRenderPhaseUpdateDuringThisPass = false, shouldDoubleInvokeUserFnsInHooksDEV = false, localIdCounter = 0, thenableIndexCounter = 0, thenableState = null, globalClientIdCounter = 0;
  function throwInvalidHookError() {
    throw Error(formatProdErrorMessage(321));
  }
  function areHookInputsEqual(nextDeps, prevDeps) {
    if (null === prevDeps) return false;
    for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
      if (!objectIs(nextDeps[i], prevDeps[i])) return false;
    return true;
  }
  function renderWithHooks(current, workInProgress2, Component, props, secondArg, nextRenderLanes) {
    renderLanes = nextRenderLanes;
    currentlyRenderingFiber = workInProgress2;
    workInProgress2.memoizedState = null;
    workInProgress2.updateQueue = null;
    workInProgress2.lanes = 0;
    ReactSharedInternals.H = null === current || null === current.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
    shouldDoubleInvokeUserFnsInHooksDEV = false;
    nextRenderLanes = Component(props, secondArg);
    shouldDoubleInvokeUserFnsInHooksDEV = false;
    didScheduleRenderPhaseUpdateDuringThisPass && (nextRenderLanes = renderWithHooksAgain(
      workInProgress2,
      Component,
      props,
      secondArg
    ));
    finishRenderingHooks(current);
    return nextRenderLanes;
  }
  function finishRenderingHooks(current) {
    ReactSharedInternals.H = ContextOnlyDispatcher;
    var didRenderTooFewHooks = null !== currentHook && null !== currentHook.next;
    renderLanes = 0;
    workInProgressHook = currentHook = currentlyRenderingFiber = null;
    didScheduleRenderPhaseUpdate = false;
    thenableIndexCounter = 0;
    thenableState = null;
    if (didRenderTooFewHooks) throw Error(formatProdErrorMessage(300));
    null === current || didReceiveUpdate || (current = current.dependencies, null !== current && checkIfContextChanged(current) && (didReceiveUpdate = true));
  }
  function renderWithHooksAgain(workInProgress2, Component, props, secondArg) {
    currentlyRenderingFiber = workInProgress2;
    var numberOfReRenders = 0;
    do {
      didScheduleRenderPhaseUpdateDuringThisPass && (thenableState = null);
      thenableIndexCounter = 0;
      didScheduleRenderPhaseUpdateDuringThisPass = false;
      if (25 <= numberOfReRenders) throw Error(formatProdErrorMessage(301));
      numberOfReRenders += 1;
      workInProgressHook = currentHook = null;
      if (null != workInProgress2.updateQueue) {
        var children = workInProgress2.updateQueue;
        children.lastEffect = null;
        children.events = null;
        children.stores = null;
        null != children.memoCache && (children.memoCache.index = 0);
      }
      ReactSharedInternals.H = HooksDispatcherOnRerender;
      children = Component(props, secondArg);
    } while (didScheduleRenderPhaseUpdateDuringThisPass);
    return children;
  }
  function TransitionAwareHostComponent() {
    var dispatcher = ReactSharedInternals.H, maybeThenable = dispatcher.useState()[0];
    maybeThenable = "function" === typeof maybeThenable.then ? useThenable(maybeThenable) : maybeThenable;
    dispatcher = dispatcher.useState()[0];
    (null !== currentHook ? currentHook.memoizedState : null) !== dispatcher && (currentlyRenderingFiber.flags |= 1024);
    return maybeThenable;
  }
  function checkDidRenderIdHook() {
    var didRenderIdHook = 0 !== localIdCounter;
    localIdCounter = 0;
    return didRenderIdHook;
  }
  function bailoutHooks(current, workInProgress2, lanes) {
    workInProgress2.updateQueue = current.updateQueue;
    workInProgress2.flags &= -2053;
    current.lanes &= ~lanes;
  }
  function resetHooksOnUnwind(workInProgress2) {
    if (didScheduleRenderPhaseUpdate) {
      for (workInProgress2 = workInProgress2.memoizedState; null !== workInProgress2; ) {
        var queue2 = workInProgress2.queue;
        null !== queue2 && (queue2.pending = null);
        workInProgress2 = workInProgress2.next;
      }
      didScheduleRenderPhaseUpdate = false;
    }
    renderLanes = 0;
    workInProgressHook = currentHook = currentlyRenderingFiber = null;
    didScheduleRenderPhaseUpdateDuringThisPass = false;
    thenableIndexCounter = localIdCounter = 0;
    thenableState = null;
  }
  function mountWorkInProgressHook() {
    var hook = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = hook : workInProgressHook = workInProgressHook.next = hook;
    return workInProgressHook;
  }
  function updateWorkInProgressHook() {
    if (null === currentHook) {
      var nextCurrentHook = currentlyRenderingFiber.alternate;
      nextCurrentHook = null !== nextCurrentHook ? nextCurrentHook.memoizedState : null;
    } else nextCurrentHook = currentHook.next;
    var nextWorkInProgressHook = null === workInProgressHook ? currentlyRenderingFiber.memoizedState : workInProgressHook.next;
    if (null !== nextWorkInProgressHook)
      workInProgressHook = nextWorkInProgressHook, currentHook = nextCurrentHook;
    else {
      if (null === nextCurrentHook) {
        if (null === currentlyRenderingFiber.alternate)
          throw Error(formatProdErrorMessage(467));
        throw Error(formatProdErrorMessage(310));
      }
      currentHook = nextCurrentHook;
      nextCurrentHook = {
        memoizedState: currentHook.memoizedState,
        baseState: currentHook.baseState,
        baseQueue: currentHook.baseQueue,
        queue: currentHook.queue,
        next: null
      };
      null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = nextCurrentHook : workInProgressHook = workInProgressHook.next = nextCurrentHook;
    }
    return workInProgressHook;
  }
  function createFunctionComponentUpdateQueue() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function useThenable(thenable) {
    var index2 = thenableIndexCounter;
    thenableIndexCounter += 1;
    null === thenableState && (thenableState = []);
    thenable = trackUsedThenable(thenableState, thenable, index2);
    index2 = currentlyRenderingFiber;
    null === (null === workInProgressHook ? index2.memoizedState : workInProgressHook.next) && (index2 = index2.alternate, ReactSharedInternals.H = null === index2 || null === index2.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate);
    return thenable;
  }
  function use(usable) {
    if (null !== usable && "object" === typeof usable) {
      if ("function" === typeof usable.then) return useThenable(usable);
      if (usable.$$typeof === REACT_RECOVERABLE_TYPE) return;
      if (usable.$$typeof === REACT_CONTEXT_TYPE) return readContext(usable);
    }
    throw Error(formatProdErrorMessage(438, String(usable)));
  }
  function useMemoCache(size) {
    var memoCache = null, updateQueue = currentlyRenderingFiber.updateQueue;
    null !== updateQueue && (memoCache = updateQueue.memoCache);
    if (null == memoCache) {
      var current = currentlyRenderingFiber.alternate;
      null !== current && (current = current.updateQueue, null !== current && (current = current.memoCache, null != current && (memoCache = {
        data: current.data.map(function(array) {
          return array.slice();
        }),
        index: 0
      })));
    }
    null == memoCache && (memoCache = { data: [], index: 0 });
    null === updateQueue && (updateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = updateQueue);
    updateQueue.memoCache = memoCache;
    updateQueue = memoCache.data[memoCache.index];
    if (void 0 === updateQueue)
      for (updateQueue = memoCache.data[memoCache.index] = Array(size), current = 0; current < size; current++)
        updateQueue[current] = REACT_MEMO_CACHE_SENTINEL;
    memoCache.index++;
    return updateQueue;
  }
  function basicStateReducer(state, action) {
    return "function" === typeof action ? action(state) : action;
  }
  function updateReducer(reducer) {
    var hook = updateWorkInProgressHook();
    return updateReducerImpl(hook, currentHook, reducer);
  }
  function updateReducerImpl(hook, current, reducer) {
    var queue2 = hook.queue;
    if (null === queue2) throw Error(formatProdErrorMessage(311));
    queue2.lastRenderedReducer = reducer;
    var baseQueue = hook.baseQueue, pendingQueue = queue2.pending;
    if (null !== pendingQueue) {
      if (null !== baseQueue) {
        var baseFirst = baseQueue.next;
        baseQueue.next = pendingQueue.next;
        pendingQueue.next = baseFirst;
      }
      current.baseQueue = baseQueue = pendingQueue;
      queue2.pending = null;
    }
    pendingQueue = hook.baseState;
    if (null === baseQueue) hook.memoizedState = pendingQueue;
    else {
      current = baseQueue.next;
      var newBaseQueueFirst = baseFirst = null, newBaseQueueLast = null, update = current, didReadFromEntangledAsyncAction$64 = false;
      do {
        var updateLane = update.lane & -536870913;
        if (updateLane !== update.lane ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
          var revertLane = update.revertLane;
          if (0 === revertLane)
            null !== newBaseQueueLast && (newBaseQueueLast = newBaseQueueLast.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: update.action,
              hasEagerState: update.hasEagerState,
              eagerState: update.eagerState,
              next: null
            }), updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction$64 = true);
          else if ((renderLanes & revertLane) === revertLane) {
            update = update.next;
            revertLane === currentEntangledLane && (didReadFromEntangledAsyncAction$64 = true);
            continue;
          } else
            updateLane = {
              lane: 0,
              revertLane: update.revertLane,
              gesture: null,
              action: update.action,
              hasEagerState: update.hasEagerState,
              eagerState: update.eagerState,
              next: null
            }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = updateLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = updateLane, currentlyRenderingFiber.lanes |= revertLane, workInProgressRootSkippedLanes |= revertLane;
          updateLane = update.action;
          shouldDoubleInvokeUserFnsInHooksDEV && reducer(pendingQueue, updateLane);
          pendingQueue = update.hasEagerState ? update.eagerState : reducer(pendingQueue, updateLane);
        } else
          revertLane = {
            lane: updateLane,
            revertLane: update.revertLane,
            gesture: update.gesture,
            action: update.action,
            hasEagerState: update.hasEagerState,
            eagerState: update.eagerState,
            next: null
          }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = revertLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = revertLane, currentlyRenderingFiber.lanes |= updateLane, workInProgressRootSkippedLanes |= updateLane;
        update = update.next;
      } while (null !== update && update !== current);
      null === newBaseQueueLast ? baseFirst = pendingQueue : newBaseQueueLast.next = newBaseQueueFirst;
      if (!objectIs(pendingQueue, hook.memoizedState) && (didReceiveUpdate = true, didReadFromEntangledAsyncAction$64 && (reducer = currentEntangledActionThenable, null !== reducer)))
        throw reducer;
      hook.memoizedState = pendingQueue;
      hook.baseState = baseFirst;
      hook.baseQueue = newBaseQueueLast;
      queue2.lastRenderedState = pendingQueue;
    }
    null === baseQueue && (queue2.lanes = 0);
    return [hook.memoizedState, queue2.dispatch];
  }
  function rerenderReducer(reducer) {
    var hook = updateWorkInProgressHook(), queue2 = hook.queue;
    if (null === queue2) throw Error(formatProdErrorMessage(311));
    queue2.lastRenderedReducer = reducer;
    var dispatch = queue2.dispatch, lastRenderPhaseUpdate = queue2.pending, newState = hook.memoizedState;
    if (null !== lastRenderPhaseUpdate) {
      queue2.pending = null;
      var update = lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
      do
        newState = reducer(newState, update.action), update = update.next;
      while (update !== lastRenderPhaseUpdate);
      objectIs(newState, hook.memoizedState) || (didReceiveUpdate = true);
      hook.memoizedState = newState;
      null === hook.baseQueue && (hook.baseState = newState);
      queue2.lastRenderedState = newState;
    }
    return [newState, dispatch];
  }
  function updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
    var fiber = currentlyRenderingFiber, hook = updateWorkInProgressHook(), isHydrating$jscomp$0 = isHydrating;
    if (isHydrating$jscomp$0) {
      if (void 0 === getServerSnapshot) throw Error(formatProdErrorMessage(407));
      getServerSnapshot = getServerSnapshot();
    } else getServerSnapshot = getSnapshot();
    var snapshotChanged = !objectIs(
      (currentHook || hook).memoizedState,
      getServerSnapshot
    );
    snapshotChanged && (hook.memoizedState = getServerSnapshot, didReceiveUpdate = true);
    hook = hook.queue;
    updateEffect(subscribeToStore.bind(null, fiber, hook, subscribe), [
      subscribe
    ]);
    subscribe = hook.getSnapshot !== getSnapshot || snapshotChanged || null !== workInProgressHook && 0 !== (workInProgressHook.memoizedState.tag & 1);
    pushSimpleEffect(
      subscribe ? 9 : 8,
      { destroy: void 0 },
      updateStoreInstance.bind(null, fiber, hook, getServerSnapshot, getSnapshot),
      null
    );
    if (subscribe) {
      fiber.flags |= 2048;
      if (null === workInProgressRoot) throw Error(formatProdErrorMessage(349));
      isHydrating$jscomp$0 || 0 !== (renderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
    }
    return getServerSnapshot;
  }
  function pushStoreConsistencyCheck(fiber, getSnapshot, renderedSnapshot) {
    fiber.flags |= 16384;
    fiber = { getSnapshot, value: renderedSnapshot };
    getSnapshot = currentlyRenderingFiber.updateQueue;
    null === getSnapshot ? (getSnapshot = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = getSnapshot, getSnapshot.stores = [fiber]) : (renderedSnapshot = getSnapshot.stores, null === renderedSnapshot ? getSnapshot.stores = [fiber] : renderedSnapshot.push(fiber));
  }
  function updateStoreInstance(fiber, inst, nextSnapshot, getSnapshot) {
    inst.value = nextSnapshot;
    inst.getSnapshot = getSnapshot;
    checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
  }
  function subscribeToStore(fiber, inst, subscribe) {
    return subscribe(function() {
      checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
    });
  }
  function checkIfSnapshotChanged(inst) {
    var latestGetSnapshot = inst.getSnapshot;
    inst = inst.value;
    try {
      var nextValue = latestGetSnapshot();
      return !objectIs(inst, nextValue);
    } catch (error) {
      return true;
    }
  }
  function forceStoreRerender(fiber) {
    var root2 = enqueueConcurrentRenderForLane(fiber, 2);
    null !== root2 && scheduleUpdateOnFiber(root2, fiber, 2);
  }
  function mountStateImpl(initialState) {
    var hook = mountWorkInProgressHook();
    if ("function" === typeof initialState) {
      var initialStateInitializer = initialState;
      initialState = initialStateInitializer();
      if (shouldDoubleInvokeUserFnsInHooksDEV) {
        setIsStrictModeForDevtools(true);
        try {
          initialStateInitializer();
        } finally {
          setIsStrictModeForDevtools(false);
        }
      }
    }
    hook.memoizedState = hook.baseState = initialState;
    hook.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: basicStateReducer,
      lastRenderedState: initialState
    };
    return hook;
  }
  function updateOptimisticImpl(hook, current, passthrough, reducer) {
    hook.baseState = passthrough;
    return updateReducerImpl(
      hook,
      currentHook,
      "function" === typeof reducer ? reducer : basicStateReducer
    );
  }
  function dispatchActionState(fiber, actionQueue, setPendingState, setState, payload) {
    if (isRenderPhaseUpdate(fiber)) throw Error(formatProdErrorMessage(485));
    fiber = actionQueue.action;
    if (null !== fiber) {
      var actionNode = {
        payload,
        action: fiber,
        next: null,
        isTransition: true,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(listener) {
          actionNode.listeners.push(listener);
        }
      };
      null !== ReactSharedInternals.T ? setPendingState(true) : actionNode.isTransition = false;
      setState(actionNode);
      setPendingState = actionQueue.pending;
      null === setPendingState ? (actionNode.next = actionQueue.pending = actionNode, runActionStateAction(actionQueue, actionNode)) : (actionNode.next = setPendingState.next, actionQueue.pending = setPendingState.next = actionNode);
    }
  }
  function runActionStateAction(actionQueue, node) {
    var action = node.action, payload = node.payload, prevState = actionQueue.state;
    if (node.isTransition) {
      var prevTransition = ReactSharedInternals.T, currentTransition = {};
      currentTransition.types = null !== prevTransition ? prevTransition.types : null;
      ReactSharedInternals.T = currentTransition;
      try {
        var returnValue = action(prevState, payload), onStartTransitionFinish = ReactSharedInternals.S;
        null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
        handleActionReturnValue(actionQueue, node, returnValue);
      } catch (error) {
        onActionError(actionQueue, node, error);
      } finally {
        null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
      }
    } else
      try {
        prevTransition = action(prevState, payload), handleActionReturnValue(actionQueue, node, prevTransition);
      } catch (error$70) {
        onActionError(actionQueue, node, error$70);
      }
  }
  function handleActionReturnValue(actionQueue, node, returnValue) {
    null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then ? returnValue.then(
      function(nextState) {
        onActionSuccess(actionQueue, node, nextState);
      },
      function(error) {
        return onActionError(actionQueue, node, error);
      }
    ) : onActionSuccess(actionQueue, node, returnValue);
  }
  function onActionSuccess(actionQueue, actionNode, nextState) {
    actionNode.status = "fulfilled";
    actionNode.value = nextState;
    notifyActionListeners(actionNode);
    actionQueue.state = nextState;
    actionNode = actionQueue.pending;
    null !== actionNode && (nextState = actionNode.next, nextState === actionNode ? actionQueue.pending = null : (nextState = nextState.next, actionNode.next = nextState, runActionStateAction(actionQueue, nextState)));
  }
  function onActionError(actionQueue, actionNode, error) {
    var last = actionQueue.pending;
    actionQueue.pending = null;
    if (null !== last) {
      last = last.next;
      do
        actionNode.status = "rejected", actionNode.reason = error, notifyActionListeners(actionNode), actionNode = actionNode.next;
      while (actionNode !== last);
    }
    actionQueue.action = null;
  }
  function notifyActionListeners(actionNode) {
    actionNode = actionNode.listeners;
    for (var i = 0; i < actionNode.length; i++) (0, actionNode[i])();
  }
  function actionStateReducer(oldState, newState) {
    return newState;
  }
  function mountActionState(action, initialStateProp) {
    if (isHydrating) {
      var ssrFormState = workInProgressRoot.formState;
      if (null !== ssrFormState) {
        a: {
          var JSCompiler_inline_result = currentlyRenderingFiber;
          if (isHydrating) {
            if (nextHydratableInstance) {
              b: {
                var JSCompiler_inline_result$jscomp$0 = nextHydratableInstance;
                for (var inRootOrSingleton = rootOrSingletonContext; 8 !== JSCompiler_inline_result$jscomp$0.nodeType; ) {
                  if (!inRootOrSingleton) {
                    JSCompiler_inline_result$jscomp$0 = null;
                    break b;
                  }
                  JSCompiler_inline_result$jscomp$0 = getNextHydratable(
                    JSCompiler_inline_result$jscomp$0.nextSibling
                  );
                  if (null === JSCompiler_inline_result$jscomp$0) {
                    JSCompiler_inline_result$jscomp$0 = null;
                    break b;
                  }
                }
                inRootOrSingleton = JSCompiler_inline_result$jscomp$0.data;
                JSCompiler_inline_result$jscomp$0 = "F!" === inRootOrSingleton || "F" === inRootOrSingleton ? JSCompiler_inline_result$jscomp$0 : null;
              }
              if (JSCompiler_inline_result$jscomp$0) {
                nextHydratableInstance = getNextHydratable(
                  JSCompiler_inline_result$jscomp$0.nextSibling
                );
                JSCompiler_inline_result = "F!" === JSCompiler_inline_result$jscomp$0.data;
                break a;
              }
            }
            throwOnHydrationMismatch(JSCompiler_inline_result);
          }
          JSCompiler_inline_result = false;
        }
        JSCompiler_inline_result && (initialStateProp = ssrFormState[0]);
      }
    }
    ssrFormState = mountWorkInProgressHook();
    ssrFormState.memoizedState = ssrFormState.baseState = initialStateProp;
    JSCompiler_inline_result = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: actionStateReducer,
      lastRenderedState: initialStateProp
    };
    ssrFormState.queue = JSCompiler_inline_result;
    ssrFormState = dispatchSetState.bind(
      null,
      currentlyRenderingFiber,
      JSCompiler_inline_result
    );
    JSCompiler_inline_result.dispatch = ssrFormState;
    JSCompiler_inline_result = mountStateImpl(false);
    inRootOrSingleton = dispatchOptimisticSetState.bind(
      null,
      currentlyRenderingFiber,
      false,
      JSCompiler_inline_result.queue
    );
    JSCompiler_inline_result = mountWorkInProgressHook();
    JSCompiler_inline_result$jscomp$0 = {
      state: initialStateProp,
      dispatch: null,
      action,
      pending: null
    };
    JSCompiler_inline_result.queue = JSCompiler_inline_result$jscomp$0;
    ssrFormState = dispatchActionState.bind(
      null,
      currentlyRenderingFiber,
      JSCompiler_inline_result$jscomp$0,
      inRootOrSingleton,
      ssrFormState
    );
    JSCompiler_inline_result$jscomp$0.dispatch = ssrFormState;
    JSCompiler_inline_result.memoizedState = action;
    return [initialStateProp, ssrFormState, false];
  }
  function updateActionState(action) {
    var stateHook = updateWorkInProgressHook();
    return updateActionStateImpl(stateHook, currentHook, action);
  }
  function updateActionStateImpl(stateHook, currentStateHook, action) {
    currentStateHook = updateReducerImpl(
      stateHook,
      currentStateHook,
      actionStateReducer
    )[0];
    stateHook = updateReducer(basicStateReducer)[0];
    if ("object" === typeof currentStateHook && null !== currentStateHook && "function" === typeof currentStateHook.then)
      try {
        var state = useThenable(currentStateHook);
      } catch (x) {
        if (x === SuspenseException) throw SuspenseActionException;
        throw x;
      }
    else state = currentStateHook;
    currentStateHook = updateWorkInProgressHook();
    var actionQueue = currentStateHook.queue, dispatch = actionQueue.dispatch;
    action !== currentStateHook.memoizedState && (currentlyRenderingFiber.flags |= 2048, pushSimpleEffect(
      9,
      { destroy: void 0 },
      actionStateActionEffect.bind(null, actionQueue, action),
      null
    ));
    return [state, dispatch, stateHook];
  }
  function actionStateActionEffect(actionQueue, action) {
    actionQueue.action = action;
  }
  function rerenderActionState(action) {
    var stateHook = updateWorkInProgressHook(), currentStateHook = currentHook;
    if (null !== currentStateHook)
      return updateActionStateImpl(stateHook, currentStateHook, action);
    updateWorkInProgressHook();
    stateHook = stateHook.memoizedState;
    currentStateHook = updateWorkInProgressHook();
    var dispatch = currentStateHook.queue.dispatch;
    currentStateHook.memoizedState = action;
    return [stateHook, dispatch, false];
  }
  function pushSimpleEffect(tag, inst, create, deps) {
    tag = { tag, create, deps, inst, next: null };
    inst = currentlyRenderingFiber.updateQueue;
    null === inst && (inst = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = inst);
    create = inst.lastEffect;
    null === create ? inst.lastEffect = tag.next = tag : (deps = create.next, create.next = tag, tag.next = deps, inst.lastEffect = tag);
    return tag;
  }
  function updateRef() {
    return updateWorkInProgressHook().memoizedState;
  }
  function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
    var hook = mountWorkInProgressHook();
    currentlyRenderingFiber.flags |= fiberFlags;
    hook.memoizedState = pushSimpleEffect(
      1 | hookFlags,
      { destroy: void 0 },
      create,
      void 0 === deps ? null : deps
    );
  }
  function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
    var hook = updateWorkInProgressHook();
    deps = void 0 === deps ? null : deps;
    var inst = hook.memoizedState.inst;
    null !== currentHook && null !== deps && areHookInputsEqual(deps, currentHook.memoizedState.deps) ? hook.memoizedState = pushSimpleEffect(hookFlags, inst, create, deps) : (currentlyRenderingFiber.flags |= fiberFlags, hook.memoizedState = pushSimpleEffect(
      1 | hookFlags,
      inst,
      create,
      deps
    ));
  }
  function mountEffect(create, deps) {
    mountEffectImpl(8390656, 8, create, deps);
  }
  function updateEffect(create, deps) {
    updateEffectImpl(2048, 8, create, deps);
  }
  function useEffectEventImpl(payload) {
    currentlyRenderingFiber.flags |= 4;
    var componentUpdateQueue = currentlyRenderingFiber.updateQueue;
    if (null === componentUpdateQueue)
      componentUpdateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = componentUpdateQueue, componentUpdateQueue.events = [payload];
    else {
      var events = componentUpdateQueue.events;
      null === events ? componentUpdateQueue.events = [payload] : events.push(payload);
    }
  }
  function updateEvent(callback) {
    var ref = updateWorkInProgressHook().memoizedState;
    useEffectEventImpl({ ref, nextImpl: callback });
    return function() {
      if (0 !== (executionContext & 2)) throw Error(formatProdErrorMessage(440));
      return ref.impl.apply(void 0, arguments);
    };
  }
  function updateInsertionEffect(create, deps) {
    return updateEffectImpl(4, 2, create, deps);
  }
  function updateLayoutEffect(create, deps) {
    return updateEffectImpl(4, 4, create, deps);
  }
  function imperativeHandleEffect(create, ref) {
    if ("function" === typeof ref) {
      create = create();
      var refCleanup = ref(create);
      return function() {
        "function" === typeof refCleanup ? refCleanup() : ref(null);
      };
    }
    if (null !== ref && void 0 !== ref)
      return create = create(), ref.current = create, function() {
        ref.current = null;
      };
  }
  function updateImperativeHandle(ref, create, deps) {
    deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
    updateEffectImpl(4, 4, imperativeHandleEffect.bind(null, create, ref), deps);
  }
  function mountDebugValue() {
  }
  function updateCallback(callback, deps) {
    var hook = updateWorkInProgressHook();
    deps = void 0 === deps ? null : deps;
    var prevState = hook.memoizedState;
    if (null !== deps && areHookInputsEqual(deps, prevState[1]))
      return prevState[0];
    hook.memoizedState = [callback, deps];
    return callback;
  }
  function updateMemo(nextCreate, deps) {
    var hook = updateWorkInProgressHook();
    deps = void 0 === deps ? null : deps;
    var prevState = hook.memoizedState;
    if (null !== deps && areHookInputsEqual(deps, prevState[1]))
      return prevState[0];
    prevState = nextCreate();
    if (shouldDoubleInvokeUserFnsInHooksDEV) {
      setIsStrictModeForDevtools(true);
      try {
        nextCreate();
      } finally {
        setIsStrictModeForDevtools(false);
      }
    }
    hook.memoizedState = [prevState, deps];
    return prevState;
  }
  function mountDeferredValueImpl(hook, value, initialValue) {
    if (void 0 === initialValue || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930))
      return hook.memoizedState = value;
    hook.memoizedState = initialValue;
    hook = requestDeferredLane();
    currentlyRenderingFiber.lanes |= hook;
    workInProgressRootSkippedLanes |= hook;
    return initialValue;
  }
  function updateDeferredValueImpl(hook, prevValue, value, initialValue) {
    if (objectIs(value, prevValue)) return value;
    if (null !== currentTreeHiddenStackCursor.current)
      return hook = mountDeferredValueImpl(hook, value, initialValue), objectIs(hook, prevValue) || (didReceiveUpdate = true), hook;
    if (0 === (renderLanes & 106) || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930))
      return didReceiveUpdate = true, hook.memoizedState = value;
    hook = requestDeferredLane();
    currentlyRenderingFiber.lanes |= hook;
    workInProgressRootSkippedLanes |= hook;
    return prevValue;
  }
  function startTransition(fiber, queue2, pendingState, finishedState, callback) {
    var previousPriority = ReactDOMSharedInternals.p;
    ReactDOMSharedInternals.p = 0 !== previousPriority && 8 > previousPriority ? previousPriority : 8;
    var prevTransition = ReactSharedInternals.T, currentTransition = {};
    currentTransition.types = null !== prevTransition ? prevTransition.types : null;
    ReactSharedInternals.T = currentTransition;
    dispatchOptimisticSetState(fiber, false, queue2, pendingState);
    try {
      var returnValue = callback(), onStartTransitionFinish = ReactSharedInternals.S;
      null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
      if (null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then) {
        var thenableForFinishedState = chainThenableValue(
          returnValue,
          finishedState
        );
        dispatchSetStateInternal(
          fiber,
          queue2,
          thenableForFinishedState,
          requestUpdateLane(fiber)
        );
      } else
        dispatchSetStateInternal(
          fiber,
          queue2,
          finishedState,
          requestUpdateLane(fiber)
        );
    } catch (error) {
      dispatchSetStateInternal(
        fiber,
        queue2,
        { then: function() {
        }, status: "rejected", reason: error },
        requestUpdateLane()
      );
    } finally {
      ReactDOMSharedInternals.p = previousPriority, null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
    }
  }
  function noop() {
  }
  function startHostTransition(formFiber, pendingState, action, formData) {
    if (5 !== formFiber.tag) throw Error(formatProdErrorMessage(476));
    var queue2 = ensureFormComponentIsStateful(formFiber).queue;
    startTransition(
      formFiber,
      queue2,
      pendingState,
      sharedNotPendingObject,
      null === action ? noop : function() {
        requestFormReset$1(formFiber);
        return action(formData);
      }
    );
  }
  function ensureFormComponentIsStateful(formFiber) {
    var existingStateHook = formFiber.memoizedState;
    if (null !== existingStateHook) return existingStateHook;
    existingStateHook = {
      memoizedState: sharedNotPendingObject,
      baseState: sharedNotPendingObject,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: basicStateReducer,
        lastRenderedState: sharedNotPendingObject
      },
      next: null
    };
    var initialResetState = {};
    existingStateHook.next = {
      memoizedState: initialResetState,
      baseState: initialResetState,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: basicStateReducer,
        lastRenderedState: initialResetState
      },
      next: null
    };
    formFiber.memoizedState = existingStateHook;
    formFiber = formFiber.alternate;
    null !== formFiber && (formFiber.memoizedState = existingStateHook);
    return existingStateHook;
  }
  function requestFormReset$1(formFiber) {
    var stateHook = ensureFormComponentIsStateful(formFiber);
    null === stateHook.next && (stateHook = formFiber.alternate.memoizedState);
    dispatchSetStateInternal(
      formFiber,
      stateHook.next.queue,
      {},
      requestUpdateLane()
    );
  }
  function useHostTransitionStatus() {
    return readContext(HostTransitionContext);
  }
  function updateId() {
    return updateWorkInProgressHook().memoizedState;
  }
  function updateRefresh() {
    return updateWorkInProgressHook().memoizedState;
  }
  function refreshCache(fiber) {
    for (var provider = fiber.return; null !== provider; ) {
      switch (provider.tag) {
        case 24:
        case 3:
          var lane = requestUpdateLane();
          fiber = createUpdate(lane);
          var root$73 = enqueueUpdate(provider, fiber, lane);
          null !== root$73 && (scheduleUpdateOnFiber(root$73, provider, lane), entangleTransitions(root$73, provider, lane));
          provider = { cache: createCache() };
          fiber.payload = provider;
          return;
      }
      provider = provider.return;
    }
  }
  function dispatchReducerAction(fiber, queue2, action) {
    var lane = requestUpdateLane();
    action = {
      lane,
      revertLane: 0,
      gesture: null,
      action,
      hasEagerState: false,
      eagerState: null,
      next: null
    };
    isRenderPhaseUpdate(fiber) ? enqueueRenderPhaseUpdate(queue2, action) : (action = enqueueConcurrentHookUpdate(fiber, queue2, action, lane), null !== action && (scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue2, lane)));
  }
  function dispatchSetState(fiber, queue2, action) {
    var lane = requestUpdateLane();
    dispatchSetStateInternal(fiber, queue2, action, lane);
  }
  function dispatchSetStateInternal(fiber, queue2, action, lane) {
    var update = {
      lane,
      revertLane: 0,
      gesture: null,
      action,
      hasEagerState: false,
      eagerState: null,
      next: null
    };
    if (isRenderPhaseUpdate(fiber)) enqueueRenderPhaseUpdate(queue2, update);
    else {
      var alternate = fiber.alternate;
      if (0 === fiber.lanes && (null === alternate || 0 === alternate.lanes) && (alternate = queue2.lastRenderedReducer, null !== alternate))
        try {
          var currentState = queue2.lastRenderedState, eagerState = alternate(currentState, action);
          update.hasEagerState = true;
          update.eagerState = eagerState;
          if (objectIs(eagerState, currentState))
            return enqueueUpdate$1(fiber, queue2, update, 0), null === workInProgressRoot && finishQueueingConcurrentUpdates(), false;
        } catch (error) {
        } finally {
        }
      action = enqueueConcurrentHookUpdate(fiber, queue2, update, lane);
      if (null !== action)
        return scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue2, lane), true;
    }
    return false;
  }
  function dispatchOptimisticSetState(fiber, throwIfDuringRender, queue2, action) {
    action = {
      lane: 2,
      revertLane: requestTransitionLane(),
      gesture: null,
      action,
      hasEagerState: false,
      eagerState: null,
      next: null
    };
    if (isRenderPhaseUpdate(fiber)) {
      if (throwIfDuringRender) throw Error(formatProdErrorMessage(479));
    } else
      throwIfDuringRender = enqueueConcurrentHookUpdate(
        fiber,
        queue2,
        action,
        2
      ), null !== throwIfDuringRender && scheduleUpdateOnFiber(throwIfDuringRender, fiber, 2);
  }
  function isRenderPhaseUpdate(fiber) {
    var alternate = fiber.alternate;
    return fiber === currentlyRenderingFiber || null !== alternate && alternate === currentlyRenderingFiber;
  }
  function enqueueRenderPhaseUpdate(queue2, update) {
    didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
    var pending = queue2.pending;
    null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
    queue2.pending = update;
  }
  function entangleTransitionUpdate(root2, queue2, lane) {
    if (0 !== (lane & 4194048)) {
      var queueLanes = queue2.lanes;
      queueLanes &= root2.pendingLanes;
      lane |= queueLanes;
      queue2.lanes = lane;
      markRootEntangled(root2, lane);
    }
  }
  var ContextOnlyDispatcher = {
    readContext,
    use,
    useCallback: throwInvalidHookError,
    useContext: throwInvalidHookError,
    useEffect: throwInvalidHookError,
    useImperativeHandle: throwInvalidHookError,
    useLayoutEffect: throwInvalidHookError,
    useInsertionEffect: throwInvalidHookError,
    useMemo: throwInvalidHookError,
    useReducer: throwInvalidHookError,
    useRef: throwInvalidHookError,
    useState: throwInvalidHookError,
    useDebugValue: throwInvalidHookError,
    useDeferredValue: throwInvalidHookError,
    useTransition: throwInvalidHookError,
    useSyncExternalStore: throwInvalidHookError,
    useId: throwInvalidHookError,
    useHostTransitionStatus: throwInvalidHookError,
    useFormState: throwInvalidHookError,
    useActionState: throwInvalidHookError,
    useOptimistic: throwInvalidHookError,
    useMemoCache: throwInvalidHookError,
    useCacheRefresh: throwInvalidHookError,
    useEffectEvent: throwInvalidHookError
  }, HooksDispatcherOnMount = {
    readContext,
    use,
    useCallback: function(callback, deps) {
      mountWorkInProgressHook().memoizedState = [
        callback,
        void 0 === deps ? null : deps
      ];
      return callback;
    },
    useContext: readContext,
    useEffect: mountEffect,
    useImperativeHandle: function(ref, create, deps) {
      deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
      mountEffectImpl(
        4194308,
        4,
        imperativeHandleEffect.bind(null, create, ref),
        deps
      );
    },
    useLayoutEffect: function(create, deps) {
      return mountEffectImpl(4194308, 4, create, deps);
    },
    useInsertionEffect: function(create, deps) {
      mountEffectImpl(4, 2, create, deps);
    },
    useMemo: function(nextCreate, deps) {
      var hook = mountWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      var nextValue = nextCreate();
      if (shouldDoubleInvokeUserFnsInHooksDEV) {
        setIsStrictModeForDevtools(true);
        try {
          nextCreate();
        } finally {
          setIsStrictModeForDevtools(false);
        }
      }
      hook.memoizedState = [nextValue, deps];
      return nextValue;
    },
    useReducer: function(reducer, initialArg, init) {
      var hook = mountWorkInProgressHook();
      if (void 0 !== init) {
        var initialState = init(initialArg);
        if (shouldDoubleInvokeUserFnsInHooksDEV) {
          setIsStrictModeForDevtools(true);
          try {
            init(initialArg);
          } finally {
            setIsStrictModeForDevtools(false);
          }
        }
      } else initialState = initialArg;
      hook.memoizedState = hook.baseState = initialState;
      reducer = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: reducer,
        lastRenderedState: initialState
      };
      hook.queue = reducer;
      reducer = reducer.dispatch = dispatchReducerAction.bind(
        null,
        currentlyRenderingFiber,
        reducer
      );
      return [hook.memoizedState, reducer];
    },
    useRef: function(initialValue) {
      var hook = mountWorkInProgressHook();
      initialValue = { current: initialValue };
      return hook.memoizedState = initialValue;
    },
    useState: function(initialState) {
      initialState = mountStateImpl(initialState);
      var queue2 = initialState.queue, dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, queue2);
      queue2.dispatch = dispatch;
      return [initialState.memoizedState, dispatch];
    },
    useDebugValue: mountDebugValue,
    useDeferredValue: function(value, initialValue) {
      var hook = mountWorkInProgressHook();
      return mountDeferredValueImpl(hook, value, initialValue);
    },
    useTransition: function() {
      var stateHook = mountStateImpl(false);
      stateHook = startTransition.bind(
        null,
        currentlyRenderingFiber,
        stateHook.queue,
        true,
        false
      );
      mountWorkInProgressHook().memoizedState = stateHook;
      return [false, stateHook];
    },
    useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
      var fiber = currentlyRenderingFiber, hook = mountWorkInProgressHook();
      if (isHydrating) {
        if (void 0 === getServerSnapshot)
          throw Error(formatProdErrorMessage(407));
        getServerSnapshot = getServerSnapshot();
      } else {
        getServerSnapshot = getSnapshot();
        if (null === workInProgressRoot)
          throw Error(formatProdErrorMessage(349));
        0 !== (workInProgressRootRenderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
      }
      hook.memoizedState = getServerSnapshot;
      var inst = { value: getServerSnapshot, getSnapshot };
      hook.queue = inst;
      mountEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [
        subscribe
      ]);
      fiber.flags |= 2048;
      pushSimpleEffect(
        9,
        { destroy: void 0 },
        updateStoreInstance.bind(
          null,
          fiber,
          inst,
          getServerSnapshot,
          getSnapshot
        ),
        null
      );
      return getServerSnapshot;
    },
    useId: function() {
      var hook = mountWorkInProgressHook(), identifierPrefix = workInProgressRoot.identifierPrefix;
      if (isHydrating) {
        var JSCompiler_inline_result = treeContextOverflow;
        var idWithLeadingBit = treeContextId;
        JSCompiler_inline_result = (idWithLeadingBit & ~(1 << 32 - clz32(idWithLeadingBit) - 1)).toString(32) + JSCompiler_inline_result;
        identifierPrefix = "_" + identifierPrefix + "R_" + JSCompiler_inline_result;
        JSCompiler_inline_result = localIdCounter++;
        0 < JSCompiler_inline_result && (identifierPrefix += "H" + JSCompiler_inline_result.toString(32));
        identifierPrefix += "_";
      } else
        JSCompiler_inline_result = globalClientIdCounter++, identifierPrefix = "_" + identifierPrefix + "r_" + JSCompiler_inline_result.toString(32) + "_";
      return hook.memoizedState = identifierPrefix;
    },
    useHostTransitionStatus,
    useFormState: mountActionState,
    useActionState: mountActionState,
    useOptimistic: function(passthrough) {
      var hook = mountWorkInProgressHook();
      hook.memoizedState = hook.baseState = passthrough;
      var queue2 = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      hook.queue = queue2;
      hook = dispatchOptimisticSetState.bind(
        null,
        currentlyRenderingFiber,
        true,
        queue2
      );
      queue2.dispatch = hook;
      return [passthrough, hook];
    },
    useMemoCache,
    useCacheRefresh: function() {
      return mountWorkInProgressHook().memoizedState = refreshCache.bind(
        null,
        currentlyRenderingFiber
      );
    },
    useEffectEvent: function(callback) {
      var hook = mountWorkInProgressHook(), ref = { impl: callback };
      hook.memoizedState = ref;
      return function() {
        if (0 !== (executionContext & 2))
          throw Error(formatProdErrorMessage(440));
        return ref.impl.apply(void 0, arguments);
      };
    }
  }, HooksDispatcherOnUpdate = {
    readContext,
    use,
    useCallback: updateCallback,
    useContext: readContext,
    useEffect: updateEffect,
    useImperativeHandle: updateImperativeHandle,
    useInsertionEffect: updateInsertionEffect,
    useLayoutEffect: updateLayoutEffect,
    useMemo: updateMemo,
    useReducer: updateReducer,
    useRef: updateRef,
    useState: function() {
      return updateReducer(basicStateReducer);
    },
    useDebugValue: mountDebugValue,
    useDeferredValue: function(value, initialValue) {
      var hook = updateWorkInProgressHook();
      return updateDeferredValueImpl(
        hook,
        currentHook.memoizedState,
        value,
        initialValue
      );
    },
    useTransition: function() {
      var booleanOrThenable = updateReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
      return [
        "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
        start
      ];
    },
    useSyncExternalStore: updateSyncExternalStore,
    useId: updateId,
    useHostTransitionStatus,
    useFormState: updateActionState,
    useActionState: updateActionState,
    useOptimistic: function(passthrough, reducer) {
      var hook = updateWorkInProgressHook();
      return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
    },
    useMemoCache,
    useCacheRefresh: updateRefresh,
    useEffectEvent: updateEvent
  }, HooksDispatcherOnRerender = {
    readContext,
    use,
    useCallback: updateCallback,
    useContext: readContext,
    useEffect: updateEffect,
    useImperativeHandle: updateImperativeHandle,
    useInsertionEffect: updateInsertionEffect,
    useLayoutEffect: updateLayoutEffect,
    useMemo: updateMemo,
    useReducer: rerenderReducer,
    useRef: updateRef,
    useState: function() {
      return rerenderReducer(basicStateReducer);
    },
    useDebugValue: mountDebugValue,
    useDeferredValue: function(value, initialValue) {
      var hook = updateWorkInProgressHook();
      return null === currentHook ? mountDeferredValueImpl(hook, value, initialValue) : updateDeferredValueImpl(
        hook,
        currentHook.memoizedState,
        value,
        initialValue
      );
    },
    useTransition: function() {
      var booleanOrThenable = rerenderReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
      return [
        "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
        start
      ];
    },
    useSyncExternalStore: updateSyncExternalStore,
    useId: updateId,
    useHostTransitionStatus,
    useFormState: rerenderActionState,
    useActionState: rerenderActionState,
    useOptimistic: function(passthrough, reducer) {
      var hook = updateWorkInProgressHook();
      if (null !== currentHook)
        return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
      hook.baseState = passthrough;
      return [passthrough, hook.queue.dispatch];
    },
    useMemoCache,
    useCacheRefresh: updateRefresh,
    useEffectEvent: updateEvent
  };
  function applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, nextProps) {
    ctor = workInProgress2.memoizedState;
    getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
    getDerivedStateFromProps = null === getDerivedStateFromProps || void 0 === getDerivedStateFromProps ? ctor : assign({}, ctor, getDerivedStateFromProps);
    workInProgress2.memoizedState = getDerivedStateFromProps;
    0 === workInProgress2.lanes && (workInProgress2.updateQueue.baseState = getDerivedStateFromProps);
  }
  var classComponentUpdater = {
    enqueueSetState: function(inst, payload, callback) {
      inst = inst._reactInternals;
      var lane = requestUpdateLane(), update = createUpdate(lane);
      update.payload = payload;
      void 0 !== callback && null !== callback && (update.callback = callback);
      payload = enqueueUpdate(inst, update, lane);
      null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
    },
    enqueueReplaceState: function(inst, payload, callback) {
      inst = inst._reactInternals;
      var lane = requestUpdateLane(), update = createUpdate(lane);
      update.tag = 1;
      update.payload = payload;
      void 0 !== callback && null !== callback && (update.callback = callback);
      payload = enqueueUpdate(inst, update, lane);
      null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
    },
    enqueueForceUpdate: function(inst, callback) {
      inst = inst._reactInternals;
      var lane = requestUpdateLane(), update = createUpdate(lane);
      update.tag = 2;
      void 0 !== callback && null !== callback && (update.callback = callback);
      callback = enqueueUpdate(inst, update, lane);
      null !== callback && (scheduleUpdateOnFiber(callback, inst, lane), entangleTransitions(callback, inst, lane));
    }
  };
  function checkShouldComponentUpdate(workInProgress2, ctor, oldProps, newProps, oldState, newState, nextContext) {
    workInProgress2 = workInProgress2.stateNode;
    return "function" === typeof workInProgress2.shouldComponentUpdate ? workInProgress2.shouldComponentUpdate(newProps, newState, nextContext) : ctor.prototype && ctor.prototype.isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : true;
  }
  function callComponentWillReceiveProps(workInProgress2, instance, newProps, nextContext) {
    workInProgress2 = instance.state;
    "function" === typeof instance.componentWillReceiveProps && instance.componentWillReceiveProps(newProps, nextContext);
    "function" === typeof instance.UNSAFE_componentWillReceiveProps && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
    instance.state !== workInProgress2 && classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
  }
  function resolveClassComponentProps(Component, baseProps) {
    var newProps = baseProps;
    if ("ref" in baseProps) {
      newProps = {};
      for (var propName in baseProps)
        "ref" !== propName && (newProps[propName] = baseProps[propName]);
    }
    if (Component = Component.defaultProps) {
      newProps === baseProps && (newProps = assign({}, newProps));
      for (var propName$77 in Component)
        void 0 === newProps[propName$77] && (newProps[propName$77] = Component[propName$77]);
    }
    return newProps;
  }
  function defaultOnUncaughtError(error) {
    reportGlobalError(error);
  }
  function defaultOnCaughtError(error) {
    console.error(error);
  }
  function defaultOnRecoverableError(error) {
    reportGlobalError(error);
  }
  function logUncaughtError(root2, errorInfo) {
    try {
      var onUncaughtError = root2.onUncaughtError;
      onUncaughtError(errorInfo.value, { componentStack: errorInfo.stack });
    } catch (e$78) {
      setTimeout(function() {
        throw e$78;
      });
    }
  }
  function logCaughtError(root2, boundary, errorInfo) {
    try {
      var onCaughtError = root2.onCaughtError;
      onCaughtError(errorInfo.value, {
        componentStack: errorInfo.stack,
        errorBoundary: 1 === boundary.tag ? boundary.stateNode : null
      });
    } catch (e$79) {
      setTimeout(function() {
        throw e$79;
      });
    }
  }
  function createRootErrorUpdate(root2, errorInfo, lane) {
    lane = createUpdate(lane);
    lane.tag = 3;
    lane.payload = { element: null };
    lane.callback = function() {
      logUncaughtError(root2, errorInfo);
    };
    return lane;
  }
  function createClassErrorUpdate(lane) {
    lane = createUpdate(lane);
    lane.tag = 3;
    return lane;
  }
  function initializeClassErrorUpdate(update, root2, fiber, errorInfo) {
    var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
    if ("function" === typeof getDerivedStateFromError) {
      var error = errorInfo.value;
      update.payload = function() {
        return getDerivedStateFromError(error);
      };
      update.callback = function() {
        logCaughtError(root2, fiber, errorInfo);
      };
    }
    var inst = fiber.stateNode;
    null !== inst && "function" === typeof inst.componentDidCatch && (update.callback = function() {
      logCaughtError(root2, fiber, errorInfo);
      "function" !== typeof getDerivedStateFromError && (null === legacyErrorBoundariesThatAlreadyFailed ? legacyErrorBoundariesThatAlreadyFailed = /* @__PURE__ */ new Set([this]) : legacyErrorBoundariesThatAlreadyFailed.add(this));
      var stack = errorInfo.stack;
      this.componentDidCatch(errorInfo.value, {
        componentStack: null !== stack ? stack : ""
      });
    });
  }
  function throwException(root2, returnFiber, sourceFiber, value, rootRenderLanes) {
    sourceFiber.flags |= 32768;
    if (null !== value && "object" === typeof value && "function" === typeof value.then) {
      returnFiber = sourceFiber.alternate;
      null !== returnFiber && propagateParentContextChanges(
        returnFiber,
        sourceFiber,
        rootRenderLanes,
        true
      );
      sourceFiber = suspenseHandlerStackCursor.current;
      if (null !== sourceFiber) {
        switch (sourceFiber.tag) {
          case 31:
          case 13:
          case 19:
            return null === shellBoundary ? renderDidSuspendDelayIfPossible() : null === sourceFiber.alternate && 0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 3), sourceFiber.flags &= -257, sourceFiber.flags |= 65536, sourceFiber.lanes = rootRenderLanes, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? sourceFiber.updateQueue = /* @__PURE__ */ new Set([value]) : returnFiber.add(value), attachPingListener(root2, value, rootRenderLanes)), false;
          case 22:
            return sourceFiber.flags |= 65536, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? (returnFiber = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([value])
            }, sourceFiber.updateQueue = returnFiber) : (sourceFiber = returnFiber.retryQueue, null === sourceFiber ? returnFiber.retryQueue = /* @__PURE__ */ new Set([value]) : sourceFiber.add(value)), attachPingListener(root2, value, rootRenderLanes)), false;
        }
        throw Error(formatProdErrorMessage(435, sourceFiber.tag));
      }
      attachPingListener(root2, value, rootRenderLanes);
      renderDidSuspendDelayIfPossible();
      return false;
    }
    if (isHydrating)
      return returnFiber = suspenseHandlerStackCursor.current, null !== returnFiber ? (0 === (returnFiber.flags & 65536) && (returnFiber.flags |= 256), returnFiber.flags |= 65536, returnFiber.lanes = rootRenderLanes, value !== HydrationMismatchException && (root2 = Error(formatProdErrorMessage(422), { cause: value }), queueHydrationError(createCapturedValueAtFiber(root2, sourceFiber)))) : (value !== HydrationMismatchException && (returnFiber = Error(formatProdErrorMessage(423), {
        cause: value
      }), queueHydrationError(
        createCapturedValueAtFiber(returnFiber, sourceFiber)
      )), root2 = root2.current.alternate, root2.flags |= 65536, rootRenderLanes &= -rootRenderLanes, root2.lanes |= rootRenderLanes, value = createCapturedValueAtFiber(value, sourceFiber), rootRenderLanes = createRootErrorUpdate(
        root2.stateNode,
        value,
        rootRenderLanes
      ), enqueueCapturedUpdate(root2, rootRenderLanes), 4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2)), false;
    var wrapperError = Error(formatProdErrorMessage(520), { cause: value });
    wrapperError = createCapturedValueAtFiber(wrapperError, sourceFiber);
    null === workInProgressRootConcurrentErrors ? workInProgressRootConcurrentErrors = [wrapperError] : workInProgressRootConcurrentErrors.push(wrapperError);
    4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2);
    if (null === returnFiber) return true;
    value = createCapturedValueAtFiber(value, sourceFiber);
    sourceFiber = returnFiber;
    do {
      switch (sourceFiber.tag) {
        case 3:
          return sourceFiber.flags |= 65536, root2 = rootRenderLanes & -rootRenderLanes, sourceFiber.lanes |= root2, root2 = createRootErrorUpdate(sourceFiber.stateNode, value, root2), enqueueCapturedUpdate(sourceFiber, root2), false;
        case 1:
          returnFiber = sourceFiber.type;
          wrapperError = sourceFiber.stateNode;
          if (0 === (sourceFiber.flags & 128) && ("function" === typeof returnFiber.getDerivedStateFromError || null !== wrapperError && "function" === typeof wrapperError.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(wrapperError))))
            return sourceFiber.flags |= 65536, rootRenderLanes &= -rootRenderLanes, sourceFiber.lanes |= rootRenderLanes, rootRenderLanes = createClassErrorUpdate(rootRenderLanes), initializeClassErrorUpdate(
              rootRenderLanes,
              root2,
              sourceFiber,
              value
            ), enqueueCapturedUpdate(sourceFiber, rootRenderLanes), false;
          break;
        case 22:
          if (null !== sourceFiber.memoizedState)
            return sourceFiber.flags |= 65536, false;
      }
      sourceFiber = sourceFiber.return;
    } while (null !== sourceFiber);
    return false;
  }
  var SelectiveHydrationException = Error(formatProdErrorMessage(461)), didReceiveUpdate = false;
  function reconcileChildren(current, workInProgress2, nextChildren, renderLanes2) {
    workInProgress2.child = null === current ? mountChildFibers(workInProgress2, null, nextChildren, renderLanes2) : reconcileChildFibers(
      workInProgress2,
      current.child,
      nextChildren,
      renderLanes2
    );
  }
  function updateForwardRef(current, workInProgress2, Component, nextProps, renderLanes2) {
    Component = Component.render;
    var ref = workInProgress2.ref;
    if ("ref" in nextProps) {
      var propsWithoutRef = {};
      for (var key in nextProps)
        "ref" !== key && (propsWithoutRef[key] = nextProps[key]);
    } else propsWithoutRef = nextProps;
    prepareToReadContext(workInProgress2);
    nextProps = renderWithHooks(
      current,
      workInProgress2,
      Component,
      propsWithoutRef,
      ref,
      renderLanes2
    );
    key = checkDidRenderIdHook();
    if (null !== current && !didReceiveUpdate)
      return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
    isHydrating && key && pushMaterializedTreeId(workInProgress2);
    workInProgress2.flags |= 1;
    reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
    return workInProgress2.child;
  }
  function updateMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
    if (null === current) {
      var type = Component.type;
      if ("function" === typeof type && !shouldConstruct(type) && void 0 === type.defaultProps && null === Component.compare)
        return workInProgress2.tag = 15, workInProgress2.type = type, updateSimpleMemoComponent(
          current,
          workInProgress2,
          type,
          nextProps,
          renderLanes2
        );
      current = createFiberFromTypeAndProps(
        Component.type,
        null,
        nextProps,
        workInProgress2,
        workInProgress2.mode,
        renderLanes2
      );
      current.ref = workInProgress2.ref;
      current.return = workInProgress2;
      return workInProgress2.child = current;
    }
    type = current.child;
    if (!checkScheduledUpdateOrContext(current, renderLanes2)) {
      var prevProps = type.memoizedProps;
      Component = Component.compare;
      Component = null !== Component ? Component : shallowEqual;
      if (Component(prevProps, nextProps) && current.ref === workInProgress2.ref)
        return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
    }
    workInProgress2.flags |= 1;
    current = createWorkInProgress(type, nextProps);
    current.ref = workInProgress2.ref;
    current.return = workInProgress2;
    return workInProgress2.child = current;
  }
  function updateSimpleMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
    if (null !== current) {
      var prevProps = current.memoizedProps;
      if (shallowEqual(prevProps, nextProps) && current.ref === workInProgress2.ref)
        if (didReceiveUpdate = false, workInProgress2.pendingProps = nextProps = prevProps, checkScheduledUpdateOrContext(current, renderLanes2))
          0 !== (current.flags & 131072) && (didReceiveUpdate = true);
        else
          return workInProgress2.lanes = current.lanes, bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
    }
    return updateFunctionComponent(
      current,
      workInProgress2,
      Component,
      nextProps,
      renderLanes2
    );
  }
  function updateOffscreenComponent(current, workInProgress2, renderLanes2, nextProps) {
    var nextChildren = nextProps.children, prevState = null !== current ? current.memoizedState : null;
    null === current && null === workInProgress2.stateNode && (workInProgress2.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    });
    if ("hidden" === nextProps.mode) {
      if (0 !== (workInProgress2.flags & 128)) {
        prevState = null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2;
        if (null !== current) {
          nextProps = workInProgress2.child = current.child;
          for (nextChildren = 0; null !== nextProps; )
            nextChildren = nextChildren | nextProps.lanes | nextProps.childLanes, nextProps = nextProps.sibling;
          nextProps = nextChildren & ~prevState;
        } else nextProps = 0, workInProgress2.child = null;
        return deferHiddenOffscreenComponent(
          current,
          workInProgress2,
          prevState,
          renderLanes2,
          nextProps
        );
      }
      if (0 !== (renderLanes2 & 536870912))
        workInProgress2.memoizedState = { baseLanes: 0, cachePool: null }, null !== current && pushTransition(
          workInProgress2,
          null !== prevState ? prevState.cachePool : null
        ), null !== prevState ? pushHiddenContext(workInProgress2, prevState) : reuseHiddenContextOnStack(), pushOffscreenSuspenseHandler(workInProgress2);
      else
        return nextProps = workInProgress2.lanes = 536870912, deferHiddenOffscreenComponent(
          current,
          workInProgress2,
          null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2,
          renderLanes2,
          nextProps
        );
    } else
      null !== prevState ? (pushTransition(workInProgress2, prevState.cachePool), pushHiddenContext(workInProgress2, prevState), reuseSuspenseHandlerOnStack(), workInProgress2.memoizedState = null) : (null !== current && pushTransition(workInProgress2, null), reuseHiddenContextOnStack(), reuseSuspenseHandlerOnStack());
    reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
    return workInProgress2.child;
  }
  function bailoutOffscreenComponent(current, workInProgress2) {
    null !== current && 22 === current.tag || null !== workInProgress2.stateNode || (workInProgress2.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    });
    return workInProgress2.sibling;
  }
  function deferHiddenOffscreenComponent(current, workInProgress2, nextBaseLanes, renderLanes2, remainingChildLanes) {
    var JSCompiler_inline_result = peekCacheFromPool();
    JSCompiler_inline_result = null === JSCompiler_inline_result ? null : { parent: CacheContext._currentValue, pool: JSCompiler_inline_result };
    workInProgress2.memoizedState = {
      baseLanes: nextBaseLanes,
      cachePool: JSCompiler_inline_result
    };
    null !== current && pushTransition(workInProgress2, null);
    reuseHiddenContextOnStack();
    pushOffscreenSuspenseHandler(workInProgress2);
    null !== current && propagateParentContextChanges(current, workInProgress2, renderLanes2, true);
    workInProgress2.childLanes = remainingChildLanes;
    return null;
  }
  function mountActivityChildren(workInProgress2, nextProps) {
    nextProps = mountWorkInProgressOffscreenFiber(
      { mode: nextProps.mode, children: nextProps.children },
      workInProgress2.mode
    );
    nextProps.ref = workInProgress2.ref;
    workInProgress2.child = nextProps;
    nextProps.return = workInProgress2;
    return nextProps;
  }
  function retryActivityComponentWithoutHydrating(current, workInProgress2, renderLanes2) {
    reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
    current = mountActivityChildren(workInProgress2, workInProgress2.pendingProps);
    current.flags |= 2;
    popSuspenseHandler(workInProgress2);
    workInProgress2.memoizedState = null;
    return current;
  }
  function updateActivityComponent(current, workInProgress2, renderLanes2) {
    var nextProps = workInProgress2.pendingProps, didSuspend = 0 !== (workInProgress2.flags & 128);
    workInProgress2.flags &= -129;
    if (null === current) {
      if (isHydrating) {
        if ("hidden" === nextProps.mode)
          return current = mountActivityChildren(workInProgress2, nextProps), workInProgress2.lanes = 536870912, current.memoizedState = { baseLanes: 0, cachePool: null }, bailoutOffscreenComponent(null, current);
        pushDehydratedActivitySuspenseHandler(workInProgress2);
        (current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(
          current,
          rootOrSingletonContext
        ), current = null !== current && "&" === current.data ? current : null, null !== current && (workInProgress2.memoizedState = {
          dehydrated: current,
          treeContext: null !== treeContextProvider ? { id: treeContextId, overflow: treeContextOverflow } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, renderLanes2 = createFiberFromDehydratedFragment(current), renderLanes2.return = workInProgress2, workInProgress2.child = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null)) : current = null;
        if (null === current) throw throwOnHydrationMismatch(workInProgress2);
        workInProgress2.lanes = 536870912;
        return null;
      }
      return mountActivityChildren(workInProgress2, nextProps);
    }
    var prevState = current.memoizedState;
    if (null !== prevState) {
      var dehydrated = prevState.dehydrated;
      pushDehydratedActivitySuspenseHandler(workInProgress2);
      if (didSuspend)
        if (workInProgress2.flags & 256)
          workInProgress2.flags &= -257, workInProgress2 = retryActivityComponentWithoutHydrating(
            current,
            workInProgress2,
            renderLanes2
          );
        else if (null !== workInProgress2.memoizedState)
          workInProgress2.child = current.child, workInProgress2.flags |= 128, workInProgress2 = null;
        else throw Error(formatProdErrorMessage(558));
      else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress2, renderLanes2, false), didSuspend = 0 !== (renderLanes2 & current.childLanes), didReceiveUpdate || didSuspend) {
        if (null === currentTreeHiddenStackCursor.current) {
          nextProps = workInProgressRoot;
          if (null !== nextProps && (dehydrated = getBumpedLaneForHydration(nextProps, renderLanes2), 0 !== dehydrated && dehydrated !== prevState.retryLane))
            throw prevState.retryLane = dehydrated, enqueueConcurrentRenderForLane(current, dehydrated), scheduleUpdateOnFiber(nextProps, current, dehydrated), SelectiveHydrationException;
          renderDidSuspendDelayIfPossible();
        }
        workInProgress2 = retryActivityComponentWithoutHydrating(
          current,
          workInProgress2,
          renderLanes2
        );
      } else
        current = prevState.treeContext, nextHydratableInstance = getNextHydratable(dehydrated.nextSibling), hydrationParentFiber = workInProgress2, isHydrating = true, hydrationErrors = null, rootOrSingletonContext = false, null !== current && restoreSuspendedTreeContext(workInProgress2, current), workInProgress2 = mountActivityChildren(workInProgress2, nextProps), workInProgress2.flags |= 134221824;
      return workInProgress2;
    }
    current = createWorkInProgress(current.child, {
      mode: nextProps.mode,
      children: nextProps.children
    });
    current.ref = workInProgress2.ref;
    workInProgress2.child = current;
    current.return = workInProgress2;
    return current;
  }
  function markRef(current, workInProgress2) {
    var ref = workInProgress2.ref;
    if (null === ref)
      null !== current && null !== current.ref && (workInProgress2.flags |= 4194816);
    else {
      if ("function" !== typeof ref && "object" !== typeof ref)
        throw Error(formatProdErrorMessage(284));
      if (null === current || current.ref !== ref)
        workInProgress2.flags |= 4194816;
    }
  }
  function updateFunctionComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
    prepareToReadContext(workInProgress2);
    Component = renderWithHooks(
      current,
      workInProgress2,
      Component,
      nextProps,
      void 0,
      renderLanes2
    );
    nextProps = checkDidRenderIdHook();
    if (null !== current && !didReceiveUpdate)
      return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
    isHydrating && nextProps && pushMaterializedTreeId(workInProgress2);
    workInProgress2.flags |= 1;
    reconcileChildren(current, workInProgress2, Component, renderLanes2);
    return workInProgress2.child;
  }
  function replayFunctionComponent(current, workInProgress2, nextProps, Component, secondArg, renderLanes2) {
    prepareToReadContext(workInProgress2);
    workInProgress2.updateQueue = null;
    nextProps = renderWithHooksAgain(
      workInProgress2,
      Component,
      nextProps,
      secondArg
    );
    finishRenderingHooks(current);
    Component = checkDidRenderIdHook();
    if (null !== current && !didReceiveUpdate)
      return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
    isHydrating && Component && pushMaterializedTreeId(workInProgress2);
    workInProgress2.flags |= 1;
    reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
    return workInProgress2.child;
  }
  function updateClassComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
    prepareToReadContext(workInProgress2);
    if (null === workInProgress2.stateNode) {
      var context = emptyContextObject, contextType = Component.contextType;
      "object" === typeof contextType && null !== contextType && (context = readContext(contextType));
      context = new Component(nextProps, context);
      workInProgress2.memoizedState = null !== context.state && void 0 !== context.state ? context.state : null;
      context.updater = classComponentUpdater;
      workInProgress2.stateNode = context;
      context._reactInternals = workInProgress2;
      context = workInProgress2.stateNode;
      context.props = nextProps;
      context.state = workInProgress2.memoizedState;
      context.refs = {};
      initializeUpdateQueue(workInProgress2);
      contextType = Component.contextType;
      context.context = "object" === typeof contextType && null !== contextType ? readContext(contextType) : emptyContextObject;
      context.state = workInProgress2.memoizedState;
      contextType = Component.getDerivedStateFromProps;
      "function" === typeof contextType && (applyDerivedStateFromProps(
        workInProgress2,
        Component,
        contextType,
        nextProps
      ), context.state = workInProgress2.memoizedState);
      "function" === typeof Component.getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || (contextType = context.state, "function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount(), contextType !== context.state && classComponentUpdater.enqueueReplaceState(context, context.state, null), processUpdateQueue(workInProgress2, nextProps, context, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction(), context.state = workInProgress2.memoizedState);
      "function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308);
      nextProps = true;
    } else if (null === current) {
      context = workInProgress2.stateNode;
      var unresolvedOldProps = workInProgress2.memoizedProps, oldProps = resolveClassComponentProps(Component, unresolvedOldProps);
      context.props = oldProps;
      var oldContext = context.context, contextType$jscomp$0 = Component.contextType;
      contextType = emptyContextObject;
      "object" === typeof contextType$jscomp$0 && null !== contextType$jscomp$0 && (contextType = readContext(contextType$jscomp$0));
      var getDerivedStateFromProps = Component.getDerivedStateFromProps;
      contextType$jscomp$0 = "function" === typeof getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate;
      unresolvedOldProps = workInProgress2.pendingProps !== unresolvedOldProps;
      contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (unresolvedOldProps || oldContext !== contextType) && callComponentWillReceiveProps(
        workInProgress2,
        context,
        nextProps,
        contextType
      );
      hasForceUpdate = false;
      var oldState = workInProgress2.memoizedState;
      context.state = oldState;
      processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
      suspendIfUpdateReadFromEntangledAsyncAction();
      oldContext = workInProgress2.memoizedState;
      unresolvedOldProps || oldState !== oldContext || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps && (applyDerivedStateFromProps(
        workInProgress2,
        Component,
        getDerivedStateFromProps,
        nextProps
      ), oldContext = workInProgress2.memoizedState), (oldProps = hasForceUpdate || checkShouldComponentUpdate(
        workInProgress2,
        Component,
        oldProps,
        nextProps,
        oldState,
        oldContext,
        contextType
      )) ? (contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || ("function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount()), "function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308)) : ("function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = oldContext), context.props = nextProps, context.state = oldContext, context.context = contextType, nextProps = oldProps) : ("function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308), nextProps = false);
    } else {
      context = workInProgress2.stateNode;
      cloneUpdateQueue(current, workInProgress2);
      contextType = workInProgress2.memoizedProps;
      contextType$jscomp$0 = resolveClassComponentProps(Component, contextType);
      context.props = contextType$jscomp$0;
      getDerivedStateFromProps = workInProgress2.pendingProps;
      oldState = context.context;
      oldContext = Component.contextType;
      oldProps = emptyContextObject;
      "object" === typeof oldContext && null !== oldContext && (oldProps = readContext(oldContext));
      unresolvedOldProps = Component.getDerivedStateFromProps;
      (oldContext = "function" === typeof unresolvedOldProps || "function" === typeof context.getSnapshotBeforeUpdate) || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (contextType !== getDerivedStateFromProps || oldState !== oldProps) && callComponentWillReceiveProps(
        workInProgress2,
        context,
        nextProps,
        oldProps
      );
      hasForceUpdate = false;
      oldState = workInProgress2.memoizedState;
      context.state = oldState;
      processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
      suspendIfUpdateReadFromEntangledAsyncAction();
      var newState = workInProgress2.memoizedState;
      contextType !== getDerivedStateFromProps || oldState !== newState || hasForceUpdate || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies) ? ("function" === typeof unresolvedOldProps && (applyDerivedStateFromProps(
        workInProgress2,
        Component,
        unresolvedOldProps,
        nextProps
      ), newState = workInProgress2.memoizedState), (contextType$jscomp$0 = hasForceUpdate || checkShouldComponentUpdate(
        workInProgress2,
        Component,
        contextType$jscomp$0,
        nextProps,
        oldState,
        newState,
        oldProps
      ) || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies)) ? (oldContext || "function" !== typeof context.UNSAFE_componentWillUpdate && "function" !== typeof context.componentWillUpdate || ("function" === typeof context.componentWillUpdate && context.componentWillUpdate(nextProps, newState, oldProps), "function" === typeof context.UNSAFE_componentWillUpdate && context.UNSAFE_componentWillUpdate(
        nextProps,
        newState,
        oldProps
      )), "function" === typeof context.componentDidUpdate && (workInProgress2.flags |= 4), "function" === typeof context.getSnapshotBeforeUpdate && (workInProgress2.flags |= 1024)) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = newState), context.props = nextProps, context.state = newState, context.context = oldProps, nextProps = contextType$jscomp$0) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), nextProps = false);
    }
    context = nextProps;
    markRef(current, workInProgress2);
    nextProps = 0 !== (workInProgress2.flags & 128);
    context || nextProps ? (context = workInProgress2.stateNode, Component = nextProps && "function" !== typeof Component.getDerivedStateFromError ? null : context.render(), workInProgress2.flags |= 1, null !== current && nextProps ? (workInProgress2.child = reconcileChildFibers(
      workInProgress2,
      current.child,
      null,
      renderLanes2
    ), workInProgress2.child = reconcileChildFibers(
      workInProgress2,
      null,
      Component,
      renderLanes2
    )) : reconcileChildren(current, workInProgress2, Component, renderLanes2), workInProgress2.memoizedState = context.state, current = workInProgress2.child) : current = bailoutOnAlreadyFinishedWork(
      current,
      workInProgress2,
      renderLanes2
    );
    return current;
  }
  function mountHostRootWithoutHydrating(current, workInProgress2, nextChildren, renderLanes2) {
    resetHydrationState();
    workInProgress2.flags |= 256;
    reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
    return workInProgress2.child;
  }
  var SUSPENDED_MARKER = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function mountSuspenseOffscreenState(renderLanes2) {
    return { baseLanes: renderLanes2, cachePool: getSuspendedCache() };
  }
  function getRemainingWorkInPrimaryTree(current, primaryTreeDidDefer, renderLanes2) {
    current = null !== current ? current.childLanes & ~renderLanes2 : 0;
    primaryTreeDidDefer && (current |= workInProgressDeferredLane);
    return current;
  }
  function updateSuspenseComponent(current, workInProgress2, renderLanes2) {
    var nextProps = workInProgress2.pendingProps, showFallback = false, didSuspend = 0 !== (workInProgress2.flags & 128), JSCompiler_temp;
    (JSCompiler_temp = didSuspend) || (JSCompiler_temp = null !== current && null === current.memoizedState ? false : 0 !== (suspenseStackCursor.current & 2));
    JSCompiler_temp && (showFallback = true, workInProgress2.flags &= -129);
    JSCompiler_temp = 0 !== (workInProgress2.flags & 32);
    workInProgress2.flags &= -33;
    if (null === current) {
      if (isHydrating) {
        showFallback ? pushPrimaryTreeSuspenseHandler(workInProgress2) : reuseSuspenseHandlerOnStack();
        (current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(
          current,
          rootOrSingletonContext
        ), current = null !== current && "&" !== current.data ? current : null, null !== current && (workInProgress2.memoizedState = {
          dehydrated: current,
          treeContext: null !== treeContextProvider ? { id: treeContextId, overflow: treeContextOverflow } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, renderLanes2 = createFiberFromDehydratedFragment(current), renderLanes2.return = workInProgress2, workInProgress2.child = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null)) : current = null;
        if (null === current) throw throwOnHydrationMismatch(workInProgress2);
        isSuspenseInstanceFallback(current) ? workInProgress2.lanes = 32 : workInProgress2.lanes = 536870912;
        return null;
      }
      didSuspend = nextProps.children;
      nextProps = nextProps.fallback;
      if (showFallback)
        return reuseSuspenseHandlerOnStack(), showFallback = workInProgress2.mode, didSuspend = mountWorkInProgressOffscreenFiber(
          { mode: "hidden", children: didSuspend },
          showFallback
        ), nextProps = createFiberFromFragment(
          nextProps,
          showFallback,
          renderLanes2,
          null
        ), didSuspend.return = workInProgress2, nextProps.return = workInProgress2, didSuspend.sibling = nextProps, workInProgress2.child = didSuspend, nextProps = workInProgress2.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes2), nextProps.childLanes = getRemainingWorkInPrimaryTree(
          current,
          JSCompiler_temp,
          renderLanes2
        ), workInProgress2.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(null, nextProps);
      pushPrimaryTreeSuspenseHandler(workInProgress2);
      return mountSuspensePrimaryChildren(workInProgress2, didSuspend);
    }
    var prevState = current.memoizedState;
    if (null !== prevState) {
      var dehydrated$96 = prevState.dehydrated;
      if (null !== dehydrated$96)
        return updateDehydratedSuspenseComponent(
          current,
          workInProgress2,
          didSuspend,
          JSCompiler_temp,
          nextProps,
          dehydrated$96,
          prevState,
          renderLanes2
        );
    }
    if (showFallback)
      return reuseSuspenseHandlerOnStack(), showFallback = nextProps.fallback, didSuspend = workInProgress2.mode, prevState = current.child, dehydrated$96 = prevState.sibling, nextProps = createWorkInProgress(prevState, {
        mode: "hidden",
        children: nextProps.children
      }), nextProps.subtreeFlags = prevState.subtreeFlags & 1206910976, null !== dehydrated$96 ? showFallback = createWorkInProgress(dehydrated$96, showFallback) : (showFallback = createFiberFromFragment(
        showFallback,
        didSuspend,
        renderLanes2,
        null
      ), showFallback.flags |= 2), showFallback.return = workInProgress2, nextProps.return = workInProgress2, nextProps.sibling = showFallback, workInProgress2.child = nextProps, bailoutOffscreenComponent(null, nextProps), nextProps = workInProgress2.child, showFallback = current.child.memoizedState, null === showFallback ? showFallback = mountSuspenseOffscreenState(renderLanes2) : (didSuspend = showFallback.cachePool, null !== didSuspend ? (prevState = CacheContext._currentValue, didSuspend = didSuspend.parent !== prevState ? { parent: prevState, pool: prevState } : didSuspend) : didSuspend = getSuspendedCache(), showFallback = {
        baseLanes: showFallback.baseLanes | renderLanes2,
        cachePool: didSuspend
      }), nextProps.memoizedState = showFallback, nextProps.childLanes = getRemainingWorkInPrimaryTree(
        current,
        JSCompiler_temp,
        renderLanes2
      ), workInProgress2.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(current.child, nextProps);
    pushPrimaryTreeSuspenseHandler(workInProgress2);
    renderLanes2 = current.child;
    current = renderLanes2.sibling;
    renderLanes2 = createWorkInProgress(renderLanes2, {
      mode: "visible",
      children: nextProps.children
    });
    renderLanes2.return = workInProgress2;
    renderLanes2.sibling = null;
    null !== current && (JSCompiler_temp = workInProgress2.deletions, null === JSCompiler_temp ? (workInProgress2.deletions = [current], workInProgress2.flags |= 16) : JSCompiler_temp.push(current));
    workInProgress2.child = renderLanes2;
    workInProgress2.memoizedState = null;
    return renderLanes2;
  }
  function mountSuspensePrimaryChildren(workInProgress2, primaryChildren) {
    primaryChildren = mountWorkInProgressOffscreenFiber(
      { mode: "visible", children: primaryChildren },
      workInProgress2.mode
    );
    primaryChildren.return = workInProgress2;
    return workInProgress2.child = primaryChildren;
  }
  function mountWorkInProgressOffscreenFiber(offscreenProps, mode) {
    offscreenProps = createFiberImplClass(22, offscreenProps, null, mode);
    offscreenProps.lanes = 0;
    return offscreenProps;
  }
  function retrySuspenseComponentWithoutHydrating(current, workInProgress2, renderLanes2) {
    reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
    current = mountSuspensePrimaryChildren(
      workInProgress2,
      workInProgress2.pendingProps.children
    );
    current.flags |= 2;
    workInProgress2.memoizedState = null;
    return current;
  }
  function updateDehydratedSuspenseComponent(current, workInProgress2, didSuspend, didPrimaryChildrenDefer, nextProps, suspenseInstance, suspenseState, renderLanes2) {
    if (didSuspend) {
      if (workInProgress2.flags & 256)
        return pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags &= -257, retrySuspenseComponentWithoutHydrating(
          current,
          workInProgress2,
          renderLanes2
        );
      if (null !== workInProgress2.memoizedState)
        return reuseSuspenseHandlerOnStack(), workInProgress2.child = current.child, workInProgress2.flags |= 128, null;
      reuseSuspenseHandlerOnStack();
      suspenseInstance = nextProps.fallback;
      suspenseState = workInProgress2.mode;
      nextProps = mountWorkInProgressOffscreenFiber(
        { mode: "visible", children: nextProps.children },
        suspenseState
      );
      suspenseInstance = createFiberFromFragment(
        suspenseInstance,
        suspenseState,
        renderLanes2,
        null
      );
      suspenseInstance.flags |= 2;
      nextProps.return = workInProgress2;
      suspenseInstance.return = workInProgress2;
      nextProps.sibling = suspenseInstance;
      workInProgress2.child = nextProps;
      reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
      nextProps = workInProgress2.child;
      nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes2);
      nextProps.childLanes = getRemainingWorkInPrimaryTree(
        current,
        didPrimaryChildrenDefer,
        renderLanes2
      );
      workInProgress2.memoizedState = SUSPENDED_MARKER;
      return bailoutOffscreenComponent(null, nextProps);
    }
    pushPrimaryTreeSuspenseHandler(workInProgress2);
    if (isSuspenseInstanceFallback(suspenseInstance)) {
      didPrimaryChildrenDefer = suspenseInstance.nextSibling && suspenseInstance.nextSibling.dataset;
      if (didPrimaryChildrenDefer) var digest = didPrimaryChildrenDefer.dgst;
      didPrimaryChildrenDefer = digest;
      "" !== didPrimaryChildrenDefer && (nextProps = Error(formatProdErrorMessage(419)), nextProps.stack = "", nextProps.digest = didPrimaryChildrenDefer, queueHydrationError({ value: nextProps, source: null, stack: null }));
      return retrySuspenseComponentWithoutHydrating(
        current,
        workInProgress2,
        renderLanes2
      );
    }
    didReceiveUpdate || propagateParentContextChanges(current, workInProgress2, renderLanes2, false);
    didPrimaryChildrenDefer = 0 !== (renderLanes2 & current.childLanes);
    if (didReceiveUpdate || didPrimaryChildrenDefer) {
      if (null !== currentTreeHiddenStackCursor.current)
        return retrySuspenseComponentWithoutHydrating(
          current,
          workInProgress2,
          renderLanes2
        );
      didPrimaryChildrenDefer = workInProgressRoot;
      if (null !== didPrimaryChildrenDefer && (nextProps = getBumpedLaneForHydration(
        didPrimaryChildrenDefer,
        renderLanes2
      ), 0 !== nextProps && nextProps !== suspenseState.retryLane))
        throw suspenseState.retryLane = nextProps, enqueueConcurrentRenderForLane(current, nextProps), scheduleUpdateOnFiber(didPrimaryChildrenDefer, current, nextProps), SelectiveHydrationException;
      isSuspenseInstancePending(suspenseInstance) || renderDidSuspendDelayIfPossible();
      return retrySuspenseComponentWithoutHydrating(
        current,
        workInProgress2,
        renderLanes2
      );
    }
    if (isSuspenseInstancePending(suspenseInstance))
      return workInProgress2.flags |= 192, workInProgress2.child = current.child, null;
    current = suspenseState.treeContext;
    nextHydratableInstance = getNextHydratable(suspenseInstance.nextSibling);
    hydrationParentFiber = workInProgress2;
    isHydrating = true;
    hydrationErrors = null;
    rootOrSingletonContext = false;
    null !== current && restoreSuspendedTreeContext(workInProgress2, current);
    workInProgress2 = mountSuspensePrimaryChildren(
      workInProgress2,
      nextProps.children
    );
    workInProgress2.flags |= 134221824;
    return workInProgress2;
  }
  function scheduleSuspenseWorkOnFiber(fiber, renderLanes2, propagationRoot) {
    fiber.lanes |= renderLanes2;
    var alternate = fiber.alternate;
    null !== alternate && (alternate.lanes |= renderLanes2);
    scheduleContextWorkOnParentPath(fiber.return, renderLanes2, propagationRoot);
  }
  function findLastContentRow(firstChild) {
    for (var lastContentRow = null; null !== firstChild; ) {
      var currentRow = firstChild.alternate;
      null !== currentRow && null === findFirstSuspended(currentRow) && (lastContentRow = firstChild);
      firstChild = firstChild.sibling;
    }
    return lastContentRow;
  }
  function initSuspenseListRenderState(workInProgress2, isBackwards, tail, lastContentRow, tailMode, treeForkCount2) {
    var renderState = workInProgress2.memoizedState;
    null === renderState ? workInProgress2.memoizedState = {
      isBackwards,
      rendering: null,
      renderingStartTime: 0,
      last: lastContentRow,
      tail,
      tailMode,
      treeForkCount: treeForkCount2
    } : (renderState.isBackwards = isBackwards, renderState.rendering = null, renderState.renderingStartTime = 0, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailMode = tailMode, renderState.treeForkCount = treeForkCount2);
  }
  function reverseChildren(fiber) {
    var row = fiber.child;
    for (fiber.child = null; null !== row; ) {
      var nextRow = row.sibling;
      row.sibling = fiber.child;
      fiber.child = row;
      row = nextRow;
    }
  }
  function updateSuspenseListComponent(current, workInProgress2, renderLanes2) {
    var nextProps = workInProgress2.pendingProps, revealOrder = nextProps.revealOrder, tailMode = nextProps.tail;
    nextProps = nextProps.children;
    var suspenseContext = suspenseStackCursor.current;
    if (workInProgress2.flags & 128)
      return pushSuspenseListContext(workInProgress2, suspenseContext), null;
    var shouldForceFallback = 0 !== (suspenseContext & 2);
    shouldForceFallback ? (suspenseContext = suspenseContext & 1 | 2, workInProgress2.flags |= 128) : suspenseContext &= 1;
    pushSuspenseListContext(workInProgress2, suspenseContext);
    "backwards" === revealOrder && null !== current ? (reverseChildren(current), reconcileChildren(current, workInProgress2, nextProps, renderLanes2), reverseChildren(current)) : reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
    nextProps = isHydrating ? treeForkCount : 0;
    if (!shouldForceFallback && null !== current && 0 !== (current.flags & 128))
      a: for (current = workInProgress2.child; null !== current; ) {
        if (13 === current.tag)
          null !== current.memoizedState && scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
        else if (19 === current.tag)
          scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
        else if (null !== current.child) {
          current.child.return = current;
          current = current.child;
          continue;
        }
        if (current === workInProgress2) break a;
        for (; null === current.sibling; ) {
          if (null === current.return || current.return === workInProgress2)
            break a;
          current = current.return;
        }
        current.sibling.return = current.return;
        current = current.sibling;
      }
    switch (revealOrder) {
      case "backwards":
        renderLanes2 = findLastContentRow(workInProgress2.child);
        null === renderLanes2 ? (revealOrder = workInProgress2.child, workInProgress2.child = null) : (revealOrder = renderLanes2.sibling, renderLanes2.sibling = null, reverseChildren(workInProgress2));
        initSuspenseListRenderState(
          workInProgress2,
          true,
          revealOrder,
          null,
          tailMode,
          nextProps
        );
        break;
      case "unstable_legacy-backwards":
        renderLanes2 = null;
        revealOrder = workInProgress2.child;
        for (workInProgress2.child = null; null !== revealOrder; ) {
          current = revealOrder.alternate;
          if (null !== current && null === findFirstSuspended(current)) {
            workInProgress2.child = revealOrder;
            break;
          }
          current = revealOrder.sibling;
          revealOrder.sibling = renderLanes2;
          renderLanes2 = revealOrder;
          revealOrder = current;
        }
        initSuspenseListRenderState(
          workInProgress2,
          true,
          renderLanes2,
          null,
          tailMode,
          nextProps
        );
        break;
      case "together":
        initSuspenseListRenderState(
          workInProgress2,
          false,
          null,
          null,
          void 0,
          nextProps
        );
        break;
      case "independent":
        workInProgress2.memoizedState = null;
        break;
      default:
        renderLanes2 = findLastContentRow(workInProgress2.child), null === renderLanes2 ? (revealOrder = workInProgress2.child, workInProgress2.child = null) : (revealOrder = renderLanes2.sibling, renderLanes2.sibling = null), initSuspenseListRenderState(
          workInProgress2,
          false,
          revealOrder,
          renderLanes2,
          tailMode,
          nextProps
        );
    }
    return workInProgress2.child;
  }
  function updateContextProvider(current, workInProgress2, renderLanes2) {
    var newProps = workInProgress2.pendingProps;
    pushProvider(workInProgress2, workInProgress2.type, newProps.value);
    reconcileChildren(current, workInProgress2, newProps.children, renderLanes2);
    return workInProgress2.child;
  }
  function bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2) {
    null !== current && (workInProgress2.dependencies = current.dependencies);
    workInProgressRootSkippedLanes |= workInProgress2.lanes;
    if (0 === (renderLanes2 & workInProgress2.childLanes))
      if (null !== current) {
        if (propagateParentContextChanges(
          current,
          workInProgress2,
          renderLanes2,
          false
        ), 0 === (renderLanes2 & workInProgress2.childLanes))
          return null;
      } else return null;
    if (null !== current && workInProgress2.child !== current.child)
      throw Error(formatProdErrorMessage(153));
    if (null !== workInProgress2.child) {
      current = workInProgress2.child;
      renderLanes2 = createWorkInProgress(current, current.pendingProps);
      workInProgress2.child = renderLanes2;
      for (renderLanes2.return = workInProgress2; null !== current.sibling; )
        current = current.sibling, renderLanes2 = renderLanes2.sibling = createWorkInProgress(current, current.pendingProps), renderLanes2.return = workInProgress2;
      renderLanes2.sibling = null;
    }
    return workInProgress2.child;
  }
  function checkScheduledUpdateOrContext(current, renderLanes2) {
    if (0 !== (current.lanes & renderLanes2)) return true;
    current = current.dependencies;
    return null !== current && checkIfContextChanged(current) ? true : false;
  }
  function attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress2, renderLanes2) {
    switch (workInProgress2.tag) {
      case 3:
        pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
        pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
        resetHydrationState();
        break;
      case 27:
      case 5:
        pushHostContext(workInProgress2);
        break;
      case 4:
        pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
        break;
      case 10:
        pushProvider(
          workInProgress2,
          workInProgress2.type,
          workInProgress2.memoizedProps.value
        );
        break;
      case 31:
        if (null !== workInProgress2.memoizedState)
          return workInProgress2.flags |= 128, pushDehydratedActivitySuspenseHandler(workInProgress2), null;
        break;
      case 13:
        var state$108 = workInProgress2.memoizedState;
        if (null !== state$108) {
          if (null !== state$108.dehydrated)
            return pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags |= 128, null;
          state$108 = propagateParentContextChanges(
            current,
            workInProgress2,
            renderLanes2,
            false
          );
          var primaryChildLanes = workInProgress2.child.childLanes;
          if (state$108 || 0 !== (renderLanes2 & primaryChildLanes))
            return updateSuspenseComponent(current, workInProgress2, renderLanes2);
          pushPrimaryTreeSuspenseHandler(workInProgress2);
          current = bailoutOnAlreadyFinishedWork(
            current,
            workInProgress2,
            renderLanes2
          );
          return null !== current ? current.sibling : null;
        }
        pushPrimaryTreeSuspenseHandler(workInProgress2);
        break;
      case 19:
        if (workInProgress2.flags & 128)
          return updateSuspenseListComponent(
            current,
            workInProgress2,
            renderLanes2
          );
        primaryChildLanes = 0 !== (current.flags & 128);
        state$108 = 0 !== (renderLanes2 & workInProgress2.childLanes);
        state$108 || (propagateParentContextChanges(
          current,
          workInProgress2,
          renderLanes2,
          false
        ), state$108 = 0 !== (renderLanes2 & workInProgress2.childLanes));
        if (primaryChildLanes) {
          if (state$108)
            return updateSuspenseListComponent(
              current,
              workInProgress2,
              renderLanes2
            );
          workInProgress2.flags |= 128;
        }
        primaryChildLanes = workInProgress2.memoizedState;
        null !== primaryChildLanes && (primaryChildLanes.rendering = null, primaryChildLanes.tail = null, primaryChildLanes.lastEffect = null);
        pushSuspenseListContext(workInProgress2, suspenseStackCursor.current);
        if (state$108) break;
        else return null;
      case 22:
        return workInProgress2.lanes = 0, updateOffscreenComponent(
          current,
          workInProgress2,
          renderLanes2,
          workInProgress2.pendingProps
        );
      case 24:
        pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
    }
    return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
  }
  function beginWork(current, workInProgress2, renderLanes2) {
    if (null !== current)
      if (current.memoizedProps !== workInProgress2.pendingProps)
        didReceiveUpdate = true;
      else {
        if (!checkScheduledUpdateOrContext(current, renderLanes2) && 0 === (workInProgress2.flags & 128))
          return didReceiveUpdate = false, attemptEarlyBailoutIfNoScheduledUpdate(
            current,
            workInProgress2,
            renderLanes2
          );
        didReceiveUpdate = 0 !== (current.flags & 131072) ? true : false;
      }
    else
      didReceiveUpdate = false, isHydrating && 0 !== (workInProgress2.flags & 1048576) && pushTreeId(workInProgress2, treeForkCount, workInProgress2.index);
    workInProgress2.lanes = 0;
    switch (workInProgress2.tag) {
      case 16:
        a: {
          var props = workInProgress2.pendingProps;
          current = resolveLazy(workInProgress2.elementType);
          workInProgress2.type = current;
          if ("function" === typeof current)
            shouldConstruct(current) ? (props = resolveClassComponentProps(current, props), workInProgress2.tag = 1, workInProgress2 = updateClassComponent(
              null,
              workInProgress2,
              current,
              props,
              renderLanes2
            )) : (workInProgress2.tag = 0, workInProgress2 = updateFunctionComponent(
              null,
              workInProgress2,
              current,
              props,
              renderLanes2
            ));
          else {
            if (void 0 !== current && null !== current) {
              var $$typeof = current.$$typeof;
              if ($$typeof === REACT_FORWARD_REF_TYPE) {
                workInProgress2.tag = 11;
                workInProgress2 = updateForwardRef(
                  null,
                  workInProgress2,
                  current,
                  props,
                  renderLanes2
                );
                break a;
              } else if ($$typeof === REACT_MEMO_TYPE) {
                workInProgress2.tag = 14;
                workInProgress2 = updateMemoComponent(
                  null,
                  workInProgress2,
                  current,
                  props,
                  renderLanes2
                );
                break a;
              } else if ($$typeof === REACT_CONTEXT_TYPE) {
                workInProgress2.tag = 10;
                workInProgress2.type = current;
                workInProgress2 = updateContextProvider(
                  null,
                  workInProgress2,
                  renderLanes2
                );
                break a;
              }
            }
            workInProgress2 = getComponentNameFromType(current) || current;
            throw Error(formatProdErrorMessage(306, workInProgress2, ""));
          }
        }
        return workInProgress2;
      case 0:
        return updateFunctionComponent(
          current,
          workInProgress2,
          workInProgress2.type,
          workInProgress2.pendingProps,
          renderLanes2
        );
      case 1:
        return props = workInProgress2.type, $$typeof = resolveClassComponentProps(
          props,
          workInProgress2.pendingProps
        ), updateClassComponent(
          current,
          workInProgress2,
          props,
          $$typeof,
          renderLanes2
        );
      case 3:
        a: {
          pushHostContainer(
            workInProgress2,
            workInProgress2.stateNode.containerInfo
          );
          if (null === current) throw Error(formatProdErrorMessage(387));
          props = workInProgress2.pendingProps;
          var prevState = workInProgress2.memoizedState;
          $$typeof = prevState.element;
          cloneUpdateQueue(current, workInProgress2);
          processUpdateQueue(workInProgress2, props, null, renderLanes2);
          var nextState = workInProgress2.memoizedState;
          props = nextState.cache;
          pushProvider(workInProgress2, CacheContext, props);
          props !== prevState.cache && propagateContextChanges(
            workInProgress2,
            [CacheContext],
            renderLanes2,
            true
          );
          suspendIfUpdateReadFromEntangledAsyncAction();
          props = nextState.element;
          if (prevState.isDehydrated)
            if (prevState = {
              element: props,
              isDehydrated: false,
              cache: nextState.cache
            }, workInProgress2.updateQueue.baseState = prevState, workInProgress2.memoizedState = prevState, workInProgress2.flags & 256) {
              workInProgress2 = mountHostRootWithoutHydrating(
                current,
                workInProgress2,
                props,
                renderLanes2
              );
              break a;
            } else if (props !== $$typeof) {
              $$typeof = createCapturedValueAtFiber(
                Error(formatProdErrorMessage(424)),
                workInProgress2
              );
              queueHydrationError($$typeof);
              workInProgress2 = mountHostRootWithoutHydrating(
                current,
                workInProgress2,
                props,
                renderLanes2
              );
              break a;
            } else {
              current = workInProgress2.stateNode.containerInfo;
              switch (current.nodeType) {
                case 9:
                  current = current.body;
                  break;
                default:
                  current = "HTML" === current.nodeName ? current.ownerDocument.body : current;
              }
              nextHydratableInstance = getNextHydratable(current.firstChild);
              hydrationParentFiber = workInProgress2;
              isHydrating = true;
              hydrationErrors = null;
              rootOrSingletonContext = true;
              renderLanes2 = mountChildFibers(
                workInProgress2,
                null,
                props,
                renderLanes2
              );
              for (workInProgress2.child = renderLanes2; renderLanes2; )
                renderLanes2.flags = renderLanes2.flags & -3 | 134221824, renderLanes2 = renderLanes2.sibling;
            }
          else {
            resetHydrationState();
            if (props === $$typeof) {
              workInProgress2 = bailoutOnAlreadyFinishedWork(
                current,
                workInProgress2,
                renderLanes2
              );
              break a;
            }
            reconcileChildren(current, workInProgress2, props, renderLanes2);
          }
          workInProgress2 = workInProgress2.child;
        }
        return workInProgress2;
      case 26:
        return markRef(current, workInProgress2), null === current ? (renderLanes2 = getResource(
          workInProgress2.type,
          null,
          workInProgress2.pendingProps,
          null
        )) ? workInProgress2.memoizedState = renderLanes2 : isHydrating || (workInProgress2.stateNode = createHoistableInstance(
          workInProgress2.type,
          workInProgress2.pendingProps,
          rootInstanceStackCursor.current,
          workInProgress2
        )) : workInProgress2.memoizedState = getResource(
          workInProgress2.type,
          current.memoizedProps,
          workInProgress2.pendingProps,
          current.memoizedState
        ), null;
      case 27:
        return pushHostContext(workInProgress2), null === current && isHydrating && (props = workInProgress2.stateNode = resolveSingletonInstance(
          workInProgress2.type,
          workInProgress2.pendingProps,
          rootInstanceStackCursor.current
        ), hydrationParentFiber = workInProgress2, rootOrSingletonContext = true, $$typeof = nextHydratableInstance, isSingletonScope(workInProgress2.type) ? (previousHydratableOnEnteringScopedSingleton = $$typeof, nextHydratableInstance = getNextHydratable(props.firstChild)) : nextHydratableInstance = $$typeof), reconcileChildren(
          current,
          workInProgress2,
          workInProgress2.pendingProps.children,
          renderLanes2
        ), markRef(current, workInProgress2), null === current && (workInProgress2.flags |= 4194304), workInProgress2.child;
      case 5:
        if (null === current && isHydrating) {
          if ($$typeof = props = nextHydratableInstance)
            props = canHydrateInstance(
              props,
              workInProgress2.type,
              workInProgress2.pendingProps,
              rootOrSingletonContext
            ), null !== props ? (workInProgress2.stateNode = props, hydrationParentFiber = workInProgress2, nextHydratableInstance = getNextHydratable(props.firstChild), rootOrSingletonContext = false, $$typeof = true) : $$typeof = false;
          $$typeof || throwOnHydrationMismatch(workInProgress2);
        }
        pushHostContext(workInProgress2);
        $$typeof = workInProgress2.type;
        prevState = workInProgress2.pendingProps;
        nextState = null !== current ? current.memoizedProps : null;
        props = prevState.children;
        shouldSetTextContent($$typeof, prevState) ? props = null : null !== nextState && shouldSetTextContent($$typeof, nextState) && (workInProgress2.flags |= 32);
        null !== workInProgress2.memoizedState && ($$typeof = renderWithHooks(
          current,
          workInProgress2,
          TransitionAwareHostComponent,
          null,
          null,
          renderLanes2
        ), HostTransitionContext._currentValue = $$typeof);
        markRef(current, workInProgress2);
        reconcileChildren(current, workInProgress2, props, renderLanes2);
        return workInProgress2.child;
      case 6:
        if (null === current && isHydrating) {
          if (current = renderLanes2 = nextHydratableInstance)
            renderLanes2 = canHydrateTextInstance(
              renderLanes2,
              workInProgress2.pendingProps,
              rootOrSingletonContext
            ), null !== renderLanes2 ? (workInProgress2.stateNode = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null, current = true) : current = false;
          current || throwOnHydrationMismatch(workInProgress2);
        }
        return null;
      case 13:
        return updateSuspenseComponent(current, workInProgress2, renderLanes2);
      case 4:
        return pushHostContainer(
          workInProgress2,
          workInProgress2.stateNode.containerInfo
        ), props = workInProgress2.pendingProps, null === current ? workInProgress2.child = reconcileChildFibers(
          workInProgress2,
          null,
          props,
          renderLanes2
        ) : reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
      case 11:
        return updateForwardRef(
          current,
          workInProgress2,
          workInProgress2.type,
          workInProgress2.pendingProps,
          renderLanes2
        );
      case 7:
        return props = workInProgress2.pendingProps, markRef(current, workInProgress2), reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
      case 8:
        return reconcileChildren(
          current,
          workInProgress2,
          workInProgress2.pendingProps.children,
          renderLanes2
        ), workInProgress2.child;
      case 12:
        return reconcileChildren(
          current,
          workInProgress2,
          workInProgress2.pendingProps.children,
          renderLanes2
        ), workInProgress2.child;
      case 10:
        return updateContextProvider(current, workInProgress2, renderLanes2);
      case 9:
        return $$typeof = workInProgress2.type._context, props = workInProgress2.pendingProps.children, prepareToReadContext(workInProgress2), $$typeof = readContext($$typeof), props = props($$typeof), workInProgress2.flags |= 1, reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
      case 14:
        return updateMemoComponent(
          current,
          workInProgress2,
          workInProgress2.type,
          workInProgress2.pendingProps,
          renderLanes2
        );
      case 15:
        return updateSimpleMemoComponent(
          current,
          workInProgress2,
          workInProgress2.type,
          workInProgress2.pendingProps,
          renderLanes2
        );
      case 19:
        return updateSuspenseListComponent(current, workInProgress2, renderLanes2);
      case 31:
        return updateActivityComponent(current, workInProgress2, renderLanes2);
      case 22:
        return updateOffscreenComponent(
          current,
          workInProgress2,
          renderLanes2,
          workInProgress2.pendingProps
        );
      case 24:
        return prepareToReadContext(workInProgress2), props = readContext(CacheContext), null === current ? ($$typeof = peekCacheFromPool(), null === $$typeof && ($$typeof = workInProgressRoot, prevState = createCache(), $$typeof.pooledCache = prevState, prevState.refCount++, null !== prevState && ($$typeof.pooledCacheLanes |= renderLanes2), $$typeof = prevState), workInProgress2.memoizedState = { parent: props, cache: $$typeof }, initializeUpdateQueue(workInProgress2), pushProvider(workInProgress2, CacheContext, $$typeof)) : (0 !== (current.lanes & renderLanes2) && (cloneUpdateQueue(current, workInProgress2), processUpdateQueue(workInProgress2, null, null, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction()), $$typeof = current.memoizedState, prevState = workInProgress2.memoizedState, $$typeof.parent !== props ? ($$typeof = { parent: props, cache: props }, workInProgress2.memoizedState = $$typeof, 0 === workInProgress2.lanes && (workInProgress2.memoizedState = workInProgress2.updateQueue.baseState = $$typeof), pushProvider(workInProgress2, CacheContext, props)) : (props = prevState.cache, pushProvider(workInProgress2, CacheContext, props), props !== $$typeof.cache && propagateContextChanges(
          workInProgress2,
          [CacheContext],
          renderLanes2,
          true
        ))), reconcileChildren(
          current,
          workInProgress2,
          workInProgress2.pendingProps.children,
          renderLanes2
        ), workInProgress2.child;
      case 30:
        return null === workInProgress2.stateNode && (workInProgress2.stateNode = {
          autoName: null,
          paired: null,
          clones: null,
          ref: null
        }), props = workInProgress2.pendingProps, null != props.name && "auto" !== props.name ? workInProgress2.flags |= null === current ? 18882560 : 18874368 : isHydrating && pushMaterializedTreeId(workInProgress2), null !== current && current.memoizedProps.name !== props.name ? workInProgress2.flags |= 4194816 : markRef(current, workInProgress2), reconcileChildren(current, workInProgress2, props.children, renderLanes2), workInProgress2.child;
      case 29:
        throw workInProgress2.pendingProps;
    }
    throw Error(formatProdErrorMessage(156, workInProgress2.tag));
  }
  function markUpdate(workInProgress2) {
    workInProgress2.flags |= 4;
  }
  function preloadInstanceAndSuspendIfNeeded(workInProgress2, type, oldProps, newProps, renderLanes2) {
    var JSCompiler_temp;
    if (JSCompiler_temp = 0 !== (workInProgress2.mode & 32))
      JSCompiler_temp = null === oldProps ? maySuspendCommit(type, newProps) : maySuspendCommit(type, newProps) && (newProps.src !== oldProps.src || newProps.srcSet !== oldProps.srcSet);
    if (JSCompiler_temp) {
      if (workInProgress2.flags |= 16777216, (renderLanes2 & 335544128) === renderLanes2)
        if (workInProgress2.stateNode.complete) workInProgress2.flags |= 8192;
        else if (shouldRemainOnPreviousScreen()) workInProgress2.flags |= 8192;
        else
          throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
    } else workInProgress2.flags &= -16777217;
  }
  function preloadResourceAndSuspendIfNeeded(workInProgress2, resource) {
    if ("stylesheet" !== resource.type || 0 !== (resource.state.loading & 4))
      workInProgress2.flags &= -16777217;
    else if (workInProgress2.flags |= 16777216, !preloadResource(resource))
      if (shouldRemainOnPreviousScreen()) workInProgress2.flags |= 8192;
      else
        throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
  }
  function scheduleRetryEffect(workInProgress2, retryQueue) {
    null !== retryQueue && (workInProgress2.flags |= 4);
    workInProgress2.flags & 16384 && (retryQueue = 22 !== workInProgress2.tag ? claimNextRetryLane() : 536870912, workInProgress2.lanes |= retryQueue, workInProgressSuspendedRetryLanes |= retryQueue);
  }
  function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
    if (!isHydrating)
      switch (renderState.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var tailNode = renderState.tail, lastTailNode = null; null !== tailNode; )
            null !== tailNode.alternate && (lastTailNode = tailNode), tailNode = tailNode.sibling;
          null === lastTailNode ? hasRenderedATailFallback || null === renderState.tail ? renderState.tail = null : renderState.tail.sibling = null : lastTailNode.sibling = null;
          break;
        default:
          hasRenderedATailFallback = renderState.tail;
          for (tailNode = null; null !== hasRenderedATailFallback; )
            null !== hasRenderedATailFallback.alternate && (tailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
          null === tailNode ? renderState.tail = null : tailNode.sibling = null;
      }
  }
  function bubbleProperties(completedWork) {
    var didBailout = null !== completedWork.alternate && completedWork.alternate.child === completedWork.child, newChildLanes = 0, subtreeFlags = 0;
    if (didBailout)
      for (var child$113 = completedWork.child; null !== child$113; )
        newChildLanes |= child$113.lanes | child$113.childLanes, subtreeFlags |= child$113.subtreeFlags & 1206910976, subtreeFlags |= child$113.flags & 1206910976, child$113.return = completedWork, child$113 = child$113.sibling;
    else
      for (child$113 = completedWork.child; null !== child$113; )
        newChildLanes |= child$113.lanes | child$113.childLanes, subtreeFlags |= child$113.subtreeFlags, subtreeFlags |= child$113.flags, child$113.return = completedWork, child$113 = child$113.sibling;
    completedWork.subtreeFlags |= subtreeFlags;
    completedWork.childLanes = newChildLanes;
    return didBailout;
  }
  function completeWork(current, workInProgress2, renderLanes2) {
    var newProps = workInProgress2.pendingProps;
    popTreeContext(workInProgress2);
    switch (workInProgress2.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return bubbleProperties(workInProgress2), null;
      case 1:
        return bubbleProperties(workInProgress2), null;
      case 3:
        renderLanes2 = workInProgress2.stateNode;
        newProps = null;
        null !== current && (newProps = current.memoizedState.cache);
        workInProgress2.memoizedState.cache !== newProps && (workInProgress2.flags |= 2048);
        popProvider(CacheContext);
        popHostContainer();
        renderLanes2.pendingContext && (renderLanes2.context = renderLanes2.pendingContext, renderLanes2.pendingContext = null);
        if (null === current || null === current.child)
          popHydrationState(workInProgress2) ? markUpdate(workInProgress2) : null === current || current.memoizedState.isDehydrated && 0 === (workInProgress2.flags & 256) || (workInProgress2.flags |= 1024, upgradeHydrationErrorsToRecoverable());
        bubbleProperties(workInProgress2);
        return null;
      case 26:
        var type = workInProgress2.type, nextResource = workInProgress2.memoizedState;
        null === current ? (markUpdate(workInProgress2), null !== nextResource ? (bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, nextResource)) : (bubbleProperties(workInProgress2), preloadInstanceAndSuspendIfNeeded(
          workInProgress2,
          type,
          null,
          newProps,
          renderLanes2
        ))) : nextResource ? nextResource !== current.memoizedState ? (markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, nextResource)) : (bubbleProperties(workInProgress2), workInProgress2.flags &= -16777217) : (current = current.memoizedProps, current !== newProps && markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadInstanceAndSuspendIfNeeded(
          workInProgress2,
          type,
          current,
          newProps,
          renderLanes2
        ));
        return null;
      case 27:
        popHostContext(workInProgress2);
        renderLanes2 = rootInstanceStackCursor.current;
        type = workInProgress2.type;
        if (null !== current && null != workInProgress2.stateNode)
          current.memoizedProps !== newProps && markUpdate(workInProgress2);
        else {
          if (!newProps) {
            if (null === workInProgress2.stateNode)
              throw Error(formatProdErrorMessage(166));
            bubbleProperties(workInProgress2);
            workInProgress2.subtreeFlags &= -33554433;
            return null;
          }
          current = contextStackCursor.current;
          popHydrationState(workInProgress2) ? prepareToHydrateHostInstance(workInProgress2) : (current = resolveSingletonInstance(type, newProps, renderLanes2), workInProgress2.stateNode = current, markUpdate(workInProgress2));
        }
        bubbleProperties(workInProgress2);
        workInProgress2.subtreeFlags &= -33554433;
        return null;
      case 5:
        popHostContext(workInProgress2);
        type = workInProgress2.type;
        if (null !== current && null != workInProgress2.stateNode)
          current.memoizedProps !== newProps && markUpdate(workInProgress2);
        else {
          if (!newProps) {
            if (null === workInProgress2.stateNode)
              throw Error(formatProdErrorMessage(166));
            bubbleProperties(workInProgress2);
            workInProgress2.subtreeFlags &= -33554433;
            return null;
          }
          nextResource = contextStackCursor.current;
          if (popHydrationState(workInProgress2))
            prepareToHydrateHostInstance(workInProgress2);
          else {
            var ownerDocument = getOwnerDocumentFromRootContainer(
              rootInstanceStackCursor.current
            );
            switch (nextResource) {
              case 1:
                nextResource = ownerDocument.createElementNS(
                  "http://www.w3.org/2000/svg",
                  type
                );
                break;
              case 2:
                nextResource = ownerDocument.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  type
                );
                break;
              default:
                switch (type) {
                  case "svg":
                    nextResource = ownerDocument.createElementNS(
                      "http://www.w3.org/2000/svg",
                      type
                    );
                    break;
                  case "math":
                    nextResource = ownerDocument.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      type
                    );
                    break;
                  case "script":
                    nextResource = ownerDocument.createElement("div");
                    nextResource.innerHTML = "<script><\/script>";
                    nextResource = nextResource.removeChild(
                      nextResource.firstChild
                    );
                    break;
                  case "select":
                    nextResource = "string" === typeof newProps.is ? ownerDocument.createElement("select", {
                      is: newProps.is
                    }) : ownerDocument.createElement("select");
                    newProps.multiple ? nextResource.multiple = true : newProps.size && (nextResource.size = newProps.size);
                    break;
                  default:
                    nextResource = "string" === typeof newProps.is ? ownerDocument.createElement(type, { is: newProps.is }) : ownerDocument.createElement(type);
                }
            }
            nextResource[internalInstanceKey] = workInProgress2;
            nextResource[internalPropsKey] = newProps;
            a: for (ownerDocument = workInProgress2.child; null !== ownerDocument; ) {
              if (5 === ownerDocument.tag || 6 === ownerDocument.tag)
                nextResource.appendChild(ownerDocument.stateNode);
              else if (4 !== ownerDocument.tag && 27 !== ownerDocument.tag && null !== ownerDocument.child) {
                ownerDocument.child.return = ownerDocument;
                ownerDocument = ownerDocument.child;
                continue;
              }
              if (ownerDocument === workInProgress2) break a;
              for (; null === ownerDocument.sibling; ) {
                if (null === ownerDocument.return || ownerDocument.return === workInProgress2)
                  break a;
                ownerDocument = ownerDocument.return;
              }
              ownerDocument.sibling.return = ownerDocument.return;
              ownerDocument = ownerDocument.sibling;
            }
            workInProgress2.stateNode = nextResource;
            a: switch (setInitialProperties(nextResource, type, newProps), type) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                newProps = !!newProps.autoFocus;
                break a;
              case "img":
                newProps = true;
                break a;
              default:
                newProps = false;
            }
            newProps && markUpdate(workInProgress2);
          }
        }
        bubbleProperties(workInProgress2);
        workInProgress2.subtreeFlags &= -33554433;
        preloadInstanceAndSuspendIfNeeded(
          workInProgress2,
          workInProgress2.type,
          null === current ? null : current.memoizedProps,
          workInProgress2.pendingProps,
          renderLanes2
        );
        return null;
      case 6:
        if (current && null != workInProgress2.stateNode)
          current.memoizedProps !== newProps && markUpdate(workInProgress2);
        else {
          if ("string" !== typeof newProps && null === workInProgress2.stateNode)
            throw Error(formatProdErrorMessage(166));
          current = rootInstanceStackCursor.current;
          if (popHydrationState(workInProgress2)) {
            current = workInProgress2.stateNode;
            renderLanes2 = workInProgress2.memoizedProps;
            newProps = null;
            type = hydrationParentFiber;
            if (null !== type)
              switch (type.tag) {
                case 27:
                case 5:
                  newProps = type.memoizedProps;
              }
            current[internalInstanceKey] = workInProgress2;
            current = current.nodeValue === renderLanes2 || null !== newProps && true === newProps.suppressHydrationWarning || checkForUnmatchedText(current.nodeValue, renderLanes2) ? true : false;
            current || throwOnHydrationMismatch(workInProgress2, true);
          } else
            current = getOwnerDocumentFromRootContainer(current).createTextNode(
              newProps
            ), current[internalInstanceKey] = workInProgress2, workInProgress2.stateNode = current;
        }
        bubbleProperties(workInProgress2);
        return null;
      case 31:
        renderLanes2 = workInProgress2.memoizedState;
        if (null === current || null !== current.memoizedState) {
          newProps = popHydrationState(workInProgress2);
          if (null !== renderLanes2) {
            if (null === current) {
              if (!newProps) throw Error(formatProdErrorMessage(318));
              current = workInProgress2.memoizedState;
              current = null !== current ? current.dehydrated : null;
              if (!current) throw Error(formatProdErrorMessage(557));
              current[internalInstanceKey] = workInProgress2;
            } else
              resetHydrationState(), 0 === (workInProgress2.flags & 128) && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4;
            bubbleProperties(workInProgress2);
            current = false;
          } else
            renderLanes2 = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = renderLanes2), current = true;
          if (!current) {
            if (workInProgress2.flags & 256)
              return popSuspenseHandler(workInProgress2), workInProgress2;
            popSuspenseHandler(workInProgress2);
            return null;
          }
          if (0 !== (workInProgress2.flags & 128))
            throw Error(formatProdErrorMessage(558));
        }
        bubbleProperties(workInProgress2);
        return null;
      case 13:
        newProps = workInProgress2.memoizedState;
        if (null === current || null !== current.memoizedState && null !== current.memoizedState.dehydrated) {
          type = popHydrationState(workInProgress2);
          if (null !== newProps && null !== newProps.dehydrated) {
            if (null === current) {
              if (!type) throw Error(formatProdErrorMessage(318));
              type = workInProgress2.memoizedState;
              type = null !== type ? type.dehydrated : null;
              if (!type) throw Error(formatProdErrorMessage(317));
              type[internalInstanceKey] = workInProgress2;
            } else
              resetHydrationState(), 0 === (workInProgress2.flags & 128) && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4;
            bubbleProperties(workInProgress2);
            type = false;
          } else
            type = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = type), type = true;
          if (!type) {
            if (workInProgress2.flags & 256)
              return popSuspenseHandler(workInProgress2), workInProgress2;
            popSuspenseHandler(workInProgress2);
            return null;
          }
        }
        popSuspenseHandler(workInProgress2);
        if (0 !== (workInProgress2.flags & 128))
          return workInProgress2.lanes = renderLanes2, workInProgress2;
        renderLanes2 = null !== newProps;
        current = null !== current && null !== current.memoizedState;
        renderLanes2 && (newProps = workInProgress2.child, type = null, null !== newProps.alternate && null !== newProps.alternate.memoizedState && null !== newProps.alternate.memoizedState.cachePool && (type = newProps.alternate.memoizedState.cachePool.pool), nextResource = null, null !== newProps.memoizedState && null !== newProps.memoizedState.cachePool && (nextResource = newProps.memoizedState.cachePool.pool), nextResource !== type && (newProps.flags |= 2048));
        renderLanes2 !== current && renderLanes2 && (workInProgress2.child.flags |= 8192);
        scheduleRetryEffect(workInProgress2, workInProgress2.updateQueue);
        bubbleProperties(workInProgress2);
        return null;
      case 4:
        return popHostContainer(), null === current && listenToAllSupportedEvents(workInProgress2.stateNode.containerInfo), workInProgress2.flags |= 67108864, bubbleProperties(workInProgress2), null;
      case 10:
        return popProvider(workInProgress2.type), bubbleProperties(workInProgress2), null;
      case 19:
        popSuspenseListContext(workInProgress2);
        newProps = workInProgress2.memoizedState;
        if (null === newProps) return bubbleProperties(workInProgress2), null;
        type = 0 !== (workInProgress2.flags & 128);
        nextResource = newProps.rendering;
        if (null === nextResource)
          if (type) cutOffTailIfNeeded(newProps, false);
          else {
            if (0 !== workInProgressRootExitStatus || null !== current && 0 !== (current.flags & 128))
              for (current = workInProgress2.child; null !== current; ) {
                nextResource = findFirstSuspended(current);
                if (null !== nextResource) {
                  workInProgress2.flags |= 128;
                  cutOffTailIfNeeded(newProps, false);
                  current = nextResource.updateQueue;
                  workInProgress2.updateQueue = current;
                  scheduleRetryEffect(workInProgress2, current);
                  workInProgress2.subtreeFlags = 0;
                  current = renderLanes2;
                  for (renderLanes2 = workInProgress2.child; null !== renderLanes2; )
                    resetWorkInProgress(renderLanes2, current), renderLanes2 = renderLanes2.sibling;
                  pushSuspenseListContext(
                    workInProgress2,
                    suspenseStackCursor.current & 1 | 2
                  );
                  isHydrating && pushTreeFork(workInProgress2, newProps.treeForkCount);
                  return workInProgress2.child;
                }
                current = current.sibling;
              }
            null !== newProps.tail && now() > workInProgressRootRenderTargetTime && (workInProgress2.flags |= 128, type = true, cutOffTailIfNeeded(newProps, false), workInProgress2.lanes = 4194304);
          }
        else {
          if (!type)
            if (current = findFirstSuspended(nextResource), null !== current) {
              if (workInProgress2.flags |= 128, type = true, current = current.updateQueue, workInProgress2.updateQueue = current, scheduleRetryEffect(workInProgress2, current), cutOffTailIfNeeded(newProps, true), null === newProps.tail && "collapsed" !== newProps.tailMode && "visible" !== newProps.tailMode && !nextResource.alternate && !isHydrating)
                return bubbleProperties(workInProgress2), null;
            } else
              2 * now() - newProps.renderingStartTime > workInProgressRootRenderTargetTime && 536870912 !== renderLanes2 && (workInProgress2.flags |= 128, type = true, cutOffTailIfNeeded(newProps, false), workInProgress2.lanes = 4194304);
          newProps.isBackwards ? (nextResource.sibling = workInProgress2.child, workInProgress2.child = nextResource) : (current = newProps.last, null !== current ? current.sibling = nextResource : workInProgress2.child = nextResource, newProps.last = nextResource);
        }
        if (null !== newProps.tail) {
          current = newProps.tail;
          a: {
            for (renderLanes2 = current; null !== renderLanes2; ) {
              if (null !== renderLanes2.alternate) {
                renderLanes2 = false;
                break a;
              }
              renderLanes2 = renderLanes2.sibling;
            }
            renderLanes2 = true;
          }
          newProps.rendering = current;
          newProps.tail = current.sibling;
          newProps.renderingStartTime = now();
          current.sibling = null;
          nextResource = suspenseStackCursor.current;
          nextResource = type ? nextResource & 1 | 2 : nextResource & 1;
          "visible" === newProps.tailMode || "collapsed" === newProps.tailMode || !renderLanes2 || isHydrating ? pushSuspenseListContext(workInProgress2, nextResource) : (renderLanes2 = nextResource, push(suspenseHandlerStackCursor, workInProgress2), push(suspenseStackCursor, renderLanes2), null === shellBoundary && (shellBoundary = workInProgress2));
          isHydrating && pushTreeFork(workInProgress2, newProps.treeForkCount);
          return current;
        }
        bubbleProperties(workInProgress2);
        return null;
      case 22:
      case 23:
        return popSuspenseHandler(workInProgress2), popHiddenContext(), newProps = null !== workInProgress2.memoizedState, null !== current ? null !== current.memoizedState !== newProps && (workInProgress2.flags |= 8192) : newProps && (workInProgress2.flags |= 8192), newProps ? 0 !== (renderLanes2 & 536870912) && 0 === (workInProgress2.flags & 128) && (bubbleProperties(workInProgress2), workInProgress2.subtreeFlags & 6 && (workInProgress2.flags |= 8192)) : bubbleProperties(workInProgress2), renderLanes2 = workInProgress2.updateQueue, null !== renderLanes2 && scheduleRetryEffect(workInProgress2, renderLanes2.retryQueue), renderLanes2 = null, null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (renderLanes2 = current.memoizedState.cachePool.pool), newProps = null, null !== workInProgress2.memoizedState && null !== workInProgress2.memoizedState.cachePool && (newProps = workInProgress2.memoizedState.cachePool.pool), newProps !== renderLanes2 && (workInProgress2.flags |= 2048), null !== current && pop(resumedCache), null;
      case 24:
        return renderLanes2 = null, null !== current && (renderLanes2 = current.memoizedState.cache), workInProgress2.memoizedState.cache !== renderLanes2 && (workInProgress2.flags |= 2048), popProvider(CacheContext), bubbleProperties(workInProgress2), null;
      case 25:
        return null;
      case 30:
        return workInProgress2.flags |= 33554432, bubbleProperties(workInProgress2), null;
    }
    throw Error(formatProdErrorMessage(156, workInProgress2.tag));
  }
  function unwindWork(current, workInProgress2) {
    popTreeContext(workInProgress2);
    switch (workInProgress2.tag) {
      case 1:
        return current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
      case 3:
        return popProvider(CacheContext), popHostContainer(), current = workInProgress2.flags, 0 !== (current & 65536) && 0 === (current & 128) ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
      case 26:
      case 27:
      case 5:
        return popHostContext(workInProgress2), null;
      case 31:
        if (null !== workInProgress2.memoizedState) {
          popSuspenseHandler(workInProgress2);
          if (null === workInProgress2.alternate)
            throw Error(formatProdErrorMessage(340));
          resetHydrationState();
        }
        current = workInProgress2.flags;
        return current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
      case 13:
        popSuspenseHandler(workInProgress2);
        current = workInProgress2.memoizedState;
        if (null !== current && null !== current.dehydrated) {
          if (null === workInProgress2.alternate)
            throw Error(formatProdErrorMessage(340));
          resetHydrationState();
        }
        current = workInProgress2.flags;
        return current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
      case 19:
        return popSuspenseListContext(workInProgress2), current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, current = workInProgress2.memoizedState, null !== current && (current.rendering = null, current.tail = null), workInProgress2.flags |= 4, workInProgress2) : null;
      case 4:
        return popHostContainer(), null;
      case 10:
        return popProvider(workInProgress2.type), null;
      case 22:
      case 23:
        return popSuspenseHandler(workInProgress2), popHiddenContext(), null !== current && pop(resumedCache), current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
      case 24:
        return popProvider(CacheContext), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function unwindInterruptedWork(current, interruptedWork) {
    popTreeContext(interruptedWork);
    switch (interruptedWork.tag) {
      case 3:
        popProvider(CacheContext);
        popHostContainer();
        break;
      case 26:
      case 27:
      case 5:
        popHostContext(interruptedWork);
        break;
      case 4:
        popHostContainer();
        break;
      case 31:
        null !== interruptedWork.memoizedState && popSuspenseHandler(interruptedWork);
        break;
      case 13:
        popSuspenseHandler(interruptedWork);
        break;
      case 19:
        popSuspenseListContext(interruptedWork);
        break;
      case 10:
        popProvider(interruptedWork.type);
        break;
      case 22:
      case 23:
        popSuspenseHandler(interruptedWork);
        popHiddenContext();
        null !== current && pop(resumedCache);
        break;
      case 24:
        popProvider(CacheContext);
    }
  }
  function commitHookEffectListMount(flags, finishedWork) {
    try {
      var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
      if (null !== lastEffect) {
        var firstEffect = lastEffect.next;
        updateQueue = firstEffect;
        do {
          if ((updateQueue.tag & flags) === flags) {
            lastEffect = void 0;
            var create = updateQueue.create, inst = updateQueue.inst;
            lastEffect = create();
            inst.destroy = lastEffect;
          }
          updateQueue = updateQueue.next;
        } while (updateQueue !== firstEffect);
      }
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
  function commitHookEffectListUnmount(flags, finishedWork, nearestMountedAncestor$jscomp$0) {
    try {
      var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
      if (null !== lastEffect) {
        var firstEffect = lastEffect.next;
        updateQueue = firstEffect;
        do {
          if ((updateQueue.tag & flags) === flags) {
            var inst = updateQueue.inst, destroy = inst.destroy;
            if (void 0 !== destroy) {
              inst.destroy = void 0;
              lastEffect = finishedWork;
              var nearestMountedAncestor = nearestMountedAncestor$jscomp$0, destroy_ = destroy;
              try {
                destroy_();
              } catch (error) {
                captureCommitPhaseError(
                  lastEffect,
                  nearestMountedAncestor,
                  error
                );
              }
            }
          }
          updateQueue = updateQueue.next;
        } while (updateQueue !== firstEffect);
      }
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
  function commitClassCallbacks(finishedWork) {
    var updateQueue = finishedWork.updateQueue;
    if (null !== updateQueue) {
      var instance = finishedWork.stateNode;
      try {
        commitCallbacks(updateQueue, instance);
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
  }
  function safelyCallComponentWillUnmount(current, nearestMountedAncestor, instance) {
    instance.props = resolveClassComponentProps(
      current.type,
      current.memoizedProps
    );
    instance.state = current.memoizedState;
    try {
      instance.componentWillUnmount();
    } catch (error) {
      captureCommitPhaseError(current, nearestMountedAncestor, error);
    }
  }
  function safelyAttachRef(current, nearestMountedAncestor) {
    try {
      var ref = current.ref;
      if (null !== ref) {
        switch (current.tag) {
          case 26:
          case 27:
          case 5:
            var instanceToUse = current.stateNode;
            break;
          case 30:
            var instance = current.stateNode, name = getViewTransitionName(current.memoizedProps, instance);
            if (null === instance.ref || instance.ref.name !== name)
              instance.ref = createViewTransitionInstance(name);
            instanceToUse = instance.ref;
            break;
          case 7:
            if (null === current.stateNode) {
              var fragmentInstance = new FragmentInstance(current);
              traverseVisibleInstancesAndTextInstances(
                current.child,
                false,
                addFragmentHandleToFiber,
                fragmentInstance,
                void 0,
                void 0
              );
              current.stateNode = fragmentInstance;
            }
            instanceToUse = current.stateNode;
            break;
          default:
            instanceToUse = current.stateNode;
        }
        "function" === typeof ref ? current.refCleanup = ref(instanceToUse) : ref.current = instanceToUse;
      }
    } catch (error) {
      captureCommitPhaseError(current, nearestMountedAncestor, error);
    }
  }
  function safelyDetachRef(current, nearestMountedAncestor) {
    var ref = current.ref, refCleanup = current.refCleanup;
    if (null !== ref)
      if ("function" === typeof refCleanup)
        try {
          refCleanup();
        } catch (error) {
          captureCommitPhaseError(current, nearestMountedAncestor, error);
        } finally {
          current.refCleanup = null, current = current.alternate, null != current && (current.refCleanup = null);
        }
      else if ("function" === typeof ref)
        try {
          ref(null);
        } catch (error$148) {
          captureCommitPhaseError(current, nearestMountedAncestor, error$148);
        }
      else ref.current = null;
  }
  function commitNewChildToFragmentInstances(fiber, parentFragmentInstances) {
    if ((5 === fiber.tag || 27 === fiber.tag || 6 === fiber.tag) && null === fiber.alternate && null !== parentFragmentInstances)
      for (var i = 0; i < parentFragmentInstances.length; i++)
        commitNewChildToFragmentInstance(
          fiber.stateNode,
          parentFragmentInstances[i]
        );
  }
  function commitFragmentInstanceInsertionEffects(fiber) {
    for (var parent = fiber.return; null !== parent; ) {
      isFragmentInstanceParent(parent) && commitNewChildToFragmentInstance(fiber.stateNode, parent.stateNode);
      if (isFragmentInstanceHostBoundary(parent)) break;
      parent = parent.return;
    }
  }
  function commitFragmentInstanceDeletionEffects(fiber) {
    for (var parent = fiber.return; null !== parent; ) {
      isFragmentInstanceParent(parent) && deleteChildFromFragmentInstance(fiber.stateNode, parent.stateNode);
      if (isFragmentInstanceHostBoundary(parent)) break;
      parent = parent.return;
    }
  }
  function isFragmentInstanceHostBoundary(fiber) {
    return 5 === fiber.tag || 3 === fiber.tag || 27 === fiber.tag;
  }
  function isFragmentInstanceParent(fiber) {
    return fiber && 7 === fiber.tag && null !== fiber.stateNode;
  }
  function commitHostMount(finishedWork) {
    var type = finishedWork.type, props = finishedWork.memoizedProps, instance = finishedWork.stateNode;
    try {
      a: switch (type) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          props.autoFocus && instance.focus();
          break a;
        case "img":
          props.src ? instance.src = props.src : props.srcSet && (instance.srcset = props.srcSet);
      }
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
  function commitHostUpdate(finishedWork, newProps, oldProps) {
    try {
      var domElement = finishedWork.stateNode;
      updateProperties(domElement, finishedWork.type, oldProps, newProps);
      domElement[internalPropsKey] = newProps;
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
  function isHostParent(fiber) {
    return 5 === fiber.tag || 3 === fiber.tag || 26 === fiber.tag || 27 === fiber.tag && isSingletonScope(fiber.type) || 4 === fiber.tag;
  }
  function getHostSibling(fiber) {
    a: for (; ; ) {
      for (; null === fiber.sibling; ) {
        if (null === fiber.return || isHostParent(fiber.return)) return null;
        fiber = fiber.return;
      }
      fiber.sibling.return = fiber.return;
      for (fiber = fiber.sibling; 5 !== fiber.tag && 6 !== fiber.tag && 18 !== fiber.tag; ) {
        if (27 === fiber.tag && isSingletonScope(fiber.type)) continue a;
        if (fiber.flags & 2) continue a;
        if (null === fiber.child || 4 === fiber.tag) continue a;
        else fiber.child.return = fiber, fiber = fiber.child;
      }
      if (!(fiber.flags & 2)) return fiber.stateNode;
    }
  }
  function insertOrAppendPlacementNodeIntoContainer(node, before, parent, parentFragmentInstances) {
    var tag = node.tag;
    if (5 === tag || 6 === tag)
      tag = node.stateNode, before ? (9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent).insertBefore(tag, before) : (before = 9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent, before.appendChild(tag), parent = parent._reactRootContainer, null !== parent && void 0 !== parent || null !== before.onclick || (before.onclick = noop$1)), commitNewChildToFragmentInstances(node, parentFragmentInstances), viewTransitionMutationContext = true;
    else if (4 !== tag && (27 === tag && (commitNewChildToFragmentInstances(node, parentFragmentInstances), parentFragmentInstances = null, isSingletonScope(node.type) && (parent = node.stateNode, before = null)), node = node.child, null !== node))
      for (insertOrAppendPlacementNodeIntoContainer(
        node,
        before,
        parent,
        parentFragmentInstances
      ), node = node.sibling; null !== node; )
        insertOrAppendPlacementNodeIntoContainer(
          node,
          before,
          parent,
          parentFragmentInstances
        ), node = node.sibling;
  }
  function insertOrAppendPlacementNode(node, before, parent, parentFragmentInstances) {
    var tag = node.tag;
    if (5 === tag || 6 === tag)
      tag = node.stateNode, before ? parent.insertBefore(tag, before) : parent.appendChild(tag), commitNewChildToFragmentInstances(node, parentFragmentInstances), viewTransitionMutationContext = true;
    else if (4 !== tag && (27 === tag && (commitNewChildToFragmentInstances(node, parentFragmentInstances), parentFragmentInstances = null, isSingletonScope(node.type) && (parent = node.stateNode)), node = node.child, null !== node))
      for (insertOrAppendPlacementNode(
        node,
        before,
        parent,
        parentFragmentInstances
      ), node = node.sibling; null !== node; )
        insertOrAppendPlacementNode(
          node,
          before,
          parent,
          parentFragmentInstances
        ), node = node.sibling;
  }
  function commitHostSingletonAcquisition(finishedWork) {
    var singleton = finishedWork.stateNode, props = finishedWork.memoizedProps;
    try {
      for (var type = finishedWork.type, attributes = singleton.attributes; attributes.length; )
        singleton.removeAttributeNode(attributes[0]);
      setInitialProperties(singleton, type, props);
      singleton[internalInstanceKey] = finishedWork;
      singleton[internalPropsKey] = props;
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
  var shouldStartViewTransition = false, appearingViewTransitions = null;
  function trackEnterViewTransitions(placement) {
    if (30 === placement.tag || 0 !== (placement.subtreeFlags & 33554432))
      shouldStartViewTransition = true;
  }
  var viewTransitionCancelableChildren = null;
  function pushViewTransitionCancelableScope() {
    var prevChildren = viewTransitionCancelableChildren;
    viewTransitionCancelableChildren = null;
    return prevChildren;
  }
  var viewTransitionHostInstanceIdx = 0;
  function applyViewTransitionToHostInstances(fiber, name, className, collectMeasurements, stopAtNestedViewTransitions) {
    viewTransitionHostInstanceIdx = 0;
    return applyViewTransitionToHostInstancesRecursive(
      fiber.child,
      name,
      className,
      collectMeasurements,
      stopAtNestedViewTransitions
    );
  }
  function applyViewTransitionToHostInstancesRecursive(child, name, className, collectMeasurements, stopAtNestedViewTransitions) {
    for (var inViewport = false; null !== child; ) {
      if (5 === child.tag) {
        var instance = child.stateNode;
        if (null !== collectMeasurements) {
          var measurement = measureInstance(instance);
          collectMeasurements.push(measurement);
          measurement.view && (inViewport = true);
        } else
          inViewport || measureInstance(instance).view && (inViewport = true);
        shouldStartViewTransition = true;
        applyViewTransitionName(
          instance,
          0 === viewTransitionHostInstanceIdx ? name : name + "_" + viewTransitionHostInstanceIdx,
          className
        );
        viewTransitionHostInstanceIdx++;
      } else if (22 !== child.tag || null === child.memoizedState)
        30 === child.tag && stopAtNestedViewTransitions || applyViewTransitionToHostInstancesRecursive(
          child.child,
          name,
          className,
          collectMeasurements,
          stopAtNestedViewTransitions
        ) && (inViewport = true);
      child = child.sibling;
    }
    return inViewport;
  }
  function restoreViewTransitionOnHostInstances(child, stopAtNestedViewTransitions) {
    for (; null !== child; ) {
      if (5 === child.tag)
        restoreViewTransitionName(child.stateNode, child.memoizedProps);
      else if (22 !== child.tag || null === child.memoizedState)
        30 === child.tag && stopAtNestedViewTransitions || restoreViewTransitionOnHostInstances(
          child.child,
          stopAtNestedViewTransitions
        );
      child = child.sibling;
    }
  }
  function commitAppearingPairViewTransitions(placement) {
    if (0 !== (placement.subtreeFlags & 18874368))
      for (placement = placement.child; null !== placement; ) {
        if (22 !== placement.tag || null === placement.memoizedState) {
          if (commitAppearingPairViewTransitions(placement), 30 === placement.tag && 0 !== (placement.flags & 18874368) && placement.stateNode.paired) {
            var props = placement.memoizedProps;
            if (null == props.name || "auto" === props.name)
              throw Error(formatProdErrorMessage(544));
            var name = props.name;
            props = getViewTransitionClassName(props.default, props.share);
            "none" !== props && (applyViewTransitionToHostInstances(
              placement,
              name,
              props,
              null,
              false
            ) || restoreViewTransitionOnHostInstances(placement.child, false));
          }
        }
        placement = placement.sibling;
      }
  }
  function commitEnterViewTransitions(placement, gesture) {
    if (30 === placement.tag) {
      var state = placement.stateNode, props = placement.memoizedProps, name = getViewTransitionName(props, state), className = getViewTransitionClassName(
        props.default,
        state.paired ? props.share : props.enter
      );
      "none" !== className ? applyViewTransitionToHostInstances(placement, name, className, null, false) ? (commitAppearingPairViewTransitions(placement), state.paired || gesture || scheduleViewTransitionEvent(placement, props.onEnter)) : restoreViewTransitionOnHostInstances(placement.child, false) : commitAppearingPairViewTransitions(placement);
    } else if (0 !== (placement.subtreeFlags & 33554432))
      for (placement = placement.child; null !== placement; )
        commitEnterViewTransitions(placement, gesture), placement = placement.sibling;
    else commitAppearingPairViewTransitions(placement);
  }
  function commitDeletedPairViewTransitions(deletion) {
    if (null !== appearingViewTransitions && 0 !== appearingViewTransitions.size) {
      var pairs = appearingViewTransitions;
      if (0 !== (deletion.subtreeFlags & 18874368))
        for (deletion = deletion.child; null !== deletion; ) {
          if (22 !== deletion.tag || null === deletion.memoizedState) {
            if (30 === deletion.tag && 0 !== (deletion.flags & 18874368)) {
              var props = deletion.memoizedProps, name = props.name;
              if (null != name && "auto" !== name) {
                var pair = pairs.get(name);
                if (void 0 !== pair) {
                  var className = getViewTransitionClassName(
                    props.default,
                    props.share
                  );
                  "none" !== className && (applyViewTransitionToHostInstances(
                    deletion,
                    name,
                    className,
                    null,
                    false
                  ) ? (className = deletion.stateNode, pair.paired = className, className.paired = pair, scheduleViewTransitionEvent(deletion, props.onShare)) : restoreViewTransitionOnHostInstances(deletion.child, false));
                  pairs.delete(name);
                  if (0 === pairs.size) break;
                }
              }
            }
            commitDeletedPairViewTransitions(deletion);
          }
          deletion = deletion.sibling;
        }
    }
  }
  function commitExitViewTransitions(deletion) {
    if (30 === deletion.tag) {
      var props = deletion.memoizedProps, name = getViewTransitionName(props, deletion.stateNode), pair = null !== appearingViewTransitions ? appearingViewTransitions.get(name) : void 0, className = getViewTransitionClassName(
        props.default,
        void 0 !== pair ? props.share : props.exit
      );
      "none" !== className && (applyViewTransitionToHostInstances(deletion, name, className, null, false) ? void 0 !== pair ? (className = deletion.stateNode, pair.paired = className, className.paired = pair, appearingViewTransitions.delete(name), scheduleViewTransitionEvent(deletion, props.onShare)) : scheduleViewTransitionEvent(deletion, props.onExit) : restoreViewTransitionOnHostInstances(deletion.child, false));
      null !== appearingViewTransitions && commitDeletedPairViewTransitions(deletion);
    } else if (0 !== (deletion.subtreeFlags & 33554432))
      for (deletion = deletion.child; null !== deletion; )
        commitExitViewTransitions(deletion), deletion = deletion.sibling;
    else
      null !== appearingViewTransitions && commitDeletedPairViewTransitions(deletion);
  }
  function commitNestedViewTransitions(changedParent) {
    for (changedParent = changedParent.child; null !== changedParent; ) {
      if (30 === changedParent.tag) {
        var props = changedParent.memoizedProps, name = getViewTransitionName(props, changedParent.stateNode);
        props = getViewTransitionClassName(props.default, props.update);
        changedParent.flags &= -5;
        "none" !== props && applyViewTransitionToHostInstances(
          changedParent,
          name,
          props,
          changedParent.memoizedState = [],
          false
        );
      } else
        0 !== (changedParent.subtreeFlags & 33554432) && commitNestedViewTransitions(changedParent);
      changedParent = changedParent.sibling;
    }
  }
  function restorePairedViewTransitions(parent) {
    if (0 !== (parent.subtreeFlags & 18874368))
      for (parent = parent.child; null !== parent; ) {
        if (22 !== parent.tag || null === parent.memoizedState) {
          if (30 === parent.tag && 0 !== (parent.flags & 18874368)) {
            var instance = parent.stateNode;
            null !== instance.paired && (instance.paired = null, restoreViewTransitionOnHostInstances(parent.child, false));
          }
          restorePairedViewTransitions(parent);
        }
        parent = parent.sibling;
      }
  }
  function restoreEnterOrExitViewTransitions(fiber) {
    if (30 === fiber.tag)
      fiber.stateNode.paired = null, restoreViewTransitionOnHostInstances(fiber.child, false), restorePairedViewTransitions(fiber);
    else if (0 !== (fiber.subtreeFlags & 33554432))
      for (fiber = fiber.child; null !== fiber; )
        restoreEnterOrExitViewTransitions(fiber), fiber = fiber.sibling;
    else restorePairedViewTransitions(fiber);
  }
  function restoreNestedViewTransitions(changedParent) {
    for (changedParent = changedParent.child; null !== changedParent; )
      30 === changedParent.tag ? restoreViewTransitionOnHostInstances(changedParent.child, false) : 0 !== (changedParent.subtreeFlags & 33554432) && restoreNestedViewTransitions(changedParent), changedParent = changedParent.sibling;
  }
  function measureViewTransitionHostInstancesRecursive(parentViewTransition, child, newName, oldName, className, previousMeasurements, stopAtNestedViewTransitions) {
    for (var inViewport = false; null !== child; ) {
      if (5 === child.tag) {
        var instance = child.stateNode;
        if (null !== previousMeasurements && viewTransitionHostInstanceIdx < previousMeasurements.length) {
          var previousMeasurement = previousMeasurements[viewTransitionHostInstanceIdx], nextMeasurement = measureInstance(instance);
          if (previousMeasurement.view || nextMeasurement.view) inViewport = true;
          var JSCompiler_temp;
          if (JSCompiler_temp = 0 === (parentViewTransition.flags & 4))
            if (nextMeasurement.clip) JSCompiler_temp = true;
            else {
              JSCompiler_temp = previousMeasurement.rect;
              var newRect = nextMeasurement.rect;
              JSCompiler_temp = JSCompiler_temp.y !== newRect.y || JSCompiler_temp.x !== newRect.x || JSCompiler_temp.height !== newRect.height || JSCompiler_temp.width !== newRect.width;
            }
          JSCompiler_temp && (parentViewTransition.flags |= 4);
          nextMeasurement.abs ? nextMeasurement = !previousMeasurement.abs : (previousMeasurement = previousMeasurement.rect, nextMeasurement = nextMeasurement.rect, nextMeasurement = previousMeasurement.height !== nextMeasurement.height || previousMeasurement.width !== nextMeasurement.width);
          nextMeasurement && (parentViewTransition.flags |= 32);
        } else parentViewTransition.flags |= 32;
        0 !== (parentViewTransition.flags & 4) && applyViewTransitionName(
          instance,
          0 === viewTransitionHostInstanceIdx ? newName : newName + "_" + viewTransitionHostInstanceIdx,
          className
        );
        inViewport && 0 !== (parentViewTransition.flags & 4) || (null === viewTransitionCancelableChildren && (viewTransitionCancelableChildren = []), viewTransitionCancelableChildren.push(
          instance,
          0 === viewTransitionHostInstanceIdx ? oldName : oldName + "_" + viewTransitionHostInstanceIdx,
          child.memoizedProps
        ));
        viewTransitionHostInstanceIdx++;
      } else if (22 !== child.tag || null === child.memoizedState)
        30 === child.tag && stopAtNestedViewTransitions ? parentViewTransition.flags |= child.flags & 32 : measureViewTransitionHostInstancesRecursive(
          parentViewTransition,
          child.child,
          newName,
          oldName,
          className,
          previousMeasurements,
          stopAtNestedViewTransitions
        ) && (inViewport = true);
      child = child.sibling;
    }
    return inViewport;
  }
  function measureNestedViewTransitions(changedParent, gesture) {
    for (changedParent = changedParent.child; null !== changedParent; ) {
      if (30 === changedParent.tag) {
        var props = changedParent.memoizedProps, state = changedParent.stateNode, name = getViewTransitionName(props, state), className = getViewTransitionClassName(props.default, props.update);
        var previousMeasurements;
        previousMeasurements = changedParent.memoizedState, changedParent.memoizedState = null;
        state = changedParent;
        var child = changedParent.child;
        viewTransitionHostInstanceIdx = 0;
        name = measureViewTransitionHostInstancesRecursive(
          state,
          child,
          name,
          name,
          className,
          previousMeasurements,
          false
        );
        0 !== (changedParent.flags & 4) && name && scheduleViewTransitionEvent(changedParent, props.onUpdate);
      } else
        0 !== (changedParent.subtreeFlags & 33554432) && measureNestedViewTransitions(changedParent);
      changedParent = changedParent.sibling;
    }
  }
  var offscreenSubtreeIsHidden = false, offscreenSubtreeWasHidden = false, offscreenDirectParentIsHidden = false, needsFormReset = false, PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set, nextEffect = null, viewTransitionContextChanged = false, inUpdateViewTransition = false, rootViewTransitionAffected = false, rootViewTransitionNameCanceled = false;
  function commitBeforeMutationEffects(root2, firstChild, committedLanes) {
    root2 = root2.containerInfo;
    eventsEnabled = _enabled;
    root2 = getActiveElementDeep(root2);
    if (hasSelectionCapabilities(root2)) {
      if ("selectionStart" in root2)
        var JSCompiler_temp = {
          start: root2.selectionStart,
          end: root2.selectionEnd
        };
      else
        a: {
          JSCompiler_temp = (JSCompiler_temp = root2.ownerDocument) && JSCompiler_temp.defaultView || window;
          var selection = JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
          if (selection && 0 !== selection.rangeCount) {
            JSCompiler_temp = selection.anchorNode;
            var anchorOffset = selection.anchorOffset, focusNode = selection.focusNode;
            selection = selection.focusOffset;
            try {
              JSCompiler_temp.nodeType, focusNode.nodeType;
            } catch (e$21) {
              JSCompiler_temp = null;
              break a;
            }
            var length = 0, start = -1, end = -1, indexWithinAnchor = 0, indexWithinFocus = 0, node = root2, parentNode = null;
            b: for (; ; ) {
              for (var next; ; ) {
                node !== JSCompiler_temp || 0 !== anchorOffset && 3 !== node.nodeType || (start = length + anchorOffset);
                node !== focusNode || 0 !== selection && 3 !== node.nodeType || (end = length + selection);
                3 === node.nodeType && (length += node.nodeValue.length);
                if (null === (next = node.firstChild)) break;
                parentNode = node;
                node = next;
              }
              for (; ; ) {
                if (node === root2) break b;
                parentNode === JSCompiler_temp && ++indexWithinAnchor === anchorOffset && (start = length);
                parentNode === focusNode && ++indexWithinFocus === selection && (end = length);
                if (null !== (next = node.nextSibling)) break;
                node = parentNode;
                parentNode = node.parentNode;
              }
              node = next;
            }
            JSCompiler_temp = -1 === start || -1 === end ? null : { start, end };
          } else JSCompiler_temp = null;
        }
      JSCompiler_temp = JSCompiler_temp || { start: 0, end: 0 };
    } else JSCompiler_temp = null;
    selectionInformation = { focusedElem: root2, selectionRange: JSCompiler_temp };
    _enabled = false;
    committedLanes = (committedLanes & 335544064) === committedLanes;
    nextEffect = firstChild;
    for (firstChild = committedLanes ? 9270 : 1024; null !== nextEffect; ) {
      root2 = nextEffect;
      if (committedLanes && (JSCompiler_temp = root2.deletions, null !== JSCompiler_temp))
        for (anchorOffset = 0; anchorOffset < JSCompiler_temp.length; anchorOffset++)
          committedLanes && commitExitViewTransitions(JSCompiler_temp[anchorOffset]);
      if (null === root2.alternate && 0 !== (root2.flags & 2))
        committedLanes && trackEnterViewTransitions(root2), commitBeforeMutationEffects_complete(committedLanes);
      else {
        if (22 === root2.tag) {
          if (JSCompiler_temp = root2.alternate, null !== root2.memoizedState) {
            null !== JSCompiler_temp && null === JSCompiler_temp.memoizedState && committedLanes && commitExitViewTransitions(JSCompiler_temp);
            commitBeforeMutationEffects_complete(committedLanes);
            continue;
          } else if (null !== JSCompiler_temp && null !== JSCompiler_temp.memoizedState) {
            committedLanes && trackEnterViewTransitions(root2);
            commitBeforeMutationEffects_complete(committedLanes);
            continue;
          }
        }
        JSCompiler_temp = root2.child;
        0 !== (root2.subtreeFlags & firstChild) && null !== JSCompiler_temp ? (JSCompiler_temp.return = root2, nextEffect = JSCompiler_temp) : (committedLanes && commitNestedViewTransitions(root2), commitBeforeMutationEffects_complete(committedLanes));
      }
    }
    appearingViewTransitions = null;
  }
  function commitBeforeMutationEffects_complete(isViewTransitionEligible$jscomp$0) {
    for (; null !== nextEffect; ) {
      var fiber = nextEffect, isViewTransitionEligible = isViewTransitionEligible$jscomp$0, current = fiber.alternate, flags = fiber.flags;
      switch (fiber.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (0 !== (flags & 1024) && null !== current) {
            isViewTransitionEligible = void 0;
            flags = current.memoizedProps;
            current = current.memoizedState;
            var instance = fiber.stateNode;
            try {
              var resolvedPrevProps = resolveClassComponentProps(
                fiber.type,
                flags
              );
              isViewTransitionEligible = instance.getSnapshotBeforeUpdate(
                resolvedPrevProps,
                current
              );
              instance.__reactInternalSnapshotBeforeUpdate = isViewTransitionEligible;
            } catch (error) {
              captureCommitPhaseError(fiber, fiber.return, error);
            }
          }
          break;
        case 3:
          if (0 !== (flags & 1024)) {
            if (current = fiber.stateNode.containerInfo, isViewTransitionEligible = current.nodeType, 9 === isViewTransitionEligible)
              clearContainerSparingly(current);
            else if (1 === isViewTransitionEligible)
              switch (current.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  clearContainerSparingly(current);
                  break;
                default:
                  current.textContent = "";
              }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        case 30:
          isViewTransitionEligible && null !== current && (isViewTransitionEligible = getViewTransitionName(
            current.memoizedProps,
            current.stateNode
          ), flags = fiber.memoizedProps, flags = getViewTransitionClassName(flags.default, flags.update), "none" !== flags && applyViewTransitionToHostInstances(
            current,
            isViewTransitionEligible,
            flags,
            current.memoizedState = [],
            true
          ));
          break;
        default:
          if (0 !== (flags & 1024)) throw Error(formatProdErrorMessage(163));
      }
      current = fiber.sibling;
      if (null !== current) {
        current.return = fiber.return;
        nextEffect = current;
        break;
      }
      nextEffect = fiber.return;
    }
  }
  function commitLayoutEffectOnFiber(finishedRoot, current, finishedWork) {
    var flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        flags & 4 && commitHookEffectListMount(5, finishedWork);
        break;
      case 1:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        if (flags & 4)
          if (finishedRoot = finishedWork.stateNode, null === current)
            try {
              finishedRoot.componentDidMount();
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          else {
            var prevProps = resolveClassComponentProps(
              finishedWork.type,
              current.memoizedProps
            );
            current = current.memoizedState;
            try {
              finishedRoot.componentDidUpdate(
                prevProps,
                current,
                finishedRoot.__reactInternalSnapshotBeforeUpdate
              );
            } catch (error$146) {
              captureCommitPhaseError(
                finishedWork,
                finishedWork.return,
                error$146
              );
            }
          }
        flags & 64 && commitClassCallbacks(finishedWork);
        flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
        break;
      case 3:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        if (flags & 64 && (finishedRoot = finishedWork.updateQueue, null !== finishedRoot)) {
          current = null;
          if (null !== finishedWork.child)
            switch (finishedWork.child.tag) {
              case 27:
              case 5:
                current = finishedWork.child.stateNode;
                break;
              case 1:
                current = finishedWork.child.stateNode;
            }
          try {
            commitCallbacks(finishedRoot, current);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
        break;
      case 27:
        null === current && flags & 4 && commitHostSingletonAcquisition(finishedWork);
      case 26:
      case 5:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        null === current && flags & 4 && commitHostMount(finishedWork);
        flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
        break;
      case 12:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        break;
      case 31:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
        break;
      case 13:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
        flags & 64 && (finishedRoot = finishedWork.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot && (finishedWork = retryDehydratedSuspenseBoundary.bind(
          null,
          finishedWork
        ), registerSuspenseInstanceRetry(finishedRoot, finishedWork))));
        break;
      case 22:
        flags = null !== finishedWork.memoizedState || offscreenSubtreeIsHidden;
        if (!flags) {
          var newOffscreenSubtreeWasHidden = null !== current && null !== current.memoizedState || offscreenSubtreeWasHidden;
          current = offscreenSubtreeIsHidden;
          prevProps = offscreenSubtreeWasHidden;
          offscreenSubtreeIsHidden = flags;
          (offscreenSubtreeWasHidden = newOffscreenSubtreeWasHidden) && !prevProps ? (flags = 2, 0 !== (finishedWork.subtreeFlags & 8772) && (flags |= 1), recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            flags
          )) : recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          offscreenSubtreeIsHidden = current;
          offscreenSubtreeWasHidden = prevProps;
        }
        break;
      case 30:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
        break;
      case 7:
        flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
      default:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
    }
  }
  function hideOrUnhideAllChildren(parentFiber, isHidden) {
    for (parentFiber = parentFiber.child; null !== parentFiber; )
      hideOrUnhideAllChildrenOnFiber(parentFiber, isHidden), parentFiber = parentFiber.sibling;
  }
  function hideOrUnhideAllChildrenOnFiber(fiber, isHidden) {
    switch (fiber.tag) {
      case 5:
      case 26:
        try {
          var instance = fiber.stateNode;
          if (isHidden) {
            var style2 = instance.style;
            "function" === typeof style2.setProperty ? style2.setProperty("display", "none", "important") : style2.display = "none";
          } else {
            var instance$jscomp$0 = fiber.stateNode, styleProp = fiber.memoizedProps.style, display = void 0 !== styleProp && null !== styleProp && styleProp.hasOwnProperty("display") ? styleProp.display : null;
            instance$jscomp$0.style.display = null == display || "boolean" === typeof display ? "" : ("" + display).trim();
          }
        } catch (error) {
          captureCommitPhaseError(fiber, fiber.return, error);
        }
        hideOrUnhideNearestPortals(fiber, isHidden);
        break;
      case 6:
        try {
          fiber.stateNode.nodeValue = isHidden ? "" : fiber.memoizedProps, viewTransitionMutationContext = true;
        } catch (error) {
          captureCommitPhaseError(fiber, fiber.return, error);
        }
        break;
      case 18:
        try {
          var instance$jscomp$1 = fiber.stateNode;
          isHidden ? hideOrUnhideDehydratedBoundary(instance$jscomp$1, true) : hideOrUnhideDehydratedBoundary(fiber.stateNode, false);
        } catch (error) {
          captureCommitPhaseError(fiber, fiber.return, error);
        }
        break;
      case 22:
      case 23:
        null === fiber.memoizedState && hideOrUnhideAllChildren(fiber, isHidden);
        break;
      default:
        hideOrUnhideAllChildren(fiber, isHidden);
    }
  }
  function hideOrUnhideNearestPortals(parentFiber, isHidden$jscomp$0) {
    if (parentFiber.subtreeFlags & 67108864)
      for (parentFiber = parentFiber.child; null !== parentFiber; ) {
        a: {
          var fiber = parentFiber, isHidden = isHidden$jscomp$0;
          switch (fiber.tag) {
            case 4:
              hideOrUnhideAllChildrenOnFiber(fiber, isHidden);
              break a;
            case 22:
              null === fiber.memoizedState && hideOrUnhideNearestPortals(fiber, isHidden);
              break a;
            default:
              hideOrUnhideNearestPortals(fiber, isHidden);
          }
        }
        parentFiber = parentFiber.sibling;
      }
  }
  function detachFiberAfterEffects(fiber) {
    var alternate = fiber.alternate;
    null !== alternate && (fiber.alternate = null, detachFiberAfterEffects(alternate));
    fiber.child = null;
    fiber.deletions = null;
    fiber.sibling = null;
    5 === fiber.tag && (alternate = fiber.stateNode, null !== alternate && detachDeletedInstance(alternate));
    fiber.stateNode = null;
    fiber.return = null;
    fiber.dependencies = null;
    fiber.memoizedProps = null;
    fiber.memoizedState = null;
    fiber.pendingProps = null;
    fiber.stateNode = null;
    fiber.updateQueue = null;
  }
  var hostParent = null, hostParentIsContainer = false;
  function recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, parent) {
    for (parent = parent.child; null !== parent; )
      commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, parent), parent = parent.sibling;
  }
  function commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, deletedFiber) {
    if (injectedHook && "function" === typeof injectedHook.onCommitFiberUnmount)
      try {
        injectedHook.onCommitFiberUnmount(rendererID, deletedFiber);
      } catch (err) {
      }
    switch (deletedFiber.tag) {
      case 26:
        offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        deletedFiber.memoizedState ? deletedFiber.memoizedState.count-- : deletedFiber.stateNode && !offscreenSubtreeWasHidden && (deletedFiber = deletedFiber.stateNode, deletedFiber.parentNode.removeChild(deletedFiber));
        break;
      case 27:
        offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
        commitFragmentInstanceDeletionEffects(deletedFiber);
        var prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer;
        isSingletonScope(deletedFiber.type) && (hostParent = deletedFiber.stateNode, hostParentIsContainer = false);
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        releaseSingletonInstance(
          deletedFiber.stateNode,
          deletedFiber.type,
          deletedFiber.memoizedProps
        );
        hostParent = prevHostParent;
        hostParentIsContainer = prevHostParentIsContainer;
        break;
      case 5:
        offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor), commitFragmentInstanceDeletionEffects(deletedFiber);
      case 6:
        6 === deletedFiber.tag && commitFragmentInstanceDeletionEffects(deletedFiber);
        prevHostParent = hostParent;
        prevHostParentIsContainer = hostParentIsContainer;
        hostParent = null;
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        hostParent = prevHostParent;
        hostParentIsContainer = prevHostParentIsContainer;
        if (null !== hostParent)
          if (hostParentIsContainer)
            try {
              (9 === hostParent.nodeType ? hostParent.body : "HTML" === hostParent.nodeName ? hostParent.ownerDocument.body : hostParent).removeChild(deletedFiber.stateNode), viewTransitionMutationContext = true;
            } catch (error) {
              captureCommitPhaseError(
                deletedFiber,
                nearestMountedAncestor,
                error
              );
            }
          else
            try {
              hostParent.removeChild(deletedFiber.stateNode), viewTransitionMutationContext = true;
            } catch (error) {
              captureCommitPhaseError(
                deletedFiber,
                nearestMountedAncestor,
                error
              );
            }
        break;
      case 18:
        null !== hostParent && (hostParentIsContainer ? (finishedRoot = hostParent, clearHydrationBoundary(
          9 === finishedRoot.nodeType ? finishedRoot.body : "HTML" === finishedRoot.nodeName ? finishedRoot.ownerDocument.body : finishedRoot,
          deletedFiber.stateNode
        ), retryIfBlockedOn(finishedRoot)) : clearHydrationBoundary(hostParent, deletedFiber.stateNode));
        break;
      case 4:
        prevHostParent = hostParent;
        prevHostParentIsContainer = hostParentIsContainer;
        hostParent = deletedFiber.stateNode.containerInfo;
        hostParentIsContainer = true;
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        hostParent = prevHostParent;
        hostParentIsContainer = prevHostParentIsContainer;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        commitHookEffectListUnmount(2, deletedFiber, nearestMountedAncestor);
        offscreenSubtreeWasHidden || commitHookEffectListUnmount(4, deletedFiber, nearestMountedAncestor);
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        break;
      case 1:
        offscreenSubtreeWasHidden || (safelyDetachRef(deletedFiber, nearestMountedAncestor), prevHostParent = deletedFiber.stateNode, "function" === typeof prevHostParent.componentWillUnmount && safelyCallComponentWillUnmount(
          deletedFiber,
          nearestMountedAncestor,
          prevHostParent
        ));
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        break;
      case 21:
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        break;
      case 22:
        offscreenSubtreeWasHidden = (prevHostParent = offscreenSubtreeWasHidden) || null !== deletedFiber.memoizedState;
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        offscreenSubtreeWasHidden = prevHostParent;
        break;
      case 30:
        safelyDetachRef(deletedFiber, nearestMountedAncestor);
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        break;
      case 7:
        offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        break;
      default:
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
    }
  }
  function commitActivityHydrationCallbacks(finishedRoot, finishedWork) {
    if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot))) {
      finishedRoot = finishedRoot.dehydrated;
      try {
        retryIfBlockedOn(finishedRoot);
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
  }
  function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
    if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot))))
      try {
        retryIfBlockedOn(finishedRoot);
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
  }
  function getRetryCache(finishedWork) {
    switch (finishedWork.tag) {
      case 31:
      case 13:
      case 19:
        var retryCache = finishedWork.stateNode;
        null === retryCache && (retryCache = finishedWork.stateNode = new PossiblyWeakSet());
        return retryCache;
      case 22:
        return finishedWork = finishedWork.stateNode, retryCache = finishedWork._retryCache, null === retryCache && (retryCache = finishedWork._retryCache = new PossiblyWeakSet()), retryCache;
      default:
        throw Error(formatProdErrorMessage(435, finishedWork.tag));
    }
  }
  function attachSuspenseRetryListeners(finishedWork, wakeables) {
    var retryCache = getRetryCache(finishedWork);
    wakeables.forEach(function(wakeable) {
      if (!retryCache.has(wakeable)) {
        retryCache.add(wakeable);
        var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
        wakeable.then(retry, retry);
      }
    });
  }
  function recursivelyTraverseMutationEffects(root$jscomp$0, parentFiber, lanes) {
    var deletions = parentFiber.deletions;
    if (null !== deletions)
      for (var i = 0; i < deletions.length; i++) {
        var childToDelete = deletions[i], root2 = root$jscomp$0, returnFiber = parentFiber, parent = returnFiber;
        a: for (; null !== parent; ) {
          switch (parent.tag) {
            case 27:
              if (isSingletonScope(parent.type)) {
                hostParent = parent.stateNode;
                hostParentIsContainer = false;
                break a;
              }
              break;
            case 5:
              hostParent = parent.stateNode;
              hostParentIsContainer = false;
              break a;
            case 3:
            case 4:
              hostParent = parent.stateNode.containerInfo;
              hostParentIsContainer = true;
              break a;
          }
          parent = parent.return;
        }
        if (null === hostParent) throw Error(formatProdErrorMessage(160));
        commitDeletionEffectsOnFiber(root2, returnFiber, childToDelete);
        hostParent = null;
        hostParentIsContainer = false;
        root2 = childToDelete.alternate;
        null !== root2 && (root2.return = null);
        childToDelete.return = null;
      }
    if (parentFiber.subtreeFlags & 13886)
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        commitMutationEffectsOnFiber(parentFiber, root$jscomp$0, lanes), parentFiber = parentFiber.sibling;
  }
  var currentHoistableRoot = null;
  function commitMutationEffectsOnFiber(finishedWork, root2, lanes) {
    var current = finishedWork.alternate, flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (flags & 4 && (current = finishedWork.updateQueue, current = null !== current ? current.events : null, null !== current))
          for (var ii = 0; ii < current.length; ii++) {
            var _eventPayloads$ii2 = current[ii];
            _eventPayloads$ii2.ref.impl = _eventPayloads$ii2.nextImpl;
          }
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        flags & 4 && (commitHookEffectListUnmount(3, finishedWork, finishedWork.return), commitHookEffectListMount(3, finishedWork), commitHookEffectListUnmount(5, finishedWork, finishedWork.return));
        break;
      case 1:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
        flags & 64 && offscreenSubtreeIsHidden && (finishedWork = finishedWork.updateQueue, null !== finishedWork && (root2 = finishedWork.callbacks, null !== root2 && (lanes = finishedWork.shared.hiddenCallbacks, finishedWork.shared.hiddenCallbacks = null === lanes ? root2 : lanes.concat(root2))));
        break;
      case 26:
        ii = currentHoistableRoot;
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
        if (flags & 4)
          if (flags = null !== current ? current.memoizedState : null, lanes = finishedWork.memoizedState, null === current)
            if (null === lanes)
              if (null === finishedWork.stateNode)
                if (offscreenSubtreeIsHidden)
                  finishedWork.stateNode = createHoistableInstance(
                    finishedWork.type,
                    finishedWork.memoizedProps,
                    root2.containerInfo,
                    finishedWork
                  );
                else {
                  a: {
                    root2 = finishedWork.type;
                    lanes = finishedWork.memoizedProps;
                    flags = ii.ownerDocument || ii;
                    b: switch (root2) {
                      case "title":
                        current = flags.getElementsByTagName("title")[0];
                        if (!current || current[internalHoistableMarker] || current[internalInstanceKey] || "http://www.w3.org/2000/svg" === current.namespaceURI || current.hasAttribute("itemprop"))
                          current = flags.createElement(root2), flags.head.insertBefore(
                            current,
                            flags.querySelector("head > title")
                          );
                        setInitialProperties(current, root2, lanes);
                        current[internalInstanceKey] = finishedWork;
                        markNodeAsHoistable(current);
                        root2 = current;
                        break a;
                      case "link":
                        if (ii = getHydratableHoistableCache(
                          "link",
                          "href",
                          flags
                        ).get(root2 + (lanes.href || ""))) {
                          for (_eventPayloads$ii2 = 0; _eventPayloads$ii2 < ii.length; _eventPayloads$ii2++)
                            if (current = ii[_eventPayloads$ii2], current.getAttribute("href") === (null == lanes.href || "" === lanes.href ? null : lanes.href) && current.getAttribute("rel") === (null == lanes.rel ? null : lanes.rel) && current.getAttribute("title") === (null == lanes.title ? null : lanes.title) && current.getAttribute("crossorigin") === (null == lanes.crossOrigin ? null : lanes.crossOrigin)) {
                              ii.splice(_eventPayloads$ii2, 1);
                              break b;
                            }
                        }
                        current = flags.createElement(root2);
                        setInitialProperties(current, root2, lanes);
                        flags.head.appendChild(current);
                        break;
                      case "meta":
                        if (ii = getHydratableHoistableCache(
                          "meta",
                          "content",
                          flags
                        ).get(root2 + (lanes.content || ""))) {
                          for (_eventPayloads$ii2 = 0; _eventPayloads$ii2 < ii.length; _eventPayloads$ii2++)
                            if (current = ii[_eventPayloads$ii2], current.getAttribute("content") === (null == lanes.content ? null : "" + lanes.content) && current.getAttribute("name") === (null == lanes.name ? null : lanes.name) && current.getAttribute("property") === (null == lanes.property ? null : lanes.property) && current.getAttribute("http-equiv") === (null == lanes.httpEquiv ? null : lanes.httpEquiv) && current.getAttribute("charset") === (null == lanes.charSet ? null : lanes.charSet)) {
                              ii.splice(_eventPayloads$ii2, 1);
                              break b;
                            }
                        }
                        current = flags.createElement(root2);
                        setInitialProperties(current, root2, lanes);
                        flags.head.appendChild(current);
                        break;
                      default:
                        throw Error(formatProdErrorMessage(468, root2));
                    }
                    current[internalInstanceKey] = finishedWork;
                    markNodeAsHoistable(current);
                    root2 = current;
                  }
                  finishedWork.stateNode = root2;
                }
              else
                offscreenSubtreeIsHidden || mountHoistable(ii, finishedWork.type, finishedWork.stateNode);
            else
              finishedWork.stateNode = acquireResource(
                ii,
                lanes,
                finishedWork.memoizedProps
              );
          else
            flags !== lanes ? (null === flags ? (root2 = current.stateNode, null === root2 || offscreenSubtreeWasHidden || root2.parentNode.removeChild(root2)) : flags.count--, null === lanes ? offscreenSubtreeIsHidden || mountHoistable(ii, finishedWork.type, finishedWork.stateNode) : acquireResource(ii, lanes, finishedWork.memoizedProps)) : null === lanes && null !== finishedWork.stateNode && commitHostUpdate(
              finishedWork,
              finishedWork.memoizedProps,
              current.memoizedProps
            );
        break;
      case 27:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
        null !== current && flags & 4 && commitHostUpdate(
          finishedWork,
          finishedWork.memoizedProps,
          current.memoizedProps
        );
        break;
      case 5:
        ii = offscreenDirectParentIsHidden;
        offscreenDirectParentIsHidden = false;
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        offscreenDirectParentIsHidden = ii;
        commitReconciliationEffects(finishedWork);
        flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
        if (finishedWork.flags & 32) {
          root2 = finishedWork.stateNode;
          try {
            setTextContent(root2, ""), viewTransitionMutationContext = true;
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
        flags & 4 && null != finishedWork.stateNode && (root2 = finishedWork.memoizedProps, commitHostUpdate(
          finishedWork,
          root2,
          null !== current ? current.memoizedProps : root2
        ));
        flags & 1024 && (needsFormReset = true);
        break;
      case 6:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        if (flags & 4) {
          if (null === finishedWork.stateNode)
            throw Error(formatProdErrorMessage(162));
          root2 = finishedWork.memoizedProps;
          lanes = finishedWork.stateNode;
          try {
            lanes.nodeValue = root2, viewTransitionMutationContext = true;
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
        break;
      case 3:
        viewTransitionMutationContext = false;
        tagCaches = null;
        ii = currentHoistableRoot;
        currentHoistableRoot = getHoistableRoot(root2.containerInfo);
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        currentHoistableRoot = ii;
        commitReconciliationEffects(finishedWork);
        if (flags & 4 && null !== current && current.memoizedState.isDehydrated)
          try {
            retryIfBlockedOn(root2.containerInfo);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        needsFormReset && (needsFormReset = false, recursivelyResetForms(finishedWork));
        viewTransitionMutationContext = false;
        break;
      case 4:
        flags = offscreenDirectParentIsHidden;
        offscreenDirectParentIsHidden = offscreenSubtreeIsHidden;
        current = pushMutationContext();
        ii = currentHoistableRoot;
        currentHoistableRoot = getHoistableRoot(
          finishedWork.stateNode.containerInfo
        );
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        currentHoistableRoot = ii;
        viewTransitionMutationContext && inUpdateViewTransition && (rootViewTransitionAffected = true);
        viewTransitionMutationContext = current;
        offscreenDirectParentIsHidden = flags;
        break;
      case 12:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        break;
      case 31:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        flags & 4 && (root2 = finishedWork.updateQueue, null !== root2 && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root2)));
        break;
      case 13:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        finishedWork.child.flags & 8192 && null !== finishedWork.memoizedState !== (null !== current && null !== current.memoizedState) && (globalMostRecentFallbackTime = now());
        flags & 4 && (root2 = finishedWork.updateQueue, null !== root2 && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root2)));
        break;
      case 22:
        ii = null !== finishedWork.memoizedState;
        _eventPayloads$ii2 = null !== current && null !== current.memoizedState;
        var prevOffscreenSubtreeIsHidden = offscreenSubtreeIsHidden, prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden, prevOffscreenDirectParentIsHidden$166 = offscreenDirectParentIsHidden;
        offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden || ii;
        offscreenDirectParentIsHidden = prevOffscreenDirectParentIsHidden$166 || ii;
        offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || _eventPayloads$ii2;
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
        offscreenDirectParentIsHidden = prevOffscreenDirectParentIsHidden$166;
        offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden;
        commitReconciliationEffects(finishedWork);
        flags & 8192 && (root2 = finishedWork.stateNode, root2._visibility = ii ? root2._visibility & -2 : root2._visibility | 1, !ii || null === current || _eventPayloads$ii2 || offscreenSubtreeIsHidden || offscreenSubtreeWasHidden || (root2 = _eventPayloads$ii2 || offscreenSubtreeWasHidden, lanes = offscreenSubtreeIsHidden, current = offscreenSubtreeWasHidden, offscreenSubtreeIsHidden = ii || offscreenSubtreeIsHidden, offscreenSubtreeWasHidden = root2, recursivelyTraverseDisappearLayoutEffects(finishedWork, 2), offscreenSubtreeIsHidden = lanes, offscreenSubtreeWasHidden = current), !ii && offscreenDirectParentIsHidden || hideOrUnhideAllChildren(finishedWork, ii));
        flags & 4 && (root2 = finishedWork.updateQueue, null !== root2 && (lanes = root2.retryQueue, null !== lanes && (root2.retryQueue = null, attachSuspenseRetryListeners(finishedWork, lanes))));
        break;
      case 19:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        flags & 4 && (root2 = finishedWork.updateQueue, null !== root2 && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root2)));
        break;
      case 30:
        flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
        flags = pushMutationContext();
        ii = inUpdateViewTransition;
        _eventPayloads$ii2 = (lanes & 335544064) === lanes;
        prevOffscreenSubtreeIsHidden = finishedWork.memoizedProps;
        inUpdateViewTransition = _eventPayloads$ii2 && "none" !== getViewTransitionClassName(
          prevOffscreenSubtreeIsHidden.default,
          prevOffscreenSubtreeIsHidden.update
        );
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
        commitReconciliationEffects(finishedWork);
        _eventPayloads$ii2 && null !== current && viewTransitionMutationContext && (finishedWork.flags |= 4);
        inUpdateViewTransition = ii;
        viewTransitionMutationContext = flags;
        break;
      case 21:
        break;
      case 7:
        flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return)), current && null !== current.stateNode && (current.stateNode._fragmentFiber = finishedWork);
      default:
        recursivelyTraverseMutationEffects(root2, finishedWork, lanes), commitReconciliationEffects(finishedWork);
    }
  }
  function commitReconciliationEffects(finishedWork) {
    var flags = finishedWork.flags;
    if (flags & 2) {
      try {
        for (var hostParentFiber, parentFiber = finishedWork.return; null !== parentFiber; ) {
          if (isHostParent(parentFiber)) {
            hostParentFiber = parentFiber;
            break;
          }
          parentFiber = parentFiber.return;
        }
        parentFiber = null;
        for (var parent = finishedWork.return; null !== parent; ) {
          if (isFragmentInstanceParent(parent)) {
            var fragmentInstance = parent.stateNode;
            null === parentFiber ? parentFiber = [fragmentInstance] : parentFiber.push(fragmentInstance);
          }
          if (isFragmentInstanceHostBoundary(parent)) break;
          parent = parent.return;
        }
        var JSCompiler_inline_result = parentFiber;
        if (null == hostParentFiber) throw Error(formatProdErrorMessage(160));
        switch (hostParentFiber.tag) {
          case 27:
            var parent$jscomp$0 = hostParentFiber.stateNode, before = getHostSibling(finishedWork);
            insertOrAppendPlacementNode(
              finishedWork,
              before,
              parent$jscomp$0,
              JSCompiler_inline_result
            );
            break;
          case 5:
            var parent$149 = hostParentFiber.stateNode;
            hostParentFiber.flags & 32 && (setTextContent(parent$149, ""), hostParentFiber.flags &= -33);
            var before$150 = getHostSibling(finishedWork);
            insertOrAppendPlacementNode(
              finishedWork,
              before$150,
              parent$149,
              JSCompiler_inline_result
            );
            break;
          case 3:
          case 4:
            var parent$151 = hostParentFiber.stateNode.containerInfo, before$152 = getHostSibling(finishedWork);
            insertOrAppendPlacementNodeIntoContainer(
              finishedWork,
              before$152,
              parent$151,
              JSCompiler_inline_result
            );
            break;
          default:
            throw Error(formatProdErrorMessage(161));
        }
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
      finishedWork.flags &= -3;
    }
    flags & 4096 && (finishedWork.flags &= -4097);
  }
  function recursivelyResetForms(parentFiber) {
    if (parentFiber.subtreeFlags & 1024)
      for (parentFiber = parentFiber.child; null !== parentFiber; ) {
        var fiber = parentFiber;
        recursivelyResetForms(fiber);
        5 === fiber.tag && fiber.flags & 1024 && (fiber = fiber.stateNode, _enabled = true, fiber.reset(), _enabled = false);
        parentFiber = parentFiber.sibling;
      }
  }
  function recursivelyTraverseAfterMutationEffects(root2, parentFiber) {
    if (parentFiber.subtreeFlags & 9270)
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        commitAfterMutationEffectsOnFiber(parentFiber, root2), parentFiber = parentFiber.sibling;
    else measureNestedViewTransitions(parentFiber);
  }
  function commitAfterMutationEffectsOnFiber(finishedWork, root2) {
    var current = finishedWork.alternate;
    if (null === current) commitEnterViewTransitions(finishedWork, false);
    else
      switch (finishedWork.tag) {
        case 3:
          rootViewTransitionNameCanceled = viewTransitionContextChanged = false;
          pushViewTransitionCancelableScope();
          recursivelyTraverseAfterMutationEffects(root2, finishedWork);
          if (!viewTransitionContextChanged && !rootViewTransitionAffected) {
            finishedWork = viewTransitionCancelableChildren;
            if (null !== finishedWork)
              for (var i = 0; i < finishedWork.length; i += 3) {
                current = finishedWork[i];
                var oldName = finishedWork[i + 1];
                restoreViewTransitionName(current, finishedWork[i + 2]);
                current = current.ownerDocument.documentElement;
                null !== current && current.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + oldName + ")"
                  }
                );
              }
            finishedWork = root2.containerInfo;
            finishedWork = 9 === finishedWork.nodeType ? finishedWork.documentElement : finishedWork.ownerDocument.documentElement;
            null !== finishedWork && "" === finishedWork.style.viewTransitionName && (finishedWork.style.viewTransitionName = "none", finishedWork.animate(
              { opacity: [0, 0], pointerEvents: ["none", "none"] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-group(root)"
              }
            ), finishedWork.animate(
              { width: [0, 0], height: [0, 0] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition"
              }
            ));
            rootViewTransitionNameCanceled = true;
          }
          viewTransitionCancelableChildren = null;
          break;
        case 5:
          recursivelyTraverseAfterMutationEffects(root2, finishedWork);
          break;
        case 4:
          i = viewTransitionContextChanged;
          viewTransitionContextChanged = false;
          recursivelyTraverseAfterMutationEffects(root2, finishedWork);
          viewTransitionContextChanged && (rootViewTransitionAffected = true);
          viewTransitionContextChanged = i;
          break;
        case 22:
          null === finishedWork.memoizedState && (null !== current.memoizedState ? commitEnterViewTransitions(finishedWork, false) : recursivelyTraverseAfterMutationEffects(root2, finishedWork));
          break;
        case 30:
          i = viewTransitionContextChanged;
          oldName = pushViewTransitionCancelableScope();
          viewTransitionContextChanged = false;
          recursivelyTraverseAfterMutationEffects(root2, finishedWork);
          viewTransitionContextChanged && (finishedWork.flags |= 4);
          var props = finishedWork.memoizedProps, state = finishedWork.stateNode;
          root2 = getViewTransitionName(props, state);
          state = getViewTransitionName(current.memoizedProps, state);
          var className = getViewTransitionClassName(props.default, props.update);
          "none" === className ? root2 = false : (props = current.memoizedState, current.memoizedState = null, current = finishedWork.child, viewTransitionHostInstanceIdx = 0, root2 = measureViewTransitionHostInstancesRecursive(
            finishedWork,
            current,
            root2,
            state,
            className,
            props,
            true
          ), viewTransitionHostInstanceIdx !== (null === props ? 0 : props.length) && (finishedWork.flags |= 32));
          0 !== (finishedWork.flags & 4) && root2 ? (scheduleViewTransitionEvent(
            finishedWork,
            finishedWork.memoizedProps.onUpdate
          ), viewTransitionCancelableChildren = oldName) : null !== oldName && (oldName.push.apply(oldName, viewTransitionCancelableChildren), viewTransitionCancelableChildren = oldName);
          viewTransitionContextChanged = 0 !== (finishedWork.flags & 32) ? true : i;
          break;
        default:
          recursivelyTraverseAfterMutationEffects(root2, finishedWork);
      }
  }
  function recursivelyTraverseLayoutEffects(root2, parentFiber) {
    if (parentFiber.subtreeFlags & 8772)
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        commitLayoutEffectOnFiber(root2, parentFiber.alternate, parentFiber), parentFiber = parentFiber.sibling;
  }
  function recursivelyTraverseDisappearLayoutEffects(parentFiber, layoutEffectTraversalFlags$jscomp$0) {
    for (parentFiber = parentFiber.child; null !== parentFiber; ) {
      var finishedWork = parentFiber, layoutEffectTraversalFlags = layoutEffectTraversalFlags$jscomp$0;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          commitHookEffectListUnmount(4, finishedWork, finishedWork.return);
          recursivelyTraverseDisappearLayoutEffects(
            finishedWork,
            layoutEffectTraversalFlags
          );
          break;
        case 1:
          safelyDetachRef(finishedWork, finishedWork.return);
          var instance = finishedWork.stateNode;
          "function" === typeof instance.componentWillUnmount && safelyCallComponentWillUnmount(
            finishedWork,
            finishedWork.return,
            instance
          );
          recursivelyTraverseDisappearLayoutEffects(
            finishedWork,
            layoutEffectTraversalFlags
          );
          break;
        case 27:
          0 !== (layoutEffectTraversalFlags & 2) && releaseSingletonInstance(
            finishedWork.stateNode,
            finishedWork.type,
            finishedWork.memoizedProps
          );
        case 5:
          safelyDetachRef(finishedWork, finishedWork.return);
          5 !== finishedWork.tag && 27 !== finishedWork.tag || commitFragmentInstanceDeletionEffects(finishedWork);
          recursivelyTraverseDisappearLayoutEffects(
            finishedWork,
            layoutEffectTraversalFlags
          );
          break;
        case 6:
          commitFragmentInstanceDeletionEffects(finishedWork);
          break;
        case 26:
          safelyDetachRef(finishedWork, finishedWork.return);
          instance = finishedWork.stateNode;
          null !== finishedWork.memoizedState || null === instance || offscreenSubtreeWasHidden || instance.parentNode.removeChild(instance);
          recursivelyTraverseDisappearLayoutEffects(
            finishedWork,
            layoutEffectTraversalFlags
          );
          break;
        case 22:
          null === finishedWork.memoizedState && recursivelyTraverseDisappearLayoutEffects(
            finishedWork,
            layoutEffectTraversalFlags
          );
          break;
        case 30:
          safelyDetachRef(finishedWork, finishedWork.return);
          recursivelyTraverseDisappearLayoutEffects(
            finishedWork,
            layoutEffectTraversalFlags
          );
          break;
        case 7:
          safelyDetachRef(finishedWork, finishedWork.return);
        default:
          recursivelyTraverseDisappearLayoutEffects(
            finishedWork,
            layoutEffectTraversalFlags
          );
      }
      parentFiber = parentFiber.sibling;
    }
  }
  function recursivelyTraverseReappearLayoutEffects(finishedRoot$jscomp$0, parentFiber, layoutEffectTraversalFlags) {
    layoutEffectTraversalFlags = 0 !== (parentFiber.subtreeFlags & 8772) ? layoutEffectTraversalFlags : layoutEffectTraversalFlags & -2;
    for (parentFiber = parentFiber.child; null !== parentFiber; ) {
      var current = parentFiber.alternate, finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags, includeWorkInProgressEffects = 0 !== (layoutEffectTraversalFlags & 1);
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          commitHookEffectListMount(4, finishedWork);
          break;
        case 1:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          current = finishedWork;
          finishedRoot = current.stateNode;
          if ("function" === typeof finishedRoot.componentDidMount)
            try {
              finishedRoot.componentDidMount();
            } catch (error) {
              captureCommitPhaseError(current, current.return, error);
            }
          current = finishedWork;
          finishedRoot = current.updateQueue;
          if (null !== finishedRoot) {
            var instance = current.stateNode;
            try {
              var hiddenCallbacks = finishedRoot.shared.hiddenCallbacks;
              if (null !== hiddenCallbacks)
                for (finishedRoot.shared.hiddenCallbacks = null, finishedRoot = 0; finishedRoot < hiddenCallbacks.length; finishedRoot++)
                  callCallback(hiddenCallbacks[finishedRoot], instance);
            } catch (error) {
              captureCommitPhaseError(current, current.return, error);
            }
          }
          includeWorkInProgressEffects && flags & 64 && commitClassCallbacks(finishedWork);
          safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 27:
          0 !== (layoutEffectTraversalFlags & 2) && commitHostSingletonAcquisition(finishedWork);
        case 5:
          5 !== finishedWork.tag && 27 !== finishedWork.tag || commitFragmentInstanceInsertionEffects(finishedWork);
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          includeWorkInProgressEffects && null === current && flags & 4 && commitHostMount(finishedWork);
          safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 6:
          commitFragmentInstanceInsertionEffects(finishedWork);
          break;
        case 26:
          instance = finishedWork.stateNode;
          null !== finishedWork.memoizedState || null === instance || offscreenSubtreeIsHidden || mountHoistable(
            getHoistableRoot(instance.ownerDocument),
            finishedWork.type,
            instance
          );
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          includeWorkInProgressEffects && null === current && flags & 4 && commitHostMount(finishedWork);
          safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 12:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          break;
        case 31:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          includeWorkInProgressEffects && flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
          break;
        case 13:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          includeWorkInProgressEffects && flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
          break;
        case 22:
          null === finishedWork.memoizedState && recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 30:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
          safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 7:
          safelyAttachRef(finishedWork, finishedWork.return);
        default:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            layoutEffectTraversalFlags
          );
      }
      parentFiber = parentFiber.sibling;
    }
  }
  function commitOffscreenPassiveMountEffects(current, finishedWork) {
    var previousCache = null;
    null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (previousCache = current.memoizedState.cachePool.pool);
    current = null;
    null !== finishedWork.memoizedState && null !== finishedWork.memoizedState.cachePool && (current = finishedWork.memoizedState.cachePool.pool);
    current !== previousCache && (null != current && current.refCount++, null != previousCache && releaseCache(previousCache));
  }
  function commitCachePassiveMountEffect(current, finishedWork) {
    current = null;
    null !== finishedWork.alternate && (current = finishedWork.alternate.memoizedState.cache);
    finishedWork = finishedWork.memoizedState.cache;
    finishedWork !== current && (finishedWork.refCount++, null != current && releaseCache(current));
  }
  function recursivelyTraversePassiveMountEffects(root2, parentFiber, committedLanes, committedTransitions) {
    var isViewTransitionEligible = (committedLanes & 335544064) === committedLanes;
    if (parentFiber.subtreeFlags & (isViewTransitionEligible ? 10262 : 10256))
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        commitPassiveMountOnFiber(
          root2,
          parentFiber,
          committedLanes,
          committedTransitions
        ), parentFiber = parentFiber.sibling;
    else isViewTransitionEligible && restoreNestedViewTransitions(parentFiber);
  }
  function commitPassiveMountOnFiber(finishedRoot, finishedWork, committedLanes, committedTransitions) {
    var isViewTransitionEligible = (committedLanes & 335544064) === committedLanes;
    isViewTransitionEligible && null === finishedWork.alternate && null !== finishedWork.return && null !== finishedWork.return.alternate && restoreEnterOrExitViewTransitions(finishedWork);
    var flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        flags & 2048 && commitHookEffectListMount(9, finishedWork);
        break;
      case 1:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        break;
      case 3:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        isViewTransitionEligible && rootViewTransitionNameCanceled && (finishedRoot = finishedRoot.containerInfo, finishedRoot = 9 === finishedRoot.nodeType ? finishedRoot.body : "HTML" === finishedRoot.nodeName ? finishedRoot.ownerDocument.body : finishedRoot, "root" === finishedRoot.style.viewTransitionName && (finishedRoot.style.viewTransitionName = ""), finishedRoot = finishedRoot.ownerDocument.documentElement, null !== finishedRoot && "none" === finishedRoot.style.viewTransitionName && (finishedRoot.style.viewTransitionName = ""));
        flags & 2048 && (flags = null, null !== finishedWork.alternate && (flags = finishedWork.alternate.memoizedState.cache), finishedWork = finishedWork.memoizedState.cache, finishedWork !== flags && (finishedWork.refCount++, null != flags && releaseCache(flags)));
        break;
      case 12:
        if (flags & 2048) {
          recursivelyTraversePassiveMountEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions
          );
          flags = finishedWork.stateNode;
          try {
            var _finishedWork$memoize2 = finishedWork.memoizedProps, id = _finishedWork$memoize2.id, onPostCommit = _finishedWork$memoize2.onPostCommit;
            "function" === typeof onPostCommit && onPostCommit(
              id,
              null === finishedWork.alternate ? "mount" : "update",
              flags.passiveEffectDuration,
              -0
            );
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        } else
          recursivelyTraversePassiveMountEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions
          );
        break;
      case 31:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        break;
      case 13:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        break;
      case 23:
        break;
      case 22:
        _finishedWork$memoize2 = finishedWork.stateNode;
        id = finishedWork.alternate;
        null !== finishedWork.memoizedState ? (isViewTransitionEligible && null !== id && null === id.memoizedState && restoreEnterOrExitViewTransitions(id), _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        ) : recursivelyTraverseAtomicPassiveEffects(
          finishedRoot,
          finishedWork
        )) : (isViewTransitionEligible && null !== id && null !== id.memoizedState && restoreEnterOrExitViewTransitions(finishedWork), _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        ) : (_finishedWork$memoize2._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions,
          0 !== (finishedWork.subtreeFlags & 10256) || false
        )));
        flags & 2048 && commitOffscreenPassiveMountEffects(id, finishedWork);
        break;
      case 24:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
        break;
      case 30:
        isViewTransitionEligible && (flags = finishedWork.alternate, null !== flags && (restoreViewTransitionOnHostInstances(flags.child, true), restoreViewTransitionOnHostInstances(finishedWork.child, true)));
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        break;
      default:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
    }
  }
  function recursivelyTraverseReconnectPassiveEffects(finishedRoot$jscomp$0, parentFiber, committedLanes$jscomp$0, committedTransitions$jscomp$0, includeWorkInProgressEffects) {
    includeWorkInProgressEffects = includeWorkInProgressEffects && (0 !== (parentFiber.subtreeFlags & 10256) || false);
    for (parentFiber = parentFiber.child; null !== parentFiber; ) {
      var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, committedLanes = committedLanes$jscomp$0, committedTransitions = committedTransitions$jscomp$0, flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          );
          commitHookEffectListMount(8, finishedWork);
          break;
        case 23:
          break;
        case 22:
          var instance = finishedWork.stateNode;
          null !== finishedWork.memoizedState ? instance._visibility & 2 ? recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          ) : recursivelyTraverseAtomicPassiveEffects(
            finishedRoot,
            finishedWork
          ) : (instance._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          ));
          includeWorkInProgressEffects && flags & 2048 && commitOffscreenPassiveMountEffects(
            finishedWork.alternate,
            finishedWork
          );
          break;
        case 24:
          recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          );
          includeWorkInProgressEffects && flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
          break;
        default:
          recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          );
      }
      parentFiber = parentFiber.sibling;
    }
  }
  function recursivelyTraverseAtomicPassiveEffects(finishedRoot$jscomp$0, parentFiber) {
    if (parentFiber.subtreeFlags & 10256)
      for (parentFiber = parentFiber.child; null !== parentFiber; ) {
        var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 22:
            recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
            flags & 2048 && commitOffscreenPassiveMountEffects(
              finishedWork.alternate,
              finishedWork
            );
            break;
          case 24:
            recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
            flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
            break;
          default:
            recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
        }
        parentFiber = parentFiber.sibling;
      }
  }
  var suspenseyCommitFlag = 8192;
  function recursivelyAccumulateSuspenseyCommit(parentFiber, committedLanes, suspendedState) {
    if (parentFiber.subtreeFlags & suspenseyCommitFlag)
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        accumulateSuspenseyCommitOnFiber(
          parentFiber,
          committedLanes,
          suspendedState
        ), parentFiber = parentFiber.sibling;
  }
  function accumulateSuspenseyCommitOnFiber(fiber, committedLanes, suspendedState) {
    switch (fiber.tag) {
      case 26:
        recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        );
        fiber.flags & suspenseyCommitFlag && (null !== fiber.memoizedState ? suspendResource(
          suspendedState,
          currentHoistableRoot,
          fiber.memoizedState,
          fiber.memoizedProps
        ) : (fiber = fiber.stateNode, (committedLanes & 335544128) === committedLanes && suspendInstance(suspendedState, fiber)));
        break;
      case 5:
        recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        );
        fiber.flags & suspenseyCommitFlag && (fiber = fiber.stateNode, (committedLanes & 335544128) === committedLanes && suspendInstance(suspendedState, fiber));
        break;
      case 3:
      case 4:
        var previousHoistableRoot = currentHoistableRoot;
        currentHoistableRoot = getHoistableRoot(fiber.stateNode.containerInfo);
        recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        );
        currentHoistableRoot = previousHoistableRoot;
        break;
      case 22:
        null === fiber.memoizedState && (previousHoistableRoot = fiber.alternate, null !== previousHoistableRoot && null !== previousHoistableRoot.memoizedState ? (previousHoistableRoot = suspenseyCommitFlag, suspenseyCommitFlag = 16777216, recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        ), suspenseyCommitFlag = previousHoistableRoot) : recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        ));
        break;
      case 30:
        if (0 !== (fiber.flags & suspenseyCommitFlag) && (previousHoistableRoot = fiber.memoizedProps.name, null != previousHoistableRoot && "auto" !== previousHoistableRoot)) {
          var state = fiber.stateNode;
          state.paired = null;
          null === appearingViewTransitions && (appearingViewTransitions = /* @__PURE__ */ new Map());
          appearingViewTransitions.set(previousHoistableRoot, state);
        }
        recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        );
        break;
      default:
        recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        );
    }
  }
  function detachAlternateSiblings(parentFiber) {
    var previousFiber = parentFiber.alternate;
    if (null !== previousFiber && (parentFiber = previousFiber.child, null !== parentFiber)) {
      previousFiber.child = null;
      do
        previousFiber = parentFiber.sibling, parentFiber.sibling = null, parentFiber = previousFiber;
      while (null !== parentFiber);
    }
  }
  function recursivelyTraversePassiveUnmountEffects(parentFiber) {
    var deletions = parentFiber.deletions;
    if (0 !== (parentFiber.flags & 16)) {
      if (null !== deletions)
        for (var i = 0; i < deletions.length; i++) {
          var childToDelete = deletions[i];
          nextEffect = childToDelete;
          commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
            childToDelete,
            parentFiber
          );
        }
      detachAlternateSiblings(parentFiber);
    }
    if (parentFiber.subtreeFlags & 10256)
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        commitPassiveUnmountOnFiber(parentFiber), parentFiber = parentFiber.sibling;
  }
  function commitPassiveUnmountOnFiber(finishedWork) {
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        recursivelyTraversePassiveUnmountEffects(finishedWork);
        finishedWork.flags & 2048 && commitHookEffectListUnmount(9, finishedWork, finishedWork.return);
        break;
      case 3:
        recursivelyTraversePassiveUnmountEffects(finishedWork);
        break;
      case 12:
        recursivelyTraversePassiveUnmountEffects(finishedWork);
        break;
      case 22:
        var instance = finishedWork.stateNode;
        null !== finishedWork.memoizedState && instance._visibility & 2 && (null === finishedWork.return || 13 !== finishedWork.return.tag) ? (instance._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(finishedWork)) : recursivelyTraversePassiveUnmountEffects(finishedWork);
        break;
      default:
        recursivelyTraversePassiveUnmountEffects(finishedWork);
    }
  }
  function recursivelyTraverseDisconnectPassiveEffects(parentFiber) {
    var deletions = parentFiber.deletions;
    if (0 !== (parentFiber.flags & 16)) {
      if (null !== deletions)
        for (var i = 0; i < deletions.length; i++) {
          var childToDelete = deletions[i];
          nextEffect = childToDelete;
          commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
            childToDelete,
            parentFiber
          );
        }
      detachAlternateSiblings(parentFiber);
    }
    for (parentFiber = parentFiber.child; null !== parentFiber; ) {
      deletions = parentFiber;
      switch (deletions.tag) {
        case 0:
        case 11:
        case 15:
          commitHookEffectListUnmount(8, deletions, deletions.return);
          recursivelyTraverseDisconnectPassiveEffects(deletions);
          break;
        case 22:
          i = deletions.stateNode;
          i._visibility & 2 && (i._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(deletions));
          break;
        default:
          recursivelyTraverseDisconnectPassiveEffects(deletions);
      }
      parentFiber = parentFiber.sibling;
    }
  }
  function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(deletedSubtreeRoot, nearestMountedAncestor) {
    for (; null !== nextEffect; ) {
      var fiber = nextEffect;
      switch (fiber.tag) {
        case 0:
        case 11:
        case 15:
          commitHookEffectListUnmount(8, fiber, nearestMountedAncestor);
          break;
        case 23:
        case 22:
          if (null !== fiber.memoizedState && null !== fiber.memoizedState.cachePool) {
            var cache = fiber.memoizedState.cachePool.pool;
            null != cache && cache.refCount++;
          }
          break;
        case 24:
          releaseCache(fiber.memoizedState.cache);
      }
      cache = fiber.child;
      if (null !== cache) cache.return = fiber, nextEffect = cache;
      else
        a: for (fiber = deletedSubtreeRoot; null !== nextEffect; ) {
          cache = nextEffect;
          var sibling = cache.sibling, returnFiber = cache.return;
          detachFiberAfterEffects(cache);
          if (cache === fiber) {
            nextEffect = null;
            break a;
          }
          if (null !== sibling) {
            sibling.return = returnFiber;
            nextEffect = sibling;
            break a;
          }
          nextEffect = returnFiber;
        }
    }
  }
  var DefaultAsyncDispatcher = {
    getCacheForType: function(resourceType) {
      var cache = readContext(CacheContext), cacheForType = cache.data.get(resourceType);
      void 0 === cacheForType && (cacheForType = resourceType(), cache.data.set(resourceType, cacheForType));
      return cacheForType;
    },
    cacheSignal: function() {
      return readContext(CacheContext).controller.signal;
    }
  }, PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map, executionContext = 0, workInProgressRoot = null, workInProgress = null, workInProgressRootRenderLanes = 0, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, workInProgressRootDidSkipSuspendedSiblings = false, workInProgressRootIsPrerendering = false, workInProgressRootDidAttachPingListener = false, entangledRenderLanes = 0, workInProgressRootExitStatus = 0, workInProgressRootSkippedLanes = 0, workInProgressRootInterleavedUpdatedLanes = 0, workInProgressRootPingedLanes = 0, workInProgressDeferredLane = 0, workInProgressSuspendedRetryLanes = 0, workInProgressRootConcurrentErrors = null, workInProgressRootRecoverableErrors = null, workInProgressRootDidIncludeRecursiveRenderUpdate = false, globalMostRecentFallbackTime = 0, globalMostRecentTransitionTime = 0, workInProgressRootRenderTargetTime = Infinity, workInProgressTransitions = null, legacyErrorBoundariesThatAlreadyFailed = null, pendingEffectsStatus = 0, pendingEffectsRoot = null, pendingFinishedWork = null, pendingEffectsLanes = 0, pendingEffectsRemainingLanes = 0, pendingPassiveTransitions = null, pendingRecoverableErrors = null, pendingViewTransition = null, pendingViewTransitionEvents = null, pendingTransitionTypes = null, nestedUpdateCount = 0, rootWithNestedUpdates = null;
  function requestUpdateLane() {
    return 0 !== (executionContext & 2) && 0 !== workInProgressRootRenderLanes ? workInProgressRootRenderLanes & -workInProgressRootRenderLanes : null !== ReactSharedInternals.T ? requestTransitionLane() : resolveUpdatePriority();
  }
  function requestDeferredLane() {
    if (0 === workInProgressDeferredLane)
      if (0 === (workInProgressRootRenderLanes & 536870912) || isHydrating) {
        var lane = nextTransitionDeferredLane;
        nextTransitionDeferredLane <<= 1;
        0 === (nextTransitionDeferredLane & 3932160) && (nextTransitionDeferredLane = 262144);
        workInProgressDeferredLane = lane;
      } else workInProgressDeferredLane = 536870912;
    lane = suspenseHandlerStackCursor.current;
    null !== lane && (lane.flags |= 32);
    return workInProgressDeferredLane;
  }
  function scheduleViewTransitionEvent(fiber, callback) {
    if (null != callback) {
      var state = fiber.stateNode, instance = state.ref;
      null === instance && (instance = state.ref = createViewTransitionInstance(
        getViewTransitionName(fiber.memoizedProps, state)
      ));
      null === pendingViewTransitionEvents && (pendingViewTransitionEvents = []);
      pendingViewTransitionEvents.push(callback.bind(null, instance));
    }
  }
  function scheduleUpdateOnFiber(root2, fiber, lane) {
    if (root2 === workInProgressRoot && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root2.cancelPendingCommit)
      prepareFreshStack(root2, 0), markRootSuspended(
        root2,
        workInProgressRootRenderLanes,
        workInProgressDeferredLane,
        false
      );
    markRootUpdated$1(root2, lane);
    if (0 === (executionContext & 2) || root2 !== workInProgressRoot)
      root2 === workInProgressRoot && (0 === (executionContext & 2) && (workInProgressRootInterleavedUpdatedLanes |= lane), 4 === workInProgressRootExitStatus && markRootSuspended(
        root2,
        workInProgressRootRenderLanes,
        workInProgressDeferredLane,
        false
      )), ensureRootIsScheduled(root2);
  }
  function performWorkOnRoot(root$jscomp$0, lanes, forceSync) {
    if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
    var shouldTimeSlice = !forceSync && 0 === (lanes & 127) && 0 === (lanes & root$jscomp$0.expiredLanes) || checkIfRootIsPrerendering(root$jscomp$0, lanes), exitStatus = shouldTimeSlice ? renderRootConcurrent(root$jscomp$0, lanes) : renderRootSync(root$jscomp$0, lanes, true), renderWasConcurrent = shouldTimeSlice;
    do {
      if (0 === exitStatus) {
        workInProgressRootIsPrerendering && !shouldTimeSlice && markRootSuspended(root$jscomp$0, lanes, 0, false);
        break;
      } else {
        forceSync = root$jscomp$0.current.alternate;
        if (renderWasConcurrent && !isRenderConsistentWithExternalStores(forceSync)) {
          exitStatus = renderRootSync(root$jscomp$0, lanes, false);
          renderWasConcurrent = false;
          continue;
        }
        if (2 === exitStatus) {
          renderWasConcurrent = lanes;
          if (root$jscomp$0.errorRecoveryDisabledLanes & renderWasConcurrent)
            var JSCompiler_inline_result = 0;
          else
            JSCompiler_inline_result = root$jscomp$0.pendingLanes & -536870913, JSCompiler_inline_result = 0 !== JSCompiler_inline_result ? JSCompiler_inline_result : JSCompiler_inline_result & 536870912 ? 536870912 : 0;
          if (0 !== JSCompiler_inline_result) {
            lanes = JSCompiler_inline_result;
            a: {
              var root2 = root$jscomp$0;
              exitStatus = workInProgressRootConcurrentErrors;
              var wasRootDehydrated = root2.current.memoizedState.isDehydrated;
              wasRootDehydrated && (prepareFreshStack(root2, JSCompiler_inline_result).flags |= 256);
              JSCompiler_inline_result = renderRootSync(
                root2,
                JSCompiler_inline_result,
                false
              );
              if (2 !== JSCompiler_inline_result && 6 !== JSCompiler_inline_result) {
                if (workInProgressRootDidAttachPingListener && !wasRootDehydrated) {
                  root2.errorRecoveryDisabledLanes |= renderWasConcurrent;
                  workInProgressRootInterleavedUpdatedLanes |= renderWasConcurrent;
                  exitStatus = 4;
                  break a;
                }
                renderWasConcurrent = workInProgressRootRecoverableErrors;
                workInProgressRootRecoverableErrors = exitStatus;
                null !== renderWasConcurrent && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = renderWasConcurrent : workInProgressRootRecoverableErrors.push.apply(
                  workInProgressRootRecoverableErrors,
                  renderWasConcurrent
                ));
              }
              exitStatus = JSCompiler_inline_result;
            }
            renderWasConcurrent = false;
            if (2 !== exitStatus) continue;
          }
        }
        if (1 === exitStatus) {
          prepareFreshStack(root$jscomp$0, 0);
          markRootSuspended(root$jscomp$0, lanes, 0, true);
          break;
        }
        a: {
          shouldTimeSlice = root$jscomp$0;
          renderWasConcurrent = exitStatus;
          switch (renderWasConcurrent) {
            case 0:
            case 1:
              throw Error(formatProdErrorMessage(345));
            case 4:
              if ((lanes & 4194048) !== lanes && (lanes & 62914560) !== lanes)
                break;
            case 6:
              markRootSuspended(
                shouldTimeSlice,
                lanes,
                workInProgressDeferredLane,
                !workInProgressRootDidSkipSuspendedSiblings
              );
              break a;
            case 2:
              workInProgressRootRecoverableErrors = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(formatProdErrorMessage(329));
          }
          if ((lanes & 62914560) === lanes && (exitStatus = globalMostRecentFallbackTime + 300 - now(), 10 < exitStatus)) {
            markRootSuspended(
              shouldTimeSlice,
              lanes,
              workInProgressDeferredLane,
              !workInProgressRootDidSkipSuspendedSiblings
            );
            if (0 !== getNextLanes(shouldTimeSlice, 0, true)) break a;
            pendingEffectsLanes = lanes;
            shouldTimeSlice.timeoutHandle = scheduleTimeout(
              completeRootWhenReady.bind(
                null,
                shouldTimeSlice,
                forceSync,
                workInProgressRootRecoverableErrors,
                workInProgressTransitions,
                workInProgressRootDidIncludeRecursiveRenderUpdate,
                lanes,
                workInProgressDeferredLane,
                workInProgressRootInterleavedUpdatedLanes,
                workInProgressSuspendedRetryLanes,
                workInProgressRootDidSkipSuspendedSiblings,
                renderWasConcurrent,
                "Throttled",
                -0,
                0
              ),
              exitStatus
            );
            break a;
          }
          completeRootWhenReady(
            shouldTimeSlice,
            forceSync,
            workInProgressRootRecoverableErrors,
            workInProgressTransitions,
            workInProgressRootDidIncludeRecursiveRenderUpdate,
            lanes,
            workInProgressDeferredLane,
            workInProgressRootInterleavedUpdatedLanes,
            workInProgressSuspendedRetryLanes,
            workInProgressRootDidSkipSuspendedSiblings,
            renderWasConcurrent,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (1);
    ensureRootIsScheduled(root$jscomp$0);
  }
  function completeRootWhenReady(root2, finishedWork, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
    root2.timeoutHandle = -1;
    var subtreeFlags = finishedWork.subtreeFlags, isViewTransitionEligible = (lanes & 335544064) === lanes;
    suspendedCommitReason = null;
    if (isViewTransitionEligible || subtreeFlags & 8192 || 16785408 === (subtreeFlags & 16785408)) {
      if (suspendedCommitReason = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: true,
        waitingForViewTransition: false,
        unsuspend: noop$1
      }, appearingViewTransitions = null, accumulateSuspenseyCommitOnFiber(
        finishedWork,
        lanes,
        suspendedCommitReason
      ), isViewTransitionEligible && (subtreeFlags = suspendedCommitReason, isViewTransitionEligible = root2.containerInfo, isViewTransitionEligible = (9 === isViewTransitionEligible.nodeType ? isViewTransitionEligible : isViewTransitionEligible.ownerDocument).__reactViewTransition, null != isViewTransitionEligible && (subtreeFlags.count++, subtreeFlags.waitingForViewTransition = true, subtreeFlags = onUnsuspend.bind(subtreeFlags), isViewTransitionEligible.finished.then(subtreeFlags, subtreeFlags))), subtreeFlags = (lanes & 62914560) === lanes ? globalMostRecentFallbackTime - now() : (lanes & 4194048) === lanes ? globalMostRecentTransitionTime - now() : 0, subtreeFlags = waitForCommitToBeReady(
        suspendedCommitReason,
        subtreeFlags
      ), null !== subtreeFlags) {
        pendingEffectsLanes = lanes;
        root2.cancelPendingCommit = subtreeFlags(
          completeRoot.bind(
            null,
            root2,
            finishedWork,
            lanes,
            recoverableErrors,
            transitions,
            didIncludeRenderPhaseUpdate,
            spawnedLane,
            updatedLanes,
            suspendedRetryLanes,
            didSkipSuspendedSiblings,
            exitStatus,
            suspendedCommitReason,
            null,
            completedRenderStartTime,
            completedRenderEndTime
          )
        );
        markRootSuspended(root2, lanes, spawnedLane, !didSkipSuspendedSiblings);
        return;
      }
    }
    completeRoot(
      root2,
      finishedWork,
      lanes,
      recoverableErrors,
      transitions,
      didIncludeRenderPhaseUpdate,
      spawnedLane,
      updatedLanes,
      suspendedRetryLanes,
      didSkipSuspendedSiblings,
      exitStatus,
      suspendedCommitReason
    );
  }
  function isRenderConsistentWithExternalStores(finishedWork) {
    for (var node = finishedWork; ; ) {
      var tag = node.tag;
      if ((0 === tag || 11 === tag || 15 === tag) && node.flags & 16384 && (tag = node.updateQueue, null !== tag && (tag = tag.stores, null !== tag)))
        for (var i = 0; i < tag.length; i++) {
          var check = tag[i], getSnapshot = check.getSnapshot;
          check = check.value;
          try {
            if (!objectIs(getSnapshot(), check)) return false;
          } catch (error) {
            return false;
          }
        }
      tag = node.child;
      if (node.subtreeFlags & 16384 && null !== tag)
        tag.return = node, node = tag;
      else {
        if (node === finishedWork) break;
        for (; null === node.sibling; ) {
          if (null === node.return || node.return === finishedWork) return true;
          node = node.return;
        }
        node.sibling.return = node.return;
        node = node.sibling;
      }
    }
    return true;
  }
  function markRootSuspended(root2, suspendedLanes, spawnedLane, didAttemptEntireTree) {
    suspendedLanes = getEntangledLanes(root2, suspendedLanes);
    suspendedLanes &= ~workInProgressRootPingedLanes;
    suspendedLanes &= ~workInProgressRootInterleavedUpdatedLanes;
    root2.suspendedLanes |= suspendedLanes;
    root2.pingedLanes &= ~suspendedLanes;
    didAttemptEntireTree && (root2.warmLanes |= suspendedLanes);
    didAttemptEntireTree = root2.expirationTimes;
    for (var lanes = suspendedLanes; 0 < lanes; ) {
      var index$6 = 31 - clz32(lanes), lane = 1 << index$6;
      didAttemptEntireTree[index$6] = -1;
      lanes &= ~lane;
    }
    0 !== spawnedLane && markSpawnedDeferredLane(root2, spawnedLane, suspendedLanes);
  }
  function flushSyncWork$1() {
    return 0 === (executionContext & 6) ? (flushSyncWorkAcrossRoots_impl(0), false) : true;
  }
  function resetWorkInProgressStack() {
    if (null !== workInProgress) {
      if (0 === workInProgressSuspendedReason)
        var interruptedWork = workInProgress.return;
      else
        interruptedWork = workInProgress, lastContextDependency = currentlyRenderingFiber$1 = null, resetHooksOnUnwind(interruptedWork), thenableState$1 = null, thenableIndexCounter$1 = 0, interruptedWork = workInProgress;
      for (; null !== interruptedWork; )
        unwindInterruptedWork(interruptedWork.alternate, interruptedWork), interruptedWork = interruptedWork.return;
      workInProgress = null;
    }
  }
  function prepareFreshStack(root2, lanes) {
    var timeoutHandle = root2.timeoutHandle;
    -1 !== timeoutHandle && (root2.timeoutHandle = -1, cancelTimeout(timeoutHandle));
    timeoutHandle = root2.cancelPendingCommit;
    null !== timeoutHandle && (root2.cancelPendingCommit = null, timeoutHandle());
    pendingEffectsLanes = 0;
    resetWorkInProgressStack();
    workInProgressRoot = root2;
    workInProgress = timeoutHandle = createWorkInProgress(root2.current, null);
    workInProgressRootRenderLanes = lanes;
    workInProgressSuspendedReason = 0;
    workInProgressThrownValue = null;
    workInProgressRootDidSkipSuspendedSiblings = false;
    workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root2, lanes);
    workInProgressRootDidAttachPingListener = false;
    workInProgressSuspendedRetryLanes = workInProgressDeferredLane = workInProgressRootPingedLanes = workInProgressRootInterleavedUpdatedLanes = workInProgressRootSkippedLanes = workInProgressRootExitStatus = 0;
    workInProgressRootRecoverableErrors = workInProgressRootConcurrentErrors = null;
    workInProgressRootDidIncludeRecursiveRenderUpdate = false;
    entangledRenderLanes = getEntangledLanes(root2, lanes);
    finishQueueingConcurrentUpdates();
    return timeoutHandle;
  }
  function handleThrow(root2, thrownValue) {
    currentlyRenderingFiber = null;
    ReactSharedInternals.H = ContextOnlyDispatcher;
    thrownValue === SuspenseException || thrownValue === SuspenseActionException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 3) : thrownValue === SuspenseyCommitException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 4) : workInProgressSuspendedReason = thrownValue === SelectiveHydrationException ? 8 : null !== thrownValue && "object" === typeof thrownValue && "function" === typeof thrownValue.then ? 6 : 1;
    workInProgressThrownValue = thrownValue;
    null === workInProgress && (workInProgressRootExitStatus = 1, logUncaughtError(
      root2,
      createCapturedValueAtFiber(thrownValue, root2.current)
    ));
  }
  function shouldRemainOnPreviousScreen() {
    var handler = suspenseHandlerStackCursor.current;
    return null === handler ? true : (workInProgressRootRenderLanes & 4194048) === workInProgressRootRenderLanes ? null === shellBoundary ? true : false : (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes || 0 !== (workInProgressRootRenderLanes & 536870912) ? handler === shellBoundary : false;
  }
  function pushDispatcher() {
    var prevDispatcher = ReactSharedInternals.H;
    ReactSharedInternals.H = ContextOnlyDispatcher;
    return null === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher;
  }
  function pushAsyncDispatcher() {
    var prevAsyncDispatcher = ReactSharedInternals.A;
    ReactSharedInternals.A = DefaultAsyncDispatcher;
    return prevAsyncDispatcher;
  }
  function renderDidSuspendDelayIfPossible() {
    workInProgressRootExitStatus = 4;
    workInProgressRootDidSkipSuspendedSiblings || (workInProgressRootRenderLanes & 4194048) !== workInProgressRootRenderLanes && null !== suspenseHandlerStackCursor.current || (workInProgressRootIsPrerendering = true);
    0 === (workInProgressRootSkippedLanes & 134217727) && 0 === (workInProgressRootInterleavedUpdatedLanes & 134217727) || null === workInProgressRoot || markRootSuspended(
      workInProgressRoot,
      workInProgressRootRenderLanes,
      workInProgressDeferredLane,
      false
    );
  }
  function renderRootSync(root2, lanes, shouldYieldForPrerendering) {
    var prevExecutionContext = executionContext;
    executionContext |= 2;
    var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
    if (workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes)
      workInProgressTransitions = null, prepareFreshStack(root2, lanes);
    lanes = false;
    var exitStatus = workInProgressRootExitStatus;
    a: do
      try {
        if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
          var unitOfWork = workInProgress, thrownValue = workInProgressThrownValue;
          switch (workInProgressSuspendedReason) {
            case 8:
              resetWorkInProgressStack();
              exitStatus = 6;
              break a;
            case 3:
            case 2:
            case 9:
            case 6:
              null === suspenseHandlerStackCursor.current && (lanes = true);
              var reason = workInProgressSuspendedReason;
              workInProgressSuspendedReason = 0;
              workInProgressThrownValue = null;
              throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason);
              if (shouldYieldForPrerendering && workInProgressRootIsPrerendering) {
                exitStatus = 0;
                break a;
              }
              break;
            default:
              reason = workInProgressSuspendedReason, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason);
          }
        }
        workLoopSync();
        exitStatus = workInProgressRootExitStatus;
        break;
      } catch (thrownValue$184) {
        handleThrow(root2, thrownValue$184);
      }
    while (1);
    lanes && root2.shellSuspendCounter++;
    lastContextDependency = currentlyRenderingFiber$1 = null;
    executionContext = prevExecutionContext;
    ReactSharedInternals.H = prevDispatcher;
    ReactSharedInternals.A = prevAsyncDispatcher;
    null === workInProgress && (workInProgressRoot = null, workInProgressRootRenderLanes = 0, finishQueueingConcurrentUpdates());
    return exitStatus;
  }
  function workLoopSync() {
    for (; null !== workInProgress; ) performUnitOfWork(workInProgress);
  }
  function renderRootConcurrent(root2, lanes) {
    var prevExecutionContext = executionContext;
    executionContext |= 2;
    var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
    workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes ? (workInProgressTransitions = null, workInProgressRootRenderTargetTime = now() + 500, prepareFreshStack(root2, lanes)) : workInProgressRootIsPrerendering = checkIfRootIsPrerendering(
      root2,
      lanes
    );
    a: do
      try {
        if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
          lanes = workInProgress;
          var thrownValue = workInProgressThrownValue;
          b: switch (workInProgressSuspendedReason) {
            case 1:
              workInProgressSuspendedReason = 0;
              workInProgressThrownValue = null;
              throwAndUnwindWorkLoop(root2, lanes, thrownValue, 1);
              break;
            case 2:
            case 9:
              if (isThenableResolved(thrownValue)) {
                workInProgressSuspendedReason = 0;
                workInProgressThrownValue = null;
                replaySuspendedUnitOfWork(lanes);
                break;
              }
              lanes = function() {
                2 !== workInProgressSuspendedReason && 9 !== workInProgressSuspendedReason || workInProgressRoot !== root2 || (workInProgressSuspendedReason = 7);
                ensureRootIsScheduled(root2);
              };
              thrownValue.then(lanes, lanes);
              break a;
            case 3:
              workInProgressSuspendedReason = 7;
              break a;
            case 4:
              workInProgressSuspendedReason = 5;
              break a;
            case 7:
              isThenableResolved(thrownValue) ? (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, replaySuspendedUnitOfWork(lanes)) : (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, lanes, thrownValue, 7));
              break;
            case 5:
              var resource = null;
              switch (workInProgress.tag) {
                case 26:
                  resource = workInProgress.memoizedState;
                case 5:
                case 27:
                  var hostFiber = workInProgress;
                  if (resource ? preloadResource(resource) : hostFiber.stateNode.complete) {
                    workInProgressSuspendedReason = 0;
                    workInProgressThrownValue = null;
                    var sibling = hostFiber.sibling;
                    if (null !== sibling) workInProgress = sibling;
                    else {
                      var returnFiber = hostFiber.return;
                      null !== returnFiber ? (workInProgress = returnFiber, completeUnitOfWork(returnFiber)) : workInProgress = null;
                    }
                    break b;
                  }
              }
              workInProgressSuspendedReason = 0;
              workInProgressThrownValue = null;
              throwAndUnwindWorkLoop(root2, lanes, thrownValue, 5);
              break;
            case 6:
              workInProgressSuspendedReason = 0;
              workInProgressThrownValue = null;
              throwAndUnwindWorkLoop(root2, lanes, thrownValue, 6);
              break;
            case 8:
              resetWorkInProgressStack();
              workInProgressRootExitStatus = 6;
              break a;
            default:
              throw Error(formatProdErrorMessage(462));
          }
        }
        workLoopConcurrentByScheduler();
        break;
      } catch (thrownValue$186) {
        handleThrow(root2, thrownValue$186);
      }
    while (1);
    lastContextDependency = currentlyRenderingFiber$1 = null;
    ReactSharedInternals.H = prevDispatcher;
    ReactSharedInternals.A = prevAsyncDispatcher;
    executionContext = prevExecutionContext;
    if (null !== workInProgress) return 0;
    workInProgressRoot = null;
    workInProgressRootRenderLanes = 0;
    finishQueueingConcurrentUpdates();
    return workInProgressRootExitStatus;
  }
  function workLoopConcurrentByScheduler() {
    for (; null !== workInProgress && !shouldYield(); )
      performUnitOfWork(workInProgress);
  }
  function performUnitOfWork(unitOfWork) {
    var next = beginWork(unitOfWork.alternate, unitOfWork, entangledRenderLanes);
    unitOfWork.memoizedProps = unitOfWork.pendingProps;
    null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
  }
  function replaySuspendedUnitOfWork(unitOfWork) {
    var next = unitOfWork;
    var current = next.alternate;
    switch (next.tag) {
      case 15:
      case 0:
        next = replayFunctionComponent(
          current,
          next,
          next.pendingProps,
          next.type,
          void 0,
          workInProgressRootRenderLanes
        );
        break;
      case 11:
        next = replayFunctionComponent(
          current,
          next,
          next.pendingProps,
          next.type.render,
          next.ref,
          workInProgressRootRenderLanes
        );
        break;
      case 5:
        resetHooksOnUnwind(next);
        var fiber = next;
        fiber === hydrationParentFiber && (isHydrating ? (popToNextHostParent(fiber), 5 === fiber.tag && null != fiber.stateNode && (nextHydratableInstance = fiber.stateNode)) : (popToNextHostParent(fiber), isHydrating = true));
      default:
        unwindInterruptedWork(current, next), next = workInProgress = resetWorkInProgress(next, entangledRenderLanes), next = beginWork(current, next, entangledRenderLanes);
    }
    unitOfWork.memoizedProps = unitOfWork.pendingProps;
    null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
  }
  function throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, suspendedReason) {
    lastContextDependency = currentlyRenderingFiber$1 = null;
    resetHooksOnUnwind(unitOfWork);
    thenableState$1 = null;
    thenableIndexCounter$1 = 0;
    var returnFiber = unitOfWork.return;
    try {
      if (throwException(
        root2,
        returnFiber,
        unitOfWork,
        thrownValue,
        workInProgressRootRenderLanes
      )) {
        workInProgressRootExitStatus = 1;
        logUncaughtError(
          root2,
          createCapturedValueAtFiber(thrownValue, root2.current)
        );
        workInProgress = null;
        return;
      }
    } catch (error) {
      if (null !== returnFiber) throw workInProgress = returnFiber, error;
      workInProgressRootExitStatus = 1;
      logUncaughtError(
        root2,
        createCapturedValueAtFiber(thrownValue, root2.current)
      );
      workInProgress = null;
      return;
    }
    if (unitOfWork.flags & 32768) {
      if (isHydrating || 1 === suspendedReason) root2 = true;
      else if (workInProgressRootIsPrerendering || 0 !== (workInProgressRootRenderLanes & 536870912))
        root2 = false;
      else if (workInProgressRootDidSkipSuspendedSiblings = root2 = true, 2 === suspendedReason || 9 === suspendedReason || 3 === suspendedReason || 6 === suspendedReason)
        suspendedReason = suspenseHandlerStackCursor.current, null !== suspendedReason && 13 === suspendedReason.tag && (suspendedReason.flags |= 16384);
      unwindUnitOfWork(unitOfWork, root2);
    } else completeUnitOfWork(unitOfWork);
  }
  function completeUnitOfWork(unitOfWork) {
    var completedWork = unitOfWork;
    do {
      if (0 !== (completedWork.flags & 32768)) {
        unwindUnitOfWork(
          completedWork,
          workInProgressRootDidSkipSuspendedSiblings
        );
        return;
      }
      unitOfWork = completedWork.return;
      var next = completeWork(
        completedWork.alternate,
        completedWork,
        entangledRenderLanes
      );
      if (null !== next) {
        workInProgress = next;
        return;
      }
      completedWork = completedWork.sibling;
      if (null !== completedWork) {
        workInProgress = completedWork;
        return;
      }
      workInProgress = completedWork = unitOfWork;
    } while (null !== completedWork);
    0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 5);
  }
  function unwindUnitOfWork(unitOfWork, skipSiblings) {
    do {
      var next = unwindWork(unitOfWork.alternate, unitOfWork);
      if (null !== next) {
        next.flags &= 32767;
        workInProgress = next;
        return;
      }
      next = unitOfWork.return;
      null !== next && (next.flags |= 32768, next.subtreeFlags = 0, next.deletions = null);
      if (!skipSiblings && (unitOfWork = unitOfWork.sibling, null !== unitOfWork)) {
        workInProgress = unitOfWork;
        return;
      }
      workInProgress = unitOfWork = next;
    } while (null !== unitOfWork);
    workInProgressRootExitStatus = 6;
    workInProgress = null;
  }
  function completeRoot(root2, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedState) {
    root2.cancelPendingCommit = null;
    do
      flushPendingEffects();
    while (0 !== pendingEffectsStatus);
    if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
    if (null !== finishedWork) {
      if (finishedWork === root2.current) throw Error(formatProdErrorMessage(177));
      root2 === workInProgressRoot && (workInProgress = workInProgressRoot = null, workInProgressRootRenderLanes = 0);
      pendingFinishedWork = finishedWork;
      pendingEffectsRoot = root2;
      pendingEffectsLanes = lanes;
      pendingPassiveTransitions = transitions;
      pendingRecoverableErrors = recoverableErrors;
      commitRoot(
        root2,
        finishedWork,
        lanes,
        spawnedLane,
        updatedLanes,
        suspendedRetryLanes,
        suspendedState
      );
    }
  }
  function commitRoot(root2, finishedWork, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, suspendedState) {
    var remainingLanes = finishedWork.lanes | finishedWork.childLanes;
    pendingEffectsRemainingLanes = remainingLanes;
    remainingLanes |= concurrentlyUpdatedLanes;
    markRootFinished(
      root2,
      lanes,
      remainingLanes,
      spawnedLane,
      updatedLanes,
      suspendedRetryLanes
    );
    pendingViewTransitionEvents = null;
    (lanes & 335544064) === lanes ? (pendingTransitionTypes = claimQueuedTransitionTypes(root2), spawnedLane = 10262) : (pendingTransitionTypes = null, spawnedLane = 10256);
    0 !== (finishedWork.subtreeFlags & spawnedLane) || 0 !== (finishedWork.flags & spawnedLane) ? (root2.callbackNode = null, root2.callbackPriority = 0, scheduleCallback$1(NormalPriority$1, function() {
      flushPassiveEffects();
      return null;
    })) : (root2.callbackNode = null, root2.callbackPriority = 0);
    shouldStartViewTransition = false;
    spawnedLane = 0 !== (finishedWork.flags & 13878);
    if (0 !== (finishedWork.subtreeFlags & 13878) || spawnedLane) {
      spawnedLane = ReactSharedInternals.T;
      ReactSharedInternals.T = null;
      updatedLanes = ReactDOMSharedInternals.p;
      ReactDOMSharedInternals.p = 2;
      suspendedRetryLanes = executionContext;
      executionContext |= 4;
      try {
        commitBeforeMutationEffects(root2, finishedWork, lanes);
      } finally {
        executionContext = suspendedRetryLanes, ReactDOMSharedInternals.p = updatedLanes, ReactSharedInternals.T = spawnedLane;
      }
    }
    pendingEffectsStatus = 1;
    shouldStartViewTransition ? pendingViewTransition = startViewTransition(
      suspendedState,
      root2.containerInfo,
      pendingTransitionTypes,
      flushMutationEffects,
      flushLayoutEffects,
      flushAfterMutationEffects,
      flushSpawnedWork,
      flushPassiveEffects,
      reportViewTransitionError
    ) : (flushMutationEffects(), flushLayoutEffects(), flushSpawnedWork());
  }
  function reportViewTransitionError(error) {
    if (0 !== pendingEffectsStatus) {
      var onRecoverableError = pendingEffectsRoot.onRecoverableError;
      onRecoverableError(error, { componentStack: null });
    }
  }
  function flushAfterMutationEffects() {
    3 === pendingEffectsStatus && (pendingEffectsStatus = 0, commitAfterMutationEffectsOnFiber(pendingFinishedWork, pendingEffectsRoot), pendingEffectsStatus = 4);
  }
  function flushMutationEffects() {
    if (1 === pendingEffectsStatus) {
      pendingEffectsStatus = 0;
      var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, rootMutationHasEffect = 0 !== (finishedWork.flags & 13878);
      if (0 !== (finishedWork.subtreeFlags & 13878) || rootMutationHasEffect) {
        rootMutationHasEffect = ReactSharedInternals.T;
        ReactSharedInternals.T = null;
        var previousPriority = ReactDOMSharedInternals.p;
        ReactDOMSharedInternals.p = 2;
        var prevExecutionContext = executionContext;
        executionContext |= 4;
        try {
          inUpdateViewTransition = rootViewTransitionAffected = false;
          commitMutationEffectsOnFiber(finishedWork, root2, lanes);
          lanes = selectionInformation;
          var curFocusedElem = getActiveElementDeep(root2.containerInfo), priorFocusedElem = lanes.focusedElem, priorSelectionRange = lanes.selectionRange;
          if (curFocusedElem !== priorFocusedElem && priorFocusedElem && priorFocusedElem.ownerDocument && containsNode(
            priorFocusedElem.ownerDocument.documentElement,
            priorFocusedElem
          )) {
            if (null !== priorSelectionRange && hasSelectionCapabilities(priorFocusedElem)) {
              var start = priorSelectionRange.start, end = priorSelectionRange.end;
              void 0 === end && (end = start);
              if ("selectionStart" in priorFocusedElem)
                priorFocusedElem.selectionStart = start, priorFocusedElem.selectionEnd = Math.min(
                  end,
                  priorFocusedElem.value.length
                );
              else {
                var doc = priorFocusedElem.ownerDocument || document, win = doc && doc.defaultView || window;
                if (win.getSelection) {
                  var selection = win.getSelection(), length = priorFocusedElem.textContent.length, start$jscomp$0 = Math.min(priorSelectionRange.start, length), end$jscomp$0 = void 0 === priorSelectionRange.end ? start$jscomp$0 : Math.min(priorSelectionRange.end, length);
                  !selection.extend && start$jscomp$0 > end$jscomp$0 && (curFocusedElem = end$jscomp$0, end$jscomp$0 = start$jscomp$0, start$jscomp$0 = curFocusedElem);
                  var startMarker = getNodeForCharacterOffset(
                    priorFocusedElem,
                    start$jscomp$0
                  ), endMarker = getNodeForCharacterOffset(
                    priorFocusedElem,
                    end$jscomp$0
                  );
                  if (startMarker && endMarker && (1 !== selection.rangeCount || selection.anchorNode !== startMarker.node || selection.anchorOffset !== startMarker.offset || selection.focusNode !== endMarker.node || selection.focusOffset !== endMarker.offset)) {
                    var range = doc.createRange();
                    range.setStart(startMarker.node, startMarker.offset);
                    selection.removeAllRanges();
                    start$jscomp$0 > end$jscomp$0 ? (selection.addRange(range), selection.extend(endMarker.node, endMarker.offset)) : (range.setEnd(endMarker.node, endMarker.offset), selection.addRange(range));
                  }
                }
              }
            }
            doc = [];
            for (selection = priorFocusedElem; selection = selection.parentNode; )
              1 === selection.nodeType && doc.push({
                element: selection,
                left: selection.scrollLeft,
                top: selection.scrollTop
              });
            "function" === typeof priorFocusedElem.focus && priorFocusedElem.focus();
            for (priorFocusedElem = 0; priorFocusedElem < doc.length; priorFocusedElem++) {
              var info = doc[priorFocusedElem];
              info.element.scrollLeft = info.left;
              info.element.scrollTop = info.top;
            }
          }
          _enabled = !!eventsEnabled;
          selectionInformation = eventsEnabled = null;
        } finally {
          executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootMutationHasEffect;
        }
      }
      root2.current = finishedWork;
      pendingEffectsStatus = 2;
    }
  }
  function flushLayoutEffects() {
    if (2 === pendingEffectsStatus) {
      pendingEffectsStatus = 0;
      var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootHasLayoutEffect = 0 !== (finishedWork.flags & 8772);
      if (0 !== (finishedWork.subtreeFlags & 8772) || rootHasLayoutEffect) {
        rootHasLayoutEffect = ReactSharedInternals.T;
        ReactSharedInternals.T = null;
        var previousPriority = ReactDOMSharedInternals.p;
        ReactDOMSharedInternals.p = 2;
        var prevExecutionContext = executionContext;
        executionContext |= 4;
        try {
          commitLayoutEffectOnFiber(root2, finishedWork.alternate, finishedWork);
        } finally {
          executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootHasLayoutEffect;
        }
      }
      pendingEffectsStatus = 3;
    }
  }
  function flushSpawnedWork() {
    if (4 === pendingEffectsStatus || 3 === pendingEffectsStatus) {
      pendingEffectsStatus = 0;
      var committedViewTransition = pendingViewTransition;
      pendingViewTransition = null;
      requestPaint();
      var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, recoverableErrors = pendingRecoverableErrors, passiveSubtreeMask = (lanes & 335544064) === lanes ? 10262 : 10256;
      0 !== (finishedWork.subtreeFlags & passiveSubtreeMask) || 0 !== (finishedWork.flags & passiveSubtreeMask) ? pendingEffectsStatus = 5 : (pendingEffectsStatus = 0, pendingFinishedWork = pendingEffectsRoot = null, releaseRootPooledCache(root2, root2.pendingLanes));
      passiveSubtreeMask = root2.pendingLanes;
      0 === passiveSubtreeMask && (legacyErrorBoundariesThatAlreadyFailed = null);
      lanesToEventPriority(lanes);
      finishedWork = finishedWork.stateNode;
      if (injectedHook && "function" === typeof injectedHook.onCommitFiberRoot)
        try {
          injectedHook.onCommitFiberRoot(
            rendererID,
            finishedWork,
            void 0,
            128 === (finishedWork.current.flags & 128)
          );
        } catch (err) {
        }
      if (null !== recoverableErrors) {
        finishedWork = ReactSharedInternals.T;
        passiveSubtreeMask = ReactDOMSharedInternals.p;
        ReactDOMSharedInternals.p = 2;
        ReactSharedInternals.T = null;
        try {
          for (var onRecoverableError = root2.onRecoverableError, i = 0; i < recoverableErrors.length; i++) {
            var recoverableError = recoverableErrors[i];
            onRecoverableError(recoverableError.value, {
              componentStack: recoverableError.stack
            });
          }
        } finally {
          ReactSharedInternals.T = finishedWork, ReactDOMSharedInternals.p = passiveSubtreeMask;
        }
      }
      recoverableErrors = pendingViewTransitionEvents;
      onRecoverableError = pendingTransitionTypes;
      pendingTransitionTypes = null;
      if (null !== recoverableErrors && (pendingViewTransitionEvents = null, null === onRecoverableError && (onRecoverableError = []), null !== committedViewTransition))
        for (recoverableError = 0; recoverableError < recoverableErrors.length; recoverableError++)
          finishedWork = (0, recoverableErrors[recoverableError])(
            onRecoverableError
          ), void 0 !== finishedWork && committedViewTransition.finished.finally(finishedWork);
      0 !== (pendingEffectsLanes & 3) && flushPendingEffects();
      ensureRootIsScheduled(root2);
      passiveSubtreeMask = root2.pendingLanes;
      0 !== (lanes & 261930) && 0 !== (passiveSubtreeMask & 42) ? root2 === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root2) : (nestedUpdateCount = 0, rootWithNestedUpdates = null);
      flushSyncWorkAcrossRoots_impl(0);
    }
  }
  function releaseRootPooledCache(root2, remainingLanes) {
    0 === (root2.pooledCacheLanes &= remainingLanes) && (remainingLanes = root2.pooledCache, null != remainingLanes && (root2.pooledCache = null, releaseCache(remainingLanes)));
  }
  function flushPendingEffects() {
    null !== pendingViewTransition && (pendingViewTransition.skipTransition(), pendingViewTransition = null);
    flushMutationEffects();
    flushLayoutEffects();
    flushSpawnedWork();
    return flushPassiveEffects();
  }
  function flushPassiveEffects() {
    if (5 !== pendingEffectsStatus) return false;
    var root2 = pendingEffectsRoot, remainingLanes = pendingEffectsRemainingLanes;
    pendingEffectsRemainingLanes = 0;
    var renderPriority = lanesToEventPriority(pendingEffectsLanes), prevTransition = ReactSharedInternals.T, previousPriority = ReactDOMSharedInternals.p;
    try {
      ReactDOMSharedInternals.p = 32 > renderPriority ? 32 : renderPriority;
      ReactSharedInternals.T = null;
      renderPriority = pendingPassiveTransitions;
      pendingPassiveTransitions = null;
      var root$jscomp$0 = pendingEffectsRoot, lanes = pendingEffectsLanes;
      pendingEffectsStatus = 0;
      pendingFinishedWork = pendingEffectsRoot = null;
      pendingEffectsLanes = 0;
      if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(331));
      var prevExecutionContext = executionContext;
      executionContext |= 4;
      commitPassiveUnmountOnFiber(root$jscomp$0.current);
      commitPassiveMountOnFiber(
        root$jscomp$0,
        root$jscomp$0.current,
        lanes,
        renderPriority
      );
      executionContext = prevExecutionContext;
      flushSyncWorkAcrossRoots_impl(0, false);
      if (injectedHook && "function" === typeof injectedHook.onPostCommitFiberRoot)
        try {
          injectedHook.onPostCommitFiberRoot(rendererID, root$jscomp$0);
        } catch (err) {
        }
      return true;
    } finally {
      ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition, releaseRootPooledCache(root2, remainingLanes);
    }
  }
  function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
    sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
    sourceFiber = createRootErrorUpdate(rootFiber.stateNode, sourceFiber, 2);
    rootFiber = enqueueUpdate(rootFiber, sourceFiber, 2);
    null !== rootFiber && (markRootUpdated$1(rootFiber, 2), ensureRootIsScheduled(rootFiber));
  }
  function captureCommitPhaseError(sourceFiber, nearestMountedAncestor, error) {
    if (3 === sourceFiber.tag)
      captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
    else
      for (; null !== nearestMountedAncestor; ) {
        if (3 === nearestMountedAncestor.tag) {
          captureCommitPhaseErrorOnRoot(
            nearestMountedAncestor,
            sourceFiber,
            error
          );
          break;
        } else if (1 === nearestMountedAncestor.tag) {
          var instance = nearestMountedAncestor.stateNode;
          if ("function" === typeof nearestMountedAncestor.type.getDerivedStateFromError || "function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
            sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
            error = createClassErrorUpdate(2);
            instance = enqueueUpdate(nearestMountedAncestor, error, 2);
            null !== instance && (initializeClassErrorUpdate(
              error,
              instance,
              nearestMountedAncestor,
              sourceFiber
            ), markRootUpdated$1(instance, 2), ensureRootIsScheduled(instance));
            break;
          }
        }
        nearestMountedAncestor = nearestMountedAncestor.return;
      }
  }
  function attachPingListener(root2, wakeable, lanes) {
    var pingCache = root2.pingCache;
    if (null === pingCache) {
      pingCache = root2.pingCache = new PossiblyWeakMap();
      var threadIDs = /* @__PURE__ */ new Set();
      pingCache.set(wakeable, threadIDs);
    } else
      threadIDs = pingCache.get(wakeable), void 0 === threadIDs && (threadIDs = /* @__PURE__ */ new Set(), pingCache.set(wakeable, threadIDs));
    threadIDs.has(lanes) || (workInProgressRootDidAttachPingListener = true, threadIDs.add(lanes), root2 = pingSuspendedRoot.bind(null, root2, wakeable, lanes), wakeable.then(root2, root2));
  }
  function pingSuspendedRoot(root2, wakeable, pingedLanes) {
    var pingCache = root2.pingCache;
    null !== pingCache && pingCache.delete(wakeable);
    root2.pingedLanes |= root2.suspendedLanes & pingedLanes;
    root2.warmLanes &= ~pingedLanes;
    workInProgressRoot === root2 && (workInProgressRootRenderLanes & pingedLanes) === pingedLanes && (4 === workInProgressRootExitStatus || 3 === workInProgressRootExitStatus && (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes && 300 > now() - globalMostRecentFallbackTime ? 0 === (executionContext & 2) ? prepareFreshStack(root2, 0) : workInProgressRootPingedLanes |= pingedLanes : workInProgressRootPingedLanes |= pingedLanes, workInProgressSuspendedRetryLanes === workInProgressRootRenderLanes && (workInProgressSuspendedRetryLanes = 0));
    ensureRootIsScheduled(root2);
  }
  function retryTimedOutBoundary(boundaryFiber, retryLane) {
    0 === retryLane && (retryLane = claimNextRetryLane());
    boundaryFiber = enqueueConcurrentRenderForLane(boundaryFiber, retryLane);
    null !== boundaryFiber && (markRootUpdated$1(boundaryFiber, retryLane), ensureRootIsScheduled(boundaryFiber));
  }
  function retryDehydratedSuspenseBoundary(boundaryFiber) {
    var suspenseState = boundaryFiber.memoizedState, retryLane = 0;
    null !== suspenseState && (retryLane = suspenseState.retryLane);
    retryTimedOutBoundary(boundaryFiber, retryLane);
  }
  function resolveRetryWakeable(boundaryFiber, wakeable) {
    var retryLane = 0;
    switch (boundaryFiber.tag) {
      case 31:
      case 13:
        var retryCache = boundaryFiber.stateNode;
        var suspenseState = boundaryFiber.memoizedState;
        null !== suspenseState && (retryLane = suspenseState.retryLane);
        break;
      case 19:
        retryCache = boundaryFiber.stateNode;
        break;
      case 22:
        retryCache = boundaryFiber.stateNode._retryCache;
        break;
      default:
        throw Error(formatProdErrorMessage(314));
    }
    null !== retryCache && retryCache.delete(wakeable);
    retryTimedOutBoundary(boundaryFiber, retryLane);
  }
  function scheduleCallback$1(priorityLevel, callback) {
    return scheduleCallback$3(priorityLevel, callback);
  }
  var firstScheduledRoot = null, lastScheduledRoot = null, didScheduleMicrotask = false, mightHavePendingSyncWork = false, isFlushingWork = false, currentEventTransitionLane = 0;
  function ensureRootIsScheduled(root2) {
    root2 !== lastScheduledRoot && null === root2.next && (null === lastScheduledRoot ? firstScheduledRoot = lastScheduledRoot = root2 : lastScheduledRoot = lastScheduledRoot.next = root2);
    mightHavePendingSyncWork = true;
    didScheduleMicrotask || (didScheduleMicrotask = true, scheduleImmediateRootScheduleTask());
  }
  function flushSyncWorkAcrossRoots_impl(syncTransitionLanes, onlyLegacy) {
    if (!isFlushingWork && mightHavePendingSyncWork) {
      isFlushingWork = true;
      do {
        var didPerformSomeWork = false;
        for (var root$190 = firstScheduledRoot; null !== root$190; ) {
          if (0 !== syncTransitionLanes) {
            var pendingLanes = root$190.pendingLanes;
            if (0 === pendingLanes) var JSCompiler_inline_result = 0;
            else {
              var suspendedLanes = root$190.suspendedLanes, pingedLanes = root$190.pingedLanes;
              JSCompiler_inline_result = (1 << 31 - clz32(42 | syncTransitionLanes) + 1) - 1;
              JSCompiler_inline_result &= pendingLanes & ~(suspendedLanes & ~pingedLanes);
              JSCompiler_inline_result = JSCompiler_inline_result & 201326741 ? JSCompiler_inline_result & 201326741 | 1 : JSCompiler_inline_result ? JSCompiler_inline_result | 2 : 0;
            }
            0 !== JSCompiler_inline_result && (didPerformSomeWork = true, performSyncWorkOnRoot(root$190, JSCompiler_inline_result));
          } else
            JSCompiler_inline_result = workInProgressRootRenderLanes, JSCompiler_inline_result = getNextLanes(
              root$190,
              root$190 === workInProgressRoot ? JSCompiler_inline_result : 0,
              null !== root$190.cancelPendingCommit || -1 !== root$190.timeoutHandle
            ), 0 === (JSCompiler_inline_result & 3) || checkIfRootIsPrerendering(root$190, JSCompiler_inline_result) || (didPerformSomeWork = true, performSyncWorkOnRoot(root$190, JSCompiler_inline_result));
          root$190 = root$190.next;
        }
      } while (didPerformSomeWork);
      isFlushingWork = false;
    }
  }
  function processRootScheduleInImmediateTask() {
    processRootScheduleInMicrotask();
  }
  function processRootScheduleInMicrotask() {
    mightHavePendingSyncWork = didScheduleMicrotask = false;
    var syncTransitionLanes = 0;
    0 !== currentEventTransitionLane && shouldAttemptEagerTransition() && (syncTransitionLanes = currentEventTransitionLane);
    for (var currentTime = now(), prev = null, root2 = firstScheduledRoot; null !== root2; ) {
      var next = root2.next, nextLanes = scheduleTaskForRootDuringMicrotask(root2, currentTime);
      if (0 === nextLanes)
        root2.next = null, null === prev ? firstScheduledRoot = next : prev.next = next, null === next && (lastScheduledRoot = prev);
      else if (prev = root2, 0 !== syncTransitionLanes || 0 !== (nextLanes & 3))
        mightHavePendingSyncWork = true;
      root2 = next;
    }
    0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus || flushSyncWorkAcrossRoots_impl(syncTransitionLanes);
    0 !== currentEventTransitionLane && (currentEventTransitionLane = 0);
  }
  function scheduleTaskForRootDuringMicrotask(root2, currentTime) {
    for (var suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes, expirationTimes = root2.expirationTimes, lanes = root2.pendingLanes & -62914561; 0 < lanes; ) {
      var index$5 = 31 - clz32(lanes), lane = 1 << index$5, expirationTime = expirationTimes[index$5];
      if (-1 === expirationTime) {
        if (0 === (lane & suspendedLanes) || 0 !== (lane & pingedLanes))
          expirationTimes[index$5] = computeExpirationTime(lane, currentTime);
      } else expirationTime <= currentTime && (root2.expiredLanes |= lane);
      lanes &= ~lane;
    }
    currentTime = workInProgressRoot;
    suspendedLanes = workInProgressRootRenderLanes;
    suspendedLanes = getNextLanes(
      root2,
      root2 === currentTime ? suspendedLanes : 0,
      null !== root2.cancelPendingCommit || -1 !== root2.timeoutHandle
    );
    pingedLanes = root2.callbackNode;
    if (0 === suspendedLanes || root2 === currentTime && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root2.cancelPendingCommit)
      return null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes), root2.callbackNode = null, root2.callbackPriority = 0;
    if (0 === (suspendedLanes & 3) || checkIfRootIsPrerendering(root2, suspendedLanes)) {
      currentTime = suspendedLanes & -suspendedLanes;
      if (currentTime === root2.callbackPriority) return currentTime;
      null !== pingedLanes && cancelCallback$1(pingedLanes);
      switch (lanesToEventPriority(suspendedLanes)) {
        case 2:
        case 8:
          suspendedLanes = UserBlockingPriority;
          break;
        case 32:
          suspendedLanes = NormalPriority$1;
          break;
        case 268435456:
          suspendedLanes = IdlePriority;
          break;
        default:
          suspendedLanes = NormalPriority$1;
      }
      pingedLanes = performWorkOnRootViaSchedulerTask.bind(null, root2);
      suspendedLanes = scheduleCallback$3(suspendedLanes, pingedLanes);
      root2.callbackPriority = currentTime;
      root2.callbackNode = suspendedLanes;
      return currentTime;
    }
    null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes);
    root2.callbackPriority = 2;
    root2.callbackNode = null;
    return 2;
  }
  function performWorkOnRootViaSchedulerTask(root2, didTimeout) {
    if (0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus)
      return root2.callbackNode = null, root2.callbackPriority = 0, null;
    var originalCallbackNode = root2.callbackNode;
    if (flushPendingEffects() && root2.callbackNode !== originalCallbackNode)
      return null;
    var workInProgressRootRenderLanes$jscomp$0 = workInProgressRootRenderLanes;
    workInProgressRootRenderLanes$jscomp$0 = getNextLanes(
      root2,
      root2 === workInProgressRoot ? workInProgressRootRenderLanes$jscomp$0 : 0,
      null !== root2.cancelPendingCommit || -1 !== root2.timeoutHandle
    );
    if (0 === workInProgressRootRenderLanes$jscomp$0) return null;
    performWorkOnRoot(root2, workInProgressRootRenderLanes$jscomp$0, didTimeout);
    scheduleTaskForRootDuringMicrotask(root2, now());
    return null != root2.callbackNode && root2.callbackNode === originalCallbackNode ? performWorkOnRootViaSchedulerTask.bind(null, root2) : null;
  }
  function performSyncWorkOnRoot(root2, lanes) {
    if (flushPendingEffects()) return null;
    performWorkOnRoot(root2, lanes, true);
  }
  function scheduleImmediateRootScheduleTask() {
    scheduleMicrotask(function() {
      0 !== (executionContext & 6) ? scheduleCallback$3(
        ImmediatePriority,
        processRootScheduleInImmediateTask
      ) : processRootScheduleInMicrotask();
    });
  }
  function requestTransitionLane() {
    if (0 === currentEventTransitionLane) {
      var actionScopeLane = currentEntangledLane;
      0 === actionScopeLane && (actionScopeLane = nextTransitionUpdateLane, nextTransitionUpdateLane <<= 1, 0 === (nextTransitionUpdateLane & 261888) && (nextTransitionUpdateLane = 256));
      currentEventTransitionLane = actionScopeLane;
    }
    return currentEventTransitionLane;
  }
  function coerceFormActionProp(actionProp) {
    return null == actionProp || "symbol" === typeof actionProp || "boolean" === typeof actionProp ? null : "function" === typeof actionProp ? actionProp : sanitizeURL(actionProp);
  }
  function extractEvents$1(dispatchQueue, domEventName, maybeTargetInst, nativeEvent, nativeEventTarget) {
    if ("submit" === domEventName && maybeTargetInst && maybeTargetInst.stateNode === nativeEventTarget) {
      var action = coerceFormActionProp(
        (nativeEventTarget[internalPropsKey] || null).action
      ), submitter = nativeEvent.submitter;
      submitter && (domEventName = (domEventName = submitter[internalPropsKey] || null) ? coerceFormActionProp(domEventName.formAction) : submitter.getAttribute("formAction"), null !== domEventName && (action = domEventName, submitter = null));
      var event = new SyntheticEvent(
        "action",
        "action",
        null,
        nativeEvent,
        nativeEventTarget
      );
      dispatchQueue.push({
        event,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (nativeEvent.defaultPrevented) {
                if (0 !== currentEventTransitionLane) {
                  var formData = new FormData(nativeEventTarget, submitter);
                  startHostTransition(
                    maybeTargetInst,
                    {
                      pending: true,
                      data: formData,
                      method: nativeEventTarget.method,
                      action
                    },
                    null,
                    formData
                  );
                }
              } else
                "function" === typeof action && (event.preventDefault(), formData = new FormData(nativeEventTarget, submitter), startHostTransition(
                  maybeTargetInst,
                  {
                    pending: true,
                    data: formData,
                    method: nativeEventTarget.method,
                    action
                  },
                  action,
                  formData
                ));
            },
            currentTarget: nativeEventTarget
          }
        ]
      });
    }
  }
  for (var i$jscomp$inline_1667 = 0; i$jscomp$inline_1667 < simpleEventPluginEvents.length; i$jscomp$inline_1667++) {
    var eventName$jscomp$inline_1668 = simpleEventPluginEvents[i$jscomp$inline_1667], domEventName$jscomp$inline_1669 = eventName$jscomp$inline_1668.toLowerCase(), capitalizedEvent$jscomp$inline_1670 = eventName$jscomp$inline_1668[0].toUpperCase() + eventName$jscomp$inline_1668.slice(1);
    registerSimpleEvent(
      domEventName$jscomp$inline_1669,
      "on" + capitalizedEvent$jscomp$inline_1670
    );
  }
  registerSimpleEvent(ANIMATION_END, "onAnimationEnd");
  registerSimpleEvent(ANIMATION_ITERATION, "onAnimationIteration");
  registerSimpleEvent(ANIMATION_START, "onAnimationStart");
  registerSimpleEvent("dblclick", "onDoubleClick");
  registerSimpleEvent("focusin", "onFocus");
  registerSimpleEvent("focusout", "onBlur");
  registerSimpleEvent(TRANSITION_RUN, "onTransitionRun");
  registerSimpleEvent(TRANSITION_START, "onTransitionStart");
  registerSimpleEvent(TRANSITION_CANCEL, "onTransitionCancel");
  registerSimpleEvent(TRANSITION_END, "onTransitionEnd");
  registerDirectEvent("onMouseEnter", ["mouseout", "mouseover"]);
  registerDirectEvent("onMouseLeave", ["mouseout", "mouseover"]);
  registerDirectEvent("onPointerEnter", ["pointerout", "pointerover"]);
  registerDirectEvent("onPointerLeave", ["pointerout", "pointerover"]);
  registerTwoPhaseEvent(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  );
  registerTwoPhaseEvent(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  );
  registerTwoPhaseEvent("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]);
  registerTwoPhaseEvent(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  );
  registerTwoPhaseEvent(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  );
  registerTwoPhaseEvent(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), nonDelegatedEvents = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mediaEventTypes)
  );
  function processDispatchQueue(dispatchQueue, eventSystemFlags) {
    eventSystemFlags = 0 !== (eventSystemFlags & 4);
    for (var i = 0; i < dispatchQueue.length; i++) {
      var _dispatchQueue$i = dispatchQueue[i], event = _dispatchQueue$i.event;
      _dispatchQueue$i = _dispatchQueue$i.listeners;
      a: {
        var previousInstance = void 0;
        if (eventSystemFlags)
          for (var i$jscomp$0 = _dispatchQueue$i.length - 1; 0 <= i$jscomp$0; i$jscomp$0--) {
            var _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0], instance = _dispatchListeners$i.instance, currentTarget = _dispatchListeners$i.currentTarget;
            _dispatchListeners$i = _dispatchListeners$i.listener;
            if (instance !== previousInstance && event.isPropagationStopped())
              break a;
            previousInstance = _dispatchListeners$i;
            event.currentTarget = currentTarget;
            try {
              previousInstance(event);
            } catch (error) {
              reportGlobalError(error);
            }
            event.currentTarget = null;
            previousInstance = instance;
          }
        else
          for (i$jscomp$0 = 0; i$jscomp$0 < _dispatchQueue$i.length; i$jscomp$0++) {
            _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0];
            instance = _dispatchListeners$i.instance;
            currentTarget = _dispatchListeners$i.currentTarget;
            _dispatchListeners$i = _dispatchListeners$i.listener;
            if (instance !== previousInstance && event.isPropagationStopped())
              break a;
            previousInstance = _dispatchListeners$i;
            event.currentTarget = currentTarget;
            try {
              previousInstance(event);
            } catch (error) {
              reportGlobalError(error);
            }
            event.currentTarget = null;
            previousInstance = instance;
          }
      }
    }
  }
  function listenToNonDelegatedEvent(domEventName, targetElement) {
    var JSCompiler_inline_result = targetElement[internalEventHandlersKey];
    void 0 === JSCompiler_inline_result && (JSCompiler_inline_result = targetElement[internalEventHandlersKey] = /* @__PURE__ */ new Set());
    var listenerSetKey = domEventName + "__bubble";
    JSCompiler_inline_result.has(listenerSetKey) || (addTrappedEventListener(targetElement, domEventName, 2, false), JSCompiler_inline_result.add(listenerSetKey));
  }
  function listenToNativeEvent(domEventName, isCapturePhaseListener, target) {
    var eventSystemFlags = 0;
    isCapturePhaseListener && (eventSystemFlags |= 4);
    addTrappedEventListener(
      target,
      domEventName,
      eventSystemFlags,
      isCapturePhaseListener
    );
  }
  var listeningMarker = "_reactListening" + Math.random().toString(36).slice(2);
  function listenToAllSupportedEvents(rootContainerElement) {
    if (!rootContainerElement[listeningMarker]) {
      rootContainerElement[listeningMarker] = true;
      allNativeEvents.forEach(function(domEventName) {
        "selectionchange" !== domEventName && (nonDelegatedEvents.has(domEventName) || listenToNativeEvent(domEventName, false, rootContainerElement), listenToNativeEvent(domEventName, true, rootContainerElement));
      });
      var ownerDocument = 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
      null === ownerDocument || ownerDocument[listeningMarker] || (ownerDocument[listeningMarker] = true, listenToNativeEvent("selectionchange", false, ownerDocument));
    }
  }
  function addTrappedEventListener(targetContainer, domEventName, eventSystemFlags, isCapturePhaseListener) {
    switch (getEventPriority(domEventName)) {
      case 2:
        var listenerWrapper = dispatchDiscreteEvent;
        break;
      case 8:
        listenerWrapper = dispatchContinuousEvent;
        break;
      default:
        listenerWrapper = dispatchEvent;
    }
    eventSystemFlags = listenerWrapper.bind(
      null,
      domEventName,
      eventSystemFlags,
      targetContainer
    );
    listenerWrapper = void 0;
    !passiveBrowserEventsSupported || "touchstart" !== domEventName && "touchmove" !== domEventName && "wheel" !== domEventName || (listenerWrapper = true);
    isCapturePhaseListener ? void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
      capture: true,
      passive: listenerWrapper
    }) : targetContainer.addEventListener(domEventName, eventSystemFlags, true) : void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
      passive: listenerWrapper
    }) : targetContainer.addEventListener(domEventName, eventSystemFlags, false);
  }
  function dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst$jscomp$0, targetContainer) {
    var ancestorInst = targetInst$jscomp$0;
    if (0 === (eventSystemFlags & 1) && 0 === (eventSystemFlags & 2) && null !== targetInst$jscomp$0)
      a: for (; ; ) {
        if (null === targetInst$jscomp$0) return;
        var nodeTag = targetInst$jscomp$0.tag;
        if (3 === nodeTag || 4 === nodeTag) {
          var container = targetInst$jscomp$0.stateNode.containerInfo;
          if (container === targetContainer) break;
          if (4 === nodeTag)
            for (nodeTag = targetInst$jscomp$0.return; null !== nodeTag; ) {
              var grandTag = nodeTag.tag;
              if ((3 === grandTag || 4 === grandTag) && nodeTag.stateNode.containerInfo === targetContainer)
                return;
              nodeTag = nodeTag.return;
            }
          for (; null !== container; ) {
            nodeTag = getClosestInstanceFromNode(container);
            if (null === nodeTag) return;
            grandTag = nodeTag.tag;
            if (5 === grandTag || 6 === grandTag || 26 === grandTag || 27 === grandTag) {
              targetInst$jscomp$0 = ancestorInst = nodeTag;
              continue a;
            }
            container = container.parentNode;
          }
        }
        targetInst$jscomp$0 = targetInst$jscomp$0.return;
      }
    batchedUpdates$1(function() {
      var targetInst = ancestorInst, nativeEventTarget = getEventTarget(nativeEvent), dispatchQueue = [];
      a: {
        var reactName = topLevelEventsToReactNames.get(domEventName);
        if (void 0 !== reactName) {
          var SyntheticEventCtor = SyntheticEvent, reactEventType = domEventName;
          switch (domEventName) {
            case "keypress":
              if (0 === getEventCharCode(nativeEvent)) break a;
            case "keydown":
            case "keyup":
              SyntheticEventCtor = SyntheticKeyboardEvent;
              break;
            case "focusin":
              reactEventType = "focus";
              SyntheticEventCtor = SyntheticFocusEvent;
              break;
            case "focusout":
              reactEventType = "blur";
              SyntheticEventCtor = SyntheticFocusEvent;
              break;
            case "beforeblur":
            case "afterblur":
              SyntheticEventCtor = SyntheticFocusEvent;
              break;
            case "click":
              if (2 === nativeEvent.button) break a;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              SyntheticEventCtor = SyntheticMouseEvent;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              SyntheticEventCtor = SyntheticDragEvent;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              SyntheticEventCtor = SyntheticTouchEvent;
              break;
            case ANIMATION_END:
            case ANIMATION_ITERATION:
            case ANIMATION_START:
              SyntheticEventCtor = SyntheticAnimationEvent;
              break;
            case TRANSITION_END:
              SyntheticEventCtor = SyntheticTransitionEvent;
              break;
            case "scroll":
            case "scrollend":
              SyntheticEventCtor = SyntheticUIEvent;
              break;
            case "wheel":
              SyntheticEventCtor = SyntheticWheelEvent;
              break;
            case "copy":
            case "cut":
            case "paste":
              SyntheticEventCtor = SyntheticClipboardEvent;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              SyntheticEventCtor = SyntheticPointerEvent;
              break;
            case "submit":
              SyntheticEventCtor = SyntheticSubmitEvent;
              break;
            case "toggle":
            case "beforetoggle":
              SyntheticEventCtor = SyntheticToggleEvent;
          }
          var inCapturePhase = 0 !== (eventSystemFlags & 4), accumulateTargetOnly = !inCapturePhase && ("scroll" === domEventName || "scrollend" === domEventName), reactEventName = inCapturePhase ? null !== reactName ? reactName + "Capture" : null : reactName;
          inCapturePhase = [];
          for (var instance = targetInst, lastHostComponent; null !== instance; ) {
            var _instance = instance;
            lastHostComponent = _instance.stateNode;
            _instance = _instance.tag;
            5 !== _instance && 26 !== _instance && 27 !== _instance || null === lastHostComponent || null === reactEventName || (_instance = getListener(instance, reactEventName), null != _instance && inCapturePhase.push(
              createDispatchListener(instance, _instance, lastHostComponent)
            ));
            if (accumulateTargetOnly) break;
            instance = instance.return;
          }
          0 < inCapturePhase.length && (reactName = new SyntheticEventCtor(
            reactName,
            reactEventType,
            null,
            nativeEvent,
            nativeEventTarget
          ), dispatchQueue.push({ event: reactName, listeners: inCapturePhase }));
        }
      }
      if (0 === (eventSystemFlags & 7)) {
        a: {
          SyntheticEventCtor = "mouseover" === domEventName || "pointerover" === domEventName;
          reactName = "mouseout" === domEventName || "pointerout" === domEventName;
          if (SyntheticEventCtor && nativeEvent !== currentReplayingEvent && (reactEventType = nativeEvent.relatedTarget || nativeEvent.fromElement) && (getClosestInstanceFromNode(reactEventType) || reactEventType[internalContainerInstanceKey]))
            break a;
          if (reactName || SyntheticEventCtor) {
            reactEventType = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget : (SyntheticEventCtor = nativeEventTarget.ownerDocument) ? SyntheticEventCtor.defaultView || SyntheticEventCtor.parentWindow : window;
            if (reactName) {
              if (SyntheticEventCtor = nativeEvent.relatedTarget || nativeEvent.toElement, reactName = targetInst, SyntheticEventCtor = SyntheticEventCtor ? getClosestInstanceFromNode(SyntheticEventCtor) : null, null !== SyntheticEventCtor && (accumulateTargetOnly = getNearestMountedFiber(SyntheticEventCtor), inCapturePhase = SyntheticEventCtor.tag, SyntheticEventCtor !== accumulateTargetOnly || 5 !== inCapturePhase && 27 !== inCapturePhase && 6 !== inCapturePhase))
                SyntheticEventCtor = null;
            } else reactName = null, SyntheticEventCtor = targetInst;
            if (reactName !== SyntheticEventCtor) {
              inCapturePhase = SyntheticMouseEvent;
              _instance = "onMouseLeave";
              reactEventName = "onMouseEnter";
              instance = "mouse";
              if ("pointerout" === domEventName || "pointerover" === domEventName)
                inCapturePhase = SyntheticPointerEvent, _instance = "onPointerLeave", reactEventName = "onPointerEnter", instance = "pointer";
              accumulateTargetOnly = null == reactName ? reactEventType : getNodeFromInstance(reactName);
              lastHostComponent = null == SyntheticEventCtor ? reactEventType : getNodeFromInstance(SyntheticEventCtor);
              reactEventType = new inCapturePhase(
                _instance,
                instance + "leave",
                reactName,
                nativeEvent,
                nativeEventTarget
              );
              reactEventType.target = accumulateTargetOnly;
              reactEventType.relatedTarget = lastHostComponent;
              _instance = null;
              getClosestInstanceFromNode(nativeEventTarget) === targetInst && (inCapturePhase = new inCapturePhase(
                reactEventName,
                instance + "enter",
                SyntheticEventCtor,
                nativeEvent,
                nativeEventTarget
              ), inCapturePhase.target = lastHostComponent, inCapturePhase.relatedTarget = accumulateTargetOnly, _instance = inCapturePhase);
              accumulateTargetOnly = _instance;
              inCapturePhase = reactName && SyntheticEventCtor ? getLowestCommonAncestor(
                reactName,
                SyntheticEventCtor,
                getParent
              ) : null;
              null !== reactName && accumulateEnterLeaveListenersForEvent(
                dispatchQueue,
                reactEventType,
                reactName,
                inCapturePhase,
                false
              );
              null !== SyntheticEventCtor && null !== accumulateTargetOnly && accumulateEnterLeaveListenersForEvent(
                dispatchQueue,
                accumulateTargetOnly,
                SyntheticEventCtor,
                inCapturePhase,
                true
              );
            }
          }
        }
        a: {
          reactName = targetInst ? getNodeFromInstance(targetInst) : window;
          SyntheticEventCtor = reactName.nodeName && reactName.nodeName.toLowerCase();
          if ("select" === SyntheticEventCtor || "input" === SyntheticEventCtor && "file" === reactName.type)
            var getTargetInstFunc = getTargetInstForChangeEvent;
          else if (isTextInputElement(reactName))
            if (isInputEventSupported)
              getTargetInstFunc = getTargetInstForInputOrChangeEvent;
            else {
              getTargetInstFunc = getTargetInstForInputEventPolyfill;
              var handleEventFunc = handleEventsForInputEventPolyfill;
            }
          else
            SyntheticEventCtor = reactName.nodeName, !SyntheticEventCtor || "input" !== SyntheticEventCtor.toLowerCase() || "checkbox" !== reactName.type && "radio" !== reactName.type ? targetInst && isCustomElement(targetInst.elementType) && (getTargetInstFunc = getTargetInstForChangeEvent) : getTargetInstFunc = getTargetInstForClickEvent;
          if (getTargetInstFunc && (getTargetInstFunc = getTargetInstFunc(domEventName, targetInst))) {
            createAndAccumulateChangeEvent(
              dispatchQueue,
              getTargetInstFunc,
              nativeEvent,
              nativeEventTarget
            );
            break a;
          }
          handleEventFunc && handleEventFunc(domEventName, reactName, targetInst);
        }
        handleEventFunc = targetInst ? getNodeFromInstance(targetInst) : window;
        switch (domEventName) {
          case "focusin":
            if (isTextInputElement(handleEventFunc) || "true" === handleEventFunc.contentEditable)
              activeElement = handleEventFunc, activeElementInst = targetInst, lastSelection = null;
            break;
          case "focusout":
            lastSelection = activeElementInst = activeElement = null;
            break;
          case "mousedown":
            mouseDown = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            mouseDown = false;
            constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
            break;
          case "selectionchange":
            if (skipSelectionChangeEvent) break;
          case "keydown":
          case "keyup":
            constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
        }
        var fallbackData;
        if (canUseCompositionEvent)
          b: {
            switch (domEventName) {
              case "compositionstart":
                var eventType = "onCompositionStart";
                break b;
              case "compositionend":
                eventType = "onCompositionEnd";
                break b;
              case "compositionupdate":
                eventType = "onCompositionUpdate";
                break b;
            }
            eventType = void 0;
          }
        else
          isComposing ? isFallbackCompositionEnd(domEventName, nativeEvent) && (eventType = "onCompositionEnd") : "keydown" === domEventName && 229 === nativeEvent.keyCode && (eventType = "onCompositionStart");
        eventType && (useFallbackCompositionData && "ko" !== nativeEvent.locale && (isComposing || "onCompositionStart" !== eventType ? "onCompositionEnd" === eventType && isComposing && (fallbackData = getData()) : (root = nativeEventTarget, startText = "value" in root ? root.value : root.textContent, isComposing = true)), handleEventFunc = accumulateTwoPhaseListeners(targetInst, eventType), 0 < handleEventFunc.length && (eventType = new SyntheticCompositionEvent(
          eventType,
          domEventName,
          null,
          nativeEvent,
          nativeEventTarget
        ), dispatchQueue.push({ event: eventType, listeners: handleEventFunc }), fallbackData ? eventType.data = fallbackData : (fallbackData = getDataFromCustomEvent(nativeEvent), null !== fallbackData && (eventType.data = fallbackData))));
        if (fallbackData = canUseTextInputEvent ? getNativeBeforeInputChars(domEventName, nativeEvent) : getFallbackBeforeInputChars(domEventName, nativeEvent))
          eventType = accumulateTwoPhaseListeners(targetInst, "onBeforeInput"), 0 < eventType.length && (handleEventFunc = new SyntheticCompositionEvent(
            "onBeforeInput",
            "beforeinput",
            null,
            nativeEvent,
            nativeEventTarget
          ), dispatchQueue.push({
            event: handleEventFunc,
            listeners: eventType
          }), handleEventFunc.data = fallbackData);
        extractEvents$1(
          dispatchQueue,
          domEventName,
          targetInst,
          nativeEvent,
          nativeEventTarget
        );
      }
      processDispatchQueue(dispatchQueue, eventSystemFlags);
    });
  }
  function createDispatchListener(instance, listener, currentTarget) {
    return {
      instance,
      listener,
      currentTarget
    };
  }
  function accumulateTwoPhaseListeners(targetFiber, reactName) {
    for (var captureName = reactName + "Capture", listeners = []; null !== targetFiber; ) {
      var _instance2 = targetFiber, stateNode = _instance2.stateNode;
      _instance2 = _instance2.tag;
      5 !== _instance2 && 26 !== _instance2 && 27 !== _instance2 || null === stateNode || (_instance2 = getListener(targetFiber, captureName), null != _instance2 && listeners.unshift(
        createDispatchListener(targetFiber, _instance2, stateNode)
      ), _instance2 = getListener(targetFiber, reactName), null != _instance2 && listeners.push(
        createDispatchListener(targetFiber, _instance2, stateNode)
      ));
      if (3 === targetFiber.tag) return listeners;
      targetFiber = targetFiber.return;
    }
    return [];
  }
  function getParent(inst) {
    if (null === inst) return null;
    do
      inst = inst.return;
    while (inst && 5 !== inst.tag && 27 !== inst.tag);
    return inst ? inst : null;
  }
  function accumulateEnterLeaveListenersForEvent(dispatchQueue, event, target, common, inCapturePhase) {
    for (var registrationName = event._reactName, listeners = []; null !== target && target !== common; ) {
      var _instance3 = target, alternate = _instance3.alternate, stateNode = _instance3.stateNode;
      _instance3 = _instance3.tag;
      if (null !== alternate && alternate === common) break;
      5 !== _instance3 && 26 !== _instance3 && 27 !== _instance3 || null === stateNode || (alternate = stateNode, inCapturePhase ? (stateNode = getListener(target, registrationName), null != stateNode && listeners.unshift(
        createDispatchListener(target, stateNode, alternate)
      )) : inCapturePhase || (stateNode = getListener(target, registrationName), null != stateNode && listeners.push(
        createDispatchListener(target, stateNode, alternate)
      )));
      target = target.return;
    }
    0 !== listeners.length && dispatchQueue.push({ event, listeners });
  }
  var NORMALIZE_NEWLINES_REGEX = /\r\n?/g, NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g;
  function normalizeMarkupForTextOrAttribute(markup) {
    return ("string" === typeof markup ? markup : "" + markup).replace(NORMALIZE_NEWLINES_REGEX, "\n").replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, "");
  }
  function checkForUnmatchedText(serverText, clientText) {
    clientText = normalizeMarkupForTextOrAttribute(clientText);
    return normalizeMarkupForTextOrAttribute(serverText) === clientText ? true : false;
  }
  function setProp(domElement, tag, key, value, props, prevValue) {
    switch (key) {
      case "children":
        if ("string" === typeof value)
          "body" === tag || "textarea" === tag && "" === value || setTextContent(domElement, value);
        else if ("number" === typeof value || "bigint" === typeof value)
          "body" !== tag && setTextContent(domElement, "" + value);
        else return;
        break;
      case "className":
        setValueForKnownAttribute(domElement, "class", value);
        break;
      case "tabIndex":
        setValueForKnownAttribute(domElement, "tabindex", value);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        setValueForKnownAttribute(domElement, key, value);
        break;
      case "style":
        setValueForStyles(domElement, value, prevValue);
        return;
      case "data":
        if ("object" !== tag) {
          setValueForKnownAttribute(domElement, "data", value);
          break;
        }
      case "src":
      case "href":
        if ("" === value && ("a" !== tag || "href" !== key)) {
          domElement.removeAttribute(key);
          break;
        }
        if (null == value || "function" === typeof value || "symbol" === typeof value || "boolean" === typeof value) {
          domElement.removeAttribute(key);
          break;
        }
        value = sanitizeURL(value);
        domElement.setAttribute(key, value);
        break;
      case "action":
      case "formAction":
        if ("function" === typeof value) {
          domElement.setAttribute(
            key,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          "function" === typeof prevValue && ("formAction" === key ? ("input" !== tag && setProp(domElement, tag, "name", props.name, props, null), setProp(
            domElement,
            tag,
            "formEncType",
            props.formEncType,
            props,
            null
          ), setProp(
            domElement,
            tag,
            "formMethod",
            props.formMethod,
            props,
            null
          ), setProp(
            domElement,
            tag,
            "formTarget",
            props.formTarget,
            props,
            null
          )) : (setProp(domElement, tag, "encType", props.encType, props, null), setProp(domElement, tag, "method", props.method, props, null), setProp(domElement, tag, "target", props.target, props, null)));
        if (null == value || "symbol" === typeof value || "boolean" === typeof value) {
          domElement.removeAttribute(key);
          break;
        }
        value = sanitizeURL(value);
        domElement.setAttribute(key, value);
        break;
      case "onClick":
        null != value && (domElement.onclick = noop$1);
        return;
      case "onScroll":
        null != value && listenToNonDelegatedEvent("scroll", domElement);
        return;
      case "onScrollEnd":
        null != value && listenToNonDelegatedEvent("scrollend", domElement);
        return;
      case "dangerouslySetInnerHTML":
        if (null != value) {
          if ("object" !== typeof value || !("__html" in value))
            throw Error(formatProdErrorMessage(61));
          key = value.__html;
          if (null != key) {
            if (null != props.children) throw Error(formatProdErrorMessage(60));
            (null != prevValue ? prevValue.__html : void 0) !== key && (domElement.innerHTML = key);
          }
        }
        break;
      case "multiple":
        domElement.multiple = value && "function" !== typeof value && "symbol" !== typeof value;
        break;
      case "muted":
        domElement.muted = value && "function" !== typeof value && "symbol" !== typeof value;
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (null == value || "function" === typeof value || "boolean" === typeof value || "symbol" === typeof value) {
          domElement.removeAttribute("xlink:href");
          break;
        }
        key = sanitizeURL(value);
        domElement.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          key
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "credentialless":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, "") : domElement.removeAttribute(key);
        break;
      case "capture":
      case "download":
        true === value ? domElement.setAttribute(key, "") : false !== value && null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        null != value && "function" !== typeof value && "symbol" !== typeof value && !isNaN(value) && 1 <= value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
        break;
      case "rowSpan":
      case "start":
        null == value || "function" === typeof value || "symbol" === typeof value || isNaN(value) ? domElement.removeAttribute(key) : domElement.setAttribute(key, value);
        break;
      case "popover":
        listenToNonDelegatedEvent("beforetoggle", domElement);
        listenToNonDelegatedEvent("toggle", domElement);
        setValueForAttribute(domElement, "popover", value);
        break;
      case "xlinkActuate":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          value
        );
        break;
      case "xlinkArcrole":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          value
        );
        break;
      case "xlinkRole":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          value
        );
        break;
      case "xlinkShow":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          value
        );
        break;
      case "xlinkTitle":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          value
        );
        break;
      case "xlinkType":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          value
        );
        break;
      case "xmlBase":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          value
        );
        break;
      case "xmlLang":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          value
        );
        break;
      case "xmlSpace":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          value
        );
        break;
      case "is":
        setValueForAttribute(domElement, "is", value);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < key.length) || "o" !== key[0] && "O" !== key[0] || "n" !== key[1] && "N" !== key[1])
          key = aliases.get(key) || key, setValueForAttribute(domElement, key, value);
        else return;
    }
    viewTransitionMutationContext = true;
  }
  function setPropOnCustomElement(domElement, tag, key, value, props, prevValue) {
    switch (key) {
      case "style":
        setValueForStyles(domElement, value, prevValue);
        return;
      case "dangerouslySetInnerHTML":
        if (null != value) {
          if ("object" !== typeof value || !("__html" in value))
            throw Error(formatProdErrorMessage(61));
          key = value.__html;
          if (null != key) {
            if (null != props.children) throw Error(formatProdErrorMessage(60));
            (null != prevValue ? prevValue.__html : void 0) !== key && (domElement.innerHTML = key);
          }
        }
        break;
      case "children":
        if ("string" === typeof value) setTextContent(domElement, value);
        else if ("number" === typeof value || "bigint" === typeof value)
          setTextContent(domElement, "" + value);
        else return;
        break;
      case "onScroll":
        null != value && listenToNonDelegatedEvent("scroll", domElement);
        return;
      case "onScrollEnd":
        null != value && listenToNonDelegatedEvent("scrollend", domElement);
        return;
      case "onClick":
        null != value && (domElement.onclick = noop$1);
        return;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        return;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!registrationNameDependencies.hasOwnProperty(key))
          a: {
            if ("o" === key[0] && "n" === key[1] && (props = key.endsWith("Capture"), prevValue = key.slice(2, props ? key.length - 7 : void 0), tag = domElement[internalPropsKey] || null, tag = null != tag ? tag[key] : null, "function" === typeof tag && domElement.removeEventListener(prevValue, tag, props), "function" === typeof value)) {
              "function" !== typeof tag && null !== tag && (key in domElement ? domElement[key] = null : domElement.hasAttribute(key) && domElement.removeAttribute(key));
              domElement.addEventListener(prevValue, value, props);
              break a;
            }
            viewTransitionMutationContext = true;
            key in domElement ? domElement[key] = value : true === value ? domElement.setAttribute(key, "") : setValueForAttribute(domElement, key, value);
          }
        return;
    }
    viewTransitionMutationContext = true;
  }
  function setInitialProperties(domElement, tag, props) {
    switch (tag) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        listenToNonDelegatedEvent("error", domElement);
        listenToNonDelegatedEvent("load", domElement);
        var hasSrc = false, hasSrcSet = false, propKey;
        for (propKey in props)
          if (props.hasOwnProperty(propKey)) {
            var propValue = props[propKey];
            if (null != propValue)
              switch (propKey) {
                case "src":
                  hasSrc = true;
                  break;
                case "srcSet":
                  hasSrcSet = true;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(formatProdErrorMessage(137, tag));
                default:
                  setProp(domElement, tag, propKey, propValue, props, null);
              }
          }
        hasSrcSet && setProp(domElement, tag, "srcSet", props.srcSet, props, null);
        hasSrc && setProp(domElement, tag, "src", props.src, props, null);
        return;
      case "input":
        listenToNonDelegatedEvent("invalid", domElement);
        var defaultValue = propKey = propValue = hasSrcSet = null, checked = null, defaultChecked = null;
        for (hasSrc in props)
          if (props.hasOwnProperty(hasSrc)) {
            var propValue$204 = props[hasSrc];
            if (null != propValue$204)
              switch (hasSrc) {
                case "name":
                  hasSrcSet = propValue$204;
                  break;
                case "type":
                  propValue = propValue$204;
                  break;
                case "checked":
                  checked = propValue$204;
                  break;
                case "defaultChecked":
                  defaultChecked = propValue$204;
                  break;
                case "value":
                  propKey = propValue$204;
                  break;
                case "defaultValue":
                  defaultValue = propValue$204;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (null != propValue$204)
                    throw Error(formatProdErrorMessage(137, tag));
                  break;
                default:
                  setProp(domElement, tag, hasSrc, propValue$204, props, null);
              }
          }
        initInput(
          domElement,
          propKey,
          defaultValue,
          checked,
          defaultChecked,
          propValue,
          hasSrcSet,
          false
        );
        return;
      case "select":
        listenToNonDelegatedEvent("invalid", domElement);
        hasSrc = propValue = propKey = null;
        for (hasSrcSet in props)
          if (props.hasOwnProperty(hasSrcSet) && (defaultValue = props[hasSrcSet], null != defaultValue))
            switch (hasSrcSet) {
              case "value":
                propKey = defaultValue;
                break;
              case "defaultValue":
                propValue = defaultValue;
                break;
              case "multiple":
                hasSrc = defaultValue;
              default:
                setProp(domElement, tag, hasSrcSet, defaultValue, props, null);
            }
        tag = propKey;
        props = propValue;
        domElement.multiple = !!hasSrc;
        null != tag ? updateOptions(domElement, !!hasSrc, tag, false) : null != props && updateOptions(domElement, !!hasSrc, props, true);
        return;
      case "textarea":
        listenToNonDelegatedEvent("invalid", domElement);
        propKey = hasSrcSet = hasSrc = null;
        for (propValue in props)
          if (props.hasOwnProperty(propValue) && (defaultValue = props[propValue], null != defaultValue))
            switch (propValue) {
              case "value":
                hasSrc = defaultValue;
                break;
              case "defaultValue":
                hasSrcSet = defaultValue;
                break;
              case "children":
                propKey = defaultValue;
                break;
              case "dangerouslySetInnerHTML":
                if (null != defaultValue) throw Error(formatProdErrorMessage(91));
                break;
              default:
                setProp(domElement, tag, propValue, defaultValue, props, null);
            }
        initTextarea(domElement, hasSrc, hasSrcSet, propKey);
        return;
      case "option":
        for (checked in props)
          if (props.hasOwnProperty(checked) && (hasSrc = props[checked], null != hasSrc))
            switch (checked) {
              case "selected":
                domElement.selected = hasSrc && "function" !== typeof hasSrc && "symbol" !== typeof hasSrc;
                break;
              default:
                setProp(domElement, tag, checked, hasSrc, props, null);
            }
        return;
      case "dialog":
        listenToNonDelegatedEvent("beforetoggle", domElement);
        listenToNonDelegatedEvent("toggle", domElement);
        listenToNonDelegatedEvent("cancel", domElement);
        listenToNonDelegatedEvent("close", domElement);
        break;
      case "iframe":
      case "object":
        listenToNonDelegatedEvent("load", domElement);
        break;
      case "video":
      case "audio":
        for (hasSrc = 0; hasSrc < mediaEventTypes.length; hasSrc++)
          listenToNonDelegatedEvent(mediaEventTypes[hasSrc], domElement);
        break;
      case "image":
        listenToNonDelegatedEvent("error", domElement);
        listenToNonDelegatedEvent("load", domElement);
        break;
      case "details":
        listenToNonDelegatedEvent("toggle", domElement);
        break;
      case "embed":
      case "source":
      case "link":
        listenToNonDelegatedEvent("error", domElement), listenToNonDelegatedEvent("load", domElement);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (defaultChecked in props)
          if (props.hasOwnProperty(defaultChecked) && (hasSrc = props[defaultChecked], null != hasSrc))
            switch (defaultChecked) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(formatProdErrorMessage(137, tag));
              default:
                setProp(domElement, tag, defaultChecked, hasSrc, props, null);
            }
        return;
      default:
        if (isCustomElement(tag)) {
          for (propValue$204 in props)
            props.hasOwnProperty(propValue$204) && (hasSrc = props[propValue$204], void 0 !== hasSrc && setPropOnCustomElement(
              domElement,
              tag,
              propValue$204,
              hasSrc,
              props,
              void 0
            ));
          return;
        }
    }
    for (defaultValue in props)
      props.hasOwnProperty(defaultValue) && (hasSrc = props[defaultValue], null != hasSrc && setProp(domElement, tag, defaultValue, hasSrc, props, null));
  }
  var emptyProps = {};
  function updateProperties(domElement, tag, lastProps, nextProps) {
    switch (tag) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var name = null, type = null, value = null, defaultValue = null, lastDefaultValue = null, checked = null, defaultChecked = null;
        for (propKey in lastProps) {
          var lastProp = lastProps[propKey];
          if (lastProps.hasOwnProperty(propKey) && null != lastProp)
            switch (propKey) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                lastDefaultValue = lastProp;
              default:
                nextProps.hasOwnProperty(propKey) || setProp(domElement, tag, propKey, null, nextProps, lastProp);
            }
        }
        for (var propKey$221 in nextProps) {
          var propKey = nextProps[propKey$221];
          lastProp = lastProps[propKey$221];
          if (nextProps.hasOwnProperty(propKey$221) && (null != propKey || null != lastProp))
            switch (propKey$221) {
              case "type":
                propKey !== lastProp && (viewTransitionMutationContext = true);
                type = propKey;
                break;
              case "name":
                propKey !== lastProp && (viewTransitionMutationContext = true);
                name = propKey;
                break;
              case "checked":
                propKey !== lastProp && (viewTransitionMutationContext = true);
                checked = propKey;
                break;
              case "defaultChecked":
                propKey !== lastProp && (viewTransitionMutationContext = true);
                defaultChecked = propKey;
                break;
              case "value":
                propKey !== lastProp && (viewTransitionMutationContext = true);
                value = propKey;
                break;
              case "defaultValue":
                propKey !== lastProp && (viewTransitionMutationContext = true);
                defaultValue = propKey;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (null != propKey)
                  throw Error(formatProdErrorMessage(137, tag));
                break;
              default:
                propKey !== lastProp && setProp(
                  domElement,
                  tag,
                  propKey$221,
                  propKey,
                  nextProps,
                  lastProp
                );
            }
        }
        updateInput(
          domElement,
          value,
          defaultValue,
          lastDefaultValue,
          checked,
          defaultChecked,
          type,
          name
        );
        return;
      case "select":
        propKey = value = defaultValue = propKey$221 = null;
        for (type in lastProps)
          if (lastDefaultValue = lastProps[type], lastProps.hasOwnProperty(type) && null != lastDefaultValue)
            switch (type) {
              case "value":
                break;
              case "multiple":
                propKey = lastDefaultValue;
              default:
                nextProps.hasOwnProperty(type) || setProp(
                  domElement,
                  tag,
                  type,
                  null,
                  nextProps,
                  lastDefaultValue
                );
            }
        for (name in nextProps)
          if (type = nextProps[name], lastDefaultValue = lastProps[name], nextProps.hasOwnProperty(name) && (null != type || null != lastDefaultValue))
            switch (name) {
              case "value":
                type !== lastDefaultValue && (viewTransitionMutationContext = true);
                propKey$221 = type;
                break;
              case "defaultValue":
                type !== lastDefaultValue && (viewTransitionMutationContext = true);
                defaultValue = type;
                break;
              case "multiple":
                type !== lastDefaultValue && (viewTransitionMutationContext = true), value = type;
              default:
                type !== lastDefaultValue && setProp(
                  domElement,
                  tag,
                  name,
                  type,
                  nextProps,
                  lastDefaultValue
                );
            }
        tag = defaultValue;
        lastProps = value;
        nextProps = propKey;
        null != propKey$221 ? updateOptions(domElement, !!lastProps, propKey$221, false) : !!nextProps !== !!lastProps && (null != tag ? updateOptions(domElement, !!lastProps, tag, true) : updateOptions(domElement, !!lastProps, lastProps ? [] : "", false));
        return;
      case "textarea":
        propKey = propKey$221 = null;
        for (defaultValue in lastProps)
          if (name = lastProps[defaultValue], lastProps.hasOwnProperty(defaultValue) && null != name && !nextProps.hasOwnProperty(defaultValue))
            switch (defaultValue) {
              case "value":
                break;
              case "children":
                break;
              default:
                setProp(domElement, tag, defaultValue, null, nextProps, name);
            }
        for (value in nextProps)
          if (name = nextProps[value], type = lastProps[value], nextProps.hasOwnProperty(value) && (null != name || null != type))
            switch (value) {
              case "value":
                name !== type && (viewTransitionMutationContext = true);
                propKey$221 = name;
                break;
              case "defaultValue":
                name !== type && (viewTransitionMutationContext = true);
                propKey = name;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (null != name) throw Error(formatProdErrorMessage(91));
                break;
              default:
                name !== type && setProp(domElement, tag, value, name, nextProps, type);
            }
        updateTextarea(domElement, propKey$221, propKey);
        return;
      case "option":
        for (var propKey$237 in lastProps)
          if (propKey$221 = lastProps[propKey$237], lastProps.hasOwnProperty(propKey$237) && null != propKey$221 && !nextProps.hasOwnProperty(propKey$237))
            switch (propKey$237) {
              case "selected":
                domElement.selected = false;
                break;
              default:
                setProp(
                  domElement,
                  tag,
                  propKey$237,
                  null,
                  nextProps,
                  propKey$221
                );
            }
        for (lastDefaultValue in nextProps)
          if (propKey$221 = nextProps[lastDefaultValue], propKey = lastProps[lastDefaultValue], nextProps.hasOwnProperty(lastDefaultValue) && propKey$221 !== propKey && (null != propKey$221 || null != propKey))
            switch (lastDefaultValue) {
              case "selected":
                propKey$221 !== propKey && (viewTransitionMutationContext = true);
                domElement.selected = propKey$221 && "function" !== typeof propKey$221 && "symbol" !== typeof propKey$221;
                break;
              default:
                setProp(
                  domElement,
                  tag,
                  lastDefaultValue,
                  propKey$221,
                  nextProps,
                  propKey
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var propKey$242 in lastProps)
          propKey$221 = lastProps[propKey$242], lastProps.hasOwnProperty(propKey$242) && null != propKey$221 && !nextProps.hasOwnProperty(propKey$242) && setProp(domElement, tag, propKey$242, null, nextProps, propKey$221);
        for (checked in nextProps)
          if (propKey$221 = nextProps[checked], propKey = lastProps[checked], nextProps.hasOwnProperty(checked) && propKey$221 !== propKey && (null != propKey$221 || null != propKey))
            switch (checked) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (null != propKey$221)
                  throw Error(formatProdErrorMessage(137, tag));
                break;
              default:
                setProp(
                  domElement,
                  tag,
                  checked,
                  propKey$221,
                  nextProps,
                  propKey
                );
            }
        return;
      default:
        if (isCustomElement(tag)) {
          for (var propKey$247 in lastProps)
            propKey$221 = lastProps[propKey$247], lastProps.hasOwnProperty(propKey$247) && void 0 !== propKey$221 && !nextProps.hasOwnProperty(propKey$247) && setPropOnCustomElement(
              domElement,
              tag,
              propKey$247,
              void 0,
              nextProps,
              propKey$221
            );
          for (defaultChecked in nextProps)
            propKey$221 = nextProps[defaultChecked], propKey = lastProps[defaultChecked], !nextProps.hasOwnProperty(defaultChecked) || propKey$221 === propKey || void 0 === propKey$221 && void 0 === propKey || setPropOnCustomElement(
              domElement,
              tag,
              defaultChecked,
              propKey$221,
              nextProps,
              propKey
            );
          return;
        }
    }
    for (var propKey$252 in lastProps)
      propKey$221 = lastProps[propKey$252], lastProps.hasOwnProperty(propKey$252) && null != propKey$221 && !nextProps.hasOwnProperty(propKey$252) && setProp(domElement, tag, propKey$252, null, nextProps, propKey$221);
    for (lastProp in nextProps)
      propKey$221 = nextProps[lastProp], propKey = lastProps[lastProp], !nextProps.hasOwnProperty(lastProp) || propKey$221 === propKey || null == propKey$221 && null == propKey || setProp(domElement, tag, lastProp, propKey$221, nextProps, propKey);
  }
  function isLikelyStaticResource(initiatorType) {
    switch (initiatorType) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return true;
      default:
        return false;
    }
  }
  function estimateBandwidth() {
    if ("function" === typeof performance.getEntriesByType) {
      for (var count = 0, bits = 0, resourceEntries = performance.getEntriesByType("resource"), i = 0; i < resourceEntries.length; i++) {
        var entry = resourceEntries[i], transferSize = entry.transferSize, initiatorType = entry.initiatorType, duration = entry.duration;
        if (transferSize && duration && isLikelyStaticResource(initiatorType)) {
          initiatorType = 0;
          duration = entry.responseEnd;
          for (i += 1; i < resourceEntries.length; i++) {
            var overlapEntry = resourceEntries[i], overlapStartTime = overlapEntry.startTime;
            if (overlapStartTime > duration) break;
            var overlapTransferSize = overlapEntry.transferSize, overlapInitiatorType = overlapEntry.initiatorType;
            overlapTransferSize && isLikelyStaticResource(overlapInitiatorType) && (overlapEntry = overlapEntry.responseEnd, initiatorType += overlapTransferSize * (overlapEntry < duration ? 1 : (duration - overlapStartTime) / (overlapEntry - overlapStartTime)));
          }
          --i;
          bits += 8 * (transferSize + initiatorType) / (entry.duration / 1e3);
          count++;
          if (10 < count) break;
        }
      }
      if (0 < count) return bits / count / 1e6;
    }
    return navigator.connection && (count = navigator.connection.downlink, "number" === typeof count) ? count : 5;
  }
  var eventsEnabled = null, selectionInformation = null;
  function getOwnerDocumentFromRootContainer(rootContainerElement) {
    return 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
  }
  function getOwnHostContext(namespaceURI) {
    switch (namespaceURI) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function getChildHostContextProd(parentNamespace, type) {
    if (0 === parentNamespace)
      switch (type) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return 1 === parentNamespace && "foreignObject" === type ? 0 : parentNamespace;
  }
  function createHoistableInstance(type, props, rootContainerInstance, internalInstanceHandle) {
    rootContainerInstance = getOwnerDocumentFromRootContainer(
      rootContainerInstance
    ).createElement(type);
    rootContainerInstance[internalInstanceKey] = internalInstanceHandle;
    rootContainerInstance[internalPropsKey] = props;
    setInitialProperties(rootContainerInstance, type, props);
    markNodeAsHoistable(rootContainerInstance);
    return rootContainerInstance;
  }
  function shouldSetTextContent(type, props) {
    return "textarea" === type || "noscript" === type || "string" === typeof props.children || "number" === typeof props.children || "bigint" === typeof props.children || "object" === typeof props.dangerouslySetInnerHTML && null !== props.dangerouslySetInnerHTML && null != props.dangerouslySetInnerHTML.__html;
  }
  var currentPopstateTransitionEvent = null;
  function shouldAttemptEagerTransition() {
    var event = window.event;
    if (event && "popstate" === event.type) {
      if (event === currentPopstateTransitionEvent) return false;
      currentPopstateTransitionEvent = event;
      return true;
    }
    currentPopstateTransitionEvent = null;
    return false;
  }
  var scheduleTimeout = "function" === typeof setTimeout ? setTimeout : void 0, cancelTimeout = "function" === typeof clearTimeout ? clearTimeout : void 0, localPromise = "function" === typeof Promise ? Promise : void 0, localRequestAnimationFrame = "function" === typeof requestAnimationFrame ? requestAnimationFrame : scheduleTimeout, scheduleMicrotask = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof localPromise ? function(callback) {
    return localPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
  } : scheduleTimeout;
  function handleErrorInNextTick(error) {
    setTimeout(function() {
      throw error;
    });
  }
  function isSingletonScope(type) {
    return "head" === type;
  }
  function clearHydrationBoundary(parentInstance, hydrationInstance) {
    var node = hydrationInstance, depth = 0;
    do {
      var nextNode = node.nextSibling;
      parentInstance.removeChild(node);
      if (nextNode && 8 === nextNode.nodeType)
        if (node = nextNode.data, "/$" === node || "/&" === node) {
          if (0 === depth) {
            parentInstance.removeChild(nextNode);
            retryIfBlockedOn(hydrationInstance);
            return;
          }
          depth--;
        } else if ("$" === node || "$?" === node || "$~" === node || "$!" === node || "&" === node)
          depth++;
        else if ("html" === node)
          clearSingletonPreambleContribution(
            parentInstance.ownerDocument.documentElement
          );
        else if ("head" === node) {
          node = parentInstance.ownerDocument.head;
          clearSingletonPreambleContribution(node);
          for (var node$jscomp$0 = node.firstChild; node$jscomp$0; ) {
            var nextNode$jscomp$0 = node$jscomp$0.nextSibling, nodeName = node$jscomp$0.nodeName;
            node$jscomp$0[internalHoistableMarker] || "SCRIPT" === nodeName || "STYLE" === nodeName || "LINK" === nodeName && "stylesheet" === node$jscomp$0.rel.toLowerCase() || node.removeChild(node$jscomp$0);
            node$jscomp$0 = nextNode$jscomp$0;
          }
        } else
          "body" === node && clearSingletonPreambleContribution(parentInstance.ownerDocument.body);
      node = nextNode;
    } while (node);
    retryIfBlockedOn(hydrationInstance);
  }
  function hideOrUnhideDehydratedBoundary(suspenseInstance, isHidden) {
    var node = suspenseInstance;
    suspenseInstance = 0;
    do {
      var nextNode = node.nextSibling;
      1 === node.nodeType ? isHidden ? (node._stashedDisplay = node.style.display, node.style.display = "none") : (node.style.display = node._stashedDisplay || "", "" === node.getAttribute("style") && node.removeAttribute("style")) : 3 === node.nodeType && (isHidden ? (node._stashedText = node.nodeValue, node.nodeValue = "") : node.nodeValue = node._stashedText || "");
      if (nextNode && 8 === nextNode.nodeType)
        if (node = nextNode.data, "/$" === node)
          if (0 === suspenseInstance) break;
          else suspenseInstance--;
        else
          "$" !== node && "$?" !== node && "$~" !== node && "$!" !== node || suspenseInstance++;
      node = nextNode;
    } while (node);
  }
  function applyViewTransitionName(instance, name, className) {
    name = CSS.escape(name) !== name ? "r-" + btoa(name).replace(/=/g, "") : name;
    instance.style.viewTransitionName = name;
    null != className && (instance.style.viewTransitionClass = className);
    className = getComputedStyle(instance);
    if ("inline" === className.display) {
      name = instance.getClientRects();
      if (1 === name.length) var JSCompiler_inline_result = 1;
      else
        for (var i = JSCompiler_inline_result = 0; i < name.length; i++) {
          var rect = name[i];
          0 < rect.width && 0 < rect.height && JSCompiler_inline_result++;
        }
      1 === JSCompiler_inline_result && (instance = instance.style, instance.display = 1 === name.length ? "inline-block" : "block", instance.marginTop = "-" + className.paddingTop, instance.marginBottom = "-" + className.paddingBottom);
    }
  }
  function restoreViewTransitionName(instance, props) {
    instance = instance.style;
    props = props.style;
    var viewTransitionName = null != props ? props.hasOwnProperty("viewTransitionName") ? props.viewTransitionName : props.hasOwnProperty("view-transition-name") ? props["view-transition-name"] : null : null;
    instance.viewTransitionName = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : ("" + viewTransitionName).trim();
    viewTransitionName = null != props ? props.hasOwnProperty("viewTransitionClass") ? props.viewTransitionClass : props.hasOwnProperty("view-transition-class") ? props["view-transition-class"] : null : null;
    instance.viewTransitionClass = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : ("" + viewTransitionName).trim();
    "inline-block" === instance.display && (null == props ? instance.display = instance.margin = "" : (viewTransitionName = props.display, instance.display = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : viewTransitionName, viewTransitionName = props.margin, null != viewTransitionName ? instance.margin = viewTransitionName : (viewTransitionName = props.hasOwnProperty("marginTop") ? props.marginTop : props["margin-top"], instance.marginTop = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : viewTransitionName, props = props.hasOwnProperty("marginBottom") ? props.marginBottom : props["margin-bottom"], instance.marginBottom = null == props || "boolean" === typeof props ? "" : props)));
  }
  function createMeasurement(rect, computedStyle, element) {
    element = element.ownerDocument.defaultView;
    return {
      rect,
      abs: "absolute" === computedStyle.position || "fixed" === computedStyle.position,
      clip: "none" !== computedStyle.clipPath || "visible" !== computedStyle.overflow || "none" !== computedStyle.filter || "none" !== computedStyle.mask || "none" !== computedStyle.mask || "0px" !== computedStyle.borderRadius,
      view: 0 <= rect.bottom && 0 <= rect.right && rect.top <= element.innerHeight && rect.left <= element.innerWidth
    };
  }
  function measureInstance(instance) {
    var rect = instance.getBoundingClientRect(), computedStyle = getComputedStyle(instance);
    return createMeasurement(rect, computedStyle, instance);
  }
  function forceLayout(ownerDocument) {
    return ownerDocument.documentElement.clientHeight;
  }
  function waitForImageToLoad(resolve) {
    this.addEventListener("load", resolve);
    this.addEventListener("error", resolve);
  }
  function startViewTransition(suspendedState, rootContainer, transitionTypes, mutationCallback, layoutCallback, afterMutationCallback, spawnedWorkCallback, passiveCallback, errorCallback) {
    var ownerDocument = 9 === rootContainer.nodeType ? rootContainer : rootContainer.ownerDocument;
    try {
      var transition = ownerDocument.startViewTransition({
        update: function() {
          var ownerWindow = ownerDocument.defaultView, pendingNavigation = ownerWindow.navigation && ownerWindow.navigation.transition, previousFontLoadingStatus = ownerDocument.fonts.status;
          mutationCallback();
          var blockingPromises = [];
          "loaded" === previousFontLoadingStatus && (forceLayout(ownerDocument), "loading" === ownerDocument.fonts.status && blockingPromises.push(ownerDocument.fonts.ready));
          previousFontLoadingStatus = blockingPromises.length;
          if (null !== suspendedState)
            for (var suspenseyImages = suspendedState.suspenseyImages, imgBytes = 0, i = 0; i < suspenseyImages.length; i++) {
              var suspenseyImage = suspenseyImages[i];
              if (!suspenseyImage.complete) {
                var rect = suspenseyImage.getBoundingClientRect();
                if (0 < rect.bottom && 0 < rect.right && rect.top < ownerWindow.innerHeight && rect.left < ownerWindow.innerWidth) {
                  imgBytes += estimateImageBytes(suspenseyImage);
                  if (imgBytes > estimatedBytesWithinLimit) {
                    blockingPromises.length = previousFontLoadingStatus;
                    break;
                  }
                  suspenseyImage = new Promise(
                    waitForImageToLoad.bind(suspenseyImage)
                  );
                  blockingPromises.push(suspenseyImage);
                }
              }
            }
          if (0 < blockingPromises.length)
            return ownerWindow = Promise.race([
              Promise.all(blockingPromises),
              new Promise(function(resolve) {
                return setTimeout(resolve, 500);
              })
            ]).then(layoutCallback, layoutCallback), (pendingNavigation ? Promise.allSettled([pendingNavigation.finished, ownerWindow]) : ownerWindow).then(afterMutationCallback, afterMutationCallback);
          layoutCallback();
          if (pendingNavigation)
            return pendingNavigation.finished.then(
              afterMutationCallback,
              afterMutationCallback
            );
          afterMutationCallback();
        },
        types: transitionTypes
      });
      ownerDocument.__reactViewTransition = transition;
      var viewTransitionAnimations = [];
      transition.ready.then(
        function() {
          for (var animations = ownerDocument.documentElement.getAnimations({
            subtree: true
          }), i = 0; i < animations.length; i++) {
            var animation = animations[i], effect = animation.effect, pseudoElement = effect.pseudoElement;
            if (null != pseudoElement && pseudoElement.startsWith("::view-transition")) {
              viewTransitionAnimations.push(animation);
              animation = effect.getKeyframes();
              for (var height = pseudoElement = void 0, unchangedDimensions = true, j = 0; j < animation.length; j++) {
                var keyframe = animation[j], w = keyframe.width;
                if (void 0 === pseudoElement) pseudoElement = w;
                else if (pseudoElement !== w) {
                  unchangedDimensions = false;
                  break;
                }
                w = keyframe.height;
                if (void 0 === height) height = w;
                else if (height !== w) {
                  unchangedDimensions = false;
                  break;
                }
                delete keyframe.width;
                delete keyframe.height;
                "none" === keyframe.transform && delete keyframe.transform;
              }
              unchangedDimensions && void 0 !== pseudoElement && void 0 !== height && (effect.setKeyframes(animation), unchangedDimensions = getComputedStyle(
                effect.target,
                effect.pseudoElement
              ), unchangedDimensions.width !== pseudoElement || unchangedDimensions.height !== height) && (unchangedDimensions = animation[0], unchangedDimensions.width = pseudoElement, unchangedDimensions.height = height, unchangedDimensions = animation[animation.length - 1], unchangedDimensions.width = pseudoElement, unchangedDimensions.height = height, effect.setKeyframes(animation));
            }
          }
          spawnedWorkCallback();
        },
        function(error) {
          ownerDocument.__reactViewTransition === transition && (ownerDocument.__reactViewTransition = null);
          try {
            if ("object" === typeof error && null !== error)
              switch (error.name) {
                case "InvalidStateError":
                  if ("View transition was skipped because document visibility state is hidden." === error.message || "Skipping view transition because document visibility state has become hidden." === error.message || "Skipping view transition because viewport size changed." === error.message || "Transition was aborted because of invalid state" === error.message)
                    error = null;
              }
            null !== error && errorCallback(error);
          } finally {
            mutationCallback(), layoutCallback(), spawnedWorkCallback();
          }
        }
      );
      transition.finished.finally(function() {
        for (var i = 0; i < viewTransitionAnimations.length; i++)
          viewTransitionAnimations[i].cancel();
        ownerDocument.__reactViewTransition === transition && (ownerDocument.__reactViewTransition = null);
        passiveCallback();
      });
      return transition;
    } catch (x) {
      return mutationCallback(), layoutCallback(), spawnedWorkCallback(), null;
    }
  }
  function ViewTransitionPseudoElement(pseudo, name) {
    this._scope = document.documentElement;
    this._selector = "::view-transition-" + pseudo + "(" + name + ")";
  }
  ViewTransitionPseudoElement.prototype.animate = function(keyframes, options2) {
    options2 = "number" === typeof options2 ? { duration: options2 } : assign({}, options2);
    options2.pseudoElement = this._selector;
    return this._scope.animate(keyframes, options2);
  };
  ViewTransitionPseudoElement.prototype.getAnimations = function() {
    for (var scope = this._scope, selector = this._selector, animations = scope.getAnimations({ subtree: true }), result = [], i = 0; i < animations.length; i++) {
      var effect = animations[i].effect;
      null !== effect && effect.target === scope && effect.pseudoElement === selector && result.push(animations[i]);
    }
    return result;
  };
  ViewTransitionPseudoElement.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function createViewTransitionInstance(name) {
    return {
      name,
      group: new ViewTransitionPseudoElement("group", name),
      imagePair: new ViewTransitionPseudoElement("image-pair", name),
      old: new ViewTransitionPseudoElement("old", name),
      new: new ViewTransitionPseudoElement("new", name)
    };
  }
  function FragmentInstance(fragmentFiber) {
    this._fragmentFiber = fragmentFiber;
    this._observers = this._eventListeners = null;
  }
  FragmentInstance.prototype.addEventListener = function(type, listener, optionsOrUseCapture) {
    var signal = null, cleanup = null;
    if (null != optionsOrUseCapture && "boolean" !== typeof optionsOrUseCapture && (signal = optionsOrUseCapture.signal || null, null !== signal && signal.aborted))
      return;
    null === this._eventListeners && (this._eventListeners = []);
    var listeners = this._eventListeners;
    if (-1 === indexOfEventListener(listeners, type, listener, optionsOrUseCapture)) {
      var fragmentInstance = this, attachedListener = listener;
      null != optionsOrUseCapture && "boolean" !== typeof optionsOrUseCapture && true === optionsOrUseCapture.once && (attachedListener = function(event) {
        fragmentInstance.removeEventListener(
          type,
          listener,
          optionsOrUseCapture
        );
        "function" === typeof listener ? listener.call(this, event) : listener.handleEvent(event);
      });
      null !== signal && (cleanup = fragmentInstance.removeEventListener.bind(
        fragmentInstance,
        type,
        listener,
        optionsOrUseCapture
      ), signal.addEventListener("abort", cleanup, { once: true }), cleanup = signal.removeEventListener.bind(signal, "abort", cleanup));
      signal = getAttachOptions(optionsOrUseCapture);
      listeners.push({
        type,
        listener,
        optionsOrUseCapture,
        attachedListener,
        cleanup
      });
      traverseVisibleInstancesAndTextInstances(
        this._fragmentFiber.child,
        false,
        addEventListenerToChild,
        type,
        attachedListener,
        signal
      );
    }
    this._eventListeners = listeners;
  };
  function addEventListenerToChild(child, type, listener, optionsOrUseCapture) {
    getInstanceFromHostFiber(child).addEventListener(
      type,
      listener,
      optionsOrUseCapture
    );
    return false;
  }
  FragmentInstance.prototype.removeEventListener = function(type, listener, optionsOrUseCapture) {
    var listeners = this._eventListeners;
    if (null !== listeners && (listener = indexOfEventListener(
      listeners,
      type,
      listener,
      optionsOrUseCapture
    ), -1 !== listener)) {
      var _listeners$index = listeners[listener];
      optionsOrUseCapture = _listeners$index.attachedListener;
      var cleanup = _listeners$index.cleanup;
      _listeners$index = getAttachOptions(_listeners$index.optionsOrUseCapture);
      traverseVisibleInstancesAndTextInstances(
        this._fragmentFiber.child,
        false,
        removeEventListenerFromChild,
        type,
        optionsOrUseCapture,
        _listeners$index
      );
      listeners.splice(listener, 1);
      null !== cleanup && cleanup();
    }
  };
  function removeEventListenerFromChild(child, type, listener, optionsOrUseCapture) {
    getInstanceFromHostFiber(child).removeEventListener(
      type,
      listener,
      optionsOrUseCapture
    );
    return false;
  }
  function getAttachOptions(opts) {
    return null != opts && "boolean" !== typeof opts && (true === opts.once || opts.signal instanceof AbortSignal) ? { capture: opts.capture, passive: opts.passive } : opts;
  }
  function normalizeListenerOptions(opts) {
    return null == opts ? "c=0" : "boolean" === typeof opts ? "c=" + (opts ? "1" : "0") : "c=" + (opts.capture ? "1" : "0");
  }
  function indexOfEventListener(eventListeners, type, listener, optionsOrUseCapture) {
    if (0 === eventListeners.length) return -1;
    optionsOrUseCapture = normalizeListenerOptions(optionsOrUseCapture);
    for (var i = 0; i < eventListeners.length; i++) {
      var item = eventListeners[i];
      if (item.type === type && item.listener === listener && normalizeListenerOptions(item.optionsOrUseCapture) === optionsOrUseCapture)
        return i;
    }
    return -1;
  }
  FragmentInstance.prototype.dispatchEvent = function(event) {
    var parentHostFiber = getFragmentParentInstanceOrContainerFiber(
      this._fragmentFiber
    );
    if (null === parentHostFiber) return true;
    parentHostFiber = getInstanceFromHostFiber(parentHostFiber);
    var eventListeners = this._eventListeners;
    if (null !== eventListeners && 0 < eventListeners.length || !event.bubbles) {
      var temp = 9 === parentHostFiber.nodeType ? parentHostFiber.createComment("") : document.createTextNode("");
      if (eventListeners)
        for (var i = 0; i < eventListeners.length; i++) {
          var _eventListeners$i = eventListeners[i];
          temp.addEventListener(
            _eventListeners$i.type,
            _eventListeners$i.attachedListener,
            getAttachOptions(_eventListeners$i.optionsOrUseCapture)
          );
        }
      parentHostFiber.appendChild(temp);
      event = temp.dispatchEvent(event);
      if (eventListeners)
        for (i = 0; i < eventListeners.length; i++)
          _eventListeners$i = eventListeners[i], temp.removeEventListener(
            _eventListeners$i.type,
            _eventListeners$i.attachedListener,
            getAttachOptions(_eventListeners$i.optionsOrUseCapture)
          );
      parentHostFiber.removeChild(temp);
      return event;
    }
    return parentHostFiber.dispatchEvent(event);
  };
  FragmentInstance.prototype.focus = function(focusOptions) {
    traverseVisibleInstancesAndTextInstances(
      this._fragmentFiber.child,
      true,
      setFocusOnFiberIfFocusable,
      focusOptions,
      void 0,
      void 0
    );
  };
  function setFocusOnFiberIfFocusable(fiber, focusOptions) {
    if (6 === fiber.tag) return false;
    fiber = getInstanceFromHostFiber(fiber);
    return setFocusIfFocusable(fiber, focusOptions);
  }
  FragmentInstance.prototype.focusLast = function(focusOptions) {
    var children = [];
    traverseVisibleInstancesAndTextInstances(
      this._fragmentFiber.child,
      true,
      collectChildren,
      children,
      void 0,
      void 0
    );
    for (var i = children.length - 1; 0 <= i && !setFocusOnFiberIfFocusable(children[i], focusOptions); i--) ;
  };
  function collectChildren(child, collection) {
    collection.push(child);
    return false;
  }
  FragmentInstance.prototype.blur = function() {
    var parentHostFiber = getFragmentParentInstanceOrContainerFiber(
      this._fragmentFiber
    );
    null !== parentHostFiber && (parentHostFiber = getInstanceFromHostFiber(parentHostFiber), parentHostFiber = getOwnerDocumentFromRootContainer(parentHostFiber).activeElement, null !== parentHostFiber && traverseVisibleInstancesAndTextInstances(
      this._fragmentFiber.child,
      false,
      blurActiveElementWithinFragment,
      parentHostFiber,
      void 0,
      void 0
    ));
  };
  function blurActiveElementWithinFragment(child, activeElement2) {
    if (6 === child.tag) return false;
    child = getInstanceFromHostFiber(child);
    return child === activeElement2 || child.contains(activeElement2) ? (activeElement2.blur(), true) : false;
  }
  FragmentInstance.prototype.observeUsing = function(observer) {
    null === this._observers && (this._observers = /* @__PURE__ */ new Set());
    this._observers.add(observer);
    traverseVisibleInstancesAndTextInstances(
      this._fragmentFiber.child,
      false,
      observeChild,
      observer,
      void 0,
      void 0
    );
  };
  function observeChild(child, observer) {
    if (6 === child.tag) return false;
    child = getInstanceFromHostFiber(child);
    observer.observe(child);
    return false;
  }
  FragmentInstance.prototype.unobserveUsing = function(observer) {
    var observers = this._observers;
    if (null !== observers && observers.has(observer)) {
      observers.delete(observer);
      traverseVisibleInstancesAndTextInstances(
        this._fragmentFiber.child,
        false,
        unobserveChild,
        observer,
        void 0,
        void 0
      );
      for (var i = observers = 0; i < pendingIntersectionUnobserves.length; i++) {
        var pending = pendingIntersectionUnobserves[i];
        pending.fragmentInstance === this && pending.observer === observer ? observer.unobserve(pending.instance) : pendingIntersectionUnobserves[observers++] = pending;
      }
      pendingIntersectionUnobserves.length = observers;
    }
  };
  function unobserveChild(child, observer) {
    if (6 === child.tag) return false;
    child = getInstanceFromHostFiber(child);
    observer.unobserve(child);
    return false;
  }
  var pendingIntersectionUnobserves = [], intersectionUnobserveScheduled = false;
  function schedulePendingIntersectionUnobserve(fragmentInstance, observer, instance) {
    pendingIntersectionUnobserves.push({
      fragmentInstance,
      observer,
      instance
    });
    intersectionUnobserveScheduled || (intersectionUnobserveScheduled = true, requestPostPaintCallback(function() {
      intersectionUnobserveScheduled = false;
      var pending = pendingIntersectionUnobserves;
      pendingIntersectionUnobserves = [];
      for (var i = 0; i < pending.length; i++) {
        var item = pending[i];
        item.observer.unobserve(item.instance);
      }
    }));
  }
  FragmentInstance.prototype.getClientRects = function() {
    var rects = [];
    traverseVisibleInstancesAndTextInstances(
      this._fragmentFiber.child,
      false,
      collectClientRects,
      rects,
      void 0,
      void 0
    );
    return rects;
  };
  function collectClientRects(child, rects) {
    if (6 === child.tag) {
      child = child.stateNode;
      var range = child.ownerDocument.createRange();
      range.selectNodeContents(child);
      rects.push.apply(rects, range.getClientRects());
    } else
      child = getInstanceFromHostFiber(child), rects.push.apply(rects, child.getClientRects());
    return false;
  }
  FragmentInstance.prototype.getRootNode = function(getRootNodeOptions) {
    var parentHostFiber = getFragmentParentInstanceOrContainerFiber(
      this._fragmentFiber
    );
    return null === parentHostFiber ? this : getInstanceFromHostFiber(parentHostFiber).getRootNode(getRootNodeOptions);
  };
  FragmentInstance.prototype.compareDocumentPosition = function(otherNode) {
    var parentHostFiber = getFragmentParentInstanceOrContainerFiber(
      this._fragmentFiber
    );
    if (null === parentHostFiber) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var children = [];
    traverseVisibleInstancesAndTextInstances(
      this._fragmentFiber.child,
      false,
      collectChildren,
      children,
      void 0,
      void 0
    );
    var parentHostInstance = getInstanceFromHostFiber(parentHostFiber);
    if (0 === children.length) {
      children = parentHostInstance;
      if (fiberIsPortaledIntoHost(this._fragmentFiber)) {
        a: {
          for (parentHostFiber = this._fragmentFiber.return; null !== parentHostFiber; ) {
            if (4 === parentHostFiber.tag) {
              parentHostFiber = parentHostFiber.stateNode.containerInfo;
              break a;
            }
            if (3 === parentHostFiber.tag || 5 === parentHostFiber.tag || 27 === parentHostFiber.tag)
              break;
            parentHostFiber = parentHostFiber.return;
          }
          parentHostFiber = null;
        }
        null != parentHostFiber && (children = parentHostFiber);
      }
      parentHostFiber = this._fragmentFiber;
      var result = parentHostInstance = children.compareDocumentPosition(otherNode);
      children === otherNode ? result = Node.DOCUMENT_POSITION_CONTAINS : parentHostInstance & Node.DOCUMENT_POSITION_CONTAINED_BY && (children = getFragmentInstanceOrTextInstanceSiblings(parentHostFiber)[1], null === children ? result = Node.DOCUMENT_POSITION_PRECEDING : (otherNode = getInstanceFromHostFiber(children).compareDocumentPosition(
        otherNode
      ), result = 0 === otherNode || otherNode & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING));
      return result |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    parentHostFiber = getInstanceFromHostFiber(children[0]);
    result = getInstanceFromHostFiber(children[children.length - 1]);
    var parentHostInstanceFromDOM = fiberIsPortaledIntoHost(this._fragmentFiber) ? parentHostFiber.parentElement : parentHostInstance;
    if (null == parentHostInstanceFromDOM)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    parentHostInstance = parentHostInstanceFromDOM.compareDocumentPosition(parentHostFiber) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    parentHostInstanceFromDOM = parentHostInstanceFromDOM.compareDocumentPosition(result) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var firstResult = parentHostFiber.compareDocumentPosition(otherNode), lastResult = result.compareDocumentPosition(otherNode), otherNodeIsWithinFirstOrLastChild = firstResult & Node.DOCUMENT_POSITION_CONTAINED_BY || lastResult & Node.DOCUMENT_POSITION_CONTAINED_BY;
    lastResult = parentHostInstance && parentHostInstanceFromDOM && firstResult & Node.DOCUMENT_POSITION_FOLLOWING && lastResult & Node.DOCUMENT_POSITION_PRECEDING;
    parentHostFiber = parentHostInstance && parentHostFiber === otherNode || parentHostInstanceFromDOM && result === otherNode || otherNodeIsWithinFirstOrLastChild || lastResult ? Node.DOCUMENT_POSITION_CONTAINED_BY : !parentHostInstance && parentHostFiber === otherNode || !parentHostInstanceFromDOM && result === otherNode ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : firstResult;
    return parentHostFiber & Node.DOCUMENT_POSITION_DISCONNECTED || parentHostFiber & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || validateDocumentPositionWithFiberTree(
      parentHostFiber,
      this._fragmentFiber,
      children[0],
      children[children.length - 1],
      otherNode
    ) ? parentHostFiber : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function validateDocumentPositionWithFiberTree(documentPosition, fragmentFiber, precedingBoundaryFiber, followingBoundaryFiber, otherNode) {
    var otherFiber = getClosestInstanceFromNode(otherNode);
    if (documentPosition & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (precedingBoundaryFiber = !!otherFiber)
        a: {
          for (; null !== otherFiber; ) {
            if (7 === otherFiber.tag && (otherFiber === fragmentFiber || otherFiber.alternate === fragmentFiber)) {
              precedingBoundaryFiber = true;
              break a;
            }
            otherFiber = otherFiber.return;
          }
          precedingBoundaryFiber = false;
        }
      return precedingBoundaryFiber;
    }
    if (documentPosition & Node.DOCUMENT_POSITION_CONTAINS) {
      if (null === otherFiber)
        return otherFiber = otherNode.ownerDocument, otherNode === otherFiber || otherNode === otherFiber.documentElement || otherNode === otherFiber.body;
      a: {
        otherFiber = fragmentFiber;
        for (fragmentFiber = getFragmentParentInstanceOrContainerFiber(fragmentFiber); null !== otherFiber; ) {
          if (!(5 !== otherFiber.tag && 3 !== otherFiber.tag && 27 !== otherFiber.tag || otherFiber !== fragmentFiber && otherFiber.alternate !== fragmentFiber)) {
            otherFiber = true;
            break a;
          }
          otherFiber = otherFiber.return;
        }
        otherFiber = false;
      }
      return otherFiber;
    }
    return documentPosition & Node.DOCUMENT_POSITION_PRECEDING ? ((fragmentFiber = !!otherFiber) && !(fragmentFiber = otherFiber === precedingBoundaryFiber) && (fragmentFiber = getLowestCommonAncestor(
      precedingBoundaryFiber,
      otherFiber,
      getParentForFragmentAncestors
    ), null === fragmentFiber ? fragmentFiber = false : (traverseVisibleInstancesAndTextInstances(
      fragmentFiber,
      true,
      isFiberPrecedingCheck,
      otherFiber,
      precedingBoundaryFiber
    ), otherFiber = searchTarget, searchTarget = null, fragmentFiber = null !== otherFiber)), fragmentFiber) : documentPosition & Node.DOCUMENT_POSITION_FOLLOWING ? ((fragmentFiber = !!otherFiber) && !(fragmentFiber = otherFiber === followingBoundaryFiber) && (fragmentFiber = getLowestCommonAncestor(
      followingBoundaryFiber,
      otherFiber,
      getParentForFragmentAncestors
    ), null === fragmentFiber ? fragmentFiber = false : (traverseVisibleInstancesAndTextInstances(
      fragmentFiber,
      true,
      isFiberFollowingCheck,
      otherFiber,
      followingBoundaryFiber
    ), otherFiber = searchTarget, searchBoundary = searchTarget = null, fragmentFiber = null !== otherFiber)), fragmentFiber) : false;
  }
  function scrollTextNodeIntoView(textNode, resolvedAlignToTop) {
    var range = textNode.ownerDocument.createRange();
    range.selectNodeContents(textNode);
    textNode = range.getBoundingClientRect();
    window.scrollTo(
      window.scrollX + textNode.left,
      resolvedAlignToTop ? window.scrollY + textNode.top : window.scrollY + textNode.bottom - window.innerHeight
    );
  }
  FragmentInstance.prototype.scrollIntoView = function(alignToTop) {
    if ("object" === typeof alignToTop) throw Error(formatProdErrorMessage(566));
    var children = [];
    traverseVisibleInstancesAndTextInstances(
      this._fragmentFiber.child,
      false,
      collectChildren,
      children,
      void 0,
      void 0
    );
    var resolvedAlignToTop = false !== alignToTop;
    if (0 === children.length) {
      var hostSiblings = getFragmentInstanceOrTextInstanceSiblings(
        this._fragmentFiber
      );
      hostSiblings = resolvedAlignToTop ? hostSiblings[1] || hostSiblings[0] || getFragmentParentInstanceOrContainerFiber(this._fragmentFiber) : hostSiblings[0] || hostSiblings[1];
      if (null === hostSiblings) return;
      if (6 === hostSiblings.tag) {
        alignToTop = getInstanceFromHostFiber(hostSiblings);
        scrollTextNodeIntoView(alignToTop, resolvedAlignToTop);
        return;
      }
      hostSiblings = getInstanceFromHostFiber(hostSiblings);
      if (9 !== hostSiblings.nodeType) {
        if (11 === hostSiblings.nodeType) {
          resolvedAlignToTop = "host" in hostSiblings ? hostSiblings.host : null;
          null !== resolvedAlignToTop && resolvedAlignToTop.scrollIntoView(alignToTop);
          return;
        }
        hostSiblings.scrollIntoView(alignToTop);
      }
    }
    for (hostSiblings = resolvedAlignToTop ? children.length - 1 : 0; hostSiblings !== (resolvedAlignToTop ? -1 : children.length); ) {
      var child = children[hostSiblings];
      6 === child.tag ? (child = getInstanceFromHostFiber(child), scrollTextNodeIntoView(child, resolvedAlignToTop)) : getInstanceFromHostFiber(child).scrollIntoView(alignToTop);
      hostSiblings += resolvedAlignToTop ? -1 : 1;
    }
  };
  function addFragmentHandleToFiber(child, fragmentInstance) {
    child = getInstanceFromHostFiber(child);
    addFragmentHandleToInstance(child, fragmentInstance);
    return false;
  }
  function addFragmentHandleToInstance(instance, fragmentInstance) {
    null == instance.reactFragments && (instance.reactFragments = /* @__PURE__ */ new Set());
    instance.reactFragments.add(fragmentInstance);
  }
  function commitNewChildToFragmentInstance(childInstance, fragmentInstance) {
    var eventListeners = fragmentInstance._eventListeners;
    if (null !== eventListeners)
      for (var i$jscomp$0 = 0; i$jscomp$0 < eventListeners.length; i$jscomp$0++) {
        var _eventListeners$i3 = eventListeners[i$jscomp$0];
        childInstance.addEventListener(
          _eventListeners$i3.type,
          _eventListeners$i3.attachedListener,
          getAttachOptions(_eventListeners$i3.optionsOrUseCapture)
        );
      }
    3 !== childInstance.nodeType && (eventListeners = fragmentInstance._observers, null !== eventListeners && eventListeners.forEach(function(observer) {
      for (var writeIdx = 0, i = 0; i < pendingIntersectionUnobserves.length; i++) {
        var pending = pendingIntersectionUnobserves[i];
        if (pending.fragmentInstance !== fragmentInstance || pending.observer !== observer || pending.instance !== childInstance)
          pendingIntersectionUnobserves[writeIdx++] = pending;
      }
      pendingIntersectionUnobserves.length = writeIdx;
      observer.observe(childInstance);
    }), addFragmentHandleToInstance(childInstance, fragmentInstance));
  }
  function deleteChildFromFragmentInstance(childInstance, fragmentInstance) {
    var eventListeners = fragmentInstance._eventListeners;
    if (null !== eventListeners)
      for (var i = 0; i < eventListeners.length; i++) {
        var _eventListeners$i4 = eventListeners[i];
        childInstance.removeEventListener(
          _eventListeners$i4.type,
          _eventListeners$i4.attachedListener,
          getAttachOptions(_eventListeners$i4.optionsOrUseCapture)
        );
      }
    3 !== childInstance.nodeType && (eventListeners = fragmentInstance._observers, null !== eventListeners && eventListeners.forEach(function(observer) {
      "string" === typeof observer.rootMargin ? schedulePendingIntersectionUnobserve(
        fragmentInstance,
        observer,
        childInstance
      ) : observer.unobserve(childInstance);
    }), null != childInstance.reactFragments && childInstance.reactFragments.delete(fragmentInstance));
  }
  function clearContainerSparingly(container) {
    var nextNode = container.firstChild;
    nextNode && 10 === nextNode.nodeType && (nextNode = nextNode.nextSibling);
    for (; nextNode; ) {
      var node = nextNode;
      nextNode = nextNode.nextSibling;
      switch (node.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          clearContainerSparingly(node);
          detachDeletedInstance(node);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if ("stylesheet" === node.rel.toLowerCase()) continue;
      }
      container.removeChild(node);
    }
  }
  function canHydrateInstance(instance, type, props, inRootOrSingleton) {
    for (; 1 === instance.nodeType; ) {
      var anyProps = props;
      if (instance.nodeName.toLowerCase() !== type.toLowerCase()) {
        if (!inRootOrSingleton && ("INPUT" !== instance.nodeName || "hidden" !== instance.type))
          break;
      } else if (!inRootOrSingleton)
        if ("input" === type && "hidden" === instance.type) {
          var name = null == anyProps.name ? null : "" + anyProps.name;
          if ("hidden" === anyProps.type && instance.getAttribute("name") === name)
            return instance;
        } else return instance;
      else if (!instance[internalHoistableMarker])
        switch (type) {
          case "meta":
            if (!instance.hasAttribute("itemprop")) break;
            return instance;
          case "link":
            name = instance.getAttribute("rel");
            if ("stylesheet" === name && instance.hasAttribute("data-precedence"))
              break;
            else if (name !== anyProps.rel || instance.getAttribute("href") !== (null == anyProps.href || "" === anyProps.href ? null : anyProps.href) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin) || instance.getAttribute("title") !== (null == anyProps.title ? null : anyProps.title))
              break;
            return instance;
          case "style":
            if (instance.hasAttribute("data-precedence")) break;
            return instance;
          case "script":
            name = instance.getAttribute("src");
            if ((name !== (null == anyProps.src ? null : anyProps.src) || instance.getAttribute("type") !== (null == anyProps.type ? null : anyProps.type) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin)) && name && instance.hasAttribute("async") && !instance.hasAttribute("itemprop"))
              break;
            return instance;
          default:
            return instance;
        }
      instance = getNextHydratable(instance.nextSibling);
      if (null === instance) break;
    }
    return null;
  }
  function canHydrateTextInstance(instance, text, inRootOrSingleton) {
    if ("" === text) return null;
    for (; 3 !== instance.nodeType; ) {
      if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton)
        return null;
      instance = getNextHydratable(instance.nextSibling);
      if (null === instance) return null;
    }
    return instance;
  }
  function canHydrateHydrationBoundary(instance, inRootOrSingleton) {
    for (; 8 !== instance.nodeType; ) {
      if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton)
        return null;
      instance = getNextHydratable(instance.nextSibling);
      if (null === instance) return null;
    }
    return instance;
  }
  function isSuspenseInstancePending(instance) {
    return "$?" === instance.data || "$~" === instance.data;
  }
  function isSuspenseInstanceFallback(instance) {
    return "$!" === instance.data || "$?" === instance.data && "loading" !== instance.ownerDocument.readyState;
  }
  function registerSuspenseInstanceRetry(instance, callback) {
    var ownerDocument = instance.ownerDocument;
    if ("$~" === instance.data) instance._reactRetry = callback;
    else if ("$?" !== instance.data || "loading" !== ownerDocument.readyState)
      callback();
    else {
      var listener = function() {
        callback();
        ownerDocument.removeEventListener("DOMContentLoaded", listener);
      };
      ownerDocument.addEventListener("DOMContentLoaded", listener);
      instance._reactRetry = listener;
    }
  }
  function getNextHydratable(node) {
    for (; null != node; node = node.nextSibling) {
      var nodeType = node.nodeType;
      if (1 === nodeType || 3 === nodeType) break;
      if (8 === nodeType) {
        nodeType = node.data;
        if ("$" === nodeType || "$!" === nodeType || "$?" === nodeType || "$~" === nodeType || "&" === nodeType || "F!" === nodeType || "F" === nodeType)
          break;
        if ("/$" === nodeType || "/&" === nodeType) return null;
      }
    }
    return node;
  }
  var previousHydratableOnEnteringScopedSingleton = null;
  function getNextHydratableInstanceAfterHydrationBoundary(hydrationInstance) {
    hydrationInstance = hydrationInstance.nextSibling;
    for (var depth = 0; hydrationInstance; ) {
      if (8 === hydrationInstance.nodeType) {
        var data = hydrationInstance.data;
        if ("/$" === data || "/&" === data) {
          if (0 === depth)
            return getNextHydratable(hydrationInstance.nextSibling);
          depth--;
        } else
          "$" !== data && "$!" !== data && "$?" !== data && "$~" !== data && "&" !== data || depth++;
      }
      hydrationInstance = hydrationInstance.nextSibling;
    }
    return null;
  }
  function getParentHydrationBoundary(targetInstance) {
    targetInstance = targetInstance.previousSibling;
    for (var depth = 0; targetInstance; ) {
      if (8 === targetInstance.nodeType) {
        var data = targetInstance.data;
        if ("$" === data || "$!" === data || "$?" === data || "$~" === data || "&" === data) {
          if (0 === depth) return targetInstance;
          depth--;
        } else "/$" !== data && "/&" !== data || depth++;
      }
      targetInstance = targetInstance.previousSibling;
    }
    return null;
  }
  function setFocusIfFocusable(node, focusOptions) {
    function handleFocus() {
      didFocus = true;
    }
    if (node.ownerDocument.activeElement === node) return true;
    var didFocus = false;
    try {
      node.ownerDocument.addEventListener("focus", handleFocus, true), (node.focus || HTMLElement.prototype.focus).call(node, focusOptions);
    } finally {
      node.ownerDocument.removeEventListener("focus", handleFocus, true);
    }
    return didFocus;
  }
  function requestPostPaintCallback(callback) {
    localRequestAnimationFrame(function() {
      localRequestAnimationFrame(function(time) {
        return callback(time);
      });
    });
  }
  function resolveSingletonInstance(type, props, rootContainerInstance) {
    props = getOwnerDocumentFromRootContainer(rootContainerInstance);
    switch (type) {
      case "html":
        type = props.documentElement;
        if (!type) throw Error(formatProdErrorMessage(452));
        return type;
      case "head":
        type = props.head;
        if (!type) throw Error(formatProdErrorMessage(453));
        return type;
      case "body":
        type = props.body;
        if (!type) throw Error(formatProdErrorMessage(454));
        return type;
      default:
        throw Error(formatProdErrorMessage(451));
    }
  }
  function releaseSingletonInstance(instance, type, props) {
    for (var propKey in props) {
      var propValue = props[propKey];
      props.hasOwnProperty(propKey) && null != propValue && setProp(instance, type, propKey, null, emptyProps, propValue);
    }
    null != props.dangerouslySetInnerHTML && (instance.textContent = "");
    instance.onclick === noop$1 && (instance.onclick = null);
    detachDeletedInstance(instance);
  }
  function clearSingletonPreambleContribution(instance) {
    for (var attributes = instance.attributes; attributes.length; )
      instance.removeAttributeNode(attributes[0]);
    detachDeletedInstance(instance);
  }
  var preloadPropsMap = /* @__PURE__ */ new Map(), preconnectsSet = /* @__PURE__ */ new Set();
  function getHoistableRoot(container) {
    if ("function" === typeof container.getRootNode) {
      var rootNode = container.getRootNode();
      if (9 === rootNode.nodeType || 11 === rootNode.nodeType) return rootNode;
    }
    return 9 === container.nodeType ? container : container.ownerDocument;
  }
  var previousDispatcher = ReactDOMSharedInternals.d;
  ReactDOMSharedInternals.d = {
    f: flushSyncWork,
    r: requestFormReset,
    D: prefetchDNS,
    C: preconnect,
    L: preload,
    m: preloadModule,
    X: preinitScript,
    S: preinitStyle,
    M: preinitModuleScript
  };
  function flushSyncWork() {
    var previousWasRendering = previousDispatcher.f(), wasRendering = flushSyncWork$1();
    return previousWasRendering || wasRendering;
  }
  function requestFormReset(form) {
    var formInst = getInstanceFromNode(form);
    null !== formInst && 5 === formInst.tag && "form" === formInst.type ? requestFormReset$1(formInst) : previousDispatcher.r(form);
  }
  var globalDocument = "undefined" === typeof document ? null : document;
  function preconnectAs(rel, href, crossOrigin) {
    var ownerDocument = globalDocument;
    if (ownerDocument && "string" === typeof href && href) {
      var limitedEscapedHref = escapeSelectorAttributeValueInsideDoubleQuotes(href);
      limitedEscapedHref = 'link[rel="' + rel + '"][href="' + limitedEscapedHref + '"]';
      "string" === typeof crossOrigin && (limitedEscapedHref += '[crossorigin="' + crossOrigin + '"]');
      preconnectsSet.has(limitedEscapedHref) || (preconnectsSet.add(limitedEscapedHref), rel = { rel, crossOrigin, href }, null === ownerDocument.querySelector(limitedEscapedHref) && (href = ownerDocument.createElement("link"), setInitialProperties(href, "link", rel), markNodeAsHoistable(href), ownerDocument.head.appendChild(href)));
    }
  }
  function prefetchDNS(href) {
    previousDispatcher.D(href);
    preconnectAs("dns-prefetch", href, null);
  }
  function preconnect(href, crossOrigin) {
    previousDispatcher.C(href, crossOrigin);
    preconnectAs("preconnect", href, crossOrigin);
  }
  function preload(href, as, options2) {
    previousDispatcher.L(href, as, options2);
    var ownerDocument = globalDocument;
    if (ownerDocument && href && as) {
      var preloadSelector = 'link[rel="preload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"]';
      "image" === as ? options2 && options2.imageSrcSet ? (preloadSelector += '[imagesrcset="' + escapeSelectorAttributeValueInsideDoubleQuotes(
        options2.imageSrcSet
      ) + '"]', "string" === typeof options2.imageSizes && (preloadSelector += '[imagesizes="' + escapeSelectorAttributeValueInsideDoubleQuotes(
        options2.imageSizes
      ) + '"]')) : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]' : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]';
      var key = preloadSelector;
      switch (as) {
        case "style":
          key = getStyleKey(href);
          break;
        case "script":
          key = getScriptKey(href);
      }
      if (!(preloadPropsMap.has(key) || (href = assign(
        {
          rel: "preload",
          href: "image" === as && options2 && options2.imageSrcSet ? void 0 : href,
          as
        },
        options2
      ), preloadPropsMap.set(key, href), null !== ownerDocument.querySelector(preloadSelector) || "style" === as && ownerDocument.querySelector(getStylesheetSelectorFromKey(key)) || "script" === as && ownerDocument.querySelector(getScriptSelectorFromKey(key))))) {
        var instance = ownerDocument.createElement("link");
        setInitialProperties(instance, "link", href);
        "style" === as && (instance[internalLoadPendingKey] = true, instance.onload = instance.onerror = function() {
          clearPendingLoadOnNode(instance);
        });
        markNodeAsHoistable(instance);
        ownerDocument.head.appendChild(instance);
      }
    }
  }
  function preloadModule(href, options2) {
    previousDispatcher.m(href, options2);
    var ownerDocument = globalDocument;
    if (ownerDocument && href) {
      var as = options2 && "string" === typeof options2.as ? options2.as : "script", preloadSelector = 'link[rel="modulepreload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"][href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]', key = preloadSelector;
      switch (as) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          key = getScriptKey(href);
      }
      if (!preloadPropsMap.has(key) && (href = assign({ rel: "modulepreload", href }, options2), preloadPropsMap.set(key, href), null === ownerDocument.querySelector(preloadSelector))) {
        switch (as) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (ownerDocument.querySelector(getScriptSelectorFromKey(key)))
              return;
        }
        as = ownerDocument.createElement("link");
        setInitialProperties(as, "link", href);
        markNodeAsHoistable(as);
        ownerDocument.head.appendChild(as);
      }
    }
  }
  function preinitStyle(href, precedence, options2) {
    previousDispatcher.S(href, precedence, options2);
    var ownerDocument = globalDocument;
    if (ownerDocument && href) {
      var styles = getResourcesFromRoot(ownerDocument).hoistableStyles, key = getStyleKey(href);
      precedence = precedence || "default";
      var resource = styles.get(key);
      if (!resource) {
        var state = { loading: 0, preload: null };
        if (resource = ownerDocument.querySelector(
          getStylesheetSelectorFromKey(key)
        ))
          state.loading = 5;
        else {
          href = assign(
            { rel: "stylesheet", href, "data-precedence": precedence },
            options2
          );
          (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(href, options2);
          var link = resource = ownerDocument.createElement("link");
          markNodeAsHoistable(link);
          setInitialProperties(link, "link", href);
          link._p = new Promise(function(resolve, reject) {
            link.onload = resolve;
            link.onerror = reject;
          });
          link.addEventListener("load", function() {
            state.loading |= 1;
          });
          link.addEventListener("error", function() {
            state.loading |= 2;
          });
          state.loading |= 4;
          insertStylesheet(resource, precedence, ownerDocument);
        }
        resource = {
          type: "stylesheet",
          instance: resource,
          count: 1,
          state
        };
        styles.set(key, resource);
      }
    }
  }
  function preinitScript(src, options2) {
    previousDispatcher.X(src, options2);
    var ownerDocument = globalDocument;
    if (ownerDocument && src) {
      var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
      resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true }, options2), (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options2), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
        type: "script",
        instance: resource,
        count: 1,
        state: null
      }, scripts.set(key, resource));
    }
  }
  function preinitModuleScript(src, options2) {
    previousDispatcher.M(src, options2);
    var ownerDocument = globalDocument;
    if (ownerDocument && src) {
      var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
      resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true, type: "module" }, options2), (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options2), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
        type: "script",
        instance: resource,
        count: 1,
        state: null
      }, scripts.set(key, resource));
    }
  }
  function getResource(type, currentProps, pendingProps, currentResource) {
    var JSCompiler_inline_result = (JSCompiler_inline_result = rootInstanceStackCursor.current) ? getHoistableRoot(JSCompiler_inline_result) : null;
    if (!JSCompiler_inline_result) throw Error(formatProdErrorMessage(446));
    switch (type) {
      case "meta":
      case "title":
        return null;
      case "style":
        return "string" === typeof pendingProps.precedence && "string" === typeof pendingProps.href ? (pendingProps = getStyleKey(pendingProps.href), currentProps = getResourcesFromRoot(
          JSCompiler_inline_result
        ).hoistableStyles, currentResource = currentProps.get(pendingProps), currentResource || (currentResource = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, currentProps.set(pendingProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if ("stylesheet" === pendingProps.rel && "string" === typeof pendingProps.href && "string" === typeof pendingProps.precedence) {
          type = getStyleKey(pendingProps.href);
          var styles$268 = getResourcesFromRoot(
            JSCompiler_inline_result
          ).hoistableStyles, resource$269 = styles$268.get(type);
          resource$269 || (JSCompiler_inline_result = JSCompiler_inline_result.ownerDocument || JSCompiler_inline_result, resource$269 = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, styles$268.set(type, resource$269), (styles$268 = JSCompiler_inline_result.querySelector(
            getStylesheetSelectorFromKey(type)
          )) ? styles$268._p || (resource$269.instance = styles$268, resource$269.state.loading = 5) : (styles$268 = preloadPropsMap.get(type), styles$268 || (styles$268 = {
            rel: "preload",
            as: "style",
            href: pendingProps.href,
            crossOrigin: pendingProps.crossOrigin,
            integrity: pendingProps.integrity,
            media: pendingProps.media,
            hrefLang: pendingProps.hrefLang,
            referrerPolicy: pendingProps.referrerPolicy
          }, preloadPropsMap.set(type, styles$268)), preloadStylesheet(
            JSCompiler_inline_result,
            type,
            styles$268,
            resource$269.state
          )));
          if (currentProps && null === currentResource)
            throw Error(formatProdErrorMessage(528, ""));
          return resource$269;
        }
        if (currentProps && null !== currentResource)
          throw Error(formatProdErrorMessage(529, ""));
        return null;
      case "script":
        return currentProps = pendingProps.async, pendingProps = pendingProps.src, "string" === typeof pendingProps && currentProps && "function" !== typeof currentProps && "symbol" !== typeof currentProps ? (pendingProps = getScriptKey(pendingProps), currentProps = getResourcesFromRoot(
          JSCompiler_inline_result
        ).hoistableScripts, currentResource = currentProps.get(pendingProps), currentResource || (currentResource = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, currentProps.set(pendingProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(formatProdErrorMessage(444, type));
    }
  }
  function getStyleKey(href) {
    return 'href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"';
  }
  function getStylesheetSelectorFromKey(key) {
    return 'link[rel="stylesheet"][' + key + "]";
  }
  function stylesheetPropsFromRawProps(rawProps) {
    return assign({}, rawProps, {
      "data-precedence": rawProps.precedence,
      precedence: null
    });
  }
  function preloadStylesheet(ownerDocument, key, preloadProps, state) {
    if (key = ownerDocument.querySelector(
      'link[rel="preload"][as="style"][' + key + "]"
    )) {
      if (true !== key[internalLoadPendingKey]) {
        state.loading = 1;
        return;
      }
    } else
      key = ownerDocument.createElement("link"), key[internalLoadPendingKey] = true, key.onload = key.onerror = clearPendingLoadOnNode.bind(null, key), setInitialProperties(key, "link", preloadProps), markNodeAsHoistable(key), ownerDocument.head.appendChild(key);
    state.preload = key;
    key.addEventListener("load", function() {
      return state.loading |= 1;
    });
    key.addEventListener("error", function() {
      return state.loading |= 2;
    });
  }
  function getScriptKey(src) {
    return '[src="' + escapeSelectorAttributeValueInsideDoubleQuotes(src) + '"]';
  }
  function getScriptSelectorFromKey(key) {
    return "script[async]" + key;
  }
  function acquireResource(hoistableRoot, resource, props) {
    resource.count++;
    if (null === resource.instance)
      switch (resource.type) {
        case "style":
          var instance = hoistableRoot.querySelector(
            'style[data-href~="' + escapeSelectorAttributeValueInsideDoubleQuotes(props.href) + '"]'
          );
          if (instance)
            return resource.instance = instance, markNodeAsHoistable(instance), instance;
          var styleProps = assign({}, props, {
            "data-href": props.href,
            "data-precedence": props.precedence,
            href: null,
            precedence: null
          });
          instance = (hoistableRoot.ownerDocument || hoistableRoot).createElement(
            "style"
          );
          markNodeAsHoistable(instance);
          setInitialProperties(instance, "style", styleProps);
          insertStylesheet(instance, props.precedence, hoistableRoot);
          return resource.instance = instance;
        case "stylesheet":
          styleProps = getStyleKey(props.href);
          var instance$274 = hoistableRoot.querySelector(
            getStylesheetSelectorFromKey(styleProps)
          );
          if (instance$274)
            return resource.state.loading |= 4, resource.instance = instance$274, markNodeAsHoistable(instance$274), instance$274;
          instance = stylesheetPropsFromRawProps(props);
          (styleProps = preloadPropsMap.get(styleProps)) && adoptPreloadPropsForStylesheet(instance, styleProps);
          instance$274 = (hoistableRoot.ownerDocument || hoistableRoot).createElement("link");
          markNodeAsHoistable(instance$274);
          var linkInstance = instance$274;
          linkInstance._p = new Promise(function(resolve, reject) {
            linkInstance.onload = resolve;
            linkInstance.onerror = reject;
          });
          setInitialProperties(instance$274, "link", instance);
          resource.state.loading |= 4;
          insertStylesheet(instance$274, props.precedence, hoistableRoot);
          return resource.instance = instance$274;
        case "script":
          instance$274 = getScriptKey(props.src);
          if (styleProps = hoistableRoot.querySelector(
            getScriptSelectorFromKey(instance$274)
          ))
            return resource.instance = styleProps, markNodeAsHoistable(styleProps), styleProps;
          instance = props;
          if (styleProps = preloadPropsMap.get(instance$274))
            instance = assign({}, props), adoptPreloadPropsForScript(instance, styleProps);
          hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
          styleProps = hoistableRoot.createElement("script");
          markNodeAsHoistable(styleProps);
          setInitialProperties(styleProps, "link", instance);
          hoistableRoot.head.appendChild(styleProps);
          return resource.instance = styleProps;
        case "void":
          return null;
        default:
          throw Error(formatProdErrorMessage(443, resource.type));
      }
    else
      "stylesheet" === resource.type && 0 === (resource.state.loading & 4) && (instance = resource.instance, resource.state.loading |= 4, insertStylesheet(instance, props.precedence, hoistableRoot));
    return resource.instance;
  }
  function insertStylesheet(instance, precedence, root2) {
    for (var nodes = root2.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), last = nodes.length ? nodes[nodes.length - 1] : null, prior = last, i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.dataset.precedence === precedence) prior = node;
      else if (prior !== last) break;
    }
    prior ? prior.parentNode.insertBefore(instance, prior.nextSibling) : (precedence = 9 === root2.nodeType ? root2.head : root2, precedence.insertBefore(instance, precedence.firstChild));
  }
  function adoptPreloadPropsForStylesheet(stylesheetProps, preloadProps) {
    null == stylesheetProps.crossOrigin && (stylesheetProps.crossOrigin = preloadProps.crossOrigin);
    null == stylesheetProps.referrerPolicy && (stylesheetProps.referrerPolicy = preloadProps.referrerPolicy);
    null == stylesheetProps.title && (stylesheetProps.title = preloadProps.title);
  }
  function adoptPreloadPropsForScript(scriptProps, preloadProps) {
    null == scriptProps.crossOrigin && (scriptProps.crossOrigin = preloadProps.crossOrigin);
    null == scriptProps.referrerPolicy && (scriptProps.referrerPolicy = preloadProps.referrerPolicy);
    null == scriptProps.integrity && (scriptProps.integrity = preloadProps.integrity);
  }
  var tagCaches = null;
  function getHydratableHoistableCache(type, keyAttribute, ownerDocument) {
    if (null === tagCaches) {
      var cache = /* @__PURE__ */ new Map();
      var caches = tagCaches = /* @__PURE__ */ new Map();
      caches.set(ownerDocument, cache);
    } else
      caches = tagCaches, cache = caches.get(ownerDocument), cache || (cache = /* @__PURE__ */ new Map(), caches.set(ownerDocument, cache));
    if (cache.has(type)) return cache;
    cache.set(type, null);
    ownerDocument = ownerDocument.getElementsByTagName(type);
    for (caches = 0; caches < ownerDocument.length; caches++) {
      var node = ownerDocument[caches];
      if (!(node[internalHoistableMarker] || node[internalInstanceKey] || "link" === type && "stylesheet" === node.getAttribute("rel")) && "http://www.w3.org/2000/svg" !== node.namespaceURI) {
        var nodeKey = node.getAttribute(keyAttribute) || "";
        nodeKey = type + nodeKey;
        var existing = cache.get(nodeKey);
        existing ? existing.push(node) : cache.set(nodeKey, [node]);
      }
    }
    return cache;
  }
  function mountHoistable(hoistableRoot, type, instance) {
    hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
    hoistableRoot.head.insertBefore(
      instance,
      "title" === type ? hoistableRoot.querySelector("head > title") : null
    );
  }
  function isHostHoistableType(type, props, hostContext) {
    if (1 === hostContext || null != props.itemProp) return false;
    switch (type) {
      case "meta":
      case "title":
        return true;
      case "style":
        if ("string" !== typeof props.precedence || "string" !== typeof props.href || "" === props.href)
          break;
        return true;
      case "link":
        if ("string" !== typeof props.rel || "string" !== typeof props.href || "" === props.href || props.onLoad || props.onError)
          break;
        switch (props.rel) {
          case "stylesheet":
            return type = props.disabled, "string" === typeof props.precedence && null == type;
          default:
            return true;
        }
      case "script":
        if (props.async && "function" !== typeof props.async && "symbol" !== typeof props.async && !props.onLoad && !props.onError && props.src && "string" === typeof props.src)
          return true;
    }
    return false;
  }
  function maySuspendCommit(type, props) {
    return "img" === type && null != props.src && "" !== props.src && null == props.onLoad && "lazy" !== props.loading;
  }
  function preloadResource(resource) {
    return "stylesheet" === resource.type && 0 === (resource.state.loading & 3) ? false : true;
  }
  function estimateImageBytes(instance) {
    return (instance.width || 100) * (instance.height || 100) * ("number" === typeof devicePixelRatio ? devicePixelRatio : 1) * 0.25;
  }
  function suspendInstance(state, instance) {
    "function" === typeof instance.decode && (state.imgCount++, instance.complete || (state.imgBytes += estimateImageBytes(instance), state.suspenseyImages.push(instance)), state = onUnsuspendImg.bind(state), instance.decode().then(state, state));
  }
  function suspendResource(state, hoistableRoot, resource, props) {
    if ("stylesheet" === resource.type && ("string" !== typeof props.media || false !== matchMedia(props.media).matches) && 0 === (resource.state.loading & 4)) {
      if (null === resource.instance) {
        var key = getStyleKey(props.href), instance = hoistableRoot.querySelector(
          getStylesheetSelectorFromKey(key)
        );
        if (instance) {
          hoistableRoot = instance._p;
          null !== hoistableRoot && "object" === typeof hoistableRoot && "function" === typeof hoistableRoot.then && (state.count++, state = onUnsuspend.bind(state), hoistableRoot.then(state, state));
          resource.state.loading |= 4;
          resource.instance = instance;
          markNodeAsHoistable(instance);
          return;
        }
        instance = hoistableRoot.ownerDocument || hoistableRoot;
        props = stylesheetPropsFromRawProps(props);
        (key = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(props, key);
        instance = instance.createElement("link");
        markNodeAsHoistable(instance);
        var linkInstance = instance;
        linkInstance._p = new Promise(function(resolve, reject) {
          linkInstance.onload = resolve;
          linkInstance.onerror = reject;
        });
        setInitialProperties(instance, "link", props);
        resource.instance = instance;
      }
      null === state.stylesheets && (state.stylesheets = /* @__PURE__ */ new Map());
      state.stylesheets.set(resource, hoistableRoot);
      (hoistableRoot = resource.state.preload) && 0 === (resource.state.loading & 3) && (state.count++, resource = onUnsuspend.bind(state), hoistableRoot.addEventListener("load", resource), hoistableRoot.addEventListener("error", resource));
    }
  }
  var estimatedBytesWithinLimit = 0;
  function waitForCommitToBeReady(state, timeoutOffset) {
    state.stylesheets && 0 === state.count && insertSuspendedStylesheets(state, state.stylesheets);
    return 0 < state.count || 0 < state.imgCount ? function(commit) {
      var stylesheetTimer = setTimeout(function() {
        state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets);
        if (state.unsuspend) {
          var unsuspend = state.unsuspend;
          state.unsuspend = null;
          unsuspend();
        }
      }, 6e4 + timeoutOffset);
      0 < state.imgBytes && 0 === estimatedBytesWithinLimit && (estimatedBytesWithinLimit = 62500 * estimateBandwidth());
      var imgTimer = setTimeout(
        function() {
          state.waitingForImages = false;
          if (0 === state.count && (state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets), state.unsuspend)) {
            var unsuspend = state.unsuspend;
            state.unsuspend = null;
            unsuspend();
          }
        },
        (state.imgBytes > estimatedBytesWithinLimit ? 50 : 800) + timeoutOffset
      );
      state.unsuspend = commit;
      return function() {
        state.unsuspend = null;
        clearTimeout(stylesheetTimer);
        clearTimeout(imgTimer);
      };
    } : null;
  }
  function checkIfFullyUnsuspended(state) {
    if (0 === state.count && (0 === state.imgCount || !state.waitingForImages)) {
      if (state.stylesheets) insertSuspendedStylesheets(state, state.stylesheets);
      else if (state.unsuspend) {
        var unsuspend = state.unsuspend;
        state.unsuspend = null;
        unsuspend();
      }
    }
  }
  function onUnsuspend() {
    this.count--;
    checkIfFullyUnsuspended(this);
  }
  function onUnsuspendImg() {
    this.imgCount--;
    checkIfFullyUnsuspended(this);
  }
  var precedencesByRoot = null;
  function insertSuspendedStylesheets(state, resources) {
    state.stylesheets = null;
    null !== state.unsuspend && (state.count++, precedencesByRoot = /* @__PURE__ */ new Map(), resources.forEach(insertStylesheetIntoRoot, state), precedencesByRoot = null, onUnsuspend.call(state));
  }
  function insertStylesheetIntoRoot(root2, resource) {
    if (!(resource.state.loading & 4)) {
      var precedences = precedencesByRoot.get(root2);
      if (precedences) var last = precedences.get(null);
      else {
        precedences = /* @__PURE__ */ new Map();
        precedencesByRoot.set(root2, precedences);
        for (var nodes = root2.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          if ("LINK" === node.nodeName || "not all" !== node.getAttribute("media"))
            precedences.set(node.dataset.precedence, node), last = node;
        }
        last && precedences.set(null, last);
      }
      nodes = resource.instance;
      node = nodes.getAttribute("data-precedence");
      i = precedences.get(node) || last;
      i === last && precedences.set(null, nodes);
      precedences.set(node, nodes);
      this.count++;
      last = onUnsuspend.bind(this);
      nodes.addEventListener("load", last);
      nodes.addEventListener("error", last);
      i ? i.parentNode.insertBefore(nodes, i.nextSibling) : (root2 = 9 === root2.nodeType ? root2.head : root2, root2.insertBefore(nodes, root2.firstChild));
      resource.state.loading |= 4;
    }
  }
  var HostTransitionContext = {
    $$typeof: REACT_CONTEXT_TYPE,
    Provider: null,
    Consumer: null,
    _currentValue: sharedNotPendingObject,
    _currentValue2: sharedNotPendingObject,
    _threadCount: 0
  };
  function FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState) {
    this.tag = 1;
    this.containerInfo = containerInfo;
    this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = -1;
    this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null;
    this.callbackPriority = 0;
    this.expirationTimes = createLaneMap(-1);
    this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = createLaneMap(0);
    this.hiddenUpdates = createLaneMap(null);
    this.identifierPrefix = identifierPrefix;
    this.onUncaughtError = onUncaughtError;
    this.onCaughtError = onCaughtError;
    this.onRecoverableError = onRecoverableError;
    this.pooledCache = null;
    this.pooledCacheLanes = 0;
    this.formState = formState;
    this.transitionTypes = null;
    this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, identifierPrefix, formState, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator) {
    containerInfo = new FiberRootNode(
      containerInfo,
      tag,
      hydrate,
      identifierPrefix,
      onUncaughtError,
      onCaughtError,
      onRecoverableError,
      onDefaultTransitionIndicator,
      formState
    );
    tag = 1;
    true === isStrictMode && (tag |= 24);
    isStrictMode = createFiberImplClass(3, null, null, tag);
    containerInfo.current = isStrictMode;
    isStrictMode.stateNode = containerInfo;
    tag = createCache();
    tag.refCount++;
    containerInfo.pooledCache = tag;
    tag.refCount++;
    isStrictMode.memoizedState = {
      element: initialChildren,
      isDehydrated: hydrate,
      cache: tag
    };
    initializeUpdateQueue(isStrictMode);
    return containerInfo;
  }
  function getContextForSubtree(parentComponent) {
    if (!parentComponent) return emptyContextObject;
    parentComponent = emptyContextObject;
    return parentComponent;
  }
  function updateContainerImpl(rootFiber, lane, element, container, parentComponent, callback) {
    parentComponent = getContextForSubtree(parentComponent);
    null === container.context ? container.context = parentComponent : container.pendingContext = parentComponent;
    container = createUpdate(lane);
    container.payload = { element };
    callback = void 0 === callback ? null : callback;
    null !== callback && (container.callback = callback);
    element = enqueueUpdate(rootFiber, container, lane);
    null !== element && (scheduleUpdateOnFiber(element, rootFiber, lane), entangleTransitions(element, rootFiber, lane));
  }
  function markRetryLaneImpl(fiber, retryLane) {
    fiber = fiber.memoizedState;
    if (null !== fiber && null !== fiber.dehydrated) {
      var a = fiber.retryLane;
      fiber.retryLane = 0 !== a && a < retryLane ? a : retryLane;
    }
  }
  function markRetryLaneIfNotHydrated(fiber, retryLane) {
    markRetryLaneImpl(fiber, retryLane);
    (fiber = fiber.alternate) && markRetryLaneImpl(fiber, retryLane);
  }
  function attemptContinuousHydration(fiber) {
    if (13 === fiber.tag || 31 === fiber.tag) {
      var root2 = enqueueConcurrentRenderForLane(fiber, 67108864);
      null !== root2 && scheduleUpdateOnFiber(root2, fiber, 67108864);
      markRetryLaneIfNotHydrated(fiber, 67108864);
    }
  }
  function attemptHydrationAtCurrentPriority(fiber) {
    if (13 === fiber.tag || 31 === fiber.tag) {
      var lane = requestUpdateLane();
      lane = getBumpedLaneForHydrationByLane(lane);
      var root2 = enqueueConcurrentRenderForLane(fiber, lane);
      null !== root2 && scheduleUpdateOnFiber(root2, fiber, lane);
      markRetryLaneIfNotHydrated(fiber, lane);
    }
  }
  var _enabled = true;
  function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {
    var prevTransition = ReactSharedInternals.T;
    ReactSharedInternals.T = null;
    var previousPriority = ReactDOMSharedInternals.p;
    try {
      ReactDOMSharedInternals.p = 2, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
    } finally {
      ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
    }
  }
  function dispatchContinuousEvent(domEventName, eventSystemFlags, container, nativeEvent) {
    var prevTransition = ReactSharedInternals.T;
    ReactSharedInternals.T = null;
    var previousPriority = ReactDOMSharedInternals.p;
    try {
      ReactDOMSharedInternals.p = 8, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
    } finally {
      ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
    }
  }
  function dispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent) {
    if (_enabled) {
      var blockedOn = findInstanceBlockingEvent(nativeEvent);
      if (null === blockedOn)
        dispatchEventForPluginEventSystem(
          domEventName,
          eventSystemFlags,
          nativeEvent,
          return_targetInst,
          targetContainer
        ), clearIfContinuousEvent(domEventName, nativeEvent);
      else if (queueIfContinuousEvent(
        blockedOn,
        domEventName,
        eventSystemFlags,
        targetContainer,
        nativeEvent
      ))
        nativeEvent.stopPropagation();
      else if (clearIfContinuousEvent(domEventName, nativeEvent), eventSystemFlags & 4 && -1 < discreteReplayableEvents.indexOf(domEventName)) {
        for (; null !== blockedOn; ) {
          var fiber = getInstanceFromNode(blockedOn);
          if (null !== fiber)
            switch (fiber.tag) {
              case 3:
                fiber = fiber.stateNode;
                if (fiber.current.memoizedState.isDehydrated) {
                  var lanes = getHighestPriorityLanes(fiber.pendingLanes);
                  if (0 !== lanes) {
                    var root2 = fiber;
                    root2.pendingLanes |= 2;
                    for (root2.entangledLanes |= 2; lanes; ) {
                      var lane = 1 << 31 - clz32(lanes);
                      root2.entanglements[1] |= lane;
                      lanes &= ~lane;
                    }
                    ensureRootIsScheduled(fiber);
                    0 === (executionContext & 6) && (workInProgressRootRenderTargetTime = now() + 500, flushSyncWorkAcrossRoots_impl(0));
                  }
                }
                break;
              case 31:
              case 13:
                root2 = enqueueConcurrentRenderForLane(fiber, 2), null !== root2 && scheduleUpdateOnFiber(root2, fiber, 2), flushSyncWork$1(), markRetryLaneIfNotHydrated(fiber, 2);
            }
          fiber = findInstanceBlockingEvent(nativeEvent);
          null === fiber && dispatchEventForPluginEventSystem(
            domEventName,
            eventSystemFlags,
            nativeEvent,
            return_targetInst,
            targetContainer
          );
          if (fiber === blockedOn) break;
          blockedOn = fiber;
        }
        null !== blockedOn && nativeEvent.stopPropagation();
      } else
        dispatchEventForPluginEventSystem(
          domEventName,
          eventSystemFlags,
          nativeEvent,
          null,
          targetContainer
        );
    }
  }
  function findInstanceBlockingEvent(nativeEvent) {
    nativeEvent = getEventTarget(nativeEvent);
    return findInstanceBlockingTarget(nativeEvent);
  }
  var return_targetInst = null;
  function findInstanceBlockingTarget(targetNode) {
    return_targetInst = null;
    targetNode = getClosestInstanceFromNode(targetNode);
    if (null !== targetNode) {
      var nearestMounted = getNearestMountedFiber(targetNode);
      if (null === nearestMounted) targetNode = null;
      else {
        var tag = nearestMounted.tag;
        if (13 === tag) {
          targetNode = getSuspenseInstanceFromFiber(nearestMounted);
          if (null !== targetNode) return targetNode;
          targetNode = null;
        } else if (31 === tag) {
          targetNode = getActivityInstanceFromFiber(nearestMounted);
          if (null !== targetNode) return targetNode;
          targetNode = null;
        } else if (3 === tag) {
          if (nearestMounted.stateNode.current.memoizedState.isDehydrated)
            return 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
          targetNode = null;
        } else nearestMounted !== targetNode && (targetNode = null);
      }
    }
    return_targetInst = targetNode;
    return null;
  }
  function getEventPriority(domEventName) {
    switch (domEventName) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "fullscreenerror":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "resize":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (getCurrentPriorityLevel()) {
          case ImmediatePriority:
            return 2;
          case UserBlockingPriority:
            return 8;
          case NormalPriority$1:
          case LowPriority:
            return 32;
          case IdlePriority:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var hasScheduledReplayAttempt = false, queuedFocus = null, queuedDrag = null, queuedMouse = null, queuedPointers = /* @__PURE__ */ new Map(), queuedPointerCaptures = /* @__PURE__ */ new Map(), queuedExplicitHydrationTargets = [], discreteReplayableEvents = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function clearIfContinuousEvent(domEventName, nativeEvent) {
    switch (domEventName) {
      case "focusin":
      case "focusout":
        queuedFocus = null;
        break;
      case "dragenter":
      case "dragleave":
        queuedDrag = null;
        break;
      case "mouseover":
      case "mouseout":
        queuedMouse = null;
        break;
      case "pointerover":
      case "pointerout":
        queuedPointers.delete(nativeEvent.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        queuedPointerCaptures.delete(nativeEvent.pointerId);
    }
  }
  function accumulateOrCreateContinuousQueuedReplayableEvent(existingQueuedEvent, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
    if (null === existingQueuedEvent || existingQueuedEvent.nativeEvent !== nativeEvent)
      return existingQueuedEvent = {
        blockedOn,
        domEventName,
        eventSystemFlags,
        nativeEvent,
        targetContainers: [targetContainer]
      }, null !== blockedOn && (blockedOn = getInstanceFromNode(blockedOn), null !== blockedOn && attemptContinuousHydration(blockedOn)), existingQueuedEvent;
    existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
    blockedOn = existingQueuedEvent.targetContainers;
    null !== targetContainer && -1 === blockedOn.indexOf(targetContainer) && blockedOn.push(targetContainer);
    return existingQueuedEvent;
  }
  function queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
    switch (domEventName) {
      case "focusin":
        return queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedFocus,
          blockedOn,
          domEventName,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        ), true;
      case "dragenter":
        return queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedDrag,
          blockedOn,
          domEventName,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        ), true;
      case "mouseover":
        return queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedMouse,
          blockedOn,
          domEventName,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        ), true;
      case "pointerover":
        var pointerId = nativeEvent.pointerId;
        queuedPointers.set(
          pointerId,
          accumulateOrCreateContinuousQueuedReplayableEvent(
            queuedPointers.get(pointerId) || null,
            blockedOn,
            domEventName,
            eventSystemFlags,
            targetContainer,
            nativeEvent
          )
        );
        return true;
      case "gotpointercapture":
        return pointerId = nativeEvent.pointerId, queuedPointerCaptures.set(
          pointerId,
          accumulateOrCreateContinuousQueuedReplayableEvent(
            queuedPointerCaptures.get(pointerId) || null,
            blockedOn,
            domEventName,
            eventSystemFlags,
            targetContainer,
            nativeEvent
          )
        ), true;
    }
    return false;
  }
  function attemptExplicitHydrationTarget(queuedTarget) {
    var targetInst = getClosestInstanceFromNode(queuedTarget.target);
    if (null !== targetInst) {
      var nearestMounted = getNearestMountedFiber(targetInst);
      if (null !== nearestMounted) {
        if (targetInst = nearestMounted.tag, 13 === targetInst) {
          if (targetInst = getSuspenseInstanceFromFiber(nearestMounted), null !== targetInst) {
            queuedTarget.blockedOn = targetInst;
            runWithPriority(queuedTarget.priority, function() {
              attemptHydrationAtCurrentPriority(nearestMounted);
            });
            return;
          }
        } else if (31 === targetInst) {
          if (targetInst = getActivityInstanceFromFiber(nearestMounted), null !== targetInst) {
            queuedTarget.blockedOn = targetInst;
            runWithPriority(queuedTarget.priority, function() {
              attemptHydrationAtCurrentPriority(nearestMounted);
            });
            return;
          }
        } else if (3 === targetInst && nearestMounted.stateNode.current.memoizedState.isDehydrated) {
          queuedTarget.blockedOn = 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
          return;
        }
      }
    }
    queuedTarget.blockedOn = null;
  }
  function attemptReplayContinuousQueuedEvent(queuedEvent) {
    if (null !== queuedEvent.blockedOn) return false;
    for (var targetContainers = queuedEvent.targetContainers; 0 < targetContainers.length; ) {
      var nextBlockedOn = findInstanceBlockingEvent(queuedEvent.nativeEvent);
      if (null === nextBlockedOn) {
        nextBlockedOn = queuedEvent.nativeEvent;
        var nativeEventClone = new nextBlockedOn.constructor(
          nextBlockedOn.type,
          nextBlockedOn
        );
        currentReplayingEvent = nativeEventClone;
        nextBlockedOn.target.dispatchEvent(nativeEventClone);
        currentReplayingEvent = null;
      } else
        return targetContainers = getInstanceFromNode(nextBlockedOn), null !== targetContainers && attemptContinuousHydration(targetContainers), queuedEvent.blockedOn = nextBlockedOn, false;
      targetContainers.shift();
    }
    return true;
  }
  function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
    attemptReplayContinuousQueuedEvent(queuedEvent) && map.delete(key);
  }
  function replayUnblockedEvents() {
    hasScheduledReplayAttempt = false;
    null !== queuedFocus && attemptReplayContinuousQueuedEvent(queuedFocus) && (queuedFocus = null);
    null !== queuedDrag && attemptReplayContinuousQueuedEvent(queuedDrag) && (queuedDrag = null);
    null !== queuedMouse && attemptReplayContinuousQueuedEvent(queuedMouse) && (queuedMouse = null);
    queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);
    queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);
  }
  function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
    queuedEvent.blockedOn === unblocked && (queuedEvent.blockedOn = null, hasScheduledReplayAttempt || (hasScheduledReplayAttempt = true, Scheduler.unstable_scheduleCallback(
      Scheduler.unstable_NormalPriority,
      replayUnblockedEvents
    )));
  }
  var lastScheduledReplayQueue = null;
  function scheduleReplayQueueIfNeeded(formReplayingQueue) {
    lastScheduledReplayQueue !== formReplayingQueue && (lastScheduledReplayQueue = formReplayingQueue, Scheduler.unstable_scheduleCallback(
      Scheduler.unstable_NormalPriority,
      function() {
        lastScheduledReplayQueue === formReplayingQueue && (lastScheduledReplayQueue = null);
        for (var i = 0; i < formReplayingQueue.length; i += 3) {
          var form = formReplayingQueue[i], submitterOrAction = formReplayingQueue[i + 1], formData = formReplayingQueue[i + 2];
          if ("function" !== typeof submitterOrAction)
            if (null === findInstanceBlockingTarget(submitterOrAction || form))
              continue;
            else break;
          var formInst = getInstanceFromNode(form);
          null !== formInst && (formReplayingQueue.splice(i, 3), i -= 3, startHostTransition(
            formInst,
            {
              pending: true,
              data: formData,
              method: form.method,
              action: submitterOrAction
            },
            submitterOrAction,
            formData
          ));
        }
      }
    ));
  }
  function retryIfBlockedOn(unblocked) {
    function unblock(queuedEvent) {
      return scheduleCallbackIfUnblocked(queuedEvent, unblocked);
    }
    null !== queuedFocus && scheduleCallbackIfUnblocked(queuedFocus, unblocked);
    null !== queuedDrag && scheduleCallbackIfUnblocked(queuedDrag, unblocked);
    null !== queuedMouse && scheduleCallbackIfUnblocked(queuedMouse, unblocked);
    queuedPointers.forEach(unblock);
    queuedPointerCaptures.forEach(unblock);
    for (var i = 0; i < queuedExplicitHydrationTargets.length; i++) {
      var queuedTarget = queuedExplicitHydrationTargets[i];
      queuedTarget.blockedOn === unblocked && (queuedTarget.blockedOn = null);
    }
    for (; 0 < queuedExplicitHydrationTargets.length && (i = queuedExplicitHydrationTargets[0], null === i.blockedOn); )
      attemptExplicitHydrationTarget(i), null === i.blockedOn && queuedExplicitHydrationTargets.shift();
    i = (unblocked.ownerDocument || unblocked).$$reactFormReplay;
    if (null != i)
      for (queuedTarget = 0; queuedTarget < i.length; queuedTarget += 3) {
        var form = i[queuedTarget], submitterOrAction = i[queuedTarget + 1], formProps = form[internalPropsKey] || null;
        if ("function" === typeof submitterOrAction)
          formProps || scheduleReplayQueueIfNeeded(i);
        else if (formProps) {
          var action = null;
          if (submitterOrAction && submitterOrAction.hasAttribute("formAction"))
            if (form = submitterOrAction, formProps = submitterOrAction[internalPropsKey] || null)
              action = formProps.formAction;
            else {
              if (null !== findInstanceBlockingTarget(form)) continue;
            }
          else action = formProps.action;
          "function" === typeof action ? i[queuedTarget + 1] = action : (i.splice(queuedTarget, 3), queuedTarget -= 3);
          scheduleReplayQueueIfNeeded(i);
        }
      }
  }
  function defaultOnDefaultTransitionIndicator() {
    function handleNavigate(event) {
      event.canIntercept && "react-transition" === event.info && event.intercept({
        handler: function() {
          return new Promise(function(resolve) {
            return pendingResolve = resolve;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function handleNavigateComplete() {
      null !== pendingResolve && (pendingResolve(), pendingResolve = null);
      isCancelled || setTimeout(startFakeNavigation, 20);
    }
    function startFakeNavigation() {
      if (!isCancelled && !navigation.transition) {
        var currentEntry = navigation.currentEntry;
        currentEntry && null != currentEntry.url && navigation.navigate(currentEntry.url, {
          state: currentEntry.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if ("object" === typeof navigation) {
      var isCancelled = false, pendingResolve = null;
      navigation.addEventListener("navigate", handleNavigate);
      navigation.addEventListener("navigatesuccess", handleNavigateComplete);
      navigation.addEventListener("navigateerror", handleNavigateComplete);
      setTimeout(startFakeNavigation, 100);
      return function() {
        isCancelled = true;
        navigation.removeEventListener("navigate", handleNavigate);
        navigation.removeEventListener("navigatesuccess", handleNavigateComplete);
        navigation.removeEventListener("navigateerror", handleNavigateComplete);
        null !== pendingResolve && (pendingResolve(), pendingResolve = null);
      };
    }
  }
  function ReactDOMRoot(internalRoot) {
    this._internalRoot = internalRoot;
  }
  ReactDOMHydrationRoot.prototype.render = ReactDOMRoot.prototype.render = function(children) {
    var root2 = this._internalRoot;
    if (null === root2) throw Error(formatProdErrorMessage(409));
    var current = root2.current, lane = requestUpdateLane();
    updateContainerImpl(current, lane, children, root2, null, null);
  };
  ReactDOMHydrationRoot.prototype.unmount = ReactDOMRoot.prototype.unmount = function() {
    var root2 = this._internalRoot;
    if (null !== root2) {
      this._internalRoot = null;
      var container = root2.containerInfo;
      updateContainerImpl(root2.current, 2, null, root2, null, null);
      flushSyncWork$1();
      container[internalContainerInstanceKey] = null;
    }
  };
  function ReactDOMHydrationRoot(internalRoot) {
    this._internalRoot = internalRoot;
  }
  ReactDOMHydrationRoot.prototype.unstable_scheduleHydration = function(target) {
    if (target) {
      var updatePriority = resolveUpdatePriority();
      target = { blockedOn: null, target, priority: updatePriority };
      for (var i = 0; i < queuedExplicitHydrationTargets.length && 0 !== updatePriority && updatePriority < queuedExplicitHydrationTargets[i].priority; i++) ;
      queuedExplicitHydrationTargets.splice(i, 0, target);
      0 === i && attemptExplicitHydrationTarget(target);
    }
  };
  var isomorphicReactPackageVersion$jscomp$inline_2043 = React2.version;
  if ("19.3.1" !== isomorphicReactPackageVersion$jscomp$inline_2043)
    throw Error(
      formatProdErrorMessage(
        527,
        isomorphicReactPackageVersion$jscomp$inline_2043,
        "19.3.1"
      )
    );
  ReactDOMSharedInternals.findDOMNode = function(componentOrElement) {
    var fiber = componentOrElement._reactInternals;
    if (void 0 === fiber) {
      if ("function" === typeof componentOrElement.render)
        throw Error(formatProdErrorMessage(188));
      componentOrElement = Object.keys(componentOrElement).join(",");
      throw Error(formatProdErrorMessage(268, componentOrElement));
    }
    componentOrElement = findCurrentFiberUsingSlowPath(fiber);
    componentOrElement = null !== componentOrElement ? findCurrentHostFiberImpl(componentOrElement) : null;
    componentOrElement = null === componentOrElement ? null : componentOrElement.stateNode;
    return componentOrElement;
  };
  var internals$jscomp$inline_2586 = {
    bundleType: 0,
    version: "19.3.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: ReactSharedInternals,
    reconcilerVersion: "19.3.1"
  };
  if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
    var hook$jscomp$inline_2587 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!hook$jscomp$inline_2587.isDisabled && hook$jscomp$inline_2587.supportsFiber)
      try {
        rendererID = hook$jscomp$inline_2587.inject(
          internals$jscomp$inline_2586
        ), injectedHook = hook$jscomp$inline_2587;
      } catch (err) {
      }
  }
  reactDomClient_production.createRoot = function(container, options2) {
    if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
    var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError;
    null !== options2 && void 0 !== options2 && (true === options2.unstable_strictMode && (isStrictMode = true), void 0 !== options2.identifierPrefix && (identifierPrefix = options2.identifierPrefix), void 0 !== options2.onUncaughtError && (onUncaughtError = options2.onUncaughtError), void 0 !== options2.onCaughtError && (onCaughtError = options2.onCaughtError), void 0 !== options2.onRecoverableError && (onRecoverableError = options2.onRecoverableError));
    options2 = createFiberRoot(
      container,
      1,
      false,
      null,
      null,
      isStrictMode,
      identifierPrefix,
      null,
      onUncaughtError,
      onCaughtError,
      onRecoverableError,
      defaultOnDefaultTransitionIndicator
    );
    container[internalContainerInstanceKey] = options2.current;
    listenToAllSupportedEvents(container);
    return new ReactDOMRoot(options2);
  };
  reactDomClient_production.hydrateRoot = function(container, initialChildren, options2) {
    if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
    var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError, formState = null;
    null !== options2 && void 0 !== options2 && (true === options2.unstable_strictMode && (isStrictMode = true), void 0 !== options2.identifierPrefix && (identifierPrefix = options2.identifierPrefix), void 0 !== options2.onUncaughtError && (onUncaughtError = options2.onUncaughtError), void 0 !== options2.onCaughtError && (onCaughtError = options2.onCaughtError), void 0 !== options2.onRecoverableError && (onRecoverableError = options2.onRecoverableError), void 0 !== options2.formState && (formState = options2.formState));
    initialChildren = createFiberRoot(
      container,
      1,
      true,
      initialChildren,
      null != options2 ? options2 : null,
      isStrictMode,
      identifierPrefix,
      formState,
      onUncaughtError,
      onCaughtError,
      onRecoverableError,
      defaultOnDefaultTransitionIndicator
    );
    initialChildren.context = getContextForSubtree(null);
    options2 = initialChildren.current;
    isStrictMode = requestUpdateLane();
    isStrictMode = getBumpedLaneForHydrationByLane(isStrictMode);
    identifierPrefix = createUpdate(isStrictMode);
    identifierPrefix.callback = null;
    enqueueUpdate(options2, identifierPrefix, isStrictMode);
    options2 = isStrictMode;
    initialChildren.current.lanes = options2;
    markRootUpdated$1(initialChildren, options2);
    ensureRootIsScheduled(initialChildren);
    container[internalContainerInstanceKey] = initialChildren.current;
    listenToAllSupportedEvents(container);
    return new ReactDOMHydrationRoot(initialChildren);
  };
  reactDomClient_production.version = "19.3.1";
  return reactDomClient_production;
}
var hasRequiredClient;
function requireClient() {
  if (hasRequiredClient) return client.exports;
  hasRequiredClient = 1;
  function checkDCE() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
      return;
    }
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
    } catch (err) {
      console.error(err);
    }
  }
  {
    checkDCE();
    client.exports = requireReactDomClient_production();
  }
  return client.exports;
}
var clientExports = requireClient();
const ReactDOM = /* @__PURE__ */ getDefaultExportFromCjs(clientExports);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => {
    return reactExports.createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
      ...props
    })
  );
  Component.displayName = `${iconName}`;
  return Component;
};
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$u = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("ArrowRight", __iconNode$u);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$t = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]
];
const Bookmark = createLucideIcon("Bookmark", __iconNode$t);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$s = [
  ["rect", { width: "18", height: "14", x: "3", y: "5", rx: "2", ry: "2", key: "12ruh7" }],
  ["path", { d: "M7 15h4M15 15h2M7 11h2M13 11h4", key: "1ueiar" }]
];
const Captions = createLucideIcon("Captions", __iconNode$s);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$r = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("Check", __iconNode$r);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$q = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("ChevronDown", __iconNode$q);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$p = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("ChevronLeft", __iconNode$p);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$o = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("ChevronUp", __iconNode$o);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$n = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("CircleCheck", __iconNode$n);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$m = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polygon", { points: "10 8 16 12 10 16 10 8", key: "1cimsy" }]
];
const CirclePlay = createLucideIcon("CirclePlay", __iconNode$m);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$l = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("Copy", __iconNode$l);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$k = [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
];
const Download = createLucideIcon("Download", __iconNode$k);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$j = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("ExternalLink", __iconNode$j);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$i = [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
];
const FolderOpen = createLucideIcon("FolderOpen", __iconNode$i);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$h = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
];
const Heart = createLucideIcon("Heart", __iconNode$h);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$g = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("Layers", __iconNode$g);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$f = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("LoaderCircle", __iconNode$f);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$e = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v3", key: "1dcmit" }],
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3", key: "1e4gt3" }],
  ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3", key: "wsl5sc" }],
  ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3", key: "18trek" }]
];
const Maximize = createLucideIcon("Maximize", __iconNode$e);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$d = [
  ["path", { d: "M8 3v3a2 2 0 0 1-2 2H3", key: "hohbtr" }],
  ["path", { d: "M21 8h-3a2 2 0 0 1-2-2V3", key: "5jw1f3" }],
  ["path", { d: "M3 16h3a2 2 0 0 1 2 2v3", key: "198tvr" }],
  ["path", { d: "M16 21v-3a2 2 0 0 1 2-2h3", key: "ph8mxp" }]
];
const Minimize = createLucideIcon("Minimize", __iconNode$d);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$c = [
  ["rect", { x: "14", y: "4", width: "4", height: "16", rx: "1", key: "zuxfzm" }],
  ["rect", { x: "6", y: "4", width: "4", height: "16", rx: "1", key: "1okwgv" }]
];
const Pause = createLucideIcon("Pause", __iconNode$c);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$b = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]];
const Play = createLucideIcon("Play", __iconNode$b);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$a = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("RefreshCw", __iconNode$a);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$9 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("RotateCcw", __iconNode$9);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$8 = [
  ["path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8", key: "1p45f6" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }]
];
const RotateCw = createLucideIcon("RotateCw", __iconNode$8);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
];
const Search = createLucideIcon("Search", __iconNode$7);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("Send", __iconNode$6);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("Star", __iconNode$5);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("Trash2", __iconNode$4);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("TriangleAlert", __iconNode$3);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }],
  ["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }]
];
const Upload = createLucideIcon("Upload", __iconNode$2);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69", key: "1dl1wf" }],
  ["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523", key: "4k23kn" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643", key: "1grhjp" }],
  ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764", key: "z3jwby" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const WifiOff = createLucideIcon("WifiOff", __iconNode$1);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("X", __iconNode);
const DIAG_KEY = "toosh-diag-log-v1";
const CACHE_IDX_KEY = "toosh-cidx-v1";
const CACHE_PREFIX = "toosh-c1:";
const MAX_LOGS = 150;
let memLogs = null;
let saveTimer = null;
function pad(n) {
  return n < 10 ? `0${n}` : String(n);
}
function formatTs() {
  const d = /* @__PURE__ */ new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
function getDiagLogs() {
  if (memLogs) return memLogs;
  try {
    const raw = localStorage.getItem(DIAG_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    memLogs = Array.isArray(parsed) ? parsed : [];
  } catch {
    memLogs = [];
  }
  return memLogs;
}
function scheduleSave() {
  if (saveTimer) return;
  saveTimer = setTimeout(() => {
    saveTimer = null;
    try {
      localStorage.setItem(DIAG_KEY, JSON.stringify(getDiagLogs().slice(-MAX_LOGS)));
    } catch {
    }
  }, 1500);
}
function addDiagLog(kind, message) {
  const logs = getDiagLogs();
  logs.push({
    t: formatTs(),
    k: kind,
    m: String(message).slice(0, 600)
  });
  if (logs.length > MAX_LOGS) {
    memLogs = logs.slice(-MAX_LOGS);
  }
  scheduleSave();
  window.dispatchEvent(new CustomEvent("tm-diag-update"));
}
function clearDiagLogs() {
  memLogs = [];
  try {
    localStorage.removeItem(DIAG_KEY);
  } catch {
  }
  window.dispatchEvent(new CustomEvent("tm-diag-update"));
}
function getDiagInfo() {
  var _a;
  let vpn = "n/a";
  try {
    if ((_a = window.AndroidPlayer) == null ? void 0 : _a.isVpnActive) {
      vpn = String(window.AndroidPlayer.isVpnActive());
    }
  } catch {
    vpn = "n/a";
  }
  const url = String(window.location.href).replace(/^https?:\/\//, "").slice(0, 60);
  return `online=${navigator.onLine} | vpn=${vpn} | native=${window.AndroidPlayer ? "yes" : "no"}
${url}
${navigator.userAgent.slice(0, 120)}`;
}
function clearApiCache() {
  let count = 0;
  try {
    for (const k of Object.keys(localStorage)) {
      if (k.startsWith(CACHE_PREFIX) || k === CACHE_IDX_KEY) {
        localStorage.removeItem(k);
        count++;
      }
    }
  } catch {
  }
  return count;
}
function getApiCacheSizeLabel() {
  try {
    let bytes = 0;
    for (const k of Object.keys(localStorage)) {
      if (k.startsWith(CACHE_PREFIX) || k === CACHE_IDX_KEY) {
        bytes += (localStorage.getItem(k) || "").length * 2;
      }
    }
    return bytes ? `${(bytes / 1024).toFixed(0)} کیلوبایت` : "خالی";
  } catch {
    return "خالی";
  }
}
function initPerformanceMonitoring() {
  if (typeof window === "undefined") return;
  window.__tooshLog = addDiagLog;
  addDiagLog("ok", "app started");
  try {
    let last = 0;
    let frames = 0;
    let slow = 0;
    let worst = 0;
    let t0 = 0;
    let y0 = 0;
    let idle = null;
    let raf = 0;
    let ltAt = 0;
    const tick = (now) => {
      if (last) {
        const d = now - last;
        frames++;
        if (d > 33) {
          slow++;
          if (d > worst) worst = d;
        }
      }
      last = now;
      raf = requestAnimationFrame(tick);
    };
    const endScroll = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
      const dur = Date.now() - t0;
      if (dur > 350 && frames > 8) {
        addDiagLog(
          "perf",
          `SCROLL ${Math.abs(Math.round((window.scrollY || 0) - y0))}px in ${(dur / 1e3).toFixed(1)}s | frames ${frames} | slow(>33ms) ${slow}${slow ? ` | worst ${Math.round(worst)}ms` : ""}`
        );
      }
      frames = 0;
      slow = 0;
      worst = 0;
      t0 = 0;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!t0) {
          t0 = Date.now();
          y0 = window.scrollY || 0;
        }
        if (!raf) raf = requestAnimationFrame(tick);
        if (idle) clearTimeout(idle);
        idle = setTimeout(endScroll, 220);
      },
      { passive: true }
    );
    if ("PerformanceObserver" in window) {
      new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 120 && Date.now() - ltAt > 500) {
            ltAt = Date.now();
            addDiagLog("perf", `LONGTASK ${Math.round(entry.duration)}ms (main thread blocked)`);
          }
        });
      }).observe({ entryTypes: ["longtask"] });
    }
  } catch {
  }
}
const TM_THEMES = [
  { id: "dark", fam: "cinema", fl: "نوار سینمایی", d: 1, bg: "#100e0c", s: "#1b1814", p: "#ee3b17", a: "#ffd60a", t: "#f6efdc", pair: "light" },
  { id: "light", fam: "cinema", fl: "نوار سینمایی", d: 0, bg: "#f2e9d3", s: "#fbf5e6", p: "#e03616", a: "#ffc800", t: "#17130e", pair: "dark" },
  { id: "ocean", fam: "ocean", fl: "اقیانوس", d: 1, bg: "#06141a", s: "#0c222b", p: "#0ea5c6", a: "#ffd60a", t: "#e6fbff", pair: "ocean-l" },
  { id: "ocean-l", fam: "ocean", fl: "اقیانوس", d: 0, bg: "#dff0f5", s: "#f3fafc", p: "#0891b2", a: "#ffc800", t: "#0a1d24", pair: "ocean" },
  { id: "emerald", fam: "emerald", fl: "زمرد", d: 1, bg: "#07130e", s: "#0f2018", p: "#0f9d63", a: "#ffd60a", t: "#e9fbf1", pair: "emerald-l" },
  { id: "emerald-l", fam: "emerald", fl: "زمرد", d: 0, bg: "#e2f3e8", s: "#f4fbf6", p: "#0f9d63", a: "#ffc800", t: "#0e1f16", pair: "emerald" },
  { id: "violet", fam: "violet", fl: "ارغوانی", d: 1, bg: "#0f0b1a", s: "#191229", p: "#8b5cf6", a: "#ffd60a", t: "#f1ebff", pair: "violet-l" },
  { id: "violet-l", fam: "violet", fl: "ارغوانی", d: 0, bg: "#ece6fa", s: "#faf7ff", p: "#7c3aed", a: "#ffc800", t: "#1a1030", pair: "violet" },
  { id: "gold", fam: "gold", fl: "پرده‌ی طلایی", d: 1, bg: "#14100a", s: "#201a10", p: "#e08a00", a: "#ffd60a", t: "#fbf1dc", pair: "gold-l" },
  { id: "gold-l", fam: "gold", fl: "پرده‌ی طلایی", d: 0, bg: "#fbefd2", s: "#fff9ea", p: "#d97706", a: "#ffc800", t: "#2a1a05", pair: "gold" }
];
const THEME_IDS = TM_THEMES.map((x) => x.id);
const THEME_DARK_MAP = Object.fromEntries(TM_THEMES.map((x) => [x.id, Boolean(x.d)]));
const THEME_PAIR_MAP = Object.fromEntries(TM_THEMES.map((x) => [x.id, x.pair]));
const THEME_KEY = "toosh-theme-v2";
const PREF_KEY = "toosh-pref-v2";
let themeBusy = false;
function getStoredTheme() {
  try {
    const t = localStorage.getItem(THEME_KEY) || localStorage.getItem("kral-theme-v2") || "dark";
    return THEME_IDS.includes(t) ? t : "dark";
  } catch {
    return "dark";
  }
}
function setStoredTheme(id) {
  try {
    localStorage.setItem(THEME_KEY, id);
  } catch {
  }
}
function getUserPrefs() {
  try {
    return JSON.parse(localStorage.getItem(PREF_KEY) || "{}");
  } catch {
    return {};
  }
}
function setUserPref(key, val) {
  const p = getUserPrefs();
  p[key] = val;
  try {
    localStorage.setItem(PREF_KEY, JSON.stringify(p));
  } catch {
  }
  applyUserPrefs();
}
function applyUserPrefs() {
  const p = getUserPrefs();
  const d = document.documentElement;
  d.style.fontSize = p.fs === "s" ? "90%" : p.fs === "l" ? "112%" : "";
  if (p.lite) d.setAttribute("data-lite", "1");
  else d.removeAttribute("data-lite");
}
function syncNativeBars() {
  var _a, _b;
  try {
    const d = document.documentElement;
    const cur = d.getAttribute("data-theme") || "dark";
    const cs = getComputedStyle(d);
    const s = cs.getPropertyValue("--header-bg").trim();
    const n = cs.getPropertyValue("--surface-solid").trim();
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme && s.startsWith("#")) {
      metaTheme.setAttribute("content", s);
    }
    if (s.startsWith("#") && n.startsWith("#")) {
      (_b = (_a = window.AndroidPlayer) == null ? void 0 : _a.setBars) == null ? void 0 : _b.call(_a, s, n, !THEME_DARK_MAP[cur]);
    }
  } catch {
  }
}
function applyThemeWithReveal(id, x, y, auto = false, onSync) {
  const d = document.documentElement;
  const old = d.getAttribute("data-theme") || "dark";
  const nt = TM_THEMES.find((t) => t.id === id);
  const ot = TM_THEMES.find((t) => t.id === old);
  if (old === id || !nt || themeBusy) return;
  if (!auto) {
    setUserPref("auto", false);
  }
  window.dispatchEvent(new CustomEvent("tm-theme", { detail: id }));
  const run = () => {
    d.setAttribute("data-theme", id);
    setStoredTheme(id);
    onSync == null ? void 0 : onSync(id);
    syncNativeBars();
    window.dispatchEvent(new CustomEvent("tm-theme-done", { detail: id }));
  };
  const prefs = getUserPrefs();
  let still = Boolean(prefs.lite) || x == null || y == null || !document.body;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      still = true;
    }
  } catch {
  }
  if (still) {
    run();
    return;
  }
  const doc = document;
  const W = window.innerWidth;
  const H = window.innerHeight;
  const endRadius = Math.ceil(Math.hypot(Math.max(x, W - x), Math.max(y, H - y))) + 8;
  if (typeof doc.startViewTransition === "function") {
    themeBusy = true;
    try {
      const vt = doc.startViewTransition(() => {
        run();
      });
      vt.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`
            ]
          },
          {
            duration: 420,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)"
          }
        );
      }).catch(() => {
      });
      vt.finished.catch(() => {
      }).finally(() => {
        themeBusy = false;
      });
      setTimeout(() => {
        themeBusy = false;
      }, 900);
      return;
    } catch {
      themeBusy = false;
    }
  }
  themeBusy = true;
  const overlay = document.createElement("div");
  overlay.className = "tm-rv";
  overlay.style.backgroundColor = (ot == null ? void 0 : ot.bg) || "#100e0c";
  document.body.appendChild(overlay);
  run();
  requestAnimationFrame(() => {
    overlay.style.opacity = "0";
    setTimeout(() => {
      overlay.remove();
      themeBusy = false;
    }, 300);
  });
}
function syncAutoTheme(onSync) {
  var _a;
  const prefs = getUserPrefs();
  if (!prefs.auto) return;
  let isNight = false;
  try {
    isNight = ((_a = window.AndroidPlayer) == null ? void 0 : _a.isNightMode) ? window.AndroidPlayer.isNightMode() : window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    isNight = false;
  }
  const cur = document.documentElement.getAttribute("data-theme") || "dark";
  if (Boolean(THEME_DARK_MAP[cur]) === Boolean(isNight)) return;
  const pair = THEME_PAIR_MAP[cur] || (isNight ? "dark" : "light");
  applyThemeWithReveal(pair, window.innerWidth / 2, 0, true, onSync);
}
function showDomToast(message) {
  const show = () => {
    const d = document.createElement("div");
    d.textContent = message;
    d.style.cssText = "position:fixed;left:50%;bottom:96px;transform:translateX(-50%);z-index:2147483000;max-width:86vw;padding:10px 16px;background:#1b1814;color:#f6efdc;border:2px solid #f6efdc;box-shadow:3px 3px 0 #f6efdc;border-radius:10px;font:700 13px Vazirmatn,sans-serif;text-align:center;direction:rtl;pointer-events:none;transition:opacity .4s";
    document.body.appendChild(d);
    setTimeout(() => {
      d.style.opacity = "0";
    }, 2800);
    setTimeout(() => {
      d.remove();
    }, 3400);
  };
  if (document.body) show();
  else document.addEventListener("DOMContentLoaded", show);
}
function initHapticClicks() {
  const handler = (e) => {
    var _a, _b;
    if (getUserPrefs().novib) return;
    const target = e.target;
    const btn = (_a = target == null ? void 0 : target.closest) == null ? void 0 : _a.call(target, "button,[role=button],a");
    if (!btn) return;
    try {
      (_b = navigator.vibrate) == null ? void 0 : _b.call(navigator, btn.closest(".tm-dock") ? 14 : 8);
    } catch {
    }
  };
  document.addEventListener("click", handler, true);
  return () => document.removeEventListener("click", handler, true);
}
async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
      return true;
    } catch {
      return false;
    }
  }
}
function openTelegramChannel() {
  var _a;
  try {
    if ((_a = window.AndroidPlayer) == null ? void 0 : _a.openTelegram) {
      window.AndroidPlayer.openTelegram();
      return;
    }
  } catch {
  }
  const a = document.createElement("a");
  a.href = "https://t.me/TOOSH_MOVIE";
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
function openExternalVideoPlayer(url, pkg, onToast) {
  var _a;
  try {
    if ((_a = window.AndroidPlayer) == null ? void 0 : _a.openExternal) {
      window.AndroidPlayer.openExternal(url, pkg);
      return;
    }
  } catch {
  }
  const intentUrl = "intent:" + url + "#Intent;action=android.intent.action.VIEW;type=video/*;package=" + pkg + ";end";
  const a = document.createElement("a");
  a.href = intentUrl;
  document.body.appendChild(a);
  a.click();
  a.remove();
  if (!/Android/i.test(navigator.userAgent)) {
    onToast == null ? void 0 : onToast("پخش با پلیر خارجی در مرورگر دسکتاپ/وب پشتیبانی نمی‌شود؛ از پخش درون‌برنامه یا دانلود استفاده کنید", "error");
  }
}
const MEDIA_BASE = "https://media.mihan-cdn.com/";
const POSTER_FALLBACK_SVG = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%231C1924'/%3E%3Cstop offset='100%25' stop-color='%230F0E13'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='450' fill='url(%23g)'/%3E%3Crect x='2' y='2' width='296' height='446' fill='none' stroke='%23ffffff1a' stroke-width='2' rx='12'/%3E%3Ccircle cx='150' cy='210' r='36' fill='%23ffffff08' stroke='%23ffffff20' stroke-width='2'/%3E%3Cpolygon points='142,194 142,226 168,210' fill='%23ffffff40'/%3E%3Ctext x='150' y='280' fill='%23888' font-family='sans-serif' font-size='14' text-anchor='middle' font-weight='bold'%3ETOOSH MOVIE%3C/text%3E%3C/svg%3E";
function cleanTitle(value) {
  if (!value) return "";
  let s = String(value);
  s = s.replace(/نکست\s*مووی/g, "توش مووی");
  s = s.replace(/Next\s*Movies?/gi, "TOOSH MOVIE");
  s = s.replace(/\bNXM\b/gi, "TOOSH");
  s = s.replace(/نکست/g, "توش");
  return s.trim();
}
function getMovieId(m) {
  if (!m) return "";
  const obj = m;
  return obj.id || obj.movie_id || obj.slug || obj.title || obj.name || "";
}
function getMovieTitle(m) {
  return cleanTitle((m == null ? void 0 : m.title) || (m == null ? void 0 : m.name) || (m == null ? void 0 : m.original_title) || "بدون عنوان");
}
function getMovieYear(m) {
  var _a, _b;
  return String((m == null ? void 0 : m.year) || (m == null ? void 0 : m.release_year) || ((_b = (_a = m == null ? void 0 : m.release_date) == null ? void 0 : _a.slice) == null ? void 0 : _b.call(_a, 0, 4)) || "");
}
function getImdbRating(m) {
  const raw = (m == null ? void 0 : m.imdb_rating) || (m == null ? void 0 : m.rating) || (m == null ? void 0 : m.imdb) || (m == null ? void 0 : m.score);
  const num = parseFloat(String(raw ?? ""));
  return isNaN(num) || num <= 0 ? "" : num.toFixed(1);
}
function resolveMediaUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== "string") return "";
  const s = rawUrl.trim();
  if (!s) return "";
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  if (s.startsWith("/")) return MEDIA_BASE + s.slice(1);
  return MEDIA_BASE + s;
}
function getPosterUrl(m) {
  return resolveMediaUrl((m == null ? void 0 : m.poster) || (m == null ? void 0 : m.poster_url) || (m == null ? void 0 : m.image) || (m == null ? void 0 : m.cover) || (m == null ? void 0 : m.thumbnail)) || POSTER_FALLBACK_SVG;
}
function getBackdropUrl(m) {
  return resolveMediaUrl(
    (m == null ? void 0 : m.backdrop) || (m == null ? void 0 : m.backdrop_url) || (m == null ? void 0 : m.cover) || (m == null ? void 0 : m.poster) || (m == null ? void 0 : m.poster_url) || (m == null ? void 0 : m.image)
  ) || POSTER_FALLBACK_SVG;
}
function getPlotText(m) {
  const s = cleanTitle((m == null ? void 0 : m.description) || (m == null ? void 0 : m.overview) || (m == null ? void 0 : m.summary) || (m == null ? void 0 : m.plot) || (m == null ? void 0 : m.story) || "");
  return s || "توضیحاتی برای این عنوان ثبت نشده است.";
}
function getMovieType(m) {
  const s = `${(m == null ? void 0 : m.type) || ""}`.toLowerCase();
  return s.includes("series") || s.includes("serial") || s.includes("سریال") ? "series" : "movie";
}
function isWebVersionNotice(m) {
  if (!m) return false;
  const title = cleanTitle(m.title || m.name || m.original_title || "");
  return /نسخه\s*وب/.test(title) || /نسخه وب (?:کرال|توش)/.test(title);
}
function filterWebVersion(list) {
  return Array.isArray(list) ? list.filter((m) => !isWebVersionNotice(m)) : [];
}
function dedupeMovies(list) {
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const item of list) {
    if (!item || isWebVersionNotice(item)) continue;
    const id = String(getMovieId(item) || getMovieTitle(item));
    if (seen.has(id)) continue;
    seen.add(id);
    out.push(item);
  }
  return out;
}
function cleanStreamUrl(raw) {
  return typeof raw === "string" ? raw.trim().replace(/^["'[\s]+|["'\]\s]+$/g, "").replace(/\\\//g, "/").replace(/\s+/g, "%20") : "";
}
function getFileExt(url) {
  try {
    const clean = url.split("?")[0].split("#")[0];
    const last = clean.split("/").pop() || "";
    const idx = last.lastIndexOf(".");
    return idx >= 0 ? last.slice(idx + 1).toLowerCase() : "";
  } catch {
    return "";
  }
}
function scoreStreamUrl(url) {
  const ext = getFileExt(url);
  if (ext === "mp4") return 100;
  if (ext === "m3u8" || url.includes(".m3u8")) return 95;
  if (ext === "webm") return 80;
  if (ext === "mkv") return 50;
  if (ext === "avi" || ext === "flv") return 20;
  return 60;
}
function extractSources(input) {
  const found = [];
  const seen = /* @__PURE__ */ new Set();
  const visited = /* @__PURE__ */ new Set();
  const walk = (node, hint = "") => {
    if (!node) return;
    if (typeof node === "string") {
      const cleaned = cleanStreamUrl(node);
      if (cleaned.startsWith("http") && !cleaned.match(/\.(jpg|jpeg|png|webp|gif|svg|srt|vtt|ass|ssa|zip|rar)(\?|$)/i) && !seen.has(cleaned)) {
        seen.add(cleaned);
        found.push({
          url: cleaned,
          quality: cleanTitle(hint || "کیفیت خودکار"),
          size: "",
          score: scoreStreamUrl(cleaned)
        });
      }
      return;
    }
    if (typeof node !== "object" || visited.has(node)) return;
    visited.add(node);
    if (Array.isArray(node)) {
      for (const el of node) walk(el, hint);
      return;
    }
    const obj = node;
    const rawUrl = obj.url || obj.link || obj.file || obj.src || obj.stream_url || obj.video_url || obj.path;
    const rawQuality = cleanTitle(
      obj.quality || obj.label || obj.title || obj.name || obj.resolution || hint
    );
    if (typeof rawUrl === "string") {
      const cleaned = cleanStreamUrl(rawUrl);
      if (cleaned.startsWith("http") && !cleaned.match(/\.(jpg|jpeg|png|webp|gif|svg|srt|vtt|ass|ssa|zip|rar)(\?|$)/i) && !seen.has(cleaned)) {
        seen.add(cleaned);
        found.push({
          url: cleaned,
          quality: rawQuality || "کیفیت خودکار",
          size: String(obj.size || obj.file_size || obj.volume || ""),
          score: scoreStreamUrl(cleaned),
          raw: obj
        });
      }
    }
    for (const [k, v] of Object.entries(obj)) {
      if (![
        "url",
        "link",
        "file",
        "src",
        "stream_url",
        "video_url",
        "path",
        "poster",
        "poster_url",
        "backdrop",
        "backdrop_url",
        "image",
        "cover",
        "thumbnail",
        "subtitles",
        "subtitle",
        "subs",
        "caption",
        "captions",
        "tracks",
        "trailer",
        "trailer_url",
        "teaser"
      ].includes(k)) {
        walk(v, rawQuality || k);
      }
    }
  };
  walk(input);
  return found.filter((x) => !/تیزر|teaser|trailer/i.test(`${x.quality || ""} ${x.url || ""}`));
}
function extractSubtitles(input) {
  const out = [];
  const seen = /* @__PURE__ */ new Set();
  const visited = /* @__PURE__ */ new Set();
  const walk = (node, label = "زیرنویس فارسی") => {
    if (!node) return;
    if (typeof node === "string") {
      const s = cleanStreamUrl(node);
      if (s.startsWith("http") && /\.(srt|vtt|ass|ssa)(\?|$)/i.test(s) && !seen.has(s)) {
        seen.add(s);
        out.push({ url: s, label });
      }
      return;
    }
    if (typeof node !== "object" || visited.has(node)) return;
    visited.add(node);
    if (Array.isArray(node)) {
      for (const el of node) walk(el, label);
      return;
    }
    const obj = node;
    for (const [k, v] of Object.entries(obj)) {
      if (["subtitles", "subtitle", "subs", "caption", "captions", "tracks"].some(
        (p) => k.toLowerCase().includes(p)
      ) || typeof v === "string" && /\.(srt|vtt|ass|ssa)(\?|$)/i.test(v)) {
        walk(v, String(obj.label || obj.lang || obj.language || obj.title || label));
      } else if (typeof v === "object") {
        walk(v, label);
      }
    }
  };
  walk(input);
  return out;
}
function sortSources(sources) {
  return [...sources].sort((a, b) => {
    var _a, _b;
    const qa = String(a.quality || "");
    const qb = String(b.quality || "");
    const ra = parseInt(((_a = qa.match(/\d{3,4}/)) == null ? void 0 : _a[0]) || "0", 10);
    const rb = parseInt(((_b = qb.match(/\d{3,4}/)) == null ? void 0 : _b[0]) || "0", 10);
    if (ra !== rb) return rb - ra;
    return (b.score || 0) - (a.score || 0);
  });
}
function normalizeQualityLabel(q) {
  return cleanTitle(q || "کیفیت خودکار").replace(/زیرنویس\s*چسبیده/gi, "زیرنویس").replace(/دوبله\s*فارسی/gi, "دوبله").replace(/\bHardSub\b/gi, "زیرنویس").replace(/\bSoftSub\b/gi, "زیرنویس").replace(/\bDubbed\b/gi, "دوبله").replace(/\s+/g, " ").trim();
}
function extractEpisodeNumber(ep, fallbackIdx) {
  const s = `${(ep == null ? void 0 : ep.title) || (ep == null ? void 0 : ep.name) || ""}`.trim();
  let match = s.match(/[Ee](\d{1,4})/) || s.match(/قسمت\s*(\d{1,4})/) || s.match(/\b(\d{1,4})\b/);
  if (match) return parseInt(match[1], 10);
  if (Array.isArray(ep == null ? void 0 : ep.sources)) {
    for (const src of ep.sources) {
      const url = typeof src === "string" ? src : String((src == null ? void 0 : src.url) || "");
      match = url.match(/[Ee](\d{1,4})/) || url.match(/[._-](\d{1,3})\.(mkv|mp4|avi)/i);
      if (match) return parseInt(match[1], 10);
    }
  }
  return fallbackIdx + 1;
}
function findTrailerUrl(movie, linksData) {
  if (!movie) return "";
  const direct = movie.trailer || movie.trailer_url || movie.teaser || movie.preview || movie.trailer_link;
  if (typeof direct === "string" && direct.startsWith("http")) return direct;
  const inspect = (list) => {
    if (!Array.isArray(list)) return "";
    for (const item of list) {
      const obj = typeof item === "object" && item ? item : null;
      const u = typeof item === "string" ? item : String((obj == null ? void 0 : obj.url) || (obj == null ? void 0 : obj.link) || (obj == null ? void 0 : obj.file) || (obj == null ? void 0 : obj.src) || "");
      const lbl = obj ? String(obj.quality || obj.label || obj.title || obj.name || "") : "";
      if (u.startsWith("http") && /تیزر|teaser|trailer/i.test(`${lbl} ${u}`)) {
        return u;
      }
    }
    return "";
  };
  return inspect(movie.sources) || inspect(movie.links) || inspect(linksData == null ? void 0 : linksData.data) || inspect(linksData == null ? void 0 : linksData.sources) || "";
}
function pickDownloadUrl(sources) {
  if (!(sources == null ? void 0 : sources.length)) return null;
  const mp4 = sources.filter((x) => !/\.m3u8(\?|$)/i.test(x.url || ""));
  if (!mp4.length) return sources[0];
  return mp4.find((x) => /720/.test(x.quality)) || mp4.find((x) => /1080/.test(x.quality)) || mp4.find((x) => /480/.test(x.quality)) || mp4[0];
}
function audioCategory(quality) {
  const s = `${quality || ""}`;
  if (/دوبله|dub/i.test(s)) return "dub";
  if (/زیرنویس|sub/i.test(s)) return "sub";
  return "other";
}
function resolutionValue(quality) {
  const m = String(quality || "").match(/\b(2160|1440|1080|720|480|360|240)\b/);
  return m ? parseInt(m[1], 10) : 0;
}
function groupSources(sources) {
  const groups = {
    sub: [],
    dub: [],
    other: []
  };
  sources.forEach((s) => {
    groups[audioCategory(s.quality)].push(s);
  });
  const byResDesc = (a, b) => resolutionValue(b.quality) - resolutionValue(a.quality);
  groups.sub.sort(byResDesc);
  groups.dub.sort(byResDesc);
  groups.other.sort(byResDesc);
  const out = [];
  if (groups.sub.length) out.push({ key: "sub", label: "زیرنویس فارسی", cls: "tm-dl-sub", items: groups.sub });
  if (groups.dub.length) out.push({ key: "dub", label: "دوبله فارسی", cls: "tm-dl-dub", items: groups.dub });
  if (groups.other.length) out.push({ key: "other", label: "سایر کیفیت‌ها", cls: "tm-dl-other", items: groups.other });
  return out;
}
function pickSeriesEpisode(seasons, movieId, watchedEpisodes) {
  const sList = seasons || [];
  let best = { sIdx: 0, eIdx: 0, ts: -1 };
  sList.forEach((se, sIdx) => {
    const eps = se.episodes || se.items || se.episode || [];
    eps.forEach((_ep, eIdx) => {
      const rec = watchedEpisodes[`${movieId}_${sIdx}_${eIdx}`];
      if (rec && rec.timestamp > best.ts) {
        best = { sIdx, eIdx, ts: rec.timestamp };
      }
    });
  });
  if (best.ts > -1) {
    const curSe = sList[best.sIdx];
    const eps = (curSe == null ? void 0 : curSe.episodes) || (curSe == null ? void 0 : curSe.items) || (curSe == null ? void 0 : curSe.episode) || [];
    if (best.eIdx + 1 < eps.length) return { sIdx: best.sIdx, eIdx: best.eIdx + 1 };
    if (best.sIdx + 1 < sList.length) return { sIdx: best.sIdx + 1, eIdx: 0 };
    return { sIdx: best.sIdx, eIdx: best.eIdx };
  }
  return { sIdx: 0, eIdx: 0 };
}
function buildNativeMeta(movie, extra) {
  const m = movie || {};
  const id = String(getMovieId(m));
  const title = getMovieTitle(m);
  const poster = getPosterUrl(m);
  const type = getMovieType(m);
  const year = getMovieYear(m);
  const meta = { id, title, poster, type, year };
  if ((extra == null ? void 0 : extra.sIdx) != null) {
    meta.s = extra.sIdx;
    meta.e = extra.eIdx;
    meta.ep = extra.epTitle || "";
  }
  if (extra == null ? void 0 : extra.isTrailer) meta.trailer = 1;
  const seasons = (extra == null ? void 0 : extra.seasons) || window.__tmSeasons;
  if (type === "series" && Array.isArray(seasons)) {
    meta.seasons = seasons.map((se, si) => ({
      t: cleanTitle(se.title || se.name || `فصل ${se.season || si + 1}`),
      e: (se.episodes || se.items || se.episode || []).map((ep, ei) => ({
        t: cleanTitle(ep.title || ep.name || `قسمت ${ei + 1}`),
        q: sortSources(extractSources(ep)).map((q) => ({
          l: normalizeQualityLabel(q.quality),
          u: q.url,
          s: q.size || ""
        }))
      }))
    }));
  }
  return JSON.stringify(meta);
}
const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
function toPersianDigits(val) {
  return String(val).replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)]);
}
function formatPersianDate(ts) {
  try {
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(new Date(ts));
  } catch {
    return "";
  }
}
function formatFileSize(sizeStr) {
  if (!sizeStr) return "";
  if (/[GMK]B/i.test(sizeStr)) return sizeStr;
  const num = parseFloat(sizeStr);
  if (isNaN(num) || num <= 0) return sizeStr;
  return num > 1024 ? `${(num / 1024).toFixed(2)} GB` : `${num.toFixed(0)} MB`;
}
function formatBytes(bytes) {
  const n = Number(bytes) || 0;
  if (n <= 0) return "۰ B";
  if (n >= 1073741824) return toPersianDigits(`${(n / 1073741824).toFixed(2)} GB`);
  if (n >= 1048576) return toPersianDigits(`${(n / 1048576).toFixed(1)} MB`);
  if (n >= 1024) return toPersianDigits(`${Math.round(n / 1024)} KB`);
  return toPersianDigits(`${n} B`);
}
function formatDuration(seconds) {
  if (!seconds || isNaN(seconds) || !isFinite(seconds)) return "00:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  const s = Math.floor(seconds % 60);
  return h > 0 ? `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}` : `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}
function isPersonObject(item) {
  if (!item || typeof item !== "object") return false;
  if (item.poster || item.poster_url || item.backdrop || item.backdrop_url || item.imdb_rating || item.imdb) {
    return false;
  }
  const t = `${item.type || ""}`.toLowerCase();
  return t === "star" || t === "actor" || t === "person" || Boolean(item.image && !item.poster && !item.poster_url && item.name && !item.year && !item.release_year);
}
function filterPeopleOut(list) {
  return Array.isArray(list) ? list.filter((m) => !isPersonObject(m)) : [];
}
function extractStarsFromMovies(movies) {
  const map = /* @__PURE__ */ new Map();
  for (const movie of movies || []) {
    const lists = [movie.stars, movie.actors, movie.casts, movie.cast].filter(Array.isArray);
    for (const arr of lists) {
      for (const s of arr) {
        if (!s || typeof s !== "object") continue;
        const id = s.id || s.star_id || s.actor_id || s.person_id || s.name || s.title;
        if (!id) continue;
        const key = String(id);
        const prev = map.get(key);
        if (!prev || !prev.image && s.image) {
          map.set(key, s);
        }
      }
    }
  }
  return Array.from(map.values());
}
function mergeStars(primary, secondary) {
  const map = /* @__PURE__ */ new Map();
  const add = (list) => {
    for (const item of list || []) {
      if (!item || typeof item !== "object") continue;
      const key = String(item.id || item.star_id || item.name || item.title || "").trim();
      if (!key) continue;
      const prev = map.get(key);
      if (!prev) {
        map.set(key, item);
      } else if (!prev.image && item.image) {
        map.set(key, { ...prev, ...item });
      }
    }
  };
  add(primary);
  add(secondary);
  return Array.from(map.values());
}
function shrinkAvatarImage(file) {
  return new Promise((resolve) => {
    const img = new Image();
    const objUrl = URL.createObjectURL(file);
    img.onload = () => {
      const size = Math.min(img.width, img.height);
      const sx = (img.width - size) / 2;
      const sy = (img.height - size) / 2;
      const canvas = document.createElement("canvas");
      canvas.width = 240;
      canvas.height = 240;
      const ctx = canvas.getContext("2d");
      ctx == null ? void 0 : ctx.drawImage(img, sx, sy, size, size, 0, 0, 240, 240);
      URL.revokeObjectURL(objUrl);
      resolve(canvas.toDataURL("image/jpeg", 0.86));
    };
    img.onerror = () => {
      URL.revokeObjectURL(objUrl);
      resolve("");
    };
    img.src = objUrl;
  });
}
const API_PRIMARY = "https://mihan-cdn.com/api/";
const API_BACKUP = "https://appnxm.com/api/";
let authToken = "";
let tokenPromise = null;
let lastBackupToast = 0;
const CACHE_IDX = "toosh-cidx-v1";
const CACHE_PRE = "toosh-c1:";
const MAX_CACHE_ENTRIES = 40;
const MAX_CACHE_BYTES = 35e4;
const MAX_CACHE_AGE = 3 * 86400 * 1e3;
const FRESH_MS = 45e3;
const MAX_CONCURRENCY = 2;
const negCache = {};
const inflightMap = {};
const queue = [];
let activeCount = 0;
let holdUntil = 0;
let lastBusyToast = 0;
function readCacheIndex() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_IDX) || "[]");
  } catch {
    return [];
  }
}
function getCachedEntry(key) {
  try {
    const raw = localStorage.getItem(CACHE_PRE + key);
    if (!raw) return null;
    const o = JSON.parse(raw);
    return o && Date.now() - o.t < MAX_CACHE_AGE ? o : null;
  } catch {
    return null;
  }
}
function putCacheEntry(key, bodyText) {
  if (!bodyText || bodyText.length >= MAX_CACHE_BYTES || bodyText.startsWith("<")) return;
  try {
    const ix = readCacheIndex().filter((x) => x !== key);
    ix.push(key);
    while (ix.length > MAX_CACHE_ENTRIES) {
      const oldest = ix.shift();
      if (oldest) localStorage.removeItem(CACHE_PRE + oldest);
    }
    const payload = JSON.stringify({ t: Date.now(), b: bodyText });
    try {
      localStorage.setItem(CACHE_PRE + key, payload);
    } catch {
      for (let i = 0; i < 8 && ix.length > 1; i++) {
        const drop = ix.shift();
        if (drop) localStorage.removeItem(CACHE_PRE + drop);
      }
      localStorage.setItem(CACHE_PRE + key, payload);
    }
    localStorage.setItem(CACHE_IDX, JSON.stringify(ix));
  } catch {
  }
}
function pumpQueue() {
  const now = Date.now();
  if (now < holdUntil) {
    setTimeout(pumpQueue, holdUntil - now + 20);
    return;
  }
  while (activeCount < MAX_CONCURRENCY && queue.length) {
    const item = queue.shift();
    activeCount++;
    let p;
    try {
      p = item.fn();
    } catch (err) {
      p = Promise.reject(err);
    }
    p.then(item.res, item.rej).finally(() => {
      activeCount--;
      setTimeout(pumpQueue, 140);
    });
  }
}
function scheduleRequest(fn) {
  return new Promise((res, rej) => {
    queue.push({
      fn,
      res,
      rej
    });
    pumpQueue();
  });
}
function getApiBase() {
  return window.__tmBk && window.__tmBk > Date.now() ? API_BACKUP : API_PRIMARY;
}
async function ensureGuestToken(forceRefresh = false, overrideBase) {
  if (authToken && !forceRefresh) return authToken;
  if (tokenPromise && !forceRefresh) return tokenPromise;
  const base = overrideBase || getApiBase();
  tokenPromise = (async () => {
    var _a;
    const res = await fetch(`${base}auth/guest-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: "{}",
      mode: "cors",
      credentials: "omit"
    });
    if (!res.ok) throw new Error(`AUTH HTTP ${res.status}`);
    const data = await res.json();
    const token = data.token || data.access_token || ((_a = data == null ? void 0 : data.data) == null ? void 0 : _a.token) || "";
    if (!token) throw new Error("Token missing in response");
    authToken = token;
    addDiagLog("ok", `POST auth/guest-token -> ${res.status}`);
    return token;
  })();
  try {
    return await tokenPromise;
  } finally {
    tokenPromise = null;
  }
}
function formatApiError(err) {
  const raw = err instanceof Error ? err.message : String(err || "خطای نامشخص");
  if (raw.includes("AUTH")) return "دریافت توکن از سرور ناموفق بود. احتمالاً اینترنت یا فیلترشکن مشکل دارد.";
  if (raw.includes("Failed to fetch") || raw.includes("NetworkError")) {
    return "عدم دسترسی به اینترنت یا سرور (فیلترشکن را خاموش یا روشن کرده و امتحان کنید).";
  }
  if (raw.includes("AbortError")) return "پاسخ سرور بیش از حد طول کشید (Timeout).";
  return raw;
}
async function rawFetchWithRetry(url, init, cacheKey, attempt = 0) {
  var _a;
  const t0 = Date.now();
  const res = await scheduleRequest(() => fetch(url, init));
  const ms = Date.now() - t0;
  const method = String(init.method || "GET").toUpperCase();
  const shortUrl = url.replace(/^https?:\/\//, "").slice(0, 100);
  if (res.status === 429 && attempt < 3 && (!cacheKey || !getCachedEntry(cacheKey))) {
    if (Date.now() - lastBusyToast > 15e3) {
      lastBusyToast = Date.now();
      showDomToast("سرور شلوغ است؛ چند لحظه صبر کنید، خودکار دوباره تلاش می‌شود");
    }
    const ra = parseFloat(res.headers.get("Retry-After") || "0") || 0;
    const wait = Math.min(7e3, (ra ? ra * 1e3 : 1200 * Math.pow(2, attempt)) + Math.random() * 400);
    holdUntil = Math.max(holdUntil, Date.now() + wait);
    addDiagLog("err", `429 rate-limited: waiting ${Math.round(wait)}ms then retry ${attempt + 1}`);
    await new Promise((r) => setTimeout(r, wait));
    if ((_a = init.signal) == null ? void 0 : _a.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }
    return rawFetchWithRetry(url, init, cacheKey, attempt + 1);
  }
  if (res.ok) {
    addDiagLog("ok", `${method} ${shortUrl} -> ${res.status} (${ms}ms)`);
  } else {
    addDiagLog("err", `${method} ${shortUrl} -> ${res.status} (${ms}ms)`);
  }
  return res;
}
async function apiRequest(path, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  const cacheKey = method === "GET" && !path.startsWith("auth/") ? path : null;
  if (cacheKey) {
    const neg = negCache[cacheKey];
    if (neg && Date.now() - neg.t < 6e5) {
      addDiagLog("ok", `NEG-CACHE ${neg.s} ${cacheKey.slice(0, 50)}`);
      return { success: false, message: "cached error", data: [] };
    }
    const cached = getCachedEntry(cacheKey);
    if (cached && Date.now() - cached.t < FRESH_MS) {
      addDiagLog("ok", `CACHE-FRESH ${cacheKey.slice(0, 60)}`);
      return JSON.parse(cached.b);
    }
  }
  const runOnBase = async (base) => {
    const token = await ensureGuestToken(false, base);
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    };
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 18e3);
    const init = {
      method,
      headers,
      mode: "cors",
      credentials: "omit",
      signal: controller.signal
    };
    if (options.body) {
      headers["Content-Type"] = "application/json";
      init.body = JSON.stringify(options.body);
    }
    try {
      let res = await rawFetchWithRetry(base + path, init, cacheKey);
      if (res.status === 401 || res.status === 403) {
        const freshToken = await ensureGuestToken(true, base);
        headers.Authorization = `Bearer ${freshToken}`;
        res = await rawFetchWithRetry(base + path, init, cacheKey);
      }
      if (res.status === 400 || res.status === 404) {
        if (cacheKey) negCache[cacheKey] = { t: Date.now(), s: res.status };
      }
      if (!res.ok) {
        if (cacheKey && (res.status === 429 || base === API_BACKUP && res.status >= 500)) {
          const stale = getCachedEntry(cacheKey);
          if (stale) {
            showDomToast("اتصال برقرار نشد؛ اطلاعات ذخیره‌شده نمایش داده شد");
            return JSON.parse(stale.b);
          }
        }
        const txt2 = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} (${txt2.slice(0, 60)})`);
      }
      const txt = await res.text();
      if (cacheKey) putCacheEntry(cacheKey, txt);
      return JSON.parse(txt);
    } finally {
      clearTimeout(timeout);
    }
  };
  if (cacheKey && cacheKey in inflightMap) {
    return inflightMap[cacheKey];
  }
  const exec = (async () => {
    const primaryBase = getApiBase();
    try {
      return await runOnBase(primaryBase);
    } catch (err) {
      if (primaryBase === API_PRIMARY) {
        addDiagLog("err", `Primary API failed (${path}), failing over to backup`);
        window.__tmBk = Date.now() + 3e5;
        if (Date.now() - lastBackupToast > 3e4) {
          lastBackupToast = Date.now();
          showDomToast("سرور اصلی پاسخ نداد؛ به سرور پشتیبان وصل شدیم");
        }
        try {
          return await runOnBase(API_BACKUP);
        } catch (bkErr) {
          if (cacheKey) {
            const stale = getCachedEntry(cacheKey);
            if (stale) {
              showDomToast("اتصال برقرار نشد؛ اطلاعات ذخیره‌شده نمایش داده شد");
              return JSON.parse(stale.b);
            }
          }
          throw bkErr;
        }
      }
      if (cacheKey) {
        const stale = getCachedEntry(cacheKey);
        if (stale) {
          showDomToast("اتصال برقرار نشد؛ اطلاعات ذخیره‌شده نمایش داده شد");
          return JSON.parse(stale.b);
        }
      }
      throw err;
    }
  })();
  if (cacheKey) {
    inflightMap[cacheKey] = exec;
    exec.finally(() => {
      delete inflightMap[cacheKey];
    });
  }
  return exec;
}
async function testServerConnectivity() {
  addDiagLog("ok", `--- server test (online=${navigator.onLine}) ---`);
  await Promise.allSettled(
    [API_PRIMARY, API_BACKUP].map(async (b) => {
      const c = new AbortController();
      const tm = setTimeout(() => c.abort(), 1e4);
      try {
        const t0 = Date.now();
        const r = await fetch(`${b}auth/guest-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: "{}",
          mode: "cors",
          credentials: "omit",
          signal: c.signal
        });
        addDiagLog(r.ok ? "ok" : "err", `POST ${b.replace("https://", "")}auth/guest-token -> ${r.status} (${Date.now() - t0}ms)`);
      } catch (e) {
        addDiagLog("err", `POST ${b.replace("https://", "")}auth/guest-token FAIL: ${e instanceof Error ? e.message : String(e)}`);
      } finally {
        clearTimeout(tm);
      }
    })
  );
}
function extractArray(res) {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (typeof res !== "object") return [];
  const obj = res;
  if (Array.isArray(obj.data)) return obj.data;
  if (Array.isArray(obj.movies)) return obj.movies;
  if (Array.isArray(obj.items)) return obj.items;
  if (Array.isArray(obj.results)) return obj.results;
  const dataObj = obj.data;
  if (dataObj && typeof dataObj === "object") {
    if (Array.isArray(dataObj.movies)) return dataObj.movies;
    if (Array.isArray(dataObj.items)) return dataObj.items;
    if (Array.isArray(dataObj.results)) return dataObj.results;
    if (Array.isArray(dataObj.data)) return dataObj.data;
  }
  const nested = obj.slides;
  if (nested && Array.isArray(nested.movies)) return nested.movies;
  return [];
}
async function fetchHome() {
  var _a;
  const res = await apiRequest("home");
  const root = (res == null ? void 0 : res.slides) ? res : ((_a = res == null ? void 0 : res.data) == null ? void 0 : _a.slides) ? res.data : (res == null ? void 0 : res.data) || res;
  const slides = root.slides || root;
  return {
    movies: slides.movies || [],
    countries: slides.countries || root.countries || [],
    genres: slides.genres || root.genres || [],
    stars: slides.stars || root.stars || []
  };
}
async function fetchMovieDetails(id) {
  const [res1, res2] = await Promise.allSettled([
    apiRequest(`movie/${id}`),
    apiRequest(`movie/${id}/details`)
  ]);
  let detail = {};
  if (res1.status === "fulfilled" && res1.value) {
    const r = res1.value;
    detail = { ...detail, ...r.data || r.movie || r };
  }
  if (res2.status === "fulfilled" && res2.value) {
    const r2 = res2.value;
    detail = { ...detail, ...r2.data || r2.movie || r2 };
  }
  return Object.keys(detail).length ? detail : null;
}
async function fetchMovieLinks(id) {
  try {
    return await apiRequest(`movie/${id}/links`);
  } catch {
    return null;
  }
}
async function fetchSeriesSeasons(id) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const r = await apiRequest(
        `movie/${id}/seasons`
      );
      if (Array.isArray(r == null ? void 0 : r.data)) return r.data;
      if ((r == null ? void 0 : r.data) && !Array.isArray(r.data) && Array.isArray(r.data.seasons)) return r.data.seasons;
      if (Array.isArray(r == null ? void 0 : r.seasons)) return r.seasons;
      return [];
    } catch {
      if (attempt === 0) {
        await new Promise((res) => setTimeout(res, 900));
        continue;
      }
      return [];
    }
  }
  return [];
}
async function searchMovies(params) {
  const payload = {
    title: params.title || "",
    genre_ids: params.genreIds || [],
    country_ids: params.countryIds || [],
    start_year: params.startYear || 1900,
    end_year: params.endYear || 2026,
    imdb_rating_start: params.imdbStart || 0,
    imdb_rating_end: params.imdbEnd || 10,
    type: params.type || "",
    sub_status: params.subStatus || "",
    is_dubbed: params.isDubbed ?? null,
    sort_key: params.sortKey || "",
    sort_order: params.sortOrder || "DESC",
    page: params.page || 1
  };
  try {
    const res = await apiRequest("v3/search", { method: "POST", body: payload });
    const list = filterPeopleOut(filterWebVersion(extractArray(res)));
    if (list.length === 0 && payload.sort_key) {
      const res2 = await apiRequest("v3/search", {
        method: "POST",
        body: { ...payload, sort_key: "", sort_order: "" }
      });
      return filterPeopleOut(filterWebVersion(extractArray(res2)));
    }
    return list;
  } catch {
    return [];
  }
}
async function searchByTitle(query) {
  const q = query.trim();
  const list = await searchMovies({ title: q });
  if (list.length > 0) return list;
  const endpoints = [
    `v3/search?q=${encodeURIComponent(q)}`,
    `search?q=${encodeURIComponent(q)}`
  ];
  for (const ep of endpoints) {
    try {
      const r = await apiRequest(ep);
      const arr = filterPeopleOut(filterWebVersion(extractArray(r)));
      if (arr.length) return arr;
    } catch {
    }
  }
  return [];
}
async function fetchByGenre(genreId, page = 1) {
  return searchMovies({ genreIds: [genreId], sortKey: "newest", page });
}
async function fetchByCountry(countryId, page = 1) {
  return searchMovies({ countryIds: [countryId], sortKey: "newest", page });
}
async function fetchByStar(starId, starName, homeSections) {
  const endpoints = [
    `star/${starId}`,
    `v3/star/${starId}`,
    `star/${starId}/movies`,
    `v3/star/${starId}/movies`,
    `movie/star/${starId}`,
    `stars/${starId}`
  ];
  for (const ep of endpoints) {
    try {
      const r = await apiRequest(ep);
      const arr = filterPeopleOut(filterWebVersion(extractArray(r)));
      if (arr.length) return arr;
    } catch {
    }
  }
  if (starName) {
    const byName = await searchMovies({ title: starName });
    if (byName.length) return byName;
  }
  const matched = [];
  for (const sec of homeSections || []) {
    for (const m of sec.items || []) {
      const allStars = [...m.stars || [], ...m.actors || [], ...m.casts || [], ...m.cast || []];
      if (allStars.some((s) => String(getMovieId(s)) === String(starId))) {
        matched.push(m);
      }
    }
  }
  return filterPeopleOut(filterWebVersion(matched));
}
async function fetchStarsPage(page) {
  const endpoints = [
    `stars?page=${page}`,
    `v3/stars?page=${page}`,
    `actors?page=${page}`,
    `v3/actors?page=${page}`,
    `star/list?page=${page}`,
    `stars/list?page=${page}`,
    `people?page=${page}`
  ];
  for (const ep of endpoints) {
    try {
      const r = await apiRequest(ep);
      const arr = extractArray(r);
      if (arr.length) return arr;
    } catch {
    }
  }
  return [];
}
async function fetchSectionAll(sec, sectionIndex = 0) {
  var _a;
  const secId = sec.id || sec.section_id || sec.slide_id;
  const secTitle = cleanTitle(sec.title || sec.name || "");
  if (secId) {
    const allItems = [];
    const pageEndpoints = [
      `v3/section/${secId}`,
      `section/${secId}`,
      `v3/section/${secId}?page=1`,
      `v3/home/${secId}`
    ];
    for (const ep of pageEndpoints) {
      try {
        const r = await apiRequest(ep);
        const arr = filterPeopleOut(filterWebVersion(extractArray(r)));
        if (arr.length) {
          allItems.push(...arr);
          break;
        }
      } catch {
      }
    }
    if (allItems.length) {
      for (let p = 2; p <= 5; p++) {
        try {
          const r = await apiRequest(`v3/section/${secId}?page=${p}`);
          const arr = filterPeopleOut(filterWebVersion(extractArray(r)));
          if (!arr.length) break;
          allItems.push(...arr);
        } catch {
          break;
        }
      }
      if (allItems.length > (((_a = sec.items) == null ? void 0 : _a.length) || 0)) return allItems;
    }
  }
  const t = secTitle;
  let heuristic = [];
  if (t.includes("انیمیشن")) heuristic = await searchMovies({ genreIds: [12], sortKey: "newest" });
  else if (t.includes("کره")) heuristic = await searchMovies({ countryIds: [39], sortKey: "newest" });
  else if (t.includes("ترکیه")) heuristic = await searchMovies({ countryIds: [40], sortKey: "newest" });
  else if (t.includes("هند") || t.includes("بالیوود")) heuristic = await searchMovies({ countryIds: [36], sortKey: "newest" });
  else if (t.includes("سریال")) heuristic = await searchMovies({ type: "series", sortKey: "newest" });
  else if (t.includes("جدید") || t.includes("به‌روز")) heuristic = await searchMovies({ sortKey: "newest" });
  else if (t.includes("برتر") || t.includes("محبوب") || sectionIndex === 0) {
    heuristic = await searchMovies({ sortKey: "imdb_rating" });
  }
  const combined = [...sec.items || [], ...heuristic];
  return filterPeopleOut(filterWebVersion(combined));
}
async function fetchCatalogByType(type, page = 1) {
  return searchMovies({ type, sortKey: "newest", page });
}
const WATCHED_KEY = "toosh-watched-v2";
const HISTORY_KEY = "toosh-history-v2";
const LIKES_KEY = "toosh-likes-v2";
const SAVED_KEY = "toosh-saved-downloads-v1";
const DL_RECORDS_KEY = "toosh-download-records-v1";
const PLAY_PREF_KEY = "toosh-pref-v1";
const PROFILE_KEY = "toosh-profile-v1";
const WEB_PROGRESS_KEY = "toosh-progress-v1";
function getWatchedData() {
  try {
    const raw = localStorage.getItem(WATCHED_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        qualities: parsed.qualities || {},
        episodes: parsed.episodes || {},
        movies: parsed.movies || {}
      };
    }
  } catch {
  }
  return { qualities: {}, episodes: {}, movies: {} };
}
function saveWatchedData(data) {
  try {
    localStorage.setItem(WATCHED_KEY, JSON.stringify(data));
  } catch {
  }
}
function markEpisodeWatched(movieId, seasonIdx, episodeIdx, quality) {
  const data = getWatchedData();
  const s = `${movieId}_${seasonIdx}_${episodeIdx}`;
  data.episodes[s] = { quality, timestamp: Date.now() };
  data.qualities[`${s}_${quality}`] = Date.now();
  saveWatchedData(data);
}
function toggleEpisodeWatchedManual(movieId, seasonIdx, episodeIdx) {
  const data = getWatchedData();
  const s = `${movieId}_${seasonIdx}_${episodeIdx}`;
  const was = Boolean(data.episodes[s]);
  if (was) {
    delete data.episodes[s];
  } else {
    data.episodes[s] = { quality: "دستی", timestamp: Date.now() };
  }
  saveWatchedData(data);
  return !was;
}
function markMovieWatched(movieId, quality) {
  const data = getWatchedData();
  data.movies[String(movieId)] = { quality, timestamp: Date.now() };
  data.qualities[`${movieId}_movie_${quality}`] = Date.now();
  saveWatchedData(data);
}
function getWatchHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}
function addToWatchHistory(movie, quality = "") {
  if (!movie) return;
  const id = String(getMovieId(movie));
  if (!id) return;
  const list = getWatchHistory().filter((m) => String(getMovieId(m)) !== id);
  list.unshift({ ...movie, _watchedAt: Date.now(), _watchedQuality: quality });
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, 60)));
  } catch {
  }
}
function clearWatchHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {
  }
}
function getLikedMovies() {
  try {
    return JSON.parse(localStorage.getItem(LIKES_KEY) || "[]");
  } catch {
    return [];
  }
}
function isMovieLiked(movieId) {
  const s = String(movieId);
  return getLikedMovies().some((m) => String(getMovieId(m)) === s);
}
function toggleLikeMovie(movie) {
  const id = String(getMovieId(movie));
  const list = getLikedMovies();
  const idx = list.findIndex((m) => String(getMovieId(m)) === id);
  let liked = false;
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.unshift(movie);
    liked = true;
  }
  try {
    localStorage.setItem(LIKES_KEY, JSON.stringify(list));
  } catch {
  }
  return liked;
}
function getSavedDownloads() {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function isMovieSaved(movieId) {
  const s = String(movieId);
  return getSavedDownloads().some((item) => String(item.id) === s);
}
function toggleSaveMovie(movie) {
  const id = String(getMovieId(movie));
  const list = getSavedDownloads();
  const idx = list.findIndex((item) => String(item.id) === id);
  let saved = false;
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.unshift({
      id,
      title: getMovieTitle(movie),
      poster: getPosterUrl(movie),
      type: getMovieType(movie) === "series" ? "series" : "movie",
      year: getMovieYear(movie),
      savedAt: Date.now(),
      movie
    });
    saved = true;
  }
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(list));
  } catch {
  }
  return saved;
}
function getDownloadRecords() {
  try {
    return JSON.parse(localStorage.getItem(DL_RECORDS_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveDownloadRecords(records) {
  try {
    localStorage.setItem(DL_RECORDS_KEY, JSON.stringify(records));
  } catch {
  }
}
function addDownloadRecord(record) {
  const list = getDownloadRecords().filter((r) => r.dmId !== record.dmId);
  list.unshift(record);
  saveDownloadRecords(list);
}
function removeDownloadRecord(dmId) {
  const list = getDownloadRecords().filter((r) => r.dmId !== dmId);
  saveDownloadRecords(list);
}
function getPlayPref() {
  try {
    const raw = localStorage.getItem(PLAY_PREF_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function savePlayPref(pref) {
  try {
    localStorage.setItem(PLAY_PREF_KEY, JSON.stringify(pref));
  } catch {
  }
}
function clearPlayPref() {
  try {
    localStorage.removeItem(PLAY_PREF_KEY);
  } catch {
  }
}
function getUserProfile() {
  try {
    const parsed = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");
    let joined = parsed.joined;
    if (!joined) {
      joined = Date.now();
      localStorage.setItem(
        PROFILE_KEY,
        JSON.stringify({ name: parsed.name || "تماشاگر توش", avatar: parsed.avatar || "", joined })
      );
    }
    return {
      name: parsed.name || "تماشاگر توش",
      avatar: parsed.avatar || "",
      joined
    };
  } catch {
    return { name: "تماشاگر توش", avatar: "", joined: Date.now() };
  }
}
function saveUserProfile(partial) {
  const next = { ...getUserProfile(), ...partial };
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
  } catch {
  }
  return next;
}
function getProgressList() {
  var _a;
  try {
    if ((_a = window.AndroidPlayer) == null ? void 0 : _a.getProgress) {
      const raw = JSON.parse(window.AndroidPlayer.getProgress() || "[]");
      if (Array.isArray(raw)) return raw;
    }
  } catch {
  }
  try {
    const raw = JSON.parse(localStorage.getItem(WEB_PROGRESS_KEY) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}
function saveProgressItem(item) {
  try {
    const list = getProgressList().filter((p) => p.k !== item.k);
    list.unshift(item);
    localStorage.setItem(WEB_PROGRESS_KEY, JSON.stringify(list.slice(0, 30)));
  } catch {
  }
}
function removeProgressItem(key) {
  var _a, _b;
  try {
    (_b = (_a = window.AndroidPlayer) == null ? void 0 : _a.removeProgress) == null ? void 0 : _b.call(_a, key);
  } catch {
  }
  try {
    const list = getProgressList().filter((p) => p.k !== key);
    localStorage.setItem(WEB_PROGRESS_KEY, JSON.stringify(list));
  } catch {
  }
}
const SplashOverlay = ({
  visible,
  error,
  onRetry,
  onOpenDiag
}) => {
  if (!visible) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center",
      style: { backgroundColor: "var(--bg)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "px-4 pt-1 pb-0.5 border-[3px] shadow-[4px_4px_0_var(--ink)] -rotate-2 mb-4",
              style: {
                backgroundColor: "var(--primary)",
                borderColor: "var(--ink)",
                fontFamily: "var(--font-display)",
                fontSize: "2.75rem",
                lineHeight: 1,
                letterSpacing: "0.06em",
                color: "#fff"
              },
              children: "TOOSH"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black tracking-wide", style: { color: "var(--text)" }, children: "TOOSH MOVIE" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold mt-1", style: { color: "var(--secondary)" }, children: "سینمای جیبی شما" })
        ] }),
        !error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-spin", style: { width: "34px", height: "34px" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold animate-pulse", style: { color: "var(--secondary)" }, children: "در حال اتصال به سرور..." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-full max-w-sm rounded-3xl p-6 border-2",
            style: {
              backgroundColor: "var(--surface)",
              borderColor: "var(--ink)",
              boxShadow: "5px 5px 0 var(--ink)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center border-2",
                  style: {
                    backgroundColor: "color-mix(in srgb, var(--primary) 18%, transparent)",
                    borderColor: "var(--ink)",
                    color: "var(--primary-bright)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { className: "w-7 h-7" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-black mb-2", style: { color: "var(--text)" }, children: "اتصال برقرار نشد" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-6 mb-4", style: { color: "var(--secondary)" }, children: formatApiError(error) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[11px] leading-5 mb-5 px-3 py-2 rounded-xl border",
                  style: {
                    backgroundColor: "var(--surface-2)",
                    borderColor: "var(--border-strong)",
                    color: "var(--text-2)"
                  },
                  children: "در صورت روشن بودن فیلترشکن (VPN)، آن را خاموش کنید و دوباره امتحان کنید."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: onRetry,
                    className: "w-full py-3 rounded-xl font-black text-sm text-white flex items-center justify-center gap-2 cursor-pointer",
                    style: {
                      backgroundColor: "var(--primary)",
                      border: "2px solid var(--ink)",
                      boxShadow: "3px 3px 0 var(--ink)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تلاش مجدد" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onOpenDiag,
                    className: "w-full py-2.5 rounded-xl font-bold text-xs cursor-pointer",
                    style: {
                      backgroundColor: "var(--surface-2)",
                      color: "var(--text)",
                      border: "2px solid var(--ink)"
                    },
                    children: "مشاهده جزئیات اتصال"
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
};
const OfflineBanner = ({ message, onRetry }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-14 px-5 text-center", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border-2",
      style: {
        backgroundColor: "var(--surface)",
        borderColor: "var(--ink)",
        boxShadow: "4px 4px 0 var(--ink)",
        color: "var(--primary-bright)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { className: "w-8 h-8" })
    }
  ),
  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-black mb-1.5", style: { color: "var(--text)" }, children: "خطا در دریافت اطلاعات" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-6 max-w-xs mb-5", style: { color: "var(--secondary)" }, children: message || "اتصال اینترنت یا وضعیت فیلترشکن خود را بررسی کنید و دوباره تلاش کنید." }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: onRetry,
      className: "px-6 py-2.5 rounded-xl font-black text-sm text-white flex items-center gap-2 cursor-pointer",
      style: {
        backgroundColor: "var(--primary)",
        border: "2px solid var(--ink)",
        boxShadow: "3px 3px 0 var(--ink)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تلاش مجدد" })
      ]
    }
  )
] });
const SkeletonGrid = ({ count = 12 }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3", children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: "w-full aspect-[2/3] rounded-2xl skeleton-shimmer",
    style: { backgroundColor: "var(--surface)" }
  },
  i
)) });
const MovieCard = React.memo(({ movie, onClick }) => {
  const title = getMovieTitle(movie);
  const year = getMovieYear(movie);
  const rating = getImdbRating(movie);
  const poster = getPosterUrl(movie);
  const isSeries = getMovieType(movie) === "series";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: () => onClick(movie),
      className: "group relative flex flex-col w-full text-right rounded-2xl overflow-hidden card-hover focus:outline-none cursor-pointer",
      style: { backgroundColor: "var(--surface)" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full aspect-[2/3] overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: poster,
            alt: title,
            loading: "lazy",
            decoding: "async",
            onError: (e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = POSTER_FALLBACK_SVG;
            },
            className: "w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none absolute inset-x-0 bottom-0 h-2/3",
            style: { background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.28) 55%, transparent 100%)" }
          }
        ),
        rating && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-black/80 text-[10px] font-extrabold text-amber-400 border border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-2.5 h-2.5 fill-amber-400 text-amber-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: rating })
        ] }),
        isSeries && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-2 left-2 px-1.5 py-0.5 rounded-lg text-[9px] font-black text-white",
            style: { backgroundColor: "rgba(238,59,23,0.95)" },
            children: "سریال"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 inset-x-0 p-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[12px] sm:text-xs font-extrabold text-white line-clamp-2 leading-tight drop-shadow", children: title }),
          year && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/75 mt-1 font-medium", children: year })
        ] })
      ] })
    }
  );
});
MovieCard.displayName = "MovieCard";
const ContinueWatching = ({
  onResume,
  refreshTick = 0
}) => {
  const [items, setItems] = reactExports.useState([]);
  reactExports.useEffect(() => {
    setItems(getProgressList());
  }, [refreshTick]);
  reactExports.useEffect(() => {
    const onFocus = () => setItems(getProgressList());
    const onStorage = () => setItems(getProgressList());
    window.addEventListener("focus", onFocus);
    window.addEventListener("tm-progress-update", onStorage);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("tm-progress-update", onStorage);
    };
  }, []);
  if (!items.length) return null;
  const parseMeta = (raw) => {
    try {
      return JSON.parse(raw || "{}");
    } catch {
      return {};
    }
  };
  const handleRemove = (key) => {
    removeProgressItem(key);
    setItems((prev) => prev.filter((x) => x.k !== key));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "tm-resume", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "tm-resume-h", children: "ادامه‌ی تماشا" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-resume-row", children: items.map((item) => {
      const meta = parseMeta(item.meta);
      const title = meta.title || item.title || "بدون عنوان";
      const poster = meta.poster || POSTER_FALLBACK_SVG;
      const pct = item.dur > 0 ? Math.min(100, Math.round(item.pos / item.dur * 100)) : 0;
      const left = item.dur > item.pos ? Math.round((item.dur - item.pos) / 6e4) : 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-rc", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "tm-rc-b",
            onClick: () => onResume(item),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tm-rc-img", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: poster,
                    alt: title,
                    loading: "lazy",
                    onError: (e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = POSTER_FALLBACK_SVG;
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-play tm-rc-play" }),
                pct > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-rc-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { style: { width: `${pct}%` } }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-rc-t", children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tm-rc-s", children: [
                meta.ep ? `${meta.ep} · ` : "",
                left > 0 ? `${left} دقیقه مانده` : item.pos > 0 ? formatDuration(item.pos / 1e3) : ""
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "tm-rc-x",
            "aria-label": "حذف",
            onClick: () => handleRemove(item.k),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-x" })
          }
        )
      ] }, item.k);
    }) })
  ] });
};
const GENRE_ACCENTS = ["#ee3b17", "#ffd60a", "#0ea5c6", "#0f9d63", "#8b5cf6", "#e08a00"];
const CategoriesView = ({
  countries,
  genres,
  stars,
  onSelectGenre,
  onSelectCountry,
  onSelectStar,
  onOpenAllCountries,
  onOpenAllStars
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-12", children: [
    countries.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-cats-top", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "tm-cats-h2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-globe" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "کشورهای سازنده" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "tm-cats-c", onClick: onOpenAllCountries, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "همه" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-chev" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-cc-row no-scrollbar", children: countries.slice(0, 18).map((c, i) => {
        const name = cleanTitle(c.name || c.title || "");
        const img = resolveMediaUrl(c.image);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "tm-cc",
            onClick: () => onSelectCountry(c),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-cc-a", children: img ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: name, loading: "lazy" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-globe" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-cc-t", children: name })
            ]
          },
          `${c.id || i}`
        );
      }) })
    ] }),
    stars.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-cats-top", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "tm-cats-h2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-star" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ستاره‌ها و هنرمندان" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "tm-cats-c", onClick: onOpenAllStars, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "همه" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-chev" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-cc-row no-scrollbar", children: stars.slice(0, 20).map((s, i) => {
        const name = cleanTitle(s.name || s.title || "");
        const img = resolveMediaUrl(s.image);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "tm-cc",
            onClick: () => onSelectStar(s),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-cc-a", children: img ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: name, loading: "lazy" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-user" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-cc-t", children: name })
            ]
          },
          `${s.id || s.star_id || i}`
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-cats-top", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "tm-cats-h2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-grid" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ژانرها" })
    ] }) }),
    genres.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-empty", children: "ژانری یافت نشد" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-cats-grid", children: genres.map((g, i) => {
      const name = cleanTitle(g.name || g.title || "");
      const color = GENRE_ACCENTS[i % GENRE_ACCENTS.length];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "tm-cat",
          style: { "--i": i, "--c": color },
          onClick: () => onSelectGenre(g),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-cat-b" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-cat-t", children: name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-chev" })
          ]
        },
        `${g.id || i}`
      );
    }) })
  ] });
};
const ProfileView = ({
  profile,
  onProfileChange,
  historyCount,
  likesCount,
  savedCount,
  downloadsCount,
  onOpenDownloads,
  onOpenHistory,
  onOpenLikes,
  onOpenThemes,
  onOpenSettings,
  onToast,
  appVersion
}) => {
  const [editing, setEditing] = reactExports.useState(false);
  const [draftName, setDraftName] = reactExports.useState(profile.name);
  const watched = getWatchedData();
  const watchedTotal = Object.keys(watched.episodes || {}).length + Object.keys(watched.movies || {}).length;
  const handleAvatarUpload = async (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const dataUrl = await shrinkAvatarImage(file);
    if (dataUrl) {
      const next = saveUserProfile({ avatar: dataUrl });
      onProfileChange(next);
      onToast("تصویر پروفایل ذخیره شد");
    } else {
      onToast("خطا در پردازش تصویر", "error");
    }
    e.target.value = "";
  };
  const handleRemoveAvatar = () => {
    const next = saveUserProfile({ avatar: "" });
    onProfileChange(next);
    onToast("تصویر پروفایل حذف شد");
  };
  const handleSaveName = () => {
    const trimmed = draftName.trim() || "تماشاگر توش";
    const next = saveUserProfile({ name: trimmed });
    onProfileChange(next);
    setDraftName(trimmed);
    setEditing(false);
    onToast("نام ذخیره شد");
  };
  const initial = (profile.name || "ت").trim().charAt(0).toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-pf pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-pf-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-pf-av", children: [
        profile.avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: profile.avatar, alt: profile.name }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: initial }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "tm-pf-cam", title: "تغییر تصویر", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-pencil" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: handleAvatarUpload })
        ] })
      ] }),
      !editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-pf-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "tm-pf-name", children: profile.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tm-pf-chip", children: [
            "عضو از ",
            formatPersianDate(profile.joined) || "امروز"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tm-pf-chip tm-pf-chip2", children: [
            "نسخه ",
            toPersianDigits(appVersion)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "tm-pf-editb",
              onClick: () => {
                setDraftName(profile.name);
                setEditing(true);
              },
              children: "ویرایش نام"
            }
          ),
          profile.avatar && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "tm-pf-editb",
              onClick: handleRemoveAvatar,
              children: "حذف عکس"
            }
          )
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-pf-edit", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            className: "tm-pf-in",
            value: draftName,
            maxLength: 32,
            autoFocus: true,
            onChange: (e) => setDraftName(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter") handleSaveName();
              if (e.key === "Escape") setEditing(false);
            },
            placeholder: "نام دلخواه شما..."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-pf-btns", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "tm-top-btn tm-top-primary",
              onClick: handleSaveName,
              children: "ذخیره"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "tm-top-btn tm-top-ghost",
              onClick: () => setEditing(false),
              children: "انصراف"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-pf-stats", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-pf-st", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: toPersianDigits(historyCount) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تماشاشده" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-pf-st", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: toPersianDigits(likesCount) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "علاقه‌مندی" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-pf-st", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: toPersianDigits(savedCount) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ذخیره‌شده" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-pf-st", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: toPersianDigits(watchedTotal) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "قسمت دیده‌شده" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-pf-rows", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "tm-pf-row", onClick: onOpenDownloads, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-download" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-pf-rl", children: "دانلودها و ذخیره‌ها" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-pf-rs", children: toPersianDigits(downloadsCount + savedCount) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-chev" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "tm-pf-row", onClick: onOpenHistory, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-clock" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-pf-rl", children: "تاریخچه تماشا" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-pf-rs", children: toPersianDigits(historyCount) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-chev" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "tm-pf-row", onClick: onOpenLikes, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-heart" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-pf-rl", children: "علاقه‌مندی‌ها" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-pf-rs", children: toPersianDigits(likesCount) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-chev" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "tm-pf-row", onClick: onOpenThemes, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-palette" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-pf-rl", children: "انتخاب تم و ظاهر" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-chev" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "tm-pf-row", onClick: onOpenSettings, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-gear" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-pf-rl", children: "تنظیمات و حافظه" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-chev" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "tm-pf-row", onClick: openTelegramChannel, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-send" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-pf-rl", children: "کانال تلگرام توش مووی" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-pf-rs", style: { direction: "ltr" }, children: "@TOOSH_MOVIE" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-chev" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "tm-set-ver", children: [
      "TOOSH MOVIE v",
      appVersion
    ] })
  ] });
};
const MovieInfo = ({ movie }) => {
  const moreId = reactExports.useId();
  const extractList = (key) => {
    const val = movie == null ? void 0 : movie[key];
    if (!Array.isArray(val)) return "";
    return val.map((item) => {
      if (typeof item === "string") return cleanTitle(item);
      if (item && typeof item === "object") {
        const obj = item;
        return cleanTitle(obj.name || obj.title || "");
      }
      return "";
    }).filter(Boolean).slice(0, 6).join("، ");
  };
  const director = cleanTitle(movie.director || movie.directors || "");
  const cast = extractList("stars") || extractList("actors") || extractList("cast");
  const genres = extractList("genres");
  const countries = extractList("countries") || cleanTitle(movie.country || "");
  const year = getMovieYear(movie);
  const imdb = getImdbRating(movie);
  const duration = cleanTitle(movie.duration || movie.runtime || movie.time || "");
  const age = cleanTitle(movie.age_rating || movie.certification || "");
  const plot = getPlotText(movie);
  const facts = [];
  if (genres) facts.push({ label: "ژانر", value: genres });
  if (countries) facts.push({ label: "کشور", value: countries });
  if (year) facts.push({ label: "سال انتشار", value: year });
  if (imdb) facts.push({ label: "امتیاز IMDb", value: imdb });
  if (duration) facts.push({ label: "مدت زمان", value: duration });
  if (age) facts.push({ label: "رده سنی", value: age });
  if (director) facts.push({ label: "کارگردان", value: director, wide: true });
  if (cast) facts.push({ label: "بازیگران", value: cast, wide: true });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-info", children: [
    facts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "tm-facts", children: facts.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `tm-fact${f.wide ? " tm-fact-wide" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: f.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: f.value })
    ] }, f.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-plot", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-plot-label", children: "خلاصه داستان" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: moreId, type: "checkbox", className: "tm-more" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tm-plot-text tm-clamp", children: plot }),
      plot.length > 160 && /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: moreId, className: "tm-more-btn" })
    ] })
  ] });
};
const TrailerButton = ({
  movie,
  linksData,
  onPlayTrailer
}) => {
  const url = findTrailerUrl(movie, linksData);
  if (!url) return null;
  const title = `پیش‌نمایش · ${getMovieTitle(movie)}`;
  const handleClick = () => {
    var _a, _b;
    if ((_a = window.AndroidPlayer) == null ? void 0 : _a.playNativeEx) {
      window.AndroidPlayer.playNativeEx(
        url,
        title,
        buildNativeMeta(movie, { isTrailer: true })
      );
    } else if ((_b = window.AndroidPlayer) == null ? void 0 : _b.playNative) {
      window.AndroidPlayer.playNative(url, title);
    } else {
      onPlayTrailer(url, title);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "tm-trailer", onClick: handleClick, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-trailer", "aria-hidden": "true" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تماشای پیش‌نمایش" })
  ] });
};
const MovieDetails = ({
  movie,
  onBack,
  onOpenSmartSheet,
  onPlaySource,
  onDownloadSource,
  onLikesChanged,
  onSavedChanged,
  onToast
}) => {
  const movieId = getMovieId(movie);
  const [details, setDetails] = reactExports.useState(movie);
  const [sources, setSources] = reactExports.useState([]);
  const [subtitles, setSubtitles] = reactExports.useState([]);
  const [seasons, setSeasons] = reactExports.useState([]);
  const [linksData, setLinksData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const [openSeasonIdx, setOpenSeasonIdx] = reactExports.useState(0);
  const [liked, setLiked] = reactExports.useState(() => isMovieLiked(movieId));
  const [saved, setSaved] = reactExports.useState(() => isMovieSaved(movieId));
  const [watchedTick, setWatchedTick] = reactExports.useState(0);
  const [dlFlash, setDlFlash] = reactExports.useState(false);
  const loadSeqRef = reactExports.useRef(0);
  const loadData = async () => {
    const seq = ++loadSeqRef.current;
    setLoading(true);
    setError("");
    try {
      const [det, lnk] = await Promise.all([
        fetchMovieDetails(movieId),
        fetchMovieLinks(movieId)
      ]);
      if (seq !== loadSeqRef.current) return;
      const merged = { ...movie, ...det || {} };
      setDetails(merged);
      setLinksData(lnk);
      const type = getMovieType(merged);
      const srcs = sortSources([...extractSources(merged.sources), ...extractSources(lnk)]);
      const subs = [...extractSubtitles(merged), ...extractSubtitles(lnk)];
      setSources(srcs);
      setSubtitles(subs);
      if (type === "series") {
        const sList = await fetchSeriesSeasons(movieId);
        if (seq !== loadSeqRef.current) return;
        setSeasons(sList);
        window.__tmSeasons = sList;
      } else {
        setSeasons([]);
        window.__tmSeasons = void 0;
      }
    } catch {
      if (seq !== loadSeqRef.current) return;
      setError("خطا در دریافت اطلاعات فیلم/سریال");
    } finally {
      if (seq === loadSeqRef.current) {
        setLoading(false);
      }
    }
  };
  reactExports.useEffect(() => {
    setDetails(movie);
    setSources([]);
    setSeasons([]);
    setLiked(isMovieLiked(movieId));
    setSaved(isMovieSaved(movieId));
    loadData();
    return () => {
      loadSeqRef.current++;
      window.__tmSeasons = void 0;
    };
  }, [movieId]);
  const title = getMovieTitle(details);
  const year = getMovieYear(details);
  const imdb = getImdbRating(details);
  const poster = getPosterUrl(details);
  const backdrop = getBackdropUrl(details);
  const isSeries = getMovieType(details) === "series";
  const watched = reactExports.useMemo(() => {
    return getWatchedData();
  }, [watchedTick, movieId]);
  const handleLike = () => {
    const next = toggleLikeMovie(details);
    setLiked(next);
    onLikesChanged();
    onToast(next ? "به علاقه‌مندی‌ها اضافه شد" : "از علاقه‌مندی‌ها حذف شد");
  };
  const handleSave = () => {
    const next = toggleSaveMovie(details);
    setSaved(next);
    onSavedChanged();
    onToast(next ? "در لیست ذخیره‌ها ثبت شد" : "از لیست ذخیره‌ها حذف شد");
  };
  const scrollToDownloadBox = () => {
    const box = document.getElementById("tm-dlbox");
    if (box) {
      box.scrollIntoView({ behavior: "smooth", block: "start" });
      setDlFlash(true);
      setTimeout(() => setDlFlash(false), 1400);
    }
  };
  const handleCopySeasonLinks = async (se) => {
    const eps = se.episodes || se.items || se.episode || [];
    const lines = [];
    eps.forEach((ep, ei) => {
      const epSrcs = sortSources(extractSources(ep));
      const best = pickDownloadUrl(epSrcs);
      if (best) {
        lines.push(`${cleanTitle(ep.title || ep.name || `قسمت ${ei + 1}`)}: ${best.url}`);
      }
    });
    if (!lines.length) {
      onToast("لینکی برای کپی پیدا نشد", "error");
      return;
    }
    const ok = await copyTextToClipboard(lines.join("\n"));
    onToast(ok ? `لینک ${lines.length} قسمت کپی شد` : "کپی ناموفق بود", ok ? "success" : "error");
  };
  const handleDownloadSeason = (se) => {
    const eps = se.episodes || se.items || se.episode || [];
    let count = 0;
    eps.forEach((ep, ei) => {
      const epSrcs = sortSources(extractSources(ep));
      const best = pickDownloadUrl(epSrcs);
      if (best) {
        count++;
        const epTitle = cleanTitle(ep.title || ep.name || `قسمت ${ei + 1}`);
        onDownloadSource(best.url, `${title} - ${epTitle}`, normalizeQualityLabel(best.quality), details);
      }
    });
    if (!count) {
      onToast("لینکی برای دانلود یافت نشد", "error");
    } else {
      onToast(`دانلود ${count} قسمت با کیفیت بهینه آغاز شد`);
    }
  };
  const groupedMovieSources = reactExports.useMemo(() => groupSources(sources), [sources]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-10 flex flex-col items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-4xl flex items-center justify-between gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: onBack,
          className: "px-3.5 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 cursor-pointer",
          style: {
            backgroundColor: "var(--surface)",
            color: "var(--text)",
            border: "2px solid var(--ink)",
            boxShadow: "3px 3px 0 var(--ink)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "بازگشت" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleLike,
          className: "px-3 py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer",
          style: liked ? {
            backgroundColor: "var(--primary)",
            color: "#fff",
            border: "2px solid var(--ink)",
            boxShadow: "3px 3px 0 var(--ink)"
          } : {
            backgroundColor: "var(--surface)",
            color: "var(--text)",
            border: "2px solid var(--ink)",
            boxShadow: "3px 3px 0 var(--ink)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `w-4 h-4 ${liked ? "fill-current" : ""}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: liked ? "پسندیده‌شده" : "علاقه‌مندی" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleSave,
          className: "px-3 py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer",
          style: saved ? {
            backgroundColor: "var(--accent)",
            color: "#000",
            border: "2px solid #000",
            boxShadow: "3px 3px 0 #000"
          } : {
            backgroundColor: "var(--surface)",
            color: "var(--text)",
            border: "2px solid var(--ink)",
            boxShadow: "3px 3px 0 var(--ink)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: `w-4 h-4 ${saved ? "fill-current" : ""}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: saved ? "ذخیره‌شد" : "ذخیره" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-4xl rounded-[26px] overflow-hidden mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full overflow-hidden h-52 sm:h-64", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: backdrop,
            alt: title,
            className: "w-full h-full object-cover",
            onError: (e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = POSTER_FALLBACK_SVG;
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0",
            style: {
              background: "linear-gradient(to top, var(--surface) 5%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.2) 100%)"
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-20 px-5 pb-6 -mt-20 flex flex-col sm:flex-row items-center sm:items-end gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative rounded-[20px] w-36 sm:w-44 aspect-[2/3] shrink-0 overflow-visible", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: poster,
            alt: title,
            className: "w-full h-full object-cover",
            onError: (e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = POSTER_FALLBACK_SVG;
            }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center sm:text-right w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-3xl font-black leading-tight mb-2.5", style: { color: "var(--text)" }, children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "px-2.5 py-1 rounded-md text-xs font-black text-white border-2",
                style: { backgroundColor: "var(--primary)", borderColor: "var(--ink)" },
                children: isSeries ? "سریال" : "فیلم سینمایی"
              }
            ),
            year && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "px-2.5 py-1 rounded-md text-xs font-black border-2",
                style: {
                  backgroundColor: "var(--surface-2)",
                  borderColor: "var(--ink)",
                  color: "var(--text)"
                },
                children: year
              }
            ),
            imdb && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2.5 py-1 rounded-md text-xs font-black bg-amber-400 text-black border-2 border-black flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 fill-black" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                imdb,
                " IMDb"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-top", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "tm-top-btn tm-top-primary flex-1 min-w-[140px]",
                onClick: () => onOpenSmartSheet(details, sources, seasons),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-play" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "پخش آنلاین" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "tm-top-btn tm-top-ghost flex-1 min-w-[140px]",
                onClick: scrollToDownloadBox,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-download" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "باکس دانلود" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TrailerButton,
            {
              movie: details,
              linksData,
              onPlayTrailer: (tUrl, tTitle) => {
                onPlaySource(tUrl, tTitle, [{ url: tUrl, quality: "پیش‌نمایش", size: "", score: 90 }], [], {
                  movie: details,
                  quality: "پیش‌نمایش"
                });
              }
            }
          )
        ] })
      ] })
    ] }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-4xl flex flex-col items-center py-8 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold", style: { color: "var(--secondary)" }, children: "در حال دریافت لینک‌ها و جزئیات..." })
    ] }),
    error && !loading && /* @__PURE__ */ jsxRuntimeExports.jsx(OfflineBanner, { message: error, onRetry: loadData }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MovieInfo, { movie: details }),
    !isSeries && !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        id: "tm-dlbox",
        className: `w-full max-w-3xl mt-6 p-4 rounded-2xl border${dlFlash ? " tm-flash" : ""}`,
        style: { backgroundColor: "var(--surface)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "لینک‌های پخش و دانلود" }),
          groupedMovieSources.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold py-4 text-center", style: { color: "var(--secondary)" }, children: "لینکی برای این فیلم ثبت نشده است." }) : groupedMovieSources.map((grp) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-dl-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `tm-dl-title ${grp.cls}`, children: grp.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: grp.items.map((src, i) => {
              const qLabel = normalizeQualityLabel(src.quality);
              const resVal = resolutionValue(src.quality);
              const ext = getFileExt(src.url);
              const isWatchedQ = Boolean(
                watched.qualities[`${movieId}_movie_${qLabel}`]
              );
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => onPlaySource(
                      src.url,
                      `${title} (${qLabel})`,
                      sources,
                      subtitles,
                      { movie: details, quality: qLabel }
                    ),
                    className: "flex items-center justify-between gap-3 cursor-pointer",
                    style: {
                      backgroundColor: isWatchedQ ? "color-mix(in srgb, var(--primary) 16%, var(--surface))" : "var(--surface)",
                      color: "var(--text)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 font-black", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 fill-current text-[var(--primary)]" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tm-q", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: resVal ? `${resVal}p` : qLabel }),
                          ext && /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: ext.toUpperCase() })
                        ] }),
                        isWatchedQ && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-0.5 text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-500", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3" }),
                          "دیده‌شده"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold", style: { color: "var(--secondary)" }, children: formatFileSize(src.size) || qLabel })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    title: `دانلود ${qLabel}`,
                    onClick: () => onDownloadSource(src.url, title, qLabel, details),
                    className: "flex items-center justify-center cursor-pointer",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" })
                  }
                )
              ] }, `${src.url}_${i}`);
            }) })
          ] }, grp.key))
        ]
      }
    ),
    isSeries && !loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "tm-dlbox", className: `w-full max-w-4xl mt-6 flex flex-col gap-4${dlFlash ? " tm-flash" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mt-3 w-full space-y-4", children: seasons.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-2xl p-6 text-center font-bold text-sm",
        style: { backgroundColor: "var(--surface)", color: "var(--secondary)" },
        children: "قسمتی برای این سریال یافت نشد."
      }
    ) : seasons.map((se, sIdx) => {
      const isOpen = openSeasonIdx === sIdx;
      const eps = se.episodes || se.items || se.episode || [];
      const sTitle = cleanTitle(se.title || se.name || `فصل ${se.season || sIdx + 1}`);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            role: "button",
            tabIndex: 0,
            onClick: () => setOpenSeasonIdx(isOpen ? -1 : sIdx),
            onKeyDown: (e) => {
              if (e.key === "Enter") setOpenSeasonIdx(isOpen ? -1 : sIdx);
            },
            className: "p-4 flex items-center justify-between gap-2 cursor-pointer select-none",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-black", children: sTitle }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold", style: { color: "var(--secondary)" }, children: [
                  "(",
                  eps.length,
                  " قسمت)"
                ] })
              ] }),
              isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-5 h-5", style: { color: "var(--text)" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-5 h-5", style: { color: "var(--text)" } })
            ]
          }
        ),
        isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3.5 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-extrabold", style: { color: "var(--secondary)" }, children: [
              "ابزار سریع ",
              sTitle
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleCopySeasonLinks(se),
                  className: "px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 cursor-pointer",
                  style: {
                    backgroundColor: "var(--surface)",
                    color: "var(--text)",
                    border: "2px solid var(--ink)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "کپی همه لینک‌ها" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleDownloadSeason(se),
                  className: "px-3 py-1.5 rounded-lg text-xs font-black text-white flex items-center gap-1.5 cursor-pointer",
                  style: {
                    backgroundColor: "var(--primary)",
                    border: "2px solid var(--ink)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "دانلود کل فصل (720p)" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y", children: eps.map((ep, eIdx) => {
            const epNum = extractEpisodeNumber(ep, eIdx);
            const epTitle = cleanTitle(ep.title || ep.name || `قسمت ${epNum}`);
            const epSrcs = sortSources(extractSources(ep));
            const epSubs = [...subtitles, ...extractSubtitles(ep)];
            const isEpSeen = Boolean(
              watched.episodes[`${movieId}_${sIdx}_${eIdx}`]
            );
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3.5 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "min-w-[2.6rem] h-8 px-2 flex items-center justify-center font-black text-xs shrink-0",
                      style: isEpSeen ? { backgroundColor: "var(--primary)", color: "#fff" } : { backgroundColor: "var(--surface-2)", color: "var(--text)" },
                      children: [
                        "E",
                        epNum
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-black truncate", style: { color: "var(--text)" }, children: epTitle }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      toggleEpisodeWatchedManual(movieId, sIdx, eIdx);
                      setWatchedTick((t) => t + 1);
                    },
                    className: "px-2.5 py-1 rounded-lg text-[11px] font-black flex items-center gap-1 shrink-0 cursor-pointer",
                    style: isEpSeen ? {
                      backgroundColor: "var(--accent)",
                      color: "#000",
                      border: "2px solid #000"
                    } : {
                      backgroundColor: "var(--surface-2)",
                      color: "var(--secondary)",
                      border: "2px solid var(--ink)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isEpSeen ? "دیده‌شده" : "علامت زدن" })
                    ]
                  }
                )
              ] }),
              epSrcs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 pr-0", children: epSrcs.map((src, qi) => {
                const qLabel = normalizeQualityLabel(src.quality);
                const resVal = resolutionValue(src.quality);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => onPlaySource(
                        cleanStreamUrl(src.url),
                        `${title} - ${epTitle} (${qLabel})`,
                        epSrcs,
                        epSubs,
                        {
                          movie: details,
                          quality: qLabel,
                          sIdx,
                          eIdx,
                          epTitle,
                          seasons
                        }
                      ),
                      className: "px-3 py-1.5 text-xs font-black flex items-center gap-1.5 cursor-pointer",
                      style: {
                        backgroundColor: "var(--surface-2)",
                        color: "var(--text)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3 h-3 fill-current text-[var(--primary)]" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: resVal ? `${resVal}p` : qLabel }),
                        src.size && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-70 text-[10px]", children: [
                          "(",
                          formatFileSize(src.size),
                          ")"
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      title: `دانلود ${qLabel}`,
                      onClick: () => onDownloadSource(
                        src.url,
                        `${title} - ${epTitle}`,
                        qLabel,
                        details
                      ),
                      className: "px-2.5 py-1.5 flex items-center justify-center cursor-pointer",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] }, `${src.url}_${qi}`);
              }) })
            ] }, eIdx);
          }) })
        ] })
      ] }, sIdx);
    }) }) })
  ] });
};
const SmartPlaySheet = ({
  movie,
  initialSources,
  initialSeasons,
  onClose,
  onPlay,
  onShowAllQualities
}) => {
  const movieId = getMovieId(movie);
  const title = getMovieTitle(movie);
  const isSeries = getMovieType(movie) === "series";
  const [loading, setLoading] = reactExports.useState(true);
  const [seasons, setSeasons] = reactExports.useState(initialSeasons || []);
  const [sources, setSources] = reactExports.useState(initialSources || []);
  const [selectedSeason, setSelectedSeason] = reactExports.useState(0);
  const [selectedEpisode, setSelectedEpisode] = reactExports.useState(0);
  const [activeGroupKey, setActiveGroupKey] = reactExports.useState("sub");
  const [pref] = reactExports.useState(() => getPlayPref());
  const watched = reactExports.useMemo(() => getWatchedData(), []);
  reactExports.useEffect(() => {
    let active = true;
    const load = async () => {
      var _a, _b, _c;
      setLoading(true);
      if (isSeries) {
        let sList = (initialSeasons == null ? void 0 : initialSeasons.length) ? initialSeasons : await fetchSeriesSeasons(movieId);
        if (!active) return;
        setSeasons(sList);
        if (sList.length) {
          const picked = pickSeriesEpisode(sList, movieId, watched.episodes);
          setSelectedSeason(picked.sIdx);
          setSelectedEpisode(picked.eIdx);
          const ep = (((_a = sList[picked.sIdx]) == null ? void 0 : _a.episodes) || ((_b = sList[picked.sIdx]) == null ? void 0 : _b.items) || ((_c = sList[picked.sIdx]) == null ? void 0 : _c.episode) || [])[picked.eIdx];
          const epSrc = ep ? sortSources(extractSources(ep)) : [];
          setSources(epSrc);
        } else {
          setSources([]);
        }
      } else {
        let srcs = (initialSources == null ? void 0 : initialSources.length) ? initialSources : [];
        if (!srcs.length) {
          const linksRes = await fetchMovieLinks(movieId);
          srcs = sortSources([
            ...extractSources(movie.sources),
            ...extractSources(linksRes)
          ]);
        }
        if (!active) return;
        setSources(srcs);
      }
      setLoading(false);
    };
    load();
    return () => {
      active = false;
    };
  }, [movieId, isSeries]);
  const handleEpisodeSelect = (sIdx, eIdx) => {
    setSelectedSeason(sIdx);
    setSelectedEpisode(eIdx);
    const se = seasons[sIdx];
    const eps = (se == null ? void 0 : se.episodes) || (se == null ? void 0 : se.items) || (se == null ? void 0 : se.episode) || [];
    const ep = eps[eIdx];
    const epSrc = ep ? sortSources(extractSources(ep)) : [];
    setSources(epSrc);
  };
  const groups = reactExports.useMemo(() => groupSources(sources), [sources]);
  reactExports.useEffect(() => {
    if (!groups.length) return;
    setActiveGroupKey((cur) => {
      if ((pref == null ? void 0 : pref.a) && groups.some((g) => g.key === pref.a)) {
        return pref.a;
      }
      return groups.some((g) => g.key === cur) ? cur : groups[0].key;
    });
  }, [groups, pref]);
  const currentGroup = groups.find((g) => g.key === activeGroupKey) || groups[0];
  const getRecommendedSource = () => {
    if (!sources.length) return null;
    if ((pref == null ? void 0 : pref.r) && (pref == null ? void 0 : pref.a)) {
      const targetGroup = groups.find((g) => g.key === pref.a) || groups[0];
      const exact = targetGroup == null ? void 0 : targetGroup.items.find((x) => resolutionValue(x.quality) === pref.r);
      if (exact) return exact;
      if (targetGroup == null ? void 0 : targetGroup.items.length) {
        const sorted = [...targetGroup.items].sort(
          (a, b) => Math.abs(resolutionValue(a.quality) - (pref.r || 720)) - Math.abs(resolutionValue(b.quality) - (pref.r || 720))
        );
        return sorted[0];
      }
    }
    return (currentGroup == null ? void 0 : currentGroup.items[0]) || sources[0];
  };
  const handlePlaySource = (src) => {
    savePlayPref({
      a: audioCategory(src.quality),
      r: resolutionValue(src.quality) || 720
    });
    const se = seasons[selectedSeason];
    const eps = (se == null ? void 0 : se.episodes) || (se == null ? void 0 : se.items) || (se == null ? void 0 : se.episode) || [];
    const ep = eps[selectedEpisode];
    const epTitle = isSeries ? cleanTitle((ep == null ? void 0 : ep.title) || (ep == null ? void 0 : ep.name) || `قسمت ${selectedEpisode + 1}`) : void 0;
    const epSubs = [
      ...extractSubtitles(movie),
      ...isSeries && ep ? extractSubtitles(ep) : []
    ];
    onPlay(
      src,
      isSeries ? { sIdx: selectedSeason, eIdx: selectedEpisode, epTitle, seasons, epSources: sources, subtitles: epSubs } : { epSources: sources, subtitles: epSubs }
    );
  };
  const quickSrc = getRecommendedSource();
  const quickRes = quickSrc ? resolutionValue(quickSrc.quality) : 0;
  const quickAudio = quickSrc ? audioCategory(quickSrc.quality) : "sub";
  const curSeasonObj = seasons[selectedSeason];
  const curEpisodes = (curSeasonObj == null ? void 0 : curSeasonObj.episodes) || (curSeasonObj == null ? void 0 : curSeasonObj.items) || (curSeasonObj == null ? void 0 : curSeasonObj.episode) || [];
  const subLabel = isSeries && curSeasonObj ? `${title} · ${cleanTitle(curSeasonObj.title || curSeasonObj.name || `فصل ${selectedSeason + 1}`)} · قسمت ${selectedEpisode + 1}` : title;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "tm-sheet-bg",
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-sheet", onClick: (e) => e.stopPropagation(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-sheet-grip" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-sheet-head", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "tm-sheet-title", children: "پخش فوری" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-sheet-sub", children: subLabel })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "tm-x", "aria-label": "بستن", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-x" }) })
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-sheet-msg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "در حال آماده‌سازی لینک‌ها..." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          isSeries && seasons.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-ep", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-ep-lab", children: "انتخاب فصل و قسمت:" }),
            seasons.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-ep-seas", children: seasons.map((se, si) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: `tm-ep-sb${si === selectedSeason ? " on" : ""}`,
                onClick: () => handleEpisodeSelect(si, 0),
                children: cleanTitle(se.title || se.name || `فصل ${si + 1}`)
              },
              si
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-ep-grid", children: curEpisodes.map((_ep, ei) => {
              const seen = Boolean(watched.episodes[`${movieId}_${selectedSeason}_${ei}`]);
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: `tm-ep-b${ei === selectedEpisode ? " on" : ""}${seen ? " seen" : ""}`,
                  onClick: () => handleEpisodeSelect(selectedSeason, ei),
                  children: ei + 1
                },
                ei
              );
            }) })
          ] }),
          quickSrc && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "tm-quick",
              onClick: () => handlePlaySource(quickSrc),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-play" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "پخش سریع (",
                  quickRes ? `${quickRes}p` : normalizeQualityLabel(quickSrc.quality),
                  " ·",
                  " ",
                  quickAudio === "dub" ? "دوبله" : quickAudio === "sub" ? "زیرنویس" : "اصلی",
                  ")"
                ] })
              ]
            }
          ),
          groups.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-seg", children: groups.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: `tm-seg-b${g.key === activeGroupKey ? " on" : ""}`,
              onClick: () => setActiveGroupKey(g.key),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: g.key === "sub" ? "زیرنویس" : g.key === "dub" ? "دوبله" : "سایر" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("em", { children: [
                  "(",
                  g.items.length,
                  ")"
                ] })
              ]
            },
            g.key
          )) }),
          (currentGroup == null ? void 0 : currentGroup.items.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-rows", children: currentGroup.items.map((src, i) => {
            const resVal = resolutionValue(src.quality);
            const ext = getFileExt(src.url);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "tm-row",
                onClick: () => handlePlaySource(src),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-play" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-row-q", children: resVal ? `${resVal}p` : normalizeQualityLabel(src.quality) }),
                  ext && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-row-t", children: ext }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-row-s", children: src.size || normalizeQualityLabel(src.quality) })
                ]
              },
              `${src.url}_${i}`
            );
          }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-sheet-msg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "لینک پخشی برای این عنوان یافت نشد" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "tm-more",
              onClick: () => {
                onClose();
                onShowAllQualities();
              },
              children: "مشاهده تمام کیفیت‌ها و دانلود"
            }
          )
        ] })
      ] })
    }
  );
};
const ChoosePlayerModal = ({
  url,
  title,
  onClose,
  onPlayInApp,
  onDownload,
  onToast
}) => {
  if (!url) return null;
  const cleanUrl = cleanStreamUrl(url);
  const ext = getFileExt(cleanUrl);
  const isMkv = ext === "mkv";
  const handleCopy = async () => {
    const ok = await copyTextToClipboard(cleanUrl);
    if (ok) {
      onToast("لینک مستقیم کپی شد");
      onClose();
    } else {
      onToast("کپی لینک ناموفق بود", "error");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in",
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "w-full max-w-md rounded-3xl p-5 shadow-2xl border animate-scale-up",
          style: {
            backgroundColor: "var(--surface-solid)",
            borderColor: "var(--border-strong)",
            color: "var(--text)"
          },
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-black", style: { color: "var(--text)" }, children: "انتخاب نحوه پخش یا دانلود" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs truncate mt-1", style: { color: "var(--secondary)" }, children: title })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "p-2 rounded-full transition-colors cursor-pointer",
                  style: { backgroundColor: "var(--surface-2)", color: "var(--text)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    onClose();
                    onPlayInApp(cleanUrl);
                  },
                  className: "w-full flex items-center gap-3 p-3.5 rounded-2xl transition-colors text-right cursor-pointer",
                  style: {
                    backgroundColor: "color-mix(in srgb, var(--primary) 16%, transparent)",
                    border: "1px solid color-mix(in srgb, var(--primary) 40%, transparent)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white",
                        style: { backgroundColor: "var(--primary)" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-5 h-5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grow min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-black", style: { color: "var(--text)" }, children: "پخش در همین برنامه" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] mt-0.5", style: { color: "var(--secondary)" }, children: isMkv ? "پخش مستقیم با استخراج خودکار زیرنویس MKV" : "پخش با کنترل‌های حرفه‌ای و انتخاب زیرنویس" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    onClose();
                    onDownload(cleanUrl);
                  },
                  className: "w-full flex items-center gap-3 p-3.5 rounded-2xl transition-colors text-right cursor-pointer",
                  style: {
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                        style: {
                          backgroundColor: "color-mix(in srgb, var(--gold) 20%, transparent)",
                          color: "var(--gold)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-5 h-5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grow min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold", style: { color: "var(--text)" }, children: "دانلود فایل ویدئو" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] mt-0.5", style: { color: "var(--secondary)" }, children: "ذخیره مستقیم در دستگاه یا دانلود منیجر مرورگر" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    openExternalVideoPlayer(cleanUrl, "com.mxtech.videoplayer.ad", onToast);
                    onClose();
                  },
                  className: "w-full flex items-center gap-3 p-3.5 rounded-2xl transition-colors text-right cursor-pointer",
                  style: {
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-5 h-5" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grow min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold", style: { color: "var(--text)" }, children: "پخش با MX Player" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] mt-0.5", style: { color: "var(--secondary)" }, children: "باز کردن مستقیم استریم در اپلیکیشن MX Player (اندروید)" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    openExternalVideoPlayer(cleanUrl, "org.videolan.vlc", onToast);
                    onClose();
                  },
                  className: "w-full flex items-center gap-3 p-3.5 rounded-2xl transition-colors text-right cursor-pointer",
                  style: {
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-5 h-5" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grow min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold", style: { color: "var(--text)" }, children: "پخش با VLC Player" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] mt-0.5", style: { color: "var(--secondary)" }, children: "مناسب برای تمام فرمت‌ها و زیرنویس‌های MKV (اندروید)" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: handleCopy,
                  className: "w-full flex items-center gap-3 p-3.5 rounded-2xl transition-colors text-right cursor-pointer",
                  style: {
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-5 h-5" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grow min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold", style: { color: "var(--text)" }, children: "کپی لینک مستقیم" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] mt-0.5", style: { color: "var(--secondary)" }, children: "برای استفاده در ADM، IDM یا هر پلیر دلخواه" })
                    ] })
                  ]
                }
              )
            ] })
          ]
        }
      )
    }
  );
};
function cleanSubtitleText(raw) {
  return String(raw || "").replace(/<[^>]*>/g, "").replace(/\{\\[^}]*\}/g, "").replace(/\\N/g, "\n").replace(/\u200f/g, "").trim();
}
function parseTimestamp(str) {
  const m = String(str || "").trim().match(/(\d+):(\d{2}):(\d{2})[.,](\d{2,3})/);
  if (!m) {
    const s = String(str || "").trim().match(/(\d{2}):(\d{2})[.,](\d{2,3})/);
    if (!s) return 0;
    return parseInt(s[1], 10) * 60 + parseInt(s[2], 10) + parseInt(s[3].padEnd(3, "0"), 10) / 1e3;
  }
  return parseInt(m[1], 10) * 3600 + parseInt(m[2], 10) * 60 + parseInt(m[3], 10) + parseInt(m[4].padEnd(3, "0"), 10) / 1e3;
}
function srtToVtt(text) {
  const normalized = String(text || "").replace(/\r/g, "");
  if (/^\s*WEBVTT/i.test(normalized)) {
    return normalized;
  }
  const lines = normalized.split("\n");
  const out = ["WEBVTT\n"];
  for (const line of lines) {
    out.push(
      line.replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, "$1.$2")
    );
  }
  return out.join("\n");
}
function parseVttToCues(vttText) {
  const cues = [];
  const blocks = String(vttText || "").replace(/\r/g, "").split(/\n{2,}/);
  for (const block of blocks) {
    const lines = block.split("\n").filter((l) => l.trim().length > 0);
    if (!lines.length) continue;
    const timingLineIdx = lines.findIndex((l) => l.includes("-->"));
    if (timingLineIdx < 0) continue;
    const [startStr, endStr] = lines[timingLineIdx].split("-->").map((s) => s.trim().split(/\s+/)[0]);
    const text = cleanSubtitleText(lines.slice(timingLineIdx + 1).join("\n"));
    if (!text) continue;
    const start = parseTimestamp(startStr);
    const end = parseTimestamp(endStr);
    if (end > start) {
      cues.push({ start, end, text });
    }
  }
  return cues;
}
function ebmlId(u8, pos) {
  if (pos >= u8.length) return null;
  const first = u8[pos];
  if (!first) return null;
  let mask = 128;
  let len = 1;
  while (len <= 4 && (first & mask) === 0) {
    mask >>= 1;
    len++;
  }
  if (pos + len > u8.length) return null;
  let id = 0;
  for (let i = 0; i < len; i++) id = id * 256 + u8[pos + i];
  return { id, len };
}
function ebmlSz(u8, pos) {
  if (pos >= u8.length) return null;
  const first = u8[pos];
  if (!first) return null;
  let mask = 128;
  let len = 1;
  while (len <= 8 && (first & mask) === 0) {
    mask >>= 1;
    len++;
  }
  if (pos + len > u8.length) return null;
  let val = first & mask - 1;
  let allOnes = val === mask - 1;
  for (let i = 1; i < len; i++) {
    const b = u8[pos + i];
    if (b !== 255) allOnes = false;
    val = val * 256 + b;
  }
  return { val, len, unkn: allOnes };
}
function ebmlUint(u8, s, l) {
  let n = 0;
  for (let i = 0; i < l; i++) n = n * 256 + u8[s + i];
  return n;
}
function ebmlInt(u8, s, l) {
  let n = ebmlUint(u8, s, l);
  const top = Math.pow(2, 8 * l);
  return n >= top / 2 ? n - top : n;
}
function ebmlStr(u8, s, l) {
  return new TextDecoder("utf-8", { fatal: false }).decode(u8.subarray(s, s + l)).replace(/\0+$/, "");
}
function vint(u8, pos) {
  const first = u8[pos];
  let mask = 128;
  let len = 1;
  while (len <= 4 && (first & mask) === 0) {
    mask >>= 1;
    len++;
  }
  let val = first & mask - 1;
  for (let i = 1; i < len; i++) val = val * 256 + u8[pos + i];
  return { val, len };
}
async function fetchByteRange(url, from, to, signal) {
  const r = await fetch(url, {
    headers: { Range: `bytes=${from}-${to}` },
    mode: "cors",
    credentials: "omit",
    signal
  });
  return { buf: await r.arrayBuffer(), ok: r.ok || r.status === 206, status: r.status };
}
async function extractMkvSubtitles(url, onProgress, signal) {
  const head = await fetchByteRange(url, 0, 2097151, signal);
  if (!head.ok) throw new Error(`HTTP ${head.status}`);
  const u8 = new Uint8Array(head.buf);
  let pos = 0;
  let segData = 0;
  let segEnd = Infinity;
  let tracksOffset = -1;
  let cuesOffset = -1;
  let timeScale = 1e6;
  const tracks = [];
  const scanSeekHead = (s, e) => {
    let p = s;
    let sid = 0;
    let spos = -1;
    while (p < e) {
      const id = ebmlId(u8, p);
      if (!id) break;
      p += id.len;
      const sz = ebmlSz(u8, p);
      if (!sz) break;
      p += sz.len;
      if (id.id === 19899) {
        sid = 0;
        spos = -1;
        scanSeekHead(p, p + sz.val);
        if (sid === 374648427 && spos >= 0) tracksOffset = segData + spos;
        if (sid === 475249515 && spos >= 0) cuesOffset = segData + spos;
      } else if (id.id === 21419) {
        sid = ebmlUint(u8, p, sz.val);
      } else if (id.id === 21420) {
        spos = ebmlUint(u8, p, sz.val);
      }
      p += sz.val;
    }
  };
  const scanTracks = (buf, s, e) => {
    let p = s;
    while (p < e) {
      const id = ebmlId(buf, p);
      if (!id) break;
      p += id.len;
      const sz = ebmlSz(buf, p);
      if (!sz) break;
      p += sz.len;
      if (id.id === 174) {
        let ep = p;
        const ee = p + sz.val;
        const t = { num: 0, type: 0, name: "", lang: "", codec: "" };
        while (ep < ee) {
          const eid = ebmlId(buf, ep);
          if (!eid) break;
          ep += eid.len;
          const esz = ebmlSz(buf, ep);
          if (!esz) break;
          ep += esz.len;
          if (eid.id === 215) t.num = ebmlUint(buf, ep, esz.val);
          else if (eid.id === 131) t.type = ebmlUint(buf, ep, esz.val);
          else if (eid.id === 21358) t.name = ebmlStr(buf, ep, esz.val);
          else if (eid.id === 2274716) t.lang = ebmlStr(buf, ep, esz.val);
          else if (eid.id === 134) t.codec = ebmlStr(buf, ep, esz.val);
          ep += esz.val;
        }
        if (t.type === 17 && !tracks.find((x) => x.num === t.num)) {
          tracks.push({ num: t.num, name: t.name, lang: t.lang, codec: t.codec });
        }
      }
      p += sz.val;
    }
  };
  while (pos < u8.length) {
    const id = ebmlId(u8, pos);
    if (!id) break;
    pos += id.len;
    const sz = ebmlSz(u8, pos);
    if (!sz) break;
    pos += sz.len;
    if (id.id === 408125543) {
      segData = pos;
      segEnd = sz.unkn ? Infinity : pos + sz.val;
      continue;
    }
    if (id.id === 290298740 && pos + sz.val <= u8.length) scanSeekHead(pos, pos + sz.val);
    if (id.id === 357149030 && pos + sz.val <= u8.length) {
      let ip = pos;
      const ie = pos + sz.val;
      while (ip < ie) {
        const iid = ebmlId(u8, ip);
        if (!iid) break;
        ip += iid.len;
        const isz = ebmlSz(u8, ip);
        if (!isz) break;
        ip += isz.len;
        if (iid.id === 2807729) timeScale = ebmlUint(u8, ip, isz.val);
        ip += isz.val;
      }
    }
    if (id.id === 374648427 && pos + sz.val <= u8.length) scanTracks(u8, pos, pos + sz.val);
    if (id.id === 524531317) break;
    pos += sz.val;
  }
  if (!tracks.length && tracksOffset > 0 && tracksOffset < segEnd) {
    try {
      const tr = await fetchByteRange(url, tracksOffset, tracksOffset + 65535, signal);
      if (tr.ok) {
        const tu8 = new Uint8Array(tr.buf);
        const tid = ebmlId(tu8, 0);
        const tsz = tid ? ebmlSz(tu8, tid.len) : null;
        if (tid && tsz && tid.id === 374648427) {
          scanTracks(tu8, tid.len + tsz.len, Math.min(tu8.length, tid.len + tsz.len + tsz.val));
        }
      }
    } catch {
    }
  }
  if (!tracks.length) {
    return { tracks: [], cues: {}, error: "هیچ زیرنویس داخلی در این فایل پیدا نشد" };
  }
  const subSet = new Set(tracks.map((t) => t.num));
  const cues = {};
  tracks.forEach((t) => {
    cues[t.num] = [];
  });
  const sPerTick = timeScale / 1e9;
  const clusterOffsets = [];
  if (cuesOffset > 0) {
    try {
      const cr = await fetchByteRange(url, cuesOffset, cuesOffset + 262143, signal);
      if (cr.ok) {
        const cu8 = new Uint8Array(cr.buf);
        let cp = 0;
        const cid = ebmlId(cu8, 0);
        const csz = cid ? ebmlSz(cu8, cid.len) : null;
        if (cid && csz && cid.id === 475249515) {
          cp = cid.len + csz.len;
          const ce = Math.min(cu8.length, cp + csz.val);
          while (cp < ce) {
            const pid = ebmlId(cu8, cp);
            if (!pid) break;
            cp += pid.len;
            const psz = ebmlSz(cu8, cp);
            if (!psz) break;
            cp += psz.len;
            if (pid.id === 187) {
              let pp = cp;
              const pe = cp + psz.val;
              while (pp < pe) {
                const qid = ebmlId(cu8, pp);
                if (!qid) break;
                pp += qid.len;
                const qsz = ebmlSz(cu8, pp);
                if (!qsz) break;
                pp += qsz.len;
                if (qid.id === 183) {
                  let tp = pp;
                  const te = pp + qsz.val;
                  while (tp < te) {
                    const tid2 = ebmlId(cu8, tp);
                    if (!tid2) break;
                    tp += tid2.len;
                    const tsz2 = ebmlSz(cu8, tp);
                    if (!tsz2) break;
                    tp += tsz2.len;
                    if (tid2.id === 241) {
                      const co = segData + ebmlUint(cu8, tp, tsz2.val);
                      if (clusterOffsets[clusterOffsets.length - 1] !== co) {
                        clusterOffsets.push(co);
                      }
                    }
                    tp += tsz2.val;
                  }
                }
                pp += qsz.val;
              }
            }
            cp += psz.val;
          }
        }
      }
    } catch {
    }
  }
  const parseSubBlock = (buf, start, end, clusterTs, durTicks) => {
    const tr = vint(buf, start);
    if (!subSet.has(tr.val)) return;
    const rel = ebmlInt(buf, start + tr.len, 2);
    const dataStart = start + tr.len + 3;
    const raw = ebmlStr(buf, dataStart, end - dataStart);
    const parts = raw.split(",");
    const txt = cleanSubtitleText(parts.length >= 9 ? parts.slice(8).join(",") : raw);
    if (!txt) return;
    const startSec = Math.max(0, (clusterTs + rel) * sPerTick);
    const durSec = durTicks ? durTicks * sPerTick : Math.min(7, Math.max(2, 1.5 + 0.06 * txt.length));
    cues[tr.val].push({ start: startSec, end: startSec + durSec, text: txt });
  };
  if (clusterOffsets.length) {
    onProgress == null ? void 0 : onProgress(
      `در حال استخراج زیرنویس (۰/${clusterOffsets.length})...`,
      tracks,
      cues
    );
    for (let i = 0; i < clusterOffsets.length; i++) {
      if (signal == null ? void 0 : signal.aborted) break;
      const startOff = clusterOffsets[i];
      let chunkPos = startOff;
      let clusterTs = 0;
      const firstChunk = await fetchByteRange(url, startOff, startOff + 131071, signal);
      if (!firstChunk.ok) continue;
      const fu8 = new Uint8Array(firstChunk.buf);
      const fid = ebmlId(fu8, 0);
      const fsz = fid ? ebmlSz(fu8, fid.len) : null;
      if (!fid || !fsz || fid.id !== 524531317) continue;
      const clusterEnd = startOff + fid.len + fsz.len + (fsz.unkn ? 4194304 : fsz.val);
      let cursor = fid.len + fsz.len;
      let curBuf = fu8;
      let bufBase = startOff;
      while (chunkPos + cursor < clusterEnd) {
        if (cursor + 16 > curBuf.length && bufBase + curBuf.length < clusterEnd) {
          bufBase += cursor;
          const nextTo = Math.min(clusterEnd - 1, bufBase + 131071);
          const nextChunk = await fetchByteRange(url, bufBase, nextTo, signal);
          if (!nextChunk.ok) break;
          curBuf = new Uint8Array(nextChunk.buf);
          chunkPos = bufBase;
          cursor = 0;
        }
        const eid = ebmlId(curBuf, cursor);
        if (!eid) break;
        const esz = ebmlSz(curBuf, cursor + eid.len);
        if (!esz) break;
        const hdr = eid.len + esz.len;
        if (eid.id === 231) {
          clusterTs = ebmlUint(curBuf, cursor + hdr, esz.val);
        } else if (eid.id === 163 && cursor + hdr + esz.val <= curBuf.length) {
          parseSubBlock(curBuf, cursor + hdr, cursor + hdr + esz.val, clusterTs, 0);
        } else if (eid.id === 160 && cursor + hdr + esz.val <= curBuf.length) {
          let gp = cursor + hdr;
          const ge = gp + esz.val;
          let blkStart = 0;
          let blkEnd = 0;
          let dur = 0;
          while (gp < ge) {
            const gid = ebmlId(curBuf, gp);
            if (!gid) break;
            gp += gid.len;
            const gsz = ebmlSz(curBuf, gp);
            if (!gsz) break;
            gp += gsz.len;
            if (gid.id === 161) {
              blkStart = gp;
              blkEnd = gp + gsz.val;
            } else if (gid.id === 155) {
              dur = ebmlUint(curBuf, gp, gsz.val);
            }
            gp += gsz.val;
          }
          if (blkEnd > blkStart) parseSubBlock(curBuf, blkStart, blkEnd, clusterTs, dur);
        } else if (eid.id !== 163 && eid.id !== 160 && eid.id !== 231) {
          if (eid.id === 524531317) break;
        }
        if (esz.val > 131072 && cursor + hdr + esz.val > curBuf.length) {
          bufBase += cursor + hdr + esz.val;
          const jumpTo = Math.min(clusterEnd - 1, bufBase + 131071);
          if (bufBase >= clusterEnd) break;
          const jc = await fetchByteRange(url, bufBase, jumpTo, signal);
          if (!jc.ok) break;
          curBuf = new Uint8Array(jc.buf);
          chunkPos = bufBase;
          cursor = 0;
          continue;
        }
        cursor += hdr + esz.val;
      }
      if (i % 3 === 0 || i === clusterOffsets.length - 1) {
        onProgress == null ? void 0 : onProgress(
          `زیرنویس استخراج شد (${i + 1}/${clusterOffsets.length})`,
          tracks,
          cues
        );
      }
    }
  }
  return { tracks, cues };
}
const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5, 2];
const VideoPlayer = ({
  url,
  title,
  movie,
  sources = [],
  subtitleUrls = [],
  progressKey,
  progressMeta = "{}",
  initialPositionSec = 0,
  onClose,
  onSwitchSource,
  onToast
}) => {
  const cleanUrl = reactExports.useMemo(() => cleanStreamUrl(url), [url]);
  const videoRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  const seekBarRef = reactExports.useRef(null);
  const hideTimerRef = reactExports.useRef(null);
  const [playing, setPlaying] = reactExports.useState(false);
  const [buffering, setBuffering] = reactExports.useState(true);
  const [currentTime, setCurrentTime] = reactExports.useState(0);
  const [duration, setDuration] = reactExports.useState(0);
  const [playbackRate, setPlaybackRate] = reactExports.useState(1);
  const [showControls, setShowControls] = reactExports.useState(true);
  const [isFullscreen, setIsFullscreen] = reactExports.useState(false);
  const [errorMsg, setErrorMsg] = reactExports.useState("");
  const [retrySeed, setRetrySeed] = reactExports.useState(0);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [hoverTime, setHoverTime] = reactExports.useState(null);
  const [hoverPct, setHoverPct] = reactExports.useState(0);
  const [showQualityMenu, setShowQualityMenu] = reactExports.useState(false);
  const [showSubMenu, setShowSubMenu] = reactExports.useState(false);
  const [subEnabled, setSubEnabled] = reactExports.useState(true);
  const [subTracks, setSubTracks] = reactExports.useState([]);
  const [activeSubId, setActiveSubId] = reactExports.useState("");
  const [subStatus, setSubStatus] = reactExports.useState("");
  const [subOffset, setSubOffset] = reactExports.useState(0);
  const resolvedTitle = title || (movie ? getMovieTitle(movie) : "پخش ویدئو");
  const subtitleUrlsKey = reactExports.useMemo(
    () => subtitleUrls.map((s) => `${s.url}|${s.label}`).join("\n"),
    [subtitleUrls]
  );
  const progressTitleRef = reactExports.useRef(resolvedTitle);
  const progressMetaRef = reactExports.useRef(progressMeta);
  progressTitleRef.current = resolvedTitle;
  progressMetaRef.current = progressMeta;
  const persistProgress = (posSec, durSec) => {
    if (!progressKey || !durSec || posSec < 2) return;
    saveProgressItem({
      k: progressKey,
      url: cleanUrl,
      title: progressTitleRef.current,
      pos: Math.floor(posSec * 1e3),
      dur: Math.floor(durSec * 1e3),
      ts: Date.now(),
      meta: progressMetaRef.current
    });
    window.dispatchEvent(new CustomEvent("tm-progress-update"));
  };
  reactExports.useEffect(() => {
    var _a, _b;
    (_b = (_a = window.AndroidPlayer) == null ? void 0 : _a.setFullscreen) == null ? void 0 : _b.call(_a, true);
    return () => {
      var _a2, _b2;
      (_b2 = (_a2 = window.AndroidPlayer) == null ? void 0 : _a2.setFullscreen) == null ? void 0 : _b2.call(_a2, false);
    };
  }, []);
  reactExports.useEffect(() => {
    setSubTracks([]);
    setActiveSubId("");
    setSubStatus("");
  }, [cleanUrl]);
  reactExports.useEffect(() => {
    let active = true;
    const ac = new AbortController();
    const loadExternalSubs = async () => {
      for (let i = 0; i < subtitleUrls.length; i++) {
        const sub = subtitleUrls[i];
        try {
          const r = await fetch(sub.url, { signal: ac.signal });
          if (!r.ok) continue;
          const text = await r.text();
          const vtt = srtToVtt(text);
          const cues = parseVttToCues(vtt);
          if (cues.length && active) {
            const id = `ext_${i}`;
            setSubTracks((prev) => {
              if (prev.some((t) => t.id === id)) return prev;
              return [...prev, { id, label: sub.label || `زیرنویس ${i + 1}`, cues }];
            });
            setActiveSubId((prev) => prev || id);
          }
        } catch {
        }
      }
    };
    const loadMkvSubs = async () => {
      if (getFileExt(cleanUrl) !== "mkv") return;
      setSubStatus("در حال بررسی زیرنویس داخلی MKV...");
      try {
        const res = await extractMkvSubtitles(
          cleanUrl,
          (status, tracks, cuesMap) => {
            if (!active) return;
            setSubStatus(status);
            updateMkvTracks(tracks, cuesMap);
          },
          ac.signal
        );
        if (!active) return;
        if (res.error) {
          setSubStatus(res.error);
        } else if (res.tracks.length) {
          updateMkvTracks(res.tracks, res.cues);
          setSubStatus("");
        }
      } catch {
        if (active) setSubStatus("");
      }
    };
    const updateMkvTracks = (tracks, cuesMap) => {
      const next = tracks.map((t) => ({
        id: `mkv_${t.num}`,
        label: t.name || t.lang || `زیرنویس #${t.num}`,
        cues: cuesMap[t.num] || []
      }));
      setSubTracks((prev) => {
        const ext = prev.filter((p) => !p.id.startsWith("mkv_"));
        return [...ext, ...next];
      });
      const fa = next.find((t) => /fa|per|farsi|persian|فارسی/i.test(t.label)) || next[0];
      if (fa) setActiveSubId((prev) => prev || fa.id);
    };
    window.__onNativeSubtitles = (jsonStr) => {
      try {
        const parsed = JSON.parse(jsonStr);
        if (Array.isArray(parsed == null ? void 0 : parsed.cues)) {
          setSubTracks((prev) => [
            ...prev.filter((p) => p.id !== "native_0"),
            { id: "native_0", label: parsed.label || "زیرنویس داخلی", cues: parsed.cues }
          ]);
          setActiveSubId((prev) => prev || "native_0");
        }
      } catch {
      }
    };
    loadExternalSubs();
    loadMkvSubs();
    return () => {
      active = false;
      ac.abort();
      delete window.__onNativeSubtitles;
    };
  }, [cleanUrl, subtitleUrlsKey]);
  const scheduleHideControls = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setShowControls(true);
    hideTimerRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused && !showQualityMenu && !showSubMenu) {
        setShowControls(false);
      }
    }, 3600);
  };
  reactExports.useEffect(() => {
    scheduleHideControls();
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [playing, showQualityMenu, showSubMenu]);
  reactExports.useEffect(() => {
    const iv = setInterval(() => {
      const v = videoRef.current;
      if (v && !v.paused && v.duration > 0) {
        persistProgress(v.currentTime, v.duration);
      }
    }, 5e3);
    return () => clearInterval(iv);
  }, [cleanUrl, progressKey]);
  const togglePlayPause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {
      });
    } else {
      v.pause();
      if (v.duration > 0) persistProgress(v.currentTime, v.duration);
    }
    scheduleHideControls();
  };
  const skipSeconds = (delta) => {
    const v = videoRef.current;
    if (!v) return;
    const next = Math.max(0, Math.min(v.duration || 0, v.currentTime + delta));
    v.currentTime = next;
    setCurrentTime(next);
    scheduleHideControls();
  };
  const cycleSpeed = () => {
    const idx = SPEED_OPTIONS.indexOf(playbackRate);
    const next = SPEED_OPTIONS[(idx + 1) % SPEED_OPTIONS.length];
    setPlaybackRate(next);
    if (videoRef.current) videoRef.current.playbackRate = next;
    scheduleHideControls();
  };
  const toggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      setIsFullscreen((prev) => !prev);
    }
  };
  const computeSeekFromClientX = (clientX) => {
    const bar = seekBarRef.current;
    if (!bar || !duration) return null;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return { ratio, sec: ratio * duration };
  };
  const handleSeekPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    const res = computeSeekFromClientX(e.clientX);
    if (res) {
      setHoverTime(res.sec);
      setHoverPct(res.ratio * 100);
      setCurrentTime(res.sec);
      if (videoRef.current) videoRef.current.currentTime = res.sec;
    }
  };
  const handleSeekPointerMove = (e) => {
    const res = computeSeekFromClientX(e.clientX);
    if (!res) return;
    setHoverTime(res.sec);
    setHoverPct(res.ratio * 100);
    if (isDragging) {
      setCurrentTime(res.sec);
      if (videoRef.current) videoRef.current.currentTime = res.sec;
    }
  };
  const handleSeekPointerUp = () => {
    setIsDragging(false);
    setHoverTime(null);
    scheduleHideControls();
  };
  const handleLocalSubtitleUpload = async (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    try {
      const text = await file.text();
      const vtt = srtToVtt(text);
      const cues = parseVttToCues(vtt);
      if (!cues.length) {
        onToast("فایل زیرنویس معتبر نبود", "error");
        return;
      }
      const id = `local_${Date.now()}`;
      setSubTracks((prev) => [...prev, { id, label: file.name, cues }]);
      setActiveSubId(id);
      setSubEnabled(true);
      onToast("زیرنویس با موفقیت اضافه شد");
    } catch {
      onToast("خطا در خواندن فایل زیرنویس", "error");
    }
    e.target.value = "";
  };
  const activeTrack = subTracks.find((t) => t.id === activeSubId);
  const currentCueText = reactExports.useMemo(() => {
    if (!subEnabled || !activeTrack) return "";
    const adj = currentTime - subOffset;
    const hit = activeTrack.cues.find((c) => adj >= c.start && adj <= c.end);
    return hit ? hit.text : "";
  }, [subEnabled, activeTrack, currentTime, subOffset]);
  const pct = duration > 0 ? Math.min(100, currentTime / duration * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: "fixed inset-0 z-50 bg-black text-white flex flex-col select-none overflow-hidden",
      onClick: () => {
        if (!showQualityMenu && !showSubMenu) {
          setShowControls((prev) => !prev);
        }
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `relative z-20 flex items-center justify-between gap-2 px-3 py-2.5 transition-opacity duration-200 ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}`,
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      const v = videoRef.current;
                      if (v && v.duration > 0) persistProgress(v.currentTime, v.duration);
                      onClose();
                    },
                    className: "w-10 h-10 flex items-center justify-center bg-white/10 text-white cursor-pointer",
                    "aria-label": "بازگشت",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold truncate", children: resolvedTitle }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                sources.length > 1 && onSwitchSource && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setShowSubMenu(false);
                      setShowQualityMenu((v) => !v);
                    },
                    className: "px-2.5 h-9 flex items-center gap-1.5 text-xs font-bold bg-white/10 cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "کیفیت" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setShowQualityMenu(false);
                      setShowSubMenu((v) => !v);
                    },
                    className: "px-2.5 h-9 flex items-center gap-1.5 text-xs font-bold cursor-pointer",
                    style: subEnabled && activeTrack ? { backgroundColor: "var(--primary)", color: "#fff" } : void 0,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Captions, { className: "w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "CC" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: toggleFullscreen,
                    className: "w-9 h-9 flex items-center justify-center bg-white/10 cursor-pointer",
                    "aria-label": "تمام‌صفحه",
                    children: isFullscreen ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minimize, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize, { className: "w-4 h-4" })
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 flex items-center justify-center bg-black overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "video",
            {
              ref: videoRef,
              src: cleanUrl,
              playsInline: true,
              autoPlay: true,
              preload: "metadata",
              className: "w-full h-full object-contain",
              onLoadedMetadata: (e) => {
                const v = e.currentTarget;
                setDuration(v.duration || 0);
                if (initialPositionSec > 2 && initialPositionSec < (v.duration || Infinity) - 5) {
                  v.currentTime = initialPositionSec;
                  setCurrentTime(initialPositionSec);
                }
                v.playbackRate = playbackRate;
                setBuffering(false);
                setErrorMsg("");
              },
              onTimeUpdate: (e) => {
                if (!isDragging) {
                  setCurrentTime(e.currentTarget.currentTime);
                }
              },
              onPlay: () => {
                setPlaying(true);
                setBuffering(false);
              },
              onPause: () => setPlaying(false),
              onWaiting: () => setBuffering(true),
              onCanPlay: () => setBuffering(false),
              onSeeked: () => setBuffering(false),
              onPlaying: () => {
                setBuffering(false);
                setPlaying(true);
              },
              onEnded: () => {
                setPlaying(false);
                setBuffering(false);
                setShowControls(true);
              },
              onError: () => {
                setBuffering(false);
                setPlaying(false);
                setErrorMsg(
                  getFileExt(cleanUrl) === "mkv" ? "مرورگر از کدک صوتی/تصویری این فایل MKV پشتیبانی نمی‌کند یا دسترسی مستقیم محدود است." : "پخش مستقیم این لینک با خطا مواجه شد."
                );
              }
            },
            `${cleanUrl}_${retrySeed}`
          ),
          currentCueText && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-x-4 bottom-24 z-10 flex justify-center text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3.5 py-1.5 rounded-lg bg-black/80 text-white text-sm sm:text-base font-bold leading-relaxed whitespace-pre-line border border-white/20 shadow-lg max-w-2xl", children: currentCueText }) }),
          !errorMsg && (buffering || showControls) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "absolute inset-0 flex items-center justify-center gap-6 pointer-events-none",
              children: [
                showControls && !buffering && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation();
                      skipSeconds(-10);
                    },
                    className: "pointer-events-auto w-12 h-12 flex flex-col items-center justify-center bg-black/60 text-white cursor-pointer",
                    "aria-label": "۱۰ ثانیه عقب",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-5 h-5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-black", children: "10-" })
                    ]
                  }
                ),
                buffering ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-black/75 border-2 border-white/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-amber-400" }) }) : showControls && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation();
                      togglePlayPause();
                    },
                    className: "pointer-events-auto w-20 h-20 rounded-full flex items-center justify-center text-white cursor-pointer",
                    "aria-label": playing ? "توقف" : "پخش",
                    children: playing ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-9 h-9 fill-white" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-9 h-9 fill-white ml-1" })
                  }
                ),
                showControls && !buffering && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation();
                      skipSeconds(10);
                    },
                    className: "pointer-events-auto w-12 h-12 flex flex-col items-center justify-center bg-black/60 text-white cursor-pointer",
                    "aria-label": "۱۰ ثانیه جلو",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "w-5 h-5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-black", children: "10+" })
                    ]
                  }
                )
              ]
            }
          ),
          errorMsg && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 z-30 bg-black/90 flex items-center justify-center p-5",
              onClick: (e) => e.stopPropagation(),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-2xl p-5 bg-[#1b1814] border-2 border-[#f6efdc] text-center space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 mx-auto rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-6 h-6" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base font-black text-[#f6efdc]", children: "خطا در پخش درون‌برنامه" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-6 text-[#eadfc6]", children: errorMsg }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2.5 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setErrorMsg("");
                        setBuffering(true);
                        setRetrySeed((s) => s + 1);
                      },
                      className: "py-2.5 px-3 bg-white/10 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تلاش مجدد" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: async () => {
                        const ok = await copyTextToClipboard(cleanUrl);
                        onToast(ok ? "لینک کپی شد" : "کپی ناموفق", ok ? "success" : "error");
                      },
                      className: "py-2.5 px-3 bg-white/10 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "کپی لینک" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: cleanUrl,
                      download: true,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "py-2.5 px-3 rounded-lg border-2 border-[#f6efdc] bg-amber-400 text-black text-xs font-black flex items-center justify-center gap-1.5",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "دانلود مستقیم" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => openExternalVideoPlayer(cleanUrl, "org.videolan.vlc", onToast),
                      className: "py-2.5 px-3 bg-white/10 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "پخش در VLC" })
                      ]
                    }
                  )
                ] })
              ] })
            }
          ),
          showQualityMenu && onSwitchSource && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "absolute inset-x-0 bottom-0 z-30 max-h-[65%] overflow-y-auto p-4 space-y-2",
              onClick: (e) => e.stopPropagation(),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base font-black", children: "تغییر کیفیت پخش" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowQualityMenu(false),
                      className: "px-3 py-1 bg-white/10 text-xs font-bold cursor-pointer",
                      children: "بستن"
                    }
                  )
                ] }),
                sources.map((src, idx) => {
                  const isCurrent = cleanStreamUrl(src.url) === cleanUrl;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setShowQualityMenu(false);
                        onSwitchSource(src);
                      },
                      className: "w-full p-3 flex items-center justify-between text-right cursor-pointer",
                      style: isCurrent ? { backgroundColor: "var(--primary)", color: "#fff" } : { backgroundColor: "#26221c", color: "#f6efdc" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold", children: normalizeQualityLabel(src.quality) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
                          src.size && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: src.size }),
                          isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" })
                        ] })
                      ]
                    },
                    `${src.url}_${idx}`
                  );
                })
              ]
            }
          ),
          showSubMenu && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "absolute inset-x-0 bottom-0 z-30 max-h-[65%] overflow-y-auto p-4 space-y-3",
              onClick: (e) => e.stopPropagation(),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base font-black", children: "تنظیمات زیرنویس" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowSubMenu(false),
                      className: "px-3 py-1 bg-white/10 text-xs font-bold cursor-pointer",
                      children: "بستن"
                    }
                  )
                ] }),
                subStatus && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-300 font-bold", children: subStatus }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setSubEnabled((v) => !v),
                      className: "px-3 py-2 text-xs font-bold cursor-pointer",
                      style: subEnabled ? { backgroundColor: "var(--primary)", color: "#fff" } : { backgroundColor: "#26221c" },
                      children: subEnabled ? "زیرنویس: روشن" : "زیرنویس: خاموش"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "px-3 py-2 rounded-lg border-2 border-[#f6efdc] bg-[#26221c] text-xs font-bold flex items-center gap-1.5 cursor-pointer", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "افزودن فایل SRT / VTT" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "file",
                        accept: ".srt,.vtt,text/vtt,application/x-subrip",
                        className: "hidden",
                        onChange: handleLocalSubtitleUpload
                      }
                    )
                  ] })
                ] }),
                subTracks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: subTracks.map((tr) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setActiveSubId(tr.id);
                      setSubEnabled(true);
                    },
                    className: "w-full p-2.5 flex items-center justify-between text-xs font-bold cursor-pointer",
                    style: activeSubId === tr.id ? { backgroundColor: "var(--primary)", color: "#fff" } : { backgroundColor: "#26221c" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        tr.label,
                        " (",
                        tr.cues.length,
                        " خط)"
                      ] }),
                      activeSubId === tr.id && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" })
                    ]
                  },
                  tr.id
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-white/15", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold", children: [
                    "همگام‌سازی زمانی (",
                    subOffset >= 0 ? `+${subOffset}` : subOffset,
                    "s)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setSubOffset((o) => Number((o - 0.5).toFixed(1))),
                        className: "px-2.5 py-1 bg-white/10 text-xs font-bold cursor-pointer",
                        children: "-0.5s"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setSubOffset(0),
                        className: "px-2.5 py-1 bg-white/10 text-xs font-bold cursor-pointer",
                        children: "صفر"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setSubOffset((o) => Number((o + 0.5).toFixed(1))),
                        className: "px-2.5 py-1 bg-white/10 text-xs font-bold cursor-pointer",
                        children: "+0.5s"
                      }
                    )
                  ] })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `absolute bottom-0 left-0 right-0 z-20 px-4 pt-2 pb-4 transition-opacity duration-200 ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}`,
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  ref: seekBarRef,
                  className: "py-3 cursor-pointer mb-1 relative",
                  style: { direction: "ltr" },
                  onPointerDown: handleSeekPointerDown,
                  onPointerMove: handleSeekPointerMove,
                  onPointerUp: handleSeekPointerUp,
                  onPointerLeave: () => {
                    if (!isDragging) setHoverTime(null);
                  },
                  children: [
                    hoverTime !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute -top-7 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 border border-white/30 text-[11px] font-mono font-bold text-amber-300 pointer-events-none",
                        style: { left: `${hoverPct}%` },
                        children: formatDuration(hoverTime)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-3 w-full rounded-full bg-white/25 overflow-visible", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-full rounded-full",
                          style: { width: `${pct}%`, backgroundColor: "var(--primary)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "bg-white absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
                          style: { left: `${pct}%` }
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", style: { direction: "ltr" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: togglePlayPause,
                      className: "w-10 h-10 flex items-center justify-center bg-white/10 cursor-pointer",
                      "aria-label": playing ? "توقف" : "پخش",
                      children: playing ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => skipSeconds(-10),
                      className: "w-9 h-9 flex items-center justify-center bg-white/10 cursor-pointer",
                      "aria-label": "-10s",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => skipSeconds(10),
                      className: "w-9 h-9 flex items-center justify-center bg-white/10 cursor-pointer",
                      "aria-label": "+10s",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono font-bold tabular-nums text-white/90 ml-1", children: [
                    formatDuration(currentTime),
                    " / ",
                    formatDuration(duration)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: cycleSpeed,
                    className: "px-2.5 h-9 bg-white/10 text-xs font-mono font-extrabold cursor-pointer",
                    children: [
                      playbackRate,
                      "x"
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
};
const DownloadManager = ({
  onBack,
  onSelectMovie,
  onSavedChanged,
  onToast
}) => {
  var _a;
  const [tab, setTab] = reactExports.useState("saved");
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  const [savedList, setSavedList] = reactExports.useState(() => getSavedDownloads());
  const [records, setRecords] = reactExports.useState([]);
  const isNative = Boolean((_a = window.AndroidPlayer) == null ? void 0 : _a.listDownloads);
  const syncDownloads = () => {
    var _a2;
    setSavedList(getSavedDownloads());
    if ((_a2 = window.AndroidPlayer) == null ? void 0 : _a2.listDownloads) {
      try {
        const raw = window.AndroidPlayer.listDownloads();
        const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
        if (Array.isArray(parsed)) {
          setRecords(parsed);
          return;
        }
      } catch {
      }
    }
    setRecords(getDownloadRecords());
  };
  reactExports.useEffect(() => {
    var _a2, _b;
    (_b = (_a2 = window.AndroidPlayer) == null ? void 0 : _a2.setDownloadManagerVisible) == null ? void 0 : _b.call(_a2, true);
    syncDownloads();
    const iv = setInterval(syncDownloads, 2e3);
    return () => {
      var _a3, _b2;
      clearInterval(iv);
      (_b2 = (_a3 = window.AndroidPlayer) == null ? void 0 : _a3.setDownloadManagerVisible) == null ? void 0 : _b2.call(_a3, false);
    };
  }, []);
  const filteredSaved = savedList.filter(
    (x) => typeFilter === "all" || x.type === typeFilter
  );
  const downloadingList = records.filter(
    (r) => r.status === "running" || r.status === "pending" || r.status === "paused" || r.status === "failed"
  );
  const completedList = records.filter(
    (r) => !r.status || r.status === "successful"
  );
  const filterRecs = (list) => list.filter((r) => typeFilter === "all" || r.type === typeFilter);
  const handleUnsave = (item) => {
    toggleSaveMovie(item.movie);
    setSavedList(getSavedDownloads());
    onSavedChanged();
    onToast("از لیست ذخیره‌ها حذف شد");
  };
  const handleDeleteRecord = (dmId) => {
    var _a2, _b;
    try {
      (_b = (_a2 = window.AndroidPlayer) == null ? void 0 : _a2.deleteDownload) == null ? void 0 : _b.call(_a2, dmId);
    } catch {
    }
    removeDownloadRecord(dmId);
    syncDownloads();
    onToast("مورد دانلود حذف شد");
  };
  const handlePlayRecord = (rec) => {
    var _a2;
    if ((_a2 = window.AndroidPlayer) == null ? void 0 : _a2.playDownloaded) {
      const ok = window.AndroidPlayer.playDownloaded(rec.dmId);
      if (!ok) onToast("فایل یافت نشد", "error");
    } else if (rec.url) {
      const a = document.createElement("a");
      a.href = rec.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-12 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mb-5 p-3 rounded-2xl border flex items-center justify-between gap-3",
        style: { backgroundColor: "var(--surface)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onBack,
                className: "w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer",
                style: {
                  backgroundColor: "var(--surface-2)",
                  border: "2px solid var(--ink)",
                  color: "var(--text)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-black", style: { color: "var(--text)" }, children: "مدیریت دانلودها و ذخیره‌ها" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "px-2.5 py-1 text-xs font-black tabular-nums",
              style: { backgroundColor: "var(--accent)", color: "#000" },
              children: [
                toPersianDigits(savedList.length + records.length),
                " مورد"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-seg mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: `tm-seg-b${tab === "saved" ? " on" : ""}`,
          onClick: () => setTab("saved"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ذخیره‌شده" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("em", { children: [
              "(",
              toPersianDigits(savedList.length),
              ")"
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: `tm-seg-b${tab === "downloaded" ? " on" : ""}`,
          onClick: () => setTab("downloaded"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "دانلودشده" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("em", { children: [
              "(",
              toPersianDigits(completedList.length),
              ")"
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: `tm-seg-b${tab === "downloading" ? " on" : ""}`,
          onClick: () => setTab("downloading"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "در حال دانلود" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("em", { children: [
              "(",
              toPersianDigits(downloadingList.length),
              ")"
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-4", children: [
      { k: "all", l: "همه" },
      { k: "movie", l: "فیلم‌ها" },
      { k: "series", l: "سریال‌ها" }
    ].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setTypeFilter(opt.k),
        className: "px-3.5 py-1.5 rounded-xl text-xs font-black cursor-pointer",
        style: typeFilter === opt.k ? {
          backgroundColor: "var(--primary)",
          color: "#fff",
          border: "2px solid var(--ink)"
        } : {
          backgroundColor: "var(--surface)",
          color: "var(--secondary)",
          border: "2px solid var(--ink)"
        },
        children: opt.l
      },
      opt.k
    )) }),
    !isNative && tab !== "saved" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mb-4 p-3.5 rounded-2xl border flex items-center gap-3 text-xs font-bold leading-6",
        style: {
          backgroundColor: "var(--surface)",
          borderColor: "var(--ink)",
          color: "var(--text-2)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-5 h-5 shrink-0 text-[var(--primary)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "در نسخه وب، فایل‌ها مستقیماً توسط مدیریت دانلود مرورگر شما دانلود می‌شوند و تاریخچه لینک‌های دانلودشده در اینجا نگهداری می‌شود." })
        ]
      }
    ),
    tab === "saved" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filteredSaved.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-empty", children: "لیست ذخیره‌های شما خالی است" }) : filteredSaved.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-3 rounded-2xl border flex items-center gap-3.5",
        style: {
          backgroundColor: "var(--surface)",
          borderColor: "var(--ink)",
          boxShadow: "3px 3px 0 var(--ink)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onSelectMovie(item.movie),
              className: "w-16 h-24 rounded-xl overflow-hidden shrink-0 border-2 cursor-pointer",
              style: { borderColor: "var(--ink)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: item.poster || POSTER_FALLBACK_SVG,
                  alt: item.title,
                  className: "w-full h-full object-cover",
                  onError: (e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = POSTER_FALLBACK_SVG;
                  }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onSelectMovie(item.movie),
                className: "text-right font-black text-sm truncate block w-full cursor-pointer",
                style: { color: "var(--text)" },
                children: item.title
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1.5 text-[11px] font-bold", style: { color: "var(--secondary)" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.type === "series" ? "سریال" : "فیلم" }),
              item.year && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "• ",
                item.year
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleUnsave(item),
              className: "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 cursor-pointer",
              style: {
                backgroundColor: "var(--surface-2)",
                border: "2px solid var(--ink)",
                color: "var(--primary-bright)"
              },
              title: "حذف",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
            }
          )
        ]
      },
      item.id
    )) }),
    tab === "downloaded" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filterRecs(completedList).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-empty", children: "مورد دانلودشده‌ای ثبت نشده است" }) : filterRecs(completedList).map((rec) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-3.5 rounded-2xl border flex items-center justify-between gap-3",
        style: {
          backgroundColor: "var(--surface)",
          borderColor: "var(--ink)",
          boxShadow: "3px 3px 0 var(--ink)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-black text-sm truncate", style: { color: "var(--text)" }, children: rec.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-1 text-[11px] font-bold", style: { color: "var(--secondary)" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded bg-black/20", children: rec.quality }),
              rec.total ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatBytes(rec.total) }) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: rec.folder || "Downloads" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => handlePlayRecord(rec),
                className: "px-3 py-2 rounded-xl text-xs font-black text-white flex items-center gap-1 cursor-pointer",
                style: {
                  backgroundColor: "var(--primary)",
                  border: "2px solid var(--ink)"
                },
                children: [
                  isNative ? /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isNative ? "پخش" : "دریافت مجدد" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => handleDeleteRecord(rec.dmId),
                className: "w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer",
                style: {
                  backgroundColor: "var(--surface-2)",
                  border: "2px solid var(--ink)",
                  color: "var(--primary-bright)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
              }
            )
          ] })
        ]
      },
      rec.dmId
    )) }),
    tab === "downloading" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filterRecs(downloadingList).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-empty", children: "در حال حاضر دانلود فعالی وجود ندارد" }) : filterRecs(downloadingList).map((rec) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-3.5 rounded-2xl border space-y-2.5",
        style: {
          backgroundColor: "var(--surface)",
          borderColor: "var(--ink)",
          boxShadow: "3px 3px 0 var(--ink)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-black text-sm truncate", style: { color: "var(--text)" }, children: rec.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-bold", style: { color: "var(--secondary)" }, children: [
                rec.quality,
                " ·",
                " ",
                rec.status === "failed" ? "خطا در دانلود" : rec.status === "paused" ? "متوقف‌شده" : `${toPersianDigits(rec.percent || 0)}٪`
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              rec.status === "failed" && isNative && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var _a2, _b;
                    (_b = (_a2 = window.AndroidPlayer) == null ? void 0 : _a2.resumeDownload) == null ? void 0 : _b.call(_a2, rec.dmId);
                    syncDownloads();
                  },
                  className: "w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer",
                  style: {
                    backgroundColor: "var(--primary)",
                    color: "#fff",
                    border: "2px solid var(--ink)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleDeleteRecord(rec.dmId),
                  className: "w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer",
                  style: {
                    backgroundColor: "var(--surface-2)",
                    border: "2px solid var(--ink)",
                    color: "var(--primary-bright)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 rounded-full overflow-hidden bg-black/30 border border-[var(--ink)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full transition-all",
              style: {
                width: `${Math.min(100, rec.percent || 0)}%`,
                backgroundColor: "var(--primary)"
              }
            }
          ) })
        ]
      },
      rec.dmId
    )) })
  ] });
};
const ThemePage = ({
  open,
  currentTheme,
  onThemeChange,
  onClose
}) => {
  if (!open) return null;
  const currentObj = TM_THEMES.find((t) => t.id === currentTheme) || TM_THEMES[0];
  const isDark = Boolean(currentObj.d);
  const autoSync = Boolean(getUserPrefs().auto);
  const families = [];
  const seen = /* @__PURE__ */ new Set();
  for (const t of TM_THEMES) {
    if (seen.has(t.fam)) continue;
    seen.add(t.fam);
    const pair = TM_THEMES.filter((x) => x.fam === t.fam);
    const dark = pair.find((x) => x.d === 1) || pair[0];
    const light = pair.find((x) => x.d === 0) || pair[0];
    families.push({ fam: t.fam, label: t.fl, dark, light });
  }
  const pick = (id, e) => {
    const r = e.currentTarget.getBoundingClientRect();
    applyThemeWithReveal(id, r.left + r.width / 2, r.top + r.height / 2, false, onThemeChange);
  };
  const toggleDayNight = (e) => {
    pick(currentObj.pair, e);
  };
  const toggleAuto = () => {
    const next = !autoSync;
    setUserPref("auto", next);
    if (next) {
      syncAutoTheme(onThemeChange);
    }
    onThemeChange(document.documentElement.getAttribute("data-theme") || currentTheme);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-tp", role: "dialog", "aria-modal": "true", "aria-label": "انتخاب تم", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-tp-top", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "tm-x", "aria-label": "بستن", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-back" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "tm-sheet-title", children: "ظاهر و تم‌ها" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: `tm-dn${isDark ? " dark" : ""}`,
        onClick: toggleDayNight,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-dn-thumb" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `tm-dn-o${!isDark ? " on" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-sun" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "روز" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `tm-dn-o${isDark ? " on" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-moon" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "شب" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: `tm-sw${autoSync ? " on" : ""}`,
        onClick: toggleAuto,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "هماهنگی خودکار با حالت تاریک سیستم" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-sw-k", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", {}) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "tm-tp-h", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-palette" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مجموعه رنگ‌های سینمایی" })
    ] }),
    families.map((fam, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "tm-fam",
        style: { "--i": idx },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "tm-fam-h", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tm-fam-dots", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("i", { style: { backgroundColor: fam.dark.p } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("i", { style: { backgroundColor: fam.dark.a } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("i", { style: { backgroundColor: fam.light.bg } })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fam.label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-fam-g", children: [fam.dark, fam.light].map((t) => {
            const active = currentTheme === t.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: `tm-tc${active ? " on" : ""}`,
                onClick: (e) => pick(t.id, e),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "tm-tc-pv",
                      style: {
                        backgroundColor: t.bg,
                        borderColor: t.t
                      },
                      children: [
                        active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-tc-ok", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-check" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "tm-tc-bar",
                            style: {
                              backgroundColor: t.s,
                              borderColor: t.t
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("i", { style: { backgroundColor: t.p } }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { style: { backgroundColor: t.a } })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-tc-row", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { style: { backgroundColor: t.p } }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { style: { backgroundColor: t.s } })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-tc-row", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { style: { backgroundColor: t.a } }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("i", { style: { backgroundColor: t.s } })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tm-tc-l", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `tm-ic ${t.d ? "tm-ic-moon" : "tm-ic-sun"}` }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t.d ? "شب" : "روز" })
                  ] })
                ]
              },
              t.id
            );
          }) })
        ]
      },
      fam.fam
    ))
  ] });
};
const SettingsModal = ({
  open,
  onClose,
  currentTheme,
  onThemeChange,
  onOpenThemes,
  onHistoryCleared,
  onToast,
  diagOpen,
  onOpenDiag,
  onCloseDiag,
  appVersion
}) => {
  const [prefs, setPrefs] = reactExports.useState(() => getUserPrefs());
  const [cacheLabel, setCacheLabel] = reactExports.useState(() => getApiCacheSizeLabel());
  const [diagLogs, setDiagLogs] = reactExports.useState(() => getDiagLogs());
  const [copiedDiag, setCopiedDiag] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (open) {
      setPrefs(getUserPrefs());
      setCacheLabel(getApiCacheSizeLabel());
    }
  }, [open]);
  reactExports.useEffect(() => {
    const sync = () => setDiagLogs([...getDiagLogs()]);
    window.addEventListener("tm-diag-update", sync);
    return () => window.removeEventListener("tm-diag-update", sync);
  }, []);
  const currentThemeObj = TM_THEMES.find((t) => t.id === currentTheme) || TM_THEMES[0];
  const isBackupActive = Boolean(window.__tmBk && window.__tmBk > Date.now());
  const updatePref = (k, val) => {
    setUserPref(k, val);
    setPrefs(getUserPrefs());
  };
  const handleToggleAuto = () => {
    const next = !prefs.auto;
    updatePref("auto", next);
    if (next) syncAutoTheme(onThemeChange);
  };
  const handleClearCache = () => {
    clearApiCache();
    setCacheLabel(getApiCacheSizeLabel());
    onToast("کش دریافت‌ها پاک شد");
  };
  const handleClearHistory = () => {
    clearWatchHistory();
    onHistoryCleared();
    onToast("تاریخچه تماشا پاک شد");
  };
  const handleClearPlayPref = () => {
    clearPlayPref();
    onToast("کیفیت و زبان پیش‌فرض بازنشانی شد");
  };
  const handleResetServer = () => {
    window.__tmBk = 0;
    onToast("اتصال به سرور اصلی بازنشانی شد");
  };
  const handleTestServers = async () => {
    onToast("در حال تست اتصال سرورها...");
    await testServerConnectivity();
    setDiagLogs([...getDiagLogs()]);
    onToast("نتیجه تست در گزارش فنی ثبت شد");
  };
  const handleCopyDiag = async () => {
    const info = getDiagInfo();
    const lines = [...diagLogs].reverse().map((x) => `${x.t} ${x.k === "err" ? "X" : x.k === "perf" ? "P" : "ok"} ${x.m}`).join("\n");
    const ok = await copyTextToClipboard(`${info}

${lines}`);
    if (ok) {
      setCopiedDiag(true);
      setTimeout(() => setCopiedDiag(false), 1500);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "tm-sheet-bg",
        onClick: (e) => {
          if (e.target === e.currentTarget) onClose();
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-sheet", onClick: (e) => e.stopPropagation(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-sheet-grip" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-sheet-head", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "tm-sheet-title", children: "تنظیمات" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-sheet-sub", children: "سفارشی‌سازی ظاهر، پخش و حافظه" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "tm-x", "aria-label": "بستن", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-x" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-grp", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "tm-grp-h", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-palette" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ظاهر" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-grp-b", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "tm-lr",
                  onClick: () => {
                    onClose();
                    onOpenThemes();
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-palette" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-lr-l", children: "انتخاب تم و رنگ‌ها" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tm-lr-v", children: [
                      currentThemeObj.fl,
                      " (",
                      currentThemeObj.d ? "شب" : "روز",
                      ")"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-chev tm-lr-c" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: `tm-sw tm-sw-flat${prefs.auto ? " on" : ""}`,
                  onClick: handleToggleAuto,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "هماهنگی خودکار با سیستم" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-sw-k", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", {}) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-grp-seg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-grp-t", children: "اندازه نوشته‌ها" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-seg", children: [
                  { k: "s", l: "کوچک" },
                  { k: "m", l: "معمولی" },
                  { k: "l", l: "بزرگ" }
                ].map((opt) => {
                  const active = (prefs.fs || "m") === opt.k;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: `tm-seg-b${active ? " on" : ""}`,
                      onClick: () => updatePref("fs", opt.k),
                      children: opt.l
                    },
                    opt.k
                  );
                }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-grp", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "tm-grp-h", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-bolt" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "عملکرد و حس لمس" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-grp-b", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: `tm-sw tm-sw-flat${prefs.lite ? " on" : ""}`,
                  onClick: () => updatePref("lite", !prefs.lite),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "حالت سبک (کاهش انیمیشن‌ها)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-sw-k", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", {}) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: `tm-sw tm-sw-flat${!prefs.novib ? " on" : ""}`,
                  onClick: () => updatePref("novib", !prefs.novib),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "لرزش لمس دکمه‌ها" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-sw-k", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", {}) })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-grp", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "tm-grp-h", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-play" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "پخش ویدئو" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-grp-b", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "tm-lr", onClick: handleClearPlayPref, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-refresh" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-lr-l", children: "بازنشانی کیفیت و زبان پیش‌فرض" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-chev tm-lr-c" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-grp", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "tm-grp-h", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-trash" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "داده‌ها و حافظه" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-grp-b", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "tm-lr", onClick: handleClearCache, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-refresh" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-lr-l", children: "پاک کردن کش دریافت‌ها" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-lr-v", children: cacheLabel })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "tm-lr danger", onClick: handleClearHistory, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-trash" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-lr-l", children: "پاک کردن تاریخچه تماشا" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-grp", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "tm-grp-h", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-server" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "اتصال و سرورها" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-grp-b", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "tm-lr", onClick: handleResetServer, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-server" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-lr-l", children: "سرور فعال" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-lr-v", children: isBackupActive ? "پشتیبان (appnxm)" : "اصلی (mihan-cdn)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "tm-lr", onClick: handleTestServers, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-bolt" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-lr-l", children: "تست اتصال به سرورها" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "tm-lr",
                  onClick: () => {
                    onClose();
                    onOpenDiag();
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-info" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-lr-l", children: "مشاهده گزارش فنی (Log)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tm-lr-v", children: [
                      diagLogs.length,
                      " مورد"
                    ] })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-grp", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "tm-grp-h", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-info" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "درباره برنامه" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-grp-b", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-set-info", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "نسخه برنامه" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "v",
                  appVersion
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "tm-lr", onClick: openTelegramChannel, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-send" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-lr-l", children: "کانال تلگرام توش مووی" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-lr-v", children: "@TOOSH_MOVIE" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tm-set-ver", children: "TOOSH MOVIE — سینمای جیبی شما" })
        ] })
      }
    ),
    diagOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "fixed inset-0 z-[2147483647] bg-[#0b0b0b] text-[#ddd] flex flex-col font-mono text-xs",
        style: { direction: "ltr" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 p-2.5 border-b border-[#333]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onCloseDiag,
                className: "px-3 py-2 rounded-lg border border-[#666] bg-[#222] text-[#eee] font-bold cursor-pointer",
                children: "Close"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleCopyDiag,
                className: "px-3 py-2 rounded-lg border border-[#666] bg-[#222] text-[#eee] font-bold cursor-pointer",
                children: copiedDiag ? "Copied" : "Copy"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleTestServers,
                className: "px-3 py-2 rounded-lg border border-[#666] bg-[#222] text-[#eee] font-bold cursor-pointer",
                children: "Test servers"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  clearDiagLogs();
                  setDiagLogs([]);
                },
                className: "px-3 py-2 rounded-lg border border-[#666] bg-[#222] text-[#eee] font-bold cursor-pointer",
                children: "Clear"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 text-[#ffd180] whitespace-pre-wrap break-all border-b border-[#333]", children: getDiagInfo() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-auto p-2.5 space-y-1", children: [...diagLogs].reverse().map((x, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "py-1 border-b border-[#222] break-all",
              style: {
                color: x.k === "err" ? "#ff8a80" : x.k === "perf" ? "#ffd180" : "#a5d6a7"
              },
              children: [
                x.t,
                " ",
                x.k === "err" ? "X" : x.k === "perf" ? "P" : "ok",
                " ",
                x.m
              ]
            },
            idx
          )) })
        ]
      }
    )
  ] });
};
const DayNightButton = ({ onThemeChange }) => {
  const maskId = reactExports.useId();
  const [themeId, setThemeId] = reactExports.useState(
    () => document.documentElement.getAttribute("data-theme") || "dark"
  );
  reactExports.useEffect(() => {
    const sync = (e) => {
      const detail = e.detail;
      setThemeId(detail || document.documentElement.getAttribute("data-theme") || "dark");
    };
    window.addEventListener("tm-theme", sync);
    window.addEventListener("tm-theme-done", sync);
    return () => {
      window.removeEventListener("tm-theme", sync);
      window.removeEventListener("tm-theme-done", sync);
    };
  }, []);
  const isDark = Boolean(THEME_DARK_MAP[themeId]);
  const handleToggle = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const next = THEME_PAIR_MAP[themeId] || (isDark ? "light" : "dark");
    applyThemeWithReveal(next, x, y, false, onThemeChange);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      className: `tm-dnb${isDark ? " dark" : ""}`,
      onClick: handleToggle,
      "aria-label": isDark ? "حالت روز" : "حالت شب",
      title: isDark ? "روشن کردن پوسته" : "تاریک کردن پوسته",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("mask", { id: maskId, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "24", height: "24", fill: "#fff" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { className: "tm-moon-cut", cx: "16.5", cy: "8.5", r: "6.5", fill: "#000" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            className: "tm-sun-core",
            cx: "12",
            cy: "12",
            r: "5.2",
            fill: "currentColor",
            mask: `url(#${maskId})`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "g",
          {
            className: "rays",
            stroke: "currentColor",
            strokeWidth: "2.1",
            strokeLinecap: "round",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "2", x2: "12", y2: "4.2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "19.8", x2: "12", y2: "22" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "2", y1: "12", x2: "4.2", y2: "12" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "19.8", y1: "12", x2: "22", y2: "12" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "4.9", y1: "4.9", x2: "6.5", y2: "6.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "17.5", y1: "17.5", x2: "19.1", y2: "19.1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "19.1", y1: "4.9", x2: "17.5", y2: "6.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "6.5", y1: "17.5", x2: "4.9", y2: "19.1" })
            ]
          }
        )
      ] })
    }
  );
};
const ExitDialog = ({ open, onStay, onExit }) => {
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "tm-sheet-bg tm-dlg-bg",
      onClick: (e) => {
        if (e.target === e.currentTarget) onStay();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-dlg", role: "dialog", "aria-modal": "true", onClick: (e) => e.stopPropagation(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-logout tm-dlg-ic", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "tm-dlg-t", children: "خروج از برنامه؟" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tm-dlg-p", children: "می‌خواهید از برنامه خارج شوید؟" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tm-dlg-b", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "tm-dlg-no", onClick: onStay, children: "بمانم" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "tm-dlg-yes", onClick: onExit, children: "خروج" })
        ] })
      ] })
    }
  );
};
const APP_VERSION = "2.4";
const DOCK_TABS = [
  { id: "home", label: "خانه", icon: "tm-ic-home" },
  { id: "movies", label: "فیلم‌ها", icon: "tm-ic-film" },
  { id: "series", label: "سریال‌ها", icon: "tm-ic-tv" },
  { id: "cats", label: "دسته‌بندی", icon: "tm-ic-grid" },
  { id: "me", label: "پروفایل", icon: "tm-ic-user" }
];
function App() {
  const [themeId, setThemeId] = reactExports.useState(() => getStoredTheme());
  const [splashVisible, setSplashVisible] = reactExports.useState(true);
  const [splashError, setSplashError] = reactExports.useState("");
  const [homeData, setHomeData] = reactExports.useState({});
  const [activeTab, setActiveTab] = reactExports.useState("home");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [selectedMovie, setSelectedMovie] = reactExports.useState(null);
  const [listView, setListView] = reactExports.useState(null);
  const [showDownloads, setShowDownloads] = reactExports.useState(false);
  const [moviesList, setMoviesList] = reactExports.useState([]);
  const [moviesPage, setMoviesPage] = reactExports.useState(1);
  const [moviesHasMore, setMoviesHasMore] = reactExports.useState(true);
  const [moviesLoading, setMoviesLoading] = reactExports.useState(false);
  const [seriesList, setSeriesList] = reactExports.useState([]);
  const [seriesPage, setSeriesPage] = reactExports.useState(1);
  const [seriesHasMore, setSeriesHasMore] = reactExports.useState(true);
  const [seriesLoading, setSeriesLoading] = reactExports.useState(false);
  const [listItems, setListItems] = reactExports.useState([]);
  const [listStars, setListStars] = reactExports.useState([]);
  const [listPage, setListPage] = reactExports.useState(1);
  const [listHasMore, setListHasMore] = reactExports.useState(false);
  const [listLoading, setListLoading] = reactExports.useState(false);
  const [profile, setProfile] = reactExports.useState(() => getUserProfile());
  const [historyList, setHistoryList] = reactExports.useState(() => getWatchHistory());
  const [likesList, setLikesList] = reactExports.useState(() => getLikedMovies());
  const [savedCount, setSavedCount] = reactExports.useState(() => getSavedDownloads().length);
  const [downloadsCount, setDownloadsCount] = reactExports.useState(() => getDownloadRecords().length);
  const [resumeTick, setResumeTick] = reactExports.useState(0);
  const [smartSheetData, setSmartSheetData] = reactExports.useState(null);
  const [chooseModalData, setChooseModalData] = reactExports.useState(null);
  const [playerState, setPlayerState] = reactExports.useState(null);
  const [themePageOpen, setThemePageOpen] = reactExports.useState(false);
  const [settingsOpen, setSettingsOpen] = reactExports.useState(false);
  const [diagOpen, setDiagOpen] = reactExports.useState(false);
  const [exitOpen, setExitOpen] = reactExports.useState(false);
  const [toasts, setToasts] = reactExports.useState([]);
  const loadMoreBtnRef = reactExports.useRef(null);
  const autoPageCountRef = reactExports.useRef(0);
  const addToast = reactExports.useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev.slice(-3), { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);
  const refreshUserCounts = reactExports.useCallback(() => {
    setHistoryList(getWatchHistory());
    setLikesList(getLikedMovies());
    setSavedCount(getSavedDownloads().length);
    setDownloadsCount(getDownloadRecords().length);
  }, []);
  reactExports.useEffect(() => {
    applyUserPrefs();
    initPerformanceMonitoring();
    const stopHaptics = initHapticClicks();
    syncNativeBars();
    syncAutoTheme((id) => setThemeId(id));
    const onFocus = () => {
      syncAutoTheme((id) => setThemeId(id));
      setResumeTick((t) => t + 1);
      refreshUserCounts();
    };
    window.addEventListener("focus", onFocus);
    return () => {
      stopHaptics();
      window.removeEventListener("focus", onFocus);
    };
  }, [refreshUserCounts]);
  const loadHome = reactExports.useCallback(async () => {
    setSplashError("");
    try {
      const data = await fetchHome();
      const allHomeMovies = [];
      (data.movies || []).forEach((s) => {
        if (Array.isArray(s.items)) allHomeMovies.push(...s.items);
      });
      const derivedStars = extractStarsFromMovies(allHomeMovies);
      setHomeData({
        ...data,
        stars: mergeStars(data.stars || [], derivedStars)
      });
      setSplashVisible(false);
    } catch (err) {
      setSplashError(err instanceof Error ? err.message : String(err));
    }
  }, []);
  reactExports.useEffect(() => {
    loadHome();
  }, [loadHome]);
  const loadMoviesCatalog = reactExports.useCallback(async (page = 1, append = false) => {
    setMoviesLoading(true);
    try {
      const res = await fetchCatalogByType("movie", page);
      setMoviesList((prev) => dedupeMovies(append ? [...prev, ...res] : res));
      setMoviesPage(page);
      setMoviesHasMore(res.length >= 12);
    } finally {
      setMoviesLoading(false);
    }
  }, []);
  const loadSeriesCatalog = reactExports.useCallback(async (page = 1, append = false) => {
    setSeriesLoading(true);
    try {
      const res = await fetchCatalogByType("series", page);
      setSeriesList((prev) => dedupeMovies(append ? [...prev, ...res] : res));
      setSeriesPage(page);
      setSeriesHasMore(res.length >= 12);
    } finally {
      setSeriesLoading(false);
    }
  }, []);
  reactExports.useEffect(() => {
    if (activeTab === "movies" && moviesList.length === 0 && !moviesLoading) {
      loadMoviesCatalog(1, false);
    } else if (activeTab === "series" && seriesList.length === 0 && !seriesLoading) {
      loadSeriesCatalog(1, false);
    }
  }, [activeTab, moviesList.length, moviesLoading, seriesList.length, seriesLoading, loadMoviesCatalog, loadSeriesCatalog]);
  const loadListViewData = reactExports.useCallback(
    async (view, page = 1, append = false) => {
      setListLoading(true);
      try {
        if (view.kind === "countries") {
          setListHasMore(false);
          return;
        }
        if (view.kind === "all-stars") {
          const starsRes = await fetchStarsPage(page);
          setListStars((prev) => mergeStars(append ? prev : homeData.stars || [], starsRes));
          setListPage(page);
          setListHasMore(starsRes.length > 0);
          return;
        }
        if (view.kind === "section" && view.section) {
          const items = await fetchSectionAll(view.section, view.sectionIdx || 0);
          setListItems(dedupeMovies(items));
          setListHasMore(false);
          return;
        }
        if (view.kind === "genre" && view.id != null) {
          const items = await fetchByGenre(view.id, page);
          setListItems((prev) => dedupeMovies(append ? [...prev, ...items] : items));
          setListPage(page);
          setListHasMore(items.length >= 12);
          return;
        }
        if (view.kind === "country" && view.id != null) {
          const items = await fetchByCountry(view.id, page);
          setListItems((prev) => dedupeMovies(append ? [...prev, ...items] : items));
          setListPage(page);
          setListHasMore(items.length >= 12);
          return;
        }
        if (view.kind === "star" && view.id != null) {
          const items = await fetchByStar(view.id, view.title, homeData.movies || []);
          setListItems(dedupeMovies(items));
          setListHasMore(false);
          return;
        }
        if (view.kind === "search" && view.query) {
          const items = await searchByTitle(view.query);
          setListItems(dedupeMovies(items));
          setListHasMore(false);
          return;
        }
      } finally {
        setListLoading(false);
      }
    },
    [homeData.movies, homeData.stars]
  );
  const openListView = (view) => {
    setSelectedMovie(null);
    setShowDownloads(false);
    setListView(view);
    setListItems([]);
    setListStars(view.kind === "all-stars" ? homeData.stars || [] : []);
    setListPage(1);
    setListHasMore(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadListViewData(view, 1, false);
  };
  reactExports.useEffect(() => {
    const q = searchQuery.trim();
    if (!q) {
      if ((listView == null ? void 0 : listView.kind) === "search") {
        setListView(null);
      }
      return;
    }
    const tm = setTimeout(() => {
      openListView({
        kind: "search",
        query: q,
        title: `نتایج جستجو: «${q}»`
      });
    }, 500);
    return () => clearTimeout(tm);
  }, [searchQuery]);
  reactExports.useEffect(() => {
    autoPageCountRef.current = 0;
  }, [activeTab, listView]);
  reactExports.useEffect(() => {
    const btn = loadMoreBtnRef.current;
    if (!btn || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        var _a;
        if (((_a = entries[0]) == null ? void 0 : _a.isIntersecting) && autoPageCountRef.current < 4 && !btn.disabled) {
          autoPageCountRef.current++;
          btn.click();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(btn);
    return () => io.disconnect();
  }, [activeTab, listView, listHasMore, moviesHasMore, seriesHasMore, listLoading, moviesLoading, seriesLoading]);
  const handleBack = reactExports.useCallback(() => {
    if (exitOpen) {
      setExitOpen(false);
      return true;
    }
    if (diagOpen) {
      setDiagOpen(false);
      return true;
    }
    if (themePageOpen) {
      setThemePageOpen(false);
      return true;
    }
    if (settingsOpen) {
      setSettingsOpen(false);
      return true;
    }
    if (chooseModalData) {
      setChooseModalData(null);
      return true;
    }
    if (smartSheetData) {
      setSmartSheetData(null);
      return true;
    }
    if (playerState) {
      setPlayerState(null);
      setResumeTick((t) => t + 1);
      return true;
    }
    if (selectedMovie) {
      setSelectedMovie(null);
      return true;
    }
    if (showDownloads) {
      setShowDownloads(false);
      return true;
    }
    if (listView) {
      setListView(null);
      if (listView.kind === "search") setSearchQuery("");
      return true;
    }
    if (activeTab !== "home") {
      setActiveTab("home");
      return true;
    }
    setExitOpen(true);
    return true;
  }, [
    exitOpen,
    diagOpen,
    themePageOpen,
    settingsOpen,
    chooseModalData,
    smartSheetData,
    playerState,
    selectedMovie,
    showDownloads,
    listView,
    activeTab
  ]);
  const handleBackRef = reactExports.useRef(handleBack);
  handleBackRef.current = handleBack;
  reactExports.useEffect(() => {
    window.__tmBack = () => handleBackRef.current();
    const handlePop = () => {
      handleBackRef.current();
    };
    window.addEventListener("popstate", handlePop);
    return () => {
      delete window.__tmBack;
      window.removeEventListener("popstate", handlePop);
    };
  }, []);
  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    if (!window.AndroidPlayer) {
      window.history.pushState({ tm: "details" }, "");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleOpenInAppPlayer = (opts) => {
    var _a, _b;
    const cleanUrl = cleanStreamUrl(opts.url);
    if (opts.movie) {
      const mId2 = getMovieId(opts.movie);
      addToWatchHistory(opts.movie, opts.quality);
      if (opts.sIdx != null && opts.eIdx != null) {
        markEpisodeWatched(mId2, opts.sIdx, opts.eIdx, opts.quality);
      } else {
        markMovieWatched(mId2, opts.quality);
      }
      refreshUserCounts();
    }
    const meta = opts.movie ? buildNativeMeta(opts.movie, {
      sIdx: opts.sIdx,
      eIdx: opts.eIdx,
      epTitle: opts.epTitle,
      seasons: opts.seasons
    }) : "{}";
    if ((_a = window.AndroidPlayer) == null ? void 0 : _a.playNativeEx) {
      window.AndroidPlayer.playNativeEx(cleanUrl, opts.title, meta);
      return;
    }
    if ((_b = window.AndroidPlayer) == null ? void 0 : _b.playNative) {
      window.AndroidPlayer.playNative(cleanUrl, opts.title);
      return;
    }
    const mId = opts.movie ? String(getMovieId(opts.movie)) : "video";
    const progKey = opts.sIdx != null && opts.eIdx != null ? `${mId}_s${opts.sIdx}_e${opts.eIdx}` : `${mId}_movie`;
    setPlayerState({
      url: cleanUrl,
      title: opts.title,
      movie: opts.movie,
      sources: opts.sources,
      subtitles: opts.subtitles,
      progressKey: progKey,
      progressMeta: meta,
      initialPositionSec: opts.initialPositionSec || 0
    });
  };
  const handleDownloadSource = (url, title, quality, movie) => {
    var _a;
    const cleanUrl = cleanStreamUrl(url);
    const type = getMovieType(movie);
    const dmId = Date.now() + Math.floor(Math.random() * 1e3);
    if ((_a = window.AndroidPlayer) == null ? void 0 : _a.startDownload) {
      const payload = JSON.stringify({
        url: cleanUrl,
        title,
        quality,
        type
      });
      const nativeId = window.AndroidPlayer.startDownload(payload);
      if (typeof nativeId === "number" && nativeId <= 0) {
        addToast("شروع دانلود ناموفق بود", "error");
        return;
      }
      addDownloadRecord({
        dmId: nativeId || dmId,
        url: cleanUrl,
        title,
        label: title,
        quality,
        type,
        fileName: `${title}.${quality}`,
        folder: "Download/TOOSH",
        createdAt: Date.now(),
        status: "running",
        percent: 0
      });
      refreshUserCounts();
      addToast("به صف دانلود اضافه شد");
      return;
    }
    addDownloadRecord({
      dmId,
      url: cleanUrl,
      title,
      label: title,
      quality,
      type,
      fileName: `${title} (${quality})`,
      folder: "مرورگر (Downloads)",
      createdAt: Date.now(),
      status: "successful",
      percent: 100
    });
    refreshUserCounts();
    const a = document.createElement("a");
    a.href = cleanUrl;
    a.download = `${title}-${quality}`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    a.remove();
    addToast("دانلود در مرورگر آغاز شد");
  };
  const handleResumeProgress = async (item) => {
    var _a;
    if ((_a = window.AndroidPlayer) == null ? void 0 : _a.playNativeEx) {
      window.AndroidPlayer.playNativeEx(item.url, item.title, item.meta || "{}");
      return;
    }
    let parsedMeta = {};
    try {
      parsedMeta = JSON.parse(item.meta || "{}");
    } catch {
    }
    let movie;
    if (parsedMeta.id) {
      const det = await fetchMovieDetails(parsedMeta.id);
      if (det) movie = det;
    }
    const srcs = movie ? sortSources(extractSources(movie.sources)) : [];
    setPlayerState({
      url: item.url,
      title: parsedMeta.title || item.title,
      movie,
      sources: srcs,
      subtitles: [],
      progressKey: item.k,
      progressMeta: item.meta || "{}",
      initialPositionSec: item.pos > 0 ? item.pos / 1e3 : 0
    });
  };
  const dockActiveIdx = reactExports.useMemo(() => {
    const idx = DOCK_TABS.findIndex((t) => t.id === activeTab);
    if (idx >= 0) return idx;
    if (activeTab === "history" || activeTab === "likes") return 4;
    return 0;
  }, [activeTab]);
  const sections = homeData.movies || [];
  const countries = homeData.countries || [];
  const genres = homeData.genres || [];
  const stars = homeData.stars || [];
  const selectTab = (tab) => {
    setSelectedMovie(null);
    setListView(null);
    setShowDownloads(false);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex flex-col",
      style: { backgroundColor: "var(--bg)", color: "var(--text)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SplashOverlay,
          {
            visible: splashVisible,
            error: splashError,
            onRetry: loadHome,
            onOpenDiag: () => setDiagOpen(true)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "header",
          {
            className: "sticky top-0 z-40 h-16 px-3 sm:px-5 flex items-center justify-between gap-2.5",
            style: { backgroundColor: "var(--header-bg)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setSearchQuery("");
                    selectTab("home");
                  },
                  className: "flex items-center gap-2 shrink-0 cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm tracking-tight",
                        style: {
                          backgroundColor: "var(--primary)",
                          border: "2px solid var(--ink)",
                          boxShadow: "2px 2px 0 var(--ink)",
                          fontFamily: "var(--font-display)"
                        },
                        children: "TM"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline-block font-extrabold tracking-wide text-lg", children: "TOOSH MOVIE" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 max-w-md relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Search,
                  {
                    className: "w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none",
                    style: { color: "var(--secondary)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    value: searchQuery,
                    onChange: (e) => setSearchQuery(e.target.value),
                    placeholder: "جستجوی فیلم، سریال، بازیگر...",
                    className: "w-full h-10 pr-9 pl-8 rounded-2xl text-xs sm:text-sm font-bold outline-none transition-colors",
                    style: {
                      backgroundColor: "var(--surface)",
                      color: "var(--text)",
                      border: "2px solid var(--ink)"
                    }
                  }
                ),
                searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setSearchQuery("");
                      if ((listView == null ? void 0 : listView.kind) === "search") setListView(null);
                    },
                    className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center cursor-pointer",
                    style: { backgroundColor: "var(--surface-2)", color: "var(--text)" },
                    "aria-label": "پاک کردن جستجو",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DayNightButton, { onThemeChange: (id) => setThemeId(id) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "tm-set-btn",
                    "aria-label": "تنظیمات",
                    onClick: () => setSettingsOpen(true),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-gear" })
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 w-full max-w-6xl mx-auto px-3 sm:px-5 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "tm-page",
            children: selectedMovie ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              MovieDetails,
              {
                movie: selectedMovie,
                onBack: handleBack,
                onOpenSmartSheet: (movie, sources, seasons) => setSmartSheetData({ movie, sources, seasons }),
                onPlaySource: (url, title, sources, subtitles, ctx) => setChooseModalData({
                  url,
                  title,
                  movie: (ctx == null ? void 0 : ctx.movie) || selectedMovie,
                  sources,
                  subtitles,
                  quality: (ctx == null ? void 0 : ctx.quality) || "خودکار",
                  sIdx: ctx == null ? void 0 : ctx.sIdx,
                  eIdx: ctx == null ? void 0 : ctx.eIdx,
                  epTitle: ctx == null ? void 0 : ctx.epTitle,
                  seasons: ctx == null ? void 0 : ctx.seasons
                }),
                onDownloadSource: handleDownloadSource,
                onLikesChanged: refreshUserCounts,
                onSavedChanged: refreshUserCounts,
                onToast: addToast
              }
            ) : showDownloads ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              DownloadManager,
              {
                onBack: handleBack,
                onSelectMovie: handleSelectMovie,
                onSavedChanged: refreshUserCounts,
                onToast: addToast
              }
            ) : listView ? (
              /* List / Filter / Search Page */
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-12", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "mb-5 p-3 rounded-2xl border flex items-center justify-between gap-3",
                    style: { backgroundColor: "var(--surface)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: handleBack,
                          className: "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 cursor-pointer",
                          style: {
                            backgroundColor: "var(--surface-2)",
                            border: "2px solid var(--ink)",
                            color: "var(--text)"
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base sm:text-lg font-black truncate", children: listView.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-1 text-xs font-black tabular-nums shrink-0", children: listView.kind === "countries" ? `${toPersianDigits(countries.length)} کشور` : listView.kind === "all-stars" ? `${toPersianDigits(listStars.length)} هنرمند` : `${toPersianDigits(listItems.length)} عنوان` })
                    ]
                  }
                ),
                listView.kind === "countries" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-cats-grid", children: countries.map((c, i) => {
                  const name = cleanTitle(c.name || c.title || "");
                  const img = resolveMediaUrl(c.image);
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "tm-cat",
                      style: { "--i": i, "--c": "var(--primary)" },
                      onClick: () => openListView({
                        kind: "country",
                        id: c.id,
                        title: `محصولات ${name}`
                      }),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-cat-b" }),
                        img && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: img,
                            alt: name,
                            className: "w-8 h-8 rounded-full object-cover border border-[var(--ink)]"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-cat-t", children: name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-chev" })
                      ]
                    },
                    `${c.id || i}`
                  );
                }) }) : listView.kind === "all-stars" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3", children: listStars.map((st, idx) => {
                    const sName = cleanTitle(st.name || st.title || "");
                    const sImg = resolveMediaUrl(st.image);
                    const sId = getMovieId(st);
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => openListView({
                          kind: "star",
                          id: sId,
                          title: `آثار ${sName}`
                        }),
                        className: "p-3 rounded-2xl flex flex-col items-center gap-2 text-center cursor-pointer",
                        style: { backgroundColor: "var(--surface)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-cc-a", style: { width: "68px", height: "68px" }, children: sImg ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: sImg, alt: sName, loading: "lazy" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-ic tm-ic-user" }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-black line-clamp-2", children: sName })
                        ]
                      },
                      `${sId || idx}`
                    );
                  }) }),
                  listHasMore && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      ref: loadMoreBtnRef,
                      type: "button",
                      disabled: listLoading,
                      onClick: () => loadListViewData(listView, listPage + 1, true),
                      className: "px-7 py-3 rounded-2xl font-black text-sm text-white cursor-pointer",
                      style: { backgroundColor: "var(--primary)" },
                      children: listLoading ? "در حال بارگذاری..." : "نمایش هنرمندان بیشتر"
                    }
                  ) })
                ] }) : listLoading && listItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, { count: 12 }) : listItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-empty", children: "موردی یافت نشد" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3", children: listItems.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    MovieCard,
                    {
                      movie: m,
                      onClick: handleSelectMovie
                    },
                    String(getMovieId(m))
                  )) }),
                  listHasMore && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      ref: loadMoreBtnRef,
                      type: "button",
                      disabled: listLoading,
                      onClick: () => loadListViewData(listView, listPage + 1, true),
                      className: "px-7 py-3 rounded-2xl font-black text-sm text-white cursor-pointer",
                      style: { backgroundColor: "var(--primary)" },
                      children: listLoading ? "در حال بارگذاری..." : "نمایش فیلم و سریال‌های بیشتر"
                    }
                  ) })
                ] })
              ] })
            ) : activeTab === "home" ? (
              /* Home View */
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ContinueWatching,
                  {
                    refreshTick: resumeTick,
                    onResume: handleResumeProgress
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: openTelegramChannel,
                    className: "w-full p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-right cursor-pointer",
                    style: { backgroundColor: "var(--surface)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 border-2",
                            style: { backgroundColor: "#0088cc", borderColor: "var(--ink)" },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-5 h-5" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-black truncate", children: "کانال تلگرام توش مووی" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold truncate", style: { color: "var(--secondary)" }, children: "اطلاع‌رسانی جدیدترین فیلم‌ها، سریال‌ها و بروزرسانی‌ها (@TOOSH_MOVIE)" })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5 shrink-0" })
                    ]
                  }
                ),
                sections.length === 0 && !splashVisible ? /* @__PURE__ */ jsxRuntimeExports.jsx(OfflineBanner, { onRetry: loadHome }) : sections.map((sec, idx) => {
                  const secTitle = cleanTitle(sec.title || sec.name || `بخش ${idx + 1}`);
                  const items = sec.items || [];
                  if (!items.length) return null;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-black", children: secTitle }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => openListView({
                            kind: "section",
                            id: sec.id,
                            title: secTitle,
                            section: sec,
                            sectionIdx: idx
                          }),
                          className: "text-xs font-bold flex items-center gap-0.5 cursor-pointer",
                          style: { color: "var(--primary-bright)" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مشاهده همه" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 overflow-x-auto pb-2 no-scrollbar", children: items.slice(0, 18).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 sm:w-36 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MovieCard, { movie: m, onClick: handleSelectMovie }) }, String(getMovieId(m)))) })
                  ] }, `${sec.id || idx}`);
                })
              ] })
            ) : activeTab === "movies" ? (
              /* Movies Catalog */
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-12", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "mb-5 p-3 rounded-2xl border flex items-center justify-between gap-3",
                    style: { backgroundColor: "var(--surface)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "فیلم‌های سینمایی" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2.5 py-1 text-xs font-black tabular-nums", children: [
                        toPersianDigits(moviesList.length),
                        " فیلم"
                      ] })
                    ]
                  }
                ),
                moviesLoading && moviesList.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, { count: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3", children: moviesList.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    MovieCard,
                    {
                      movie: m,
                      onClick: handleSelectMovie
                    },
                    String(getMovieId(m))
                  )) }),
                  moviesHasMore && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      ref: loadMoreBtnRef,
                      type: "button",
                      disabled: moviesLoading,
                      onClick: () => loadMoviesCatalog(moviesPage + 1, true),
                      className: "px-7 py-3 rounded-2xl font-black text-sm text-white cursor-pointer",
                      style: { backgroundColor: "var(--primary)" },
                      children: moviesLoading ? "در حال بارگذاری..." : "نمایش فیلم و سریال‌های بیشتر"
                    }
                  ) })
                ] })
              ] })
            ) : activeTab === "series" ? (
              /* Series Catalog */
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-12", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "mb-5 p-3 rounded-2xl border flex items-center justify-between gap-3",
                    style: { backgroundColor: "var(--surface)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "سریال‌ها" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2.5 py-1 text-xs font-black tabular-nums", children: [
                        toPersianDigits(seriesList.length),
                        " سریال"
                      ] })
                    ]
                  }
                ),
                seriesLoading && seriesList.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, { count: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3", children: seriesList.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    MovieCard,
                    {
                      movie: m,
                      onClick: handleSelectMovie
                    },
                    String(getMovieId(m))
                  )) }),
                  seriesHasMore && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      ref: loadMoreBtnRef,
                      type: "button",
                      disabled: seriesLoading,
                      onClick: () => loadSeriesCatalog(seriesPage + 1, true),
                      className: "px-7 py-3 rounded-2xl font-black text-sm text-white cursor-pointer",
                      style: { backgroundColor: "var(--primary)" },
                      children: seriesLoading ? "در حال بارگذاری..." : "نمایش فیلم و سریال‌های بیشتر"
                    }
                  ) })
                ] })
              ] })
            ) : activeTab === "cats" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              CategoriesView,
              {
                countries,
                genres,
                stars,
                onSelectGenre: (g) => openListView({
                  kind: "genre",
                  id: g.id,
                  title: cleanTitle(g.name || g.title || "ژانر")
                }),
                onSelectCountry: (c) => openListView({
                  kind: "country",
                  id: c.id,
                  title: `محصولات ${cleanTitle(c.name || c.title || "")}`
                }),
                onSelectStar: (st) => openListView({
                  kind: "star",
                  id: getMovieId(st),
                  title: `آثار ${cleanTitle(st.name || st.title || "")}`
                }),
                onOpenAllCountries: () => openListView({ kind: "countries", title: "همه کشورها" }),
                onOpenAllStars: () => openListView({ kind: "all-stars", title: "ستاره‌ها و هنرمندان" })
              }
            ) : activeTab === "history" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-12", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "mb-5 p-3 rounded-2xl border flex items-center justify-between gap-3",
                  style: { backgroundColor: "var(--surface)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setActiveTab("me"),
                          className: "w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer",
                          style: {
                            backgroundColor: "var(--surface-2)",
                            border: "2px solid var(--ink)"
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "تاریخچه تماشا" })
                    ] }),
                    historyList.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => {
                          clearWatchHistory();
                          refreshUserCounts();
                          addToast("تاریخچه پاک شد");
                        },
                        className: "px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 cursor-pointer",
                        style: {
                          backgroundColor: "var(--primary)",
                          color: "#fff",
                          border: "2px solid var(--ink)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "پاک کردن" })
                        ]
                      }
                    )
                  ]
                }
              ),
              historyList.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-empty", children: "هنوز فیلم یا سریالی تماشا نکرده‌اید" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3", children: historyList.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                MovieCard,
                {
                  movie: m,
                  onClick: handleSelectMovie
                },
                String(getMovieId(m))
              )) })
            ] }) : activeTab === "likes" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-12", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "mb-5 p-3 rounded-2xl border flex items-center justify-between gap-3",
                  style: { backgroundColor: "var(--surface)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setActiveTab("me"),
                          className: "w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer",
                          style: {
                            backgroundColor: "var(--surface-2)",
                            border: "2px solid var(--ink)"
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "علاقه‌مندی‌ها" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2.5 py-1 text-xs font-black tabular-nums", children: [
                      toPersianDigits(likesList.length),
                      " مورد"
                    ] })
                  ]
                }
              ),
              likesList.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tm-empty", children: "لیست علاقه‌مندی‌ها خالی است" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3", children: likesList.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                MovieCard,
                {
                  movie: m,
                  onClick: handleSelectMovie
                },
                String(getMovieId(m))
              )) })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              ProfileView,
              {
                profile,
                onProfileChange: setProfile,
                historyCount: historyList.length,
                likesCount: likesList.length,
                savedCount,
                downloadsCount,
                onOpenDownloads: () => setShowDownloads(true),
                onOpenHistory: () => setActiveTab("history"),
                onOpenLikes: () => setActiveTab("likes"),
                onOpenThemes: () => setThemePageOpen(true),
                onOpenSettings: () => setSettingsOpen(true),
                onToast: addToast,
                appVersion: APP_VERSION
              }
            )
          },
          `${selectedMovie ? "det" : showDownloads ? "dl" : listView ? listView.kind : activeTab}`
        ) }),
        !playerState && !selectedMovie && !showDownloads && /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "sticky top-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "tm-dock",
            style: { "--tm-i": dockActiveIdx },
            children: DOCK_TABS.map((t) => {
              const isActive = activeTab === t.id || t.id === "me" && (activeTab === "history" || activeTab === "likes");
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-active": isActive ? "true" : "false",
                  onClick: () => selectTab(t.id),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `tm-ic ${t.icon}` }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tm-tab-l", children: t.label })
                  ]
                },
                t.id
              );
            })
          }
        ) }) }),
        smartSheetData && /* @__PURE__ */ jsxRuntimeExports.jsx(
          SmartPlaySheet,
          {
            movie: smartSheetData.movie,
            initialSources: smartSheetData.sources,
            initialSeasons: smartSheetData.seasons,
            onClose: () => setSmartSheetData(null),
            onPlay: (src, opts) => {
              var _a;
              const m = smartSheetData.movie;
              const mTitle = getMovieTitle(m);
              const fullTitle = (opts == null ? void 0 : opts.epTitle) ? `${mTitle} - ${opts.epTitle}` : mTitle;
              setSmartSheetData(null);
              setChooseModalData({
                url: src.url,
                title: fullTitle,
                movie: m,
                sources: ((_a = opts == null ? void 0 : opts.epSources) == null ? void 0 : _a.length) ? opts.epSources : smartSheetData.sources,
                subtitles: (opts == null ? void 0 : opts.subtitles) || [],
                quality: src.quality,
                sIdx: opts == null ? void 0 : opts.sIdx,
                eIdx: opts == null ? void 0 : opts.eIdx,
                epTitle: opts == null ? void 0 : opts.epTitle,
                seasons: opts == null ? void 0 : opts.seasons
              });
            },
            onShowAllQualities: () => {
              const box = document.getElementById("tm-dlbox");
              box == null ? void 0 : box.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        ),
        chooseModalData && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChoosePlayerModal,
          {
            url: chooseModalData.url,
            title: chooseModalData.title,
            onClose: () => setChooseModalData(null),
            onPlayInApp: (u) => handleOpenInAppPlayer({
              ...chooseModalData,
              url: u
            }),
            onDownload: (u) => {
              if (chooseModalData.movie) {
                handleDownloadSource(
                  u,
                  chooseModalData.title,
                  chooseModalData.quality,
                  chooseModalData.movie
                );
              } else {
                const a = document.createElement("a");
                a.href = u;
                a.download = chooseModalData.title;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                document.body.appendChild(a);
                a.click();
                a.remove();
              }
            },
            onToast: addToast
          }
        ),
        playerState && /* @__PURE__ */ jsxRuntimeExports.jsx(
          VideoPlayer,
          {
            url: playerState.url,
            title: playerState.title,
            movie: playerState.movie,
            sources: playerState.sources,
            subtitleUrls: playerState.subtitles,
            progressKey: playerState.progressKey,
            progressMeta: playerState.progressMeta,
            initialPositionSec: playerState.initialPositionSec,
            onClose: () => {
              setPlayerState(null);
              setResumeTick((t) => t + 1);
            },
            onSwitchSource: (src) => {
              setPlayerState(
                (prev) => prev ? {
                  ...prev,
                  url: cleanStreamUrl(src.url),
                  title: prev.movie ? `${getMovieTitle(prev.movie)} (${src.quality})` : prev.title
                } : null
              );
            },
            onToast: addToast
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ThemePage,
          {
            open: themePageOpen,
            currentTheme: themeId,
            onThemeChange: (id) => setThemeId(id),
            onClose: () => setThemePageOpen(false)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsModal,
          {
            open: settingsOpen,
            onClose: () => setSettingsOpen(false),
            currentTheme: themeId,
            onThemeChange: (id) => setThemeId(id),
            onOpenThemes: () => setThemePageOpen(true),
            onHistoryCleared: refreshUserCounts,
            onToast: addToast,
            diagOpen,
            onOpenDiag: () => setDiagOpen(true),
            onCloseDiag: () => setDiagOpen(false),
            appVersion: APP_VERSION
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ExitDialog,
          {
            open: exitOpen,
            onStay: () => setExitOpen(false),
            onExit: () => {
              var _a;
              setExitOpen(false);
              if ((_a = window.AndroidPlayer) == null ? void 0 : _a.exitApp) {
                window.AndroidPlayer.exitApp();
              } else {
                addToast("برای بستن، تب مرورگر را ببندید");
              }
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-24 left-1/2 -translate-x-1/2 z-[2147483001] flex flex-col gap-2 pointer-events-none", children: toasts.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-center max-w-[86vw]",
            style: {
              backgroundColor: t.type === "error" ? "var(--primary)" : "var(--surface-solid)",
              color: t.type === "error" ? "#fff" : "var(--text)",
              border: "2px solid var(--ink)",
              boxShadow: "3px 3px 0 var(--ink)"
            },
            children: t.message
          },
          t.id
        )) })
      ]
    }
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
