/// gml_Object_r12_KeyPress_69
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(noemi, 2, 0);
if (__b__) {
    noemi = noemi + 1;
} else {
    action_set_relative(0);
    noemi = 0;
    action_set_relative(1);
}
__b__ = action_if_variable(os_type, 0, 0);
if (__b__) {
    action_set_cursor(1372, 0);
}
action_set_relative(0);
selec = 2;
action_set_relative(1);
action_set_relative(0);
