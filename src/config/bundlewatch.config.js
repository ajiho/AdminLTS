module.exports = {
  files: [
    {
      path: "./dist/js/adminlts.js",
      maxSize: "40 KB",
    },
    {
      path: "./dist/css/adminlts.css",
      maxSize: "45 KB",
    },
  ],
  ci: {
    trackBranches: ["master", "dev"],
  },
}
