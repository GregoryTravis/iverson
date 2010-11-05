function shew( s )
{
  var e = document.createTextNode( s+"" );
  var body = document.getElementsByTagName( "body" )[0];
  body.appendChild( e );
  body.appendChild( document.createElement( "br" ) );
}

window.onerror = function( a, b, c )
{
  try {
    var message =  "Exception: "+a+" "+b+" "+c;
    shew( message );
  } catch( e ) {
    var s = "";
    if (e["type"]) { s += e["type"]+"; "; }
    if (e["message"]) { s += e["message"]+"; "; }
    if (e["description"]) { s += e["description"]+"; "; }
    if (e["number"]) { s += e["number"]+"; "; }
    alert( s );
    throw e;
  }
  return true;
};

function include( file )
{
  file = "file:///Users/gmt/.../lib/" + file;
  if (__include.files[file]) {
    return;
  }
  __include.files[file] = 1;

  if (__include.alwaysReload) {
    file += "?s="+new Date().getTime();
  }

  var script = document.createElement( "script" );
  script.src = file;
  var head = document.getElementsByTagName( "head" )[0];
  head.appendChild( script );

  if (__include.verbose) {
    shew( "include "+file );
  }
}

shew(34);
