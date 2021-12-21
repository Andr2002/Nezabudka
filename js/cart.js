function toggleCartStatus() {
    if (document.querySelector('.modal').children.length == 3)
        cartWin.querySelector('.cart-status').innerText = 'Корзина пуста';
    else {
        cartWin.querySelector('.cart-status').innerText = '';
    }
    console.log(document.querySelector('.modal').children.length);
}

const cartWin = document.querySelector('.modal');

const buttons = document.querySelectorAll('.buy-btn');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        let itemId = button.dataset.id;
        let card = button.closest('.card');
        let itemTitle = card.querySelector('.card-name');
        let itemPrice = card.querySelector('.price');
        let item = {
            id: itemId,
            title: itemTitle.textContent,
            price: parseInt(itemPrice.textContent),
            imgSrc: card.querySelector('.card-img').getAttribute('src')
        };

        const itemInCart = cartWin.querySelector(`[data-id="${item.id}"]`);
        let finalPrice = 0;

        //  если товар в корзине
        if (itemInCart) {
            const itemsCount = itemInCart.querySelector('.item-count');
            itemsCount.innerText = parseInt(itemsCount.textContent) + 1;

            //  удаление из корзины
            document.querySelector('.delete').addEventListener('click', () => {
                cartWin.querySelector(`[data-id="${item.id}"]`).remove();
                toggleCartStatus();
                // document.querySelector('.cart-content').remove();
            });
        } else {
            // const cartStatus = cartWin.querySelector('.cart-status');
            // cartStatus.innerText = '';
            const cartItemHTML = `        
            <div class="cart-content" data-id="${item.id}">
            <img src="${item.imgSrc}" alt="${item.title}" class="cart-img">
            <p class="cart-title">${item.title}</p>
            <p>Количество: <span class="item-count">1</span> шт.</p>
            <p>Стоимость: <span class="cart-price">${item.price}</span> ₽</p>
            <a href="#" class="delete"><img class="delete-logo" src="img/delete-from-cart.png" alt="delete-logo"></a>
            </div>`;
            cartWin.insertAdjacentHTML('afterbegin', cartItemHTML);
            toggleCartStatus();
        }

        //  удаление из корзины
        document.querySelector('.delete').addEventListener('click', () => {
            cartWin.querySelector(`[data-id="${item.id}"]`).remove();
            toggleCartStatus();
            // document.querySelector('.cart-content').remove();
        });
    });
});