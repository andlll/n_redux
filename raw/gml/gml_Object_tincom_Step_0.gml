/// gml_Object_tincom_Step_0
// locals: __b__
__b__ = action_if_variable(os_type, 4, 0);
if (__b__) {
    action_sprite_transform(0.3 * global.sca, 0.3 * global.sca, 0, 0);
}
__b__ = action_if_variable(os_type, 0, 0);
if (__b__) {
    action_sprite_transform(global.sca, global.sca, 0, 0);
}
action_move_to(view_xview[0] + view_wview[0] / 2, view_yview[0] + view_hview[0] / 2);
