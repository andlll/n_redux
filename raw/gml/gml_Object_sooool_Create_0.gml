/// gml_Object_sooool_Create_0
// locals: __b__
action_set_relative(0);
redder = 0;
overpark = 0;
action_set_relative(1);
action_create_object(ruindeath, 0, 0);
action_set_relative(0);
action_set_relative(1);
action_create_object(radiancia, 0, 0);
action_set_relative(0);
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
with (r12) {
    action_set_relative(1);
    wewe = wewe + 10;
    action_set_relative(0);
}
deming = 0;
arp = 0;
action_set_alarm(35, 5);
action_set_alarm(30, 4);
life = 50;
upo = 0;
depth = -y;
action_set_relative(0);
