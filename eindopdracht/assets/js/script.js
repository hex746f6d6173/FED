var lockHeaderAnimate = false,
    headerProgression = 0;

var animateHeaderWithProgression = function(p) {

    if (lockHeaderAnimate || $(window).width() < 1000)
        p = 0;

    var pI = (p * -1) + 1;

    var paddings = pI * 1;

    $("section, aside h1").each(function() {
        if (!$(this).hasClass("jumbo")) {


            var twoTimes = p * 2

            var out_min = 0.3;
            var out_max = 1;

            //var progressHalfTime = twoTimes * (1 - 0.1) / (2 - 0) + 0.1;

            var progressHalfTime = 0.4 * twoTimes + 0.1;

            if (lockHeaderAnimate || $(window).width() < 1000)
                progressHalfTime = 1;

            $(this).css({
                opacity: progressHalfTime
            });

        }
    });

    $("body>header").css({
        backgroundColor: "rgba(70, 70, 70, " + p + ")"
    });

    $("body>header li").css({
        paddingTop: paddings + "em",
        paddingBottom: paddings + "em"
    });

    var logoFontSize = 2.5 - (1.5 * p);

    console.log(pI, logoFontSize);

    $("body>header .logo").css({
        fontSize: logoFontSize + "em"
    });

    var paddingsButton = pI * 0.5;
    var marginsButton = pI * 0.5;

    $("body>header .button").css({
        paddingTop: paddingsButton + "em",
        paddingBottom: paddingsButton + "em",
        marginTop: marginsButton + "em"
    });

    var yOffset = -300 * p;

    $("section.jumbo .jumbo_img").css({
        "background-position-y": yOffset
    });

    var hOneMarginLeft = (10 * p);

    $("section.jumbo .jumbo_img h1").css({
        opacity: pI,
        left: hOneMarginLeft + "em"
    });

};
var scrollBehavoir = function() {

    var scrollTop = $(window).scrollTop();

    var height = $(window).height();

    $("body>section").css({
        "min-height": 0.85 * height
    });

    // DOORLOOP DOOR HELE EERSTE SECTION

    var firstSection = $("section").first();

    var firstSectionHeight = firstSection.height();


    // PROGRESSIE IS HOOGTE VAN EERSTE SECTION / SCROLLTOP; 0 < p < 1

    headerProgression = scrollTop / firstSectionHeight;

    // HOUD PROGRESSIE IN BOUNDS; 0 < p < 1

    if (headerProgression > 1)
        headerProgression = 1;

    if (headerProgression < 0)
        headerProgression = 0;




    animateHeaderWithProgression(headerProgression);


};

$(document).ready(function() {

    var header = $("header").first();


    $(window).scroll(scrollBehavoir);
    $(window).resize(scrollBehavoir);
    scrollBehavoir();

    $("body>header").hover(function() {
        lockHeaderAnimate = true;
        animateHeaderWithProgression(headerProgression);
    }, function() {
        lockHeaderAnimate = false;
        animateHeaderWithProgression(headerProgression);
    });

});