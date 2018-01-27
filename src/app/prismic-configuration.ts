

export interface PrismicConfiguration {
  apiEndpoint: string;
  accessToken?: string;
  linkResolver: Function;
};

export const CONFIG: PrismicConfiguration = {
  apiEndpoint: "https://charshu.prismic.io/api/v2",
  linkResolver(doc: any) {
    if (doc.type === "collection") {
        return `/runway/` + encodeURIComponent(doc.uid);
      }
    // require link document article.link and category.menu
    // don't forget to fetch them when you are making queries
    let category = doc.data.link;
    let menu = category.data.menu.value.document;
      if (doc.type === "article") {
        return `/${menu.uid}/` + category.uid + `/` + encodeURIComponent(doc.uid);
      } else if (doc.type === "category") {
        return `/${menu.uid}/` + category.uid;
      }
    return `/error`;
  },
};
