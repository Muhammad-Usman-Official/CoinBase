export const staticFilesOptions = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["jpg", "png"],
  index: false,
  maxAge: "1d",
  redirect: false,
  setHeaders(res: any, path: any, stat: any) {
    res.set("x-timestamp", Date.now());
  },
};

export const mongoIdPattern = /^[0-9a-fA-f]{24}$/;
