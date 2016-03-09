/**
 * Created by Levi on 3/9/16.
 */
/**
 * Created by Levi on 3/9/16.
 */
function initSlider() {
    s.slider.find('.my-slider').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        zIndex: 9000,
        focusOnSelect: true,
        autoplay: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        prevArrow: s.slider.find('.prev-nav'),
        nextArrow: s.slider.find('.next-nav')
    });
};