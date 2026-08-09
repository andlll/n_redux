/// gml_Object_scroller2_Mouse_61
// locals: __b__
action_set_relative(0);
__b__ = action_if_variable(control, 0, 0);
if (__b__) {
    __b__ = action_if_number(8, 0, 0);
    if (__b__) {
        __b__ = action_if_number(9, 0, 0);
        if (__b__) {
            __b__ = action_if_number(10, 0, 0);
            if (__b__) {
                __b__ = action_if_variable(global.sca, 1.4, 2);
                if (!__b__) {
                    with (zoom_minus) {
                        active = 0.5;
                    }
                }
            }
        }
    }
}
__b__ = action_if_variable(control, 1, 0);
if (__b__) {
    action_set_relative(1);
    view_xview[0] = view_xview[0] + 100;
    action_set_relative(0);
}
__b__ = action_if_variable(control, 2, 0);
if (__b__) {
    action_set_relative(1);
    view_yview[0] = view_yview[0] + 100;
    action_set_relative(0);
}
action_set_relative(0);
