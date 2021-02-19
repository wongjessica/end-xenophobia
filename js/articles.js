const getInformation = async fetch => {
  const links = [
    "https://www.unicefusa.org/stories/5-ways-fight-racism-and-xenophobia/34567",
    "https://greatergood.berkeley.edu/article/item/antiracist_resources_from_greater_good",
    "https://www.washington.edu/raceequity/resources/anti-racism-resources/",
    "https://www.insidehighered.com/views/2020/05/14/inclusive-teaching-needed-help-combat-xenophobia-racism-and-discrimination-brought"
  ];

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
          <p><img src="${image}" style="height: 7rem;width: 7rem;float: left;"/><p/>
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
