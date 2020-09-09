// GLOBAL

let addressList = [];
let clearList = [];
let favouritesList = [];
let state = "";
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
    email: email,
    favourite: false
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
    if (addressList[i].favourite == true) {
      state = "active";
    }
    else if (addressList[i].favourite == false) {
      state = ""
    }
    info = `<p class="uk-position-small uk-position-top-right"><span uk-icon="minus"></span></p>
          <h4>${addressList[i].name}</h4>
          <p>${addressList[i].phone}</p>
          <p>${addressList[i].address}</p>
          <p>${addressList[i].email}</p>
          <p class="uk-margin-medium-top"><span id="addFavourites" class="uk-icon-button ${addressList[i].name} ${state}" uk-icon="heart" onclick="addToFavourites('${addressList[i].name}')"></span></p>
          <label><input id="check" class="uk-checkbox uk-position-small uk-position-bottom-right" onclick="checkSelected(this)" type="checkbox"></label>`
    div = document.createElement('div');
    div.className = 'uk-card uk-card-default uk-card-body';
    div.innerHTML = info;
    document.getElementById('addresses').appendChild(div);
  }
}

// DISPLAY FAVOURITE CONTACTS

const displayFavourites = () => {
  button = document.getElementById("favourites");
  if (button.innerHTML == "Show All") {
    displayAddress();
    button.innerHTML = "Only Favourites";
    return 0;
  }
  else if (button.innerHTML == "Only Favourites") {
    button.innerHTML = "Show All";
  }
  let state = "active";
  let contentDiv = document.getElementById('addresses');
  contentDiv.innerHTML = null;
  divAdd = document.createElement('div');
  divAdd.className = 'uk-card uk-card-default uk-card-body';
  divAdd.innerHTML = addNewContactDiv;
  document.getElementById('addresses').appendChild(divAdd);
  for (var i = 0; i < addressList.length; i++) {
    info = `<p class="uk-position-small uk-position-top-right"><span uk-icon="minus"></span></p>
          <h4>${favouritesList[i].name}</h4>
          <p>${favouritesList[i].phone}</p>
          <p>${favouritesList[i].address}</p>
          <p>${favouritesList[i].email}</p>
          <p class="uk-margin-medium-top"><span id="addFavourites" class="uk-icon-button ${favouritesList[i].name} ${state}" uk-icon="heart" onclick="addToFavourites('${addressList[i].name}')"></span></p>
          <label><input id="check" class="uk-checkbox uk-position-small uk-position-bottom-right" onclick="checkSelected(this)" type="checkbox"></label>`
    div = document.createElement('div');
    div.className = 'uk-card uk-card-default uk-card-body';
    div.innerHTML = info;
    document.getElementById('addresses').appendChild(div);
  }
}

// CLEAR ALL

const clearAll = () => {
  favouritesList = [];
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
        favouritesList.splice(i, 1);
      }
    }
  }
  displayAddress();
}


// FAVOURITE HEART

const addToFavourites = (props) => {
  const result = addressList.find(({ name }) => name === CSS.escape(props));
  heartState = document.getElementsByClassName(CSS.escape(props));
  if (result.favourite == false) {
    result.favourite = true;
    heartState[0].classList.add("active");
    favouritesList.push(result);
  }
  else if (result.favourite == true) {
    result.favourite = false;
    heartState[0].classList.remove("active");
    let index = favouritesList.findIndex(i => i.name === CSS.escape(props));
    if (index !== -1) favouritesList.splice(index, 1);
  }
  console.log(favouritesList);
}


// SEARCH SYSTEM

const searchAddress = (props) => {
  let searchValue = document.getElementById("search-bar").value
  let query = addressList.find((address) => address.name === searchValue);
  if (query == undefined) alert("There is no contact with this name")
  else {
    let contentDiv = document.getElementById('addresses');
    contentDiv.innerHTML = null;
    divAdd = document.createElement('div');
    divAdd.className = 'uk-card uk-card-default uk-card-body';
    divAdd.innerHTML = addNewContactDiv;
    document.getElementById('addresses').appendChild(divAdd);
      info = `<p class="uk-position-small uk-position-top-right"><span uk-icon="minus"></span></p>
            <h4>${query.name}</h4>
            <p>${query.phone}</p>
            <p>${query.address}</p>
            <p>${query.email}</p>
            <p class="uk-margin-medium-top"><span id="addFavourites" class="uk-icon-button ${query.name} ${state}" uk-icon="heart" onclick="addToFavourites('${query.name}')"></span></p>
            <label><input id="check" class="uk-checkbox uk-position-small uk-position-bottom-right" onclick="checkSelected(this)" type="checkbox"></label>`
      div = document.createElement('div');
      div.className = 'uk-card uk-card-default uk-card-body';
      div.innerHTML = info;
      document.getElementById('addresses').appendChild(div);
    
  }
}

