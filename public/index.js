window.onload = () => {
    loadIdols();
};

async function loadIdols() {

    const resp = await fetch("/idols");
    const idols = await resp.json();
    console.log(idols)
    let htmlStr = ``;
    for (const idol of idols) {
      htmlStr += `${idol.idol_name}`;
    }
    document.querySelector(".idols-list").innerHTML = htmlStr;

}




