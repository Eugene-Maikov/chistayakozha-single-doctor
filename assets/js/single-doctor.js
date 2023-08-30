document.addEventListener("DOMContentLoaded", () => {

  // tabs
  const handleTabs = () => {
    const tabs = document.querySelectorAll(".skill__btn-item")
    const contents = document.querySelectorAll(".skill__content")

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const tabId = tab.getAttribute("data-tab")
        tabs.forEach((tab) => {
          tab.classList.remove("active")
        })
        contents.forEach((content) => {
          content.classList.remove("active")
        })
        tab.classList.add("active")
        document.getElementById(tabId).classList.add("active")
      })
    })
    tabs[0].click()
  }
  handleTabs()

  // timeline
  const calcLineLength = () => {
    const skillContent = document.querySelectorAll('.skill__content._dates')

    skillContent.forEach((item) => {
      const lastLi = item.querySelector('.skill__dates-body:last-child')
      const heightUl = item.querySelector('.skill__dates')
      const line = item.querySelector('.skill__dates-line')

      const calc = () => {
        const liHeight = lastLi.offsetHeight;
        const ulHeight = heightUl.offsetHeight;
        const result = ulHeight - liHeight
        line.style.height = (result - 100) + 'px'
      }
      calc()
    })
  }
  // resize timeline
  const onWindowResize = () => calcLineLength()
  window.addEventListener("resize", onWindowResize)
  calcLineLength()

  // slider
  const workSlider = new Swiper('.work__slider', {
    slidesPerView: 3,
    spaceBetween: 31,

    navigation: {
      nextEl: ".work__buttons .slider-btn-next",
      prevEl: ".work__buttons .slider-btn-prev",
    },

    breakpoints: {
      320: {
        slidesPerView: '1',
      },
      768: {
        slidesPerView: '2',
        spaceBetween: 30,
      },
      990: {
        slidesPerView: '3',
        spaceBetween: 31,
      }
    }
  });
  const reviewsSlider = new Swiper('.reviews__slider', {
    slidesPerView: 3,
    spaceBetween: 31,
    resizeObserver: true,

    navigation: {
      nextEl: ".reviews__buttons .slider-btn-next",
      prevEl: ".reviews__buttons .slider-btn-prev",
    },

    breakpoints: {
      320: {
        slidesPerView: '1',
      },
      768: {
        slidesPerView: '2',
        spaceBetween: 30,
      },
      990: {
        slidesPerView: '3',
        spaceBetween: 31,
      }
    }
  });
  const otherDoctorsSlider = new Swiper('.other-doctors__slider', {
    slidesPerView: 3,
    spaceBetween: 30,
    resizeObserver: true,

    navigation: {
      nextEl: ".other-doctors__buttons .slider-btn-next",
      prevEl: ".other-doctors__buttons .slider-btn-prev",
    },

    breakpoints: {
      320: {
        slidesPerView: '1',
      },
      768: {
        slidesPerView: '2',
        spaceBetween: 30,
      },
      990: {
        slidesPerView: '3',
        spaceBetween: 31,
      }
    }
  });

  // Отчество и фамилия с новой строки
  const splitString = () => {
    const names = document.querySelectorAll('.reviews__item-name')
    names.forEach((item) => {

      let str = item.textContent
      let words = str.split(' ')
      words.splice(1, 0, '<br>')
      item.innerHTML = words.join(' ')
    })

    if (window.innerWidth > 680) {
      const containerNames = document.querySelectorAll('.reviews__item-right')
      containerNames.forEach((item) => {
        if (item.offsetHeight > 82) {
          item.querySelector('.reviews__item-name').style.fontSize = 14 + 'px'
        }
      })
    }
  }
  splitString()

  const composeVideo = () => {

    const player = document.querySelectorAll('.youtube-player')
    const link = document.querySelector('.about-doctor__link')

    if (player && link) {
      const videoId = link.textContent.match(/\/embed\/([^?]+)/)[1]
      const videoThumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`
      const videoThumbnail = document.createElement('img')

      videoThumbnail.src = videoThumbnailUrl
      player.forEach((item) => {
        item.appendChild(videoThumbnail)
      })

      const loadPlayer = (evt) => {
        const target = evt.currentTarget
        const iframe = document.createElement('iframe')
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`
        iframe.setAttribute('width', 100 + '%')
        iframe.setAttribute('height', 100 + '%')
        iframe.setAttribute('allow', 'autoplay')
        target.classList.remove('btn-dis')

        if (target.children.length) {
          target.replaceChild(iframe, target.firstElementChild)
        } else {
          target.appendChild(iframe)
        }
      }

      const config = { once: true }

      Array.from(player).forEach(function(player) {
        player.addEventListener('click', loadPlayer, config)
      })
    }
  }
  composeVideo()

})