/**
 * Project 3 of Creative Algorithms
 * By IENGROUND (Hyunwoo Rhee 20201131)
 * on github.com/ienground
 */

let img;
let size = 30;
let sources = [];
let xOffsets = [];
let yOffsets = [];
let rotates = [];

function preload() {
    img = loadImage("/p3_CA//source.png");
    for (let i = 1; i <= 100; i++) {
        let file = loadImage('/p3_CA/src/' + i.toString().padStart(5,'0') + '.jpg');
        sources.push(file);
        xOffsets.push(getRandomInt(-5, 5));
        yOffsets.push(getRandomInt(-5, 5));
        rotates.push(random(-5, 5));
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    angleMode(DEGREES);

    let imgRatio = img.width / img.height; // 16:10 ~ 14.4:9
    let screenRatio = width / height; // 16:9

    let imgHeight, imgWidth;
    if (screenRatio > imgRatio) { // 가로가 남는다.
        imgHeight = height;
        imgWidth = height * img.width / img.height;
    } else {
        imgWidth = width;
        imgHeight = width * img.height / img.width;
    }

    img.resize(imgWidth, imgHeight);
    img.loadPixels();

    for (let i = 0; i < 100; i++) {
        sources[i].resize(size, size);
    }
    // image()

}

function draw() {
    background(255);
    // print(pixels);



    // print(imgWidth, imgHeight, img.width, img.height);

    // image(img, (width - imgWidth) / 2, (height - imgHeight) / 2, imgWidth, imgHeight);


    // print(img.width, img.height);
    // print(img.pixels);

    for (let y = 0; y < img.height / size; y++) {
        for (let x = 0; x < img.width / size; x++) {
            noStroke();
            let index = (y * img.width + x) * 4 * size
            let c1 = img.pixels[index];
            let c2 = img.pixels[index + 1];
            let c3 = img.pixels[index + 2];

            if (c1 >= 240 && c2 >= 240 && c3 >= 240) {
                tint(255, 120);
            } else {
                tint(c1, c2, c3);
            }
            let src = createImage(sources[index % 100].width, sources[index % 100].height);
            src.copy(sources[(y * img.width + x) % 100], 0, 0, src.width, src.height, 0, 0, src.width, src.height);
            src.resize(size, size);

            // let xoffset = getRandomInt(-5, 5);
            // let yoffset = getRandomInt(-5, 5);
            push();
            translate((width - img.width) / 2 + x * size + xOffsets[(y * img.width + x) % 100], (height - img.height) / 2 + y * size + yOffsets[(y * img.width + x) % 100])
            rotate(rotates[(y * img.width + x) % 100]);
            // rotate(random(-5, 5));
            image(src, 0, 0);
            pop();
            // circle((width - img.width) / 2 + x * size, (height - img.height) / 2 + y * size, size);
        }
    }


    // for (let y = 0; y < imgHeight / size; y++) {
    //     for (let x = 0; x < imgWidth / size; x++) {
    //         noStroke();
    //         let index = (y * imgWidth + x) * 4 * size / imgWidth * img.width ;
    //         fill(img.pixels[index], img.pixels[index + 1], img.pixels[index + 2])
    //         circle(map(x * size, 0, imgWidth, (width - imgWidth) / 2, width - (width - imgWidth) / 2),
    //             map(y * size, 0, imgHeight, (height - imgHeight) / 2, height - (height - imgHeight) / 2), size);
    //     }
    // }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function mouseWheel(event) {
    if (event.delta > 0) {
        if (size > 3) {
            size--;
        }
    } else {
        size++;
    }
    print(size);
}