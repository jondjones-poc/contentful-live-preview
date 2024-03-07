import * as contentful from "contentful";
import _ from "lodash";

const getOptions = (is_preview) => {

  let options = {};
  options.space = process.env.CONTENTFUL_SPACE_ID;
  options.host = process.env.CONTENTFUL_HOST;
  options.accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
  options.environment = process.env.CONTENTFUL_ENVIRONMENT || 'master';

  return options;
};

export const getAllLocales = async () => {
  const options = getOptions(false);
  const contentfulClient = contentful.createClient(options);

  let local = await contentfulClient
    .getLocales()
    .then((locales) => {
      let dataType = _.get(locales, "sys.type");
      let items = _.get(locales, "items");
      if (dataType === "Array") {
        return items;
      } else {
        return false;
      }
    })
    .catch((er) => {
      console.log("Error LOCALES", er);
      return false;
    });

    return local;
};

export const getAllPostsForHome = async (preview) => {
  const options = getOptions(preview);
  const contentfulClient = contentful.createClient(options);

  let posts = await contentfulClient
    .getEntries({
      content_type: "post",
    })
    .then((entries) => {
      console.log("getAllPostsForHome", entries);
      let items = _.get(entries, "items");

      if (items) {
        return items;
      } else {
        return false;
      }
    })
    .catch((er) => {
      console.log("ERROR", er);
      return false;
    });

  return posts;
};

export const getPostBySlug = async (slug) => {

  const options = getOptions(true);
  const contentfulClient = contentful.createClient(options);

  let posts = await contentfulClient
    .getEntries({
      content_type: "post",
      "fields.slug": slug,
    })
    .then((entries) => {

      let fields = _.get(entries, "items[0].fields");
      let id = _.get(entries, "items[0].sys.id");

      console.log('getPostBySlug',  id, entries)

      return {...fields, id};
    })
    .catch((er) => {
      console.log("ERROR", er);
      return false;
    });

  return posts;
};

// posts with slug
// @param: boolean
export const getAllPostsWithSlug = async (preview) => {
  const options = getOptions(preview);
  const contentfulClient = contentful.createClient(options);

  let pages = await contentfulClient
    .getEntries({
      content_type: "post",
    })
    .then((entries) => {
      let items = _.get(entries, "items");

      const itemsWithSlug = items.filter((entry) => {
        const slugVal = _.get(entry, "fields.slug");
        if (slugVal) {
          return entry;
        }
      });

      if (itemsWithSlug) {
        return itemsWithSlug;
      } else {
        return false;
      }
    })
    .catch((er) => {
      console.log("ERROR", er);
      return false;
    });

  return pages;
};

export const getPostAndMorePosts = async (slug, preview) => {
  const options = getOptions(preview);

  const contentfulClient = contentful.createClient(options);

  let posts = await contentfulClient
    .getEntries({
      content_type: "post",
    })
    .then((entries) => {
      let items = _.get(entries, "items");
      //   item that matches the provided slug
      const itemsWithThisSlug = items.filter((entry) => {
        const fields = _.get(entry, "fields");
        const slugVal = _.get(entry, "fields.slug");

        if (slugVal === slug) {
          return fields;
        }
      });
      //   all others -> morePosts
      const itemsWithoutThisSlug = items.filter((entry) => {
        const slugVal = _.get(entry, "fields.slug");
        if (slugVal != slug) {
          return entry;
        }
      });

      return {
        post: itemsWithThisSlug,
        morePosts: itemsWithoutThisSlug,
      };
    })
    .catch((er) => {
      console.log("ERROR", er);
      return false;
    });

  return posts;
};