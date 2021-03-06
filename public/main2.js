const $submit = $('#button');

const getCoronaResults = (callback) => {
  var countryIsoCode = $('#search').val();
  const urlToFetch = 'https://api.covid19api.com/country/' + countryIsoCode;
  //const wordQuery = $input.value;

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status == 404) {
        alert("You entered an incorrect ISO Code : " + countryIsoCode);
        //throw new Error(urlToFetch + ' replied 404');
      } else {
        var searchCountry = xhr.response[0].Country;
        var maxConfirmedCount = xhr.response[0].Confirmed;
        var maxConfirmedDate = xhr.response[0].Date;
        var maxDeathCount = xhr.response[0].Deaths;
        var maxDeathDate = xhr.response[0].Date;
        for (i = 1; i < xhr.response.length; i++) {
          var todaysConfirmedCount = xhr.response[i].Confirmed - xhr.response[i - 1].Confirmed;
          if (todaysConfirmedCount > maxConfirmedCount) {
            maxConfirmedCount = todaysConfirmedCount;
            maxConfirmedDate = xhr.response[i].Date;

          }
          var todaysDeathCount = xhr.response[i].Deaths - xhr.response[i - 1].Deaths;
          if (todaysDeathCount > maxDeathCount) {
            maxDeathCount = todaysDeathCount;
            maxDeathDate = xhr.response[i].Date;

          }
        }

        document.getElementById('responseField').innerHTML =
          ' <div> <label>Country:</label> <label>' + searchCountry + '</label></div> <br/> ' +
          ' <div> <label>Max Confirmed Count for single day:</label><label>' + maxConfirmedCount + '</label></div><br/> ' +
          ' <div> <label>Date:</label><label>' + maxConfirmedDate + '</label> </div><br/> ' +
          ' <div> <label>Max Death Count in a single Day :</label> <label>' + maxDeathCount + '</label> </div><br/>' +
          ' <div> <label>Date :</label><label>' + maxDeathDate + '</label> </div> </div><br/> ';

      }

    }
  }
  xhr.open('GET', urlToFetch);
  xhr.send();
}


const exit = async () => {
  console.log("invalid");
  document.getElementById('responseField').innerHTML = "";
}

// Clear previous results and display results to webpage
const displaySuggestions = (event) => {
  event.preventDefault()
  while (responseField.firstChild) {
    responseField.removeChild(responseField.firstChild)
  };
  getCoronaResults();
};

$submit.click(displaySuggestions);