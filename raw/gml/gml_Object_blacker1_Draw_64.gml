/// gml_Object_blacker1_Draw_64
// locals: __b__
draw_rectangle(0, 0, 5000, 5000, 0);
__b__ = action_if_variable(os_type, 0, 0);
if (__b__) {
    action_draw_sprite(mfs1, view_wview[0] / 2, view_hview[0] / 2, -1);
}
__b__ = action_if_variable(os_type, 4, 0);
if (__b__) {
    action_draw_sprite(mfs11, view_wview[0] / 2, view_hview[0] / 2, -1);
}
