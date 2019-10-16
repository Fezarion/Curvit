/**
 * Simple object to determine themes colours.
 */

const Curvit = { background: "#35323E", primary: "#98B588", light: "#E9E9E9" };
const Amaranth = {
    background: "#2C3746",
    primary: "#ED3A4C",
    light: "#F9F9F9"
};
const SeaGreen = {
    background: "#313131",
    primary: "#43B566",
    light: "#F9F9F9"
};

export default template => {
    switch (template) {
        case 0:
            return Curvit;
        case 1:
            return Amaranth;
        case 2:
            return SeaGreen;
        default:
            return Curvit;
    }
};
