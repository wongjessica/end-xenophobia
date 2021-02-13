/* logic to inject html into divs */
// holds map of html id -> function for its inner content
const context = {};

const add = (identifier, fn) => (context[identifier] = fn);

// sets html with the proper injection
const set_includes = elem => {
  const e = document.getElementById(elem);
  e.innerHTML = context[elem]();
};

// map set_includes onto the page's chosen elements
const includes = elems => {
  elems.forEach(elem => set_includes(elem));
};

/* actual stringified inner html that will be injected in */

add(
  "navbar",
  () => `
    <nav class="navbar">
      <a href="index.html">
        <img alt="logo" src="https://brigidine.org.au/wp-content/uploads/2017/06/Xenophobia-2.jpg"/>
      </a>

      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="articles.html">Articles</a></li>
        <li><a href="resources.html">Resources</a></li>
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
