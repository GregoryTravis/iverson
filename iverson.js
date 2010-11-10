function dupArguments(as) {
  var arr = new Array();
  for (var i = 0; i < as.length; ++i) {
    arr.push(as[i]);
  }
  return arr;
}

function tracefun(functionName) {
  var orig = top.window[functionName];
  top.window[functionName] = function () {
    shew("call " + dupArguments(arguments).join("+"));
    var ret = orig.apply(this, arguments);
    shew("ret " + ret);
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

function shew(s)
{
  var e = text(s);
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(e);
  body.appendChild(document.createElement("br"));
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
    td.style.background = "#eee";
    var value = arr[j];
    value = (value instanceof Node) ? value : text(value);
    td.appendChild(value);
    tr.appendChild(td);
  }
  return tr;
}

function tcol(array) {
  var table = elem("table");
  table.style.background = "#ccc";
  for (var i = 0; i < array.length; ++i) {
    var tr = elem("tr");
    var td = elem("td");
    td.style.background = "#eee";
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
  table.style.background = "#ccc";
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
    return [["."]];
  } else if (isList(o)) {
    var coords = new Array();

    for (var i = 0; i < o.length; ++i) {
      var v = o[i];
      coords = coords.concat(gatherCoords(v).map(function (coord) { return ["*"].concat(coord); }));
    }

    return coords;
  } else if (isRecord(o)) {
    var coords = new Array();

    for (k in o) {
      var v = o[k];
      coords = coords.concat(gatherCoords(v).map(function (coord) { return [k].concat(coord); }));
    }

    return coords;
  } else {
    return 455;
  }
}

//put(maketable([{a: 10, b: 20}, {a: 100, b: 200}]));
//put(maketable(jeter));
//put(dumtable([{a: 10, b: 20}, {a: 100, b: 200}]));
//put(dumtable(jeter));

/* put(dumtable(joe)); */
/* var pup = gatherCoords(joe); */
/* //shew(window["gatherCoords"]); */
put(dumtable(gatherCoords(joe)));
