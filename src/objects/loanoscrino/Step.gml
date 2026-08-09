/// gml_Object_loanoscrino_Step_0
// locals: __b__
action_sprite_transform(global.sca, global.sca, 0, 0);
__b__ = action_if_variable(os_type, 4, 0);
if (__b__) {
    action_move_to(view_xview[0] + view_wview[0] / 2, view_yview[0] + view_hview[0] / 2);
}
with (bankbuttoner) {
    __b__ = action_if_variable(loaned, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_kill_object();
    with (get_loan1) {
        action_kill_object();
    }
    with (get_loan2) {
        action_kill_object();
    }
    with (get_loan3) {
        action_kill_object();
    }
    with (get_loan4) {
        action_kill_object();
    }
}
