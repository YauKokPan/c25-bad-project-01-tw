window.onload = () => {
    loadIdols();
};

async function loadIdols() {

    const resp = await fetch("/idols");
    const idols = await resp.json();
    let htmlStr = ``;
    for (const idol of idols) {
      htmlStr += `
        <div class="idol">
            <div class="profile-pic">
            <img src="./pictures/javidols-profile-pic/${idol.profile_pic}" width="150px" height="150px">
            </div>
            <div class="idol-name">
              <a href="#">${idol.idol_name}</a>
            </div>
          </div>
      `;
    }
    document.querySelector(".idols-list").innerHTML = htmlStr;

}




