// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var SpotifyWebApi = require("spotify-web-api-node");

export default (req, res) => {
  var clientId = process.env.SPOTIFY_CLIENT_ID,
    clientSecret = process.env.SPOTIFY_CLIENT_SECRET,
    refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  // Create the api object with the credentials
  var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken: refreshToken,
  });

  // Retrieve an access token.
  spotifyApi.refreshAccessToken().then(
    function (data) {
      console.log("The access token has been refreshed!");
      console.log(data.body["access_token"])
      spotifyApi.setAccessToken(data.body["access_token"]);
      spotifyApi.skipToNext().then(
        function () {
          console.log("Skipped to next");
          res.send('Next song we go!')
        },
        function (err) {
          //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
          console.log({ err })
          res.json({ err });
        }
      );
    },
    function (err) {
      console.log("Auth failed.");
      res.json({ err });
    }
  );
  
};
