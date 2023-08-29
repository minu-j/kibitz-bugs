module.exports = {
  importOrder: [
    "^@utils/(.*)$",
    "^@api/(.*)$",
    "^@recoil/(.*)$",
    "^@pages/(.*)$",
    "^@components/(.*)$",
    "^@styles/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
