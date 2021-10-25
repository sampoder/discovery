let sliders = [
  'ex-multi',
  'int-multi',
  'int-add',
  'ex-add'
]

let data = {
  'ex-multi': 0,
  'int-multi': 0,
  'int-add' : 0,
  'ex-add': 0
}

for (let x = 0; x < sliders.length; x++) {
  var slider = document.getElementById(sliders[x]);
  console.log(x)
  noUiSlider.create(slider, {
    start: sliders[x] == 'ex-multi' ? 255 : sliders[x] == 'int-multi' ? 1 : 0,
    connect: 'lower',
    range: {
      'min': 0,
      'max': 255
    }
  });

  slider.noUiSlider.on('update', function (values, handle) {
    document.getElementById(sliders[x] + "-text").innerText = Math.round(values[handle])
    data[sliders[x]] = values[handle]
    fetch(`/api/events/sine-update?ex-multi=${data['ex-multi']}&int-multi=${data['int-multi']}&int-add=${data['int-add']}&ex-add=${data['ex-add']}`)
  });

}