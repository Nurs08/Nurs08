(function($) {
    if ($.fn.inputmask == undefined) {
        $.inputmask = {
            defaults: {
                placeholder: "_",
                optionalmarker: {
                    start: "[",
                    end: "]"
                },
                escapeChar: "\\",
                mask: null,
                oncomplete: $.noop,
                onincomplete: $.noop,
                oncleared: $.noop,
                repeat: 0,
                greedy: true,
                autoUnmask: false,
                clearMaskOnLostFocus: true,
                insertMode: true,
                clearIncomplete: false,
                aliases: {},
                onKeyUp: $.noop,
                onKeyDown: $.noop,
                showMaskOnHover: true,
                onKeyValidation: $.noop,
                numericInput: false,
                radixPoint: ".",
                definitions: {
                    '9': {
                        validator: "[0-9]",
                        cardinality: 1
                    },
                    'a': {
                        validator: "[A-Za-z\u0410-\u044F\u0401\u0451]",
                        cardinality: 1
                    },
                    '*': {
                        validator: "[A-Za-z\u0410-\u044F\u0401\u04510-9]",
                        cardinality: 1
                    }
                },
                keyCode: {
                    ALT: 18,
                    BACKSPACE: 8,
                    CAPS_LOCK: 20,
                    COMMA: 188,
                    COMMAND: 91,
                    COMMAND_LEFT: 91,
                    COMMAND_RIGHT: 93,
                    CONTROL: 17,
                    DELETE: 46,
                    DOWN: 40,
                    END: 35,
                    ENTER: 13,
                    ESCAPE: 27,
                    HOME: 36,
                    INSERT: 45,
                    LEFT: 37,
                    MENU: 93,
                    NUMPAD_ADD: 107,
                    NUMPAD_DECIMAL: 110,
                    NUMPAD_DIVIDE: 111,
                    NUMPAD_ENTER: 108,
                    NUMPAD_MULTIPLY: 106,
                    NUMPAD_SUBTRACT: 109,
                    PAGE_DOWN: 34,
                    PAGE_UP: 33,
                    PERIOD: 190,
                    RIGHT: 39,
                    SHIFT: 16,
                    SPACE: 32,
                    TAB: 9,
                    UP: 38,
                    WINDOWS: 91
                },
                ignorables: [8, 9, 13, 16, 17, 18, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 46, 91, 93, 108]
            },
            val: $.fn.val
        };
        $.fn.inputmask = function(fn, options) {
            var opts = $.extend(true, {}, $.inputmask.defaults, options);
            var pasteEvent = isInputEventSupported('paste') ? 'paste' : 'input';
            var iphone = navigator.userAgent.match(/iphone/i) != null;
            var android = navigator.userAgent.match(/android.*mobile safari.*/i) != null;
            if (android) {
                var browser = navigator.userAgent.match(/mobile safari.*/i);
                var version = parseInt(new RegExp(/[0-9]+/).exec(browser));
                android = version <= 533;
            }
            var caretposCorrection = null;
            if (typeof fn == "string") {
                switch (fn) {
                case "mask":
                    var _buffer = getMaskTemplate();
                    var tests = getTestingChain();
                    return this.each(function() {
                        mask(this);
                    });
                    break;
                case "unmaskedvalue":
                    var tests = this.data('inputmask')['tests'];
                    var _buffer = this.data('inputmask')['_buffer'];
                    opts.greedy = this.data('inputmask')['greedy'];
                    opts.repeat = this.data('inputmask')['repeat'];
                    opts.definitions = this.data('inputmask')['definitions'];
                    return unmaskedvalue(this);
                    break;
                case "remove":
                    var tests, _buffer;
                    return this.each(function() {
                        var $input = $(this)
                          , input = this;
                        setTimeout(function() {
                            if ($input.data('inputmask')) {
                                tests = $input.data('inputmask')['tests'];
                                _buffer = $input.data('inputmask')['_buffer'];
                                opts.greedy = $input.data('inputmask')['greedy'];
                                opts.repeat = $input.data('inputmask')['repeat'];
                                opts.definitions = $input.data('inputmask')['definitions'];
                                input._valueSet(unmaskedvalue($input, true));
                                $input.removeData('inputmask');
                                $input.unbind(".inputmask");
                                $input.removeClass('focus.inputmask');
                                var valueProperty;
                                if (Object.getOwnPropertyDescriptor)
                                    valueProperty = Object.getOwnPropertyDescriptor(input, "value");
                                if (valueProperty && valueProperty.get) {
                                    if (input._valueGet) {
                                        Object.defineProperty(input, "value", {
                                            get: input._valueGet,
                                            set: input._valueSet
                                        });
                                    }
                                } else if (document.__lookupGetter__ && input.__lookupGetter__("value")) {
                                    if (input._valueGet) {
                                        input.__defineGetter__("value", input._valueGet);
                                        input.__defineSetter__("value", input._valueSet);
                                    }
                                }
                                delete input._valueGet;
                                delete input._valueSet;
                            }
                        }, 0);
                    });
                    break;
                case "getemptymask":
                    if (this.data('inputmask'))
                        return this.data('inputmask')['_buffer'].join('');
                    else
                        return "";
                case "hasMaskedValue":
                    return this.data('inputmask') ? !this.data('inputmask')['autoUnmask'] : false;
                default:
                    if (!resolveAlias(fn)) {
                        opts.mask = fn;
                    }
                    var _buffer = getMaskTemplate();
                    var tests = getTestingChain();
                    return this.each(function() {
                        mask(this);
                    });
                    break;
                }
            }
            if (typeof fn == "object") {
                opts = $.extend(true, {}, $.inputmask.defaults, fn);
                resolveAlias(opts.alias);
                var _buffer = getMaskTemplate();
                var tests = getTestingChain();
                return this.each(function() {
                    mask(this);
                });
            }
            function isInputEventSupported(eventName) {
                var el = document.createElement('input')
                  , eventName = 'on' + eventName
                  , isSupported = (eventName in el);
                if (!isSupported) {
                    el.setAttribute(eventName, 'return;');
                    isSupported = typeof el[eventName] == 'function';
                }
                el = null;
                return isSupported;
            }
            function resolveAlias(aliasStr) {
                var aliasDefinition = opts.aliases[aliasStr];
                if (aliasDefinition) {
                    if (aliasDefinition.alias)
                        resolveAlias(aliasDefinition.alias);
                    $.extend(true, opts, aliasDefinition);
                    $.extend(true, opts, options);
                    return true;
                }
                return false;
            }
            function getMaskTemplate() {
                var escaped = false
                  , outCount = 0;
                if (opts.mask.length == 1 && opts.greedy == false) {
                    opts.placeholder = "";
                }
                var singleMask = $.map(opts.mask.split(""), function(element, index) {
                    var outElem = [];
                    if (element == opts.escapeChar) {
                        escaped = true;
                    } else if ((element != opts.optionalmarker.start && element != opts.optionalmarker.end) || escaped) {
                        var maskdef = opts.definitions[element];
                        if (maskdef && !escaped) {
                            for (var i = 0; i < maskdef.cardinality; i++) {
                                outElem.push(getPlaceHolder(outCount + i));
                            }
                        } else {
                            outElem.push(element);
                            escaped = false;
                        }
                        outCount += outElem.length;
                        return outElem;
                    }
                });
                var repeatedMask = singleMask.slice();
                for (var i = 1; i < opts.repeat && opts.greedy; i++) {
                    repeatedMask = repeatedMask.concat(singleMask.slice());
                }
                return repeatedMask;
            }
            function getTestingChain() {
                var isOptional = false
                  , escaped = false;
                var newBlockMarker = false;
                return $.map(opts.mask.split(""), function(element, index) {
                    var outElem = [];
                    if (element == opts.escapeChar) {
                        escaped = true;
                    } else if (element == opts.optionalmarker.start && !escaped) {
                        isOptional = true;
                        newBlockMarker = true;
                    } else if (element == opts.optionalmarker.end && !escaped) {
                        isOptional = false;
                        newBlockMarker = true;
                    } else {
                        var maskdef = opts.definitions[element];
                        if (maskdef && !escaped) {
                            var prevalidators = maskdef["prevalidator"]
                              , prevalidatorsL = prevalidators ? prevalidators.length : 0;
                            for (var i = 1; i < maskdef.cardinality; i++) {
                                var prevalidator = prevalidatorsL >= i ? prevalidators[i - 1] : []
                                  , validator = prevalidator["validator"]
                                  , cardinality = prevalidator["cardinality"];
                                outElem.push({
                                    fn: validator ? typeof validator == 'string' ? new RegExp(validator) : new function() {
                                        this.test = validator;
                                    }
                                    : new RegExp("."),
                                    cardinality: cardinality ? cardinality : 1,
                                    optionality: isOptional,
                                    newBlockMarker: isOptional == true ? newBlockMarker : false,
                                    offset: 0,
                                    casing: maskdef["casing"],
                                    def: element
                                });
                                if (isOptional == true)
                                    newBlockMarker = false;
                            }
                            outElem.push({
                                fn: maskdef.validator ? typeof maskdef.validator == 'string' ? new RegExp(maskdef.validator) : new function() {
                                    this.test = maskdef.validator;
                                }
                                : new RegExp("."),
                                cardinality: maskdef.cardinality,
                                optionality: isOptional,
                                newBlockMarker: newBlockMarker,
                                offset: 0,
                                casing: maskdef["casing"],
                                def: element
                            });
                        } else {
                            outElem.push({
                                fn: null,
                                cardinality: 0,
                                optionality: isOptional,
                                newBlockMarker: newBlockMarker,
                                offset: 0,
                                casing: null,
                                def: element
                            });
                            escaped = false;
                        }
                        newBlockMarker = false;
                        return outElem;
                    }
                });
            }
            function isValid(pos, c, buffer, strict) {
                var result = false;
                if (pos >= 0 && pos < getMaskLength()) {
                    var testPos = determineTestPosition(pos)
                      , loopend = c ? 1 : 0
                      , chrs = '';
                    for (var i = tests[testPos].cardinality; i > loopend; i--) {
                        chrs += getBufferElement(buffer, testPos - (i - 1));
                    }
                    if (c) {
                        chrs += c;
                    }
                    result = tests[testPos].fn != null ? tests[testPos].fn.test(chrs, buffer, pos, strict, opts) : false;
                }
                setTimeout(opts.onKeyValidation.call(this, result, opts), 0);
                return result;
            }
            function isMask(pos) {
                var testPos = determineTestPosition(pos);
                var test = tests[testPos];
                return test != undefined ? test.fn : false;
            }
            function determineTestPosition(pos) {
                return pos % tests.length;
            }
            function getPlaceHolder(pos) {
                return opts.placeholder.charAt(pos % opts.placeholder.length);
            }
            function getMaskLength() {
                var calculatedLength = _buffer.length;
                if (!opts.greedy && opts.repeat > 1) {
                    calculatedLength += (_buffer.length * (opts.repeat - 1));
                }
                return calculatedLength;
            }
            function seekNext(buffer, pos) {
                var maskL = getMaskLength();
                if (pos >= maskL)
                    return maskL;
                var position = pos;
                while (++position < maskL && !isMask(position)) {}
                ;return position;
            }
            function seekPrevious(buffer, pos) {
                var position = pos;
                if (position <= 0)
                    return 0;
                while (--position > 0 && !isMask(position)) {}
                ;return position;
            }
            function setBufferElement(buffer, position, element) {
                var test = tests[determineTestPosition(position)];
                var elem = element;
                if (elem != undefined) {
                    switch (test.casing) {
                    case "upper":
                        elem = element.toUpperCase();
                        break;
                    case "lower":
                        elem = element.toLowerCase();
                        break;
                    }
                }
                buffer[position] = elem;
            }
            function getBufferElement(buffer, position, autoPrepare) {
                if (autoPrepare)
                    position = prepareBuffer(buffer, position);
                return buffer[position];
            }
            function prepareBuffer(buffer, position, isRTL) {
                var j;
                if (isRTL) {
                    while (position < 0 && buffer.length < getMaskLength()) {
                        j = _buffer.length - 1;
                        position = _buffer.length;
                        while (_buffer[j] !== undefined) {
                            buffer.unshift(_buffer[j--]);
                        }
                    }
                } else {
                    while (buffer[position] == undefined && buffer.length < getMaskLength()) {
                        j = 0;
                        while (_buffer[j] !== undefined) {
                            buffer.push(_buffer[j++]);
                        }
                    }
                }
                return position;
            }
            function writeBuffer(input, buffer, caretPos) {
                input._valueSet(buffer.join(''));
                if (caretPos != undefined) {
                    if (android) {
                        setTimeout(function() {
                            caret(input, caretPos);
                        }, 100);
                    } else
                        caret(input, caretPos);
                }
            }
            ;function clearBuffer(buffer, start, end) {
                for (var i = start, maskL = getMaskLength(); i < end && i < maskL; i++) {
                    setBufferElement(buffer, i, getBufferElement(_buffer.slice(), i));
                }
            }
            ;function setReTargetPlaceHolder(buffer, pos) {
                var testPos = determineTestPosition(pos);
                setBufferElement(buffer, pos, getBufferElement(_buffer, testPos));
            }
            function checkVal(input, buffer, clearInvalid, skipRadixHandling) {
                var isRTL = $(input).data('inputmask')['isRTL']
                  , inputValue = truncateInput(input._valueGet(), isRTL).split('');
                if (isRTL) {
                    var maskL = getMaskLength();
                    var inputValueRev = inputValue.reverse();
                    inputValueRev.length = maskL;
                    for (var i = 0; i < maskL; i++) {
                        var targetPosition = determineTestPosition(maskL - (i + 1));
                        if (tests[targetPosition].fn == null && inputValueRev[i] != getBufferElement(_buffer, targetPosition)) {
                            inputValueRev.splice(i, 0, getBufferElement(_buffer, targetPosition));
                            inputValueRev.length = maskL;
                        } else {
                            inputValueRev[i] = inputValueRev[i] || getBufferElement(_buffer, targetPosition);
                        }
                    }
                    inputValue = inputValueRev.reverse();
                }
                clearBuffer(buffer, 0, buffer.length);
                buffer.length = _buffer.length;
                var lastMatch = -1, checkPosition = -1, np, maskL = getMaskLength(), ivl = inputValue.length, rtlMatch = ivl == 0 ? maskL : -1;
                for (var i = 0; i < ivl; i++) {
                    for (var pos = checkPosition + 1; pos < maskL; pos++) {
                        if (isMask(pos)) {
                            var c = inputValue[i];
                            if ((np = isValid(pos, c, buffer, !clearInvalid)) !== false) {
                                if (np !== true) {
                                    pos = np.pos || pos;
                                    c = np.c || c;
                                }
                                setBufferElement(buffer, pos, c);
                                lastMatch = checkPosition = pos;
                            } else {
                                setReTargetPlaceHolder(buffer, pos);
                                if (c == getPlaceHolder(pos)) {
                                    checkPosition = pos;
                                    rtlMatch = pos;
                                }
                            }
                            break;
                        } else {
                            setReTargetPlaceHolder(buffer, pos);
                            if (lastMatch == checkPosition)
                                lastMatch = pos;
                            checkPosition = pos;
                            if (inputValue[i] == getBufferElement(buffer, pos))
                                break;
                        }
                    }
                }
                if (opts.greedy == false) {
                    var newBuffer = truncateInput(buffer.join(''), isRTL).split('');
                    while (buffer.length != newBuffer.length) {
                        isRTL ? buffer.shift() : buffer.pop();
                    }
                }
                if (clearInvalid) {
                    writeBuffer(input, buffer);
                }
                return isRTL ? (opts.numericInput ? ($.inArray(opts.radixPoint, buffer) != -1 && skipRadixHandling !== true ? $.inArray(opts.radixPoint, buffer) : seekNext(buffer, maskL)) : seekNext(buffer, rtlMatch)) : seekNext(buffer, lastMatch);
            }
            function escapeRegex(str) {
                var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
                return str.replace(new RegExp('(\\' + specials.join('|\\') + ')','gim'), '\\$1');
            }
            function truncateInput(inputValue, rtl) {
                return rtl ? inputValue.replace(new RegExp("^(" + escapeRegex(_buffer.join('')) + ")*"), "") : inputValue.replace(new RegExp("(" + escapeRegex(_buffer.join('')) + ")*$"), "");
            }
            function clearOptionalTail(input, buffer) {
                checkVal(input, buffer, false);
                var tmpBuffer = buffer.slice();
                if ($(input).data('inputmask')['isRTL']) {
                    for (var pos = 0; pos <= tmpBuffer.length - 1; pos++) {
                        var testPos = determineTestPosition(pos);
                        if (tests[testPos].optionality) {
                            if (getPlaceHolder(pos) == buffer[pos] || !isMask(pos))
                                tmpBuffer.splice(0, 1);
                            else
                                break;
                        } else
                            break;
                    }
                } else {
                    for (var pos = tmpBuffer.length - 1; pos >= 0; pos--) {
                        var testPos = determineTestPosition(pos);
                        if (tests[testPos].optionality) {
                            if (getPlaceHolder(pos) == buffer[pos] || !isMask(pos))
                                tmpBuffer.pop();
                            else
                                break;
                        } else
                            break;
                    }
                }
                writeBuffer(input, tmpBuffer);
            }
            function unmaskedvalue($input, skipDatepickerCheck) {
                var input = $input[0];
                if (tests && (skipDatepickerCheck === true || !$input.hasClass('hasDatepicker'))) {
                    var buffer = _buffer.slice();
                    checkVal(input, buffer);
                    return $.map(buffer, function(element, index) {
                        return isMask(index) && element != getBufferElement(_buffer.slice(), index) ? element : null;
                    }).join('');
                } else {
                    return input._valueGet();
                }
            }
            function caret(input, begin, end) {
                var npt = input.jquery && input.length > 0 ? input[0] : input;
                if (typeof begin == 'number') {
                    end = (typeof end == 'number') ? end : begin;
                    if (opts.insertMode == false && begin == end)
                        end++;
                    if (npt.setSelectionRange) {
                        npt.setSelectionRange(begin, end);
                    } else if (npt.createTextRange) {
                        var range = npt.createTextRange();
                        range.collapse(true);
                        range.moveEnd('character', end);
                        range.moveStart('character', begin);
                        range.select();
                    }
                    npt.focus();
                    if (android && end != npt.selectionEnd)
                        caretposCorrection = {
                            begin: begin,
                            end: end
                        };
                } else {
                    var caretpos = android ? caretposCorrection : null
                      , caretposCorrection = null;
                    if (caretpos == null) {
                        if (npt.setSelectionRange) {
                            begin = npt.selectionStart;
                            end = npt.selectionEnd;
                        } else if (document.selection && document.selection.createRange) {
                            var range = document.selection.createRange();
                            begin = 0 - range.duplicate().moveStart('character', -100000);
                            end = begin + range.text.length;
                        }
                        caretpos = {
                            begin: begin,
                            end: end
                        };
                    }
                    return caretpos;
                }
            }
            ;function mask(el) {
                var $input = $(el);
                if (!$input.is(":input"))
                    return;
                opts.greedy = opts.greedy ? opts.greedy : opts.repeat == 0;
                var maxLength = $input.prop('maxLength');
                if (getMaskLength() > maxLength && maxLength > -1) {
                    if (maxLength < _buffer.length)
                        _buffer.length = maxLength;
                    if (opts.greedy == false) {
                        opts.repeat = Math.round(maxLength / _buffer.length);
                    }
                    $input.prop('maxLength', getMaskLength() * 2);
                }
                $input.data('inputmask', {
                    'tests': tests,
                    '_buffer': _buffer,
                    'greedy': opts.greedy,
                    'repeat': opts.repeat,
                    'autoUnmask': opts.autoUnmask,
                    'definitions': opts.definitions,
                    'isRTL': false
                });
                patchValueProperty(el);
                var buffer = _buffer.slice()
                  , undoBuffer = el._valueGet()
                  , skipKeyPressEvent = false
                  , ignorable = false
                  , lastPosition = -1
                  , firstMaskPos = seekNext(buffer, -1)
                  , lastMaskPos = seekPrevious(buffer, getMaskLength())
                  , isRTL = false;
                if (el.dir == "rtl" || opts.numericInput) {
                    el.dir = "ltr"
                    $input.css("text-align", "right");
                    $input.removeAttr("dir");
                    var inputData = $input.data('inputmask');
                    inputData['isRTL'] = true;
                    $input.data('inputmask', inputData);
                    isRTL = true;
                }
                $input.unbind(".inputmask");
                $input.removeClass('focus.inputmask');
                $input.bind("mouseenter.inputmask", function() {
                    var $input = $(this)
                      , input = this;
                    if (!$input.hasClass('focus.inputmask') && opts.showMaskOnHover) {
                        var nptL = input._valueGet().length;
                        if (nptL < buffer.length) {
                            if (nptL == 0)
                                buffer = _buffer.slice();
                            writeBuffer(input, buffer);
                        }
                    }
                }).bind("blur.inputmask", function() {
                    var $input = $(this)
                      , input = this
                      , nptValue = input._valueGet();
                    $input.removeClass('focus.inputmask');
                    if (nptValue != undoBuffer) {
                        $input.change();
                    }
                    if (opts.clearMaskOnLostFocus) {
                        if (nptValue == _buffer.join(''))
                            input._valueSet('');
                        else {
                            clearOptionalTail(input, buffer);
                        }
                    }
                    if (!isComplete(input)) {
                        $input.trigger("incomplete");
                        if (opts.clearIncomplete) {
                            if (opts.clearMaskOnLostFocus)
                                input._valueSet('');
                            else {
                                buffer = _buffer.slice();
                                writeBuffer(input, buffer);
                            }
                        }
                    }
                }).bind("focus.inputmask", function() {
                    var $input = $(this)
                      , input = this;
                    if (!$input.hasClass('focus.inputmask') && !opts.showMaskOnHover) {
                        var nptL = input._valueGet().length;
                        if (nptL < buffer.length) {
                            if (nptL == 0)
                                buffer = _buffer.slice();
                            caret(input, checkVal(input, buffer, true));
                        }
                    }
                    $input.addClass('focus.inputmask');
                    undoBuffer = input._valueGet();
                }).bind("mouseleave.inputmask", function() {
                    var $input = $(this)
                      , input = this;
                    if (opts.clearMaskOnLostFocus) {
                        if (!$input.hasClass('focus.inputmask')) {
                            if (input._valueGet() == _buffer.join('') || input._valueGet() == '')
                                input._valueSet('');
                            else {
                                clearOptionalTail(input, buffer);
                            }
                        }
                    }
                }).bind("click.inputmask", function() {
                    var input = this;
                    setTimeout(function() {
                        var selectedCaret = caret(input);
                        if (selectedCaret.begin == selectedCaret.end) {
                            var clickPosition = selectedCaret.begin;
                            lastPosition = checkVal(input, buffer, false);
                            if (isRTL)
                                caret(input, clickPosition > lastPosition && (isValid(clickPosition, buffer[clickPosition], buffer, true) !== false || !isMask(clickPosition)) ? clickPosition : lastPosition);
                            else
                                caret(input, clickPosition < lastPosition && (isValid(clickPosition, buffer[clickPosition], buffer, true) !== false || !isMask(clickPosition)) ? clickPosition : lastPosition);
                        }
                    }, 0);
                }).bind('dblclick.inputmask', function() {
                    var input = this;
                    setTimeout(function() {
                        caret(input, 0, lastPosition);
                    }, 0);
                }).bind("keydown.inputmask", keydownEvent).bind("keypress.inputmask", keypressEvent).bind("keyup.inputmask", keyupEvent).bind(pasteEvent + ".inputmask, dragdrop.inputmask, drop.inputmask", function() {
                    var input = this;
                    setTimeout(function() {
                        caret(input, checkVal(input, buffer, true));
                    }, 0);
                }).bind('setvalue.inputmask', function() {
                    var input = this;
                    undoBuffer = input._valueGet();
                    checkVal(input, buffer, true);
                    if (input._valueGet() == _buffer.join(''))
                        input._valueSet('');
                }).bind('complete.inputmask', opts.oncomplete).bind('incomplete.inputmask', opts.onincomplete).bind('cleared.inputmask', opts.oncleared);
                lastPosition = checkVal(el, buffer, true);
                var activeElement;
                try {
                    activeElement = document.activeElement;
                } catch (e) {}
                if (activeElement === el) {
                    $input.addClass('focus.inputmask');
                    caret(el, lastPosition);
                } else if (opts.clearMaskOnLostFocus) {
                    if (el._valueGet() == _buffer.join('')) {
                        el._valueSet('');
                    } else {
                        clearOptionalTail(el, buffer);
                    }
                }
                installEventRuler(el);
                function isComplete(npt) {
                    var complete = true
                      , nptValue = npt._valueGet()
                      , ml = nptValue.length;
                    for (var i = 0; i < ml; i++) {
                        if (isMask(i) && nptValue.charAt(i) == getPlaceHolder(i)) {
                            complete = false;
                            break;
                        }
                    }
                    return complete;
                }
                function installEventRuler(npt) {
                    var events = $._data(npt).events;
                    $.each(events, function(eventType, eventHandlers) {
                        $(npt).bind(eventType + ".inputmask", function(event) {
                            if (this.readOnly || this.disabled) {
                                event.stopPropagation();
                                event.stopImmediatePropagation();
                                event.preventDefault();
                                return false;
                            }
                        });
                        var ourHandler = eventHandlers[eventHandlers.length - 1];
                        for (var i = eventHandlers.length - 1; i > 0; i--) {
                            eventHandlers[i] = eventHandlers[i - 1];
                        }
                        eventHandlers[0] = ourHandler;
                    });
                }
                function patchValueProperty(npt) {
                    var valueProperty;
                    if (Object.getOwnPropertyDescriptor)
                        valueProperty = Object.getOwnPropertyDescriptor(npt, "value");
                    if (valueProperty && valueProperty.get) {
                        if (!npt._valueGet) {
                            npt._valueGet = valueProperty.get;
                            npt._valueSet = valueProperty.set;
                            Object.defineProperty(npt, "value", {
                                get: function() {
                                    var $self = $(this)
                                      , inputData = $(this).data('inputmask');
                                    return inputData && inputData['autoUnmask'] ? $self.inputmask('unmaskedvalue') : this._valueGet() != inputData['_buffer'].join('') ? this._valueGet() : '';
                                },
                                set: function(value) {
                                    this._valueSet(value);
                                    $(this).triggerHandler('setvalue.inputmask');
                                }
                            });
                        }
                    } else if (document.__lookupGetter__ && npt.__lookupGetter__("value")) {
                        if (!npt._valueGet) {
                            npt._valueGet = npt.__lookupGetter__("value");
                            npt._valueSet = npt.__lookupSetter__("value");
                            npt.__defineGetter__("value", function() {
                                var $self = $(this)
                                  , inputData = $(this).data('inputmask');
                                return inputData && inputData['autoUnmask'] ? $self.inputmask('unmaskedvalue') : this._valueGet() != inputData['_buffer'].join('') ? this._valueGet() : '';
                            });
                            npt.__defineSetter__("value", function(value) {
                                this._valueSet(value);
                                $(this).triggerHandler('setvalue.inputmask');
                            });
                        }
                    } else {
                        if (!npt._valueGet) {
                            npt._valueGet = function() {
                                return this.value;
                            }
                            npt._valueSet = function(value) {
                                this.value = value;
                            }
                        }
                        if ($.fn.val.inputmaskpatch != true) {
                            $.fn.val = function() {
                                if (arguments.length == 0) {
                                    var $self = $(this);
                                    if ($self.data('inputmask')) {
                                        if ($self.data('inputmask')['autoUnmask'])
                                            return $self.inputmask('unmaskedvalue');
                                        else {
                                            var result = $.inputmask.val.apply($self);
                                            return result != $self.data('inputmask')['_buffer'].join('') ? result : '';
                                        }
                                    } else
                                        return $.inputmask.val.apply($self);
                                } else {
                                    var args = arguments;
                                    return this.each(function() {
                                        var $self = $(this);
                                        var result = $.inputmask.val.apply($self, args);
                                        if ($self.data('inputmask'))
                                            $self.triggerHandler('setvalue.inputmask');
                                        return result;
                                    });
                                }
                            }
                            ;
                            $.extend($.fn.val, {
                                inputmaskpatch: true
                            });
                        }
                    }
                }
                function shiftL(start, end, c) {
                    while (!isMask(start) && start - 1 >= 0)
                        start--;
                    for (var i = start; i < end && i < getMaskLength(); i++) {
                        if (isMask(i)) {
                            setReTargetPlaceHolder(buffer, i);
                            var j = seekNext(buffer, i);
                            var p = getBufferElement(buffer, j);
                            if (p != getPlaceHolder(j)) {
                                if (j < getMaskLength() && isValid(i, p, buffer, true) !== false && tests[determineTestPosition(i)].def == tests[determineTestPosition(j)].def) {
                                    setBufferElement(buffer, i, getBufferElement(buffer, j));
                                    setReTargetPlaceHolder(buffer, j);
                                } else {
                                    if (isMask(i))
                                        break;
                                }
                            } else if (c == undefined)
                                break;
                        } else {
                            setReTargetPlaceHolder(buffer, i);
                        }
                    }
                    if (c != undefined)
                        setBufferElement(buffer, isRTL ? end : seekPrevious(buffer, end), c);
                    buffer = truncateInput(buffer.join(''), isRTL).split('');
                    if (buffer.length == 0)
                        buffer = _buffer.slice();
                    return start;
                }
                function shiftR(start, end, c, full) {
                    for (var i = start; i <= end && i < getMaskLength(); i++) {
                        if (isMask(i)) {
                            var t = getBufferElement(buffer, i);
                            setBufferElement(buffer, i, c);
                            if (t != getPlaceHolder(i)) {
                                var j = seekNext(buffer, i);
                                if (j < getMaskLength()) {
                                    if (isValid(j, t, buffer, true) !== false && tests[determineTestPosition(i)].def == tests[determineTestPosition(j)].def)
                                        c = t;
                                    else {
                                        if (isMask(j))
                                            break;
                                        else
                                            c = t;
                                    }
                                } else
                                    break;
                            } else if (full !== true)
                                break;
                        } else
                            setReTargetPlaceHolder(buffer, i);
                    }
                    var lengthBefore = buffer.length;
                    buffer = truncateInput(buffer.join(''), isRTL).split('');
                    if (buffer.length == 0)
                        buffer = _buffer.slice();
                    return end - (lengthBefore - buffer.length);
                }
                ;function keydownEvent(e) {
                    skipKeyPressEvent = false;
                    var input = this
                      , k = e.keyCode
                      , pos = caret(input);
                    if (opts.numericInput) {
                        var nptStr = input._valueGet();
                        var radixPosition = nptStr.indexOf(opts.radixPoint);
                        if (radixPosition != -1) {
                            isRTL = pos.begin <= radixPosition || pos.end <= radixPosition;
                        }
                    }
                    if (k == opts.keyCode.BACKSPACE || k == opts.keyCode.DELETE || (iphone && k == 127)) {
                        var maskL = getMaskLength();
                        if (pos.begin == 0 && pos.end == maskL) {
                            buffer = _buffer.slice();
                            writeBuffer(input, buffer);
                            caret(input, checkVal(input, buffer, false));
                        } else if ((pos.end - pos.begin) > 1 || ((pos.end - pos.begin) == 1 && opts.insertMode)) {
                            clearBuffer(buffer, pos.begin, pos.end);
                            writeBuffer(input, buffer, isRTL ? checkVal(input, buffer, false) : pos.begin);
                        } else {
                            var beginPos = pos.begin - (k == opts.keyCode.DELETE ? 0 : 1);
                            if (beginPos < firstMaskPos && k == opts.keyCode.DELETE) {
                                beginPos = firstMaskPos;
                            }
                            if (beginPos >= firstMaskPos) {
                                if (opts.numericInput && opts.greedy && k == opts.keyCode.DELETE && buffer[beginPos] == opts.radixPoint) {
                                    beginPos = seekNext(buffer, beginPos);
                                    isRTL = false;
                                }
                                if (isRTL) {
                                    beginPos = shiftR(firstMaskPos, beginPos, getPlaceHolder(beginPos), true);
                                    beginPos = (opts.numericInput && opts.greedy && k == opts.keyCode.BACKSPACE && buffer[beginPos + 1] == opts.radixPoint) ? beginPos + 1 : seekNext(buffer, beginPos);
                                } else
                                    beginPos = shiftL(beginPos, maskL);
                                writeBuffer(input, buffer, beginPos);
                            }
                        }
                        if (input._valueGet() == _buffer.join(''))
                            $(input).trigger('cleared');
                        return false;
                    } else if (k == opts.keyCode.END || k == opts.keyCode.PAGE_DOWN) {
                        setTimeout(function() {
                            var caretPos = checkVal(input, buffer, false, true);
                            if (!opts.insertMode && caretPos == getMaskLength() && !e.shiftKey)
                                caretPos--;
                            caret(input, e.shiftKey ? pos.begin : caretPos, caretPos);
                        }, 0);
                        return false;
                    } else if (k == opts.keyCode.HOME || k == opts.keyCode.PAGE_UP) {
                        caret(input, 0, e.shiftKey ? pos.begin : 0);
                        return false;
                    } else if (k == opts.keyCode.ESCAPE) {
                        input._valueSet(undoBuffer);
                        caret(input, 0, checkVal(input, buffer));
                        return false;
                    } else if (k == opts.keyCode.INSERT) {
                        opts.insertMode = !opts.insertMode;
                        caret(input, !opts.insertMode && pos.begin == getMaskLength() ? pos.begin - 1 : pos.begin);
                        return false;
                    } else if (e.ctrlKey && k == 88) {
                        setTimeout(function() {
                            caret(input, checkVal(input, buffer, true));
                        }, 0);
                    } else if (!opts.insertMode) {
                        if (k == opts.keyCode.RIGHT) {
                            var caretPos = pos.begin == pos.end ? pos.end + 1 : pos.end;
                            caretPos = caretPos < getMaskLength() ? caretPos : pos.end;
                            caret(input, e.shiftKey ? pos.begin : caretPos, e.shiftKey ? caretPos + 1 : caretPos);
                            return false;
                        } else if (k == opts.keyCode.LEFT) {
                            var caretPos = pos.begin - 1;
                            caretPos = caretPos > 0 ? caretPos : 0;
                            caret(input, caretPos, e.shiftKey ? pos.end : caretPos);
                            return false;
                        }
                    }
                    opts.onKeyDown.call(this, e, opts);
                    ignorable = $.inArray(k, opts.ignorables) != -1;
                }
                function keypressEvent(e) {
                    if (skipKeyPressEvent)
                        return false;
                    skipKeyPressEvent = true;
                    var input = this
                      , $input = $(input);
                    e = e || window.event;
                    var k = e.which || e.charCode || e.keyCode;
                    if (opts.numericInput && k == opts.radixPoint.charCodeAt(opts.radixPoint.length - 1)) {
                        var nptStr = input._valueGet();
                        var radixPosition = nptStr.indexOf(opts.radixPoint);
                        caret(input, seekNext(buffer, radixPosition != -1 ? radixPosition : getMaskLength()));
                    }
                    if (e.ctrlKey || e.altKey || e.metaKey || ignorable) {
                        return true;
                    } else {
                        if (k) {
                            $input.trigger('input');
                            var pos = caret(input)
                              , c = String.fromCharCode(k)
                              , maskL = getMaskLength();
                            clearBuffer(buffer, pos.begin, pos.end);
                            if (isRTL) {
                                var p = opts.numericInput ? pos.end : seekPrevious(buffer, pos.end), np;
                                if ((np = isValid(p == maskL || getBufferElement(buffer, p) == opts.radixPoint ? seekPrevious(buffer, p) : p, c, buffer, false)) !== false) {
                                    if (np !== true) {
                                        p = np.pos || pos;
                                        c = np.c || c;
                                    }
                                    var firstUnmaskedPosition = firstMaskPos;
                                    if (opts.insertMode == true) {
                                        if (opts.greedy == true) {
                                            var bfrClone = buffer.slice();
                                            while (getBufferElement(bfrClone, firstUnmaskedPosition, true) != getPlaceHolder(firstUnmaskedPosition) && firstUnmaskedPosition <= p) {
                                                firstUnmaskedPosition = firstUnmaskedPosition == maskL ? (maskL + 1) : seekNext(buffer, firstUnmaskedPosition);
                                            }
                                        }
                                        if (firstUnmaskedPosition <= p && (opts.greedy || buffer.length < maskL)) {
                                            if (buffer[firstMaskPos] != getPlaceHolder(firstMaskPos) && buffer.length < maskL) {
                                                var offset = prepareBuffer(buffer, -1, isRTL);
                                                if (pos.end != 0)
                                                    p = p + offset;
                                                maskL = buffer.length;
                                            }
                                            shiftL(firstUnmaskedPosition, opts.numericInput ? seekPrevious(buffer, p) : p, c);
                                        } else
                                            return false;
                                    } else
                                        setBufferElement(buffer, opts.numericInput ? seekPrevious(buffer, p) : p, c);
                                    writeBuffer(input, buffer, opts.numericInput && p == 0 ? seekNext(buffer, p) : p);
                                    setTimeout(function() {
                                        if (isComplete(input))
                                            $input.trigger("complete");
                                    }, 0);
                                } else if (android)
                                    writeBuffer(input, buffer, pos.begin);
                            } else {
                                var p = seekNext(buffer, pos.begin - 1), np;
                                prepareBuffer(buffer, p, isRTL);
                                if ((np = isValid(p, c, buffer, false)) !== false) {
                                    if (np !== true) {
                                        p = np.pos || p;
                                        c = np.c || c;
                                    }
                                    if (opts.insertMode == true) {
                                        var lastUnmaskedPosition = getMaskLength();
                                        var bfrClone = buffer.slice();
                                        while (getBufferElement(bfrClone, lastUnmaskedPosition, true) != getPlaceHolder(lastUnmaskedPosition) && lastUnmaskedPosition >= p) {
                                            lastUnmaskedPosition = lastUnmaskedPosition == 0 ? -1 : seekPrevious(buffer, lastUnmaskedPosition);
                                        }
                                        if (lastUnmaskedPosition >= p)
                                            shiftR(p, buffer.length, c);
                                        else
                                            return false;
                                    } else
                                        setBufferElement(buffer, p, c);
                                    var next = seekNext(buffer, p);
                                    writeBuffer(input, buffer, next);
                                    setTimeout(function() {
                                        if (isComplete(input))
                                            $input.trigger("complete");
                                    }, 0);
                                } else if (android)
                                    writeBuffer(input, buffer, pos.begin);
                            }
                            return false;
                        }
                    }
                }
                function keyupEvent(e) {
                    var $input = $(this)
                      , input = this;
                    var k = e.keyCode;
                    opts.onKeyUp.call(this, e, opts);
                    if (k == opts.keyCode.TAB && $input.hasClass('focus.inputmask') && input._valueGet().length == 0) {
                        buffer = _buffer.slice();
                        writeBuffer(input, buffer);
                        if (!isRTL)
                            caret(input, 0);
                        undoBuffer = input._valueGet();
                    }
                }
            }
            return this;
        }
        ;
    }
}
)(jQuery);
