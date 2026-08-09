/// gml_Object_r12_KeyPress_78
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(noemi, 0, 0);
if (__b__) {
    __b__ = action_if_number(161, 0, 0);
    if (__b__) {
        noemi = noemi + 1;
    }
}
action_set_relative(0);
