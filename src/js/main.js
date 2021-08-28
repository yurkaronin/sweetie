// табы популярных товаров на главной странице
const tabsBtn = document.querySelectorAll(".tabs-list__item");
const tabsItems = document.querySelectorAll(".card-list__group");

tabsBtn.forEach(onTabClick);

function onTabClick(item) {
  item.addEventListener("click", function () {
    let currentBtn = item;
    let tabId = currentBtn.getAttribute("data-tab");
    let currentTab = document.querySelector(tabId);

    if (!currentBtn.classList.contains('active')) {
      tabsBtn.forEach(function (item) {
        item.classList.remove('active');
      });

      tabsItems.forEach(function (item) {
        item.classList.remove('active');
      });

      currentBtn.classList.add('active');
      currentTab.classList.add('active');
    }
  });
}

document.querySelector('.tabs-list__item').click();

// Слайдер производители конфет
var swiper = new Swiper(".mySwiper", {
  /* slidesPerView: 5,
  spaceBetween: 80, */
  autoHeight: true,
  loop: true,
  /* autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  }, */
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 40
    },
    400: {
      slidesPerView: 3,
      spaceBetween: 40
    },
    // when window width is >= 480px
    600: {
      slidesPerView: 4,
      spaceBetween: 80
    },
    // when window width is >= 640px
    950: {
      slidesPerView: 5,
      spaceBetween: 80
    }
  }
});

// Слайдер Примеры работ и выигранных дел
var swiper = new Swiper(".mySwiper-2", {
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoHeight: true,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    // when window width is >= 320px
    250: {
      slidesPerView: 1,
      spaceBetween: 0
    },
    // when window width is >= 480px
    600: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    // when window width is >= 640px
    900: {
      slidesPerView: 3,
      spaceBetween: 55
    }
  }
});
// Слайдер Видео с ютуба
var swiper = new Swiper(".mySwiper-3", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
  breakpoints: {
    // when window width is >= 480px
    210: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    900: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // when window width is >= 640px
    1350: {
      slidesPerView: 2,
      spaceBetween: 45,
    }
  }
});
// Отзывы о нас
var swiper = new Swiper(".mySwiper-4", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoHeight: true,
  loop: true,
  /* autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  }, */
  breakpoints: {
    // when window width is >= 480px
    210: {
      slidesPerView: 1,
      spaceBetween: 0
    },
    // when window width is >= 640px
    970: {
      slidesPerView: 2,
      spaceBetween: 70,
    }
  }
});

var swiper = new Swiper(".mySwiper-5", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    autoHeight: true,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  },
  breakpoints: {
    // when window width is >= 480px
    210: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    900: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    // when window width is >= 640px
    1350: {
      slidesPerView: 5,
      spaceBetween: 45,
    }
  }
});

// вставка видео с ютуба
function findVideos() {
  let e = document.querySelectorAll(".video-block")
  for (let t = 0; t < e.length; t++) setupVideo(e[t])
}
function setupVideo(e) {
  let t = e.querySelector(".video-block__link"),
    r = e.querySelector(".video-block__media"),
    i = e.querySelector(".video-block__button"),
    o = parseMediaURL(r)
  e.addEventListener("click", () => {
    let r = createIframe(o)
    t.remove(), i.remove(), e.appendChild(r)
  }),
    t.removeAttribute("href"),
    e.classList.add("video-block--enabled")
}
function parseMediaURL(e) {
  return e.src.match(
    /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i
  )[1]
}
function createIframe(e) {
  let t = document.createElement("iframe")
  return (
    t.setAttribute("allowfullscreen", ""),
    t.setAttribute("allow", "autoplay"),
    t.setAttribute("src", generateURL(e)),
    t.classList.add("video-block__media"),
    t
  )
}
function generateURL(e) {
  return "https://www.youtube.com/embed/" + e + "?rel=0&showinfo=0&autoplay=1"
}
findVideos();

