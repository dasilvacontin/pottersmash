var activeBuff

function onClick (e) {
    if (activeBuff != null) {
        activeBuff.querySelector(".item").style.backgroundColor = "cornflowerblue"
    }
    debugger
    activeBuff = this;
    activeBuff.querySelector(".item").style.backgroundColor = "#007777"
}

var buttons = document.querySelectorAll(".flex-item");
for (var item of buttons) {
  item.onclick = onClick;
  if (item.getAttribute("data-buff") == "MANA") {
    activeBuff = item
    activeBuff.querySelector(".item").style.backgroundColor = "#007777"
  }
}

function tap() {
    alert(activeBuff.getAttribute("data-buff"))
}

document.querySelector("#tap").onclick = tap; 

