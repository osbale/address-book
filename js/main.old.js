// GLOBAL

let addressList = [];
let clearList = [];
let favouritesList = [];
const addNewContactDiv = `<input id="name" class="uk-input uk-input-default uk-margin-medium" type="text" name="" value="" placeholder="Name">
<input id="phoneNumber" class="uk-input uk-input-default" type="text" name="" value="" placeholder="Phone Number">
<input id="emailAddress" class="uk-input uk-input-default uk-margin-small" type="text" name="" value="" placeholder="Email address">
<input id="homeAddress" class="uk-input uk-input-default" type="text" name="" value="" placeholder="Home address">
<button id="addButton" class="uk-button uk-button-default uk-margin-small-top" type="button" name="button" onclick="addAddress()">Add Contact</button>`;

// ADD CONTACTS

const addAddress = () => {
  clearList = [];
  let name = document.getElementById('name').value;
  let phone = document.getElementById('phoneNumber').value;
  let address = document.getElementById('homeAddress').value;
  let email = document.getElementById('emailAddress').value;
  const attributesList = {
    name: name,
    phone: phone,
    address: address,
    email: email
  }
  addressList.push(attributesList);
  displayAddress();
  return addressList;
}


// DISPLAY CONTACTS

const displayAddress = () => {
  let contentDiv = document.getElementById('addresses');
  contentDiv.innerHTML = null;
  divAdd = document.createElement('div');
  divAdd.className = 'uk-card uk-card-default uk-card-body';
  divAdd.innerHTML = addNewContactDiv;
  document.getElementById('addresses').appendChild(divAdd);
  for (var i = 0; i < addressList.length; i++) {
    info = `<p class="uk-position-small uk-position-top-right"><span uk-icon="minus"></span></p>
          <h4>${addressList[i].name}</h4>
          <p>${addressList[i].phone}</p>
          <p>${addressList[i].address}</p>
          <p>${addressList[i].email}</p>
          <p class="uk-margin-medium-top"><span id="addFavourites" class="uk-icon-button" uk-icon="heart" onclick="addToFavourites()"></span></p>
          <label><input id="check" class="uk-checkbox uk-position-small uk-position-bottom-right" onclick="checkSelected(this)"type="checkbox"></label>`
    div = document.createElement('div');
    div.className = 'uk-card uk-card-default uk-card-body';
    div.innerHTML = info;
    document.getElementById('addresses').appendChild(div);
  }
}

// CLEAR ALL

const clearAll = () => {
  addressList = [];
  displayAddress();
}


// CLEAR SELECTED

const checkSelected = () => {
  clearList = [];
  checkBox = document.querySelectorAll("#check");
  for (let i = 0; i < checkBox.length; i++) {
    let selectedName = checkBox[i].parentNode.parentNode.childNodes[2].innerText;
    if (checkBox[i].checked == true) {
      clearList.push(selectedName);
    }
    if (checkBox[i].checked == false) {
      let index = clearList.indexOf(selectedName);
      if (index !== -1) clearList.splice(index, 1);
    }
  }
  console.log(clearList);
  return clearList;
}

const clearSelected = () => {
  for (var i = 0; i < addressList.length; i++) {
    for (var j = 0; j < clearList.length; j++) {
      if (addressList[i].name === clearList[j]) {
        addressList.splice(i, 1);
      }
    }
  }
  displayAddress();
}


// FAVOURITE HEART


const addToFavourites = () => {
  favouritesList = [];
  heart = document.querySelectorAll('#addFavourites');
  for (var i = 0; i < heart.length; i++) {
    if (heart[i].style.backgroundColor == "var(--main-btn-bg-color)" || heart[i].style.backgroundColor == "") {
      heart[i].style.cssText = "color: white; background-color: var(--main-btn-active-color)";
    } else if (heart[i].style.backgroundColor == "var(--main-btn-active-color)") {
      heart[i].style.cssText = "color: white; background-color: var(--main-btn-bg-color)";
    }
  }
}





/*
const onlyFavourites = () => {
  let button = document.getElementById('favourites');
  if (button.innerHTML === "Only Favourites") {
    button.innerHTML = "All Contacts";
    onlyFavouritesFunction();
  }
  else if (button.innerHTML === "All Contacts"){
    button.innerHTML = "Only Favourites";
    backToAllFunction();
  };
}

const onlyFavouritesFunction = () => {

}*/
