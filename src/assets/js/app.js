/*
    Bootstrap and jQuery for Bootstrap
*/
require('./vendors/vendors');

/*
    Lib's
*/
import axios from "axios";
import swal from 'sweetalert';

/*
  Application code
*/
const $form = document.getElementById('form');
const $table = document.getElementById('table');

const dateConvertToLocale = date => date.substring(0,10).split('-').reverse().join('/');

if ($form) {

  $form
    .addEventListener('submit', (event) => {

      event.preventDefault();

      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      const formData = {
        email,
        message
      }
      axios
        .post('/api/create', formData)
        .then(response => {

          swal("Sucesso!", "Seu contato foi enviado!", "success")
            .then(() => {
              window.location.reload();
            });

        }).catch(error => {

          swal("Oops!", "O contato não foi enviado, por favor, revise-os dados enviados e tente novamente!", "error");

        });


    });

}

if ($table) {

  axios
    .get('/api/list')
    .then(response => {

      const data = response.data;
      const $tableBody = $table.getElementsByTagName('tbody')[0];

      if (data.length > 0) {

        data.forEach(item => {

          const tr = document.createElement('tr');
          const template = `
              <td class="col-3">${ item.created_at ? dateConvertToLocale(item.created_at) : 'Data não especificada' }</td>
              <td class="col-4">${ item.email}</td>
              <td class="col-5">${ item.message}</td>
          `
          tr.className = 'd-flex';
          tr.innerHTML = template;

          $tableBody.appendChild(tr);

        });

      } else {

        const tr = document.createElement('tr');

        tr.innerHTML = `<td colspan="3">Não há contatos para serem exibidos!</td>`;

        $tableBody.appendChild(tr);

      }

    })
    .catch(error => {
      console.log(error);
      swal("Oops!", "Não foi possível carregar os contatos, recarregue a página!", "error");
    });

}
