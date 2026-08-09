/// gml_Object_stella3_Mouse_10
// locals: __b__
action_set_relative(1);
action_create_object(buscrof, 0, 0);
action_create_object(busmob, 0, 0);
__b__ = action_if_variable(unlocinque, 1, 0);
if (__b__) {
    instance_create(x, y, cc200000m3);
} else {
    instance_create(x, y, ccunlom3);
}
action_set_relative(0);
