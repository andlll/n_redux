/// gml_Object_object686_Step_0
// locals: __b__
action_move_to(view_xview[0] + 520, view_yview[0] + 20);
with (r12) {
    __b__ = action_if_variable(oil, 0, 3);
    if (__b__) {
        break;
    }
}
if (__b__) {
    __b__ = action_if_number(736, 0, 0);
    if (__b__) {
        action_kill_object();
    }
}
__b__ = action_if_variable(loan_uno, 0, 0);
if (__b__) {
    __b__ = action_if_variable(loan_due, 0, 0);
    if (__b__) {
        __b__ = action_if_variable(loan_tre, 0, 0);
        if (__b__) {
            __b__ = action_if_variable(loan_quattro, 0, 0);
            if (__b__) {
                with (bankbuttoner) {
                    loaned = 0;
                }
            }
        }
    }
}
