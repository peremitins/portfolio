//preloader
window.addEventListener('load', () => {
  document.querySelector('.preloader').classList.add('opacity');
  setTimeout(function () {
    document.querySelector('.preloader').style.display = 'none';
  }, 1000)
})

//colorTheme
const body = document.body;
const main = document.querySelector('.main')
const themeBtn = document.querySelector('.color')
const themeBtnIcon = document.querySelector('.color i')
const themeRed = document.querySelector('.theme-red')
const themeBlue = document.querySelector('.theme-blue')
const themeGreen = document.querySelector('.theme-green')
const themePink = document.querySelector('.theme-pink')
const themeOrange = document.querySelector('.theme-orange')

const themeDark = document.querySelector('.color__theme-dark')

themeBtnIcon.addEventListener('click', () => {
  themeBtn.classList.toggle('active');
})


document.addEventListener('DOMContentLoaded', (event) => {
  if (localStorage.getItem('mode') === 'dark') {
    main.classList.add('dark');
  } else {
    main.classList.remove('dark');
  }
})
themeDark.addEventListener('click', () => {
  themeDark.classList.toggle('active');
  main.classList.toggle('dark');
  if (main.classList.contains('dark')) {
    localStorage.setItem('mode', 'dark');
  } else {
    localStorage.setItem('mode', '');
  }
})

document.addEventListener('DOMContentLoaded', (event) => {
  if (localStorage.getItem('colorThemes')) {
    body.classList.add(localStorage.getItem('colorThemes'));
  }
})
function changeTheme(color) {
  body.className = '';
  body.classList.add(color);
  localStorage.setItem('colorThemes', body.className);
}

//portfolio item filter

const filterContainer = document.querySelector('.portfolio__filter');
const filterPortfolioItems = document.querySelectorAll('.portfolio__item');
const filterBtns = filterContainer.children;

for (let i = 0; i < filterBtns.length; i++) {
  filterBtns[i].addEventListener('click', function() {
    filterContainer.querySelector('.active').classList.remove('active');
    this.classList.add('active');
    
    const filterValue = this.getAttribute('data-filter');
    for (let k = 0; k < filterPortfolioItems.length; k++) {
      if (filterValue === filterPortfolioItems[k].getAttribute('data-category')) {
        filterPortfolioItems[k].classList.remove('hide');
        filterPortfolioItems[k].classList.add('show');
      } else {
        filterPortfolioItems[k].classList.add('hide');
        filterPortfolioItems[k].classList.remove('show');
      }
      if (filterValue === 'all') {
        filterPortfolioItems[k].classList.remove('hide');
        filterPortfolioItems[k].classList.add('show');
      }
    }
  })
}

//lightbox

const portfolioItems = document.querySelectorAll('.portfolio__item');
const portfolioItemsInner = document.querySelectorAll('.portfolio__item-inner');
const portfolioTitle = document.querySelectorAll('.portfolio__info-title');

const lightbox = document.querySelector('.lightbox');
const lightboxClose = document.querySelector('.lightbox__close');
const lightboxImg = document.querySelector('.lightbox__img');
const lightboxTitle = document.querySelector('.lightbox__title');
const lightboxDescription = document.querySelector('.lightbox__description');
const lightboxCounter = document.querySelector('.lightbox__counter');
const lightboxPrev = document.querySelector('.lightbox__controls-prev');
const lightboxNext = document.querySelector('.lightbox__controls-next');

let count = 0;

for (let i = 0;i < portfolioItems.length;i++) {
  portfolioItemsInner[i].addEventListener('click', () => {
    count = i;
    toggleLightbox();
    changeItem();
  })
}

function toggleLightbox() {
  lightbox.classList.add('open');
}

function changeItem() {
  let imgSrc = portfolioItems[count].querySelector('img').getAttribute('src');
  lightboxImg.src = imgSrc;
  lightboxTitle.innerHTML = portfolioItems[count].querySelector('h4').innerHTML + '&nbsp;&nbsp;&nbsp;<i class="fa fa-eye"></i>';
  lightboxTitle.href = portfolioItems[count].querySelector('a').getAttribute('href');
  lightboxDescription.innerHTML = portfolioItems[count].querySelector('p').innerHTML;
  lightboxCounter.innerHTML = `${count + 1} из ${portfolioItems.length}`;
  console.log(portfolioItems[count].querySelector('a').getAttribute('href'));

}

lightboxNext.addEventListener('click', () => {
  if (count === portfolioItems.length - 1) {
    count = 0;
  } else {
    count++;
  }
  changeItem();
})

lightboxImg.addEventListener('click', () => {
  if (count === portfolioItems.length - 1) {
    count = 0;
  } else {
    count++;
  }
  changeItem();
})

lightboxPrev.addEventListener('click', () => {
  if (count === 0) {
    count = portfolioItems.length - 1;
  } else {
    count--;
  }
  changeItem();
})

//closeLightbox

lightboxClose.addEventListener('click', () => {
  lightbox.classList.remove('open');
})

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('open');
  }
})

//linkMenu & moveSection

const menuLink = document.querySelectorAll('.aside__item-link');
const menuItem = document.querySelectorAll('.aside__item');
const section = document.querySelectorAll('.section');
section.forEach(item => {
  item.classList.add('fixed');
})
for (let i = 0;i < menuLink.length;i++) {
  menuLink[i].addEventListener('click', function () {
    removeBackSectionClass();
    for (let k = 0;k < menuLink.length;k++) {
      if (menuItem[k].querySelector('a').classList.contains('active')) {
        addBackSectionClass(k);
      }
      menuLink[k].classList.remove('active');
    }
    this.classList.add('active');

    showSection(this);

  })
}
function removeBackSectionClass() {
  section.forEach(item => {
    item.classList.remove('back-section');
  })
}
function addBackSectionClass(num) {
  section[num].classList.add('back-section');
}
function showSection(element) {

  let href = element.getAttribute('href').split('#')[1];

  section.forEach(item => {
    item.classList.remove('active');
  })

  document.querySelector("#" + href).classList.add('active');

}


//hireMe
function updateNav(element) {
  for (let k = 0;k < menuLink.length;k++) {
    menuLink[k].classList.remove('active');
    let target = element.getAttribute('href').split('#')[1];
    if (target === menuLink[k].getAttribute('href').split('#')[1]) {
      menuLink[k].classList.add('active');
    }
  }
}

document.querySelector('.hire-me').addEventListener('click', function () {
  const sectionIndex = this.getAttribute("data-section-index");
  showSection(this);
  updateNav(this);
  removeBackSectionClass();
  addBackSectionClass(sectionIndex);
})


//changeLanguage

const selectLang = document.querySelector('.change-lang');

let lang = selectLang.checked;

selectLang.addEventListener('change', changeLang);

function changeLang() {
  for (let key in langArr) {
    if (selectLang.checked) {
      document.querySelector('.lng-' + key).innerHTML = `${langArr[key]['en']}`;
    } else {
      document.querySelector('.lng-' + key).innerHTML = `${langArr[key]['ru']}`;
    }
  }
}

//form
function send(event, php) {
  console.log("Отправка запроса");
  event.preventDefault ? event.preventDefault() : event.returnValue = false;
  var req = new XMLHttpRequest();
  req.open('POST', php, true);
  req.onload = function () {
    if (req.status >= 200 && req.status < 400) {
      json = JSON.parse(this.response); //
      console.log(json);

      // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
      if (json.result == "success") {
        // Если сообщение отправлено
        alert("Сообщение отправлено");
      } else {
        // Если произошла ошибка
        alert("Ошибка. Сообщение не отправлено");
      }
      // Если не удалось связаться с php файлом
    } else { alert("Ошибка сервера. Номер: " + req.status); }
  };

  // Если не удалось отправить запрос. Стоит блок на хостинге
  req.onerror = function () { alert("Ошибка отправки запроса"); };
  req.send(new FormData(event.target));
};

//cursor
const mouse = document.querySelector('.mouse');
const buttons = document.getElementsByTagName('button');
const inputs = document.getElementsByTagName('input');
const textarea = document.getElementsByTagName('textarea');
const links = document.getElementsByTagName('a');
const toggle = document.querySelector('.toggle');
const social = document.querySelectorAll('.home__social');

function moveMouse(e) {
  if (e.clientX < 5 || e.clientY < 5 || e.clientY > (window.innerHeight - 5) || e.clientX > (window.innerWidth - 5)) {
    mouse.style.opacity = 0;
  } else {
    mouse.style.opacity = 1;
    mouse.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
  }
};

if (window.innerWidth >= 768) {
  document.addEventListener('mousemove', moveMouse);

  [...menuItem, toggle, themeBtn, ...buttons, ...links, ...textarea, ...inputs, lightboxPrev, lightboxNext, lightboxClose, ...filterPortfolioItems].forEach(link => link.addEventListener('mouseover', () => { mouse.classList.add('links-visible') }));
  [...menuItem, toggle, themeBtn, ...buttons, ...links, ...textarea, ...inputs, lightboxPrev, lightboxNext, lightboxClose, ...filterPortfolioItems].forEach(link => link.addEventListener('mouseleave', () => { mouse.classList.remove('links-visible') }));
}