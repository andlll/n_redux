/// gml_Object_industria2_Create_0
// locals: __b__
action_set_relative(0);
redder = 0;
makee = 0;
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
    wewe = wewe + 60;
    action_set_relative(0);
}
life = 100;
with (r12) {
    action_set_relative(1);
    hap = hap + -100;
    action_set_relative(0);
}
action_set_alarm(120, 2);
action_set_alarm(34, 5);
arp = 0;
deming = 0;
upo = 0;
action_set_alarm(60, 3);
action_set_alarm(73, 4);
depth = -y;
__b__ = action_if_dice(2);
if (__b__) {
    action_sprite_set(i22, 0, 1);
    xi = 2;
    action_set_relative(1);
    action_create_object(di22, 0, 0);
    action_set_relative(0);
    action_set_relative(1);
    action_create_object(i22bb, 0, 0);
    action_set_relative(0);
    action_set_relative(1);
    action_create_object(i22cc, 0, 0);
    action_set_relative(0);
    action_set_relative(0);
    exit;
} else {
    xi = 1;
    action_set_relative(1);
    action_create_object(di21, 0, 0);
    action_set_relative(0);
    action_set_relative(1);
    action_create_object(i21bb, 0, 0);
    action_set_relative(0);
    action_set_relative(1);
    action_create_object(i21cc, 0, 0);
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
action_set_relative(0);
