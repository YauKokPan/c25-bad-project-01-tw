window.onload = () => {
  loadIdols();
};

async function loadIdols() {
  const resp = await fetch("/idols");
  const idols = await resp.json();
  let htmlStr = ``;
  for (const idol of idols) {
    htmlStr += `
        <div class="idol" id="idol-${idol.id}">
            <div class="profile-pic">
            <a href="./gallery.html?i=${idol.id}">
            <img src="./pictures/javidols-profile-pic/${idol.profile_pic}" class="image-scale">
            </a>
            
            </div>
            <div class="idol-name">
              <a href="./gallery.html?i=${idol.id}">${idol.idol_name}</a>
            </div>
          </div>
      `;
  }
  document.querySelector(".idols-list").innerHTML = htmlStr;
}
