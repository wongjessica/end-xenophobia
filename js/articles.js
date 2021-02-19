const getInformation = fetch =>
  [
    "https://www.unicefusa.org/stories/5-ways-fight-racism-and-xenophobia/34567",
    "https://greatergood.berkeley.edu/article/item/antiracist_resources_from_greater_good",
    "https://www.washington.edu/raceequity/resources/anti-racism-resources/"
  ]
    .map(link =>
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
        .then(([title, description, image]) =>
          console.log({ title, description, image })
        )
    )
    .reduce((stored, current) => stored, "hello there"); // TODO: make default value "" and return stored + current when done
