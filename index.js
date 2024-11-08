const wInp = document.getElementById("weatherInput");
const startBtn = document.querySelector("#start");//working
const stopBtn = document.querySelector("#stop");//working
const speakBtn = document.querySelector("#speak");//working
const makeSmall = document.getElementById("makeItSmall");
const wButton = document.getElementById("submit");
const weTemp = document.getElementsByClassName("temp");
const time = document.getElementById("time");

//Weather
// show waether   //this is the code for accurate whether whereever we go
function weather(location) {
  const weatherCont = document.querySelector(".temp").querySelectorAll("*");

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (this.status === 200) {
      let data = JSON.parse(this.responseText);
      weatherCont[1].textContent = `Location : ${data.name}`;
      weatherCont[2].textContent = `Country : ${data.sys.country}`;
      weatherCont[3].textContent = `Weather type : ${data.weather[0].main}`;
      weatherCont[4].textContent = `Weather description : ${data.weather[0].description}`;
      weatherCont[5].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherCont[6].textContent = `Original Temperature : ${ktc(
        data.main.temp
      )}`;
      weatherCont[7].textContent = `feels like ${ktc(data.main.feels_like)}`;
      weatherCont[8].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
      weatherCont[9].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
      weatherStatement = `sir the weather in ${data.name} is ${data.weather[0].description
        } and the temperature feels like ${ktc(data.main.feels_like)}`;
    } else {
      weatherCont[0].textContent = "Weather Info Not Found";
    }
  };

  xhr.send();
}

//kelvin to celcius
function ktc(k) {
  k = k - 273.15;
  return k.toFixed(2);
}

function setupTime() {
  setInterval(() => {
    let date = new Date();
    let hrs = String(date.getHours()).padStart(2, '0');
    let mins = String(date.getMinutes()).padStart(2, '0');
    let secs = String(date.getSeconds()).padStart(2, '0');
    time.textContent = `${hrs} : ${mins} : ${secs}`;
  }, 1000);
}


// //speech recognition setup        //working
// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition()
// //sr start   (start button works) //working
// recognition.onstart = function () {
//   // console.log("vr active");
//   recognition.start();
// }

if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
  alert("Speech Recognition is not supported in this browser.");
} else {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  // your code here


//sr result means response //it works in between start and stop  //working
recognition.onresult = function (event) {
  console.log(event);
  let baseTrans = event.resultIndex
  let transcript = event.results[baseTrans][0].transcript;
  transcript = transcript.toLowerCase();
  let userdata = localStorage.getItem("calista_setup");
  console.log(`my words:${transcript}`);

  if (transcript.includes("hay Caelista") || transcript.includes("hai Caelista") || transcript.includes("calista") || transcript.includes("gallista") || transcript.includes("hey cals") || transcript.includes("hey kels") || transcript.includes("hey girls")) {
    readOut("Hi sir what do you want");
    
  }
  
  if (transcript.includes("open youtube") || transcript.includes("open you tube") || transcript.includes("open u tube")) {
    window.open("https://www.youtube.com/");
    readOut("Youtube Opened");
    
  }
  if (transcript.includes("open google") || transcript.includes("I want google")) {
    window.open("https://www.google.com/")
    readOut("opening google sir");
    
  }
  if (transcript.includes("github") || transcript.includes("git hub") || transcript.includes("github")) {
    window.open("https://github.com/");
    readOut("opening github sir");
   
  }

  //google search
  if (transcript.includes("search for") || transcript.includes("find")) {
    readOut("here's the result sir")
    let input = transcript.split("");
    input.splice(0, 11);
    input.pop()
    input = input.join("").split(" ").join("+");
    console.log(input);
    window.open(`https://www.google.com/search?q=${input}`)
  }

  if (transcript.includes("open my telegram") || transcript.includes("open my tele gram") || transcript.includes("my telegram")) {
    
    window.open("https://web.telegram.org/k/")
    readOut("open your telegram sir")
  }
  if (transcript.includes("i am in depression") || transcript.includes("i am depressed")) {
    readOut("stay alone sir you might be recover,something that doesnot change by us so forgot about that be happy")
  }
  if (transcript.includes("calista take little nap") || (transcript.includes("take some nap"))) {
    readOut("sure taking nap sir");
  }
  if(transcript.includes("hello")||transcript.includes("hallo")){
    readOut("Hello sir What can I do");
  }
  if (transcript.includes("what are doing") || transcript.includes("what is your work")) {
    readOut("working an assistant for you mam")
  }
  if (transcript.includes("how old are you") || transcript.includes("what is your age") || transcript.includes("age details")) {
    readOut("i am sorry age details couldnot share with you")
  }
  if (transcript.includes("instagram web") || transcript.includes("open insta gram web") || transcript.includes("calista instagram web")) {
    readOut("opening instagram web sir")
    window.open("https://www.instagram.com/")
  }

}




//sr stop  (stop button works) //working
recognition.onend = function () {
  console.log("vr deactiate");
  recognition.start();
}

//It will make my start button for a long time  //working
recognition.continuous = true;


startBtn.addEventListener("click", () => {   //this code start recognizing voice when i click button
  recognition.start();
  alert("Starting...");
})
stopBtn.addEventListener("click", () => {    //this code stop recognizing voice when i click button
  recognition.stop();
  alert("Stoping...");
})

//how Calista speek (output) //working
function readOut(message) {
  const speech = new SpeechSynthesisUtterance()
  const allVoices = speechSynthesis.getVoices()
  speech.voice = allVoices[7];
  speech.text = message;
  speech.volume = 1;
  window.speechSynthesis.speak(speech)
}

// function readOut(message) {
//   const speech = new SpeechSynthesisUtterance();
  
//   window.speechSynthesis.onvoiceschanged = () => {
//     const allVoices = window.speechSynthesis.getVoices();
//     if (allVoices.length > 0) {
//       speech.voice = allVoices[7] || allVoices[0]; // Select a default if allVoices[7] is not available
//     }
//   };
  
//   speech.text = message;
//   speech.volume = 1;
//   window.speechSynthesis.speak(speech);
// }


wButton.addEventListener("click", () => {
  const showWeath = wInp.value;

  localStorage.setItem("Location", showWeath);
  const locStore = localStorage.getItem("Location");
  weather(locStore);
  localStorage.setItem("Location", showWeath);
  if (showWeath != "") {
    alert(`Show Weather at ${showWeath}`);
    weTemp[0].style.display = "block";
  }
  if (showWeath == "Hide Time") {
    alert("Time Hided");
    time.style.display = "none";
  }
  if (showWeath == "Show Time") {
    time.style.display = "block";
  }
})
if(window.onload){
 
}
const locStore = localStorage.getItem("Location");
window.addEventListener('load', () => {
  setupTime();
  readOut("   ");
 
  recognition.start();
  if(locStore!=='null'){
    weather(locStore);
    weTemp[0].style.display = 'block';
  }

  // alert("Welcome Sir");
});

makeSmall.addEventListener("click", () => {
  alert("You pressed Make Small");

})
}





