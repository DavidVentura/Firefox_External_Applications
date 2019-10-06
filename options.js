function saveOptions(e) {
  e.preventDefault();
  const value = {
    block: document.querySelector("#block").value,
    forward: document.querySelector("#forward").value,
    forwarding_server: document.querySelector("#forwarding_server").value,
  };
  console.log(value);
  browser.storage.sync.set(value);
}

function restoreOptions() {

  function setCurrentChoice(result, id) {
    console.log(result);
    document.querySelector("#block").value = result.block || "rtmp://,.googlevideo.com/videoplayback";
    document.querySelector("#forward").value = result.forward || "rtmp://,https://www.youtube.com/watch?v";
    document.querySelector("#forwarding_server").value = result.forwarding_server || "http://localhost:12345";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.sync.get(["block", "forward", "forwarding_server"]);
  getting.then(setCurrentChoice, onError);

}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
