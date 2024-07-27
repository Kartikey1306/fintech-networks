document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const balanceDisplay = document.getElementById('balance');
    const transactionForm = document.getElementById('transaction-form');
    const transactionList = document.getElementById('transaction-list');
    const newTransactionBtn = document.getElementById('new-transaction');
    const transactionPopup = document.getElementById('transaction-popup');
    const closeBtn = document.querySelector('.close');

    let balance = 0;

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            sections.forEach(section => section.classList.remove('active'));
            document.querySelector(link.getAttribute('href')).classList.add('active');
        });
    });

    newTransactionBtn.addEventListener('click', () => {
        transactionPopup.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        transactionPopup.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === transactionPopup) {
            transactionPopup.style.display = 'none';
        }
    });

    transactionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);
        const type = document.getElementById('transaction-type').value;
        const name = document.getElementById('name').value;
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;

        if (type === 'deposit') {
            balance += amount;
            addTransactionToList(amount, 'Deposit', name, cardNumber);
        } else if (type === 'withdrawal') {
            balance -= amount;
            addTransactionToList(amount, 'Withdrawal', name, cardNumber);
        } else if (type === 'transfer') {
            balance -= amount;
            addTransactionToList(amount, 'Transfer', name, cardNumber);
        } else if (type === 'payment') {
            balance -= amount;
            addTransactionToList(amount, 'Payment', name, cardNumber);
        }

        balanceDisplay.textContent = `$${balance.toFixed(2)}`;
        transactionForm.reset();
        transactionPopup.style.display = 'none';
    });

    function addTransactionToList(amount, type, name, cardNumber) {
        const li = document.createElement('li');
        li.innerHTML = `
            <div><strong>${type}</strong>: $${amount.toFixed(2)}</div>
            <div>Name: ${name}</div>
            <div>Card Number: ${cardNumber}</div>
        `;
        transactionList.appendChild(li);
    }
});

