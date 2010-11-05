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

put(maketable([{a: 10, b: 20}, {a: 100, b: 200}]));

put(maketable(
[
  { Age: "22", OPS: ".882", BB: "0", Lg: "AL", HBP: "0", Series: "ALDS", Year: "1996", RBI: "1", PA: "17", TB: "8", IBB: "0", SLG: ".471", Opp: "TEX", SH: "0", OBP: ".412", Rslt: "W", Tm: "NYY", B2: "1", HR: "0", CS: "0", H: "7", SF: "0", GDP: "0", BA: ".412", SO: "2", R: "2", SB: "0", G: "4", AB: "17", B3: "0" },
  { Age: "22", OPS: "1.042", BB: "0", Lg: "AL", HBP: "0", Series: "ALCS", Year: "1996", RBI: "1", PA: "24", TB: "15", IBB: "0", SLG: ".625", Opp: "BAL", SH: "0", OBP: ".417", Rslt: "W", Tm: "NYY", B2: "2", HR: "1", CS: "0", H: "10", SF: "0", GDP: "0", BA: ".417", SO: "5", R: "5", SB: "2", G: "5", AB: "24", B3: "0" },
  { Age: "22", OPS: ".650", BB: "4", Lg: "AL", HBP: "1", Series: "WS", Year: "1996", RBI: "1", PA: "26", TB: "5", IBB: "0", SLG: ".250", Opp: "ATL", SH: "1", OBP: ".400", Rslt: "W", Tm: "NYY", B2: "0", HR: "0", CS: "0", H: "5", SF: "0", GDP: "1", BA: ".250", SO: "6", R: "5", SB: "1", G: "6", AB: "20", B3: "0" },
  { Age: "23", OPS: "1.083", BB: "3", Lg: "AL", HBP: "0", Series: "ALDS", Year: "1997", RBI: "2", PA: "24", TB: "14", IBB: "0", SLG: ".667", Opp: "CLE", SH: "0", OBP: ".417", Rslt: "L", Tm: "NYY", B2: "1", HR: "2", CS: "0", H: "7", SF: "0", GDP: "0", BA: ".333", SO: "5", R: "6", SB: "1", G: "5", AB: "21", B3: "0" },
  { Age: "24", OPS: ".384", BB: "2", Lg: "AL", HBP: "0", Series: "ALDS", Year: "1998", RBI: "0", PA: "12", TB: "1", IBB: "0", SLG: ".111", Opp: "TEX", SH: "1", OBP: ".273", Rslt: "W", Tm: "NYY", B2: "0", HR: "0", CS: "0", H: "1", SF: "0", GDP: "0", BA: ".111", SO: "2", R: "0", SB: "0", G: "3", AB: "9", B3: "0" },
  { Age: "24", OPS: ".579", BB: "2", Lg: "AL", HBP: "0", Series: "ALCS", Year: "1998", RBI: "2", PA: "29", TB: "8", IBB: "0", SLG: ".320", Opp: "CLE", SH: "2", OBP: ".259", Rslt: "W", Tm: "NYY", B2: "1", HR: "0", CS: "0", H: "5", SF: "0", GDP: "1", BA: ".200", SO: "5", R: "3", SB: "3", G: "6", AB: "25", B3: "1" },
  { Age: "24", OPS: ".803", BB: "3", Lg: "AL", HBP: "0", Series: "WS", Year: "1998", RBI: "1", PA: "20", TB: "6", IBB: "0", SLG: ".353", Opp: "SDP", SH: "0", OBP: ".450", Rslt: "W", Tm: "NYY", B2: "0", HR: "0", CS: "0", H: "6", SF: "0", GDP: "1", BA: ".353", SO: "3", R: "4", SB: "0", G: "4", AB: "17", B3: "0" },
  { Age: "25", OPS: "1.266", BB: "2", Lg: "AL", HBP: "0", Series: "ALDS", Year: "1999", RBI: "0", PA: "13", TB: "8", IBB: "0", SLG: ".727", Opp: "TEX", SH: "0", OBP: ".538", Rslt: "W", Tm: "NYY", B2: "1", HR: "0", CS: "0", H: "5", SF: "0", GDP: "0", BA: ".455", SO: "3", R: "3", SB: "0", G: "3", AB: "11", B3: "1" },
  { Age: "25", OPS: ".959", BB: "2", Lg: "AL", HBP: "0", Series: "ALCS", Year: "1999", RBI: "3", PA: "22", TB: "11", IBB: "0", SLG: ".550", Opp: "BOS", SH: "0", OBP: ".409", Rslt: "W", Tm: "NYY", B2: "1", HR: "1", CS: "0", H: "7", SF: "0", GDP: "0", BA: ".350", SO: "3", R: "3", SB: "0", G: "5", AB: "20", B3: "0" },
  { Age: "25", OPS: ".801", BB: "1", Lg: "AL", HBP: "0", Series: "WS", Year: "1999", RBI: "1", PA: "18", TB: "7", IBB: "0", SLG: ".412", Opp: "ATL", SH: "0", OBP: ".389", Rslt: "W", Tm: "NYY", B2: "1", HR: "0", CS: "1", H: "6", SF: "0", GDP: "0", BA: ".353", SO: "3", R: "4", SB: "3", G: "4", AB: "17", B3: "0" },
  { Age: "26", OPS: ".529", BB: "2", Lg: "AL", HBP: "1", Series: "ALDS", Year: "2000", RBI: "2", PA: "22", TB: "4", IBB: "0", SLG: ".211", Opp: "OAK", SH: "0", OBP: ".318", Rslt: "W", Tm: "NYY", B2: "0", HR: "0", CS: "1", H: "4", SF: "0", GDP: "0", BA: ".211", SO: "3", R: "1", SB: "0", G: "5", AB: "19", B3: "0" },
  { Age: "26", OPS: "1.055", BB: "6", Lg: "AL", HBP: "0", Series: "ALCS", Year: "2000", RBI: "5", PA: "28", TB: "13", IBB: "0", SLG: ".591", Opp: "SEA", SH: "0", OBP: ".464", Rslt: "W", Tm: "NYY", B2: "0", HR: "2", CS: "0", H: "7", SF: "0", GDP: "0", BA: ".318", SO: "7", R: "6", SB: "1", G: "6", AB: "22", B3: "0" },
  { Age: "26", OPS: "1.344", BB: "3", Lg: "AL", HBP: "0", Series: "WS", Year: "2000", RBI: "2", PA: "25", TB: "19", IBB: "0", SLG: ".864", Opp: "NYM", SH: "0", OBP: ".480", Rslt: "W", Tm: "NYY", B2: "2", HR: "2", CS: "0", H: "9", SF: "0", GDP: "0", BA: ".409", SO: "8", R: "6", SB: "0", G: "5", AB: "22", B3: "1" },
  { Age: "27", OPS: ".976", BB: "1", Lg: "AL", HBP: "1", Series: "ALDS", Year: "2001", RBI: "1", PA: "21", TB: "9", IBB: "0", SLG: ".500", Opp: "OAK", SH: "0", OBP: ".476", Rslt: "W", Tm: "NYY", B2: "1", HR: "0", CS: "1", H: "8", SF: "1", GDP: "0", BA: ".444", SO: "0", R: "2", SB: "0", G: "5", AB: "18", B3: "0" },
  { Age: "27", OPS: ".318", BB: "2", Lg: "AL", HBP: "0", Series: "ALCS", Year: "2001", RBI: "2", PA: "21", TB: "2", IBB: "0", SLG: ".118", Opp: "SEA", SH: "1", OBP: ".200", Rslt: "W", Tm: "NYY", B2: "0", HR: "0", CS: "0", H: "2", SF: "1", GDP: "0", BA: ".118", SO: "2", R: "0", SB: "0", G: "5", AB: "17", B3: "0" },
  { Age: "27", OPS: ".438", BB: "0", Lg: "AL", HBP: "1", Series: "WS", Year: "2001", RBI: "1", PA: "28", TB: "7", IBB: "0", SLG: ".259", Opp: "ARI", SH: "0", OBP: ".179", Rslt: "L", Tm: "NYY", B2: "0", HR: "1", CS: "0", H: "4", SF: "0", GDP: "0", BA: ".148", SO: "6", R: "3", SB: "0", G: "7", AB: "27", B3: "0" },
  { Age: "28", OPS: "1.401", BB: "2", Lg: "AL", HBP: "0", Series: "ALDS", Year: "2002", RBI: "3", PA: "19", TB: "14", IBB: "0", SLG: ".875", Opp: "ANA", SH: "0", OBP: ".526", Rslt: "L", Tm: "NYY", B2: "0", HR: "2", CS: "0", H: "8", SF: "1", GDP: "0", BA: ".500", SO: "3", R: "6", SB: "0", G: "4", AB: "16", B3: "0" },
  { Age: "29", OPS: "1.198", BB: "4", Lg: "AL", HBP: "0", Series: "ALDS", Year: "2003", RBI: "1", PA: "18", TB: "9", IBB: "1", SLG: ".643", Opp: "MIN", SH: "0", OBP: ".556", Rslt: "W", Tm: "NYY", B2: "0", HR: "1", CS: "0", H: "6", SF: "0", GDP: "0", BA: ".429", SO: "2", R: "2", SB: "1", G: "4", AB: "14", B3: "0" },
  { Age: "29", OPS: ".681", BB: "2", Lg: "AL", HBP: "0", Series: "ALCS", Year: "2003", RBI: "2", PA: "32", TB: "12", IBB: "0", SLG: ".400", Opp: "BOS", SH: "0", OBP: ".281", Rslt: "W", Tm: "NYY", B2: "2", HR: "1", CS: "0", H: "7", SF: "0", GDP: "0", BA: ".233", SO: "4", R: "3", SB: "1", G: "7", AB: "30", B3: "0" },
  { Age: "29", OPS: ".854", BB: "1", Lg: "AL", HBP: "1", Series: "WS", Year: "2003", RBI: "2", PA: "28", TB: "12", IBB: "0", SLG: ".462", Opp: "FLA", SH: "0", OBP: ".393", Rslt: "L", Tm: "NYY", B2: "3", HR: "0", CS: "0", H: "9", SF: "0", GDP: "2", BA: ".346", SO: "7", R: "5", SB: "0", G: "6", AB: "26", B3: "0" },
  { Age: "30", OPS: ".876", BB: "1", Lg: "AL", HBP: "0", Series: "ALDS", Year: "2004", RBI: "4", PA: "21", TB: "10", IBB: "0", SLG: ".526", Opp: "MIN", SH: "1", OBP: ".350", Rslt: "W", Tm: "NYY", B2: "1", HR: "1", CS: "0", H: "6", SF: "0", GDP: "1", BA: ".316", SO: "4", R: "3", SB: "1", G: "4", AB: "19", B3: "0" },
  { Age: "30", OPS: ".567", BB: "6", Lg: "AL", HBP: "0", Series: "ALCS", Year: "2004", RBI: "5", PA: "38", TB: "7", IBB: "0", SLG: ".233", Opp: "BOS", SH: "2", OBP: ".333", Rslt: "L", Tm: "NYY", B2: "1", HR: "0", CS: "0", H: "6", SF: "0", GDP: "0", BA: ".200", SO: "2", R: "5", SB: "1", G: "7", AB: "30", B3: "0" },
  { Age: "31", OPS: ".967", BB: "1", Lg: "AL", HBP: "0", Series: "ALDS", Year: "2005", RBI: "5", PA: "23", TB: "13", IBB: "0", SLG: ".619", Opp: "LAA", SH: "0", OBP: ".348", Rslt: "L", Tm: "NYY", B2: "0", HR: "2", CS: "0", H: "7", SF: "1", GDP: "0", BA: ".333", SO: "5", R: "4", SB: "1", G: "5", AB: "21", B3: "0" },
  { Age: "32", OPS: "1.467", BB: "1", Lg: "AL", HBP: "0", Series: "ALDS", Year: "2006", RBI: "1", PA: "17", TB: "15", IBB: "0", SLG: ".938", Opp: "DET", SH: "0", OBP: ".529", Rslt: "L", Tm: "NYY", B2: "4", HR: "1", CS: "1", H: "8", SF: "0", GDP: "1", BA: ".500", SO: "2", R: "4", SB: "0", G: "4", AB: "16", B3: "0" },
  { Age: "33", OPS: ".353", BB: "0", Lg: "AL", HBP: "0", Series: "ALDS", Year: "2007", RBI: "1", PA: "17", TB: "3", IBB: "0", SLG: ".176", Opp: "CLE", SH: "0", OBP: ".176", Rslt: "L", Tm: "NYY", B2: "0", HR: "0", CS: "0", H: "3", SF: "0", GDP: "3", BA: ".176", SO: "4", R: "0", SB: "0", G: "4", AB: "17", B3: "0" },
  { Age: "35", OPS: "1.438", BB: "3", Lg: "AL", HBP: "0", Series: "ALDS", Year: "2009", RBI: "2", PA: "13", TB: "9", IBB: "1", SLG: ".900", Opp: "MIN", SH: "0", OBP: ".538", Rslt: "W", Tm: "NYY", B2: "2", HR: "1", CS: "0", H: "4", SF: "0", GDP: "0", BA: ".400", SO: "0", R: "4", SB: "0", G: "3", AB: "10", B3: "0" },
  { Age: "35", OPS: ".875", BB: "6", Lg: "AL", HBP: "0", Series: "ALCS", Year: "2009", RBI: "3", PA: "33", TB: "13", IBB: "1", SLG: ".481", Opp: "LAA", SH: "0", OBP: ".394", Rslt: "W", Tm: "NYY", B2: "0", HR: "2", CS: "1", H: "7", SF: "0", GDP: "1", BA: ".259", SO: "5", R: "5", SB: "0", G: "6", AB: "27", B3: "0" },
  { Age: "35", OPS: ".947", BB: "1", Lg: "AL", HBP: "0", Series: "WS", Year: "2009", RBI: "1", PA: "28", TB: "14", IBB: "0", SLG: ".519", Opp: "PHI", SH: "0", OBP: ".429", Rslt: "W", Tm: "NYY", B2: "3", HR: "0", CS: "0", H: "11", SF: "0", GDP: "1", BA: ".407", SO: "6", R: "5", SB: "0", G: "6", AB: "27", B3: "0" },
  { Age: "36", OPS: ".571", BB: "0", Lg: "AL", HBP: "0", Series: "ALDS", Year: "2010", RBI: "1", PA: "14", TB: "4", IBB: "0", SLG: ".286", Opp: "MIN", SH: "0", OBP: ".286", Rslt: "W", Tm: "NYY", B2: "0", HR: "0", CS: "0", H: "4", SF: "0", GDP: "0", BA: ".286", SO: "3", R: "0", SB: "1", G: "3", AB: "14", B3: "0" },
  { Age: "36", OPS: ".709", BB: "2", Lg: "AL", HBP: "0", Series: "ALCS", Year: "2010", RBI: "1", PA: "28", TB: "11", IBB: "0", SLG: ".423", Opp: "TEX", SH: "0", OBP: ".286", Rslt: "L", Tm: "NYY", B2: "3", HR: "0", CS: "0", H: "6", SF: "0", GDP: "1", BA: ".231", SO: "7", R: "2", SB: "0", G: "6", AB: "26", B3: "1" }
]
));
