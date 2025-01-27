/*
 * Zoom In/Out Sliders Full Collection  v2.4
 *
 * Copyright 2012-2013, LambertGroup
 * 
 */

(function(e) {
    function K(a, b) {
        e(a.currentImg.attr("data-text-id")).css("display", "block");
        var g = e(a.currentImg.attr("data-text-id")).children()
          , d = 0;
        currentText_arr = [];
        g.each(function() {
            currentText_arr[d] = e(this);
            var f = currentText_arr[d].attr("data-initial-left")
              , g = currentText_arr[d].attr("data-initial-top");
            b.responsive && (f = parseInt(f / (b.origWidth / b.width), 10),
            g = parseInt(g / (b.origWidth / b.width), 10));
            currentText_arr[d].css({
                left: f + "px",
                top: g + "px",
                opacity: parseInt(currentText_arr[d].attr("data-fade-start"), 10) / 100
            });
            var h = currentText_arr[d];
            setTimeout(function() {
                b.responsive && (newCss = "",
                -1 != h.css("font-size").lastIndexOf("px") ? (fontSize = h.css("font-size").substr(0, h.css("font-size").lastIndexOf("px")),
                newCss += "font-size:" + fontSize / (b.origWidth / b.width) + "px;") : -1 != h.css("font-size").lastIndexOf("em") && (fontSize = h.css("font-size").substr(0, h.css("font-size").lastIndexOf("em")),
                newCss += "font-size:" + fontSize / (b.origWidth / b.width) + "em;"),
                -1 != h.css("line-height").lastIndexOf("px") ? (lineHeight = h.css("line-height").substr(0, h.css("line-height").lastIndexOf("px")),
                newCss += "line-height:" + lineHeight / (b.origWidth / b.width) + "px;") : -1 != h.css("line-height").lastIndexOf("em") && (lineHeight = h.css("line-height").substr(0, h.css("line-height").lastIndexOf("em")),
                newCss += "line-height:" + lineHeight / (b.origWidth / b.width) + "em;"),
                h.wrapInner('<div class="newFS" style="' + newCss + '" />'));
                var f = h.attr("data-final-left")
                  , g = h.attr("data-final-top");
                b.responsive && (f = parseInt(f / (b.origWidth / b.width), 10),
                g = parseInt(g / (b.origWidth / b.width), 10));
                var d = 1;
                !0 == a.isVideoPlaying && (d = 0);
                h.animate({
                    opacity: d,
                    left: f + "px",
                    top: g + "px"
                }, 1E3 * h.attr("data-duration"), function() {
                    !0 == a.isVideoPlaying && e(a.currentImg.attr("data-text-id")).children().css("opacity", 0)
                })
            }, 1E3 * currentText_arr[d].attr("data-delay"));
            d++
        })
    }
    function L(a, b, g, d, f) {
        var l = F();
        -1 == a && (a = 0);
        var h = e(f[a]);
        f = b.horizontalPosition;
        void 0 != h.attr("data-horizontalPosition") && "" != h.attr("data-horizontalPosition") && (f = h.attr("data-horizontalPosition"));
        var j = b.verticalPosition;
        void 0 != h.attr("data-verticalPosition") && "" != h.attr("data-verticalPosition") && (j = h.attr("data-verticalPosition"));
        var n = b.initialZoom;
        void 0 != h.attr("data-initialZoom") && "" != h.attr("data-initialZoom") && (n = Number(h.attr("data-initialZoom")));
        var k = b.finalZoom;
        void 0 != h.attr("data-finalZoom") && "" != h.attr("data-finalZoom") && (k = Number(h.attr("data-finalZoom")));
        d = d[a].split(";");
        b.responsive && (d[0] /= b.origWidth / b.width,
        d[1] /= b.origWidth / b.width);
        b.width100Proc && b.height100Proc && d[1] * Math.min(k, n) < b.height && (newH = b.height / Math.min(k, n),
        newW = newH * (d[0] / d[1]),
        d[0] = newW,
        d[1] = newH);
        a = e("#contentHolderUnit_" + a, g).find("img:first");
        parseInt(k * d[0], 10);
        parseInt(k * d[1], 10);
        a.css({
            width: parseInt(n * d[0], 10) + "px",
            height: parseInt(n * d[1], 10) + "px"
        });
        g = 0;
        switch (f) {
        case "left":
            g = 0;
            break;
        case "center":
            g = (b.width - parseInt(n * d[0], 10)) / 2;
            break;
        case "right":
            g = b.width - parseInt(n * d[0], 10);
            break;
        default:
            g = 0
        }
        k = 0;
        switch (j) {
        case "top":
            k = -2;
            break;
        case "center":
            k = (b.height - parseInt(n * d[1], 10)) / 2;
            break;
        case "bottom":
            k = b.height - parseInt(n * d[1], 10) + 2;
            break;
        default:
            k = 0
        }
        a.css({
            left: parseInt(g, 10) + "px",
            top: parseInt(k, 10) + "px",
            opacity: b.initialOpacity
        });
        (-1 == l || -1 != l && 10 <= l) && a.css({
            "-webkit-transform-origin": f + " " + j,
            "-moz-transform-origin": f + " " + j,
            "-o-transform-origin": f + " " + j,
            "transform-origin": f + " " + j
        })
    }
    function J(a, b, g) {
        var d = F();
        g = e(g[a.current_img_no]);
        var f = b.initialZoom;
        void 0 != g.attr("data-initialZoom") && "" != g.attr("data-initialZoom") && (f = Number(g.attr("data-initialZoom")));
        b = b.finalZoom;
        void 0 != g.attr("data-finalZoom") && "" != g.attr("data-finalZoom") && (b = Number(g.attr("data-finalZoom")));
        f != b && (-1 != d && 10 > d ? (clearInterval(a.msiInterval),
        a.current_imgInside.css("filter", 'progid:DXImageTransform.Microsoft.Matrix(FilterType="bilinear",M11=1, M12=0, M21=0, M22=1, Dx=0, Dy=0)')) : a.current_imgInside.css({
            "-webkit-transition-duration": "0s",
            "-moz-transition-duration": "0s",
            "-o-transition-duration": "0s",
            "transition-duration": "0s",
            "-webkit-transform": "scale(1)",
            "-moz-transform": "scale(1)",
            "-o-transform": "scale(1)",
            transform: "scale(1)"
        }))
    }
    function M(a, b, g, d, f) {
        f = e(f[a.current_img_no]);
        var l = F()
          , h = b.horizontalPosition;
        void 0 != f.attr("data-horizontalPosition") && "" != f.attr("data-horizontalPosition") && (h = f.attr("data-horizontalPosition"));
        var j = b.verticalPosition;
        void 0 != f.attr("data-verticalPosition") && "" != f.attr("data-verticalPosition") && (j = f.attr("data-verticalPosition"));
        var n = b.duration;
        void 0 != f.attr("data-duration") && "" != f.attr("data-duration") && (n = Number(f.attr("data-duration")));
        var k = b.initialZoom;
        void 0 != f.attr("data-initialZoom") && "" != f.attr("data-initialZoom") && (k = Number(f.attr("data-initialZoom")));
        var m = b.finalZoom;
        void 0 != f.attr("data-finalZoom") && "" != f.attr("data-finalZoom") && (m = Number(f.attr("data-finalZoom")));
        a.current_imgInside = e("#contentHolderUnit_" + a.current_img_no, g).find("img:first");
        var r = d[a.current_img_no].split(";");
        b.responsive && (r[0] /= b.origWidth / b.width,
        r[1] /= b.origWidth / b.width);
        k != m && (-1 != l && 10 > l ? (b.width100Proc && (n += b.durationIEfix),
        a.curZoom = 1,
        zoomStep = 0,
        a.cur_marginLeft = 0,
        a.cur_marginTop = 0,
        a.msiInitialTime = (new Date).getTime(),
        a.msiInterval = setInterval(function() {
            nowx = (new Date).getTime();
            nowx - a.msiInitialTime > 1E3 * n ? clearInterval(a.msiInterval) : (zoomStep = (nowx - a.msiInitialTime) * Math.abs(k - m) / (1E3 * n),
            a.curZoom = k <= m ? 1 + zoomStep : 1 - zoomStep,
            "center" == h ? a.cur_marginLeft = (1 - a.curZoom) * k * r[0] / 2 : "right" == h && (a.cur_marginLeft = (1 - a.curZoom) * k * r[0]),
            "center" == j ? a.cur_marginTop = (1 - a.curZoom) * k * r[1] / 2 : "bottom" == j && (a.cur_marginTop = (1 - a.curZoom) * k * r[1]),
            a.current_imgInside.css({
                filter: 'progid:DXImageTransform.Microsoft.Matrix(FilterType="bilinear",M11=' + a.curZoom + ", M12=0, M21=0, M22=" + a.curZoom + ", Dx=" + a.cur_marginLeft + ",Dy=" + a.cur_marginTop + ")"
            }))
        }, 25)) : (zoomVal = m / k,
        a.current_imgInside.css({
            "-webkit-transition-duration": n + "s",
            "-moz-transition-duration": n + "s",
            "-o-transition-duration": n + "s",
            "transition-duration": n + "s",
            "-webkit-transition-timing-function": "ease",
            "-moz-transition-timing-function": "ease",
            "-o-transition-timing-function": "ease",
            "transition-timing-function": "ease",
            "-webkit-transform": "scale(" + zoomVal + ") rotate(0.1deg)",
            "-moz-transform": "scale(" + zoomVal + ") rotate(0.1deg)",
            "-o-transform": "scale(" + zoomVal + ")",
            transform: "scale(" + zoomVal + ") rotate(0.1deg)",
            perspective: "0",
            "-webkit-perspective": "0"
        })))
    }
    function T(a, b) {
        nowx = (new Date).getTime();
        !a.mouseOverBanner && b.showCircleTimer && (a.ctx.clearRect(0, 0, a.canvas.width, a.canvas.height),
        a.ctx.beginPath(),
        a.ctx.globalAlpha = b.behindCircleAlpha / 100,
        a.ctx.arc(b.circleRadius + 2 * b.circleLineWidth, b.circleRadius + 2 * b.circleLineWidth, b.circleRadius, 0, 2 * Math.PI, !1),
        a.ctx.lineWidth = b.circleLineWidth + 2,
        a.ctx.strokeStyle = b.behindCircleColor,
        a.ctx.stroke(),
        a.ctx.beginPath(),
        a.ctx.globalAlpha = b.circleAlpha / 100,
        a.ctx.arc(b.circleRadius + 2 * b.circleLineWidth, b.circleRadius + 2 * b.circleLineWidth, b.circleRadius, 0, 2 * ((a.timeElapsed + nowx - a.arcInitialTime) / 1E3) / b.autoPlay * Math.PI, !1),
        a.ctx.lineWidth = b.circleLineWidth,
        a.ctx.strokeStyle = b.circleColor,
        a.ctx.stroke())
    }
    function B(a, b, g, d, f, l, h, j, n, k, m, r, v, C, t, p, s) {
        var x = !0;
        if (!g.loop && b.current_img_no + a >= d || !g.loop && 0 > b.current_img_no + a)
            x = !1;
        x && !b.slideIsRunning && (b.slideIsRunning = !0,
        e(".newFS", k).contents().unwrap(),
        b.arcInitialTime = (new Date).getTime(),
        b.timeElapsed = 0,
        g.showCircleTimer && (clearInterval(b.intervalID),
        b.ctx.clearRect(0, 0, b.canvas.width, b.canvas.height),
        b.ctx.beginPath(),
        b.ctx.globalAlpha = g.behindCircleAlpha / 100,
        b.ctx.arc(g.circleRadius + 2 * g.circleLineWidth, g.circleRadius + 2 * g.circleLineWidth, g.circleRadius, 0, 2 * Math.PI, !1),
        b.ctx.lineWidth = g.circleLineWidth + 2,
        b.ctx.strokeStyle = g.behindCircleColor,
        b.ctx.stroke(),
        b.ctx.beginPath(),
        b.ctx.globalAlpha = g.circleAlpha / 100,
        b.ctx.arc(g.circleRadius + 2 * g.circleLineWidth, g.circleRadius + 2 * g.circleLineWidth, g.circleRadius, 0, 0, !1),
        b.ctx.lineWidth = g.circleLineWidth,
        b.ctx.strokeStyle = g.circleColor,
        b.ctx.stroke(),
        b.intervalID = setInterval(function() {
            T(b, g)
        }, 125)),
        b.bottomNavClicked || (b.previous_current_img_no = b.current_img_no),
        b.bottomNavClicked = !1,
        e(b.currentImg.attr("data-text-id")).css("display", "none"),
        "opportune" == g.skin && e(f[b.current_img_no]).removeClass("bottomNavButtonON"),
        "opportune" != g.skin && e(v[b.current_img_no]).removeClass("thumbsHolder_ThumbON"),
        m.css("display", "none"),
        b.current_img_no = b.current_img_no + a >= d ? 0 : 0 > b.current_img_no + a ? d - 1 : b.current_img_no + a,
        "opportune" == g.skin && e(f[b.current_img_no]).addClass("bottomNavButtonON"),
        "opportune" != g.skin && (e(v[b.current_img_no]).addClass("thumbsHolder_ThumbON"),
        currentCarouselLeft = C.css("left").substr(0, C.css("left").lastIndexOf("px")),
        0 === b.current_img_no || b.current_img_no === d - 1 ? N(0, C, t, p, g, d, s, b) : N(1001, C, t, p, g, d, s, b)),
        g.fadeSlides ? (e("#contentHolderUnit_" + b.current_img_no, k).css({
            opacity: 1,
            "z-index": 0,
            display: "block"
        }),
        e("#contentHolderUnit_" + b.previous_current_img_no, k).css({
            "z-index": 1,
            display: "block"
        }),
        e("#contentHolderUnit_" + b.previous_current_img_no, k).animate({
            opacity: 0
        }, 800, "easeOutQuad", function() {
            b.slideIsRunning = !1;
            g.fadeSlides && (e("#contentHolderUnit_" + b.current_img_no, k).css({
                "z-index": 1
            }),
            e("#contentHolderUnit_" + b.previous_current_img_no, k).css({
                "z-index": 0,
                display: "none"
            }));
            J(b, g, l);
            b.currentImg = e(l[b.current_img_no]);
            M(b, g, k, r, l);
            "true" == b.currentImg.attr("data-video") && m.css("display", "block");
            "true" == e(l[b.previous_current_img_no]).attr("data-video") && e("#contentHolderUnit_" + b.previous_current_img_no, k).html(e(l[b.previous_current_img_no]).html());
            L(b.previous_current_img_no, g, k, r, l);
            K(b, g, h, j);
            0 < g.autoPlay && (1 < d && !b.mouseOverBanner) && (clearTimeout(b.timeoutID),
            b.timeoutID = setTimeout(function() {
                B(1, b, g, d, f, l, h, j, n, k, m, r, v, C, t, p, s)
            }, 1E3 * g.autoPlay))
        })) : n.animate({
            left: -1 * b.current_img_no * g.width + "px"
        }, 800, "easeOutQuad", function() {
            b.slideIsRunning = !1;
            J(b, g, l);
            b.currentImg = e(l[b.current_img_no]);
            M(b, g, k, r, l);
            "true" == b.currentImg.attr("data-video") && m.css("display", "block");
            "true" == e(l[b.previous_current_img_no]).attr("data-video") && e("#contentHolderUnit_" + b.previous_current_img_no, k).html(e(l[b.previous_current_img_no]).html());
            L(b.previous_current_img_no, g, k, r, l);
            K(b, g, h, j);
            0 < g.autoPlay && (1 < d && !b.mouseOverBanner) && (clearTimeout(b.timeoutID),
            b.timeoutID = setTimeout(function() {
                B(1, b, g, d, f, l, h, j, n, k, m, r, v, C, t, p, s)
            }, 1E3 * g.autoPlay))
        }))
    }
    function N(a, b, e, d, f, l, h, j) {
        currentCarouselLeft = b.css("left").substr(0, b.css("left").lastIndexOf("px"));
        1 === a || -1 === a ? (j.isCarouselScrolling = !0,
        b.css("opacity", "0.5"),
        b.animate({
            opacity: 1,
            left: "+=" + a * j.carouselStep
        }, 500, "easeOutCubic", function() {
            I(j, b, e, d, f, l, h);
            j.isCarouselScrolling = !1
        })) : currentCarouselLeft != -1 * Math.floor(j.current_img_no / f.numberOfThumbsPerScreen) * j.carouselStep && (j.isCarouselScrolling = !0,
        b.css("opacity", "0.5"),
        b.animate({
            opacity: 1,
            left: -1 * Math.floor(j.current_img_no / f.numberOfThumbsPerScreen) * j.carouselStep
        }, 500, "easeOutCubic", function() {
            I(j, b, e, d, f, l, h);
            j.isCarouselScrolling = !1
        }))
    }
    function I(a, b, e, d, f, l, h) {
        currentCarouselLeft = b.css("left").substr(0, b.css("left").lastIndexOf("px"));
        0 > currentCarouselLeft ? e.hasClass("carouselLeftNavDisabled") && e.removeClass("carouselLeftNavDisabled") : e.addClass("carouselLeftNavDisabled");
        Math.abs(currentCarouselLeft - a.carouselStep) < (h.width() + a.thumbMarginLeft) * l ? d.hasClass("carouselRightNavDisabled") && d.removeClass("carouselRightNavDisabled") : d.addClass("carouselRightNavDisabled")
    }
    function U(a, b, g, d, f, l, h, j, n, k, m) {
        "opportune" != b.skin && (m.css({
            top: b.height + "px",
            "margin-top": parseInt(b.thumbsWrapperMarginTop / (b.origWidth / b.width), 10) + "px",
            height: parseInt(b.origthumbsHolderWrapperH / (b.origWidth / b.width), 10) + "px"
        }),
        bgTopCorrection = 0,
        h.css("background-position", "0px " + ((m.height() - b.origthumbsHolderWrapperH) / 2 + bgTopCorrection) + "px"),
        j.css("background-position", "0px " + ((m.height() - b.origthumbsHolderWrapperH) / 2 + bgTopCorrection) + "px"),
        k.css("width", b.width - h.width() - j.width()),
        b.origWidthThumbsHolderVisibleWrapper = b.origWidth - h.width() - j.width(),
        f.css({
            width: parseInt(b.origThumbW / (b.origWidthThumbsHolderVisibleWrapper / k.width()), 10) + "px",
            height: parseInt(b.origThumbH / (b.origWidthThumbsHolderVisibleWrapper / k.width()), 10) + "px"
        }),
        b.numberOfThumbsPerScreen >= g && k.css("left", parseInt((m.width() - (n.width() + a.thumbMarginLeft) * g) / 2, 10) + "px"),
        e(".thumbsHolder_ThumbOFF", d).find("img:first").css({
            width: f.width() + "px",
            height: f.height() + "px",
            "margin-top": parseInt((m.height() - f.height()) / 2, 10) + "px"
        }),
        a.thumbMarginLeft = Math.floor((m.width() - h.width() - j.width() - n.width() * b.numberOfThumbsPerScreen) / (b.numberOfThumbsPerScreen - 1)),
        thumb_i = -1,
        l.children().each(function() {
            thumb_i++;
            theThumb = e(this);
            theThumb.css("background-position", "center " + b.thumbsOnMarginTop / (b.origWidth / b.width) + "px");
            0 >= thumb_i ? theThumb.css("margin-left", Math.floor((m.width() - h.width() - j.width() - (a.thumbMarginLeft + theThumb.width()) * (b.numberOfThumbsPerScreen - 1) - theThumb.width()) / 2) + "px") : theThumb.css("margin-left", a.thumbMarginLeft + "px")
        }),
        a.carouselStep = (n.width() + a.thumbMarginLeft) * b.numberOfThumbsPerScreen)
    }
    function F() {
        var a = -1;
        "Microsoft Internet Explorer" == navigator.appName && null != /MSIE ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) && (a = parseFloat(RegExp.$1));
        return parseInt(a, 10)
    }
    e.fn.bannerscollection_zoominout = function(a) {
        a = e.extend({}, e.fn.bannerscollection_zoominout.defaults, a);
        return this.each(function() {
            var b = e(this);
            responsiveWidth = b.parent().width();
            responsiveHeight = b.parent().height();
            a.responsiveRelativeToBrowser && (responsiveWidth = e(window).width(),
            responsiveHeight = e(window).height());
            a.origWidth = a.width;
            a.width100Proc && (a.width = responsiveWidth);
            a.origHeight = a.height;
            a.height100Proc && (a.height = responsiveHeight);
            if (a.responsive && (a.origWidth != responsiveWidth || a.width100Proc))
                a.width = a.origWidth > responsiveWidth || a.width100Proc ? responsiveWidth : a.origWidth,
                a.height100Proc || (a.height = a.width / (a.origWidth / a.origHeight));
            a.enableTouchScreen && (a.responsive && a.fadeSlides) && (a.width -= 1);
            var g = e("<div></div>").addClass("bannerscollection_zoominout").addClass(a.skin)
              , d = e('<div class="bannerControls"> <div class="leftNav"></div> <div class="rightNav"></div> </div> <div class="contentHolderVisibleWrapper"><div class="contentHolder"></div></div> <div class="playOver"></div> <div class="thumbsHolderWrapper"><div class="thumbsHolderVisibleWrapper"><div class="thumbsHolder"></div></div></div> <canvas class="mycanvas"></canvas>');
            b.wrap(g);
            b.after(d);
            var f = b.parent(".bannerscollection_zoominout")
              , l = e(".bannerControls", f)
              , h = e(".contentHolderVisibleWrapper", f)
              , j = e(".contentHolder", f)
              , g = e('<div class="bottomNav"></div>');
            b.after(g);
            a.showAllControllers || l.css("display", "none");
            var n = e(".leftNav", f)
              , k = e(".rightNav", f);
            n.css("display", "none");
            k.css("display", "none");
            a.showNavArrows && a.showOnInitNavArrows && (n.css("display", "block"),
            k.css("display", "block"));
            var m = e(".bottomNav", f), r;
            "opportune" == a.skin && (m.css({
                display: "block",
                top: a.height + "px"
            }),
            a.width100Proc && a.height100Proc ? m.css("margin-top", a.thumbsWrapperMarginTop + "px") : m.css("margin-top", a.thumbsWrapperMarginTop / (a.origWidth / a.width) + "px"));
            a.showBottomNav || m.css("display", "none");
            a.showOnInitBottomNav || m.css("left", "-5000px");
            var v = e(".thumbsHolderWrapper", f), C = e(".thumbsHolderVisibleWrapper", f), t = e(".thumbsHolder", f), p, s;
            p = e('<div class="carouselLeftNav"></div>');
            s = e('<div class="carouselRightNav"></div>');
            v.append(p);
            v.append(s);
            s.css("right", "0");
            t.css("width", p.width() + "px");
            (!a.showBottomNav || !a.showOnInitBottomNav) && v.css({
                opacity: 0,
                display: "none"
            });
            "opportune" != a.skin && v.css("margin-top", parseInt(a.thumbsWrapperMarginTop / (a.origWidth / a.width), 10) + "px");
            g = F();
            a.enableTouchScreen && (a.fadeSlides && (d = Math.floor(1E5 * Math.random()),
            f.wrap('<div id="zoominoutParent_' + d + '" style="position:relative;" />'),
            e("#zoominoutParent_" + d).width(a.width + 1),
            e("#zoominoutParent_" + d).height(a.height)),
            -1 != g && 9 == g && a.fadeSlides && "opportune" == a.skin || (j.css("cursor", "url(" + a.absUrl + "skins/hand.cur),url(" + a.absUrl + "skins/hand.cur),move"),
            f.css("cursor", "url(" + a.absUrl + "skins/hand.cur),url(" + a.absUrl + "skins/hand.cur),move")),
            j.css("left", "0"),
            a.fadeSlides ? -1 != g && 9 == g && a.fadeSlides && "opportune" == a.skin || f.draggable({
                axis: "x",
                containment: "parent",
                start: function() {
                    origLeft = e(this).css("left");
                    x.css("display", "none")
                },
                stop: function() {
                    c.slideIsRunning || (finalLeft = e(this).css("left"),
                    direction = 1,
                    origLeft < finalLeft && (direction = -1),
                    e(this).css("left", "0px"),
                    B(direction, c, a, q, z, w, b, l, j, f, x, A, y, t, p, s, u))
                }
            }) : j.draggable({
                axis: "x",
                distance: 10,
                start: function() {
                    origLeft = parseInt(e(this).css("left"), 10);
                    x.css("display", "none")
                },
                stop: function() {
                    c.slideIsRunning || (finalLeft = parseInt(e(this).css("left"), 10),
                    direction = 1,
                    origLeft < finalLeft && (direction = -1),
                    B(direction, c, a, q, z, w, b, l, j, f, x, A, y, t, p, s, u))
                }
            }));
            var x = e(".playOver", f);
            x.css({
                left: parseInt((a.width - x.width()) / 2, 10) + "px",
                top: parseInt((a.height - x.height()) / 2, 10) + "px"
            });
            var c = {
                current_img_no: 0,
                currentImg: 0,
                previous_current_img_no: 0,
                slideIsRunning: !1,
                mouseOverBanner: !1,
                isVideoPlaying: !1,
                bottomNavClicked: !1,
                current_imgInside: "",
                windowWidth: 0,
                carouselStep: 0,
                thumbMarginLeft: 0,
                timeoutID: "",
                intervalID: "",
                arcInitialTime: (new Date).getTime(),
                timeElapsed: 0,
                canvas: "",
                ctx: "",
                bannerRatio: a.origWidth / a.origHeight,
                msiInterval: "",
                msiInitialTime: (new Date).getTime(),
                curZoom: 0,
                cur_marginLeft: 0,
                cur_marginTop: 0
            };
            c.canvas = e(".mycanvas", f)[0];
            c.canvas.width = 2 * a.circleRadius + 4 * a.circleLineWidth;
            c.canvas.height = 2 * a.circleRadius + 4 * a.circleLineWidth;
            -1 != g && 9 > g && (a.showCircleTimer = !1);
            a.showCircleTimer && (c.ctx = c.canvas.getContext("2d"));
            var A = []
              , P = 0;
            f.width(a.width);
            f.height(a.height);
            h.width(a.width);
            h.height(a.height);
            j.width(a.width);
            j.height(a.height);
            l.css("margin-top", parseInt((a.height - n.height()) / 2, 10) + "px");
            var q = 0, w = b.find("ul:first").children(), G, Q = 0, D, H = 0, I = 0, E, u, R = 0, V = 0;
            w.each(function() {
                c.currentImg = e(this);
                c.currentImg.is("li") || (c.currentImg = c.currentImg.find("li:first"));
                c.currentImg.is("li") && (q++,
                myzindex = 0,
                mydisplay = "none",
                1 == q && (myzindex = 1,
                mydisplay = "block"),
                G = e('<div class="contentHolderUnit" rel="' + (q - 1) + '" id="contentHolderUnit_' + (q - 1) + '">' + c.currentImg.html() + "</div>"),
                a.fadeSlides ? G.css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    "z-index": myzindex,
                    display: mydisplay
                }) : G.css({
                    position: "relative",
                    "float": "left"
                }),
                G.width(a.width),
                G.height(a.height),
                j.append(G),
                Q += a.width,
                c.current_img_no = q - 1,
                E = e("#contentHolderUnit_" + c.current_img_no, f).find("img:first"),
                A[q - 1] = E.width() + ";" + E.height(),
                L(q - 1, a, f, A, w),
                "opportune" == a.skin && (D = e('<div class="bottomNavButtonOFF" rel="' + (q - 1) + '"></div>'),
                m.append(D),
                H += parseInt(D.css("padding-left").substring(0, D.css("padding-left").length - 2), 10) + D.width(),
                I = parseInt((m.height() - parseInt(D.css("height").substring(0, D.css("height").length - 2))) / 2, 10),
                D.css("margin-top", I + "px")),
                "opportune" != a.skin && (image_name = e(w[q - 1]).attr("data-bottom-thumb"),
                u = e('<div class="thumbsHolder_ThumbOFF" rel="' + (q - 1) + '"><img src="' + image_name + '"></div>'),
                t.append(u),
                0 == a.origThumbW && (0 == a.numberOfThumbsPerScreen && (a.numberOfThumbsPerScreen = Math.floor((a.origWidth - p.width() - s.width()) / u.width())),
                a.origThumbW = u.width(),
                a.origThumbH = u.height(),
                a.origthumbsHolderWrapperH = v.height(),
                c.thumbMarginLeft = Math.floor((a.origWidth - p.width() - s.width() - u.width() * a.numberOfThumbsPerScreen) / (a.numberOfThumbsPerScreen - 1))),
                t.css("width", t.width() + c.thumbMarginLeft + u.width() + "px"),
                R = parseInt((v.height() - parseInt(u.css("height").substring(0, u.css("height").length - 2))) / 2, 10)),
                V = a.fadeSlides ? 0 : parseInt((q - 1) * a.width, 10),
                j.append(e(c.currentImg.attr("data-text-id"))),
                e(c.currentImg.attr("data-text-id")).css({
                    width: b.width() + "px",
                    left: V,
                    top: l.css("top")
                }))
            });
            j.width(Q);
            m.width(H);
            a.showOnInitBottomNav && m.css("left", parseInt((f.width() - H) / 2, 10) + "px");
            "opportune" != a.skin && (C.css({
                width: a.origWidth - p.width() - s.width(),
                left: p.width() + "px"
            }),
            c.carouselStep = (u.width() + c.thumbMarginLeft) * a.numberOfThumbsPerScreen,
            p.addClass("carouselLeftNavDisabled"),
            a.numberOfThumbsPerScreen >= q && (s.addClass("carouselRightNavDisabled"),
            p.css("display", "none"),
            s.css("display", "none"),
            C.css("left", parseInt((v.width() - (u.width() + c.thumbMarginLeft) * q) / 2, 10) + "px")),
            v.css("top", a.height + "px"),
            e(".thumbsHolder_ThumbOFF", f).find("img:first").css("margin-top", R + "px"),
            a.origthumbsHolder_MarginTop = R);
            var y = e(".thumbsHolder_ThumbOFF", f);
            U(c, a, q, f, y, t, p, s, u, C, v);
            e("iframe", f).each(function() {
                var a = e(this).attr("src")
                  , b = "?wmode=transparent";
                -1 != a.indexOf("?") && (b = "&wmode=transparent");
                e(this).attr("src", a + b)
            });
            c.current_img_no = 0;
            c.currentImg = e(w[0]);
            g = f.find("img:first");
            g[0].complete ? (e(".myloader", f).css("display", "none"),
            M(c, a, f, A, w),
            K(c, a, b, l)) : g.load(function() {
                e(".myloader", f).css("display", "none");
                M(c, a, f, A, w);
                K(c, a, b, l)
            });
            f.mouseenter(function() {
                a.pauseOnMouseOver && (c.mouseOverBanner = !0,
                clearTimeout(c.timeoutID),
                nowx = (new Date).getTime(),
                c.timeElapsed += nowx - c.arcInitialTime);
                a.autoHideNavArrows && a.showNavArrows && (n.css("display", "block"),
                k.css("display", "block"));
                a.autoHideBottomNav && a.showBottomNav && ("opportune" == a.skin ? m.css({
                    display: "block",
                    left: parseInt((f.width() - H) / 2, 10) + "px"
                }) : !(0 > a.thumbsWrapperMarginTop && c.isVideoPlaying) && a.showBottomNav && (v.css({
                    display: "block"
                }),
                v.stop().animate({
                    opacity: 1
                }, 500, "swing", function() {})))
            });
            f.mouseleave(function() {
                a.pauseOnMouseOver && (c.mouseOverBanner = !1,
                nowx = (new Date).getTime());
                a.autoHideNavArrows && (a.showNavArrows && !c.isVideoPlaying) && (n.css("display", "none"),
                k.css("display", "none"));
                a.autoHideBottomNav && a.showBottomNav && ("opportune" == a.skin ? m.css("display", "none") : v.stop().animate({
                    opacity: 0
                }, 300, "swing", function() {}));
                if (0 < a.autoPlay && 1 < q && !c.isVideoPlaying && a.pauseOnMouseOver) {
                    clearTimeout(c.timeoutID);
                    c.arcInitialTime = (new Date).getTime();
                    var e = parseInt(1E3 * a.autoPlay - (c.timeElapsed + nowx - c.arcInitialTime), 10);
                    c.timeoutID = setTimeout(function() {
                        B(1, c, a, q, z, w, b, l, j, f, x, A, y, t, p, s, u)
                    }, e)
                }
            });
            g = e(".contentHolderUnit", j);
            -1 != navigator.userAgent.indexOf("Safari") && -1 == navigator.userAgent.indexOf("Chrome") && -1 == navigator.userAgent.indexOf("Android") ? g.css("z-index", "1") : -1 != navigator.userAgent.indexOf("Chrome") && -1 == navigator.userAgent.indexOf("Android") && g.css("z-index", "1");
            g.click(function() {
                var b = e(this).attr("rel");
                "true" == e(w[c.current_img_no]).attr("data-video") && (b != c.current_img_no ? c.isVideoPlaying = !1 : (clearTimeout(c.timeoutID),
                J(c, a, w),
                E = e(this).find("img:first"),
                E.css("display", "none"),
                x.css("display", "none"),
                e(c.currentImg.attr("data-text-id")).children().css("opacity", 0),
                c.isVideoPlaying = !0,
                0 > a.thumbsWrapperMarginTop && (v.css("display", "none"),
                "opportune" == a.skin && m.css("display", "none")),
                a.showCircleTimer && (clearInterval(c.intervalID),
                c.ctx.clearRect(0, 0, c.canvas.width, c.canvas.height),
                c.ctx.beginPath(),
                c.ctx.globalAlpha = 0,
                c.ctx.arc(a.circleRadius + 2 * a.circleLineWidth, a.circleRadius + 2 * a.circleLineWidth, a.circleRadius, 0, 0, !1),
                c.ctx.lineWidth = a.circleLineWidth + 2,
                c.ctx.strokeStyle = a.behindCircleColor,
                c.ctx.stroke(),
                c.ctx.beginPath(),
                c.ctx.globalAlpha = 0,
                c.ctx.arc(a.circleRadius + 2 * a.circleLineWidth, a.circleRadius + 2 * a.circleLineWidth, a.circleRadius, 0, 0, !1),
                c.ctx.lineWidth = a.circleLineWidth,
                c.ctx.strokeStyle = a.circleColor,
                c.ctx.stroke())));
                var f = e(w[c.current_img_no]);
                void 0 != f.attr("data-link") && (b == c.current_img_no && "" != f.attr("data-link")) && (b = a.target,
                void 0 != f.attr("data-target") && "" != f.attr("data-target") && (b = f.attr("data-target")),
                "_blank" == b ? window.open(f.attr("data-link")) : window.location = f.attr("data-link"))
            });
            x.click(function() {
                x.css("display", "none");
                clearTimeout(c.timeoutID);
                J(c, a, w);
                E = e("#contentHolderUnit_" + c.current_img_no, f).find("img:first");
                E.css("display", "none");
                e(c.currentImg.attr("data-text-id")).children().css("opacity", 0);
                c.isVideoPlaying = !0;
                0 > a.thumbsWrapperMarginTop && (v.css("display", "none"),
                "opportune" == a.skin && m.css("display", "none"));
                a.showCircleTimer && (clearInterval(c.intervalID),
                c.ctx.clearRect(0, 0, c.canvas.width, c.canvas.height),
                c.ctx.beginPath(),
                c.ctx.globalAlpha = 0,
                c.ctx.arc(a.circleRadius + 2 * a.circleLineWidth, a.circleRadius + 2 * a.circleLineWidth, a.circleRadius, 0, 0, !1),
                c.ctx.lineWidth = a.circleLineWidth + 2,
                c.ctx.strokeStyle = a.behindCircleColor,
                c.ctx.stroke(),
                c.ctx.beginPath(),
                c.ctx.globalAlpha = 0,
                c.ctx.arc(a.circleRadius + 2 * a.circleLineWidth, a.circleRadius + 2 * a.circleLineWidth, a.circleRadius, 0, 0, !1),
                c.ctx.lineWidth = a.circleLineWidth,
                c.ctx.strokeStyle = a.circleColor,
                c.ctx.stroke())
            });
            n.click(function() {
                c.slideIsRunning || (c.isVideoPlaying = !1,
                a.showBottomNav && (v.css({
                    opacity: 1,
                    display: "block"
                }),
                "opportune" == a.skin && m.css("display", "block")),
                clearTimeout(c.timeoutID),
                B(-1, c, a, q, z, w, b, l, j, f, x, A, y, t, p, s, u))
            });
            k.click(function() {
                c.slideIsRunning || (c.isVideoPlaying = !1,
                a.showBottomNav && (v.css({
                    opacity: 1,
                    display: "block"
                }),
                "opportune" == a.skin && m.css("display", "block")),
                clearTimeout(c.timeoutID),
                B(1, c, a, q, z, w, b, l, j, f, x, A, y, t, p, s, u))
            });
            var S = !1;
            e(window).resize(function() {
                var g = F();
                doResizeNow = !0;
                -1 != navigator.userAgent.indexOf("Android") && (0 == a.windowOrientationScreenSize0 && 0 == window.orientation && (a.windowOrientationScreenSize0 = e(window).width()),
                0 == a.windowOrientationScreenSize90 && 90 == window.orientation && (a.windowOrientationScreenSize90 = e(window).height()),
                0 == a.windowOrientationScreenSize_90 && -90 == window.orientation && (a.windowOrientationScreenSize_90 = e(window).height()),
                a.windowOrientationScreenSize0 && (0 == window.orientation && e(window).width() > a.windowOrientationScreenSize0) && (doResizeNow = !1),
                a.windowOrientationScreenSize90 && (90 == window.orientation && e(window).height() > a.windowOrientationScreenSize90) && (doResizeNow = !1),
                a.windowOrientationScreenSize_90 && (-90 == window.orientation && e(window).height() > a.windowOrientationScreenSize_90) && (doResizeNow = !1),
                0 == c.windowWidth && (doResizeNow = !1,
                c.windowWidth = e(window).width()));
                -1 != g && (9 == g && 0 == c.windowWidth) && (doResizeNow = !1);
                c.windowWidth == e(window).width() ? (doResizeNow = !1,
                a.windowCurOrientation != window.orientation && -1 != navigator.userAgent.indexOf("Android") && (a.windowCurOrientation = window.orientation,
                doResizeNow = !0)) : c.windowWidth = e(window).width();
                a.responsive && doResizeNow && (!1 !== S && clearTimeout(S),
                S = setTimeout(function() {
                    var g = c
                      , d = a
                      , k = q
                      , r = w
                      , O = x
                      , D = A
                      , E = y
                      , G = z
                      , F = u;
                    if (d.width100Proc && d.height100Proc) {
                        var I = e("body").css("overflow");
                        e("body").css("overflow", "hidden")
                    }
                    var H = 0;
                    d.enableTouchScreen && d.fadeSlides ? (responsiveWidth = b.parent().parent().parent().width(),
                    responsiveHeight = b.parent().parent().parent().height()) : (responsiveWidth = b.parent().parent().width(),
                    responsiveHeight = b.parent().parent().height());
                    d.responsiveRelativeToBrowser && (responsiveWidth = e(window).width(),
                    responsiveHeight = e(window).height());
                    d.width100Proc && (d.width = responsiveWidth);
                    d.height100Proc && (d.height = responsiveHeight);
                    if (d.origWidth != responsiveWidth || d.width100Proc) {
                        d.origWidth > responsiveWidth || d.width100Proc ? d.width = responsiveWidth : d.width100Proc || (d.width = d.origWidth);
                        d.height100Proc || (d.height = d.width / g.bannerRatio);
                        d.enableTouchScreen && (d.responsive && d.fadeSlides) && (d.width -= 1);
                        f.width(d.width);
                        f.height(d.height);
                        h.width(d.width);
                        h.height(d.height);
                        j.width(d.width);
                        j.height(d.height);
                        l.css("margin-top", parseInt((d.height - n.height()) / 2, 10) + "px");
                        J(g, d, r);
                        contentHolderUnit = e(".contentHolderUnit", f);
                        contentHolderUnit.width(d.width);
                        contentHolderUnit.height(d.height);
                        d.enableTouchScreen && d.fadeSlides && (f.parent().width(d.width + 1),
                        f.parent().height(d.height));
                        holderWidth = d.width * k;
                        for (i = 0; i < k; i++)
                            L(i, d, f, D, r),
                            H = d.fadeSlides ? 0 : parseInt(i * d.width, 10),
                            e(e(r[i]).attr("data-text-id")).css({
                                width: b.width() + "px",
                                left: H,
                                top: l.css("top")
                            });
                        j.width(holderWidth);
                        "opportune" == d.skin ? (m.css({
                            left: parseInt((f.width() - m.width()) / 2, 10) + "px",
                            top: d.height + "px"
                        }),
                        (!d.width100Proc || !d.height100Proc) && m.css("margin-top", parseInt(d.thumbsWrapperMarginTop / (d.origWidth / d.width), 10) + "px")) : U(g, d, k, f, E, t, p, s, F, C, v);
                        O.css({
                            left: parseInt((d.width - O.width()) / 2, 10) + "px",
                            top: parseInt((d.height - O.height()) / 2, 10) + "px"
                        });
                        clearTimeout(g.timeoutID);
                        B(1, g, d, k, G, r, b, l, j, f, O, D, E, t, p, s, F)
                    }
                    d.width100Proc && d.height100Proc && e("body").css("overflow", I)
                }, 300))
            });
            var z = e(".bottomNavButtonOFF", f);
            "opportune" == a.skin && (z.click(function() {
                if (!c.slideIsRunning) {
                    c.isVideoPlaying = !1;
                    var d = e(this).attr("rel");
                    c.current_img_no != d && (e(z[c.current_img_no]).removeClass("bottomNavButtonON"),
                    c.previous_current_img_no = c.current_img_no,
                    c.bottomNavClicked = !0,
                    c.current_img_no = d - 1,
                    clearTimeout(c.timeoutID),
                    B(1, c, a, q, z, w, b, l, j, f, x, A, y, t, p, s, u))
                }
            }),
            z.mouseenter(function() {
                var b = e(this)
                  , c = b.attr("rel");
                if (a.showPreviewThumbs) {
                    r = e('<div class="bottomOverThumb"></div>');
                    b.append(r);
                    var d = e(w[c]).attr("data-bottom-thumb")
                      , f = e(w[P]).attr("data-bottom-thumb")
                      , g = 80
                      , h = -80;
                    P > c && (g = -80,
                    h = 80);
                    r.html("");
                    r.html('<div class="innerBottomOverThumb"><img src="' + f + '"style="margin:0px;" id="oldThumb"><img src="' + d + '" style="margin-top:-80px; margin-left:' + g + 'px;" id="newThumb"></div>');
                    e("#newThumb").stop().animate({
                        marginLeft: "0px"
                    }, 150, function() {
                        r.html('<div class="innerBottomOverThumb"><img src="' + d + '"></div>')
                    });
                    e("#oldThumb").stop().animate({
                        marginLeft: h + "px"
                    }, 150, function() {});
                    P = c
                }
                b.addClass("bottomNavButtonON")
            }),
            z.mouseleave(function() {
                var b = e(this)
                  , d = b.attr("rel");
                a.showPreviewThumbs && r.remove();
                c.current_img_no != d && b.removeClass("bottomNavButtonON")
            }));
            y.mousedown(function() {
                if (!c.slideIsRunning) {
                    arrowClicked = !0;
                    c.isVideoPlaying = !1;
                    var d = e(this).attr("rel");
                    c.current_img_no != d && (e(y[c.current_img_no]).removeClass("thumbsHolder_ThumbON"),
                    c.previous_current_img_no = c.current_img_no,
                    c.bottomNavClicked = !0,
                    c.current_img_no = d - 1,
                    clearTimeout(c.timeoutID),
                    B(1, c, a, q, z, w, b, l, j, f, x, A, y, t, p, s, u))
                }
            });
            y.mouseup(function() {
                arrowClicked = !1
            });
            y.mouseenter(function() {
                var a = e(this);
                a.attr("rel");
                a.addClass("thumbsHolder_ThumbON")
            });
            y.mouseleave(function() {
                var a = e(this)
                  , b = a.attr("rel");
                c.current_img_no != b && a.removeClass("thumbsHolder_ThumbON")
            });
            p.click(function() {
                c.isCarouselScrolling || (currentCarouselLeft = t.css("left").substr(0, t.css("left").lastIndexOf("px")),
                0 > currentCarouselLeft && N(1, t, p, s, a, q, u, c))
            });
            s.click(function() {
                c.isCarouselScrolling || (currentCarouselLeft = t.css("left").substr(0, t.css("left").lastIndexOf("px")),
                Math.abs(currentCarouselLeft - c.carouselStep) < (u.width() + c.thumbMarginLeft) * q && N(-1, t, p, s, a, q, u, c))
            });
            "opportune" == a.skin && e(z[c.current_img_no]).addClass("bottomNavButtonON");
            e(y[c.current_img_no]).addClass("thumbsHolder_ThumbON");
            0 < a.autoPlay && 1 < q && (a.showCircleTimer && (c.intervalID = setInterval(function() {
                T(c, a)
            }, 125)),
            c.timeoutID = setTimeout(function() {
                B(1, c, a, q, z, w, b, l, j, f, x, A, y, t, p, s, u)
            }, 1E3 * a.autoPlay));
            "true" == e(w[c.current_img_no]).attr("data-video") && x.css("display", "block")
        })
    }
    ;
    e.fn.bannerscollection_zoominout.defaults = {
        skin: "opportune",
        width: 918,
        height: 382,
        width100Proc: !1,
        height100Proc: !1,
        autoPlay: 16,
        fadeSlides: !0,
        loop: !0,
        horizontalPosition: "center",
        verticalPosition: "center",
        initialZoom: 1,
        finalZoom: 0.8,
        duration: 20,
        durationIEfix: 30,
        initialOpacity: 1,
        target: "_blank",
        pauseOnMouseOver: !0,
        showCircleTimer: !0,
        showCircleTimerIE8IE7: !1,
        circleRadius: 10,
        circleLineWidth: 4,
        circleColor: "#FF0000",
        circleAlpha: 100,
        behindCircleColor: "#000000",
        behindCircleAlpha: 50,
        responsive: !0,
        responsiveRelativeToBrowser: !0,
        numberOfThumbsPerScreen: 0,
        thumbsOnMarginTop: 0,
        thumbsWrapperMarginTop: 0,
        showAllControllers: !0,
        showNavArrows: !0,
        showOnInitNavArrows: !0,
        autoHideNavArrows: !0,
        showBottomNav: !0,
        showOnInitBottomNav: !0,
        autoHideBottomNav: !1,
        showPreviewThumbs: !0,
        enableTouchScreen: !0,
        absUrl: "",
        origWidth: 0,
        origHeight: 0,
        origThumbW: 0,
        origThumbH: 0,
        origthumbsHolderWrapperH: 0,
        origthumbsHolder_MarginTop: 0,
        windowOrientationScreenSize0: 0,
        windowOrientationScreenSize90: 0,
        windowOrientationScreenSize_90: 0,
        windowCurOrientation: 0
    }
}
)(jQuery);
