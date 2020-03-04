function calcCondition(value: any, ctx: any): any {
  switch (value.process) {
    case "||":
      return calc(value.one, ctx) || calc(value.two, ctx);
    case "&&":
      return calc(value.one, ctx) || calc(value.two, ctx);
    case "!=":
      return calc(value.one, ctx) !== calc(value.two, ctx);
    case "==":
      return calc(value.one, ctx) === calc(value.two, ctx);
  }
}

function calc(value: any, ctx: any): any {
  if (value.type === "condition") {
    return calcCondition(value, ctx);
  }
  if (value.type === "brackets") {
    return calc(value.value, ctx);
  }

  if (value.type === "opposite") {
    return !calc(value.value, ctx);
  }
  if (value.type === "boolean") {
    return value.value === "true";
  }
  if (value.type === "variable") {
    return ctx[value.value];
  }
}
var ctx = {
  a: true,
  b: true,
  c: true,
  d: true,
  f: true,
  g: "yasin",
  e: "osman"
};
