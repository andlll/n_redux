/// gml_Object_gogirrra_Step_0
proto1 = window_get_width();
proto2 = window_get_height();
if (os_type == 4) {
    if (proto1 > proto2) {
        global.upp = 0;
    } else {
        global.upp = 40;
    }
} else {
    global.upp = 0;
}
x = view_xview[0];
y = view_yview[0] + global.upp;
