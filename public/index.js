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
            <img src="./pictures/javidols-profile-pic/${idol.profile_pic}" width="150px" height="150px">
            </div>
            <div class="idol-name">
              <a href="./gallery.html?i=${idol.id}">${idol.idol_name}</a>
            </div>
          </div>
      `;
    }
    document.querySelector(".idols-list").innerHTML = htmlStr;

}




