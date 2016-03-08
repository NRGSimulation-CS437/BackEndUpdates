/**
 * Created by Levi on 3/3/16.
 */
/* Simple VanillaJS to toggle class */

document.getElementById('toggleProfile').addEventListener('click', function () {
  [].map.call(document.querySelectorAll('.profile'), function(el) {
    el.classList.toggle('profile--open');
  });
});


//document.getElementsByClassName('profile__fields')[0].style.visibility='hidden';
document.getElementsByClassName('registerForm')[0].style.visibility='hidden';

