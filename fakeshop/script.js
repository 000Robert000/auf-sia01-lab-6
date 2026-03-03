window.onload = getProducts;

async function getProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("API Error:", error);
    }
}

function displayProducts(products) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ""; 

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${product.id}</td>
            <td>${product.title}</td>
            <td>${product.category}</td>
            <td style="font-weight:bold; color:#27ae60;">$${product.price}</td>
            <td><img src="${product.image}" width="35"></td>
        `;
        row.onclick = () => showDetails(product); 
        tableBody.appendChild(row);
    });
}

function showDetails(product) {
    const modal = document.getElementById('productModal');
    const details = document.getElementById('modalDetails');
    
    details.innerHTML = `
        <h2 style="margin-top:0;">${product.title}</h2>
        <p style="color:#27ae60; font-size:1.5rem; font-weight:bold;">$${product.price}</p>
        <img src="${product.image}">
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Rating:</strong> ⭐ ${product.rating.rate} (${product.rating.count} reviews)</p>
    `;
    modal.style.display = "block";
}

function closeModal() {
    document.getElementById('productModal').style.display = "none";
}

window.onclick = (event) => {
    const modal = document.getElementById('productModal');
    if (event.target == modal) closeModal();
}