
export const createPostLink = (slug, mode = "graph") => {

    if (mode === "graph" ) {
        return `/post-graph-page/${slug}`;
    }

    return `/post-rest-page/${slug}`;
}