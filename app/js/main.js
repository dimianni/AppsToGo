$(function () {


    /*
    =====================================================================
    *   AppsToGo v1.0 Default Script
    *   Author: Dmytro Anikin (for DUOL Studio)
    *   18-Feb-2021
    =====================================================================
    */

    // $('.header-wrapper__right-contact--el').on("mouseover", function () {
    //     let src = $(this).attr('src') === 'img1_on.jpg'

    //     $(this).attr('src', src);
    // })

    const heroWaves = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            scrub: true
        }
    })

    heroWaves.to(".hero-bg__wave3", {
        marginTop: 80,
    }, 'together')
    heroWaves.to(".hero-bg__wave2", {
        marginTop: 40,
    }, 'together')

    const callWaves = gsap.timeline({
        scrollTrigger: {
            trigger: ".call",
            start: "top bottom",
            scrub: true
        }
    })

    callWaves.to(".call-bg__wave3", {
        marginTop: 60,
    }, 'together')
    callWaves.from(".call-bg__wave2", {
        marginTop: -30,
    }, 'together')
    callWaves.to(".call-bg__wave1", {
        marginTop: 30,
    }, 'together')

    // const careerPP = gsap.timeline({ paused: true })

    // careerPP.to('.career', {
    //     display: 'flex',
    //     opacity: 1,
    //     duration: 0.2
    // })
    // careerPP.to('.career-wrapper', {
    //     opacity: 1,
    //     marginTop: 0,
    //     duration: 0.2
    // })

    // $('.header-wrapper__left-menu--career').on('click', function () {
    //     // console.log('yeeeesssmannnannana');
    //     if ($('.career').hasClass('.careerPP')) {
    //         $('.career').removeClass('.careerPP')
    //         careerPP.reverse();
    //     } else {
    //         $('.career').addClass('.careerPP')
    //         careerPP.play();
    //     }

    // })
    // $('.career-wrapper__close').on('click', function () {
    //     $('.career').removeClass('.careerPP')
    //     careerPP.reverse();
    // })

    /*----------------------------------------------------*/
    /*	Mobile Menu
    ------------------------------------------------------*/

    let mobmenu = gsap.timeline({ paused: true })

    mobmenu.to('.mobmenu', {
        transform: 'translateX(36vw)',
        duration: 0.2
    })
    mobmenu.from('.mobmenu-wrapper', {
        opacity: 0,
        duration: 0.2
    })

    $('.header-wrapper__right-burger').on('click', function () {
        $('#nav-icon3').toggleClass('open')

        if ($('.mobmenu').hasClass('mobmenu-active')) {
            $('.mobmenu').removeClass('mobmenu-active');
            mobmenu.reverse()
        } else {
            $('.mobmenu').addClass('mobmenu-active');
            mobmenu.play()

        }
    })

    $('.mobmenu, .section').on('click', function () {
        $('#nav-icon3').removeClass('open')
        $('.mobmenu').removeClass('mobmenu-active');
        mobmenu.reverse()
    })

    $(window).on("scroll", function () {
        if ($(window).width() < 1200 && window.pageYOffset > 0) {
            $('#nav-icon3').removeClass('open')
            $('.mobmenu').removeClass('mobmenu-active');
            mobmenu.reverse()
        }
    })

    let showlang = gsap.timeline({ paused: true })
    showlang.to('.header-wrapper__right-language--add', {
        opacity: 1,
        bottom: '-100%',
        duration: 0.35
    }, 'together')
    showlang.to('.header-wrapper__right-language--active', {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        duration: 0.1
    }, 'together')
    showlang.to('.header-wrapper__right-language--add', {
        opacity: 1,
        duration: 0.35
    })


    $('.header-wrapper__right-language').hover(
        function () {
            showlang.play()
        },
        function () {
            showlang.reverse()
        }
    )

    $(document).ready(function () {
        gsap.to('.hero-wrapper__cont--text', {
            marginLeft: 5,
            opacity: 1,
            stagger: 0.1,
            duration: 1
        })
    });




    const bgiphones = gsap.timeline({
        scrollTrigger: {
            trigger: '.about',
            start: 'top bottom',
            scrub: true
        }
    })

    bgiphones.from('.about-wrapper__right-pi--1', {
        transform: 'translateY(100px)'
    }, 'together')
    bgiphones.from('.about-wrapper__right-pi--2', {
        transform: 'translateY(200px)'
    }, 'together')
    bgiphones.from('.about-wrapper__right-pi--3', {
        transform: 'translateY(150px)'
    }, 'together')
    bgiphones.from('.about-wrapper__right-pi--4', {
        transform: 'translateY(200px)'
    }, 'together')

    const differenceAnim = gsap.timeline({
        scrollTrigger: {
            trigger: '.difference',
            start: "top bottom",
            end: "center center",
            scrub: true,
            // markers: true
        }
    })

    differenceAnim.from(".difference-wrapper__img-main img", {
        transform: 'translateY(150px)'
    }, 'together')
    differenceAnim.from(".difference-wrapper__img-glass img", {
        transform: 'translateY(210px)'
    }, 'together')


    let services = document.querySelectorAll('.services-wrapper__right-el');

    services.forEach((service) => {
        const serv = gsap.timeline({
            scrollTrigger: {
                trigger: service,
                start: 'center bottom',
                end: 'bottom bottom',
            }
        })

        serv.to(service, {
            opacity: 1,
            duration: 1
        })

    })



    /*----------------------------------------------------*/
    /*	Плавный Скролл
    ------------------------------------------------------*/

    $(".header-wrapper__left-menu--el, .mobmenu-wrapper__el, .hero-wrapper__cont--btn").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area

            $('html, body').animate({
                scrollTop: $(hash).offset().top - 80
            }, 1000)

        } // End if
    });

    /*----------------------------------------------------*/
    /*	Highlight section on scroll
    ------------------------------------------------------*/

    var sections = $(".section")

    console.log(sections);

    let dknavigation_links = $(".header-wrapper__left-menu--el");

    let mobnavigation_links = $(".mobmenu-wrapper__el");

    sections.waypoint({

        handler: function (direction) {

            var active_section;

            active_section = $('section#' + this.element.id);

            if (direction === "up") active_section = active_section.prev();

            if ($(window).width() > 1199) {
                var active_link = $('.header-wrapper__left-menu--el[href="#' + active_section.attr("id") + '"]');
                dknavigation_links.removeClass("current-section");
            } else {
                var active_link = $('.mobmenu-wrapper__el[href="#' + active_section.attr("id") + '"]');
                mobnavigation_links.removeClass("current-section");
            }

            active_link.addClass("current-section");

        },

        offset: '25%'

    });

    console.log($('#contactForm'));
    console.log($('#contactForm').serialize());
    
    /*----------------------------------------------------*/
    /*	Валидация формы обратной связи
    ------------------------------------------------------*/
    $('#contactForm').validate({

        /* submit via ajax */
        submitHandler: function (form) {

            $.ajax({

                type: "POST",
                url: "inc/sendEmail.php",
                data: $(form).serialize(),
                success: function (msg) {

                    if (msg == 'OK') {
                        $('#contactName').removeClass('error');
                        $('#contactPhone').removeClass('error');
                        $('#contactEmail').removeClass('error');
                        $('#contactForm').fadeOut();
                        $('.call-wrapper__right-form--title').fadeOut();
                        $('#message-success').fadeIn();
                    }

                    if (msg.includes("Name")) {
                        $('#contactName').addClass('error');
                    } else {
                        $('#contactName').removeClass('error');
                    }

                    if (msg.includes("Email")) {
                        $('#contactEmail').addClass('error');
                    } else {
                        $('#contactEmail').removeClass('error');
                    }

                    if (msg.includes("Phone")) {
                        $('#contactPhone').addClass('error');
                    } else {
                        $('#contactPhone').removeClass('error');
                    }
                },
                error: function () {

                    $('#message-warning').html("Oops something went wrong :( <br> Please try reloading the page.");
                    $('#contactForm').fadeOut();
                    $('#message-warning').fadeIn();

                }

            });
        }

    });

});