let content  = document.getElementById("content");
let menu     = document.getElementById("menu");
let checkout = document.getElementById("checkout");
let reciept  = document.getElementById("receipt");

checkout.onclick = () => {
	menu.close();
	ons.notification.toast("<i class='fas fa-check'></i>&nbsp;&nbsp;Order checked out!", {
		timeout: 600
	});
};

let menuItems = document.querySelectorAll(".foo ons-list-item");

menuItems.forEach((item) => {
	item.onclick = () => {
		alert("bruh");
	}
});
