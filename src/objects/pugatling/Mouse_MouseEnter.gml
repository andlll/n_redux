/// gml_Object_pugatling_Mouse_10
// locals: __b__
action_set_relative(1);
action_create_object(buscrof, 0, 0);
action_create_object(busmob, 0, 0);
__b__ = action_if_variable(unlosei, 1, 0);
if (__b__) {
    action_create_object(cc10000gat, 0, -100);
}
__b__ = action_if_variable(unlosei, 0, 0);
if (__b__) {
    action_create_object(level2gatling, 0, -100);
}
action_set_relative(0);
