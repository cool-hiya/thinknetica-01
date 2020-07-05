'use strict';

function applySearch(el, cb) {
    let throttledSearch = throttle((e) => {cb(e.target.value)}, 500);

    el.addEventListener('input', (e) => throttledSearch(e));
}

function throttle(func, ms) {
    let isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {
        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments);

        isThrottled = true;

        setTimeout(function () {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}

async function getGif(searchText) {
    let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=bYPO0YHpmBWJt79BR7SnFDjzDOYZgn3e&q=${searchText}&limit=1&offset=0&rating=G&lang=en`);
    response = await response.json();

    if (response.data[0]) {
        return response.data[0].images.fixed_height.url;
    }

    return null;
}

function drawImage(img, imgUrl) {
    img.src = imgUrl || '#';
}

function onSearch(searchText, imgContainer, storage) {
    if (storage[searchText]) {
        drawImage(imgContainer, storage[searchText]);
        return;
    }

    getGif(searchText).then((imgUrl) => {
        storage[searchText] = imgUrl;
        drawImage(imgContainer, imgUrl);
    })
}

const searchInput = document.querySelector('[data-search]');
const imgContainer = document.querySelector('[data-img]');
const storage = {};

applySearch(searchInput, (searchText) => onSearch(searchText, imgContainer, storage));