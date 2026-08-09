/// gml_Object_banca1_Create_0
// locals: __b__
action_set_relative(0);
redder = 0;
action_set_relative(1);
action_create_object(ruindeath, 0, 0);
action_set_relative(0);
action_set_relative(1);
action_create_object(banca1_light, 0, 0);
action_set_relative(0);
action_set_relative(1);
action_create_object(bankbuttoner, -50, -40);
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
action_set_alarm(2000, 2);
action_set_alarm(23, 5);
action_set_alarm(600, 4);
action_set_alarm(960, 6);
action_set_alarm(120, 3);
life = 1300;
with (r12) {
    action_set_relative(1);
    wewe = wewe + 70;
    action_set_relative(0);
}
depth = -y;
action_set_relative(0);
