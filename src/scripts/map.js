let myMap;

const init  = () => {
    myMap = new ymaps.Map("map", {
        center: [44.89, 37.31],
        zoom: 15,
        controls: [],
    });

    const coords = [
        [44.894265, 37.316774],
        [44.894740, 37.310689],
        [44.890527, 37.303538],
        [44.886271, 37.307595],
    ];

    const myCollection = new ymaps.GeoObjectCollection({},{
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: "./img/icons/marker.svg",
        iconImageSize: [46,57],
        iconImageOffset: [-35, -52]
    });

    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    });

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);