function shew(s)
{
  var e = document.createTextNode(s+"");
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
  var keyset = Object.keys(rows[0]);
  for (var i = 0; i < rows.length; ++i) {
    var row = rows[i];
    var tr = elem("tr");
    for (iii in keyset) {
      var key = keyset[iii];
      var value = row[key];
      var td = elem("td");
      td.appendChild(document.createTextNode(value + ""));
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table;
}

put(maketable([{a: 10, b: 20}, {a: 100, b: 200}]));
