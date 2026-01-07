
// Further reference: https://macromates.com/manual/en/language_grammars
const promptLanguage = {
    name: "sd-webui-prompt",
    displayName: "SD WebUI Prompt",
    scopeName: "source.sd-webui-prompt",
    patterns: [
        {
            match: "#.*$",
            name: "comment"
        },

        {
            match: ",",
            name: "comma",
        },

        {
            match: "\\bAND\\b",
            name: "keyword.and"
        },
        {
            match: "\\bBREAK\\b",
            name: "keyword.break"
        },
        {
            match: "\\|",
            name: "prompt.combination.bar"
        },

        {
            match: "[\\(\\)\\[\\]]",
            name: "emphasis"
        },
        {
            match: ":(\\-?\\d+(.\\d+)?)",
            captures: {
                0: {
                    name: "multiplier.colon"
                },
                1: {
                    name: "multiplier.number"
                }
            },
        },

        {
            match: "(<)(lora):(.+?):(.+?)(>)",
            captures: {
                0: {
                    name: "lora"
                },
                1: {
                    name: "lora.bracket.left"
                },
                2: {
                    name: "lora.prefix"
                },
                3: {
                    name: "lora.name"
                },
                4: {
                    name: "lora.multiplier"
                },
                5: {
                    name: "lora.bracket.right"
                }
            }
        },

        {
            match: "((best|amazing|good|great|high) quality|masterpiece)",
            name: "quality.tags.positive"
        },
        {
            match: "(normal|average|decent|okay) quality",
            name: "quality.tags.neutral"
        },
        {
            match: "(worst|bad|awful|terrible|low) quality",
            name: "quality.tags.negative"
        },

        {
            match: "(very)?(highres|absurdres)",
            name: "resolution.tags.positive"
        },
        {
            match: "(very)?medres",
            name: "resolution.tags.neutral"
        },
        {
            match: "(very)?lowres",
            name: "resolution.tags.negative"
        },

        // Support some syntax from various SD WebUI extensions
        {
            begin: "\\{",
            beginCaptures: {
                0: {
                    name: "extension.wildcard.inline.bracket.left"
                }
            },
            end: "}",
            endCaptures: {
                0: {
                    name: "extension.wildcard.inline.bracket.right"
                }
            },
            contentName: "extension.wildcard.inline.text",
            patterns: [
                {
                    include: "$self"
                },
                {
                    match: "\\|",
                    name: "extension.wildcard.inline.vertical.bar"
                },
                {
                    match: "(\\d+)(::)",
                    captures: {
                        0: {
                            name: "extension.wildcard.weight"
                        },
                        1: {
                            name: "extension.wildcard.weight.number"
                        },
                        2: {
                            name: "extension.wildcard.weight.separator"
                        }
                    },
                }
            ]
        },
        {
            match: "__.*?__",
            name: "extension.wildcard.file"
        },
    ],
};

export default promptLanguage;
