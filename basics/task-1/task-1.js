function calculateTriangleSquare() {
    let width = prompt('Расчет площади правильного треугольника \nПожалуйста, введите длину стороны', '')

    /** Проверяем на отмену */
    if (width == null) {
        return;
    } else if (parseInt(width)) {
        alert(`Площадь правильного треугольника со стороной ${width} будет ${(Math.pow(width, 2) * Math.sqrt(3) / 4).toFixed(2)}`);
    } else {
        alert('Введите валидное число');
    }
}

calculateTriangleSquare();