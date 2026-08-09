/// gml_Object_pu4prov_Mouse_10
// locals: __b__
action_set_relative(0);
with (scroller2) {
    goer = 0;
}
action_set_relative(1);
action_create_object(buscrof, 0, 0);
action_set_relative(0);
action_set_relative(1);
action_create_object(busmob, 0, 0);
action_set_relative(0);
__b__ = action_if_variable(unlos, 1, 0);
if (__b__) {
    action_set_relative(1);
    action_create_object(cc50000vent, 0, -100);
    action_set_relative(0);
}
__b__ = action_if_variable(unlos, 0, 0);
if (__b__) {
    action_set_relative(1);
    action_create_object(leve3tounlo4, 0, -100);
    action_set_relative(0);
}
action_set_relative(0);
