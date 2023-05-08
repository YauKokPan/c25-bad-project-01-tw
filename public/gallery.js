window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const idolId = params.get("i");
  loadIdols(idolId);
  loadGallery(idolId);
};

async function loadIdols(id) {
  const resp = await fetch("/idols/" + id);
  const idols = await resp.json();
  console.log("response: ", idols);
  let idolnameStr = ``;
  for (const idol of idols.data) {
    idolnameStr += `
        ${idol.idol_name}
      `;
  }
  document.querySelector(".idol-name").innerHTML = idolnameStr;

  let idolinfoStr = ``;
  for (const idol of idols.data) {
    const sentence = idol.idol_info;
    const lines = sentence.split(" ");

    const birth = lines[1];
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
    `;
  }
  document.querySelector(".idol-info").innerHTML = idolinfoStr;
}

async function loadGallery(id) {
  const resp = await fetch("/gallery/" + id);
  const idols = await resp.json();
  console.log("response: ", idols);
  let idolgalleryStr = ``;
  for (const idol of idols.data) {
    idolgalleryStr += /*html*/ `
      <div class="col-3">
        <a data-fancybox="gallery" data-src="./pictures/javidol-gallery/${idol.idol_name}/${idol.idol_image}">
        <img src="./pictures/javidol-gallery/${idol.idol_name}/${idol.idol_image}" class="idol-image img-fluid">
        </a>
      </div>
      `;
  }

  document.querySelector(".idol-gallery").innerHTML = idolgalleryStr;

  let displayedImages = 4;
  const totalImages = $(".idol-image").length;

  function updateGallery() {
    $(".idol-image").hide();
    $(".idol-image").slice(0, displayedImages).fadeIn();

    if (displayedImages >= totalImages) {
      $("#show-more-btn").hide();
    } else {
      $("#show-more-btn").show();
    }

    if (displayedImages <= 4) {
      $("#show-less-btn").hide();
    } else {
      $("#show-less-btn").show();
    }
  }

  $(document).ready(function () {
    console.log("Document ready!");
    updateGallery();

    $("#show-more-btn").click(function () {
      displayedImages += 8;
      updateGallery();
    });

    $("#show-less-btn").click(function () {
      if (displayedImages < totalImages) {
        displayedImages -= 8;
      } else {
        displayedImages = 4;
      }

      updateGallery();
    });
  });

  // $(document).ready(function () {
  //   $(".idol-image").slice(0, displayedImages).fadeIn();
  //   $(".load-more").click(function(){
  //     $(".idol-image").slice(0, totalImages).fadeIn();
  //   })
  // });

  // fancybox
  Fancybox.bind('[data-fancybox="gallery"]', {
    compact: false,
    idle: false,

    animated: false,
    showClass: false,
    hideClass: false,

    dragToClose: false,

    Images: {
      // Disable animation from/to thumbnail on start/close
      zoom: false,
    },

    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ["close"],
      },
    },

    Thumbs: {
      type: "classic",
      Carousel: {
        center: function () {
          return this.contentDim > this.viewportDim;
        },
      },
    },
  });
}
