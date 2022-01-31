<script></script>
//creation of laurent gremet  laurent.gremet@gmail.com

// INITIALIZATION OF CHIPS COLLECTION
var chipsList = [];

function displayChips() {
  // FILLS THE CHIPS ZONE FROM THE LIST
  $("#chips").push({
    data: chipsList,
  });
}

// ADDING A NEW CHIP
function chipAdd(chipName) {
  chipName = chipName.toLowerCase();
  // test1 : minimum word size
  if (!(chipName.length > 2)) {
    return 0;
  }
  // test2 :  no duplicates
  for (i = 0; i < chipsList.length; i++) {
    if (chipName == chipsList[i].tag) {
      return 0;
    }
  }
  // tests Okay => add the chip and refresh the view
  chipsList.push({ tag: chipName });
  displayChips();
  return 1;
}

$(function () {
  /* // delete chip command
  $("#chips").on("chip.delete", function (e, chip) {
    chipsList = $("#chips").material_chip("data");
  });

  $("#chips").focusin(function () {
    $("#lg-input").focus();
  }); */

  displayChips();

  // NEW CHIP COMMAND
  $("#cmd-ChipsAjout").click(function () {
    chipAdd($("#tags").val());
    $("#tags").val("");
  });
});
