/**
 * Custom Context Menu for Openlayers 3
 * https://github.com/jonataswalker/ol3-contextmenu
 * Version: v2.2.4
 * Built: 2016-09-01T19:04:10-03:00
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.ContextMenu=t()}(this,function(){"use strict";var e="ol-ctx-menu",t="-container",n="-separator",i="-submenu",s="-hidden",o="-icon",a="-zoom-in",r="-zoom-out",l="ol-unselectable",c={isNumeric:function(e){return/^\d+$/.test(e)},classRegex:function(e){return new RegExp("(^|\\s+) "+e+" (\\s+|$)")},addClass:function(e,t,n){var i=this;if(Array.isArray(e))return void e.forEach(function(e){i.addClass(e,t)});for(var s=Array.isArray(t)?t:t.split(/\s+/),o=s.length;o--;)i.hasClass(e,s[o])||i._addClass(e,s[o],n)},_addClass:function(e,t,n){var i=this;e.classList?e.classList.add(t):e.className=(e.className+" "+t).trim(),n&&this.isNumeric(n)&&window.setTimeout(function(){i._removeClass(e,t)},n)},removeClass:function(e,t,n){var i=this;if(Array.isArray(e))return void e.forEach(function(e){i.removeClass(e,t,n)});for(var s=Array.isArray(t)?t:t.split(/\s+/),o=s.length;o--;)i.hasClass(e,s[o])&&i._removeClass(e,s[o],n)},_removeClass:function(e,t,n){var i=this;e.classList?e.classList.remove(t):e.className=e.className.replace(this.classRegex(t)," ").trim(),n&&this.isNumeric(n)&&window.setTimeout(function(){i._addClass(e,t)},n)},hasClass:function(e,t){return e.classList?e.classList.contains(t):this.classRegex(t).test(e.className)},toggleClass:function(e,t){var n=this;return Array.isArray(e)?void e.forEach(function(e){n.toggleClass(e,t)}):void(e.classList?e.classList.toggle(t):this.hasClass(e,t)?this._removeClass(e,t):this._addClass(e,t))},$:function(e){return e="#"===e[0]?e.substr(1,e.length):e,document.getElementById(e)},isElement:function(e){return"HTMLElement"in window?!!e&&e instanceof HTMLElement:!!e&&"object"==typeof e&&1===e.nodeType&&!!e.nodeName},find:function(e,t,n){void 0===t&&(t=window.document);var i=/^(#?[\w-]+|\.[\w-.]+)$/,s=/\./g,o=Array.prototype.slice,a=[];if(i.test(e))switch(e[0]){case"#":a=[this.$(e.substr(1))];break;case".":a=o.call(t.getElementsByClassName(e.substr(1).replace(s," ")));break;default:a=o.call(t.getElementsByTagName(e))}else a=o.call(t.querySelectorAll(e));return n?a:a[0]},getAllChildren:function(e,t){return[].slice.call(e.getElementsByTagName(t))},isEmpty:function(e){return!e||0===e.length},emptyArray:function(e){for(;e.length;)e.pop()},removeAllChildren:function(e){for(;e.firstChild;)e.removeChild(e.firstChild)},mergeOptions:function(e,t){var n={};for(var i in e)n[i]=e[i];for(var s in t)n[s]=t[s];return n},createFragment:function(e){var t=document.createDocumentFragment(),n=document.createElement("div");for(n.innerHTML=e;n.firstChild;)t.appendChild(n.firstChild);return t},contains:function(e,t){return!!~t.indexOf(e)},isDefAndNotNull:function(e){return null!=e},assertEqual:function(e,t,n){if(e!=t)throw new Error(n+" mismatch: "+e+" != "+t)},assert:function(e,t){if(void 0===t&&(t="Assertion failed"),!e){if("undefined"!=typeof Error)throw new Error(t);throw t}}},u={BEFOREOPEN:"beforeopen",OPEN:"open",CLOSE:"close",ADD_MENU_ENTRY:"add-menu-entry"},d={width:150,default_items:!0},h=[{text:"Zoom In",classname:[e+a,e+o].join(" "),callback:function(e,t){var n=t.getView(),i=ol.animation.pan({duration:1e3,source:n.getCenter()}),s=ol.animation.zoom({duration:1e3,resolution:n.getResolution()});t.beforeRender(i,s),n.setCenter(e.coordinate),n.setZoom(+n.getZoom()+1)}},{text:"Zoom Out",classname:[e+r,e+o].join(" "),callback:function(e,t){var n=t.getView(),i=ol.animation.pan({duration:1e3,source:n.getCenter()}),s=ol.animation.zoom({duration:1e3,resolution:n.getResolution()});t.beforeRender(i,s),n.setCenter(e.coordinate),n.setZoom(+n.getZoom()-1)}}],m=function(e){return this.Base=e,this.map=void 0,this.map_element=void 0,this.coordinate_clicked=void 0,this.pixel_clicked=void 0,this.counter=0,this.lineHeight=0,this.items={},this.submenu={left:this.Base.options.width-15+"px",last_left:""},this.event_handler=this.handleEvent.bind(this),this};m.prototype.init=function(e){this.map=e,this.map_element=e.getTargetElement(),this.setListeners(),this.Base.constructor.Html.createMenu(),this.lineHeight=this.getItemsLength()>0?this.Base.container.offsetHeight/this.getItemsLength():this.Base.constructor.Html.cloneAndGetLineHeight()},m.prototype.getItemsLength=function(){var e=this,t=0;return Object.keys(this.items).forEach(function(n){e.items[n].submenu||e.items[n].separator||t++}),t},m.prototype.getPixelClicked=function(){return this.pixel_clicked},m.prototype.getCoordinateClicked=function(){return this.coordinate_clicked},m.prototype.positionContainer=function(t){var n=this,o=this.map.getSize(),a=o[0],r=o[1],l=r-t[1],u=a-t[0],d={w:this.Base.container.offsetWidth,h:Math.round(this.lineHeight*this.getItemsLength())},h=c.find("li."+e+i+">ul",this.Base.container,!0);u>=d.w?(this.Base.container.style.right="auto",this.Base.container.style.left=t[0]+5+"px"):(this.Base.container.style.left="auto",this.Base.container.style.right="15px"),l>=d.h?(this.Base.container.style.bottom="auto",this.Base.container.style.top=t[1]-10+"px"):(this.Base.container.style.top="auto",this.Base.container.style.bottom=0),c.removeClass(this.Base.container,e+s),h.length&&(u<2*d.w?this.submenu.last_left="-"+d.w+"px":this.submenu.last_left=this.submenu.left,h.forEach(function(e){e.style.left=n.submenu.last_left}))},m.prototype.openMenu=function(e,t){this.positionContainer(e),this.Base.dispatchEvent({type:u.OPEN,pixel:e,coordinate:t})},m.prototype.closeMenu=function(){c.addClass(this.Base.container,e+s),this.Base.dispatchEvent({type:u.CLOSE})},m.prototype.getNextItemIndex=function(){return++this.counter},m.prototype.setListeners=function(){this.map_element.addEventListener("contextmenu",this.event_handler,!1)},m.prototype.removeListeners=function(){this.map_element.removeEventListener("contextmenu",this.event_handler,!1)},m.prototype.handleEvent=function(e){var t=this;t.coordinate_clicked=this.map.getEventCoordinate(e),t.pixel_clicked=this.map.getEventPixel(e),t.Base.dispatchEvent({type:u.BEFOREOPEN,pixel:t.pixel_clicked,coordinate:t.coordinate_clicked}),t.Base.disabled||(e.stopPropagation(),e.preventDefault(),t.openMenu(t.pixel_clicked,t.coordinate_clicked),e.target.addEventListener("mousedown",{handleEvent:function(n){t.closeMenu(),e.target.removeEventListener(n.type,this,!1)}},!1))},m.prototype.setItemListener=function(e,t){var n=this;e&&"function"==typeof this.items[t].callback&&!function(i){e.addEventListener("click",function(e){e.preventDefault();var s={coordinate:n.getCoordinateClicked(),data:n.items[t].data||null};n.closeMenu(),i.call(void 0,s,n.map)},!1)}(this.items[t].callback)};var p=function(e){return this.Base=e,this.Base.container=this.container=this.createContainer(),this};p.prototype.createContainer=function(){var n=document.createElement("ul");return n.className=[e+t,e+s,l].join(" "),n.style.width=parseInt(this.Base.options.width,10)+"px",n},p.prototype.createMenu=function(){var e=this.Base.options,t=[];return"items"in e?t=e.default_items?e.items.concat(h):e.items:e.default_items&&(t=h),0!==t.length&&void t.forEach(this.addMenuEntry,this)},p.prototype.addMenuEntry=function(n){var s=this,o=this.Base.constructor.Internal,a=o.getNextItemIndex(),r=e+i;if(n.items&&Array.isArray(n.items)){n.classname=n.classname||"",c.contains(r,n.classname)||(n.classname=n.classname.length>0?" "+r:r);var l=this.generateHtmlAndPublish(this.container,n,a),u=document.createElement("ul");u.className=e+t,u.style.left=o.submenu.last_left||o.submenu.left,u.style.width=this.Base.options.width+"px",l.appendChild(u),n.items.forEach(function(e){s.generateHtmlAndPublish(u,e,o.getNextItemIndex(),!0)})}else this.generateHtmlAndPublish(this.container,n,a)},p.prototype.generateHtmlAndPublish=function(t,i,s,a){var r,l,u,d=!1,h=this.Base.constructor.Internal;return"string"==typeof i&&"-"==i.trim()?(r=['<li id="index',s,'" class="',e,n,'"><hr></li>'].join(""),l=c.createFragment(r),u=[].slice.call(l.childNodes,0)[0],t.appendChild(l),d=!0):(i.classname=i.classname||"",r="<span>"+i.text+"</span>",l=c.createFragment(r),u=document.createElement("li"),i.icon&&(""===i.classname?i.classname=e+o:i.classname.indexOf(e+o)===-1&&(i.classname+=" "+e+o),u.setAttribute("style","background-image:url("+i.icon+")")),u.id="index"+s,u.className=i.classname,u.appendChild(l),t.appendChild(u)),h.items[s]={id:s,submenu:a||0,separator:d,callback:i.callback,data:i.data||null},h.setItemListener(u,s),u},p.prototype.removeMenuEntry=function(e){var t=c.find("#index"+e,this.container);t&&this.container.removeChild(t),delete this.Base.constructor.Internal.items[e]},p.prototype.cloneAndGetLineHeight=function(){var e=this.container.cloneNode(),t=c.createFragment("<span>Foo</span>"),n=c.createFragment("<span>Foo</span>"),i=document.createElement("li"),s=document.createElement("li");i.appendChild(t),s.appendChild(n),e.appendChild(i),e.appendChild(s),this.container.parentNode.appendChild(e);var o=e.offsetHeight/2;return this.container.parentNode.removeChild(e),o};var f=function(e){function t(n){void 0===n&&(n={}),c.assert("object"==typeof n,"@param `opt_options` should be object type!"),this.options=c.mergeOptions(d,n),this.disabled=!1,t.Internal=new m(this),t.Html=new p(this),e.call(this,{element:this.container})}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.clear=function(){Object.keys(t.Internal.items).forEach(function(e){t.Html.removeMenuEntry(e)})},t.prototype.close=function(){t.Internal.closeMenu()},t.prototype.enable=function(){this.disabled=!1},t.prototype.disable=function(){this.disabled=!0},t.prototype.getDefaultItems=function(){return h},t.prototype.extend=function(e){c.assert(Array.isArray(e),"@param `arr` should be an Array."),e.forEach(this.push,this)},t.prototype.pop=function(){var e=Object.keys(t.Internal.items);t.Html.removeMenuEntry(e[e.length-1])},t.prototype.push=function(e){c.assert(c.isDefAndNotNull(e),"@param `item` must be informed."),t.Html.addMenuEntry(e,t.Internal.getNextItemIndex())},t.prototype.shift=function(){t.Html.removeMenuEntry(Object.keys(t.Internal.items)[0])},t.prototype.setMap=function(e){ol.control.Control.prototype.setMap.call(this,e),e?t.Internal.init(e):t.Internal.removeListeners()},t}(ol.control.Control);return f});
