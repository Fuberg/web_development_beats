const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu");
const menuItems = sideMenu.find(".fixed-menu__item");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

// time
const transitionOver = 1000;
const mouseInertialOver = 300;

let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = (sectionEq) => {
    const position = sectionEq * -100;

    if (isNaN(position)) {
        console.error("Передано неверное значение в counterSectionPosition");
    }

    return position;
};

const changeMenuThemeForSection = (sectionEq) => {
    const currentSection = sections.eq(sectionEq);
    const menuTheme = currentSection.attr("data-side-theme");
    const activeClass = "fixed-menu--shadowed";

    if (menuTheme === "gray") {
        sideMenu.addClass(activeClass);
    } else {
        sideMenu.removeClass(activeClass);
    }
};

const resetActiveClassForItem = (items, itemEq, activeClass) => {
    items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
};

const performTransition = sectionEq => {
    if (inScroll) return;

    inScroll = true;

    const position = countSectionPosition(sectionEq);

    changeMenuThemeForSection(sectionEq);

    display.css({
        transform: `translateY(${position}%)`
    });

    resetActiveClassForItem(sections, sectionEq, "active");

    setTimeout(() => {
        inScroll = false;
        resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active");
    }, transitionOver + mouseInertialOver);

};

const viewportScroller = direction => {
    const activeSection = sections.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();
    
    return {
        next() {
            if (nextSection.length) {
                performTransition(nextSection.index());
            }
        },
        prev() {
            if (prevSection.length) {
                performTransition(prevSection.index());
            }
        },
    };
};

$(window).on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;
    const scroller = viewportScroller();

    if (deltaY > 0) {
        scroller.next();
    }

    if (deltaY < 0){
        scroller.prev();
    }
});

$(window).on("keydown", e => {

    const tagName = e.target.tagName.toLowerCase();
    const userTypingInInputs = tagName === "input" || tagName === "textarea";
    const scroller = viewportScroller();

    if (userTypingInInputs) return;

    switch (e.keyCode) {
        case 40:
            scroller.next();
            break;
        case 38:
            scroller.prev();
            break;
    }
});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click(e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);

    performTransition(reqSection.index());

});

// https://github.com/mattbryson/TouchSwipe-Jquery-Plugin

if (isMobile) {
    $("body").swipe({
        swipe: function (
            event,
            direction
        ) {
            const scroller = viewportScroller();
            let scrollDirection = "";

            if (direction === "up") scrollDirection = "next";
            if (direction === "down") scrollDirection = "prev";

            scroller[scrollDirection]();
        },
    });
};

