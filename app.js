const darkMode = document.querySelector(".toggle-dark");
const modeIcon = document.getElementById('mode-icon');
const searchtab = document.getElementById('searchtab');
const searchForm = document.getElementsByClassName('searchForm')[0];
const modeName = document.getElementsByClassName('modeName')[0];
const closeSearchTab = document.getElementById('closeSearchTab');
const searchBtn = document.getElementById('searchBtn');
const GitHubDetails = document.getElementById('GitHub-details');
const userProfile = document.getElementsByClassName('user-profile')[0];
const userName = document.getElementById('userName');
const joinDate = document.getElementById('joinDate');
const userID = document.getElementById('userID');
const bio = document.getElementById('bio');
const reposCount = document.getElementById('reposCount');
const FollowersCount = document.getElementById('FollowersCount');
const FollowingCount = document.getElementById('FollowingCount');
const userlocation = document.getElementById('Userlocation');
const gitHubLink = document.getElementById('gitHubLink');
const twittericon = document.getElementById('twittericon');
const companyName = document.getElementById('companyName');
const errorPage = document.getElementsByClassName('404Error')[0];
const url = `https://api.github.com/users/`;

fetResponse("thepranaygupta");
async function fetResponse(userInput){
    let finalUrl = url + userInput;
    const response  = await fetch(finalUrl);
    const data = await response.json();
    console.log(data);
    if(checkValidity(data)){
        fillDeatils(data);
    }
}

function fillDeatils(data){
    console.log(data.created_at.split("T").shift().split("-"));

    GitHubDetails.classList.add("active");
    errorPage.classList.remove("active");
    console.log( data.avatar_url);
    userProfile.src = data.avatar_url;
    userName.textContent = checkData(data,"name");
    joinDate.textContent = `joined ${data.created_at.split("T").shift().split("-").join("/")}`
    userID.href = data?.html_url;
    userID.textContent = `@${data?.login}`;
    if(data?.bio){
        bio.textContent = data?.bio;
    }else{
        bio.textContent ="This profile has no bio";
    }
    reposCount.innerText = data.public_repos;
    FollowersCount.innerText = data.followers;
    FollowingCount.innerText = data.following;
    // updated_at
    userlocation.innerText = checkData(data,"location");
    gitHubLink.href = checkData(data,"blog");
    twittericon.href = `https://twitter.com/${checkData(data,"twitter_username")}`;
    companyName.innerText = checkData(data,"company");
   
}

function checkData(data,prop){
    console.log(data[prop]);
    if(!(data[prop])){
        if(prop == "name"){
            return data["login"];
        }
        if(prop == "blog"){
             gitHubLink.textContent = "Not Available";
        }
        if(prop == "twitter_username"){
            twittericon.textContent = "Not Available";
       }
        return "Not Available";
    }
     if(prop == "blog"){
        gitHubLink.textContent = data[prop];
     }
    if(prop == "twitter_username"){
        twittericon.textContent = data[prop];
    }
    return data[prop];
}
function checkValidity(data) {
    if(data.message === "Not Found"){
        GitHubDetails.classList.remove("active");
        errorPage.classList.add("active");
        return false;
    }
    return true;
}
searchForm.addEventListener('submit', function(eve){
    console.log("start searching");
    eve.preventDefault();
    if(searchtab.value === ""){
        return;
    }
    console.log("input is correct go for search");
    fetResponse(searchtab.value);
})

closeSearchTab.addEventListener('click', function(eve){
    eve.preventDefault();
    searchtab.value = "";
    closeSearchTab.classList.remove("active");
})

searchBtn.addEventListener('click', function(){
    if(searchtab.value === ""){
        return;
    }
    console.log("input is correct go for search");
    fetResponse(searchtab.value);
})

searchtab.addEventListener("input", function(){
    if(searchtab.value.length > 0){
        closeSearchTab.classList.add("active"); 
        console.log("length is greater than 1")
    }else{
        closeSearchTab.classList.remove("active"); 

    }
})


darkMode.addEventListener('click', function(eve){
    eve.preventDefault();
    document.documentElement.classList.toggle('dark');
    if(modeName.textContent == "Light"){
        modeName.textContent = "Dark";
        modeIcon.src = "./assets/moon-icon-9d3bd779.svg"
    }
    else{
        modeName.textContent = "Light"; 
        modeIcon.src = "./assets/sun-icon.svg"
    }
})





