var getDest = $.ajax({
  type: "GET",
  url: "http://localhost:3000/destinations/",
});
var getRes = $.ajax({
  type: "GET",
  url: "http://localhost:3000/reservations/",
});

// Destinations Table
getDest.done(function (destinacije) {
  $.each(destinacije, function (i, podatak) {
    $("#tbody").append('<tr><td>' + podatak.destination + '</td><td>' + podatak.startingDate + '</td><td>' + podatak.duration + '</td><td>' + podatak.price + '</td><td><button id="' + podatak.id + '" class="btn btn-outline-orange btn-details">Detalji</button></td><td><button id="' + podatak.id + '" class="btn btn-outline-orange btn-reservations">Rezerviši</button></td></tr>');
  });
  $("#tabela").dataTable({
  });
});
getDest.fail(function(destinacije){
  alert(destinacije.statusText);
});
// Destinations Table END

// Details & Reservation Buttons
 $("#tabela tbody").on('click', 'button', function () {
   if($(this).hasClass("btn-details")) {
     var btnDetails = $(this);
     var destinacijeId = $.ajax({
       type: "GET",
       url: "http://localhost:3000/destinations/" + btnDetails.attr("id"),
     });
     destinacijeId.done(function (detalji) {
         $.each(destinacijeId, function (i, podatak) {
         $("#detailsModal").modal("toggle");
         $("#modalHeader").text(podatak.destination);
         $("#modalImage").attr("src", podatak.imagesource);
         $("#modalText").text(podatak.modaltext);
       });
     })
   } else if ($(this).hasClass("btn-reservations")) {
      var btnMakeRes = $(this);
      var rezervacijeId = $.ajax({
        type: "GET",
        url: "http://localhost:3000/destinations/" + btnMakeRes.attr("id"),
      });
      rezervacijeId.done(function (rezervisi) {
      $.each(rezervacijeId, function (i, podatak) {
        $("#reservationsModal").modal("toggle");
        $("#modal1").text(podatak.destination);
        $("#modal2").text(podatak.price);
      });
    });
    // Validate Form & Submit
    $("#forma").validate({
      rules: {
        ime: {
          required: true,
          minlength: 3
        },
        email: "required",
        prezime: {
          required: true,
          minlength: 3
        },
        jmbg: {
          required: true,
          minlength: 13
        },
        komentar: "required",
      },
      messages: {
        ime: {
          required: "Unesite Vaše ime",
          minlength: "Ime mora imati najmanje 3 karaktera"
        },
        email: "Unesite validnu e-mail adresu",
        prezime: {
          required: "Unesite Vaše prezime",
          minlength: "Prezime mora imati najmanje 3 karaktera"
        },
        jmbg: {
          required: "Unesite Vaš JMBG",
          minlength: "JMBG ima 13 karaktera"
        },
        komentar: "Unesite komentar",
      },
      submitHandler: function() {
        var imeRez = $("#ime").val();
        var prezimeRez = $("#prezime").val();
        var emailRez = $("#email").val();
        var jmbgRez = $("#jmbg").val();
        var komentarRez = $("#komentar").val();
        var destinacijaRez = $("#modal1").text();
        var cenaRez = $("#modal2").text();
        var rezervacija = {ime: imeRez, prezime: prezimeRez, email: emailRez, jmbg: jmbgRez, komentar: komentarRez, destinacija: destinacijaRez, cena: cenaRez};
        $.ajax ({
        url: "http://localhost:3000/reservations/",
        type: "POST",
        data: rezervacija,
        success:function () {
          $("#forma").trigger("reset");
          $("#reservationsModal").modal("toggle");
          $(location).attr("href", "booking.html")
        }
       })
      }
    })
    // Validate Form & Submit END
  }
});
// Details & Reservation Buttons END

//View Reservations
$("#tabela2Wrapper").css("display", "none");
function showReservations() {
  $("#tabela2Wrapper").css("display", "block");
  $("#tabelaWrapper").css("display", "none");
  $("#viewReservations").css("display", "none");
}

getRes.done(function (podaciRez) {
  $.each(podaciRez, function (i, podatak) {
    $("#tbody2").append('<tr><td>' + podatak.ime + '</td><td>' + podatak.prezime + '</td><td>' + podatak.email + '</td><td>' + podatak.destinacija + '</td><td>' + podatak.cena + '</td><td>' + podatak.komentar  + '</td><td><button id="' + podatak.id + '" class="btn btn-outline-orange btn-edit">Izmeni</button></td><td><button id="' + podatak.id + '" class="btn btn-outline-orange btn-delete">Obriši</button></td></tr>');
  });
  $("#tabela2").dataTable({
});
});
getRes.fail(function(podaciRez){
  alert(podaciRez.statusText);
});
//View Reservations  END

//Edit & Delete Reservations
$("#tabela2 tbody").on('click', 'button', function () {
  if($(this).hasClass("btn-delete")) {
    var btnDelete = $(this);
    $.ajax({
      url: "http://localhost:3000/reservations/" + btnDelete.attr("id"),
      type: "DELETE"
    });
    $(btnDelete).parent().parent().remove();
   } else if ($(this).hasClass("btn-edit")) {
     $("#reservationsModal").modal("toggle");
     var btnEditRes = $(this);
     var tr = this.parentNode.parentNode;
     $("#ime").attr("placeholder", tr.cells[0].childNodes[0].data);
     $("#prezime").attr("placeholder", tr.cells[1].childNodes[0].data);
     $("#email").attr("placeholder", tr.cells[2].childNodes[0].data);
     $("#modal1").text(tr.cells[3].childNodes[0].data);
     $("#modal2").text(tr.cells[4].childNodes[0].data);
     $("#komentar").attr("placeholder", tr.cells[5].childNodes[0].data);
     // Validate Form
     $("#forma").validate({
       rules: {
         ime: {
           required: true,
           minlength: 3
         },
         email: "required",
         prezime: {
           required: true,
           minlength: 3
         },
         jmbg: {
           required: true,
           minlength: 13
         },
         komentar: "required",
       },
       messages: {
         ime: {
           required: "Unesite Vaše ime",
           minlength: "Ime mora imati najmanje 3 karaktera"
         },
         email: "Unesite validnu e-mail adresu",
         prezime: {
           required: "Unesite Vaše prezime",
           minlength: "Prezime mora imati najmanje 3 karaktera"
         },
         jmbg: {
           required: "Unesite Vaš JMBG",
           minlength: "JMBG ima 13 karaktera"
         },
         komentar: "Unesite komentar",
       },
       submitHandler: function() {
         var imeRez = $("#ime").val();
         var prezimeRez = $("#prezime").val();
         var emailRez = $("#email").val();
         var jmbgRez = $("#jmbg").val();
         var komentarRez = $("#komentar").val();
         var destinacijaRez = $("#modal1").text();
         var cenaRez = $("#modal2").text();
         var rezervacija = {ime: imeRez, prezime: prezimeRez, email: emailRez, jmbg: jmbgRez, komentar: komentarRez, destinacija: destinacijaRez, cena: cenaRez};
         $.ajax ({
         url: "http://localhost:3000/reservations/" + btnEditRes.attr("id"),
         type: "PUT",
         data: rezervacija,
         success:function () {
           $("#forma").trigger("reset");
           $("#reservationsModal").modal("toggle");
           $(location).attr("href", "booking.html")
         }
        })
       }
     })
    };
 });
//Edit & Delete Reservations END
