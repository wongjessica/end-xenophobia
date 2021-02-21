const getInformation = async (fetch, links) => {
  const linkInformations = links.map(link =>
    fetch(link)
      .then(res => res.text())
      .then(data => data.split("\n")) // extract article html as text
      .then(lines =>
        ["title", "description", "image"].map(attribute =>
          lines.filter(item => {
            const regex = new RegExp(`og:${attribute}`, "gi"); // filter out meta tags
            return item.match(regex);
          })
        )
      )
      .then(relevantOgs => relevantOgs.map(relevantOg => relevantOg[0]))
      .then(stringifiedMetas => {
        parser = new DOMParser(); // create dom parser to interpret string
        return stringifiedMetas.map(stringifiedMeta =>
          parser
            .parseFromString(stringifiedMeta, "text/xml") // interpret meta tags as single xml node
            .childNodes[0].getAttribute("content") // extract actual content
        );
      })
  );

  const rawInformations = await Promise.all(linkInformations);

  const formattedInformation = rawInformations.reduce(
    (stored, [title, description, image], index) => {
      const imageLink = image.substring(image.indexOf("http")); // ensure image link is in proper format
      const information = `
        <div>
          <p><img src="${imageLink}" style="height: 7rem;width: 7rem;float: left;padding-right: 2rem;"/><p/>
          <p><a href="${links[index]}">${title}</a><p/>
          <p>${description}<p/>
        </div>
`;
      return stored + information;
    },
    ""
  );

  return formattedInformation;
};
