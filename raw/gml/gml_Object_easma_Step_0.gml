/// gml_Object_easma_Step_0
proto1 = window_get_width();
proto2 = window_get_height();
if (os_type == 4) {
    if (proto2 < proto1) {
        x = view_xview[0] + view_wview[0] / 2 + 275;
        y = view_yview[0] + view_hview[0] / 2 + 120;
    } else {
        x = view_xview[0] + view_wview[0] / 2;
        y = 543;
    }
}
if (os_type == 0) {
    x = view_xview[0] + view_wview[0] / 2;
    y = 543;
}
