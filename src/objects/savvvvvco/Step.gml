/// gml_Object_savvvvvco_Step_0
// locals: __b__
action_sprite_transform(global.sca, global.sca, 0, 0);
with (r12) {
    __b__ = action_if_variable(crys, 0, 3);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(biotech, 0, 3);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        action_move_to(view_xview[0] + 10 * global.sca, view_yview[0] + 60 * global.sca + global.upp);
    }
}
with (r12) {
    __b__ = action_if_variable(biotech, 0, 2);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_move_to(view_xview[0] + 10 * global.sca, view_yview[0] + 120 * global.sca + global.upp);
}
with (r12) {
    __b__ = action_if_variable(crys, 0, 2);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_move_to(view_xview[0] + 10 * global.sca, view_yview[0] + 120 * global.sca + global.upp);
}
