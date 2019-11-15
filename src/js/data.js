const featureList = [
    {
        fa: 'fa-search',
        heading: 'Quick search',
        paragraph: `It is a long established fact that 
        a reader will be distracted by the readable content
        of a page when looking at its layout. The point of 
        using Lorem Ipsum is that it has a more-or-less 
        normal distribution of letters, as opposed to using`
    },
    {
        fa: 'fa-cloud',
        heading: 'local weather conditions',
        paragraph: `It is a long established fact that 
        a reader will be distracted by the readable content
        of a page when looking at its layout. The point of 
        using Lorem Ipsum is that it has a more-or-less 
        normal distribution of letters, as opposed to using`
    },
    {
        fa: 'fa-thermometer',
        heading: 'Temperature conversion',
        paragraph: `It is a long established fact that 
        a reader will be distracted by the readable content
        of a page when looking at its layout. The point of 
        using Lorem Ipsum is that it has a more-or-less 
        normal distribution of letters, as opposed to using`
    },
    {
        fa: 'fa-facebook-square',
        heading: 'Share to Facebook',
        paragraph: `It is a long established fact that 
        a reader will be distracted by the readable content
        of a page when looking at its layout. The point of 
        using Lorem Ipsum is that it has a more-or-less 
        normal distribution of letters, as opposed to using`
    },
    {
        fa: 'fa-map-marker',
        heading: 'Postal code',
        paragraph: `It is a long established fact that 
        a reader will be distracted by the readable content
        of a page when looking at its layout. The point of 
        using Lorem Ipsum is that it has a more-or-less 
        normal distribution of letters, as opposed to using`
    },
    {
        fa: 'fa-font',
        heading: 'Autocomplete feature',
        paragraph: `It is a long established fact that 
        a reader will be distracted by the readable content
        of a page when looking at its layout. The point of 
        using Lorem Ipsum is that it has a more-or-less 
        normal distribution of letters, as opposed to using`
    },
];


const conditions = [
    {
        name: 'Temperature',
        value: '37',
        unit: '&#176;C',
    },
    {
        name: 'Cloud Cover',
        value: '1',
        unit: ''
    },
    {
        name: 'Pressure',
        value: '37',
        unit: 'mb',
    },
    {
        name: 'Precipitation',
        value: '10',
        unit: 'inch',
    }, 
    {
        name: 'Visibility',
        value: '8',
        unit: 'mi',
    },
    {
        name: 'Humidity',
        value: '1',
        unit: '',
    },  
    {
        name: 'Wind Speed',
        value: '6',
        unit: 'mi/hr',
    }, 
    {
        name: 'Time Zone',
        value: '+1',
        unit: 'UTC',
    }, 
];


const images = [
    'img/lag1.jpg',
    'img/lag2.jpg',
    'img/lag3.jpg',
    'img/lag4.jpg',
    'img/lag5.jpg'
];

module.exports = {
    featureList, images, conditions
}