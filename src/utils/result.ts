const result = {
  type: "condition",
  process: "||",
  one: {
    type: "condition",
    process: "&&",
    one: {
      type: "condition",
      process: "&&",
      one: {
        type: "condition",
        process: "&&",
        one: {
          type: "brackets",
          value: {
            type: "brackets",
            value: {
              type: "condition",
              process: "&&",
              one: {
                type: "condition",
                process: "&&",
                one: {
                  type: "variable",
                  value: "a"
                },
                two: {
                  type: "brackets",
                  value: {
                    type: "condition",
                    process: "||",
                    one: {
                      type: "variable",
                      value: "b"
                    },
                    two: {
                      type: "opposite",
                      value: {
                        type: "variable",
                        value: "c"
                      }
                    }
                  }
                }
              },
              two: {
                type: "variable",
                value: "d"
              }
            }
          }
        },
        two: {
          type: "opposite",
          value: {
            type: "variable",
            value: "f"
          }
        }
      },
      two: {
        type: "boolean",
        value: "false"
      }
    },
    two: {
      type: "boolean",
      value: "true"
    }
  },
  two: {
    type: "opposite",
    value: {
      type: "brackets",
      value: {
        type: "condition",
        process: "!=",
        one: {
          type: "variable",
          value: "g"
        },
        two: {
          type: "variable",
          value: "g"
        }
      }
    }
  }
};

const result2 = [
  {
    type: "brackets",
    isOpposite: false,
    text: " ( a && ( b || !c ) && d ) "
  },
  {
    type: "str",
    text: "&& !f && false && true || "
  },
  {
    type: "brackets",
    isOpposite: true,
    text: "g != e"
  },
  {
    type: "str",
    text: "&&"
  },
  {
    type: "brackets",
    isOpposite: false,
    text: "!(a)"
  }
];
