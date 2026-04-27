chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'lbcdate') {
        addDate();
    } else if (request.from === 'popup' && request.subject === 'DOMInfo') {
        getPostOriginalDate().then(sendResponse);
        return true;
    }
});

async function getPostOriginalDate() {
    let url = window.location.href;
    const postId = url.split("/").pop().split('.')[0];
    
    if (!postId) {
        return;
    }
    
    let apiData = await getApiData(postId)

    let stringDate = JSON.parse(apiData).first_publication_date;
    return new Date(Date.parse(stringDate)).toLocaleDateString();
}

function getApiData(postId) {
    return new Promise(function (resolve, reject) {
        const apiUrl = 'https://api.leboncoin.fr/finder/classified/' + postId;
        console.log('LBC Date : calling API URL : ' + apiUrl);
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            resolve(this.responseText)
        }
        xhttp.open("GET", apiUrl, true);
        xhttp.send();
    });
}

async function addDate() {
    console.log('LBC Date : Trying to add original post date to the page');
    let date = await getPostOriginalDate()

    const el = document.querySelector('[data-qa-id="adview_spotlight_description_container"]')

    if (el !== null) {
        var originalDateBlock = document.createElement('p');
        originalDateBlock.textContent = 'Date d\'origine de l\'annonce : ' + date;
        el.appendChild(originalDateBlock);
        console.log('LBC Date : Original date ' + date + ' successfully added to the page');
    }
}

addDate();
