const $input = $('#search');
const $submit = $('#button');

const getSuggestions = (callback) => {
    var countryIsoCode = $('#search').val();
const urlToFetch = 'https://api.covid19api.com/country/'+countryIsoCode;
//const wordQuery = $input.value;

const xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        var searchCountry = xhr.response[0].Country;
        var maxConfirmedCount = xhr.response[0].Confirmed;
        var maxConfirmedDate = xhr.response[0].Date;
        var maxDeathCount = xhr.response[0].Deaths;
        var maxDeathDate = xhr.response[0].Date;
         for (i=1; i< xhr.response.length; i++) {
            var todaysConfirmedCount = xhr.response[i].Confirmed - xhr.response[i-1].Confirmed; 
            if (todaysConfirmedCount > maxConfirmedCount ) {
              maxConfirmedCount = todaysConfirmedCount;
              maxConfirmedDate = xhr.response[i].Date;

            }
            var todaysDeathCount = xhr.response[i].Deaths - xhr.response[i-1].Deaths; 
            if (todaysDeathCount > maxDeathCount ) {
              maxDeathCount = todaysDeathCount;
              maxDeathDate = xhr.response[i].Date;

            }
        }

      document.getElementById('responseField').innerHTML = 'Country :'  + searchCountry + ' Max Confirmed Count for single day:'  +maxConfirmedCount +  'Date:'   + maxConfirmedDate +
         'Max Death Count in a single Day : ' + maxDeathCount + '\n Day : ' + maxDeathDate;
      //alert('Country: ' + searchCountry +' \nMax Confirmed Count for single day : ' +maxConfirmedCount + '\n Date : ' + maxConfirmedDate);
  }
  }
xhr.open('GET', urlToFetch);
xhr.send();
}

// Clear previous results and display results to webpage
const displaySuggestions = (event) => {
  event.preventDefault()
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild)
  };
  getSuggestions();
};

$submit.click(displaySuggestions);
