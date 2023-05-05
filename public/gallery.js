window.onload = () => {
    loadIdols();
};

async function loadIdols() {

    const resp = await fetch("/idols");
    const idols = await resp.json();
    let htmlStr = ``;
    for (const idol of idols) {
      htmlStr += `
        ${idol.idol_info}
      `;
    }
    document.querySelector(".idol-info").innerHTML = htmlStr;

}