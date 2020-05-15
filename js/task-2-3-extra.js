function formatText() {
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed semper nulla. Nulla facilisi. Nulla mi massa, porttitor vel est non, finibus faucibus mi. Ut id erat venenatis, suscipit tellus ac, tempus mi. Donec tristique efficitur ipsum nec facilisis. Integer commodo, felis eu aliquam mattis, lacus nulla ornare mauris, sed accumsan purus purus id nisl. Proin eu blandit nisl. Aliquam a gravida sem, eu eleifend tellus. Praesent venenatis elit id mauris accumsan, nec rhoncus orci vehicula. In congue urna vel tellus ullamcorper, in pretium quam faucibus. Donec quam leo, mattis a magna vel, hendrerit rutrum nisi. Pellentesque id ornare mauris. Sed volutpat, ex vehicula dignissim gravida, mi ante eleifend nulla, vel condimentum justo nulla sed libero. Quisque a arcu et dolor fringilla volutpat quis eu sem.';
    const arr = text.split('');
    const max = 80;
    let index = max;
    let counter = 0;

    while (index <= text.length + counter) {
        arr.splice(index, 0, '\n');
        index += max + 1;
        counter++;
    }

    alert(arr.join(''));
}

formatText();