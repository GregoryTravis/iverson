function err(s) {
  shew("ERROR: " + s);
  throw s;
}

function assert(b) {
  if (!b) {
    err("assertion failure");
  }
}

function valuemap(f, m) {
  var ret = new Object();
  for (k in m) {
    ret[k] = f(m[k]);
  }
  return ret;
}

function isNumber (o) {
  return !isNaN(o-0);
}

function dup(o) {
  var oo = new Object();
  for (k in o) {
    oo[k] = o[k];
  }
  return oo;
}

function concat() {
  var arr = new Array();
  for (var i = 0; i < arguments.length; ++i) {
    arr = arr.concat(arguments[i]);
  }
  return arr;
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
    for (k in o) {
      app[k] = o;
    }
  }
  return o;
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
    shew(traceIndent() + "  " + functionName + "(" + dupArguments(arguments).join(", ") + ")");
    var ret = orig.apply(this, arguments);
    shew(traceIndent() + "> " + ret + " " + typeof(ret));
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
  for (key in canonicalRow) {
    var th = elem("th");
    th.appendChild(document.createTextNode(key + ""));
    tr.appendChild(th);
  }
  table.appendChild(tr);

  for (var i = 0; i < rows.length; ++i) {
    var row = rows[i];
    var tr = elem("tr");
    for (key in canonicalRow) {
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
  for (k in o) {
    arr[inx++] = k;
  }
  return arr;
}

function values(o) {
  var arr = new Array();
  var inx = 0;
  for (k in o) {
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
    return 455;
  }
}

//tracefuns("tcol", "horizontalArraystable", "dumtable");

function isScalar(o) {
  return !(o instanceof Object) && !(o instanceof Array);
}

function isRecord(o) {
  return o instanceof Object && !(o instanceof Array);
}

function isList(o) {
  return o instanceof Array;
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
    return 455;
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
    return 455;
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
    return 455;
  }
}

function getListPaths(o) {
  return getListPaths1(o, []);
}

function getListPaths1(o, prefix) {
  if (isScalar(o)) {
    return [];
  } else if (isList(o)) {
    return [prefix].concat(getListPaths1(o[0], prefix));
  } else if (isRecord(o)) {
    return concat.apply(this,
      keys(o).map(function (k) {
          return getListPaths1(o[k], prefix.concat([k]));
        }));
  } else {
    return 455;
  }
}

//tracefuns("gatherCoords");

//put(maketable([{a: 10, b: 20}, {a: 100, b: 200}]));
//put(maketable(jeter));
//put(dumtable([{a: 10, b: 20}, {a: 100, b: 200}]));
//put(dumtable(jeter));

/* put(dumtable(joe)); */
/* put(horizontalArraystable(removeDuplicates(gatherCoords(joe)))); */
/* put(horizontalArraystable(gatherCoordsAndValues(joe))); */
/* put(horizontalArraystable(gatherCoordsAndValues(joe))); */
//put(horizontalArraystable(splitAxesAndValue(gatherCoordsAndValues(joe))));
//put(mapListAxesTable(joe).asHtml());
put(dumtable(extractHierarchy(joe)));
put(dumtable(getListPaths(joe)));
