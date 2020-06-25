function initBuyTicketForm(world) {
    const form = document.querySelector('.buy-ticket-form');
    const notification = document.querySelector('.alert');
    const successPopup = document.querySelector('.popup');

    form.addEventListener('submit', (e) => {onFormSubmit(e, world, notification, successPopup)});

    initPopup(successPopup);
}

function onFormSubmit(e, world, notification, successPopup) {
    e.preventDefault();
    const form = e.target;
    const inputs = form.elements;

    const fullName = inputs["name"].value;
    const flightName = inputs["flight"].value;
    const type = inputs["type"] ? 1 : 0;
    const buyTime = new Date().getTime();

    notification.hidden = true;

    try {
        const result = world.buyTicket(flightName, buyTime, fullName, type);
        form.reset();
        successPopup.hidden = false;
        successPopup.children[0].textContent = `Here is your seat: ${result.seat}`;
    } catch (err) {
        notification.textContent = err.message;
        notification.hidden = false;
    }
}

function initPopup(popup) {
    popup.addEventListener('click', () => {
        popup.hidden = true;
    });
}
