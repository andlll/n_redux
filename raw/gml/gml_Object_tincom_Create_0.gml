/// gml_Object_tincom_Create_0
// locals: __b__
action_set_alarm(240, 0);
action_set_alarm(30, 1);
action_set_alarm(60, 2);
__b__ = action_if_variable(os_type, 4, 0);
if (__b__) {
    action_sprite_transform(0.3, 0.3, 0, 0);
}
