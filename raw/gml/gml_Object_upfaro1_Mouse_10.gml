/// gml_Object_upfaro1_Mouse_10
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(phase, 0, 0);
if (__b__) {
    action_create_object(cc2000, 0, -50);
    action_set_relative(0);
    phase = 1;
    action_set_relative(1);
}
action_set_relative(0);
