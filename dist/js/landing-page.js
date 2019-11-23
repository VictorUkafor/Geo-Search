"use strict";var body=document.querySelector("#body"),main=document.createElement("div"),header=document.createElement("header"),section=document.createElement("section"),intro=document.createElement("div"),form=document.createElement("form"),message=document.createElement("div"),features=document.createElement("div"),footer=document.createElement("footer");main.setAttribute("id","centering"),header.innerHTML='<h1 class="logo"><a href="index.html">\n<span class="geo">Geo</span><span>Search</span></a></h1>',main.appendChild(header),section.classList.add("content"),intro.classList.add("intro"),intro.innerHTML='<h1><span>Welcome to </span>\n<span class="bg-logo"><span class="geo">Geo</span>\n<span>Search</span></span></h1>\n<p>Search and explore interesting\nplaces around the globe. Share your experience</p>',section.appendChild(intro),form.innerHTML='<div class="search">\n<input autocomplete="off" type="text" id="field-search"\n class="search-field" name="search"><button type="submit" \nclass="search-button">Explore</button></div>',section.appendChild(form),message.classList.add("message"),section.appendChild(message),main.appendChild(section),features.classList.add("features"),featureList.forEach((function(e){var n=document.createElement("div");n.classList.add("feature"),n.innerHTML='<h3><i class="fa '.concat(e.fa,' fa-img"></i>\n    <span>').concat(e.heading,"</span></h3><p>").concat(e.paragraph,"</p>"),features.appendChild(n)})),main.appendChild(features),body.appendChild(main),footer.innerHTML='<p>&copy; Copyright 2019. \n&nbsp; All rights reserved. &nbsp; Designed \nand developed by <a href="https://github.com/VictorUkafor">\nVictor Ukafor</a></p>',body.appendChild(footer);