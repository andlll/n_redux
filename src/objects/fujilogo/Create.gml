/// gml_Object_fujilogo_Create_0
// locals: __b__
__b__ = action_if_variable(os_type, 4, 0);
if (__b__) {
    action_sprite_transform(2, 2, 0, 0);
}
action_create_object(basedis, 0, 0);
action_set_alarm(120, 0);
going = 0;
