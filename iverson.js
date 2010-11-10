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

function horizontalArraystable(arrays) {
  var table = elem("table");
  table.border = 1;
  for (var i = 0; i < arrays.length; ++i) {
    var tr = elem("tr");
    var row = arrays[i];
    for (var j = 0; j < row.length; ++j) {
      var td = elem("td");
      var value = row[j];
      value = (value instanceof Node) ? value : text(value);
      td.appendChild(value);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table;
}

function verticalArrayTable(array) {
  var table = elem("table");
  table.border = 1;
  for (var i = 0; i < array.length; ++i) {
    var tr = elem("tr");
    var td = elem("td");
    var value = array[i];
    value = (value instanceof Node) ? value : text(value);
    td.appendChild(value);
    tr.appendChild(td);
    table.appendChild(tr);
  }
  return table;
}

function dumtable(o) {
  if (isScalar(o)) {
    return "" + o;
  } else if (isList(o)) {
    var vals = values(o);
    vals = vals.map(function (value) { return dumtable(value); });
    return verticalArrayTable(vals);
  } else if (isRecord(o)) {
    var ks = keys(o);text
    var vals = values(o);
    vals = vals.map(function (value) { return dumtable(value); });
    return horizontalArraystable([ks, vals]);
  }
}

function isScalar(o) {
  return !(o instanceof Object) && !(o instanceof Array);
}

function isRecord(o) {
  return o instanceof Object && !(o instanceof Array);
}

function isList(o) {
  return o instanceof Array;
}

/* shew(3 instanceof Array); */
/* shew([3] instanceof Array); */
/* shew({a:3} instanceof Array); */
/* shew(3 instanceof Object); */
/* shew([3] instanceof Object); */
/* shew({a:3} instanceof Object); */

//put(maketable([{a: 10, b: 20}, {a: 100, b: 200}]));
//put(maketable(jeter));
put(dumtable([{a: 10, b: 20}, {a: 100, b: 200}]));
put(dumtable(jeter));
