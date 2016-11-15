/* globals $:false */
var width,
    height,
    menuHeight,
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
                $(window).load(function() {
                    app.loadCropper();
                    $(".loader").fadeOut("fast");
                });
                $(window).resize(function(event) {
                    app.sizeSet();
                    if ($cropper) {
                        $preview.css('width', '');
                        var newWidth = $preview.width();
                        $cropper.cropit('previewSize', {
                            width: newWidth,
                            height: height * 0.6
                        });
                    }
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
                $cropper = $('#tencapture-cropper');
                $preview = $('.cropit-preview');
                imagesNumber = pad($cropperImages.length);
                $cropper.cropit({
                    imageState: {
                        src: $cropperImages[0].image
                    },
                    allowDragNDrop: true,
                    minZoom: 'fit',
                    onImageLoaded: function() {
                      $('#range').val(0);
                        $('#percent').html(Math.floor($('#range').val() * 100) + '%');
                        $('.image-number').text(pad(sliderIndex + 1) + '/' + imagesNumber);
                        $('.image-caption').text($cropperImages[sliderIndex].caption);
                    }
                });
                $body.on('click', '.cropit-preview', function(event) {
                    event.preventDefault();
                    app.nextCrop();
                });
                $body.on('input', '#range', function() {
                    var value = $(this).val();
                    $cropper.cropit('zoom', value);
                    $('#percent').html(Math.floor( value * 100) + '%');
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
            $('.section-link').each(function() {
                var currLink = $(this);
                var refElement = $(currLink.attr("href"));
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
            if (sliderIndex < 0) {
                sliderIndex = $cropperImages.length - 1;
            }
            $cropper.cropit('imageSrc', $cropperImages[sliderIndex].image);
        },
        nextCrop: function() {
            sliderIndex++;
            if (sliderIndex > $cropperImages.length - 1) {
                sliderIndex = 0;
            }
            $cropper.cropit('imageSrc', $cropperImages[sliderIndex].image);
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