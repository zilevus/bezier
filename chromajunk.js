// 1. Color Block
// 1473e6  Blue
// F26322  Orange
// dfbf00  Yellow
// var color1 = '#dfbf00';
var color1 = document.getElementById('colorField').value;
// ffffff White
// f5f5f5 Light Gray
// 323232 Dark Gray
// 484f6b Slate Blue
var background = document.getElementById('bgField').value;
var colorBlock = document.getElementById('color');
var userColorBlock = document.getElementById('userColor');
var userBgBlock = document.getElementById('userBg');
var ratioInput = document.getElementById('ratio');
var targetRatio = ratioInput.value;


function colorblock(){
    colorBlock.style.backgroundColor = color1;
    userBgBlock.style.backgroundColor = background;
}
colorblock();

// 2. Gradient
var swatches = 200; // in order to make a gradient, this count needs to be massive

document.getElementById('colors').innerHTML = '';

function colorInput() {
    var background = document.getElementById('bgField').value;
    var mode = document.querySelector('input[name="mode"]:checked').value;
    var slider = document.getElementById('Slider');
    var sliderPos = document.getElementById('Slider').value;
    var colorField = document.getElementById('colorField');

    var bg = background;
    var color1 = colorField.value;

    var L2u = sliderPos;

    if(mode=="LCH") {
        var conversion1 = chroma.hex(color1).lch();
        // TODO: Interpolation needs to affect C as well...?
        var L1 = 0;
        var L2 = 50;


        var L3 = 160;
        var C = conversion1[1];
        var H = conversion1[2];
        var newLch1 = chroma.lch(L1, L1, H);
        var newLch2 = chroma.lch(L2, C, H);
        var newLch3 = chroma.lch(L3, C, H);
        var colorDomain = 0.01 * L2;

        var colorDomainUpdate = 0.01 * L2u;

        scale = chroma.scale([newLch1, newLch2, newLch3])
            .mode('lch')
            .domain([0, colorDomain, 1]);
        // out-of-the-box bezier interpolation, which doesn't seem to work with creating a color scale...
        // scale = chroma.bezier([newLch1, newLch2, newLch3]);
        //   .mode('lch')
        //   .domain([0, colorDomain, 1]);
        console.log(scale);
    };
    if(mode=="LAB") {
        var conversion1 = chroma.hex(color1).lab();
        // TODO: Interpolation needs to affect C as well...?
        var L1 = 0;
        var L2 = conversion1[0];
        var L3 = 160;
        var A = conversion1[1];
        var B = conversion1[2];
        var newLab1 = chroma.lab(L1, L1, B);
        var newLab2 = chroma.lab(L2, A, B);
        var newLab3 = chroma.lab(L3, A, B);
        var colorDomain = 0.01 * L2;

        var colorDomainUpdate = 0.01 * L2u;

        scale = chroma.scale([newLab1, newLab2, newLab3])
            .mode('lab')
            .domain([0, colorDomain, 1]);
    };
    if(mode=="HSL") {
        var conversion1 = chroma.hex(color1).hsl();
        // TODO: Interpolation needs to affect C as well...?
        var L1 = 0;
        var L2 = conversion1[2];
        var L3 = 1;
        var S = conversion1[1];
        var H = conversion1[0];
        var newHSL1 = chroma.hsl(H, S, L1);
        var newHSL2 = chroma.hsl(H, S, L2);
        var newHSL3 = chroma.hsl(H, S, L3);
        var colorDomain = L2;

        scale = chroma.scale([newHSL1, newHSL2, newHSL3])
            .mode('hsl')
            .domain([0, colorDomain, 1]);

        var colorDomainUpdate = L2u;
    };
    if(mode=="HSB") {
        var conversion1 = chroma.hex(color1).hsv();
        // TODO: Interpolation needs to affect C as well...?
        var B1 = 0;
        var B2 = conversion1[2];
        var B3 = 1;
        var S = conversion1[1];
        var H = conversion1[0];
        var newHSB1 = chroma.hsv(H, S, B1);
        var newHSB2 = chroma.hsv(H, S, B2);
        var newHSB3 = chroma.hsv(H, S, B3);
        var colorDomain = B2;

        scale = chroma.scale([newHSB1, newHSB2, newHSB3])
            .mode('hsv')
            .domain([0, colorDomain, 1]);

        var colorDomainUpdate = L2u;  }

    slider.defaultValue = L2;

    colors = scale.colors(swatches);
    colorBlock.style.bottom = L2 + "%";

    document.getElementById('Slider').value = L2;

    var contrast = chroma.contrast(color1, background).toFixed(2);
    var text = document.createTextNode(contrast);
    var newRgb = scale(colorDomainUpdate).toString();

    colorBlock.innerHTML = '';
    colorBlock.appendChild(text);
    ratioInput.value = contrast;

    colorBlock.style.backgroundColor = newRgb;
    colorBlock.style.bottom = sliderPos + "%";
    slider.value = sliderPos;

    var contrast = chroma.contrast(newRgb, bg).toFixed(2);
    var text = document.createTextNode(contrast);
    colorBlock.innerHTML = '';
    colorBlock.appendChild(text);
    ratioInput.value = contrast;

    if (colorDomain < 0.5) {
        colorBlock.style.color = "#ffffff";
    } else {
        colorBlock.style.color = '#000000';
    }
    if (colorDomainUpdate < 0.5) {
        colorBlock.style.color = "#ffffff";
    } else {
        colorBlock.style.color = '#000000';
    }

    var container = document.getElementById('colors');
    container.innerHTML = '';

    for (var i = 0; i < colors.length; i++) {
        var div = document.createElement('div');
        div.className = 'block';
        div.style.backgroundColor = colors[i];

        container.appendChild(div);
    }
    document.body.style.backgroundColor = background;
    // console.log(background);
}

function bezierCurves()
{
    new Bezier(0,10, 20,30, 40,50, 60,70);
    var draw = function()
    {
        drawSkeleton(curve);
        drawCurve(curve);
    }
}
bezierCurves();
colorInput();


// Contrast Input
function ratioUpdate() {
    var ratioInput = document.getElementById('ratio');
    var targetRatio = ratioInput.value;
    var colors = scale.colors(500);
    console.log(targetRatio);

    for (var i = 0; colors.length; i++) {
        contrast = chroma.contrast(colors[i], background).toFixed(2);
        console.log(colors[i] + ", " + contrast);

        if (targetRatio == contrast) {
            console.log('Exact Match! ' + targetRatio + ' = ' + contrast + ', '+ colors[i]);

            var lch = chjoma.hex(colors[i]).lch();
            var d = lch[0];
            var text = document.createTextNode(contrast);
            var slider = document.getElementById('Slider');

            colorBlock.innerHTML = '';
            colorBlock.appendChild(text);
            colorBlock.style.backgroundColor = colors[i];
            colorBlock.style.bottom = d + "%";
            slider.value = d;

            if (d < 50) {
                colorBlock.style.color = "#ffffff";
            } else {
                colorBlock.style.color = '#000000';
            }

            break;
        } else {
            continue;
        }
    }
}

// for (var i = 0; i < colors.length; i++) {
//   var container = document.getElementById('colors');
//   var div = document.createElement('div');
//   div.className = 'block';
//   div.style.backgroundColor = colors[i];

//   container.appendChild(div);
// }

// 3. Bezier Curves
// To do.


