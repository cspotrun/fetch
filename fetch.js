// Checks for a `fetch` statement. If found, it builds a parser using the
// requested grammar, then, using that parser, parses the rest of the source
// file.


{

  fetchTheRepo = function (user, repo, rest) {
    var contents_uri = "https:/api.github.com/repos/"+ user +"/"+
        repo + "/contents/"+ repo +".pegjs",
        parser = {};

    $.get(contents_uri, function(r) {
        parser = PEG.buildParser(atob(r.content));
        parser.parse(rest);
      });
  };

}

program = fs:fetch_stmt wsnl r:$rest { fetchTheRepo(fs.location.user, fs.location.repo, r); }

fetch_stmt = 'fetch' ws repo:fetch_repo nl { return {name: 'fetch', location: repo}; }

fetch_repo = user:$id '/' repo:$id { return {user: user, repo: repo}; }

id = [-a-zA-Z]+

wsnl = (ws/nl)

ws = [ \t]*

nl = [\n\r]*

rest = $.*
