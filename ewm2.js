!function() {
    function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i)
                        return i(g, !0);
                    if (f)
                        return f(g, !0);
                    var j = new Error("Cannot find module '" + g + "'");
                    throw j.code = "MODULE_NOT_FOUND",
                    j
                }
                var k = c[g] = {
                    exports: {}
                };
                b[g][0].call(k.exports, function(a) {
                    return e(b[g][1][a] || a)
                }, k, k.exports, a, b, c, d)
            }
            return c[g].exports
        }
        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++)
            e(d[g]);
        return e
    }
    return a
}()({
    1: [function(a, b, c) {
        function d(a) {
            var b;
            "string" == typeof a.data && (a.data.startsWith("removeWidget") ? (b = document.getElementById("gfOrderFrm"),
            b && b.parentNode.removeChild(b),
            document.getElementsByTagName("body")[0].style.overflow = "auto",
            M && M()) : a.data.startsWith("removeWidgetTab") && G ? (G && G.close && G.close(),
            M && M()) : a.data.startsWith("removeButtonAnalyticsFrame") ? (b = document.getElementById("gfButtonAnalyticsFrame")) && b.parentNode.removeChild(b) : a.data.startsWith("widgetInitialized") && N && N())
        }
        function e(a, b) {
            var c;
            !H && b.hasChildNodes() && b.childNodes.length > 0 && (H = !0,
            document.createStyleSheet ? document.createStyleSheet(E + "embedder/css/order-online.css") : (c = document.createElement("link"),
            c.setAttribute("rel", "stylesheet"),
            c.setAttribute("href", E + "embedder/css/order-online.css"),
            c.setAttribute("type", "text/css"),
            c.setAttribute("media", "screen"),
            a.appendChild(c)))
        }
        function f(a) {
            var b, c, d, f, h, j, k, l = document.getElementsByTagName("head")[0], m = document.getElementsByTagName("body")[0];
            for ("object" == typeof a && a || (d = {},
            d.url = arguments[0],
            d.elementIds = arguments[1],
            d.companyUID = arguments[2],
            d.restaurantId = arguments[3],
            d.sliderMode = arguments[4],
            d.adminMode = arguments[5],
            d.noDevice = arguments[6],
            a = d),
            b = a.url,
            c = a.elementIds,
            e(l, m),
            f = g(a),
            a.restaurantUID && !I && (r(),
            I = !0),
            s(a.restaurantUID),
            M = !!a.closeHandler && a.closeHandler,
            h = 0; h < c.length; h++)
                j = c[h],
                (k = document.getElementById(j)) && (w(k, "click", function() {
                    i(b, f, a.forceMode, a.isCustomUrl)
                }),
                w(k, "keydown", function(c) {
                    13 === c.keyCode && i(b, f, a.forceMode, a.isCustomUrl)
                }))
        }
        function g(a) {
            var b = {};
            return a.referrerTracker && (b.ref_tracker = a.referrerTracker),
            a.reservation && (b.reservation = a.reservation),
            a.restaurantId && (b.restaurant_id = a.restaurantId),
            a.companyUID && (b.company_uid = a.companyUID),
            a.restaurantUID && (b.restaurant_uid = a.restaurantUID),
            a.adminMode && (b.admin_mode = !0),
            a.inAdmin2 && (b.in_admin_2 = !0),
            a.openSimPos && (b.open_sim_pos = !0),
            a.noOverlay && (b.no_overlay = !0),
            a.promotionTest && (b.promotion_test = !0),
            a.analytics && a.analytics.forEach(function(a) {
                b[a.key] = a.value
            }),
            b.return_url = encodeURIComponent(window.location.href.split("?")[0]),
            b
        }
        function h(a) {
            var b = a.url
              , c = g(a);
            M = !!a.closeHandler && a.closeHandler,
            N = !!a.initHandler && a.initHandler,
            i(b, c, a.forceMode, a.isCustomUrl)
        }
        function i(a, b, c, d) {
            if (window.snowplow_legacy && -1 === a.indexOf(document.location.hostname)) {
                var e = new RegExp("_sp_id\\.[a-f0-9]+=([^;]+);?")
                  , f = document.cookie.match(e);
                f && f[1] ? b._sp = f[1].split(".")[0] + "." + (new Date).getTime() : window.trackerDUID && (b._sp = window.trackerDUID[1] + "." + (new Date).getTime())
            }
            var g, h, i = !1;
            if (!O) {
                if (O = !0,
                !v())
                    return void l(a);
                try {
                    g = window.top.location.host
                } catch (a) {}
                try {
                    h = window.frameElement
                } catch (a) {}
                if (d && (b.custom_host = encodeURIComponent(btoa(a))),
                i = "www.pronto-ny.com" !== window.location.host && (!g || window.location.host !== g || h && !h.hasAttribute("src")),
                window.self !== window.top && i)
                    return window.top === window.parent && window.document.referrer && (b.site_url = encodeURIComponent(btoa(window.document.referrer))),
                    O = !1,
                    void ((G = window.open(a + "api/widget_redirect" + j(b), "ordering")) && G.focus && G.focus());
                n(),
                z(a + "api/widget_setup" + k(b), function(a, d) {
                    if (a)
                        return O = !1,
                        o(),
                        alert((b.open_sim_pos,
                        "simulated pos")),
                        console.error("Could not load widget", a);
                    "desktop" === (c || (d.is_mobile ? "mobile" : "desktop")) ? m(d.url) : q(d.url)
                })
            }
            return !1
        }
        function j(a) {
            return u(a, ["company_uid", "restaurant_uid", "restaurant_id", "site_url", "custom_host", "reservation"].concat(F))
        }
        function k(a) {
            return u(a, ["company_uid", "restaurant_uid", "restaurant_id", "custom_host", "ref_tracker", "reservation", "admin_mode", "in_admin_2", "open_sim_pos", "no_overlay", "promotion_test", "return_url"].concat(F))
        }
        function l(a) {
            var b = window.open(a + "embedder/old_browser.html", "_blank");
            b && b.focus && b.focus(),
            O = !1
        }
        function m(a) {
            var b = !1
              , c = document.getElementsByTagName("body")[0]
              , d = document.createElement("iframe");
            d.setAttribute("id", "gfOrderFrm"),
            d.setAttribute("frameborder", "0"),
            d.setAttribute("src", a),
            d.setAttribute("allowpaymentrequest", !0),
            d.setAttribute("style", "display: none; z-index: 999998 !important; border: 0 !important; position:fixed !important; top:0 !important; left:0 !important; right:0 !important; bottom:0 !important; width:100% !important; height:100% !important; visibility: visible; opacity: 1;"),
            d.setAttribute("onmousewheel", ""),
            setTimeout(function() {
                O = !1
            }, 500),
            w(d, "load", function() {
                if (!b) {
                    b = !0;
                    var a = d.getAttribute("style");
                    d.setAttribute("style", a.replace("display: none;", "")),
                    o(),
                    O = !1,
                    x(window, "keydown", p)
                }
            }),
            w(window, "keydown", p),
            c.appendChild(d),
            c.style.overflow = "hidden"
        }
        function n() {
            var a = document.getElementsByTagName("body")[0]
              , b = document.createElement("div")
              , c = document.createElement("div")
              , d = document.createElement("div");
            b.setAttribute("id", "gfBackdrop"),
            b.setAttribute("class", "glf-backdrop"),
            c.setAttribute("class", "glf-preloader-wrapper"),
            d.setAttribute("class", "glf-preloader"),
            c.appendChild(d),
            b.appendChild(c),
            setTimeout(function() {
                b.setAttribute("class", "glf-backdrop glf-backdrop-visible")
            }, 0),
            a.appendChild(b)
        }
        function o() {
            var a = document.querySelector(".glf-backdrop");
            a.parentNode.removeChild(a)
        }
        function p(a) {
            if (a = a || window.event,
            27 === (a.keyCode || a.which))
                return a.preventDefault(),
                !1
        }
        function q(a) {
            var b, c;
            O = !1;
            try {
                b = !top.document
            } catch (a) {
                b = !0
            }
            c = b ? top : window,
            o(),
            c.location.href = a + "&client_is_mobile=true"
        }
        function r() {
            D && C() && function(a, b, c, d, e, f, g) {
                a[e] || (a.GlobalSnowplowNamespace = a.GlobalSnowplowNamespace || [],
                a.GlobalSnowplowNamespace.push(e),
                a[e] = function() {
                    (a[e].q = a[e].q || []).push(arguments)
                }
                ,
                a[e].q = a[e].q || [],
                f = b.createElement(c),
                g = b.getElementsByTagName(c)[0],
                f.async = 1,
                f.src = d,
                g.parentNode.insertBefore(f, g))
            }(window, document, "script", "https://www.fbgcdn.com/embedder/js/static/sp.js", "snowplow_legacy")
        }
        function s(a) {
            if (D && window.snowplow_legacy && C()) {
                window.trackers || (window.trackers = []);
                var b = "prod_legacy_" + a;
                -1 == window.trackers.indexOf(a) && (window.snowplow_legacy("newTracker", b, "analytics.fbgcdn.com", {
                    appId: a,
                    post: !1,
                    cookieSameSite: "None",
                    cookieSecure: !0,
                    forceSecureTracker: !0,
                    contexts: {
                        webPage: !0,
                        performanceTiming: !1,
                        geolocation: !1
                    }
                }),
                window.snowplow_legacy("setUserIdFromLocation", "u"),
                window.snowplow_legacy("trackPageView:" + b, "/widget/_events/button-view"),
                window.snowplow_legacy(function() {
                    window.trackerDUID = this[b].getDomainUserInfo()
                }),
                window.trackers.push(a))
            }
        }
        function t(a, b) {
            function c() {
                if (!K) {
                    K = !0;
                    for (var a = 0; a < J.length; a++)
                        J[a].fn.call(window, J[a].ctx);
                    J = []
                }
            }
            if (K)
                return void setTimeout(function() {
                    a(b)
                }, 1);
            J.push({
                fn: a,
                ctx: b
            }),
            "complete" === document.readyState ? setTimeout(c, 1) : L || (document.addEventListener ? (document.addEventListener("DOMContentLoaded", c, !1),
            window.addEventListener("load", c, !1)) : (document.attachEvent("onreadystatechange", function() {
                "complete" === document.readyState && c()
            }),
            window.attachEvent("onload", c)),
            L = !0)
        }
        function u(a, b) {
            var c, d, e = [];
            for (b = b || ["restaurant_uid", "company_uid", "ref_tracker", "reservation", "restaurant_id"].concat(F),
            c = 0; c < b.length; c++)
                d = b[c],
                a.hasOwnProperty(d) && e.push(d + "=" + a[d]);
            return e.push("timestamp=" + (new Date).getTime()),
            e.length > 0 ? "?" + e.join("&") : ""
        }
        function v() {
            return "Promise"in window && "isFinite"in Number && "keys"in Array.prototype && "startsWith"in String.prototype && "function" == typeof Object.values && !/Edge/.test(navigator.userAgent)
        }
        function w(a, b, c) {
            a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent("on" + b, c)
        }
        function x(a, b, c) {
            a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent("on" + b, c)
        }
        function y(a) {
            for (var b = {
                strictMode: !1,
                key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
                q: {
                    name: "queryKey",
                    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
                },
                parser: {
                    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                }
            }, c = b.parser[b.strictMode ? "strict" : "loose"].exec(a), d = {}, e = 14; e--; )
                d[b.key[e]] = c[e] || "";
            return d[b.q.name] = {},
            d[b.key[12]].replace(b.q.parser, function(a, c, e) {
                c && (d[b.q.name][c] = e)
            }),
            d
        }
        function z(a, b) {
            function c(a) {
                var b = a.split("/");
                return b[0] + "//" != window.location.protocol + "//" || b[2] === window.location.host
            }
            var d = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP")
              , e = function() {
                b(null, JSON.parse(d.responseText))
            };
            window.XDomainRequest && !c(a) && (d = new XDomainRequest,
            d.onload = e),
            d.onerror = b,
            d.onreadystatechange = function() {
                4 === d.readyState && 200 === d.status && e()
            }
            ;
            try {
                "withCredentials"in d ? d.open("GET", a, !0) : d.open("GET", a),
                d.send(null)
            } catch (a) {
                b(a)
            }
        }
        function A(a) {
            const b = "; " + document.cookie
              , c = b.split("; " + a + "=");
            if (2 === c.length)
                return c.pop().split(";").shift()
        }
        function B() {
            const a = A("glf.functionality_consent");
            return a ? JSON.parse(a) : null
        }
        function C() {
            const a = B();
            return !!a && a.functionality
        }
        var D = !0
          , E = "https://www.fbgcdn.com/"
          , F = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "_sp", "u"];
        b.exports = {
            addButtonHandler: f,
            showGloriaFoodWidget: i,
            openGloriaFoodWidget: h,
            addReadyListener: t,
            addEventListener: w,
            onFrameMessage: d,
            parseUri: y,
            GA_QUERY_PARAM_KEYS: F,
            OPEN_WIDGET_QUERY_PARAM_KEY: "glf_open_widget"
        };
        var G, H = !1, I = !1, J = [], K = !1, L = !1, M = !1, N = !1, O = !1
    }
    , {}],
    2: [function(a, b, c) {
        function d() {
            var a = history.pushState;
            history.pushState = function() {
                a.apply(history, arguments),
                e()
            }
        }
        function e() {
            setTimeout(f, 0)
        }
        function f(a) {
            var b;
            b = a ? Array.isArray(a) ? a : [a] : [].slice.call(document.querySelectorAll("*[data-glf-cuid]")),
            b.forEach(function(a) {
                if (!a.__glfAttached) {
                    a.__glfAttached = !0;
                    var b, c, d, e, f, i, j = "glfButton" + h;
                    h++,
                    a.dataset ? (b = a.dataset.glfHost,
                    c = a.dataset.glfCuid,
                    d = a.dataset.glfRuid,
                    e = a.dataset.glfForceMode,
                    f = a.dataset.glfReservation) : (b = a.getAttribute("data-glf-host"),
                    c = a.getAttribute("data-glf-cuid"),
                    d = a.getAttribute("data-glf-ruid"),
                    e = a.getAttribute("data-glf-force-mode"),
                    f = a.getAttribute("data-glf-reservation")),
                    b = b || "https://www.foodbooking.com/",
                    i = {
                        url: b,
                        isCustomUrl: "https://www.foodbooking.com/" !== b,
                        elementIds: [j],
                        companyUID: c,
                        restaurantUID: d,
                        forceMode: e,
                        reservation: f,
                        analytics: []
                    };
                    var k = !1;
                    window.location.search.replace("?", "").split("&").forEach(function(a) {
                        var b = a.split("=")
                          , c = b[0]
                          , d = b[1];
                        c && d && (-1 === c.indexOf(g.OPEN_WIDGET_QUERY_PARAM_KEY) || "true" !== d || f || (k = !0),
                        g.GA_QUERY_PARAM_KEYS.indexOf(c) >= 0 && i.analytics.push({
                            key: c,
                            value: d
                        }))
                    }),
                    a.setAttribute("id", j),
                    k && window.glfOpenWidget(i),
                    g.addButtonHandler(i)
                }
            })
        }
        if (!window.glfLoaded) {
            window.glfLoaded = !0;
            var g = a("./embed_lib.js")
              , h = 0;
            window.glfWidget = g.addButtonHandler,
            window.glfOpenWidget = g.openGloriaFoodWidget,
            window.glfBindButtons = f,
            g.addReadyListener(f),
            g.addEventListener(window, "message", g.onFrameMessage),
            d(),
            g.addEventListener(window, "popstate", e)
        }
    }
    , {
        "./embed_lib.js": 1
    }]
}, {}, [2]);
