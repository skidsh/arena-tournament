$CoT.evt = function(a) {
  if (!a) {
      if ("undefined" == typeof event)
          return null;
      a = event
  }
  return a.which ? a._button = a.which : (a._button = a.button,
  $CoT.Browser.ie6789 && a._button ? 4 & a._button ? a._button = 2 : 2 & a._button && (a._button = 3) : a._button = a.button + 1),
  a._target = a.target ? a.target : a.srcElement,
  a._wheelDelta = a.wheelDelta ? a.wheelDelta : -a.detail,
  a
}
,
$CoT.$A = function(a) {
  for (var b = [], c = 0, d = a.length; c < d; ++c)
      b.push(a[c]);
  return b
}
,
Function.prototype.bind || (Function.prototype.bind = function() {
  var a = this
    , b = $CoT.$A(arguments)
    , c = b.shift();
  return function() {
      return a.apply(c, b.concat($CoT.$A(arguments)))
  }
}
),
$CoT.bindfunc = function() {
  args = $CoT.$A(arguments);
  var a = args.shift()
    , b = args.shift();
  return function() {
      return a.apply(b, args.concat($CoT.$A(arguments)))
  }
}
,
String.prototype.ltrim || (String.prototype.ltrim = function() {
  return this.replace(/^\s*/, "")
}
),
String.prototype.rtrim || (String.prototype.rtrim = function() {
  return this.replace(/\s*$/, "")
}
),
String.prototype.trim || (String.prototype.trim = function() {
  return this.ltrim().rtrim()
}
),
String.prototype.removeAllWhitespace || (String.prototype.removeAllWhitespace = function() {
  return this.replace("/s+/g", "")
}
),
$CoT.strcmp = function(a, b) {
  if (a == b)
      return 0;
  if (null == a)
      return -1;
  if (null == b)
      return 1;
  var c = parseFloat(a)
    , d = parseFloat(b);
  return isNaN(c) || isNaN(d) || c == d ? "string" == typeof a && "string" == typeof b ? a.localeCompare(b) : a < b ? -1 : 1 : c < d ? -1 : 1
}
,
$CoT.trim = function(a) {
  return a.replace(/(^\s*|\s*$)/g, "")
}
,
$CoT.rtrim = function(a, b) {
  for (var c = a.length; --c > 0 && a.charAt(c) == b; )
      ;
  return a = a.substring(0, c + 1),
  a == b && (a = ""),
  a
}
,
$CoT.sprintf = function(a) {
  var b;
  for (b = 1,
  len = arguments.length; b < len; ++b)
      a = a.replace("$" + b, arguments[b]);
  return a
}
,
$CoT.sprintfa = function(a) {
  var b;
  for (b = 1,
  len = arguments.length; b < len; ++b)
      a = a.replace(new RegExp("\\$" + b,"g"), arguments[b]);
  return a
}
,
$CoT.sprintfo = function(a) {
  if ("object" == typeof a && a.length) {
      var b = a;
      a = b[0];
      var c;
      for (c = 1; c < b.length; ++c)
          a = a.replace("$" + c, b[c]);
      return a
  }
}
,
$CoT.str_replace = function(a, b, c) {
  for (; -1 != a.indexOf(b); )
      a = a.replace(b, c);
  return a
}
,
$CoT.urlencode = function(a) {
  return a = encodeURIComponent(a),
  a = $CoT.str_replace(a, "+", "%2B")
}
,
$CoT.urlencode2 = function(a) {
  return a = encodeURIComponent(a),
  a = $CoT.str_replace(a, "%20", "+"),
  a = $CoT.str_replace(a, "%3D", "=")
}
,
$CoT.number_format = function(a) {
  return x = ("" + parseFloat(a)).split("."),
  a = x[0],
  x = x.length > 1 ? "." + x[1] : "",
  a.length <= 3 ? a + x : $CoT.number_format(a.substr(0, a.length - 3)) + "," + a.substr(a.length - 3) + x
}
,
$CoT.is_array = function(a) {
  return !(!a || a.constructor != Array)
}
,
$CoT.in_array = function(a, b, c, d) {
  if (null == a)
      return -1;
  if (c)
      return $CoT.in_arrayf(a, b, c, d);
  for (var e = d || 0, f = a.length; e < f; ++e)
      if (a[e] == b)
          return e;
  return -1
}
,
$CoT.in_arrayf = function(a, b, c, d) {
  for (var e = d || 0, f = a.length; e < f; ++e)
      if (c(a[e]) == b)
          return e;
  return -1
}
,
$CoT.rs = function() {
  for (var a = $CoT.rs.random, b = "", c = 0; c < 16; c++) {
      var d = Math.floor(Math.random() * a.length);
      0 == c && d < 11 && (d += 10),
      b += a.substring(d, d + 1)
  }
  return b
}
,
$CoT.rs.random = "0123456789abcdefghiklmnopqrstuvwxyz",
$CoT.isset = function(a) {
  return void 0 !== window[a]
}
,
$CoT.isset("console") || (console = {
  log: function() {}
}),
$CoT.array_walk = function(a, b, c) {
  for (var d, e = 0, f = a.length; e < f; ++e)
      null != (d = b(a[e], c, a, e)) && (a[e] = d)
}
,
$CoT.array_apply = function(a, b, c) {
  for (var e = 0, f = a.length; e < f; ++e)
      b(a[e], c, a, e)
}
,
$CoT.array_filter = function(a, b) {
  for (var c = [], d = 0, e = a.length; d < e; ++d)
      b(a[d]) && c.push(a[d]);
  return c
}
,
$CoT.array_index = function(a, b, c, d) {
  if (!$CoT.is_array(a))
      return !1;
  if (!a.__R || d) {
      a.__R = {},
      c || (c = function(a) {
          return a
      }
      );
      for (var e = 0, f = a.length; e < f; ++e)
          a.__R[c(a[e])] = e
  }
  return null == b ? a.__R : !isNaN(a.__R[b])
}
,
$CoT.array_compare = function(a, b) {
  if (a.length != b.length)
      return !1;
  for (var c = {}, d = a.length; d >= 0; --d)
      c[a[d]] = !0;
  for (var e = !0, d = b.length; d >= 0; --d)
      void 0 === c[b[d]] && (e = !1);
  return e
}
,
$CoT.array_unique = function(a) {
  for (var b = [], c = {}, d = a.length - 1; d >= 0; --d)
      c[a[d]] = 1;
  for (var d in c)
      b.push(d);
  return b
}
,
$CoT.ge = function(a) {
  return "string" != typeof a ? a : document.getElementById(a)
}
,
$CoT.gE = function(a, b) {
  return a.getElementsByTagName(b)
}
,
$CoT.ce = function(a, b, c) {
  var d = document.createElement(a);
  return b && $CoT.cOr(d, b),
  c && $CoT.ae(d, c),
  d
}
,
$CoT.de = function(a) {
  a && a.parentNode && a.parentNode.removeChild(a)
}
,
$CoT.ae = function(a, b) {
  return $CoT.is_array(b) ? ($CoT.array_apply(b, a.appendChild.bind(a)),
  b) : a.appendChild(b)
}
,
$CoT.aef = function(a, b) {
  return a.insertBefore(b, a.firstChild)
}
,
$CoT.ee = function(a, b) {
  for (b || (b = 0); a.childNodes[b]; )
      a.removeChild(a.childNodes[b])
}
,
$CoT.ct = function(a) {
  return document.createTextNode(a)
}
,
$CoT.st = function(a, b) {
  a.firstChild && 3 == a.firstChild.nodeType ? a.firstChild.nodeValue = b : $CoT.aef(a, $CoT.ct(b))
}
,
$CoT.nw = function(a) {
  a.style.whiteSpace = "nowrap"
}
,
$CoT.rf = function() {
  return !1
}
,
$CoT.rf2 = function(a) {
  if (a = $CoT.evt(a),
  !(a.ctrlKey || a.shiftKey || a.altKey || a.metaKey))
      return !1
}
,
$CoT.tb = function() {
  this.blur()
}
,
$CoT.aE = function(a, b, c) {
  a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
}
,
$CoT.dE = function(a, b, c) {
  a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent("on" + b, c)
}
,
$CoT.sp = function(a) {
  a || (a = event),
  $CoT.Browser.ie6789 ? a.cancelBubble = !0 : a.stopPropagation()
}
,
$CoT.sc = function(a, b, c, d, e) {
  var f = new Date
    , g = a + "=" + escape(c) + "; ";
  f.setDate(f.getDate() + b),
  g += "expires=" + f.toUTCString() + "; ",
  d && (g += "path=" + d + "; "),
  e && (g += "domain=" + e + "; "),
  document.cookie = g,
  $CoT.gc(a),
  $CoT.gc.C[a] = c
}
,
$CoT.dc = function(a) {
  $CoT.sc(a, -1),
  $CoT.gc.C[a] = null
}
,
$CoT.gc = function(a) {
  if (null == $CoT.gc.I) {
      var b = unescape(document.cookie).split("; ");
      $CoT.gc.C = {};
      for (var c = 0, d = b.length; c < d; ++c) {
          var f, g, e = b[c].indexOf("=");
          -1 != e ? (f = b[c].substr(0, e),
          g = b[c].substr(e + 1)) : (f = b[c],
          g = ""),
          $CoT.gc.C[f] = g
      }
      $CoT.gc.I = 1
  }
  return a ? $CoT.gc.C[a] : $CoT.gc.C
}
,
$CoT.ns = function(a) {
  $CoT.Browser.ie6789 && (a.onfocus = $CoT.tb,
  a.onmousedown = a.onselectstart = a.ondragstart = $CoT.rf)
}
,
$CoT.eO = function(a) {
  for (var b in a)
      delete a[b]
}
,
$CoT.dO = function(a) {
  function b() {}
  return b.prototype = a,
  new b
}
,
$CoT.cO = function(a, b) {
  for (var c in b)
      null !== b[c] && "object" == typeof b[c] && b[c].length ? a[c] = b[c].slice(0) : a[c] = b[c];
  return a
}
,
$CoT.cOr = function(a, b) {
  for (var c in b)
      "object" == typeof b[c] ? b[c].length ? a[c] = b[c].slice(0) : (a[c] || (a[c] = {}),
      $CoT.cOr(a[c], b[c])) : a[c] = b[c];
  return a
}
,
$CoT.Browser = {
  ie: !(!window.attachEvent || window.opera),
  opera: !!window.opera,
  safari: -1 != navigator.userAgent.indexOf("Safari"),
  firefox: -1 != navigator.userAgent.indexOf("Firefox"),
  chrome: -1 != navigator.userAgent.indexOf("Chrome")
},
$CoT.Browser.ie9 = $CoT.Browser.ie && -1 != navigator.userAgent.indexOf("MSIE 9.0"),
$CoT.Browser.ie8 = $CoT.Browser.ie && -1 != navigator.userAgent.indexOf("MSIE 8.0") && !$CoT.Browser.ie9,
$CoT.Browser.ie7 = $CoT.Browser.ie && -1 != navigator.userAgent.indexOf("MSIE 7.0") && !$CoT.Browser.ie8,
$CoT.Browser.ie6 = $CoT.Browser.ie && -1 != navigator.userAgent.indexOf("MSIE 6.0") && !$CoT.Browser.ie7,
$CoT.Browser.ie67 = $CoT.Browser.ie6 || $CoT.Browser.ie7,
$CoT.Browser.ie678 = $CoT.Browser.ie67 || $CoT.Browser.ie8,
$CoT.Browser.ie6789 = $CoT.Browser.ie678 || $CoT.Browser.ie9,
navigator.userAgent.match(/Gecko\/([0-9]+)/),
$CoT.Browser.geckoVersion = 0 | parseInt(RegExp.$1),
$CoT.OS = {
  windows: -1 != navigator.appVersion.indexOf("Windows"),
  mac: -1 != navigator.appVersion.indexOf("Macintosh"),
  linux: -1 != navigator.appVersion.indexOf("Linux")
},
$CoT.localStorage = new function() {
  this.isSupported = function() {
      var a;
      try {
          a = "localStorage"in window && null !== window.localStorage
      } catch (b) {
          a = !1
      }
      if (a)
          try {
              localStorage.setItem("test", "123"),
              a = "123" == localStorage.getItem("test"),
              localStorage.removeItem("test")
          } catch (b) {
              a = !1
          }
      return $CoT.localStorage.isSupported = function(a) {
          return a
      }
      .bind(null, a),
      a
  }
  ,
  this.set = function(a, b) {
      $CoT.localStorage.isSupported() && localStorage.setItem(a, b)
  }
  ,
  this.get = function(a) {
      if ($CoT.localStorage.isSupported())
          return localStorage.getItem(a)
  }
  ,
  this.remove = function(a) {
      $CoT.localStorage.isSupported() && localStorage.removeItem(a)
  }
}
,
$CoT.getWindowSize = function() {
  var a = 0
    , b = 0;
  return document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight) ? (a = document.documentElement.clientWidth,
  b = document.documentElement.clientHeight) : document.body && (document.body.clientWidth || document.body.clientHeight) ? (a = document.body.clientWidth,
  b = document.body.clientHeight) : "number" == typeof window.innerWidth && (a = window.innerWidth,
  b = window.innerHeight),
  {
      w: a,
      h: b
  }
}
,
$CoT.getScroll = function() {
  var a = 0
    , b = 0;
  return "number" == typeof window.pageYOffset ? (a = window.pageXOffset,
  b = window.pageYOffset) : document.body && (document.body.scrollLeft || document.body.scrollTop) ? (a = document.body.scrollLeft,
  b = document.body.scrollTop) : document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop) && (a = document.documentElement.scrollLeft,
  b = document.documentElement.scrollTop),
  {
      x: a,
      y: b
  }
}
,
$CoT.getCursorPos = function(a) {
  var b, c;
  if (window.innerHeight)
      a.pageX && a.pageY ? (b = a.pageX,
      c = a.pageY) : (b = a.clientX,
      c = a.clientY);
  else {
      var d = $CoT.getScroll();
      b = a.clientX + d.x,
      c = a.clientY + d.y
  }
  return {
      x: b,
      y: c
  }
}
,
$CoT.ac = function(a, b) {
  for (var e, c = 0, d = 0; a; ) {
      for (c += a.offsetLeft,
      d += a.offsetTop,
      e = a.parentNode; e && e != a.offsetParent && e.offsetParent; ) {
          if (e.scrollLeft || e.scrollTop) {
              c -= 0 | e.scrollLeft,
              d -= 0 | e.scrollTop;
              break
          }
          e = e.parentNode
      }
      a = a.offsetParent
  }
  if ($CoT.isset("Lightbox") && Lightbox.isVisible() && (b = !0),
  b) {
      var f = $CoT.getScroll();
      c += f.x,
      d += f.y
  }
  var g = [c, d];
  return g.x = c,
  g.y = d,
  g
}
,
$CoT.scrollTo = function(a, b) {
  var c, d = $CoT.getWindowSize(), e = $CoT.getScroll(), f = d.w, g = d.h, h = e.x, i = e.y;
  a = $CoT.ge(a),
  null == b ? b = [] : "number" == typeof b && (b = [b]),
  c = b.length,
  0 == c ? b[0] = b[1] = b[2] = b[3] = 0 : 1 == c ? b[1] = b[2] = b[3] = b[0] : 2 == c ? (b[2] = b[0],
  b[3] = b[1]) : 3 == c && (b[3] = b[1]),
  c = $CoT.ac(a);
  var j = c[0] - b[3]
    , k = c[1] - b[0]
    , l = c[0] + a.offsetWidth + b[1]
    , m = c[1] + a.offsetHeight + b[2];
  l - j > f || j < h ? h = j : l - f > h && (h = l - f),
  m - k > g || k < i ? i = k : m - g > i && (i = m - g),
  scrollTo(h, i)
}
,
$CoT.createReverseLookupJson = function(a) {
  var b = {};
  for (var c in a)
      b[a[c]] = c;
  return b
}
,
$CoT.getLocaleFromDomain = function(a) {
  var b = $CoT.getLocaleFromDomain.L;
  if (a) {
      var c = a.indexOf(".");
      -1 != c && (a = a.substring(0, c))
  }
  return b[a] ? b[a] : 0
}
,
$CoT.getLocaleFromDomain.L = {
  fr: 2,
  de: 3,
  es: 6,
  ru: 8,
  www: 0
},
$CoT.getDomainFromLocale = function(a) {
  var b;
  return b = $CoT.getDomainFromLocale.L ? $CoT.getDomainFromLocale.L : $CoT.getDomainFromLocale.L = $CoT.createReverseLookupJson($CoT.getLocaleFromDomain.L),
  b[a] ? b[a] : "www"
}
,
$CoT.getExpansionFromDomain = function(a) {
  var b = $CoT.getExpansionFromDomain.L;
  if (a) {
      var c = a.indexOf(".");
      -1 != c && (a = a.substring(0, c))
  }
  return b[a] ? b[a] : 0
}
,
$CoT.getExpansionFromDomain.L = {
  tbc: 1,
  wotlk: 2,
  cata: 3,
  mop: 4,
  wod: 5,
  classic: 0
},
$CoT.getDomainFromExpansion = function(a) {
  var b = $CoT.getDomainFromLocale.L = $CoT.createReverseLookupJson($CoT.getExpansionFromDomain.L);
  return b[a] ? b[a] : "wotlk"
}
,
$CoT.getIdFromTypeName = function(a) {
  var b = $CoT.getIdFromTypeName.L;
  return b[a] ? b[a] : -1
}
,
$CoT.getIdFromTypeName.L = {
  npc: 1,
  object: 2,
  item: 3,
  itemset: 4,
  quest: 5,
  spell: 6,
  zone: 7,
  faction: 8,
  pet: 9,
  achievement: 10,
  title: 11,
  event: 12,
  class: 13,
  race: 14,
  skill: 15,
  currency: 17
},
$CoT.ajaxRequest = function(a) {
  var b = document.getElementsByTagName("head")[0]
    , c = $CoT.getGets();
  null != c.refresh && (c.refresh.length ? a += "&refresh=" + c.refresh : a += "&refresh"),
  null != c.locale && (a += "&locale=" + c.locale),
  $CoT.ae(b, $CoT.ce("script", {
      type: "text/javascript",
      src: a,
      charset: "utf8"
  }))
}
,
$CoT.getGets = function() {
  if (null != $CoT.getGets.C)
      return $CoT.getGets.C;
  var a = $CoT.getQueryString()
    , b = $CoT.parseQueryString(a);
  return $CoT.getGets.C = b,
  b
}
,
$CoT.getQueryString = function() {
  var a = "";
  return location.pathname && (a += location.pathname.substr(1)),
  location.search && (location.pathname && (a += "&"),
  a += location.search.substr(1)),
  a
}
,
$CoT.parseQueryString = function(a) {
  a = decodeURIComponent(a);
  for (var b = a.split("&"), c = {}, d = 0, e = b.length; d < e; ++d)
      $CoT.splitQueryParam(b[d], c);
  return c
}
,
$CoT.splitQueryParam = function(a, b) {
  var d, e, c = a.indexOf("=");
  -1 != c ? (d = a.substr(0, c),
  e = a.substr(c + 1)) : (d = a,
  e = ""),
  b[d] = e
}
,
$CoT.createRectangle = function(a, b, c, d) {
  return {
      l: a,
      t: b,
      r: a + c,
      b: b + d
  }
}
,
$CoT.intersectRectangle = function(a, b) {
  return !(a.l >= b.r || b.l >= a.r || a.t >= b.b || b.t >= a.b)
}
,
$CoT.convertRatingToPercent = function(a, b, c, d) {
  var e = $CoT.convertRatingToPercent.RB;
  a < 0 ? a = 1 : a > 80 && (a = 80),
  (14 == b || 12 == b || 15 == b) && a < 34 && (a = 34),
  28 != b && 36 != b || 2 != d && 6 != d && 7 != d && 11 != d || (e[b] /= 1.3),
  c < 0 && (c = 0);
  var f;
  if (e && null != e[b]) {
      var g;
      g = a > 70 ? 82 / 52 * Math.pow(131 / 63, (a - 70) / 10) : a > 60 ? 82 / (262 - 3 * a) : a > 10 ? (a - 8) / 52 : 2 / 52,
      f = c / e[b] / g
  } else
      f = 0;
  return f
}
,
$CoT.statToJson = {
  1: "health",
  2: "mana",
  3: "agi",
  4: "str",
  5: "int",
  6: "spi",
  7: "sta",
  8: "energy",
  9: "rage",
  10: "focus",
  12: "defrtng",
  13: "dodgertng",
  14: "parryrtng",
  15: "blockrtng",
  16: "mlehitrtng",
  17: "rgdhitrtng",
  18: "splhitrtng",
  19: "mlecritstrkrtng",
  20: "rgdcritstrkrtng",
  21: "splcritstrkrtng",
  22: "_mlehitrtng",
  23: "_rgdhitrtng",
  24: "_splhitrtng",
  25: "_mlecritstrkrtng",
  26: "_rgdcritstrkrtng",
  27: "_splcritstrkrtng",
  28: "mlehastertng",
  29: "rgdhastertng",
  30: "splhastertng",
  31: "hitrtng",
  32: "critstrkrtng",
  33: "_hitrtng",
  34: "_critstrkrtng",
  35: "resirtng",
  36: "hastertng",
  37: "exprtng",
  38: "atkpwr",
  39: "rgdatkpwr",
  40: "feratkpwr",
  41: "splheal",
  42: "spldmg",
  43: "manargn",
  44: "armorpenrtng",
  45: "splpwr",
  46: "healthrgn",
  47: "splpen",
  48: "block",
  49: "mastrtng",
  50: "armor",
  51: "firres",
  52: "frores",
  53: "holres",
  54: "shares",
  55: "natres",
  56: "arcres",
  57: "firsplpwr",
  58: "frosplpwr",
  59: "holsplpwr",
  60: "shasplpwr",
  61: "natsplpwr",
  62: "arcsplpwr"
},
$CoT.jsonToStat = {};
for (var i in $CoT.statToJson)
  $CoT.jsonToStat[$CoT.statToJson[i]] = i;
$CoT.individualToGlobalStat = {
  16: 31,
  17: 31,
  18: 31,
  19: 32,
  20: 32,
  21: 32,
  22: 33,
  23: 33,
  24: 33,
  25: 34,
  26: 34,
  27: 34,
  28: 36,
  29: 36,
  30: 36
},
$CoT.convertScalingFactor = function(a, b, c, d, e) {
  var f = $CoT.convertScalingFactor.SV
    , g = $CoT.convertScalingFactor.SD;
  if (!f[a])
      return e ? {} : 0;
  var h = {}
    , i = f[a]
    , j = g[c];
  return j && d >= 0 && d <= 9 ? (h.n = $CoT.statToJson[j[d]],
  h.s = j[d],
  h.v = Math.floor(i[b] * j[d + 10] / 1e4)) : h.v = i[b],
  e ? h : h.v
}
,
$CoT.getDataSource = function() {
  if ($CoT.isset("pageInfo"))
      switch (pageInfo.type) {
      case 3:
          if ($CoT.isset("itemData"))
              return itemData;
      case 6:
          if ($CoT.isset("spellData"))
              return spellData
      }
  return []
}
,
$CoT.setJsonItemLevel = function(a, b) {
  if (a.scadist && a.scaflags) {
      a.bonuses = a.bonuses || {};
      for (var c = -1, d = -1, e = -1, f = -1, g = 262175, h = 16253408, i = 32256, j = 32768, k = 5120, l = 0; l < 24; ++l) {
          var m = 1 << l;
          m & a.scaflags && (m & g && c < 0 ? c = l : m & h && d < 0 ? d = l : m & i && e < 0 ? e = l : m & j && f < 0 && (f = l))
      }
      if (c >= 0)
          for (var l = 0; l < 10; ++l) {
              var n = $CoT.convertScalingFactor(b, c, a.scadist, l, 1);
              n.n && (a[n.n] = n.v),
              a.bonuses[n.s] = n.v
          }
      if (d >= 0 && (a.armor = $CoT.convertScalingFactor(b, d)),
      e >= 0) {
          var o = a.scaflags & k ? .2 : .3
            , p = a.mledps ? "mle" : "rgd";
          a.dps = a[p + "dps"] = $CoT.convertScalingFactor(b, e),
          a.dmgmin = a[p + "dmgmin"] = Math.floor(a.dps * a.speed * (1 - o)),
          a.dmgmax = a[p + "dmgmax"] = Math.floor(a.dps * a.speed * (1 + o)),
          a.feratkpwr && (a.feratkpwr = Math.max(0, Math.floor(14 * (a.dps - 54.8))))
      }
      f >= 0 && (a.splpwr = a.bonuses[45] = $CoT.convertScalingFactor(b, f))
  }
}
,
$CoT.setTooltipLevel = function(a, b) {
  var c = typeof a;
  if ("number" == c) {
      var d = $CoT.getDataSource();
      if (!d[a] || !d[a][(buff ? "buff_" : "tooltip_") + Locale.getName()])
          return a;
      a = d[a][(buff ? "buff_" : "tooltip_") + Locale.getName()]
  } else if ("string" != c)
      return a;
  if (!(c = a.match(/<!--\?([0-9:]*)-->/)))
      return a;
  c = c[1].split(":");
  var b = Math.min(parseInt(c[2]), Math.max(parseInt(c[1]), b))
    , e = parseInt(c[4]) || 0;
  if (e && !a.match(/<!--pts[0-9](:[0-9])?-->/g)) {
      var f = parseInt(c[5]) || 0
        , g = a.match(/<!--spd-->(\d\.\d+)/);
      g && (g = parseFloat(g[1]) || 0);
      var h = {
          scadist: e,
          scaflags: f,
          speed: g
      };
      $CoT.setJsonItemLevel(h, b),
      a = a.replace(/(<!--asc(\d+)-->)([^<]+)/, function(a, d, e) {
          return c = e,
          b < 40 && (3 == e || 4 == e) && --c,
          d + itemset_types[c]
      }),
      a = a.replace(/(<!--dmg-->)\d+(\D+)\d+/, function(a, b, c) {
          return b + h.dmgmin + c + h.dmgmax
      }),
      a = a.replace(/(<!--dps-->\D*?)(\d+\.\d)/, function(a, b) {
          return b + h.dps.toFixed(1)
      }),
      a = a.replace(/<span class="c11"><!--fap-->(\D*?)(\d+)(\D*?)<\/span>(<br \/>)?/i, function(a, b, c, d, e) {
          var f;
          return c = Math.floor(14 * (h.dps - 54.8)),
          h.dps > 54.8 && c > 0 ? (f = "",
          e = e ? "<br />" : "") : (c = 0,
          f = ' style="display: none"',
          e = e ? "\x3c!--br--\x3e" : ""),
          '<span class="c11"' + f + ">\x3c!--fap--\x3e" + b + c + d + "</span>" + e
      }),
      a = a.replace(/(<!--amr-->)\d+/, function(a, b) {
          return b + h.armor
      }),
      a = a.replace(/<span><!--stat(\d+)-->[-+]\d+(\D*?)<\/span>(<!--e-->)?(<!--ps-->)?(<br ?\/?>)?/gi, function(a, b, c, d, e, f) {
          var g, i = h.bonuses[b];
          return i ? (i = (i > 0 ? "+" : "-") + i,
          g = "",
          f = f ? "<br />" : "") : (i = "+0",
          g = ' style="display: none"',
          f = f ? "\x3c!--br--\x3e" : ""),
          "<span" + g + ">\x3c!--stat" + b + "--\x3e" + i + c + "</span>" + (d || "") + (e || "") + f
      }),
      a = a.replace(/<span class="q2">(.*?)<!--rtg(\d+)-->\d+(.*?)<\/span>(<br \/>)?/gi, function(a, b, c, d, e, f, g) {
          var i, j = h.bonuses[$CoT.individualToGlobalStat[c] || c];
          return j ? (i = "",
          g = g ? "<br />" : "") : (i = ' style="display: none"',
          g = g ? "\x3c!--br--\x3e" : ""),
          '<span class="q2"' + i + ">" + b + "\x3c!--rtg" + c + "--\x3e" + j + d + "</span>" + g
      })
  }
  return a = a.replace(/<!--ppl(\d+):(\d+):(\d+):(\d+)-->\s*\d+/gi, function(a, c, d, e, f) {
      return "\x3c!--ppl" + c + ":" + d + ":" + e + ":" + f + "--\x3e" + Math.round(parseInt(e) + (Math.min(Math.max(b, c), d) - c) * f / 100)
  }),
  a = a.replace(/(<!--rtg%(\d+)-->)([\.0-9]+)/g, function(d, e, f, g) {
      return c = a.match(new RegExp("\x3c!--rtg" + f + "--\x3e(\\d+)")),
      c ? e + Math.round(100 * $CoT.convertRatingToPercent(b, f, c[1])) / 100 : d
  }),
  a = a.replace(/(<!--\?\d+:\d+:\d+:)\d+((:\d+:\d+)?-->)/, "$1" + b + "$2"),
  a = a.replace(/<!--lvl-->\d+/g, "\x3c!--lvl--\x3e" + b)
}
,
$CoT.setTooltipSpells = function(a, b, c, d) {
  var g, e = {}, f = "\x3c!--sp([0-9]+):[01]--\x3e.+?\x3c!--sp\\1--\x3e";
  null == b && (b = []),
  null == d && (d = {});
  for (var h = 0; h < b.length; ++h)
      e[b[h]] = 1;
  if (g = a.match(new RegExp(f,"g")))
      for (var h = 0; h < g.length; ++h) {
          var i = g[h].match(f)[1];
          if (e[i] = 0 | e[i],
          null == d[i] && (d[i] = -1),
          d[i]++,
          null != c[i] && null != c[i][d[i]] && null != c[i][d[i]][e[i]]) {
              var j = c[i][d[i]][e[i]];
              j = $CoT.setTooltipSpells(j, b, c, d),
              a = a.replace(g[h], "\x3c!--sp" + i + ":" + e[i] + "--\x3e" + j + "\x3c!--sp" + i + "--\x3e")
          }
      }
  return a
}
,
$CoT.enhanceTooltip = function(a, b, c, d, e, f, g) {
  var i, h = typeof a;
  if ("number" == h) {
      var j = $CoT.getDataSource()
        , k = a;
      if (!j[k] || !j[k][(e ? "buff_" : "tooltip_") + Locale.getName()])
          return a;
      a = j[k][(e ? "buff_" : "tooltip_") + Locale.getName()],
      (i = j[k][(e ? "buff" : "") + "spells_" + Locale.getName()]) && (a = $CoT.setTooltipSpells(a, f, i))
  } else if ("string" != h)
      return a;
  if (c) {
      var l = $CoT.getGets();
      l.lvl && (a = $CoT.setTooltipLevel(a, l.lvl, e))
  }
  if (b && (a = a.replace(/<span class="q2"><!--addamr(\d+)--><span>.*?<\/span><\/span>/i, function(a, b) {
      return '<span class="q2 tip" onmouseover="$CoT.Tooltip.showAtCursor(event, $CoT.sprintf(LANG.tooltip_armorbonus, ' + b + '), 0, 0, \'q\')" onmousemove="$CoT.Tooltip.cursorUpdate(event)" onmouseout="$CoT.Tooltip.hide()">' + a + "</span>"
  }),
  a = a.replace(/\(([^\)]*?<!--lvl-->[^\(]*?)\)/gi, function(a, b) {
      return '(<a href="javascript:;" onmousedown="return false" class="tip" style="color: white; cursor: pointer" onclick="$CoT.staticTooltipLevelClick(this, null, 0)" onmouseover="$CoT.Tooltip.showAtCursor(event, \'<span class=\\\'q2\\\'>\' + LANG.tooltip_changelevel + \'</span>\')" onmousemove="$CoT.Tooltip.cursorUpdate(event)" onmouseout="$CoT.Tooltip.hide()">' + b + "</a>)"
  })),
  d && Slider)
      if (e && e.slider)
          e.bufftip = this;
      else {
          var h = a.match(/<!--\?(\d+):(\d+):(\d+):(\d+)/);
          h && h[2] != h[3] && (this.slider = Slider.init(d, {
              minValue: parseInt(h[2]),
              maxValue: parseInt(h[3]),
              onMove: $CoT.tooltipSliderMove.bind(this)
          }),
          Slider.setValue(this.slider, parseInt(h[4])),
          this.slider.onmousemove = $CoT.Tooltip.cursorUpdate,
          this.slider.onmouseout = $CoT.Tooltip.hide,
          this.slider.onmouseover = function(a) {
              $CoT.Tooltip.showAtCursor(a, LANG.tooltip_changelevel2, 0, 0, "q2")
          }
          )
      }
  if (g) {
      if (e && e.modified)
          e.bufftip = this;
      else
          for (var m in i)
              spellData[m] && -1 == $CoT.in_array(f, m) && ($(g).append('<input type="checkbox" id="known-' + m + '" />').append('<label for="known-' + m + '"><a rel="spell=' + m + "&know=" + m + '">' + spellData[m]["name_" + Locale.getName()] + (spellData[m]["rank_" + Locale.getName()] ? " (" + spellData[m]["rank_" + Locale.getName()] + ")" : "") + "</a></label>").append("<br />"),
              $("#known-" + m).change($CoT.tooltipSpellsChange.bind(this)));
      this.modified = [g, i, f],
      $(g).toggle(!$(g).is(":empty"))
  }
  return a
}
,
$CoT.staticTooltipLevelClick = function(a, b, c, d) {
  for (; -1 == a.className.indexOf("tooltip"); )
      a = a.parentNode;
  var e = a.innerHTML;
  if (e = e.match(/<!--\?(\d+):(\d+):(\d+):(\d+)/)) {
      var f = parseInt(e[1])
        , g = parseInt(e[2])
        , h = parseInt(e[3])
        , i = parseInt(e[4]);
      if (!(g >= h || (b || (b = prompt($CoT.sprintf(LANG.prompt_ratinglevel, g, h), i)),
      b = parseInt(b),
      isNaN(b) || b == i || b < g || b > h))) {
          var j = $CoT.getDataSource();
          e = $CoT.setTooltipLevel(j[f][(d ? "buff_" : "tooltip_") + Locale.getName()], b, d),
          e = $CoT.enhanceTooltip(e, !0),
          a.innerHTML = "<table><tr><td>" + e + '</td><th style="background-position: top right"></th></tr><tr><th style="background-position: bottom left"></th><th style="background-position: bottom right"></th></tr></table>',
          $CoT.Tooltip.fixSafe(a, 1, 1),
          a.slider && !c && Slider.setValue(a.slider, b),
          d || $CoT.tooltipSpellsChange.bind(a)()
      }
  }
}
,
$CoT.tooltipSliderMove = function(a, b, c) {
  $CoT.staticTooltipLevelClick(this, c.value, 1),
  this.bufftip && $CoT.staticTooltipLevelClick(this.bufftip, c.value, 1, 1),
  $CoT.Tooltip.hide()
}
,
$CoT.tooltipSpellsChange = function() {
  if (this.modified) {
      var a = this.modified[0]
        , b = this.modified[1]
        , c = [];
      $.each($("input:checked", a), function(a, b) {
          c.push(parseInt(b.id.replace("known-", "")))
      }),
      this.modified[2] = c,
      this.innerHTML = $CoT.setTooltipSpells(this.innerHTML, c, b),
      this.bufftip && $CoT.tooltipSpellsChange.bind(this.bufftip)()
  }
}
,
$CoT.Tooltip = {
  create: function(a, b) {
      var c = $CoT.ce("div")
        , d = $CoT.ce("table")
        , e = $CoT.ce("tbody")
        , f = $CoT.ce("tr")
        , g = $CoT.ce("tr")
        , h = $CoT.ce("td")
        , i = $CoT.ce("th")
        , j = $CoT.ce("th")
        , k = $CoT.ce("th");
      if (c.className = "cavernoftime-tt",
      i.style.backgroundPosition = "top right",
      j.style.backgroundPosition = "bottom left",
      k.style.backgroundPosition = "bottom right",
      a && (h.innerHTML = a),
      $CoT.ae(f, h),
      $CoT.ae(f, i),
      $CoT.ae(e, f),
      $CoT.ae(g, j),
      $CoT.ae(g, k),
      $CoT.ae(e, g),
      $CoT.ae(d, e),
      b || ($CoT.Tooltip.icon = $CoT.ce("p"),
      $CoT.Tooltip.icon.style.visibility = "hidden",
      $CoT.ae($CoT.Tooltip.icon, $CoT.ce("div")),
      $CoT.ae(c, $CoT.Tooltip.icon)),
      $CoT.ae(c, d),
      !b) {
          var l = $CoT.ce("div");
          l.className = "tooltip-powered",
          $CoT.ae(c, l),
          $CoT.Tooltip.logo = l
      }
      return c
  },
  getMultiPartHtml: function(a, b) {
      return "<table><tr><td>" + a + "</td></tr></table><table><tr><td>" + b + "</td></tr></table>"
  },
  fix: function(a, b, c) {
      var d = $CoT.gE(a, "table")[0]
        , e = $CoT.gE(d, "td")[0]
        , f = e.childNodes;
      if (a.className = $CoT.trim(a.className.replace("tooltip-slider", "")),
      f.length >= 2 && "TABLE" == f[0].nodeName && "TABLE" == f[1].nodeName) {
          f[0].style.whiteSpace = "nowrap";
          var g = parseInt(a.style.width);
          a.slider && g || (g = f[1].offsetWidth > 300 ? Math.max(300, f[0].offsetWidth) + 20 : Math.max(f[0].offsetWidth, f[1].offsetWidth) + 20),
          g = Math.min(320, g),
          g > 20 && (a.style.width = g + "px",
          f[0].style.width = f[1].style.width = "100%",
          a.slider && (Slider.setSize(a.slider, g - 6),
          a.className += " tooltip-slider"),
          !b && a.offsetHeight > document.body.clientHeight && (d.className = "shrink"))
      }
      c && (a.style.visibility = "visible")
  },
  fixSafe: function(a, b, c) {
      $CoT.Tooltip.fix(a, b, c)
  },
  append: function(a, b) {
      var a = $CoT.ge(a)
        , c = $CoT.Tooltip.create(b);
      $CoT.ae(a, c),
      $CoT.Tooltip.fixSafe(c, 1, 1)
  },
  prepare: function() {
      if (!$CoT.Tooltip.tooltip) {
          var a = $CoT.Tooltip.create();
          a.style.position = "absolute",
          a.style.left = a.style.top = "-2323px",
          $CoT.ae(document.body, a),
          $CoT.Tooltip.tooltip = a,
          $CoT.Tooltip.tooltipTable = $CoT.gE(a, "table")[0],
          $CoT.Tooltip.tooltipTd = $CoT.gE(a, "td")[0];
          var a = $CoT.Tooltip.create(null, !0);
          a.style.position = "absolute",
          a.style.left = a.style.top = "-2323px",
          $CoT.ae(document.body, a),
          $CoT.Tooltip.tooltip2 = a,
          $CoT.Tooltip.tooltipTable2 = $CoT.gE(a, "table")[0],
          $CoT.Tooltip.tooltipTd2 = $CoT.gE(a, "td")[0]
      }
  },
  set: function(a, b) {
      var c = $CoT.Tooltip.tooltip;
      if (c.style.width = "550px",
      c.style.left = "-2323px",
      c.style.top = "-2323px",
      a.nodeName ? ($CoT.ee($CoT.Tooltip.tooltipTd),
      $CoT.ae($CoT.Tooltip.tooltipTd, a)) : $CoT.Tooltip.tooltipTd.innerHTML = a,
      c.style.display = "",
      $CoT.Tooltip.fix(c, 0, 0),
      b) {
          $CoT.Tooltip.showSecondary = !0;
          var c = $CoT.Tooltip.tooltip2;
          c.style.width = "550px",
          c.style.left = "-2323px",
          c.style.top = "-2323px",
          b.nodeName ? ($CoT.ee($CoT.Tooltip.tooltipTd2),
          $CoT.ae($CoT.Tooltip.tooltipTd2, b)) : $CoT.Tooltip.tooltipTd2.innerHTML = b,
          c.style.display = "",
          $CoT.Tooltip.fix(c, 0, 0)
      } else
          $CoT.Tooltip.showSecondary = !1
  },
  moveTests: [[null, null], [null, !1], [!1, null], [!1, !1]],
  move: function(a, b, c, d, e, f) {
      if ($CoT.Tooltip.tooltipTable) {
          var m, g = $CoT.Tooltip.tooltip, h = $CoT.Tooltip.tooltipTable.offsetWidth, j = ($CoT.Tooltip.tooltipTable.offsetHeight,
          $CoT.Tooltip.tooltip2), k = $CoT.Tooltip.showSecondary ? $CoT.Tooltip.tooltipTable2.offsetWidth : 0;
          $CoT.Tooltip.showSecondary && $CoT.Tooltip.tooltipTable2.offsetHeight;
          g.style.width = h + "px",
          j.style.width = k + "px";
          for (var n, p = 0, q = $CoT.Tooltip.moveTests.length; p < q; ++p) {
              m = $CoT.Tooltip.moveTests[p],
              n = $CoT.Tooltip.moveTest(a, b, c, d, e, f, m[0], m[1]);
              break
          }
          g.style.left = n.l + "px",
          g.style.top = n.t + "px",
          g.style.visibility = "visible",
          $CoT.Tooltip.showSecondary && (j.style.left = n.l + h + "px",
          j.style.top = n.t + "px",
          j.style.visibility = "visible")
      }
  },
  moveTest: function(a, b, c, d, e, f, g, h) {
      var i = a
        , j = b
        , l = ($CoT.Tooltip.tooltip,
      $CoT.Tooltip.tooltipTable.offsetWidth)
        , m = $CoT.Tooltip.tooltipTable.offsetHeight
        , o = ($CoT.Tooltip.tooltip2,
      $CoT.Tooltip.showSecondary ? $CoT.Tooltip.tooltipTable2.offsetWidth : 0)
        , p = $CoT.Tooltip.showSecondary ? $CoT.Tooltip.tooltipTable2.offsetHeight : 0
        , q = $CoT.getWindowSize()
        , r = $CoT.getScroll()
        , s = q.w
        , t = q.h
        , u = r.x
        , v = r.y
        , w = u
        , x = v
        , y = u + s
        , z = v + t;
      return null == g && (g = a + c + l + o <= y),
      null == h && (h = b - Math.max(m, p) >= x),
      g ? a += c + e : a = Math.max(a - (l + o), w) - e,
      h ? b -= Math.max(m, p) + f : b += d + f,
      a < w ? a = w : a + l + o > y && (a = y - (l + o)),
      b < x ? b = x : b + Math.max(m, p) > z && (b = Math.max(v, z - Math.max(m, p))),
      $CoT.Tooltip.iconVisible && i >= a - 48 && i <= a && j >= b - 4 && j <= b + 48 && (b -= 48 - (j - b)),
      $CoT.createRectangle(a, b, l, m)
  },
  show: function(a, b, c, d, e, f) {
      if (!$CoT.Tooltip.disabled) {
          (!c || c < 1) && (c = 1),
          (!d || d < 1) && (d = 1),
          e && (b = '<span class="' + e + '">' + b + "</span>");
          var g = $CoT.ac(a);
          $CoT.Tooltip.prepare(),
          $CoT.Tooltip.set(b, f),
          $CoT.Tooltip.move(g.x, g.y, a.offsetWidth, a.offsetHeight, c, d)
      }
  },
  showAtCursor: function(a, b, c, d, e, f) {
      if (!$CoT.Tooltip.disabled) {
          (!c || c < 10) && (c = 10),
          (!d || d < 10) && (d = 10),
          e && (b = '<span class="' + e + '">' + b + "</span>",
          f && (f = '<span class="' + e + '">' + f + "</span>")),
          a = $CoT.evt(a);
          var g = $CoT.getCursorPos(a);
          $CoT.Tooltip.prepare(),
          $CoT.Tooltip.set(b, f),
          $CoT.Tooltip.move(g.x, g.y, 0, 0, c, d)
      }
  },
  showAtXY: function(a, b, c, d, e, f) {
      $CoT.Tooltip.disabled || ($CoT.Tooltip.prepare(),
      $CoT.Tooltip.set(a, f),
      $CoT.Tooltip.move(b, c, 0, 0, d, e))
  },
  cursorUpdate: function(a, b, c) {
      if (!$CoT.Tooltip.disabled && $CoT.Tooltip.tooltip) {
          a = $CoT.evt(a),
          (!b || b < 10) && (b = 10),
          (!c || c < 10) && (c = 10);
          var d = $CoT.getCursorPos(a);
          $CoT.Tooltip.move(d.x, d.y, 0, 0, b, c)
      }
  },
  hide: function() {
      $CoT.Tooltip.tooltip && ($CoT.Tooltip.tooltip.style.display = "none",
      $CoT.Tooltip.tooltip.visibility = "hidden",
      $CoT.Tooltip.tooltipTable.className = "",
      $CoT.Tooltip.setIcon(null)),
      $CoT.Tooltip.tooltip2 && ($CoT.Tooltip.tooltip2.style.display = "none",
      $CoT.Tooltip.tooltip2.visibility = "hidden",
      $CoT.Tooltip.tooltipTable2.className = "")
  },
  setIcon: function(a, b) {
      $CoT.Tooltip.prepare(),
      b = void 0 === b ? $CoT.getDomainFromExpansion(0) : $CoT.getDomainFromExpansion(b),
      a ? ($CoT.Tooltip.icon.style.backgroundImage = "url(//cdn.cavernoftime.com/" + b + "/icons/medium/" + a.toLowerCase() + ".jpg)",
      $CoT.Tooltip.icon.style.visibility = "visible") : ($CoT.Tooltip.icon.style.backgroundImage = "none",
      $CoT.Tooltip.icon.style.visibility = "hidden"),
      $CoT.Tooltip.iconVisible = a ? 1 : 0
  }
},
$CoT.isset("$CoTTooltip") && $CoTTooltip.init();
