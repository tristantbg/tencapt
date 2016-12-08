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
                ip = new ImagePreloader();
                History.Adapter.bind(window, 'statechange', function() {
                    var State = History.getState();
                    console.log(State);
                    var content = State.data;
                    if (content.type == 'project') {
                        $body.addClass('project loading');
                        app.loadContent(State.url + '/ajax', slidecontainer);
                    }
                });
                //esc
                $(document).keyup(function(e) {
                    if (e.keyCode === 27) app.goIndex();
                });
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
                    $(".loader").fadeOut("fast", function(){
                      // setTimeout(function(){
                      //   $('#intro').remove();
                      // },2000);
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
                }
            }
        },
        loadCropper: function() {
            if (typeof $cropperImages != 'undefined' && $cropperImages.length > 0) {
                $cropper = $('#scan-cropper');
                $preview = $('#preview');
                imagesNumber = pad($cropperImages.length);
                app.loadImages(sliderIndex);
                $body.on('click', '#preview', function(event) {
                    event.preventDefault();
                    app.nextCrop();
                });
                $body.on('input', '#range', function() {
                    var value = $(this).val();
                    var zoom = value * 4 + 1;
                    $preview.attr('class', '').addClass('zoom-' + zoom + 'x');
                    $('#percent').html(Math.floor(value * 100) + '%');
                });
            }
        },
        loadImages: function(sliderIndex) {
            $preview.empty().attr('class', '').addClass('zoom-1x');
            //$('.image-caption').text('Loading');
            var images = [];
            for (var i = 1; i < 6; i++) {
                images.push($cropperImages[sliderIndex]['image_' + i + 'x']);
            }
            ip.queue(images);
            // Preload the queue
            ip.preload().then(function() {
                images.forEach(function(el, idx) {
                    $preview.append('<img class="preview preview-' + (idx + 1) + 'x" src="' + el + '" />');
                });
                app.fallbackObjectFit();
                $('.image-caption').text($cropperImages[sliderIndex].caption);
            });
        },
        fallbackObjectFit: function() {
            if (!Modernizr.objectfit) {
                $('img.preview').each(function() {
                    var el = $(this);
                    var imgSrc = el.attr('src');
                    var classes = el.attr('class');
                    var fitType = el.css('object-fit');
                    $('<div class="' + classes + ' fallback">').css({
                        'background': 'transparent url("' + imgSrc + '") no-repeat center center/' + fitType,
                    }).appendTo($preview);
                    el.remove();
                });
            }
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
        goIndex: function() {
            History.pushState({
                type: 'index'
            }, $sitetitle, window.location.origin + $root);
        },
        prevCrop: function() {
            sliderIndex--;
            $('#range').val(0);
            if (sliderIndex < 0) {
                sliderIndex = $cropperImages.length - 1;
            }
            $('#percent').html(Math.floor($('#range').val() * 100) + '%');
            $('.image-number').text(pad(sliderIndex + 1) + '/' + imagesNumber);
            app.loadImages(sliderIndex);
        },
        nextCrop: function() {
            sliderIndex++;
            $('#range').val(0);
            if (sliderIndex > $cropperImages.length - 1) {
                sliderIndex = 0;
            }
            $('#percent').html(Math.floor($('#range').val() * 100) + '%');
            $('.image-number').text(pad(sliderIndex + 1) + '/' + imagesNumber);
            app.loadImages(sliderIndex);
        },
        loadContent: function(url, target) {
            $.ajax({
                url: url,
                success: function(data) {
                    $(target).html(data);
                }
            });
        },
        deferImages: function() {
            var imgDefer = document.getElementsByTagName('img');
            for (var i = 0; i < imgDefer.length; i++) {
                if (imgDefer[i].getAttribute('data-src')) {
                    imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
                }
            }
        }
    };
    app.init();
});

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}