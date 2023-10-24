const STORAGE_KEY = "BOOKSHELF_APPS";

let hrsDibaca = [];

function cekPenyimpanan() {
	if (typeof(Storage) === undefined) {
		swal("Pemberitahuan", "Browser tidak mendukung local Storage!" , "warning");
		return false;
	} else {
		return true;
	}
}

function simpanData() {
	const parsed = JSON.stringify(hrsDibaca);
	localStorage.setItem(STORAGE_KEY, parsed);
	document.dispatchEvent(new Event("ondatasaved"));
}

function memuatData() {
	const dataSerial = localStorage.getItem(STORAGE_KEY);

	let data = JSON.parse(dataSerial);

	if(data !== null) 
		hrsDibaca = data;

	document.dispatchEvent(new Event("ondataloaded"));
}

function perbaruiData() {
	if (cekPenyimpanan())
		simpanData();
}

function objekBuku(judul, penulis, tahun, selesai) {
	return {
		id: +new Date(),
		judul,
		penulis,
		tahun,
		selesai
	};
}

function cariObjek(objekId) {
	for(dataBuku of hrsDibaca) {
		if(dataBuku.id === objekId) 
			return dataBuku;
	}
	return null;
}

function cariIndexObjek(objekId) {
	let index = 0;
	for(dataBuku of hrsDibaca) {
		if(dataBuku.id === objekId)
			return index;
			index++;
	}
	return -1;
}
 
function refreshData() {
	const rakBelumSelesai = document.getElementById(bukuYangBelumDibaca);
	let rakSudahSelesai = document.getElementById(bukuYangSudahDibaca);

	for(dataBuku of hrsDibaca) {
		const dataBukuBaru = daftarBukuDiRak(dataBuku.judul, dataBuku.penulis, dataBuku.tahun, dataBuku.selesai);
		dataBukuBaru[buku_itemId] = dataBuku.id;

		if (dataBuku.selesai) {
			rakSudahSelesai.append(dataBukuBaru);
		} else {
			rakBelumSelesai.append(dataBukuBaru);
		}
	}

}