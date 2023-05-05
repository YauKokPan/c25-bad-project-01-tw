window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const idolId = params.get("i");
  loadIdols(idolId);
};

async function loadIdols(id) {
  const resp = await fetch("/idols/" + id);
  const idols = await resp.json();
  console.log('response: ', idols)
  let htmlStr = ``;
  for (const idol of idols.data) {
    htmlStr += `
        ${idol.idol_name} - 
        ${idol.idol_info}
      `;
  }
  document.querySelector(".idol-info").innerHTML = htmlStr;
}
