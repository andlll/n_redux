/// gml_Object_backobutton_Step_0
// locals: __b__
action_sprite_transform(global.sca, global.sca, 0, 0);
shifta = positionb.x - positiona.x;
__b__ = action_if_variable(shifta, 0, 2);
if (__b__) {
    shifta = 0;
}
__b__ = action_if_variable(shifta, -1000, 1);
if (__b__) {
    shifta = -1000;
}
with (pu1) {
    __b__ = action_if_variable(menoo, 0, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_move_to(-1000, -1000);
}
with (pu1) {
    __b__ = action_if_variable(menoo, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_move_to(view_xview[0] + shifta + 1216 * global.sca, view_hview[0] + view_yview[0]);
}
with (pu1) {
    __b__ = action_if_variable(menoo, 2, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_move_to(view_xview[0] + 460 * global.sca, view_hview[0] + view_yview[0]);
}
