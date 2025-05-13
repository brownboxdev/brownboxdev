window.addEventListener("load", function () {
  document
    .querySelector("#showMenu")
    .addEventListener("click", function (event) {
      document.querySelector("#mobileNav").classList.remove("hidden");
    });

  document
    .querySelector("#hideMenu")
    .addEventListener("click", function (event) {
      document.querySelector("#mobileNav").classList.add("hidden");
    });

  document
    .querySelector("#mobileNav")
    .addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        document.querySelector("#mobileNav").classList.add("hidden");
      }
    });
});
