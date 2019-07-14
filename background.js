var block_list = ['.googlevideo.com/videoplayback'];
var forward_list = ['https://www.youtube.com/watch?v'];
var forwarding_server = 'http://localhost:12345';

function logURL(requestDetails) {
  if(requestDetails.url.startsWith(forwarding_server))
      return;

  if (forward_list.some(f => requestDetails.url.includes(f))) {
    fetch(`${forwarding_server}/?${requestDetails.url}`);
  }

  if (block_list.some(b => requestDetails.url.includes(b))) {
      console.log("Blocking" + requestDetails.url);
      return {cancel: true};
  }
}

browser.webRequest.onBeforeRequest.addListener(
  logURL,
  {urls: ["<all_urls>"]},
  ["blocking"],
);
