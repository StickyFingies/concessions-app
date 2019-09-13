let content  = document.getElementById("content");
let menu     = document.getElementById("menu");
let checkout = document.getElementById("checkout");
let reciept = document.getElementById("concessions-reciept");
let recieptPrice = document.getElementById("reciept-price");

let price = 0.00;

checkout.onclick = () => {
    price = 0.00;
    recieptPrice.innerText = "$" + price.toFixed(2).toString();

    let recieptItems = document.getElementsByClassName("reciept-item");

    while (recieptItems[0]) {
        recieptItems[0].parentNode.removeChild(recieptItems[0]);
    }

    menu.close();
    ons.notification.toast("<i class='fas fa-check'></i>&nbsp;&nbsp;Order checked out!", {
        timeout: 600
    });
};

const menuItemClickEvent = function (event) {
    const itemName = this.getElementsByClassName("menu-item-name")[0].innerText;
    const itemPrice = this.getElementsByClassName("menu-item-price")[0].innerText.split("$")[1];

    price += Number(itemPrice);

    recieptPrice.innerText = "$" + price.toFixed(2).toString();

    let listItem = document.createElement("ons-list-item", {
        //
    });

    listItem.className = "reciept-item";
    listItem.innerText = itemName;
    listItem.price = itemPrice;
    listItem.onclick = recieptItemClickEvent;

    reciept.children[2].appendChild(listItem);
};

const recieptItemClickEvent = function (event) {
    this.parentNode.removeChild(this);
    price -= this.price;
    recieptPrice.innerText = "$" + price.toFixed(2).toString();
}

function Get(yourUrl) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

window.onload = () => {
    const menuItems = JSON.parse(Get("./menu"));

    setTimeout(() => {
        let foodMenu = document.getElementById("food-menu");
        let drinksMenu = document.getElementById("drinks-menu");
        let candyMenu = document.getElementById("candy-menu");

        for (let foodItem of menuItems.food) {
            let foodElement = document.createElement("ons-list-item");
            foodElement.innerHTML = `<div class="menu-item-name">${foodItem.name}</div><div class="right menu-item-price">$${foodItem.price}</div>`;
            foodElement.setAttribute("tappable");
            foodElement.onclick = menuItemClickEvent;
            foodMenu.appendChild(foodElement);
        }

        for (let drinkItem of menuItems.drinks) {
            let drinkElement = document.createElement("ons-list-item");
            drinkElement.innerHTML = `<div class="menu-item-name">${drinkItem.name}</div><div class="right menu-item-price">$${drinkItem.price}</div>`;
            drinkElement.setAttribute("tappable");
            drinkElement.onclick = menuItemClickEvent;
            drinksMenu.appendChild(drinkElement);
        }

        for (let candyItem of menuItems.candy) {
            let candyElement = document.createElement("ons-list-item");
            candyElement.innerHTML = `<div class="menu-item-name">${candyItem.name}</div><div class="right menu-item-price">$${candyItem.price}</div>`;
            candyElement.setAttribute("tappable");
            candyElement.onclick = menuItemClickEvent;
            candyMenu.appendChild(candyElement);
        }

    }, 600);
}