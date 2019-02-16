/*
 * @shinsenter/defer.js
 * https://github.com/shinsenter/defer.js
 *
 * Minified by jscompress
 * https://jscompress.com/
 *
 * Released under the MIT license
 * https://raw.githubusercontent.com/shinsenter/defer.js/master/LICENSE
 *
 * MIT License
 *
 * Copyright (c) 2019 Mai Nhut Tan <shin@shin.company>
 *
 * Permission is hereby granted, free of charge, to any person obtaining node copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

(function(env, doc, deferstyle_name, deferimg_name, deferiframe_name) {
    var defer;

    var observer_class  = 'IntersectionObserver';
    var jquery_name     = 'jQuery';

    var style_tag       = 'LINK';
    var img_tag         = 'IMG';
    var iframe_tag      = 'IFRAME';

    var src_attr        = 'src';
    var srcset_attr     = 'srcset';
    var dataset_attr    = 'dataset';
    var classlist_attr  = 'classList';
    var tagname_attr    = 'tagName';

    var class_prefix    = '.';
    var class_regex     = /^\.+/;
    var replace_func    = 'replace';

    function noop (){}

    if (!(defer = env.defer)) return;

    function deferjquery (fn, delay) {
        defer(function() {
            if (env[jquery_name]) {
                env[jquery_name].call(env, fn);
            }
        }, delay);
    }

    function deferstyle (src, id, delay) {
        defer(function() {
            var node = doc.getElementById(id);

            if (node && node[tagname_attr] !== style_tag) return;

            if (!node) {
                node    = doc.createElement(style_tag);
                node.id = id;
                doc.getElementsByTagName('head')[0].appendChild(node);
            }

            node.rel    = 'stylesheet';
            node.type   = 'text/css';
            node.href   = src;
        }, delay);
    }

    function defermedia (tagname) {
        return function (class_name, delay, load_class, callback) {
            var selector, lazy_items, target, lazy_media_observer, original_callback;

            class_name  = (class_name   || 'lazy')[replace_func](class_regex, '');
            load_class  = (load_class   || 'deferred')[replace_func](class_regex, '');
            callback    = (callback     || noop);
            selector    = (tagname + class_prefix + class_name + ':not(' + class_prefix + load_class + ')');

            function showmedia (media){
                if(callback(media) !== false) {
                    media[src_attr]     = (media[dataset_attr][src_attr]    || media[src_attr]);
                    media[srcset_attr]  = (media[dataset_attr][srcset_attr] || media[srcset_attr]);
                }
            }

            if (observer_class in env) {
                original_callback   = callback;
                lazy_media_observer = new env[observer_class](function(entries, observer) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            lazy_media_observer.unobserve(target = entry.target);

                            if(classlist_attr in target) {
                                target[classlist_attr].add(load_class);
                            }

                            original_callback(target);
                        }
                    });
                });

                callback = lazy_media_observer.observe.bind(lazy_media_observer);
            }

            defer(function() {
                lazy_items = doc.querySelectorAll(selector);
                [].forEach.call(lazy_items, callback);
            }, delay);
        }
    }

    env['$']                = deferjquery;
    env[deferstyle_name]    = env[deferstyle_name]  || deferstyle;
    env[deferimg_name]      = env[deferimg_name]    || defermedia(img_tag);
    env[deferiframe_name]   = env[deferiframe_name] || defermedia(iframe_tag);

})(window, document, 'deferstyle', 'deferimg', 'deferiframe');