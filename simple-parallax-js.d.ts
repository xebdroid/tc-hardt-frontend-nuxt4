declare module 'simple-parallax-js/vanilla' {
  interface SimpleParallaxOptions {
    orientation?: 'up' | 'right' | 'down' | 'left' | 'up left' | 'up right' | 'down left' | 'down right'
    scale?: number
    overflow?: boolean
    delay?: number
    transition?: string
    customWrapper?: string
    customContainer?: string | Element
    maxTransition?: number
  }

  export default class SimpleParallax {
    constructor(element: HTMLElement | HTMLElement[], options?: SimpleParallaxOptions)
    destroy(): void
  }
}

