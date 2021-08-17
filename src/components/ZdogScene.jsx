import {createEffect, createSignal, onMount, onCleanup, on} from "solid-js";
import Zdog from "zdog";

const ZdogScene = (props) => {
  const [ticker, setTicker] = createSignal(0);
  const [scene, setScene] = createSignal(null, {
    equals: () => false
  });

  const sceneWidth = props.width / props.zoom;
  const sceneHeight = props.height / props.zoom; 
  const viewWidth = sceneWidth * props.zoom;
  const viewHeight = sceneHeight * props.zoom;

  const viewBox = `${-viewWidth/2} ${-viewHeight/2} ` +
  `${viewWidth} ${viewHeight}`

  if(import.meta.env.SSR) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute("width", props.widtb);
    svg.setAttribute("height", props.height);
    svg.setAttribute("viewBox", viewBox);
    const scene = props.scene(Zdog);
    scene.renderGraphSvg(svg);

    return <svg width={props.width} height={props.height} xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} innerHTML={svg.innerHTML}></svg>
  } else {
    let svg;
    if(props.animate) {
      onMount(()=> {
        let frame = requestAnimationFrame(loop);

        function loop() {
          frame = requestAnimationFrame(loop);
          const [newTicker, newScene] = props.animate(Zdog, scene(), ticker());
          setTicker(newTicker);
          setScene(newScene);
        }

        onCleanup(() => cancelAnimationFrame(frame));
      });
    }
    createEffect(on(scene, (scene) => {
      if(!scene) {
        const scene = props.scene(Zdog);
        setScene(scene);
      } else {
        svg.innerHTML='';
        scene.renderGraphSvg(svg);
      }
    }));
    return <svg ref={svg} width={props.width} height={props.height} xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}></svg>
  }

};

export default ZdogScene;