/* jQuery Form Styler v1.3.3 | (c) Dimox | http://dimox.name/jquery-form-styler/ */
(function(d) {
    d.fn.styler = function(n) {
        n = d.extend({
            idSuffix: "-styler",
            browseText: "\u0412\u044b\u0431\u0440\u0430\u0442\u044c",
            selectVisibleOptions: 0,
            singleSelectzIndex: "100",
            selectSmartPositioning: !0
        }, n);
        return this.each(function() {
            var a = d(this)
              , l = ""
              , q = ""
              , r = ""
              , m = "";
            void 0 !== a.attr("id") && "" != a.attr("id") && (l = ' id="' + a.attr("id") + n.idSuffix + '"');
            void 0 !== a.attr("class") && "" != a.attr("class") && (q = " " + a.attr("class"));
            void 0 !== a.attr("style") && "" != a.attr("style") && (m = " " + a.attr("style"));
            var s = a.data(), e;
            for (e in s)
                "" != s[e] && (r += " data-" + e + '="' + s[e] + '"');
            l += r;
            a.is(":checkbox") ? a.css({
                position: "absolute",
                left: -9999
            }).each(function() {
                if (1 > a.next("span.jq-checkbox").length) {
                    var b = d("<span" + l + ' class="jq-checkbox' + q + '" style="display: inline-block;' + m + '"><span></span></span>');
                    a.after(b);
                    a.is(":checked") && b.addClass("checked");
                    a.is(":disabled") && b.addClass("disabled");
                    b.click(function() {
                        if (!b.is(".disabled"))
                            return a.is(":checked") ? (a.prop("checked", !1),
                            b.removeClass("checked")) : (a.prop("checked", !0),
                            b.addClass("checked")),
                            a.change(),
                            !1
                    });
                    a.parent("label").add('label[for="' + a.attr("id") + '"]').click(function(a) {
                        b.click();
                        a.preventDefault()
                    });
                    a.change(function() {
                        a.is(":checked") ? b.addClass("checked") : b.removeClass("checked")
                    }).keydown(function(d) {
                        a.parent("label").length && (13 == d.which || 32 == d.which) && b.click()
                    }).focus(function() {
                        b.is(".disabled") || b.addClass("focused")
                    }).blur(function() {
                        b.removeClass("focused")
                    });
                    a.on("refresh", function() {
                        a.is(":checked") ? b.addClass("checked") : b.removeClass("checked");
                        a.is(":disabled") ? b.addClass("disabled") : b.removeClass("disabled")
                    })
                }
            }) : a.is(":radio") ? a.css({
                position: "absolute",
                left: -9999
            }).each(function() {
                if (1 > a.next("span.jq-radio").length) {
                    var b = d("<span" + l + ' class="jq-radio' + q + '" style="display: inline-block"><span></span></span>');
                    a.after(b);
                    a.is(":checked") && b.addClass("checked");
                    a.is(":disabled") && b.addClass("disabled");
                    b.click(function() {
                        if (!b.is(".disabled"))
                            return d('input[name="' + a.attr("name") + '"]').prop("checked", !1).next().removeClass("checked"),
                            a.prop("checked", !0).next().addClass("checked"),
                            a.change(),
                            !1
                    });
                    a.parent("label").add('label[for="' + a.attr("id") + '"]').click(function(a) {
                        b.click();
                        a.preventDefault()
                    });
                    a.change(function() {
                        d('input[name="' + a.attr("name") + '"]').next().removeClass("checked");
                        a.next().addClass("checked")
                    }).focus(function() {
                        b.is(".disabled") || b.addClass("focused")
                    }).blur(function() {
                        b.removeClass("focused")
                    });
                    a.on("refresh", function() {
                        a.is(":checked") ? (d('input[name="' + a.attr("name") + '"]').next().removeClass("checked"),
                        b.addClass("checked")) : b.removeClass("checked");
                        a.is(":disabled") ? b.addClass("disabled") : b.removeClass("disabled")
                    })
                }
            }) : a.is(":file") ? a.css({
                position: "absolute",
                top: "-50%",
                right: "-50%",
                fontSize: "200px",
                opacity: 0
            }).each(function() {
                if (1 > a.parent("span.jq-file").length) {
                    var b = d("<span" + l + ' class="jq-file' + q + '" style="display: inline-block; position: relative; overflow: hidden"><span class="file_btn">Прикрепить файлы</span></span>')
                      , e = d('<div class="name" style="float: left; white-space: nowrap"></div>').appendTo(b);
                    d('<div class="browse" style="float: left">' + n.browseText + "</div>").appendTo(b);
                    a.after(b);
                    b.append(a);
                    a.is(":disabled") && b.addClass("disabled");
                    a.change(function() {
                        e.text(a.val().replace(/.+[\\\/]/, ""))
                    }).focus(function() {
                        b.addClass("focused")
                    }).blur(function() {
                        b.removeClass("focused")
                    }).click(function() {
                        b.removeClass("focused")
                    }).on("refresh", function() {
                        a.is(":disabled") ? b.addClass("disabled") : b.removeClass("disabled")
                    })
                }
            }) : a.is("select") && a.each(function() {
                if (1 > a.next("span.jqselect").length) {
                    var b = function() {
                        function b(a) {
                            a.bind("mousewheel DOMMouseScroll", function(a) {
                                var b = null;
                                "mousewheel" == a.type ? b = -1 * a.originalEvent.wheelDelta : "DOMMouseScroll" == a.type && (b = 40 * a.originalEvent.detail);
                                b && (a.preventDefault(),
                                d(this).scrollTop(b + d(this).scrollTop()))
                            })
                        }
                        function r() {
                            for (e = 0; e < f.length; e++) {
                                var a = ""
                                  , b = ""
                                  , d = ""
                                  , c = "";
                                f.eq(e).prop("selected") && (b = "selected sel");
                                f.eq(e).is(":disabled") && (b = "disabled");
                                f.eq(e).is(":selected:disabled") && (b = "selected sel disabled");
                                void 0 !== f.eq(e).attr("class") && (d = " " + f.eq(e).attr("class"));
                                a = '<li class="' + b + d + '">' + f.eq(e).text() + "</li>";
                                f.eq(e).parent().is("optgroup") && (void 0 !== f.eq(e).parent().attr("class") && (c = " " + f.eq(e).parent().attr("class")),
                                a = '<li class="' + b + d + " option" + c + '">' + f.eq(e).text() + "</li>",
                                f.eq(e).is(":first-child") && (a = '<li class="optgroup' + c + '">' + f.eq(e).parent().attr("label") + "</li>" + a));
                                w += a
                            }
                        }
                        var f = d("option", a)
                          , w = "";
                        if (a.is("[multiple]")) {
                            var h = d("<span" + l + ' class="jq-select-multiple jqselect' + q + '" style="display: inline-block"></span>');
                            a.after(h).css({
                                position: "absolute",
                                left: -9999
                            });
                            r();
                            h.append('<ul style="position: relative">' + w + "</ul>");
                            var j = d("ul", h)
                              , g = d("li", h).attr("unselectable", "on").css({
                                "-webkit-user-select": "none",
                                "-moz-user-select": "none",
                                "-ms-user-select": "none",
                                "-o-user-select": "none",
                                "user-select": "none"
                            })
                              , t = a.attr("size")
                              , u = j.outerHeight()
                              , x = g.outerHeight();
                            void 0 !== t && 0 < t ? j.css({
                                height: x * t
                            }) : j.css({
                                height: 4 * x
                            });
                            u > h.height() && (j.css("overflowY", "scroll"),
                            b(j),
                            g.filter(".selected").length && j.scrollTop(j.scrollTop() + g.filter(".selected").position().top));
                            a.is(":disabled") ? (h.addClass("disabled"),
                            f.each(function() {
                                d(this).is(":selected") && g.eq(d(this).index()).addClass("selected")
                            })) : (g.filter(":not(.disabled):not(.optgroup)").click(function(b) {
                                a.focus();
                                h.removeClass("focused");
                                var c = d(this);
                                b.ctrlKey || c.addClass("selected");
                                b.shiftKey || c.addClass("first");
                                !b.ctrlKey && !b.shiftKey && c.siblings().removeClass("selected first");
                                b.ctrlKey && (c.is(".selected") ? c.removeClass("selected first") : c.addClass("selected first"),
                                c.siblings().removeClass("first"));
                                if (b.shiftKey) {
                                    var e = !1
                                      , k = !1;
                                    c.siblings().removeClass("selected").siblings(".first").addClass("selected");
                                    c.prevAll().each(function() {
                                        d(this).is(".first") && (e = !0)
                                    });
                                    c.nextAll().each(function() {
                                        d(this).is(".first") && (k = !0)
                                    });
                                    e && c.prevAll().each(function() {
                                        if (d(this).is(".selected"))
                                            return !1;
                                        d(this).not(".disabled, .optgroup").addClass("selected")
                                    });
                                    k && c.nextAll().each(function() {
                                        if (d(this).is(".selected"))
                                            return !1;
                                        d(this).not(".disabled, .optgroup").addClass("selected")
                                    });
                                    1 == g.filter(".selected").length && c.addClass("first")
                                }
                                f.prop("selected", !1);
                                g.filter(".selected").each(function() {
                                    var a = d(this)
                                      , b = a.index();
                                    a.is(".option") && (b -= a.prevAll(".optgroup").length);
                                    f.eq(b).prop("selected", !0)
                                });
                                a.change()
                            }),
                            f.each(function(a) {
                                d(this).data("optionIndex", a)
                            }),
                            a.change(function() {
                                g.removeClass("selected");
                                var a = [];
                                f.filter(":selected").each(function() {
                                    a.push(d(this).data("optionIndex"))
                                });
                                g.not(".optgroup").filter(function(b) {
                                    return -1 < a.indexOf(b)
                                }).addClass("selected")
                            }).focus(function() {
                                h.addClass("focused")
                            }).blur(function() {
                                h.removeClass("focused")
                            }),
                            u > h.height() && a.keydown(function(a) {
                                (38 == a.which || 37 == a.which || 33 == a.which) && j.scrollTop(j.scrollTop() + g.filter(".selected").position().top - x);
                                (40 == a.which || 39 == a.which || 34 == a.which) && j.scrollTop(j.scrollTop() + g.filter(".selected:last").position().top - j.innerHeight() + 2 * x)
                            }))
                        } else {
                            var k = d("<span" + l + ' class="jq-selectbox jqselect' + q + '" style="display: inline-block; position: relative; z-index:' + n.singleSelectzIndex + '"><div class="select" style="float: left"><div class="text"></div><b class="trigger"><i class="arrow"></i></b></div></span>');
                            a.after(k).css({
                                position: "absolute",
                                left: -9999
                            });
                            var t = d("div.select", k)
                              , v = d("div.text", k)
                              , u = f.filter(":selected");
                            u.length ? v.text(u.text()) : v.text(f.first().text());
                            if (a.is(":disabled"))
                                k.addClass("disabled");
                            else {
                                r();
                                var c = d('<div class="dropdown" style="position: absolute; overflow: auto; overflow-x: hidden"><ul style="list-style: none">' + w + "</ul></div>");
                                k.append(c);
                                var m = d("li", c);
                                1 > m.filter(".selected").length && m.first().addClass("selected sel");
                                var s = k.outerHeight();
                                "auto" == c.css("left") && c.css({
                                    left: 0
                                });
                                "auto" == c.css("top") && c.css({
                                    top: s
                                });
                                var p = m.outerHeight()
                                  , y = c.css("top");
                                c.hide();
                                t.click(function() {
                                    a.focus();
                                    if (n.selectSmartPositioning) {
                                        var e = d(window)
                                          , f = k.offset().top
                                          , j = e.height() - s - (f - e.scrollTop())
                                          , g = n.selectVisibleOptions
                                          , h = 6 * p
                                          , l = p * g;
                                        0 < g && 6 > g && (h = l);
                                        0 > j || j < h ? (c.height("auto").css({
                                            top: "auto",
                                            bottom: y
                                        }),
                                        c.outerHeight() > f - e.scrollTop() - 20 && (c.height(Math.floor((f - e.scrollTop() - 20) / p) * p),
                                        0 < g && 6 > g ? c.height() > h && c.height(h) : 6 < g && c.height() > l && c.height(l))) : j > h && (c.height("auto").css({
                                            bottom: "auto",
                                            top: y
                                        }),
                                        c.outerHeight() > j - 20 && (c.height(Math.floor((j - 20) / p) * p),
                                        0 < g && 6 > g ? c.height() > h && c.height(h) : 6 < g && c.height() > l && c.height(l)))
                                    }
                                    d("span.jqselect").css({
                                        zIndex: n.singleSelectzIndex - 1
                                    }).removeClass("focused");
                                    k.css({
                                        zIndex: n.singleSelectzIndex
                                    });
                                    c.is(":hidden") ? (d("div.dropdown:visible").hide(),
                                    c.show(),
                                    k.addClass("opened")) : (c.hide(),
                                    k.removeClass("opened"));
                                    m.filter(".selected").length && c.scrollTop(c.scrollTop() + m.filter(".selected").position().top - c.innerHeight() / 2 + p / 2);
                                    b(c);
                                    return !1
                                });
                                m.hover(function() {
                                    d(this).siblings().removeClass("selected")
                                });
                                var z = m.filter(".selected").text();
                                m.filter(":not(.disabled):not(.optgroup)").click(function() {
                                    var b = d(this)
                                      , e = b.text();
                                    if (z != e) {
                                        var g = b.index();
                                        b.is(".option") && (g -= b.prevAll(".optgroup").length);
                                        b.addClass("selected sel").siblings().removeClass("selected sel");
                                        f.prop("selected", !1).eq(g).prop("selected", !0);
                                        z = e;
                                        v.text(e);
                                        a.change()
                                    }
                                    c.hide()
                                });
                                c.mouseout(function() {
                                    d("li.sel", c).addClass("selected")
                                });
                                a.change(function() {
                                    v.text(f.filter(":selected").text());
                                    m.removeClass("selected sel").not(".optgroup").eq(a[0].selectedIndex).addClass("selected sel")
                                }).focus(function() {
                                    k.addClass("focused")
                                }).blur(function() {
                                    k.removeClass("focused")
                                }).bind("keydown keyup", function(b) {
                                    v.text(f.filter(":selected").text());
                                    m.removeClass("selected sel").not(".optgroup").eq(a[0].selectedIndex).addClass("selected sel");
                                    (38 == b.which || 37 == b.which || 33 == b.which) && c.scrollTop(c.scrollTop() + m.filter(".selected").position().top);
                                    (40 == b.which || 39 == b.which || 34 == b.which) && c.scrollTop(c.scrollTop() + m.filter(".selected").position().top - c.innerHeight() + p);
                                    13 == b.which && c.hide()
                                });
                                d(document).on("click", function(a) {
                                    !d(a.target).parents().hasClass("selectbox") && "OPTION" != a.target.nodeName && (c.hide().find("li.sel").addClass("selected"),
                                    k.removeClass("focused opened"))
                                })
                            }
                        }
                    };
                    b();
                    a.on("refresh", function() {
                        a.next().remove();
                        b()
                    })
                }
            })
        })
    }
}
)(jQuery);
