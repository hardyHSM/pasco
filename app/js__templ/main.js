(function() {
    // buttons - tab - right -bar
    let buttonsTabs = document.querySelectorAll('.tab-post__button');

    for (let i = 0; i < buttonsTabs.length; i++) {
        buttonsTabs[i].addEventListener("click", function () {
            buttonsTabs.forEach(function(item, i, arr) {
                item.classList.remove('tab-post--active');
            })
            this.classList.add("tab-post--active");
        })
    }
    // TABS MENU on FOOTER


}());


(function($) {
    var tabs = $('.tabs__head');
    tabs.on('click', function() {

        if($(this).next().css("display") == "block") {
            return false;
        }
        $(this).toggleClass('tabs-head-is-active');
        tabs.not($(this)).next().slideUp(500);
        $(this).next().slideToggle(500);
    })

})(jQuery);

(function($) {
    var settingsButton = $('.news-feedPost__settings');
    settingsButton.on('click', function(event) {
        var listSettings = $(this).next();
        listSettings.toggleClass("drop-down-settings--is-active");
        event.stopPropagation();
        $(document).on('click',  function (e) {
            var parentElem = e.target.offsetParent;
            if(!listSettings.is(e.target) && listSettings.has(e.target).length === 0) {
                listSettings.removeClass("drop-down-settings--is-active");
            }
        })
    })

})(jQuery);


(function($) {
    var buttonBurger = $('.header__menu-button');
    var navBar = $('.nav-bar');
    buttonBurger.on('click', function() {
        $(this).toggleClass('button-burger--is-opened');
        navBar.toggleClass('nav-bar--active');
        $('.header').toggleClass('header--is-top');
		console.log(true);
		 navBar.style = '';	
    });

})(jQuery);