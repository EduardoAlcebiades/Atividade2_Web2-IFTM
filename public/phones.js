function loadPhones(clientId) {
  const table = $("#table-body-phones");

  table.empty();

  if (clientId) $("#client-id").val(clientId);

  const client_id = $("#client-id").val();

  $.get(`http://localhost:3333/phone?client_id=${client_id}`, (phones) => {
    phones.forEach((phone) => {
      table.append(`<tr>
        <td>${phone.id}</td>
        <td><span class="masked">${phone.number}</span></td>
        <td class="small">
          <button class="btn btn-light" title="Preferencial" onclick="storePhone(${
            phone.id
          }, { preferential: ${!phone.preferential} })"><i class="bi ${
        phone.preferential ? "bi-star-fill starred" : "bi-star"
      }"></i></button>
        </td>
        <td class="small">
          <button class="btn btn-info" onclick="loadPhone(${
            phone.id
          })">Editar</button>
        </td>
        <td class="small">
          <button class="btn btn-danger" onclick="deletePhone(${
            phone.id
          })">Excluir</button>
        </td>
      </tr>`);
    });

    $(".masked").mask("(99) 9999-9999");
  });
}

function loadPhone(id) {
  if (id)
    $.get(`/phone/${id}`, (phone) => {
      $("#phone-id").val(phone.id);
      $("#phone-number").mask("").val(phone.number);
      
      $("#phone-number").mask("(99) 9999-9999");
    });
  else {
    $("#phone-id").val("");
    $("#phone-number").val("");
  }
}

function storePhone(id, data) {
  const url = `http://localhost:3333/phone${id ? "/" + id : ""}`;

  $("#form-phone :input").prop("disabled", true);
  $(".phonesContent :button").prop("disabled", true);

  console.log(id);
  $.ajax({
    url,
    type: id ? "PUT" : "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
  })
    .done(() => {
      loadPhone();
      loadPhones();
    })
    .fail((err) => {
      console.log(err);

      alert("Ocorreu um erro ao tentar salvar");
    })
    .always(() => {
      $("#form-phone :input").prop("disabled", false);
    });
}

function deletePhone(id) {
  $.ajax({
    url: `http://localhost:3333/phone/${id}`,
    type: "DELETE",
  })
    .done(() => {
      loadPhone();
      loadPhones();
    })
    .fail((err) => {
      console.log(err);

      alert("Ocorreu um erro ao tentar excluir");
    });
}

function onPhoneSubmit(ev) {
  ev.preventDefault();

  const number = $("#phone-number")
    .val()
    .replace(/[\s()-]/g, "");

  if (number.length < 10) {
    alert("Preencha o número completo");

    return;
  }

  const id = $("#phone-id").val();
  const client_id = $("#client-id").val();

  const data = {
    client_id,
    number,
  };

  storePhone(id, data);
}

$(document).ready(() => {
  $(".masked").mask("(99) 9999-9999");
});
