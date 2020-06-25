const div = new Div();
div.template = `<div><p>{{output}}</p><p>{{output2}}</p></div>`;

div.variables = {
    output: 'Some text',
    output2: () => 'Some text 2'
}
div.styles = {
    color: 'red'
}

div.render();

div.onClick = () => {
    console.log('test')
}

div.styles = {
    color: 'blue'
}

// div.unrender();

const input = new Input();
input.template = `<input type="text" value={{value}} />`;
input.variables = {
    value: '2',
}

input.render();
input.onFocus(() => console.log('focused'));
input.onInput(() => console.log('input changed'));