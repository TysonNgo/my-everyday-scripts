/* Generates an empty Photoshop document that is  
 * 600 dpi and 8.3 x 11.7 inches as well as providing
 * guideline boxes
*/

app.preferences.rulerUnits = Units.PIXELS;

function selectRect(document, xy1, xy2){
    var rect = [
        xy1,
        [xy2[0], xy1[1]],
        xy2,
        [xy1[0], xy2[1]]
    ]
    document.selection.select(rect);
}

function drawRect(document, color, xy1, xy2){
    selectRect(document, xy1, xy2);
    document.selection.stroke(color, 8);
    document.selection.deselect();
}

// inches
var a4 = {
    width: 4980, // 8.3 in
    height: 7020 // 11.7 in
};
var dpi = 600;

var a4doc = app.documents.add(a4.width, a4.height, dpi, "a4_600dpi");
var guideline = a4doc.artLayers.add();
guideline.name = "guideline"
guideline.opacity = 80;
app.preferences.rulerUnits = Units.INCHES;

var color = new RGBColor();

// outer bounds
color.hexValue = "000000";
drawRect(a4doc, color, [345, 525], [4640, 6505]);

// inner-outer bounds
color.hexValue = "575757";
drawRect(a4doc, color, [445, 625], [4540, 6405]);

// inner bounds
color.hexValue = "ABABAB";
drawRect(a4doc, color, [740, 900], [4240, 6140]);