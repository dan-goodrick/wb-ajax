import axios from "axios";
const dogUrl = "https://dog.ceo/api/breeds/image/random";

// PART 1: Show Dog Photo

function showDogPhoto(evt) {
  axios.get(dogUrl).then((promise) => {
    if (!document.getElementById("dog-image").children.length) {
      const img = document.createElement("img");
      img.src = promise.data.message;
      document.getElementById("dog-image").appendChild(img);
    } else {
      document.getElementById("dog-image").children[0].src =
        promise.data.message;
    }
  });
}

// async function showDogPhoto(evt) {
//   const promise = await axios.get(dogUrl)
//   if (!document.getElementById("dog-image").children.length) {
//     const img = document.createElement("img");
//     img.src = promise.data.message;
//     document.getElementById("dog-image").appendChild(img);
//   } else {
//     document.getElementById("dog-image").children[0].src = promise.data.message;
//   }
//   };
// async function showDogPhoto(evt) {
//   const response = await axios.get("https://dog.ceo/api/breeds/image/random");
//   const imgUrl = response.data.message;
//   document.querySelector("#dog-image").innerHTML = `<img src=${imgUrl}>`;
// }

document
  .querySelector("#get-dog-image")
  .addEventListener("click", showDogPhoto);

// PART 2: Show Weather

function showWeather(evt) {
  const zipcode = document.querySelector("#zipcode-field").value;
  const url = `/weather.txt?zipcode=${zipcode}`;
  axios.get(url).then((promise) => {
    document.querySelector("#weather-info").innerText = promise.data;
  });
}

document
  .querySelector("#weather-button")
  .addEventListener("click", showWeather);

// PART 3: Order Cookies

function orderCookies(evt) {
  evt.preventDefault();
  const qty = document.querySelector("#qty-field").value;
  console.log(qty);
  const cookieType = document.querySelector("#cookie-type-field").value;
  console.log(cookieType);
  axios.post("/order-cookies.json", { qty, cookieType }).then((promise) => {
    document.querySelector("#order-status").innerText = promise.data.message;

    console.log(promise.data.resultCode);
    if (promise.data.resultCode === "ERROR") {
      document.querySelector("#order-status").classList = "order-error";
    } else {
      document.querySelector("#order-status").classList = "";
    }
  });
}
document.querySelector("#order-form").addEventListener("submit", orderCookies);

// PART 4: iTunes Search

function iTunesSearch(evt) {
  evt.preventDefault();
  const searchTerm = document.querySelector("#search-term").value;
  // const url = `https://itunes.apple.com/search?term=${searchTerm.replace(' ', '+')}`
  const queryString = new URLSearchParams({ term: searchTerm }).toString();
  const url = `https://itunes.apple.com/search?${queryString}`;
  axios
    .get(url)
    .then((res) => {
      console.log(res.data);
      return res.data.results.forEach((element) => {
        const li = document.createElement("li");
        li.innerText = `Artist: ${element.artistName} Song: ${element.trackName}`;
        document.querySelector("#itunes-results").appendChild(li);
      });
    })
    .catch((err) => console.error(err));
  // `Artist: ${artistName} Song: ${trackName}`
}
document
  .querySelector("#itunes-search-form")
  .addEventListener("submit", iTunesSearch);
