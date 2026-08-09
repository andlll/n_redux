/// gml_Object_industria3_Create_0
// locals: __b__
action_set_relative(0);
redder = 0;
action_set_relative(1);
action_create_object(ruindeath, 0, 0);
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
    hap = hap + -150;
    action_set_relative(0);
}
with (r12) {
    action_set_relative(1);
    wewe = wewe + 180;
    action_set_relative(0);
}
action_set_alarm(1200, 7);
arp = 0;
action_set_alarm(45, 6);
life = 200;
deming = 0;
upo = 0;
action_set_alarm(120, 2);
action_set_alarm(60, 3);
action_set_alarm(73, 4);
action_set_alarm(67, 5);
action_set_relative(1);
action_create_object(i31aa1, 0, 0);
action_set_relative(0);
action_set_relative(1);
action_create_object(i31aa2, 0, 0);
action_set_relative(0);
action_set_relative(1);
action_create_object(i31aa3, 0, 0);
action_set_relative(0);
depth = -y;
__b__ = action_if_dice(2);
if (__b__) {
    action_set_relative(1);
    action_create_object(di311, 0, 0);
    action_set_relative(0);
    action_set_relative(0);
    exit;
} else {
    action_set_relative(1);
    action_create_object(di312, 0, 0);
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
action_set_relative(0);
