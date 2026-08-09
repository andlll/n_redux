/// gml_Object_r12_KeyPress_77
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(noemi, 3, 0);
if (__b__) {
    noemi = noemi + 1;
} else {
    action_set_relative(0);
    noemi = 0;
    action_set_relative(1);
}
action_set_relative(0);
