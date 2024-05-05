export const capitalize = (str: string) => {
    return str[0].toUpperCase() + str.slice(1);
}

export const combineStrings = (...rest: (string | undefined)[]) => {
    let str = "";
    rest.forEach(item => {
        if (item) {
            str += item;
        }
    })
    return str;
}