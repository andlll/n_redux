/// gml_Object_r12_KeyPress_79
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(noemi, 1, 0);
if (__b__) {
    noemi = noemi + 1;
} else {
    action_set_relative(0);
    noemi = 0;
    action_set_relative(1);
}
with (puvillone) {
    __b__ = action_if_variable(unlosei, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    __b__ = action_if_variable(os_type, 0, 0);
    if (__b__) {
        action_set_cursor(1372, 0);
    }
    with (r12) {
        action_set_relative(0);
        selec = 63;
        action_set_relative(1);
    }
}
action_set_relative(0);
