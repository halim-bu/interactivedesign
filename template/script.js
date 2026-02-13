const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  //==============================================================
  //❓Create a new speech recognition
  //==============================================================
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";          // Set language to English
    recognition.continuous = true;       // Keep listening until stopped
    recognition.interimResults = true;   // Show partial results while speaking

  //==============================================================
  //❓Start recognition when "#startBtn" button is clicked
  //==============================================================
    document.querySelector("#startBtn").addEventListener("click", () => {
      recognition.start(); // Start listening
      document.querySelector("#startBtn").style.display = "none"; // Hide button after click
    });

  //==============================================================
  //✅ Define keywords and what happens when they are spoken
  //==============================================================
    const keywords = {
      "February 27": () => {
        document.querySelector("#mainText2").className = "variable1";
        document.querySelector("#image").src = "./img/morakana_cumulus.png";
        document.querySelector("#image").style.bottom = "30px";
        document.querySelector("#image").style.left = "30px";
        document.querySelector("#image").style.rotate = "20deg";
        document.body.style.backgroundColor = "red";
      },
      "4:30": () => {
        document.querySelector("#mainText2").className = "variable1";
        document.querySelector("#image").src = "./img/morakana_deeptalking.jpg";
        document.querySelector("#image").style.top = "30px";
        document.querySelector("#image").style.left = "30px";
        document.querySelector("#image").style.rotate = "20deg";
        document.body.style.backgroundColor = "#86f5ff";
      },
      "join us": () => {
        document.querySelector("#mainText2").className = "variable2";
        document.querySelector("#image").src = "";
        document.body.style.backgroundImage = "url('./img/tiri_oracle2.jpg')"; 
      },
    };

  //==============================================================
  //❓Process recognized speech results
  //==============================================================
    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      document.querySelector("#mainText2").textContent = transcript; // Show what user said
      const lowerTranscript = transcript.toLowerCase();
      for (const key in keywords) { 
        if (lowerTranscript.includes(key.toLowerCase())) { // Check if keyword is spoken
          document.querySelector("#mainText2").textContent = key; // Display the keyword
          keywords[key](); // Run the keyword action
          break; // Stop checking after first match
        }
      }
    };

  //==============================================================
  //❓Restart recognition automatically when it ends
  //==============================================================
    recognition.onend = () => {
      recognition.start();
    };

  //==============================================================
}
