/* Use the Twitch TV JSON API - Preliminary Things To Do: 
1. I can see whether Free Code Camp is currently streaming on Twitch.tv.
2. I can click the status output and be sent directly to the Free Code Camp's Twitch.tv channel.
3. If a Twitch user is currently streaming, I can see additional details about what they are streaming.
*/

$(document).ready(function() {
  var usersURL = "https://wind-bow.gomix.me/twitch-api/users/";
  var channelsURL = "https://wind-bow.gomix.me/twitch-api/channels/";
  var streamsURL = "https://wind-bow.gomix.me/twitch-api/streams/";

  getStream();
  function getStream() {
    var streams = ["freecodecamp", "medrybw", "ESL_SC2", "darbian", "nl_kripp", "reynad27", "zfg1", "Day9tv"];
    for (let i = 0; i < streams.length; i++) {
    $.getJSON(streamsURL + streams[i] + "?callback=?", function(json) {
      if (json.stream == null) {
        $.getJSON(channelsURL + streams[i] + "?callback=?", function(json2) {
          $(".offline").append('<tr><td class="column-1"><img src = "' + json2.logo + '"></td>' + '<td class="column-2"><a href = "' + json2.url + '">' + json2.name + '</a></td>' + '<td class="column-3">' + "Offline" + '</td>' + '<td class="column-4">' + json2.game + '</td></tr>');
        });
      }
      else {
        $(".online").append('<tr><td class="column-1"><img src = "' + json.stream.channel.logo + '"></td>' + '<td class="column-2"><a href = "' + json.stream.channel.url + '">' + json.stream.channel.name + '</a></td>' + '<td class="column-3">' + json.stream.channel.status + '</td>' + '<td class="column-4">' + json.stream.channel.game + '</td></tr>');
      }
    });
    }
  }
});
