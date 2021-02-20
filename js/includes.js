/* logic to inject html into divs */
// holds map of html id -> function for its inner content
const context = {};

const add = (identifier, fn) => (context[identifier] = fn);

// sets html with the proper injection
const set_includes = async elem => {
  const e = document.getElementById(elem);
  e.innerHTML = await context[elem]();
};

// map set_includes onto the page's chosen elements
const includes = async elems => {
  elems.forEach(async elem => await set_includes(elem));
};

/* actual stringified inner html that will be injected in */

add(
  "navbar",
  () => `
    <nav class="navbar">
      <a href="index.html">
        <img alt="logo" src="https://brigidine.org.au/wp-content/uploads/2017/06/Xenophobia-2.jpg"/>
      </a>

      <input type="checkbox" id="menu" class="menu-checkbox"/>
      <ul class="menu">
        ${createNavLinks(window.location.href)}
      </ul>
    </nav>
  `
);

add(
  "footer",
  () => `
    <footer class="footer">
      <p>
        &copy; End Xenophobia
        <br>
        <a href="mailto:hello@end-xenophobia.com">hello@end-xenophobia.com</a>
      </p>
    </footer>
`
);

/* helper functions for certain elements */
const navlinks = ["index", "about", "articles", "resources"];
const navNames = ["Home", "About Us", "Articles", "Resources"];

const createNavLinks = location =>
  navlinks
    .map((navlink, index) =>
      location.includes(navlink)
        ? `<li><a href="${navlink}" id="navLinkVisited">${navNames[index]}</a></li>`
        : `<li><a href="${navlink}.html">${navNames[index]}</a></li>`
    )
    .join("\n        ");
