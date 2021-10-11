var slider = document.getElementById('slider');

noUiSlider.create(slider, {
    start: [255/2],
    connect: 'lower',
    range: {
        'min': 0,
        'max': 255
    }
});

slider.noUiSlider.on('update', function (values, handle) {
    console.log(values[handle])
    var all = document.getElementsByClassName('noUi-connect');
    for (var i = 0; i < all.length; i++) {
      all[i].style.background = `rgb(${values[handle]}, 0, 0)`;
    }
    fetch(`/api/events/rgb-update?colour=red&value${values[handle]}`)
});