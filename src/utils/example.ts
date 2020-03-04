const content = `

( 
  ( 
    a 
    && 
    ( 
      b 
      || 
      !c 
      &&
      b != c
    ) 
    && 
    d 
  ) 
) 
&& 
!f 
&& 
false 
&& 
(
  color 
  !=
  back
) 
&& 
true 
|| 
!(
  g 
  != 
  e
) 
&& 
(
  !(
    a
  ) 
  && 
  !(
    !(
      a 
      == 
      b
    )
  )
)

`;

function isParenthesisMatching([...str]) {
  return (
    str.reduce((uptoPrevChar, thisChar) => {
      (thisChar === "(" && uptoPrevChar++) ||
        (thisChar === ")" && uptoPrevChar--);

      return uptoPrevChar;
    }, 0) === 0
  );
}
const PROCESS_MAP = {
  "&&": "¶",
  "||": "§",
  "!=": "®",
  "==": "ℂ"
};

const createRegex = (
  openedChar: string,
  closedChar: string,
  isOpposite = false
) => {
  const depth = 2;
  const arr = `[^${closedChar}${openedChar}]`;
  const repeat = `\\${openedChar}(?:${arr}+|`;
  const r2 = `*\\${closedChar}`;
  const start = new Array(depth).fill(repeat).join("");
  const end = new Array(depth + 1).fill(r2).join(")");
  return new RegExp(
    `${
      isOpposite ? "\\!" : ""
    }${repeat}${repeat}\\${openedChar}${arr}${r2})${r2})${r2}`,
    "g"
  );
};
/\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)/g;

const normalRegex = createRegex("(", ")");
const oppositeRegex = createRegex("(", ")", true);
const newOppositeRegex = createRegex("{", "}");

function handleOppositeBracket(str: string) {
  const founded = str.match(oppositeRegex);
  if (founded) {
    const handlers = founded.map(native => ({
      native,
      new: `{${native.substring(2, native.length - 1)}}`
    }));
    handlers.forEach(item => {
      str = str.split(item.native).join(handleOppositeBracket(item.new));
    });
  }
  return str;
}

type Brackets =
  | {
      type: "brackets";
      opposite: boolean;
      value: Brackets[];
    }
  | string;

function parseBrackets(str: string) {
  let founded = str.match(normalRegex);
  let items: Brackets[] = [str];
  if (founded) {
    founded.forEach(item => {
      const currentItem = items.pop();
      if (typeof currentItem === "string") {
        const withoutItem = currentItem.split(item);
        items.push(
          withoutItem[0],
          {
            type: "brackets",
            opposite: false,
            value: parseBrackets(item.substring(1, item.length - 1))
          },
          withoutItem[1]
        );
      }
    });
  }
  return items.filter(i => i);
}

function parseOppositeBrackets(item: Brackets): any {
  if (typeof item === "string") {
    let founded = item.match(newOppositeRegex);
    let items: Brackets[] = [item];
    if (founded) {
      founded.forEach(item => {
        const currentItem = items.pop();
        if (typeof currentItem === "string") {
          const withoutItem = currentItem.split(item);
          items.push(
            withoutItem[0],
            {
              type: "brackets",
              opposite: true,
              value: parseOppositeBrackets(item.substring(1, item.length - 1))
            },
            withoutItem[1]
          );
        }
      });
      return items.filter(i => i);
    }
    return item;
  }

  return { ...item, value: item.value.map(parseOppositeBrackets) };
}

function parse(str: string) {
  str = str.replace(/\s/g, "");
  if (!isParenthesisMatching(str)) {
    throw new Error("parentezler esit degil");
  }

  // Object.entries(PROCESS_MAP).forEach(([key, value]) => {
  //   str = str.split(key).join(value);
  // });
  const result: any[] = [];
  parseBrackets(handleOppositeBracket(str))
    .map(parseOppositeBrackets)
    .forEach(item => {
      if (Array.isArray(item)) {
        result.push(...item);
      } else {
        result.push(item);
      }
    });
  return result;
}
console.log(parse(content));

//@ts-ignore
document.getElementById("a").innerHTML = content;
