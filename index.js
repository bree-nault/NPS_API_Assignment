'use strict';

// creates and returns a new string by concatenating all of the elements in an array
function formatParams(params) {
	    const queryItems = Object.keys(params).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);
	    return queryItems.join('&');
	}

//
function displayResults(responseJson, maxResults) {
    console.log(responseJson);
    

    $('.resultsList').empty();
  
    for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {
        $('.resultsList').append(`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
        <p>${responseJson.data[i].description}</p>
        </li>`);
    }
    $('.resultsContainer').removeClass('hidden');
    $('.loadRow').hide(); 
}

function getParks(baseUrl, stateArr, maxResults, apiKey) {
   
    const params = {
        stateCode: stateArr,
        limit: maxResults
    }
   
    const queryString = formatParams(params);
    const url = baseUrl + '?' + queryString + '&api_key=' + apiKey;
    console.log(url);
   
    
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(error => alert('Something went wrong. Try again later.'));
    };

//listens for click
function watchForm() {
    $('.jsForm').on('submit', function() {
        event.preventDefault();
        const baseUrl = 'https://api.nps.gov/api/v1/parks'
        const stateArr = $('.stateEntered').val().split(",");
        const maxResults = $('.maxResults').val();
        
        const apiKey = '34zTWdFWdxxmgSMYHd8gjJmq2XU5iemBkMh73vNu'

        console.log('You searched for ' + stateArr + ' and '+ maxResults + ' results.');
        $('.loadRow').show();
       getParks(baseUrl, stateArr, maxResults, apiKey);

    })
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});