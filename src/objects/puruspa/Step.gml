/// gml_Object_puruspa_Step_0
// locals: __b__
action_sprite_transform(global.sca, global.sca, 0, 0);
shifta = positionb.x - positiona.x;
with (pu1) {
    __b__ = action_if_variable(menoo, 0, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_move_to(view_xview[0] + 284 * global.sca, view_hview[0] + view_yview[0]);
} else {
    action_move_to(-1000, -1000);
}
__b__ = action_if_variable(over, 0, 0);
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(selec, 11, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        action_sprite_set(russ, 0, 1);
    } else {
        action_sprite_set(ru, 0, 1);
    }
}
