import render from "../flux/lib/flux_render.js";

function call(params) {
  console.log('charles')
}

const App = () => {
  return (/*html*/`
    <div class="classname">
      <ul class="none">
        <h3 id="none is happening">
          foo
        </h3>
        <h4 class="he is here">
          none is happening
        </h4>
      </ul>
    </div>
  `);
}

render(App(), document.querySelector('div#root'));