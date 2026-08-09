/// gml_Object_chies_Mouse_10
// locals: __b__
action_set_relative(0);
__b__ = action_if_variable(level, 2, 4);
if (__b__) {
    with (chies) {
        trade = 1;
    }
}
__b__ = action_if_number(232, 0, 0);
if (__b__) {
    __b__ = action_if_variable(level, 1, 0);
    if (__b__) {
        __b__ = action_if_number(8, 0, 0);
        if (__b__) {
            action_set_relative(1);
            action_create_object(go12, 0, 0);
            action_set_relative(0);
        }
    }
}
__b__ = action_if_number(234, 0, 0);
if (__b__) {
    __b__ = action_if_variable(level, 2, 0);
    if (__b__) {
        __b__ = action_if_number(736, 0, 2);
        if (!__b__) {
            action_set_relative(1);
            action_create_object(go23, 0, 0);
            action_set_relative(0);
        } else {
            action_set_relative(1);
            action_create_object(easymo, 0, 0);
            action_set_relative(0);
        }
    }
}
__b__ = action_if_variable(level, 3, 0);
if (__b__) {
    action_set_relative(1);
    action_create_object(autot, 0, 0);
    action_set_relative(0);
}
action_set_relative(0);
