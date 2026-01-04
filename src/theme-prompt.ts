const promptTheme = {
    name: "sd-webui-prompt-theme",
    displayName: "SD WebUI Prompt Theme",
    colors: {
        "editor.foreground": "var(--body-text-color)",
        "editor.background": "#00000000"
    },
    settings: [
        {
            scope: ["comma", "comment"],
            settings: {
                foreground: "hsla(0, 0%, 55%, 1.00)"
            }
        },
        {
            scope: ["keyword.and", "keyword.break", "prompt.combination.bar"],
            settings: {
                foreground: "hsla(51, 100%, 72%, 1.00)",
                fontStyle: "bold"
            }
        },
        {
            scope: [
                "emphasis",
                "multiplier.colon",
                "lora",
                "lora.bracket.left",
                "lora.bracket.right"
            ],
            settings: {
                foreground: "hsla(209, 82%, 69%, 1.00)"
            }
        },
        {
            scope: [
                "multiplier.number",
                "lora.multiplier",
                "lora.prefix"
            ],
            settings: {
                foreground: "hsla(24, 100%, 70%, 1.00)"
            }
        },
        {
            scope: ["lora.name"],
            settings: {
                foreground: "hsla(273, 100%, 87%, 1.00)"
            }
        },

        {
            scope: ["quality.tags.positive", "resolution.tags.positive"],
            settings: {
                foreground: "hsla(120, 100%, 83%, 1.00)"
            }
        },
        {
            scope: ["quality.tags.neutral", "resolution.tags.neutral"],
            settings: {
                foreground: "hsla(54, 100%, 83%, 1.00)"
            }
        },
        {
            scope: ["quality.tags.negative", "resolution.tags.negative"],
            settings: {
                foreground: "hsla(4, 100%, 83%, 1.00)"
            }
        },

        {
            scope: [
                "extension.wildcard.inline.bracket.left",
                "extension.wildcard.inline.bracket.right",
                "extension.wildcard.inline.vertical.bar",
                "extension.wildcard.file",
                "extension.wildcard.weight.separator"
            ],
            settings: {
                foreground: "hsla(36, 100%, 63%, 1.00)"
            }
        },
        {
            scope: [
                "extension.wildcard.weight.number"
            ],
            settings: {
                foreground: "hsla(51, 100%, 50%, 1.00)"
            }
        }
    ]
};

export default promptTheme;
