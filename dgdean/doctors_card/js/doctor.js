const form = $('form')[0];

function urldecode(str) {
   return decodeURIComponent((str+'').replace(/\+/g, '%20'));
}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  //Collect data from inputs
  let formData = serialize(form);
  // console.log(serialize(form));

  let newData = formData.split('&');
  // console.log(newData);

  let data = {};
  for (let i = 0; i < newData.length; i++) {
      let split = newData[i].split('=');
      data[split[0].trim()] = split[1].trim();
  }

  // console.log(data)
  form.reset();

  //fix odd placeholder bug after reset
  $('#name').focus();
  $('#website').focus();
  $('#name').focus();

  let cards = $('.doctor__cards')[0];

  // remove message if no cards are there
  if($(".empty")[0]){
    $(".empty")[0].parentNode.removeChild($(".empty")[0]);
    removed = false;
  }

  //build card and append to document
  let cardTemplate = '<div class="card '+ urldecode(data.doctor) +'"><h2 class="doctor__name">'+ urldecode(data.name) +'</h2><p class="doctor__type">'+ urldecode(data.doctor) +'</p><p class="doctor__website"><a href="'+ urldecode(data.website) +'">Website</a></p></div>'
  let el = m(cardTemplate);

  cards.appendChild(el);
});
