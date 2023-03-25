export default function NoScript() {
    return (
        <noscript>
            <style
                dangerouslySetInnerHTML={{
                    __html: noScriptStyles,
                }}
            />
        </noscript>
    );
}

// overrides framer-motion's default styles
// ie. opacity and transform animations get reset when JS is disabled
const noScriptStyles = `
*[style*='opacity:0']{opacity:1!important;}\
*[style*='transform']{transform:none!important;}
`.trim();
