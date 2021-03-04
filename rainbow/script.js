function lerp(a, b, progress) {
    return a + (b - a ) * progress;
}

function unlerp(a, b, value) {
    if (a == b)
        return 0;

    return (value - a) / (b - a);
}

class Color {
    constructor(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha || 1;
    }

    format() {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
    }

    lerp(other, progress) {
        return new Color(lerp(this.red, other.red, progress), lerp(this.green, other.green, progress), lerp(this.blue, other.blue, progress), lerp(this.alpha, other.alpha, progress));
    }
}

let colors = [
    new Color(0, 122, 255),   // blue
    new Color(100, 122, 255),
    new Color(255, 122, 180), // pink
    new Color(255, 122, 0),   // orange
    new Color(220, 220, 0),   // yellow
    new Color(122, 255, 0),   // green
    new Color(80, 200, 90),
    new Color(100, 122, 255), // blue
    new Color(255, 50, 100),  // pink
    new Color(255, 100, 50),  // pink
    new Color(255, 122, 0),   // orange
    new Color(220, 220, 0),   // yellow
    new Color(255, 200, 0),
    new Color(200, 255, 90),  // green
];

function formatGradient() {
    var result = "linear-gradient(";
    var prefix = "";
    for (let color of colors) {
        result += prefix + color.format();
        prefix = ", ";
    }

    result += ")";
    return result;
}

let spacing = 1000;
let bodyHeight = spacing * (colors.length - 1);

function colorAt(yOffset) {
    yOffset = Math.max(yOffset, 0);
    yOffset = Math.min(yOffset, bodyHeight);

    let fromIndex = Math.floor(yOffset / spacing);
    let toIndex = Math.ceil(yOffset / spacing);

    let fromColor = colors[fromIndex];
    let toColor = colors[toIndex];
    let progress = unlerp(spacing * fromIndex, spacing * toIndex, yOffset);

    return fromColor.lerp(toColor, progress);
}

function didScroll() {
    let scrollY = window.scrollY;
    let themeColor = colorAt(scrollY);
    document.querySelector('meta[name="theme-color"').setAttribute("content", themeColor.format());

    let backgroundColor = colorAt(scrollY > 0 ? scrollY + window.innerHeight : scrollY);
    document.body.style.backgroundColor = backgroundColor.format();
}

window.addEventListener("load", function() {
    document.body.style.backgroundImage = formatGradient();
    document.body.style.height = `${bodyHeight}px`;
    didScroll();
}, false);

window.addEventListener("scroll", didScroll, false);
