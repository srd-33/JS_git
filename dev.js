const url = "https://api.github.com/users/";

const root = document.documentElement.style;

const get = (param) => document.getElementById(`${param}`)

const input = get("input")
const noresults = get("no-results");

const btnsubmit = get("submit");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const btnmode = get("btn-mode")
let dark = false;
const modetext = get("modetext");
const modeicon = get("modeicon");

input.addEventListener("keydown",(e)=>{

    if(e.key == "Enter"){
        if(input.value!== ""){
            getUserData(url + input.value);
        }
    }
},
false

)

input.addEventListener("input",()=>{
    noresults.style.display= "none";
})

btnmode.addEventListener("click",()=>{

    if(dark == false){
        darkModeProperties();
    }else{
        lightModeProperties();
    }
});

function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modetext.innerText = "LIGHT";
    modeicon.src = "./assets/images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    dark = true;
    localStorage.setItem("dark-mode", true);
  }
  function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modetext.innerText = "DARK";
    modeicon.src = "./assets/images/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    dark = false;
    localStorage.setItem("dark-mode", false);
  }

  btnsubmit.addEventListener("click",()=>{
    if(input.value!== ""){
        getUserData(url + input.value);
    }
  })

  function getUserData(url){

    fetch(url)
        .then((response) => response.json())
        .then ((data) =>{
            updateProfile(data);
        })
        .catch((error) => {
            throw error;
          });
  }

  const avatar = get("avatar")
  const username = get("name");
  const user = get("user")
  const date = get("date");
  const bio = get("desc2");
  const repo = get("repo_no")
  const followers = get("followers")
  const following = get("following")
  const place = get("place")
  const resume =get("resume")
  const twitter =get("twitter")
  const company =get("keyinsight")


  function updateProfile(data){

    if(data.message !== "Not Found"){
        noresults.style.display= "none";

        function checkNull(param1, param2) {
            if (param1 === "" || param1 === null) {
              param2.style.opacity = 0.5;
              param2.previousElementSibling.style.opacity = 0.5;
              return false;
            } else {
              return true;
            }
          }

//         param1: The data value to check (e.g., location, blog, Twitter username, etc.).

//         param2: The DOM element where this data is to be displayed.



          avatar.src = `${data.avatar_url}`;
          username.innerText = data.name === null ? data.login :data.name;
          user.innerText = `@${data.login}`;
          user.href = `${data.html_url}`;
          datesegments = data.created_at.split("T").shift().split("-");
          bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
          repo.innerText = `${data.public_repos}`;
          followers.innerText = `${data.followers}`;
          following.innerText = `${data.following}`;
          place.innerText = checkNull(data.location, place) ? data.location : "Not Available";
          resume.href = checkNull(data.blog, resume) ? data.blog : "#";
          twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
          twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
          company.innerText = checkNull(data.company, company) ? data.company : "Not Available";


  }
  else{

    noresults.style.display = "block";
  }

  }

const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

if (localStorage.getItem("dark-mode")) {
  dark = localStorage.getItem("dark-mode");
  darkModeProperties();
} else {
  localStorage.setItem("dark-mode", prefersDarkMode);
  dark = prefersDarkMode;
  lightModeProperties();
}



  getUserData(url + "srd-33");



