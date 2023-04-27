let cart = []
if(localStorage.getItem('carrello') !== null){
    cart = JSON.parse(localStorage.getItem('carrello'))
}


fetch('https://striveschool-api.herokuapp.com/books')
    .then((response) => {
        console.log(response)
        return response.json()
    })
    .then((data) => {
        console.log(data)

        data.forEach(book => {
            let cardContainer = document.getElementById('cardContainer')
            let cardColumn = document.createElement('div')
            cardColumn.className = 'col col-md-2 col-lg-3 d-flex align-items-stretch'
            let card = document.createElement('div')
            card.className = 'card shadow m-2';
            let cardImage = document.createElement('img')
            cardImage.className = 'card-img-top '
            cardImage.setAttribute('src', book.img)
            let cardBody = document.createElement('div')
            cardBody.className = 'card-body';
            let cardTitle = document.createElement('h5')
            cardTitle.className = 'card-title';
            cardTitle.innerText = book.title
            let cardText = document.createElement('p')
            cardText.className = 'card-text';
            cardText.innerText = book.price + ' €' 
            let deleteButton = document.createElement('a')
            deleteButton.className = 'btn btn-danger me-1';
            deleteButton.innerText = 'Scarta'
            let addToCartButton = document.createElement('a')
            addToCartButton.innerText = 'Compra ora'
            addToCartButton.className = 'btn btn-primary';

            cardContainer.appendChild(cardColumn)
            cardColumn.appendChild(card)
            card.appendChild(cardImage)
            card.appendChild(cardBody)
            cardBody.appendChild(cardTitle)
            cardBody.appendChild(cardText)
            cardBody.appendChild(deleteButton)
            cardBody.appendChild(addToCartButton)

            deleteButton.addEventListener('click', function () {
                // card.classList.add('d-none')
                cardColumn.remove()
            })

            let cartReference = document.getElementById('cart')
            let newLi = document.createElement('li')
            newLi.className = 'my-2'
            let deleteFromCart = document.createElement('a')
            let trash = document.getElementById('trash')

            addToCartButton.addEventListener('click', function() {
                cart.push(book)
                deleteFromCart.className = 'btn btn-danger my-1';
                deleteFromCart.innerHTML = '<i class="bi bi-trash3"></i>'
                newLi.innerText = book.title + ' ' + book.price + '€'
                cartReference.appendChild(newLi)
                trash.appendChild(deleteFromCart)
                localStorage.setItem('carrello', JSON.stringify(cart) )
            })

            deleteFromCart.addEventListener('click', function() {
                cartReference.removeChild(newLi)
                trash.removeChild(deleteFromCart)
                cart = cart.filter(c => c.title !== book.title)
                // let carrello = JSON.parse(localStorage.getItem('carrello'));
                // carrello = carrello.filter(item => item.title !== book.title);
                localStorage.setItem('carrello', JSON.stringify(cart));
            })
        })

    })
    .catch((err) => {
        console.log(err)
    })

