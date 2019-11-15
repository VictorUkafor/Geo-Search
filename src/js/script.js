const { featureList, images, conditions } = require('./data.js');
const {
    index, centering, header, headerHeading, headerFirstSpan,
    headerSecSpan, section, intro, introHeading, introParagraph,
    introFirstSpan, introSecSpan, firstSubSpan, secSubSpan, form,
    formDiv, input, button, features, footer, notFound, resultFeature,
    resultMap, result, mapMarker, cancel, weather, temp, share, logoLink,
    tempButton ,shareButton, conditionDiv, conditionList, landMark, 
    placeTitle, largeImage
} = require('./elements');


featureList.forEach((item) => {
    const feature = document.createElement('div'); 
    const featHeading = document.createElement('h3');
    const featParagraph = document.createElement('p');
    const paragraphContent = document.createElement('span');
    const icon = document.createElement('i');

    icon.classList.add('fa', item.fa, 'fa-img');
    paragraphContent.textContent = item.heading;
    
    featHeading.appendChild(icon);
    featHeading.appendChild(paragraphContent);    
    
    featParagraph.textContent = item.paragraph;
    
    feature.classList.add('feature');
    feature.appendChild(featHeading);
    feature.appendChild(featParagraph);
    
    features.appendChild(feature);
});


document.addEventListener('load', () => {
    if(!input.value){
        button.setAttribute('disabled', 'disabled');
        button.classList.add('no-text');
    } else {
        button.removeAttribute('disabled');
        button.classList.remove('no-text');
    }
});


input.addEventListener('input', () => {
    
    if(input.value.trim()){
        button.removeAttribute('disabled');
        button.classList.remove('no-text');
    } else {
        button.setAttribute('disabled', 'disabled');
        button.classList.add('no-text');
    }
    form.removeChild(cancel);
})

cancel.addEventListener('click', () => {
    input.value = '';
    form.removeChild(cancel);
});



function displayLarge(image){
    largeImage.innerHTML = `<div class="back">
    <i class="fa fa-chevron-circle-left image-next" 
    onclick="backLarge('${image}')"></i></div>
    <div class="image" style="background-image:url(${image})"></div>
    <div class="next"><i class="top fa fa-times image-next" 
    onclick="removeLarge()"></i>
    <i class="bottom fa fa-chevron-circle-right image-next" 
    onclick="nextLarge('${image}')"></i></div>`

    centering.removeChild(header);
    centering.removeChild(section);
    centering.removeChild(placeTitle);
    centering.removeChild(result);
    centering.removeChild(landMark);
    index.removeChild(footer);

    centering.appendChild(largeImage)            
    }




function removeLarge(){ 
    centering.appendChild(header);
    centering.appendChild(section);
    centering.appendChild(placeTitle);
    centering.appendChild(result);
    centering.appendChild(landMark);
    index.appendChild(footer);
    
    centering.removeChild(largeImage);
}

function nextLarge(image){
    const position = images.indexOf(image);
    const newIndex = (position+1) > (images.length-1)? 0 : position+1;

    displayLarge(images[newIndex]);

}


function backLarge(image){
    const position = images.indexOf(image);

    let newIndex = '';
    if(position === 0){
        newIndex = images.length-1;
    } else {
        newIndex = index-1;
    }

    displayLarge(images[newIndex]);
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(input.value.trim()){
        
        form.appendChild(cancel);
        section.removeChild(intro);
        section.removeChild(features);
        centering.appendChild(placeTitle);
        centering.appendChild(result);
        centering.appendChild(landMark);        
        conditionDiv.appendChild(conditionList);
        weather.appendChild(conditionDiv);

        resultFeature.appendChild(weather);
        resultFeature.appendChild(temp);
        resultFeature.appendChild(share);
        resultMap.appendChild(mapMarker);
        result.appendChild(resultFeature);
        result.appendChild(resultMap)
        temp.appendChild(tempButton); 
        share.appendChild(shareButton);


        conditions.forEach((cond) => {
            const conditionListItem = document.createElement('li');
        
            conditionListItem.innerHTML = 
            `<i class="fa fa-circle condition-symbol"></i>
            <span class="condition-name">${cond.name}:</span>
            <span class="condition-value">${cond.value}
            <span class="condition-unit">${cond.unit}</span></span>`;
        
            conditionList.appendChild(conditionListItem);
        
        });        

        images.forEach((img) => {
            const imageDiv = document.createElement('div');
            imageDiv.style.backgroundImage = `url(${img})`;
            imageDiv.addEventListener('click', () => {
                displayLarge(img);
            });
            landMark.appendChild(imageDiv);
        });
        

        //result.appendChild(notFound);
    }
})

