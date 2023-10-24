const navLinks = document.getElementById("navLinks")

function hideMenu() {
	navLinks.style.right = "-200px";
}

function showMenu() {
	navLinks.style.right = "0px";
}

$('.scroll').on('click', function(e) {
	const tujuan = $(this).attr('href');
 	const elemenTujuan = $(tujuan);
	$('html , body').animate({
		scrollTop: elemenTujuan.offset().top - 75
	 });
 	e.preventDefault();
});

document.addEventListener("DOMContentLoaded", function() {
	const mskBuku = document.getElementById("inputBook");

	mskBuku.addEventListener("submit", function(event) {
		event.preventDefault();
		tambahBuku();
		Swal.fire("Pemberitahuan", "Buku Telah Berhasil Ditambahkan!" , "success");
	});

});

window.addEventListener("load", function() {
	if(cekPenyimpanan()) {
		memuatData();
	}
});


document.addEventListener("ondatasaved", () => {
   console.log("Data Buku berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
   refreshData();
});