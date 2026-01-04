import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

import promptLanguage from "./lang-prompt.ts";
import promptTheme from "./theme-prompt.ts";

const extensionPrintLog = (text: string) => {
    console.log("[sd-webui-syntax-highlighting] " + text);
};

const extensionPrintError = (text: string) => {
    console.error("[sd-webui-syntax-highlighting] " + text);
};

// Wait until Gradio elements are loaded
onUiLoaded(async() => {
    const highlighter = await createHighlighterCore({
        // The themes and languages that the highlighter can choose between
        themes: [],
        langs: [],
        engine: createOnigurumaEngine(import("shiki/wasm")),
    });
    await highlighter.loadLanguage(promptLanguage);
    await highlighter.loadTheme(promptTheme);

    // HTML Ids that the WebUI uses
    var txt2img_positive_prompt = document.querySelector("#txt2img_prompt");
    var txt2img_negative_prompt = document.querySelector("#txt2img_neg_prompt");
    var img2img_positive_prompt = document.querySelector("#img2img_prompt");
    var img2img_negative_prompt = document.querySelector("#img2img_neg_prompt");

    if (txt2img_positive_prompt
        && txt2img_negative_prompt
        && img2img_positive_prompt
        && img2img_negative_prompt) {
        extensionPrintLog("Found prompts, adding highlighter code.");

        var prompts_to_inject = [
            txt2img_positive_prompt,
            txt2img_negative_prompt,
            img2img_positive_prompt,
            img2img_negative_prompt,
        ];

        var updatePromptHighlighting = (textArea: HTMLTextAreaElement | null, highlightedText: HTMLDivElement) => {
            var text = textArea?.value || "";
            // Handle discrepancy in <pre><code> blocks where an empty newline at the end is visually ignored
            if (text[text.length - 1] == "\n") {
                // Note this won't actually modify the prompt, only the input given to the syntax highlighter
                text += " ";
            }

            var html = highlighter.codeToHtml(text, {
                themes: {
                    light: "sd-webui-prompt-theme",
                    dark: "sd-webui-prompt-theme",
                },
                lang: "sd-webui-prompt",
            })

            highlightedText.innerHTML = html;
        }

        prompts_to_inject.forEach(element => {
            var innerLabel: HTMLLabelElement | null = element.querySelector("label");
            var innerTextarea: HTMLTextAreaElement | null = element.querySelector("label > textarea");
            
            var highlightedText = document.createElement("div");
            highlightedText.classList.add("sd-webui-syntax-highlighting");
            innerLabel?.appendChild(highlightedText)

            if (innerTextarea) {
                // When the user types inside the <textarea>
                innerTextarea.addEventListener("input", () => {
                    updatePromptHighlighting(
                        innerTextarea,
                        highlightedText
                    );
                });
                innerTextarea.addEventListener("change", () => {
                    updatePromptHighlighting(
                        innerTextarea,
                        highlightedText
                    );
                });

                // Manually trigger highlighting right away, since the event listener only updates it on user input,
                // meaning the box won't be visible on UI first start
                updatePromptHighlighting(innerTextarea, highlightedText);

                // Sync scrolling
                innerTextarea.addEventListener("scroll", () => {
                    highlightedText.scrollTop = innerTextarea?.scrollTop || 0;
                    highlightedText.scrollLeft = innerTextarea?.scrollLeft || 0;
                });

                // Sync height when the text box is resized
                // var onResized = () => {
                //     highlightedText.style.height = innerTextarea?.style.height || "auto";
                // };

                // new ResizeObserver(onResized).observe(innerTextarea);
            }
        });
    } else {
        extensionPrintError("Could not find prompts.");
    }
});
