/// gml_Object_pu5prov_Mouse_10
// locals: __b__
action_set_relative(1);
action_create_object(buscrof, 0, 0);
action_create_object(busmob, 0, 0);
__b__ = action_if_variable(unlocinque, 1, 0);
if (__b__) {
    action_create_object(cc20000laser, 0, -100);
}
__b__ = action_if_variable(unlocinque, 0, 0);
if (__b__) {
    action_create_object(leve3tounlo5, 0, -100);
}
action_set_relative(0);
