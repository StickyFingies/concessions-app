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
    const itemName = this.children[1].innerText;
    const itemPrice = this.children[2].innerText.split("$")[1];

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

window.onload = () => {
    setTimeout(() => {
        let listItems = document.querySelectorAll("ons-list.concessions-menu ons-list-item");

        for (let item of listItems) {
            item.onclick = menuItemClickEvent;
        }
    }, 600);
}