penpot.ui.open("Blobbb", `?theme=${penpot.theme}`, {
  width: 400,
  height: 240,
});

penpot.ui.onMessage<{ type: string; data: any }>((message) => {
  if (message.type === "insert") {
    const shape = penpot.createShapeFromSvg(message.data);

    if (shape) {
      shape.x = penpot.viewport.center.x;
      shape.y = penpot.viewport.center.y;
    }
  }
});

// Update the theme in the iframe
penpot.on("themechange", (theme) => {
  penpot.ui.sendMessage({
    source: "penpot",
    type: "themechange",
    theme,
  });
});
