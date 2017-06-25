import jQuery from 'jQuery';

jQuery(($) => {
  const $bodyEl = $('body'),
      $sidedrawerEl = $('#sidedrawer');


  function showSidedrawer() {
    // show overlay
    const options = {
      onclose: () => {
        $sidedrawerEl
          .removeClass('active')
          .appendTo(document.body);
      }
    };

    const $overlayEl = $(mui.overlay('on', options));

    // show element
    $sidedrawerEl.appendTo($overlayEl);
    setTimeout(() => {
      $sidedrawerEl.addClass('active');
    }, 20);
  }

  const $titleEls = $('strong', $sidedrawerEl);

  $titleEls
    .next()
    .hide();

  $titleEls.on('click', () => {
    $(this).next().slideToggle(200);
  });
  function hideSidedrawer() {
    $bodyEl.toggleClass('hide-sidedrawer');
  }


  $('.js-show-sidedrawer').on('click', showSidedrawer);
  $('.js-hide-sidedrawer').on('click', hideSidedrawer);
});
