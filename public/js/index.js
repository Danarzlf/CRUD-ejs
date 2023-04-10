async function addProduct() {
    // e.prevent.default()
    const data = {
        name: document.getElementById("name").value
    }

    const responseApi = await fetch.post('/api/products', data);
    if(responseApi.data.status === 'success') {
        alert("berhasil tambah data baru")
    }
}