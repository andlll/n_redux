/// gml_Object_eyebutton_Step_0
// locals: __b__
action_sprite_transform(global.sca, global.sca, 0, 0);
with (pu1) {
    __b__ = action_if_variable(menoo, 0, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_move_to(view_xview[0] + 192 * global.sca, view_hview[0] + view_yview[0]);
} else {
    action_move_to(-1000, -1000);
}
