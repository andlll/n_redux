/// gml_Object_resetrelotto_Step_0
action_sprite_transform(0.89 * global.sca, 0.89 * global.sca, 0, 0);
proto1 = window_get_width();
proto2 = window_get_height();
if (proto1 > proto2) {
    ori = 1;
} else {
    ori = 0;
}
if (ori == 0) {
    x = view_wview[0] / 2 + view_xview[0];
    y = view_yview[0] + 700 * global.sca;
} else {
    x = view_wview[0] / 2 + view_xview[0];
    y = view_yview[0] + 420 * global.sca;
}
