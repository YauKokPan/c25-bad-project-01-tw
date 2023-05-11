const pagination = document.querySelector('.pagination');
const pages = pagination.querySelectorAll('.page');
const prev = pagination.querySelector('.prev');
const next = pagination.querySelector('.next');
const prevPage = () => {
    const active = pagination.querySelector('.active');
    const prev = active.previousElementSibling;
    if (prev.classList.contains('page')) {
        active.classList.remove('active');
        prev.classList.add('active');
    }
};
const nextPage = () => {
    const active = pagination.querySelector('.active');
    const next = active.nextElementSibling;
    if (next.classList.contains('page')) {
        active.classList.remove('active');
        next.classList.add('active');
    }
};
prev.addEventListener('click', prevPage);
next.addEventListener('click', nextPage);