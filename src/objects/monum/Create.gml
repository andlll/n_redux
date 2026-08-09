/// gml_Object_monum_Create_0
// locals: __b__
action_set_relative(1);
action_create_object(monum_light, 0, 0);
action_set_relative(0);
life = 1000;
action_set_relative(1);
action_set_relative(0);
redder = 0;
action_set_relative(1);
with (r12) {
    hap = hap + 1000;
}
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(16366009, 1);
}
with (aura) {
    __b__ = action_if_variable(dawn, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(15201023, 1);
}
depth = -y;
action_set_relative(0);
action_set_alarm(67, 0);
action_set_relative(1);
action_set_relative(0);
