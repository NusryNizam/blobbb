import * as blobs2 from "blobs/v2";
import "./style.css";

// get the current theme from the URL
const searchParams = new URLSearchParams(window.location.search);
document.body.dataset.theme = searchParams.get("theme") ?? "light";

const blobContainer = document.querySelector(
  ".blob-container"
) as HTMLDivElement;
const extraPointsRange = document.querySelector(
  "#extraPoints"
) as HTMLInputElement;
const randomnessRange = document.querySelector(
  "#randomness"
) as HTMLInputElement;

const data = {
  seed: Math.random().toString(),
  extraPoints: Number(extraPointsRange.value) ?? 8,
  randomness: Number(randomnessRange.value) ?? 4,
  size: 128,
};

extraPointsRange.addEventListener("input", () => {
  data.extraPoints = Number(extraPointsRange.value);
  blobContainer.innerHTML = generateSvg();
});

randomnessRange.addEventListener("input", () => {
  data.randomness = Number(randomnessRange.value);
  blobContainer.innerHTML = generateSvg();
});

document
  .querySelector("[data-handler='generate']")
  ?.addEventListener("click", () => {
    blobContainer.innerHTML = generateSvg();
  });

document
  .querySelector("[data-handler='insert']")
  ?.addEventListener("click", () => {
    // send message to plugin.ts
    parent.postMessage(
      {
        type: "insert",
        data: blobContainer.innerHTML,
      },
      "*"
    );
  });

// Listen plugin.ts messages
window.addEventListener("message", (event) => {
  if (event.data.source === "penpot") {
    document.body.dataset.theme = event.data.theme;
  }
});

const svgPath = blobs2.svg(data, {
  fill: "grey",
});

blobContainer.innerHTML = svgPath;

function generateSvg(
  extraPoints?: number,
  randomness?: number,
  update = false
) {
  return blobs2.svg(
    {
      ...data,
      seed: update ? data.seed : Math.random(),
      extraPoints: extraPoints ?? data.extraPoints,
      randomness: randomness ?? data.randomness,
    },
    {
      fill: "grey",
    }
  );
}
