var unit_tests_expectations = [function () { return partially_apply(f, allArgs, dupArguments(arguments)); }, 11, 3, function () { return partially_apply(f, allArgs, dupArguments(arguments)); }, function () { return partially_apply(f, allArgs, dupArguments(arguments)); }, 31, 31, function () { return partially_apply(f, allArgs, dupArguments(arguments)); }, 13];

var unit_tests_actual = [];
function test() {
  for (var a = 0; a < arguments.length; ++a) {
    unit_tests_actual.push(arguments[a]);
  }
}

function ut() {
  if ((unit_tests_actual + "") == (unit_tests_expectations + "")) {
    shew("(ok)");
  } else {
    shew("TEST FAILURE");
    shew((unit_tests_actual + ""), (unit_tests_expectations + ""));
    shew(full(unit_tests_actual), full(unit_tests_expectations));
  }
}

function rac(arr) {
  return arr[arr.length-1];
}

function rdc(arr) {
  return arr.slice(0, arr.length-1);
}

function snoc(tail, head) {
  return concat(tail, [head]);
}

var _ = 'asdfjla;sdhfaos8yfg98dhfg9s8dfyg0s89dfg;sldkf';

// Replace _ slots in oargs with values from nargs; append remaining
// nargs -- no, make additional args an error.  If the _ slots are all
// full, call the function; otherwise,
// return another closure.
function partially_apply(f, oargs, nargs) {
  var ni = 0;

  oargs = dup(oargs);

  var allFilled = true;

  // Replace
  for (var oi = 0; oi < oargs.length; ++oi) {
    if (oargs[oi] == _) {
      if (ni < nargs.length) {
        oargs[oi] = nargs[ni++];
      } else {
        allFilled = false;
        break;
      }
    }
  }

  var allArgs = oargs;

  // Append remaining nargs
  if (ni < nargs.length) {
    // Actually, no, make this an error.
    //allArgs = concat(allArgs, nargs.slice(ni));
    err();
  }

  if (allFilled) {
    // Call function
    return f.apply(null, allArgs);
  } else {
    // Return closure
    return function() { return partially_apply(f, allArgs, dupArguments(arguments)); };
  }
}

function $$() {
  return partially_apply(arguments[0], dupArguments(arguments).slice(1), []);
}

test($$(function(a, b) { return a + b; }, 1, _));
test($$(function(a, b) { return a + b; }, 1, _)(10));
test($$(function(a, b) { return a + b; }, 1, 2));
test($$(function(a, b, c) { return a + b + c; }, 1, _, _));
test($$(function(a, b, c) { return a + b + c; }, 1, _, _)(10));
test($$(function(a, b, c) { return a + b + c; }, 1, _, _)(10)(20));
test($$(function(a, b, c) { return a + b + c; }, 1, _, _)(10, 20));
test($$(function(a, b, c) { return a + b + c; }, 1, 2, _));
test($$(function(a, b, c) { return a + b + c; }, 1, 2, _)(10));

function hr() {
  shew("----------------");
}

function full(o) {
  if (o instanceof Array) {
    return "[" + o.map(full).join(", ") + "]";
  } else if (o instanceof Function) {
    return o + ""; //"[func]";
  } else if (o instanceof Object) {
    return "{" + keys(o).map(function (key) { return key + ": " + full(o[key]); }).join(", ") + "}";
  } else {
    return "" + o;
  }
}

function indices(arr) {
  var inds = new Array(arr.length);
  for (var i = 0; i < arr.length; ++i) {
    inds[i] = i;
  }
  return inds;
}

function err(s) {
  if (s == undefined) {
    s = "whatever";
  }

  shew("ERROR: " + s);
  throw s;
}

function assert(b) {
  if (!b) {
    err("assertion failure");
  }
}

function listIndexMap(f, list) {
  var arr = new Array();
  for (var i = 0; i < list.length; ++i) {
    arr.push(f(i));
  }
  return arr;
}

function keymap(f, m) {
  return listmap(f, keys(m));
}

function valuemap(f, m) {
  var ret = new Object();
  for (var k in m) {
    ret[k] = f(m[k]);
  }
  return ret;
}

function entrymap(f, m) {
  var ret = new Object();
  for (var k in m) {
    ret[k] = f(k, m[k]);
  }
  return ret;
}

function listmap(f, list) {
  return list.map(f);
}

// Allows more than one argument to f.  Assumes the same length for
// all input lists.
function map(f) {
  var results = new Array();

  for (var i = 0; i < arguments[1].length; ++i) {
    var arglist = new Array();
    for (var a = 1; a < arguments.length; ++a) {
      arglist[a - 1] = arguments[a][i];
    }
    results[i] = f.apply(null, arglist);
  }
  return results;
}

function isNumber (o) {
  return !isNaN(o-0);
}

function dup(o) {
  if (o instanceof Array) {
    var arr = new Array();
    for (var i = 0; i < o.length; ++i) {
      arr.push(o[i]);
    }
    return arr;
  } else {
    var oo = new Object();
    for (var k in o) {
      oo[k] = o[k];
    }
    return oo;
  }
}

function concat() {
  var arr = new Array();
  for (var i = 0; i < arguments.length; ++i) {
    arr = arr.concat(arguments[i]);
  }
  return arr;
}

function grep(l, f) {
  return l.filter(f);
}

function eqer(o) {
  return function(p) { return o == p; };
}

function notter(f) {
  return function(o) { return !f(o); };
}

function mkrec() {
  var o = new Object();
  for (var i = 0; i < arguments.length; i += 2) {
    o[arguments[i]] = arguments[i + 1];
  }
  return o;
}

function recordAppend() {
  var app = new Object();
  for (var i = 0; i < arguments.length; ++i) {
    var o = arguments[i];
    for (var k in o) {
      app[k] = o[k];
    }
  }
  return app;
}

function dupArguments(as) {
  var arr = new Array();
  for (var i = 0; i < as.length; ++i) {
    arr.push(as[i]);
  }
  return arr;
}

function removeDuplicates(arr) {
  var hash = new Object();
  for (var i = 0; i < arr.length; ++i) {
    hash[arr[i]] = arr[i];
  }
  return values(hash);
}

var traceDepth = 0;

function traceIndent() {
  var s = "";
  for (var i = 0; i < traceDepth; ++i) {
    s += "--";
  }
  return s;
}

function tracefun(functionName) {
  var orig = top.window[functionName];
  top.window[functionName] = function () {
    traceDepth++;
    shew(traceIndent() + "  " + functionName + "(" + dupArguments(arguments).map(full).join(", ") + ")");
    var ret = orig.apply(this, arguments);
    shew(traceIndent() + "> " + full(ret));
    traceDepth--;
    return ret;
  };
}

function tracefuns() {
  for (var i = 0; i < arguments.length; ++i) {
    tracefun(arguments[i]);
  }
}

function text(o) {
  return document.createTextNode(o + "");
}

function sr(o) {
  shew(full(o));
  return o;
}

function shew()
{
  for (var i = 0; i < arguments.length; ++i) {
    var s = arguments[i];
    var e = text(s);
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(e);
    body.appendChild(document.createElement("br"));
  }
}

function put(o) {
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(o);
}

window.onerror = function(a, b, c)
{
  try {
    var message =  "Exception: "+a+" "+b+" "+c;
    shew(message);
  } catch(e) {
    var s = "";
    if (e["type"]) { s += e["type"]+"; "; }
    if (e["message"]) { s += e["message"]+"; "; }
    if (e["description"]) { s += e["description"]+"; "; }
    if (e["number"]) { s += e["number"]+"; "; }
    alert(s);
    throw e;
  }
  return true;
};

function include(file)
{
  file = "file:///Users/gmt/.../lib/" + file;
  if (__include.files[file]) {
    return;
  }
  __include.files[file] = 1;

  if (__include.alwaysReload) {
    file += "?s="+new Date().getTime();
  }

  var script = document.createElement("script");
  script.src = file;
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(script);

  if (__include.verbose) {
    shew("include "+file);
  }
}

function elem(type)
{
  return document.createElement( type );
}

function maketable(rows) {
  var table = elem("table");
  table.border = 1;
  if (rows.length == 0) {
    return maketable([{nothing: "nothing"}]);
  }
  var canonicalRow = rows[0];

  var tr = elem("tr");
  for (var key in canonicalRow) {
    var th = elem("th");
    th.appendChild(document.createTextNode(key + ""));
    tr.appendChild(th);
  }
  table.appendChild(tr);

  for (var i = 0; i < rows.length; ++i) {
    var row = rows[i];
    var tr = elem("tr");
    for (var key in canonicalRow) {
      var value = row[key];
      var td = elem("td");
      td.appendChild(document.createTextNode(value + ""));
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table;
}

function keys(o) {
  var arr = new Array();
  var inx = 0;
  for (var k in o) {
    arr[inx++] = k;
  }
  return arr;
}

function values(o) {
  var arr = new Array();
  var inx = 0;
  for (var k in o) {
    arr[inx++] = o[k];
  }
  return arr;
}

function trow(arr) {
  var tr = elem("tr");
  for (var j = 0; j < arr.length; ++j) {
    var td = elem("td");
    td.style.background = "#d8d8d8";
    var value = arr[j];
    value = (value instanceof Node) ? value : text(value);
    td.appendChild(value);
    tr.appendChild(td);
  }
  return tr;
}

function tcol(array) {
  var table = elem("table");
  table.style.background = "#fff";
  for (var i = 0; i < array.length; ++i) {
    var tr = elem("tr");
    var td = elem("td");
    td.style.background = "#d8d8d8";
    var value = array[i];
    value = (value instanceof Node) ? value : text(value);
    td.appendChild(value);
    tr.appendChild(td);
    table.appendChild(tr);
  }
  return table;
}

function horizontalArraystable(arrays) {
  var table = elem("table");
  table.style.background = "#fff";
  for (var i = 0; i < arrays.length; ++i) {
    table.appendChild(trow(arrays[i]));
  }
  return table;
}

function dumtable(o) {
  if (isScalar(o)) {
    return "" + o;
  } else if (isList(o)) {
    var vals = values(o);
    vals = vals.map(function (value) { return dumtable(value); });
    return tcol(vals);
  } else if (isRecord(o)) {
    var ks = keys(o);text
    var vals = values(o);
    vals = vals.map(function (value) { return dumtable(value); });
    return horizontalArraystable([ks, vals]);
  } else {
    assert(false);
  }
}

//tracefuns("tcol", "horizontalArraystable", "dumtable");

function isScalar(o) {
  return !(o instanceof Object) && !(o instanceof Array);
}

function isRecord(o) {
  return (o instanceof Object && !(o instanceof Array)) ||
    (o.isRecord != undefined && o.isRecord);
}

function isList(o) {
  return o instanceof Array || (o.isList != undefined && o.isList);
}

function gatherCoords(o) {
  if (isScalar(o)) {
    return [[]];
  } else if (isList(o)) {
    var coords = new Array();

    for (var i = 0; i < o.length; ++i) {
      var v = o[i];
      coords = coords.concat(gatherCoords(v).map(function (coord) { return ["*"].concat(coord); }));
    }

    return coords;
  } else if (isRecord(o)) {
    var coords = new Array();

    for (var k in o) {
      var v = o[k];
      coords = coords.concat(gatherCoords(v).map(function (coord) { return [k].concat(coord); }));
    }

    return coords;
  } else {
    assert(false);
  }
}

function gatherCoordsAndValues(o) {
  if (isScalar(o)) {
    return [[o]];
  } else if (isList(o)) {
    var coords = new Array();

    for (var i = 0; i < o.length; ++i) {
      var v = o[i];
      coords = coords.concat(gatherCoordsAndValues(v).map(function (coord) { return [i].concat(coord); }));
    }

    return coords;
  } else if (isRecord(o)) {
    var coords = new Array();

    for (var k in o) {
      var v = o[k];
      coords = coords.concat(gatherCoordsAndValues(v).map(function (coord) { return [k].concat(coord); }));
    }

    return coords;
  } else {
    assert(false);
  }
}

function splitAxesAndValueOne(list) {
  var mapCoords = new Array();
  var listCoords = new Array();
  for (var i = 0; i < list.length - 1; ++i) {
    var c = list[i];
    (isNumber(c) ? listCoords : mapCoords).push(c);
  }
  var value = list[list.length - 1];
  return [mapCoords, listCoords, value];
}

function splitAxesAndValue(lists) {
  return lists.map(splitAxesAndValueOne);
}

function mapListAxesTable(o) {
  var ct = new CoordTable();
  var av = splitAxesAndValue(gatherCoordsAndValues(o));
  for (var i = 0; i < av.length; ++i) {
    var v = av[i];
    var mapCoords = v[0];
    var listCoords = v[1];
    var value = v[2];
    ct.put(mapCoords.join("/"), listCoords.join("/"), value);
  }
  return ct;
}

function OrderedSet() {
  var set = new Object();
  var list = new Array();

  this.put = function(v) {
    if (set[v] == undefined) {
      set[v] = 1;
      list.push(v);
    }
  };

  this.asList = function() {
    return list;
  };

  return this;
}

function CoordTable() {
  var xs = new OrderedSet();
  var ys = new OrderedSet();

  var values = new Object();

  this.key = function(x, y) {
    return x + "////////" + y;
  };

  this.put = function (x, y, value) {
    xs.put(x);
    ys.put(y);
    values[this.key(x, y)] = value;
  };

  this.asHtml = function() {
    var xlist = xs.asList();
    var ylist = ys.asList();

    var table = elem("table");
    table.style.background = "#ccc";

    var tr = elem("tr");
    tr.appendChild(text("."));
    for (var j = 0; j < xlist.length; ++j) {
      var th = elem("th");
      th.appendChild(text(xlist[j]));
      tr.appendChild(th);
    }
    table.appendChild(tr);

    for (var i = 0; i < ylist.length; ++i) {
      var tr = elem("tr");
      tr.appendChild(text(ylist[i]));
      for (var j = 0; j < xlist.length; ++j) {
        var td = elem("td");
        var value = values[this.key(xlist[j], ylist[i])];

        if (value == undefined) {
          value = "";
        }

        value = (value instanceof Node) ? value : text(value);
        td.appendChild(value);
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }

    return table;
  };

  return this;
}

function extractHierarchy(o) {
  if (isScalar(o)) {
    return "_";
  } else if (isList(o)) {
    return ["*", extractHierarchy(o[0])];
  } else if (isRecord(o)) {
    return valuemap(extractHierarchy, o);
  } else {
    assert(false);
  }
}

function getListPaths(o) {
  return getListPaths1(o, []);
}

function getListPaths1(o, prefix) {
  if (isScalar(o)) {
    return [];
  } else if (isList(o)) {
    return [prefix].concat(getListPaths1(o[0], concat(prefix, "*")));
  } else if (isRecord(o)) {
    return concat.apply(this,
      keys(o).map(function (k) {
          return getListPaths1(o[k], prefix.concat([k]));
        }));
  } else {
    assert(false);
  }
}

function asRecords(o, listPath) {
  if (listPath.length == 0) {
    assert(isList(o));
    o = listmap(function (oo) { return valuemap(function(v) { if (isList(v)) return ["*"]; else return v; }, oo); }, o); //shew(full(oo)); return oo; }, o);
    return o;
  }

  if (isScalar(o)) {
    assert(false);
  } else if (isList(o)) {
    assert(listPath[0] == "*");

    return concat.apply(this,
      o.map(function(rec) { return asRecords(rec, listPath.slice(1)); }));

  } else if (isRecord(o)) {
    assert(listPath.length > 0);

    var children = asRecords(o[listPath[0]], listPath.slice(1));

    for (var k in o) {
      if (k != listPath[0] && !(listPath.length == 1 && isList(o[k]))) {
        children = children.map(function(rec) { return recordAppend(rec, mkrec(k, justHashes(o[k]))); });
      }
    }

    return children;
  } else {
    assert(false);
  }
}

function justHashes(o) {
  if (isScalar(o)) {
    return o;
  } else if (isList(o)) {
    return ["-"];
  } else if (isRecord(o)) {
    assert(listPath.length > 0);

    var children = asRecords(o[listPath[0]], listPath.slice(1));

    for (var k in o) {
      if (k != listPath[0]) {
        children = children.map(function(rec) { return recordAppend(rec, mkrec(k, justHashes(o[k]))); });
      }
    }

    return children;
  } else {
    assert(false);
  }
}

function blurt(data) {
  listmap(function(path) {
      shew(full(path));
      put(maketable(asRecords(data, path)));
    }, getListPaths(data));
}

function get(o, path) {
  if (isScalar(o)) {
    assert(path.length == 0);
    return o;
  } else if (isList(o)) {
    assert(path.length > 0);
    assert(isNumber(path[0]));
    return get(o[path[0]], path.slice(1));
  } else if (isRecord(o)) {
    assert(path.length > 0);
    assert(o[path[0]] != undefined);
    return get(o[path[0]], path.slice(1));
  } else {
    assert(false);
  }
}

// The path to each leaf
function allLeafPaths(o) {
  if (isScalar(o)) {
    return [[]];
  } else if (isList(o)) {
    return concat.apply(this, listIndexMap(function(i) { return allLeafPaths(o[i]).map(function (r) { return concat([i], r); }); }, o));
  } else if (isRecord(o)) {
    return concat.apply(this, keymap(function (k) { return allLeafPaths(o[k]).map(function (path) { return concat([k], path); }); }, o)); // concat([k], allLeafPaths(o[k])); }, o);
   } else {
    assert(false);
  }
}

function allNonListPaths(o) {
  if (isScalar(o)) {
    return [[]];
  } else if (isList(o)) {
    return allNonListPaths(o[0]).map(function (r) { return concat(['*'], r); });
  } else if (isRecord(o)) {
    return concat.apply(this, keymap(function (k) { return allNonListPaths(o[k]).map(function (path) { return concat([k], path); }); }, o)); // concat([k], allLeafPaths(o[k])); }, o);
   } else {
    assert(false);
  }
}

function allPathsListsCollapsed(o) {
  if (isScalar(o)) {
    return [[]];
  } else if (isList(o)) {
    return concat([['*']], allPathsListsCollapsed(o[0]).map(function (r) { return concat(['*'], r); }));
  } else if (isRecord(o)) {
    return concat.apply(this, keymap(function (k) { return allPathsListsCollapsed(o[k]).map(function (path) { return concat([k], path); }); }, o)); // concat([k], allLeafPaths(o[k])); }, o);
   } else {
    assert(false);
  }
}

// Return all paths that end in '*'.
function allListEnded(o) {
  return allListEnded1(o, []);
}

function allListEnded1(o, prefix) {
  if (isScalar(o)) {
    return [];
  } else if (isList(o)) {
    return concat([concat(prefix, ['*'])], allListEnded1(o[0], concat(prefix, ['*'])));
  } else if (isRecord(o)) {
    return concat.apply(this, keymap(function(k) { return allListEnded1(o[k], concat(prefix, [k])) }, o));
   } else {
    assert(false);
  }
}

ut();

put(dumtable(extractHierarchy(joe)));

//put(maketable([{a: 10, b: 20}, {a: 100, b: 200}]));
//put(maketable(jeter));
//put(dumtable([{a: 10, b: 20}, {a: 100, b: 200}]));
//put(dumtable(jeter));

/* put(dumtable(joe)); */
/* put(horizontalArraystable(removeDuplicates(gatherCoords(joe)))); */
//put(horizontalArraystable(splitAxesAndValue(gatherCoordsAndValues(joe))));
//put(mapListAxesTable(joe).asHtml());
//put(dumtable(getListPaths(joe)));
/* put(maketable(asRecords(joe, ["games", "*", "atbats"]))); */
/* put(maketable(asRecords(joe, ["games", "*", "catches"]))); */
/* put(maketable(asRecords(joe, ["games"]))); */
//blurt(joe);
/* listmap(function (path) { shew(full(get(joe, path))); }, */
/*   [ */
/*     ["name"], */
/*     ["games", "0", "date"], */
/*     ["games", "1", "date"], */
/*     ["games", "0", "atbats", "0", "inning"], */
/*     ["games", "0", "atbats", "1", "result"], */
/*     ["games", "1", "catches", "1", "inning"], */
/*     ["games", "1", "catches", "1", "caught"] */
/*    ]); */
/* shew(full(allLeafPaths(joe))); */
/* shew(full(allLeafPaths({a: 10, b: [{c: 30, d: 40}, {c: 300, d: 400}]}))); */
/* listmap(function (path) { shew(path, full(get(joe, path))); }, */
/*   allLeafPaths(joe)); */

function toNodesOne(o) {
  if (isScalar(o)) {
    return o;
  } else if (isList(o)) {
    return new RawList(o);
  } else if (isRecord(o)) {
    return new RawRecord(o);
  } else {
    err();
  }
}

function toNodes(o) {
  if (isScalar(o)) {
    return o;
  } else if (isList(o)) {
    return new RawList(listmap(toNodes, o));
  } else if (isRecord(o)) {
    return new RawRecord(valuemap(toNodes, o));
  } else {
    err(full(o));
  }
}

function RawList(arr) {
  this.arr = arr;
  this.isList = true;
  this.coords = function() {
    return indices(this.arr);
  };
  this.get = function(i) {
    return this.arr[i];
  };
}

function RawRecord(o) {
  this.o = o;
  this.isRecord = true;
  this.coords = function() {
    return keys(this.o);
  };
  this.get = function(k) {
    return this.o[k];
  };
}

function toRaw(n) {
  if (isList(n)) {
    var arr = new Array();
    var coords = n.coords();
    for (i in n.coords()) {
      arr[i] = toRaw(n.get(i));
    }
    return arr;
  } else if (isRecord(n)) {
    var o = new Object();
    var coords = n.coords();
    for (i in coords) {
      var k = coords[i];
      o[k] = toRaw(n.get(k));
    }
    return o;
  } else {
    return n;
  }
}

//tracefuns("toRaw");

function ts(n) {
  return full(toRaw(n));
}

function toAndFromNodes(o) {
  shew(full(o));
  hr();
  shew(full(toNodes(o)));
  hr();
  shew(full(toRaw(toNodes(o))));
}

function checkToAndFromNodes(o) {
  assert(full(o) == full(toRaw(toNodes(o))));
}

/* toAndFromNodes(small); */
/* toAndFromNodes(joe); */
/* checkToAndFromNodes(small); */
/* checkToAndFromNodes(joe); */

/* shew(full(allNonListPaths(joe))); */

//shew(full(allNonListPaths(joe)));
//shew(full(allPathsListsCollapsed(joe)));
//shew(full(justHashes(joe)));
//blurt(joe);

function keysAt(o, path) {
  if (isRecord(o)) {
    return keys(get(o, path));
  } else if (isList(o)) {
    return indices(get(o, path));
  } else {
    assert(false);
  }
}

function froot(o, path) {
  shew(full(keysAt(o, rdc(path))));
}

shew(full(allListEnded(joe)));
//map($$(froot, joe, _), allListEnded(joe));

function toRows(o) {
  return toRows1(o, []);
}

/* function toRows1(o, prefix) { */
/*   if (isScalar(o)) { */
/*     var s = {}; */
/*     s[prefix] = o; */
/*     return [s]; */
/*   } else if (isList(o)) { */
/*   } else if (isRecord(o)) { */
/*     var oo = {}; */
/*     for (k in o) { */
/*       var rows = toRows1(o[k], snoc(prefix, k)); */
/*     } */
/*   } else { */
/*     err(); */
/*   } */
/* } */

put(horizontalArraystable(gatherCoordsAndValues(joe)));
var ct = new CoordTable();
map(function(cav) {
    var value = rac(cav);
    var coords = rdc(cav);
    var rowCoords = rdc(coords);
    var columnCoords = grep(coords, notter(isNumber));

    ct.put(columnCoords.join('/'), rowCoords.join('/'), value);
  },
  gatherCoordsAndValues(joe));
put(ct.asHtml());
