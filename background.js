
function onError(error) {
  console.log(`Error: ${error}`);
}
function onSettingsObtained(item) {
    var a = JSON.stringify(item);
    console.log(`From extension, got ${a}`);

    var f = logURL(item.forwarding_server, item.forward.split(','), item.block.split(','));
    browser.webRequest.onBeforeRequest.addListener(
      f,
      {urls: ["<all_urls>"]},
      ["blocking"],
    );
}

var getting = browser.storage.sync.get(["block", "forward", "forwarding_server"]);
getting.then(onSettingsObtained, onError);

function logURL(forwarding_server, forward_list, block_list) {
    console.log(forwarding_server, forward_list, block_list);
    function _logURL(requestDetails) {
      console.log("inside", forwarding_server, forward_list, block_list);
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
    return _logURL
}
