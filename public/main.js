
const $submit = $('#button');

$("#button").click(function () {
  var countryIsoCode = $('#search').val();
  const urlToFetch = 'https://api.covid19api.com/country/' + countryIsoCode;
  $.ajax({
    type: 'GET',
    async: false,
    url: urlToFetch,
    dataType: 'json',
    success: function (response) {
      var searchCountry = response[0].Country;
      var maxConfirmedCount = response[0].Confirmed;
      var maxConfirmedDate = response[0].Date;
      var maxDeathCount = response[0].Deaths;
      var maxDeathDate = response[0].Date;
      for (i = 1; i < response.length; i++) {
        var todaysConfirmedCount = response[i].Confirmed - response[i - 1].Confirmed;
        if (todaysConfirmedCount > maxConfirmedCount) {
          maxConfirmedCount = todaysConfirmedCount;
          maxConfirmedDate = response[i].Date;

        }
        var todaysDeathCount = response[i].Deaths - response[i - 1].Deaths;
        if (todaysDeathCount > maxDeathCount) {
          maxDeathCount = todaysDeathCount;
          maxDeathDate = response[i].Date;

        }
      }

      //    $("#confirmedCases").update(confirmedCases);
      //  $("#confirmedDeaths").update(confirmedCases);

      document.getElementById('responseField').innerHTML = 'Country :' + searchCountry + ' Max Confirmed Count for single day:' + maxConfirmedCount + 'Date:' + maxConfirmedDate;
      return maxConfirmedCount;
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("Incorrect ISO code entered: " + textStatus);
      alert("Error is :  " + errorThrown);
    }

  });


});