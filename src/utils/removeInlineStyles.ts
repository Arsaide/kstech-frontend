import parse, { domToReact, Element } from 'html-react-parser';

export const removeInlineStyles = (htmlString: string) => {
    const options = {
        replace: (domNode: any) => {
            if (domNode.name === 'script' || domNode.name === 'style') {
                return null;
            }

            if (domNode.attribs && domNode.attribs.style) {
                const style = domNode.attribs.style
                    .split(';')
                    .filter((style: string) => {
                        return (
                            !style.includes('font-family') && !style.includes('background-color')
                        );
                    })
                    .join(';');

                if (style.trim() === '') {
                    delete domNode.attribs.style;
                } else {
                    domNode.attribs.style = style;
                }
            }
        },
    };
    return typeof htmlString === 'string' ? parse(htmlString, options) : htmlString;
};
