let karta = document.querySelectorAll('.add-cart');
let product = [
	{
	Nazwa: "Logitech G PRO GAMING HEADSET",
	tag: "Logitech1",
	Cena: 349,
	wKarcie: 0
},
	{
	Nazwa: "SteelSeries Arctis 5 Czarne",
	tag: "SteelSeries1",
	Cena: 459,
	wKarcie: 0
},
	{
	Nazwa: "SteelSeries Arctis 7 Czarne",
	tag: "SteelSeries2",
	Cena: 689,
	wKarcie: 0
},
	{
	Nazwa: "HyperX Cloud Alpha",
	tag: "HyperX2",
	Cena: 359,
	wKarcie: 0
}
];
		for (let i=0; i<karta.length; i++)
		{
		karta[i].addEventListener('click',() => {
			NumerKoszyk(product[i])
			CalkowityKoszt(product[i])
		})
		}
		function NumerKoszykRefresh()
		{
			let numerProduktu = localStorage.getItem("NumerKoszyk");
			if(numerProduktu)
			{
				var element = document.querySelector(".cart span")
				if (element) {
					element.textContent=numerProduktu
                }
				//document.querySelector(".cart span").textContent=numerProduktu;
			}
		}
		
		function NumerKoszyk(product)
		{
			let numerProduktu = localStorage.getItem("NumerKoszyk");
			numerProduktu=parseInt(numerProduktu);
			if(numerProduktu)
			{
				localStorage.setItem("NumerKoszyk" ,numerProduktu + 1);
				document.querySelector(".cart span").textContent=numerProduktu+1;
			}
			else
			{
				localStorage.setItem("NumerKoszyk" ,1);
				document.querySelector(".cart span").textContent=1;
			}
			DoKoszyka(product);
		}
		
		function DoKoszyka(product)
		{	
			let ProduktyKarty = localStorage.getItem("produktWkarcie");
			ProduktyKarty = JSON.parse(ProduktyKarty);
			if(ProduktyKarty != null)
			{
				if(ProduktyKarty[product.tag] == undefined)
				{
					ProduktyKarty={
						...ProduktyKarty,
						[product.tag]: product
					}
				}
				ProduktyKarty[product.tag].wKarcie+=1;
			}
			else
			{
			product.wKarcie=1;
			ProduktyKarty={
			[product.tag]: product
			}
			}
			localStorage.setItem("produktWkarcie", JSON.stringify(ProduktyKarty));
		}
		
		function CalkowityKoszt(product)
		{
			let KoszykCena = localStorage.getItem("CalkowityKoszt");
			console.log("Cena koszyka to: ", KoszykCena);
			console.log(typeof KoszykCena);
			if(KoszykCena != null)
			{
				KoszykCena= parseInt(KoszykCena);
				localStorage.setItem("CalkowityKoszt", KoszykCena+product.Cena);
			}
			else
			{
				localStorage.setItem("CalkowityKoszt", product.Cena);
			}
			
		}
		
		function Karta()
		{
			let KartaProdukty = localStorage.getItem("produktWkarcie");
			KartaProdukty= JSON.parse(KartaProdukty);
			let ProduktKoszyk = document.querySelector(".produkty");
			console.log(KartaProdukty);
			if(KartaProdukty && ProduktKoszyk)
			{
				ProduktKoszyk.innerHTML = "";
				Object.values(KartaProdukty).map(item => {
				ProduktKoszyk.innerHTML+=
				`<div class="produkty">
				<span class="na">${item.Nazwa}</span>

				<span class="ce">${item.Cena},00</span>

				<input type="number" value="${item.wKarcie}" class="il">

				<span class="prawo">${item.Cena*item.wKarcie},00</span>
				</div>
				`
				
				});
			}
		}
		NumerKoszykRefresh();
		Karta();