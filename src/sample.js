let notes = [
    { note: "C/4", duration: "w"},
    { note: "D/4", duration: "q"},
    { note: "B/4", duration: "q"},
    { note: "C/4", duration: "8"},
    { note: "C/4", duration: "8"}
];
let mapDuration = new Map();
mapDuration.set("w", 32);
mapDuration.set("h", 16);
mapDuration.set("q", 8);
mapDuration.set("8", 4);
mapDuration.set("16", 2);
mapDuration.set("32", 1);

let sumDuration = 0;
notes.forEach((e) => {
    sumDuration += mapDuration.get(e.duration);
});
if (sumDuration % 32 === 0) {
    console.log("notes enough")
} else {
    let numNotesAdd = 0;
    let remainder = Math.ceil(sumDuration/32)*32 - sumDuration;
    for (let i = 16; i !== 0; i = Math.trunc(i/2)) {
        const quotient = Math.floor(remainder/i);
        if (quotient === 0) {
            continue;
        } else {
            numNotesAdd += quotient;
            let duration = [...mapDuration.entries()].find(([k, v]) => v === i)[0];
            for (let j = 0; j < quotient; j++) {
                notes.push({ note: "C4", duration: duration});
            }
            remainder %= i;
            if (remainder === 0) {
                break;
            }
        }
    }
    console.log('notes added', notes);
}