$(function () {
  $(window).scroll(function () {
    var scrollHei = $(window).scrollTop();//滚动的高度
    if (scrollHei === 0) {
      $('#goTop').fadeOut()
    } else {
      $('#node-scroll-button').fadeOut()
      $('#goTop').fadeIn()
    }
  })
  $('#node-scroll-button').click(function () {
    $('html,body').animate({scrollTop: 1000}, 'slow')
  })
  $('#goTop').click(function () {
    $('html,body').animate({scrollTop: 0}, 'slow')
  })
})