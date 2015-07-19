$('.slider-for').slick({
 infinite: true,
 slidesToShow: 3,
 slidesToScroll: 1,
 arrows: true,
 asNavFor: '.slider-nav',
 centerMode: true,
 variableWidth: true
});
$('.slider-nav').slick({
 slidesToShow: 10,
 asNavFor: '.slider-for',
 variableWidth: true,
 focusOnSelect: true
});
