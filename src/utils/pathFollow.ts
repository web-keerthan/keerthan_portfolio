import {gsap} from 'gsap';
import {MotionPathPlugin} from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);


export function initPathFollow(){
    const path = document.querySelector("#straight-path path") as SVGPathElement | null;
    const vehicle = document.querySelector("#vehicle-container") as HTMLElement | null;
    const main = document.querySelector("main") as HTMLElement | null;
    const container = document.querySelector("#path-container") as HTMLElement | null;

    
    if(path && vehicle){
        gsap.set(vehicle, {
            motionPath:{
                path:path,
                align:path,
                alignOrigin: [0.5,0.5],
                autoRotate:false
            }
        });

        gsap.to(vehicle, {
            motionPath: {
                path: path,
                align: path,
                alignOrigin: [0.5, 0],
                autoRotate: false
            },
            ease:'none',
            scrollTrigger: {
                trigger: main,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
            }
        });
    }
}