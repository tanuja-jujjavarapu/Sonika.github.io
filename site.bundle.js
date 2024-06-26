!function(e) {
    function t(r) {
        if (n[r])
            return n[r].exports;
        var o = n[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return e[r].call(o.exports, o, o.exports, t),
        o.loaded = !0,
        o.exports
    }
    var n = {};
    return t.m = e,
    t.c = n,
    t.p = "",
    t(0)
}([function(e, t, n) {
    n(1),
    n(2),
    n(3),
    n(4),
    n(5),
    n(66),
    n(67),
    n(71),
    e.exports = n(147)
}
, function(e, t) {
    Y || (Y = {}),
    Y.Template || (Y.Template = {}),
    Y.Template.noYUI = {
        init: function() {
            this.setIndexFullscreenGalleryHeights(),
            this.scrollYPolyfill(),
            this.vCenterTopSectionContent()
        },
        scrollYPolyfill: function() {
            window.scrollY || (window.scrollY = window.pageYOffset || document.documentElement.scrollTop,
            window.addEventListener("scroll", function() {
                window.scrollY = window.pageYOffset || document.documentElement.scrollTop
            }))
        },
        setIndexFullscreenGalleryHeights: function() {
            if (document.querySelectorAll && !(document.body.className.indexOf(" design-grid") > -1)) {
                var e = document.querySelectorAll("body.collection-type-index.slideshow-aspect-ratio-fullscreen .gallery-wrapper");
                if (0 !== e.length)
                    for (var t = window.innerHeight, n = 0; n < e.length; n++)
                        e[n].style.height = t + "px"
            }
        },
        vCenterTopSectionContent: function() {
            var e = window.getComputedStyle(document.getElementById("header"), null).getPropertyValue("position")
              , t = document.querySelector(".main-content .index-section:first-child");
            if (t) {
                var n = t.querySelectorAll(".has-main-media").length > 0
                  , r = t.querySelectorAll(".index-gallery").length > 0;
                if ("absolute" == e && n && !r) {
                    var o = document.querySelector("#header .header-inner")
                      , i = header.querySelector(".title-logo-wrapper")
                      , a = document.querySelector("#mainNavigation")
                      , s = parseInt(window.getComputedStyle(o, null).paddingTop, 10);
                    if (a) {
                        a.style.whiteSpace = "nowrap",
                        a.style.display = "inline";
                        var c = a.offsetWidth + (2 * i.offsetWidth - 18);
                        a.style.whiteSpace = "normal",
                        a.style.display = "block";
                        var l = 0
                          , u = i.offsetHeight;
                        l = o.offsetWidth < c ? (u + s) / 2 + a.offsetHeight : (u + s) / 2,
                        t.querySelector(".content-inner").style.paddingTop = l + "px";
                        var f = function() {
                            return u === i.offsetHeight
                        }
                          , d = function() {
                            nIntervId = setInterval(function() {
                                f() === !1 && (l = o.offsetWidth < c ? (i.offsetHeight + s) / 2 + a.offsetHeight : (i.offsetHeight + s) / 2,
                                t.querySelector(".content-inner").style.paddingTop = l + "px",
                                clearInterval(nIntervId))
                            }, 10),
                            setTimeout(function() {
                                clearInterval(nIntervId)
                            }, 1e3)
                        };
                        d()
                    }
                }
            }
        }
    },
    Y.Template.noYUI.init()
}
, function(e, t) {
    !function() {
        var e, t = ".disable-hover:not(.sqs-layout-editing) #siteWrapper, .disable-hover:not(.sqs-layout-editing) #siteWrapper * {pointer-events: none !important;}", n = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style"), o = document.body;
        r.type = "text/css",
        r.styleSheet ? r.styleSheet.cssText = t : r.appendChild(document.createTextNode(t)),
        n.appendChild(r),
        window.addEventListener("scroll", function() {
            clearTimeout(e),
            o.classList.contains("disable-hover") || o.classList.add("disable-hover"),
            e = setTimeout(function() {
                o.classList.remove("disable-hover")
            }, 200)
        }, !1)
    }()
}
, function(e, t) {
    Y.namespace("Template").Lazyload = Class.create({
        initialize: function(e) {
            return this.el = e.el,
            this.mobile = e.mobile || !1,
            this.loadEvent = e.loadEvent || "throttle",
            "string" == typeof this.loadEvent && (this.loadEvent = this.loadEvent.toLowerCase()),
            this.el ? this.mobile === !1 && Y.UA.mobile ? (Y.all(this.el).each(function(e) {
                ImageLoader.load(e, {
                    load: !0
                })
            }),
            !1) : void this.bindUI() : (console.error("lazyload.js: You must define an element."),
            !1)
        },
        bindUI: function() {
            Y.all('img[data-load="viewport"]').each(function(e) {
                ImageLoader.load(e)
            }),
            this.loadImages(),
            "debounce" == this.loadEvent ? this.mitigate = function() {
                this.timeout && this.timeout.cancel(),
                this.timeout = Y.later(100, this, this.loadImages)
            }
            : this.mitigate = Y.throttle(this.loadImages, 200, this),
            Y.one(window).on("scroll", this.mitigate, this)
        },
        loadImages: function() {
            Y.all(this.el).each(function(e) {
                e.getY() < 1.5 * Y.config.win.innerHeight + Y.config.win.scrollY && ImageLoader.load(e, {
                    load: !0
                })
            })
        },
        refresh: function() {
            this.loadImages()
        }
    })
}
, function(e, t) {
    Y.namespace("Template").RevealOnScroll = Class.create({
        initialize: function(e) {
            return this.el = e.el,
            this.offsetEl = e.offsetEl,
            this.behavior = e.behavior || "top",
            "string" == typeof this.behavior && (this.behavior = this.behavior.toLowerCase()),
            this.el ? !!Y.one(this.el) && void this.bindUI() : (console.error("sticky.js: You must specify an element."),
            !1)
        },
        bindUI: function() {
            this.getVariables(),
            Y.one(window).on("resize", function() {
                this.getVariables(),
                this.showOrHide()
            }, this),
            this.throttle = Y.throttle(Y.bind(function() {
                this.showOrHide()
            }, this), 200),
            this.debounce = function() {
                this.timeout && this.timeout.cancel(),
                this.timeout = Y.later(100, this, this.showOrHide)
            }
            ,
            Y.one(window).on("scroll", function() {
                this.throttle(),
                this.debounce()
            }, this),
            Y.one(window).on("hashchange", this.debounce, this),
            this.showOrHide()
        },
        getVariables: function() {
            Y.one(this.offsetEl) && ("bottom" == this.behavior ? this.y = Y.one(this.offsetEl).getY() + Y.one(this.offsetEl).get("clientHeight") - Y.one(this.el).get("clientHeight") : this.y = Y.one(this.offsetEl).getY() - Y.one(this.el).get("clientHeight"))
        },
        showOrHide: function() {
            var e = Y.config.win.scrollY;
            e >= this.y ? Y.one(this.el).addClass("show") : Y.one(this.el).removeClass("show")
        }
    })
}
, function(e, t, n) {
    var r = n(6);
    Y.namespace("Template").CenterNav = Class.create({
        initialize: function(e) {
            if (this.navItems = e.navItems,
            this.centerEl = e.centerEl,
            this.wrapper = e.wrapper,
            this.innerWrapper = e.innerWrapper,
            !this.navItems)
                return console.error("centernav.js: You must specify the nav items selector."),
                !1;
            if (!this.centerEl)
                return console.error("centernav.js: You must specify an element to center around."),
                !1;
            if (!this.wrapper)
                return console.error("centernav.js: You must specify an outer wrapper that contains the nav items and nav wrapper."),
                !1;
            if (!this.innerWrapper)
                return console.error("centernav.js: You must specify an inner nav wrapper."),
                !1;
            this.refresh();
            var t = new r({
                callback: this.refresh.bind(this),
                targets: ["#siteTitleWrapper"]
            });
            t.init()
        },
        refresh: function() {
            if (Y.all(this.navItems).size() > 1)
                if (this.CENTER_SPACING = 30,
                this.getVariables(),
                this.navSpace = (this.wrapperWidth - this.centerElWidth) / 2,
                Y.one(".custom-cart") && (this.navSpace = (this.wrapperWidth - this.centerElWidth) / 2 - (Y.one(".custom-cart").get("offsetWidth") + parseInt(Y.Squarespace.Template.getTweakValue("headerPadding"), 10))),
                this.navItemsSplitPoint = Math.round(Y.all(this.navItems).size() / 2),
                this.splitPointWidth = Y.all(this.navItems).item(this.navItemsSplitPoint - 1).get("offsetWidth"),
                this.navItemsLeft = Y.all(this.navItems).slice(0, this.navItemsSplitPoint),
                this.navItemsRight = Y.all(this.navItems).slice(this.navItemsSplitPoint),
                Y.all(this.navItems).size() % 2 !== 0 && this.navItemsLeft.get("offsetWidth").reduce(this.sum, 0) - this.splitPointWidth > this.navItemsRight.get("offsetWidth").reduce(this.sum, 0) && (this.navItemsSplitPoint = this.navItemsSplitPoint - 1,
                this.navItemsLeft = Y.all(this.navItems).slice(0, this.navItemsSplitPoint),
                this.navItemsRight = Y.all(this.navItems).slice(this.navItemsSplitPoint)),
                this.calculateWidthDiff(),
                this.leftOfLogo = Y.all(this.navItems).item(this.navItemsSplitPoint - 1),
                this.rightOfLogo = Y.all(this.navItems).item(this.navItemsSplitPoint),
                this.navItemsLeft.get("offsetWidth").reduce(this.sum, 0) > this.navSpace - 12 || this.navItemsRight.get("offsetWidth").reduce(this.sum, 0) > this.navSpace - 12)
                    this.destroy(),
                    Y.one(this.innerWrapper).setStyles({
                        marginLeft: 0,
                        marginTop: "10px",
                        marginBottom: 0
                    });
                else {
                    this.destroy(),
                    Y.one(this.leftOfLogo).setStyle("marginRight", this.centerElWidth / 2),
                    Y.one(this.rightOfLogo).setStyle("marginLeft", this.centerElWidth / 2);
                    var e = parseInt(Y.one(this.innerWrapper).getComputedStyle("height"), 10);
                    Y.one(this.innerWrapper).setStyles({
                        marginLeft: this.widthDiff,
                        marginTop: Math.ceil(-1 * (this.centerElHeight / 2 + e / 2)),
                        marginBottom: Math.ceil(this.centerElHeight / 2 + e / 2 - e)
                    })
                }
            Y.one(this.innerWrapper).addClass("positioned")
        },
        destroy: function() {
            Y.all(this.navItems).removeAttribute("style")
        },
        getVariables: function() {
            this.wrapperWidth = Y.one(this.wrapper).get("offsetWidth") - 2 * parseInt(Y.Squarespace.Template.getTweakValue("headerPadding"), 10),
            this.centerElWidth = Y.one(this.centerEl).get("offsetWidth") + 2 * this.CENTER_SPACING,
            this.centerElHeight = Y.one(this.centerEl).get("offsetHeight")
        },
        calculateWidthDiff: function() {
            this.widthDiff = this.navItemsRight.get("offsetWidth").reduce(this.sum, 0) - this.navItemsLeft.get("offsetWidth").reduce(this.sum, 0)
        },
        sum: function(e, t) {
            return "number" == typeof e && "number" == typeof t ? e + t : (console.warn("centernav.js sum function: can't add non-numbers."),
            !1)
        }
    })
}
, function(e, t, n) {
    "use strict";
    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(7)
      , i = r(o)
      , a = n(60)
      , s = r(a)
      , c = n(61)
      , l = r(c)
      , u = n(65)
      , f = "This browser does not support MutationObserver"
      , d = function() {
        function e(t) {
            var n = t.callback
              , r = t.targets
              , o = void 0 === r ? [] : r;
            return (0,
            s.default)(this, e),
            this.MutationObserver = (0,
            u.checkForMutationObserver)(),
            this.MutationObserver ? (this.callback = (0,
            u.validateCallback)(n),
            void (this.targets = o)) : void console.error(f)
        }
        return (0,
        l.default)(e, [{
            key: "init",
            value: function() {
                return this.MutationObserver ? (this.observer = this.createObserver(),
                void this.observeTargets()) : void console.error(f)
            }
        }, {
            key: "destroy",
            value: function() {
                return this.MutationObserver ? (this.observer.disconnect(),
                this.observer = null,
                void document.removeEventListener("DOMContentLoaded", this.reactToMutations)) : void console.error(f)
            }
        }, {
            key: "createObserver",
            value: function() {
                var e = this;
                return new this.MutationObserver(function(t) {
                    e.evaluateMutations(t)
                }
                )
            }
        }, {
            key: "observeTargets",
            value: function() {
                var e = this;
                this.targets.forEach(function(t) {
                    (0,
                    i.default)(document.querySelectorAll(t)).forEach(function(t) {
                        e.observer.observe(t, {
                            childList: !0,
                            subtree: !0,
                            attributes: !0
                        })
                    })
                })
            }
        }, {
            key: "evaluateMutations",
            value: function(e) {
                e && ("loading" === document.readyState ? document.addEventListener("DOMContentLoaded", this.reactToMutations) : this.reactToMutations())
            }
        }, {
            key: "reactToMutations",
            value: function() {
                this.timer && clearTimeout(this.timer),
                this.timer = setTimeout(this.callback, 150)
            }
        }]),
        e
    }();
    t.default = d,
    e.exports = t.default
}
, function(e, t, n) {
    e.exports = {
        default: n(8),
        __esModule: !0
    }
}
, function(e, t, n) {
    n(9),
    n(53),
    e.exports = n(17).Array.from
}
, function(e, t, n) {
    "use strict";
    var r = n(10)(!0);
    n(13)(String, "String", function(e) {
        this._t = String(e),
        this._i = 0
    }, function() {
        var e, t = this._t, n = this._i;
        return n >= t.length ? {
            value: void 0,
            done: !0
        } : (e = r(t, n),
        this._i += e.length,
        {
            value: e,
            done: !1
        })
    })
}
, function(e, t, n) {
    var r = n(11)
      , o = n(12);
    e.exports = function(e) {
        return function(t, n) {
            var i, a, s = String(o(t)), c = r(n), l = s.length;
            return c < 0 || c >= l ? e ? "" : void 0 : (i = s.charCodeAt(c),
            i < 55296 || i > 56319 || c + 1 === l || (a = s.charCodeAt(c + 1)) < 56320 || a > 57343 ? e ? s.charAt(c) : i : e ? s.slice(c, c + 2) : (i - 55296 << 10) + (a - 56320) + 65536)
        }
    }
}
, function(e, t) {
    var n = Math.ceil
      , r = Math.floor;
    e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e)
    }
}
, function(e, t) {
    e.exports = function(e) {
        if (void 0 == e)
            throw TypeError("Can't call method on  " + e);
        return e
    }
}
, function(e, t, n) {
    "use strict";
    var r = n(14)
      , o = n(15)
      , i = n(31)
      , a = n(20)
      , s = n(32)
      , c = n(33)
      , l = n(49)
      , u = n(51)
      , f = n(50)("iterator")
      , d = !([].keys && "next"in [].keys())
      , h = "@@iterator"
      , p = "keys"
      , v = "values"
      , A = function() {
        return this
    };
    e.exports = function(e, t, n, g, m, y, b) {
        c(n, t, g);
        var w, S, x, E = function(e) {
            if (!d && e in k)
                return k[e];
            switch (e) {
            case p:
                return function() {
                    return new n(this,e)
                }
                ;
            case v:
                return function() {
                    return new n(this,e)
                }
            }
            return function() {
                return new n(this,e)
            }
        }, _ = t + " Iterator", T = m == v, I = !1, k = e.prototype, Y = k[f] || k[h] || m && k[m], C = Y || E(m), O = m ? T ? E("entries") : C : void 0, P = "Array" == t ? k.entries || Y : Y;
        if (P && (x = u(P.call(new e)),
        x !== Object.prototype && x.next && (l(x, _, !0),
        r || "function" == typeof x[f] || a(x, f, A))),
        T && Y && Y.name !== v && (I = !0,
        C = function() {
            return Y.call(this)
        }
        ),
        r && !b || !d && !I && k[f] || a(k, f, C),
        s[t] = C,
        s[_] = A,
        m)
            if (w = {
                values: T ? C : E(v),
                keys: y ? C : E(p),
                entries: O
            },
            b)
                for (S in w)
                    S in k || i(k, S, w[S]);
            else
                o(o.P + o.F * (d || I), t, w);
        return w
    }
}
, function(e, t) {
    e.exports = !0
}
, function(e, t, n) {
    var r = n(16)
      , o = n(17)
      , i = n(18)
      , a = n(20)
      , s = n(30)
      , c = "prototype"
      , l = function(e, t, n) {
        var u, f, d, h = e & l.F, p = e & l.G, v = e & l.S, A = e & l.P, g = e & l.B, m = e & l.W, y = p ? o : o[t] || (o[t] = {}), b = y[c], w = p ? r : v ? r[t] : (r[t] || {})[c];
        p && (n = t);
        for (u in n)
            f = !h && w && void 0 !== w[u],
            f && s(y, u) || (d = f ? w[u] : n[u],
            y[u] = p && "function" != typeof w[u] ? n[u] : g && f ? i(d, r) : m && w[u] == d ? function(e) {
                var t = function(t, n, r) {
                    if (this instanceof e) {
                        switch (arguments.length) {
                        case 0:
                            return new e;
                        case 1:
                            return new e(t);
                        case 2:
                            return new e(t,n)
                        }
                        return new e(t,n,r)
                    }
                    return e.apply(this, arguments)
                };
                return t[c] = e[c],
                t
            }(d) : A && "function" == typeof d ? i(Function.call, d) : d,
            A && ((y.virtual || (y.virtual = {}))[u] = d,
            e & l.R && b && !b[u] && a(b, u, d)))
    };
    l.F = 1,
    l.G = 2,
    l.S = 4,
    l.P = 8,
    l.B = 16,
    l.W = 32,
    l.U = 64,
    l.R = 128,
    e.exports = l
}
, function(e, t) {
    var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = n)
}
, function(e, t) {
    var n = e.exports = {
        version: "2.6.12"
    };
    "number" == typeof __e && (__e = n)
}
, function(e, t, n) {
    var r = n(19);
    e.exports = function(e, t, n) {
        if (r(e),
        void 0 === t)
            return e;
        switch (n) {
        case 1:
            return function(n) {
                return e.call(t, n)
            }
            ;
        case 2:
            return function(n, r) {
                return e.call(t, n, r)
            }
            ;
        case 3:
            return function(n, r, o) {
                return e.call(t, n, r, o)
            }
        }
        return function() {
            return e.apply(t, arguments)
        }
    }
}
, function(e, t) {
    e.exports = function(e) {
        if ("function" != typeof e)
            throw TypeError(e + " is not a function!");
        return e
    }
}
, function(e, t, n) {
    var r = n(21)
      , o = n(29);
    e.exports = n(25) ? function(e, t, n) {
        return r.f(e, t, o(1, n))
    }
    : function(e, t, n) {
        return e[t] = n,
        e
    }
}
, function(e, t, n) {
    var r = n(22)
      , o = n(24)
      , i = n(28)
      , a = Object.defineProperty;
    t.f = n(25) ? Object.defineProperty : function(e, t, n) {
        if (r(e),
        t = i(t, !0),
        r(n),
        o)
            try {
                return a(e, t, n)
            } catch (e) {}
        if ("get"in n || "set"in n)
            throw TypeError("Accessors not supported!");
        return "value"in n && (e[t] = n.value),
        e
    }
}
, function(e, t, n) {
    var r = n(23);
    e.exports = function(e) {
        if (!r(e))
            throw TypeError(e + " is not an object!");
        return e
    }
}
, function(e, t) {
    e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
    }
}
, function(e, t, n) {
    e.exports = !n(25) && !n(26)(function() {
        return 7 != Object.defineProperty(n(27)("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
}
, function(e, t, n) {
    e.exports = !n(26)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
}
, function(e, t) {
    e.exports = function(e) {
        try {
            return !!e()
        } catch (e) {
            return !0
        }
    }
}
, function(e, t, n) {
    var r = n(23)
      , o = n(16).document
      , i = r(o) && r(o.createElement);
    e.exports = function(e) {
        return i ? o.createElement(e) : {}
    }
}
, function(e, t, n) {
    var r = n(23);
    e.exports = function(e, t) {
        if (!r(e))
            return e;
        var n, o;
        if (t && "function" == typeof (n = e.toString) && !r(o = n.call(e)))
            return o;
        if ("function" == typeof (n = e.valueOf) && !r(o = n.call(e)))
            return o;
        if (!t && "function" == typeof (n = e.toString) && !r(o = n.call(e)))
            return o;
        throw TypeError("Can't convert object to primitive value")
    }
}
, function(e, t) {
    e.exports = function(e, t) {
        return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
        }
    }
}
, function(e, t) {
    var n = {}.hasOwnProperty;
    e.exports = function(e, t) {
        return n.call(e, t)
    }
}
, function(e, t, n) {
    e.exports = n(20)
}
, function(e, t) {
    e.exports = {}
}
, function(e, t, n) {
    "use strict";
    var r = n(34)
      , o = n(29)
      , i = n(49)
      , a = {};
    n(20)(a, n(50)("iterator"), function() {
        return this
    }),
    e.exports = function(e, t, n) {
        e.prototype = r(a, {
            next: o(1, n)
        }),
        i(e, t + " Iterator")
    }
}
, function(e, t, n) {
    var r = n(22)
      , o = n(35)
      , i = n(47)
      , a = n(44)("IE_PROTO")
      , s = function() {}
      , c = "prototype"
      , l = function() {
        var e, t = n(27)("iframe"), r = i.length, o = "<", a = ">";
        for (t.style.display = "none",
        n(48).appendChild(t),
        t.src = "javascript:",
        e = t.contentWindow.document,
        e.open(),
        e.write(o + "script" + a + "document.F=Object" + o + "/script" + a),
        e.close(),
        l = e.F; r--; )
            delete l[c][i[r]];
        return l()
    };
    e.exports = Object.create || function(e, t) {
        var n;
        return null !== e ? (s[c] = r(e),
        n = new s,
        s[c] = null,
        n[a] = e) : n = l(),
        void 0 === t ? n : o(n, t)
    }
}
, function(e, t, n) {
    var r = n(21)
      , o = n(22)
      , i = n(36);
    e.exports = n(25) ? Object.defineProperties : function(e, t) {
        o(e);
        for (var n, a = i(t), s = a.length, c = 0; s > c; )
            r.f(e, n = a[c++], t[n]);
        return e
    }
}
, function(e, t, n) {
    var r = n(37)
      , o = n(47);
    e.exports = Object.keys || function(e) {
        return r(e, o)
    }
}
, function(e, t, n) {
    var r = n(30)
      , o = n(38)
      , i = n(41)(!1)
      , a = n(44)("IE_PROTO");
    e.exports = function(e, t) {
        var n, s = o(e), c = 0, l = [];
        for (n in s)
            n != a && r(s, n) && l.push(n);
        for (; t.length > c; )
            r(s, n = t[c++]) && (~i(l, n) || l.push(n));
        return l
    }
}
, function(e, t, n) {
    var r = n(39)
      , o = n(12);
    e.exports = function(e) {
        return r(o(e))
    }
}
, function(e, t, n) {
    var r = n(40);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
        return "String" == r(e) ? e.split("") : Object(e)
    }
}
, function(e, t) {
    var n = {}.toString;
    e.exports = function(e) {
        return n.call(e).slice(8, -1)
    }
}
, function(e, t, n) {
    var r = n(38)
      , o = n(42)
      , i = n(43);
    e.exports = function(e) {
        return function(t, n, a) {
            var s, c = r(t), l = o(c.length), u = i(a, l);
            if (e && n != n) {
                for (; l > u; )
                    if (s = c[u++],
                    s != s)
                        return !0
            } else
                for (; l > u; u++)
                    if ((e || u in c) && c[u] === n)
                        return e || u || 0;
            return !e && -1
        }
    }
}
, function(e, t, n) {
    var r = n(11)
      , o = Math.min;
    e.exports = function(e) {
        return e > 0 ? o(r(e), 9007199254740991) : 0
    }
}
, function(e, t, n) {
    var r = n(11)
      , o = Math.max
      , i = Math.min;
    e.exports = function(e, t) {
        return e = r(e),
        e < 0 ? o(e + t, 0) : i(e, t)
    }
}
, function(e, t, n) {
    var r = n(45)("keys")
      , o = n(46);
    e.exports = function(e) {
        return r[e] || (r[e] = o(e))
    }
}
, function(e, t, n) {
    var r = n(17)
      , o = n(16)
      , i = "__core-js_shared__"
      , a = o[i] || (o[i] = {});
    (e.exports = function(e, t) {
        return a[e] || (a[e] = void 0 !== t ? t : {})
    }
    )("versions", []).push({
        version: r.version,
        mode: n(14) ? "pure" : "global",
        copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
    })
}
, function(e, t) {
    var n = 0
      , r = Math.random();
    e.exports = function(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + r).toString(36))
    }
}
, function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}
, function(e, t, n) {
    var r = n(16).document;
    e.exports = r && r.documentElement
}
, function(e, t, n) {
    var r = n(21).f
      , o = n(30)
      , i = n(50)("toStringTag");
    e.exports = function(e, t, n) {
        e && !o(e = n ? e : e.prototype, i) && r(e, i, {
            configurable: !0,
            value: t
        })
    }
}
, function(e, t, n) {
    var r = n(45)("wks")
      , o = n(46)
      , i = n(16).Symbol
      , a = "function" == typeof i
      , s = e.exports = function(e) {
        return r[e] || (r[e] = a && i[e] || (a ? i : o)("Symbol." + e))
    }
    ;
    s.store = r
}
, function(e, t, n) {
    var r = n(30)
      , o = n(52)
      , i = n(44)("IE_PROTO")
      , a = Object.prototype;
    e.exports = Object.getPrototypeOf || function(e) {
        return e = o(e),
        r(e, i) ? e[i] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? a : null
    }
}
, function(e, t, n) {
    var r = n(12);
    e.exports = function(e) {
        return Object(r(e))
    }
}
, function(e, t, n) {
    "use strict";
    var r = n(18)
      , o = n(15)
      , i = n(52)
      , a = n(54)
      , s = n(55)
      , c = n(42)
      , l = n(56)
      , u = n(57);
    o(o.S + o.F * !n(59)(function(e) {
        Array.from(e)
    }), "Array", {
        from: function(e) {
            var t, n, o, f, d = i(e), h = "function" == typeof this ? this : Array, p = arguments.length, v = p > 1 ? arguments[1] : void 0, A = void 0 !== v, g = 0, m = u(d);
            if (A && (v = r(v, p > 2 ? arguments[2] : void 0, 2)),
            void 0 == m || h == Array && s(m))
                for (t = c(d.length),
                n = new h(t); t > g; g++)
                    l(n, g, A ? v(d[g], g) : d[g]);
            else
                for (f = m.call(d),
                n = new h; !(o = f.next()).done; g++)
                    l(n, g, A ? a(f, v, [o.value, g], !0) : o.value);
            return n.length = g,
            n
        }
    })
}
, function(e, t, n) {
    var r = n(22);
    e.exports = function(e, t, n, o) {
        try {
            return o ? t(r(n)[0], n[1]) : t(n)
        } catch (t) {
            var i = e.return;
            throw void 0 !== i && r(i.call(e)),
            t
        }
    }
}
, function(e, t, n) {
    var r = n(32)
      , o = n(50)("iterator")
      , i = Array.prototype;
    e.exports = function(e) {
        return void 0 !== e && (r.Array === e || i[o] === e)
    }
}
, function(e, t, n) {
    "use strict";
    var r = n(21)
      , o = n(29);
    e.exports = function(e, t, n) {
        t in e ? r.f(e, t, o(0, n)) : e[t] = n
    }
}
, function(e, t, n) {
    var r = n(58)
      , o = n(50)("iterator")
      , i = n(32);
    e.exports = n(17).getIteratorMethod = function(e) {
        if (void 0 != e)
            return e[o] || e["@@iterator"] || i[r(e)]
    }
}
, function(e, t, n) {
    var r = n(40)
      , o = n(50)("toStringTag")
      , i = "Arguments" == r(function() {
        return arguments
    }())
      , a = function(e, t) {
        try {
            return e[t]
        } catch (e) {}
    };
    e.exports = function(e) {
        var t, n, s;
        return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = a(t = Object(e), o)) ? n : i ? r(t) : "Object" == (s = r(t)) && "function" == typeof t.callee ? "Arguments" : s
    }
}
, function(e, t, n) {
    var r = n(50)("iterator")
      , o = !1;
    try {
        var i = [7][r]();
        i.return = function() {
            o = !0
        }
        ,
        Array.from(i, function() {
            throw 2
        })
    } catch (e) {}
    e.exports = function(e, t) {
        if (!t && !o)
            return !1;
        var n = !1;
        try {
            var i = [7]
              , a = i[r]();
            a.next = function() {
                return {
                    done: n = !0
                }
            }
            ,
            i[r] = function() {
                return a
            }
            ,
            e(i)
        } catch (e) {}
        return n
    }
}
, function(e, t) {
    "use strict";
    t.__esModule = !0,
    t.default = function(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
}
, function(e, t, n) {
    "use strict";
    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    t.__esModule = !0;
    var o = n(62)
      , i = r(o);
    t.default = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                (0,
                i.default)(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n),
            r && e(t, r),
            t
        }
    }()
}
, function(e, t, n) {
    e.exports = {
        default: n(63),
        __esModule: !0
    }
}
, function(e, t, n) {
    n(64);
    var r = n(17).Object;
    e.exports = function(e, t, n) {
        return r.defineProperty(e, t, n)
    }
}
, function(e, t, n) {
    var r = n(15);
    r(r.S + r.F * !n(25), "Object", {
        defineProperty: n(21).f
    })
}
, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.checkForMutationObserver = function() {
        var e = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        return e
    }
    ,
    t.validateCallback = function(e) {
        if ("function" == typeof e)
            return e;
        var t = "Darwin must receive a callback function, or there is nothing to run when mutations occur.";
        throw new Error(t)
    }
}
, function(e, t) {
    Y.namespace("Template").Gallery = Class.create({
        initialize: function(e) {
            return this.slides = e.slides,
            this.wrapper = e.wrapper,
            this.slides ? this.wrapper ? !(!Y.one(this.wrapper) || !Y.one(this.slides)) && (this.getTweaks(),
            this.bindUI(),
            void this.syncUI()) : (console.error("index-gallery.js: You have to define the wrapper selector."),
            !1) : (console.error("index-gallery.js: You have to define the slides selector."),
            !1)
        },
        bindUI: function() {
            if ("grid" == this.tweak.design)
                this.loadGridImages(),
                this.lightboxSet = [],
                Y.one(this.wrapper).all(this.slides).each(function(e) {
                    var t = e.one(".sqs-video-wrapper")
                      , n = t ? e.one(".sqs-video-wrapper") : e.one("img")
                      , r = t ? null : e.one(".slide-meta-content") && e.one(".slide-meta-content").getHTML();
                    this.lightboxSet.push({
                        content: n,
                        meta: r
                    }),
                    e.on("click", function(t) {
                        t.halt(),
                        e.one(".clickthrough-link") ? (t.stopPropagation(),
                        window.location = e.one(".clickthrough-link").getAttribute("href")) : (this.gallery && this.gallery.destroy(),
                        this.gallery = new Y.Squarespace.Lightbox2({
                            controls: {
                                previous: !0,
                                next: !0
                            },
                            currentSetIndex: Y.one(this.wrapper).all(this.slides).indexOf(e),
                            set: this.lightboxSet
                        }),
                        this.gallery.render())
                    }, this)
                }, this);
            else {
                var e = !1;
                "auto" == this.tweak.aspect && (e = !0);
                var t = !1;
                this.tweak.autoplay === !0 && (t = !0),
                "fullscreen" == this.tweak.aspect && "slideshow" == this.tweak.design && this.fullscreen(),
                this.wrapper.generateID(),
                this.nodeID = "#" + this.wrapper.get("id"),
                this.galleryManager = [],
                this.gallery = new Y.Squarespace.Gallery2({
                    container: this.wrapper,
                    design: "stacked",
                    autoplay: t,
                    designOptions: {
                        autoHeight: e,
                        clickBehavior: "auto",
                        transition: this.tweak.transition
                    },
                    elements: {
                        controls: this.nodeID + " ~ .circles",
                        next: this.nodeID + " ~ .next-slide",
                        previous: this.nodeID + " ~ .previous-slide"
                    },
                    historyHash: !1,
                    keyboard: !1,
                    lazyLoad: !0,
                    loaderOptions: {
                        mode: "fill"
                    },
                    loop: "true",
                    refreshOnResize: !0,
                    slides: this.slides
                }),
                Y.one(this.wrapper).delegate("click", function(e) {
                    e.halt(),
                    e.currentTarget.ancestor(this.slides).toggleClass("hide-meta")
                }, ".hide-meta-toggle"),
                this.galleryManager.push(this.gallery),
                this.keyboardControls()
            }
        },
        syncUI: function() {
            Y.Template.helper.on("resizeend", function() {
                "grid" == this.tweak.design && this.loadGridImages(),
                Y.UA.touchEnabled || "fullscreen" != this.tweak.aspect || "slideshow" != this.tweak.design || this.fullscreen()
            }, this),
            Y.Global.on("tweak:reset", this.refresh, this),
            Y.Global.on("tweak:change", function(e) {
                var t = e.getName();
                "grid-aspect-ratio" != t && "slideshow-aspect-ratio" != t && "design" != t && "gallery-controls" != t && "slideshow-transition" != t && "slideshow-autoplay" != t || this.refresh(),
                "grid-aspect-ratio" != t && "slideshow-aspect-ratio" != t && "design" != t && "grid-max-columns" != t || Y.one(window).simulate("resize")
            }, this)
        },
        getTweaks: function() {
            this.tweak = {
                aspect: this.getTweakValue("slideshow-aspect-ratio"),
                design: this.getTweakValue("design"),
                nav: this.getTweakValue("gallery-controls"),
                transition: this.getTweakValue("slideshow-transition"),
                autoplay: this.getTweakValue("slideshow-autoplay")
            }
        },
        getTweakValue: function(e) {
            var t = Y.Squarespace.Template.getTweakValue(e);
            return Y.Lang.isString(t) && (t = t.toLowerCase()),
            "true" === t ? t = !0 : "false" === t && (t = !1),
            t
        },
        keyboardControls: function() {
            Y.one(window).on("keyup", function(e) {
                Y.all(this.wrapper).each(function(t, n) {
                    if (t.inViewportRegion() && (37 == e.keyCode || 39 == e.keyCode)) {
                        var r = 1;
                        37 == e.keyCode && (r = -1),
                        this.galleryManager[n].set("currentIndex", this.galleryManager[n].get("currentIndex") + r)
                    }
                }, this)
            }, this)
        },
        fullscreen: function() {
            "none" == Y.one("#header .mobile-nav-toggle-label").getComputedStyle("display") ? this.mobileNavShowing = !1 : this.mobileNavShowing = !0,
            Y.all(this.wrapper).each(function(e) {
                this.mobileNavShowing ? e.setStyle("height", Y.config.win.innerHeight) : Y.one("#siteWrapper #content .index-section.gallery:first-child") && Y.one("#showOnScrollWrapper #mainNavWrapper") ? (e.setStyle("height", Y.config.win.innerHeight - Y.one("#showOnScrollWrapper #mainNavWrapper").get("clientHeight")),
                Y.one("#siteWrapper #content .index-section.gallery:first-child .gallery-wrapper").setStyle("height", Y.config.win.innerHeight)) : Y.one("#showOnScrollWrapper #mainNavWrapper") ? e.setStyle("height", Y.config.win.innerHeight - Y.one("#showOnScrollWrapper #mainNavWrapper").get("clientHeight")) : e.setStyle("height", Y.config.win.innerHeight)
            }, this)
        },
        loadGridImages: function() {
            Y.one(this.wrapper).all(this.slides).each(function(e) {
                e.one(".sqs-video-wrapper") ? e.one(".sqs-video-wrapper").plug(Y.Squarespace.VideoLoader, {
                    mode: "fill"
                }) : ImageLoader.load(e.one("img"), {
                    load: !0,
                    mode: "fill"
                })
            }, this)
        },
        destroy: function() {
            Y.all(this.wrapper).each(function(e) {
                e.detachAll(),
                e.removeAttribute("style")
            }, this),
            Y.all(this.slides).each(function(e) {
                e.detachAll(),
                e.removeAttribute("style")
            }, this),
            this.gallery && this.gallery.destroy()
        },
        refresh: function() {
            this.destroy(),
            this.getTweaks(),
            this.bindUI()
        }
    })
}
, function(e, t, n) {
    var r = n(68);
    Y.use("node", "event-custom", function() {
        Y.namespace("Template").helper = Singleton.create({
            ready: function() {
                Y.on("domready", function() {
                    this.bindUI()
                }, this),
                Y.augment(this, Y.EventTarget, !0, null, {
                    emitFacade: !0
                })
            },
            bindUI: function() {
                this.dataToggleBody(),
                this.dataToggleEl(),
                this.dataLightbox(),
                "android" === Y.UA.os && (Y.UA.android < 5 || "ffos" === Y.UA.mobile) ? window.matchMedia("(orientation: portrait)").addListener(function() {
                    this.imgLoad(),
                    this.fire("resizeend")
                }) : Y.one(window).on(["resize", "orientationchange"], function() {
                    this._resize && this._resize.cancel(),
                    this._resize = Y.later(150, this, function() {
                        this.imgLoad(),
                        this.fire("resizeend")
                    })
                }, this),
                this.imgLoad()
            },
            radioCheckboxes: function(e, t, n) {
                return e ? Y.one(e) ? (t = t || '[type="checkbox"]',
                n = n || "label[for]",
                void (Y.one(e).all(t).size() > 1 && Y.one(e).delegate("click", function(n) {
                    n.preventDefault();
                    var r = Y.one("#" + n.currentTarget.getAttribute("for"));
                    r.get("checked") === !1 ? (Y.one(e).all(t).each(function(e) {
                        e.set("checked", !1)
                    }),
                    r.set("checked", !0)) : r.set("checked", !1)
                }, n))) : void console.warn("radioCheckboxes: No wrapper found on page.") : void console.warn("radioCheckboxes: Must define a wrapper.")
            },
            folderRedirect: function(e, t) {
                e = e || "label[for]",
                t = t || "body",
                Y.one(e) && !Y.one(".touch-styles") && Y.one(t).delegate("click", function(e) {
                    e.preventDefault();
                    var t = e.currentTarget.getData("href");
                    t ? window.location = t : console.warn("folderRedirect: You must add a data-href attribute to the label.")
                }, e)
            },
            dataLightbox: function() {
                var e = {};
                Y.all("[data-lightbox]").each(function(t) {
                    var n = t.getAttribute("data-lightbox");
                    e[n] = e[n] || new Array,
                    e[n].push({
                        content: t,
                        meta: t.getAttribute("alt")
                    }),
                    t.on("click", function(r) {
                        r.halt(),
                        new Y.Squarespace.Lightbox2({
                            set: e[n],
                            currentSetIndex: Y.all("[data-lightbox]").indexOf(t),
                            controls: {
                                previous: !0,
                                next: !0
                            }
                        }).render()
                    })
                })
            },
            dataToggleBody: function() {
                Y.one("body").delegate("click", function(e) {
                    Y.one("body").toggleClass(e.currentTarget.getData("toggle-body"))
                }, "[data-toggle-body]")
            },
            dataToggleEl: function() {
                Y.one("body").delegate("click", function(e) {
                    var t = e.currentTarget;
                    t.toggleClass(t.getData("toggle"))
                }, "[data-toggle]")
            },
            imgLoad: function(e) {
                e = e || "img[data-src]",
                Y.all(e).each(function(e) {
                    ImageLoader.load(e)
                })
            },
            scrollAnchors: function() {
                if (!history.pushState)
                    return !1;
                var e = 'a[href*="#"]';
                Y.one("body").delegate("click", function(e) {
                    var t = e.currentTarget.get("href")
                      , n = this._getSamePageHash(t);
                    n && Y.one(n) && (e.halt(),
                    Y.Template.Site.mobileNav && Y.one("#mobileNavToggle").set("checked", !1).simulate("change"),
                    this.smoothScrollTo(Y.one(n).getY()),
                    history.pushState({}, n, n))
                }, e, this)
            },
            _getSamePageHash: function(e) {
                var e = new r(e)
                  , t = new r(window.location.href);
                return e.host !== t.host || e.pathname !== t.pathname || "" === e.hash ? null : e.hash
            },
            smoothScrollTo: function(e) {
                if (NaN == parseInt(e))
                    return console.warn("helpers.js: smoothScrollTo must have a scroll point passed to it."),
                    !1;
                if (!Y.Lang.isNumber(e))
                    try {
                        e = parseInt(e)
                    } catch (e) {
                        return console.warn("helpers.js: scrollTo was passed an invalid argument."),
                        !1
                    }
                if (Y.UA.mobile)
                    window.scroll(0, e);
                else {
                    var t = Y.UA.gecko || Y.UA.ie || navigator.userAgent.match(/Trident.*rv.11\./) ? "html" : "body"
                      , n = new Y.Anim({
                        node: Y.one(document.scrollingElement || t),
                        to: {
                            scrollTop: e
                        },
                        duration: .4,
                        easing: "easeOut"
                    });
                    n.run(),
                    n.on("end", function() {
                        n.destroy()
                    })
                }
            },
            disableScroll: function(e) {
                if (!Y.Lang.isString(e))
                    return console.warn("helpers.js: disableScroll arg must be a string."),
                    !1;
                var t = Y.config.win.scrollY;
                Y.one(window).on("scroll", function() {
                    Y.one("body").hasClass(e) ? window.scrollTo(0, t) : t = Y.config.win.scrollY
                }, this)
            },
            centerMapPin: function(e, t) {
                var n = e._node.__map;
                if (!n)
                    return console.error("helpers.js: Invalid argument passed to centerMapPin method."),
                    !1;
                var r = n.getCenter();
                r.d = t.location.mapLat,
                r.e = t.location.mapLng,
                google.maps.event.trigger(n, "resize"),
                n.setCenter(r)
            }
        })
    })
}
, function(e, t, n) {
    (function(t) {
        "use strict";
        function r(e) {
            return (e ? e : "").toString().replace(h, "")
        }
        function o(e) {
            var n;
            n = "undefined" != typeof window ? window : "undefined" != typeof t ? t : "undefined" != typeof self ? self : {};
            var r = n.location || {};
            e = e || r;
            var o, i = {}, a = typeof e;
            if ("blob:" === e.protocol)
                i = new c(unescape(e.pathname),{});
            else if ("string" === a) {
                i = new c(e,{});
                for (o in b)
                    delete i[o]
            } else if ("object" === a) {
                for (o in e)
                    o in b || (i[o] = e[o]);
                void 0 === i.slashes && (i.slashes = v.test(e.href))
            }
            return i
        }
        function i(e) {
            return "file:" === e || "ftp:" === e || "http:" === e || "https:" === e || "ws:" === e || "wss:" === e
        }
        function a(e, t) {
            e = r(e),
            e = e.replace(p, ""),
            t = t || {};
            var n, o = g.exec(e), a = o[1] ? o[1].toLowerCase() : "", s = !!o[2], c = !!o[3], l = 0;
            return s ? c ? (n = o[2] + o[3] + o[4],
            l = o[2].length + o[3].length) : (n = o[2] + o[4],
            l = o[2].length) : c ? (n = o[3] + o[4],
            l = o[3].length) : n = o[4],
            "file:" === a ? l >= 2 && (n = n.slice(2)) : i(a) ? n = o[4] : a ? s && (n = n.slice(2)) : l >= 2 && i(t.protocol) && (n = o[4]),
            {
                protocol: a,
                slashes: s || i(a),
                slashesCount: l,
                rest: n
            }
        }
        function s(e, t) {
            if ("" === e)
                return t;
            for (var n = (t || "/").split("/").slice(0, -1).concat(e.split("/")), r = n.length, o = n[r - 1], i = !1, a = 0; r--; )
                "." === n[r] ? n.splice(r, 1) : ".." === n[r] ? (n.splice(r, 1),
                a++) : a && (0 === r && (i = !0),
                n.splice(r, 1),
                a--);
            return i && n.unshift(""),
            "." !== o && ".." !== o || n.push(""),
            n.join("/")
        }
        function c(e, t, n) {
            if (e = r(e),
            e = e.replace(p, ""),
            !(this instanceof c))
                return new c(e,t,n);
            var l, u, h, v, A, g, b = y.slice(), w = typeof t, S = this, x = 0;
            for ("object" !== w && "string" !== w && (n = t,
            t = null),
            n && "function" != typeof n && (n = d.parse),
            t = o(t),
            u = a(e || "", t),
            l = !u.protocol && !u.slashes,
            S.slashes = u.slashes || l && t.slashes,
            S.protocol = u.protocol || t.protocol || "",
            e = u.rest,
            ("file:" === u.protocol && (2 !== u.slashesCount || m.test(e)) || !u.slashes && (u.protocol || u.slashesCount < 2 || !i(S.protocol))) && (b[3] = [/(.*)/, "pathname"]); x < b.length; x++)
                v = b[x],
                "function" != typeof v ? (h = v[0],
                g = v[1],
                h !== h ? S[g] = e : "string" == typeof h ? (A = "@" === h ? e.lastIndexOf(h) : e.indexOf(h),
                ~A && ("number" == typeof v[2] ? (S[g] = e.slice(0, A),
                e = e.slice(A + v[2])) : (S[g] = e.slice(A),
                e = e.slice(0, A)))) : (A = h.exec(e)) && (S[g] = A[1],
                e = e.slice(0, A.index)),
                S[g] = S[g] || (l && v[3] ? t[g] || "" : ""),
                v[4] && (S[g] = S[g].toLowerCase())) : e = v(e, S);
            n && (S.query = n(S.query)),
            l && t.slashes && "/" !== S.pathname.charAt(0) && ("" !== S.pathname || "" !== t.pathname) && (S.pathname = s(S.pathname, t.pathname)),
            "/" !== S.pathname.charAt(0) && i(S.protocol) && (S.pathname = "/" + S.pathname),
            f(S.port, S.protocol) || (S.host = S.hostname,
            S.port = ""),
            S.username = S.password = "",
            S.auth && (A = S.auth.indexOf(":"),
            ~A ? (S.username = S.auth.slice(0, A),
            S.username = encodeURIComponent(decodeURIComponent(S.username)),
            S.password = S.auth.slice(A + 1),
            S.password = encodeURIComponent(decodeURIComponent(S.password))) : S.username = encodeURIComponent(decodeURIComponent(S.auth)),
            S.auth = S.password ? S.username + ":" + S.password : S.username),
            S.origin = "file:" !== S.protocol && i(S.protocol) && S.host ? S.protocol + "//" + S.host : "null",
            S.href = S.toString()
        }
        function l(e, t, n) {
            var r = this;
            switch (e) {
            case "query":
                "string" == typeof t && t.length && (t = (n || d.parse)(t)),
                r[e] = t;
                break;
            case "port":
                r[e] = t,
                f(t, r.protocol) ? t && (r.host = r.hostname + ":" + t) : (r.host = r.hostname,
                r[e] = "");
                break;
            case "hostname":
                r[e] = t,
                r.port && (t += ":" + r.port),
                r.host = t;
                break;
            case "host":
                r[e] = t,
                A.test(t) ? (t = t.split(":"),
                r.port = t.pop(),
                r.hostname = t.join(":")) : (r.hostname = t,
                r.port = "");
                break;
            case "protocol":
                r.protocol = t.toLowerCase(),
                r.slashes = !n;
                break;
            case "pathname":
            case "hash":
                if (t) {
                    var o = "pathname" === e ? "/" : "#";
                    r[e] = t.charAt(0) !== o ? o + t : t
                } else
                    r[e] = t;
                break;
            case "username":
            case "password":
                r[e] = encodeURIComponent(t);
                break;
            case "auth":
                var a = t.indexOf(":");
                ~a ? (r.username = t.slice(0, a),
                r.username = encodeURIComponent(decodeURIComponent(r.username)),
                r.password = t.slice(a + 1),
                r.password = encodeURIComponent(decodeURIComponent(r.password))) : r.username = encodeURIComponent(decodeURIComponent(t))
            }
            for (var s = 0; s < y.length; s++) {
                var c = y[s];
                c[4] && (r[c[1]] = r[c[1]].toLowerCase())
            }
            return r.auth = r.password ? r.username + ":" + r.password : r.username,
            r.origin = "file:" !== r.protocol && i(r.protocol) && r.host ? r.protocol + "//" + r.host : "null",
            r.href = r.toString(),
            r
        }
        function u(e) {
            e && "function" == typeof e || (e = d.stringify);
            var t, n = this, r = n.host, o = n.protocol;
            o && ":" !== o.charAt(o.length - 1) && (o += ":");
            var a = o + (n.protocol && n.slashes || i(n.protocol) ? "//" : "");
            return n.username ? (a += n.username,
            n.password && (a += ":" + n.password),
            a += "@") : n.password ? (a += ":" + n.password,
            a += "@") : "file:" !== n.protocol && i(n.protocol) && !r && "/" !== n.pathname && (a += "@"),
            (":" === r[r.length - 1] || A.test(n.hostname) && !n.port) && (r += ":"),
            a += r + n.pathname,
            t = "object" == typeof n.query ? e(n.query) : n.query,
            t && (a += "?" !== t.charAt(0) ? "?" + t : t),
            n.hash && (a += n.hash),
            a
        }
        var f = n(69)
          , d = n(70)
          , h = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/
          , p = /[\n\r\t]/g
          , v = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//
          , A = /:\d+$/
          , g = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i
          , m = /^[a-zA-Z]:/
          , y = [["#", "hash"], ["?", "query"], function(e, t) {
            return i(t.protocol) ? e.replace(/\\/g, "/") : e
        }
        , ["/", "pathname"], ["@", "auth", 1], [NaN, "host", void 0, 1, 1], [/:(\d*)$/, "port", void 0, 1], [NaN, "hostname", void 0, 1, 1]]
          , b = {
            hash: 1,
            query: 1
        };
        c.prototype = {
            set: l,
            toString: u
        },
        c.extractProtocol = a,
        c.location = o,
        c.trimLeft = r,
        c.qs = d,
        e.exports = c
    }
    ).call(t, function() {
        return this
    }())
}
, function(e, t) {
    "use strict";
    e.exports = function(e, t) {
        if (t = t.split(":")[0],
        e = +e,
        !e)
            return !1;
        switch (t) {
        case "http":
        case "ws":
            return 80 !== e;
        case "https":
        case "wss":
            return 443 !== e;
        case "ftp":
            return 21 !== e;
        case "gopher":
            return 70 !== e;
        case "file":
            return !1
        }
        return 0 !== e
    }
}
, function(e, t) {
    "use strict";
    function n(e) {
        try {
            return decodeURIComponent(e.replace(/\+/g, " "))
        } catch (e) {
            return null
        }
    }
    function r(e) {
        try {
            return encodeURIComponent(e)
        } catch (e) {
            return null
        }
    }
    function o(e) {
        for (var t, r = /([^=?#&]+)=?([^&]*)/g, o = {}; t = r.exec(e); ) {
            var i = n(t[1])
              , a = n(t[2]);
            null === i || null === a || i in o || (o[i] = a)
        }
        return o
    }
    function i(e, t) {
        t = t || "";
        var n, o, i = [];
        "string" != typeof t && (t = "?");
        for (o in e)
            if (s.call(e, o)) {
                if (n = e[o],
                n || null !== n && n !== a && !isNaN(n) || (n = ""),
                o = r(o),
                n = r(n),
                null === o || null === n)
                    continue;
                i.push(o + "=" + n)
            }
        return i.length ? t + i.join("&") : ""
    }
    var a, s = Object.prototype.hasOwnProperty;
    t.stringify = i,
    t.parse = o
}
, function(e, t, n) {
    var r = n(72)
      , o = n(74)
      , i = n(146);
    Y.use("node", function(e) {
        e.namespace("Template").Site = Singleton.create({
            ready: function() {
                this.regularHeaderForGridGallery(),
                e.on("domready", function() {
                    this.init()
                }, this)
            },
            init: function() {
                this.setupUserAccountLinks(),
                this.cartState(),
                e.one(".index-section .index-section-image") && this.fadeInFirstIndexSectionImageOnLoad(),
                this.transparentHeaderPadding(),
                this.textShrink("#siteTitle a", "#siteTitle"),
                this.textShrink(".index-gallery .slide-meta-content .title", ".index-gallery .slide-meta-content"),
                this.textShrink(".index-section-wrapper.has-main-media .sqs-block-content h1", ".index-section-wrapper.has-main-media .sqs-block-content"),
                this.textShrink(".banner-thumbnail-wrapper .desc-wrapper h1", ".banner-thumbnail-wrapper .desc-wrapper"),
                this.textShrink(".quote-block figure", ".sqs-block.quote-block"),
                this.textShrink(".page-description p", ".page-description"),
                this.getVariables(),
                this.wrapper = e.Node.create('<div class="show-on-scroll-wrapper" id="showOnScrollWrapper"></div>'),
                this.injectScrollNavContent(),
                this.syncUI(),
                this.bindUI(),
                e.one(".always-use-overlay-nav") || e.config.win.innerWidth <= 768 ? (e.Template.helper.radioCheckboxes("#mainNavigation"),
                e.Template.helper.radioCheckboxes("#mobileNavigation")) : (e.Template.helper.folderRedirect("#headerNav .folder-toggle-label"),
                e.Template.helper.folderRedirect("#showOnScrollWrapper .folder-toggle-label"),
                e.Template.helper.folderRedirect("#footer .folder-toggle-label"));
                var t = Array.prototype.slice.call(document.body.querySelectorAll("div.sqs-video-background"));
                t.forEach(function(e) {
                    o(e.parentNode)
                })
            },
            setupUserAccountLinks: function() {
                e.all(".user-account-link").each(function(e) {
                    var t = r.isUserAuthenticated() ? ".unauth" : ".auth"
                      , n = e.one(t);
                    n.remove(),
                    e.on("click", function(e) {
                        e.preventDefault(),
                        r.openAccountScreen()
                    })
                })
            },
            fadeInFirstIndexSectionImageOnLoad: function() {
                if (e.one(".index-section-image img")) {
                    var t = e.one(".index-section-image img")
                      , n = t.getAttribute("src");
                    if (n) {
                        var r = new Image;
                        r.onload = function() {
                            this.addClass("loaded")
                        }
                        .bind(t),
                        r.src = n
                    } else
                        ImageLoader.load(t.removeAttribute("data-load")),
                        t.addClass("loaded")
                }
            },
            mutationObserver: function(t, n, r) {
                var o = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                if (o) {
                    var i = new o(r);
                    i.observe(t, n);
                    var a = e.later(15e3, this, function() {
                        i.disconnect(),
                        a.cancel()
                    })
                } else
                    r(null, null)
            },
            bindUI: function() {
                this.mutationObserver(e.one("#siteWrapper").getDOMNode(), {
                    childList: !0,
                    subtree: !0
                }, this.mutationCallback),
                e.one(window).on("resize", function() {
                    this.getVariables(),
                    this.syncUI(),
                    e.Template.noYUI.vCenterTopSectionContent()
                }, this),
                e.Squarespace.Singletons.ShoppingCart.on("change", e.Template.Site.cartState),
                this.disableScroll(),
                e.Template.helper.on("resizeend", function() {
                    e.all(".map-block[data-block-json]").each(function(t) {
                        e.Template.helper.centerMapPin(t.one(".page-map"), JSON.parse(t.getData("block-json")))
                    })
                }),
                e.one("#mobileNavToggle").on("change", function(t) {
                    t.target.get("checked") === !1 && e.all("#overlayNav input.folder-toggle-box").set("checked", !1).each(function(e) {
                        e.simulate("change")
                    })
                }),
                e.one(".collection-type-index") && (e.all(".index-gallery").each(function(t) {
                    new e.Template.Gallery({
                        wrapper: t.one(".gallery-wrapper"),
                        slides: ".slide-wrapper"
                    })
                }),
                e.one(".collection-type-index.homepage") && new e.Template.RevealOnScroll({
                    el: "#showOnScrollWrapper",
                    offsetEl: ".index-section-wrapper",
                    behavior: "bottom"
                })),
                e.one(".index-section-image img") && e.all(".index-section-image img").length >= 2 ? this.lazyload ? this.lazyload.refresh() : this.lazyload = new e.Template.Lazyload({
                    el: ".index-section-image img",
                    mobile: !1,
                    loadEvent: "throttle"
                }) : e.all(".index-section-image img").each(function(e) {
                    ImageLoader.load(e.removeAttribute("data-load"))
                }),
                this.scrollNav(),
                this.altSections(e.all(".index-section.no-main-image")),
                e.Template.helper.scrollAnchors()
            },
            syncUI: function() {
                this.runCenterNav(),
                this.overlayNavPadding(),
                this.folderEdgeDetection(),
                e.Template.helper.on("resizeend", this.scrollNav, this),
                e.Template.helper.on("resizeend", this.injectScrollNavContent(), this),
                e.one(".collection-type-index.homepage") ? (this.scrollNavHeight = e.one("#showOnScrollWrapper #mainNavWrapper") ? e.one("#showOnScrollWrapper #mainNavWrapper").get("clientHeight") : 0,
                e.all(this.navLinks).each(function(t) {
                    t.on("click", function(n) {
                        window.location.hash && history.pushState("", document.title, window.location.pathname),
                        n.halt();
                        var r, o = t.getAttribute("href");
                        "/" === o.charAt(0) && (o = o.substr(2)),
                        document.getElementById(o) && (r = this.mobileNav ? document.getElementById(o).getBoundingClientRect().top + window.scrollY + 1 : document.getElementById(o).getBoundingClientRect().top + window.scrollY - this.scrollNavHeight + 1,
                        this.mobileNav ? (e.one("#mobileNavToggle").set("checked", !1).simulate("change"),
                        e.later(400, this, function() {
                            e.Template.helper.smoothScrollTo(r)
                        })) : e.Template.helper.smoothScrollTo(r))
                    }, this)
                }, this)) : this.mobileNav && e.all(this.navLinks).each(function(t) {
                    t.on("click", function(t) {
                        e.one("#mobileNavToggle").set("checked", !1).simulate("change")
                    }, this)
                }, this)
            },
            mutationCallback: function(t, n) {
                if (t)
                    for (var r = 0; r < t.length; r++) {
                        var o = Array.prototype.slice.call(t[r].addedNodes);
                        o.unshift(t[r].target);
                        for (var i = 0; i < o.length; i++) {
                            var a = e.Node(o[i]);
                            if (a.ancestor(".index-section-wrapper.has-main-media")) {
                                var s = a.ancestor(".index-section-wrapper").one(".index-section-image img");
                                s && ImageLoader.load(s)
                            }
                            if (window.location.hash) {
                                var c = window.location.hash;
                                "/" === c.charAt(0) && (c = c.substr(1)),
                                e.one(c) && e.one(window).set("scrollTop", e.one(c).getY() + 1)
                            }
                        }
                    }
                else
                    e.on("io:end", function(t) {
                        var n = e.later(1200, this, function() {
                            e.all(".index-section-image img").each(function(e) {
                                ImageLoader.load(e)
                            }),
                            n.cancel()
                        })
                    })
            },
            getVariables: function() {
                this.headerHeight = e.one("#header").get("offsetHeight"),
                this.mobileNav = e.one(".always-use-overlay-nav") || e.config.win.innerWidth <= 768,
                this.navLinks = ".nav-wrapper .index.home a",
                "none" == e.one("#header .mobile-nav-toggle-label").getComputedStyle("display") ? this.mobileNavShowing = !1 : this.mobileNavShowing = !0
            },
            scrollNav: function() {
                if (e.one(".collection-type-index.homepage") && e.one("#header #mainNavWrapper") && e.one(".index.home")) {
                    var t = e.all(".index-section:not(.gallery)")
                      , n = this.mobileNavShowing ? e.all("#mobileNavWrapper .index.home") : e.all("#showOnScrollWrapper #mainNavigation .index.home")
                      , r = 0
                      , o = 0
                      , a = this.mobileNavShowing ? 0 : e.one("#showOnScrollWrapper #mainNavWrapper").get("clientHeight") + 1
                      , s = e.bind(function() {
                        t.each(function(t, n) {
                            n = n++,
                            t.getY() < e.config.win.scrollY + a && (r = n)
                        }, this),
                        e.config.win.scrollY + e.config.win.innerHeight >= e.one("body").get("clientHeight") ? (n.item(n.size() - 1).addClass("active"),
                        r = n.size() - 1) : n.item(r).addClass("active"),
                        r != o && (n.item(o).removeClass("active"),
                        o = r)
                    }, this)
                      , c = e.throttle(s, 200);
                    e.one(window).on("scroll", c),
                    e.one(window).on("scroll", function() {
                        i(s, e.Template.Site, 200)
                    })
                }
            },
            cartState: function() {
                var t = e.Squarespace.Singletons.ShoppingCart.get("totalQuantity")
                  , n = e.one(".custom-cart");
                n && (t && t > 0 ? n.removeClass("empty") : n.hasClass("empty") || n.addClass("empty"))
            },
            disableScroll: function() {
                var t = e.one("#mobileNavToggle");
                t.on("change", function() {
                    t.get("checked") === !0 ? e.one("body").addClass("disable-scroll") : e.one("body").removeClass("disable-scroll")
                }),
                e.Template.helper.disableScroll("disable-scroll")
            },
            textShrink: function(t, n) {
                e.one(t) && e.one(t).ancestor(n) && e.all(t).each(function(t) {
                    t.plug(e.Squarespace.TextShrink, {
                        parentEl: t.ancestor(n)
                    })
                })
            },
            regularHeaderForGridGallery: function() {
                e.one(".collection-type-index.design-grid.has-banner-image") && e.one("#page #content .index-section:first-child .index-section-wrapper .gallery-content") ? e.one("body").removeClass("has-banner-image") : e.one(".collection-type-index.design-slideshow:not(.has-banner-image)") && e.one("#page #content .index-section:first-child .index-section-wrapper .gallery-content") && e.one("body").addClass("has-banner-image")
            },
            fadeIn: function(t) {
                e.one(t) && e.one(t).hasClass("tmpl-loading") && e.all(t).each(function(e) {
                    e.removeClass("tmpl-loading").addClass("tmpl-loaded")
                })
            },
            runCenterNav: function() {
                if (e.one("body:not(.always-use-overlay-nav)")) {
                    var t = "#header #mainNavigation > div";
                    e.one(".index.home") && (t = "#header #mainNavigation > div:not(.home)",
                    e.one(".expand-homepage-index-links") && (t = "#header #mainNavigation > div:not(.base)")),
                    new e.Template.CenterNav({
                        navItems: t,
                        centerEl: "#header .title-logo-wrapper h1",
                        wrapper: "#header",
                        innerWrapper: "#header #headerNav"
                    })
                }
            },
            overlayNavPadding: function() {
                e.config.win.innerWidth > 640 && e.one("#overlayNav #mainNavWrapper") && e.one("#overlayNav #mobileNavWrapper").setStyles({
                    paddingTop: this.headerHeight,
                    paddingBottom: this.headerHeight
                })
            },
            folderEdgeDetection: function() {
                e.all(".subnav").each(function(t) {
                    var n = e.config.win.innerWidth;
                    n - t.getX() <= t.get("offsetWidth") && t.addClass("right-align")
                })
            },
            transparentHeaderPadding: function() {
                var t = e.one("#header").getComputedStyle("position")
                  , n = (e.one("#header .header-inner h1").get("offsetHeight") + parseInt(e.one("#header .header-inner").getComputedStyle("paddingTop"), 10)) / 2;
                if ("absolute" == t && e.one(".main-content .index-section:first-child .index-section-wrapper.has-main-media"))
                    ;
                else if ("absolute" == t && e.one("body.has-banner-image")) {
                    e.one(".banner-thumbnail-wrapper .desc-wrapper") && e.one(".banner-thumbnail-wrapper .desc-wrapper").setStyle("paddingTop", n);
                    var r = setInterval(function() {
                        document.querySelector("#thumbnail img") && document.querySelector("#thumbnail img").clientHeight != document.querySelector("#thumbnail").clientHeight ? e.all('.banner-thumbnail-wrapper img[data-load="false"]').each(function(e) {
                            ImageLoader.load(e.removeAttribute("data-load"))
                        }) : clearInterval(r)
                    }, 100)
                } else
                    e.all('.banner-thumbnail-wrapper img[data-load="false"]').each(function(e) {
                        ImageLoader.load(e.removeAttribute("data-load"))
                    })
            },
            injectScrollNavContent: function() {
                e.one(".collection-type-index.homepage") && e.one("#header #mainNavWrapper") && (e.one("#showOnScrollWrapper") && e.one("#showOnScrollWrapper").empty(),
                this.fixedEl = this.mobileNav ? ".show-on-scroll-mobile" : ".show-on-scroll",
                e.one("#mobileNavToggle").insert(this.wrapper.setHTML(e.one(this.fixedEl).get("outerHTML")), "after"),
                ".show-on-scroll" == this.fixedEl && e.all("#showOnScrollWrapper #mainNavWrapper nav div").removeAttribute("style"))
            },
            altSections: function(e) {
                e.each(function(e) {
                    e.get("nextElementSibling") && e.get("nextElementSibling").hasClass("index-section.no-main-image") && !e.hasClass("alt-section") && e.get("nextElementSibling").addClass("alt-section")
                })
            }
        })
    })
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.default = void 0;
    var r = n(73)
      , o = "UserAccounts API not available"
      , i = function() {
        console.warn(o)
    }
      , a = function() {
        var e, t, n;
        return null !== (e = null === (t = window) || void 0 === t ? void 0 : null === (n = t[r.USER_ACCOUNT_API]) || void 0 === n ? void 0 : n[r.IS_USER_AUTHENTICATED]()) && void 0 !== e ? e : i()
    }
      , s = function() {
        var e, t, n;
        return null !== (e = null === (t = window) || void 0 === t ? void 0 : null === (n = t[r.USER_ACCOUNT_API]) || void 0 === n ? void 0 : n[r.OPEN_ACCOUNT_SCREEN]()) && void 0 !== e ? e : i()
    }
      , c = {
        isUserAuthenticated: a,
        openAccountScreen: s
    };
    t.default = c,
    e.exports = t.default
}
, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.OPEN_ACCOUNT_SCREEN = t.IS_USER_AUTHENTICATED = t.USER_ACCOUNT_API = void 0;
    var n = "UserAccountApi";
    t.USER_ACCOUNT_API = n;
    var r = "isUserAuthenticated";
    t.IS_USER_AUTHENTICATED = r;
    var o = "openAccountScreen";
    t.OPEN_ACCOUNT_SCREEN = o
}
, function(e, t, n) {
    "use strict";
    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    function o(e, t) {
        var n = e.querySelector(".sqs-video-background")
          , r = (0,
        a.default)(n)
          , o = new i.VideoBackground(r)
          , s = function() {
            o.scaleVideo()
        }
          , c = function() {
            o.destroy(),
            o = new i.VideoBackground(r)
        };
        return "function" == typeof t && t({
            handleResize: s,
            handleTweak: c
        }),
        {
            destroy: function() {
                o.destroy()
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.default = void 0;
    var i = n(75)
      , a = r(n(145))
      , s = o;
    t.default = s,
    e.exports = t.default
}
, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    Object.defineProperty(t, "VideoBackground", {
        enumerable: !0,
        get: function() {
            return r.VideoBackground
        }
    }),
    Object.defineProperty(t, "VideoFilterPropertyValues", {
        enumerable: !0,
        get: function() {
            return r.VideoFilterPropertyValues
        }
    }),
    Object.defineProperty(t, "videoAutoplayTest", {
        enumerable: !0,
        get: function() {
            return r.videoAutoplayTest
        }
    }),
    n(76);
    var r = n(77)
}
, function(e, t) {
    !function() {
        function e(e, t) {
            t = t || {
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            };
            var n = document.createEvent("CustomEvent");
            return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail),
            n
        }
        return "function" != typeof window.CustomEvent && (e.prototype = window.Event.prototype,
        void (window.CustomEvent = e))
    }()
}
, function(e, t, n) {
    "use strict";
    var r = n(78);
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    Object.defineProperty(t, "VideoBackground", {
        enumerable: !0,
        get: function() {
            return o.default
        }
    }),
    Object.defineProperty(t, "VideoFilterPropertyValues", {
        enumerable: !0,
        get: function() {
            return i.filterProperties
        }
    }),
    Object.defineProperty(t, "videoAutoplayTest", {
        enumerable: !0,
        get: function() {
            return a.default
        }
    });
    var o = r(n(79))
      , i = n(144)
      , a = r(n(114))
}
, function(e, t) {
    function n(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    e.exports = n,
    e.exports.__esModule = !0,
    e.exports.default = e.exports
}
, function(e, t, n) {
    "use strict";
    var r = n(78);
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.default = void 0;
    var o = r(n(80))
      , i = r(n(86))
      , a = r(n(87))
      , s = r(n(112))
      , c = r(n(114))
      , l = n(133)
      , u = n(143)
      , f = n(141)
      , d = n(144)
      , h = n(136)
      , p = {
        vimeo: {
            api: l.initializeVimeoAPI,
            player: l.initializeVimeoPlayer
        },
        youtube: {
            api: u.initializeYouTubeAPI,
            player: u.initializeYouTubePlayer
        }
    }
      , v = function() {
        function e(t) {
            var n = this
              , r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window;
            (0,
            i.default)(this, e),
            this.windowContext = r,
            this.events = [],
            this.browserCanAutoPlay = !1,
            this.videoCanAutoPlay = !1;
            var o = this.setInstanceProperties(t);
            o && (this.renderFallbackBehavior(),
            (0,
            c.default)().then(function(e) {
                n.logger(e),
                n.browserCanAutoPlay = !0,
                n.initializeVideoAPI()
            }, function(e) {
                n.logger(e),
                n.browserCanAutoPlay = !1
            }).then(function() {
                n.setDisplayEffects(),
                n.bindUI(),
                n.DEBUG.enabled === !0 && (window.vdbg = n)
            }))
        }
        return (0,
        a.default)(e, [{
            key: "destroy",
            value: function() {
                this.events && this.events.forEach(function(e) {
                    return e.target.removeEventListener(e.type, e.handler, !0)
                }),
                this.events.length = 0,
                this.player && "function" == typeof this.player.destroy && (this.player.iframe && this.player.iframe.classList.remove("ready"),
                this.player.destroy(),
                this.player = {}),
                "number" == typeof this.timer && (clearTimeout(this.timer),
                this.timer = null)
            }
        }, {
            key: "bindUI",
            value: function() {
                var e = this
                  , t = function() {
                    e.windowContext.requestAnimationFrame(function() {
                        e.scaleVideo()
                    })
                };
                this.events.push({
                    target: this.windowContext,
                    type: "resize",
                    handler: t
                }),
                this.windowContext.addEventListener("resize", t, !0)
            }
        }, {
            key: "setInstanceProperties",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return e = (0,
                s.default)({}, f.DEFAULT_PROPERTY_VALUES, e),
                1 === e.container.nodeType ? this.container = e.container : "string" == typeof e.container && (this.container = document.querySelector(e.container)),
                this.container ? (this.videoSource = (0,
                h.getVideoSource)(e.url),
                this.videoSource !== f.UNSUPPORTED_VIDEO_SOURCE && (this.videoId = (0,
                h.getVideoID)(e.url, this.videoSource),
                "string" == typeof this.videoId && (this.customFallbackImage = (0,
                h.validatedImage)(e.customFallbackImage || e.container.querySelector("img")),
                this.filter = e.filter,
                this.filterStrength = e.filterStrength,
                this.fitMode = e.fitMode,
                this.scaleFactor = e.scaleFactor,
                this.playbackSpeed = (0,
                o.default)(e.playbackSpeed) < .5 ? 1 : (0,
                o.default)(e.playbackSpeed),
                this.timeCode = {
                    start: (0,
                    h.getStartTime)(e.url, this.videoSource) || e.timeCode.start,
                    end: e.timeCode.end
                },
                this.player = {},
                this.DEBUG = e.DEBUG,
                !0))) : (console.error("Container " + e.container + " not found"),
                !1)
            }
        }, {
            key: "onFallbackImageLoaded",
            value: function() {
                this.customFallbackImage.classList.add("loaded")
            }
        }, {
            key: "setFallbackImage",
            value: function() {
                var e = this
                  , t = this.customFallbackImage;
                if (t)
                    return t.hasAttribute("src") && t.complete ? void this.onFallbackImageLoaded() : (t.addEventListener("load", function() {
                        e.onFallbackImageLoaded()
                    }, {
                        once: !0
                    }),
                    this.windowContext.ImageLoader ? void this.windowContext.ImageLoader.load(t, {
                        load: !0
                    }) : void (t.src = t.src))
            }
        }, {
            key: "initializeVideoAPI",
            value: function() {
                var e = this;
                if (this.browserCanAutoPlay && this.videoSource && this.videoId) {
                    this.player.ready = !1;
                    var t = p[this.videoSource].api
                      , n = t(this.windowContext);
                    n.then(function(t) {
                        e.logger(t),
                        e.player.ready = !1,
                        e.initializeVideoPlayer()
                    }).catch(function(t) {
                        document.body.classList.add("ready"),
                        e.logger(t)
                    })
                } else
                    document.body.classList.add("ready")
            }
        }, {
            key: "initializeVideoPlayer",
            value: function() {
                var e = this;
                if (this.player.ready) {
                    try {
                        this.player.destroy()
                    } catch (e) {}
                    this.player.ready = !1
                }
                var t = p[this.videoSource].player
                  , n = t({
                    instance: this,
                    container: this.container,
                    win: this.windowContext,
                    videoId: this.videoId,
                    startTime: this.timeCode.start,
                    speed: this.playbackSpeed,
                    readyCallback: function() {
                        e.player.iframe.classList.add("background-video"),
                        e.videoAspectRatio = (0,
                        h.findPlayerAspectRatio)(e.container, e.player, e.videoSource),
                        e.syncPlayer();
                        var t = new CustomEvent("ready");
                        e.container.dispatchEvent(t)
                    },
                    stateChangeCallback: function(t, n) {
                        switch (t) {
                        case "playing":
                            e.videoCanAutoPlay || (e.logger("video started playing"),
                            e.videoCanAutoPlay = !0,
                            e.player.ready = !0,
                            e.player.iframe.classList.add("ready"),
                            e.container.classList.remove("mobile"))
                        }
                        t && e.logger(t),
                        n && e.logger(n)
                    }
                });
                n.then(function(t) {
                    e.player = t
                }, function(t) {
                    e.logger(t)
                })
            }
        }, {
            key: "renderFallbackBehavior",
            value: function() {
                this.setFallbackImage(),
                this.container.classList.add("mobile"),
                this.logger("added mobile")
            }
        }, {
            key: "syncPlayer",
            value: function() {
                this.setDisplayEffects(),
                this.setSpeed(),
                this.scaleVideo()
            }
        }, {
            key: "scaleVideo",
            value: function(e) {
                this.setFallbackImage();
                var t = this.player.iframe;
                if (t) {
                    var n = e || this.scaleFactor;
                    if ("fill" !== this.fitMode)
                        return t.style.width = "",
                        void (t.style.height = "");
                    var r = t.parentNode.clientWidth
                      , o = t.parentNode.clientHeight
                      , i = r / o
                      , a = 0
                      , s = 0;
                    i > this.videoAspectRatio ? (a = r * n,
                    s = r * n / this.videoAspectRatio) : this.videoAspectRatio > i ? (a = o * n * this.videoAspectRatio,
                    s = o * n) : (a = r * n,
                    s = o * n),
                    t.style.width = a + "px",
                    t.style.height = s + "px",
                    t.style.left = 0 - (a - r) / 2 + "px",
                    t.style.top = 0 - (s - o) / 2 + "px"
                }
            }
        }, {
            key: "setSpeed",
            value: function(e) {
                this.playbackSpeed = (0,
                o.default)(this.playbackSpeed),
                this.player.setPlaybackRate && this.player.setPlaybackRate(this.playbackSpeed)
            }
        }, {
            key: "setDisplayEffects",
            value: function() {
                this.setFilter()
            }
        }, {
            key: "setFilter",
            value: function() {
                var e = this.container.style
                  , t = d.filterOptions[this.filter - 1]
                  , n = "";
                "none" !== t && (n = this.getFilterStyle(t, this.filterStrength));
                var r = "blur" === t;
                e.webkitFilter = r ? "" : n,
                e.filter = r ? "" : n,
                this.container.classList.toggle("filter-blur", r),
                Array.prototype.slice.call(this.container.children).forEach(function(e) {
                    e.style.webkitFilter = r ? n : "",
                    e.style.filter = r ? n : ""
                })
            }
        }, {
            key: "getFilterStyle",
            value: function(e, t) {
                return "".concat(e, "(").concat(d.filterProperties[e].modifier(t) + d.filterProperties[e].unit, ")")
            }
        }, {
            key: "logger",
            value: function(e) {
                this.DEBUG.enabled && this.DEBUG.verbose && this.windowContext.console.log(e)
            }
        }]),
        e
    }()
      , A = v;
    t.default = A,
    e.exports = t.default
}
, function(e, t, n) {
    e.exports = n(81)
}
, function(e, t, n) {
    n(82),
    e.exports = n(17).parseFloat
}
, function(e, t, n) {
    var r = n(15)
      , o = n(83);
    r(r.G + r.F * (parseFloat != o), {
        parseFloat: o
    })
}
, function(e, t, n) {
    var r = n(16).parseFloat
      , o = n(84).trim;
    e.exports = 1 / r(n(85) + "-0") !== -(1 / 0) ? function(e) {
        var t = o(String(e), 3)
          , n = r(t);
        return 0 === n && "-" == t.charAt(0) ? -0 : n
    }
    : r
}
, function(e, t, n) {
    var r = n(15)
      , o = n(12)
      , i = n(26)
      , a = n(85)
      , s = "[" + a + "]"
      , c = "​"
      , l = RegExp("^" + s + s + "*")
      , u = RegExp(s + s + "*$")
      , f = function(e, t, n) {
        var o = {}
          , s = i(function() {
            return !!a[e]() || c[e]() != c
        })
          , l = o[e] = s ? t(d) : a[e];
        n && (o[n] = l),
        r(r.P + r.F * s, "String", o)
    }
      , d = f.trim = function(e, t) {
        return e = String(o(e)),
        1 & t && (e = e.replace(l, "")),
        2 & t && (e = e.replace(u, "")),
        e
    }
    ;
    e.exports = f
}
, function(e, t) {
    e.exports = "\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"
}
, function(e, t) {
    function n(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    e.exports = n,
    e.exports.__esModule = !0,
    e.exports.default = e.exports
}
, function(e, t, n) {
    function r(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1,
            r.configurable = !0,
            "value"in r && (r.writable = !0),
            i(e, a(r.key), r)
        }
    }
    function o(e, t, n) {
        return t && r(e.prototype, t),
        n && r(e, n),
        i(e, "prototype", {
            writable: !1
        }),
        e
    }
    var i = n(63)
      , a = n(88);
    e.exports = o,
    e.exports.__esModule = !0,
    e.exports.default = e.exports
}
, function(e, t, n) {
    function r(e) {
        var t = i(e, "string");
        return "symbol" == o(t) ? t : t + ""
    }
    var o = n(89).default
      , i = n(110);
    e.exports = r,
    e.exports.__esModule = !0,
    e.exports.default = e.exports
}
, function(e, t, n) {
    function r(t) {
        "@babel/helpers - typeof";
        return e.exports = r = "function" == typeof o && "symbol" == typeof i ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof o && e.constructor === o && e !== o.prototype ? "symbol" : typeof e
        }
        ,
        e.exports.__esModule = !0,
        e.exports.default = e.exports,
        r(t)
    }
    var o = n(90)
      , i = n(105);
    e.exports = r,
    e.exports.__esModule = !0,
    e.exports.default = e.exports
}
, function(e, t, n) {
    n(91),
    n(102),
    n(103),
    n(104),
    e.exports = n(17).Symbol
}
, function(e, t, n) {
    "use strict";
    var r = n(16)
      , o = n(30)
      , i = n(25)
      , a = n(15)
      , s = n(31)
      , c = n(92).KEY
      , l = n(26)
      , u = n(45)
      , f = n(49)
      , d = n(46)
      , h = n(50)
      , p = n(93)
      , v = n(94)
      , A = n(95)
      , g = n(98)
      , m = n(22)
      , y = n(23)
      , b = n(52)
      , w = n(38)
      , S = n(28)
      , x = n(29)
      , E = n(34)
      , _ = n(99)
      , T = n(101)
      , I = n(96)
      , k = n(21)
      , Y = n(36)
      , C = T.f
      , O = k.f
      , P = _.f
      , j = r.Symbol
      , R = r.JSON
      , M = R && R.stringify
      , N = "prototype"
      , U = h("_hidden")
      , F = h("toPrimitive")
      , L = {}.propertyIsEnumerable
      , V = u("symbol-registry")
      , G = u("symbols")
      , W = u("op-symbols")
      , B = Object[N]
      , D = "function" == typeof j && !!I.f
      , H = r.QObject
      , z = !H || !H[N] || !H[N].findChild
      , Z = i && l(function() {
        return 7 != E(O({}, "a", {
            get: function() {
                return O(this, "a", {
                    value: 7
                }).a
            }
        })).a
    }) ? function(e, t, n) {
        var r = C(B, t);
        r && delete B[t],
        O(e, t, n),
        r && e !== B && O(B, t, r)
    }
    : O
      , Q = function(e) {
        var t = G[e] = E(j[N]);
        return t._k = e,
        t
    }
      , q = D && "symbol" == typeof j.iterator ? function(e) {
        return "symbol" == typeof e
    }
    : function(e) {
        return e instanceof j
    }
      , J = function(e, t, n) {
        return e === B && J(W, t, n),
        m(e),
        t = S(t, !0),
        m(n),
        o(G, t) ? (n.enumerable ? (o(e, U) && e[U][t] && (e[U][t] = !1),
        n = E(n, {
            enumerable: x(0, !1)
        })) : (o(e, U) || O(e, U, x(1, {})),
        e[U][t] = !0),
        Z(e, t, n)) : O(e, t, n)
    }
      , X = function(e, t) {
        m(e);
        for (var n, r = A(t = w(t)), o = 0, i = r.length; i > o; )
            J(e, n = r[o++], t[n]);
        return e
    }
      , K = function(e, t) {
        return void 0 === t ? E(e) : X(E(e), t)
    }
      , $ = function(e) {
        var t = L.call(this, e = S(e, !0));
        return !(this === B && o(G, e) && !o(W, e)) && (!(t || !o(this, e) || !o(G, e) || o(this, U) && this[U][e]) || t)
    }
      , ee = function(e, t) {
        if (e = w(e),
        t = S(t, !0),
        e !== B || !o(G, t) || o(W, t)) {
            var n = C(e, t);
            return !n || !o(G, t) || o(e, U) && e[U][t] || (n.enumerable = !0),
            n
        }
    }
      , te = function(e) {
        for (var t, n = P(w(e)), r = [], i = 0; n.length > i; )
            o(G, t = n[i++]) || t == U || t == c || r.push(t);
        return r
    }
      , ne = function(e) {
        for (var t, n = e === B, r = P(n ? W : w(e)), i = [], a = 0; r.length > a; )
            !o(G, t = r[a++]) || n && !o(B, t) || i.push(G[t]);
        return i
    };
    D || (j = function() {
        if (this instanceof j)
            throw TypeError("Symbol is not a constructor!");
        var e = d(arguments.length > 0 ? arguments[0] : void 0)
          , t = function(n) {
            this === B && t.call(W, n),
            o(this, U) && o(this[U], e) && (this[U][e] = !1),
            Z(this, e, x(1, n))
        };
        return i && z && Z(B, e, {
            configurable: !0,
            set: t
        }),
        Q(e)
    }
    ,
    s(j[N], "toString", function() {
        return this._k
    }),
    T.f = ee,
    k.f = J,
    n(100).f = _.f = te,
    n(97).f = $,
    I.f = ne,
    i && !n(14) && s(B, "propertyIsEnumerable", $, !0),
    p.f = function(e) {
        return Q(h(e))
    }
    ),
    a(a.G + a.W + a.F * !D, {
        Symbol: j
    });
    for (var re = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), oe = 0; re.length > oe; )
        h(re[oe++]);
    for (var ie = Y(h.store), ae = 0; ie.length > ae; )
        v(ie[ae++]);
    a(a.S + a.F * !D, "Symbol", {
        for: function(e) {
            return o(V, e += "") ? V[e] : V[e] = j(e)
        },
        keyFor: function(e) {
            if (!q(e))
                throw TypeError(e + " is not a symbol!");
            for (var t in V)
                if (V[t] === e)
                    return t
        },
        useSetter: function() {
            z = !0
        },
        useSimple: function() {
            z = !1
        }
    }),
    a(a.S + a.F * !D, "Object", {
        create: K,
        defineProperty: J,
        defineProperties: X,
        getOwnPropertyDescriptor: ee,
        getOwnPropertyNames: te,
        getOwnPropertySymbols: ne
    });
    var se = l(function() {
        I.f(1)
    });
    a(a.S + a.F * se, "Object", {
        getOwnPropertySymbols: function(e) {
            return I.f(b(e))
        }
    }),
    R && a(a.S + a.F * (!D || l(function() {
        var e = j();
        return "[null]" != M([e]) || "{}" != M({
            a: e
        }) || "{}" != M(Object(e))
    })), "JSON", {
        stringify: function(e) {
            for (var t, n, r = [e], o = 1; arguments.length > o; )
                r.push(arguments[o++]);
            if (n = t = r[1],
            (y(t) || void 0 !== e) && !q(e))
                return g(t) || (t = function(e, t) {
                    if ("function" == typeof n && (t = n.call(this, e, t)),
                    !q(t))
                        return t
                }
                ),
                r[1] = t,
                M.apply(R, r)
        }
    }),
    j[N][F] || n(20)(j[N], F, j[N].valueOf),
    f(j, "Symbol"),
    f(Math, "Math", !0),
    f(r.JSON, "JSON", !0)
}
, function(e, t, n) {
    var r = n(46)("meta")
      , o = n(23)
      , i = n(30)
      , a = n(21).f
      , s = 0
      , c = Object.isExtensible || function() {
        return !0
    }
      , l = !n(26)(function() {
        return c(Object.preventExtensions({}))
    })
      , u = function(e) {
        a(e, r, {
            value: {
                i: "O" + ++s,
                w: {}
            }
        })
    }
      , f = function(e, t) {
        if (!o(e))
            return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
        if (!i(e, r)) {
            if (!c(e))
                return "F";
            if (!t)
                return "E";
            u(e)
        }
        return e[r].i
    }
      , d = function(e, t) {
        if (!i(e, r)) {
            if (!c(e))
                return !0;
            if (!t)
                return !1;
            u(e)
        }
        return e[r].w
    }
      , h = function(e) {
        return l && p.NEED && c(e) && !i(e, r) && u(e),
        e
    }
      , p = e.exports = {
        KEY: r,
        NEED: !1,
        fastKey: f,
        getWeak: d,
        onFreeze: h
    }
}
, function(e, t, n) {
    t.f = n(50)
}
, function(e, t, n) {
    var r = n(16)
      , o = n(17)
      , i = n(14)
      , a = n(93)
      , s = n(21).f;
    e.exports = function(e) {
        var t = o.Symbol || (o.Symbol = i ? {} : r.Symbol || {});
        "_" == e.charAt(0) || e in t || s(t, e, {
            value: a.f(e)
        })
    }
}
, function(e, t, n) {
    var r = n(36)
      , o = n(96)
      , i = n(97);
    e.exports = function(e) {
        var t = r(e)
          , n = o.f;
        if (n)
            for (var a, s = n(e), c = i.f, l = 0; s.length > l; )
                c.call(e, a = s[l++]) && t.push(a);
        return t
    }
}
, function(e, t) {
    t.f = Object.getOwnPropertySymbols
}
, function(e, t) {
    t.f = {}.propertyIsEnumerable
}
, function(e, t, n) {
    var r = n(40);
    e.exports = Array.isArray || function(e) {
        return "Array" == r(e)
    }
}
, function(e, t, n) {
    var r = n(38)
      , o = n(100).f
      , i = {}.toString
      , a = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : []
      , s = function(e) {
        try {
            return o(e)
        } catch (e) {
            return a.slice()
        }
    };
    e.exports.f = function(e) {
        return a && "[object Window]" == i.call(e) ? s(e) : o(r(e))
    }
}
, function(e, t, n) {
    var r = n(37)
      , o = n(47).concat("length", "prototype");
    t.f = Object.getOwnPropertyNames || function(e) {
        return r(e, o)
    }
}
, function(e, t, n) {
    var r = n(97)
      , o = n(29)
      , i = n(38)
      , a = n(28)
      , s = n(30)
      , c = n(24)
      , l = Object.getOwnPropertyDescriptor;
    t.f = n(25) ? l : function(e, t) {
        if (e = i(e),
        t = a(t, !0),
        c)
            try {
                return l(e, t)
            } catch (e) {}
        if (s(e, t))
            return o(!r.f.call(e, t), e[t])
    }
}
, function(e, t) {}
, function(e, t, n) {
    n(94)("asyncIterator")
}
, function(e, t, n) {
    n(94)("observable")
}
, function(e, t, n) {
    n(9),
    n(106),
    e.exports = n(93).f("iterator")
}
, function(e, t, n) {
    n(107);
    for (var r = n(16), o = n(20), i = n(32), a = n(50)("toStringTag"), s = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), c = 0; c < s.length; c++) {
        var l = s[c]
          , u = r[l]
          , f = u && u.prototype;
        f && !f[a] && o(f, a, l),
        i[l] = i.Array
    }
}
, function(e, t, n) {
    "use strict";
    var r = n(108)
      , o = n(109)
      , i = n(32)
      , a = n(38);
    e.exports = n(13)(Array, "Array", function(e, t) {
        this._t = a(e),
        this._i = 0,
        this._k = t
    }, function() {
        var e = this._t
          , t = this._k
          , n = this._i++;
        return !e || n >= e.length ? (this._t = void 0,
        o(1)) : "keys" == t ? o(0, n) : "values" == t ? o(0, e[n]) : o(0, [n, e[n]])
    }, "values"),
    i.Arguments = i.Array,
    r("keys"),
    r("values"),
    r("entries")
}
, function(e, t) {
    e.exports = function() {}
}
, function(e, t) {
    e.exports = function(e, t) {
        return {
            value: t,
            done: !!e
        }
    }
}
, function(e, t, n) {
    function r(e, t) {
        if ("object" != i(e) || !e)
            return e;
        var n = e[o];
        if (void 0 !== n) {
            var r = n.call(e, t || "default");
            if ("object" != i(r))
                return r;
            throw new TypeError("@@toPrimitive must return a primitive value.")
        }
        return ("string" === t ? String : Number)(e)
    }
    var o = n(111)
      , i = n(89).default;
    e.exports = r,
    e.exports.__esModule = !0,
    e.exports.default = e.exports
}
, function(e, t, n) {
    e.exports = n(93).f("toPrimitive")
}
, function(e, t, n) {
    (function(e, n) {
        function r(e, t, n) {
            switch (n.length) {
            case 0:
                return e.call(t);
            case 1:
                return e.call(t, n[0]);
            case 2:
                return e.call(t, n[0], n[1]);
            case 3:
                return e.call(t, n[0], n[1], n[2])
            }
            return e.apply(t, n)
        }
        function o(e, t) {
            for (var n = -1, r = Array(e); ++n < e; )
                r[n] = t(n);
            return r
        }
        function i(e) {
            return function(t) {
                return e(t)
            }
        }
        function a(e, t) {
            return null == e ? void 0 : e[t]
        }
        function s(e, t) {
            return function(n) {
                return e(t(n))
            }
        }
        function c(e) {
            var t = -1
              , n = null == e ? 0 : e.length;
            for (this.clear(); ++t < n; ) {
                var r = e[t];
                this.set(r[0], r[1])
            }
        }
        function l() {
            this.__data__ = Bt ? Bt(null) : {},
            this.size = 0
        }
        function u(e) {
            var t = this.has(e) && delete this.__data__[e];
            return this.size -= t ? 1 : 0,
            t
        }
        function f(e) {
            var t = this.__data__;
            if (Bt) {
                var n = t[e];
                return n === Ie ? void 0 : n
            }
            return Et.call(t, e) ? t[e] : void 0
        }
        function d(e) {
            var t = this.__data__;
            return Bt ? void 0 !== t[e] : Et.call(t, e)
        }
        function h(e, t) {
            var n = this.__data__;
            return this.size += this.has(e) ? 0 : 1,
            n[e] = Bt && void 0 === t ? Ie : t,
            this
        }
        function p(e) {
            var t = -1
              , n = null == e ? 0 : e.length;
            for (this.clear(); ++t < n; ) {
                var r = e[t];
                this.set(r[0], r[1])
            }
        }
        function v() {
            this.__data__ = [],
            this.size = 0
        }
        function A(e) {
            var t = this.__data__
              , n = M(t, e);
            if (n < 0)
                return !1;
            var r = t.length - 1;
            return n == r ? t.pop() : Nt.call(t, n, 1),
            --this.size,
            !0
        }
        function g(e) {
            var t = this.__data__
              , n = M(t, e);
            return n < 0 ? void 0 : t[n][1]
        }
        function m(e) {
            return M(this.__data__, e) > -1
        }
        function y(e, t) {
            var n = this.__data__
              , r = M(n, e);
            return r < 0 ? (++this.size,
            n.push([e, t])) : n[r][1] = t,
            this
        }
        function b(e) {
            var t = -1
              , n = null == e ? 0 : e.length;
            for (this.clear(); ++t < n; ) {
                var r = e[t];
                this.set(r[0], r[1])
            }
        }
        function w() {
            this.size = 0,
            this.__data__ = {
                hash: new c,
                map: new (Wt || p),
                string: new c
            }
        }
        function S(e) {
            var t = K(this, e).delete(e);
            return this.size -= t ? 1 : 0,
            t
        }
        function x(e) {
            return K(this, e).get(e)
        }
        function E(e) {
            return K(this, e).has(e)
        }
        function _(e, t) {
            var n = K(this, e)
              , r = n.size;
            return n.set(e, t),
            this.size += n.size == r ? 0 : 1,
            this
        }
        function T(e) {
            var t = this.__data__ = new p(e);
            this.size = t.size
        }
        function I() {
            this.__data__ = new p,
            this.size = 0
        }
        function k(e) {
            var t = this.__data__
              , n = t.delete(e);
            return this.size = t.size,
            n
        }
        function Y(e) {
            return this.__data__.get(e)
        }
        function C(e) {
            return this.__data__.has(e)
        }
        function O(e, t) {
            var n = this.__data__;
            if (n instanceof p) {
                var r = n.__data__;
                if (!Wt || r.length < Te - 1)
                    return r.push([e, t]),
                    this.size = ++n.size,
                    this;
                n = this.__data__ = new b(r)
            }
            return n.set(e, t),
            this.size = n.size,
            this
        }
        function P(e, t) {
            var n = qt(e)
              , r = !n && Qt(e)
              , i = !n && !r && Jt(e)
              , a = !n && !r && !i && Xt(e)
              , s = n || r || i || a
              , c = s ? o(e.length, String) : []
              , l = c.length;
            for (var u in e)
                !t && !Et.call(e, u) || s && ("length" == u || i && ("offset" == u || "parent" == u) || a && ("buffer" == u || "byteLength" == u || "byteOffset" == u) || ne(u, l)) || c.push(u);
            return c
        }
        function j(e, t, n) {
            (void 0 === n || he(e[t], n)) && (void 0 !== n || t in e) || N(e, t, n)
        }
        function R(e, t, n) {
            var r = e[t];
            Et.call(e, t) && he(r, n) && (void 0 !== n || t in e) || N(e, t, n)
        }
        function M(e, t) {
            for (var n = e.length; n--; )
                if (he(e[n][0], t))
                    return n;
            return -1
        }
        function N(e, t, n) {
            "__proto__" == t && Ft ? Ft(e, t, {
                configurable: !0,
                enumerable: !0,
                value: n,
                writable: !0
            }) : e[t] = n
        }
        function U(e) {
            return null == e ? void 0 === e ? Ze : Ge : Ut && Ut in Object(e) ? ee(e) : ce(e)
        }
        function F(e) {
            return ye(e) && U(e) == Oe
        }
        function L(e) {
            if (!me(e) || ie(e))
                return !1;
            var t = Ae(e) ? kt : st;
            return t.test(de(e))
        }
        function V(e) {
            return ye(e) && ge(e.length) && !!lt[U(e)]
        }
        function G(e) {
            if (!me(e))
                return se(e);
            var t = ae(e)
              , n = [];
            for (var r in e)
                ("constructor" != r || !t && Et.call(e, r)) && n.push(r);
            return n
        }
        function W(e, t, n, r, o) {
            e !== t && Ht(t, function(i, a) {
                if (o || (o = new T),
                me(i))
                    B(e, t, a, n, W, r, o);
                else {
                    var s = r ? r(ue(e, a), i, a + "", e, t, o) : void 0;
                    void 0 === s && (s = i),
                    j(e, a, s)
                }
            }, Se)
        }
        function B(e, t, n, r, o, i, a) {
            var s = ue(e, n)
              , c = ue(t, n)
              , l = a.get(c);
            if (l)
                return void j(e, n, l);
            var u = i ? i(s, c, n + "", e, t, a) : void 0
              , f = void 0 === u;
            if (f) {
                var d = qt(c)
                  , h = !d && Jt(c)
                  , p = !d && !h && Xt(c);
                u = c,
                d || h || p ? qt(s) ? u = s : ve(s) ? u = Q(s) : h ? (f = !1,
                u = H(c, !0)) : p ? (f = !1,
                u = Z(c, !0)) : u = [] : be(c) || Qt(c) ? (u = s,
                Qt(s) ? u = we(s) : me(s) && !Ae(s) || (u = te(c))) : f = !1
            }
            f && (a.set(c, u),
            o(u, c, r, i, a),
            a.delete(c)),
            j(e, n, u)
        }
        function D(e, t) {
            return Zt(le(e, t, Ee), e + "")
        }
        function H(e, t) {
            if (t)
                return e.slice();
            var n = e.length
              , r = Pt ? Pt(n) : new e.constructor(n);
            return e.copy(r),
            r
        }
        function z(e) {
            var t = new e.constructor(e.byteLength);
            return new Ot(t).set(new Ot(e)),
            t
        }
        function Z(e, t) {
            var n = t ? z(e.buffer) : e.buffer;
            return new e.constructor(n,e.byteOffset,e.length)
        }
        function Q(e, t) {
            var n = -1
              , r = e.length;
            for (t || (t = Array(r)); ++n < r; )
                t[n] = e[n];
            return t
        }
        function q(e, t, n, r) {
            var o = !n;
            n || (n = {});
            for (var i = -1, a = t.length; ++i < a; ) {
                var s = t[i]
                  , c = r ? r(n[s], e[s], s, n, e) : void 0;
                void 0 === c && (c = e[s]),
                o ? N(n, s, c) : R(n, s, c)
            }
            return n
        }
        function J(e) {
            return D(function(t, n) {
                var r = -1
                  , o = n.length
                  , i = o > 1 ? n[o - 1] : void 0
                  , a = o > 2 ? n[2] : void 0;
                for (i = e.length > 3 && "function" == typeof i ? (o--,
                i) : void 0,
                a && re(n[0], n[1], a) && (i = o < 3 ? void 0 : i,
                o = 1),
                t = Object(t); ++r < o; ) {
                    var s = n[r];
                    s && e(t, s, r, i)
                }
                return t
            })
        }
        function X(e) {
            return function(t, n, r) {
                for (var o = -1, i = Object(t), a = r(t), s = a.length; s--; ) {
                    var c = a[e ? s : ++o];
                    if (n(i[c], c, i) === !1)
                        break
                }
                return t
            }
        }
        function K(e, t) {
            var n = e.__data__;
            return oe(t) ? n["string" == typeof t ? "string" : "hash"] : n.map
        }
        function $(e, t) {
            var n = a(e, t);
            return L(n) ? n : void 0
        }
        function ee(e) {
            var t = Et.call(e, Ut)
              , n = e[Ut];
            try {
                e[Ut] = void 0;
                var r = !0
            } catch (e) {}
            var o = Tt.call(e);
            return r && (t ? e[Ut] = n : delete e[Ut]),
            o
        }
        function te(e) {
            return "function" != typeof e.constructor || ae(e) ? {} : Dt(jt(e))
        }
        function ne(e, t) {
            var n = typeof e;
            return t = null == t ? Ce : t,
            !!t && ("number" == n || "symbol" != n && ct.test(e)) && e > -1 && e % 1 == 0 && e < t
        }
        function re(e, t, n) {
            if (!me(n))
                return !1;
            var r = typeof t;
            return !!("number" == r ? pe(n) && ne(t, n.length) : "string" == r && t in n) && he(n[t], e)
        }
        function oe(e) {
            var t = typeof e;
            return "string" == t || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== e : null === e
        }
        function ie(e) {
            return !!_t && _t in e
        }
        function ae(e) {
            var t = e && e.constructor
              , n = "function" == typeof t && t.prototype || wt;
            return e === n
        }
        function se(e) {
            var t = [];
            if (null != e)
                for (var n in Object(e))
                    t.push(n);
            return t
        }
        function ce(e) {
            return Tt.call(e)
        }
        function le(e, t, n) {
            return t = Vt(void 0 === t ? e.length - 1 : t, 0),
            function() {
                for (var o = arguments, i = -1, a = Vt(o.length - t, 0), s = Array(a); ++i < a; )
                    s[i] = o[t + i];
                i = -1;
                for (var c = Array(t + 1); ++i < t; )
                    c[i] = o[i];
                return c[t] = n(s),
                r(e, this, c)
            }
        }
        function ue(e, t) {
            if (("constructor" !== t || "function" != typeof e[t]) && "__proto__" != t)
                return e[t]
        }
        function fe(e) {
            var t = 0
              , n = 0;
            return function() {
                var r = Gt()
                  , o = Ye - (r - n);
                if (n = r,
                o > 0) {
                    if (++t >= ke)
                        return arguments[0]
                } else
                    t = 0;
                return e.apply(void 0, arguments)
            }
        }
        function de(e) {
            if (null != e) {
                try {
                    return xt.call(e)
                } catch (e) {}
                try {
                    return e + ""
                } catch (e) {}
            }
            return ""
        }
        function he(e, t) {
            return e === t || e !== e && t !== t
        }
        function pe(e) {
            return null != e && ge(e.length) && !Ae(e)
        }
        function ve(e) {
            return ye(e) && pe(e)
        }
        function Ae(e) {
            if (!me(e))
                return !1;
            var t = U(e);
            return t == Ue || t == Fe || t == je || t == Be
        }
        function ge(e) {
            return "number" == typeof e && e > -1 && e % 1 == 0 && e <= Ce
        }
        function me(e) {
            var t = typeof e;
            return null != e && ("object" == t || "function" == t)
        }
        function ye(e) {
            return null != e && "object" == typeof e
        }
        function be(e) {
            if (!ye(e) || U(e) != We)
                return !1;
            var t = jt(e);
            if (null === t)
                return !0;
            var n = Et.call(t, "constructor") && t.constructor;
            return "function" == typeof n && n instanceof n && xt.call(n) == It
        }
        function we(e) {
            return q(e, Se(e))
        }
        function Se(e) {
            return pe(e) ? P(e, !0) : G(e)
        }
        function xe(e) {
            return function() {
                return e
            }
        }
        function Ee(e) {
            return e
        }
        function _e() {
            return !1
        }
        var Te = 200
          , Ie = "__lodash_hash_undefined__"
          , ke = 800
          , Ye = 16
          , Ce = 9007199254740991
          , Oe = "[object Arguments]"
          , Pe = "[object Array]"
          , je = "[object AsyncFunction]"
          , Re = "[object Boolean]"
          , Me = "[object Date]"
          , Ne = "[object Error]"
          , Ue = "[object Function]"
          , Fe = "[object GeneratorFunction]"
          , Le = "[object Map]"
          , Ve = "[object Number]"
          , Ge = "[object Null]"
          , We = "[object Object]"
          , Be = "[object Proxy]"
          , De = "[object RegExp]"
          , He = "[object Set]"
          , ze = "[object String]"
          , Ze = "[object Undefined]"
          , Qe = "[object WeakMap]"
          , qe = "[object ArrayBuffer]"
          , Je = "[object DataView]"
          , Xe = "[object Float32Array]"
          , Ke = "[object Float64Array]"
          , $e = "[object Int8Array]"
          , et = "[object Int16Array]"
          , tt = "[object Int32Array]"
          , nt = "[object Uint8Array]"
          , rt = "[object Uint8ClampedArray]"
          , ot = "[object Uint16Array]"
          , it = "[object Uint32Array]"
          , at = /[\\^$.*+?()[\]{}|]/g
          , st = /^\[object .+?Constructor\]$/
          , ct = /^(?:0|[1-9]\d*)$/
          , lt = {};
        lt[Xe] = lt[Ke] = lt[$e] = lt[et] = lt[tt] = lt[nt] = lt[rt] = lt[ot] = lt[it] = !0,
        lt[Oe] = lt[Pe] = lt[qe] = lt[Re] = lt[Je] = lt[Me] = lt[Ne] = lt[Ue] = lt[Le] = lt[Ve] = lt[We] = lt[De] = lt[He] = lt[ze] = lt[Qe] = !1;
        var ut = "object" == typeof e && e && e.Object === Object && e
          , ft = "object" == typeof self && self && self.Object === Object && self
          , dt = ut || ft || Function("return this")()
          , ht = "object" == typeof t && t && !t.nodeType && t
          , pt = ht && "object" == typeof n && n && !n.nodeType && n
          , vt = pt && pt.exports === ht
          , At = vt && ut.process
          , gt = function() {
            try {
                var e = pt && pt.require && pt.require("util").types;
                return e ? e : At && At.binding && At.binding("util")
            } catch (e) {}
        }()
          , mt = gt && gt.isTypedArray
          , yt = Array.prototype
          , bt = Function.prototype
          , wt = Object.prototype
          , St = dt["__core-js_shared__"]
          , xt = bt.toString
          , Et = wt.hasOwnProperty
          , _t = function() {
            var e = /[^.]+$/.exec(St && St.keys && St.keys.IE_PROTO || "");
            return e ? "Symbol(src)_1." + e : ""
        }()
          , Tt = wt.toString
          , It = xt.call(Object)
          , kt = RegExp("^" + xt.call(Et).replace(at, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$")
          , Yt = vt ? dt.Buffer : void 0
          , Ct = dt.Symbol
          , Ot = dt.Uint8Array
          , Pt = Yt ? Yt.allocUnsafe : void 0
          , jt = s(Object.getPrototypeOf, Object)
          , Rt = Object.create
          , Mt = wt.propertyIsEnumerable
          , Nt = yt.splice
          , Ut = Ct ? Ct.toStringTag : void 0
          , Ft = function() {
            try {
                var e = $(Object, "defineProperty");
                return e({}, "", {}),
                e
            } catch (e) {}
        }()
          , Lt = Yt ? Yt.isBuffer : void 0
          , Vt = Math.max
          , Gt = Date.now
          , Wt = $(dt, "Map")
          , Bt = $(Object, "create")
          , Dt = function() {
            function e() {}
            return function(t) {
                if (!me(t))
                    return {};
                if (Rt)
                    return Rt(t);
                e.prototype = t;
                var n = new e;
                return e.prototype = void 0,
                n
            }
        }();
        c.prototype.clear = l,
        c.prototype.delete = u,
        c.prototype.get = f,
        c.prototype.has = d,
        c.prototype.set = h,
        p.prototype.clear = v,
        p.prototype.delete = A,
        p.prototype.get = g,
        p.prototype.has = m,
        p.prototype.set = y,
        b.prototype.clear = w,
        b.prototype.delete = S,
        b.prototype.get = x,
        b.prototype.has = E,
        b.prototype.set = _,
        T.prototype.clear = I,
        T.prototype.delete = k,
        T.prototype.get = Y,
        T.prototype.has = C,
        T.prototype.set = O;
        var Ht = X()
          , zt = Ft ? function(e, t) {
            return Ft(e, "toString", {
                configurable: !0,
                enumerable: !1,
                value: xe(t),
                writable: !0
            })
        }
        : Ee
          , Zt = fe(zt)
          , Qt = F(function() {
            return arguments
        }()) ? F : function(e) {
            return ye(e) && Et.call(e, "callee") && !Mt.call(e, "callee")
        }
          , qt = Array.isArray
          , Jt = Lt || _e
          , Xt = mt ? i(mt) : V
          , Kt = J(function(e, t, n) {
            W(e, t, n)
        });
        n.exports = Kt
    }
    ).call(t, function() {
        return this
    }(), n(113)(e))
}
, function(e, t) {
    e.exports = function(e) {
        return e.webpackPolyfill || (e.deprecate = function() {}
        ,
        e.paths = [],
        e.children = [],
        e.webpackPolyfill = 1),
        e
    }
}
, function(e, t, n) {
    "use strict";
    var r = n(78);
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.default = void 0;
    var o = r(n(115))
      , i = !1
      , a = n(132)
      , s = a.OggVideo
      , c = a.Mp4Video
      , l = function() {
        return new o.default(function(e, t) {
            if ("resolve" === i)
                return void e("resolved for debugging");
            if ("reject" === i)
                return void t("rejected for debugging");
            var n = document.createElement("video");
            n.autoplay = !0,
            n.setAttribute("autoplay", !0),
            n.muted = !0,
            n.setAttribute("muted", !0),
            n.playsinline = !0,
            n.setAttribute("playsinline", !0),
            n.volume = 0,
            n.setAttribute("data-is-playing", "false"),
            n.setAttribute("style", "width: 1px; height: 1px; position: fixed; top: 0; left: 0; z-index: 100;"),
            document.body.appendChild(n);
            var r = null
              , o = function() {
                r && (clearTimeout(r),
                r = null);
                try {
                    document.body.removeChild(n)
                } catch (e) {
                    return
                }
            };
            try {
                if (n.canPlayType('video/ogg; codecs="theora"').match(/^(probably)|(maybe)/))
                    n.src = s;
                else {
                    if (!n.canPlayType('video/mp4; codecs="avc1.42E01E"').match(/^(probably)|(maybe)/))
                        return o(),
                        void t("no autoplay: element does not support mp4 or ogg format");
                    n.src = c
                }
            } catch (e) {
                return o(),
                void t("no autoplay: " + e)
            }
            n.addEventListener("play", function() {
                n.setAttribute("data-is-playing", "true"),
                r = setTimeout(function() {
                    o(),
                    t("no autoplay: unsure")
                }, 3e3)
            }),
            n.addEventListener("canplay", function() {
                return "true" === n.getAttribute("data-is-playing") ? (o(),
                e("autoplay supported"),
                !0) : (o(),
                t("no autoplay: browser does not support autoplay"),
                !1)
            }),
            n.load(),
            n.play()
        }
        )
    }
      , u = l;
    t.default = u,
    e.exports = t.default
}
, function(e, t, n) {
    e.exports = n(116)
}
, function(e, t, n) {
    n(102),
    n(9),
    n(106),
    n(117),
    n(130),
    n(131),
    e.exports = n(17).Promise
}
, function(e, t, n) {
    "use strict";
    var r, o, i, a, s = n(14), c = n(16), l = n(18), u = n(58), f = n(15), d = n(23), h = n(19), p = n(118), v = n(119), A = n(120), g = n(121).set, m = n(123)(), y = n(124), b = n(125), w = n(126), S = n(127), x = "Promise", E = c.TypeError, _ = c.process, T = _ && _.versions, I = T && T.v8 || "", k = c[x], Y = "process" == u(_), C = function() {}, O = o = y.f, P = !!function() {
        try {
            var e = k.resolve(1)
              , t = (e.constructor = {})[n(50)("species")] = function(e) {
                e(C, C)
            }
            ;
            return (Y || "function" == typeof PromiseRejectionEvent) && e.then(C)instanceof t && 0 !== I.indexOf("6.6") && w.indexOf("Chrome/66") === -1
        } catch (e) {}
    }(), j = function(e) {
        var t;
        return !(!d(e) || "function" != typeof (t = e.then)) && t
    }, R = function(e, t) {
        if (!e._n) {
            e._n = !0;
            var n = e._c;
            m(function() {
                for (var r = e._v, o = 1 == e._s, i = 0, a = function(t) {
                    var n, i, a, s = o ? t.ok : t.fail, c = t.resolve, l = t.reject, u = t.domain;
                    try {
                        s ? (o || (2 == e._h && U(e),
                        e._h = 1),
                        s === !0 ? n = r : (u && u.enter(),
                        n = s(r),
                        u && (u.exit(),
                        a = !0)),
                        n === t.promise ? l(E("Promise-chain cycle")) : (i = j(n)) ? i.call(n, c, l) : c(n)) : l(r)
                    } catch (e) {
                        u && !a && u.exit(),
                        l(e)
                    }
                }; n.length > i; )
                    a(n[i++]);
                e._c = [],
                e._n = !1,
                t && !e._h && M(e)
            })
        }
    }, M = function(e) {
        g.call(c, function() {
            var t, n, r, o = e._v, i = N(e);
            if (i && (t = b(function() {
                Y ? _.emit("unhandledRejection", o, e) : (n = c.onunhandledrejection) ? n({
                    promise: e,
                    reason: o
                }) : (r = c.console) && r.error && r.error("Unhandled promise rejection", o)
            }),
            e._h = Y || N(e) ? 2 : 1),
            e._a = void 0,
            i && t.e)
                throw t.v
        })
    }, N = function(e) {
        return 1 !== e._h && 0 === (e._a || e._c).length
    }, U = function(e) {
        g.call(c, function() {
            var t;
            Y ? _.emit("rejectionHandled", e) : (t = c.onrejectionhandled) && t({
                promise: e,
                reason: e._v
            })
        })
    }, F = function(e) {
        var t = this;
        t._d || (t._d = !0,
        t = t._w || t,
        t._v = e,
        t._s = 2,
        t._a || (t._a = t._c.slice()),
        R(t, !0))
    }, L = function(e) {
        var t, n = this;
        if (!n._d) {
            n._d = !0,
            n = n._w || n;
            try {
                if (n === e)
                    throw E("Promise can't be resolved itself");
                (t = j(e)) ? m(function() {
                    var r = {
                        _w: n,
                        _d: !1
                    };
                    try {
                        t.call(e, l(L, r, 1), l(F, r, 1))
                    } catch (e) {
                        F.call(r, e)
                    }
                }) : (n._v = e,
                n._s = 1,
                R(n, !1))
            } catch (e) {
                F.call({
                    _w: n,
                    _d: !1
                }, e)
            }
        }
    };
    P || (k = function(e) {
        p(this, k, x, "_h"),
        h(e),
        r.call(this);
        try {
            e(l(L, this, 1), l(F, this, 1))
        } catch (e) {
            F.call(this, e)
        }
    }
    ,
    r = function(e) {
        this._c = [],
        this._a = void 0,
        this._s = 0,
        this._d = !1,
        this._v = void 0,
        this._h = 0,
        this._n = !1
    }
    ,
    r.prototype = n(128)(k.prototype, {
        then: function(e, t) {
            var n = O(A(this, k));
            return n.ok = "function" != typeof e || e,
            n.fail = "function" == typeof t && t,
            n.domain = Y ? _.domain : void 0,
            this._c.push(n),
            this._a && this._a.push(n),
            this._s && R(this, !1),
            n.promise
        },
        catch: function(e) {
            return this.then(void 0, e)
        }
    }),
    i = function() {
        var e = new r;
        this.promise = e,
        this.resolve = l(L, e, 1),
        this.reject = l(F, e, 1)
    }
    ,
    y.f = O = function(e) {
        return e === k || e === a ? new i(e) : o(e)
    }
    ),
    f(f.G + f.W + f.F * !P, {
        Promise: k
    }),
    n(49)(k, x),
    n(129)(x),
    a = n(17)[x],
    f(f.S + f.F * !P, x, {
        reject: function(e) {
            var t = O(this)
              , n = t.reject;
            return n(e),
            t.promise
        }
    }),
    f(f.S + f.F * (s || !P), x, {
        resolve: function(e) {
            return S(s && this === a ? k : this, e)
        }
    }),
    f(f.S + f.F * !(P && n(59)(function(e) {
        k.all(e).catch(C)
    })), x, {
        all: function(e) {
            var t = this
              , n = O(t)
              , r = n.resolve
              , o = n.reject
              , i = b(function() {
                var n = []
                  , i = 0
                  , a = 1;
                v(e, !1, function(e) {
                    var s = i++
                      , c = !1;
                    n.push(void 0),
                    a++,
                    t.resolve(e).then(function(e) {
                        c || (c = !0,
                        n[s] = e,
                        --a || r(n))
                    }, o)
                }),
                --a || r(n)
            });
            return i.e && o(i.v),
            n.promise
        },
        race: function(e) {
            var t = this
              , n = O(t)
              , r = n.reject
              , o = b(function() {
                v(e, !1, function(e) {
                    t.resolve(e).then(n.resolve, r)
                })
            });
            return o.e && r(o.v),
            n.promise
        }
    })
}
, function(e, t) {
    e.exports = function(e, t, n, r) {
        if (!(e instanceof t) || void 0 !== r && r in e)
            throw TypeError(n + ": incorrect invocation!");
        return e
    }
}
, function(e, t, n) {
    var r = n(18)
      , o = n(54)
      , i = n(55)
      , a = n(22)
      , s = n(42)
      , c = n(57)
      , l = {}
      , u = {}
      , t = e.exports = function(e, t, n, f, d) {
        var h, p, v, A, g = d ? function() {
            return e
        }
        : c(e), m = r(n, f, t ? 2 : 1), y = 0;
        if ("function" != typeof g)
            throw TypeError(e + " is not iterable!");
        if (i(g)) {
            for (h = s(e.length); h > y; y++)
                if (A = t ? m(a(p = e[y])[0], p[1]) : m(e[y]),
                A === l || A === u)
                    return A
        } else
            for (v = g.call(e); !(p = v.next()).done; )
                if (A = o(v, m, p.value, t),
                A === l || A === u)
                    return A
    }
    ;
    t.BREAK = l,
    t.RETURN = u
}
, function(e, t, n) {
    var r = n(22)
      , o = n(19)
      , i = n(50)("species");
    e.exports = function(e, t) {
        var n, a = r(e).constructor;
        return void 0 === a || void 0 == (n = r(a)[i]) ? t : o(n)
    }
}
, function(e, t, n) {
    var r, o, i, a = n(18), s = n(122), c = n(48), l = n(27), u = n(16), f = u.process, d = u.setImmediate, h = u.clearImmediate, p = u.MessageChannel, v = u.Dispatch, A = 0, g = {}, m = "onreadystatechange", y = function() {
        var e = +this;
        if (g.hasOwnProperty(e)) {
            var t = g[e];
            delete g[e],
            t()
        }
    }, b = function(e) {
        y.call(e.data)
    };
    d && h || (d = function(e) {
        for (var t = [], n = 1; arguments.length > n; )
            t.push(arguments[n++]);
        return g[++A] = function() {
            s("function" == typeof e ? e : Function(e), t)
        }
        ,
        r(A),
        A
    }
    ,
    h = function(e) {
        delete g[e]
    }
    ,
    "process" == n(40)(f) ? r = function(e) {
        f.nextTick(a(y, e, 1))
    }
    : v && v.now ? r = function(e) {
        v.now(a(y, e, 1))
    }
    : p ? (o = new p,
    i = o.port2,
    o.port1.onmessage = b,
    r = a(i.postMessage, i, 1)) : u.addEventListener && "function" == typeof postMessage && !u.importScripts ? (r = function(e) {
        u.postMessage(e + "", "*")
    }
    ,
    u.addEventListener("message", b, !1)) : r = m in l("script") ? function(e) {
        c.appendChild(l("script"))[m] = function() {
            c.removeChild(this),
            y.call(e)
        }
    }
    : function(e) {
        setTimeout(a(y, e, 1), 0)
    }
    ),
    e.exports = {
        set: d,
        clear: h
    }
}
, function(e, t) {
    e.exports = function(e, t, n) {
        var r = void 0 === n;
        switch (t.length) {
        case 0:
            return r ? e() : e.call(n);
        case 1:
            return r ? e(t[0]) : e.call(n, t[0]);
        case 2:
            return r ? e(t[0], t[1]) : e.call(n, t[0], t[1]);
        case 3:
            return r ? e(t[0], t[1], t[2]) : e.call(n, t[0], t[1], t[2]);
        case 4:
            return r ? e(t[0], t[1], t[2], t[3]) : e.call(n, t[0], t[1], t[2], t[3])
        }
        return e.apply(n, t)
    }
}
, function(e, t, n) {
    var r = n(16)
      , o = n(121).set
      , i = r.MutationObserver || r.WebKitMutationObserver
      , a = r.process
      , s = r.Promise
      , c = "process" == n(40)(a);
    e.exports = function() {
        var e, t, n, l = function() {
            var r, o;
            for (c && (r = a.domain) && r.exit(); e; ) {
                o = e.fn,
                e = e.next;
                try {
                    o()
                } catch (r) {
                    throw e ? n() : t = void 0,
                    r
                }
            }
            t = void 0,
            r && r.enter()
        };
        if (c)
            n = function() {
                a.nextTick(l)
            }
            ;
        else if (!i || r.navigator && r.navigator.standalone)
            if (s && s.resolve) {
                var u = s.resolve(void 0);
                n = function() {
                    u.then(l)
                }
            } else
                n = function() {
                    o.call(r, l)
                }
                ;
        else {
            var f = !0
              , d = document.createTextNode("");
            new i(l).observe(d, {
                characterData: !0
            }),
            n = function() {
                d.data = f = !f
            }
        }
        return function(r) {
            var o = {
                fn: r,
                next: void 0
            };
            t && (t.next = o),
            e || (e = o,
            n()),
            t = o
        }
    }
}
, function(e, t, n) {
    "use strict";
    function r(e) {
        var t, n;
        this.promise = new e(function(e, r) {
            if (void 0 !== t || void 0 !== n)
                throw TypeError("Bad Promise constructor");
            t = e,
            n = r
        }
        ),
        this.resolve = o(t),
        this.reject = o(n)
    }
    var o = n(19);
    e.exports.f = function(e) {
        return new r(e)
    }
}
, function(e, t) {
    e.exports = function(e) {
        try {
            return {
                e: !1,
                v: e()
            }
        } catch (e) {
            return {
                e: !0,
                v: e
            }
        }
    }
}
, function(e, t, n) {
    var r = n(16)
      , o = r.navigator;
    e.exports = o && o.userAgent || ""
}
, function(e, t, n) {
    var r = n(22)
      , o = n(23)
      , i = n(124);
    e.exports = function(e, t) {
        if (r(e),
        o(t) && t.constructor === e)
            return t;
        var n = i.f(e)
          , a = n.resolve;
        return a(t),
        n.promise
    }
}
, function(e, t, n) {
    var r = n(20);
    e.exports = function(e, t, n) {
        for (var o in t)
            n && e[o] ? e[o] = t[o] : r(e, o, t[o]);
        return e
    }
}
, function(e, t, n) {
    "use strict";
    var r = n(16)
      , o = n(17)
      , i = n(21)
      , a = n(25)
      , s = n(50)("species");
    e.exports = function(e) {
        var t = "function" == typeof o[e] ? o[e] : r[e];
        a && t && !t[s] && i.f(t, s, {
            configurable: !0,
            get: function() {
                return this
            }
        })
    }
}
, function(e, t, n) {
    "use strict";
    var r = n(15)
      , o = n(17)
      , i = n(16)
      , a = n(120)
      , s = n(127);
    r(r.P + r.R, "Promise", {
        finally: function(e) {
            var t = a(this, o.Promise || i.Promise)
              , n = "function" == typeof e;
            return this.then(n ? function(n) {
                return s(t, e()).then(function() {
                    return n
                })
            }
            : e, n ? function(n) {
                return s(t, e()).then(function() {
                    throw n
                })
            }
            : e)
        }
    })
}
, function(e, t, n) {
    "use strict";
    var r = n(15)
      , o = n(124)
      , i = n(125);
    r(r.S, "Promise", {
        try: function(e) {
            var t = o.f(this)
              , n = i(e);
            return (n.e ? t.reject : t.resolve)(n.v),
            t.promise
        }
    })
}
, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.Mp4Video = t.OggVideo = void 0;
    var n = "data:video/ogg;base64,T2dnUwACAAAAAAAAAACJKus1AAAAAG23PX8BKoB0aGVvcmEDAgEAAgACAAAgAAAgAAAAAAABAAAAAgAAAQAAAQAAAABIwE9nZ1MAAAAAAAAAAAAAiSrrNQEAAABfcVt2DtP///////////////+QgXRoZW9yYQwAAABMYXZmNjAuMy4xMDAHAAAADAAAAGxhbmd1YWdlPXVuZBkAAABoYW5kbGVyX25hbWU9VmlkZW9IYW5kbGVyFgAAAHZlbmRvcl9pZD1bMF1bMF1bMF1bMF0eAAAAZW5jb2Rlcj1MYXZjNjAuMy4xMDAgbGlidGhlb3JhEAAAAG1ham9yX2JyYW5kPWlzb20RAAAAbWlub3JfdmVyc2lvbj01MTIiAAAAY29tcGF0aWJsZV9icmFuZHM9aXNvbWlzbzJhdmMxbXA0MYJ0aGVvcmG+zSj3uc1rGLWpSUoQc5zmMYxSlKQhCDGMYhCEIQhAAAAAAAAAAAAAEW2uU2eSyPxWEvx4OVts5ir1aKtUKBMpJFoQ/nk5m41mUwl4slUpk4kkghkIfDwdjgajQYC8VioUCQRiIQh8PBwMhgLBQIg4FRba5TZ5LI/FYS/Hg5W2zmKvVoq1QoEykkWhD+eTmbjWZTCXiyVSmTiSSCGQh8PB2OBqNBgLxWKhQJBGIhCHw8HAyGAsFAiDgUCw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDAwPEhQUFQ0NDhESFRUUDg4PEhQVFRUOEBETFBUVFRARFBUVFRUVEhMUFRUVFRUUFRUVFRUVFRUVFRUVFRUVEAwLEBQZGxwNDQ4SFRwcGw4NEBQZHBwcDhATFhsdHRwRExkcHB4eHRQYGxwdHh4dGxwdHR4eHh4dHR0dHh4eHRALChAYKDM9DAwOExo6PDcODRAYKDlFOA4RFh0zV1A+EhYlOkRtZ00YIzdAUWhxXDFATldneXhlSFxfYnBkZ2MTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTEhIVGRoaGhoSFBYaGhoaGhUWGRoaGhoaGRoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhESFh8kJCQkEhQYIiQkJCQWGCEkJCQkJB8iJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQREhgvY2NjYxIVGkJjY2NjGBo4Y2NjY2MvQmNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRISEhUXGBkbEhIVFxgZGxwSFRcYGRscHRUXGBkbHB0dFxgZGxwdHR0YGRscHR0dHhkbHB0dHR4eGxwdHR0eHh4REREUFxocIBERFBcaHCAiERQXGhwgIiUUFxocICIlJRcaHCAiJSUlGhwgIiUlJSkcICIlJSUpKiAiJSUlKSoqEBAQFBgcICgQEBQYHCAoMBAUGBwgKDBAFBgcICgwQEAYHCAoMEBAQBwgKDBAQEBgICgwQEBAYIAoMEBAQGCAgAfF5cdH1e3Ow/L66wGmYnfIUbwdUTe3LMRbqON8B+5RJEvcGxkvrVUjTMrsXYhAnIwe0dTJfOYbWrDYyqUrz7dw/JO4hpmV2LsQQvkUeGq1BsZLx+cu5iV0e0eScJ91VIQYrmqfdVSK7GgjOU0oPaPOu5IcDK1mNvnD+K8LwS87f8Jx2mHtHnUkTGAurWZlNQa74ZLSFH9oF6FPGxzLsjQO5Qe0edcpttd7BXBSqMCL4k/4tFrHIPuEQ7m1/uIWkbDMWVoDdOSuRQ9286kvVUlQjzOE6VrNguN4oRXYGkgcnih7t13/9kxvLYKQezwLTrO44sVmMPgMqORo1E0sm1/9SludkcWHwfJwTSybR4LeAz6ugWVgRaY8mV/9SluQmtHrzsBtRF/wPY+X0JuYTs+ltgrXAmlk10xQHmTu9VSIAk1+vcvU4ml2oNzrNhEtQ3CysNP8UeR35wqpKUBdGdZMSjX4WVi8nJpdpHnbhzEIdx7mwf6W1FKAiucMXrWUWVjyRf23chNtR9mIzDoT/6ZLYailAjhFlZuvPtSeZ+2oREubDoWmT3TguY+JHPdRVSLKxfKH3vgNqJ/9emeEYikGXDFNzaLjvTeGAL61mogOoeG3y6oU4rW55ydoj0lUTSR/mmRhPmF86uwIfzp3FtiufQCmppaHDlGE0r2iTzXIw3zBq5hvaTldjG4CPb9wdxAme0SyedVKczJ9AtYbgPOzYKJvZZImsN7ecrxWZg5dR6ZLj/j4qpWsIA+vYwE+Tca9ounMIsrXMB4Stiib2SPQtZv+FVIpfEbzv8ncZoLBXc3YBqTG1HsskTTotZOYTG+oVUjLk6zhP8bg4RhMUNtfZdO7FdpBuXzhJ5Fh8IKlJG7wtD9ik8rWOJxy6iQ3NwzBpQ219mlyv+FLicYs2iJGSE0u2txzed++D61ZWCiHD/cZdQVCqkO2gJpdpNaObhnDfAPrT89RxdWFZ5hO3MseBSIlANppdZNIV/Rwe5eLTDvkfWKzFnH+QJ7m9QWV1KdwnuIwTNtZdJMoXBf74OhRnh2t+OTGL+AVUnIkyYY+QG7g9itHXyF3OIygG2s2kud679ZWKqSFa9n3IHD6MeLv1lZ0XyduRhiDRtrNnKoyiFVLcBm0ba5Yy3fQkDh4XsFE34isVpOzpa9nR8iCpS4HoxG2rJpnRhf3YboVa1PcRouh5LIJv/uQcPNd095ickTaiGBnWLKVWRc0OnYTSyex/n2FofEPnDG8y3PztHrzOLK1xo6RAml2k9owKajOC0Wr4D5x+3nA0UEhK2m198wuBHF3zlWWVKWLN1CHzLClUfuoYBcx4b1llpeBKmbayaR58njtE9onD66lUcsg0Spm2snsb+8HaJRn4dYcLbCuBuYwziB8/5U1C1DOOz2gZjSZtrLJk6vrLF3hwY4Io9xuT/ruUFRSBkNtUzTOWhjh26irLEPx4jPZL3Fo3QrReoGTTM21xYTT9oFdhTUIvjqTkfkvt0bzgVUjq/hOYY8j60IaO/0AzRBtqkTS6R5ellZd5uKdzzhb8BFlDdAcrwkE0rbXTOPB+7Y0FlZO96qFL4Ykg21StJs8qIW7h16H5hGiv8V2Cflau7QVDepTAHa6Lgt6feiEvJDM21StJsmOH/hynURrKxvUpQ8BH0JF7BiyG2qZpnL/7AOU66gt+reLEXY8pVOCQvSsBtqZTNM8bk9ohRcwD18o/WVkbvrceVKRb9I59IEKysjBeTMmmbA21xu/6iHadLRxuIzkLpi8wZYmmbbWi32RVAUjruxWlJ//iFxE38FI9hNKOoCdhwf5fDe4xZ81lgREhK2m1j78vW1CqkuMu/AjBNK210kzRUX/B+69cMMUG5bYrIeZxVSEZISmkzbXOi9yxwIfPgdsov7R71xuJ7rFcACjG/9PzApqFq7wEgzNJm2suWESPuwrQvejj7cbnQxMkxpm21lUYJL0fKmogPPqywn7e3FvB/FCNxPJ85iVUkCE9/tLKx31G4CgNtWTTPFhMvlu8G4/TrgaZttTChljfNJGgOT2X6EqpETy2tYd9cCBI4lIXJ1/3uVUllZEJz4baqGF64yxaZ+zPLYwde8Uqn1oKANtUrSaTOPHkhvuQP3bBlEJ/LFe4pqQOHUI8T8q7AXx3fLVBgSCVpMba55YxN3rv8U1Dv51bAPSOLlZWebkL8vSMGI21lJmmeVxPRwFlZF1CpqCN8uLwymaZyjbXHCRytogPN3o/n74CNykfT+qqRv5AQlHcRxYrC5KvGmbbUwmZY/29BvF6C1/93x4WVglXDLFpmbapmF89HKTogRwqqSlGbu+oiAkcWFbklC6Zhf+NtTLFpn8oWz+HsNRVSgIxZWON+yVyJlE5tq/+GWLTMutYX9ekTySEQPLVNQQ3OfycwJBM0zNtZcse7CvcKI0V/zh16Dr9OSA21MpmmcrHC+6pTAPHPwoit3LHHqs7jhFNRD6W8+EBGoSEoaZttTCZljfduH/fFisn+dRBGAZYtMzbVMwvul/T/crK1NQh8gN0SRRa9cOux6clC0/mDLFpmbarmF8/e6CopeOLCNW6S/IUUg3jJIYiAcDoMcGeRbOvuTPjXR/tyo79LK3kqqkbxkkMRAOB0GODPItnX3Jnxro/25Ud+llbyVVSN4ySGIgHA6DHBnkWzr7kz410f7cqO/Syt5KqpFVJwn6gBEvBM0zNtZcpGOEPiysW8vvRd2R0f7gtjhqUvXL+gWVwHm4XJDBiMpmmZtrLfPwd/IugP5+fKVSysH1EXreFAcEhelGmbbUmZY4Xdo1vQWVnK19P4RuEnbf0gQnR+lDCZlivNM22t1ESmopPIgfT0duOfQrsjgG4tPxli0zJmF5trdL1JDUIUT1ZXSqQDeR4B8mX3TrRro/2McGeUvLtwo6jIEKMkCUXWsLyZROd9P/rFYNtXPBli0z398iVUlVKAjFlY437JXImUTm2r/4ZYtMy61hf16RPJIU9nZ1MABEAAAAAAAAAAiSrrNQIAAAAgDen8AQwSkWxHoqCAAfZ6AAA=";
    t.OggVideo = n;
    var r = "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMjYwMSBhMGNkN2QzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNSAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTEgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEwIHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAD2WIhAA3//728P4FNjuZQQAAAu5tb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAZAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACGHRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAgAAAAIAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAGQAAAAAAAEAAAAAAZBtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAACgAAAAEAFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAE7bWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAA+3N0YmwAAACXc3RzZAAAAAAAAAABAAAAh2F2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAgACAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwFkAAr/4QAYZ2QACqzZX4iIhAAAAwAEAAADAFA8SJZYAQAGaOvjyyLAAAAAGHN0dHMAAAAAAAAAAQAAAAEAAAQAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAABRzdHN6AAAAAAAAAsUAAAABAAAAFHN0Y28AAAAAAAAAAQAAADAAAABidWR0YQAAAFptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAAC1pbHN0AAAAJal0b28AAAAdZGF0YQAAAAEAAAAATGF2ZjU2LjQwLjEwMQ==";
    t.Mp4Video = r
}
, function(e, t, n) {
    "use strict";
    var r = n(78);
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.initializeVimeoPlayer = t.initializeVimeoAPI = void 0;
    var o, i = r(n(115)), a = r(n(134)), s = n(136), c = n(141), l = "*", u = null, f = function() {
        return new i.default(function(e, t) {
            e("no api needed")
        }
        )
    };
    t.initializeVimeoAPI = f;
    var d = function(e, t) {
        var n = {
            method: e
        };
        t && (n.value = t);
        var r = (0,
        a.default)(n);
        o.ownerDocument.defaultView.eval("(function(playerIframe){ playerIframe.contentWindow.postMessage(" + r + ", " + (0,
        a.default)(l) + ") })")(o)
    }
      , h = function(e) {
        var t = e.win
          , n = e.instance
          , r = e.container
          , a = e.videoId
          , f = e.startTime
          , h = e.readyCallback
          , p = e.stateChangeCallback;
        return new i.default(function(e, i) {
            var v = n.logger || function() {}
            ;
            o = t.document.createElement("iframe"),
            o.id = "vimeoplayer";
            var A = "&background=1";
            o.src = "//player.vimeo.com/video/" + a + "?api=1" + A;
            var g = (0,
            s.getPlayerElement)(r);
            g.appendChild(o);
            var m = {
                iframe: o,
                setPlaybackRate: function() {}
            };
            e(m);
            var y = function() {
                d("getDuration"),
                d("getVideoHeight"),
                d("getVideoWidth")
            }
              , b = null
              , w = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                (e || m.dimensions.width && m.dimensions.height && m.duration) && (e && y(),
                m.dimensions.width = m.dimensions.width || m.iframe.parentNode.offsetWidth,
                m.dimensions.height = m.dimensions.height || m.iframe.parentNode.offsetHeight,
                m.duration = m.duration || 10,
                d("setVolume", "0"),
                d("setLoop", "true"),
                d("seekTo", f),
                d("addEventListener", "playProgress"),
                h(m))
            }
              , S = function() {
                u && (clearTimeout(u),
                u = null),
                m.dimensions || (m.dimensions = {},
                y(),
                p("buffering"),
                b = setTimeout(function() {
                    v.call(n, "retrying"),
                    w(!0)
                }, .75 * c.TIMEOUT))
            }
              , x = function(e) {
                if (!/^https?:\/\/player.vimeo.com/.test(e.origin))
                    return !1;
                l = e.origin;
                var t = e.data;
                switch ("string" == typeof t && (t = JSON.parse(t)),
                t.event) {
                case "ready":
                    S(l);
                    break;
                case "playProgress":
                case "timeupdate":
                    b && (clearTimeout(b),
                    b = null),
                    p("playing", t),
                    d("setVolume", "0"),
                    t.data.percent >= .98 && f > 0 && d("seekTo", f)
                }
                switch (t.method) {
                case "getVideoHeight":
                    v.call(n, t.method),
                    m.dimensions.height = t.value,
                    w();
                    break;
                case "getVideoWidth":
                    v.call(n, t.method),
                    m.dimensions.width = t.value,
                    w();
                    break;
                case "getDuration":
                    v.call(n, t.method),
                    m.duration = t.value,
                    f >= m.duration && (f = 0),
                    w()
                }
            }
              , E = function(e) {
                x(e)
            };
            t.addEventListener("message", E, !1),
            m.destroy = function() {
                t.removeEventListener("message", E),
                m.iframe.parentElement && m.iframe.parentElement.removeChild(m.iframe)
            }
            ,
            u = setTimeout(function() {
                i("Ran out of time")
            }, c.TIMEOUT)
        }
        )
    };
    t.initializeVimeoPlayer = h
}
, function(e, t, n) {
    e.exports = n(135)
}
, function(e, t, n) {
    var r = n(17)
      , o = r.JSON || (r.JSON = {
        stringify: JSON.stringify
    });
    e.exports = function(e) {
        return o.stringify.apply(o, arguments)
    }
}
, function(e, t, n) {
    "use strict";
    var r = n(78);
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.validatedImage = t.getVideoSource = t.getVideoID = t.getStartTime = t.getPlayerElement = t.findPlayerAspectRatio = void 0;
    var o = r(n(137))
      , i = r(n(89))
      , a = n(141)
      , s = r(n(68))
      , c = r(n(142))
      , l = function(e) {
        var t, n;
        for (var r in e) {
            var o = e[r];
            if ("object" === (0,
            i.default)(o) && o.width && o.height) {
                t = o.width,
                n = o.height;
                break
            }
        }
        return {
            w: t,
            h: n
        }
    }
      , u = function(e) {
        var t, n;
        return e.dimensions ? (t = e.dimensions.width,
        n = e.dimensions.height) : e.iframe && (t = e.iframe.clientWidth,
        n = e.iframe.clientHeight),
        {
            w: t,
            h: n
        }
    }
      , f = {
        youtube: {
            parsePath: "query.t",
            timeRegex: /[hms]/,
            idRegex: a.YOUTUBE_REGEX,
            getDimensions: l
        },
        vimeo: {
            parsePath: null,
            timeRegex: /[#t=s]/,
            idRegex: a.VIMEO_REGEX,
            getDimensions: u
        }
    }
      , d = function(e, t) {
        return f[t].parsePath ? (0,
        c.default)(e, f[t].parsePath) : null
    }
      , h = function(e, t) {
        var n = new s.default(e,!0)
          , r = d(n, t);
        if (r) {
            var i = r.split(f[t].timeRegex).filter(Boolean)
              , a = (0,
            o.default)(i.pop(), 10) || 0
              , c = 60 * (0,
            o.default)(i.pop(), 10) || 0
              , l = 3600 * (0,
            o.default)(i.pop(), 10) || 0;
            return l + c + a
        }
    };
    t.getStartTime = h;
    var p = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a.DEFAULT_PROPERTY_VALUES.url
          , t = e.match(a.YOUTUBE_REGEX);
        return t && t[2].length ? "youtube" : (t = e.match(a.VIMEO_REGEX),
        t && t[3].length ? "vimeo" : (console.error("Video source ".concat(e, " does not match supported types")),
        a.UNSUPPORTED_VIDEO_SOURCE))
    };
    t.getVideoSource = p;
    var v = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a.DEFAULT_PROPERTY_VALUES.url
          , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null
          , n = f[t]
          , r = n && e.match(n.idRegex)
          , o = "vimeo" === t ? r[3] : r[2];
        return r && o.length ? o : void console.error("Video id at ".concat(e, " is not valid"))
    };
    t.getVideoID = v;
    var A = function(e) {
        if (!e)
            return !1;
        var t = "IMG" === e.nodeName && e;
        return t || console.warn("Element is not a valid image element."),
        t
    };
    t.validatedImage = A;
    var g = function(e, t, n) {
        var r, i;
        if (t) {
            var a = f[n].getDimensions(t);
            r = a.w,
            i = a.h
        }
        return r && i || (r = e.clientWidth,
        i = e.clientHeight,
        console.warn("No width and height found in ".concat(n, " player ").concat(t, ". Using container dimensions."))),
        (0,
        o.default)(r, 10) / (0,
        o.default)(i, 10)
    };
    t.findPlayerAspectRatio = g;
    var m = function(e) {
        var t = e.querySelector("#player");
        return t || (t = e.ownerDocument.createElement("div"),
        t.id = "player",
        e.appendChild(t)),
        t.setAttribute("style", "position: absolute; top: 0; bottom: 0; left: 0; right: 0;"),
        t
    };
    t.getPlayerElement = m
}
, function(e, t, n) {
    e.exports = n(138)
}
, function(e, t, n) {
    n(139),
    e.exports = n(17).parseInt
}
, function(e, t, n) {
    var r = n(15)
      , o = n(140);
    r(r.G + r.F * (parseInt != o), {
        parseInt: o
    })
}
, function(e, t, n) {
    var r = n(16).parseInt
      , o = n(84).trim
      , i = n(85)
      , a = /^[-+]?0[xX]/;
    e.exports = 8 !== r(i + "08") || 22 !== r(i + "0x16") ? function(e, t) {
        var n = o(String(e), 3);
        return r(n, t >>> 0 || (a.test(n) ? 16 : 10))
    }
    : r
}
, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.VIMEO_REGEX = t.UNSUPPORTED_VIDEO_SOURCE = t.YOUTUBE_REGEX = t.TIMEOUT = t.DEFAULT_PROPERTY_VALUES = t.DEBUG = void 0;
    var n = {
        enabled: !0,
        verbose: !1
    };
    t.DEBUG = n;
    var r = {
        container: "body",
        url: "https://youtu.be/xkEmYQvJ_68",
        source: "youtube",
        fitMode: "fill",
        scaleFactor: 1,
        playbackSpeed: 1,
        filter: 1,
        filterStrength: 50,
        timeCode: {
            start: 0,
            end: null
        },
        DEBUG: n
    };
    t.DEFAULT_PROPERTY_VALUES = r;
    var o = 2500;
    t.TIMEOUT = o;
    var i = "unsupported";
    t.UNSUPPORTED_VIDEO_SOURCE = i;
    var a = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11}).*/;
    t.YOUTUBE_REGEX = a;
    var s = /^.*(vimeo\.com\/)(channels\/[a-zA-Z0-9]*\/)?([0-9]{7,}(#t\=.*s)?)/;
    t.VIMEO_REGEX = s
}
, function(e, t) {
    (function(t) {
        function n(e, t) {
            return null == e ? void 0 : e[t]
        }
        function r(e) {
            var t = !1;
            if (null != e && "function" != typeof e.toString)
                try {
                    t = !!(e + "")
                } catch (e) {}
            return t
        }
        function o(e) {
            var t = -1
              , n = e ? e.length : 0;
            for (this.clear(); ++t < n; ) {
                var r = e[t];
                this.set(r[0], r[1])
            }
        }
        function i() {
            this.__data__ = Ae ? Ae(null) : {}
        }
        function a(e) {
            return this.has(e) && delete this.__data__[e]
        }
        function s(e) {
            var t = this.__data__;
            if (Ae) {
                var n = t[e];
                return n === B ? void 0 : n
            }
            return ue.call(t, e) ? t[e] : void 0
        }
        function c(e) {
            var t = this.__data__;
            return Ae ? void 0 !== t[e] : ue.call(t, e)
        }
        function l(e, t) {
            var n = this.__data__;
            return n[e] = Ae && void 0 === t ? B : t,
            this
        }
        function u(e) {
            var t = -1
              , n = e ? e.length : 0;
            for (this.clear(); ++t < n; ) {
                var r = e[t];
                this.set(r[0], r[1])
            }
        }
        function f() {
            this.__data__ = []
        }
        function d(e) {
            var t = this.__data__
              , n = S(t, e);
            if (n < 0)
                return !1;
            var r = t.length - 1;
            return n == r ? t.pop() : pe.call(t, n, 1),
            !0
        }
        function h(e) {
            var t = this.__data__
              , n = S(t, e);
            return n < 0 ? void 0 : t[n][1]
        }
        function p(e) {
            return S(this.__data__, e) > -1
        }
        function v(e, t) {
            var n = this.__data__
              , r = S(n, e);
            return r < 0 ? n.push([e, t]) : n[r][1] = t,
            this
        }
        function A(e) {
            var t = -1
              , n = e ? e.length : 0;
            for (this.clear(); ++t < n; ) {
                var r = e[t];
                this.set(r[0], r[1])
            }
        }
        function g() {
            this.__data__ = {
                hash: new o,
                map: new (ve || u),
                string: new o
            }
        }
        function m(e) {
            return I(this, e).delete(e)
        }
        function y(e) {
            return I(this, e).get(e)
        }
        function b(e) {
            return I(this, e).has(e)
        }
        function w(e, t) {
            return I(this, e).set(e, t),
            this
        }
        function S(e, t) {
            for (var n = e.length; n--; )
                if (M(e[n][0], t))
                    return n;
            return -1
        }
        function x(e, t) {
            t = Y(t, e) ? [t] : T(t);
            for (var n = 0, r = t.length; null != e && n < r; )
                e = e[P(t[n++])];
            return n && n == r ? e : void 0
        }
        function E(e) {
            if (!U(e) || O(e))
                return !1;
            var t = N(e) || r(e) ? de : ee;
            return t.test(j(e))
        }
        function _(e) {
            if ("string" == typeof e)
                return e;
            if (L(e))
                return me ? me.call(e) : "";
            var t = e + "";
            return "0" == t && 1 / e == -D ? "-0" : t
        }
        function T(e) {
            return be(e) ? e : ye(e)
        }
        function I(e, t) {
            var n = e.__data__;
            return C(t) ? n["string" == typeof t ? "string" : "hash"] : n.map
        }
        function k(e, t) {
            var r = n(e, t);
            return E(r) ? r : void 0
        }
        function Y(e, t) {
            if (be(e))
                return !1;
            var n = typeof e;
            return !("number" != n && "symbol" != n && "boolean" != n && null != e && !L(e)) || (q.test(e) || !Q.test(e) || null != t && e in Object(t))
        }
        function C(e) {
            var t = typeof e;
            return "string" == t || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== e : null === e
        }
        function O(e) {
            return !!ce && ce in e
        }
        function P(e) {
            if ("string" == typeof e || L(e))
                return e;
            var t = e + "";
            return "0" == t && 1 / e == -D ? "-0" : t
        }
        function j(e) {
            if (null != e) {
                try {
                    return le.call(e)
                } catch (e) {}
                try {
                    return e + ""
                } catch (e) {}
            }
            return ""
        }
        function R(e, t) {
            if ("function" != typeof e || t && "function" != typeof t)
                throw new TypeError(W);
            var n = function() {
                var r = arguments
                  , o = t ? t.apply(this, r) : r[0]
                  , i = n.cache;
                if (i.has(o))
                    return i.get(o);
                var a = e.apply(this, r);
                return n.cache = i.set(o, a),
                a
            };
            return n.cache = new (R.Cache || A),
            n
        }
        function M(e, t) {
            return e === t || e !== e && t !== t
        }
        function N(e) {
            var t = U(e) ? fe.call(e) : "";
            return t == H || t == z
        }
        function U(e) {
            var t = typeof e;
            return !!e && ("object" == t || "function" == t)
        }
        function F(e) {
            return !!e && "object" == typeof e
        }
        function L(e) {
            return "symbol" == typeof e || F(e) && fe.call(e) == Z
        }
        function V(e) {
            return null == e ? "" : _(e)
        }
        function G(e, t, n) {
            var r = null == e ? void 0 : x(e, t);
            return void 0 === r ? n : r
        }
        var W = "Expected a function"
          , B = "__lodash_hash_undefined__"
          , D = 1 / 0
          , H = "[object Function]"
          , z = "[object GeneratorFunction]"
          , Z = "[object Symbol]"
          , Q = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
          , q = /^\w*$/
          , J = /^\./
          , X = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g
          , K = /[\\^$.*+?()[\]{}|]/g
          , $ = /\\(\\)?/g
          , ee = /^\[object .+?Constructor\]$/
          , te = "object" == typeof t && t && t.Object === Object && t
          , ne = "object" == typeof self && self && self.Object === Object && self
          , re = te || ne || Function("return this")()
          , oe = Array.prototype
          , ie = Function.prototype
          , ae = Object.prototype
          , se = re["__core-js_shared__"]
          , ce = function() {
            var e = /[^.]+$/.exec(se && se.keys && se.keys.IE_PROTO || "");
            return e ? "Symbol(src)_1." + e : ""
        }()
          , le = ie.toString
          , ue = ae.hasOwnProperty
          , fe = ae.toString
          , de = RegExp("^" + le.call(ue).replace(K, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$")
          , he = re.Symbol
          , pe = oe.splice
          , ve = k(re, "Map")
          , Ae = k(Object, "create")
          , ge = he ? he.prototype : void 0
          , me = ge ? ge.toString : void 0;
        o.prototype.clear = i,
        o.prototype.delete = a,
        o.prototype.get = s,
        o.prototype.has = c,
        o.prototype.set = l,
        u.prototype.clear = f,
        u.prototype.delete = d,
        u.prototype.get = h,
        u.prototype.has = p,
        u.prototype.set = v,
        A.prototype.clear = g,
        A.prototype.delete = m,
        A.prototype.get = y,
        A.prototype.has = b,
        A.prototype.set = w;
        var ye = R(function(e) {
            e = V(e);
            var t = [];
            return J.test(e) && t.push(""),
            e.replace(X, function(e, n, r, o) {
                t.push(r ? o.replace($, "$1") : n || e)
            }),
            t
        });
        R.Cache = A;
        var be = Array.isArray;
        e.exports = G
    }
    ).call(t, function() {
        return this
    }())
}
, function(e, t, n) {
    "use strict";
    var r = n(78);
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.initializeYouTubePlayer = t.initializeYouTubeAPI = void 0;
    var o = r(n(115))
      , i = n(136)
      , a = function(e) {
        return new o.default(function(t, n) {
            if (e.document.documentElement.querySelector('script[src*="www.youtube.com/iframe_api"].loaded'))
                return void t("already loaded");
            var r = e.document.createElement("script");
            r.src = "https://www.youtube.com/iframe_api";
            var o = e.document.getElementsByTagName("script")[0];
            o.parentNode.insertBefore(r, o),
            r.addEventListener("load", function(e) {
                e.currentTarget.classList.add("loaded"),
                t("api script tag created and loaded")
            }, !0),
            r.addEventListener("error", function(e) {
                n("Failed to load YouTube script: ", e)
            })
        }
        )
    };
    t.initializeYouTubeAPI = a;
    var s = function(e, t) {
        var n = e.target;
        n.iframe = n.getIframe(),
        n.mute(),
        n.ready = !0,
        n.seekTo(t < n.getDuration() ? t : 0),
        n.playVideo()
    }
      , c = function(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1
          , o = e.target
          , i = (o.getDuration() - t) / r
          , a = function e() {
            o.getCurrentTime() + .1 >= o.getDuration() && (o.pauseVideo(),
            o.seekTo(t),
            o.playVideo()),
            requestAnimationFrame(e)
        };
        return e.data === n.YT.PlayerState.BUFFERING && 1 !== o.getVideoLoadedFraction() && (0 === o.getCurrentTime() || o.getCurrentTime() > i - -.1) ? "buffering" : e.data === n.YT.PlayerState.PLAYING ? (requestAnimationFrame(a),
        "playing") : void (e.data === n.YT.PlayerState.ENDED && o.playVideo())
    }
      , l = function(e) {
        var t = e.container
          , n = e.win
          , r = e.videoId
          , a = e.startTime
          , l = e.speed
          , u = e.readyCallback
          , f = e.stateChangeCallback
          , d = (0,
        i.getPlayerElement)(t)
          , h = function() {
            return new n.YT.Player(d,{
                videoId: r,
                playerVars: {
                    autohide: 1,
                    autoplay: 0,
                    controls: 0,
                    enablejsapi: 1,
                    iv_load_policy: 3,
                    loop: 0,
                    modestbranding: 1,
                    playsinline: 1,
                    rel: 0,
                    showinfo: 0,
                    wmode: "opaque"
                },
                events: {
                    onReady: function(e) {
                        s(e, a),
                        u(e.target)
                    },
                    onStateChange: function(e) {
                        var t = c(e, a, n, l);
                        f(t, t)
                    }
                }
            })
        };
        return new o.default(function(e, t) {
            var r = function t() {
                1 === n.YT.loaded ? e(h()) : setTimeout(t, 100)
            };
            r()
        }
        )
    };
    t.initializeYouTubePlayer = l
}
, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.filterProperties = t.filterOptions = void 0;
    var n = ["none", "blur", "brightness", "contrast", "invert", "opacity", "saturate", "sepia", "drop-shadow", "grayscale", "hue-rotate"];
    t.filterOptions = n;
    var r = {
        blur: {
            modifier: function(e) {
                return .3 * e
            },
            unit: "px"
        },
        brightness: {
            modifier: function(e) {
                return .009 * e + .1
            },
            unit: ""
        },
        contrast: {
            modifier: function(e) {
                return .4 * e + 80
            },
            unit: "%"
        },
        grayscale: {
            modifier: function(e) {
                return e
            },
            unit: "%"
        },
        "hue-rotate": {
            modifier: function(e) {
                return 3.6 * e
            },
            unit: "deg"
        },
        invert: {
            modifier: function(e) {
                return 1
            },
            unit: ""
        },
        opacity: {
            modifier: function(e) {
                return e
            },
            unit: "%"
        },
        saturate: {
            modifier: function(e) {
                return 2 * e
            },
            unit: "%"
        },
        sepia: {
            modifier: function(e) {
                return e
            },
            unit: "%"
        }
    };
    t.filterProperties = r
}
, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.default = void 0;
    var n = function(e) {
        var t = {
            container: e
        };
        return e.getAttribute("data-config-url") && (t.url = e.getAttribute("data-config-url")),
        e.getAttribute("data-config-playback-speed") && (t.playbackSpeed = e.getAttribute("data-config-playback-speed")),
        e.getAttribute("data-config-filter") && (t.filter = e.getAttribute("data-config-filter")),
        e.getAttribute("data-config-filter-strength") && (t.filterStrength = e.getAttribute("data-config-filter-strength")),
        t
    }
      , r = n;
    t.default = r,
    e.exports = t.default
}
, function(e, t) {
    var n = function(e, t, n) {
        t = t || 100,
        n = n || Y.Template.Site,
        e && (this._timeout && this._timeout.cancel(),
        this._timeout = Y.later(t, n, e))
    };
    e.exports = n
}
, function(e, t, n) {
    var r = n(146);
    Y.use("node", function(e) {
        e.namespace("Template").Authenticated = Singleton.create({
            ready: function() {
                this.bindUI()
            },
            bindUI: function() {
                var t = e.one("body.transparent-header");
                t && (t = t.getDOMNode(),
                ["sqs-stacked-items-dom-deleted", "sqs-stacked-items-dom-reorder"].forEach(function(n) {
                    e.config.win.addEventListener(n, function(e) {
                        document.querySelector("#content > div").classList.contains("no-main-image") ? t.classList.remove("has-banner-image") : t.classList.add("has-banner-image")
                    }
                    .bind(this))
                }
                .bind(this))),
                e.Global.on("tweak:beforeopen", function(t) {
                    setTimeout(function() {
                        e.one(window).simulate("resize")
                    }, 500)
                }),
                e.Global.on(["tweak:save", "tweak:discard", "tweak:beforeopen"], function(t) {
                    e.one(".always-use-overlay-nav") && e.one("#mobileNavToggle").set("checked", !1).simulate("change")
                }),
                e.Global.on("tweak:discard", function(e) {}),
                e.Global.on("tweak:close", function(t) {
                    setTimeout(function() {
                        e.one(window).simulate("resize")
                    }, 500),
                    e.one("#header.tweaking") && e.one("#header.tweaking").removeClass("tweaking")
                }),
                e.Global.on("tweak:aftershow", function(t) {
                    e.Template.noYUI.vCenterTopSectionContent(),
                    e.Template.Site.runCenterNav()
                }, this),
                e.Global.on("tweak:change", function(t) {
                    var n = t.getName()
                      , o = t.getValue();
                    "string" == typeof o && (o = o.toLowerCase(),
                    o = o.replace(" ", "-")),
                    "siteTitleContainerWidth" != n && "logoWidth" != n || (e.one("#header").addClass("tweaking"),
                    r(function() {
                        e.one("#header").removeClass("tweaking")
                    }, 500)),
                    "design" == n && e.Template.Site.regularHeaderForGridGallery(),
                    e.one(".always-use-overlay-nav") && ("nav-font" != n && "navColor" != n && "navActiveColor" != n && "expand-homepage-index-links" != n || e.one("#mobileNavToggle").set("checked", !0).simulate("change")),
                    "always-use-overlay-nav" == n && (e.Template.Site.injectScrollNavContent(),
                    e.Template.noYUI.vCenterTopSectionContent(),
                    e.Template.Site.runCenterNav()),
                    "siteTitleContainerWidth" != n && "logoWidth" != n && "nav-font" != n && "expand-homepage-index-links" != n || e.later(140, this, function() {
                        e.Template.noYUI.vCenterTopSectionContent(),
                        e.Template.Site.runCenterNav()
                    }),
                    "transparent-header" == n && r(function() {
                        e.Template.helper.imgLoad()
                    })
                })
            }
        })
    })
}
]);
