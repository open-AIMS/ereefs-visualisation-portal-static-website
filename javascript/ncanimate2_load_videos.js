//! moment.js
//! version : 2.15.2
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!(function (a, b) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = b())
    : "function" == typeof define && define.amd
    ? define(b)
    : (a.moment = b());
})(this, function () {
  "use strict";
  function a() {
    return md.apply(null, arguments);
  }
  // This is done to register the method called with moment()
  // without creating circular dependencies.
  function b(a) {
    md = a;
  }
  function c(a) {
    return (
      a instanceof Array ||
      "[object Array]" === Object.prototype.toString.call(a)
    );
  }
  function d(a) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return null != a && "[object Object]" === Object.prototype.toString.call(a);
  }
  function e(a) {
    var b;
    // even if its not own property I'd still call it non-empty
    for (b in a) return !1;
    return !0;
  }
  function f(a) {
    return (
      a instanceof Date || "[object Date]" === Object.prototype.toString.call(a)
    );
  }
  function g(a, b) {
    var c,
      d = [];
    for (c = 0; c < a.length; ++c) d.push(b(a[c], c));
    return d;
  }
  function h(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }
  function i(a, b) {
    for (var c in b) h(b, c) && (a[c] = b[c]);
    return (
      h(b, "toString") && (a.toString = b.toString),
      h(b, "valueOf") && (a.valueOf = b.valueOf),
      a
    );
  }
  function j(a, b, c, d) {
    return qb(a, b, c, d, !0).utc();
  }
  function k() {
    // We need to deep clone this object.
    return {
      empty: !1,
      unusedTokens: [],
      unusedInput: [],
      overflow: -2,
      charsLeftOver: 0,
      nullInput: !1,
      invalidMonth: null,
      invalidFormat: !1,
      userInvalidated: !1,
      iso: !1,
      parsedDateParts: [],
      meridiem: null,
    };
  }
  function l(a) {
    return null == a._pf && (a._pf = k()), a._pf;
  }
  function m(a) {
    if (null == a._isValid) {
      var b = l(a),
        c = nd.call(b.parsedDateParts, function (a) {
          return null != a;
        }),
        d =
          !isNaN(a._d.getTime()) &&
          b.overflow < 0 &&
          !b.empty &&
          !b.invalidMonth &&
          !b.invalidWeekday &&
          !b.nullInput &&
          !b.invalidFormat &&
          !b.userInvalidated &&
          (!b.meridiem || (b.meridiem && c));
      if (
        (a._strict &&
          (d =
            d &&
            0 === b.charsLeftOver &&
            0 === b.unusedTokens.length &&
            void 0 === b.bigHour),
        null != Object.isFrozen && Object.isFrozen(a))
      )
        return d;
      a._isValid = d;
    }
    return a._isValid;
  }
  function n(a) {
    var b = j(NaN);
    return null != a ? i(l(b), a) : (l(b).userInvalidated = !0), b;
  }
  function o(a) {
    return void 0 === a;
  }
  function p(a, b) {
    var c, d, e;
    if (
      (o(b._isAMomentObject) || (a._isAMomentObject = b._isAMomentObject),
      o(b._i) || (a._i = b._i),
      o(b._f) || (a._f = b._f),
      o(b._l) || (a._l = b._l),
      o(b._strict) || (a._strict = b._strict),
      o(b._tzm) || (a._tzm = b._tzm),
      o(b._isUTC) || (a._isUTC = b._isUTC),
      o(b._offset) || (a._offset = b._offset),
      o(b._pf) || (a._pf = l(b)),
      o(b._locale) || (a._locale = b._locale),
      od.length > 0)
    )
      for (c in od) (d = od[c]), (e = b[d]), o(e) || (a[d] = e);
    return a;
  }
  // Moment prototype object
  function q(b) {
    p(this, b),
      (this._d = new Date(null != b._d ? b._d.getTime() : NaN)),
      // Prevent infinite loop in case updateOffset creates new moment
      // objects.
      pd === !1 && ((pd = !0), a.updateOffset(this), (pd = !1));
  }
  function r(a) {
    return a instanceof q || (null != a && null != a._isAMomentObject);
  }
  function s(a) {
    return a < 0 ? Math.ceil(a) || 0 : Math.floor(a);
  }
  function t(a) {
    var b = +a,
      c = 0;
    return 0 !== b && isFinite(b) && (c = s(b)), c;
  }
  // compare two arrays, return the number of differences
  function u(a, b, c) {
    var d,
      e = Math.min(a.length, b.length),
      f = Math.abs(a.length - b.length),
      g = 0;
    for (d = 0; d < e; d++)
      ((c && a[d] !== b[d]) || (!c && t(a[d]) !== t(b[d]))) && g++;
    return g + f;
  }
  function v(b) {
    a.suppressDeprecationWarnings === !1 &&
      "undefined" != typeof console &&
      console.warn &&
      console.warn("Deprecation warning: " + b);
  }
  function w(b, c) {
    var d = !0;
    return i(function () {
      if ((null != a.deprecationHandler && a.deprecationHandler(null, b), d)) {
        for (var e, f = [], g = 0; g < arguments.length; g++) {
          if (((e = ""), "object" == typeof arguments[g])) {
            e += "\n[" + g + "] ";
            for (var h in arguments[0]) e += h + ": " + arguments[0][h] + ", ";
            e = e.slice(0, -2);
          } else e = arguments[g];
          f.push(e);
        }
        v(
          b +
            "\nArguments: " +
            Array.prototype.slice.call(f).join("") +
            "\n" +
            new Error().stack
        ),
          (d = !1);
      }
      return c.apply(this, arguments);
    }, c);
  }
  function x(b, c) {
    null != a.deprecationHandler && a.deprecationHandler(b, c),
      qd[b] || (v(c), (qd[b] = !0));
  }
  function y(a) {
    return (
      a instanceof Function ||
      "[object Function]" === Object.prototype.toString.call(a)
    );
  }
  function z(a) {
    var b, c;
    for (c in a) (b = a[c]), y(b) ? (this[c] = b) : (this["_" + c] = b);
    (this._config = a),
      // Lenient ordinal parsing accepts just a number in addition to
      // number + (possibly) stuff coming from _ordinalParseLenient.
      (this._ordinalParseLenient = new RegExp(
        this._ordinalParse.source + "|" + /\d{1,2}/.source
      ));
  }
  function A(a, b) {
    var c,
      e = i({}, a);
    for (c in b)
      h(b, c) &&
        (d(a[c]) && d(b[c])
          ? ((e[c] = {}), i(e[c], a[c]), i(e[c], b[c]))
          : null != b[c]
          ? (e[c] = b[c])
          : delete e[c]);
    for (c in a)
      h(a, c) &&
        !h(b, c) &&
        d(a[c]) &&
        // make sure changes to properties don't modify parent config
        (e[c] = i({}, e[c]));
    return e;
  }
  function B(a) {
    null != a && this.set(a);
  }
  function C(a, b, c) {
    var d = this._calendar[a] || this._calendar.sameElse;
    return y(d) ? d.call(b, c) : d;
  }
  function D(a) {
    var b = this._longDateFormat[a],
      c = this._longDateFormat[a.toUpperCase()];
    return b || !c
      ? b
      : ((this._longDateFormat[a] = c.replace(/MMMM|MM|DD|dddd/g, function (a) {
          return a.slice(1);
        })),
        this._longDateFormat[a]);
  }
  function E() {
    return this._invalidDate;
  }
  function F(a) {
    return this._ordinal.replace("%d", a);
  }
  function G(a, b, c, d) {
    var e = this._relativeTime[c];
    return y(e) ? e(a, b, c, d) : e.replace(/%d/i, a);
  }
  function H(a, b) {
    var c = this._relativeTime[a > 0 ? "future" : "past"];
    return y(c) ? c(b) : c.replace(/%s/i, b);
  }
  function I(a, b) {
    var c = a.toLowerCase();
    zd[c] = zd[c + "s"] = zd[b] = a;
  }
  function J(a) {
    return "string" == typeof a ? zd[a] || zd[a.toLowerCase()] : void 0;
  }
  function K(a) {
    var b,
      c,
      d = {};
    for (c in a) h(a, c) && ((b = J(c)), b && (d[b] = a[c]));
    return d;
  }
  function L(a, b) {
    Ad[a] = b;
  }
  function M(a) {
    var b = [];
    for (var c in a) b.push({ unit: c, priority: Ad[c] });
    return (
      b.sort(function (a, b) {
        return a.priority - b.priority;
      }),
      b
    );
  }
  function N(b, c) {
    return function (d) {
      return null != d
        ? (P(this, b, d), a.updateOffset(this, c), this)
        : O(this, b);
    };
  }
  function O(a, b) {
    return a.isValid() ? a._d["get" + (a._isUTC ? "UTC" : "") + b]() : NaN;
  }
  function P(a, b, c) {
    a.isValid() && a._d["set" + (a._isUTC ? "UTC" : "") + b](c);
  }
  // MOMENTS
  function Q(a) {
    return (a = J(a)), y(this[a]) ? this[a]() : this;
  }
  function R(a, b) {
    if ("object" == typeof a) {
      a = K(a);
      for (var c = M(a), d = 0; d < c.length; d++)
        this[c[d].unit](a[c[d].unit]);
    } else if (((a = J(a)), y(this[a]))) return this[a](b);
    return this;
  }
  function S(a, b, c) {
    var d = "" + Math.abs(a),
      e = b - d.length,
      f = a >= 0;
    return (
      (f ? (c ? "+" : "") : "-") +
      Math.pow(10, Math.max(0, e)).toString().substr(1) +
      d
    );
  }
  // token:    'M'
  // padded:   ['MM', 2]
  // ordinal:  'Mo'
  // callback: function () { this.month() + 1 }
  function T(a, b, c, d) {
    var e = d;
    "string" == typeof d &&
      (e = function () {
        return this[d]();
      }),
      a && (Ed[a] = e),
      b &&
        (Ed[b[0]] = function () {
          return S(e.apply(this, arguments), b[1], b[2]);
        }),
      c &&
        (Ed[c] = function () {
          return this.localeData().ordinal(e.apply(this, arguments), a);
        });
  }
  function U(a) {
    return a.match(/\[[\s\S]/)
      ? a.replace(/^\[|\]$/g, "")
      : a.replace(/\\/g, "");
  }
  function V(a) {
    var b,
      c,
      d = a.match(Bd);
    for (b = 0, c = d.length; b < c; b++)
      Ed[d[b]] ? (d[b] = Ed[d[b]]) : (d[b] = U(d[b]));
    return function (b) {
      var e,
        f = "";
      for (e = 0; e < c; e++)
        f += d[e] instanceof Function ? d[e].call(b, a) : d[e];
      return f;
    };
  }
  // format date using native date object
  function W(a, b) {
    return a.isValid()
      ? ((b = X(b, a.localeData())), (Dd[b] = Dd[b] || V(b)), Dd[b](a))
      : a.localeData().invalidDate();
  }
  function X(a, b) {
    function c(a) {
      return b.longDateFormat(a) || a;
    }
    var d = 5;
    for (Cd.lastIndex = 0; d >= 0 && Cd.test(a); )
      (a = a.replace(Cd, c)), (Cd.lastIndex = 0), (d -= 1);
    return a;
  }
  function Y(a, b, c) {
    Wd[a] = y(b)
      ? b
      : function (a, d) {
          return a && c ? c : b;
        };
  }
  function Z(a, b) {
    return h(Wd, a) ? Wd[a](b._strict, b._locale) : new RegExp($(a));
  }
  // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
  function $(a) {
    return _(
      a
        .replace("\\", "")
        .replace(
          /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
          function (a, b, c, d, e) {
            return b || c || d || e;
          }
        )
    );
  }
  function _(a) {
    return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }
  function aa(a, b) {
    var c,
      d = b;
    for (
      "string" == typeof a && (a = [a]),
        "number" == typeof b &&
          (d = function (a, c) {
            c[b] = t(a);
          }),
        c = 0;
      c < a.length;
      c++
    )
      Xd[a[c]] = d;
  }
  function ba(a, b) {
    aa(a, function (a, c, d, e) {
      (d._w = d._w || {}), b(a, d._w, d, e);
    });
  }
  function ca(a, b, c) {
    null != b && h(Xd, a) && Xd[a](b, c._a, c, a);
  }
  function da(a, b) {
    return new Date(Date.UTC(a, b + 1, 0)).getUTCDate();
  }
  function ea(a, b) {
    return a
      ? c(this._months)
        ? this._months[a.month()]
        : this._months[
            (this._months.isFormat || fe).test(b) ? "format" : "standalone"
          ][a.month()]
      : this._months;
  }
  function fa(a, b) {
    return a
      ? c(this._monthsShort)
        ? this._monthsShort[a.month()]
        : this._monthsShort[fe.test(b) ? "format" : "standalone"][a.month()]
      : this._monthsShort;
  }
  function ga(a, b, c) {
    var d,
      e,
      f,
      g = a.toLocaleLowerCase();
    if (!this._monthsParse)
      for (
        // this is not used
        this._monthsParse = [],
          this._longMonthsParse = [],
          this._shortMonthsParse = [],
          d = 0;
        d < 12;
        ++d
      )
        (f = j([2e3, d])),
          (this._shortMonthsParse[d] = this.monthsShort(
            f,
            ""
          ).toLocaleLowerCase()),
          (this._longMonthsParse[d] = this.months(f, "").toLocaleLowerCase());
    return c
      ? "MMM" === b
        ? ((e = sd.call(this._shortMonthsParse, g)), e !== -1 ? e : null)
        : ((e = sd.call(this._longMonthsParse, g)), e !== -1 ? e : null)
      : "MMM" === b
      ? ((e = sd.call(this._shortMonthsParse, g)),
        e !== -1
          ? e
          : ((e = sd.call(this._longMonthsParse, g)), e !== -1 ? e : null))
      : ((e = sd.call(this._longMonthsParse, g)),
        e !== -1
          ? e
          : ((e = sd.call(this._shortMonthsParse, g)), e !== -1 ? e : null));
  }
  function ha(a, b, c) {
    var d, e, f;
    if (this._monthsParseExact) return ga.call(this, a, b, c);
    // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse
    for (
      this._monthsParse ||
        ((this._monthsParse = []),
        (this._longMonthsParse = []),
        (this._shortMonthsParse = [])),
        d = 0;
      d < 12;
      d++
    ) {
      // test the regex
      if (
        // make the regex if we don't have it already
        ((e = j([2e3, d])),
        c &&
          !this._longMonthsParse[d] &&
          ((this._longMonthsParse[d] = new RegExp(
            "^" + this.months(e, "").replace(".", "") + "$",
            "i"
          )),
          (this._shortMonthsParse[d] = new RegExp(
            "^" + this.monthsShort(e, "").replace(".", "") + "$",
            "i"
          ))),
        c ||
          this._monthsParse[d] ||
          ((f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, "")),
          (this._monthsParse[d] = new RegExp(f.replace(".", ""), "i"))),
        c && "MMMM" === b && this._longMonthsParse[d].test(a))
      )
        return d;
      if (c && "MMM" === b && this._shortMonthsParse[d].test(a)) return d;
      if (!c && this._monthsParse[d].test(a)) return d;
    }
  }
  // MOMENTS
  function ia(a, b) {
    var c;
    if (!a.isValid())
      // No op
      return a;
    if ("string" == typeof b)
      if (/^\d+$/.test(b)) b = t(b);
      // TODO: Another silent failure?
      else if (((b = a.localeData().monthsParse(b)), "number" != typeof b))
        return a;
    return (
      (c = Math.min(a.date(), da(a.year(), b))),
      a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c),
      a
    );
  }
  function ja(b) {
    return null != b
      ? (ia(this, b), a.updateOffset(this, !0), this)
      : O(this, "Month");
  }
  function ka() {
    return da(this.year(), this.month());
  }
  function la(a) {
    return this._monthsParseExact
      ? (h(this, "_monthsRegex") || na.call(this),
        a ? this._monthsShortStrictRegex : this._monthsShortRegex)
      : (h(this, "_monthsShortRegex") || (this._monthsShortRegex = ie),
        this._monthsShortStrictRegex && a
          ? this._monthsShortStrictRegex
          : this._monthsShortRegex);
  }
  function ma(a) {
    return this._monthsParseExact
      ? (h(this, "_monthsRegex") || na.call(this),
        a ? this._monthsStrictRegex : this._monthsRegex)
      : (h(this, "_monthsRegex") || (this._monthsRegex = je),
        this._monthsStrictRegex && a
          ? this._monthsStrictRegex
          : this._monthsRegex);
  }
  function na() {
    function a(a, b) {
      return b.length - a.length;
    }
    var b,
      c,
      d = [],
      e = [],
      f = [];
    for (b = 0; b < 12; b++)
      // make the regex if we don't have it already
      (c = j([2e3, b])),
        d.push(this.monthsShort(c, "")),
        e.push(this.months(c, "")),
        f.push(this.months(c, "")),
        f.push(this.monthsShort(c, ""));
    for (
      // Sorting makes sure if one month (or abbr) is a prefix of another it
      // will match the longer piece.
      d.sort(a), e.sort(a), f.sort(a), b = 0;
      b < 12;
      b++
    )
      (d[b] = _(d[b])), (e[b] = _(e[b]));
    for (b = 0; b < 24; b++) f[b] = _(f[b]);
    (this._monthsRegex = new RegExp("^(" + f.join("|") + ")", "i")),
      (this._monthsShortRegex = this._monthsRegex),
      (this._monthsStrictRegex = new RegExp("^(" + e.join("|") + ")", "i")),
      (this._monthsShortStrictRegex = new RegExp(
        "^(" + d.join("|") + ")",
        "i"
      ));
  }
  // HELPERS
  function oa(a) {
    return pa(a) ? 366 : 365;
  }
  function pa(a) {
    return (a % 4 === 0 && a % 100 !== 0) || a % 400 === 0;
  }
  function qa() {
    return pa(this.year());
  }
  function ra(a, b, c, d, e, f, g) {
    //can't just apply() to create a date:
    //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
    var h = new Date(a, b, c, d, e, f, g);
    //the date constructor remaps years 0-99 to 1900-1999
    return (
      a < 100 && a >= 0 && isFinite(h.getFullYear()) && h.setFullYear(a), h
    );
  }
  function sa(a) {
    var b = new Date(Date.UTC.apply(null, arguments));
    //the Date.UTC function remaps years 0-99 to 1900-1999
    return (
      a < 100 && a >= 0 && isFinite(b.getUTCFullYear()) && b.setUTCFullYear(a),
      b
    );
  }
  // start-of-first-week - start-of-year
  function ta(a, b, c) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
      d = 7 + b - c,
      // first-week day local weekday -- which local weekday is fwd
      e = (7 + sa(a, 0, d).getUTCDay() - b) % 7;
    return -e + d - 1;
  }
  //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
  function ua(a, b, c, d, e) {
    var f,
      g,
      h = (7 + c - d) % 7,
      i = ta(a, d, e),
      j = 1 + 7 * (b - 1) + h + i;
    return (
      j <= 0
        ? ((f = a - 1), (g = oa(f) + j))
        : j > oa(a)
        ? ((f = a + 1), (g = j - oa(a)))
        : ((f = a), (g = j)),
      { year: f, dayOfYear: g }
    );
  }
  function va(a, b, c) {
    var d,
      e,
      f = ta(a.year(), b, c),
      g = Math.floor((a.dayOfYear() - f - 1) / 7) + 1;
    return (
      g < 1
        ? ((e = a.year() - 1), (d = g + wa(e, b, c)))
        : g > wa(a.year(), b, c)
        ? ((d = g - wa(a.year(), b, c)), (e = a.year() + 1))
        : ((e = a.year()), (d = g)),
      { week: d, year: e }
    );
  }
  function wa(a, b, c) {
    var d = ta(a, b, c),
      e = ta(a + 1, b, c);
    return (oa(a) - d + e) / 7;
  }
  // HELPERS
  // LOCALES
  function xa(a) {
    return va(a, this._week.dow, this._week.doy).week;
  }
  function ya() {
    return this._week.dow;
  }
  function za() {
    return this._week.doy;
  }
  // MOMENTS
  function Aa(a) {
    var b = this.localeData().week(this);
    return null == a ? b : this.add(7 * (a - b), "d");
  }
  function Ba(a) {
    var b = va(this, 1, 4).week;
    return null == a ? b : this.add(7 * (a - b), "d");
  }
  // HELPERS
  function Ca(a, b) {
    return "string" != typeof a
      ? a
      : isNaN(a)
      ? ((a = b.weekdaysParse(a)), "number" == typeof a ? a : null)
      : parseInt(a, 10);
  }
  function Da(a, b) {
    return "string" == typeof a
      ? b.weekdaysParse(a) % 7 || 7
      : isNaN(a)
      ? null
      : a;
  }
  function Ea(a, b) {
    return a
      ? c(this._weekdays)
        ? this._weekdays[a.day()]
        : this._weekdays[
            this._weekdays.isFormat.test(b) ? "format" : "standalone"
          ][a.day()]
      : this._weekdays;
  }
  function Fa(a) {
    return a ? this._weekdaysShort[a.day()] : this._weekdaysShort;
  }
  function Ga(a) {
    return a ? this._weekdaysMin[a.day()] : this._weekdaysMin;
  }
  function Ha(a, b, c) {
    var d,
      e,
      f,
      g = a.toLocaleLowerCase();
    if (!this._weekdaysParse)
      for (
        this._weekdaysParse = [],
          this._shortWeekdaysParse = [],
          this._minWeekdaysParse = [],
          d = 0;
        d < 7;
        ++d
      )
        (f = j([2e3, 1]).day(d)),
          (this._minWeekdaysParse[d] = this.weekdaysMin(
            f,
            ""
          ).toLocaleLowerCase()),
          (this._shortWeekdaysParse[d] = this.weekdaysShort(
            f,
            ""
          ).toLocaleLowerCase()),
          (this._weekdaysParse[d] = this.weekdays(f, "").toLocaleLowerCase());
    return c
      ? "dddd" === b
        ? ((e = sd.call(this._weekdaysParse, g)), e !== -1 ? e : null)
        : "ddd" === b
        ? ((e = sd.call(this._shortWeekdaysParse, g)), e !== -1 ? e : null)
        : ((e = sd.call(this._minWeekdaysParse, g)), e !== -1 ? e : null)
      : "dddd" === b
      ? ((e = sd.call(this._weekdaysParse, g)),
        e !== -1
          ? e
          : ((e = sd.call(this._shortWeekdaysParse, g)),
            e !== -1
              ? e
              : ((e = sd.call(this._minWeekdaysParse, g)),
                e !== -1 ? e : null)))
      : "ddd" === b
      ? ((e = sd.call(this._shortWeekdaysParse, g)),
        e !== -1
          ? e
          : ((e = sd.call(this._weekdaysParse, g)),
            e !== -1
              ? e
              : ((e = sd.call(this._minWeekdaysParse, g)),
                e !== -1 ? e : null)))
      : ((e = sd.call(this._minWeekdaysParse, g)),
        e !== -1
          ? e
          : ((e = sd.call(this._weekdaysParse, g)),
            e !== -1
              ? e
              : ((e = sd.call(this._shortWeekdaysParse, g)),
                e !== -1 ? e : null)));
  }
  function Ia(a, b, c) {
    var d, e, f;
    if (this._weekdaysParseExact) return Ha.call(this, a, b, c);
    for (
      this._weekdaysParse ||
        ((this._weekdaysParse = []),
        (this._minWeekdaysParse = []),
        (this._shortWeekdaysParse = []),
        (this._fullWeekdaysParse = [])),
        d = 0;
      d < 7;
      d++
    ) {
      // test the regex
      if (
        // make the regex if we don't have it already
        ((e = j([2e3, 1]).day(d)),
        c &&
          !this._fullWeekdaysParse[d] &&
          ((this._fullWeekdaysParse[d] = new RegExp(
            "^" + this.weekdays(e, "").replace(".", ".?") + "$",
            "i"
          )),
          (this._shortWeekdaysParse[d] = new RegExp(
            "^" + this.weekdaysShort(e, "").replace(".", ".?") + "$",
            "i"
          )),
          (this._minWeekdaysParse[d] = new RegExp(
            "^" + this.weekdaysMin(e, "").replace(".", ".?") + "$",
            "i"
          ))),
        this._weekdaysParse[d] ||
          ((f =
            "^" +
            this.weekdays(e, "") +
            "|^" +
            this.weekdaysShort(e, "") +
            "|^" +
            this.weekdaysMin(e, "")),
          (this._weekdaysParse[d] = new RegExp(f.replace(".", ""), "i"))),
        c && "dddd" === b && this._fullWeekdaysParse[d].test(a))
      )
        return d;
      if (c && "ddd" === b && this._shortWeekdaysParse[d].test(a)) return d;
      if (c && "dd" === b && this._minWeekdaysParse[d].test(a)) return d;
      if (!c && this._weekdaysParse[d].test(a)) return d;
    }
  }
  // MOMENTS
  function Ja(a) {
    if (!this.isValid()) return null != a ? this : NaN;
    var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    return null != a
      ? ((a = Ca(a, this.localeData())), this.add(a - b, "d"))
      : b;
  }
  function Ka(a) {
    if (!this.isValid()) return null != a ? this : NaN;
    var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return null == a ? b : this.add(a - b, "d");
  }
  function La(a) {
    if (!this.isValid()) return null != a ? this : NaN;
    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.
    if (null != a) {
      var b = Da(a, this.localeData());
      return this.day(this.day() % 7 ? b : b - 7);
    }
    return this.day() || 7;
  }
  function Ma(a) {
    return this._weekdaysParseExact
      ? (h(this, "_weekdaysRegex") || Pa.call(this),
        a ? this._weekdaysStrictRegex : this._weekdaysRegex)
      : (h(this, "_weekdaysRegex") || (this._weekdaysRegex = pe),
        this._weekdaysStrictRegex && a
          ? this._weekdaysStrictRegex
          : this._weekdaysRegex);
  }
  function Na(a) {
    return this._weekdaysParseExact
      ? (h(this, "_weekdaysRegex") || Pa.call(this),
        a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
      : (h(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = qe),
        this._weekdaysShortStrictRegex && a
          ? this._weekdaysShortStrictRegex
          : this._weekdaysShortRegex);
  }
  function Oa(a) {
    return this._weekdaysParseExact
      ? (h(this, "_weekdaysRegex") || Pa.call(this),
        a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
      : (h(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = re),
        this._weekdaysMinStrictRegex && a
          ? this._weekdaysMinStrictRegex
          : this._weekdaysMinRegex);
  }
  function Pa() {
    function a(a, b) {
      return b.length - a.length;
    }
    var b,
      c,
      d,
      e,
      f,
      g = [],
      h = [],
      i = [],
      k = [];
    for (b = 0; b < 7; b++)
      // make the regex if we don't have it already
      (c = j([2e3, 1]).day(b)),
        (d = this.weekdaysMin(c, "")),
        (e = this.weekdaysShort(c, "")),
        (f = this.weekdays(c, "")),
        g.push(d),
        h.push(e),
        i.push(f),
        k.push(d),
        k.push(e),
        k.push(f);
    for (
      // Sorting makes sure if one weekday (or abbr) is a prefix of another it
      // will match the longer piece.
      g.sort(a), h.sort(a), i.sort(a), k.sort(a), b = 0;
      b < 7;
      b++
    )
      (h[b] = _(h[b])), (i[b] = _(i[b])), (k[b] = _(k[b]));
    (this._weekdaysRegex = new RegExp("^(" + k.join("|") + ")", "i")),
      (this._weekdaysShortRegex = this._weekdaysRegex),
      (this._weekdaysMinRegex = this._weekdaysRegex),
      (this._weekdaysStrictRegex = new RegExp("^(" + i.join("|") + ")", "i")),
      (this._weekdaysShortStrictRegex = new RegExp(
        "^(" + h.join("|") + ")",
        "i"
      )),
      (this._weekdaysMinStrictRegex = new RegExp(
        "^(" + g.join("|") + ")",
        "i"
      ));
  }
  // FORMATTING
  function Qa() {
    return this.hours() % 12 || 12;
  }
  function Ra() {
    return this.hours() || 24;
  }
  function Sa(a, b) {
    T(a, 0, 0, function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), b);
    });
  }
  // PARSING
  function Ta(a, b) {
    return b._meridiemParse;
  }
  // LOCALES
  function Ua(a) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return "p" === (a + "").toLowerCase().charAt(0);
  }
  function Va(a, b, c) {
    return a > 11 ? (c ? "pm" : "PM") : c ? "am" : "AM";
  }
  function Wa(a) {
    return a ? a.toLowerCase().replace("_", "-") : a;
  }
  // pick the locale from the array
  // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
  // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
  function Xa(a) {
    for (var b, c, d, e, f = 0; f < a.length; ) {
      for (
        e = Wa(a[f]).split("-"),
          b = e.length,
          c = Wa(a[f + 1]),
          c = c ? c.split("-") : null;
        b > 0;

      ) {
        if ((d = Ya(e.slice(0, b).join("-")))) return d;
        if (c && c.length >= b && u(e, c, !0) >= b - 1)
          //the next array item is better than a shallower substring of this one
          break;
        b--;
      }
      f++;
    }
    return null;
  }
  function Ya(a) {
    var b = null;
    // TODO: Find a better way to register and load all the locales in Node
    if (!we[a] && "undefined" != typeof module && module && module.exports)
      try {
        (b = se._abbr),
          require("./locale/" + a),
          // because defineLocale currently also sets the global locale, we
          // want to undo that for lazy loaded locales
          Za(b);
      } catch (a) {}
    return we[a];
  }
  // This function will load locale and then set the global locale.  If
  // no arguments are passed in, it will simply return the current global
  // locale key.
  function Za(a, b) {
    var c;
    // moment.duration._locale = moment._locale = data;
    return a && ((c = o(b) ? ab(a) : $a(a, b)), c && (se = c)), se._abbr;
  }
  function $a(a, b) {
    if (null !== b) {
      var c = ve;
      // treat as if there is no base config
      // backwards compat for now: also set the locale
      return (
        (b.abbr = a),
        null != we[a]
          ? (x(
              "defineLocaleOverride",
              "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
            ),
            (c = we[a]._config))
          : null != b.parentLocale &&
            (null != we[b.parentLocale]
              ? (c = we[b.parentLocale]._config)
              : x(
                  "parentLocaleUndefined",
                  "specified parentLocale is not defined yet. See http://momentjs.com/guides/#/warnings/parent-locale/"
                )),
        (we[a] = new B(A(c, b))),
        Za(a),
        we[a]
      );
    }
    // useful for testing
    return delete we[a], null;
  }
  function _a(a, b) {
    if (null != b) {
      var c,
        d = ve;
      // MERGE
      null != we[a] && (d = we[a]._config),
        (b = A(d, b)),
        (c = new B(b)),
        (c.parentLocale = we[a]),
        (we[a] = c),
        // backwards compat for now: also set the locale
        Za(a);
    }
    // pass null for config to unupdate, useful for tests
    else
      null != we[a] &&
        (null != we[a].parentLocale
          ? (we[a] = we[a].parentLocale)
          : null != we[a] && delete we[a]);
    return we[a];
  }
  // returns locale data
  function ab(a) {
    var b;
    if ((a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a))
      return se;
    if (!c(a)) {
      if (
        //short-circuit everything else
        (b = Ya(a))
      )
        return b;
      a = [a];
    }
    return Xa(a);
  }
  function bb() {
    return rd(we);
  }
  function cb(a) {
    var b,
      c = a._a;
    return (
      c &&
        l(a).overflow === -2 &&
        ((b =
          c[Zd] < 0 || c[Zd] > 11
            ? Zd
            : c[$d] < 1 || c[$d] > da(c[Yd], c[Zd])
            ? $d
            : c[_d] < 0 ||
              c[_d] > 24 ||
              (24 === c[_d] && (0 !== c[ae] || 0 !== c[be] || 0 !== c[ce]))
            ? _d
            : c[ae] < 0 || c[ae] > 59
            ? ae
            : c[be] < 0 || c[be] > 59
            ? be
            : c[ce] < 0 || c[ce] > 999
            ? ce
            : -1),
        l(a)._overflowDayOfYear && (b < Yd || b > $d) && (b = $d),
        l(a)._overflowWeeks && b === -1 && (b = de),
        l(a)._overflowWeekday && b === -1 && (b = ee),
        (l(a).overflow = b)),
      a
    );
  }
  // date from iso format
  function db(a) {
    var b,
      c,
      d,
      e,
      f,
      g,
      h = a._i,
      i = xe.exec(h) || ye.exec(h);
    if (i) {
      for (l(a).iso = !0, b = 0, c = Ae.length; b < c; b++)
        if (Ae[b][1].exec(i[1])) {
          (e = Ae[b][0]), (d = Ae[b][2] !== !1);
          break;
        }
      if (null == e) return void (a._isValid = !1);
      if (i[3]) {
        for (b = 0, c = Be.length; b < c; b++)
          if (Be[b][1].exec(i[3])) {
            // match[2] should be 'T' or space
            f = (i[2] || " ") + Be[b][0];
            break;
          }
        if (null == f) return void (a._isValid = !1);
      }
      if (!d && null != f) return void (a._isValid = !1);
      if (i[4]) {
        if (!ze.exec(i[4])) return void (a._isValid = !1);
        g = "Z";
      }
      (a._f = e + (f || "") + (g || "")), jb(a);
    } else a._isValid = !1;
  }
  // date from iso format or fallback
  function eb(b) {
    var c = Ce.exec(b._i);
    return null !== c
      ? void (b._d = new Date(+c[1]))
      : (db(b),
        void (
          b._isValid === !1 && (delete b._isValid, a.createFromInputFallback(b))
        ));
  }
  // Pick the first defined of two or three arguments.
  function fb(a, b, c) {
    return null != a ? a : null != b ? b : c;
  }
  function gb(b) {
    // hooks is actually the exported moment object
    var c = new Date(a.now());
    return b._useUTC
      ? [c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate()]
      : [c.getFullYear(), c.getMonth(), c.getDate()];
  }
  // convert an array to a date.
  // the array should mirror the parameters below
  // note: all values past the year are optional and will default to the lowest possible value.
  // [year, month, day , hour, minute, second, millisecond]
  function hb(a) {
    var b,
      c,
      d,
      e,
      f = [];
    if (!a._d) {
      // Default to current date.
      // * if no year, month, day of month are given, default to today
      // * if day of month is given, default month and year
      // * if month is given, default only year
      // * if year is given, don't default anything
      for (
        d = gb(a),
          //compute day of the year from weeks and weekdays
          a._w && null == a._a[$d] && null == a._a[Zd] && ib(a),
          //if the day of the year is set, figure out what it is
          a._dayOfYear &&
            ((e = fb(a._a[Yd], d[Yd])),
            a._dayOfYear > oa(e) && (l(a)._overflowDayOfYear = !0),
            (c = sa(e, 0, a._dayOfYear)),
            (a._a[Zd] = c.getUTCMonth()),
            (a._a[$d] = c.getUTCDate())),
          b = 0;
        b < 3 && null == a._a[b];
        ++b
      )
        a._a[b] = f[b] = d[b];
      // Zero out whatever was not defaulted, including time
      for (; b < 7; b++)
        a._a[b] = f[b] = null == a._a[b] ? (2 === b ? 1 : 0) : a._a[b];
      // Check for 24:00:00.000
      24 === a._a[_d] &&
        0 === a._a[ae] &&
        0 === a._a[be] &&
        0 === a._a[ce] &&
        ((a._nextDay = !0), (a._a[_d] = 0)),
        (a._d = (a._useUTC ? sa : ra).apply(null, f)),
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm),
        a._nextDay && (a._a[_d] = 24);
    }
  }
  function ib(a) {
    var b, c, d, e, f, g, h, i;
    (b = a._w),
      null != b.GG || null != b.W || null != b.E
        ? ((f = 1),
          (g = 4),
          // TODO: We need to take the current isoWeekYear, but that depends on
          // how we interpret now (local, utc, fixed offset). So create
          // a now version of current config (take local/utc/offset flags, and
          // create now).
          (c = fb(b.GG, a._a[Yd], va(rb(), 1, 4).year)),
          (d = fb(b.W, 1)),
          (e = fb(b.E, 1)),
          (e < 1 || e > 7) && (i = !0))
        : ((f = a._locale._week.dow),
          (g = a._locale._week.doy),
          (c = fb(b.gg, a._a[Yd], va(rb(), f, g).year)),
          (d = fb(b.w, 1)),
          null != b.d
            ? // weekday -- low day numbers are considered next week
              ((e = b.d), (e < 0 || e > 6) && (i = !0))
            : null != b.e
            ? // local weekday -- counting starts from begining of week
              ((e = b.e + f), (b.e < 0 || b.e > 6) && (i = !0))
            : // default to begining of week
              (e = f)),
      d < 1 || d > wa(c, f, g)
        ? (l(a)._overflowWeeks = !0)
        : null != i
        ? (l(a)._overflowWeekday = !0)
        : ((h = ua(c, d, e, f, g)),
          (a._a[Yd] = h.year),
          (a._dayOfYear = h.dayOfYear));
  }
  // date from string and format string
  function jb(b) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (b._f === a.ISO_8601) return void db(b);
    (b._a = []), (l(b).empty = !0);
    // This array is used to make a Date, either with `new Date` or `Date.UTC`
    var c,
      d,
      e,
      f,
      g,
      h = "" + b._i,
      i = h.length,
      j = 0;
    for (e = X(b._f, b._locale).match(Bd) || [], c = 0; c < e.length; c++)
      (f = e[c]),
        (d = (h.match(Z(f, b)) || [])[0]),
        // console.log('token', token, 'parsedInput', parsedInput,
        //         'regex', getParseRegexForToken(token, config));
        d &&
          ((g = h.substr(0, h.indexOf(d))),
          g.length > 0 && l(b).unusedInput.push(g),
          (h = h.slice(h.indexOf(d) + d.length)),
          (j += d.length)),
        // don't parse if it's not a known token
        Ed[f]
          ? (d ? (l(b).empty = !1) : l(b).unusedTokens.push(f), ca(f, d, b))
          : b._strict && !d && l(b).unusedTokens.push(f);
    // add remaining unparsed input length to the string
    (l(b).charsLeftOver = i - j),
      h.length > 0 && l(b).unusedInput.push(h),
      // clear _12h flag if hour is <= 12
      b._a[_d] <= 12 &&
        l(b).bigHour === !0 &&
        b._a[_d] > 0 &&
        (l(b).bigHour = void 0),
      (l(b).parsedDateParts = b._a.slice(0)),
      (l(b).meridiem = b._meridiem),
      // handle meridiem
      (b._a[_d] = kb(b._locale, b._a[_d], b._meridiem)),
      hb(b),
      cb(b);
  }
  function kb(a, b, c) {
    var d;
    // Fallback
    return null == c
      ? b
      : null != a.meridiemHour
      ? a.meridiemHour(b, c)
      : null != a.isPM
      ? ((d = a.isPM(c)), d && b < 12 && (b += 12), d || 12 !== b || (b = 0), b)
      : b;
  }
  // date from string and array of format strings
  function lb(a) {
    var b, c, d, e, f;
    if (0 === a._f.length)
      return (l(a).invalidFormat = !0), void (a._d = new Date(NaN));
    for (e = 0; e < a._f.length; e++)
      (f = 0),
        (b = p({}, a)),
        null != a._useUTC && (b._useUTC = a._useUTC),
        (b._f = a._f[e]),
        jb(b),
        m(b) &&
          // if there is any input that was not parsed add a penalty for that format
          ((f += l(b).charsLeftOver),
          //or tokens
          (f += 10 * l(b).unusedTokens.length),
          (l(b).score = f),
          (null == d || f < d) && ((d = f), (c = b)));
    i(a, c || b);
  }
  function mb(a) {
    if (!a._d) {
      var b = K(a._i);
      (a._a = g(
        [
          b.year,
          b.month,
          b.day || b.date,
          b.hour,
          b.minute,
          b.second,
          b.millisecond,
        ],
        function (a) {
          return a && parseInt(a, 10);
        }
      )),
        hb(a);
    }
  }
  function nb(a) {
    var b = new q(cb(ob(a)));
    // Adding is smart enough around DST
    return b._nextDay && (b.add(1, "d"), (b._nextDay = void 0)), b;
  }
  function ob(a) {
    var b = a._i,
      d = a._f;
    return (
      (a._locale = a._locale || ab(a._l)),
      null === b || (void 0 === d && "" === b)
        ? n({ nullInput: !0 })
        : ("string" == typeof b && (a._i = b = a._locale.preparse(b)),
          r(b)
            ? new q(cb(b))
            : (c(d) ? lb(a) : f(b) ? (a._d = b) : d ? jb(a) : pb(a),
              m(a) || (a._d = null),
              a))
    );
  }
  function pb(b) {
    var d = b._i;
    void 0 === d
      ? (b._d = new Date(a.now()))
      : f(d)
      ? (b._d = new Date(d.valueOf()))
      : "string" == typeof d
      ? eb(b)
      : c(d)
      ? ((b._a = g(d.slice(0), function (a) {
          return parseInt(a, 10);
        })),
        hb(b))
      : "object" == typeof d
      ? mb(b)
      : "number" == typeof d
      ? // from milliseconds
        (b._d = new Date(d))
      : a.createFromInputFallback(b);
  }
  function qb(a, b, f, g, h) {
    var i = {};
    // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423
    return (
      "boolean" == typeof f && ((g = f), (f = void 0)),
      ((d(a) && e(a)) || (c(a) && 0 === a.length)) && (a = void 0),
      (i._isAMomentObject = !0),
      (i._useUTC = i._isUTC = h),
      (i._l = f),
      (i._i = a),
      (i._f = b),
      (i._strict = g),
      nb(i)
    );
  }
  function rb(a, b, c, d) {
    return qb(a, b, c, d, !1);
  }
  // Pick a moment m from moments so that m[fn](other) is true for all
  // other. This relies on the function fn to be transitive.
  //
  // moments should either be an array of moment objects or an array, whose
  // first element is an array of moment objects.
  function sb(a, b) {
    var d, e;
    if ((1 === b.length && c(b[0]) && (b = b[0]), !b.length)) return rb();
    for (d = b[0], e = 1; e < b.length; ++e)
      (b[e].isValid() && !b[e][a](d)) || (d = b[e]);
    return d;
  }
  // TODO: Use [].sort instead?
  function tb() {
    var a = [].slice.call(arguments, 0);
    return sb("isBefore", a);
  }
  function ub() {
    var a = [].slice.call(arguments, 0);
    return sb("isAfter", a);
  }
  function vb(a) {
    var b = K(a),
      c = b.year || 0,
      d = b.quarter || 0,
      e = b.month || 0,
      f = b.week || 0,
      g = b.day || 0,
      h = b.hour || 0,
      i = b.minute || 0,
      j = b.second || 0,
      k = b.millisecond || 0;
    // representation for dateAddRemove
    (this._milliseconds =
      +k +
      1e3 * j + // 1000
      6e4 * i + // 1000 * 60
      1e3 * h * 60 * 60), //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
      // Because of dateAddRemove treats 24 hours as different from a
      // day when working around DST, we need to store them separately
      (this._days = +g + 7 * f),
      // It is impossible translate months into days without knowing
      // which months you are are talking about, so we have to store
      // it separately.
      (this._months = +e + 3 * d + 12 * c),
      (this._data = {}),
      (this._locale = ab()),
      this._bubble();
  }
  function wb(a) {
    return a instanceof vb;
  }
  function xb(a) {
    return a < 0 ? Math.round(-1 * a) * -1 : Math.round(a);
  }
  // FORMATTING
  function yb(a, b) {
    T(a, 0, 0, function () {
      var a = this.utcOffset(),
        c = "+";
      return (
        a < 0 && ((a = -a), (c = "-")),
        c + S(~~(a / 60), 2) + b + S(~~a % 60, 2)
      );
    });
  }
  function zb(a, b) {
    var c = (b || "").match(a) || [],
      d = c[c.length - 1] || [],
      e = (d + "").match(Ge) || ["-", 0, 0],
      f = +(60 * e[1]) + t(e[2]);
    return "+" === e[0] ? f : -f;
  }
  // Return a moment from input, that is local/utc/zone equivalent to model.
  function Ab(b, c) {
    var d, e;
    // Use low-level api, because this fn is low-level api.
    return c._isUTC
      ? ((d = c.clone()),
        (e = (r(b) || f(b) ? b.valueOf() : rb(b).valueOf()) - d.valueOf()),
        d._d.setTime(d._d.valueOf() + e),
        a.updateOffset(d, !1),
        d)
      : rb(b).local();
  }
  function Bb(a) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return 15 * -Math.round(a._d.getTimezoneOffset() / 15);
  }
  // MOMENTS
  // keepLocalTime = true means only change the timezone, without
  // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
  // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
  // +0200, so we adjust the time as needed, to be valid.
  //
  // Keeping the time actually adds/subtracts (one hour)
  // from the actual represented time. That is why we call updateOffset
  // a second time. In case it wants us to change the offset again
  // _changeInProgress == true case, then we have to adjust, because
  // there is no such time in the given timezone.
  function Cb(b, c) {
    var d,
      e = this._offset || 0;
    return this.isValid()
      ? null != b
        ? ("string" == typeof b
            ? (b = zb(Td, b))
            : Math.abs(b) < 16 && (b = 60 * b),
          !this._isUTC && c && (d = Bb(this)),
          (this._offset = b),
          (this._isUTC = !0),
          null != d && this.add(d, "m"),
          e !== b &&
            (!c || this._changeInProgress
              ? Sb(this, Nb(b - e, "m"), 1, !1)
              : this._changeInProgress ||
                ((this._changeInProgress = !0),
                a.updateOffset(this, !0),
                (this._changeInProgress = null))),
          this)
        : this._isUTC
        ? e
        : Bb(this)
      : null != b
      ? this
      : NaN;
  }
  function Db(a, b) {
    return null != a
      ? ("string" != typeof a && (a = -a), this.utcOffset(a, b), this)
      : -this.utcOffset();
  }
  function Eb(a) {
    return this.utcOffset(0, a);
  }
  function Fb(a) {
    return (
      this._isUTC &&
        (this.utcOffset(0, a),
        (this._isUTC = !1),
        a && this.subtract(Bb(this), "m")),
      this
    );
  }
  function Gb() {
    if (this._tzm) this.utcOffset(this._tzm);
    else if ("string" == typeof this._i) {
      var a = zb(Sd, this._i);
      0 === a ? this.utcOffset(0, !0) : this.utcOffset(zb(Sd, this._i));
    }
    return this;
  }
  function Hb(a) {
    return (
      !!this.isValid() &&
      ((a = a ? rb(a).utcOffset() : 0), (this.utcOffset() - a) % 60 === 0)
    );
  }
  function Ib() {
    return (
      this.utcOffset() > this.clone().month(0).utcOffset() ||
      this.utcOffset() > this.clone().month(5).utcOffset()
    );
  }
  function Jb() {
    if (!o(this._isDSTShifted)) return this._isDSTShifted;
    var a = {};
    if ((p(a, this), (a = ob(a)), a._a)) {
      var b = a._isUTC ? j(a._a) : rb(a._a);
      this._isDSTShifted = this.isValid() && u(a._a, b.toArray()) > 0;
    } else this._isDSTShifted = !1;
    return this._isDSTShifted;
  }
  function Kb() {
    return !!this.isValid() && !this._isUTC;
  }
  function Lb() {
    return !!this.isValid() && this._isUTC;
  }
  function Mb() {
    return !!this.isValid() && this._isUTC && 0 === this._offset;
  }
  function Nb(a, b) {
    var c,
      d,
      e,
      f = a,
      // matching against regexp is expensive, do it on demand
      g = null; // checks for null or undefined
    return (
      wb(a)
        ? (f = { ms: a._milliseconds, d: a._days, M: a._months })
        : "number" == typeof a
        ? ((f = {}), b ? (f[b] = a) : (f.milliseconds = a))
        : (g = He.exec(a))
        ? ((c = "-" === g[1] ? -1 : 1),
          (f = {
            y: 0,
            d: t(g[$d]) * c,
            h: t(g[_d]) * c,
            m: t(g[ae]) * c,
            s: t(g[be]) * c,
            ms: t(xb(1e3 * g[ce])) * c,
          }))
        : (g = Ie.exec(a))
        ? ((c = "-" === g[1] ? -1 : 1),
          (f = {
            y: Ob(g[2], c),
            M: Ob(g[3], c),
            w: Ob(g[4], c),
            d: Ob(g[5], c),
            h: Ob(g[6], c),
            m: Ob(g[7], c),
            s: Ob(g[8], c),
          }))
        : null == f
        ? (f = {})
        : "object" == typeof f &&
          ("from" in f || "to" in f) &&
          ((e = Qb(rb(f.from), rb(f.to))),
          (f = {}),
          (f.ms = e.milliseconds),
          (f.M = e.months)),
      (d = new vb(f)),
      wb(a) && h(a, "_locale") && (d._locale = a._locale),
      d
    );
  }
  function Ob(a, b) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var c = a && parseFloat(a.replace(",", "."));
    // apply sign while we're at it
    return (isNaN(c) ? 0 : c) * b;
  }
  function Pb(a, b) {
    var c = { milliseconds: 0, months: 0 };
    return (
      (c.months = b.month() - a.month() + 12 * (b.year() - a.year())),
      a.clone().add(c.months, "M").isAfter(b) && --c.months,
      (c.milliseconds = +b - +a.clone().add(c.months, "M")),
      c
    );
  }
  function Qb(a, b) {
    var c;
    return a.isValid() && b.isValid()
      ? ((b = Ab(b, a)),
        a.isBefore(b)
          ? (c = Pb(a, b))
          : ((c = Pb(b, a)),
            (c.milliseconds = -c.milliseconds),
            (c.months = -c.months)),
        c)
      : { milliseconds: 0, months: 0 };
  }
  // TODO: remove 'name' arg after deprecation is removed
  function Rb(a, b) {
    return function (c, d) {
      var e, f;
      //invert the arguments, but complain about it
      return (
        null === d ||
          isNaN(+d) ||
          (x(
            b,
            "moment()." +
              b +
              "(period, number) is deprecated. Please use moment()." +
              b +
              "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
          ),
          (f = c),
          (c = d),
          (d = f)),
        (c = "string" == typeof c ? +c : c),
        (e = Nb(c, d)),
        Sb(this, e, a),
        this
      );
    };
  }
  function Sb(b, c, d, e) {
    var f = c._milliseconds,
      g = xb(c._days),
      h = xb(c._months);
    b.isValid() &&
      ((e = null == e || e),
      f && b._d.setTime(b._d.valueOf() + f * d),
      g && P(b, "Date", O(b, "Date") + g * d),
      h && ia(b, O(b, "Month") + h * d),
      e && a.updateOffset(b, g || h));
  }
  function Tb(a, b) {
    var c = a.diff(b, "days", !0);
    return c < -6
      ? "sameElse"
      : c < -1
      ? "lastWeek"
      : c < 0
      ? "lastDay"
      : c < 1
      ? "sameDay"
      : c < 2
      ? "nextDay"
      : c < 7
      ? "nextWeek"
      : "sameElse";
  }
  function Ub(b, c) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var d = b || rb(),
      e = Ab(d, this).startOf("day"),
      f = a.calendarFormat(this, e) || "sameElse",
      g = c && (y(c[f]) ? c[f].call(this, d) : c[f]);
    return this.format(g || this.localeData().calendar(f, this, rb(d)));
  }
  function Vb() {
    return new q(this);
  }
  function Wb(a, b) {
    var c = r(a) ? a : rb(a);
    return (
      !(!this.isValid() || !c.isValid()) &&
      ((b = J(o(b) ? "millisecond" : b)),
      "millisecond" === b
        ? this.valueOf() > c.valueOf()
        : c.valueOf() < this.clone().startOf(b).valueOf())
    );
  }
  function Xb(a, b) {
    var c = r(a) ? a : rb(a);
    return (
      !(!this.isValid() || !c.isValid()) &&
      ((b = J(o(b) ? "millisecond" : b)),
      "millisecond" === b
        ? this.valueOf() < c.valueOf()
        : this.clone().endOf(b).valueOf() < c.valueOf())
    );
  }
  function Yb(a, b, c, d) {
    return (
      (d = d || "()"),
      ("(" === d[0] ? this.isAfter(a, c) : !this.isBefore(a, c)) &&
        (")" === d[1] ? this.isBefore(b, c) : !this.isAfter(b, c))
    );
  }
  function Zb(a, b) {
    var c,
      d = r(a) ? a : rb(a);
    return (
      !(!this.isValid() || !d.isValid()) &&
      ((b = J(b || "millisecond")),
      "millisecond" === b
        ? this.valueOf() === d.valueOf()
        : ((c = d.valueOf()),
          this.clone().startOf(b).valueOf() <= c &&
            c <= this.clone().endOf(b).valueOf()))
    );
  }
  function $b(a, b) {
    return this.isSame(a, b) || this.isAfter(a, b);
  }
  function _b(a, b) {
    return this.isSame(a, b) || this.isBefore(a, b);
  }
  function ac(a, b, c) {
    var d, e, f, g; // 1000
    // 1000 * 60
    // 1000 * 60 * 60
    // 1000 * 60 * 60 * 24, negate dst
    // 1000 * 60 * 60 * 24 * 7, negate dst
    return this.isValid()
      ? ((d = Ab(a, this)),
        d.isValid()
          ? ((e = 6e4 * (d.utcOffset() - this.utcOffset())),
            (b = J(b)),
            "year" === b || "month" === b || "quarter" === b
              ? ((g = bc(this, d)),
                "quarter" === b ? (g /= 3) : "year" === b && (g /= 12))
              : ((f = this - d),
                (g =
                  "second" === b
                    ? f / 1e3
                    : "minute" === b
                    ? f / 6e4
                    : "hour" === b
                    ? f / 36e5
                    : "day" === b
                    ? (f - e) / 864e5
                    : "week" === b
                    ? (f - e) / 6048e5
                    : f)),
            c ? g : s(g))
          : NaN)
      : NaN;
  }
  function bc(a, b) {
    // difference in months
    var c,
      d,
      e = 12 * (b.year() - a.year()) + (b.month() - a.month()),
      // b is in (anchor - 1 month, anchor + 1 month)
      f = a.clone().add(e, "months");
    //check for negative zero, return zero if negative zero
    // linear across the month
    // linear across the month
    return (
      b - f < 0
        ? ((c = a.clone().add(e - 1, "months")), (d = (b - f) / (f - c)))
        : ((c = a.clone().add(e + 1, "months")), (d = (b - f) / (c - f))),
      -(e + d) || 0
    );
  }
  function cc() {
    return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
  }
  function dc() {
    var a = this.clone().utc();
    return 0 < a.year() && a.year() <= 9999
      ? y(Date.prototype.toISOString)
        ? this.toDate().toISOString()
        : W(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
      : W(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
  }
  function ec(b) {
    b || (b = this.isUtc() ? a.defaultFormatUtc : a.defaultFormat);
    var c = W(this, b);
    return this.localeData().postformat(c);
  }
  function fc(a, b) {
    return this.isValid() && ((r(a) && a.isValid()) || rb(a).isValid())
      ? Nb({ to: this, from: a }).locale(this.locale()).humanize(!b)
      : this.localeData().invalidDate();
  }
  function gc(a) {
    return this.from(rb(), a);
  }
  function hc(a, b) {
    return this.isValid() && ((r(a) && a.isValid()) || rb(a).isValid())
      ? Nb({ from: this, to: a }).locale(this.locale()).humanize(!b)
      : this.localeData().invalidDate();
  }
  function ic(a) {
    return this.to(rb(), a);
  }
  // If passed a locale key, it will set the locale for this
  // instance.  Otherwise, it will return the locale configuration
  // variables for this instance.
  function jc(a) {
    var b;
    return void 0 === a
      ? this._locale._abbr
      : ((b = ab(a)), null != b && (this._locale = b), this);
  }
  function kc() {
    return this._locale;
  }
  function lc(a) {
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch ((a = J(a))) {
      case "year":
        this.month(0); /* falls through */
      case "quarter":
      case "month":
        this.date(1); /* falls through */
      case "week":
      case "isoWeek":
      case "day":
      case "date":
        this.hours(0); /* falls through */
      case "hour":
        this.minutes(0); /* falls through */
      case "minute":
        this.seconds(0); /* falls through */
      case "second":
        this.milliseconds(0);
    }
    // weeks are a special case
    // quarters are also special
    return (
      "week" === a && this.weekday(0),
      "isoWeek" === a && this.isoWeekday(1),
      "quarter" === a && this.month(3 * Math.floor(this.month() / 3)),
      this
    );
  }
  function mc(a) {
    // 'date' is an alias for 'day', so it should be considered as such.
    return (
      (a = J(a)),
      void 0 === a || "millisecond" === a
        ? this
        : ("date" === a && (a = "day"),
          this.startOf(a)
            .add(1, "isoWeek" === a ? "week" : a)
            .subtract(1, "ms"))
    );
  }
  function nc() {
    return this._d.valueOf() - 6e4 * (this._offset || 0);
  }
  function oc() {
    return Math.floor(this.valueOf() / 1e3);
  }
  function pc() {
    return new Date(this.valueOf());
  }
  function qc() {
    var a = this;
    return [
      a.year(),
      a.month(),
      a.date(),
      a.hour(),
      a.minute(),
      a.second(),
      a.millisecond(),
    ];
  }
  function rc() {
    var a = this;
    return {
      years: a.year(),
      months: a.month(),
      date: a.date(),
      hours: a.hours(),
      minutes: a.minutes(),
      seconds: a.seconds(),
      milliseconds: a.milliseconds(),
    };
  }
  function sc() {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
  }
  function tc() {
    return m(this);
  }
  function uc() {
    return i({}, l(this));
  }
  function vc() {
    return l(this).overflow;
  }
  function wc() {
    return {
      input: this._i,
      format: this._f,
      locale: this._locale,
      isUTC: this._isUTC,
      strict: this._strict,
    };
  }
  function xc(a, b) {
    T(0, [a, a.length], 0, b);
  }
  // MOMENTS
  function yc(a) {
    return Cc.call(
      this,
      a,
      this.week(),
      this.weekday(),
      this.localeData()._week.dow,
      this.localeData()._week.doy
    );
  }
  function zc(a) {
    return Cc.call(this, a, this.isoWeek(), this.isoWeekday(), 1, 4);
  }
  function Ac() {
    return wa(this.year(), 1, 4);
  }
  function Bc() {
    var a = this.localeData()._week;
    return wa(this.year(), a.dow, a.doy);
  }
  function Cc(a, b, c, d, e) {
    var f;
    return null == a
      ? va(this, d, e).year
      : ((f = wa(a, d, e)), b > f && (b = f), Dc.call(this, a, b, c, d, e));
  }
  function Dc(a, b, c, d, e) {
    var f = ua(a, b, c, d, e),
      g = sa(f.year, 0, f.dayOfYear);
    return (
      this.year(g.getUTCFullYear()),
      this.month(g.getUTCMonth()),
      this.date(g.getUTCDate()),
      this
    );
  }
  // MOMENTS
  function Ec(a) {
    return null == a
      ? Math.ceil((this.month() + 1) / 3)
      : this.month(3 * (a - 1) + (this.month() % 3));
  }
  // HELPERS
  // MOMENTS
  function Fc(a) {
    var b =
      Math.round(
        (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
      ) + 1;
    return null == a ? b : this.add(a - b, "d");
  }
  function Gc(a, b) {
    b[ce] = t(1e3 * ("0." + a));
  }
  // MOMENTS
  function Hc() {
    return this._isUTC ? "UTC" : "";
  }
  function Ic() {
    return this._isUTC ? "Coordinated Universal Time" : "";
  }
  function Jc(a) {
    return rb(1e3 * a);
  }
  function Kc() {
    return rb.apply(null, arguments).parseZone();
  }
  function Lc(a) {
    return a;
  }
  function Mc(a, b, c, d) {
    var e = ab(),
      f = j().set(d, b);
    return e[c](f, a);
  }
  function Nc(a, b, c) {
    if (
      ("number" == typeof a && ((b = a), (a = void 0)),
      (a = a || ""),
      null != b)
    )
      return Mc(a, b, c, "month");
    var d,
      e = [];
    for (d = 0; d < 12; d++) e[d] = Mc(a, d, c, "month");
    return e;
  }
  // ()
  // (5)
  // (fmt, 5)
  // (fmt)
  // (true)
  // (true, 5)
  // (true, fmt, 5)
  // (true, fmt)
  function Oc(a, b, c, d) {
    "boolean" == typeof a
      ? ("number" == typeof b && ((c = b), (b = void 0)), (b = b || ""))
      : ((b = a),
        (c = b),
        (a = !1),
        "number" == typeof b && ((c = b), (b = void 0)),
        (b = b || ""));
    var e = ab(),
      f = a ? e._week.dow : 0;
    if (null != c) return Mc(b, (c + f) % 7, d, "day");
    var g,
      h = [];
    for (g = 0; g < 7; g++) h[g] = Mc(b, (g + f) % 7, d, "day");
    return h;
  }
  function Pc(a, b) {
    return Nc(a, b, "months");
  }
  function Qc(a, b) {
    return Nc(a, b, "monthsShort");
  }
  function Rc(a, b, c) {
    return Oc(a, b, c, "weekdays");
  }
  function Sc(a, b, c) {
    return Oc(a, b, c, "weekdaysShort");
  }
  function Tc(a, b, c) {
    return Oc(a, b, c, "weekdaysMin");
  }
  function Uc() {
    var a = this._data;
    return (
      (this._milliseconds = Ue(this._milliseconds)),
      (this._days = Ue(this._days)),
      (this._months = Ue(this._months)),
      (a.milliseconds = Ue(a.milliseconds)),
      (a.seconds = Ue(a.seconds)),
      (a.minutes = Ue(a.minutes)),
      (a.hours = Ue(a.hours)),
      (a.months = Ue(a.months)),
      (a.years = Ue(a.years)),
      this
    );
  }
  function Vc(a, b, c, d) {
    var e = Nb(b, c);
    return (
      (a._milliseconds += d * e._milliseconds),
      (a._days += d * e._days),
      (a._months += d * e._months),
      a._bubble()
    );
  }
  // supports only 2.0-style add(1, 's') or add(duration)
  function Wc(a, b) {
    return Vc(this, a, b, 1);
  }
  // supports only 2.0-style subtract(1, 's') or subtract(duration)
  function Xc(a, b) {
    return Vc(this, a, b, -1);
  }
  function Yc(a) {
    return a < 0 ? Math.floor(a) : Math.ceil(a);
  }
  function Zc() {
    var a,
      b,
      c,
      d,
      e,
      f = this._milliseconds,
      g = this._days,
      h = this._months,
      i = this._data;
    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    // The following code bubbles up values, see the tests for
    // examples of what that means.
    // convert days to months
    // 12 months -> 1 year
    return (
      (f >= 0 && g >= 0 && h >= 0) ||
        (f <= 0 && g <= 0 && h <= 0) ||
        ((f += 864e5 * Yc(_c(h) + g)), (g = 0), (h = 0)),
      (i.milliseconds = f % 1e3),
      (a = s(f / 1e3)),
      (i.seconds = a % 60),
      (b = s(a / 60)),
      (i.minutes = b % 60),
      (c = s(b / 60)),
      (i.hours = c % 24),
      (g += s(c / 24)),
      (e = s($c(g))),
      (h += e),
      (g -= Yc(_c(e))),
      (d = s(h / 12)),
      (h %= 12),
      (i.days = g),
      (i.months = h),
      (i.years = d),
      this
    );
  }
  function $c(a) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return (4800 * a) / 146097;
  }
  function _c(a) {
    // the reverse of daysToMonths
    return (146097 * a) / 4800;
  }
  function ad(a) {
    var b,
      c,
      d = this._milliseconds;
    if (((a = J(a)), "month" === a || "year" === a))
      return (
        (b = this._days + d / 864e5),
        (c = this._months + $c(b)),
        "month" === a ? c : c / 12
      );
    switch (
      // handle milliseconds separately because of floating point math errors (issue #1867)
      ((b = this._days + Math.round(_c(this._months))), a)
    ) {
      case "week":
        return b / 7 + d / 6048e5;
      case "day":
        return b + d / 864e5;
      case "hour":
        return 24 * b + d / 36e5;
      case "minute":
        return 1440 * b + d / 6e4;
      case "second":
        return 86400 * b + d / 1e3;
      // Math.floor prevents floating point math errors here
      case "millisecond":
        return Math.floor(864e5 * b) + d;
      default:
        throw new Error("Unknown unit " + a);
    }
  }
  // TODO: Use this.as('ms')?
  function bd() {
    return (
      this._milliseconds +
      864e5 * this._days +
      (this._months % 12) * 2592e6 +
      31536e6 * t(this._months / 12)
    );
  }
  function cd(a) {
    return function () {
      return this.as(a);
    };
  }
  function dd(a) {
    return (a = J(a)), this[a + "s"]();
  }
  function ed(a) {
    return function () {
      return this._data[a];
    };
  }
  function fd() {
    return s(this.days() / 7);
  }
  // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
  function gd(a, b, c, d, e) {
    return e.relativeTime(b || 1, !!c, a, d);
  }
  function hd(a, b, c) {
    var d = Nb(a).abs(),
      e = jf(d.as("s")),
      f = jf(d.as("m")),
      g = jf(d.as("h")),
      h = jf(d.as("d")),
      i = jf(d.as("M")),
      j = jf(d.as("y")),
      k = (e < kf.s && ["s", e]) ||
        (f <= 1 && ["m"]) ||
        (f < kf.m && ["mm", f]) ||
        (g <= 1 && ["h"]) ||
        (g < kf.h && ["hh", g]) ||
        (h <= 1 && ["d"]) ||
        (h < kf.d && ["dd", h]) ||
        (i <= 1 && ["M"]) ||
        (i < kf.M && ["MM", i]) ||
        (j <= 1 && ["y"]) || ["yy", j];
    return (k[2] = b), (k[3] = +a > 0), (k[4] = c), gd.apply(null, k);
  }
  // This function allows you to set the rounding function for relative time strings
  function id(a) {
    return void 0 === a ? jf : "function" == typeof a && ((jf = a), !0);
  }
  // This function allows you to set a threshold for relative time strings
  function jd(a, b) {
    return void 0 !== kf[a] && (void 0 === b ? kf[a] : ((kf[a] = b), !0));
  }
  function kd(a) {
    var b = this.localeData(),
      c = hd(this, !a, b);
    return a && (c = b.pastFuture(+this, c)), b.postformat(c);
  }
  function ld() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    var a,
      b,
      c,
      d = lf(this._milliseconds) / 1e3,
      e = lf(this._days),
      f = lf(this._months);
    // 3600 seconds -> 60 minutes -> 1 hour
    (a = s(d / 60)),
      (b = s(a / 60)),
      (d %= 60),
      (a %= 60),
      // 12 months -> 1 year
      (c = s(f / 12)),
      (f %= 12);
    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    var g = c,
      h = f,
      i = e,
      j = b,
      k = a,
      l = d,
      m = this.asSeconds();
    return m
      ? (m < 0 ? "-" : "") +
          "P" +
          (g ? g + "Y" : "") +
          (h ? h + "M" : "") +
          (i ? i + "D" : "") +
          (j || k || l ? "T" : "") +
          (j ? j + "H" : "") +
          (k ? k + "M" : "") +
          (l ? l + "S" : "")
      : "P0D";
  }
  var md, nd;
  nd = Array.prototype.some
    ? Array.prototype.some
    : function (a) {
        for (var b = Object(this), c = b.length >>> 0, d = 0; d < c; d++)
          if (d in b && a.call(this, b[d], d, b)) return !0;
        return !1;
      };
  // Plugins that add properties should also add the key here (null value),
  // so we can properly clone ourselves.
  var od = (a.momentProperties = []),
    pd = !1,
    qd = {};
  (a.suppressDeprecationWarnings = !1), (a.deprecationHandler = null);
  var rd;
  rd = Object.keys
    ? Object.keys
    : function (a) {
        var b,
          c = [];
        for (b in a) h(a, b) && c.push(b);
        return c;
      };
  var sd,
    td = {
      sameDay: "[Today at] LT",
      nextDay: "[Tomorrow at] LT",
      nextWeek: "dddd [at] LT",
      lastDay: "[Yesterday at] LT",
      lastWeek: "[Last] dddd [at] LT",
      sameElse: "L",
    },
    ud = {
      LTS: "h:mm:ss A",
      LT: "h:mm A",
      L: "MM/DD/YYYY",
      LL: "MMMM D, YYYY",
      LLL: "MMMM D, YYYY h:mm A",
      LLLL: "dddd, MMMM D, YYYY h:mm A",
    },
    vd = "Invalid date",
    wd = "%d",
    xd = /\d{1,2}/,
    yd = {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years",
    },
    zd = {},
    Ad = {},
    Bd =
      /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
    Cd = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
    Dd = {},
    Ed = {},
    Fd = /\d/,
    Gd = /\d\d/,
    Hd = /\d{3}/,
    Id = /\d{4}/,
    Jd = /[+-]?\d{6}/,
    Kd = /\d\d?/,
    Ld = /\d\d\d\d?/,
    Md = /\d\d\d\d\d\d?/,
    Nd = /\d{1,3}/,
    Od = /\d{1,4}/,
    Pd = /[+-]?\d{1,6}/,
    Qd = /\d+/,
    Rd = /[+-]?\d+/,
    Sd = /Z|[+-]\d\d:?\d\d/gi,
    Td = /Z|[+-]\d\d(?::?\d\d)?/gi,
    Ud = /[+-]?\d+(\.\d{1,3})?/,
    Vd =
      /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
    Wd = {},
    Xd = {},
    Yd = 0,
    Zd = 1,
    $d = 2,
    _d = 3,
    ae = 4,
    be = 5,
    ce = 6,
    de = 7,
    ee = 8;
  (sd = Array.prototype.indexOf
    ? Array.prototype.indexOf
    : function (a) {
        // I know
        var b;
        for (b = 0; b < this.length; ++b) if (this[b] === a) return b;
        return -1;
      }),
    // FORMATTING
    T("M", ["MM", 2], "Mo", function () {
      return this.month() + 1;
    }),
    T("MMM", 0, 0, function (a) {
      return this.localeData().monthsShort(this, a);
    }),
    T("MMMM", 0, 0, function (a) {
      return this.localeData().months(this, a);
    }),
    // ALIASES
    I("month", "M"),
    // PRIORITY
    L("month", 8),
    // PARSING
    Y("M", Kd),
    Y("MM", Kd, Gd),
    Y("MMM", function (a, b) {
      return b.monthsShortRegex(a);
    }),
    Y("MMMM", function (a, b) {
      return b.monthsRegex(a);
    }),
    aa(["M", "MM"], function (a, b) {
      b[Zd] = t(a) - 1;
    }),
    aa(["MMM", "MMMM"], function (a, b, c, d) {
      var e = c._locale.monthsParse(a, d, c._strict);
      // if we didn't find a month name, mark the date as invalid.
      null != e ? (b[Zd] = e) : (l(c).invalidMonth = a);
    });
  // LOCALES
  var fe = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
    ge =
      "January_February_March_April_May_June_July_August_September_October_November_December".split(
        "_"
      ),
    he = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
    ie = Vd,
    je = Vd;
  // FORMATTING
  T("Y", 0, 0, function () {
    var a = this.year();
    return a <= 9999 ? "" + a : "+" + a;
  }),
    T(0, ["YY", 2], 0, function () {
      return this.year() % 100;
    }),
    T(0, ["YYYY", 4], 0, "year"),
    T(0, ["YYYYY", 5], 0, "year"),
    T(0, ["YYYYYY", 6, !0], 0, "year"),
    // ALIASES
    I("year", "y"),
    // PRIORITIES
    L("year", 1),
    // PARSING
    Y("Y", Rd),
    Y("YY", Kd, Gd),
    Y("YYYY", Od, Id),
    Y("YYYYY", Pd, Jd),
    Y("YYYYYY", Pd, Jd),
    aa(["YYYYY", "YYYYYY"], Yd),
    aa("YYYY", function (b, c) {
      c[Yd] = 2 === b.length ? a.parseTwoDigitYear(b) : t(b);
    }),
    aa("YY", function (b, c) {
      c[Yd] = a.parseTwoDigitYear(b);
    }),
    aa("Y", function (a, b) {
      b[Yd] = parseInt(a, 10);
    }),
    // HOOKS
    (a.parseTwoDigitYear = function (a) {
      return t(a) + (t(a) > 68 ? 1900 : 2e3);
    });
  // MOMENTS
  var ke = N("FullYear", !0);
  // FORMATTING
  T("w", ["ww", 2], "wo", "week"),
    T("W", ["WW", 2], "Wo", "isoWeek"),
    // ALIASES
    I("week", "w"),
    I("isoWeek", "W"),
    // PRIORITIES
    L("week", 5),
    L("isoWeek", 5),
    // PARSING
    Y("w", Kd),
    Y("ww", Kd, Gd),
    Y("W", Kd),
    Y("WW", Kd, Gd),
    ba(["w", "ww", "W", "WW"], function (a, b, c, d) {
      b[d.substr(0, 1)] = t(a);
    });
  var le = {
    dow: 0, // Sunday is the first day of the week.
    doy: 6,
  };
  // FORMATTING
  T("d", 0, "do", "day"),
    T("dd", 0, 0, function (a) {
      return this.localeData().weekdaysMin(this, a);
    }),
    T("ddd", 0, 0, function (a) {
      return this.localeData().weekdaysShort(this, a);
    }),
    T("dddd", 0, 0, function (a) {
      return this.localeData().weekdays(this, a);
    }),
    T("e", 0, 0, "weekday"),
    T("E", 0, 0, "isoWeekday"),
    // ALIASES
    I("day", "d"),
    I("weekday", "e"),
    I("isoWeekday", "E"),
    // PRIORITY
    L("day", 11),
    L("weekday", 11),
    L("isoWeekday", 11),
    // PARSING
    Y("d", Kd),
    Y("e", Kd),
    Y("E", Kd),
    Y("dd", function (a, b) {
      return b.weekdaysMinRegex(a);
    }),
    Y("ddd", function (a, b) {
      return b.weekdaysShortRegex(a);
    }),
    Y("dddd", function (a, b) {
      return b.weekdaysRegex(a);
    }),
    ba(["dd", "ddd", "dddd"], function (a, b, c, d) {
      var e = c._locale.weekdaysParse(a, d, c._strict);
      // if we didn't get a weekday name, mark the date as invalid
      null != e ? (b.d = e) : (l(c).invalidWeekday = a);
    }),
    ba(["d", "e", "E"], function (a, b, c, d) {
      b[d] = t(a);
    });
  // LOCALES
  var me = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
      "_"
    ),
    ne = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    oe = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
    pe = Vd,
    qe = Vd,
    re = Vd;
  T("H", ["HH", 2], 0, "hour"),
    T("h", ["hh", 2], 0, Qa),
    T("k", ["kk", 2], 0, Ra),
    T("hmm", 0, 0, function () {
      return "" + Qa.apply(this) + S(this.minutes(), 2);
    }),
    T("hmmss", 0, 0, function () {
      return "" + Qa.apply(this) + S(this.minutes(), 2) + S(this.seconds(), 2);
    }),
    T("Hmm", 0, 0, function () {
      return "" + this.hours() + S(this.minutes(), 2);
    }),
    T("Hmmss", 0, 0, function () {
      return "" + this.hours() + S(this.minutes(), 2) + S(this.seconds(), 2);
    }),
    Sa("a", !0),
    Sa("A", !1),
    // ALIASES
    I("hour", "h"),
    // PRIORITY
    L("hour", 13),
    Y("a", Ta),
    Y("A", Ta),
    Y("H", Kd),
    Y("h", Kd),
    Y("HH", Kd, Gd),
    Y("hh", Kd, Gd),
    Y("hmm", Ld),
    Y("hmmss", Md),
    Y("Hmm", Ld),
    Y("Hmmss", Md),
    aa(["H", "HH"], _d),
    aa(["a", "A"], function (a, b, c) {
      (c._isPm = c._locale.isPM(a)), (c._meridiem = a);
    }),
    aa(["h", "hh"], function (a, b, c) {
      (b[_d] = t(a)), (l(c).bigHour = !0);
    }),
    aa("hmm", function (a, b, c) {
      var d = a.length - 2;
      (b[_d] = t(a.substr(0, d))),
        (b[ae] = t(a.substr(d))),
        (l(c).bigHour = !0);
    }),
    aa("hmmss", function (a, b, c) {
      var d = a.length - 4,
        e = a.length - 2;
      (b[_d] = t(a.substr(0, d))),
        (b[ae] = t(a.substr(d, 2))),
        (b[be] = t(a.substr(e))),
        (l(c).bigHour = !0);
    }),
    aa("Hmm", function (a, b, c) {
      var d = a.length - 2;
      (b[_d] = t(a.substr(0, d))), (b[ae] = t(a.substr(d)));
    }),
    aa("Hmmss", function (a, b, c) {
      var d = a.length - 4,
        e = a.length - 2;
      (b[_d] = t(a.substr(0, d))),
        (b[ae] = t(a.substr(d, 2))),
        (b[be] = t(a.substr(e)));
    });
  var se,
    te = /[ap]\.?m?\.?/i,
    ue = N("Hours", !0),
    ve = {
      calendar: td,
      longDateFormat: ud,
      invalidDate: vd,
      ordinal: wd,
      ordinalParse: xd,
      relativeTime: yd,
      months: ge,
      monthsShort: he,
      week: le,
      weekdays: me,
      weekdaysMin: oe,
      weekdaysShort: ne,
      meridiemParse: te,
    },
    we = {},
    xe =
      /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
    ye =
      /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
    ze = /Z|[+-]\d\d(?::?\d\d)?/,
    Ae = [
      ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
      ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
      ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
      ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
      ["YYYY-DDD", /\d{4}-\d{3}/],
      ["YYYY-MM", /\d{4}-\d\d/, !1],
      ["YYYYYYMMDD", /[+-]\d{10}/],
      ["YYYYMMDD", /\d{8}/],
      // YYYYMM is NOT allowed by the standard
      ["GGGG[W]WWE", /\d{4}W\d{3}/],
      ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
      ["YYYYDDD", /\d{7}/],
    ],
    Be = [
      ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
      ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
      ["HH:mm:ss", /\d\d:\d\d:\d\d/],
      ["HH:mm", /\d\d:\d\d/],
      ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
      ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
      ["HHmmss", /\d\d\d\d\d\d/],
      ["HHmm", /\d\d\d\d/],
      ["HH", /\d\d/],
    ],
    Ce = /^\/?Date\((\-?\d+)/i;
  (a.createFromInputFallback = w(
    "value provided is not in a recognized ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
    function (a) {
      a._d = new Date(a._i + (a._useUTC ? " UTC" : ""));
    }
  )),
    // constant that refers to the ISO standard
    (a.ISO_8601 = function () {});
  var De = w(
      "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
      function () {
        var a = rb.apply(null, arguments);
        return this.isValid() && a.isValid() ? (a < this ? this : a) : n();
      }
    ),
    Ee = w(
      "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
      function () {
        var a = rb.apply(null, arguments);
        return this.isValid() && a.isValid() ? (a > this ? this : a) : n();
      }
    ),
    Fe = function () {
      return Date.now ? Date.now() : +new Date();
    };
  yb("Z", ":"),
    yb("ZZ", ""),
    // PARSING
    Y("Z", Td),
    Y("ZZ", Td),
    aa(["Z", "ZZ"], function (a, b, c) {
      (c._useUTC = !0), (c._tzm = zb(Td, a));
    });
  // HELPERS
  // timezone chunker
  // '+10:00' > ['10',  '00']
  // '-1530'  > ['-15', '30']
  var Ge = /([\+\-]|\d\d)/gi;
  // HOOKS
  // This function will be called whenever a moment is mutated.
  // It is intended to keep the offset in sync with the timezone.
  a.updateOffset = function () {};
  // ASP.NET json date format regex
  var He = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
    Ie =
      /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
  Nb.fn = vb.prototype;
  var Je = Rb(1, "add"),
    Ke = Rb(-1, "subtract");
  (a.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ"),
    (a.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]");
  var Le = w(
    "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
    function (a) {
      return void 0 === a ? this.localeData() : this.locale(a);
    }
  );
  // FORMATTING
  T(0, ["gg", 2], 0, function () {
    return this.weekYear() % 100;
  }),
    T(0, ["GG", 2], 0, function () {
      return this.isoWeekYear() % 100;
    }),
    xc("gggg", "weekYear"),
    xc("ggggg", "weekYear"),
    xc("GGGG", "isoWeekYear"),
    xc("GGGGG", "isoWeekYear"),
    // ALIASES
    I("weekYear", "gg"),
    I("isoWeekYear", "GG"),
    // PRIORITY
    L("weekYear", 1),
    L("isoWeekYear", 1),
    // PARSING
    Y("G", Rd),
    Y("g", Rd),
    Y("GG", Kd, Gd),
    Y("gg", Kd, Gd),
    Y("GGGG", Od, Id),
    Y("gggg", Od, Id),
    Y("GGGGG", Pd, Jd),
    Y("ggggg", Pd, Jd),
    ba(["gggg", "ggggg", "GGGG", "GGGGG"], function (a, b, c, d) {
      b[d.substr(0, 2)] = t(a);
    }),
    ba(["gg", "GG"], function (b, c, d, e) {
      c[e] = a.parseTwoDigitYear(b);
    }),
    // FORMATTING
    T("Q", 0, "Qo", "quarter"),
    // ALIASES
    I("quarter", "Q"),
    // PRIORITY
    L("quarter", 7),
    // PARSING
    Y("Q", Fd),
    aa("Q", function (a, b) {
      b[Zd] = 3 * (t(a) - 1);
    }),
    // FORMATTING
    T("D", ["DD", 2], "Do", "date"),
    // ALIASES
    I("date", "D"),
    // PRIOROITY
    L("date", 9),
    // PARSING
    Y("D", Kd),
    Y("DD", Kd, Gd),
    Y("Do", function (a, b) {
      return a ? b._ordinalParse : b._ordinalParseLenient;
    }),
    aa(["D", "DD"], $d),
    aa("Do", function (a, b) {
      b[$d] = t(a.match(Kd)[0], 10);
    });
  // MOMENTS
  var Me = N("Date", !0);
  // FORMATTING
  T("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
    // ALIASES
    I("dayOfYear", "DDD"),
    // PRIORITY
    L("dayOfYear", 4),
    // PARSING
    Y("DDD", Nd),
    Y("DDDD", Hd),
    aa(["DDD", "DDDD"], function (a, b, c) {
      c._dayOfYear = t(a);
    }),
    // FORMATTING
    T("m", ["mm", 2], 0, "minute"),
    // ALIASES
    I("minute", "m"),
    // PRIORITY
    L("minute", 14),
    // PARSING
    Y("m", Kd),
    Y("mm", Kd, Gd),
    aa(["m", "mm"], ae);
  // MOMENTS
  var Ne = N("Minutes", !1);
  // FORMATTING
  T("s", ["ss", 2], 0, "second"),
    // ALIASES
    I("second", "s"),
    // PRIORITY
    L("second", 15),
    // PARSING
    Y("s", Kd),
    Y("ss", Kd, Gd),
    aa(["s", "ss"], be);
  // MOMENTS
  var Oe = N("Seconds", !1);
  // FORMATTING
  T("S", 0, 0, function () {
    return ~~(this.millisecond() / 100);
  }),
    T(0, ["SS", 2], 0, function () {
      return ~~(this.millisecond() / 10);
    }),
    T(0, ["SSS", 3], 0, "millisecond"),
    T(0, ["SSSS", 4], 0, function () {
      return 10 * this.millisecond();
    }),
    T(0, ["SSSSS", 5], 0, function () {
      return 100 * this.millisecond();
    }),
    T(0, ["SSSSSS", 6], 0, function () {
      return 1e3 * this.millisecond();
    }),
    T(0, ["SSSSSSS", 7], 0, function () {
      return 1e4 * this.millisecond();
    }),
    T(0, ["SSSSSSSS", 8], 0, function () {
      return 1e5 * this.millisecond();
    }),
    T(0, ["SSSSSSSSS", 9], 0, function () {
      return 1e6 * this.millisecond();
    }),
    // ALIASES
    I("millisecond", "ms"),
    // PRIORITY
    L("millisecond", 16),
    // PARSING
    Y("S", Nd, Fd),
    Y("SS", Nd, Gd),
    Y("SSS", Nd, Hd);
  var Pe;
  for (Pe = "SSSS"; Pe.length <= 9; Pe += "S") Y(Pe, Qd);
  for (Pe = "S"; Pe.length <= 9; Pe += "S") aa(Pe, Gc);
  // MOMENTS
  var Qe = N("Milliseconds", !1);
  // FORMATTING
  T("z", 0, 0, "zoneAbbr"), T("zz", 0, 0, "zoneName");
  var Re = q.prototype;
  (Re.add = Je),
    (Re.calendar = Ub),
    (Re.clone = Vb),
    (Re.diff = ac),
    (Re.endOf = mc),
    (Re.format = ec),
    (Re.from = fc),
    (Re.fromNow = gc),
    (Re.to = hc),
    (Re.toNow = ic),
    (Re.get = Q),
    (Re.invalidAt = vc),
    (Re.isAfter = Wb),
    (Re.isBefore = Xb),
    (Re.isBetween = Yb),
    (Re.isSame = Zb),
    (Re.isSameOrAfter = $b),
    (Re.isSameOrBefore = _b),
    (Re.isValid = tc),
    (Re.lang = Le),
    (Re.locale = jc),
    (Re.localeData = kc),
    (Re.max = Ee),
    (Re.min = De),
    (Re.parsingFlags = uc),
    (Re.set = R),
    (Re.startOf = lc),
    (Re.subtract = Ke),
    (Re.toArray = qc),
    (Re.toObject = rc),
    (Re.toDate = pc),
    (Re.toISOString = dc),
    (Re.toJSON = sc),
    (Re.toString = cc),
    (Re.unix = oc),
    (Re.valueOf = nc),
    (Re.creationData = wc),
    // Year
    (Re.year = ke),
    (Re.isLeapYear = qa),
    // Week Year
    (Re.weekYear = yc),
    (Re.isoWeekYear = zc),
    // Quarter
    (Re.quarter = Re.quarters = Ec),
    // Month
    (Re.month = ja),
    (Re.daysInMonth = ka),
    // Week
    (Re.week = Re.weeks = Aa),
    (Re.isoWeek = Re.isoWeeks = Ba),
    (Re.weeksInYear = Bc),
    (Re.isoWeeksInYear = Ac),
    // Day
    (Re.date = Me),
    (Re.day = Re.days = Ja),
    (Re.weekday = Ka),
    (Re.isoWeekday = La),
    (Re.dayOfYear = Fc),
    // Hour
    (Re.hour = Re.hours = ue),
    // Minute
    (Re.minute = Re.minutes = Ne),
    // Second
    (Re.second = Re.seconds = Oe),
    // Millisecond
    (Re.millisecond = Re.milliseconds = Qe),
    // Offset
    (Re.utcOffset = Cb),
    (Re.utc = Eb),
    (Re.local = Fb),
    (Re.parseZone = Gb),
    (Re.hasAlignedHourOffset = Hb),
    (Re.isDST = Ib),
    (Re.isLocal = Kb),
    (Re.isUtcOffset = Lb),
    (Re.isUtc = Mb),
    (Re.isUTC = Mb),
    // Timezone
    (Re.zoneAbbr = Hc),
    (Re.zoneName = Ic),
    // Deprecations
    (Re.dates = w("dates accessor is deprecated. Use date instead.", Me)),
    (Re.months = w("months accessor is deprecated. Use month instead", ja)),
    (Re.years = w("years accessor is deprecated. Use year instead", ke)),
    (Re.zone = w(
      "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
      Db
    )),
    (Re.isDSTShifted = w(
      "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
      Jb
    ));
  var Se = Re,
    Te = B.prototype;
  (Te.calendar = C),
    (Te.longDateFormat = D),
    (Te.invalidDate = E),
    (Te.ordinal = F),
    (Te.preparse = Lc),
    (Te.postformat = Lc),
    (Te.relativeTime = G),
    (Te.pastFuture = H),
    (Te.set = z),
    // Month
    (Te.months = ea),
    (Te.monthsShort = fa),
    (Te.monthsParse = ha),
    (Te.monthsRegex = ma),
    (Te.monthsShortRegex = la),
    // Week
    (Te.week = xa),
    (Te.firstDayOfYear = za),
    (Te.firstDayOfWeek = ya),
    // Day of Week
    (Te.weekdays = Ea),
    (Te.weekdaysMin = Ga),
    (Te.weekdaysShort = Fa),
    (Te.weekdaysParse = Ia),
    (Te.weekdaysRegex = Ma),
    (Te.weekdaysShortRegex = Na),
    (Te.weekdaysMinRegex = Oa),
    // Hours
    (Te.isPM = Ua),
    (Te.meridiem = Va),
    Za("en", {
      ordinalParse: /\d{1,2}(th|st|nd|rd)/,
      ordinal: function (a) {
        var b = a % 10,
          c =
            1 === t((a % 100) / 10)
              ? "th"
              : 1 === b
              ? "st"
              : 2 === b
              ? "nd"
              : 3 === b
              ? "rd"
              : "th";
        return a + c;
      },
    }),
    // Side effect imports
    (a.lang = w("moment.lang is deprecated. Use moment.locale instead.", Za)),
    (a.langData = w(
      "moment.langData is deprecated. Use moment.localeData instead.",
      ab
    ));
  var Ue = Math.abs,
    Ve = cd("ms"),
    We = cd("s"),
    Xe = cd("m"),
    Ye = cd("h"),
    Ze = cd("d"),
    $e = cd("w"),
    _e = cd("M"),
    af = cd("y"),
    bf = ed("milliseconds"),
    cf = ed("seconds"),
    df = ed("minutes"),
    ef = ed("hours"),
    ff = ed("days"),
    gf = ed("months"),
    hf = ed("years"),
    jf = Math.round,
    kf = {
      s: 45, // seconds to minute
      m: 45, // minutes to hour
      h: 22, // hours to day
      d: 26, // days to month
      M: 11,
    },
    lf = Math.abs,
    mf = vb.prototype;
  (mf.abs = Uc),
    (mf.add = Wc),
    (mf.subtract = Xc),
    (mf.as = ad),
    (mf.asMilliseconds = Ve),
    (mf.asSeconds = We),
    (mf.asMinutes = Xe),
    (mf.asHours = Ye),
    (mf.asDays = Ze),
    (mf.asWeeks = $e),
    (mf.asMonths = _e),
    (mf.asYears = af),
    (mf.valueOf = bd),
    (mf._bubble = Zc),
    (mf.get = dd),
    (mf.milliseconds = bf),
    (mf.seconds = cf),
    (mf.minutes = df),
    (mf.hours = ef),
    (mf.days = ff),
    (mf.weeks = fd),
    (mf.months = gf),
    (mf.years = hf),
    (mf.humanize = kd),
    (mf.toISOString = ld),
    (mf.toString = ld),
    (mf.toJSON = ld),
    (mf.locale = jc),
    (mf.localeData = kc),
    // Deprecations
    (mf.toIsoString = w(
      "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
      ld
    )),
    (mf.lang = Le),
    // Side effect imports
    // FORMATTING
    T("X", 0, 0, "unix"),
    T("x", 0, 0, "valueOf"),
    // PARSING
    Y("x", Rd),
    Y("X", Ud),
    aa("X", function (a, b, c) {
      c._d = new Date(1e3 * parseFloat(a, 10));
    }),
    aa("x", function (a, b, c) {
      c._d = new Date(t(a));
    }),
    // Side effect imports
    (a.version = "2.15.2"),
    b(rb),
    (a.fn = Se),
    (a.min = tb),
    (a.max = ub),
    (a.now = Fe),
    (a.utc = j),
    (a.unix = Jc),
    (a.months = Pc),
    (a.isDate = f),
    (a.locale = Za),
    (a.invalid = n),
    (a.duration = Nb),
    (a.isMoment = r),
    (a.weekdays = Rc),
    (a.parseZone = Kc),
    (a.localeData = ab),
    (a.isDuration = wb),
    (a.monthsShort = Qc),
    (a.weekdaysMin = Tc),
    (a.defineLocale = $a),
    (a.updateLocale = _a),
    (a.locales = bb),
    (a.weekdaysShort = Sc),
    (a.normalizeUnits = J),
    (a.relativeTimeRounding = id),
    (a.relativeTimeThreshold = jd),
    (a.calendarFormat = Tb),
    (a.prototype = Se);
  var nf = a;
  return nf;
});
var EATLAS_NCANIMATE2_MEDIA_MAX_HEIGHT = 800;

/**
 * Developed to scroll to the visualisation when new media is loaded. If there is no 
 * scrolling, then it is not obvious that anything has happened when a hash link has been clicked.
 */
function scrollToVisualisation() {
  const targetDiv = document.getElementById('block-eatlas-ncanimate2-eatlas-ncanimate2-1');

  if (targetDiv) {
    const divTop = targetDiv.offsetTop;

    if (window.scrollY > divTop) {
      // console.log(`window.scrollY = ${window.scrollY}`)
      // console.log(`divTop = ${divTop}`)

      // We are scrolled below the div, let's scroll to the div
      // console.log("scrolling to top")
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // window.scrollTo({ top: divTop, behavior: 'smooth' });  // this works, but the top menu bar appears and hides some content
    }
  } else {
    console.error('Target div not found');
  }
}

// Utility (static) function
function eatlas_ncanimate2_resize_videos(videos) {
  if (videos) {
    (function ($) {
      videos.each(function (index) {
        // Original size: $(this).get(0).width, $(this).get(0).height
        // Current size: $(this).width(), $(this).height()
        // NOTE:
        //   $(this) = The eReefs video for "index".
        //   $(this).get(0) = The video attributes.
        //   $(this).get(index) does not make any sense since $(this) is the element for "index".
        var orig_width = $(this).get(0).width,
          orig_height = $(this).get(0).height,
          current_width = $(this).width(),
          current_height = $(this).height();

        if (current_width && orig_width && orig_height) {
          current_height = Math.round(
            (current_width * orig_height) / orig_width
          );
          if (current_height > EATLAS_NCANIMATE2_MEDIA_MAX_HEIGHT) {
            current_height = EATLAS_NCANIMATE2_MEDIA_MAX_HEIGHT;
            current_width = Math.round(
              (current_height * orig_width) / orig_height
            );
            $(this).width(current_width);
          }
          $(this).height(current_height);
        }
      });
    })(jQuery);
  }
}

function eatlas_ncanimate2_numeric_sort_asc(a, b) {
  return a - b;
}
function eatlas_ncanimate2_parseFloat_sort_desc(a, b) {
  return parseFloat(b) - parseFloat(a);
}

// Class
function EAtlasNcAnimate2Widget(htmlBlockElement) {
  this.block = htmlBlockElement;

  // media_map[framePeriod][elevation][region][year]["metadata"]
  // media_map[framePeriod][elevation][region][year][month]["metadata"]
  this.media_map = null;

  this.selector_year = null;

  this.default_framePeriod = null;
  this.default_elevation = null;

  this.current_framePeriod = null;
  this.current_elevation = null;
  this.current_region = null;
  this.current_year = null;
  this.current_month = null;

  this.map_selector = new EAtlasNcAnimate2Map(this.block, this);

  this.tabsContainer = this.block.find(".tabs");
  this.tabsContainerUl = this.tabsContainer.find("ul");

  this.messageContainer = this.block.find(".message-container");
  this.messageContainerText = this.messageContainer.find(".text");

  this.imageContainer = this.block.find(".image-container");
  this.imageContainerImg = this.imageContainer.find("img");

  this.videoContainer = this.block.find(".video-container");
  this.videoContainerVideo = this.videoContainer.find("video");

  if (!this.videoContainerVideo || !this.videoContainerVideo[0]) {
    // There is no video container
    this.videoContainerVideo = null;
  } else if (!this.videoContainerVideo[0].load) {
    // There is a video container, but somehow it's not working?
    // Display an error message and disable video playback.
    this.videoContainerVideo = null;

    this.showMessage(
      "Error occurred while loading the video.<br/>" +
        '<span class="details">' +
        "Details: Your browser do not support video.load" +
        "</span>"
    );
  }

  if (this.videoContainerVideo) {
    this.videoContainerVideo.bind(
      "pause",
      (function (widget) {
        return function (event) {
          // Sync video player with JavaScript current time value.
          // When the video is paused, the currentTime property stop incrementing,
          //     but sometime the video skip ahead a frame or two.
          //     Setting the currentTime property fixes that issue.
          //     Also, when the currentTime is set too close to the
          //     timestamp between 2 frames, the rounding from the Math
          //     may give a different frame than the one shown.
          //     To avoid any issue, we set the video currentTime
          //     right in the middle of 2 frames, which ensure the
          //     reading will always be consistent with what the user sees.
          widget.setVideoCurrentTime(
            widget.fixVideoFrameTime(widget.videoContainerVideo[0].currentTime)
          );
        };
      })(this)
    );
  }

  this.elevationContainer = this.block.find(".elevation");
  this.elevationContainerSelect = this.elevationContainer.find("select");

  this.navigation = this.block.find(".navigation");
  this.previousFrameButton = this.navigation.find(".previousFrame");
  this.previousFrameButton.click(
    (function (widget) {
      return function (event) {
        widget.skipFrame(-1);
      };
    })(this)
  );
  this.nextFrameButton = this.navigation.find(".nextFrame");
  this.nextFrameButton.click(
    (function (widget) {
      return function (event) {
        widget.skipFrame(1);
      };
    })(this)
  );

  this.downloadContainer = this.block.find(".downloads");
  this.downloadContainerList = this.downloadContainer.find("ul");
}

EAtlasNcAnimate2Widget.prototype.isInternetExplorer = function () {
  return (
    navigator.userAgent.indexOf(" MSIE ") >= 0 ||
    navigator.userAgent.indexOf(" Trident/") >= 0
  );
};

EAtlasNcAnimate2Widget.prototype.isMsEdge = function () {
  return navigator.userAgent.indexOf(" Edge/") >= 0;
};

/**
 * Changing the video currentTime is as simple as setting a property...
 * unless some masochist user decide to give it a try with Internet Explorer or Ms Edge
 */
EAtlasNcAnimate2Widget.prototype.setVideoCurrentTime = function (currentTime) {
  if (this.videoContainerVideo) {
    // NOTE: That's all we need to do... for all browsers but Internet Explorer
    this.videoContainerVideo[0].currentTime = currentTime;

    // Unfortunately, this is not good enough for Internet Explorer and Edge.
    // We need to insist a bit more, going back and forth between 2 values...
    // This make the UI less responsive, so we really only want to do it when
    // necessary (only IE and Edge).
    if (this.isMsEdge() || this.isInternetExplorer()) {
      this.videoContainerVideo[0].currentTime = 0;
      this.videoContainerVideo[0].currentTime = currentTime;
    }
  }
};

EAtlasNcAnimate2Widget.prototype.skipFrame = function (nbFrames) {
  this.setVideoCurrentTime(this.fixVideoFrameTime(this.getSkipFrame(nbFrames)));
};

EAtlasNcAnimate2Widget.prototype.getSkipFrame = function (nbFrames) {
  if (this.videoContainerVideo) {
    var videoEl = this.videoContainerVideo[0];
    videoEl.pause();

    var videoFPS = this.video_metadata["fps"];
    return videoEl.currentTime + nbFrames / videoFPS;
  }

  return 0;
};

/**
 * Get the time of the middle of the frame in which videoTime is.
 * Example:
 *     Video frames: |-------|-------|-------|-------|-------|-------|---
 *     Parameter videoTime:                ^
 *     Return:                           ^
 * This is used to be sure a seek will seek to the expected frame.
 * It's to get around floating point error.
 */
EAtlasNcAnimate2Widget.prototype.fixVideoFrameTime = function (videoTime) {
  if (this.videoContainerVideo) {
    var videoEl = this.videoContainerVideo[0];
    var videoFPS = this.video_metadata["fps"];
    // Current frame number, first frame = 0
    var videoFrameNumber = Math.floor(videoTime * videoFPS);
    var fixVideoTime = (videoFrameNumber + 0.5) / videoFPS;

    if (fixVideoTime > videoEl.duration) {
      fixVideoTime = videoEl.duration - 0.5 / videoFPS;
    }
    // No negative
    return fixVideoTime < 0 ? 0 : fixVideoTime;
  }
};

EAtlasNcAnimate2Widget.prototype.init = function () {
  this.initElevationSelector();
  this.load();
};

EAtlasNcAnimate2Widget.prototype.initTabs = function (
  framePeriodOrder,
  framePeriodSettings
) {
  for (var i = 0; i < framePeriodOrder.length; i++) {
    var framePeriod = framePeriodOrder[i];
    var settings = framePeriodSettings[framePeriod];

    var li = jQuery("<li/>")
      .addClass(framePeriod)
      .addClass(settings.type)
      .appendTo(this.tabsContainerUl);

    // The "href" is added by "setTabsHref".
    // NOTE: The link needs to be implemented using a "href" instead
    //    of"click" event to work with keyboard navigation
    //   and with "Right click > Open link in new tab".
    var link = jQuery("<a/>").attr("framePeriod", framePeriod).appendTo(li);

    var icon = jQuery("<span/>").addClass("icon").appendTo(link);

    var label = jQuery("<span/>")
      .addClass("tabLabel")
      .text(framePeriod)
      .appendTo(link);
  }

  // NOTE: "setTabsHref" is called by "loadMedia".
  //   It's required to call it here only for the case where
  //   there is no resource for the default tab.
  this.setTabsHref();
};

EAtlasNcAnimate2Widget.prototype.setTabsHref = function () {
  // Loop through the tabs, find the "A" links and alter the "href" property.
  this.tabsContainerUl.find("a").each(function (index) {
    var link = jQuery(this);
    var framePeriod = link.attr("framePeriod");
    link.attr(
      "href",
      "#" + eatlas_ncanimate2_craft_anchor({ frame: framePeriod })
    );
  });
};

/**
 * Show a message
 */
EAtlasNcAnimate2Widget.prototype.showMessage = function (message) {
  this.showMessage(message, null, null);
};
EAtlasNcAnimate2Widget.prototype.showMessage = function (
  message,
  width,
  height
) {
  // Resize the message window

  // If no dimensions is provided, use default
  if (jQuery.isNaN(width) || width <= 0) {
    width = 1300;
  }
  if (jQuery.isNaN(height) || height <= 0) {
    height = 600;
  }

  // Set the width
  this.messageContainer.width(width);

  // Keep the message window proportional when it is shrunk
  // I.E. The media might be shrunk due to "maxWidth:100%"
  var actualWidth = this.messageContainer.width();
  var calculatedHeight = height;
  if (actualWidth != width) {
    calculatedHeight = Math.round((actualWidth * height) / width);
    if (calculatedHeight > EATLAS_NCANIMATE2_MEDIA_MAX_HEIGHT) {
      calculatedHeight = EATLAS_NCANIMATE2_MEDIA_MAX_HEIGHT;
      var calculatedWidth = Math.round((calculatedHeight * width) / height);
      this.messageContainer.width(calculatedWidth);
    }
  }

  // Set the height (and the line-height which is used to center the text)
  this.messageContainer.height(calculatedHeight);
  this.messageContainer.css("line-height", calculatedHeight + "px");

  this.messageContainer.show();
  this.imageContainer.hide();
  this.videoContainer.hide();

  this.messageContainerText.html(message);
};

/**
 * Show the image container
 */
EAtlasNcAnimate2Widget.prototype.showImageContainer = function (message) {
  this.messageContainer.hide();
  this.imageContainer.show();
  this.videoContainer.hide();
};

/**
 * Show the video container
 */
EAtlasNcAnimate2Widget.prototype.showVideoContainer = function (message) {
  this.messageContainer.hide();
  this.imageContainer.hide();
  this.videoContainer.show();

  // eatlas_ncanimate2_resize_videos(this.videoContainerVideo);
};

/**
 * Load a video on the video player and adjust the month selector
 */
EAtlasNcAnimate2Widget.prototype.loadMedia = function (
  framePeriod,
  elevation,
  region,
  year,
  month
) {
  // If default region is null, that means there is no region, therefore no usable data...
  if (this.default_region === null) {
    return;
  }

  if (framePeriod === undefined || framePeriod === null) {
    framePeriod = this.default_framePeriod;
  }
  if (elevation === undefined || elevation === null) {
    elevation = this.default_elevation;
  }
  if (
    region === undefined ||
    region === null ||
    !this.regions.hasOwnProperty(region)
  ) {
    region = this.default_region;
  }
  if (year === undefined) {
    year = null;
  }
  if (month === undefined) {
    month = null;
  }

  if (framePeriod !== this.current_framePeriod) {
    this.loadElevations(framePeriod);
  }

  var media_metadata = null;
  var periodType = "unknown";
  this.navigation.hide();

  if (framePeriod !== null && elevation !== null && region !== null) {
    if (
      framePeriod in this.media_map && // media_map must contain the data about the video
      elevation in this.media_map[framePeriod] &&
      region in this.media_map[framePeriod][elevation]
    ) {
      if (
        "metadata" in this.media_map[framePeriod][elevation][region] &&
        this.media_map[framePeriod][elevation][region]["metadata"] !== null
      ) {
        // Selected "all time" media
        periodType = "all";
        media_metadata =
          this.media_map[framePeriod][elevation][region]["metadata"];
      } else if (
        year != null &&
        year in this.media_map[framePeriod][elevation][region]
      ) {
        if (
          "metadata" in this.media_map[framePeriod][elevation][region][year] &&
          this.media_map[framePeriod][elevation][region][year]["metadata"] !==
            null
        ) {
          // Selected a yearly media
          periodType = "year";
          media_metadata =
            this.media_map[framePeriod][elevation][region][year]["metadata"]; // TODO framePeriod!!!
        } else {
          // If month is null (or not found in the map), find the first month for that year.
          if (
            month === null ||
            !(month in this.media_map[framePeriod][elevation][region][year])
          ) {
            for (month in this.media_map[framePeriod][elevation][region][
              year
            ]) {
              if (
                this.media_map[framePeriod][elevation][region][
                  year
                ].hasOwnProperty(month)
              ) {
                break;
              }
            }
          }

          if (
            month in this.media_map[framePeriod][elevation][region][year] &&
            "metadata" in
              this.media_map[framePeriod][elevation][region][year][month] &&
            this.media_map[framePeriod][elevation][region][year][month][
              "metadata"
            ] !== null
          ) {
            // Selected a monthly media
            periodType = "month";
            media_metadata =
              this.media_map[framePeriod][elevation][region][year][month][
                "metadata"
              ];
          }
        }
      }
    }
  }

  this.selectMedia(framePeriod, elevation, region, year, month);

  if (media_metadata != null) {
    this.media_metadata = media_metadata;
    var lastModified = media_metadata["lastModified"];
    if ("outputFiles" in media_metadata) {
      var outputFiles = media_metadata["outputFiles"];
      if (outputFiles != null) {
        var videos_metadata = {};
        var images_metadata = {};

        jQuery.each(outputFiles, function (outputFileID, outputFile) {
          if (outputFile["type"] === "VIDEO") {
            videos_metadata[outputFile["filetype"]] = outputFile;
          } else if (outputFile["type"] === "MAP") {
            images_metadata[outputFile["filetype"]] = outputFile;
          }
        });

        if ("MP4" in videos_metadata) {
          if (this.videoContainerVideo) {
            this.navigation.show();

            this.video_metadata = videos_metadata["MP4"];
            var videoUrl =
              videos_metadata["MP4"]["fileURI"] + "?t=" + lastModified;
            var videoPreview = null;
            if ("preview" in media_metadata) {
              videoPreview = media_metadata["preview"] + "?t=" + lastModified;
            }

            var videoSource = this.videoContainerVideo.find(".video_mp4");

            var width = videos_metadata["MP4"]["width"];
            var height = videos_metadata["MP4"]["height"];
            // // This forces a width instead of allowing the css to fit to the available space
            // if (width && height) {
            //   if (height > EATLAS_NCANIMATE2_MEDIA_MAX_HEIGHT) {
            //     width = Math.round(
            //       (width * EATLAS_NCANIMATE2_MEDIA_MAX_HEIGHT) / height
            //     );
            //     height = EATLAS_NCANIMATE2_MEDIA_MAX_HEIGHT;
            //   }

            //   // The video preview will be loaded in the image container (it's easier to catch events on an img tag)
            //   this.imageContainerImg.width(width);
            //   this.imageContainerImg.height(height);

            //   this.videoContainerVideo.attr("width", width);
            //   this.videoContainerVideo.attr("height", height);
            // }

            if (videoPreview) {
              // Set video preview image (poster)
              this.videoContainerVideo.attr("poster", videoPreview);

              // Put the video preview in the image container to be able to check when it's loaded.
              this.imageContainerImg.attr("src", videoPreview);

              // Wait a 1/10 of a second before checking if the image is loaded.
              // NOTE: Some browser will report the image as been "not completed"
              //   immediately after setting it, even when it's in the cache,
              //   causing a flickering effect when switching videos.
              //   Waiting a small delay seems to fix that issue.
              var previewLoader = window.setTimeout(
                (function (that) {
                  return function () {
                    if (that.imageIsLoaded(that.imageContainerImg)) {
                      that.showVideoContainer();
                    } else {
                      that.showMessage("Loading...", width, height);
                      that.imageContainerImg.load(
                        (function (that) {
                          return function () {
                            that.showVideoContainer();
                          };
                        })(that)
                      );
                    }
                  };
                })(this),
                100
              );

              // If the preview image is not found, show to the video player anyway.
              this.imageContainerImg.error(
                (function (that, previewLoader) {
                  return function () {
                    window.clearTimeout(previewLoader);
                    that.showVideoContainer();
                  };
                })(this, previewLoader)
              );
            } else {
              this.videoContainerVideo.removeAttr("poster");

              // There is no video preview. Show the video player now.
              this.showVideoContainer();
            }

            videoSource.attr("src", videoUrl);
            this.videoContainerVideo[0].load();
          }
        } else if ("PNG" in images_metadata) {
          var imageUrl =
            images_metadata["PNG"]["fileURI"] + "?t=" + lastModified;

          var width = images_metadata["PNG"]["width"];
          var height = images_metadata["PNG"]["height"];
          // // This forces a width instead of allowing the css to fit to the available space
          // if (width && height) {
          //   if (height > EATLAS_NCANIMATE2_MEDIA_MAX_HEIGHT) {
          //     width = Math.round(
          //       (width * EATLAS_NCANIMATE2_MEDIA_MAX_HEIGHT) / height
          //     );
          //     height = EATLAS_NCANIMATE2_MEDIA_MAX_HEIGHT;
          //   }

          //   this.imageContainerImg.width(width);
          //   this.imageContainerImg.height(height);
          // }

          this.imageContainerImg.attr("src", imageUrl);
          // Wait a 1/10 of a second before checking if the image is loaded.
          // NOTE: Some browser will report the image as been "not completed"
          //   immediately after setting it, even when it's in the cache,
          //   causing a flickering effect when switching images.
          //   Waiting a small delay seems to fix that issue.
          var imageLoader = window.setTimeout(
            (function (that) {
              return function () {
                if (that.imageIsLoaded(that.imageContainerImg)) {
                  that.showImageContainer();
                } else {
                  that.showMessage("Loading...", width, height);
                  that.imageContainerImg.load(
                    (function (that) {
                      return function () {
                        that.showImageContainer();
                      };
                    })(that)
                  );
                }
              };
            })(this),
            100
          );

          // If the image is not found, show an error message.
          this.imageContainerImg.error(
            (function (that, imageLoader) {
              return function () {
                window.clearTimeout(imageLoader);
                that.showMessage("Image not found", width, height);
              };
            })(this, imageLoader)
          );
        } else {
          // No MP4 video nor PNG map found in media_metadata["outputFiles"]
          this.showMessage("Media not found");
        }
      }
    } else {
      // media_metadata["outputFiles"] doesn't exists
      this.showMessage("Media not found");
    }
  } else {
    // Media not found. Go to the latest media for current elevation / region

    // Find an alternative year and month (the latest media)
    var alt_year = null;
    var alt_month = null;

    // console.log(`elevation = ${elevation}`)
    // console.log(`region = ${region}`)
    // console.log(`framePeriod in this.media_map = ${framePeriod in this.media_map}`)
    // console.log(`elevation in this.media_map[framePeriod] = ${elevation in this.media_map[framePeriod]}`)
    // console.log("because elevation is not in this.media_map[framePeriod], the conditional below doesn't pass and so it goes to the else statement which says 'Media not available.'")
    // console.log(`this.media_map[framePeriod] = ${JSON.stringify(this.media_map[framePeriod])}`)
    // console.log(`region in this.media_map[framePeriod][elevation] = ${region in this.media_map[framePeriod][elevation]}`)
    if (
      elevation !== null &&
      region !== null &&
      framePeriod in this.media_map &&
      elevation in this.media_map[framePeriod] &&
      region in this.media_map[framePeriod][elevation]
    ) {
      var all_years = this.objectKeys(
        this.media_map[framePeriod][elevation][region]
      );
      all_years.sort(eatlas_ncanimate2_numeric_sort_asc);
      for (var i = all_years.length - 1; i >= 0 && alt_year === null; i--) {
        var _alt_year = all_years[i];
        if (
          _alt_year !== "metadata" &&
          _alt_year in this.media_map[framePeriod][elevation][region]
        ) {
          // Try to find a monthly media for "_alt_year"
          var all_months = this.objectKeys(
            this.media_map[framePeriod][elevation][region][_alt_year]
          );
          all_months.sort(eatlas_ncanimate2_numeric_sort_asc);
          for (
            var j = all_months.length - 1;
            j >= 0 && alt_year === null;
            j--
          ) {
            var _alt_month = all_months[j];
            if (
              _alt_month !== "metadata" &&
              _alt_month in
                this.media_map[framePeriod][elevation][region][_alt_year] &&
              "metadata" in
                this.media_map[framePeriod][elevation][region][_alt_year][
                  _alt_month
                ] &&
              this.media_map[framePeriod][elevation][region][_alt_year][
                _alt_month
              ]["metadata"] !== null
            ) {
              media_metadata =
                this.media_map[framePeriod][elevation][region][_alt_year][
                  _alt_month
                ]["metadata"];

              alt_year = _alt_year;
              alt_month = _alt_month;
            }
          }

          // Try to find a yearly media for "_alt_year"
          if (
            "metadata" in
              this.media_map[framePeriod][elevation][region][_alt_year] &&
            this.media_map[framePeriod][elevation][region][_alt_year][
              "metadata"
            ] !== null
          ) {
            media_metadata =
              this.media_map[framePeriod][elevation][region][_alt_year][
                "metadata"
              ];

            alt_year = _alt_year;
            alt_month = null;
          }
        }
      }

      // Try to find "all time" media
      if (
        "metadata" in this.media_map[framePeriod][elevation][region] &&
        this.media_map[framePeriod][elevation][region]["metadata"] !== null
      ) {
        media_metadata =
          this.media_map[framePeriod][elevation][region]["metadata"];

        alt_year = null;
        alt_month = null;
      }

      this.loadMedia(framePeriod, elevation, region, alt_year, alt_month);
    } else {
      // There is no video / map available for the given framePeriod, elevation, region
      this.showMessage("Media not available.");
    }
  }

  // When media is updated, scolling back to the top should make it obvious to the user.
  // window.scrollTo({ top: 0, behavior: 'smooth' });
  scrollToVisualisation();

  this.setTabsHref();
  this.loadDownloads(media_metadata);
};

EAtlasNcAnimate2Widget.prototype.imageIsLoaded = function (imageJQueryObject) {
  var loaded = true;
  imageJQueryObject.each(function () {
    if (!this.complete || this.naturalHeight === 0) {
      loaded = false;
      return false; // Exit the loop
    }
  });
  return loaded;
};

/**
 * Select the media (video or image) in the media selector (the calendar)
 */
EAtlasNcAnimate2Widget.prototype.selectMedia = function (
  framePeriod,
  elevation,
  region,
  year,
  month
) {
  this.selector_year = year;
  this.current_year = year;
  this.current_month = month;

  if (framePeriod !== this.current_framePeriod) {
    this.current_framePeriod = framePeriod;
    this.changeFramePeriod(framePeriod);
  }
  if (elevation !== this.current_elevation) {
    this.current_elevation = elevation;
    this.changeElevation(elevation);
  }
  if (region !== this.current_region) {
    this.current_region = region;
    this.map_selector.selectRegion(region);
  }

  this.redrawCalendar();
};

EAtlasNcAnimate2Widget.prototype.redrawCalendar = function () {
  if (
    this.current_framePeriod !== null &&
    this.current_elevation !== null &&
    this.current_region != null
  ) {
    // Fix classes in the video selector
    var year = this.selector_year;
    var dateSelector = this.block.find(".date-selector");
    var yearSelector = dateSelector.find(".year-selector");

    var previousYearCell = yearSelector.find(".year_previous");
    var previousYearLink = previousYearCell.find("a");
    var nextYearCell = yearSelector.find(".year_next");
    var nextYearLink = nextYearCell.find("a");
    var yearCell = yearSelector.find(".year");
    var yearLink = yearCell.find("span");

    // Set calendar year
    yearLink.html(year == null ? "----" : year);

    // Remove selected class
    dateSelector.find("td").removeClass("selected");
    dateSelector.find("td").removeClass("selectable");
    dateSelector.find("th").removeClass("selected");
    dateSelector.find("th").removeClass("selectable");

    // Remove old "onClick" event listeners and "href" attribute.
    previousYearCell.unbind("click");
    previousYearLink.removeAttr("href");

    nextYearCell.unbind("click");
    nextYearLink.removeAttr("href");

    yearCell.unbind("click");
    yearLink.removeAttr("href");

    for (var month = 1; month <= 12; month++) {
      var monthCell = dateSelector.find(".month_" + month);
      var monthLink = monthCell.find("a");
      monthCell.unbind("click");
      monthLink.removeAttr("href");
    }

    // Add the "onClick" event and the "selectable" CSS class on the year arrows.
    if (
      year !== null &&
      this.media_map !== null &&
      this.current_framePeriod in this.media_map &&
      this.current_elevation in this.media_map[this.current_framePeriod] &&
      this.current_region in
        this.media_map[this.current_framePeriod][this.current_elevation] &&
      this.media_map[this.current_framePeriod][this.current_elevation][
        this.current_region
      ] !== null
    ) {
      var video_region_map =
        this.media_map[this.current_framePeriod][this.current_elevation][
          this.current_region
        ];

      var years = this.objectKeys(video_region_map);
      years.sort(eatlas_ncanimate2_numeric_sort_asc);

      var yearIndex;
      // Find year index (empty "for" loop)
      for (
        yearIndex = 0;
        yearIndex < years.length && years[yearIndex] != year;
        yearIndex++
      );
      if (years[yearIndex] == year) {
        var previousYear = yearIndex <= 0 ? null : years[yearIndex - 1];
        var nextYear =
          yearIndex >= years.length - 1 ? null : years[yearIndex + 1];

        if (previousYear !== null) {
          previousYearCell.addClass("selectable");
          previousYearLink.attr("href", "#");
          previousYearCell.click(
            (function (that, _previousYear) {
              return function () {
                that.selector_year = _previousYear;
                that.redrawCalendar();
                return false; // Prevent default
              };
            })(this, previousYear)
          );
        }

        if (nextYear !== null) {
          nextYearCell.addClass("selectable");
          nextYearLink.attr("href", "#");
          nextYearCell.click(
            (function (that, _nextYear) {
              return function () {
                that.selector_year = _nextYear;
                that.redrawCalendar();
                return false; // Prevent default
              };
            })(this, nextYear)
          );
        }
      }

      // Add fresh "onClick" event listeners and the "selectable" CSS class on the selectable months.
      if (year in video_region_map && video_region_map[year] !== null) {
        var video_year_map = video_region_map[year];

        // Add event listeners on the year
        if ("metadata" in video_year_map) {
          yearCell.addClass("selectable");
          yearLink.attr(
            "href",
            "#" + eatlas_ncanimate2_craft_anchor({ year: year })
          );

          yearCell.click(
            // Return a parameter less function which contains a copy of year and month
            (function (that, _year) {
              return function () {
                eatlas_ncanimate2_set_anchor(
                  eatlas_ncanimate2_craft_anchor({
                    year: _year,
                    month: null,
                  })
                );
              };
            })(this, year)
          );

          if (year == this.current_year && this.current_month === null) {
            yearCell.addClass("selected");
          }
        }

        for (var month = 1; month <= 12; month++) {
          if (
            month in video_year_map &&
            "metadata" in video_year_map[month] &&
            video_year_map[month]["metadata"] != null
          ) {
            var monthCell = dateSelector.find(".month_" + month);
            var monthLink = monthCell.find("a");
            monthCell.addClass("selectable");
            monthLink.attr(
              "href",
              "#" + eatlas_ncanimate2_craft_anchor({ year: year, month: month })
            );

            monthCell.click(
              // Return a parameter less function which contains a copy of year and month
              (function (that, _year, _month) {
                return function () {
                  eatlas_ncanimate2_set_anchor(
                    eatlas_ncanimate2_craft_anchor({
                      year: _year,
                      month: _month,
                    })
                  );
                };
              })(this, year, month)
            );

            if (year == this.current_year && month == this.current_month) {
              monthCell.addClass("selected");
            }
          }
        }
      }
    }
  }
};

// Add event listeners to the elevation dropdown (depth selector)
// When the elevation is changed, change the url, which triggers the hashchange function
EAtlasNcAnimate2Widget.prototype.initElevationSelector = function () {
  this.elevationContainerSelect.change(
    (function (that) {
      return function () {
        jQuery(this)
          .find("option:selected")
          .each(function () {
            var elevation = jQuery(this).text();
            eatlas_ncanimate2_set_anchor(
              eatlas_ncanimate2_craft_anchor({ elevation: elevation })
            );
          });
      };
    })(this)
  );
};

EAtlasNcAnimate2Widget.prototype.changeFramePeriod = function (framePeriod) {
  if (this.media_map && framePeriod && framePeriod in this.media_map) {
    // Select tab (visually)
    this.tabsContainerUl.find("li").removeClass("active");
    this.tabsContainerUl.find("li." + framePeriod).addClass("active");
  }
};

EAtlasNcAnimate2Widget.prototype.changeElevation = function (elevation) {
  if (
    this.media_map &&
    this.current_framePeriod &&
    this.current_framePeriod in this.media_map &&
    elevation in this.media_map[this.current_framePeriod]
  ) {
    this.elevationContainerSelect.val(elevation);
  }
};

// Called from EAtlasNcAnimate2Map instance
EAtlasNcAnimate2Widget.prototype.changeRegion = function (region) {
  this.current_region = region;
  this.loadMedia(
    this.current_framePeriod,
    this.current_elevation,
    region,
    this.current_year,
    this.current_month
  );
};

EAtlasNcAnimate2Widget.prototype.load = function () {
  // loads metadata and also the media.
  var productId = this.block.attr("productid");
  var blockName = this.block.attr("blockname");
  // console.log("blockName = ", blockName);

  // var meta_url = "/" + blockName + ".json";
  var meta_url =
    "https://api.ereefs.aims.gov.au/metadata/NCANIMATE_PRODUCT/" +
    // "https://api.test.ereefs.aims.gov.au/metadata/NCANIMATE_PRODUCT/" +
    productId;

  // console.log("meta_url = ", meta_url);

  // JQuery can request JSON data over different domain (CORS)
  // JQuery doesn't handle error with JSONP
  //   http://designwithpc.com/post/11989720389/jsonp-error-handling-with-jqueryajax
  // Solution:
  //   Use reverse proxy
  // Update: the Metdata API has now been configured to add the correct CORS headers. Not sure where theis reverse proxy comes into play, of if the code needs to be updated because we are no longer using it.
  jQuery.ajax({
    url: meta_url,
    // JQuery cache the query response but not the response code (replaced with 200),
    // which breaks when the server returns errors.
    cache: false,
    dataType: "json",

    // 10 seconds timeout
    // NOTE: Despite what the JQuery API doc says, the "timeout" option
    //   doesn't work with JQuery 1.4.4 (it works with 1.5+)
    timeout: 30000,

    success: (function (that) {
      return function (data, status, xhr) {
        // console.log("got data:");
        that.media_map = {};

        var framePeriods = [];
        var framePeriodSettings = {};
        var elevations = [];

        that.regions = {};

        // NOTE: mediaIndex is just its index in the JSONArray
        jQuery.each(data, function (mediaIndex, mediaMetadata) {
          var dateRange = mediaMetadata["dateRange"];
          var startDateStr = null;
          var endDateStr = null;
          var startDate = null;
          var endDate = null;
          if (dateRange != null) {
            startDateStr = dateRange["startDate"];
            if (startDateStr != null) {
              startDate = that.parseDate(startDateStr);
            }

            endDateStr = dateRange["endDate"];
            if (endDateStr != null) {
              endDate = that.parseDate(endDateStr);
            }
          }

          var videoTimeIncrement = mediaMetadata["videoTimeIncrement"];
          var mapTimeIncrement = mediaMetadata["mapTimeIncrement"];

          var periodType = null; // example: MONTH
          var mediaType = null;
          if (videoTimeIncrement != null) {
            periodType = videoTimeIncrement["unit"];
            mediaType = "videos";
          } else if (mapTimeIncrement != null) {
            periodType = mapTimeIncrement["unit"];
            mediaType = "images";
          }

          var startYear = null;
          var startMonth = null;
          if (startDate != null) {
            // Month is 0 indexed [0 - 11]. Add +1 to get [1 - 12].
            startYear = startDate.year();
            startMonth = startDate.month() + 1;
          }

          var endYear = null;
          var endMonth = null;
          if (endDate != null) {
            // Month is 0 indexed [0 - 11]. Add +1 to get [1 - 12].
            endYear = endDate.year();
            endMonth = endDate.month() + 1;
          }

          // Default values for product which doesn't define elevation or region.
          // I.E. If a product doesn't define the "elevation" variable, its elevation will be set to "na"
          var framePeriod = "na";
          var elevation = "na";
          if ("properties" in mediaMetadata) {
            if ("framePeriod" in mediaMetadata["properties"]) {
              framePeriod = mediaMetadata["properties"]["framePeriod"];
            }
            if ("targetHeight" in mediaMetadata["properties"]) {
              elevation = mediaMetadata["properties"]["targetHeight"];
            }
          }

          var region = mediaMetadata["region"];
          var regionId = region["id"];

          if (!that.regions[regionId]) {
            that.regions[regionId] = region;
          }

          if (!(framePeriod in that.media_map)) {
            that.media_map[framePeriod] = {};
          }

          if (!(framePeriod in framePeriodSettings)) {
            framePeriods.push(framePeriod);
            framePeriodSettings[framePeriod] = {
              type: mediaType,
            };
          }

          if (!(elevation in that.media_map[framePeriod])) {
            elevations.push(elevation);
            that.media_map[framePeriod][elevation] = {};
          }
          if (!(regionId in that.media_map[framePeriod][elevation])) {
            that.media_map[framePeriod][elevation][regionId] = {};
          }

          if (startYear == null) {
            if (periodType === "ETERNITY") {
              that.media_map[framePeriod][elevation][regionId]["metadata"] =
                mediaMetadata;
            }
          } else {
            if (
              !(startYear in that.media_map[framePeriod][elevation][regionId])
            ) {
              that.media_map[framePeriod][elevation][regionId][startYear] = {};
            }

            if (periodType === "YEAR") {
              that.media_map[framePeriod][elevation][regionId][startYear][
                "metadata"
              ] = mediaMetadata;
            } else if (periodType === "MONTH") {
              if (
                !(
                  startMonth in
                  that.media_map[framePeriod][elevation][regionId][startYear]
                )
              ) {
                that.media_map[framePeriod][elevation][regionId][startYear][
                  startMonth
                ] = {};
              }

              that.media_map[framePeriod][elevation][regionId][startYear][
                startMonth
              ]["metadata"] = mediaMetadata;
            }
          }
        });

        // Sort tab in period length order
        framePeriods.sort(function (a, b) {
          var sortValue = function (str) {
            switch (str.toLowerCase()) {
              case "hourly":
                return 1;
              case "daily":
                return 2;
              case "monthly":
                return 3;
              case "seasonal":
                return 4;
              case "yearly":
                return 5;
              case "all":
              case "overall":
                return 6;
              default:
                return 7;
            }
          };

          return sortValue(a) - sortValue(b);
        });
        that.default_framePeriod = framePeriods[0];
        that.initTabs(framePeriods, framePeriodSettings);

        that.default_elevation = elevations[0];

        that.map_selector.load(that.regions);

        // Determine what the default region should be
        that.default_region = null;
        if (that.regions) {
          var regionObjs = that.objectValues(that.regions);
          if (regionObjs && regionObjs.length > 0) {
            // Order regions by scale
            // If 2 regions have the same scale, order them by label
            regionObjs.sort(function (regionA, regionB) {
              var scaleA = regionA.scale || null;
              var scaleB = regionB.scale || null;

              if (scaleA !== null && scaleB !== null) {
                var scaleDiff = scaleA - scaleB;
                if (scaleDiff !== 0) {
                  return scaleDiff;
                }
              }

              if (scaleA !== null) {
                return 1;
              }
              if (scaleB !== null) {
                return -1;
              }

              return regionA.label.localeCompare(regionB.label);
            });
            // Use the first region (after sorting) as default region
            var default_region_obj = regionObjs[0];

            // Only the ID is stored.
            // NOTE: This is used when there is no region in URL parameter, or the region in URL is wrong.
            that.default_region = default_region_obj.id;

            var anchorValues = eatlas_ncanimate2_get_anchor_values();
            that.loadMedia(
              anchorValues["frame"],
              anchorValues["elevation"],
              anchorValues["region"],
              anchorValues["year"],
              anchorValues["month"]
            );
          } else {
            that.showMessage("No regions available");
          }
        }
        // console.log(`that.media_map = ${that.media_map}`)
        // console.log(`that.media_map = ${JSON.stringify(that.media_map)}`)
      };
    })(this),

    // NOTE: "error" is ignored with JSONP, JQuery 1.4.4
    error: (function (that) {
      return function (xhr, textStatus, errorThrown) {
        console.log("error getting data");
        statusCode = xhr.status;
        responseText = xhr.responseText;
        errorMessage = null;
        if (JSON) {
          jsonResponse = JSON.parse(responseText);
          errorMessage = jsonResponse.error;
        }
        if (!errorMessage) {
          // Fallback for very old browsers... and stubborn Internet Explorer
          errorMessage = responseText;
        }

        that.showMessage(
          "Error occurred while loading the data.<br/>" +
            '<span class="details">' +
            "Block name: " +
            blockName +
            "<br/>" +
            "Product ID: " +
            productId +
            "<br/>" +
            statusCode +
            ": " +
            errorMessage +
            "</span>"
        );
      };
    })(this),
  });

  // Update links when the hash is modified (example, when a new media is loaded).
  // I.E. If a media for date 2017-01 is loaded, all the links on the navigation map needs to be updated for 2017-01.
  jQuery(window).bind(
    "hashchange",
    (function (that) {
      return function (event) {
        // Load the media (video or map)
        var anchorValues = eatlas_ncanimate2_get_anchor_values();
        that.loadMedia(
          anchorValues["frame"],
          anchorValues["elevation"],
          anchorValues["region"],
          anchorValues["year"],
          anchorValues["month"]
        );

        // Adjust links (href, onClick, etc)
        that.redrawCalendar();
        that.map_selector.populateHTMLRegionList();
        that.map_selector.redraw();
      };
    })(this)
  );
};

// NOTE: JavaScript date parsing is browser specific... We had to try different date format and choose the most well supported one.
EAtlasNcAnimate2Widget.prototype.parseDate = function (dateStr) {
  if (dateStr === null || dateStr === "") {
    return null;
  }

  // Parse date without applying timezone offset
  var date = moment.parseZone(dateStr);
  if (date.isValid()) {
    return date;
  }

  return null;
};

EAtlasNcAnimate2Widget.prototype.loadElevations = function (framePeriod) {
  // Remove elevations from the select dropdown field
  this.elevationContainerSelect.find("option").remove();

  // Get the list of elevations for the given frame period
  var elevations = [];
  if (framePeriod in this.media_map) {
    for (var elevation in this.media_map[framePeriod]) {
      if (this.media_map[framePeriod].hasOwnProperty(elevation)) {
        elevations.push(elevation);
      }
    }
  }

  var nbElevation = elevations.length;
  if (nbElevation > 1) {
    elevations.sort(eatlas_ncanimate2_parseFloat_sort_desc);

    for (var i = 0; i < nbElevation; i++) {
      var elevation = elevations[i];
      this.elevationContainerSelect.append(
        jQuery("<option/>", {
          value: elevation,
          text: elevation,
        })
      );
    }
    if (typeof this.current_elevation !== 'undefined') {
      if (elevations.includes(this.current_elevation)) {
        this.elevationContainerSelect.val(this.current_elevation);
      } else if (this.current_elevation != null) {
        // alert("The previously selected elevation is not available for request");
        // The code will never make it here. It ends up at "Media not available." at the end of loadMedia
      } else {
        // this is what happens when the page first loads, ie, there is no current_elevation
      }
    }
    this.elevationContainer.show();
  } else {
    this.elevationContainer.hide();
  }
};

EAtlasNcAnimate2Widget.prototype.loadDownloads = function (media_metadata) {
  var downloads = {};

  // keys is used to sort the "downloads" object
  // NOTE: Objects in javascript should be considered as HashMaps.
  var keys = [];

  var lastModified = 0;
  if (media_metadata != null) {
    lastModified = media_metadata["lastModified"];
    if ("outputFiles" in media_metadata) {
      var outputFiles = media_metadata["outputFiles"];

      if (outputFiles != null) {
        jQuery.each(outputFiles, function (outputFileID, outputFile) {
          var key = outputFile["filetype"].toLowerCase();
          keys.push(key);
          downloads[key] = outputFile;
        });
      }
    }
  }

  // Remove old download links
  this.downloadContainerList.find("li").remove();
  if (keys.length > 0) {
    // Add new download links
    keys.sort();
    var that = this;
    jQuery.each(keys, function (index, key) {
      var value = downloads[key];
      var url = value["fileURI"];

      // Get the last part of the URL (the part after the last "/")
      var lastSlashIndex = url.lastIndexOf("/");
      var longFilename =
        lastSlashIndex >= 0 ? url.substring(lastSlashIndex + 1) : url;

      // Attempt to remove unnecessary context (that Aaron added to every IDs in the system)
      // to make the filename somewhat usable. Jira issue [EREEFS-400]
      var lastDoubleUnderscoreIndex = longFilename.lastIndexOf("__");
      var filename =
        lastDoubleUnderscoreIndex >= 0
          ? longFilename.substring(lastDoubleUnderscoreIndex + 2)
          : longFilename;

      // Craft a nice title (mouse over hint), displaying the file name and dimensions
      var title = filename;
      if (value["width"] && value["height"]) {
        title += " [" + value["width"] + " x " + value["height"] + "]";
      }

      // Give a more descriptive label to the video frame download button.
      // Issue [EREEFS-398]
      var label = key;
      if (key.toLowerCase() === "zip") {
        label = "video frames";
      }

      // Add the file last modified to the URL to prevent the browser (or other part of the system)
      // from caching an old request response
      url += "?t=" + lastModified;
      that.downloadContainerList.append(
        '<li class="' +
          key +
          '"><a href="' +
          url +
          '" title="' +
          title +
          '" download="' +
          filename +
          '">' +
          label +
          "</a></li>"
      );
    });

    if (this.isDownloadFrameEnabled()) {
      var frameLink = jQuery('<a href="javascript:void(0);">Video Frame</a>');
      frameLink.click(
        (function (widget) {
          return function (event) {
            // Map:
            //     Key: Possible values found in JSON (returned by NcAnimate)
            //     Value: Equivalence in Moment library
            // https://momentjs.com/docs/#/manipulating/add/
            var MOMENT_UNIT_MAP = {
              SECOND: "seconds",
              MINUTE: "minutes",
              HOUR: "hours",
              DAY: "days",
              WEEK: "weeks",
              MONTH: "months",
              YEAR: "years",
            };

            var video = widget.videoContainerVideo;
            video[0].pause();
            var currentTime = widget.fixVideoFrameTime(video[0].currentTime);
            var videoFPS = widget.video_metadata["fps"];
            // Current frame number, first frame = 0
            var currentFrameNumber = Math.floor(currentTime * videoFPS);

            var frameTime = widget.media_metadata["frameTimeIncrement"];
            var dateRange = widget.media_metadata["dateRange"];
            var startDateStr = dateRange["startDate"];
            var startDate = widget.parseDate(startDateStr);

            var frameTimeIncrement =
              frameTime["increment"] * currentFrameNumber;
            var frameTimeUnit = frameTime["unit"];
            var momentFrameTimeUnit = MOMENT_UNIT_MAP[frameTimeUnit];
            var frameDate = startDate.add(
              frameTimeIncrement,
              momentFrameTimeUnit
            );

            widget.downloadFrame(frameDate, frameTimeUnit);
          };
        })(this)
      );
      var frameLi = jQuery('<li class="frame"></li>');
      frameLi.append(frameLink);
      this.downloadContainerList.append(frameLi);
    }

    // Show the downloads
    this.downloadContainer.show();
  } else {
    // Hide the downloads (there is no download)
    // NOTE: This will only happen when there is no media at all.
    this.downloadContainer.hide();
  }
};

EAtlasNcAnimate2Widget.prototype.downloadFrame = function (
  frameDate,
  frameTimeUnit
) {
  // 1. Create URL to the frame like this one
  // https://aims-ereefs-public-test.s3-ap-southeast-2.amazonaws.com/ncanimate/frames/products__ncanimate__ereefs__gbr4_v2__temp-wind-salt-current_hourly/hervey-bay-3/height_-1.5/frame_2010-09-01_00h00.png
  if (!this.media_metadata["frameDirectoryUrl"]) {
    return null;
  }

  var frameUrl = this.media_metadata["frameDirectoryUrl"];
  if (!this.endsWith(frameUrl, "/")) {
    frameUrl += "/";
  }

  // Add filename
  // example: frame_2010-09-01_00h00.png
  var filename = null;
  switch (frameTimeUnit) {
    case "MINUTE":
    case "HOUR":
      filename = "frame_" + frameDate.format("YYYY-MM-DD_HH[h]mm") + ".png";
      break;

    case "DAY":
      filename = "frame_" + frameDate.format("YYYY-MM-DD") + ".png";
      break;

    case "MONTH":
      filename = "frame_" + frameDate.format("YYYY-MM") + ".png";
      break;

    case "YEAR":
      filename = "frame_" + frameDate.format("YYYY") + ".png";
      break;
  }

  if (filename === null) {
    // This should only happen if the frameTimeUnit is not one listed above (very unlikely)
    alert(
      "ERROR: Frame can not be downloaded.\nReason: Unsupported frame time unit: " +
        frameTimeUnit +
        "."
    );
  } else {
    frameUrl += filename;

    // 2. Trigger a download

    // Create a link to the CSV and put it in the page markup
    var link = jQuery(
      '<a href="' +
        encodeURI(frameUrl) +
        '" download="' +
        filename +
        '" target="_blank"></a>'
    );
    jQuery("body").append(link);

    // Simulate a click on the link to trigger the file download
    link[0].click();

    // Remove the link from the page
    link.remove();
  }
};

EAtlasNcAnimate2Widget.prototype.isDownloadFrameEnabled = function () {
  return (
    this.videoContainerVideo &&
    this.media_metadata["frameDirectoryUrl"] !== undefined &&
    this.media_metadata["frameDirectoryUrl"] !== null
  );
};

EAtlasNcAnimate2Widget.prototype.warning = function (message) {
  if (typeof console === "object" && typeof console.log === "function") {
    // Every browsers in the universe but IE
    console.log(message);
  } else {
    // Internet Explorer...
    // NOTE: Alert popups are annoying, but if you are using IE, you deserve it...
    alert(message);
  }
};

// Basic key extraction, because Internet Explorer doesn't supports Object.keys()
EAtlasNcAnimate2Widget.prototype.objectKeys = function (obj) {
  if (
    Object &&
    Object.hasOwnProperty("keys") &&
    typeof Object.keys === "function"
  ) {
    return Object.keys(obj);
  }

  // For Internet Explorer...
  var keys = [];

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(key);
    }
  }

  return keys;
};

// Basic value extraction, because Internet Explorer doesn't supports Object.values()
EAtlasNcAnimate2Widget.prototype.objectValues = function (obj) {
  if (
    Object &&
    Object.hasOwnProperty("values") &&
    typeof Object.values === "function"
  ) {
    return Object.values(obj);
  }

  // For Internet Explorer...
  var values = [];

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      values.push(obj[key]);
    }
  }

  return values;
};

// Yet another hack because of, you guessed it, Internet Explorer...
EAtlasNcAnimate2Widget.prototype.endsWith = function (str, suffix) {
  if (typeof str.endsWith === "function") {
    return str.endsWith(suffix);
  }
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

// (function ($) {
//   // Adjust the video size when the page is resized
//   $(window).resize(function () {
//     eatlas_ncanimate2_resize_videos($(".video-container video"));
//   });
// })(jQuery);
// Class
function EAtlasNcAnimate2Map(htmlBlockElement, videoSelector) {
  this.blk = htmlBlockElement;
  this.videoSelector = videoSelector;
  this.mapImg = null;
  this.canvas = null;
  this.htmlRegionList = null;
  this.context = null;
  this.width = null;
  this.height = null;
  this.hoverRegion = null;
  this.selectedRegion = null;

  this.orderedRegions = null;
  this.regionCache = {};

  this.mapBBox = null;

  this.regionCatalogue = null;
}

EAtlasNcAnimate2Map.prototype.selectRegion = function (region) {
  if (region && region !== this.selectedRegion) {
    this.selectedRegion = region;
    this.redraw();
  }
};

EAtlasNcAnimate2Map.prototype.load = function (regionCatalogue) {
  this.regionCatalogue = regionCatalogue;
  this.canvas = this.blk.find(".regionCanvas");
  this.htmlRegionList = this.blk.find(".regionList");
  this.context = null;
  if (this.canvas && this.canvas.get(0) && this.canvas.get(0).getContext) {
    this.context = this.canvas.get(0).getContext("2d");
  }

  var mapUrl = this.getMapURL();
  if (mapUrl) {
    this.mapImg = new Image();
    this.mapImg.onload = (function (that) {
      return function () {
        // Save the real image dimenssion as returned by the server.
        // NOTE: "this" refer to the loaded image.
        if (this.width && this.height) {
          that.width = this.width;
          that.height = this.height;
        }

        that.loadMap();
      };
    })(this);

    this.mapImg.src = mapUrl;
  } else {
    this.loadMap();
  }
};

EAtlasNcAnimate2Map.prototype.loadMap = function () {
  var width = this.getMapWidth(),
    height = this.getMapHeight();

  // Resize the canvas to match the image size (without stretching it)
  if (this.context) {
    this.context.canvas.width = width;
    this.context.canvas.height = height;
  }

  this.loadRegionCache();
  this.populateHTMLRegionList();
  this.redraw();

  this.canvas.mousemove(
    (function (that) {
      return function (e) {
        var rect = this.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

        var hoverRegion = that.getRegionId(x, y);
        if (hoverRegion !== that.hoverRegion) {
          // Focusing on the text trigger the highlight on the corresponding map region
          if (hoverRegion) {
            var x = window.scrollX,
              y = window.scrollY;
            that.htmlRegionList.find("a." + hoverRegion).focus();

            // Reset the page scroll to prevent "focus" from scrolling the page
            // when the focused element is out of view.
            // This might not work with all browsers (*cough* internet explorer *cough*)
            // but it should work with all modern browsers.
            // NOTE: IE do NOT support scrollX and scrollY.
            if (!isNaN(x) && !isNaN(y)) {
              window.scrollTo(x, y);
            }
          } else {
            that.htmlRegionList.find("a").focusout();
          }
        }
      };
    })(this)
  );

  this.canvas.click(
    (function (that) {
      return function (e) {
        var rect = this.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

        var clickedRegion = that.getRegionId(x, y);
        if (clickedRegion != null) {
          // Fix URL
          eatlas_ncanimate2_set_anchor(
            eatlas_ncanimate2_craft_anchor({ region: clickedRegion })
          );
          // Highlight region in the map and the region list
          that.selectRegion(clickedRegion);
          // Load the video
          that.videoSelector.changeRegion(clickedRegion);
        }
      };
    })(this)
  );

  this.canvas.mouseleave(
    (function (that) {
      return function (e) {
        that.htmlRegionList.find("a").focusout();
      };
    })(this)
  );
};

EAtlasNcAnimate2Map.prototype.mergeBBox = function (bbox1, bbox2) {
  if (bbox1 === null) {
    if (bbox2 === null) {
      return null;
    }
    return {
      north: bbox2.north,
      east: bbox2.east,
      south: bbox2.south,
      west: bbox2.west,
    };
  }
  if (bbox2 === null) {
    return {
      north: bbox1.north,
      east: bbox1.east,
      south: bbox1.south,
      west: bbox1.west,
    };
  }

  return {
    north: Math.max(bbox1.north, bbox2.north),
    east: Math.max(bbox1.east, bbox2.east),
    south: Math.min(bbox1.south, bbox2.south),
    west: Math.min(bbox1.west, bbox2.west),
  };
};

/*
 * URL place holders:
 *   Bounding box, in degree
 *     - ${NORTH}
 *     - ${EAST}
 *     - ${SOUTH}
 *     - ${WEST}
 *   Image dimensions, in pixels
 *     - ${WIDTH}
 *     - ${HEIGHT}
 */
EAtlasNcAnimate2Map.prototype.getMapURL = function () {
  var mapBBox = this.getMapBBox(),
    width = this.getMapWidth(),
    height = this.getMapHeight();

  // Get the map URL as specified in the Drupal module configuration.
  var mapUrl = this.canvas.attr("mapurl");

  // Map URL used for debugging
  //mapUrl = "http://maps.eatlas.org.au/maps/wms?LAYERS=ea-be%3AWorld_Bright-Earth-e-Atlas-basemap_No-Labels-hillshading&TRANSPARENT=FALSE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetMap&STYLES=&FORMAT=image%2Fjpeg&SRS=EPSG%3A4326&BBOX=${WEST},${SOUTH},${EAST},${NORTH}&WIDTH=${WIDTH}&HEIGHT=${HEIGHT}";
  //mapUrl = "http://maps.eatlas.org.au/maps/ea/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=ea%3AGBR_GBRMPA_GBR-features,ea%3AGBR_e-Atlas-GBRMPA_GBRMP-bounds_Ocean-bounds,ea%3AGBR_NERP-TE-13-1_eAtlas_NRM-Regions-GBRMP-2012&STYLES=GBR-features_Outlook,Polygon_Outline-Red,GBR_NRM-Regions-GBRMP_Mainland-border&SRS=EPSG%3A4326&WIDTH=${WIDTH}&HEIGHT=${HEIGHT}&BBOX=${WEST},${SOUTH},${EAST},${NORTH}";

  if (!mapUrl || !mapBBox || !width || !height) {
    return null;
  }

  // Replace placeholders
  return mapUrl
    .replace("${NORTH}", mapBBox.north)
    .replace("${EAST}", mapBBox.east)
    .replace("${SOUTH}", mapBBox.south)
    .replace("${WEST}", mapBBox.west)
    .replace("${WIDTH}", width)
    .replace("${HEIGHT}", height);
};

EAtlasNcAnimate2Map.prototype.getRegionId = function (x, y) {
  // When the image is resized (due to maxWidth: 100%),
  //   the coordinate needs to be stretch to represent
  //   the coordinate on the original sized image.
  var width = this.getMapWidth(),
    resizeRatio = width / this.canvas.width(),
    resizedX = x * resizeRatio,
    resizedY = y * resizeRatio;

  var orderedRegions = this.getOrderedRegions();
  for (var i = 0; i < orderedRegions.length; i++) {
    var regionId = orderedRegions[i];
    var regionRect = this.regionCache[regionId];

    if (
      regionRect &&
      resizedX >= regionRect.x &&
      resizedX <= regionRect.x + regionRect.width &&
      resizedY >= regionRect.y &&
      resizedY <= regionRect.y + regionRect.height
    ) {
      return regionId;
    }
  }

  return null;
};

EAtlasNcAnimate2Map.prototype.loadRegionCache = function () {
  var orderedRegions = this.getOrderedRegions();
  if (this.regionCatalogue && orderedRegions) {
    for (var i = 0; i < orderedRegions.length; i++) {
      var regionId = orderedRegions[i];

      var reprojectedBBox = this.reproject(
        this.regionCatalogue[regionId]["bbox"]
      );
      if (reprojectedBBox !== null) {
        var regionLabel = this.regionCatalogue[regionId]["label"];
        var regionScale = this.regionCatalogue[regionId]["scale"] || -1;
        if (!regionLabel) {
          regionLabel = regionId;
        }
        this.regionCache[regionId] = {
          label: regionLabel,
          scale: regionScale,
          x: reprojectedBBox.west,
          y: reprojectedBBox.north,
          width: reprojectedBBox.east - reprojectedBBox.west,
          height: reprojectedBBox.south - reprojectedBBox.north,
        };
      }
    }
  }
};

EAtlasNcAnimate2Map.prototype.populateHTMLRegionList = function () {
  var that = this;

  if (this.regionCache) {
    // Order regions from North to South,
    //   because that's what feels the most natural
    //   while using the navigation list
    var geographicallyOrderedRegions = [];

    // Get a list of all the region IDs
    for (var regionId in this.regionCache) {
      if (this.regionCache.hasOwnProperty(regionId)) {
        geographicallyOrderedRegions.push(regionId);
      }
    }

    // Sort the list of region ID by region BBox / Label
    geographicallyOrderedRegions.sort(function (id1, id2) {
      var region1 = that.regionCache[id1],
        region2 = that.regionCache[id2];

      var scale1 = region1["scale"] || -1;
      var scale2 = region2["scale"] || -1;
      var scaleDiff = scale1 - scale2;

      if (scaleDiff !== 0) {
        return scaleDiff;
      }

      // Place the North most first
      var yCmp = region1["y"] - region2["y"];
      if (yCmp !== 0) {
        return yCmp;
      }

      // If they are on the same parallel, return the West most first
      var xCmp = region1["x"] - region2["x"];
      if (xCmp !== 0) {
        return xCmp;
      }

      // If the top-left corner is at the same location, compare labels
      return region1["label"].localeCompare(region2["label"]);
    });

    // Create the bullet list
    this.htmlRegionList.empty();
    var lastRegionScale = null;
    var currentUl = null;
    for (var i = 0; i < geographicallyOrderedRegions.length; i++) {
      var regionId = geographicallyOrderedRegions[i];
      var region = this.regionCache[regionId];

      if (currentUl === null || region["scale"] !== lastRegionScale) {
        var scaleGroup = jQuery('<div class="regionScaleGroup"></div>');
        this.htmlRegionList.append(scaleGroup);

        var label =
          region["scale"] === -1
            ? "Legacy regions"
            : "Scale: " + region["scale"];
        scaleGroup.append(
          jQuery('<div class="region-scale-label">' + label + "</div>")
        );
        currentUl = jQuery("<ul></ul>");
        scaleGroup.append(currentUl);
      }

      currentUl.append(
        jQuery(
          regionId === this.selectedRegion
            ? '<li class="selected"></li>'
            : "<li></li>"
        ).append(
          // NOTE: The anchor is to actually have a link (for keyboard navigation) and the value of the anchor is to create a pretty URL in the browser status when doing a mouse over.
          jQuery(
            '<a class="' +
              regionId +
              '" href="#' +
              eatlas_ncanimate2_craft_anchor({ region: regionId }) +
              '">' +
              region["label"] +
              "</a>"
          )
            // MouseEnter / MouseLeave are triggered with the mouse
            // NOTE: We manually call focus / blur to trigger the respective event (avoid code duplication)
            .mouseenter(function () {
              jQuery(this).focus();
            })
            .mouseleave(function () {
              jQuery(this).focusout();
            })
            // Focus / Blur (aka focusout) are triggered with the keyboard
            .focus(function () {
              that.hoverRegion = jQuery(this).attr("class");
              that.redraw();
            })
            .focusout(function () {
              jQuery(this).blur();
              that.hoverRegion = null;
              that.redraw();
            })
            .click(function () {
              var clickedRegion = jQuery(this).attr("class");
              eatlas_ncanimate2_set_anchor(
                eatlas_ncanimate2_craft_anchor({
                  region: clickedRegion,
                })
              );
            })
        )
      );

      lastRegionScale = region["scale"];
    }
  }
};

// Sort the regions according to area
//   Smallest on top, to simplify selection when using the navigation map
EAtlasNcAnimate2Map.prototype.getOrderedRegions = function () {
  if (this.orderedRegions === null) {
    this.orderedRegions = [];
    if (this.regionCatalogue) {
      for (var regionId in this.regionCatalogue) {
        if (this.regionCatalogue.hasOwnProperty(regionId)) {
          this.orderedRegions.push(regionId);
        }
      }

      // Sort regions
      this.orderedRegions.sort(
        (function (that) {
          function getRegionArea(bbox) {
            return (bbox.east - bbox.west) * (bbox.north - bbox.south);
          }
          return function (id1, id2) {
            var bbox1 = that.regionCatalogue[id1]["bbox"],
              bbox2 = that.regionCatalogue[id2]["bbox"],
              epsilon = 0.000000001;

            // Area comparison (smaller on top)
            var areaCmp = getRegionArea(bbox1) - getRegionArea(bbox2);
            if (areaCmp > epsilon || areaCmp < -epsilon) {
              return areaCmp;
            }

            // Same area - latitude comparison (northest on top)
            var latCmp = bbox2.north - bbox1.north;
            if (latCmp > epsilon || latCmp < -epsilon) {
              return latCmp;
            }

            // Same latitude - longitude comparison (eastest on top)
            return bbox2.west - bbox1.west;
          };
        })(this)
      );
    }
  }
  return this.orderedRegions;
};

// Calculate map bounding box
EAtlasNcAnimate2Map.prototype.getMapBBox = function () {
  if (this.mapBBox === null && this.regionCatalogue) {
    for (var regionId in this.regionCatalogue) {
      if (this.regionCatalogue.hasOwnProperty(regionId)) {
        this.mapBBox = this.mergeBBox(
          this.mapBBox,
          this.regionCatalogue[regionId]["bbox"]
        );
      }
    }

    // Add padding
    if (this.mapBBox) {
      var mapWidthDegree = this.mapBBox.east - this.mapBBox.west,
        mapWidthPixel = this.getMapWidth();

      var degreePerPixel = mapWidthDegree / mapWidthPixel,
        degreePadding = 20 * degreePerPixel;

      this.mapBBox.north += degreePadding;
      this.mapBBox.south -= degreePadding;

      this.mapBBox.east += degreePadding;
      this.mapBBox.west -= degreePadding;

      // Adjustment
      if (this.mapBBox.north > 90) {
        this.mapBBox.north = 90;
      }
      if (this.mapBBox.south < -90) {
        this.mapBBox.south = -90;
      }

      if (this.mapBBox.east > 180) {
        this.mapBBox.east = 180;
      }
      if (this.mapBBox.west < -180) {
        this.mapBBox.west = -180;
      }
    }
  }
  return this.mapBBox;
};

EAtlasNcAnimate2Map.prototype.getMapWidth = function () {
  if (this.width === null) {
    this.computeMapWidthHeight();
  }
  return this.width;
};

EAtlasNcAnimate2Map.prototype.getMapHeight = function () {
  if (this.height === null) {
    this.computeMapWidthHeight();
  }
  return this.height;
};

// Calculate the image desired dimensions.
// NOTE: They will be adjusted after the map is loaded.
EAtlasNcAnimate2Map.prototype.computeMapWidthHeight = function () {
  var mapBBox = this.getMapBBox();

  // Get the map width x height as specified in the Drupal module configuration.
  var desiredWidth = this.canvas.attr("mapwidth"),
    desiredHeight = this.canvas.attr("mapheight");

  var mapWidth = mapBBox.east - mapBBox.west,
    mapHeight = mapBBox.north - mapBBox.south;

  if (desiredWidth && desiredHeight) {
    // Both width and height is set
    this.width = desiredWidth;
    this.height = desiredHeight;
  } else if (desiredHeight) {
    // Only height is set
    this.height = desiredHeight;

    // Calculate the map width, in pixels
    this.width = Math.round((this.height * mapWidth) / mapHeight);
  } else {
    // Only width is set (or neither)
    this.width = desiredWidth ? desiredWidth : 200;

    // Calculate the map height, in pixels
    this.height = Math.round((this.width * mapHeight) / mapWidth);
  }
};

EAtlasNcAnimate2Map.prototype.redraw = function () {
  var width = this.getMapWidth(),
    height = this.getMapHeight();

  // Flush canvas before redrawing
  if (this.context) {
    this.context.clearRect(0, 0, width, height);

    // Draw the image
    if (this.mapImg !== null) {
      this.context.drawImage(this.mapImg, 0, 0, width, height);
    }

    this.context.strokeStyle = "rgba(0, 0, 0, 0.8)";
    this.context.fillStyle = "rgba(0, 0, 255, 0.2)";

    var orderedRegions = this.getOrderedRegions();
    if (orderedRegions) {
      for (var i = 0; i < orderedRegions.length; i++) {
        this.drawRegion(orderedRegions[i]);
      }
    }
  }
};

EAtlasNcAnimate2Map.prototype.drawRegion = function (regionId) {
  // Get the region rectangle from the cache.
  var rect = this.regionCache[regionId];
  if (this.context && rect) {
    if (regionId === this.selectedRegion) {
      this.context.fillRect(rect.x, rect.y, rect.width, rect.height);
    }

    if (regionId === this.hoverRegion) {
      this.context.lineWidth = 3;
    } else {
      this.context.lineWidth = 1.5;
    }

    this.context.strokeRect(rect.x, rect.y, rect.width, rect.height);
  }
};

EAtlasNcAnimate2Map.prototype.reproject = function (bbox) {
  var mapBBox = this.getMapBBox(),
    width = this.getMapWidth(),
    height = this.getMapHeight();

  if (!mapBBox || !bbox || !width || !height) {
    return null;
  }

  // Calculate the width and height of the map, in degrees
  var geoWidth = mapBBox.east - mapBBox.west;
  var geoHeight = mapBBox.north - mapBBox.south;

  // Calculate the ratio used to reproject from degrees to pixels.
  var widthRatio = width / geoWidth;
  var heightRatio = height / geoHeight;

  // NOTE: North / South are inverted:
  //   (0,0) is bottom left corner in degrees,
  //   (0,0) is top left corner in pixels.
  return {
    north: height - (bbox.north - mapBBox.south) * heightRatio,
    east: (bbox.east - mapBBox.west) * widthRatio,
    south: height - (bbox.south - mapBBox.south) * heightRatio,
    west: (bbox.west - mapBBox.west) * widthRatio,
  };
};
// NOTE: "const" doesn't work in IE
var EATLAS_NCANIMATE2_ANCHOR_PAIR_SEPARATOR = ";";
var EATLAS_NCANIMATE2_ANCHOR_VALUE_SEPARATOR = "=";

(function ($) {
  // Initialise the EAtlasNcAnimate2Widgets when the page is ready
  $(document).ready(function () {
    $(".ncanimate2_block").each(function (index) {
      var videoSelector = new EAtlasNcAnimate2Widget($(this));
      videoSelector.init();
    });
  });
})(jQuery);

// Allowed characters in anchors:
//   http://tools.ietf.org/html/rfc3986#section-3.5
// Basically, anchors cannot contain #, %, ^, [, ], {, }, \, ", < and >
function eatlas_ncanimate2_craft_anchor(values) {
  var actualValues = eatlas_ncanimate2_get_anchor_values();
  for (var key in values) {
    if (values.hasOwnProperty(key)) {
      actualValues[key] = values[key];
    }
  }

  var anchorArray = [];
  for (var key in actualValues) {
    if (
      actualValues.hasOwnProperty(key) &&
      actualValues[key] !== null &&
      actualValues[key] !== ""
    ) {
      anchorArray.push(
        encodeURIComponent(key) +
          EATLAS_NCANIMATE2_ANCHOR_VALUE_SEPARATOR +
          encodeURIComponent(actualValues[key])
      );
    }
  }

  return anchorArray.join(EATLAS_NCANIMATE2_ANCHOR_PAIR_SEPARATOR);
}

function eatlas_ncanimate2_set_anchor(anchorStr) {
  window.location.hash = "#" + anchorStr;
}

function eatlas_ncanimate2_get_anchor_values() {
  var values = {};

  var hash = window.location.hash;
  if (hash) {
    var anchor = hash.substr(1);
    if (anchor) {
      var keyValuePairs = anchor.split(EATLAS_NCANIMATE2_ANCHOR_PAIR_SEPARATOR);
      for (var i = 0; i < keyValuePairs.length; i++) {
        var splitIndex = keyValuePairs[i].indexOf(
          EATLAS_NCANIMATE2_ANCHOR_VALUE_SEPARATOR
        );
        if (splitIndex > 1) {
          values[
            decodeURIComponent(keyValuePairs[i].substring(0, splitIndex))
          ] = decodeURIComponent(keyValuePairs[i].substring(splitIndex + 1));
        }
      }
    }
  }

  return values;
}
