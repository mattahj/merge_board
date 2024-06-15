export function classList(classes: Record<string, boolean>) {
    return Object.entries(classes)
        .reduce((accum, [className, shouldApply]) => {
            if (shouldApply) {
                accum.push(className);
            }
            return accum;
        }, [])
        .join(" ");
}
