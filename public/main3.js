const $submit = $('#button');


const getCoronaResults = async () => {
  var countryIsoCode = $('#search').val();
  const urlToFetch = 'https://api.covid19api.com/country/' + countryIsoCode;  
  
  try{
      const response = await fetch(urlToFetch);
      if(response.ok)
      {
          const jsonResponse = await  response.json();
        var searchCountry = await jsonResponse[0].Country;
        var maxConfirmedCount = await jsonResponse[0].Confirmed;
        var maxConfirmedDate = await jsonResponse[0].Date;
        var maxDeathCount = await jsonResponse[0].Deaths;
        var maxDeathDate = await jsonResponse[0].Date;
        for (i = 1; i < jsonResponse.length; i++) {
          var todaysConfirmedCount = jsonResponse[i].Confirmed - jsonResponse[i - 1].Confirmed;
          if (todaysConfirmedCount > maxConfirmedCount) {
            maxConfirmedCount = todaysConfirmedCount;
            maxConfirmedDate = jsonResponse[i].Date;

          }
          var todaysDeathCount = jsonResponse[i].Deaths - jsonResponse[i - 1].Deaths;
          if (todaysDeathCount > maxDeathCount) {
            maxDeathCount = todaysDeathCount;
            maxDeathDate = jsonResponse[i].Date;

          }
        }

        document.getElementById('responseField').innerHTML =
          ' <div> <label>Country:</label> <label>' + searchCountry + '</label></div> <br/> ' +
          ' <div> <label>Max Confirmed Count for single day:</label><label>' + maxConfirmedCount + '</label></div><br/> ' +
          ' <div> <label>Date:</label><label>' + maxConfirmedDate + '</label> </div><br/> ' +
          ' <div> <label>Max Death Count in a single Day :</label> <label>' + maxDeathCount + '</label> </div><br/>' +
          ' <div> <label>Date :</label><label>' + maxDeathDate + '</label> </div> </div><br/> ';

      
      }
      else{
        alert("You entered an incorrect ISO Code : " + countryIsoCode);      
      }
  }
  catch(error) {

    alert("You entered an incorrect ISO Code : " + countryIsoCode);
}
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