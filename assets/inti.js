const bukuYangBelumDibaca = "incompleteBookshelfList";
const bukuYangSudahDibaca = "completeBookshelfList";
const buku_itemId = "itemId";

function tambahBuku() {
	const dataBukuBelumDibaca = document.getElementById(bukuYangBelumDibaca);

	const judulBuku = document.getElementById("inputBookTitle").value;
	const penulisBuku = document.getElementById("inputBookAuthor").value;
	const tahunBuku = document.getElementById("inputBookYear").value;

	const dataBuku = daftarBukuDiRak(judulBuku, penulisBuku, tahunBuku);
	const dataBukuObjek = objekBuku(judulBuku, penulisBuku, tahunBuku, false);

	dataBuku[buku_itemId] = dataBukuObjek.id;
	hrsDibaca.push(dataBukuObjek);

	dataBukuBelumDibaca.append(dataBuku);

	perbaruiData();
}

function daftarBukuDiRak(data1, data2, data3, selesai) {
	const textJudul = document.createElement("h3");
	textJudul.innerText = data1;

	const textPenulis = document.createElement("strong");
	textPenulis.innerText = data2;

	const textTahun = document.createElement("p");
	textTahun.innerText = data3;

	const container = document.createElement("article");
	container.classList.add("book_item");
	container.append(textJudul, textPenulis, textTahun);

	if (selesai) {
		container.append(
			tombolKembalikan(),
			tombolHapus()
		);
	} else {
		container.append(
			tombolSelesaiDibaca(),
			tombolHapus()
		);
	}

	return container;
}

function buatTombol(classTombol, namaTombol, eventListener) {
	const tombol = document.createElement("button");
	tombol.classList.add(classTombol);
	tombol.innerText = namaTombol;
	tombol.addEventListener("click", function(event) {
		eventListener(event);
	});
	return tombol;
}

function tambahKeSelesaiDibaca(taskElement) {
	Swal.fire({
	    title: 'Pindahkan Buku?',
	    text: "Buku akan dipindahkan ke rak Selesai Dibaca",
	    icon: 'question',
	    showCancelButton: true,
	    confirmButtonColor: 'darkgreen',
	    cancelButtonColor: '#3085d6',
	    cancelButtonText: 'Kembali',
	    confirmButtonText: 'Pindahkan',
	    allowOutsideClick: false,
	    reverseButtons: true,
	}).then((result) => {
	  	if (result.isConfirmed) {
	    	Swal.fire('Pemberitahuan','Buku telah dipindahkan!','success');

	    	const dataBukuSudahDibaca = document.getElementById(bukuYangSudahDibaca);
			const taskJudul = taskElement.querySelector("article > h3").innerText;
			const taskPenulis = taskElement.querySelector("article > strong").innerText;
			const taskTahun = taskElement.querySelector("article > p").innerText;

			const dataBukuBaru = daftarBukuDiRak(taskJudul, taskPenulis, taskTahun, true);
			const dataBuku = cariObjek(taskElement[buku_itemId]);
			dataBuku.selesai = true;
			dataBukuBaru[buku_itemId] = dataBuku.id;
			
			dataBukuSudahDibaca.append(dataBukuBaru);
			taskElement.remove();	

			perbaruiData();
	  }
	})
}

function tombolSelesaiDibaca() {
	return buatTombol("green", "Selesai Dibaca", function(event) {
		tambahKeSelesaiDibaca(event.target.parentElement);
	});
}

function hapusDariSelesaiDibaca(taskElement) {
	Swal.fire({
	    title: 'Apakah Anda Yakin?',
	    text: "Buku yang telah dihapus tidak dapat dikembalikan!",
	    icon: 'warning',
	    showCancelButton: true,
	    confirmButtonColor: '#d33',
	    cancelButtonColor: '#3085d6',
	    cancelButtonText: 'Kembali',
	    confirmButtonText: 'Hapus Buku',
	    allowOutsideClick: false,
	    reverseButtons: true,
	    focusConfirm: false,
	    focusCancel: true
	}).then((result) => {
	  	if (result.isConfirmed) {
	    	Swal.fire('Dihapus!','Buku yang anda pilih telah dihapus.','success');

	    	const posisiDataBuku = cariIndexObjek(taskElement[buku_itemId]);
			hrsDibaca.splice(posisiDataBuku, 1);

			taskElement.remove();
			perbaruiData();
	  }
	})
}

function tombolHapus() {
	return buatTombol("red", "Hapus Buku", function(event) {
		hapusDariSelesaiDibaca(event.target.parentElement);
	});
}

function kembaliKeBelumSelesaiDibaca(taskElement) {
	Swal.fire({
	    title: 'Pindahkan Buku?',
	    text: "Buku akan dipindahkan ke rak Belum Selesai Dibaca",
	    icon: 'question',
	    showCancelButton: true,
	    confirmButtonColor: 'darkgreen',
	    cancelButtonColor: '#3085d6',
	    cancelButtonText: 'Kembali',
	    confirmButtonText: 'Pindahkan',
	    allowOutsideClick: false,
	    reverseButtons: true,
	}).then((result) => {
	  	if (result.isConfirmed) {
	    	Swal.fire('Pemberitahuan','Buku telah dipindahkan!','success');

	    	const dataBukuBelumDibaca = document.getElementById(bukuYangBelumDibaca);
			const taskJudul = taskElement.querySelector("article > h3").innerText;
			const taskPenulis = taskElement.querySelector("article > strong").innerText;
			const taskTahun = taskElement.querySelector("article > p").innerText;

			const dataBukuBaru = daftarBukuDiRak(taskJudul, taskPenulis, taskTahun, false);

			const dataBuku = cariObjek(taskElement[buku_itemId]);
			dataBuku.selesai = false;
			dataBukuBaru[buku_itemId] = dataBuku.id;

			dataBukuBelumDibaca.append(dataBukuBaru);
			taskElement.remove();

			perbaruiData();
	  	}
	})
}

function tombolKembalikan () {
	return buatTombol("green", "Belum Selesai Dibaca", function(event) {
		kembaliKeBelumSelesaiDibaca(event.target.parentElement);
	});
}