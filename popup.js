
window.addEventListener('DOMContentLoaded', () => {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        // ...also specifying a callback to be called 
        //    from the receiving end (content script).
        setDOMInfo);
  });
});


const setDOMInfo = info => {
    let dateText = document.getElementById("date");
    dateText.textContent = info;
};

// function getLbcDate() {
//     let date =  JSON.parse(document.getElementById('__NEXT_DATA__').textContent).props.pageProps.ad.first_publication_date;
//     return date;
// }
