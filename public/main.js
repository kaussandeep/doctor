const $input = $('#search');
const $submit = $('#button');

const getStats = () => {
    
    const urlToFetch = 'https://api.openweathermap.org/data/2.5/weather';
  /*  try {
      const response = await fetch(urlToFetch);
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(JSON.stringify(jsonResponse));
        
        return jsonResponse;
      }
    } catch (error) {
        alert("Not working"); 
      console.log(error);
    }*/
try {
  $.ajax({
    type: "GET",
    async: false,
    url: urlToFetch,
  //  data: "password="+password,
    success: function(response) {
      alert(response);
    }
});

    }
    catch (error) {
        alert(error);
    }
  
  }



  $submit.click(getStats);
  