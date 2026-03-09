// ===============================
// GOOGLE SHEET URL
// ===============================
const sheetURL =
  "https://docs.google.com/spreadsheets/d/1SkFWbd69rns-TTFz28EpXKQvz0gNQnuqqzHaxN43AbQ/gviz/tq?tqx=out:csv&sheet=Sheet1";


// ===============================
// GLOBAL VARIABLES
// ===============================

let currentKarat = "22";


// ===============================
// KARAT TAB SWITCH
// ===============================

function setKarat(button, karat) {

  // remove active class
  document.querySelectorAll(".karat-tab").forEach(tab => {
    tab.classList.remove("active");
  });

  // add active class
  button.classList.add("active");

  currentKarat = karat;

  loadRates();
}


// ===============================
// LOAD GOLD PRICE FROM GOOGLE SHEET
// ===============================

function loadRates() {

  fetch(sheetURL)
    .then(response => response.text())
    .then(data => {

      let rows = data.split("\n");

      if (rows.length < 2) return;

      let columns = rows[1].split(",");

      let gold18 = columns[1];
      let gold22 = columns[2];
      let gold24 = columns[3];
      let silver = columns[4];
      let date = columns[5];
      let time = columns[6];

      let goldPrice = gold22;

      if (currentKarat === "18") {
        goldPrice = gold18;
      }

      if (currentKarat === "22") {
        goldPrice = gold22;
      }

      if (currentKarat === "24") {
        goldPrice = gold24;
      }

      // update UI

      document.getElementById("goldPrice").innerHTML = "₹" + goldPrice;

      document.getElementById("silverPrice").innerHTML = "₹" + silver;

      document.getElementById("rateDate").innerHTML = date;

      document.getElementById("rateTime").innerHTML = time;

      document.getElementById("goldUnit").innerHTML =
        "per gram · " + currentKarat + " KT";

      document.getElementById("lastUpdated").innerHTML =
        "Updated just now";

    })

    .catch(error => {
      console.log("Error loading sheet:", error);
    });
}



// ===============================
// REFRESH BUTTON
// ===============================

function refreshRates(button) {

  const icon = document.getElementById("refreshIcon");

  if (icon) {
    icon.style.transform = "rotate(360deg)";
  }

  loadRates();

}



// ===============================
// CARD TOGGLE EFFECT
// ===============================

function toggleCard(card) {

  document.querySelectorAll(".metal-card").forEach(c => {
    c.classList.remove("active");
  });

  card.classList.add("active");

}



// ===============================
// PAGE LOAD
// ===============================

document.addEventListener("DOMContentLoaded", function () {

  loadRates();

});



// ===============================
// AUTO REFRESH EVERY 5 MINUTES
// ===============================

setInterval(loadRates, 300000);