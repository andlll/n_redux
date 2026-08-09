/// gml_Object_stella2_Mouse_10
// locals: __b__
action_set_relative(1);
action_create_object(buscrof, 0, 0);
action_create_object(busmob, 0, 0);
__b__ = action_if_variable(unlocinque, 1, 0);
if (__b__) {
    action_set_relative(0);
    action_create_object(ccfree, 0, 0);
    action_set_relative(1);
}
action_set_relative(0);
