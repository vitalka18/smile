/**
 * Table content
 * #1 Init sliders
 *    #1.1 Update sliders
 * #2 Init fancybox
 * #3 Init collapse
 * #4 Init rating
 */

$( document ).ready( function() {

  /*
   * #1 init sliders
   */
  $( '.carousel' ).each( function() {
    const $prev = $( this ).find( '.carousel__btn-prev' );
    const $next = $( this ).find( '.carousel__btn-next' );

    $( this ).find( '.js-carousel-similar' ).slick({
      autoplay: true,
      autoplaySpeed: 5000,
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 1,
      prevArrow: $prev,
      nextArrow: $next
    });
  });

  $( '.article-carousel' ).each( function() {
    const $prev = $( this ).find( '.carousel__btn-prev' );
    const $next = $( this ).find( '.carousel__btn-next' );

    $( this ).find( '.js-article-carousel' ).slick({
      autoplay: true,
      autoplaySpeed: 5000,
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      prevArrow: $prev,
      nextArrow: $next
    });
  });

  $( '.carousel-watched' ).each( function() {
    const $prev = $( this ).find( '.carousel__btn-prev' );
    const $next = $( this ).find( '.carousel__btn-next' );

    $( this ).find( '.js-carousel-watched' ).slick({
      autoplay: true,
      autoplaySpeed: 5000,
      dots: false,
      infinite: false,
      speed: 300,
      slidesToScroll: 1,
      variableWidth: true,
      prevArrow: $prev,
      nextArrow: $next
    });
  });

  $( '.goods-gallery' ).each( function() {
    const $gallery = $( this );
    const $imgs = $gallery.find( '[data-gallery-img]' );

    const slider = $( '.js-gallery-carousel' ).slick({
      arrows: false,
      autoplay: true,
      autoplaySpeed: 5000,
      dots: false,
      infinite: false,
      speed: 300,
      slidesToScroll: 1
    }).on( 'afterChange', function( ev, slick, current ) {
      $gallery.find( '.goods-gallery__items a' ).removeClass( 'active' );
      $gallery
        .find( `.goods-gallery__items li[data-gallery-img="${current}"] a` )
        .addClass( 'active' );
    });

    $imgs.on( 'click', function( ev ) {
      const $el = $( this );
      ev.preventDefault();

      slider.slick( 'slickGoTo', +$el.attr( 'data-gallery-img' ) || 0 );
    });
  });

  /**
   * #1.1 update slider after change tab
   */
  $( 'a[data-toggle="tab"]' ).on( 'shown.bs.tab', function() {
    const $link = $( this );

    if ( $link.hasClass( 'js-update-slider' ) ) {
      const $tab = $( $link.attr( 'href' ) );
      $tab.find( '.slick-slider' ).slick(
        'slickSetOption',
        'autoplay',
        true,
        true
      );
    }
  });


  /**
   * #2 init fancybox
   */
  $( '.js-video-popup' ).fancybox();

  $( '.js-doc-popup' ).fancybox({
    image: {
      protect: true
    }
  });

  $( '[data-fancybox="card-gallery"]' ).fancybox({
    image: {
      protect: true
    }
  });


  /**
   * #3 init collapse
   */
  $( '.collapse' ).on({
    'shown.bs.collapse': onCollapseShown,
    'hidden.bs.collapse': onCollapseHidden
  });

  function onCollapseShown() {
    const id = $( this ).attr( 'id' );
    const $link = $( `[href="#${id}"]` );
    $link
         .addClass( 'link_icon-rotate' )
         .find( '.link__text' )
         .text( $link.data( 'active-text' ) );
  }

  function onCollapseHidden() {
    const id = $( this ).attr( 'id' );
    const $link = $( `[href="#${id}"]` );
    $link
         .removeClass( 'link_icon-rotate' )
         .find( '.link__text' )
         .text( $link.data( 'default-text' ) );
  }

  /**
   * #4 init rating
   */
  $( '.js-rating' ).barrating({
    theme: 'css-stars'
  });
});
