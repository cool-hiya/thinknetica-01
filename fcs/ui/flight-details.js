function flightDetails(world, flightName) {

    if (typeof flightName !== 'string') {
        throw new Error('Flight name should be a string');
    }

    const flights = world.flights;
    const flight = flights[flightName];

    if (!flight) {
        throw new Error('The flight doesn\'t exist');
    }

    const container = document.createElement('div');
    container.id = 'flight-details';

    const title = document.createElement('h1');
    title.textContent = 'Информация о рейсе';
    container.append(title);

    const description = [
        {title: '№ рейса', value: flight.name},
        {title: 'Общее количество мест', value: flight.seats},
        {title: 'Количество мест бизнес класса', value: flight.businessSeats},
        {title: 'Время начала регистрации', value: formatDate(flight.registrationStarts)},
        {title: 'Время окончания регистрации', value: formatDate(flight.registrationEnds)}
    ]

    description.forEach(d => {
        const el = createDescription(d.title, d.value);
        container.append(el);
    });

    const ticketsContainer = document.createElement('div');
    const ticketsTitle = document.createElement('h2');
    ticketsTitle.textContent = 'Билеты';
    ticketsContainer.append(ticketsTitle);
    ticketsContainer.append(createTickets(flight.tickets));

    container.append(ticketsContainer);
    document.body.append(container);
}

function createTickets(tickets) {
    const list = document.createElement('ul');

    tickets.forEach(ticket => {
        list.append(createTicket(ticket));
    });

    return list;
}

function createTicket(ticket) {
    const ticketEl = document.createElement('li');
    const description = [
        {title: '№ билета', value: ticket.id},
        {title: 'Место', value: ticket.seat},
        {title: 'ФИО', value: ticket.fullName},
        {title: 'Прошел регистрацию', value: ticket.registrationTime ? 'да' : 'нет'}
    ]

    description.forEach(d => {
        const el = createDescription(d.title, d.value);
        ticketEl.append(el);
    });

    return ticketEl;
}

function createDescription(title, value) {
    const description = document.createElement('p');
    description.textContent = `${title}: ${value}`;
    return description;
}

function formatDate(time) {
    return new Date(time).toLocaleString('ru');
}
