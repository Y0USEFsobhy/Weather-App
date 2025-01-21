const card = document.getElementById("card");
let search = document.getElementById("search");

const APIKey = 'ac950caab1714e422cd24eb45be423ba';

search.addEventListener("click",()=>{
    let city = document.getElementById("cityInput").value;
    if (city != ""){
        card.style.height = "470px"
    }
    const mainImg = document.getElementById("mainImg"); 
    let temp = document.getElementById("temp"); 
    let desc = document.getElementById("desc"); 
    let Humidity = document.getElementById("Humidity"); 
    let wind = document.getElementById("wind");
    let details = document.getElementById("details"); 

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then((result)=>{
        return result.json();
    }).then((result)=>{
        if(result.cod === '404'){
            card.style.height = "470px"
            mainImg.src = "../images/404.png";
            mainImg.style.marginTop = "100px";
            details.style.display = "none";
            temp.style.display = "none";
            desc.textContent = "City not found";
            return
        }else{            
            mainImg.style.marginTop = "0px";
            temp.style.display = "block";
            desc.style.display = "block";
            details.style.display = "flex";
        }
        return result;
    }).then((result)=>{
        switch(result.weather[0].main){
            case "Clear":
                mainImg.src = "../images/clear.png";
                break;
            case "Clouds":
                mainImg.src = "../images/cloud.png";
                break;
            case "Rain":
                mainImg.src = "../images/rain.png";
                break;
            case "Snow":
                mainImg.src = "../images/snow.png";
                break;
            case "Haze":
                mainImg.src = "../images/mist.png";
                break;
            default:
                mainImg.src = ""
        };
        temp.innerHTML= `${parseInt(result.main.temp)}<sup>°c</sup>`
        desc.textContent =`${result.weather[0].description}`
        Humidity.textContent =`${result.main.humidity}%`
        wind.textContent =`${parseInt(result.wind.speed)}Kh/h`
    })
})




