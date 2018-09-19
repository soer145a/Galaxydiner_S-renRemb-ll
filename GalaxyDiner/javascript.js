//Start functionen, der tjekker om alt er loadet, og efterfølgende går til at hente min json fil
document.addEventListener("DOMContentLoaded", hentJson);
let dest = document.querySelector(".retterContainer"),
	retter, retFilter = "alle";

document.querySelectorAll(".menu-item").forEach(knap => {
	knap.addEventListener("click", filtrering);
})
//burger menu functionen der får den til at animere når man klikker på den.
function onLoad() {

	// if (window.innerWidth <= 768) {

	function toggleMenu() {
		document.querySelector(".burger").classList.toggle("change");
		document.querySelector("nav").classList.toggle("show");
	}
	document.querySelector(".burger").addEventListener("click", toggleMenu);
	document.querySelector("ul").addEventListener("click", toggleMenu);

}

//den function der tjekker om indeholdet til mit site er loadet færdigt, inden resten af javscriptet tager over.
document.addEventListener("DOMContentLoaded", function (event) {
	onLoad();
});


// en async function der kører før de andre functioner starter, og henter json filen
async function hentJson() {
	let jsonData = await fetch("json.json");
	retter = await jsonData.json();
	console.log("Json er hentet");
	visRetter();
}
//en function der tilføjer et filter til visRetter functionen
function filtrering() {
	dest.textContent = "";
	retFilter = this.getAttribute("data-kategori");
	visRetter();

	console.log("Filter");
}

//en function som står for at få klonet mit indhold fra json filen over til en ny destination, som er min template
//den indeholder også den filtrering som kommer fra overstående function.
//Den gør også at modal vinduet kommer op når man klikker på en af billederne.
function visRetter() {
	let temp = document.querySelector(".retTemplate");
	let dest = document.querySelector(".retterContainer");

	retter.forEach(ret => {
		if (ret.kategori == retFilter || retFilter == "alle") {

			let klon = temp.cloneNode(true).content;
			klon.querySelector("[data-navn]").textContent = ret.navn;
			klon.querySelector("[data-billede]").src = "imgs/" + ret.billede + ".jpg";
			klon.querySelector("[data-billede]").alt = "Billede af " + ret.navn;
			klon.querySelector("img").addEventListener("click", () => {
				visModal(ret);
				console.log("klik på billede");
			})
			klon.querySelector("[data-pris]").textContent = ret.pris;
			dest.appendChild(klon);
		}
	})
}


// en function som gør at modal vinduet kan ses og interageres med
//functionen bruger objektet "ret" til at fører indformationen 
//fra den overstående function, og efterfølgende kloner informationen ind i modal-vinduet.
function visModal(ret) {
	let modal = document.querySelector("#modal");


	document.querySelector("#modal").classList.add("show");

	modal.querySelector("[data-navn]").textContent = ret.navn;
	modal.querySelector("[data-billede]").src = "imgs/" + ret.billede + ".jpg";
	modal.querySelector("[data-billede]").alt = "Billede af " + ret.navn;
	modal.querySelector("[data-beskrivelse]").textContent = ret.beskrivelse;
	modal.querySelector("[data-pris]").textContent = ret.pris;
	modal.querySelector("[data-vegetar]").textContent = ret.vegetar;
	modal.querySelector("button").addEventListener("click", skjulModal);
	modal.querySelector("#modalContent").addEventListener("click", skjulModal);
}
//En function som gør at modal vinduet bliver utilgåeligt igen.
function skjulModal() {
	console.log("Skjul Modal");

	document.querySelector("#modal").classList.remove("show");
}
