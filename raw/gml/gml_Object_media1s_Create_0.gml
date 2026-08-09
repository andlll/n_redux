/// gml_Object_media1s_Create_0
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
action_set_alarm(2000, 2);
action_set_alarm(600, 4);
action_set_alarm(960, 6);
action_set_alarm(34, 5);
action_set_alarm(120, 3);
ava = 0;
with (r12) {
    action_set_relative(1);
    hap = hap + 1200;
    action_set_relative(0);
}
life = 350;
with (r12) {
    action_set_relative(1);
    wewe = wewe + 150;
    action_set_relative(0);
}
depth = -y + 3;
__b__ = action_if_dice(2);
if (__b__) {
    action_set_relative(1);
    action_create_object(MEDIALITE1, 0, 0);
    action_set_relative(0);
    action_sprite_set(med1, 0, 1);
} else {
    action_set_relative(1);
    action_create_object(MEDIALITE2, 0, 0);
    action_set_relative(0);
    action_sprite_set(med2, 0, 1);
}
action_set_relative(0);
