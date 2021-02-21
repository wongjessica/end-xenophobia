const getInformation = async (fetch, links) => {
  const linkInformations = links.map(link =>
    fetch(link)
      .then(res => res.text())
      .then(data => data.split("\n"))
      .then(lines =>
        ["title", "description", "image"].map(attribute =>
          lines.filter(item => {
            const regex = new RegExp(`og:${attribute}`, "gi");
            return item.match(regex);
          })
        )
      )
      .then(relevantOgs => relevantOgs.map(relevantOg => relevantOg[0]))
      .then(stringifiedMetas => {
        parser = new DOMParser();
        return stringifiedMetas.map(stringifiedMeta =>
          parser
            .parseFromString(stringifiedMeta, "text/xml")
            .childNodes[0].getAttribute("content")
        );
      })
  );

  const rawInformations = await Promise.all(linkInformations);

  const formattedInformation = rawInformations.reduce(
    (stored, [title, description, image], index) => {
      // TODO: format here
      const information = `
        <div>
          <p><img src="${image}" style="height: 7rem;width: 7rem;float: left;padding-right: 2rem;"/><p/>
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
