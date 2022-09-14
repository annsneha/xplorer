let employeeData;

$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  var actions = $("table td:last-child").html();
  // Append table with add row form on add new button click
  $(".add-new").click(function () {
    $(this).attr("disabled", "disabled");
    var index = $("table tbody tr:last-child").index();
    var row =
      "<tr>" +
      '<td><input type="text" class="form-control" name="name" id="name"></td>' +
      '<td><input type="text" class="form-control" name="department" id="department"></td>' +
      '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
      "<td>" +
      actions +
      "</td>" +
      "</tr>";
    $("table").append(row);
    $("table tbody tr")
      .eq(index + 1)
      .find(".add, .edit")
      .toggle();
    $('[data-toggle="tooltip"]').tooltip();
  });

  // Add row on add button click
  $(document).on("click", ".add", function () {
    var empty = false;

    var input = $(this).parents("tr").find('input[type="text"]');

    input.each(function () {
      if (!$(this).val()) {
        $(this).addClass("error");
        empty = true;
      } else {
        // console.log($(this));
        // console.log(employeeData)

      //  const xhr=new XMLHttpRequest();
      //  xhr.open("POST","employee.json");
      //  xhr.setRequestHeader('content-type','application/json;charset=UTF-8');
      //  xhr.send("jay");
      //  xhr.onload=function(){
      //    console.log(this)
      //  }
        console.log($(this).val())
        
        $(this).removeClass("error");
      }
    });
    $(this).parents("tr").find(".error").first().focus();
    if (!empty) {
      input.each(function () {
        $(this).parent("td").html($(this).val());
      });
      $(this).parents("tr").find(".add, .edit").toggle();
      $(".add-new").removeAttr("disabled");
    }
  });
  // Edit row on edit button click
  $(document).on("click", ".edit", function () {
    $(this)
      .parents("tr")
      .find("td:not(:last-child)")
      .each(function () {
        $(this).html(
          '<input type="text" class="form-control" value="' +
            $(this).text() +
            '">'
        );
      });
    $(this).parents("tr").find(".add, .edit").toggle();
    $(".add-new").attr("disabled", "disabled");
  });
  // Delete row on delete button click
  $(document).on("click", ".delete", function () {
    $(this).parents("tr").remove();
    $(".add-new").removeAttr("disabled");
  });
});

function loadData() {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    // console.log(this.responseText);
    employeeData = JSON.parse(this.responseText);
    employeeData.forEach((employee) => {
      $("table tbody")
        .append(`<tr><td>${employee.name}</td><td>${employee.project}</td><td>${employee.phone}</td><td> <a class="add" title="Add" data-toggle="tooltip"><i
		class="material-icons">&#xE03B;</i></a>
<a class="edit" title="Edit" data-toggle="tooltip"><i
		class="material-icons">&#xE254;</i></a>
<a class="delete" title="Delete" data-toggle="tooltip"><i
		class="material-icons">&#xE872;</i></a></td></tr>`);
    });
  };
  xhr.open("GET", "./employee.json");
  xhr.send();
}

loadData();
