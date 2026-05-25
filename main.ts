/**
 * WS2812 RGB LED strip control
 */
//% color="#ff6600" weight=80 icon="\uf0eb" block="WS2812"
namespace ws2812 {
    let strip: light.NeoPixelStrip = null

    function ensureStrip() {
        if (!strip) {
            strip = light.createStrip(pins.A1, 10)
            strip.setBrightness(40)
            strip.clear()
        }
    }

    /**
     * Initialize the WS2812 LED strip
     */
    //% block="initialize WS2812 pin $pin LEDs $num brightness $brightness"
    //% pin.defl=pins.A1
    //% num.defl=10 num.min=1 num.max=120
    //% brightness.defl=40 brightness.min=0 brightness.max=255
    //% inlineInputMode=inline
    //% weight=100
    export function init(pin: DigitalInOutPin, num: number, brightness: number): void {
        strip = light.createStrip(pin, num)
        strip.setBrightness(brightness)
        strip.clear()
    }

    /**
     * Show one color on all LEDs
     */
    //% block="WS2812 show all LEDs color $rgb"
    //% rgb.shadow="colorNumberPicker"
    //% rgb.defl=0xff0000
    //% inlineInputMode=inline
    //% weight=95
    export function showAllColor(rgb: number): void {
        ensureStrip()
        strip.setAll(rgb)
    }

    /**
     * Show one color on a single LED
     */
    //% block="WS2812 LED $index show color $rgb"
    //% index.defl=0 index.min=0 index.max=120
    //% rgb.shadow="colorNumberPicker"
    //% rgb.defl=0xff0000
    //% inlineInputMode=inline
    //% weight=90
    export function showOneColor(index: number, rgb: number): void {
        ensureStrip()

        if (index >= 0 && index < strip.length()) {
            strip.setPixelColor(index, rgb)
        }
    }

    /**
     * Show RGB color on a single LED
     */
    //% block="WS2812 LED $index RGB red $r green $g blue $b"
    //% index.defl=0 index.min=0 index.max=120
    //% r.defl=255 r.min=0 r.max=255
    //% g.defl=0 g.min=0 g.max=255
    //% b.defl=0 b.min=0 b.max=255
    //% inlineInputMode=inline
    //% weight=80
    export function showOneRGB(index: number, r: number, g: number, b: number): void {
        ensureStrip()

        if (index >= 0 && index < strip.length()) {
            strip.setPixelColor(index, light.rgb(r, g, b))
        }
    }

    /**
     * Show one color on a range of LEDs
     */
    //% block="WS2812 LEDs from $start to $end show color $rgb"
    //% start.defl=0 start.min=0 start.max=120
    //% end.defl=4 end.min=0 end.max=120
    //% rgb.shadow="colorNumberPicker"
    //% rgb.defl=0xff0000
    //% inlineInputMode=inline
    //% weight=85
    export function showRangeColor(start: number, end: number, rgb: number): void {
        ensureStrip()

        if (start > end) {
            let temp = start
            start = end
            end = temp
        }

        for (let i = start; i <= end; i++) {
            if (i >= 0 && i < strip.length()) {
                strip.setPixelColor(i, rgb)
            }
        }
    }

    /**
     * Turn off all LEDs
     */
    //% block="WS2812 turn off all LEDs"
    //% weight=70
    export function clear(): void {
        ensureStrip()
        strip.clear()
    }
}
