var mediaRecorder = null;

function showAlert(message) {
    alert(message)
}

function stop() {
  console.log("stop clicked");
  mediaRecorder.stop();
}

function record() {
  const constraints = { audio: true };
  let chunks = [];

  let onSuccess = function(stream) {
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/wav' });

    mediaRecorder.start();

    mediaRecorder.onstop = function(e) {
      const clipName = prompt('Enter a name for your sound clip?','My unnamed clip');

      const clipContainer = document.createElement('article');
      const clipLabel = document.createElement('p');
      const audio = document.createElement('audio');
      const deleteButton = document.createElement('button');

      clipContainer.classList.add('clip');
      audio.setAttribute('controls', '');

      if(clipName === null) {
        clipLabel.textContent = 'My unnamed clip';
      } else {
        clipLabel.textContent = clipName;
      }

      clipContainer.appendChild(audio);
      clipContainer.appendChild(clipLabel);
      clipContainer.appendChild(deleteButton);

      audio.controls = true;
      const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
      chunks = [];
      const audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;
    }
    
    mediaRecorder.ondataavailable = function(e) {
      console.log("mediaRecorder ondataavailable")
      chunks.push(e.data);
    }

    mediaRecorder.onstart = function(event) {
      console.log("mediaRecorder onstart");
      console.log(event)
    }

    mediaRecorder.onstop = function(event) {
      console.log("mediaRecorder onstop");
      console.log("chunks.length");
      console.log(chunks.length);
      console.log(event)
    }
  }

  let onError = function(err) {
    console.log('The following error occured: ' + err);
  }

  navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
}