const form = document.querySelector(".form");
const response = document.querySelector(".response");
const search = document.querySelector("#search");
const searchValue = search.value;

let dataBase = [];

const renderVideoDownload = () => {
  response.textContent = ""
  dataBase.forEach((item) => {
    let itemDiv = document.createElement("div");
    let p = document.createElement("p");
    let a = document.createElement("a");

    itemDiv.className = "item";

    a.target = "_blank";
    a.href = item.url;

    p.textContent = `#${item.itag}`;
    a.textContent = item.url.substring(0, 41);

    itemDiv.append(p);
    itemDiv.append(a);

    response.append(itemDiv);
  });
};

const renderFindVideo = (videoId) => {
  fetch(
    `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${videoId}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "45403fd483msh100ec015dc8b2a5p16c693jsna139cd4c1789",
        "X-RapidAPI-Host": "ytstream-download-youtube-videos.p.rapidapi.com",
      },
    }
  )
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return Promise.reject(res);
    })
    .then((data) => ((dataBase = [...data.formats]), renderVideoDownload()))
    .catch((err) => (
      response.textContent = "Link kiritishda xatolik bor!"
    ));
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const videoID = search.value.split("https://www.youtube.com/watch?v=")[1];
  renderFindVideo(videoID);
});
