import type { navTextColor } from '../types/ui'

const mixColor = (color1: string, color2: string, weight: number) => {
    function d2h(d) { return d.toString(16); }
    function h2d(h) { return parseInt(h, 16); }
    weight = (typeof (weight) !== 'undefined') ? weight : 50;
    var color = "#";
    for (var i = 0; i <= 5; i += 2) {
        var v1 = h2d(color1.substr(i, 2)),
            v2 = h2d(color2.substr(i, 2)),
            val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)));
        while (val.length < 2) { val = '0' + val; }
        color += val;
    }
    return color;
}

const mixColorLevel9 = (color: string): string[] => {
    let arr: string[] = []
    for (let i = 1; i <= 9; i++) {
        arr.push(mixColor(color.substring(1), 'ffffff', 100 - i * 10))
    }
    return arr
}

const textColor4grayLevel = (val: string): navTextColor => {
    // 把颜色值变成小写
    let color = val.toLowerCase()
    // 处理六位的颜色值，转为RGB
    var colorChange: number[] = [];
    for (var i = 1; i < 7; i += 2) {
        let hex: number = Number.parseInt('0x' + color.slice(i, i + 2))
        colorChange.push(hex)
    }
    var grayLevel = colorChange[0] * 0.299 + colorChange[1] * 0.587 + colorChange[2] * 0.114;

    if (grayLevel >= 192) {
        return '#303133'
    } else {
        return '#E5EAF3'
    }
}


export {
    mixColor,
    mixColorLevel9,
    textColor4grayLevel
}