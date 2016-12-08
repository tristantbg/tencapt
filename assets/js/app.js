/* globals $:false */
var width,
    height,
    menuHeight,
    ip,
    $cropper,
    $preview,
    sliderIndex = 0,
    imagesNumber = 0,
    isMobile = false,
    $root = '/';
$(function() {
    var app = {
        init: function() {
            $(document).ready(function($) {
                app.sizeSet();
                $body = $('body');
                //left
                $(document).keyup(function(e) {
                    if (e.keyCode === 37 && $cropper) app.prevCrop();
                });
                //right
                $(document).keyup(function(e) {
                    if (e.keyCode === 39 && $cropper) app.nextCrop();
                });
                app.menuScroll();
                $('#intro').click(function(event) {
                    $(this).remove();
                });
                $(window).load(function() {
                    app.loadCropper();
                    $(".loader").fadeOut("fast", function() {
                        setTimeout(function() {
                            $('#intro').remove();
                        }, 2000);
                    });
                });
                $(window).resize(function(event) {
                    app.sizeSet();
                });
            });
        },
        sizeSet: function() {
            width = $(window).width();
            height = $(window).height();
            menuHeight = $('header').outerHeight() + 4;
            var lastSection = $('#sections section:last-of-type');
            var lastSectionHeight = lastSection.outerHeight();
            lastSection.css('margin-bottom', height - lastSectionHeight - menuHeight);
            if (width <= 770 || Modernizr.touch) isMobile = true;
            if (isMobile) {
                if (width >= 770) {
                    //location.reload();
                    isMobile = false;
                }
            }
        },
        loadCropper: function() {
            $cropper = $('#scan-cropper');
            $preview = $('#preview');
            $imageNumber = $('.image-number');
            $caption = $('.image-caption');
            $download = $('.download');
            imagesNumber = $imageNumber.text().substring(3);
            $slider = $preview.flickity({
                cellSelector: '.cell',
                imagesLoaded: true,
                lazyLoad: 1,
                bgLazyLoad: 1,
                setGallerySize: false,
                //percentPosition: false,
                accessibility: false,
                wrapAround: true,
                prevNextButtons: false,
                pageDots: false,
                draggable: Modernizr.touchevents
            });
            flkty = $slider.data('flickity');
            $slider.on('select.flickity', function() {
                var cell = $(flkty.selectedElement);
                var imageTitle = cell.attr('data-caption');
                var zoom = cell.attr('data-zoom');
                var dl = cell.attr('data-download');
                $caption.html(imageTitle);
                if (typeof dl !== typeof undefined && dl !== false) {
                    $download.show().find('a').attr('href', dl);
                } else {
                    $download.hide();
                }
            });
            // $slider.on('staticClick.flickity', function(event, pointer, cellElement, cellIndex) {
            //     if (!cellElement) {
            //         return;
            //     }
            //     app.goPrev($slider);
            // });
            $slider.click(function(event) {
                $slider.flickity('next', true);
            });
        },
        menuScroll: function() {
            app.navScroll();
            $(document).on("scroll", app.navScroll);
            //smoothscroll
            smoothScroll.init({
                selector: '.section-link', // Selector for links (must be a class, ID, data attribute, or element tag)
                selectorHeader: 'header', // Selector for fixed headers (must be a valid CSS selector) [optional]
                speed: 1000, // Integer. How fast to complete the scroll in milliseconds
                easing: 'easeInOutCubic', // Easing pattern to use
            });
        },
        navScroll: function(event) {
            var scrollPos = $(document).scrollTop();
            $('.menu .section-link').each(function() {
                var currLink = $(this);
                var refElement = $('section' + currLink.attr("href"));
                var parent = currLink.parent();
                if (refElement.position().top - menuHeight <= scrollPos && refElement.position().top - menuHeight + refElement.outerHeight(true) > scrollPos) {
                    $('.menu span').removeClass("outline");
                    parent.addClass("outline");
                } else {
                    parent.removeClass("outline");
                }
            });
        },
        loadContent: function(url, target) {
            $.ajax({
                url: url,
                success: function(data) {
                    $(target).html(data);
                }
            });
        }
    };
    app.init();
});

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}