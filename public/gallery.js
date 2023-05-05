window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const idolId = params.get("i");
  loadIdols(idolId);
};

async function loadIdols(id) {
  const resp = await fetch("/idols/" + id);
  const idols = await resp.json();
  console.log('response: ', idols)
  let idolnameStr = ``;
  for (const idol of idols.data) {
    idolnameStr += `
        ${idol.idol_name}
      `;
  }
  document.querySelector(".idol-name").innerHTML = idolnameStr;

  let idolinfoStr = ``;
  for (const idol of idols.data) {
    const sentence = idol.idol_info
    const lines = sentence.split(" ");

    const birth = lines[1]
    const size = lines[3] + " " + lines[5] + " " + lines[7];
    const cup = lines[9];
    const debut = lines[12];
    const zodiac = lines[14];
    const bloodType = lines[16];
    const height = lines[18];
    const nationality = lines[20];
    
    idolinfoStr += `
      <p>
      名字: ${idol.idol_name}<br>
      出生: ${birth}<br>
      三圍: ${size}<br>
      罩杯:${cup}<br>
      出道日期:${debut}<br>
      星座: ${zodiac}<br>
      血型: ${bloodType}<br>
      身高: ${height}<br>
      國籍: ${nationality}
      <p>     
    `
  }
  document.querySelector(".idol-info").innerHTML = idolinfoStr;
}
