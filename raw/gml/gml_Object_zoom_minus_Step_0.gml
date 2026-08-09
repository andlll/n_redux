/// gml_Object_zoom_minus_Step_0
// locals: __b__
action_sprite_transform(global.sca, global.sca, 0, 0);
with (pu1) {
    __b__ = action_if_variable(menoo, 2, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_move_to(view_xview[0] + 368 * global.sca, view_hview[0] + view_yview[0]);
} else {
    action_move_to(-1000, -1000);
}
if (global.sca >= 1.4) {
    image_alpha = 0.5;
} else {
    image_alpha = 1;
}
if (active > 0) {
    global.sca = global.sca + 0.005;
    active = active - 0.05;
}
